/*global BuyForBaby, Backbone*/

BuyForBaby.Models = BuyForBaby.Models || {};

(function () {
    'use strict';

    BuyForBaby.Models.DesiredItem = Backbone.Model.extend({

        url: '',

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
