<?php

$configs = @json_decode(file_get_contents("configs.json"));
if ($configs == null) {
	$configs = new stdClass();
	// webhooks not configured - see comment below
}
	
/* configs.json contains details of all the rooms and webhooks:
{
	"<room name>" : {
		"type" : "<Console | Slack | Discord>",
		"webhook" : "<url>",
		"contact" : "<name of person with webhook details>"
	},
	// repeat for each room
}
*/

function sendToWebhook($room, $username, $message) {
	global $configs;

	if (!array_key_exists($room, $configs)) {
		return false; // no webhook config for this room
	}
	$config = $configs->{$room};

	// send message depending on the type of webhook
	if ($config->type == "Console") {
		$ok = sendToConsole($config, $username, $message);
	}
	else if ($config->type == "Slack") {
		$ok = sendToSlack($config, $username, $message);
	}
	else if ($config->type == "Discord") {
		$ok = sendToDiscord($config, $username, $message);
	}
	else {
		$ok = false; // unexpected type
	}

	return $ok;
}

function sendToConsole($config, $username, $message) {
	printf("| *%s* _%s_\n", $username, $message);
	return true;
}

function sendToSlack($config, $username, $message) {
	// format the message for Slack
	$message = sprintf("*%s* %s", $username, $message);

	// build the payload for the webhook
	$data_string = json_encode([ 'text' => $message ]);

	// create the POST request to webhook
	$ch = curl_init($config->webhook);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json',
		'Content-Length: ' . strlen($data_string))
	);

	// engage!
	$result = curl_exec($ch);
	if (!$result) {
		#print "- Error sending message to Slack\n";
		return false;
	}

	curl_close($ch);

	if ($result == 'ok') {
		return true;
	}

	#print "- Failed to send message to Slack\n";
	return false;
}

function sendToDiscord($config, $username, $message) {
	// build the payload for the webhook
	$data_string = json_encode([ 'username' => $username, 'content' => $message ]);

	// create the POST request to webhook
	$ch = curl_init($config->webhook);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json',
		'Content-Length: ' . strlen($data_string))
	);

	// engage!
	$result = curl_exec($ch);

	// assume it sent fine
	return true;
}

?>
