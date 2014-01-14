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
      };

      common.goScence=function($o){
        $("section.slideIn").removeClass("slideIn").addClass("slideOut");
        $o.removeClass("slideOut").addClass("slideIn");
      };

      common.goto=function(){ //event完毕，跳转到分享页面
        window.setTimeout(function(){window.location="event-over.html";},2000);
      };
      return common;
    }
  };

  var Seven={
    createNew:function(){
      var seven={}, c=Common.createNew();
      seven.init=function(){
        var $o=$(".seven-page .action-bar>a, #seven-love>a");
        c.transfer($o);
        $("#seven-love>a").on("click", function(){return false;});
        this.listHeight();
      };
      seven.listHeight=function(){
        var h=window.innerHeight-$("nav.navbar").height()-$(".action-bar").height();
        $(".seven-page .event-link ul").style("height",h+"px").children().style("height",h/3+"px");
      };
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
        $(window).on("shake", function(e){
          e.preventDefault();
          // if($("#event-deep-2")) {
            $("#event-deep-2").remove();
          // }
          if(c<7){
            $(".wish-full").style("background-position", "0 -"+c*h+"px");
            c++;
          }
          if(c===7){
            Common.createNew().goto();
          }
        });
      };
      return eventDeep;
    }
  };

  var EventGlow={
    createNew:function(){
      var eventGlow={}, tapCount=0;
      eventGlow.init=function(){
        $("#event-glow-1>.sun-glow").on("tap", function(){
          if(tapCount<7){
            tapCount++;
            $(this).addClass("glow-x"+tapCount);
            $(".click-count>p>span").html(tapCount);
          }
          if(tapCount===7){
            $(".radiance").style("visibility", "visible");
            Common.createNew().goto();
          }
        });
      };
      return eventGlow;
    }
  };

  var EventBeauty={
    createNew:function(){
      var eventBeauty={};
      eventBeauty.init=function(){

      };
      return eventBeauty;
    }
  };

  var EventTouch={
    createNew:function(){
      var eventTouch={};
      eventTouch.init=function(){
        $(".pinch").on("pinchIn", function(){
          $(".big-glow").style("visibility", "visible");
          $(".pinch").style("visibility", "hidden");
          Common.createNew().goto();
        });
      };
      return eventTouch;
    }
  };

  var EventScent={
    createNew:function(){
      var eventScent={};
      eventScent.init=function(){
        $(".heart-zone").on("touchstart", function(e){
          if(e.touches.length===2){
            $(this).addClass("kissed");
            Common.createNew().goto();
          }
        });
      };
      return eventScent;
    }
  };

  var EventRev={
    createNew:function(){
      var eventRev={}, str="I am fall in love", s=0, t;
      eventRev.init=function(){
        $(".text-input").on("keydown",function(){
          if(s===0){
            t=window.setInterval(function(){s++;}, 10);
          }
        }).on("keyup", function(){
          if(s>=700){
            window.clearInterval(t);
          }
          if(s<=700 && this.value===str){
            window.clearInterval(t);
            $("#event-revitalised-1>img").style("visibility","visible");
          }
        });

        $("#event-revitalised-1>img").on("tap", function(){
          window.location="event-over.html";
        });
      };
      return eventRev;
    }
  };

  var Init=function(){
    $("section:not(#event-beauty-1)").on("touchmove", function(e){e.preventDefault();});
    var f=[Seven, EventDeep, EventGlow, EventBeauty, EventTouch, EventScent, EventRev], i;
    for(i in f){
      f[i].createNew().init();
    }
    /*Seven.createNew().init();
    EventDeep.createNew().init();
    EventGlow.createNew().init();
    EventBeauty.createNew().init();
    EventTouch.createNew().init();
    EventScent.createNew().init();
    EventRev.createNew().init();*/
  }();
}(window.Quo);