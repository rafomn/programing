class Transport{
    constructor(){
        this.milleage = milleage;
    }
    move(){
        this.milleage++;
    }
}
class Car extends Transport{
    constructor(color, speed, door){
        super()
        this.color = color;
        this.door = door;
        this.speed = speed;
        
    }
}
let Aren = new Car("black", 10,1);
console.log(Aren.milleage);
Aren.move();
Aren.move();
console.log(Aren.milleage)