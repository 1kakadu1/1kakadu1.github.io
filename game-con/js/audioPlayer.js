function audioPalyer(){
	let currentSong = 0,
		coverImg="nota.jpg";
	$("#audioPalyer")[0].src = $("#playlist li a")[0];
	//$("#audioPalyer")[0].play();

	$("#playlist li a").click(function(e) {
		e.preventDefault();
		randCover(this);
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
		$('.cover > img')[0].src = `./img/cover/nota.jpg`;
		$(".cover > img").removeClass("rot");
	});

	$("#audioPalyer")[0].addEventListener("play", function(){
		
		$('.cover > img')[0].src = `./img/cover/${coverImg}`;
		$(".cover > img").addClass("rot");
	});

	function randCover(a){
		if(a.className == 'cover_bg'){

			let nameImg=swImg(Math.floor(Math.random() * 5));
				coverImg = nameImg;
			$('.cover').removeClass('fadeIn');
			setTimeout(function(){
				$('.cover').addClass('fadeIn');
			},10);
			
			$('.cover > img')[0].src = `./img/cover/${nameImg}`;
		} else {$('.cover > img')[0].src = `./img/cover/nota.jpg`;}


		function swImg(number){
			switch(number + 1) {
				case 1:
					return "1.gif";
					break;
				case 2:
					return "2.gif";
					break;
				case 3:
					return "3.gif";
					break;
				case 4:
					return "4.gif";
					break;
				case 5:
					return "5.gif";
					break;
			}
		}

	}
}

audioPalyer();