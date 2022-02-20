$(document).ready(function() {
function audioPalyer(){
	let currentSong = 0,
		coverImg="nota.jpg";
	$("#audioPalyer")[0].src = $("#playlist li a")[0];

	$("#playlist li a").click(function(e) {
		e.preventDefault();;
		$(".cover > img").addClass("rot");
		$("#audioPalyer")[0].src = this;
		$("#playlist li i").removeClass('fa-play');
		$("#audioPalyer")[0].play();
		$("#playlist li").removeClass('current-song');
		currentSong = $(this).parent().index();
		$(this).parent().addClass("current-song");
		$("#playlist .current-song i").addClass("fa-play");

	});

	$("#audioPalyer")[0].addEventListener("ended", function(){
		currentSong++;
		$("#playlist .current-song i").removeClass('fa-play');
		 if(currentSong==$("#playlist li a").length)
		 	currentSong=0;
		$("#playlist li").removeClass('current-song');
		$(`#playlist li:eq(${currentSong})`).addClass('current-song');
		$("#playlist .current-song i").addClass("fa-play");
		$("#audioPalyer")[0].src = $("#playlist li a")[currentSong].href;
		$("#audioPalyer")[0].play();
	});

	$("#audioPalyer")[0].addEventListener("pause", function(){
		$(".cover > img").removeClass("rot");
	});

	$("#audioPalyer")[0].addEventListener("play", function(){
		$(".cover > img").addClass("rot");
	});

}
if($("#audioPalyer")!= null && $("#audioPalyer").length!= 0){
	audioPalyer();
}

$('#send-comments').click (function () {
	var email = $('#email').val ();
	var name = $('#name').val ();
	var message = $('#msg').val ();
    $('.form-warrning__info').text ("");
	$.ajax({
		url:    	'send.php',
		type:		'POST',
		cache: 		false,
		data:   	{'name':name, 'email':email, 'msg':message},
		dataType:	'html',
		beforeSend: function () {
			$('#send-comments').attr("disabled", "disabled");
            $('.form-warrning__load').addClass("form-warrning_loader-show");
		},
		success: function(data) {
			if (data == true) {
				$('#name').val ("");
				$('#email').val ("");
				$('#msg').val ("");
				$('.form-warrning__info').text ("Сообщение отправлено");
				$('#email').css ("border-color", "#60fc8c");
				$('#name').css ("border-color", "#60fc8c");
				$('#msg').css ("border-color", "#60fc8c");
			} else {
				setTimeout(function () {
					if (data == false)
						$('.form-warrning__info').text ("Проблема в работе сервера.Повторте через несколько минут");
					else {
						switch (data) {
						case "Имя не указано":
						$('#name').css ("border-color", "#f7b4b4");
						$('.form-warrning__info').text ("Имя не указано");
						break;
						case "Сообщение не указано":
						$('#msg').css ("border-color", "#f7b4b4");
						$('.form-warrning__info').text ("Сообщение не указано");
						break;
						case "Неправильный e-mail":
						$('#email').css ("border-color", "#f7b4b4");
						$('.form-warrning__info').text ("Неправильный e-mail");
						default:
						$('#email').css ("border-color", "#f7b4b4");
						$('#msg').css ("border-color", "#f7b4b4");
						$('#name').css ("border-color", "#f7b4b4");
						$('.form-warrning__info').text ("Заполнитевсе поля");
						}
					}

            	}, 1000);
			}
			
			setTimeout(function () {
                $('#send-comments').removeAttr ("disabled");
                $('.form-warrning__load').removeClass("form-warrning_loader-show");
            }, 1000);
        },
        error:function(data) {
            setTimeout(function () {
                $('#send-comments').removeAttr ("disabled");
                $('.form-warrning__load').removeClass("form-warrning_loader-show");
            }, 1000);
            $('.form-warrning__info').text ("Проблема работы сервера");
        }
	});
});

let $textarea = $('.comments-form .form .form-right .input'),
$buttonComFormOtv = $(".msg-com__btn");

$buttonComFormOtv.on('click',function(e){
    e.preventDefault();
    $textarea.val($(this).data("usname")+", ");
    let destination = $('.comments-form').offset().top;
    $('html').animate({ scrollTop: destination }, 800);
});

let $singlPostTab= $('.tabs-view .tabs > button'),
    $tagsViewGallery=$(".tabs-view__gallery"),
    $tabsViewVideo = $(".tabs-view__video");

$tagsViewGallery.css("display","block"); 

$singlPostTab.on('click',function(e){

    e.preventDefault()

    for (let index = 0; index < $singlPostTab.length; index++) {
        $singlPostTab.eq(index).removeClass("tabs_active");
    }

    $(this).addClass("tabs_active");
    let $dataIndex = $(this).data("tab");

    if($dataIndex == 0){
        $tagsViewGallery.css("display","block");
        $tabsViewVideo.removeAttr("style");
    }

    if($dataIndex == 1){
        $tabsViewVideo.css("display","block");
        $tagsViewGallery.removeAttr("style");
    }
});
// меню на 996px-360px
  let toggle = document.querySelectorAll(".menu-toggle__btn")[0];

$(window).on('load resize',windowSize);

 function windowSize(){
	if(this.innerWidth < 996){
		$('.toggle-menu').css({display: "none"});
	}

	if(this.innerWidth >= 996){
		$('.toggle-menu').removeAttr("style");
	}
}
		$(window).on('load resize',windowSize);

    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      if(this.classList.contains("menu-toggle_active") !== true){

		    this.classList.add("menu-toggle_active");
		  
		    $('.toggle-menu').slideDown(500,"linear",function(){
		    	$(this).css({
			      display: "flex"
			    })
		    });
      }else {
      	this.classList.remove("menu-toggle_active");

		$('.toggle-menu').slideUp(500,"linear",function(){
				$(this).css({
			      display: "none"
			    })
		});
		
      } 

    });
 
