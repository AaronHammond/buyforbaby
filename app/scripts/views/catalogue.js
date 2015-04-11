BuyForBaby.Views = BuyForBaby.Views || {};

(function () {

    BuyForBaby.Views.Catalogue = Backbone.View.extend({

        template: templates['catalogue'],

        tagName: 'div',

        id: 'innerGiftlistContainer',

        className: '',

        events: {
            'click #navTabs li': "changeMetacategory"
        },

        changeMetacategory: function(e) {
            e.preventDefault();
            this.$(e.currentTarget).find('a').tab('show');
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            var self = this;

            
            this.model.forEach(function(m) {
                var tab = $('<li>').attr('role', 'presentation').append(
                    $('<span>').addClass('glyphicon glyphicon-sunglasses')
                ).append(
                    $('<a>').attr('href', '#' + m.get('name')).attr('aria-controls', m.get('name')).attr('role', 'tab').attr('data-toggle', 'tab').text(m.get('name'))
                );

                self.$el.find('#navTabs').append(tab);

                var pane = $('<div>').attr('role', 'tabpanel').addClass('tab-pane').attr('id', m.get('name')).html(
                    new BuyForBaby.Views.Metacategory({
                        model: m
                    }).render().el
                );
                self.$el.find('#tabContents').append(pane);
            });
            $(this.$el.find('#navTabs li')[0]).addClass('active');
            $(this.$el.find('#tabContents > div')[0]).addClass('active');
            
            return this;
        }

    });

})();
