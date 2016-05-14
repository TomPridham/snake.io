"use strict";
angular.module('myApp').controller('canvasController', function () {
    let canvas     = document.getElementById("viewport");
    let ctx        = canvas.getContext("2d");
    let x          = 0;
    let y          = 0;
    let midX       = 0;
    let midY       = 0;
    let dx         = 0;
    let dy         = 0;
    let ballRadius = 10;
    let snake      = [];
    let food       = [];
    let flag       = false;

    const makeFood = () => {
        for (let i = 0; i < food.length; i++) {
            ctx.beginPath();
            ctx.arc(food[i][0], food[i][1], 5, 0, Math.PI * 2);
            ctx.fillStyle = "#000";
            ctx.fill();
            ctx.closePath();
        }
    };

    const makeSnake = () => {
        for (var i = 0; i < snake.length; i++) {
            ctx.beginPath();
            ctx.arc(snake[i][0], snake[i][1], ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    };

    const draw = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x += dx * ballRadius/2;
        y += dy * ballRadius/2;
        snake.unshift([x, y]);
        for (let i = 0; i < food.length; i++) {
            if ((food[i][0] - (ballRadius / 2)) > x && (food[i][1] + (ballRadius / 2)) > x && (food[i][1] - (ballRadius / 2)) > y && (food[i][1] + (ballRadius / 2)) > y) {
                ballRadius+=ballRadius/Math.pow(ballRadius,2);
                console.log(food[i],food.splice(i, 1));
                flag = true;
                break;
            }
        }
        if (!flag) {
            snake.pop();
        } else {
            flag = false;
        }
        if (food.length < 20) {
            food.push([Math.random() * canvas.width, Math.random() * canvas.height * 2]);
        }
        makeFood();
        makeSnake();

    };

    const resizeCanvas = ()=> {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        midX          = canvas.width / 2;
        midY          = canvas.height / 2;
    };

    document.onmousemove = (event)=> {
        dx    = (event.pageX - midX);
        dy    = (event.pageY - midY);
        let c = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        dx    = dx / c;
        dy    = dy / c;
    };

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    x    = canvas.width / 2;
    y    = canvas.height / 2;
    midX = canvas.width / 2;
    midY = canvas.height / 2;
    for (let i = 0; i < ballRadius * 2; i++) {
        snake.push([x, (y - (i * ballRadius / 2))]);
        food.push([Math.random() * canvas.width, Math.random() * canvas.height * 2]);
    }
    setInterval(draw, 50);


});