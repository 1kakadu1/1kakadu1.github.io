$(function(){
    "use strict";

    $('#info').click( function(){
      $('#info_box').toggleClass('open');
    });
    
    $('.pr_bar').each(function(){
    	let width = $(this).data('skill');//в переменную записываем необходимую цифру

    	$(this).css('width', width + '%');
    });

        $('#menu_btn').click( function(){
      $('#main_nav').toggleClass('open');
    });
});
