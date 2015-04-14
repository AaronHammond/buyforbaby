BuyForBaby.Views = BuyForBaby.Views || {};

(function () {
    'use strict';

    BuyForBaby.Views.FulfilledItem = Backbone.View.extend({

        template: templates['fulfilledItem'],

        tagName: 'div',

        id: '',

        className: 'row fulfilledItem vertically-aligned',

        events: {
        },

        

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})();
