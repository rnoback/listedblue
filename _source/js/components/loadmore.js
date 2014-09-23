/**
 * [INSPIRE.loadmore]
 *
 * @date        [01.11.2013]
 * @version     [version e.g. 0.1]
 * @author      [Pim van Ooij] - LBi Lost Boys
 */
/* <!!-->  Check to prevent error when INSPIRE is not defined */
    if(!window.INSPIRE) { window.INSPIRE = {}; } /*
</--!!> */
(function ($) {
    var el, index;
    var Loadmore = INSPIRE.Loadmore = function () {
        this.init.apply(this, arguments);
    };

    //settings
    Loadmore.prototype.settings = {
        'dataAttrContainer' : 'data-container',
        'dataAttrLimiter' : 'data-limiter',
        'dataAttrUrl' : 'data-url',
        'dataAttrIds' : 'data-ids'
    };

    //init - constructor
    Loadmore.prototype.init = function (el) {
        this.button = el;
        this.config = {
            'container' : this.button.attr(this.settings.dataAttrContainer),
            'limiter' : parseFloat(this.button.attr(this.settings.dataAttrLimiter)),
            'url' : this.button.attr(this.settings.dataAttrUrl),
            'ids' : this.button.attr(this.settings.dataAttrIds).split(','),
            'activeText' : el.text(),
            'textWrapper' : 'i',
            'loadingText' : 'Loading',
            'bussyClass' : 'loading'
        }
        this.container = $(this.config.container);
        this.buttonWrapper = this.button.closest('div');
        this.state = -1;
        //start the magic
        this.bind();
    };

    Loadmore.prototype.hideButton = function() {
        this.button.fadeOut(500,function(){
            this.remove();
        });
    };

    Loadmore.prototype.loading = function() {
        this.buttonWrapper
            .addClass(this.config.bussyClass)
            .find(this.config.textWrapper)
            .text(this.config.loadingText);
    };

    Loadmore.prototype.setActive = function() {
        this.buttonWrapper
            .removeClass(this.config.bussyClass)
            .find(this.config.textWrapper)
            .text(this.config.activeText);
    };

    Loadmore.prototype.bind = function() {
        this.button.on('click',function(e){
            e.preventDefault();
            this.loading();
            this.getIds();
            this.getRequest();
        }.bind(this))
    };

    Loadmore.prototype.getIds = function() {
        this.state = this.state + 1;
        this.start = this.state * this.config.limiter;
        this.end = this.state * this.config.limiter + this.config.limiter;
        this.idsToPull = this.config.ids.slice(this.start, this.end);
        //hide button when laste batch is recieved
        if(this.idsToPull.length < this.config.limiter) {
            this.hideButton();
        }
    };

    Loadmore.prototype.getRequest = function() {
        var dataToSend = JSON.stringify(this.idsToPull);
        var jqxhr = $.ajax({
            url: this.config.url,
            data: 'ids=' + dataToSend
        });
        jqxhr.done(function(data){
            this.appenData(data);
        }.bind(this))
    };

    Loadmore.prototype.appenData = function(data) {
        var $data = $(data);
        this.container.append( $data ).isotope( 'appended', $data );
        INSPIRE.isotope.isotope('reLayout');
        // delay to get good window height for relayout 
        setTimeout(function() {
            INSPIRE.isotope.isotope('reLayout');
        }, 500);
       this.setActive();
    };

})($);