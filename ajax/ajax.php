<?php
require_once '../config.php';

$_POST['vodca'] = (isset($_POST['vodca']))?$_POST['vodca']:'&&&&';

$mes = array();

//$per = mysql_query(" SELECT `name` FROM `group_links` ORDER BY `number` ");


if($_POST['vodca'] != '&&&&') {

	$per = mysql_query(" SELECT * FROM `links777` ORDER BY `number` ");

	while ($row = mysql_fetch_assoc($per)) 
	{
		//if($row["group"] == "HTML" ){
			$mes[] = $row;
		//}
	}

	header('Content-Type: application/json; charset=utf-8');
	print json_encode($mes);
}
//-------------------------------

//--  ВЫВОД ПОСЛЕДНИХ ДВАДЦАТИ ССЫЛОК
$_POST['query'] = (isset($_POST['query']))?$_POST['query']:'&&&&';

$mes = array();

if($_POST['query'] != '&&&&') {

	$per = mysql_query(" SELECT * FROM `links777` ORDER BY `id` DESC  LIMIT 20 ");

	while ($row = mysql_fetch_assoc($per)) 
	{
		$mes[] = $row;
	}

	header('Content-Type: application/json; charset=utf-8');
	print json_encode($mes);
}
//-------------------------------

//--  ВЫВОДА ССЫЛОК КАТЕГОРИИ "ГЛАВНЫЕ"
$_POST['mainLinks'] = (isset($_POST['mainLinks']))?$_POST['mainLinks']:'&&&&';

$mes = array();

if($_POST['mainLinks'] != '&&&&') {

	//$per = mysql_query(" SELECT * FROM `links777` ORDER BY `id` DESC  LIMIT 20 ");  -- доделать
	$per = mysql_query(" SELECT * FROM `links777` WHERE `group` = 'Главная' ORDER BY `number`  ");

	while ($row = mysql_fetch_assoc($per))
	{
		$mes[] = $row;
	}

	header('Content-Type: application/json; charset=utf-8');
	print json_encode($mes);
}

//-------------------------------

//--  ВЫВОДА ССЫЛОК КАТЕГОРИИ "ГЛАВНЫЕ"
$_POST['printLstLink'] = (isset($_POST['printLstLink']))?$_POST['printLstLink']:'&&&&';

$mes = array();

if($_POST['printLstLink'] != '&&&&') {

	$per = mysql_query(" SELECT * FROM `links777` ORDER BY `id` DESC  LIMIT 1 ");

	while ($row = mysql_fetch_assoc($per)) 
	{
		$mes[0] = $row;
	}

	header('Content-Type: application/json; charset=utf-8');
	print json_encode($mes);
}
