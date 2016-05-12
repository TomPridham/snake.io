"use strict";

angular.module("myApp", ["ui.router"]);

angular.module("myApp").config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("canvas", {
            url: "/",
            templateUrl: "routes/canvas.html",
            controller: "canvasController"
        })
});
