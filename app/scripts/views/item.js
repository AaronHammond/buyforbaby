BuyForBaby.Views = BuyForBaby.Views || {};

(function () {
    'use strict';

    BuyForBaby.Views.Item = Backbone.View.extend({

        template: templates['item'],

        tagName: 'div',

        id: '',

        className: 'categorizedItem eligible',

        events: {
            'click .item-adder': "addItem",
            'transitionend .item-remover': "removeItem"
        },

        removeItem: function(e, override) {
            if((this.$el.hasClass('added') && this.$('.item-remover:active').length) || override) {
                this.$el.removeClass('added');

                var self = this;
                if(!override) {
                    this.$el.one('mouseleave', function(e) {
                        self.$el.addClass('eligible');
                    });
                } else {
                    this.$el.addClass('eligible');
                }
                

                this.vent.trigger('removeCataloguedItem', this.model);
            }  
        },

        addItem: function (e) {
            this.$el.removeClass('eligible');
            this.$el.addClass('added');

            this.vent.trigger('addCataloguedItem', this.model);
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);

            this.vent = BuyForBaby.EventBus;


            this.vent.bind('removeDesiredItem', function(ditem) {
                if(this.model.cid == ditem.get('catalogueId')) {
                    this.removeItem(null, true);
                }
            }, this);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            if(app.wishlist.findWhere({catalogueId: this.model.cid})) {
                this.$el.removeClass('eligible');
                this.$el.addClass('added');
            }

            this.$el.attr('x-wishlist-collection-id', this.model.cid);

            return this;
        }

    });

})();
