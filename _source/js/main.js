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
        init: function( config ) {
            //this.createCacheItems();

            // load data
            this.dataURL = 'json/data.json';
            this.fetch();

            this.template = config.template;
            this.container = config.container;

            this.pubSub();
            $.subscribe('listedblue/data', function(e, data){
                console.log(data);
            });

        },

        pubSub: function(){
            var o = $( {} );

            $.each({
                trigger: 'publish',
                on: 'subscribe',
                off: 'unsubscribe'
            }, function( key, val ) {
                jQuery[val] = function() {
                    o[key].apply( o, arguments );
                };
            });
        },

        attachTemplate: function(){

            var template = Handlebars.compile( this.template );
            var html = template( this.products);
            this.container.append( template ( this.products ) );
            this.setInterface();
        },

        fetch: function(){
            var self = this;
            $.getJSON(this.dataURL, function( data ) {
                self.products = data.products;

                $.publish('listedblue/data', data);

                //filter valis data from JSON and store in new Array
                //$.map(data.products, function( product ){
                   /* return {
                        product_id: product.product_id,
                        product_name: product.product_name,
                        product_visual: product.product_visual
                    };*/
                //});

                self.attachTemplate();
                 
                 //var timeout = setTimeout(self.setInterface.bind(self), 250);
               
            });
        },


        setInterface:function(){
            this.isPortrait = false;
            this.theBody = $('body');
            this.theWindow = $(window);
            this.header = $('header');
            this.footer = $('footer');
            this.mainWrap = $('.main-wrap');
            this.productWrap = $('.product-wrap');
           
            this.productOverlay = $('.product-overlay');
            this.productInfo = $('.product-info');

            this.productNavigationWrap = $('.product-navigation');
            this.btnNext = this.productNavigationWrap.find('.next');
            this.btnPrev = this.productNavigationWrap.find('.prev');

            this.selectedProductIndex = 0;

            this.allProducts = this.productWrap.find('.product').css('display','none');
            this.maxProducts = this.allProducts.length;

            this.setProduct(this.selectedProductIndex);
           
            this.viewportWidth = this.theWindow.width();     
            this.viewportHeight = this.theWindow.outerHeight();

            this.heightTotal = this.mainWrap.height();
           
            this.productVisual = $('.product-visual');
            this.productInfo = $('.product-info');
            this.restHeigth = this.footer.height() + this.productInfo.height();

            this.productVisualHeight = this.viewportHeight - this.restHeigth;

            //setTimeout(this.resizeHandler.bind(this);
            // Portrait / landscape stuff
            //this.applyOrientation();

            // turn touch device
            this.theWindow.on("orientationchange", this.onTurnScreen.bind(this));
           
            this.applyOrientation();
            this.setMainVisial();
            //this.theWindow.on('scroll', this.scrollHandler.bind(this));
            this.theWindow.on('resize', this.resizeHandler.bind(this));
            // 
            /*this.theWindow.on("mousewheel", function() {
                return false;
            });*/

            this.overlayCloseBtn = $('.overlay-navigation').find('.btn-close');
            var timeout = setTimeout(this.resizeHandler.bind(this), 100);

            // Events
            this.btnNext.on('click touchstart', this.setNextProductIndex.bind(this));
            this.btnPrev.on('click touchstart', this.setPrevProductIndex.bind(this));

            this.productVisual.find('img').on('click touchstart', this.openOverlay.bind(this));
            this.overlayCloseBtn.on('click touchstart', this.closeOverlay.bind(this));
             
        },

        getProduct: function(index){
            return $(this.allProducts[index]);
        },

        setProduct: function(index){
            this.curProduct = $(this.allProducts[index]);
            this.curProduct.css('z-index',1);
            this.mainVisual = this.curProduct.find('.visual');

            this.mainVisual.addClass('current');
            this.toggleProduct();
        },


        toggleProduct: function(){
            if(this.oldProduct){
                this.oldProduct.fadeOut(1500,'easeOutSine');
            }
            this.curProduct.fadeIn(1500,'easeOutSine');
            var timeout = setTimeout(this.resizeHandler.bind(this), 1);
        },


        setNextProductIndex: function(e){
            e.preventDefault();
            this.oldProduct = this.curProduct;
            if( this.selectedProductIndex < (this.maxProducts-1) ) {
                 this.selectedProductIndex++;
            } else {
                 this.selectedProductIndex = 0;
            }

            this.setProduct(this.selectedProductIndex);
            //console.log("NEXT : " + this.selectedProductIndex);
        },

        setPrevProductIndex: function(e){
            e.preventDefault();
            this.oldProduct = this.curProduct;
            if(this.selectedProductIndex > 0){
                this.selectedProductIndex--;
            }else{
                this.selectedProductIndex = (this.maxProducts-1);
            }
            this.setProduct(this.selectedProductIndex);
            //console.log("PREV : " + this.selectedProductIndex);
        },

        setMainVisial: function(){
            if(!this.isPortrait){
                if( this.heightTotal >= this.productVisualHeight){
                    this.mainVisual.css('width', 'auto');
                    this.mainVisual.css('height', this.productVisualHeight+'px');

                    this.footer.css('top' , this.productVisualHeight + this.restHeigth - this.footer.height());

                }else {
                    this.mainVisual.css('width', '100%');
                    this.mainVisual.css('height', 'auto');

                    this.footer.css('top' , this.heightTotal + this.restHeigth - this.footer.height());
                }
                //this.productNavigationWrap.css('width',(this.mainVisual.width()/3));
            }else{
                //this.productNavigationWrap.css('width','100%');
                this.footer.css('top' , this.heightTotal - this.footer.height());
            }
            
            var self = this;
            var timeout = setTimeout(function(){
                self.footer.css('visibility','visible');
            }, 1);

            this.productOverlay.width( this.mainVisual.width() );
            this.productOverlay.height( this.mainVisual.height() );

            $('.overlay-navigation').width( this.mainVisual.width() );

/*            this.preloader.width( this.mainVisual.width() );
            this.preloader.height( this.mainVisual.height() );

            this.preloader.find('.preloader-image').css('margin-top', (this.mainVisual.height()/2) );
        */    
            /*var self = this;
            var iLoaded = 0;
            consol.log(this.mainVisuals);
            this.mainVisuals.each(function () {
                $(this).bind("load", function() {
                    iLoaded++;
                    if(iLoaded == self.maxProducts) {
                      this.preloader.hide();
                    }
               //$(this).attr('src', $(this).attr("src"));
                });
            });*/
            
            
            /* var self = this;
             this.allVisuals.on('load', function(){
               // self.preloader.hide();
             });*/
            //this.mainVisual.css('visibility','visible');
        },
       

        applyOrientation: function () {
          if (window.innerHeight > window.innerWidth) {
            this.setPortraitMode();
          } else {
            this.setLandscapeMode();
          }
        },

        onTurnScreen: function(){
            if(window.orientation == 0) // Portrait
            {
                //alert("You are now in portrait");
                //var timeout = setTimeout(this.resizeHandler.bind(this), 1);
            }
            else // Landscape
            {
                //alert("You are now in landscape");
                //var timeout = setTimeout(this.resizeHandler.bind(this), 1);
            }
        },
        setPortraitMode: function(){
            console.log("You are now in portrait");

            this.isPortrait = true;
            this.theBody.addClass('is-portrait');
            this.theBody.removeClass("is-landscape");
            this.mainVisual.css('height', (this.viewportHeight)+'px');
            this.mainVisual.css('width', 'auto');

            this.header.css('width', (this.mainVisual.width()));

            this.footer.css('width', (this.mainVisual.width()));

            this.productInfo.css('width', (this.mainVisual.width()));
            

            //console.log( "scrollert " +window.scrollTo);


            // Center main visual 
            var scrollTo = (this.mainVisual.width() - this.viewportWidth) / 2;


           /* console.log("this.mainVisual.width "+this.mainVisual.width());
            console.log("this.viewportWidth "+this.viewportWidth);
            console.log("scrollto "+scrollTo);*/

            window.scrollTo(scrollTo, 0);
        },

        setLandscapeMode: function(){
            console.log("You are now in landscape");
            this.isPortrait = false;
            this.theBody.removeClass("is-portrait");
            this.theBody.addClass("is-landscape");
            this.mainVisual.css('width', '100%');
            this.mainVisual.css('height', 'auto');

            this.header.css('width', '100%');
            this.productInfo.css('width', '100%');
            this.footer.css('width', '100%');
            window.scrollTo(0,0);
        },

        openOverlay:function(e){
           
          
        this.overlayCloseBtn.css('display','block');
            this.productOverlay.addClass('active');
        },
        closeOverlay:function(e){
           
            var target = $(e.target);
            this.productOverlay.removeClass('active');
            target.css('display','none');
        },

        scrollHandler:function(){
            /*var pos = this.theWindow.scrollLeft();
            console.log("posLeft "+pos);*/
        },

        resizeHandler: function() {
            
            this.applyOrientation();
            this.viewportHeight = this.theWindow.outerHeight();

            this.viewportWidth = this.theWindow.outerWidth();
            this.heightTotal = this.mainVisual.height();
            this.productVisualHeight = this.viewportHeight - this.restHeigth;

            /*console.log("this.viewportHeight "+this.viewportHeight);
            console.log("this.restHeigth "+this.restHeigth);*/
           // console.log("this.curProduct "+this.mainVisual.width());
            //console.log("this.heightTotal "+this.heightTotal);

           // console.log ("this.mainVisual W: "+ this.mainVisual.width());
            
            
            this.setMainVisial();
        }
    };
    $(function() {
        LISTEDBLUE.init({
            template: $('#product-template').html(),
            container: $('.product-wrap')
        });
    });
}(window.jQuery));