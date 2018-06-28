<?php


if (!isset($_GET['room']))
{
	die ("[]");
}

$room = $_GET['room'];

/*if ($room!='France')
    die ('[{"username":"ChatAddon","message":"Chat history disabled because of server overload.","datetime":""}]');*/

$link = mysqli_connect("localhost", "clog", "hT5_sX23");
/*var_dump ($link);*/

$db_selected = mysqli_select_db($link, 'clog');

$query="SET NAMES 'utf8'";
$result = mysqli_query($link, $query);

$transRoomNameFromDB2HR=array('_' => ' ');
$transRoomNameFromHR2DB=array(' ' => '_');

$table = strtr($room, $transRoomNameFromHR2DB) . "_room";

$query="SELECT * FROM " . $table . " ORDER BY datetime DESC, id DESC LIMIT 0,10";
/*var_dump($query);*/
$result = mysqli_query($link, $query);
if (!$result) /* no history for this room (i.e. no table)? or any other mysql error*/
{
	mysqli_close($link);
	die ("[]");
}

$data = array();

while ($row = mysqli_fetch_assoc($result)) {
		$msg = array();
		$msg["username"]=$row['username'];
		$msg["message"]=htmlspecialchars(str_replace('\\', '', strip_tags($row['message'])));
		$msg["datetime"]=$row['datetime'];
		array_push($data, $msg);
}
/*var_dump($data);*/


/*$msg = array();
$msg["username"]='ChatAddon';
$msg["message"]="L'historique est de retour et en test seulement pour la France. Chut! ;)";
$msg["datetime"]=date("2017-07-03 15:40:00");
array_push($data, $msg);*/

echo json_encode(array_reverse($data));
mysqli_close($link);
?>
