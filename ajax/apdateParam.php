<?php
require_once '../config.php';


mysql_query(" UPDATE `$nameTable` SET `params`='".$_POST['params']."'  WHERE `id`='".$_POST['id']."' ");

//$per = mysql_query(" SELECT * FROM `links777` WHERE `id` = ".$_POST['apDateId']." ");
//$mes = array();
//
//while ($row = mysql_fetch_assoc($per))
//{
//    $mes = $row;
//}


header('Content-Type: application/json');
//print json_encode($mes);
print json_encode(777);


