/**
 * [INSPIRE.Downloads]
 *
 * @date        [27.07.2014]
 * @version     [version e.g. 0.1]
 * @author      DigitasLbi
 */
/* <!!-->  Check to prevent error when INSPIRE is not defined */
    if(!window.INSPIRE) { window.INSPIRE = {}; } /*
</--!!> */
INSPIRE.Downloads = (function($) {

    // SETTINGS
    var cfg = {
        activeClass: 'is-active',
        allClass: 'all',

        //data attributes
        dataAtributeFilter: 'data-filter'
    },

    downloads = {

        version: 0.1,
        debug: true,

        // Component initialization...
        init: function () {
          
            //Get
            this.btnAll= $('.btn-all');
            this.btnClear= $('.btn-clear');
            this.btnClearNoResults=$('.no-download-results a');

            this.btnFilters = $('.downloads-filter li a');
            this.listContainer = $('.downloads-wrapper');
            this.listElements = $('.downloads-wrapper ul li');

            this.amountSpan = $('.amount-results span.count');
            this.amountZeroDiv = $('.amount-results .no-download-results');
             

            //init filter buttons
            this.btnFilters.on('click', function(e) {
                e.preventDefault();
                var filter = $(e.target);

                if(filter.hasClass(cfg.activeClass)){
                    this.setFilterInactive(filter);
                }else{
                    this.setFilterActive(filter);
                }
                
                this.recalculateResults();

            }.bind(this));

            //init all button
            $(this.btnAll).add(this.btnClear).add(this.btnClearNoResults).on('click', function(e) {
                e.preventDefault();
                //Reset view
                this.reset();
            }.bind(this));
            //set initial reset
            this.reset();
        },

        /**
         * Sets a filter as active
         * @param {object} filter
         */
        setFilterActive: function(filter){
            //Set filter class active
            filter.addClass(cfg.activeClass);
            //Add filter to overview
            this.listContainer.addClass(filter.attr(cfg.dataAtributeFilter));

            //Deactivate all when a filter is pressed
            if(filter != this.btnAll) {
                this.setFilterInactive(this.btnAll);
            }
        },
        
        /**
         * Sets a filter as inactive
         * @param {object} filter
         */
        setFilterInactive: function(filter){
            //Set filter class active
            $(filter).removeClass(cfg.activeClass);
            //Add filter to overview
            this.listContainer.removeClass(filter.attr(cfg.dataAtributeFilter));

            //no more filters active?
            if(this.btnFilters.filter('.' + cfg.activeClass).length === 0) {
                //no filters active?
                this.reset();
            }
        },
        
        /**
         * Counts and handles the results
         */
        recalculateResults : function() {
            //Do count of visible items
            var amount  = this.listElements.filter(':visible').length;
            //Set amount in html
            this.amountSpan.text(amount);

            if(amount === 0) {
            //Show no results div
            this.amountZeroDiv.show();

            } else {
            //hide no results div
            this.amountZeroDiv.hide();
            }
        },
        /**
         * Reset all filters, turns 'all' on
         */
        reset : function() {
            //Remove all active classes
            var activeFilters = this.btnFilters.filter('.'+cfg.activeClass);
            activeFilters.each( function (i) {
            this.setFilterInactive($(activeFilters[i]));
            }.bind(this));

            //Set all button active
            this.setFilterActive(this.btnAll);

            //redraw
            this.recalculateResults();
        }
    };

    $(function() {
        downloads.init();
    });

    return downloads;

}(window.jQuery));