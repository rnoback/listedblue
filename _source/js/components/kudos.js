(function ($) {
    var Kudos = INSPIRE.Kudos = function () {
        if (arguments.length) {
            this.init.apply(this, arguments);
        }
    };

    //settings
    Kudos.prototype.settings = {
        'mobile' : Modernizr.touch,
        'selector' : '.btn-kudos',
        'voteClass' : 'vote',
        'votedClass' : 'voted',
        'logEl' : '',
        'logEvent' : ''
    };

    //init
    Kudos.prototype.init = function (settings) {
        this.settings = $.extend({}, this.settings, settings || {});
        this.buttons = $(this.settings.selector);
        this.logEl = $(this.settings.logEl);
        this.bind();
    };

    Kudos.prototype.bind = function() {
        this.buttons.on('click',function(e){
            e.preventDefault();
            var el = $(e.currentTarget);
            var url = el.attr('href');
            //Only action when not voted yet
            if(!el.hasClass(this.settings.votedClass)) {
                this.action(el);
            }
        }.bind(this));
    };

    Kudos.prototype.action = function(el) {
        var url = el.attr('data-url');
        this.Post = $.post(url)
            .done(function() {
                if(el.hasClass(this.settings.votedClass)) {
                    //Already voted...
                } else {
                    newClass = this.settings.votedClass;
                    text = el.attr('data-voted-message');
                }
                //push message to notification class
                this.response(text);
                //add new class
                el.attr('class','btn-kudos').addClass(newClass);
                
            }.bind(this))
            .fail(function(data) {
                //console.log('fail');
            });
    };

    Kudos.prototype.response = function(text) {
        this.logEl.trigger(this.settings.logEvent,text);
    };

    $.fn.solutions = function (settings) {
        $(this).each(function () {
            $(this).data('lib-Kudos', new Kudos(this, settings));
        });
    };
})($);