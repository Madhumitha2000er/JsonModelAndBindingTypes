sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.test.jsonmodeldemoapp.controller.ProductPage", {
            onInit: function () {
                //Aggregation Binding inside controller file
                var oList = new sap.m.List();
                var oStandardListItem = new sap.m.StandardListItem({
                    title:"{ProductJSONModel>Name}",
                    description:"{ProductJSONModel>Description}",
                    icon:"sap-icon://desktop-mobile"
                });
                oList.bindAggregation("items",{
                    path:"/ProductCollection",
                    model:"ProductJSONModel",
                    template:oStandardListItem
                });
                //this.getView().byId('page').addContent(oList);


            },
            checkModelData : function(){
                var oModel = this.getOwnerComponent().getModel("ProductJSONModel");
                // why we are using getOwnerComponent() is that manifest.json is declared inside the Component.js file
                var oData = oModel.getData();
                //getData() --> Returns the current data of the model.
            },
            onPressListItem:function(oEvent){
               var oContext = oEvent.getSource().getBindingContext("ProductJSONModel");
               if(!this._oDialog){
                this.loadFragment({
                    name:"com.test.jsonmodeldemoapp.fragment.ProductDetail"
                }).then(function(oDialog){
                    this._oDialog=oDialog;
                    this._oDialog.bindElement({ //pass the binding information to the dialog control
                        path:oContext.getPath(),
                        model:"ProductJSONModel"
                    });
                    this._oDialog.open();
                }.bind(this));
               }
               else{
                this._oDialog.bindElement({
                    path:oContext.getPath(),
                    model:"ProductJSONModel"
                });
                this._oDialog.open();
               }

            },
            onCloseDialog:function(){
                this._oDialog.close();
            }
        });
    });
