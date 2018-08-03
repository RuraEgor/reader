<?php
require_once '../config.php';

$_POST['name'] = (isset($_POST['name']))?$_POST['name']:'&&&';


if($_POST['name'] != '&&&') {

$nameDel = $_POST['name'];
$nomEl = array();

//------  ОПРЕЛЕЛЕНИЕ НОМЕРА ЭЛЕМЕНТА  ---------
$nomElem = mysql_query(" SELECT `number`,`group` FROM `links777` WHERE `id` = '".$nameDel."' ");

while( $roww = mysql_fetch_assoc($nomElem)) {
	$nomEl[0] = $roww['number'];  //-- номер удаляемой ссылки
	$nomEl[1] = $roww['group'];  //-- группа удаляемой ссылки
}

/*
//------  ОПРЕЛЕЛЕНИЕ ОБЩЕГО КОЛИЧЕСТВА ЭЛЛЕМЕНТОВ  ----------
$rew = mysql_query("SELECT `number` FROM `links777` WHERE `group` = '".$nomEl[1]."' ORDER BY `number` DESC LIMIT 1");
*/

//------  УДАЛЕНИЕ НУЖНОГО ЭЛЕМЕНТА  ----------
	$prov = mysql_query(" DELETE FROM `links777` WHERE ( `id` = '".$nameDel."' ) ");

//------  ПРОВЕРКА СУЩЕСТВОВАНИЯ УДАЛЁННОГО ЭЛЕМЕНТА  ----------
if($prov) {$mes[0] = "Ссылка \"".$_POST['name']."\" не была удалена!"; $mes[1] = 2;}


//-- БЛОК ОПРЕДЕЛЕНИЯ КОЛИЧ. ССЫЛОК В КАТЕГОРИИ
$pes = mysql_query(" SELECT COUNT(*) FROM `links777` WHERE `group` = '".$nomEl[1]."' ");
$row = mysql_fetch_row($pes);
$count = $row[0];
mysql_query(" UPDATE `group_links` SET `kol` = '".$count."' WHERE `name` = '".$nomEl[1]."' ");


//------ ФОРМИРОВАНИЕ НОВОГО ПОРЯДКА НОМЕРОВ  ---------
for($i = $nomEl[0]; $i < ($count + 1); $i++){
	$x = $i + 1;
	
	mysql_query(" UPDATE `links777` SET `number`='".$i."' WHERE `group` = '".$nomEl[1]."' AND `number` = '".$x."' ");
}


	if($prov){
		header('Content-Type: application/json;charset=utf-8');		
		print json_encode($nomEl[1]);
	}

}
//$von = mysql_query("SELECT `number` FROM `links` WHERE `number` = (SELECT MAX(`number`) FROM `links`) ");
//$rew = mysql_query("SELECT MAX(`number`) FROM `links`");

//---------------------------------------------------------------------