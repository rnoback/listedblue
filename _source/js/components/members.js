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
INSPIRE.Members = (function($) {

    // SETTINGS
    var cfg = {
        activeClass: 'is-active',
    },

    members = {

        version: 0.1,
        debug: true,


        // Component initialization...
        init: function(){
            //get
            this.follow = $('.follow .member');
            this.following = $('.following .member');
            
            this.btnToggleFollow = $('.btn-member-toggle-follow');
            this.btnToggleFollowing = $('.btn-member-toggle-following');
            
            this.initMembers(this.follow);
            this.initMembers(this.following);
            this.setAmountMembersFollow(this.follow);
            this.setAmountMembersFollowing(this.following);

            this.followOpen = false;
            this.followingOpen = false;

            this.btnToggleFollow.on('click', function(e) {
                e.preventDefault();
                if(this.followOpen){
                    this.resetAll(this.follow);
                    this.initMembers(this.follow);
                    this.followOpen = false;
                    this.btnToggleFollow.html("Toon meer <span class='amount'></span>");
                    this.setAmountMembersFollow(this.follow);
                }else{
                    this.allActive(this.follow);
                    this.followOpen = true;
                    this.btnToggleFollow.html('Toon minder ');
                    this.btnToggleFollow.find('.amount').hide();
                }
            }.bind(this));

            this.btnToggleFollowing.on('click', function(e) {
                e.preventDefault();
                if(this.followingOpen){
                    this.resetAll(this.following);
                    this.initMembers(this.following);
                    this.followingOpen = false;
                    this.btnToggleFollowing.html("Toon meer <span class='amount'></span>");
                    this.setAmountMembersFollowing(this.following);

                }else{
                    this.allActive(this.following);
                    this.followingOpen = true;
                    this.btnToggleFollowing.html('Toon minder ');
                    this.btnToggleFollowing.find('.amount').hide();
                }
            }.bind(this));
        },
        
        getAllMembers:function(members){
            var totalMembers = members.length;
            return totalMembers;
        },

        setAmountMembersFollow:function(members){
            var amount = this.getAllMembers(members);
            if(amount>6){
                this.btnToggleFollow.find('.amount').text('('+amount+')');
            }else{
                this.btnToggleFollow.css('display','none');
            }
        },

        setAmountMembersFollowing:function(members){
            var amount = this.getAllMembers(members);
            this.btnToggleFollowing.find('.amount').text('('+amount+')');
            if(amount>6){
                this.btnToggleFollowing.find('.amount').text('('+amount+')');
            }else{
                this.btnToggleFollowing.css('display','none');
            }
        },

        initMembers:function(members){
            members.slice(0,6).addClass(cfg.activeClass);
        },

        allActive: function(members){
            members.addClass(cfg.activeClass);
        },
        resetAll:function(members){
            members.removeClass(cfg.activeClass);
        }
    };

    $(function() {
        members.init();
    });

    return members;

}(window.jQuery));