﻿<?php
/*
function startsWith($haystack, $needle) {
    // search backwards starting from haystack length characters from the end
    return $needle === "" || strrpos($haystack, $needle, -strlen($haystack)) !== FALSE;
}

function endsWith($haystack, $needle) {
    // search forward starting from end minus needle length characters
    return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== FALSE);
}
*/


function startsWith($haystack,$needle) 
{ 
	$lenH = mb_strlen($haystack, 'UTF-8');
	$lenN = mb_strlen($needle, 'UTF-8');
	if ($lenH<$lenN) return false;
	$haystack2=mb_substr($haystack, 0, $lenN, 'UTF-8');
	if(mb_strrpos($haystack2,$needle,0,"UTF-8")===0) 
		 return true;
	return false; 
} 

function endsWith($haystack,$needle) 
{ 
	$lenH = mb_strlen($haystack, 'UTF-8');
	$lenN = mb_strlen($needle, 'UTF-8');
	if ($lenH<$lenN) return false;
	$pos=$lenH-$lenN; 
	if(mb_strrpos($haystack,$needle,0,"UTF-8")==$pos) 
		 return true;
	return false; 
} 

function removeDuplicates($s)
{
	
	$splitedString = preg_split("/[\n\r]+/", $s);
	$pos=0;
	while ($pos < count($splitedString)-1)
	{
		if (mb_strpos($splitedString[$pos], $splitedString[$pos+1], 0, "UTF-8")!==false)
		{
			array_splice($splitedString, $pos+1, 1);
		}
		else
			$pos++;
	}
	return (implode("\n", $splitedString));
}

function my_var_dump($message, $var)
{
	global $debug;
	if (!$debug) return;
	echo $message . "<br />";
	var_dump($var);
}

$transRoomNameFromDB2HR=array('_' => ' ');
$transRoomNameFromHR2DB=array(' ' => '_');


$link = mysql_connect("localhost", "clog", "hT5_sX23");
//var_dump ($link);

function getAvailableRooms($link)
{
	$roomList = array();
	//$db_selected = mysql_select_db('information_schema', $link);
	$query="SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA='clog'";
	$result = mysql_query($query, $link);
	if (!$result)
	{
		my_var_dump("Mysql error: " , mysql_error());
		return $roomList;
	}

	while ($row = mysql_fetch_assoc($result)) {
			if (endsWith($row['TABLE_NAME'], '_room'))
			{
				array_push($roomList, $row['TABLE_NAME']);
//				$roomName = substr($row['TABLE_NAME'], 0, strlen($row['TABLE_NAME'])-5);
				//$roomName=strtr($roomName, $transRoomNameFromDB2HR);
			}
			
	}
	return $roomList;
}



$db_selected = mysql_select_db('clog', $link);

$query="SET NAMES 'utf8'";
$result = mysql_query($query, $link);

$data = json_decode(file_get_contents('php://input'));

$debug=false;
if ($data==null)
{
	$debug=true;
}

if ($debug)
{

$data = json_decode('{"user":"dummyd2","room":"France","history":
                            [{"room":"France",
                            "username":"d2",
                            "datetime":"2015-11-17T21:45:50.446Z",
                            "message":"123;"},
                            {"room":"France",
                            "username":"d2",
                            "datetime":"2015-11-17T21:45:50.446Z",
                            "message":"123;\nоборудование предприятий"},
                            {"room":"France",
                            "username":"d2",
                            "datetime":"2015-11-17T21:45:50.446Z",
                            "message":"оборудование предприятий"}]}',
											false);
	my_var_dump("data", $data);
}

//error_log(json_encode($data));
//error_log(gettype($data));

if (gettype($data)=="array")
    die();

//error_log($data->user);

if (property_exists($data, "user")==false)
    die();

//error_log($data->user);

//if ($data->user!="dummyd2")

// read shared memory
$shmem_max_size=262144;

$shmem_id=shmop_open(0xff00, "c", 0644, $shmem_max_size);

$string = trim(shmop_read ($shmem_id , 0 , $shmem_max_size ));
//var_dump($string);

$shmem_data = null;

if ($string == "")
    $shmem_data=new stdClass();
else
{
    try {
        $shmem_data=json_decode($string);
    }
    catch (Exception $e)
    {
        var_dump($e);
        $shmem_data=null;
    }
}

$currentLeader=null;
$currentRoom=$data->room;

