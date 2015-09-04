"console"in window&&window.console.log||(window.console={log:function(){}});var settings;!function(a){window.LISTEDBLUE={version:.1,touch:!!("ontouchstart"in window),logEl:"#notification",logEvent:"show-message",settings:{debug:!0},init:function(b){var c=this;this.dataURL="json/data.json",this.fetch(),this.template=b.template,this.container=b.container,this.colorArray=[];this.pubSub(),a.subscribe("listedblue/data",function(a,b){console.log(b),c.sortJSON(b.products,"display_order")})},sortJSON:function(a,b){return a.sort(function(a,c){var d=a[b],e=c[b];return e>d?-1:d>e?1:0})},pubSub:function(){var b=a({});a.each({trigger:"publish",on:"subscribe",off:"unsubscribe"},function(a,c){jQuery[c]=function(){b[a].apply(b,arguments)}})},attachTemplate:function(){if(this.template){var a=Handlebars.compile(this.template);a(this.products);this.container.append(a(this.products))}this.setInterface()},fetch:function(){var b=this;a.getJSON(this.dataURL,function(c){b.products=c.products,a.publish("listedblue/data",c),b.attachTemplate()})},setInterface:function(){this.isPortrait=!1,this.mainNavIsVisible=!1,this.colorArray=[],this.theBody=a("body.products"),this.theWindow=a(window),this.header=a("header"),this.mainWrap=a(".main-wrap"),this.productWrap=a(".product-wrap"),this.productOverlay=a(".product-overlay"),this.productInfo=a(".product-info"),this.heroWrapper=a(".hero-wrapper"),this.heroVisual=a(".hero-visual"),this.swipeIndicator=a(".swipe-indicator"),this.productNavigationWrap=a(".product-navigation"),this.btnNext=this.productNavigationWrap.find(".next"),this.btnPrev=this.productNavigationWrap.find(".prev"),this.mainNav=a(".products").find(".main-navigation"),this.mainNavContent=a(".content-page").find(".main-navigation"),this.selectedProductIndex=0,this.allProducts=this.productWrap.find(".product").css("display","none"),this.maxProducts=this.allProducts.length,this.isProductPage=a("body").hasClass("products");var b=this.getURLParameter("p");b&&b>=0&&b<this.maxProducts-1?this.selectedProductIndex=parseInt(b):this.selectedProductIndex=0,this.setProduct(this.selectedProductIndex),this.viewportWidth=this.theWindow.width(),this.viewportHeight=this.theWindow.outerHeight(),this.heightTotal=this.mainWrap.height(),this.productVisual=a(".product-visual"),this.productInfo=a(".product-info"),this.restHeigth=this.productInfo.height(),this.isPortrait||(this.navHeight=this.viewportHeight),this.productVisualHeight=this.viewportHeight-this.restHeigth,this.theWindow.on("orientationchange",this.onTurnScreen.bind(this)),this.applyOrientation(),this.setMainVisial(),this.theWindow.on("scroll",this.scrollHandler.bind(this)),this.theWindow.on("resize",this.resizeHandler.bind(this)),this.overlayCloseBtn=a(".navigation-wrap").find(".btn-close"),this.mainNavToggle=a(".btn-nav-toggle");setTimeout(this.resizeHandler.bind(this),100);this.btnNext.on("click touchstart",this.setNextProductIndex.bind(this)),this.btnPrev.on("click touchstart",this.setPrevProductIndex.bind(this)),this.productVisual.find("img").on("click",this.openOverlay.bind(this)),this.overlayCloseBtn.on("click",this.closeOverlay.bind(this)),this.productOverlay.on("click",this.closeOverlay.bind(this)),this.swipeIndicator.on("touchstart click",this.closeSwipeIndicator.bind(this)),this.mainNavToggle.on("click",this.toggleNav.bind(this)),a(".btn-landing-nav-toggle").on("click",this.toggleNavLanding.bind(this))},getURLParameter:function(a){return decodeURIComponent((new RegExp("[?|&]"+a+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||null},changeUrlParam:function(a,b){var c=window.location.href+"&",d=new RegExp("("+a+")=(.*)&","g"),e=c.replace(d,"$1="+b+"&");if(null!==this.getURLParameter(a))try{window.history.replaceState("","",e.slice(0,-1))}catch(f){console.log(f)}else if(this.isProductPage){var g=window.location.href;-1!==g.indexOf("?")?window.history.replaceState("","",c.slice(0,-1)+"&"+a+"="+b):window.history.replaceState("","",c.slice(0,-1)+"?"+a+"="+b)}},getProduct:function(b){return a(this.allProducts[b])},setProduct:function(b){this.curProduct=a(this.allProducts[b]),this.changeUrlParam("p",b),this.setTextColor(),this.curProduct.css("z-index",1),this.mainVisual=this.curProduct.find(".visual"),this.mainVisual.addClass("current"),this.toggleProduct()},setTextColor:function(){this.curProduct.hasClass("light")?(a(".site-header").addClass("textlight"),a(".site-header").removeClass("textdark"),a(".btn-nav-toggle").addClass("textlight"),a(".btn-nav-toggle").removeClass("textdark"),a(".btn-close").addClass("textlight"),a(".btn-close").removeClass("textdark"),this.isPortrait?(this.btnNext.addClass("textlight"),this.btnNext.removeClass("textdark"),this.btnPrev.addClass("textlight"),this.btnPrev.removeClass("textdark"),a(".product-inner").find("h2").addClass("textlight"),a(".product-inner").find("h2").removeClass("textdark")):(this.btnNext.addClass("textdark"),this.btnNext.removeClass("textlight"),this.btnPrev.addClass("textdark"),this.btnPrev.removeClass("textlight"),a(".product-inner").find("h2").addClass("textdark"),a(".product-inner").find("h2").removeClass("textlight"))):(a(".site-header").addClass("textdark"),a(".site-header").removeClass("textlight"),a(".btn-nav-toggle").addClass("textdark"),a(".btn-nav-toggle").removeClass("textlight"),a(".btn-close").addClass("textdark"),a(".btn-close").removeClass("textlight"),this.isPortrait?(this.btnNext.addClass("textdark"),this.btnNext.removeClass("textlight"),this.btnPrev.addClass("textdark"),this.btnPrev.removeClass("textlight"),a(".product-inner").find("h2").addClass("textdark"),a(".product-inner").find("h2").removeClass("textlight")):(this.btnNext.addClass("textdark"),this.btnNext.removeClass("textlight"),this.btnPrev.addClass("textdark"),this.btnPrev.removeClass("textlight"),a(".product-inner").find("h2").addClass("textdark"),a(".product-inner").find("h2").removeClass("textlight")))},toggleProduct:function(){this.oldProduct&&this.oldProduct.fadeOut(1e3,"easeOutSine"),this.curProduct.fadeIn(1e3,"easeOutSine");setTimeout(this.resizeHandler.bind(this),1)},setNextProductIndex:function(a){a.preventDefault(),this.oldProduct=this.curProduct,this.selectedProductIndex<this.maxProducts-1?this.selectedProductIndex++:this.selectedProductIndex=0,this.setProduct(this.selectedProductIndex)},setPrevProductIndex:function(a){a.preventDefault(),this.oldProduct=this.curProduct,this.selectedProductIndex>0?this.selectedProductIndex--:this.selectedProductIndex=this.maxProducts-1,this.setProduct(this.selectedProductIndex)},setMainVisial:function(){this.visualWidth=this.mainVisual.width(),this.isPortrait||(this.heightTotal>=this.productVisualHeight?(this.mainVisual.css("width","auto"),this.mainVisual.css("height",this.productVisualHeight+"px")):(this.mainVisual.css("width","100%"),this.mainVisual.css("height","auto"))),this.visualWidth=this.mainVisual.width(),this.header.css("width",this.visualWidth),this.productInfo.css("width",this.visualWidth),this.productOverlay.width(this.visualWidth),this.productOverlay.find(".column").height(this.visualWidth/2),this.productOverlay.find(".column-content > ul").css("line-height",this.visualWidth/2/34+"px"),!this.isPortrait},applyOrientation:function(){window.innerHeight>window.innerWidth?this.setPortraitMode():this.setLandscapeMode()},onTurnScreen:function(){0==window.orientation},setPortraitMode:function(){console.log("You are now in portrait"),this.isPortrait=!0,this.theBody.addClass("is-portrait"),this.theBody.removeClass("is-landscape"),this.mainVisual.css("height",this.viewportHeight+"px"),this.mainVisual.css("width","auto"),this.heroWrapper.removeClass("is-landscape"),this.heroWrapper.css("height",this.viewportHeight+"px"),this.heroWrapper.css("width","auto"),this.heroVisual.css("height","100%"),this.heroVisual.css("width","100%"),this.heroVisual.css("position","relative"),this.swipeIndicator.css("height",this.viewportHeight+"px"),this.swipeIndicator.css("width",this.mainVisual.width()),this.navHeight>0&&this.mainNav.height(this.navHeight),this.setTextColor();var b=Math.round((this.mainVisual.width()-this.viewportWidth)/2),c=a(window).scrollTop();window.scrollTo(b,c)},setLandscapeMode:function(){console.log("You are now in landscape"),this.isPortrait=!1,this.theBody.removeClass("is-portrait"),this.theBody.addClass("is-landscape"),this.mainVisual.css("width","100%"),this.mainVisual.css("height","auto"),this.setTextColor(),this.mainNav.height(this.navHeight),this.mainNavContent.height(this.navHeight),this.heroWrapper.removeClass("is-portrait"),this.heroWrapper.addClass("is-landscape"),this.heroWrapper.css("width",this.viewportWidth+"px"),this.heroWrapper.css("width","100%"),this.heroVisual.css("height","auto"),this.heroVisual.css("width","100%"),this.heroVisual.css("position","relative"),window.scrollTo(0,0)},openOverlay:function(a){this.overlayCloseBtn.show(),this.productOverlay.addClass("active"),this.mainNavToggle.hide(),this.mainNav.hide(),!this.isPortrait,this.mainNavIsVisible=!1,console.log("this.isPortrait "+this.isPortrait)},closeOverlay:function(a){this.productOverlay.removeClass("active"),this.overlayCloseBtn.hide(),this.mainNavToggle.show()},closeSwipeIndicator:function(a){this.swipeIndicator.addClass("inactive"),console.log("swipe indicator closed")},toggleNav:function(b){var c=a(b.target),d=c.siblings(".main-navigation");if(this.mainNavIsVisible,d.is(":visible"))d.hide();else{d.show();var e=this.navHeight+=25;this.isPortrait?this.navHeight>0&&d.height(e):this.visualWidth>0&&d.height(e)}},toggleNavLanding:function(b){b.preventDefault(),a(".landing .navigation-wrap").height(this.navHeight),a(".landing .navigation-wrap").is(":visible")?a(".navigation-wrap").hide():(console.log("this.isPortrait "+this.isPortrait),a(".landing .navigation-wrap").show())},scrollHandler:function(b){a(window).scrollTop()>400?a(".sticky-header").fadeIn():a(".sticky-header").fadeOut()},resizeHandler:function(){this.applyOrientation(),this.viewportHeight=this.theWindow.outerHeight(),this.viewportWidth=this.theWindow.outerWidth(),this.heightTotal=this.mainVisual.height(),this.productVisualHeight=this.viewportHeight-this.restHeigth,a(".landing .navigation-wrap").hide(),this.setMainVisial()}},a(function(){LISTEDBLUE.init({template:a("#product-template").html(),container:a(".product-wrap")})})}(window.jQuery);