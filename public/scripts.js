// the menu

function getmenu() {


  this.menu = document.createElement("div")
  this.menu.setAttribute("class", "menu")
  document.body.appendChild(this.menu)

  // option start
  this.startgame = document.createElement("button")
  this.startgame.setAttribute("class", "menuoption")
  this.menu.appendChild(this.startgame)


  this.anchorstartgame = document.createElement("a")
  this.anchorstartgame.setAttribute("href", "./game/app.html")
  this.anchorstartgame.innerText = "Start Game"
  this.startgame.appendChild(this.anchorstartgame)


  //option tutorial
  this.tutorial = document.createElement("button")
  this.tutorial.setAttribute("class", "menuoption")
  this.tutorialanchor = document.createElement("a")
  this.tutorialanchor.setAttribute("id", "tutorial")
  this.tutorialanchor.setAttribute("href", "#tutorial")
  this.tutorialanchor.innerText = "Tutorial"
  this.menu.appendChild(this.tutorial)
  this.tutorial.append(this.tutorialanchor)


  //show tutorial
  this.tutorial.addEventListener("click", function () {
    menu.menu.classList.toggle("activated")
    instructions.element.classList.toggle("activated")
  })

  this.score = document.createElement("button")
  this.score.setAttribute("class", "menuoption")
  this.menu.appendChild(this.score)

  this.anchorscore = document.createElement("a")
  this.anchorscore.setAttribute("href", "game/scores/scores.html")
  this.anchorscore.innerText = "Scores"
  this.score.appendChild(this.anchorscore)


}

let menu = new getmenu()


//instruction submenu
function getinstructions() {
  this.element = document.createElement("div")
  this.element.setAttribute("class", "instructions")
  document.body.appendChild(this.element)


  //subinstr1
  this.i1 = document.createElement("p")
  this.i1.setAttribute("class", "subinstr")
  this.i1.innerHTML = `<i class="fas fa-arrow-up"></i><div> - Move up </div>`
  this.element.appendChild(this.i1)

  //subinstr2
  this.i2 = document.createElement("p")
  this.i2.setAttribute("class", "subinstr")
  this.i2.innerHTML = `<i class="fas fa-arrow-down"></i><div> - Move down </div>`
  this.element.appendChild(this.i2)

  //subinstr3
  this.i3 = document.createElement("p")
  this.i3.setAttribute("class", "subinstr")
  this.i3.innerHTML = `<i class="fas fa-arrow-left"></i><div> - Move Left </div>`
  this.element.appendChild(this.i3)

  //subinstr4
  this.i3 = document.createElement("p")
  this.i3.setAttribute("class", "subinstr")
  this.i3.innerHTML = `<i class="fas fa-arrow-right"></i><div> - Move Right </div>`
  this.element.appendChild(this.i3)

  //subinstr5
  this.i4 = document.createElement("p")
  this.i4.setAttribute("class", "subinstr")
  this.i4.innerHTML = `<div><i class="fas fa-pause-circle"></i> - Press P for Pause </div>`
  this.element.appendChild(this.i4)

  //subinstr6
  this.i5 = document.createElement("p")
  this.i5.setAttribute("class", "subinstr")
  this.i5.innerHTML = `<div class="return"><i class="fas fa-backward"></i> - Return to menu </div>`
  this.element.appendChild(this.i5)


  // onclick -> submenu instr hidden -> main menu appear
  this.i5.addEventListener("click", function () {
    menu.menu.classList.toggle("activated")
    instructions.element.classList.toggle("activated")
  })

}

let instructions = new getinstructions()