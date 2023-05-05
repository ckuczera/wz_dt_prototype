sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.bmw.xss.ess.dt.wzdtprototype.controller.Detail", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter(this);
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
            },

            _onObjectMatched: function(oEvent) {
                this.getView().bindElement({
                    path: "/" + oEvent.getParameter("arguments").requestId
                });
            }
        });
    });
