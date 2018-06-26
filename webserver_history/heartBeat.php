<?php

$transRoomNameFromDB2HR=array('_' => ' ');
$transRoomNameFromHR2DB=array(' ' => '_');


$data = json_decode(file_get_contents('php://input'));


if (property_exists($data, "user")==false)
    die();


if ($data->room=="France")
{
    // read shared memory
    $shmem_max_size=262144; // 1 MB

    $shmem_id=shmop_open(0xff01, "c", 0644, $shmem_max_size);

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
    $user=$data->user;
    if ($shmem_data!=null)
    {
        $shmem_data->$user=time();
        $shmem_string=str_pad(json_encode($shmem_data), $shmem_max_size);
        shmop_write ( $shmem_id , $shmem_string , 0 );
    }

    shmop_close($shmem_id);
}



// read shared memory
$shmem_max_size=262144; // 1 MB

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
$room=$data->room;

if ($shmem_data!=null)
{
    if (property_exists($shmem_data, $room)==true)
    {
        $currentLeader=$shmem_data->$room->leader;
        if ($currentLeader==$data->user . '_' . $data->uid)
        {
            $shmem_data->$room->ts=time();
            $shmem_string=str_pad(json_encode($shmem_data), $shmem_max_size);
            shmop_write ( $shmem_id , $shmem_string , 0 );
        }
    }
    else
    {
        // I take the lead!
        $shmem_data->$room=new stdClass();
        $shmem_data->$room->leader=$data->user . '_' . $data->uid;
        $shmem_data->$room->ts=time();
    
        $currentLeader=$data->user . '_' . $data->uid;
        $shmem_string=str_pad(json_encode($shmem_data), $shmem_max_size);
        shmop_write ( $shmem_id , $shmem_string , 0 );
    }
}

shmop_close($shmem_id);

?>