$(document).ready(function() {

	// Scroll Events
	$(window).scroll(function(){

		var wScroll = $(this).scrollTop();

		// Activate menu
		if (wScroll > 20) {
			$('#main-nav').addClass('active2');
			$('#slide_out_menu').addClass('scrolled');
		}
		else {
			$('#main-nav').removeClass('active2');
			$('#slide_out_menu').removeClass('scrolled');
		};


		//Scroll Effects

	});

	// Wow Animations
    wow = new WOW(
      {
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       0,          // default
      mobile:       true,       // default
      live:         true        // default
    }
    )
    wow.init();

    	$(".mymagicoverbox").click(function()
{
        $("body").css("overflow", "hidden");
        $('#myfond_gris').fadeIn(300);
        var iddiv = $(this).attr("iddiv");
        $('#'+iddiv).fadeIn(300);
        $('#myfond_gris').attr('opendiv',iddiv);
        
        return false;
});

$('#myfond_gris, .mymagicoverbox_fermer').click(function()
{       $("body").css("overflow", "");
        var iddiv = $("#myfond_gris").attr('opendiv');
        $('#myfond_gris').fadeOut(300);
        $('#'+iddiv).fadeOut(300);
});



(function() {
  $(function() {
    return $('.icon').on('click', function() {
      if ($(this).hasClass('on')) {
        document.getElementById('info-comp').value = 'Individual';
        return $(this).removeClass('on');
      } else {
        document.getElementById('info-comp').value = 'Company';
        return $(this).addClass('on');
      }
    });
  });

}).call(this);



});

function isPro() {document.getElementById('pack').value = 'Pro';}

function isFree() {document.getElementById('pack').value = 'Free';}


