/**
 * [INSPIRE.notification]
 *
 * @date        [18.09.2013]
 * @version     [version e.g. 0.1]
 * @author      [Pim van Ooij] - LBi Lost Boys
 */
INSPIRE.Notification = (function($) {

    // SETTINGS
    var selector = {
        'notification' : '#notification'
    },

    ev = {
        'listen' : 'show-message'
    },

    //common used vars
    el,parent,id,

    notification = {
        version: 0.1,

        // Component initialization...
        init: function () {
            //do the magic
            this.createCacheItems();
            this.listen();
        },

        createCacheItems: function(){
            this.el = $(selector.notification);
        },

        listen: function() {
            this.el.on(ev.listen,function(e,text){
                this.el.find('.text').text(text);
                this.el.fadeIn(250, function() {
                    setTimeout(function() {
                        this.el.hide(500);
                    }.bind(this), 2000);
                }.bind(this));
            }.bind(this));
        }
    }

    $(function() {
        notification.init();
    });

    return notification;

}(window.jQuery));