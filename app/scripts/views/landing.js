BuyForBaby.Views = BuyForBaby.Views || {};

(function () {
    'use strict';

    BuyForBaby.Views.Landing = Backbone.View.extend({

        template: templates['landing'],

        tagName: 'div',

        id: 'landing-banner',

        className: '',

        events: {
            "click #about": "goToAboutSection"
        },
        
        render: function() {
            this.$el.html(this.template());
          return this;
        },

        goToAboutSection: function() {
            $("html, body").animate({scrollTop: $(document).height()}, "slow");
        }
    });

})();
