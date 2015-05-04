Parse.initialize("3P7ymFd28OAzQc0LX0LQv6whphN78063JYatUJeI", "jqOFs6HBeByT1VHEkUipeUFcqrPd53wfa55KIbFu");

// cookie function borrowed from http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

window.BuyForBaby = Backbone.Router.extend({
    Models: {},
    Collections: {},
    Views: {},
    

    routes: {
        "": "viewLandingPage",
        "catalogue": "viewCatalogue",
        "wishlist": "viewWishlist",
        "gifter": "viewGifterList"
    },

    initialize: function () {
        'use strict';
        console.log('Hello from Backbone!');

        // create a global eventbus (inspired by http://spin.atomicobject.com/2012/04/16/lets-talk-an-eventbus-in-backbone-js/)
        BuyForBaby.EventBus = _.extend({}, Backbone.Events)

        this.catalogue = loadData();

        this.loadExistingWishlist();
    },

    loadExistingWishlist: function() {
        var wishlistId = getCookie("wishlist");
        //wishlistId = "ncbg1U8mtn";
        if(wishlistId != "") {
            this.wishlist = new BuyForBaby.Collections.Wishlist([], {
                parseBackId: wishlistId
            });
        } else {
            window.location.hash = "";
        }
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

        var self = this;
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

                    self.wishlist = new BuyForBaby.Collections.Wishlist([], {
                        firstName: $('#inputFirstName').val(),
                        lastName: $('#inputFirstName').val(),
                        registryName: $('#inputTitle').val(),
                        successCallback: function(wishlist) {
                            console.log(wishlist);
                            document.cookie="wishlist=" + wishlist.id;
                            app.navigate('catalogue', {trigger: true});
                        }
                    });

                    
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
    },

    viewGifterList: function() {
        $('#gifterlist').html(new BuyForBaby.Views.GifterList({ model: this.wishlist }).render().$el);

        $('#gifterlistpage').fadeIn('slow', function() {
        }).addClass('open');

        $('#logoText').off().on('click', function() {
            app.navigate('gifter', {trigger: true});
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
                image: 'images/Generic' + cat + '.jpg',
                source: "Any store",
                price: "Any price"
            })];
        for(var i = 0; i < 5; i++) {
            var randomItem = new BuyForBaby.Models.Item({
                name: cat + ' ' + i,
                image: 'images/' + cat + '_' + i + '.jpg',
                source: "Amazon",
                link: "http://www.amazon.com/derp",
                price: "$15"
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
                image: 'images/Generic' + cat + '.jpg',
                source: "Any store",
                price: "Any price"
            })];
        for(var i = 0; i < 5; i++) {
            var randomItem = new BuyForBaby.Models.Item({
                name: cat + ' ' + i,
                image: 'images/' + cat + '_' + i + '.jpg',
                source: "Amazon",
                link: "http://www.amazon.com/derp",
                price: "$15"
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
                image: 'images/Generic' + cat + '.jpg',
                source: "Any store",
                price: "Any price"
            })];

        for(var i = 0; i < 5; i++) {
            var randomItem = new BuyForBaby.Models.Item({
                name: cat + ' ' + i,
                image: 'images/' + cat + '_' + i + '.jpg',
                source: "Amazon",
                link: "http://www.amazon.com/derp",
                price: "$15"
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
