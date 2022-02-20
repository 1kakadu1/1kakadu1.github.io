// проверка размера крана
 /* function windowSize(){
    if ($(window).width() <= '540'){
    	let url = "phone.html";
		$(location).attr('href',url);
    }
}
		$(window).on('load resize',windowSize);

*/
window.addEventListener("DOMContentLoaded", function(){
	"use strict";
// видео вкл. при ховер(ifraim)
let flagVideo = false;

if(flagVideo == true){

	let linkVideo = document.getElementsByClassName("playvideo"),
	videoPlay = document.getElementsByClassName("video-play"),
	myRe = new RegExp(/autoplay=1|&/gi);

	for (let i = 0; i < linkVideo.length; i++) {
		
		linkVideo[i].addEventListener("mouseover",function(){
			 let symbol = videoPlay[i].src.indexOf("?") > -1 ? "&" : "?";
			 	 videoPlay[i].src+= symbol + "autoplay=1";
		});


		linkVideo[i].addEventListener("mouseout",function(){
			 let symbol = videoPlay[i].src;
			 	console.log(myRe);
			 	symbol= symbol.replace(myRe,"");
			 	console.log(symbol);
			 	videoPlay[i].src= symbol;
		});


		
	}
}

function createStyle() {
    var e = document.createElement("style");
    e.type = "text/css", e.innerHTML = ".game-post .post-content{width:70%}.slider .slider-items .content-preview{left:-325px;top:99px}@media screen and (max-width:1335px){.game-post .post-content{width:60%}}", document.getElementsByTagName("head")[0].appendChild(e)
}

function getInternetExplorerVersion() {
    var e = -1;
    if ("Microsoft Internet Explorer" == navigator.appName) {
        var i = navigator.userAgent;
        null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(i) && (e = parseFloat(RegExp.$1))
    } else if ("Netscape" == navigator.appName) {
        i = navigator.userAgent;
        null != new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(i) && (e = parseFloat(RegExp.$1))
    }
    return e
} - 1 !== getInternetExplorerVersion() && (createStyle(), console.log("ie"));

// lib wow
var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window
  }
);
wow.init();

// форма поиска
let btnSearch = document.getElementsByClassName("search-btn")[0],
	clickFlag = 0,
	blockSearch = document.getElementsByClassName("search")[0],
	btnSearchTop = document.getElementsByName("top"),
	btnSearchPrev = document.getElementsByName('prevS'),
	btnSearchNext = document.getElementsByName('nextS');

	blockSearch.style.display = 'none';
	hiddenBtnSearch();
function exchangeClass(classNameAdd, classNameRemove){
		blockSearch.classList.remove(classNameRemove);
		blockSearch.classList.add(classNameAdd);
}

function hiddenBtnSearch(){
	btnSearchTop[0].classList.add('none');
	btnSearchPrev[0].classList.add('none');
	btnSearchNext[0].classList.add('none');
}

function showBtnSearch(){
	btnSearchTop[0].classList.remove('none');
	btnSearchPrev[0].classList.remove('none');
	btnSearchNext[0].classList.remove('none');
}


btnSearch.addEventListener("click", function(){
	
	//this.disabled = true;

	if(clickFlag == 0){
		this.classList.add('rotate45');
		blockSearch.style.display = 'block';
		exchangeClass("slideInRight","slideOutRight");
		this.disabled = false;
		showBtnSearch()
		clickFlag = 1;

	} else if (clickFlag == 1) {

		this.classList.remove('rotate45');
		exchangeClass("slideOutRight","slideInRight");
		hiddenBtnSearch();
		setTimeout(function(){
			blockSearch.style.display = 'none';	
		},1000);
		
		clickFlag = 0;
	}


});

// меню на 996px-360px
  let toggles = document.querySelectorAll(".cmn-toggle-switch"),
  	  menuLeft = document.getElementsByClassName("menu-start__left")[0],
  	  menuRight = document.getElementsByClassName("menu-end")[0],
  	  header = document.getElementsByTagName("header")[0];

  for (let i = toggles.length - 1; i >= 0; i--) {
    let toggle = toggles[i];
    toggleHandler(toggle);
  };

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      if(this.classList.contains("active") !== true){

		    this.classList.add("active");
		    header.style.flexFlow="column";
		    $('.menu-end').slideDown(500,"linear",function(){
		    	$(this).css({
			      display: "flex"
			    })
		    });
			$('.menu-start__left').slideDown(500,"linear", function(){
				$(this).css({
			      display: "flex"
			    })
			});
      }else {
      	this.classList.remove("active");

		$('.menu-end').slideUp(500,"linear",function(){
				$(this).css({
			      display: "none"
			    })
		});
		$('.menu-start__left').slideUp(500,"linear",function(){
				$(this).css({
			      display: "none"
			    })
		});
		setTimeout(function(){
			header.removeAttribute("style");
		}, 500)
		
      } 

    });
  }

    function dataPage(a){
       switch (a) {
           case "aunt": return ["r-a",1]; break;
           case "reg": return ["r-a",0]; break;
           case "msg": return ["send",0]; break;
           case "addPost": return ["add-post",0]; break;
       }
    }

    function  showTabG($n){
        let $tab = $('.tab');
        console.log($tab);
        for (let $i = 0; $i < $tab.length; $i++) {
            $($tab[$i]).hide("slow");
        }

        $($tab[$n]).show("slow");
    }

    let indexPage = "",flag=0;
  $('.view-form').on('click', function(){
        event.preventDefault();
        $('.modal').show("slow").css('display','flex');
        $('body').css('overflow','hidden');
        let namePage = dataPage($(this).data('in'));
        if(indexPage != namePage[0]){
        	
            $(".modal").load( 'ajaxPage/'+namePage[0]+'.html?'+ new Date().getTime());
            indexPage = namePage[0];
        }
    });

    $(document).mouseup(function (e) {
        let container = $('.modal');
        if (container.has(e.target).length === 0){
            document.body.style.overflow = '';
            container.hide("slow");
            //$("#new-content").remove();
        }
    });

    $('.close').on('click', function(){
        let container = $('.modal');
        document.body.style.overflow = '';
        container.hide("slow");
        //$("#new-content").remove();
    });
});
