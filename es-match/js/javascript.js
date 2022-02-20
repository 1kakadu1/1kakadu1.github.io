$(document).ready(function(){


$(function(){
  //Инициализация всплывающей панели для
  //элементов веб-страницы, имеющих атрибут
  //data-toggle="popover"
  $('[data-toggle="popover_info"]').popover({
    //Установление направления отображения popover
    placement: "bottom",
    trigger: "hover",
    html:"true",
    content: '<div class="small_popover"><div><img src="img/vvv.png"></div><span class="span-text">MSI GAMING DOTA 2 CUP</span><div class="mini_cd"><img src="img/wow.png"><span class="span-text1">Call of Duty</span></div><div><span class="span-text">500 руб</span></div><span class="span-text1">12.06.16 - 18.06.16</span></div>'
  });
});


$(function(){
  //Инициализация всплывающей панели для
  //элементов веб-страницы, имеющих атрибут
  //data-toggle="popover"
  $('[data-toggle="popover"]').popover({

    //Установление направления отображения popover
     content:'<div class="pop_begin"><div class="social_min"><p>Войти через сети</p><a href="#"><img src="img/socialicon/vk_logo.png" alt=""></a><a href="#"><img src="img/socialicon/fb_logo.png" alt=""></a><a href="#"><img src="img/socialicon/ok.png" alt=""></a><a href="#"><img src="img/socialicon/gp.png" alt=""></a><a href="#"><img src="img/socialicon/stem.png" alt=""></a><a href="#"><img src="img/socialicon/str.png" alt=""></a><a href="#"><img src="img/socialicon/ya.png" alt=""></a></div><form><div class="form-group mail"><label for="exampleInputEmail1">Email</label><input type="email" class="form-control" id="exampleInputEmail1"> </div> <div class="form-group"><label for="exampleInputPassword1">Пароль</label><input type="password" class="form-control" id="exampleInputPassword1"></div><div class="checkbox1"><a href="#"><span>Забыли пароль?</span></a> <label> <input class="checkbox" type="checkbox" name="checkbox-test"><span class="checkbox-custom"></span><span class="label1">Оставаться в системе</span></label></div><button type="submit" class="btn " >Вход</button><button type="submit" class="btn ">Регистрация</button></form></div>'
  });
});

  $(function() {
    $( "#slider_price" ).slider({
      range: true,
      min: 0,
      max: 10000,
      values: [ 0, 10000 ],
      slide: function( event, ui ) {
        //Поле минимального значения
        $( "#price" ).val(ui.values[ 0 ]);
        //Поле максимального значения
        $("#price2").val(ui.values[1]);     }
    });
    //Записываем значения ползунков в момент загрузки страницы
    //То есть значения по умолчанию
    $( "#price" ).val($( "#slider_price" ).slider( "values", 0 ));
    $("#price2").val($("#slider_price").slider( "values", 1 ));
  });

$(function() {
  
   jQuery("input#price").change(function(){
    var value1=jQuery("input#price").val();
    var value2=jQuery("input#price2").val();
  
      if(parseInt(value1) > parseInt(value2)){
      value1 = value2;
      jQuery("input#price").val(value1);
    }
    jQuery("#slider_price").slider("values",0,value1);  
  });

  
  jQuery("input#price2").change(function(){
    var value1=jQuery("input#price").val();
    var value2=jQuery("input#price2").val();
    
    if (value2 > 10000) { value2 = 10000; jQuery("input#price2").val(10000)}
  
    if(parseInt(value1) > parseInt(value2)){
      value2 = value1;
      jQuery("input#price2").val(value2);
    }
    jQuery("#slider_price").slider("values",1,value2);
  });

});

/*
 $(function() {
  $( "#slider-range" ).slider({
 range: true,
 min: 0,
 max: 500,
 values: [ 75, 300 ],
 slide: function( event, ui ) {
 $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
 }
  });
  $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
 " - $" + $( "#slider-range" ).slider( "values", 1 ) );
 });

  $(function() {
  $( "#slider_price" ).slider({
 range: true,
 min: 0,
 max: 500,
 values: [ 75, 300 ],
 slide: function( event, ui ) {
 //Поле минимального значения
 $( "#price" ).val(ui.values[ 0 ]);
 //Поле максимального значения
 $("#price2").val(ui.values[1]); }
  });
  //Записываем значения ползунков в момент загрузки страницы
  //То есть значения по умолчанию
  $( "#price" ).val($( "#slider_price" ).slider( "values", 0 ));
  $("#price2").val($("#slider_price").slider( "values", 1 ));
 });


*/



 });