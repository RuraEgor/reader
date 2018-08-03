<?php
require_once '../config.php';


//mysql_query(" UPDATE `books` SET `id`='".$_POST['id']."', `params`='".$_POST['params']."', `text`='".$_POST['text']."'  WHERE `id` = 1 ");

$per = mysql_query(" SELECT * FROM `$nameTable` WHERE `id` = ".$_POST['id']." ");
$mes = array();

while ($row = mysql_fetch_assoc($per))
{
    $mes = $row;
}


header('Content-Type: application/json');
print json_encode($mes);


