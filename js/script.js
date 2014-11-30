"console"in window&&window.console.log||(window.console={log:function(){}});var settings;!function(a){window.LISTEDBLUE={version:.1,touch:!!("ontouchstart"in window),logEl:"#notification",logEvent:"show-message",settings:{debug:!0},init:function(b){this.dataURL="json/data.json",this.fetch(),this.template=b.template,this.container=b.container,this.pubSub(),a.subscribe("listedblue/data",function(a,b){console.log(b)})},pubSub:function(){var b=a({});a.each({trigger:"publish",on:"subscribe",off:"unsubscribe"},function(a,c){jQuery[c]=function(){b[a].apply(b,arguments)}})},attachTemplate:function(){{var a=Handlebars.compile(this.template);a(this.products)}this.container.append(a(this.products)),this.setInterface()},fetch:function(){var b=this;a.getJSON(this.dataURL,function(c){b.products=c.products,a.publish("listedblue/data",c),b.attachTemplate()})},setInterface:function(){this.isPortrait=!1,this.theBody=a("body"),this.theWindow=a(window),this.header=a("header"),this.mainWrap=a(".main-wrap"),this.productWrap=a(".product-wrap"),this.productOverlay=a(".product-overlay"),this.productInfo=a(".product-info"),this.productNavigationWrap=a(".product-navigation"),this.btnNext=this.productNavigationWrap.find(".next"),this.btnPrev=this.productNavigationWrap.find(".prev"),this.selectedProductIndex=0,this.allProducts=this.productWrap.find(".product").css("display","none"),this.maxProducts=this.allProducts.length,this.setProduct(this.selectedProductIndex),this.viewportWidth=this.theWindow.width(),this.viewportHeight=this.theWindow.outerHeight(),this.heightTotal=this.mainWrap.height(),this.productVisual=a(".product-visual"),this.productInfo=a(".product-info"),this.restHeigth=this.productInfo.height(),this.productVisualHeight=this.viewportHeight-this.restHeigth,this.theWindow.on("orientationchange",this.onTurnScreen.bind(this)),this.applyOrientation(),this.setMainVisial(),this.theWindow.on("resize",this.resizeHandler.bind(this)),this.overlayCloseBtn=a(".overlay-navigation").find(".btn-close"),this.mainNavToggle=a(".btn-nav-toggle");setTimeout(this.resizeHandler.bind(this),100);this.btnNext.on("click touchstart",this.setNextProductIndex.bind(this)),this.btnPrev.on("click touchstart",this.setPrevProductIndex.bind(this)),this.productVisual.find("img").on("click touchstart",this.openOverlay.bind(this)),this.overlayCloseBtn.on("click touchstart",this.closeOverlay.bind(this))},getProduct:function(b){return a(this.allProducts[b])},setProduct:function(b){this.curProduct=a(this.allProducts[b]),this.curProduct.css("z-index",1),this.mainVisual=this.curProduct.find(".visual"),this.mainVisual.addClass("current"),this.toggleProduct()},toggleProduct:function(){this.oldProduct&&this.oldProduct.fadeOut(1500,"easeOutSine"),this.curProduct.fadeIn(1500,"easeOutSine");setTimeout(this.resizeHandler.bind(this),1)},setNextProductIndex:function(a){a.preventDefault(),this.oldProduct=this.curProduct,this.selectedProductIndex<this.maxProducts-1?this.selectedProductIndex++:this.selectedProductIndex=0,this.setProduct(this.selectedProductIndex)},setPrevProductIndex:function(a){a.preventDefault(),this.oldProduct=this.curProduct,this.selectedProductIndex>0?this.selectedProductIndex--:this.selectedProductIndex=this.maxProducts-1,this.setProduct(this.selectedProductIndex)},setMainVisial:function(){this.isPortrait||(this.heightTotal>=this.productVisualHeight?(this.mainVisual.css("width","auto"),this.mainVisual.css("height",this.productVisualHeight+"px")):(this.mainVisual.css("width","100%"),this.mainVisual.css("height","auto")));var b=this.mainVisual.width();this.header.css("width",b),this.productInfo.css("width",b),this.productOverlay.width(b),this.productOverlay.height(b),a(".overlay-navigation").width(b)},applyOrientation:function(){window.innerHeight>window.innerWidth?this.setPortraitMode():this.setLandscapeMode()},onTurnScreen:function(){0==window.orientation},setPortraitMode:function(){console.log("You are now in portrait"),this.isPortrait=!0,this.theBody.addClass("is-portrait"),this.theBody.removeClass("is-landscape"),this.mainVisual.css("height",this.viewportHeight+"px"),this.mainVisual.css("width","auto");var a=(this.mainVisual.width()-this.viewportWidth)/2;window.scrollTo(a,0)},setLandscapeMode:function(){console.log("You are now in landscape"),this.isPortrait=!1,this.theBody.removeClass("is-portrait"),this.theBody.addClass("is-landscape"),this.mainVisual.css("width","100%"),this.mainVisual.css("height","auto"),this.header.css("width","100%"),window.scrollTo(0,0)},openOverlay:function(){this.overlayCloseBtn.css("display","block"),this.productOverlay.addClass("active"),this.mainNavToggle.css("display","none")},closeOverlay:function(b){var c=a(b.target);this.productOverlay.removeClass("active"),c.css("display","none"),this.mainNavToggle.css("display","block")},scrollHandler:function(){},resizeHandler:function(){this.applyOrientation(),this.viewportHeight=this.theWindow.outerHeight(),this.viewportWidth=this.theWindow.outerWidth(),this.heightTotal=this.mainVisual.height(),this.productVisualHeight=this.viewportHeight-this.restHeigth,this.setMainVisial()}},a(function(){LISTEDBLUE.init({template:a("#product-template").html(),container:a(".product-wrap")})})}(window.jQuery);