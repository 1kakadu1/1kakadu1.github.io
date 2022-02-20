$('#send').click (function () {
	var email = $('#email').val ();
	var name = $('#name').val ();
	var message = $('#msg').val ();
	var phone = $('#phone').val ();
    $('#error-msg > span').text ("");
	$.ajax({
		url:    	'send.php',
		type:		'POST',
		cache: 		false,
		data:   	{'name':name, 'email':email, 'msg':message, 'phone':phone},
		dataType:	'html',
		beforeSend: function () {
			$('#send').attr ("disabled", "disabled");
			//$('.btn-load').show("normal");
            $('#error-msg > div').addClass("btn-load");
		},
		success: function(data) {
			if (data == true) {
				$('#name').val ("");
				$('#email').val ("");
				$('#msg').val ("");
				$('#phone').val ("");
				$('#error-msg > span').text ("Сообщение отправлено");
				$('#email').css ("border-color", "#60fc8c");
				$('#name').css ("border-color", "#60fc8c");
				$('#msg').css ("border-color", "#60fc8c");
				$('#phone').css ("border-color", "#60fc8c");
			} else {
				setTimeout(function () {
					if (data == false)
						$('#error-msg > span').text ("Проблема в работе сервера.Повторте через несколько минут");
					else {
						switch (data) {
						case "Имя не указано":
						$('#name').css ("border-color", "#f7b4b4");
						$('#error-msg > span').text ("Имя не указано");
						break;
						case "Сообщение не указано":
						$('#msg').css ("border-color", "#f7b4b4");
						$('#error-msg > span').text ("Сообщение не указано");
						break;
						case "Неправильный e-mail":
						$('#email').css ("border-color", "#f7b4b4");
						$('#error-msg > span').text ("Неправильный e-mail");
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

            	}, 1000);
			}
			$('#send').removeAttr ("disabled");
			setTimeout(function () {
                $('#error-msg > div').removeClass("btn-load");
            }, 1000);
		}
	});
});