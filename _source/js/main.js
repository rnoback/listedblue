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
                console.log(data);

                // sort on id
                self.sortJSON(data.products, 'display_order');


               /* $.each( data.products, function( i, product ){
                  console.log( "Index #" + i + ": " + product.textcolor );
                  colorArray.push(product.textcolor);

                });
                 //console.log(colorArray);
                 this.colorArray = colorArray;
                 console.log(self.colorArray);*/
            });
        },

        sortJSON:function(data, key){
            return data.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
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

        fetch: function(){

            var self = this;
            $.getJSON(this.dataURL, function( data ) {
                self.products = data.products;

                $.publish('listedblue/data', data);

                self.attachTemplate();
               
            });
        },


        setInterface:function(){
            this.isPortrait = false;
            this.mainNavIsVisible = false;
            this.colorArray = [];
            this.theBody = $('body.products');
            this.theWindow = $(window);
            this.header = $('header');
            //this.footer = $('footer');
            this.mainWrap = $('.main-wrap');
            this.productWrap = $('.product-wrap');
           
            this.productOverlay = $('.product-overlay');
            this.productInfo = $('.product-info');

            this.heroWrapper = $('.hero-wrapper'); // SFG: adding rule for landingpage visual
            this.heroVisual = $('.hero-visual'); // SFG: adding rule for hero image
            this.swipeIndicator = $('.swipe-indicator'); // SFG: adding swipe-indicator layer
            
            this.productNavigationWrap = $('.product-navigation');
            this.btnNext = this.productNavigationWrap.find('.next');
            this.btnPrev = this.productNavigationWrap.find('.prev');

            this.mainNav = $('.products').find('.main-navigation');
            this.mainNavContent = $('.content-page').find('.main-navigation'); // SFG: adding 100% nav height content pages

            this.selectedProductIndex = 0;

            this.allProducts = this.productWrap.find('.product').css('display','none');
            this.maxProducts = this.allProducts.length;

            this.isProductPage = $('body').hasClass('products');

            var para = this.getURLParameter("p");

            if(para && para >= 0 && para < this.maxProducts){
                this.selectedProductIndex = parseInt(para);
            }else{
                this.selectedProductIndex = 0;
            }
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
            this.theWindow.on('scroll', this.scrollHandler.bind(this));
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

            this.swipeIndicator.on('touchstart click', this.closeSwipeIndicator.bind(this)); // SFG: adding swipeIndicator overlay

            this.mainNavToggle.on('click', this.toggleNav.bind(this));   
            $('.btn-landing-nav-toggle').on('click', this.toggleNavLanding.bind(this));


           // this.changeUrlParam('p',1);
            

            

        },

       /* getURLParameter: function (sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');

            for (var i = 0; i < sURLVariables.length; i++) {

                var sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] == sParam) {
                    return sParameterName[1];
                }
            }
        },
*/








        getURLParameter: function(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
        },
        
        changeUrlParam: function (param, value) {
            var self = this;
            var currentURL = window.location.href+'&';
            var change = new RegExp('('+param+')=(.*)&', 'g');
            var newURL = currentURL.replace(change, '$1='+value+'&');
            
            
            if (this.getURLParameter(param) !== null){
                try {
                    window.history.replaceState('', '', newURL.slice(0, - 1) );
                } catch (e) {
                    console.log(e);
                }
            } else {
                if(this.isProductPage){
                var currURL = window.location.href;
                    if (currURL.indexOf("?") !== -1){
                        window.history.replaceState('', '', currentURL.slice(0, - 1) + '&' + param + '=' + value);
                    } else {
                        window.history.replaceState('', '', currentURL.slice(0, - 1) + '?' + param + '=' + value);
                    }
                }
            }
        },


        getProduct: function(index){
            return $(this.allProducts[index]);
        },

        setProduct: function(index){
            this.curProduct = $(this.allProducts[index]);
            this.changeUrlParam('p',index);
            
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
            this.productOverlay.find('.column-content > ul').css('line-height', ((this.visualWidth/2)/24) + 'px'); // SFG: adapting line-height to vertical height container div

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

            //alert("viewportHeight" + this.viewportHeight);
            //alert("viewportWidth" + this.viewportWidth);

            if(this.theWindow.height() > this.theWindow.width()) // Portrait
            {
               // window.location = location.href
               window.location = location.href;
                //this.setPortraitMode();
                //alert("You are now in portrait");
                //var timeout = setTimeout(this.resizeHandler.bind(this), 1);
            }
            else // Landscape
            {
                window.location = location.href;
                //this.setPortraitMode();
                //alert("You are now in landscape");
                //var timeout = setTimeout(this.resizeHandler.bind(this), 1);
            }
        },
        setPortraitMode: function(){

            this.isPortrait = true;
            this.theBody.addClass('is-portrait');
            this.theBody.removeClass("is-landscape");
            this.mainVisual.css('height', (this.viewportHeight)+'px');
            this.mainVisual.css('width', 'auto');

            this.heroWrapper.addClass('is-portrait');
            this.heroWrapper.removeClass('is-landscape');
            
            this.heroVisual.css('height', (this.viewportHeight)+'px');
           // $('.main-inner.content-box').css("top",(this.viewportHeight)+'px').css("position","relative");
           // $('.content-page .main-wrap footer').css("top",(this.viewportHeight)+'px').css("position","relative");
            this.heroVisual.css('width', 'auto').css('position', 'relative');

            var w = this.heroVisual.width();
            var heroLeftPos = -(Math.round((this.heroVisual.width() - $(window).width()) / 2));
            this.heroVisual.css('left', heroLeftPos)
            ;
            this.swipeIndicator.css('height', (this.viewportHeight)+'px'); // SFG: .swipe-indicator height
            this.swipeIndicator.css('width', (this.mainVisual.width())); // SFG: .swipe-indicator widht

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
            var scrollTo = Math.round((this.mainVisual.width() - $(window).width()) / 2); // SFG: rounded scrollTo (0 decimals)
            var yPos = $(window).scrollTop();
            window.scrollTo(scrollTo, yPos);
            
/*          console.log("this.mainVisual.width "+this.mainVisual.width());
            console.log("this.viewportWidth "+this.viewportWidth);
            console.log("scrollto "+scrollTo);*/

        },

        setLandscapeMode: function(){

            this.isPortrait = false;
            this.theBody.removeClass("is-portrait");
            this.theBody.addClass("is-landscape");
            this.mainVisual.css('width', '100%');
            this.mainVisual.css('height', 'auto');
            this.setTextColor();
            this.mainNav.height(this.navHeight);
            this.mainNavContent.height(this.navHeight); // SFG: adding 100% menu height in landscape -> content pages

             $('.main-inner.content-box').css("top",0).css("position","static");
            $('.content-page .main-wrap footer').css("top",0).css("position","static");

            this.heroVisual.css('width', '100%');
            this.heroVisual.css('height', 'auto');
            this.heroVisual.css('left', 'auto');
            this.heroVisual.css('position', 'relative');
            this.heroWrapper.removeClass('is-portrait');
            this.heroWrapper.addClass('is-landscape');
            /*end landingVisual rule*/



            //this.header.width('100%');

            //this.productInfo.css('width', '100%');
            //this.footer.css('width', '100%');
             var yPos = $(window).scrollTop();
            window.scrollTo(0,yPos);
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

        // SFG: adding swipe indicator layer in portrait mode
        closeSwipeIndicator:function(e){
            this.swipeIndicator.addClass('inactive');
            console.log("swipe indicator closed");
        },
        // end: swipe indicator layer

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
                //Dirty bug fix, to strech white bg a little
                var h = this.navHeight+=30; // SFG: added 5px (was 25) to stretch to full window height
                if(this.isPortrait){
                    if(this.navHeight > 0){
                        menu.height(h);
                    }
                   
                }else{
                    if(this.visualWidth > 0){
                        menu.height(h);
                    }
                }
            }
        },

        toggleNavLanding:function(e){
            //var menu = target.siblings('.main-navigation-landing');
            e.preventDefault();
             $(".landing .navigation-wrap").height(this.navHeight);
             if($(".landing .navigation-wrap").is(':visible')){
                $(".navigation-wrap").hide();
            }else{
                $(".landing .navigation-wrap").show();
               /* if(this.theWindow.width() < 768){

                         $(".landing .navigation-wrap").height("auto");
                    
                   
                }else{
                    //if(this.navHeight > 0){
                        $(".landing .navigation-wrap").height(this.navHeight);
                    //  }
                }*/
            }

        },
            
        scrollHandler:function(e){
            if(this.isLandscape){
                if ( $(window).scrollTop() > 400) {
                    $('.sticky-header').fadeIn();
                } else {
                    $('.sticky-header').fadeOut();
                }
            }else{
                if ( $(window).scrollTop() > 150) {
                    $('.sticky-header').fadeIn();
                } else {
                    $('.sticky-header').fadeOut();
                }
            }
        },


        resizeHandler: function() {
            
            this.applyOrientation();
            this.viewportHeight = this.theWindow.outerHeight();

            this.viewportWidth = this.theWindow.outerWidth();
            this.heightTotal = this.mainVisual.height();
            this.productVisualHeight = this.viewportHeight - this.restHeigth;
            $(".landing .navigation-wrap").hide();

            /*console.log("this.viewportHeight "+this.viewportHeight);
            console.log("this.restHeigth "+this.restHeigth);*/
           // console.log("this.curProduct "+this.mainVisual.width());
            //console.log("this.heightTotal "+this.heightTotal);

           // console.log ("this.mainVisual W: "+ this.mainVisual.width());
            
            
            this.setMainVisial();
        },

    };
    $(function() {
        LISTEDBLUE.init({
            template: $('#product-template').html(),
            container: $('.product-wrap')
        });
    });
    
}(window.jQuery));


