+function($){ "use strict";
  var Common={
    createNew:function(){
      var common={};
      common.transfer=function($o){ //单页场景切换
        var hash=window.location.hash;
        if($(hash).length>0){
          Common.createNew().goScence($(hash));
        }

        $o.on("tap", function(){
          var target=$($(this).attr("href"));
          Common.createNew().goScence(target);
        }).on("click", function(e){
          e.preventDefault();
        });
      }
      common.goScence=function($o){
        $("section.slideIn").removeClass("slideIn").addClass("slideOut");
        $o.removeClass("slideOut").addClass("slideIn");
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
        // shake();

        $(".event-page .wish-count>span").on("tap", function(){
          $(".wish-content").val("");
        });
        $("#event-deep-2>div.action-bar>a:last-child").on("tap", function(){
          if($(".wish-content").val()==="") {return false;}
          else{
            c.transfer($(this));
            $("#event-deep-3 .wish-text").html($(".wish-content").val().substring(0,30));
            shake();
          }
        }).on("click", function(){return false;});

      };

      var shake=function(){
        var c = 0;
        var h = $(".wish-full").height();
        $(window).on("click", function(){
          if(c<7){
            $(".wish-full").style("background-position", "0 -"+c*h+"px");
            c++;
          }
          if(c===7){
            window.setTimeout(function(){window.location="event-over.html"},2000)
          }
        });
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