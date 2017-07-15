<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");

$start = microtime(true);

$data = [];

if (isset($_POST['load'])){
    extract($_POST);
    $output = file_get_contents($load);
    $data['content'] = $output;

    $time_elapsed_secs = microtime(true) - $start;

    $data['buildtime'] = round($time_elapsed_secs,3,PHP_ROUND_HALF_UP);
echo json_encode($data);
}
