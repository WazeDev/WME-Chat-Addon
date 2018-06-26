<?php

if (isset($_GET) && isset($_GET['status']) && isset($_GET['username']) && isset($_GET['clist']))
{
	$fp = fopen("users", "r");

	if (flock($fp, LOCK_SH))
	{
		$users = explode("\n", file_get_contents('users'));
		flock($fp, LOCK_UN);
		fclose ($fp);
		
		$fp = fopen("users", "w");
		
		if (flock($fp, LOCK_EX))
		{
			$countries = explode(",", $_GET['clist']);
			var_dump($users);
			foreach ($countries as $c)
			{
				//fwrite($fp, "\n" . $c . " " . $_GET['username'] . " " . $_GET['status']);
				array_push($users, $c . " " . $_GET['username'] . " " . $_GET['status']);
				
			}
			var_dump($users);
			$users = array_unique($users);
			var_dump($users);
			fwrite($fp, implode("\n", $users));
			flock($fp, LOCK_UN);
		}
		else 
		{
				echo "Impossible de verrouiller le fichier !";
		}
	}
	else 
	{
			echo "Impossible de verrouiller le fichier !";
	}

	fclose($fp);
}

?>