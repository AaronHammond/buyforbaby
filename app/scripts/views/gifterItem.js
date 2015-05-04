BuyForBaby.Views = BuyForBaby.Views || {};

(function () {
    'use strict';

    BuyForBaby.Views.GifterItem = Backbone.View.extend({

        template: templates['gifterItem'],

        tagName: 'div',

        id: '',

        className: 'row gifterItem vertically-aligned',

        events: {
            'click #giftme': 'giftMe',
            'click #confirmGiftMe': 'confirmGiftMe'
        },

        

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.model.set('remaining', this.model.get('quantity') - this.model.get('fulfilledQuantity'));
            this.model.set('registryTitle')
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            if(this.model.get('remaining') <= 0) {
                this.$("#giftme").hide();
                this.$("#thankYou").fadeIn("slow", function() {});
            }
            return this;
        },

        giftMe: function() {
            var self = this;
            this.$('#giftme').fadeOut("slow", function() {
                self.$(".form-horizontal").fadeIn("slow", function() {

                });
            });
        },

        confirmGiftMe: function() {
            var name = this.$('#inputName').val();
            var qty = Number(this.$("#inputQuantity").val());

            this.model.get("gifters").push({ name: name, qty: qty });
            this.model.set("fulfilledQuantity", this.model.get("fulfilledQuantity") + qty);
            this.model.set('remaining', this.model.get('quantity') - this.model.get('fulfilledQuantity'));

            this.render();
            this.$("#giftme").hide();
            this.$("#thankYou").fadeIn("slow", function() {});
        }

    });

})();
