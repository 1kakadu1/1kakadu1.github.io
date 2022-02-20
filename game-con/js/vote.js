let cStars = function(nowPos) {
  // У всех убираем active
  $('.star-wrap .fa-star').removeClass('fas');
  $('.star-wrap .fa-star').addClass('far');
  for (let i = 0; nowPos + 1 > i; i++) {
    $('.star-wrap .fa-star').eq(i).toggleClass('fas');
  }
}
// переменная содержит количество активных звезд
let starsCount = $('.fa-star.fas').length; 

// При наведении
$('.star-wrap .fa-star').hover(function() {
  cStars($(this).index());
});

// При клике
$('.star-wrap .fa-star').click(function() {
  cStars($(this).index());
  // меняем количество по клику
  starsCount = $('.fa-star.fas').length; 
  newPregress();
});

// Как только отводим мышку, возвращаем количество активных айтемов, которые были изначально
$('.star-wrap .fa-star').on('mouseleave', function() {
  cStars(+starsCount - 1);
});

let countPeople  = $('.progress-text .count'),
    countStar = $('.star-wrap .fa-star').length,
    progress = $('.progress .proc'),
    pr = $('.progress .pr');
console.log(countPeople);
    function newPregress(){
      let starsActive = $('.star-wrap .fa-star.fas').length;
        // нужен счет  из бд ((Х = СУММА АКТИВ ЗВЕЗД/ НА КОЛЛ. ГОЛОСОВ; REZ =  (100% * X) / ОБЩЕЕ КОЛ.ЗВЕЗД(7) )
        // сделано в статике ПУСТЬ ДВА ГОЛОСА: 1- 7, 2-4;
        let buf  = 1 + Number(countPeople[0].innerText);
        let rez = (100*(7+4+starsActive)/buf)/countStar;

        countPeople[0].innerText = buf;
        let animProgress = 1;
        let intervalID = setInterval(function(){
          if(animProgress >= rez){
             clearInterval(intervalID);
          }
         progress.css('width',animProgress+"%"); 
         animProgress ++;

        }, 10)

       // progress.css('width',rez+"%");
        pr[0].innerText = rez.toFixed(1) + "%";

    } 