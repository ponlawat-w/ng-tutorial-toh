<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
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

$heroName = $data->name;
if (trim($heroName) == '') {
    echo 'EMPTY NAME!';
    http_response_code(400);
    exit;
}

$heroes = json_decode(file_get_contents(__DIR__ . '/data.json'));
if (!$heroes) {
    echo 'ERROR READING FILE';
    http_response_code(500);
    exit;
}
$heroIDs = array_map(function ($hero) { return $hero->id; }, $heroes);
$maxHeroID = max($heroIDs);

$newHero = new stdClass();
$newHero->id = $maxHeroID + 1;
$newHero->name = $heroName;

$heroes[] = $newHero;

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
header('Content-Type: application/json');
http_response_code(200);
echo json_encode($newHero);
exit;