+function($){ "use strict";
  var Common={
    createNew:function(){
      var common={};
      common.transfer=function($o){ //单页场景切换
        var hash=window.location.hash;
        if($(hash).length>0){
          $("section.slideIn").removeClass("slideIn").addClass("slideOut");
          $(hash).removeClass("slideOut").addClass("slideIn");
        }

        $o.on("tap", function(){
          var target=$($(this).attr("href"));
          $("section.slideIn").removeClass("slideIn").addClass("slideOut");
          target.removeClass("slideOut").addClass("slideIn");
        }).on("click", function(e){
          e.preventDefault();
        });
      }
      return common;
    }
  }

  var Seven={
    createNew:function(){
      var seven={}, c=Common.createNew();
      seven.init=function(){
        var $o=$(".seven-page .action-bar>a, #seven-love>a");
        c.transfer($o);
      }
      return seven;
    }
  };

  var EventDeep={
    createNew:function(){
      var eventDeep={}, c=Common.createNew();
      eventDeep.init=function(){
        var $o=$("#event-deep-1>.wish-make>a, #event-deep-2>.action-bar>a:first-child");
        c.transfer($o);

        $(".event-page .wish-count>span").on("tap", function(){
          $(".wish-content").val("");
        });
        $("#event-deep-2>div.action-bar>a:last-child").on("tap", function(){
          if($(".wish-content").val()==="") {return false;}
          else{
            c.transfer($(this));
            $("#event-deep-1 .wish-text").html($(".wish-content").val().substring(0,30));
            $("#event-deep-1 .wish-make").style("visibility", "hidden");
            $("#event-deep-1 .wish-tips").style("visibility", "visible");
          }
        }).on("click", function(){return false;});

      };
      return eventDeep;
    }
  };

  var Init=function(){
    $("section").on("touchmove", function(e){e.preventDefault();});
    Seven.createNew().init();
    EventDeep.createNew().init();
  }();
}(window.Quo);