class Trap { 
    constructor(x, y) {
    this.x = x;
    this.y = y;
    this.energy = 1
    this.directions = [];
}
getNewCoordinates() {
    this.directions = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1]
    ];
}
chooseCell(character) {
    this.getNewCoordinates()
    var found = [];
    for (var i in this.directions) {
        var x = this.directions[i][0];
        var y = this.directions[i][1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (matrix[y][x] == character) {
                found.push(this.directions[i]);
            }
        }
    }

    return found;
}




eat() {
    var emptyCells = this.chooseCell(3);
    var newCell = random(emptyCells);
    if(newCell) {
        this.energy--
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 0
        for (var i in predatorArr) {
            if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                
                break;
            }
        }
        
    }if (this.energy <= 0) {
        this.die()
    }
 }
 

die() {

    matrix[this.y][this.x] = 0
    for (var i in trapArr) {
        if (this.x == trapArr[i].x && this.y == trapArr[i].y) {
            trapArr.splice(i, 1);
            break;
        }
    }
}


}
