<?php

require_once '../config.php';

//--- СОЗДАНИЕ ИКОНОК И СКРИНОВ ССЫЛОК
$_POST['idLin'] = (isset($_POST['idLin']))?$_POST['idLin']:'&&&';
$_POST['linLin'] = (isset($_POST['linLin']))?$_POST['linLin']:'&&&';


if($_POST['idLin'] != '&&&') {
	
	//------  СОЗДАНИЕ ИКОНКИ ------
	$url = str_replace("http://",'',$_POST['linLin']);
	$back[1] = "http://www.google.com/s2/favicons?domain=".$url;
	
	//------  СОЗДАНИЕ СКРИНШОТА РЕСУРСА  -------
	header("Location: http://www.s-shot.ru/1024x768/JPEG/1024/Z100/?".$url);
	$back[2] = "http://mini.s-shot.ru/1024x768/JPEG/1024/Z100/?".$url;
	
	//------  СОЗДАНИЕ ПОЛНОГО СКРИНШОТА РЕСУРСА -------
	header("Location: http://www.s-shot.ru/1024/JPEG/1024/Z100/?".$url);
	$back[3] = "http://mini.s-shot.ru/1024/JPEG/1024/Z100/?".$url;



	$prav = mysql_query(" UPDATE `links777` SET `icon` = '".$back[1]."', `screen` = '".$back[2]."', `full_screen` = '".$back[3]."'  WHERE id = ".$_POST['idLin']." ");
	
	if($prav){
		 header('Content-Type: application/json; charset=utf-8');	
		 print json_encode($coll);
	 }
}
