/**
 * [INSPIRE.carousel]
 *
 * @date        [29.10.2013]
 * @version     [version e.g. 0.1]
 * @author      [Pim van Ooij] - LBi Lost Boys
 */
/* <!!-->  Check to prevent error when INSPIRE is not defined */
    if(!window.INSPIRE) { window.INSPIRE = {}; } /*
</--!!> */
(function ($) {
    var el, index;
    var Carousel = INSPIRE.Carousel = function () {
        if (arguments.length) {
            this.init.apply(this, arguments);
        }
    };

    //settings
    Carousel.prototype.settings = {
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

    //init
    Carousel.prototype.init = function (el, settings) {
        this.settings = $.extend({}, this.settings, settings || {});
        this.carousel = $(el);
        if(this._checkCarousel() && this.createCacheItems()) {
            //start the magic
            this.bind();
            this.activeItem = this._initialItem();
            this.upcomingItem = this.activeItem;
            this.openItem();
            if(this.settings.timer == 'true') {
                this.setTimer();
            }
            if(this.carousel.attr(this.settings.dataAtributeSetText) == 'true') {
                this.setText = true;
                this.setTextTarget = this.carousel.find('[' + this.settings.dataAtributeSetTextTarget + ']');
            } else {
                this.setText = false;
            }
        }
    },

    Carousel.prototype._checkCarousel = function() {
        if(this.carousel.find(this.settings.carouselItemSelector).length > 0) {
            return true;
        }
        return false;
    },

    Carousel.prototype.createCacheItems = function() {
        this.items = this.carousel.find(this.settings.carouselItemSelector);
        this.amountItems = this.items.length;
        this.pagination = this.carousel.find(this.settings.carouselPaginationSelector);
        this.paginationItems = this.pagination.find(this.settings.carouselPaginationItem);
        //settings and done flag
        this.settings.timer = this.carousel.attr(this.settings.dataAtributeTimer);
        return true;
    },

    Carousel.prototype._initialItem = function() {
        this.newIndex = 0;
        this.setPaginationState(0);
        return $(this.items[0]);
    },

    Carousel.prototype._getNewActiveIndex = function(el) {
        return this.paginationItems.index(el);
    },

    Carousel.prototype.selectItem = function(el) {
        this.newIndex = this._getNewActiveIndex(el);
        if(this.newIndex !== this.activeIndex) {
            this.upcomingItem = $(this.items[this.newIndex]);
            this.openItem();
        }
    },

    Carousel.prototype.openItem = function() {
        //current item lower z index
        this.activeItem.css({
            zIndex:1
        });
        //new item higher z index
        this.upcomingItem.css({
            zIndex:2
        }).show();
        //fade new item
        TweenLite.fromTo(
            this.upcomingItem,
            this.settings.animationSpeed/1000, {
                css: {
                    opacity: 0
                }
            },
            {
                css: {
                    opacity: 1
                },
                onComplete: function () {
                    if(this.activeItem !== this.upcomingItem) {
                        this.activeItem.hide(0);
                    }
                    this.activeItem = this.upcomingItem;
                    this.activeIndex = this.newIndex;
                    if(this.setText === true) {
                        this.setTextTarget.text(this.activeItem.attr('alt'));
                    }
                }.bind(this)
            }
        );
    },

    Carousel.prototype.bind = function() {
        this.paginationItems.on('click',function(e){
            e.preventDefault();
            el = $(e.currentTarget);
            this.nextItem = this.selectItem(el);
            this.setPaginationState();
            //clear time
            clearInterval(this.timer);
        }.bind(this));
    },

    Carousel.prototype._getTimerIndex = function() {
        if(this.newIndex !== (this.amountItems - 1)) {
            index = this.newIndex + 1;
        } else {
            index = 0;
        }
        return index;
    },

    Carousel.prototype.setPaginationState = function(index) {
        if(!index) {
            index = this.newIndex;
        }
        //set active class at the right pagination bullit
        this.pagination.find(this.settings.paginationActiveStateElSelector)
            .removeClass(this.settings.paginationActiveClass);
        $(this.paginationItems[index]).closest(this.settings.paginationActiveStateElSelector)
            .addClass(this.settings.paginationActiveClass);
    },

    Carousel.prototype.setTimer = function() {
        this.timer = setInterval(function() {
            this.newIndex = this._getTimerIndex();
            this.upcomingItem = $(this.items[this.newIndex]);
            this.openItem();
            this.setPaginationState();
        }.bind(this), this.settings.timerSpeed);
    },

     $.fn.carousel = function (settings) {
        $(this).each(function () {
            $(this).data('lib-Carousel', new Carousel(this, settings));
        });
    };
})($);