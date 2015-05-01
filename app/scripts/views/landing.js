BuyForBaby.Views = BuyForBaby.Views || {};

(function () {
    'use strict';

    BuyForBaby.Views.Landing = Backbone.View.extend({

        template: templates['landing'],

        tagName: 'div',

        id: 'landing-banner',

        className: '',

        events: {
            "click #about": "goToAboutSection",
            "click #team": "goToTeamSection"
        },
        
        render: function() {
            this.$el.html(this.template());
          return this;
        },

        goToAboutSection: function() {
            var aboutSection = $(document).height() - $(window).height()*2 +120;
            $("html, body").animate({scrollTop: aboutSection}, "slow");
        },

        goToTeamSection: function() {
            $("html, body").animate({scrollTop: $(document).height()}, "slow");
        },
    });

})();
