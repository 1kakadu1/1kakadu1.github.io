"use strict";
/* =============================== 
			настройки
   ==============================*/ 

	let 	style = {
				cssClassX: "red", // класс, который указан в стилях для цвета текста
				cssClassY: "bg", // класс, который указан в стилях для обводки текста
				colorBg: "#FFEB3B", // цвет background
				colorText: "#00bcd4", // цвет результата поиска
			},	

			workTransition = 0, // 0 - циклически,
								// 1 - с выводом сообщения
			msgEndP= "End", // сообщение конца строки назад ( при workTransition = 1)
			msgEndN= "End", // сообщение конца строки вперед ( при workTransition = 1)
			nameClassOnSearch = 'search', // название класса для поиска (устанавливать тегам с нужным текстом)
			workSearch = 1, // 1 - поиск по body
							// 0 - поиск по классу
			searchForEvent = 'change', // keyup - переход сразу к найденному слову. Поиск по одному слову или через встаку по множеству
									  // change - переход к первому слову из множества. Поиск по слову или по множеству слов
			createElement = {
				createStyle: 0,  // создать стили 1-да, 0-нет
				createBtnTop: 1, // создать кнопку прокрутки к поиску 1-да, 0-нет
				createBtnPN: 1,  // создать кнопки прохода по результатам поиска 1-да, 0-нет
			}
//================================

onCreate();