let $newsList = $('.marquee > .marquee__row'),
    $newsBtn = $('.button-social__btn');

newsHide(1,0);

function newsHide($m,$b){
    for (let index = 0; index <$newsList.length; index++) {
        $newsList.eq(index).css('display','none');
    }

    for (let index = 0; index <$newsBtn.length; index++) {
        $newsBtn.eq(index).removeClass("button-social__active-blue");
    }
 
    $newsList.eq($b).css('display','block');
    $newsBtn.eq($m).addClass("button-social__active-blue");
}

function searchIndexBtn($class){
    let rez = null;
    for (let index = 0; index < $newsBtn.length; index++) {
        if($newsBtn[index].lastElementChild == $class){
            rez = index;
            break;
        }
        
    }

    return rez;

}



$newsBtn.on("click", function(e) {
    console.log($(this))
    if($(this)[0].classList[1] !== "search-submit"){
        let $btnIndex = searchIndexBtn($(this)[0].lastElementChild);
        newsHide($btnIndex, $btnIndex-1);
    }
  });
$('.slider-items').slick({
  dots: true,
  arrows: false,
  infinite: false,
  speed: 700,
  appendDots: $('.slider-dot'),
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
      }
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 996,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
let $searchBtn = $(".search-submit"),
    $searchBlock = $(".search"),
    $searchResultElements = $(".search-result > .search-result__item"),
    $searchInputElement=$('.search-inv__input');
    
$searchBtn.on("click", function(e) {
        e.preventDefault();

            if(this.classList.contains("search-submit_active") !== true){

                this.classList.add("search-submit_active");
            
                $searchBlock.slideDown(500,"linear",function(){
                    $(this).css({
                    display: "block"
                    })
                });
        }else {
            this.classList.remove("search-submit_active");

            $searchBlock.slideUp(500,"linear",function(){
                    $(this).css({
                    display: "none"
                    })
            });
            
        } 

});

$searchResultElements.on("click", function(e) {
    e.preventDefault();
    console.log($(this)[0].innerText);
    $searchInputElement[0].value = $(this)[0].innerText;
});

// ajax получение запросов для поиска, подстановка в .search-result > .search-result__item
    // КОД
//

if(document.getElementsByClassName("calendar-wrapper")!= null && document.getElementsByClassName("calendar-wrapper").length!= 0){
    function Calendar2(id, year, month) {
            var Dlast = new Date(year,month+1,0).getDate(),
                D = new Date(year,month,Dlast),
                DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
                DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
                calendar = '<tr>',
                month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
            if (DNfirst != 0) {
            for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
            }else{
            for(var  i = 0; i < 6; i++) calendar += '<td>';
            }
            for(var  i = 1; i <= Dlast; i++) {
            if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
                calendar += '<td class="today">' + i;
            }else{
                calendar += '<td>' + i;
            }
            if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
                calendar += '<tr>';
            }
            }
            
            for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
            document.querySelector('#'+id+' tbody').innerHTML = calendar;
            document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
            document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
            document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
            if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {
                document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
            }
        }

        Calendar2("calendar", new Date().getFullYear(), new Date().getMonth());

        document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
        Calendar2("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)-1);
        }

        document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
        Calendar2("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)+1);
        }
}
var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');
$('.btn-soc').on('click', function(e){
    alert("Проблема работы сервера");
});

