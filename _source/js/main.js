/**
 * LISTED BLUE
 *
 * @date [31.10.2014]
 * @author [Roel Noback]
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

    window.LISTEDBLUE = {

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
            //this.createCacheItems();
            this.isPortrait = false;

            this.header = $('header');
            this.footer = $('footer');
            this.mainWrap = $('.main-wrap');
            this.mainVisual = $('.inner').find('img');
           
            /*this.viewportWidth = $(window).outerWidth();
            this.widthTotal = this.mainWrap.height();
*/
            this.viewportHeight = $(window).height();
            this.heightTotal = this.mainWrap.height();
           

            this.productBox = $('.product-box');
            this.productInfoBox = $('.product-info-box');
            this.restHeigth = this.header.innerHeight() + this.footer.height();

/*          console.log("this.header.height() "+ this.header.height());
            console.log("this.footer.height() " + this.footer.height());
            console.log("this.productInfoBox.height() " +  this.productInfoBox.height());*/

            this.productBoxHeight = this.viewportHeight - this.restHeigth;

/*            console.log("heightTotal "+ this.heightTotal);
            console.log("viewportHeight " +  this.viewportHeight);
            console.log("productBoxHeight " +  this.productBoxHeight);
*/
           
            
            //setTimeout(this.resizeHandler.bind(this);
            // Portrait / landscape stuff
            this.applyOrientation();

           /* $(window).on("orientationchange", function(){
                if(window.orientation == 0) // Portrait
                {
                    console.log("You are now in portrait");
                }
                else // Landscape
                {
                    console.log("You are now in landscape");
                }
            });
*/           
           // setTimeout(this.setMainVisial, 500).bind(this);
           // this.setMainVisial();
            $(window).on('scroll', this.scrollHandler.bind(this));
            $(window).on('resize', this.resizeHandler.bind(this));
        },

        setMainVisial: function(){
            if(!this.isPortrait){
                if( this.heightTotal >= this.viewportHeight){
                    
                    this.mainVisual.css('width', 'auto');
                    this.mainVisual.css('height', this.productBoxHeight+'px');
                   
                }else {
                    this.mainVisual.css('width', '100%');
                    this.mainVisual.css('height', 'auto');
                }
            }

            //this.mainVisual.css('visibility','visible');
        },

        applyOrientation: function () {
          if (window.innerHeight > window.innerWidth) {
            console.log("You are now in portrait");
            this.isPortrait = true;
            this.mainWrap.addClass("is-portrait");
            this.mainVisual.css('height', (this.viewportHeight)+'px');
            this.mainVisual.css('width', 'auto');
            //this.mainVisual.parent.css('left', '50%');

            var scrollto = this.mainVisual.offset().left + (this.mainVisual.width() / 4);
            console.log("this.mainVisual.width() "+this.mainVisual.width());
            console.log("scrollto "+scrollto);


            window.scrollTo(500,0);

          } else {
            console.log("You are now in landscape");
            this.isPortrait = false;
            this.mainWrap.removeClass("is-portrait");
          }
        },

        scrollHandler:function(){
           /* var pos = window.position();
            var posLeft = pos.left;
            console.log("posLeft "+posLeft);*/
        },

        resizeHandler: function() {

            this.applyOrientation();
            this.viewportHeight = $(window).outerHeight();
            this.heightTotal = this.mainWrap.height();
            this.productBoxHeight = this.viewportHeight - this.restHeigth;

            this.setMainVisial();
        }
    };
    $(function() {
        LISTEDBLUE.init();
    });
}(window.jQuery));