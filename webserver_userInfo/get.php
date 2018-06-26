<?php

function my_var_dump($message, $var)
{
	//echo $message;
	//var_dump($var);
}


if (isset($_GET) && isset($_GET['status']))
{
	$fp = fopen("users", "r");

	if (flock($fp, LOCK_SH))
	{
			$users = explode("\n", file_get_contents('users'));
			flock($fp, LOCK_UN);
			sort($users);
			$countryID="";
			$perCoutry=array();
			$currentCountry=null;
			foreach ($users as $userInline)
			{
				//my_var_dump ("line", $userInline);
				$user = explode(" ", $userInline);
				if (count($user)<3)
					continue;
				//my_var_dump ("user", $user);
				$found=false;
				for ($i=2; $i<count($user); $i++)
				{
					//my_var_dump ("user part", $user[$i]);
					//my_var_dump ("status required", $_GET['status']);
					if ($user[$i]==$_GET['status'])
					{
						$found=true;
						//my_var_dump ("found", $found);
						break;
					}
				}
				if (!$found) continue;
				
				if ($user[0]!=$countryID)
				{
					if ($countryID!="")
						$perCoutry[$countryID] = $currentCountry;
					$countryID=$user[0];
					$currentCountry=array();
				}
				if ($currentCountry!==null)
					array_push($currentCountry, $user[1]);
				//my_var_dump ("curcountry", $currentCountry);
			}
			if ($countryID!="")
				$perCoutry[$countryID] = $currentCountry;
			
			my_var_dump ("percountry", $perCoutry);
			
			$countries=array();
			
			foreach ($perCoutry as $cID => $users)
			{
                if (!isset($_GET['country']) || isset($_GET['country']) && $_GET['country']==$cID)
                    array_push($countries, '"' . $cID . '":["' . implode($users, '" , "') . '"]');
			}
			if (count($countries)>0)
			{
				echo "{ ";
				echo implode($countries, " , ");
				echo " }";
			}
	}
	else 
	{
			echo "Impossible de verrouiller le fichier !";
	}

	fclose($fp);
}

?>