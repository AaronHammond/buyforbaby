BuyForBaby.Views = BuyForBaby.Views || {};

(function () {
    'use strict';

    BuyForBaby.Views.CompleteList = Backbone.View.extend({

        template: templates['completelist'],

        tagName: 'div',

        id: 'innerCompleteListContainer',

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
                var it = new BuyForBaby.Views.FulfilledItem({ model: m });
                self.$el.find('#completedItems').append(it.render().el);
            });

            this.$('.quant-spinner .quant').on('focus', function(e) {
                $(e.currentTarget).find('input').focus();
            });


            return this;
        }

    });

})();
