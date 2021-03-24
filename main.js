const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


let gameBeingPlayed = true;
// creating a field class
class Field {
    constructor(field) {
        this._field = field;
        this.x = 0;
        this.y = 0;
    }
    get field() {
        return this._field;
    }
    //prints a 2d field
    print() {
        this.field.forEach(row => {
            console.log(row.join(''));
        });
    }


    //asking user's input and moving character by their choice
    askUser() {
        let question = prompt('Which direction would you like to move? u for Up, d for Down,l for Left, and r for right')

        switch (question.toLowerCase()) {
            case 'u':
                console.log('Moving Up');
                this.y -= 1;
                break;
            case 'd':
                console.log('Moving Down');
                this.y += 1;
                break;
            case 'l':
                console.log('Moving to the Left');
                this.x -= 1;
                break;
            case 'r':
                console.log('Moving to the Right');
                this.x += 1;
                break;
            default:
                break;
        }

    }
    // checks to see if the player won or loss 
    gameStatus() {

        if (this.field[this.y] == undefined) {
            console.log("Game Over -- You stepped out!");
            return gameBeingPlayed = false;
        }
        switch (this.field[this.y][this.x]) {
            case hat:
                console.log('You Win!! You found my hat');
                gameBeingPlayed = false;
                break;
            case hole:
                console.log('Game Over!!! You fell in a hole!');
                gameBeingPlayed = false;
                break;
            case undefined:
                console.log('Game Over -- You stepped out!');
                gameBeingPlayed = false;
                break;
            case fieldCharacter:
                console.log('Keep looking for the hat ');
                this.field[this.y][this.x] = pathCharacter;
                break;
            case pathCharacter:
                console.log('You have been here before');
                break;


        }
    }
    //generates a field 
    static generateField(height, width, percentage) {

        const fieldOrHole = (percentage) => {
            if (percentage >= 0 && percentage <= 100) {
                const randomNumber = Math.random() * 100;
                if (randomNumber < percentage) {
                    return hole;
                } else {
                    return fieldCharacter;
                }
            } else {
                console.log('Enter number between 0-100');
            }
        }

        const plainField = () => {
            function makeWidthArray() {
                let widthArray = [];
                for (let i = 0; i < width; i++) {
                    widthArray.push(fieldOrHole(percentage));
                }
                return widthArray;
            }
            let plainField = [];
            for (let i = 0; i < height; i++) {
                plainField.push(makeWidthArray());
            }
            return plainField;
        }
        const gameReady = plainField();
        do {
            gameReady[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
        } while (gameReady[0][0] == hat);
        gameReady[0][0] = pathCharacter;

        return gameReady
    }

}

const myField = new Field(Field.generateField(20, 20, 10));

function game() {
    while (gameBeingPlayed) {
        console.log(myField.print());
        myField.askUser();
        myField.gameStatus();
    }
    console.log('Game Over');
}

game();
