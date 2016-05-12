"use strict";
angular.module('myApp').controller('canvasController', function () {
    let canvas     = document.getElementById("viewport");
    let ctx        = canvas.getContext("2d");
    let x=0, y=0, midX=0, midY=0, dx=0, dy=0;
    let ballRadius = 5;
    let snake      = [];

    const drawBall = (whatever) => {
        ctx.beginPath();
        ctx.arc(whatever[0], whatever[1], ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    };

    const makeSnake = ()=> {
        for (var i = 0; i < ballRadius * 2; i++) {
            drawBall(snake[i]);
        }
    };

    const draw = ()=> {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x += dx;
        y += dy;
        snake.unshift([x, y]);
        snake.pop();
        makeSnake();
        console.log(x);
    };

    const resizeCanvas = ()=> {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    };

    document.onmousemove = (event)=> {
        dx = (event.pageX - midX) / midX;
        dy = (event.pageY - midY) / midY;
    };

    window.addEventListener('resize', resizeCanvas, false);
    x    = canvas.width / 2;
    y    = canvas.height / 2;
    midX = canvas.width / 2;
    midY = canvas.height / 2;
    for (let i = 0; i < ballRadius * 2; i++) {
        snake.push([x, (y - (i * ballRadius / 2))]);
    }
    resizeCanvas();
    setInterval(draw, 100);

});