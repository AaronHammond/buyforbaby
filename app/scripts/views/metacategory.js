BuyForBaby.Views = BuyForBaby.Views || {};

(function () {

    BuyForBaby.Views.Metacategory = Backbone.View.extend({

        template: templates['metacategory'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            var self = this;
            this.model.get('categories').forEach(function (m) {
                var cat = new BuyForBaby.Views.Category({model: m});
                self.$el.find('#categoryContainer').append(cat.render().el);
            });

            return this;
        }

    });

})();