let searchForm = document.getElementsByName('search'),
	searchContent = document.getElementsByClassName(nameClassOnSearch),
	arrayDOM = {
		posDom: [],
		spanSearch: [],
		contentInHtml: [],
	}, 

	sFlag = 0, flag = 0, indexBtnClick = 0,countSearch = 0,
	arrayBufContent = [],

	btn = document.getElementsByName('top'),
	arrowPrev =document.getElementsByName('prevS') ,
	arrowNext =document.getElementsByName('nextS'),
	arrow = document.getElementsByClassName('arrow')[0],
	body = document.getElementsByTagName('body')[0].childNodes;


	// input для поиска
	searchForm[0].addEventListener(searchForEvent, function(event){
		var time = performance.now();
		sFlag = 0;countSearch=0;
		сlearColor();

		if(this.value == null || this.value == 0){
			this.value	="";
			isAlertWork("По запросу найдено 0")
			arrow.style.display = 'none';
		} else {

			let splitSearchForm = this.value.split(" ");
			arrow.style.display = 'flex';
			
			for (let i = 0; i < splitSearchForm.length; i++) {
				
				if(workSearch == 0) {
					searchOnClass(splitSearchForm[i]);	
				} else {
					let repTokenS = splitSearchForm[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
					searchNode(body,repTokenS.toUpperCase());
				}
				
				
			}

			if(sFlag == 0) {
				isAlertWork("По запросу найдено 0")
				arrow.style.display = 'none';
			} else { 
						
						let pref = alertContent(countSearch);
						arrayDOM.spanSearch = document.getElementsByClassName(style.cssClassX);
						isAlertWork('По запросу найдено:'+ ' '+countSearch+ ' '+pref);
						arrayDOM.spanSearch[0].classList.add(style.cssClassY);
						time = performance.now() - time;
						console.log('Время выполнения = ', time);
					}
		}
	});

	// отключаем действие по enter
	searchForm[0].addEventListener('keydown', function(event) {
	    if(event.keyCode == 13) {
	       event.preventDefault();
	    }
 	});


if( btn.length != 0){

	// кнопки для scroll
 	btn[0].addEventListener('click', function(event){
 		event.preventDefault();
 		scrollToElement(3,searchForm[0]);
 	});
 }

if(arrowPrev.length != 0 && arrowNext.length != 0){
 
 	// кнопки перехода
 	arrowPrev[0].addEventListener('click', function(event){
 		event.preventDefault();
 		plusSpan(-1);
 	});

 	arrowNext[0].addEventListener('click', function(event){
 		event.preventDefault();
 		plusSpan(1);
 	}); 
}

	function scrollToElement(a,b) {

    let selectedPosX = 0,
     	selectedPosY = 0,
		theElement = null,
		buf = b;

	switch(a) {
		case 0:
			theElement = searchContent[arrayDOM.posDom[0]];
			break;
		case 1:
			theElement = body[arrayDOM.posDom[0]];
			break;
		case 3:
			theElement = b;
			break;

	}
    while (theElement != null) {
        selectedPosX += theElement.offsetLeft;
        selectedPosY += theElement.offsetTop;
        theElement = theElement.offsetParent;
    }
                 		      
    window.scrollTo({ top: selectedPosY, left: selectedPosX, behavior: 'smooth', block: 'start',inline: 'nearest' });

}

	function isDomContent(j,str){
		for (let i = 0; i < arrayDOM["posDom"].length; i++) {
			if(arrayDOM.posDom[i] == j ){
				flag = 1;
				break;
			}
		}

			if(flag == 0){
				arrayDOM.posDom.push(j);
				arrayDOM.contentInHtml[j] = str;
			}

	}

	function searhOnJoin(elemSearh,arr){

		let bufMass = replaceStr(arr);
				//	console.log(bufMass);
				//	exit();
		for (let i = 0; i < bufMass.length; i++) {
			bufMass[i]=bufMass[i].replace(/\s/g, '');
			if(bufMass[i] == ""){
				bufMass.splice(i, 1);
				i--;
			} else {
					if ( bufMass[i].toUpperCase() == elemSearh.toUpperCase() && bufMass[i-1] !='class="'+style.cssClassX+'">') {
						bufMass[i] = '<mark class="'+style.cssClassX+'">'+elemSearh+'</mark>';
						countSearch++;
					}
			}
		}
		return bufMass;
	}


	function replaceStr(str){

		let rStr = str.replace(/</g, " <");
			rStr = rStr.replace(/>/g, "> ");
			rStr = rStr.replace(/[\n\r]+/g, ' ');
			rStr = rStr.split(" ");
			return rStr;
	}

	function сlearColor(){
		if(arrayDOM.posDom.length > 0){
			for (let i = 0; i < arrayDOM.posDom.length; i++) {
				if(workSearch == 0) {
					searchContent[arrayDOM.posDom[i]].innerHTML = arrayDOM.contentInHtml[arrayDOM.posDom[i]];
				} else {
					body[arrayDOM.posDom[i]].innerHTML = arrayDOM.contentInHtml[arrayDOM.posDom[i]];	
				}
				
				
			}

		clearStyleBg(arrayDOM.spanSearch.length, 0);

		countSearch=0;
		indexBtnClick = 0;
		
		arrayDOM.posDom = [];
		arrayDOM.spanSearch = [];
		arrayDOM.contentInHtml = [];


	}
}

	function searchOnClass(searchText){

		for (let i = 0; i < searchContent.length; i++) {

				let buf = replaceStr(searchContent[i].innerText);
				for(let j = 0; j < buf.length; j++ ){
					buf[j] = buf[j] .replace(/\s/g, '');
					let repToken = buf[j].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""),
						repTokenSearch = searchText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

					if(repToken.toUpperCase() == repTokenSearch.toUpperCase()){

						let sBuf = searchContent[i].innerHTML;
						let onJoin = searhOnJoin(buf[j],searchContent[i].innerHTML);

						searchContent[i].innerHTML = onJoin.join(' ');
						
						flag = 0; sFlag = 1;//countSearch++;

						isDomContent(i,sBuf);
						}
					}
		}
	}

 	function searchNode(nodeMyChild,searchText){

 		for(let i = 0 ; i< nodeMyChild.length; i++){
 			
 			if(nodeMyChild[i].nodeName != "SCRIPT" && nodeMyChild[i].nodeName != "#text" && nodeMyChild[i].nodeName != "BUTTON" && nodeMyChild[i].innerText != undefined){
	 			
	 			if( nodeMyChild[i].childNodes.length != 0 && nodeMyChild[i].innerText != ""){

	 				let buf = replaceStr(nodeMyChild[i].innerText); 
	 						    
						for(let j = 0; j < buf.length; j++ ){

						buf[j] = buf[j].replace(/\s/g, '');

						if( buf[j] !="" && buf[j] != null  || buf[j] != undefined){
							let repToken = buf[j].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
						//	console.log(buf[j]);console.log(repToken);
							if(repToken.toUpperCase() == searchText){

								let sBuf = nodeMyChild[i].innerHTML;
								let onJoin = searhOnJoin(buf[j],nodeMyChild[i].innerHTML);

								nodeMyChild[i].innerHTML = onJoin.join(' ');
								
								flag = 0; sFlag = 1;

								isDomContent(i,sBuf);
								}
							}
						}
					
	 				searchNode(nodeMyChild[i].childNodes);
	 			}
 			}
 		}
 	}

 	function isAlertWork(str){
 		
 		if(searchForEvent == 'change'){
 			
 			alert(str);
	 		setTimeout(function(){
				scrollToElement(workSearch,null);
	 		},100)
 		} else {
 			scrollToElement(workSearch,null);
 				}
 	}

	function alertContent(x){

		switch(x) {
			case 1:
				return "совпадение";
				break;
			case 2,3,4:
				return "совпадения";
				break;
			default:
				return "совпадений";
				break;
		}
	}	

 	function clearStyleBg(index, clearBg){
 		for(let i = 0; i < arrayDOM.spanSearch.length ; i++ ){
 			arrayDOM.spanSearch[i].classList.remove(style.cssClassY);	
 		}

 		if(clearBg == 1){
			arrayDOM.spanSearch[index].classList.add(style.cssClassY);
 		}
 		
 		
 	}

 	function isIndexBtnClick(n){

 		if(n == arrayDOM.spanSearch.length){
 			if(workTransition == 0){
 				indexBtnClick = 0;
 				n=0;
 			}else {
						alert(msgEndN);
						indexBtnClick = arrayDOM.spanSearch.length-1;
 				  }
 		} 

 		if(n < 0){
 			if(workTransition == 0){
 					indexBtnClick = arrayDOM.spanSearch.length-1;
 					n = arrayDOM.spanSearch.length-1;
 			}else {
					alert(msgEndP);
					indexBtnClick = 0;
 				  }
 		}

 		if(n >= 0 && n < arrayDOM.spanSearch.length)
 		{
 			clearStyleBg(indexBtnClick,1);
 			scrollToElement(3,arrayDOM.spanSearch[indexBtnClick]);
 			
 		}
 	}

 	function plusSpan(n){
 		isIndexBtnClick(indexBtnClick += n);
 	}

	function createStyle(){
		let styleElem = document.createElement('style');
		styleElem.type = 'text/css';
		styleElem.innerHTML = '.arrow,.btn-fixed{position:fixed;z-index:4}.margin-top{margin-top:500px}.anime,a,a:hover,button,button:hover{-moz-transition:all .2s linear;-ms-transition:all .2s linear;-o-transition:all .2s linear;-webkit-transition:all .2s linear;transition:all .2s linear;cursor:pointer}.'+style.cssClassX+'{color:'+style.colorText+'!important;font-size:13px!important;padding-left:0!important}.'+style.cssClassY+'{background:0 0!important}.btn-fixed{right:33px;width:60px;height:60px;border-radius:30px;border:none;background:#e4e0e0;outline:0}.arrow .arrow-next:hover,.arrow .arrow-prev:hover,.btn-fixed:hover{background:#efd8d8;width:57px;height:57px}.arrow svg,.btn-fixed svg{width:100%;height:100%}.arrow{display:none;justify-content:flex-end;right:30px;top:90px}.arrow .arrow-next,.arrow .arrow-prev{width:30px;height:30px;border-radius:30px;border:none;background:#e4e0e0;outline:0;margin-right:2px}';
		document.getElementsByTagName('head')[0].appendChild(styleElem);
	}

	function createBtnPN() {

	  let addBtn = document.createElement('div');
	  addBtn.className = 'arrow';
	  addBtn.innerHTML ='<button name = "prevS" class = "arrow-prev" type = "submit"> < </button><button name = "nextS" class = "arrow-next" type = "submit"> > </button>';	
			let body = document.getElementsByTagName('body')[0];
				body.insertBefore(addBtn,body.children[1]);
	}

	function createBtnTop(){
		let addBtnTop = document.createElement('button');	
			addBtnTop.type = 'submit';
			addBtnTop.name = 'top';
			addBtnTop.className = 'btn-fixed';
			
			addBtnTop.innerHTML ='^';

			let body = document.getElementsByTagName('body')[0];
				body.insertBefore(addBtnTop,body.children[0]);
	}

	function onCreate()
	{
		if(createElement.createStyle == 1) createStyle();	
		if(createElement.createBtnTop == 1) createBtnTop();
		if(createElement.createBtnPN == 1) createBtnPN();	
	}