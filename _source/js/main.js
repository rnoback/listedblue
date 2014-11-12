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
            this.theBody = $('body');
            this.theWindow = $(window);
            this.header = $('header');
            this.footer = $('footer');
            this.mainWrap = $('.main-wrap');
            this.mainVisual = $('.product-visual').find('img');
           

            this.loadJSON();


            this.applyOrientation();
            this.viewportWidth = this.theWindow.outerWidth();
            
            this.viewportHeight = this.theWindow.outerHeight();

            console.log("this.viewportHeight "+this.viewportHeight);
            this.heightTotal = this.mainWrap.height();
           
            this.productBox = $('.product-box');
            this.productInfoBox = $('.product-info-box');
            this.restHeigth = this.header.height() + this.footer.height();

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
            //this.applyOrientation();

            // turn touch device
            this.theWindow.on("orientationchange", this.onTurnScreen.bind(this));

           
            
            this.setMainVisial();
            //this.theWindow.on('scroll', this.scrollHandler.bind(this));
            this.theWindow.on('resize', this.resizeHandler.bind(this));

           
            // 
            /*this.theWindow.on("mousewheel", function() {
                return false;
            });*/
            var timeout = setTimeout(this.resizeHandler.bind(this), 1);

             $('.flexslider').flexslider({
        animation: "slide",
        controlNav: false,             
        directionNav: false
      });
        },

        loadJSON: function(){
            $.getJSON('json/data.json', function(info, textStatus) {
                /*optional stuff to do after success */
                console.log(info.full_name);
                console.log(info.title);
                var name = info.full_name;

                $('.product-info-box').find('h2').text(info.title);

                for (var i = 0; i <= info.links.length-1; i++){
                   // console.log(i);
                }
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
            

            // Center main visual 
            var scrollTo = (this.mainVisual.width() - this.viewportWidth) / 2;


            //console.log("scrollto "+scrollTo);
           //console.log("this.viewportWidth "+this.viewportWidth);

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
            this.productBoxHeight = this.viewportHeight - this.restHeigth;
            console.log("this.viewportHeight "+this.viewportHeight);
            this.setMainVisial();
        }
    };
    $(function() {
        LISTEDBLUE.init();
    });
}(window.jQuery));