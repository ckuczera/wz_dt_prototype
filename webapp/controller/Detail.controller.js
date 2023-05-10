sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
    function (Controller, JSONModel) {
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
                if(oModel.hasPendingChanges()) {
                    oModel.submitChanges({
                        success: function(oData) {
                            debugger;
                        },
                        error: function(oData) {
                            debugger;
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
