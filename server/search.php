<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$name = $_GET['name'];

$heroes = json_decode(file_get_contents(__DIR__ . '/data.json'));
$result = [];
foreach ($heroes as $hero) {
    if (strpos($hero->name, $name) !== false) {
		$result[] = $hero;
    }
}

echo json_encode($result);
exit;