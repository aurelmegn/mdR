var app = angular.module('app',['ui.router','ngSanitize','hljs']);

app.config(function($stateProvider,$urlRouterProvider,hljsServiceProvider)
{

    $stateProvider

        .state(name='main',

            {   url:'/',

                controller:'mainController',

                templateUrl:"partials/main.html"

            })


    $urlRouterProvider.otherwise('/');

    hljsServiceProvider.setOptions({
        // replace tab with 4 spaces
        tabReplace: '    ',

        languages : ['html','css','php']
    });



});
