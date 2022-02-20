function showSliderItem(a){

	let slCount = $('.slider-item').length;
	for(let i = 0 ; i<slCount;i++){
		$('.slider-item').eq(i).css('display','none');
	}

	$('.slider-item').eq(a).css('display','flex');
}

//showSliderItem(0);