(function ($) {
    var Follow = INSPIRE.Follow = function () {
        if (arguments.length) {
            this.init.apply(this, arguments);
        }
    };

    //settings
    Follow.prototype.settings = {
        'mobile' : Modernizr.touch,
        'selector' : '.btn-follow',
        'followClass' : 'follow',
        'followingClass' : 'following',
        'logEl' : '',
        'logEvent' : ''
    };

    //init
    Follow.prototype.init = function (settings) {
        this.settings = $.extend({}, this.settings, settings || {});
        this.buttons = $(this.settings.selector);
        this.logEl = $(this.settings.logEl);
        this.bind();
    };

    Follow.prototype.bind = function() {
        this.buttons.on('click',function(e){
            e.preventDefault();
            var el = $(e.currentTarget);
            var url = el.attr('href');
            if(url !== '#') {
                window.location = url;
            } else {
                this.action(el);
            }
        }.bind(this));
    };

    Follow.prototype.action = function(el) {
        var url = el.attr('data-url');
        this.Post = $.post(url)
            .done(function() {
                if(el.hasClass(this.settings.followingClass)) {
                    newClass = this.settings.followClass;
                    text = el.attr('data-unfollow-message');
                } else {
                    newClass = this.settings.followingClass;
                    text = el.attr('data-follow-message');
                }
                //push message to notification class
                this.response(text);
                //destroy or add new class
                if(el.attr('data-destroy') == 'true') {
                    el.fadeOut(500).remove();
                } else {
                    el.attr('class','btn-follow').addClass(newClass);
                }
            }.bind(this))
            .fail(function(data) {
                console.log('fail');
            });
    };

    Follow.prototype.response = function(text) {
        this.logEl.trigger(this.settings.logEvent,text);
    };

    $.fn.solutions = function (settings) {
        $(this).each(function () {
            $(this).data('lib-Follow', new Follow(this, settings));
        });
    };
})($);