BuyForBaby.Views = BuyForBaby.Views || {};

(function () {
    'use strict';

    BuyForBaby.Views.DesiredItem = Backbone.View.extend({

        template: templates['desiredItem'],

        tagName: 'div',

        id: '',

        className: 'row',

        events: {
            'click .quantUp' : "changeQuantity",
            'click .quantDown' : "changeQuantity",
            'change .quant input' : 'changeQuantity',
            'click .favoriting': "changeFavorited",
            'transitionend .item-remover': "removeItem"
        },

        changeFavorited: function(e) {
            $(e.currentTarget).toggleClass('active');
            if($(e.currentTarget).hasClass('active')) {
                this.model.set('favorited', true);
            } else {
                this.model.set('favorited', false);
            }
        },

        changeQuantity: function(e) {
            var currQuant = Number(this.$('.quant input').val());
            if($(e.currentTarget).hasClass('quantUp')) {
               this.$('.quant input').val(currQuant+1);
            } else if ($(e.currentTarget).hasClass('quantDown')) {
                if (currQuant <= 1) {
                    this.$('.item-remover').addClass('shakey');
                    var self = this;
                    // jiggle the trash icon
                    var jiggle = function (i) {
                        if(i > 0) {
                            self.$('.item-remover').animate({
                                "margin-right": "10px"
                            }, 200, function() {
                                self.$('.item-remover').animate({
                                    "margin-right": "-10px"
                                }, 200, jiggle.bind(null, i-1));
                            });
                        } else {
                            self.$('.item-remover').animate({
                                    "margin-right": "0px"
                            }, 200);
                        }
                    };

                    jiggle(3);
                    
                } else {
                    this.$('.quant input').val(currQuant-1);
                }
            }
            var newQuant = this.$('.quant input').val();
            this.model.set('quantity', newQuant);
        },

        removeItem: function(e) {
            if(this.$('.item-remover:active').length) {
                this.vent.trigger('removeDesiredItem', this.model);
            }  
        },

        initialize: function () {
            this.vent = BuyForBaby.EventBus;
            
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})();
