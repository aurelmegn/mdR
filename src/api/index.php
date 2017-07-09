<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");
header("Content-Type: application/json");

$start = microtime(true);
$data = [];

if (isset($_POST['folder'])) {
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
$CurrentFolderFileType = array_filter($currentFolderFileDetails,function ($file){
        if ($file['type']== 'file'){
            return true;
        }
        if ($file['type']== 'folder'){
            return false;
        }
},ARRAY_FILTER_USE_BOTH);

$CurrentFolderFolderType = array_filter($currentFolderFileDetails,function ($file) {
    if ($file['type']== 'file'){
        return false;
    }
    if ($file['type']== 'folder'){
        return true;
    }

},ARRAY_FILTER_USE_BOTH);

$currentFolderFileDetails = array_merge($CurrentFolderFolderType,$CurrentFolderFileType);
$data['currentFolder'] = $currentFolderRealPath;
$data['folders'] = $currentFolderFileDetails;
$time_elapsed_secs = microtime(true) - $start;
$data['buildtime'] = round($time_elapsed_secs,2,PHP_ROUND_HALF_UP);
echo json_encode($data);