<?php
/**
 *
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");
header("Content-Type: application/json");

/**
 *
 */
if (isset($_POST['folder'])) {
    $currentFolder = $_POST['folder'];
    die(json_encode(folderContent($currentFolder)));
}elseif(isset($_POST['absolutePath'])) {
    $fileAbsolutePath = $_POST['absolutePath'];
    die(json_encode(getRelativePath($fileAbsolutePath)));
}else{
    $currentFolder = "./";
}

/**
 * @param $fileAbsolutePath
 * @return bool
 * @throws Exception
 * @internal param $absolutePath
 */
function getRelativePath($fileAbsolutePath): string{
    $currentFrontPath = realpath(__DIR__."/..");
    $fileFolderAbsolutePath = dirname($fileAbsolutePath);
    $commonDir = getCommonDirectory($currentFrontPath,$fileFolderAbsolutePath);
    //return $commonDir;
    if(is_null($commonDir)){
        return null;
    }
    $numberOfDirAfterCommonDir = getNumberOfDirAfterCommonDir($currentFrontPath,$commonDir);
    $dotBeforeCommonDir="";
    for ($i =0;$i< $numberOfDirAfterCommonDir;$i++){
        $dotBeforeCommonDir.='../';
    }
    $pathAfterCommonDir = getPathAfterCommonDir($fileAbsolutePath,$commonDir);
    $relativePath = $dotBeforeCommonDir."..".$pathAfterCommonDir;

    /**
     * /media/aurel/main/Autres/Ma musique/Adele/file.md 6
     * /media/aurel/main/PROJECTS/WEB/mdR/src/ 7
     * ../../../../Autres/Ma\ musique/Adele/ 7
     */
    return $relativePath;
}

function getPathAfterCommonDir($path,$dir): string{
    $parts = explode('/',$path);
    $pathAfterCommonDir = '';
    $commonPathKey = array_search($dir,$parts);
    foreach ($parts as $key => $value){
        if ($key>$commonPathKey){
            $pathAfterCommonDir.="/".$value;
        }
    }
/*    for ($i=0;$i<count($parts);$i++){
        if($i>$commonPathKey){
            $pathAfterCommonDir.=$parts[$i];
        }
    }*/
    return $pathAfterCommonDir;
}

function getNumberOfDirAfterCommonDir($path,$dir): int{
    $i = 0;
    $parts = explode('/',$path);
    array_shift($parts);
    foreach ($parts as $folder){
        if ($folder == $dir){
            return $i;
        }
        $i++;
    }
    return null;
}

function getCommonDirectory($dir1,$dir2): string{
    $part1 = explode('/',$dir1);
    $part2 = explode('/',$dir2);

    array_shift($part1);
    array_shift($part2);

    $previousDir = null;
    foreach ($part1 as $folder){
        if(in_array($folder,$part2)){
            $previousDir = $folder;
        } else{
            return $previousDir;
        }
    }
    return null;
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

function folderContent($currentFolder){
    $start = microtime(true);
    $data = [];
    /**
     *
     */
    $currentFolderRealPath = realpath($currentFolder);
    $currentFolderFileList = scandir($currentFolderRealPath,SCANDIR_SORT_ASCENDING);
    $currentFolderFileDetails = [];
    $currentFolderNameLength = strlen($currentFolder);
    foreach ($currentFolderFileList as $currentFolderElement) {
        if (!preg_match("[^\.]", $currentFolderElement)) {
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

    return $data;
}

