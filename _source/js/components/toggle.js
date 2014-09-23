/**
 * [INSPIRE.Toggle]
 *
 * @date        [23.09.2013]
 * @version     [version e.g. 0.1]
 * @author      [Pim van Ooij] - LBi Lost Boys
 * -----------------------------------------------------------------------------------------
 * click target example:
 *      <a data-active="false" data-setActiveClass="true" data-target="search-bar" href="#">
 *          <span class="icon-search"></span>
 *      </a>
 * ----------------------------------------
 * Target Example
 *      <div class="search-wrapper" data-toggle-target="search-bar"></div>
 * -----------------------------------------------------------------------------------------
 */
/* <!!-->  Check to prevent error when INSPIRE is not defined */
    if(!window.INSPIRE) { window.INSPIRE = {}; } /*
</--!!> */
INSPIRE.Notification = (function($) {

    // SETTINGS
    var cfg = {
        activeClass: 'is-active',
        animationSpeed: 500,
        //data attributes
        dataAtributeActive: 'data-active',
        dataAtributeSetActiveClass: 'data-setActiveClass',
        dataAtributeTargetValue: 'data-target',
        dataAtributeTarget: 'data-toggle-target'

    },

    toggleSelectors = [
        '.toggle[data-target]'
    ],

    toggle = {

        version: 0.1,

        debug: true,

        // Component initialization...
        init: function () {
            this.selectors = toggleSelectors.join(", ");
            //do the magic
            this.bindEvent();
        },

        bindEvent: function() {
            $(this.selectors).on('click',function(e){
                e.preventDefault();
                var el = $(e.currentTarget);
                this.toggle(el);
            }.bind(this));
        },

        toggle: function(el) {
            var target = el.attr(cfg.dataAtributeTargetValue);
            if(el.attr(cfg.dataAtributeActive) == 'true') {
                //close toggle
                if(el.attr(cfg.dataAtributeSetActiveClass) == 'true') {
                    el.removeClass(cfg.activeClass);
                }
                $('[' + cfg.dataAtributeTarget + '=' + target + ']').fadeOut(cfg.animationSpeed);
                el.attr(cfg.dataAtributeActive,'false');
            } else {
                //open toggle
                if(el.attr(cfg.dataAtributeSetActiveClass) == 'true') {
                    el.addClass(cfg.activeClass);
                }
                $('[' + cfg.dataAtributeTarget + '=' + target + ']').fadeIn(cfg.animationSpeed);
                el.attr(cfg.dataAtributeActive,'true');
            }
        }
    };

    $(function() {
        toggle.init();
    });

    return toggle;

}(window.jQuery));