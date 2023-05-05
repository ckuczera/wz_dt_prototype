/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"combmwxssessdt/wz_dt_prototype/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
