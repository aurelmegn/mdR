var app = angular.module('app',['ui.router']);


app.config(function($stateProvider,$urlRouterProvider)
{

    $stateProvider

        .state(name='main',

            {   url:'/',

                controller:'mainController',

                templateUrl:"partials/main.html"

            })


    $urlRouterProvider.otherwise('/');



});

