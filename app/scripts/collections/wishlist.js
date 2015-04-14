/*global BuyForBaby, Backbone*/

BuyForBaby.Collections = BuyForBaby.Collections || {};

(function () {
    'use strict';

    BuyForBaby.Collections.Wishlist = Backbone.Collection.extend({

        model: BuyForBaby.Models.DesiredItem,

        initialize: function() {
        	var vent = BuyForBaby.EventBus;

        	vent.bind('addCataloguedItem', this.addCataloguedItem, this);
        	vent.bind('removeCataloguedItem', this.removeCataloguedItem, this);
        },

        addCataloguedItem: function(citem) {
        	var newDesiredItem = new BuyForBaby.Models.DesiredItem({
        		catalogueId: citem.cid,
        		image: citem.get('image'),
        		name: citem.get('name'),
        		quantity: 1,
        		favorited: false,
        		comment: "",
        		fulfilledQuantity: 0
        	});
        	this.add(newDesiredItem);
        },

        removeCataloguedItem: function(citem) {
        	this.remove(this.findWhere({ catalogueId: citem.cid }));
        }

    });

})();
