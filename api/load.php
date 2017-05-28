<?php
use \Michelf\Markdown;
$start = microtime(true);

$data = [];

if (isset($_POST['load'])){

    extract($_POST);

    $output = file_get_contents($load);

    if (isset($extension) && $extension == 'md') {

        require_once 'Markdown.inc.php';

        $output = Markdown::defaultTransform($output);
    }

$data['content'] = $output;

$time_elapsed_secs = microtime(true) - $start;

$data['buildtime'] = round($time_elapsed_secs,3,PHP_ROUND_HALF_UP);


echo json_encode($data);

}