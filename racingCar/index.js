let whole = document.getElementById('whole')
let score = document.getElementById('score')
let startScreen = document.getElementById('startScreen')
let startScreenContent = document.getElementById('startScreenContent')
let road = document.getElementById('road-div')


 let button = { ArrowUp : false , ArrowDown : false, ArrowLeft : false, ArrowRight : false }
 let player = { speed : 4 , isStarted : false, x : 0 , y : 0 , score: 0}


  startScreen.addEventListener('click', ()=>{
     startScreen.classList.add('hide')
     road.innerHTML = ""

     player.isStarted = true
     player.score = 0
     player.speed = 4
     
     for(let i =0 ; i<5; i++)
      {
       let line = document.createElement('div')
       line.classList.add('lines')
       line.y = i*150
       line.style.marginTop = line.y + "px"
       road.append(line)
      } 

     let car = document.createElement('div')
     car.setAttribute('id', 'car')
     road.append(car)
     console.log(car.getBoundingClientRect())
     player.x = car.offsetLeft
     player.y = car.offsetTop

     createEnemy()

     window.requestAnimationFrame(gamePlay)
 })


 function gamePlay(){
    if(player.isStarted){
      // to  move the lines 
      moveline()
      moveEnemy()
      increseScore()
      if(player.score >500 && player.score <800 ){
         player.speed = 5
      }else if(player.score >= 800 && player.score < 1100){
         player.speed = 6
      }else if(player.score >= 1100 && player.score < 1500){
         player.speed = 7 
      }else if(player.score >= 1500 && player.score < 2000){
         player.speed = 8
      }else if(player.score >= 2000 && player.score < 3000){
         player.speed = 9 
      }else if(player.score >= 3000 && player.score < 4500){
         player.speed = 10
      }else if(player.score >= 4500 && player.score < 6000){
         player.speed = 11 
      }else if(player.score >= 6000){
         player.speed = 12
      }

      let roadDetail =  road.getBoundingClientRect();
      // let car = document.getElementById('car')
      // for movement of the car 
      if(button.ArrowDown && player.y < parseInt(roadDetail.height)- 75 ) {  player.y  += player.speed   }
      if(button.ArrowUp && player.y > parseInt(roadDetail.top)+200) {  player.y  -= player.speed   }
      if(button.ArrowLeft && player.x > 0) {  player.x  -= player.speed   }
      if(button.ArrowRight && player.x < parseInt(roadDetail.width)-70)  {  player.x  += player.speed   }
      car.style.marginTop = (player.y).toString() + "px"
      car.style.marginLeft = (player.x).toString() + "px"


 
      window.requestAnimationFrame(gamePlay)

    }
 }
 
 function moveline(){
    let line = document.getElementsByClassName('lines')
   
    for(let i=0; i<line.length ; i++){
        y = line[i].offsetTop
        if(y > (i+1)*150 ){
         line[i].style.marginTop = (i*150) + "px"
        }
        else{
           y  += player.speed
        line[i].style.marginTop = y + "px"
        }
    }
 }

 function moveEnemy(){
   let enemy = document.getElementsByClassName('enemy')
   let roadDetail =  road.getBoundingClientRect();
   let car = document.getElementById('car')
   
   for(let i=0; i<enemy.length ; i++){
      if(checkCollision(car, enemy[i])){
         endGame()
      }
       y = enemy[i].offsetTop
       if(y > roadDetail.height ){
        enemy[i].style.marginTop = -70+ "px"
        enemy[i].style.marginLeft = Math.floor(Math.random()* Math.round(roadDetail.width - 80) ) + "px"
       }
       else{
          y  += player.speed
       enemy[i].style.marginTop = y + "px"
       }
   }
 }

 function createEnemy(){
   let roadDetail =  road.getBoundingClientRect();

   for(let i=0; i< 4 ; i ++){
      if(i==2){
         let enemy = document.createElement('div')
         enemy.setAttribute('class', 'enemy')
         enemy.y = (i) * 200
         enemy.style.marginTop = -enemy.y + "px"
         enemy.style.marginLeft = (player.x)+200 + "px"
         road.append(enemy)
      }else{
         let enemy = document.createElement('div')
         enemy.setAttribute('class', 'enemy')
         enemy.y = (i) * 200
         enemy.style.marginTop = -enemy.y + "px"
         enemy.style.marginLeft = Math.floor(Math.random()* Math.round(roadDetail.width - 80) ) + "px"
         road.append(enemy)
      }
      // let enemy = document.querySelector('.enemy')
      // console.log(enemy.getBoundingClientRect())
   }
 }


 function checkCollision(car , enemy){
    let isCollide = false
    let carRect = car.getBoundingClientRect()
    let enemyRect = enemy.getBoundingClientRect()

    return !((carRect.bottom < enemyRect.top) || (carRect.top > enemyRect.bottom)||
               (carRect.right < enemyRect.left) || (carRect.left > enemyRect.right) )

 }

 function endGame(){
    player.isStarted = false
    startScreenContent.innerHTML = '<p> Game Over <br> your Score is '+ (player.score+1) +' <br> click here to restart the game </p>'
    startScreen.classList.remove('hide')
 }

 function increseScore(){
    player.score  += 1
    let scoreSpan = document.getElementById('score-span')
    scoreSpan.innerText = player.score
 }

 document.addEventListener('keydown', (e)=>{
      button[e.key] = true;
      
 })

 document.addEventListener('keyup', (e)=>{
    button[e.key] = false;
 })

