/*global BuyForBaby, Backbone*/

BuyForBaby.Collections = BuyForBaby.Collections || {};

(function () {
    'use strict';

    var ParseBackedWishlist = Parse.Object.extend("Wistlist");

    BuyForBaby.Collections.Wishlist = Backbone.Collection.extend({

        model: BuyForBaby.Models.DesiredItem,

        initialize: function(items, options) {
        	var vent = BuyForBaby.EventBus;

        	vent.bind('addCataloguedItem', this.addCataloguedItem, this);
        	vent.bind('removeCataloguedItem', this.removeCataloguedItem, this);

            if(options.parseBackId) {
                var query = new Parse.Query(ParseBackedWishlist);

                var self = this;
                query.get(options.parseBackId, {
                  success: function(cloud) {
                    self.add(cloud.get("items"));
                    self.each(function(o) {
                        $('div[x-wishlist-collection-id=' + o.get('catalogueId') + ']').addClass("added").removeClass('eligible');
                    });

                    self.parseBack = cloud;
                  },
                  error: function(object, error) { }
                });
            } else {
                this.parseBack = new ParseBackedWishlist();
                this.parseBack.set("ownerFirstname", options.firstName);
                this.parseBack.set("ownerLastname", options.lastName);
                this.parseBack.set("registryName", options.registryName);
                this.parseBack.set("items", []);

                this.parseBack.save(null, {
                    success: options.successCallback,
                    error: function(o, error) {
                        console.log(error);
                    }
                });
            }

            this.bind('change add remove reset', this.change);
        },

        addCataloguedItem: function(citem) {
        	var newDesiredItem = new BuyForBaby.Models.DesiredItem({
        		catalogueId: citem.cid,
        		image: citem.get('image'),
        		name: citem.get('name'),
        		quantity: 1,
        		favorited: false,
        		comment: "",
        		fulfilledQuantity: 0,
                price: citem.get('price'),
                source: citem.get('source'),
                link: citem.get('link'),
                gifters: [{name: "Joe", qty: "1"}]
        	});
        	this.add(newDesiredItem);
        },

        removeCataloguedItem: function(citem) {
        	this.remove(this.findWhere({ catalogueId: citem.cid }));

            
        },

        change: function() {
            if(this.parseBack) {
                this.parseBack.set("items", this.toJSON());
                this.parseBack.save();
            }
            
        }

    });

})();
