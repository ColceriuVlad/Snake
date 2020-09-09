async function getscores() {

    //get scores from the server
    let response = await fetch("/sendtoclient")
    let data = await response.json()



    data.forEach(element => {
        let {
            score,
            name
        } = element

        document.querySelector(".nicknames").innerHTML += `<div class="contain">${name}</div>`
        document.querySelector(".scores").innerHTML += `<div class="contain">${score}</div>`
    })


    let nicknames = document.querySelectorAll(".nicknames .contain")
    let scores = document.querySelectorAll(".scores .contain")
    for (let i = 0; i < nicknames.length; i++) {
        nicknames[i].style.animation = `appear ${0.6 + i/10}s forwards`
        scores[i].style.animation = `appear ${0.6 + i/10}s forwards`

    }
}

getscores()