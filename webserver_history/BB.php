<html><head></head><body>
<?php

$shmem_max_size=262144;

$shmem_id=shmop_open(0xff01, "c", 0644, $shmem_max_size);

$string = trim(shmop_read ($shmem_id , 0 , $shmem_max_size ));
//var_dump($string);

$shmem_data = null;

if ($string != "")
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

echo '<H1>Users Room France</H1>';

if ($shmem_data!=null)
{
    $data = (array) $shmem_data;
    arsort($data);
    echo '<table border="0px">';
    $i=0;
    $ts=0;
    foreach($data as $c => $l)
    {
        if ($i>0 && $ts==0)
            $ts=$l;
        if ($i>0 && abs($ts-$l)>3)
        {
            echo '<tr><td colspan=2><hr/></td></tr>';
            $i=-99999;
        }
        echo '<tr><td>' . $c . '</td><td class="date">' . date("Y-m-d\ H:i:s", $l) . '</td></tr>';
        $i++;
    }
    echo '</table>';
}
else
{
    echo "shared memory is empty";
}

shmop_close($shmem_id);

echo '<hr>';
echo '<H1>Leaders mondiaux</H1>';

$shmem_id=shmop_open(0xff00, "c", 0644, $shmem_max_size);

$string = trim(shmop_read ($shmem_id , 0 , $shmem_max_size ));
//var_dump($string);

$shmem_data = null;

if ($string != "")
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

function tscmp($a,$b)
    {
        return $b->ts-$a->ts;
    }

    function keytoprop($e, $k)
    {
        $e->key=$k;
        return $e;
    }

if ($shmem_data!=null)
{
    $data = (array) $shmem_data;
    $data = array_map("keytoprop", $data, array_keys($data));
    usort($data, "tscmp");
    echo '<table border="0px">';
    foreach($data as $c => $l)
    {
        echo '<tr><td>' . $l->key . '</td><td>' . $l->leader . '</td><td class="date">' . date("Y-m-d\ H:i:s", $l->ts). '<td></tr>';
    }
    echo '</table>';
}
else
{
    echo "shared memory is empty";
}

shmop_close($shmem_id);

echo "<HR>";

?>


<script type="text/javascript">
var records = document.getElementsByClassName("date");
console.info(records);
if (records)
{
    for (var i=0; i<records.length; i++) {
        //console.info(datetime.innerHTML);
        var r=records.item(i);
        var utcTS = new Date(r.innerHTML + " UTC").getTime();
        var localDT = new Date(utcTS).toLocaleString();
        r.innerHTML = localDT;
    }
}
</script>
</body>
</html>