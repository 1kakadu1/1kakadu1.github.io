$(function(){
	"use strict";

	$('.title_box').click(function(){
		$(this).toggleClass('open')
		$(this).next('div.list_link').toggleClass('open')
	});

	$('.title_box').click(function(){
		$('nav.anim').toggleClass('slideOutDown')
	});

});
