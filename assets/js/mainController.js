app.controller("mainController",["$scope","$log","mainFactory",function ($scope,$log,mainFactory) {

    (function () {

        go("../");

    })();

    $scope.viewcontent = " Nothing to show";
    // $scope.viewcontent = " # Heading 1\n- [Link](http://example.com)\n- [Custom Link 1](herp://is.this.working?)\n- [Custom Link 2](derp://is.this.working?)";

    $scope.filelist = {};

    $scope.goToPath = function (path) {

        go(path);
    };

    $scope.changeContent = function (abspath,extension) {

        mainFactory.loadContent(abspath,extension).then(contentLoadingSuccess,function (error) {

            $log.error(error)
        });

        $scope.contentType = extension;

    };


    function go (path) {
         mainFactory.getList(path).then(getFileListSuccess,getFileListFail)
     }

    function getFileListSuccess(data) {

        $scope.filelist = data.folders;

        $scope.currentFolder = data.currentFolder;

    }

    function getFileListFail(error) {

        $log.error(error);

    }

    function contentLoadingSuccess(data) {

        $scope.viewcontent = data;

        $log.info(data)

    }

}]);