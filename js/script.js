"console"in window&&window.console.log||(window.console={log:function(){}});var settings;!function(a){window.LISTEDBLUE={version:.1,touch:!!("ontouchstart"in window),logEl:"#notification",logEvent:"show-message",settings:{debug:!0},init:function(){this.header=a("header"),this.footer=a("footer"),this.mainWrap=a(".main-wrap"),this.mainVisual=a(".inner").find("img"),this.viewportHeight=a(window).outerHeight(),this.heightTotal=this.mainWrap.height(),this.productBox=a(".product-box"),this.productInfoBox=a(".product-info-box"),this.restHeigth=this.header.height()+this.footer.height()+this.productInfoBox.height()+20,console.log("this.header.height() "+this.header.height()),console.log("this.footer.height() "+this.footer.height()),console.log("this.productInfoBox.height() "+this.productInfoBox.height()),this.productBoxHeight=this.viewportHeight-this.restHeigth,console.log("heightTotal "+this.heightTotal),console.log("viewportHeight "+this.viewportHeight),console.log("productBoxHeight "+this.productBoxHeight),this.setMainVisial(),a(window).on("resize",this.resizeHandler.bind(this))},setMainVisial:function(){this.heightTotal>=this.viewportHeight?(this.mainVisual.css("width","auto"),this.mainVisual.css("height",this.productBoxHeight+"px"),this.mainVisual.addClass("locked")):(this.mainVisual.css("width","100%"),this.mainVisual.css("height","auto"),this.mainVisual.removeClass("locked"))},resizeHandler:function(){this.viewportHeight=a(window).innerHeight(),this.heightTotal=this.mainWrap.height(),this.productBoxHeight=this.viewportHeight-this.restHeigth,console.log("heightTotal "+this.heightTotal),console.log("viewportHeight "+this.viewportHeight),console.log("productBoxHeight "+this.productBoxHeight),this.setMainVisial()}},a(function(){LISTEDBLUE.init()})}(window.jQuery);