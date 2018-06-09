<?php
header('Access-Control-Allow-Origin: *');
$heroes = json_decode(file_get_contents(__DIR__ . '/data.json'));

if ($heroes) {
    if (isset($_GET['id'])) {
        foreach ($heroes as $hero) {
            if ($hero->id == $_GET['id']) {
                echo json_encode($hero); exit;
            }
        }
    
        http_response_code(404); exit;
    } else {
        echo json_encode($heroes); exit;
    }
}


http_response_code(500); exit;