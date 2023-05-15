sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
  ],
  function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend(
      "com.bmw.xss.ess.dt.wzdtprototype.controller.Detail",
      {
        onInit: function () {
          var oRouter = this.getOwnerComponent().getRouter(this);
          oRouter
            .getRoute("RouteDetail")
            .attachPatternMatched(this._onObjectMatched, this);
          this.getView().setModel(
            new JSONModel({
              control: {
                isEditable: false,
                isSaveEnabled: false,
              },
            }),
            "viewModel"
          );

          var oMessageManager = sap.ui.getCore().getMessageManager();
          this.getView().setModel(oMessageManager.getMessageModel(), "message");
          oMessageManager.registerObject(this.getView(), true);
        },

        onSavePressed: function (oEvent) {
          var oModel = this.getView().getModel();
          var oViewModel = this.getView().getModel("viewModel");

          if (oModel.hasPendingChanges()) {
            oModel.submitChanges({
              success: function (oData) {
                if (!oModel.hasPendingChanges()) {
                  oViewModel.setProperty("/control/isEditable", false);
                  sap.m.MessageToast.show("Changes saved successfully");
                } else {
                  sap.m.MessageToast.show("Änderungen konnten nicht übertragen werden. Bitte Fehlerprotokoll prüfen!");
                }
              },
              error: function (oData) {
                sap.m.MessageBox.error("Fehler: " + oData.message);
              },
            });
          }
        },
        onCancelPressed: function (oEvent) {
          var oViewModel = this.getView().getModel("viewModel");
          oViewModel.setProperty(
            "/control/isEditable",
            !oViewModel.getProperty("/control/isEditable")
          );

          var oModel = this.getView().getModel();
          if (oModel.hasPendingChanges()) {
            oModel.resetChanges();
          }
        },

        onEditPressed: function (oEvent) {
          var oModel = this.getView().getModel("viewModel");
          oModel.setProperty(
            "/control/isEditable",
            !oModel.getProperty("/control/isEditable")
          );
        },

        _onObjectMatched: function (oEvent) {
          this.getView().bindElement({
            path: "/" + oEvent.getParameter("arguments").requestId,
          });
        },

        onMessagePopoverPress: function (oEvent) {
          var oSourceControl = oEvent.getSource();
          this._getMessagePopover().then(function (oMessagePopover) {
            oMessagePopover.openBy(oSourceControl);
          });
        },

        onDelete: function (oEvent) {
          var sPath = this.getView().getBindingContext().getPath();
          this.getView().getModel().remove(sPath);
        },

        onClearPress: function () {
          sap.ui.getCore().getMessageManager().removeAllMessages();
        },

        _getMessagePopover: function () {
          var oView = this.getView();

          // create popover lazily (singleton)
          if (!this._pMessagePopover) {
            this._pMessagePopover = Fragment.load({
              id: oView.getId(),
              name: "com.bmw.xss.ess.dt.wzdtprototype.view.MessagePopover",
            }).then(function (oMessagePopover) {
              oView.addDependent(oMessagePopover);
              return oMessagePopover;
            });
          }
          return this._pMessagePopover;
        },
      }
    );
  }
);
