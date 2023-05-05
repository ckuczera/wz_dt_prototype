sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.bmw.xss.ess.dt.wzdtprototype.controller.View", {
            onInit: function () {

            },

            onItemPress: function(oEvent) {
                var oRouter = this.getOwnerComponent().getRouter(this);

                var oItem = oEvent.getParameter("listItem")
                var oCtx = oItem.getBindingContext();
    
                oRouter.navTo("RouteDetail", {
                    requestId : oCtx.getPath().substr(1)
                });
            }
        });
    });
