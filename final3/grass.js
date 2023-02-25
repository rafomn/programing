
let LivingCreature = require("./living")
module.exports = class Grass extends LivingCreature {
   

    random(ch){
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
    }
    mul() {
        this.multiply++;
        // var emptyCells = this.chooseCell(0);
        var newCell = this.random(0);

        if (newCell && this.multiply >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}
