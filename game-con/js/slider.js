let btnSlideNext = document.getElementsByClassName("next-btn"),
  	btnSlidePrev = document.getElementsByClassName("prev-btn"),
  	blockVideo = document.getElementsByClassName("video-post"),
  	blockGame = document.getElementsByClassName("game-post"),
    bodySlide = document.getElementsByTagName('body'),
    dotVideo = document.querySelectorAll('.video-slider__dot > .dot'),
    dotGame = document.querySelectorAll('.game-slider__dot > .dot');

let objIndex = {
  game: 1, 
  video: 1,
},

objBlockSlider = {
 game: blockGame,
 video: blockVideo,
},

objDotSlider = {
   game: dotGame,
   video: dotVideo,
},
bufTargetDot = 0;

 bodySlide[0].addEventListener("click", function(e){
    e = e || event
    let target = e.target || e.srcElement,
        indexOnObj = 0;
      
    if( target.parentNode.className =="next-btn" 
        || target.parentNode.parentNode.className =="next-btn"
            || target.className =="next-btn") {

      indexOnObj = targetName(target);
      objIndex[indexOnObj]=plusSlides(1,objIndex[indexOnObj],indexOnObj);
    }

    if( target.parentNode.className =="prev-btn"
        || target.parentNode.parentNode.className =="prev-btn"
           || target.className =="prev-btn") {

      indexOnObj = targetName(target);
      objIndex[indexOnObj]=plusSlides(-1,objIndex[indexOnObj],indexOnObj);
    }

    if( target.className =="dot") {

            target.classList.add("flagCount");

        let posDot = flagCountDot(target.parentNode.className);
             target.classList.remove("flagCount");
        
        let bufIndexObj = target.parentNode.className.replace("-slider__dot", "");
            bufIndexObj = bufIndexObj .replace(".", "");

        objIndex[bufIndexObj]=currentSlide(posDot+1,objIndex[bufIndexObj],bufIndexObj);
    }

    function flagCountDot(dotParentElem){
        let  siderDot = document.querySelectorAll(dotParentElem+'> .dot'), 
              lengthMass = siderDot.length, j = 0;

              while (j < lengthMass) {
                 if(siderDot[j].className == "dot flagCount" 
                    || siderDot[j].className == "dot dot_active flagCount"){
                    break;
                 }
                 j++;
               }

               return j;
    }

    function targetName(tar){
      let bufStr = "";
        switch(tar.tagName) {
          case "svg":
            bufStr = tar.parentNode.parentNode.className;
            bufStr = bufStr.replace("-slider__btn", "");
            bufStr = bufStr.replace(".", "");
            return bufStr;
            break;
          case "path":
            bufStr = tar.parentNode.parentNode.parentNode.className;
            bufStr = bufStr.replace("-slider__btn", "");
            bufStr = bufStr.replace(".", "");
            return bufStr;
            break;
          case "BUTTON":
            bufStr = tar.parentNode.className;
            bufStr = bufStr.replace("-slider__btn", "");
            bufStr = bufStr.replace(".", "");
            return bufStr;
            break;
        }
    }

  });

    function showSlides(n, key){
      let dotsAllBlock = objDotSlider[key],
      indClassNone = 1,
      index = n;

      function timerAddClass(classNameIn,classNameOut){
            setTimeout(function(){
              sliderExchangeClass(objBlockSlider[key][index - 1],classNameIn, "none");
            }, 701);

            sliderExchangeClass(objBlockSlider[key][indClassNone],classNameOut, "none");

            setTimeout(function(){
              sliderExchangeClass(objBlockSlider[key][indClassNone],"none", classNameOut);
            }, 700);
      }
      
      if(n > objBlockSlider[key].length){
        index = 1;
      };

      if(n < 1){
        index = objBlockSlider[key].length;
      };

      for(let i=0; i < objBlockSlider[key].length;i++){
        objBlockSlider[key][i].classList.add('none');
        objBlockSlider[key][i].classList.remove('slideInDown', 'slideOutUp', 'slideOutRight', 'slideOutRight', 'slideInRight');

        if(index-2 == i){
            indClassNone = i;
        }
        
      }

      for(let i = 0; i < dotsAllBlock.length; i++){
          dotsAllBlock[i].classList.remove('dot_active');
      };

      if((index > objIndex[key]  && index-1 != objBlockSlider[key].length) 
            || n-1 == objBlockSlider[key].length){

        timerAddClass("slideInDown","slideOutRight");
      }

      if((index <= objIndex[key] && n-1 != objBlockSlider[key].length) 
          || n < 1 ){

        timerAddClass("slideInRight","slideOutUp");
      }

      dotsAllBlock[index - 1].classList.add('dot_active');

     return index;
    }

    function plusSlides(n, index, key){
      return showSlides(index += n, key);
    }

    function currentSlide(n, index, key){
      return showSlides(index = n, key);
    }

    function sliderExchangeClass(blockSinceClass,classNameAdd, classNameRemove){
      blockSinceClass.classList.remove(classNameRemove);
      blockSinceClass.classList.add(classNameAdd);
    }
