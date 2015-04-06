/*global BuyForBaby, Backbone*/

BuyForBaby.Collections = BuyForBaby.Collections || {};

(function () {
    'use strict';

    BuyForBaby.Collections.Catalogue = Backbone.Collection.extend({

        model: BuyForBaby.Models.Metacategory

    });

})();
