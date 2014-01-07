+function($){ "use strict";
  var Seven={
    createNew:function(){
      var seven={};
      seven.transfer=function(){
        var hash=window.location.hash;
        if($(hash).length>0){
          $(".seven-page section").style("z-index", "0");
          $(hash).style("z-index","10");
        }

        $(".action-bar>a, #seven-love>a").on("tap", function(e){
          e.preventDefault();
          var target=$($(this).attr("href"));
          $(".seven-page section").style("z-index", "0");
          target.style("z-index","10");
        });

      };
      return seven;
    }
  };

  var init=function(){
    document.body.addEventListener("touchmove", false);
    Seven.createNew().transfer();
  }();
}(window.Quo);