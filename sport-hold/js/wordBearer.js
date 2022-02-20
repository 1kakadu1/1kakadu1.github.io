var symbs1 = /[.,:;!?'"|\/*]/,
	symbs2 = /[%$^#№@()><_-]/,
	symbs3 = /[`~\]\[{}+=&]/,
	liter = /[\w]/,
	joke = [],
	jokeS = [],
	bufJoke = [],
	bufJokeS = [],
	markParent = 0,

	offsetElem = document.getElementsByTagName("mark"),
    currentPos = 0,
    needPos = 0,
    timer3 = 0,
    proc = 0,
    elemCount = 0;

function searchFun(input) {
	if (input === undefined) return;

	clearMark(document.body); 

	(symbs1.test(input) || symbs2.test(input) || symbs3.test(input)) ? insertNode(document.body, true) : insertNode(document.body, false)

	function clearMark(dom) {
		if (dom.hasChildNodes()) {
			if (dom.nodeName == "MARK") {

				markParent = dom.parentNode.innerHTML;

				markParent = markParent.replace(/</g, " <");
				markParent = markParent.replace(/>/g, "> ").split(" ");

				console.log(markParent);

				for (var j = 0; j < markParent.length; j++) {
					if (markParent[j] == '<mark>' || markParent[j] == '</mark>' || markParent[j] == '<mark' || markParent[j] == 'class="searchMark">' || markParent[j] == 'class="">') {
						delete markParent[j];
					}
				}

				markParent = markParent.join(" ");
				markParent = markParent.replace(/ </g, "<");
				markParent = markParent.replace(/> /g, ">")

				dom.parentNode.innerHTML = markParent;
			}

			for (var i = 0; i < dom.childNodes.length; i++) {
				clearMark(dom.childNodes[i]);
			}
		}

		joke = [];
		jokeS = [];
		bufJoke = [];
		bufJokeS = [];

		currentPos = 0;
	    needPos = 0;
	    timer3 = 0;
	    proc = 0;
	    elemCount = 0;
	    markParent = 0;
	}

	function insertNode(node, flag) {
		if (input == "" || node.nodeName == "SCRIPT" || node.nodeName == "MARK") return;

		if (node.hasChildNodes()) {
			for (var i = 0; i < node.childNodes.length; i++) {
				insertNode(node.childNodes[i], flag);
			}
		} else {
			if (node.nodeType == 3) {
				joke = node.nodeValue.split(" ");
				
				for (var i = 0; i < joke.length; i++) {
					//joke[i] = joke[i].replace(/\s/g, "");
					if (flag == false) {
						bufJoke = joke[i].replace(/[.,:;!?'"|\/*]/g, "");
						bufJoke = bufJoke.replace(/[%$^#№@()><_-]/g, "");
						bufJoke = bufJoke.replace(/[`~\]\[{}+=&]/g, "");

						if (input.toLowerCase() == bufJoke.toLowerCase()) {
							jokeS = node.parentNode.innerHTML;
							console.log(jokeS);

							jokeS = jokeS.replace(/</g, " <");
							jokeS = jokeS.replace(/>/g, "> ").split(" ");

							for (var j = 0; j < jokeS.length; j++) {
								bufJokeS = jokeS[j].replace(/[.,:;!?'"|\/*]/g, "");
								bufJokeS = bufJokeS.replace(/[%$^#№@()><_-]/g, "");
								bufJokeS = bufJokeS.replace(/[`~\]\[{}+=&]/g, "");

								if (input.toLowerCase() == bufJokeS.toLowerCase()) {
									jokeS[j] = "<mark>" + jokeS[j] + "</mark>";
								}
							}

							jokeS = jokeS.join(" ");
							jokeS = jokeS.replace(/ </g, "<");
							jokeS = jokeS.replace(/> /g, ">");

							node.parentNode.innerHTML = jokeS;
						}
					} else {
						if (input.toLowerCase() == joke[i].toLowerCase()) {
							jokeS = node.parentNode.innerHTML;

							jokeS = jokeS.replace(/</g, " <");
							jokeS = jokeS.replace(/>/g, "> ").split(" ");

							for (var j = 0; j < jokeS.length; j++) {
								if (input.toLowerCase() == jokeS[j].toLowerCase()) {
									jokeS[j] = "<mark>" + jokeS[j] + "</mark>";
								}
							}

							jokeS = jokeS.join(" ");
							jokeS = jokeS.replace(/ </g, "<");
							jokeS = jokeS.replace(/> /g, ">");

							node.parentNode.innerHTML = jokeS;
						}
					}
				}
			}
		}
	}
}

function anc() {
  currentPos = window.pageYOffset;
  if (currentPos == 0) {
    currentPos = 1;
  }

  if (elemCount == offsetElem.length) {
    elemCount = 0;
  }

  if (!document.body.contains(offsetElem[elemCount])) return;

  if (elemCount == 0) {
    offsetElem[offsetElem.length - 1].classList.remove("searchMark");
  }

  if (offsetElem[elemCount - 1]) {
    offsetElem[elemCount - 1].classList.remove("searchMark");
  }
  
  offsetElem[elemCount].classList.add("searchMark");
  needPos = offsetElem[elemCount].offsetTop;

  if (currentPos > needPos) {
    ancFunc1();
  } else if (currentPos < needPos) {
    ancFunc2();
  }

  function ancFunc1() {
    if (currentPos <= needPos + 1) {
      clearTimeout(timer3);
    } else {
      window.scrollTo(0, currentPos);
      proc = (currentPos - needPos) / 25;
      currentPos -= proc;
      setTimeout(ancFunc1, 1);
    }
  }

  function ancFunc2() {
    if (currentPos >= needPos - 1) {
      clearTimeout(timer3);
    } else {
      window.scrollTo(0, currentPos);
      proc = (needPos - currentPos) / 25;
      currentPos += proc;
      setTimeout(ancFunc2, 1);
    }
  }

  elemCount++;
}

function searchBind(id) {
	id.addEventListener("input", function() {
		searchFun(this.value);
	});

	id.addEventListener("click", function() {
		anc();
	});

	id.addEventListener("keyup", function(e) { 
	    if (event.keyCode === 13) {
	      id.click();
	    } 
	});
}