app.controller("mainController",["$scope","$log","mainFactory",function ($scope,$log,mainFactory) {

    $scope.filelist = {};

    (function () {
        mainFactory.getList().then(getListSuccess,getListFail)
    })()
    
    function getListSuccess(data) {

        $scope.filelist = data.data;
    }

    function getListFail(error) {

        //$scope.filelist = data.data;

        $log.error(error);


    }

    // filelist =

}]);