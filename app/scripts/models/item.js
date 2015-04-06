/*global BuyForBaby, Backbone*/

BuyForBaby.Models = BuyForBaby.Models || {};

(function () {
    'use strict';

    BuyForBaby.Models.Item = Backbone.Model.extend({

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
