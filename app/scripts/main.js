window.BuyForBaby = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');


        // create a global eventbus (inspired by http://spin.atomicobject.com/2012/04/16/lets-talk-an-eventbus-in-backbone-js/)
        BuyForBaby.EventBus = _.extend({}, Backbone.Events)

        var wishlist = new BuyForBaby.Collections.Wishlist([]);
        $('#wishlist').html(new BuyForBaby.Views.Wishlist({ model: wishlist }).render().$el);

        var catalogue = loadRandomData();
        $('#giftlist').html(new BuyForBaby.Views.Catalogue({ model: catalogue }).render().$el);
    
        var fix_height = function() {
            var max_height = 0;
            $('.tab-pane').each(function(i, o) {
                if($(o).height() > max_height) {
                    max_height = $(o).height();
                }
            })
            $('#content').css('max-height', max_height + 115);
        }
        $(window).on('resize', fix_height);
        fix_height();
        
    }
};

$(document).ready(function () {
    'use strict';
    BuyForBaby.init();
});


// load some random data

function loadRandomData() {
    var clothings = ['Pants', 'Shirts', 'Sweaters'];
    var cats = [];
    for(var c in clothings) {
        var cat = clothings[c];

        
        var items = [];
        for(var i = 0; i < 5; i++) {
            var randomItem = new BuyForBaby.Models.Item({
                name: cat + ' ' + i,
                image: 'images/pants.jpg'
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
        name: 'Clothing'
    });

    var toys = ['Rattles', 'Balls', 'Blocks'];
    var cats = [];
    for(var c in toys) {
        var cat = toys[c];

        
        var items = [];
        for(var i = 0; i < 5; i++) {
            var randomItem = new BuyForBaby.Models.Item({
                name: cat + ' ' + i,
                image: 'images/pants.jpg'
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
        name: 'Toys'
    });

    var hygienes = ['Bottle', 'Bib', 'Baby Wipes'];
    var cats = [];
    for(var c in hygienes) {
        var cat = hygienes[c];

        
        var items = [];
        for(var i = 0; i < 5; i++) {
            var randomItem = new BuyForBaby.Models.Item({
                name: cat + ' ' + i,
                image: 'images/pants.jpg'
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
        name: 'Hygiene'
    });

    var catalogue = new BuyForBaby.Collections.Catalogue([clothing, toy, hygiene]);
    return catalogue;
}
