<?php

$link = mysql_connect("localhost", "clog", "hT5_sX23");
//var_dump ($link);

$db_selected = mysql_select_db('clog', $link);

$query="SELECT * FROM record ORDER BY id DESC";
	//echo $query;
$result = mysql_query($query, $link);

$row = mysql_fetch_assoc($result);
var_dump($row['datetime']);
//$dtime = DateTime::createFromFormat("YY-MM-DD\THH:II:SSfrac\Z", $row['datetime']);
$dtime = strtotime($row['datetime']);
var_dump($dtime);
$timestamp = $dtime->getTimestamp();
var_dump($timestamp);

die();

?>