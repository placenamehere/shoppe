Shoppe.js
=========

Status
------

This project is currently very much a work in progress. Check it out to get ideas, but be warned some of the functions are incomplete or unfinished and very much undocumented.




### A JavaScript library built to make it easier to script Adobe Photoshop

This JavaScript library is intended to help quickly manage common tasks when automating tasks in Photoshop. It takes common tasks such as sampling a color or selecting layers, that sometimes take multiple lines of code or easedropping on the ScriptListener plugin, and wraps them in some straight forward and human friendly function names.

Using Shoppe.js
---------------

You can review samples/tests.jsx for some example of using the tools provided in Shoppe.js

### 1. Include the library in the beginning of any new scripts you're writing

`#include "/path/to/shoppe.js"`

### 2. Start using the helper functions in your code

`sjs.doc.resizeLongest(800); // resize document so longest side is 800 pixels`


Shoppe.js Overview
------------------

Shoppe is comprised of a few collections of methods to make it easy to learn and use.

* `sjs.app.*` : application related methods
* `sjs.doc.*` : document related methods including creation and testing of properties
* `sjs.color.*` : color related methods including sampling
* `sjs.random.*` : convenience methods for generating random numbers or colors
* `sjs.text.*` : text layer related methods
* `sjs.layer.*` : general and art layer methods
* `sjs.meta.*` : metadata and exit related methods
* `sjs.history.*` : history related methods

Note that these groups closely parallel the built in organization of the Photoshop Object Model or Core JavaScript objects. `sjs.random` enhances `Math.random()` with Photoshop related features such as random color creation, and `sjs.doc` makes working with the `app.documents` array or `app.activeDocument` much easier.


Additional information on scripting and automating Photoshop
------------------------------------------------------------

* Check the ExtendScript Toolkit application's help menu & read the docs!
* [PSScript Forums](http://www.ps-scripts.com/bb/)
* [xtools library](http://ps-scripts.sourceforge.net/xtools.html)
* [Power, Speed & Automation with Adobe Photoshop](http://www.amazon.com/dp/0240820835/?tag=planamher-20), Geoff Scott & Jeffrey Tranberry, focal press, 2012
* [Adobe Photoshop](http://www.photoshop.com/products/photoshop), but you knew that.