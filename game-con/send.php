<?php 
	$to = htmlspecialchars("test@mail.ru");
	$email = htmlspecialchars($_POST['email']);
/*******************/
        exit;
/*******************/
	$err = "";
	    if(trim($_POST['name']) == "" && trim($_POST['email']) == ""
            && trim($_POST['msg']) == "" && trim($_POST['phone']) == "")
            $err = "зaполните все поля";

	    else if (trim($_POST['name']) == "")
            $err = "Имя не указано";
        else if (!((strpos($email,".")>0) && (strpos($email,"@")>0)))
            $err = "Неверный e-mail";
        else if (trim($_POST['msg']) == "")
            $err = "Сообщение не указано";
        else if (trim($_POST['phone']) == "")
            $err = "Неправильный тел.";

        if($err !=""){
            echo $err;
            exit;
        }

        $nameHTML = htmlspecialchars($_POST['name']);
        $msgHTML = htmlspecialchars($_POST['msg']);

        $msg = "Сообщение отправил <b>{$nameHTML }</b>.<br>Сообщение: {$msgHTML}";

        $subject = "=?utf-8?B?".base64_encode("Сообщение (назв. сайта)")."?=";
        $headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf-6\r\n";
        $success = mail ($to,$subject,$msg,$headers);
        echo $success;
?>