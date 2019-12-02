class Paddle {
    constructor(canvas, gameState, direction){
        this.canvas = canvas
        this.score = 0
        this.gameState = gameState
        this.y = gameState.initialY
        direction == 1 ? this.x = 0 : this.x = canvas.width - gameState.paddleWidth
        this.direction = direction
        this.constructor.all.push(this)
    }

    static all = []

    movePaddleUp = () => {
        if (this.y > 0){this.y -= this.gameState.paddleSpeed}
    }
    movePaddleDown = () => {
        if (this.y + this.gameState.paddleHeight < this.canvas.height){this.y += this.gameState.paddleSpeed}
    }

    checkCollision = (ball) => {
        console.log("checking collision of paddle", this.direction)
        const topOfBall = ball.y - ball.radius
        const bottomOfBall = ball.y + ball.radius
        const topOfPaddle = this.y
        const bottomOfPaddle = this.y + this.gameState.paddleHeight
        return ((topOfBall < bottomOfPaddle) && (bottomOfBall > topOfPaddle))
    }
    win = () => {
        this.score ++
    }

    renderPaddle = () => {
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x, this.y, this.gameState.paddleWidth, this.gameState.paddleHeight);
        ctx.font = "30px Arial";
        ctx.fillText(this.score, this.canvas.width/2 + (200 * this.direction), 50);
    }

    static renderAllPaddles = () => {
        this.all.forEach(paddle => paddle.renderPaddle())
    }

}