if ($shmem_data!=null)
{
    if (property_exists($shmem_data, $currentRoom)==true)
    {
        if ((time() - $shmem_data->$currentRoom->ts)<4)
            $currentLeader=$shmem_data->$currentRoom->leader;
        else // I take the lead
        {
            $shmem_data->$currentRoom->leader=$data->user . '_' . $data->uid;
            $shmem_data->$currentRoom->ts=time();
            $currentLeader=$data->user . '_' . $data->uid;
            $shmem_string=str_pad(json_encode($shmem_data), $shmem_max_size);
            shmop_write ( $shmem_id , $shmem_string , 0 );
        }
    }
    else
    {
        // I take the lead!
        $shmem_data->$currentRoom=new stdClass();
        $shmem_data->$currentRoom->leader=$data->user . '_' . $data->uid;
        $shmem_data->$currentRoom->ts=time();
    
        $currentLeader=$data->user . '_' . $data->uid;
        $shmem_string=str_pad(json_encode($shmem_data), $shmem_max_size);
        shmop_write ( $shmem_id , $shmem_string , 0 );
    }
}

if ($currentLeader==null || $currentLeader!=$data->user . '_' . $data->uid) // if troubles with leader or if I'm not the leader
{
    shmop_close($shmem_id);
    if ($currentLeader==null)
        die();
    else
    {
        $leadResponse=new stdClass();
        $leadResponse->country=$currentRoom;
        $leadResponse->leader=$currentLeader;
        die(json_encode($leadResponse));
    }
}

$data=json_decode(json_encode($data->history), true);


