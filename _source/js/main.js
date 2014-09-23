/**
 * KPN INSPIRE
 *
 * @date [30.08.2013]
 * @version [version e.g. 0.1]
 * @author [Pim van Ooij - LBI Lostboys]
 *
 */

if (!('console' in window) || !window.console.log) {
    window.console = {
        log : function() {
        }
    };
}

var settings;

(function($) {

    window.INSPIRE = {

    version : 0.1,
    touch: !!('ontouchstart' in window),
    logEl: '#notification',
    logEvent : 'show-message',
        // Main settings...
        settings: {
            'debug' : true
        },

        // Main intialization...
        init: function() {
            this.createCacheItems();
            this.initNavSummary();
            this.initBoxClick();
            this.initFollow();
            this.initKudos();
            this.initCarousel();
            this.initLoadMore();
            
            this.initIsotope();
            this.initBoxExtraInfo('.boxes');
            this.initInfoEventsList('.event-list-wrapper');
            this.initInfoEventsHeader('.static-header-visual-wrapper');

            this.initBackButton();
            this.initSearchResults();
            this.initContentPageTabs();
        },

        createCacheItems: function() {
            this.subNav = $('nav[role="sub-nav"]');
        },

        initNavSummary: function() {
            if(!this.touch) {
                this.subNav.on('mouseover','li',function(e) {
                    el =  $(this).closest('div');
                    el.find('.summary').hide();
                    el.find('div[data-summary="' + $(this).attr('data-summary') + '"]').show()
                });
                this.subNav.on('mouseleave','li[data-summary]',function(e) {
                    el =  $(this).closest('div');
                    el.find('div[data-summary="' + $(this).attr('data-summary') + '"]').hide();
                    el.find('.summary').last().show()
                });
            } else {
                //touch device
                this.subNav.on('click','li',function(e) {
                    el =  $(this).closest('a');
                    var url = el.attr('data-url');
                    if(url !== undefined && url.length > 0) {
                        window.location = url;
                    }
                });
            }
        },

        initIsotope: function() {
            var container = $('.boxes');
            if(container.length > 0) {
                this.isotope = container.isotope({
                    itemSelector : '.box',
                    layoutMode : 'masonry',
                    //first item bug
                     masonry: {
                        columnWidth: 0
                    },
                    animationOptions: {
                        duration: 150,
                        queue: true
                    },
                    animationEngine: 'best-available',
                    resizable: true
                });
                
                // delay to get good window height for relayout 
                setTimeout(function() {
                    INSPIRE.isotope.isotope('reLayout');

                }, 500);

                //On window resize, do relayout
                $( window ).resize(function() {
                  INSPIRE.isotope.isotope('reLayout');
                });
            }
            
        },

        initBoxClick: function() {
            
            $('.box').on('click',function(){
                var url = $(this).attr('data-url');
                if(url !== undefined && url.length > 0) {
                    window.location = url;
                }
            });
        },

        initFollow: function() {
            var settings = {
                'selector' : '.btn-follow',
                'logEl' : this.logEl,
                'logEvent' : this.logEvent
            };
            this.followButtons = new INSPIRE.Follow(settings);
        },
        
        initKudos: function() {
            var settings = {
                'selector' : '.btn-kudos',
                'logEl' : this.logEl,
                'logEvent' : this.logEvent
            };
            this.kudosButtons = new INSPIRE.Kudos(settings);
        },

        initBoxExtraInfo : function(scope) {
            var found = false;
            $(scope).find('article.box').each( function() {
                var source = $(this).find('figure ul');
                var target = $(this).find('div.meta');
                
                //found them?
                if(source.length > 0 && target.length > 0) {
                  if( target.find('ul li').length > 0) {
                    $(this).find('figure ul li').insertBefore( $(this).find('div.meta ul li').first());
                  } else {
                    target.append(source);
                    found = true;
                  }
                  found = true;
                }
              
            });
            if(found) {
              INSPIRE.isotope.isotope('reLayout');
            }
        },

        initInfoEventsList : function(scope) {

            $(scope).find('ul.event-list li').each( function() {
                var source = $(this).find('figure ul');
                var target = $(this).find('div.info-txt');
                
                //found them?
                if(source.length > 0 && target.length > 0) {
                  if( target.find('ul li').length > 0) {
                    $(this).find('figure ul li').insertBefore( $(this).find('div.info-txt ul li').first());
                  } else {
                    target.append(source);
                  }
                }
            });
        },

        initInfoEventsHeader : function(scope) {

            $(scope).find('.static-header-visual').each( function() {

                var source = $(this).find('figure ul');
                var target = $(this).find('div.info-txt');
                
                //found them?
                if(source.length > 0 && target.length > 0) {
                  if( target.find('ul li').length > 0) {
                    $(this).find('figure ul li').insertBefore( $(this).find('div.info-txt ul li').first());
                  } else {
                    target.append(source);
                  }
                }
            });
        },

        initCarousel: function() {
            // SETTINGS
            var cfg = {
                carouselItemSelector: '.carousel--item',
                carouselItemActivestateClass: 'active',
                //pagination
                carouselPaginationSelector: '.carousel--pagination',
                carouselPaginationItem: 'a',
                paginationActiveClass: 'active',
                paginationActiveStateElSelector: 'li',
                //global
                animationSpeed: 500,
                timerSpeed: 5000,
                dataAtributeTimer: 'data-timer',
                dataAtributeSetText: 'data-set-text',
                dataAtributeSetTextTarget: 'data-set-text-target'
            };
            this.headCarousel = new INSPIRE.Carousel($('.carousel'),cfg);
        },

        initLoadMore: function() {
          if($('.btn-load-more a').length > 0) {
            this.loadMore = new INSPIRE.Loadmore($('.btn-load-more a'));
          }
        },

        initBackButton: function() {
            $('a.back')
                .off('click')
                .on('click', function(e) {
                    e.preventDefault();
                    history.go(-1);
                });
        },
        
        initSearchResults: function() {
            var inspiratorIcons = $('.search-results-list figure.inspirator');
            inspiratorIcons.each(function(i) {
                var a = $(this).find('a');
                var img = $(this).find('img');
                var borderRadius = 4; // a.css('border-radius');
                img.css({
                    'left': (((a.width() - img.width()) / 2) + borderRadius) + 'px',
                    'top': (((a.height() - img.height()) / 2) + borderRadius) + 'px'
                });
            });
        },

        initContentPageTabs:function(){

            var tab1 = $('.btn-first');
            var tab2 = $('.btn-last');
            var comment = $('.comment');
            var related = $('.related');
            comment.hide();
            related.show();

            tab1.on('click', function(e){
                e.preventDefault();
                comment.show();
                related.hide();
                $(this).addClass('active');
                tab2.removeClass('active');
                
            });
            tab2.on('click', function(e){
                e.preventDefault();
                comment.hide();
                related.show();
                $(this).addClass('active');
                tab1.removeClass('active');
            });
        }
    };
    $(function() {
        INSPIRE.init();
    });
}(window.jQuery));