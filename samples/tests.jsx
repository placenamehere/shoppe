﻿#include "../lib/shoppe.js"#target photoshopvar myDoc = sjs.doc.newIfNone(400,600);$.writeln(sjs.doc.isLandscape(myDoc));$.writeln(sjs.doc.isPortrait(myDoc));sjs.doc.resizeLongest(800);$.writeln(sjs.color.newRGB(5,22,33));$.writeln(sjs.color.at(50,50,myDoc).rgb.red);$.writeln(sjs.color.at(250,250,myDoc).rgb.red);sjs.color.clearSamplers();// grab a color from a location, radomize itvar sampled = sjs.color.at(100,100,myDoc);var newcolor = sjs.random.rgb(	sampled.rgb.red - 80,	sampled.rgb.red + 80,	sampled.rgb.green - 80,	sampled.rgb.green + 80,	sampled.rgb.blue - 80,	sampled.rgb.blue + 80);$.writeln(sampled.rgb);$.writeln(sampled.rgb.red);$.writeln(sampled.rgb.green);$.writeln(sampled.rgb.blue);$.writeln(newcolor.rgb);$.writeln(newcolor.rgb.red);$.writeln(newcolor.rgb.green);$.writeln(newcolor.rgb.blue);var sel = myDoc.selection.selectAll();myDoc.selection.fill(newcolor);//app.preferenes.colorPicker = ColorPicker.ADOBE;$.writeln($.colorPicker());