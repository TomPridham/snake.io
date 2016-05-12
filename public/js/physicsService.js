"use strict";
angular.module('myApp').service('Physics', () => {
    this.f = (m,a)=>{
        return m*a;
    };
    
});