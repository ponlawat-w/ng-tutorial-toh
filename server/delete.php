<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] != 'DELETE') {
    exit;
}

$id = $_GET['id'];

$heroes = json_decode(file_get_contents(__DIR__ . '/data.json'));
if (!$heroes) {
    echo 'ERROR READING FILE';
    http_response_code(500);
    exit;
}

foreach ($heroes as $index => $hero) {
	if ($hero->id == $id) {
        array_splice($heroes, $index, 1);

        $file = fopen(__DIR__ . '/data.json', 'w');
        if (!$file) {
            echo 'ERROR OPENING FILE';
            http_response_code(500);
            exit;
        }
        if (!fwrite($file, json_encode($heroes))) {
            echo 'ERROR WRITING FILE';
            http_response_code(500);
            eit;
        }
        http_response_code(200);
        exit;
	}
}

http_response_code(400);
exit;