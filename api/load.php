<?php
use \Michelf\Markdown;

if (isset($_POST['load'])){

    extract($_POST);

    $output = file_get_contents($load);

    if (isset($extension) && $extension == 'md') {

        require_once 'Markdown.inc.php';

        $output = Markdown::defaultTransform($output);
    }

    echo $output;

}
