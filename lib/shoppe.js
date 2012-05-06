sjs = {};

sjs.app = {
	
};

sjs.doc = {
	newIfNone: function(w,h,dpi) {
		w = w || 400;
		h = h || 400;
		dpi = dpi || 72;
		if (!app.documents.length > 0) {
			var startRulerUnits = app.preferences.rulerUnits;
			app.preferences.rulerUnits = Units.PIXELS;
			var d = app.documents.add(w,h,dpi,null,NewDocumentMode.RGB, DocumentFill.WHITE);
			app.preferences.rulerUnits = startRulerUnits;
		} else {
			var d = app.activeDocument;
		}
		return d;
	},
	isLandscape: function(d) {
		d = d || app.activeDocument;
		return (d.width > d.height);
	},
	isPortrait: function(d) {
		d = d || app.activeDocument;
		return (d.height > d.width);
	},
	resizeLongest: function(side,d) {
		d = d || app.activeDocument;
		if (this.isLandscape(d)) {
			d.resizeImage(new UnitValue(side, 'px'), null);
		} else {
			d.resizeImage(null, new UnitValue(side, 'px'));
		}
	},
	snapshot: function(d) {
		d = d || app.activeDocument;
	},
	modeReset: function(d) {
		d = d || app.activeDocument;
		app.preferences.rulerUntis = Units.PIXELS;
		d.mode = DocumentMode.RGB;
		d.bitsPerChannel = 16;
	},

	begin: function(d) {
		d = d || PSLib.doc.newIfNone();
		PSLib.doc.snapshot(d);
		PSLib.modeReset.modeReset(d);
	}
};

sjs.color = {
	newRGB: function(r,g,b) {
		// create a new color object and set its properties
		var c = new SolidColor();
		c.rgb.red = r;
		c.rgb.green = g;
		c.rgb.blue = b;
		// return the created color object
		return c;
	},
	addSamplers: function(x,y,d) {
		d = d || app.activeDocument;
		return d.colorSamplers.add([new UnitValue(x, 'px' ),new UnitValue(y, 'px' )]);
	},
	clearSamplers: function(d) {
		d = d || app.activeDocument;
		while (d.colorSamplers.length) {
			d.colorSamplers[0].remove(); // does .removeAll() work?
		}
	},
	at: function(x, y, d) {
		d = d || app.activeDocument;
		var cs = null

		// if we have a sampler move it, if not create one in the proper location
		if (d.colorSamplers.length) {
			cs = d.colorSamplers[0];
		} else {
			cs = PSLib.color.addSamplers(x,y,d);
		}
		cs.move([new UnitValue(x, 'px' ),new UnitValue(y, 'px' )]);
		return cs.color;
	},
	picker: function() {
		var hex = $.colorPicker();
		
	}
};

sjs.random = {
	num: function(min,max) {
		var offset = min;
		var range = max - min + 1;

		return Math.floor(Math.random()*range+offset);
	},
	rgb: function(r0,r1,g0,g1,b0,b1) {
		var r = PSLib.random.num(r0,r1);
		var g = PSLib.random.num(g0,g1);
		var b = PSLib.random.num(b0,b1);
		
		// check bounds
		r = (r >= 0) ? r : 0; r = (r <= 255) ? r : 255;
		g = (g >= 0) ? g : 0; g = (g <= 255) ? g : 255;
		b = (b >= 0) ? b : 0; b = (b <= 255) ? b : 255;
		
		return PSLib.color.newRGB(r,g,b);
	}
};

sjs.text = {
	newLayer: function(text,d) {
		d = d || app.activeDocument;

		var l = doc.artLayers.add();
		l.kind = LayerKind.TEXT;
		l.textItem.contents = text;
		
		return l;
	},
	setOptions: function(l,opts) {
		if (opts) {
			if (opts.size >= 0) {
				l.textItem.size = new UnitValue(opts.size, 'px');
			}
			if (opts.color) {
				l.textItem.color = opts.color;
			}
			if (opts.fontName) {
				var fontObject = app.fonts.getByName(opts.fontName);
				
				// if the font exists under the given name, use it
				if (undefined != fontObject) {
					l.textItem.font = fontObject;
				}
			}
		}
	}
};

sjs.meta = {
	getExif: function(tag,d) {
		d = d || app.activeDocument;
		// loop through exif information in file
		for (var i=0, l=d.info.exit.length; i < l; i++) {
			var item = doc.info.exif[i];
			// clean up any capitalization issues & test
			if (item[0].toLowerCase() == tag.toLowerCase()) {
				// return the info in this tag, stopping the looping
				return item[i];
			}
		}
		// if we get to this point return nothing
		return null;
	}
};

sjs.layer = {
	up: function() {
		
	},
	down: function() {
		
	},
	top: function() {
		
	},
	next: function() {
		
	},
	previous: function() {
		
	},
	// selectType values: 'addToSelection', 'removeFromSelection'
	select: function(layerName, selectType) {
		function cTID(s) { return app.charIDToTypeID(s); };
		function sTID(s) { return app.stringIDToTypeID(s); };
		var desc01 = new ActionDescriptor();
		var ref01 = new ActionReference(); ref01.putName(cTID('Lyr '), layerName);
		desc01.putReference(cTID('null'), ref01);
		desc01.putEnumerated(sTID('selectionModifier'), sTID('selectionModifierType'), sTID(selectType));
		desc01.putBoolean(cTID('MkVs'), false);
		executeAction(cTID('slct'), desc01, DialogModes.NO);
	},
	deselectAll: function() {
		function cTID(s) { return app.charIDToTypeID(s); };
		function sTID(s) { return app.stringIDToTypeID(s); };
		var desc01 = new ActionDescriptor();
		var ref01 = new ActionReference();
		ref01.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
		desc01.putReference( cTID('null'), ref01);
		executeAction(sTID('selectNoLayers'), desc01, DialogModes.NO);
	}
};

sjs.history = {
	// suspend history for execution of given javascript code, naming the history state
	suspend: function(name,js,d) {
		d = d || app.activeDocument;
		d.suspendHistory(name, js);
	}
};