let $arrRadio = $('.question-radio > .question-radio__checkbox'),
	$questionRadio = $('.question-radio'),
	$questionRadioLable = $('.question-radio > .question-radio__lable'),
	$titleVote = $('.poll__send'),
	$vote = null, $voteFlag = 0,
	$btnPoll = $('.poll-btn > .gen-button'),
	$progressBar = $('.progress-bar'),
	$progressBarCount = $('.progress-bar__count'),
	$progressBarProc=$('.progress-bar__proc');

progressVote();

$arrRadio.on('click', function(e){

	for(let i= 0; i< $arrRadio.length; i++){
		$arrRadio.eq(i).prop('checked', false);
	}

	$(this).prop('checked', true);

	for(let i= 0; i< $arrRadio.length; i++){
		console.log()
		if($arrRadio.eq(i)[0].checked === true){
			$vote = i;
			break;
		}
	}
});

$btnPoll.eq(0).click(function(e){
	if( $vote != null && $voteFlag == 0){
		for(let i= 0; i< $arrRadio.length; i++){
			$arrRadio.eq(i).prop('disabled', true);
			$questionRadioLable.eq(i).addClass('radio_disabled');
		}

		$titleVote.css('display','block');

		// ajax отправка .......
		
		//

		$voteFlag = 1;
		$progressBarCount.eq($vote).text(parseInt($progressBarCount.eq($vote).text())+1);
	}
});

$btnPoll.eq(1).click(function(e){
	if($voteFlag == 1) {

		progressVote();

		$progressBar.css('display', 'flex');

		for(let i = 0 ; i < $progressBar.length; i++){
			let proc = $progressBar.eq(i).attr("data-vote");
			console.log($progressBarProc.eq(i));
			$progressBarProc.eq(i).css('width', proc+'%');
		}
	}
});

function progressVote(){

	let procVoteArr = [],
		sumPeople = 0,
		countWhile = 0;

	while (countWhile < $progressBarCount.length) {
		let countVote = parseInt($progressBarCount.eq(countWhile).text());
		sumPeople += countVote;
		countWhile++;
	}

	for(let i = 0; i < $progressBarCount.length; i++ ){
		let dataVote = 100 - ((sumPeople - parseInt($progressBarCount.eq(i).text()))/100);
		//let dataVote = 100-((sumPeople/(parseInt($progressBarCount.eq(i).text())/100))/100);
		$progressBar.eq(i).attr('data-vote',dataVote);
	}
}
$('.mini-items').slick({
  dots: true,
  arrows: false,
  infinite: false,
  speed: 700,
  appendDots: $('.dot-carusel'),
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 997,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint:768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
$('.slider-post').slick({
  dots: false,
  arrows: true,
  nextArrow: $('.arrow-slider__next'),
  prevArrow: $('.arrow-slider__prev'),
  infinite: false,
  fade: true,
  speed: 900,
  appendDots: $('.slider-dot'),
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
});