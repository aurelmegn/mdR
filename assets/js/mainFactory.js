app.factory("mainFactory",["$q","$http","$httpParamSerializerJQLike",function ($q,$http,$httpParamSerializerJQLike) {

    var factory = {

        getList : function (path) {

            var defered = $q.defer();

            /*$http.post("../api",{}).then(function (data) {

                defered.resolve(data.data);

            },function () {
                defered.reject("There are a problem");
            })*/

            data = { folder : path};

            $http({
                url : "../api",
                method: "POST",
                data: $httpParamSerializerJQLike(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (data) {

                defered.resolve(data.data)

            },function () {

                defered.reject("There are a problem");

            });

            return defered.promise;
        },
        
        loadContent : function (abspath,extension) {

            var defered = $q.defer();

            data = { load : abspath, extension : extension};

            $http({
                url : "../api/load.php",
                method: "POST",
                data: $httpParamSerializerJQLike(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (data) {

                defered.resolve(data.data)

            },function () {

                defered.reject("There are a problem");

            });

            return defered.promise;
        }
    };

    return factory;

}]);