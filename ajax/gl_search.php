<?php
require_once '../config.php';


//-----  ДИНАМИЧЕСКИЙ ПОИСК ПО БУКВЕ С ВЫВОДО СПИСКА

$_POST['QUERY'] = (isset($_POST['QUERY']))?$_POST['QUERY']:'&&&';

if($_POST['QUERY'] != '&&&') {

	$per = mysql_query(" SELECT `id`,`name`,`links`,`group` FROM `links777` ORDER BY `id` ASC ");

	$mes = array();

	$i = 1;
	while ($row = mysql_fetch_assoc($per)) 
	{
		
		$mystring = $row["name"];
		$findme = $_POST['QUERY'];

		$pos = stripos(strtolower($mystring), strtolower($findme));
		//$pos = mb_stripos(strtolower($mystring), strtolower($findme));

		if ($pos === false) {

			//$mes[] = "nope";

		} else {

			$mes["id"][] = $row["id"];
			$mes["name"][] = $row["name"];
			$mes["links"][] = $row["links"];
			$mes["group"][] = $row["group"];

			if( $i > 10 ) { break; }
			$i++;
		}
		
	}

	header('Content-Type: application/json');
	print json_encode( $mes );
}


//---------------------------------------------------------
//---------------------------------------------------------

//-----  ДИНАМИЧЕСКИЙ ПОИСК С ВЫВОДОМ ВСЕХ РЕЗУЛЬТАТОВ

$_POST['QUERY_ENTER'] = (isset($_POST['QUERY_ENTER']))?$_POST['QUERY_ENTER']:'&&&';

if($_POST['QUERY_ENTER'] != '&&&') {

	$per = mysql_query(" SELECT * FROM `links777` ORDER BY `id` ASC ");

	$mes = array();


	while ($row = mysql_fetch_assoc($per)) 
	{
		
		$mystring = $row["name"];
		$findme = $_POST['QUERY_ENTER'];

		$pos = stripos($mystring, $findme);

		if ($pos === false) {


		} else {

			$mes[] = $row;

		}
		
	}

	header('Content-Type: application/json');
	print json_encode( $mes );
}


//---------------------------------------------------------

/*

$mystring = 'abc';
$findme   = 'a';
$pos = strpos($mystring, $findme);

// Заметьте, что используется ===.  Использование == не даст верного 
// результата, так как 'a' в нулевой позиции.
if ($pos === false) {
    echo "Строка '$findme' не найдена в строке '$mystring1'";
} else {
    echo "Строка '$findme' найдена в строке '$mystring1'";
    echo " в позиции $pos";
}


//--------------------------------------------------------------------------------

$_POST['list'] = (isset($_POST['list']))?$_POST['list']:'&&&';
$list = $_POST['list'];

if($list != "&&&" ) {

	$per = mysql_query(" SELECT * FROM `group_links` ORDER BY `number` ASC ");

	$mes = array();

	while ($row = mysql_fetch_assoc($per)) 
	{
		$mes[] = $row;
	}

	header('Content-Type: application/json');
	print json_encode($mes);
}

//--------------------------------------------------------------------------------

$_POST['gr'] = (isset($_POST['gr']))?$_POST['gr']:'&&&';

if($_POST['gr'] != '&&&') {

	$per = mysql_query(" SELECT * FROM `links777` WHERE `group` = '".$_POST['gr']."' ORDER BY `number` ");

	$mes = array();

	while ($row = mysql_fetch_assoc($per)) 
	{
		$mes[] = $row;
	}

	header('Content-Type: application/json');
	print json_encode($mes);
}

*/