BuyForBaby.Views = BuyForBaby.Views || {};

(function () {

    BuyForBaby.Views.Category = Backbone.View.extend({

        template: templates['category'],

        tagName: 'div',

        id: '',

        className: 'row vertically-aligned',

        events: {
            'click #advance': "advanceCarousel",
            'click #retreat': "retreatCarousel"
        },

        initialize: function (props) {
            this.listenTo(this.model, 'change', this.render);
        },

        carouselPosition: 0,

        advanceCarousel: function() {
            this.carouselPosition+=1;
            this.updateCarousel();
        },

        retreatCarousel: function() {
            this.carouselPosition-=1;
            this.updateCarousel();
        },

        updateCarousel: function() {
            var offsetInc = 100 / (this.model.get('containedItems').length);
            var $firstItem = $(this.$el.find('.categorizedItem')[0]);
            var offset = -1 * (this.carouselPosition * offsetInc);
            $firstItem.animate({'margin-left': offset + '%'});

            if (this.carouselPosition <= 0) {
                this.$('#retreat').attr('disabled', true);
            } else {
                this.$('#retreat').attr('disabled', false);
            }
            if (this.carouselPosition >= (this.model.get('containedItems').length - 3)){
                this.$('#advance').attr('disabled', true);
            } else {
                this.$('#advance').attr('disabled', false);
            }
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            var self = this;
            this.model.get('containedItems').forEach(function(m) {
                var item = new BuyForBaby.Views.Item({model: m});
                self.$el.find('#items').append(item.render().$el);
            });

            this.$el.find('#items').css('width', Math.ceil(33.3333 * this.model.get('containedItems').length) + '%');
            this.$el.find('.categorizedItem').css({
                display: "inline-block",
                width: 100 / (this.model.get('containedItems').length) + '%'
            });

            this.updateCarousel();

            return this;
        }

    });

})();
