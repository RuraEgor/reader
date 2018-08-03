<?php
require_once '../config.php';

$_POST['name'] = (isset($_POST['name']))?$_POST['name']:'&*!';


//------ ПРВОЕРЯЕМ СУЩЕСТВУЕТ ЛИ ССЫЛКА С ТАКИМ ЖЕ ИМЕНЕМ ЧТО И ТАК КОТОРУЮ СОБИР. СОЗДАТЬ  ------
$rew = mysql_query("SELECT `name` FROM `$nameTable`");

$nalich = 0;

while( $row = mysql_fetch_assoc($rew)) {

    $nameNewBook = strtolower($_POST['name']);
    $nameOldBook = strtolower($row['name']);

	if ($nameNewBook == $nameOldBook) {
		$mes = "Книга с таким именем уже существует!";
		$nalich = 1;
		break;
	}
}


if ($nalich == 0) {
//------------ ЗАПОМИНАНИЕ ВРЕМЕНИ СОЗДАНИЯ ССЫЛКИ --------------

	$timeCreate = time();

	$prav = mysql_query("INSERT INTO `$nameTable` (`name`,`timeCreate`) VALUES ('".$_POST['name']."','".$timeCreat."') ");

	$id_link = mysql_insert_id();  //--  ОПРЕДЕЛЕНИЕ "ID" ПОСЛЕДНЕГО СОЗДАННОГО ЭЛЕМЕНТА
}


if ($nalich == 1) {
     header('Content-Type: application/json; charset=utf-8');
     print json_encode('is');

 } else {
     header('Content-Type: application/json; charset=utf-8');
     print json_encode($id_link);
 }

