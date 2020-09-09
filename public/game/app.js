//score
let score = document.querySelectorAll(".score")[0]
senddata = document.querySelector(".senddata")
inputclass = document.querySelector(".inputclass")
//nickname
let name

//start the game on click
senddata.addEventListener("click", sendthedata)
//gameboard
let c = document.querySelectorAll("canvas")[0]
c.style.visibility = "hidden"
score.style.visibility = "hidden"
ctx = c.getContext("2d")
c.width = 600
c.height = 600
let scale = 20
let rows = c.width / scale
let columns = c.height / scale
let direction
//snake object 
let s = new snake()
s.speedy = 0
s.speedx = 0


//draw the snake
s.draw()

//set direction
let getdirection = function () {
    if (direction == "left") {
        s.speedx = -20
        s.speedy = 0
    }
    if (direction == "top") {
        s.speedx = 0
        s.speedy = -20
    }
    if (direction == "right") {
        s.speedx = 20
        s.speedy = 0
    }
    if (direction == "down") {
        s.speedx = -0
        s.speedy = 20
    }
}




setup = window.setInterval(function () {

    getdirection()

    ctx.clearRect(0, 0, c.width, c.height)

    s.snakegameover()
    s.update()
    s.eat()
    s.draw()
    f.draw()



}, 75)



//function that will be used as a callback to end the game whenever you lose, after the score was send to the server
function gameover() {
    document.querySelector(".endgame").classList.add("activated")
    document.querySelector(".endgame .header").innerHTML = `Congratulations ${name}, your score was ${s.total}`
    document.querySelector(".endgame button").addEventListener("click", function () {
        window.location.reload()
    })
}


//send the score to the server if its bigger than 0
async function logscore(gameover) {
    gameover()
    await clearInterval(setup)
    thescore = {
        score: s.total,
        name: name
    }
    if (thescore.score > 0) {
        thescore = JSON.stringify(thescore)

        let response2 = await fetch("/api", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: thescore
        })


    }


}

function snake() {
    this.x = 0
    this.y = 0
    this.speedx = 20
    this.speedy = 20
    this.total = 0;
    this.tail = []
    // function to pause the game
    this.pausegame = function () {
        alert("Game is paused")
    }

    // alerts game over -> press ok (refresh)
    this.snakegameover = function () {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.tail[i].x == this.x && this.tail[i].y == this.y) logscore(gameover)
        }
    }

    // function to eat the food
    this.eat = function () {
        if (this.x == f.x && this.y == f.y) {
            f.location()
            this.total++
            score.innerHTML = "Score: " + this.total
        }

    }

    //draws the snake on the canvas
    this.draw = function () {
        ctx.fillStyle = "green"
        ctx.strokeStyle = "white"

        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, 20, 20)
            ctx.strokeRect(this.tail[i].x, this.tail[i].y, 20, 20)
        }
        ctx.fillRect(this.x, this.y, 20, 20)
        ctx.strokeRect(this.x, this.y, 20, 20)



    }

    //function wich moves the snake before being drawn
    this.update = function () {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1]
        }

        this.tail[this.total - 1] = {
            x: this.x,
            y: this.y
        }

        this.x += this.speedx;
        this.y += this.speedy;

        if (this.x + 20 > c.width) logscore(gameover)
        if (this.y + 20 > c.height) logscore(gameover)

        if (this.x < 0) logscore(gameover)
        if (this.y < 0) logscore(gameover)

    }
}


//the food eaten by the snake
class fruit {
    constructor() {
        this.x = 0
        this.y = 0

        this.location()
    }

    //function to assign a location to the food every time it gets eaten
    location() {
        this.x = Math.floor(Math.random() * columns) * scale
        this.y = Math.floor(Math.random() * rows) * scale
    }

    //draw the food on the canvas

    draw() {
        ctx.fillStyle = "yellow"
        ctx.fillRect(this.x, this.y, 20, 20)
    }
}


let f = new fruit()

// send the data => start the game
function sendthedata() {
    if (inputclass.value != "") {
        document.querySelector(".containerflex").classList.add("activated")
        s.speedx = 20
        c.style.visibility = "visible"
        score.style.visibility = "visible"
        name = inputclass.value
        window.addEventListener("keydown", changedirection)
    }
}






//function used to change the direction with arrow keys
function changedirection(e) {
    e = e || window.event

    //left
    if (e.keyCode == "37") {
        if (s.speedx !== 0) return
        direction = "left"


    }
    //top
    if (e.keyCode == "38") {
        if (s.speedy !== 0) return
        direction = "top"
    }

    //right
    if (e.keyCode == "39") {
        if (s.speedx !== 0) return
        direction = "right"

    }

    //down
    if (e.keyCode == "40") {
        if (s.speedy !== 0) return
        direction = "down"
    }
    // p 
    if (e.keyCode == "80") {
        s.pausegame()
    }

}