app.controller("mainController",["$rootScope","$scope","$log","mainFactory",function ($rootScope,$scope,$log,mainFactory) {

    (function () {

        go("../");

    })();

    $scope.viewcontent = null;
    // $scope.viewcontent = " # Heading 1\n- [Link](http://example.com)\n- [Custom Link 1](herp://is.this.working?)\n- [Custom Link 2](derp://is.this.working?)";

    $scope.filelist = {};

    $scope.goToPath = function (path) {

        go(path);
    };

    $scope.changeContent = function (abspath,extension) {

        $rootScope.loader = true;

        mainFactory.loadContent(abspath,extension).then(contentLoadingSuccess,function (error) {

            $log.error(error)

            $rootScope.loader = false;

        });

        $scope.contentType = extension;

    };


    function go (path) {

        $rootScope.loader = true;

         mainFactory.getList(path).then(getFileListSuccess,getFileListFail)
     }


    function getFileListSuccess(data) {

        $scope.filelist = data.folders;

        $scope.currentFolder = data.currentFolder;

        $scope.buildtime = data.buildtime;

        $rootScope.loader = false;


    }

    function getFileListFail(error) {

        $log.error(error);

        $rootScope.loader = false;


    }

    function contentLoadingSuccess(data) {

        $scope.viewcontent = data.content;

        $scope.loadTime = data.buildtime;

        $rootScope.loader = false;


    }

}]);