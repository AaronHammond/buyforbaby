BuyForBaby.Views = BuyForBaby.Views || {};

(function () {
    'use strict';

    BuyForBaby.Views.Wishlist = Backbone.View.extend({

        template: templates['wishlist'],

        tagName: 'div',

        id: 'innerWishlistContainer',

        className: '',

        events: {},
        
        initialize: function () {
            this.listenTo(this.model, 'add', function() {
                this.render();
                this.$('#wishedItems').animate( { scrollTop: 2000 }, 2000);
            });
            this.listenTo(this.model, 'remove', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            var self = this;
            this.model.forEach(function(m) {
                var it = new BuyForBaby.Views.DesiredItem({ model: m });
                self.$el.find('#wishedItems').append(it.render().el);
            });

            this.$('.quant-spinner .quant').on('focus', function(e) {
                $(e.currentTarget).find('input').focus();
            });


            return this;
        }

    });

})();
