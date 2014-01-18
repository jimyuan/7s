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

      common.passedEvent=function(item, page){
        localStorage.setItem(item, page);
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
        this.markEvents();
      };
      seven.listHeight=function(){
        var h=window.innerHeight-$("nav.navbar").height()-$(".action-bar").height();
        $(".seven-page .event-link ul").style("height",h+"px").children().style("height",h/3+"px");
      };
      seven.markEvents=function(){
        for(var i=1; i<=6; i++){
          if(localStorage.getItem("event0"+i)){
            $("li.event0"+i).addClass("passed");
          }
        }
      };
      return seven;
    }
  };

  var EventDeep={
    createNew:function(){
      var eventDeep={}, c=Common.createNew();
      eventDeep.init=function(){
        if($("#event-deep-1").length>0){
          var $o=$("#event-deep-1>.wish-make>a, #event-deep-2>.action-bar>a:first-child");
          c.transfer($o);

          $(".event-page .wish-count>span").on("tap", function(){
            $(".wish-content").val("");
          });
          //确定按钮
          $("#event-deep-2>div.action-bar>a:last-child").on("tap", function(){
            if($(".wish-content").val()==="") {return false;}
            else{
              localStorage.setItem("wish", $(".wish-content").val());
              window.location="event-deep2.html";
            }
          }).on("click", function(){return false;});
        }

        if($("#event-deep-3").length>0){
          if(localStorage.getItem("wish")==null) {
            window.location="event-deep.html";
          }
          else{
            $("#event-deep-3 .wish-text").html(localStorage.getItem("wish").substring(0,30));
            localStorage.removeItem("wish");
            shake();
          }
        }
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
            Common.createNew().passedEvent("event01","event-deep.html");
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
            Common.createNew().passedEvent("event02", "event-glow.html");
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
        $("#file").on("change", function(e){
          $(".progress").style("display", "block");//.children().style("width", "20%");
          if (window.File && window.FileReader) {
            var f=e.target.files[0];
            if(f.type.match("image.*")){
              var reader = new FileReader();
              reader.readAsDataURL(f);

              reader.onprogress =function(e){
                if (e.lengthComputable) {
                  var percentLoaded = Math.round((e.loaded / e.total) * 100);
                  // Increase the progress bar length.
                  // console.log(percentLoaded);
                  $(".progress-bar").style("width", percentLoaded+"%");
                }
              };
              reader.onloadstart = function(e) {
                //初始化进度条
                // $(".progress").style("display", "block").children().style("width", "0%");
              };
              reader.onload = function(e){
                // document.getElementById("text").style.backgroundImage="url('"+e.target.result+"')";
                $("#text").html("").style("backgroundImage", "url('"+e.target.result+"')");
                $(".progress").style("display", "none");
              };
            }
          }
        });
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
          Common.createNew().passedEvent("event04","event-touch.html");
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
            Common.createNew().passedEvent("event05","event-scent.html");
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
          Common.createNew().passedEvent("event06","event-revitalised.html");
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
  }();
}(window.Quo);