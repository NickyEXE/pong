document.addEventListener("DOMContentLoaded", ()=> {

    const gameState = {
        rectangleY: 0,
        width: 1000,
        height: 600,
        initialY: 300,
        paddleWidth: 10,
        paddleHeight: 80,
        paddleSpeed: 2,
        ballXSpeed: 2,
    }

    const canvas = document.getElementById("myCanvas")
    canvas.width = gameState.width
    canvas.height = gameState.height

    const paddle1 = new Paddle(canvas, gameState, 1)
    const paddle2 = new Paddle(canvas, gameState, -1)

    const ball = {
    }

    setBall = () => {
        ball.x = canvas.width/2
        ball.y = canvas.height/2
        ball.radius = 8
        ball.dx = 0
        ball.dy = 0
        setTimeout(() => {ball.dx = gameState.ballXSpeed * (Math.floor(Math.random()) === 0 ? -1 : 1)
        ball.dy = Math.random()+1}, 500)
        
    }
    setBall()

    const paintBall = () => {
        const context = canvas.getContext('2d');
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
    }

    const moveBall = () => {
        ball.x += ball.dx
        ball.y += ball.dy
    }

    const checkWallCollision = () => {
        if ((ball.y + ball.radius > canvas.height) || (ball.y - ball.radius < 0)){ball.dy = ball.dy*(-1)}
    }

    const checkPaddleCollision = () => {
        if ((ball.x + ball.radius  >= canvas.width + gameState.paddleWidth) || (ball.x - ball.radius < 0)){
            const checkedPaddle = ball.dx < 0 ? paddle1 : paddle2
            if (checkedPaddle.checkCollision(ball)){
                ball.dx = ball.dx*(-1)
            }
        }
    }

    const checkWin = () => {
        if (ball.x - ball.radius > canvas.width){
            win(paddle2)
        }
        if (ball.x + ball.radius < 0){
            win(paddle1)
        }
    }

    const win = (paddle) => {
        paddle.win()
        setBall()
    }

    const controller = {
        83: {pressed: false, func: paddle1.movePaddleDown},
        87: {pressed: false, func: paddle1.movePaddleUp},
        38: {pressed: false, func: paddle2.movePaddleUp},
        40: {pressed: false, func: paddle2.movePaddleDown}
    }

    manageKeyDown = (event) => {
        if (controller[event.keyCode]){controller[event.keyCode].pressed = true}
    }
    manageKeyUp = (event) => {
        if(controller[event.keyCode]){controller[event.keyCode].pressed = false}
    }

    runPressedKeys = () => {
        Object.keys(controller).forEach(key => {
            if (controller[key].pressed){controller[key].func()}
        })
    }

    document.addEventListener("keydown", manageKeyDown)
    document.addEventListener("keyup", manageKeyUp)

    render = () => {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0,0, 1000, 600)
        runPressedKeys()
        checkWallCollision()
        checkPaddleCollision()
        checkWin()
        moveBall()
        paintBall()
        
        Paddle.renderAllPaddles()
    }

    setInterval(render, 2)


    





})