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
            this.header = $('header');
            this.footer = $('footer');
            this.mainWrap = $('.main-wrap');
            this.mainVisual = $('.inner').find('img');
           
            /*this.viewportWidth = $(window).outerWidth();
            this.widthTotal = this.mainWrap.height();
*/
            this.viewportHeight = $(window).outerHeight();
            this.heightTotal = this.mainWrap.height();
           

            this.productBox = $('.product-box');
            this.productInfoBox = $('.product-info-box');
            this.restHeigth = this.header.height() + this.footer.height() + this.productInfoBox.height() + 20;

            console.log("this.header.height() "+ this.header.height());
            console.log("this.footer.height() " + this.footer.height());
            console.log("this.productInfoBox.height() " +  this.productInfoBox.height());

            this.productBoxHeight = this.viewportHeight - this.restHeigth;

            console.log("heightTotal "+ this.heightTotal);
            console.log("viewportHeight " +  this.viewportHeight);
            console.log("productBoxHeight " +  this.productBoxHeight);

            this.setMainVisial();

            $(window).on('resize', this.resizeHandler.bind(this));

        },

        setMainVisial: function(){
            if( this.heightTotal >= this.viewportHeight ){
                
                this.mainVisual.css('width', 'auto');
                this.mainVisual.css('height', this.productBoxHeight+'px');
                this.mainVisual.addClass('locked');

               
            }else{
                this.mainVisual.css('width', '100%');
                this.mainVisual.css('height', 'auto');
                this.mainVisual.removeClass('locked');   
            }
        },

        resizeHandler: function() {

            this.viewportHeight = $(window).innerHeight();
            this.heightTotal = this.mainWrap.height();
            this.productBoxHeight = this.viewportHeight - this.restHeigth;

            
            console.log("heightTotal "+ this.heightTotal);
            console.log("viewportHeight " +  this.viewportHeight);
            console.log("productBoxHeight " +  this.productBoxHeight);


           
            this.setMainVisial();

            


        }
    };
    $(function() {
        LISTEDBLUE.init();
    });
}(window.jQuery));