BuyForBaby.Views = BuyForBaby.Views || {};

(function () {
    'use strict';

    BuyForBaby.Views.GifterList = Backbone.View.extend({

        template: templates['gifterlist'],

        tagName: 'div',

        id: 'innerGifterListContainer',

        className: '',

        events: {},
        
        initialize: function () {
            this.listenTo(this.model, 'add', this.render);
            this.listenTo(this.model, 'remove', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            var self = this;
            this.model.forEach(function(m) {
                var it = new BuyForBaby.Views.GifterItem({ model: m });
                self.$el.find('#completedItems').append(it.render().el);
            });

            return this;
        }

    });

})();
