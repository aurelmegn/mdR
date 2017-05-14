<?php

$folder = "../";

if (isset($_POST['folder']))
{
    $folder = $_POST['folder'];
}

$rp = realpath($folder);

$filelist = scandir($rp);

$folders = [];

foreach ($filelist as $file) {

    if (!preg_match("[^\.]", $file)) {

        $path = realpath($folder . $file);

        if (is_dir($path)) {

            array_push($folders, folderdetails($path,$file));

        } else {

            array_push($folders, filedetails($path));

        }
    }

}

function filedetails($path) {

    $infos = pathinfo($path);

    return array(

        'type'=>'file',

        'filename'=>$infos['filename'],

        'extension'=>$infos['extension'],

        'basename'=>$infos['basename'],

        'abspath'=>$path
    );

}

function folderdetails($path,$file){

    $dircontent = [];

    foreach (scandir($path )as $element){

        if (!preg_match("[^\.]", $element)) {

            $abspath = realpath($path.'/'.$element);

            if (is_dir($abspath)){

                $elementdetails = array(

                    'type'=>'folder',

                    'name'=>$element,

                    'abspath'=>$abspath
                    );

            }else{

                //echo "file";

                $elementdetails = array(

                    'type'=>'file',

                    'name'=>$element,

                    'abspath'=>$abspath);


            }

            array_push($dircontent,$elementdetails);
        }

    }

    return array(

        "type" => "folder",

        "dirname" => $file,

        "dircontents" => $dircontent,

        "abspath" => $path
    );
}

$data = [];

echo json_encode($folders);
