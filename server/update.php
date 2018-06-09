<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] != 'PUT') {
    exit;
}

$input = file_get_contents('php://input');
if (!$input) {
    echo 'NO DATA SENT';
    http_response_code(500);
    exit;
}

$data = json_decode($input);
if (!$data) {
    echo 'ERROR READING DATA';
    http_response_code(500);
    exit;
}

$heroes = json_decode(file_get_contents(__DIR__ . '/data.json'));
if (!$heroes) {
    echo 'ERROR READING FILE';
    http_response_code(500);
    exit;
}

$edit = false;
foreach ($heroes as &$hero) {
    if ($hero->id == $data->id) {
        $hero = $data;
        $edit = true;
    }
}
unset($hero);

if (!$edit) {
    http_response_code(400);
	exit;
}

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