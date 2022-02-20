window.addEventListener("DOMContentLoaded", function(){

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

	let tab = document.getElementsByClassName('tab-menu__prod'),
		tabContent = document.getElementsByClassName('tab-prod'),
		info = document.getElementsByClassName('tab-menu'),
		ed_val='$',
		ulAdd = document.getElementsByClassName('li-add'),
		comments = document.getElementsByClassName('com-p'),
		comment = document.getElementsByClassName('comments'),
		msg = document.querySelector(".msg"),
		listAdd = document.getElementsByClassName('list-add'),
		cart = document.getElementById("cart"),
		cartPrice = document.getElementsByClassName('full-price')[0],
		productCount = document.getElementsByClassName('poduct-count')[0],
		prodAdd= document.getElementsByClassName('prod-link'),
		btnCart= document.getElementsByClassName('form-view')[0],
		emptCart= document.getElementsByClassName('empt')[0],
		fullProd=document.getElementsByClassName('product');
	var indexProd = 0,flag = 0 ;

	let productCart = {

		title: [],
		price: [],
		img: [],
		code: [],
		colOneProd:[],
		col: 0,
		fullPrice: 0,
		positionDOM: []
	};
	function hideTabContent(a){
		for(let i = a; i< tabContent.length;i++ ){
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');

		}
	}

	hideTabContent(1)

	function showTabContent(b){
		if( tabContent[b].classList.contains('hide')){
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info[0].addEventListener('click', function(event){
		let target = event.target;
		if(target.className == 'tab-menu__prod'){
			for(let i = 0; i< tab.length; i++){
				if(target == tab[i]){
					showTabContent(i);
					break;
				}
			}
		}

	});


var slMsg=1, flagClick = 0;
comments[0].classList.add("active");
msg.textContent = comment[0].innerText;
msg.classList.add("slideInLeftMy");


setInterval(function(){

		if(slMsg == comments.length ){
					slMsg=0;
				}

		msg.classList.remove("slideInLeftMy");
		msg.classList.add("slideOutRight");
				
		
		setTimeout(function(){


			for(let i = 0;i<comments.length; i++)
				{
					comments[i].classList.remove("active");
				}
				comments[slMsg].classList.add("active");
				msg.textContent = comment[slMsg].textContent;
				msg.classList.remove("slideOutRight");
				msg.classList.add("slideInLeftMy");
				slMsg++;
		}, '4000');


}, 20000);

	function isContentCart(lengthCart){
		if(lengthCart == 0){
			btnCart.style.display="none";
			emptCart.style.display="block";

		} else {
			btnCart.style.display="block";
			emptCart.style.display="none";
		}
	}

	cart.addEventListener('click', function(event){
		event.preventDefault();
		isContentCart(ulAdd[0].children.length);
		if(flagClick == 0){
				listAdd[0].style.display = 'flex';
				flagClick = 1;	
			} else {

				listAdd[0].classList.add("slideOutRight");
				setTimeout(function(){
					listAdd[0].classList.remove("slideOutRight");
					listAdd[0].style.display = 'none';
					flagClick = 0;	
				},2000)

			}


	});

	function colProd(prod_code,pos,price){
		let lengthListAdd = document.getElementsByClassName('list-add__count').length;

		if(lengthListAdd != null || lengthListAdd != 0){
			for(let i = 0; i<productCart.code.length; i++){
				if(productCart.code[i] == prod_code){

					let countProdOne = document.getElementsByClassName('list-add__count')[i];
					fullPrice(price);
					productCart.price[i] += parseInt(price);
					productCart.colOneProd[i] +=1;
					countProdOne.innerText = productCart.colOneProd[i];
					flag = 1 ;
					break; 
				} else {flag = 0;}
			}
		} else {
			flag = 0;
			}
	}

	function fullPrice(price){
		 productCart.fullPrice +=parseFloat(price);
		 productCart.col +=1;
		 cartPrice.innerText ='$'+productCart.fullPrice;
		 productCount.innerText =productCart.col+' Items';
	}

	function subFullPrice(indexMass){
		 productCart.fullPrice = parseFloat(productCart.fullPrice)-parseFloat(productCart.price[indexMass])/**parseFloat(productCart.colOneProd[indexMass])*/;
		 productCart.col -=parseInt(productCart.colOneProd[indexMass]);

		 cartPrice.innerText ='$'+productCart.fullPrice;
		 productCount.innerText =productCart.col+' Items';
	}


// удаление из корзины
	ulAdd[0].addEventListener('click', function(event){
		let target = event.target || window.event.target,
			bId = target.id.replace('b','');

		event.preventDefault();
		
		for(let i = 0; i<ulAdd[0].childNodes.length; i++ ){
			let buf = target.id.replace('b','');
			if(bId == ulAdd[0].childNodes[i].attributes.id.ownerElement.id){
				//delete productCart.title[i];
				subFullPrice(i);
				productCart.title.splice(i,1);
				productCart.price.splice(i,1);
				productCart.code.splice(i,1);
				productCart.img.splice(i,1);
				productCart.colOneProd.splice(i,1);
				productCart.positionDOM.splice(i,1);

				indexProd--;flag = 0;

				isContentCart(indexProd);
				document.getElementById(bId).remove();
			}
		}
		
	});
//чистка корзины
	function clearCart(){

            productCart.title.splice(0,ulAdd[0].childNodes.length);
            productCart.price.splice(0,ulAdd[0].childNodes.length);
            productCart.code.splice(0,ulAdd[0].childNodes.length);
            productCart.img.splice(0,ulAdd[0].childNodes.length);
            productCart.colOneProd.splice(0,ulAdd[0].childNodes.length);
            productCart.positionDOM.splice(0,ulAdd[0].childNodes.length);

		indexProd = 0;flag = 0;
        isContentCart(indexProd);
		//let x=  ulAdd[0].childNodes;
        //x.remove();
        $(".li-add").empty();
		productCart.fullPrice = 0;
		productCart.col =0;
		cartPrice.innerText ='$0';
		productCount.innerText ='0';

		console.log(productCart);
	}
// добавление в корзину
	prodAdd[0].addEventListener('click', function(event){
		let target = event.target || window.event.target;
		event.preventDefault();
		if(target.className == 'btn-list-add add'){
			let position = event.srcElement.id - 1,
				price = fullProd[position].getElementsByClassName('price-prod')[0].innerText,
				code = fullProd[position].getElementsByClassName('cod')[0].innerText,
				titleProd = fullProd[position].getElementsByClassName('title-prod')[0].innerText,
				imgPROD = fullProd[position].getElementsByClassName('prod-img__c')[0].attributes[1].nodeValue;
				
				price = price.replace('$','');
				code = code.replace('  +','');
				
				colProd(code,indexProd,price);	

				if(flag == 0) {

					productCart.title.push(titleProd);
					productCart.price.push(parseInt(price));
					productCart.code.push(code);
					productCart.img.push(imgPROD);
					productCart.colOneProd.push(1);
					productCart.positionDOM.push(parseInt(position));

					let CartLi = '<div class="list-add__info">'+
	                '<div class="list-add__text">'+
	                  `<p>Цена: <span class="list-add__price">${productCart.price[indexProd]} ${ed_val} шт.</span></p>`+
	                  `<p>Количество <span class="list-add__count">${productCart.colOneProd[indexProd]}</span></p>`+
	                '</div>'+
	                '<div class="list-add__prod-v">'+
	                  `<p class="list-add__name">${productCart.title[indexProd]}</p><img src="${productCart.img[indexProd]}">`+
	                '</div>'+
	                `<button class="btn-list-add" id='b${productCart.positionDOM[indexProd]+1}'>X</button>`+
	              '</div>';

	              	let li = document.createElement('li');
	              		li.id = position+1;
	              		li.classList.add("list");
	    				li.innerHTML = CartLi;
	    				ulAdd[0].appendChild(li);

	    			fullPrice(price);
	    			indexProd++;
				}  
					

		}
		

	});

// modal
	
let viewForm = document.getElementsByClassName('view-form'),
	viewFormForObj = document.getElementsByClassName('btn-list-add'),
	hideWar = document.getElementsByClassName('hideWar')[0],
  	overlay = document.querySelector('.modal'),
  	close = document.getElementsByClassName('close'),
  	wrapModal = document.querySelector('.wrap-form');
  var timerId = '', flagObj = 0;

  hideWar.style.display = 'none';

		// кнопка для смс без товара

	for(let i = 0;i<viewForm.length;i++){
		viewForm[i].addEventListener('click',function(){
		    overlay.classList.add('animated',"fadeIn");
		    overlay.style.display = 'flex';
		    document.body.style.overflow = 'hidden';
		    flagObj = 1; // просто msg
		});
	}
	// кнопка смс с товаром

	viewFormForObj[0].addEventListener('click',function(){
			flagObj = 2; //msg с продукт.
 		    overlay.classList.add('animated',"fadeIn");
		    overlay.style.display = 'flex';
		    document.body.style.overflow = 'hidden';
		    hideWar.style.display = 'flex';
	});

close[0].addEventListener('click', function(){
    overlay.style.display = 'none';
    overlay.classList.remove('animated',"fadeIn");
    document.body.style.overflow = '';
     hideWar.style.display = 'none';
  });

	$(document).mouseup(function (e) {
	    var container = $(overlay);
	    if (container.has(e.target).length === 0){
	        document.body.style.overflow = '';
	        hideWar.style.display = 'none';
	        container.hide("slow"); 
	        clearInterval(timerId);
	    }
	});

// send msg

$('#send').click (function () {
	let  formInfo = {
            email: $('#email').val (),
            name: $('#name').val (),
            message: $('#msg').val (),
            phone: $('#phone').val (),
			flag: 0,
         },
         JSON_prod;
    if( flagObj == 2){
    	JSON_prod = JSON.stringify(productCart);
    	formInfo.flag = 1;
    } else {
    		JSON_prod = JSON.stringify(formInfo);
        	formInfo.flag = 0;
    	}
    $('#error-msg > span').text ("");
	$.ajax({
		url:    	'send.php',
		type:		'POST',
		cache: 		false,
		data:   	{'formInfo':JSON.stringify(formInfo), 'product':JSON_prod},
		dataType:	'json',
		beforeSend: function () {
			$('#send').attr ("disabled", "disabled");
			//$('.btn-load').show("normal");
            $('#error-msg > div').addClass("btn-load");
		},
		success: function(data) {
			if(flagObj == 2){
				clearCart();	
			}

            setTimeout(function () {
                console.log(data);
				$('#name').val ("");
				$('#email').val ("");
				$('#msg').val ("");
				$('#phone').val ("");
				$('#error-msg > span').text ("Сообщение отправлено");
				$('#email').css ("border-color", "#60fc8c");
				$('#name').css ("border-color", "#60fc8c");
				$('#msg').css ("border-color", "#60fc8c");
				$('#phone').css ("border-color", "#60fc8c");
                $('#send').removeAttr ("disabled");
                $('#error-msg > div').removeClass("btn-load");
            }, 1000);
		},
        error: function(data){
            setTimeout(function () {
                if (data == false)
                    $('#error-msg > span').text ("Проблема в работе сервера.Повторте через несколько минут");
                else {
                    console.log(data);
                    switch (data.responseText) {
                        case "Имя не указано":
                            $('#name').css ("border-color", "#f7b4b4");
                            $('#error-msg > span').text ("Имя не указано");
                            break;
                        case "Сообщение не указано":
                            $('#msg').css ("border-color", "#f7b4b4");
                            $('#error-msg > span').text ("Сообщение не указано");
                            break;
                        case "Неверный e-mail":
                            $('#email').css ("border-color", "#f7b4b4");
                            $('#error-msg > span').text ("Неверный e-mail");
                            break;
                        case "Неправильный тел.":
                            $('#phone').css ("border-color", "#f7b4b4");
                            $('#error-msg > span').text ("Неправильный тел.");
                            break;
                        default:
                            $('#email').css ("border-color", "#f7b4b4");
                            $('#msg').css ("border-color", "#f7b4b4");
                            $('#name').css ("border-color", "#f7b4b4");
                            $('#phone').css ("border-color", "#f7b4b4");
                            $('#error-msg > span').text ("Заполнитевсе поля");
                    }
                }

                $('#send').removeAttr ("disabled");
                //setTimeout(function () {
                    $('#error-msg > div').removeClass("btn-load");
                //}, 1000);

            }, 1000);
        }
	});
});
// плав. прокрутка
$(document).ready(function() {
  $("a.scrollto").click(function() {
    var elementClick = $(this).attr("href")
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({
      scrollTop: destination
    }, 800);
    return false;
  });
});


});