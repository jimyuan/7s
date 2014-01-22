+function($){ "use strict";
  var Common={
    createNew:function(){
      var common={};
      common.shareText={
        DEEP: "#7秒爱上绿活泉#想知道我心中爱的愿望吗？开启愿望之门一起来许愿，感受碧欧泉爱的体验。快来和我一起赢取皇牌保湿绿活泉吧！",
        GLOW: "#7秒爱上绿活泉#爱的滋长需要温暖和阳光，我刚刚参与碧欧泉爱的体验，感受到了暖暖爱意。快来和我一起赢取皇牌保湿绿活泉吧！",
        BEAUTIFUL: "#7秒爱上绿活泉#大笑是为了证明快乐，苦笑是为了忘却苦涩，而只有微笑是在感受快乐！分享微笑美照，传递浓浓爱意！快来和我一起赢取皇牌保湿绿活泉吧！",
        TOUCH: "#7秒爱上绿活泉#和TA瞬间的触碰，是否有怦然心动？参与碧欧泉爱的体验，感受那份指尖的悸动！快来和我一起赢取皇牌保湿绿活泉吧！",
        SCENT: "#7秒爱上绿活泉#在爱的距离中，无论多远，都想向对方传递爱的气息。Kiss手机屏幕，留下爱的印记吧！快来和我一起赢取皇牌保湿绿活泉吧！",
        REVITALISED: "#7秒爱上绿活泉#打破爱的僵局，有时的确需要勇气，7秒内，成功输入I am fall in love，勇敢说出自己爱的告白吧！快来和我一起赢取皇牌保湿绿活泉吧！"
      };
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

      common.goto=function(EVENT){ //event完毕，跳转到分享页面
        var wait=arguments[1] || 2000;
        localStorage.setItem("type",EVENT);
        localStorage.setItem("text", this.shareText[EVENT]);
        window.setTimeout(function(){window.location="event-over.html";},wait);
      };

      common.passedEvent=function(item, page){
        localStorage.setItem(item, page);
      };

      common.GAEvent=function(act, tag, uri){
        var redirect=uri || "";
        _gaq.push(['_trackEvent', 'm7', act, tag]);
        if(redirect!==""){
          setTimeout(function(){
            window.location.href = redirect;
          },100);          
        }
        console.log("_trackEvent", "m7", act, tag, uri);
      };

      return common;
    }
  };

  var Home={
    createNew:function(){
      var home={};
      home.init=function(){
        $(".video-area").on("tap", function(){
          $(this).children("iframe").style("display", "block");
        });
      };
      return home;
    }
  };

  var Seven={
    createNew:function(){
      var seven={}, c=Common.createNew();
      seven.init=function(){
        var $o=$(".seven-page .action-bar>a");
        c.transfer($o);
        this.listHeight();
        this.markEvents();

        //分享按钮
        $(".btn-share").on("click", function(e){
          e.preventDefault();
          $.ajax({
              type: "GET",
              url: "islogin.ashx",
              dataType: "json",
              success: function(a) {
                if(a.result==="failed"){
                  window.location = "login.aspx";
                }
                else if(a.result==="success"){
                  window.location = "share.html";
                } 
              },
              error: function() {
                console.log("failed");
              }
          });
        });

        //提交申领
        $(".apply-submit").on("click", function(e){
          e.preventDefault();
          var f=$(this).closest("form");
          var fullname=$("#fullname").val(), mobile=$("#mobile").val(), email=$("#email").val();
          var pe=/^\w(\w*\.*-*)*@([\w-]+\.)+\w{2,4}$/;
          var pm=/^\d{11}$/;

          if(fullname==="" || mobile==="" || email===""){
            alert("请将表单填写完整");
            return false;
          }
          if(!pe.test(email) || !pm.test(mobile)){
            alert("请填写正确的格式");
            return false;
          }
          $.post(
            "apply.ashx",
            {"name":fullname, "mobile":mobile, "email":email}, 
            function(e){
              if(e.result==="success"){
                alert("提交成功！");
                window.location="event-list.html";                
              }
            }, "json");
        });
      };
      seven.listHeight=function(){
        var h=window.innerHeight-$("nav.navbar").height()-$(".action-bar").height();
        $("#event-list .event-link ul").style("height",h+"px").children().style("height",h/3+"px");
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
          var $o=$("#event-deep-1>.wish-make>a");
          c.transfer($o);

          $(".event-page .wish-count>span").on("tap", function(){
            $(".wish-content").val("");
          });
          //确定按钮
          $(".submit-wish").on("click", function(e){
            e.preventDefault();
            if($(".wish-content").val()==="") {return false;}
            else{
              localStorage.setItem("wish", $(".wish-content").val());
              window.location="event-deep2.html";
            }
          });
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
        var s = 0;
        var h = $(".wish-full").height();
        $(window).on("shake", function(e){
          e.preventDefault();
          if(s<7){
            $(".wish-full").style("background-position", "0 -"+s*h+"px");
            s++;
          }
          if(s===7){
            c.passedEvent("event01","event-deep.html");
            c.goto("DEEP");
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
            Common.createNew().goto("GLOW");
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
                  $(".progress-bar").style("width", percentLoaded+"%");
                }
              };
              reader.onloadstart = function(e) {
              };
              reader.onload = function(e){
                var img=e.target.result;
                $("#text").html("").style("backgroundImage", "url('"+img+"')");
                $(".progress").style("display", "none");
                $(".picUpload").on("click", function(){
                  $.post("upload_stream.ashx",{image:img}, function(r){
                    if(r.result==="success"){
                      console.log(r.jsonResponse);
                      alert("上传成功");
                      Common.createNew().passedEvent("event03", "event-beautiful.html");
                      localStorage.setItem("pic", r.jsonResponse);
                      Common.createNew().goto("BEAUTIFUL",20);
                    }
                  }, "json");
                });
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
        $(".pinch-zone").on("pinchIn", function(){
          $(".big-glow").style("visibility", "visible");
          $(".pinch").style("visibility", "hidden");
          Common.createNew().passedEvent("event04","event-touch.html");
          Common.createNew().goto("TOUCH");
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
            Common.createNew().goto("SCENT");
          }
        });
      };
      return eventScent;
    }
  };

  var EventRev={
    createNew:function(){
      var eventRev={}, str="I am fall in love", s=0, t;
      var c=Common.createNew();
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
          c.passedEvent("event06","event-revitalised.html");
          c.goto("REVITALISED", 10);
        });
      };
      return eventRev;
    }
  };

  var AquaSource={
    createNew:function(){
      var aquasource={};
      aquasource.init=function(){
        $(".leadway>a:last-child").on("tap", function(e){
          e.preventDefault();
          $(".aqua-desc").addClass("fadeIn");
        }).on("click", function(e){e.preventDefault();});
        $(".close").on("tap", function(){
          $(".aqua-desc").removeClass("fadeIn");
        });
      };
      return aquasource;
    }
  };

  var GA={
    createNew:function(){
      var ga={}, c=Common.createNew();
      ga.init=function(){
        // virtualPage();
        virtualEvent();
      };

      var virtualEvent=function(){
        $(".review-video").on("click", function(e){
          e.preventDefault();
          c.GAEvent("click", "回顾预告视频", $(this).attr("href"));
        });
        $(".video-area").on("tap", function(e){
          e.preventDefault();
          c.GAEvent("click", "7秒初爱视频播放");
        });
        $("#seven-love>action-bar>a").on("tap", function(){
          c.GAEvent("tap","活动说明");
        });
        $("#event-list>action-bar>a").on("tap", function(){
          c.GAEvent("tap","返回7秒热恋页面");
        });
        $("#event-list ul a").on("click", function(e){
          // event list track
          e.preventDefault();
          c.GAEvent("click", "Event-"+$(this).children("strong").text(), $(this).attr("href"));
        });
        $(".more-events").on("click", function(e){
          e.preventDefault();
          c.GAEvent("click", "更多爱的体验", $(this).attr("href"));
        });
        $(".btn-share").on("click", function(e){
          e.preventDefault();
          c.GAEvent("click", "分享体验", $(this).attr("href"));
        });
        $(".btn-mall").on("click", function(e){
          e.preventDefault();
          c.GAEvent("click", "官方商城", $(this).attr("href"));
        });
        $(".btn-apply").on("click", function(e){
          e.preventDefault();
          c.GAEvent("click", "申领试用", $(this).attr("href"));
        });
        $(".apply-submit").on("tap", function(){
          c.GAEvent("tap", "提交申领");
        });   
        $(".tri-list>a").on("click", function(e){
          e.preventDefault();
          c.GAEvent("click", "保湿礼盒购买", $(this).attr("href"));
        });
        $("#pro-toning-lotion + .leadway>a:first-child").on("click", function(e){
          e.preventDefault();
          c.GAEvent("click", "活泉润透爽肤水购买", $(this).attr("href"));
        });
        $("#pro-nuit + .leadway>a:first-child").on("click", function(e){
          e.preventDefault();
          c.GAEvent("click", "睡美人晶莹霜购买", $(this).attr("href"));
        });
        $("#pro-gel + .leadway>a:first-child").on("click", function(e){
          e.preventDefault();
          c.GAEvent("click", "活泉润透水份露购买", $(this).attr("href"));
        });
        $("#pro-deep-serum + .leadway>a:first-child").on("click", function(e){
          e.preventDefault();
          c.GAEvent("click", "绿活泉精华购买", $(this).attr("href"));
        });        
      };
      return ga;
    }
  };

  var Init=function(){
    $("section:not(.scroll-page)").on("touchmove", function(e){e.preventDefault();});
    var f=[Home, Seven, EventDeep, EventGlow, EventBeauty, EventTouch, EventScent, EventRev, AquaSource, GA], i;
    for(i in f){
      f[i].createNew().init();
    }
  }();
}(window.Quo);