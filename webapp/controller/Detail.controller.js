sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    function (Controller, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("com.bmw.xss.ess.dt.wzdtprototype.controller.Detail", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter(this);
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
                this.getView().setModel(new JSONModel({
                    "control": {
                        "isEditable": false,
                        "isSaveEnabled": false
                    }
                }), "viewModel")
            },

            onSavePressed: function(oEvent) {
                var oModel = this.getView().getModel();
                var oViewModel = this.getView().getModel("viewModel");
                
                if(oModel.hasPendingChanges()) {
                    oModel.submitChanges({
                        success: function(oData) {

                            oViewModel.setProperty("/control/isEditable", false);
                            sap.m.MessageToast.show("Changes saved successfully");
                        },
                        error: function(oData) {
                            sap.m.MessageBox.error("Fehler: " + onerror.message);
                        }
                    });
                }
            },

            onCancelPressed: function(oEvent) {
                var oViewModel = this.getView().getModel("viewModel");
                oViewModel.setProperty("/control/isEditable", !oViewModel.getProperty("/control/isEditable"));

                var oModel = this.getView().getModel();
                if(oModel.hasPendingChanges()) {
                    oModel.resetChanges();
                }
            },

            onEditPressed: function(oEvent) {
                var oModel = this.getView().getModel("viewModel");
                oModel.setProperty("/control/isEditable", !oModel.getProperty("/control/isEditable"));
            },

            _onObjectMatched: function(oEvent) {
                this.getView().bindElement({
                    path: "/" + oEvent.getParameter("arguments").requestId
                });
            }
        });
    });
