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
            var self = this;
            this.dataURL = 'json/data.json';
            this.fetch();

            this.template = config.template;
            this.container = config.container;
            this.colorArray = [];
            var colorArray = [];

            this.pubSub();

            $.subscribe('listedblue/data', function(e, data){
                console.log(data.products);

                // sort on id
                self.sortJSON(data.products, 'id');

               /* $.each( data.products, function( i, product ){
                  console.log( "Index #" + i + ": " + product.textcolor );
                  colorArray.push(product.textcolor);

                });
                 //console.log(colorArray);
                 this.colorArray = colorArray;
                 console.log(self.colorArray);*/
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
            if(this.template){
                var template = Handlebars.compile( this.template );
                var html = template( this.products);
                this.container.append( template ( this.products ) );
                
            }
            this.setInterface();
        },

        sortJSON:function(data, key){
            return data.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        },
        fetch: function(){

            var self = this;
            $.getJSON(this.dataURL, function( data ) {
                self.products = data.products;

              
                $.publish('listedblue/data', data);
               
               // $.map(data.products, function( product ) {
                        

                   /* product.sort(function(a, b) { 
                        return  a.id - b.id ;
                     });*/


                      /// sum.push(product.id);


                    
               // });

                //sum.sort(function(a, b){return a-b});
               // console.log(sum);


              /*  for (var item in data.products.product) {
                    sum += data.products[ item ].id;
                }*/
                 
                //console.log( sum ); // 3*/

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
            this.mainNavIsVisible = false;
            this.colorArray = [];
            this.theBody = $('body.products');
            this.theContent = $('body.content-page'); // SFG: adding orientation class to content pages
            this.theWindow = $(window);
            this.header = $('header');
            //this.footer = $('footer');
            this.mainWrap = $('.main-wrap');
            this.productWrap = $('.product-wrap');
           
            this.productOverlay = $('.product-overlay');
            this.productInfo = $('.product-info');

            this.productNavigationWrap = $('.product-navigation');
            this.btnNext = this.productNavigationWrap.find('.next');
            this.btnPrev = this.productNavigationWrap.find('.prev');

            this.mainNav = $('.products').find('.main-navigation');
            this.mainNavContent = $('.content-page').find('.main-navigation'); // SFG: adding 100% nav height content pages

            this.selectedProductIndex = 0;

            this.allProducts = this.productWrap.find('.product').css('display','none');
            this.maxProducts = this.allProducts.length;

            this.setProduct(this.selectedProductIndex);
           
            this.viewportWidth = this.theWindow.width();     
            this.viewportHeight = this.theWindow.outerHeight();

            this.heightTotal = this.mainWrap.height();
           
            this.productVisual = $('.product-visual');
            this.productInfo = $('.product-info');
            this.restHeigth = this.productInfo.height();

            if(!this.isPortrait){
                this.navHeight = this.viewportHeight;
            }

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

            this.overlayCloseBtn = $('.navigation-wrap').find('.btn-close');
            this.mainNavToggle = $('.btn-nav-toggle');
            var timeout = setTimeout(this.resizeHandler.bind(this), 100);

            // Events
            this.btnNext.on('click touchstart', this.setNextProductIndex.bind(this));
            this.btnPrev.on('click touchstart', this.setPrevProductIndex.bind(this));

            this.productVisual.find('img').on('click', this.openOverlay.bind(this));
            this.overlayCloseBtn.on('click', this.closeOverlay.bind(this));
            this.productOverlay.on('click', this.closeOverlay.bind(this));

            this.mainNavToggle.on('click', this.toggleNav.bind(this));
             
        },

        getProduct: function(index){
            return $(this.allProducts[index]);
        },

        setProduct: function(index){
            this.curProduct = $(this.allProducts[index]);
            
            this.setTextColor();
            
            this.curProduct.css('z-index',1);
            this.mainVisual = this.curProduct.find('.visual');

            this.mainVisual.addClass('current');
            this.toggleProduct();
        },


        setTextColor: function(){
            
            if ( this.curProduct.hasClass('light') ) {
                $('.site-header').addClass('textlight');
                $('.site-header').removeClass('textdark');
                $('.btn-nav-toggle').addClass('textlight');
                $('.btn-nav-toggle').removeClass('textdark');
                $('.btn-close').addClass('textlight');
                $('.btn-close').removeClass('textdark');
                if(this.isPortrait){
                    this.btnNext.addClass('textlight');
                    this.btnNext.removeClass('textdark');
                    this.btnPrev.addClass('textlight');
                    this.btnPrev.removeClass('textdark');
                    $('.product-inner').find('h2').addClass('textlight');
                    $('.product-inner').find('h2').removeClass('textdark');
                }else{
                    this.btnNext.addClass('textdark');
                    this.btnNext.removeClass('textlight');
                    this.btnPrev.addClass('textdark');
                    this.btnPrev.removeClass('textlight');
                    $('.product-inner').find('h2').addClass('textdark');
                    $('.product-inner').find('h2').removeClass('textlight');
                }
            } else {
                $('.site-header').addClass('textdark');
                $('.site-header').removeClass('textlight');
                $('.btn-nav-toggle').addClass('textdark');
                $('.btn-nav-toggle').removeClass('textlight');
                $('.btn-close').addClass('textdark');
                $('.btn-close').removeClass('textlight');
                if(this.isPortrait) {
                    this.btnNext.addClass('textdark');
                    this.btnNext.removeClass('textlight');
                    this.btnPrev.addClass('textdark');
                    this.btnPrev.removeClass('textlight');
                    $('.product-inner').find('h2').addClass('textdark');
                    $('.product-inner').find('h2').removeClass('textlight');
                }else{
                     this.btnNext.addClass('textdark');
                    this.btnNext.removeClass('textlight');
                    this.btnPrev.addClass('textdark');
                    this.btnPrev.removeClass('textlight');
                    $('.product-inner').find('h2').addClass('textdark');
                    $('.product-inner').find('h2').removeClass('textlight');
                }
            }
        },

        toggleProduct: function(){
            if(this.oldProduct){
                this.oldProduct.fadeOut(1000,'easeOutSine');
            }
            this.curProduct.fadeIn(1000,'easeOutSine');
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
        },

        setMainVisial: function(){

            this.visualWidth = this.mainVisual.width();

            if(!this.isPortrait){
                 
                if( this.heightTotal >= this.productVisualHeight){
                    this.mainVisual.css('width', 'auto');
                    this.mainVisual.css('height', this.productVisualHeight+'px');

                    //this.footer.css('top' , this.productVisualHeight + this.restHeigth - this.footer.height());

                }else {
                    this.mainVisual.css('width', '100%');
                    this.mainVisual.css('height', 'auto');

                    //this.footer.css('top' , this.heightTotal + this.restHeigth - this.footer.height());
                }
                //this.productNavigationWrap.css('width',(this.mainVisual.width()/3));
            }else{
                //this.productNavigationWrap.css('width','100%');
                //this.footer.css('top' , this.heightTotal - this.footer.height());
            }
            
            this.visualWidth = this.mainVisual.width();
            this.header.css('width', this.visualWidth);

            this.productInfo.css('width', this.visualWidth);

            this.productOverlay.width( this.visualWidth );
            this.productOverlay.find('.column').height( this.visualWidth/2 );

           // this.productOverlay.height( this.visualWidth );
           
           if(!this.isPortrait){
               // this.mainNav.height(this.visualWidth/2);
            }
            //this.mainNav.width( this.visualWidth );


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
            if(this.navHeight > 0){
                this.mainNav.height(this.navHeight);
            }

            this.setTextColor();

           // this.mainNavToggle.position().right(this.viewportWidth);

            /*visualWidth = this.mainVisual.width();

            this.header.css('width', visualWidth);

            this.productInfo.css('width', visualWidth);*/
            

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
            this.setTextColor();
            this.mainNav.height(this.navHeight);
            this.mainNavContent.height(this.navHeight); // SFG: adding 100% menu height in landscape -> content pages



            //this.header.width('100%');

            //this.productInfo.css('width', '100%');
            //this.footer.css('width', '100%');
            window.scrollTo(0,0);
        },

        openOverlay:function(e){
           
            this.overlayCloseBtn.show();
            this.productOverlay.addClass('active');
            this.mainNavToggle.hide();
            this.mainNav.hide();
            if(!this.isPortrait){
                //TweenLite.to(this.mainNav, 0.3, {right:'-33.3333334%',  ease:Expo.easeInOut});
            }
            this.mainNavIsVisible = false;
            console.log("this.isPortrait "+this.isPortrait);
        },
        closeOverlay:function(e){
           
            this.productOverlay.removeClass('active');
            this.overlayCloseBtn.hide();
            this.mainNavToggle.show();
        },
        toggleNav:function(e){
            var target = $(e.target);
            var menu = target.siblings('.main-navigation');
            


            if(this.mainNavIsVisible){
               // menu.hide();
/*                console.log("go on");
                TweenLite.to(menu, 0.6, {right:'-33.3333334%',  ease:Expo.easeInOut});
                this.mainNavIsVisible = false;*/

            }else{
                //menu.show();
/*                console.log("go OFF");
                TweenLite.to(menu, 0.6, {right:'0',  ease:Expo.easeInOut});
                this.mainNavIsVisible = true;*/
            }
            if(menu.is(':visible')){
                menu.hide();

            }else{
                //menu.height(this.visualWidth/2);
                menu.show();
                if(this.isPortrait){
                    if(this.navHeight > 0){
                        menu.height(this.navHeight);
                    }
                   
                }else{
                    if(this.visualWidth > 0){
                        menu.height(this.navHeight);
                    }
                }
            }
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