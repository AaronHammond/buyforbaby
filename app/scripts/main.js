window.BuyForBaby = Backbone.Router.extend({
    Models: {},
    Collections: {},
    Views: {},
    

    routes: {
        "": "viewLandingPage",
        "catalogue": "viewCatalogue",
        "wishlist": "viewWishlist"
    },

    initialize: function () {
        'use strict';
        console.log('Hello from Backbone!');

        // create a global eventbus (inspired by http://spin.atomicobject.com/2012/04/16/lets-talk-an-eventbus-in-backbone-js/)
        BuyForBaby.EventBus = _.extend({}, Backbone.Events)

        this.wishlist = new BuyForBaby.Collections.Wishlist([]);
        this.catalogue = loadData();
    
        
    },

    viewCatalogue: function() {
        $('#wishlist').html(new BuyForBaby.Views.Wishlist({ model: this.wishlist }).render().$el);
        $('#giftlist').html(new BuyForBaby.Views.Catalogue({ model: this.catalogue }).render().$el);

        $('body > section.open').fadeOut('slow', function() {
            var fix_height = function() {
                var max_height = 0;
                $('.tab-pane').each(function(i, o) {
                    if($(o).height() > max_height) {
                        max_height = $(o).height();
                    }
                })
                //$('#content').css('max-height', max_height + 115);
            }

            $('#mainPage').fadeIn('slow', function() {
                fix_height();
            }).addClass('open');

            
            $(window).off('resize').on('resize', fix_height);
            
        }).removeClass('open');

        $('#doneButton').off().on('click', function() {
            app.navigate('wishlist', {trigger: true});
        });

        $('#logoText').off().on('click', function() {
            app.navigate('wishlist', {trigger: true});
        });

    },

    viewLandingPage: function() {
        $('#banner').html(new BuyForBaby.Views.Landing().render().$el);

        $('body > section.open').fadeOut('slow', function() {
            $('#landingPage').fadeIn('slow', function() {

                $('#findRegistry').off().on('click', function() {
                    $('form.registration.open').fadeOut('slow', function() {
                        $('form.registration.guests').fadeIn('slow').addClass('open');
                    }).removeClass('open');
                });

                $('#createRegistry').off().on('click', function() {
                    $('form.registration.open').fadeOut('slow', function() {
                        $('form.registration.parents').fadeIn('slow').addClass('open');
                    }).removeClass('open');
                });

                $('form').off().on('submit', function(e) {
                    e.preventDefault();

                    app.navigate('catalogue', {trigger: true});
                });

            }).addClass('open');
        }).removeClass('open');
    },
    
    viewWishlist: function() {
        $('#completelist').html(new BuyForBaby.Views.CompleteList({ model: this.wishlist }).render().$el);
        $('body > section.open').fadeOut('slow', function() {
            $('#completelistpage').fadeIn('slow', function() {
                

            }).addClass('open');
        }).removeClass('open');

        $('#editButton').off().on('click', function(e) {
            app.navigate('catalogue', {trigger: true});
            e.stopPropagation();
        });

        $('#logoText').off().on('click', function() {
            app.navigate('wishlist', {trigger: true});
        });
    }
});

$(document).ready(function () {
    'use strict';
    window.app = new BuyForBaby();
    Backbone.history.start();
});


// load some random data

function loadData() {
    var clothings = ['Pants', 'Shirts', 'Sweaters'];
    var cats = [];
    for(var c in clothings) {
        var cat = clothings[c];

        
        var items = [new BuyForBaby.Models.Item({
                name: 'generic ' + cat, 
                image: 'images/Generic' + cat + '.jpg'
            })];
        for(var i = 0; i < 5; i++) {
            var randomItem = new BuyForBaby.Models.Item({
                name: cat + ' ' + i,
                image: 'images/' + cat + '_' + i + '.jpg'
            });
            items.push(randomItem);
        }
        var newCat = new BuyForBaby.Models.Category({
            containedItems: new Backbone.Collection(items),
            name: cat
        });
        cats.push(newCat)
    }
    var clothing = new BuyForBaby.Models.Metacategory({
        categories: new Backbone.Collection(cats),
        name: 'Clothing',
        icon: "glyphicon-sunglasses"
    });

    var toys = ['Rattles', 'Balls', 'Blocks'];
    var cats = [];
    for(var c in toys) {
        var cat = toys[c];

        
        var items = [new BuyForBaby.Models.Item({
                name: 'generic ' + cat, 
                image: 'images/Generic' + cat + '.jpg'
            })];
        for(var i = 0; i < 5; i++) {
            var randomItem = new BuyForBaby.Models.Item({
                name: cat + ' ' + i,
                image: 'images/' + cat + '_' + i + '.jpg'
            });
            items.push(randomItem);
        }
        var newCat = new BuyForBaby.Models.Category({
            containedItems: new Backbone.Collection(items),
            name: cat
        });
        cats.push(newCat)
    }
    var toy = new BuyForBaby.Models.Metacategory({
        categories: new Backbone.Collection(cats),
        name: 'Toys',
        icon: "glyphicon-piggy-bank"
    });

    var hygienes = ['Bottles', 'Bibs', 'Wipes'];
    var cats = [];
    for(var c in hygienes) {
        var cat = hygienes[c];

        
        var items = [new BuyForBaby.Models.Item({
                name: 'generic ' + cat, 
                image: 'images/Generic' + cat + '.jpg'
            })];

        for(var i = 0; i < 5; i++) {
            var randomItem = new BuyForBaby.Models.Item({
                name: cat + ' ' + i,
                image: 'images/' + cat + '_' + i + '.jpg'
            });
            items.push(randomItem);
        }
        var newCat = new BuyForBaby.Models.Category({
            containedItems: new Backbone.Collection(items),
            name: cat
        });
        cats.push(newCat)
    }
    var hygiene = new BuyForBaby.Models.Metacategory({
        categories: new Backbone.Collection(cats),
        name: 'Hygiene',
        icon: "glyphicon-baby-formula"
    });

    var catalogue = new BuyForBaby.Collections.Catalogue([clothing, toy, hygiene]);
    return catalogue;
}
