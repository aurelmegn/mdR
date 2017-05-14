app.factory("mainFactory",["$q","$http",function ($q,$http) {

    var factory = {

        getList : function () {

            var defered = $q.defer();

            $http.post("../api",{}).then(function ($data) {

                defered.resolve($data);
            },function () {
                defered.reject("There are a problem");
            })

            return defered.promise;
        }
    };

    return factory;

}]);