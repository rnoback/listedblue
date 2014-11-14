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

            this.loadJSON();

            this.isPortrait = false;
            this.theBody = $('body');
            this.theWindow = $(window);
            this.header = $('header');
            this.footer = $('footer');
            this.mainWrap = $('.main-wrap');
            this.productWrap = $('.product-wrap');
            this.productInfo = $('.product-info');
            this.selectedProductIndex = 0;

            this.mainVisuals = $('.product-visual').find('img');

            this.AllProducts = this.productWrap.find('.product');
            this.AllProducts.css('display','none');

            this.maxProducts = this.AllProducts.length;

            this.setProduct(this.selectedProductIndex);
            
            
            /*this.productWrap.css("visibility","visible");*/   

            /*var selector = ".p"+this.selectedProductIndex;
            console.log("selector "+selector);
            $(selector).css('display','block');*/

           
            this.viewportWidth = this.theWindow.width();         
            this.viewportHeight = this.theWindow.outerHeight();

            this.heightTotal = this.mainWrap.height();
           
            this.productVisual = $('.product-visual');
            this.productInfo = $('.product-info');
            this.restHeigth = this.header.height() + this.footer.height() + this.productInfo.height();

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
            var timeout = setTimeout(this.resizeHandler.bind(this), 100);

            // Events
            $('.next').on('click', this.setNextProductIndex.bind(this));
            $('.prev').on('click', this.setPrevProductIndex.bind(this));
        },

        getProduct: function(index){
            return $(this.AllProducts[index]);
        },

        setProduct: function(index){
            this.curProduct = $(this.AllProducts[index]);
            this.mainVisual = this.curProduct.find('img');
            this.toggleProduct();
            
           // console.log(this.curProduct.find('img'));
        },


        toggleProduct: function(){
            if(this.oldProduct){
                this.oldProduct.css('display','none');
            }
            this.curProduct.fadeIn('slow', function() {
                if(this.oldProduct){
                  //  this.oldProduct.css('display','none');
                }
            });
            var timeout = setTimeout(this.resizeHandler.bind(this), 1);
        },


        setNextProductIndex: function(e){
            e.preventDefault();
            this.oldProduct = this.curProduct;
            if( this.selectedProductIndex < (this.maxProducts-1)){
                 this.selectedProductIndex++;
            }else{
                 this.selectedProductIndex = 0;
            }

            this.setProduct(this.selectedProductIndex);
            console.log("NEXT : " + this.selectedProductIndex);
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
            console.log("PREV : " + this.selectedProductIndex);
        },

        setMainVisial: function(){
            if(!this.isPortrait){
                if( this.heightTotal >= this.viewportHeight){
                    
                    this.mainVisual.css('width', 'auto');
                    this.mainVisual.css('height', this.productVisualHeight+'px');
                   
                }else {
                    this.mainVisual.css('width', '100%');
                    this.mainVisual.css('height', 'auto');
                }
            }

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
            

            // Center main visual 
            var scrollTo = (this.mainVisual.width() - this.viewportWidth) / 2;


            console.log("this.mainVisual.width "+this.mainVisual.width());
            console.log("this.viewportWidth "+this.viewportWidth);
            console.log("scrollto "+scrollTo);


            // Check if centered visual fits into viewport
            var diff = this.viewportWidth - scrollTo;
            //console.log("diff "+diff);

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

        scrollHandler:function(){
            /*var pos = this.theWindow.scrollLeft();
            console.log("posLeft "+pos);*/
        },

        resizeHandler: function() {
            
            this.applyOrientation();
            this.viewportHeight = this.theWindow.outerHeight();
            this.viewportWidth = this.theWindow.outerWidth();
            this.heightTotal = this.mainWrap.height();
            this.productVisualHeight = this.viewportHeight - this.restHeigth;
            this.setMainVisial();
        },



        loadJSON: function(){
            $.getJSON('json/data.json', function(info, textStatus) {
                /*optional stuff to do after success */
               /* console.log(info.full_name);
                console.log(info.title);*/
               // var name = info.full_name;

                //$('.product-info').find('h2').text(info.title);

                //for (var i = 0; i <= info.links.length-1; i++){
                   // console.log(i);
               // }
                /*var output='';
                for (var i = 0; i <= info.links.length-1; i++) {
                    for (key in info.links[i]) {
                        if (info.links[i].hasOwnProperty(key)) {
                            output += '<li>' + 
                            '<a href = "' + info.links[i][key] +
                            '">' + key + '</a>';
                            '</li>';
                    }   
                }
            }*/
            // /this.header.innerHTML = output;
            }.bind(this));


        }
    };
    $(function() {
        LISTEDBLUE.init();
    });
}(window.jQuery));