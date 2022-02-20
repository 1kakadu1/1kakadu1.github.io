<?php 
	$to = htmlspecialchars("anton2017_96@mail.ru");
	$formInfo = json_decode($_POST['formInfo'], true);
	$email = htmlspecialchars($formInfo['email']);
	$product = json_decode($_POST['product'], true);
	$strProd = "\r\nВ заказ входит:\r\n";

	if($formInfo['flag'] == 1){
        for ($i=0;$i<count($product['code']);$i++)
        {
            $strProd.="Код товара:{$product['code'][$i]}/Название: {$product['title'][$i]}. Цена:{$product['price'][$i]}$/Количество:{$product['colOneProd'][$i]}.\r\n";
        }

        $strProd.="Общая стоимость: {$product['fullPrice']}";
    } else {
        $strProd = "\r\nМагазин \r\n";
    }


	$err = "";
	    if(trim($formInfo['name']) == "" && trim($formInfo['email']) == ""
            && trim($formInfo['message']) == "" && trim($formInfo['phone']) == "")
            $err = "зaполните все поля";
        else if (trim($formInfo['name']) == "")
                $err = "Имя не указано";
        else if (!((strpos($email,".")>0) && (strpos($email,"@")>0)))
            $err = "Неверный e-mail";
        else if (trim($formInfo['message']) == "")
            $err = "Сообщение не указано";
        else if (trim($formInfo['phone']) == "")
            $err = "Неправильный тел.";

        if($err !=""){
            echo $err;
            exit;
        }

        $nameHTML = htmlspecialchars($formInfo['name']);
        $msgHTML = htmlspecialchars($formInfo['message']);

        $msg = "Сообщение отправил <b>{$nameHTML}</b>.<br>Сообщение:{$msgHTML}.{$strProd}";

        $subject = "=?utf-8?B?".base64_encode("Сообщение (назв. сайта)")."?=";
        $headers = "From: \r\nReply-to: \r\nContent-type: text/html; charset=utf-6\r\n";
        $success = mail ($to,$subject,$msg,$headers);
        echo $success;
?>