<?php
include("lib-webhooks.php");

foreach ($configs as $room => $config) {
	$configs->{$room}->type = 'Console'; // testing
	
	// fetch the history from WazeDev
	$url = sprintf("https://wazedev.com/chataddon/clog/getHistory.php?room=%s", urlencode($room));
	$chatlog = trim(file_get_contents($url));
	if (!$chatlog) {
		print "ERROR: failed to fetch log for $config->room\n";
		continue;
	}

	// remove bogus characters at beginning of the feed
	$chatlog = preg_replace('/^[\x00-\x1F\x80-\xFF]*/', '', $chatlog);

	// decode json
	$data = json_decode($chatlog, false, 512, JSON_THROW_ON_ERROR);
	if ($data === null) {
		printf("ERROR: failed to parse json: %s\n", json_last_error_msg());
		continue;
	}

	printf("[%s] %s:\n", strftime('%T'), $room);
	
	// read messages from history
	$count = 0;
	foreach ($data as $chat) {
		// send message depending on the type of webhook
		$ok = sendToWebhook($room, $chat->username, $chat->message);
		if ($ok) {
			$count++;
		}
	}

	if ($count > 0) {
		printf("[%s] %s: Sent %d messages to %s\n", strftime('%T'), $room, $count, $config->type);
	}
}

?>