$now = gmdate("Y-m-d\TH:i:s\.000\Z");
//var_dump($data);
for ($i=0; $i<count($data); $i++)
{
	$query="UNLOCK TABLES";
	$result = mysql_query($query, $link);
	
	// remove incoming duplicated messages
	/*
	$pos=0;
	while ($pos < count($splitedMessage))
	{
		if (mb_strpos($data[$i]['message'], $splitedMessage[$pos], 0, "UTF-8")!==false)
		{
			array_splice($splitedMessage, $pos, 1);
			$data[$i]['message']=implode('\n', $splitedMessage);
			//$splitedMessage = explode('\n', $data[$i]['message']);
		}
		else
			$pos++;
	}*/
	
	
	$data[$i]['message']=removeDuplicates($data[$i]['message']);
	
	
	//if ($debug) var_dump(utf8_decode($data[$i]['message']));
	//$room = mysql_real_escape_string(utf8_decode($data[$i]['room']));
	$room = mysql_real_escape_string($data[$i]['room']);
	//$message = mysql_real_escape_string(utf8_decode($data[$i]['message']));
	$message = mysql_real_escape_string($data[$i]['message']);
	//$username = mysql_real_escape_string(utf8_decode($data[$i]['username']));
	$username = mysql_real_escape_string($data[$i]['username']);
	//$datetime = mysql_real_escape_string(utf8_decode($data[$i]['datetime']));
	//$datetime = mysql_real_escape_string($data[$i]['datetime']);
	
	//if ($debug)	var_dump($data);
//    if ($room!="France")
//        die();

	//$message = $data[$i]['message'];

	$availableRooms=getAvailableRooms($link);
	
	$table = strtr($room, $transRoomNameFromHR2DB) . "_room";
	my_var_dump("Table name to test if exists: ", $table);
	my_var_dump("avail rooms: ", $availableRooms);
	
	if (!in_array($table, $availableRooms))
	{
		$query = "CREATE TABLE IF NOT EXISTS `" . $table . "` ( `id` bigint(20) NOT NULL, `username` text CHARACTER SET utf8 NOT NULL, `message` text CHARACTER SET utf8 NOT NULL, `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=latin1";
		$result = mysql_query($query, $link);
		if ($result)
		{
			$query = "ALTER TABLE `" . $table . "` ADD PRIMARY KEY (`id`)";
			$result = mysql_query($query, $link);
			
			$query = "ALTER TABLE `" . $table . "` MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT";
			$result = mysql_query($query, $link);
		}
		else
		{
			my_var_dump("Error SQL on create table:", mysql_error());
		}
	}
	
	$query="LOCK TABLES " . $table . " WRITE";
	$result = mysql_query($query, $link);

	if (!$result)
		die();

	my_var_dump("current message", $data[$i]);

	// get last message:
	$query="SELECT * FROM " . $table . // . " WHERE " . 
				 //"room='" . $data[$i]['room'] . "' " . 
				 //"AND username='" . $data[$i]['username'] . "' " . 
				 //"AND message LIKE '%" . mysql_real_escape_string($data[$i]['message']) . "%' " .
				 //"AND datetime>DATE_SUB('" . $now . "', INTERVAL 4 SECOND)";
				 " ORDER BY datetime DESC LIMIT 1";
	//echo $query;
	$lastMessage=null;
  my_var_dump("query last message" , $query);
	$result = mysql_query($query, $link);
	my_var_dump("result", $result);
	$row = mysql_fetch_assoc($result);
	if ($row)
		$lastMessage=$row;
	my_var_dump("lastmessage", $lastMessage);
	
	$query="SELECT * FROM " . $table . " WHERE " . 
				 // "room='" . $data[$i]['room'] . "' " . 
				 "username='" . $data[$i]['username'] . "' " . 
				 //"AND message LIKE '%" . mysql_real_escape_string($data[$i]['message']) . "%' " .
				 "AND datetime>DATE_SUB('" . $now . "', INTERVAL 4 SECOND)";
				 " ORDER BY datetime DESC";
	//echo $query;
  my_var_dump("query last per date 4 sec", $query);
	$result = mysql_query($query, $link);
	my_var_dump("result", $result);
	
	$found = false;
	$toUpdate = 0;
	$toConcat = null;
	while ($row = mysql_fetch_assoc($result))
	{
		//my_var_dump("row", $row);
		//my_var_dump("utf8_encode(\$row['message'])", utf8_encode($row['message']));
		//if (utf8_encode($row['message']) == $data[$i]['message'] ||
		//		startsWith(utf8_encode($row['message']), $data[$i]['message']))
		if (//strcmp($row['message'], $data[$i]['message'])==0 ||
				startsWith($row['message'], $data[$i]['message']))
		{
			my_var_dump("found true because starts with:", [$row['message'], $data[$i]['message']]);
			$found=true;
			break;
		}
		//if (startsWith($data[$i]['message'], utf8_encode($row['message'])))
		if (startsWith($data[$i]['message'], $row['message']))
		{
			$toUpdate=$row['id'];
			break;
		}
	}
	my_var_dump("found", $found);
	if ($found)
	{
		$query="UNLOCK TABLES";
		$result = mysql_query($query, $link);
		continue;
	}
	
	if ($lastMessage!=null)
	{
		//if (startsWith($data[$i]['message'], utf8_encode($lastMessage['message'])) &&
		if (startsWith($data[$i]['message'], $lastMessage['message']) &&
				$lastMessage['username']==$data[$i]['username'])
			$toUpdate=$lastMessage['id'];
		else if ($lastMessage['username']==$data[$i]['username'])
			$toConcat=$lastMessage;
			
		//if (endsWith(utf8_encode($lastMessage['message']), $data[$i]['message']) &&
		if (endsWith($lastMessage['message'], $data[$i]['message']) &&
				$lastMessage['username']==$data[$i]['username'])
				{
					$query="UNLOCK TABLES";
					$result = mysql_query($query, $link);
					my_var_dump("found endwith in last message => no db operation", [$lastMessage['message'], $data[$i]['message']]);
					continue;
				}
	}
	
	if (!$found)
	{
		if ($toUpdate!=0)
		{
			my_var_dump("update overwrite", null);
			$query="UPDATE " . $table . " SET message='" . $message . "' WHERE id=" . $toUpdate;
		}
		else if ($toConcat!=null)
		{
			my_var_dump("update concat", null);
			// remove sub messages that appear twice:
			$splitedMessage = explode('\n', mysql_real_escape_string($data[$i]['message']));
			$pos=0;
			while ($pos < count($splitedMessage))
			{
				if (mb_strpos($toConcat['message'], $splitedMessage[$pos], 0, "UTF-8")!==false)
				{
					array_splice($splitedMessage, $pos, 1);
				}
				else
					$pos++;
			}

			if (count($splitedMessage)==0)
			{
				// all sub messages to be added are already in the DB
				continue;
			}
			$query="UPDATE " . $table . " SET message='" . mysql_real_escape_string($toConcat['message']) . "\n" . mysql_real_escape_string(implode('\n', $splitedMessage)) . "' WHERE id=" . $toConcat['id'];
		}
		else
		{
			my_var_dump("insert new", null);
			$query="INSERT INTO " . $table . " (username, message, datetime) VALUES ('" . $username . "' , '" . $message . "' , UTC_TIMESTAMP())";
		}
		my_var_dump("query insert or update", $query);
		$result = mysql_query($query, $link);
		my_var_dump("result", $result);
		if (!$result)
			my_var_dump("MySQL error:", mysql_error());

	}
	$query="UNLOCK TABLES";
	$result = mysql_query($query, $link);
}



mysql_close($link);

//$row = mysql_fetch_assoc($result);

$leadResponse=new stdClass();
$leadResponse->country=$currentRoom;
$leadResponse->leader=$currentLeader;
die(json_encode($leadResponse));

?>