<?php

header("Content-Type: application/json");

$data = [];

//$data[];

if (isset($_POST['folder']))
{
    $currentFolder = $_POST['folder'];

}else{

    $currentFolder = "./";
}

$currentFolderRealPath = realpath($currentFolder);

$currentFolderFileList = scandir($currentFolderRealPath,SCANDIR_SORT_ASCENDING);

$currentFolderFileDetails = [];

$currentFolderNameLength = strlen($currentFolder);

foreach ($currentFolderFileList as $currentFolderElement) {

    if (!preg_match("[^\.]", $currentFolderElement)) {

        $currentFolderNameLength = strlen($currentFolder);

        if(strrpos($currentFolder,"/") == $currentFolderNameLength-1){

            $path =  realpath($currentFolder . $currentFolderElement);

        }
        else{


            $path = realpath($currentFolder .'/'. $currentFolderElement);
        }

        if (file_exists($path)){

            if (is_dir($path)) {

                array_push($currentFolderFileDetails, getFolderDetails($path,$currentFolderElement));


            } else {

                array_push($currentFolderFileDetails, getFileDetails($path));

            }

        }

    }

}

/**
 * @param $path
 * @return array
 */
function getFileDetails($path) {

    $infos = pathinfo($path);

    try{

        return array(

            'type'=>'file',

            'filename'=> isset($infos['filename']) ? $infos['filename'] : null,

            'extension'=>isset($infos['extension']) ? $infos['extension'] : null ,

            'basename'=>isset($infos['basename']) ? $infos['basename'] : null,

            'abspath'=>$path
        );
    }catch (Exception $e){

        return null;
    }


}

/**
 * @param $path
 * @param $file
 * @return array
 */
function getFolderDetails($path, $file){

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


$data['currentFolder'] = $currentFolderRealPath;

$data['folders'] = $currentFolderFileDetails;

echo json_encode($data);
