const welcomePage = document.getElementById("welcome-page");
const startButton = document.getElementById("start-button");
const gamePage = document.getElementById("game-page");
const gameStatsDiv = document.getElementById("game-stats-div");
const score = document.getElementById("score");
const energyLevel = document.getElementById("energy-level");
const roomDiv = document.getElementById("room-div");
const roomName = document.getElementById("room-name");
const currentRoom = document.getElementById("current-room");
const roomDescriptionStatic = document.getElementById("room-description-static");
const roomDescriptionTask = document.getElementById("room-description-task");
const roomDescriptionOptional = document.getElementById("room-description-optional"); 
const energyRequiredDiv = document.getElementById("energy-required-div");
const energyValue = document.getElementById("energy-value");
const exitsDiv = document.getElementById("exits-div");
const exit1 = document.getElementById("exit-1");
const exit2 = document.getElementById("exit-2"); 
const exit3 = document.getElementById("exit-3");
const inputDiv = document.getElementById("input-div");
const userText = document.getElementById("user-text");
const messagesDiv = document.getElementById("messages-div");
const messageText = document.getElementById("message-text");

let scoreValue=0;
let energyLevelValue = 100;

startButton.addEventListener('click', enterHouse);

function enterHouse(){
  welcomePage.classList.add("hidden");
  gamePage.classList.remove("hidden");
};

//        Create Room class

class Room {
  constructor(name) {
    this._name = name;
    this._descriptionStatic = "";
    this._descriptionTask = "";
    this._descriptionOptional = "";
    this._energyValue = 0;
    this._energyRestore = 0;
    this._linkedRooms = {}; 
  }

  get name() {return this._name;}
  get descriptionStatic() {return this._descriptionStatic;}
  get descriptionTask() {return this._descriptionTask;}
  get descriptionOptional() {return this._descriptionOptional}
  get energyValue() {return this._energyValue;}
  get energyRestore() {return this._energyRestore;}
  get linkedRooms() {return this._linkedRooms;}

  set name (value) {this._name = value;}
  set descriptionStatic(value) {this._descriptionStatic = value;}
  set descriptionTask(value) {this._descriptionTask = value;}
  set descriptionOptional(value) {this._descriptionOptional = value;}
  set energyValue(value) {this._energyValue = value;}
  set energyRestore(value) {this._energyRestore = value;}
  
}
  
class Player {
  constructor(){
    this._scoreValue = 0;
    this._energyLevelValue = 100;
  }

  get scoreValue() {return this._scoreValue;}
  get energyLevelValue() {return this._energyLevelValue;}

  set scoreValue (value) {this._scoreValue = value;}
  set energyLevelValue (value) {this._energyLevelValue = value;}
}