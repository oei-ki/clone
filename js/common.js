function autoType(elementClass, typingSpeed){
  // console.log(elementClass+','+typingSpeed);
  let thisElem = $(elementClass);
  thisElem.prepend('<div class="cursor" style="left:0;right:initial;"></div>')
  thisElem = thisElem.find(".text");
  let text = thisElem.text().trim().split('') /*trim : 양끝의 공백을 정리함*//*문자열만듬*/
  thisElem.text("");
  let amntOfChars = text.length ;
  let newString = ""; /*나올 문자열을 넣을 변수*/

  setTimeout(function(){
    thisElem.css("opacity",1);
    thisElem.prev().removeAttr("style");
    // console.log(thisElem.prev());
    for(let i = 0; i < amntOfChars ;i++){
      (function(count, char){ /*즉시실행함수*/
        setTimeout(function(){/*뿌리는 시간*/
          newString += char;
          thisElem.text(newString);
        },count*typingSpeed)
      })(i+1, text[i])
    }
  },1500); /*시작시간*/

}
$(function(){
  autoType(".typing",200);
$(".contact a img").on({
  mouseover:function(){
    $(this).addClass("move")
  },
  mouseout:function(){
    $(this).removeClass("move")
  }
});
$(window).resize(function(){

})
const widthNum = $(".slider-box ul li").outerWidth(true);
 //1111;each문 써야하나? 이걸로 li너비구함
// console.log(widthNum);


let liLeng = $(".slider-box ul li").length;

$(".slider-box ul li:last").prependTo(".slider-box ul")
$(".slider-box").css("margin-left", -widthNum)

function initialFunc(init){
  $(".slider-box").css("margin-left", -widthNum)
  if(init == "prev"){
    $(".slider-box ul li:last").prependTo(".slider-box ul")
  }else{
    $(".slider-box ul li:first").appendTo(".slider-box ul")
  }
}

initialFunc("prev");
function actionBtn(el){
  el.click(function(){
    let caInMarginLeft = parseInt($(".slider-box").css("margin-left"));
    let isAni = $(".slider-box").is(":animated");
    if(!isAni){
      if(el.attr("id") === "carousel-prev"){
        $(".slider-box").animate({marginLeft: caInMarginLeft + widthNum },"slow","swing",function(){
          initialFunc("prev")
        });
      }else if(el.attr("id") === "carousel-next"){
        $(".slider-box").animate({marginLeft: caInMarginLeft - widthNum },"slow","swing",function(){
          initialFunc("next")
        });
      }
    }
  })
}

$(".btn").each(function(){
actionBtn($(this))
})

let windowHeight = $(window).innerHeight();
let direc = 0;
let wheelAction = false;
let maxDirec = $(".wheel-wrap section").length - 1;
function aniH(){
  $("html").animate({scrollTop:direc*windowHeight},{
    duration: 1000,
    start: function(){
      wheelAction = true;
    },
    complete: function(){
      wheelAction = false;
    }
  });
};
aniH();
$(window).on('wheel',function(event){
  let eventDelta = event.originalEvent.wheelDelta;
  if(eventDelta > 0 && wheelAction == false){
    if( direc <= 0 ){
      direc = 0;
    }else {
      direc--
      aniH()
    }
  }else if( eventDelta < 0 && wheelAction == false ){
    if(direc >= maxDirec ){
      direc = maxDirec;
    }else {
      direc++
      aniH()
    }
  }
});

});
