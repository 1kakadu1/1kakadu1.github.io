$(document).ready(function() {
// параллах
let $parallaxClass = $('.slider-img > div')[0].className,
	$returnImgPr=0;
	$parallaxClass= '.'+$parallaxClass;
	function returnImg(a){
		switch(a) {
			case ".parallax-video":
				return "video.png"
				break;
			case ".parallax-game":
				return "game.png"
				break;
			case ".parallax-window":
				return "Layer_39.png"
				break;
			case ".parallax-news":
				return "news.png"
				break;
			case ".parallax-article":
				return "article.png"
				break;
			case ".parallax-audio":
				return "def.png"
				break;
			default:
				return "def.png"
				break;
		}
	}

$returnImgPr = returnImg($parallaxClass);
console.log($returnImgPr)
$($parallaxClass).parallax({
  	imageSrc: './img/'+$returnImgPr,
  	bleed: 0,
  	speed: 0.2,
  	androidFix: true,
  	iosFix: true
  });
});