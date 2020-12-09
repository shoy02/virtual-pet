var dog,happyDog,database,foodS,foodStock,Dog;

function preload(){
  dog = loadImage("dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  
  Dog = createSprite(250,400,20,20);
  Dog.addImage(dog);
  Dog.scale = 0.25;


  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    Dog.addImage(happyDog);
  }

  fill("white");
  textSize(20);
  text("Note: Press UP_ARROW Key to Feed Drago Milk!",40,20);

  fill("yellow");
  text("Milk left:  " + foodS,50,300);

  drawSprites();


}

function readStock(data){
  foodS=data.val();
  console.log(foodS);
}

function writeStock(x){

  if(x <= 0){
    x = 0;
  }else{
    x = x - 1;
  }

database.ref('/').update({
  Food:x
})
}



