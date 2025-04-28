class Room {
  constructor (name){
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._tasks = [];
  }

  get name(){return this.name;}
  get description(){return this._description;}
  get tasks(){return this._tasks;}
  set name(value) {this._name = value;}
  set description(value) {this._description = value;}

  // addTask - used to link a task with a room
  addTask(task) {
    this._tasks.push(task)
  }
   // removeTask - once task completed >> empty array
  removeTask() {
    this._tasks = this._tasks.filter(task => task.name !== taskName);
  }
  
// returns true/false
  taskNotCompleted(taskName) {
     return this._tasks.some(task =>task.name === taskName);
   }

  addRoomDescription() {
      let taskDescription = "";
      if (this._tasks.length > 0){
        taskDescription = "As you look closely, you notice " + this._tasks.addTaskDescription()
      } else{
        taskDescription = " The room is now spotless. "
      }  
      return "In the " + this._name + ", there " + this._description + taskDescription
    };

  
  addLinkedRoom(roomToLink, direction){
    this._linkedRooms[direction] = roomToLink;
  }

  getLinkedRooms(){
   const exits = Object.keys(this._linkedRooms);
   let exitDescriptions = [];
   for (const[room, direction] of exits){
    let exitDescription = "You can go " + direction + " to the " + room.name + ". ";
    exitDescriptions.push(exitDescription)
   }
   return exitDescriptions;
  }

   move(direction) {
    if (direction in this._linkedRooms){
      return this._linkedRooms[direction];
    } else { 
      alert("There is no exit in that direction. Try another way.");
      return this;
    }}
}
  //===========================================

  class Task {
    constructor (name){
      this._name = name;
      this._description = "";
    }

    get name(){return this._name;}
    get description(){return this._description;}
    set name(value) {this._name = value;}
    set description(value) {this._description = value;}

    addTaskDescription(){
      return this._description;
    }
  }
//================================================

const Kitchen = new Room ("kitchen");
Kitchen.description = "are colourful pots of fragrant herbs on the windowsill, a bowl of fruit and some tulips in a vase on the table. The windon offers a lovely view of the garden. ";
const KitchenTask = new Task ("floor");
KitchenTask.description = "breadcrumbs and spilled orange juice on the floor. "
Kitchen.addItem(KitchenTask);

const DiningRoom = new Room ("dining room");
DiningRoom.description = "is a round wooden table, an old fireplace, a few paintings and family photographs hanging on the walls and large french windows that open onto the patio, bringing beautiful light into the room. "; 
const DiningRoomTask = new Task ("windows");
DiningRoomTask.description = "greasy fingerprints all over the windows. "
DiningRoom.addTask(DiningRoomTask);

const LivingRoom = new Room ("living room");
LivingRoom.description = "is a comfortable sofa with a couple of matching armchairs, plenty of colourful cushions, a coffee table with a few magazines and books, and a large TV screen opposite the sofa. Perfect for a family movie night. ";
const LivingRoomTask = new Task ("carpet");
LivingRoomTask.description = "a brown stain on the new carpet. Somebody must have spilled their tea. ";
LivingRoom.addTask(LivingRoomTask);

const DownstairsLoo = new Room ("downstairs loo");
DownstairsLoo.description = "is a small sink, a mirror and a few framed pictures hanging on the walls covered with jungle print wallpaper. It is your favourite hiding place. ";
const DownstairsLooTask = new Task ("cobwebs");
DownstairsLooTask.description = "a few cobwebs in the corners of the room just below the ceilig. ";
DownstairsLoo.addTask(DownstairsLooTask);

const Hallway = new Room ("hallway"); Hallway.description = "are coats hanging on the coat rack and a large shoe cabinet with a bowl of keys on top and a mirror hanhing on the wall above. ";
const HallwayTask = new Task ("mirror");
HallwayTask.description = "that you can hardly see your reflection because of the dust and the smudges. ";
Hallway.addTask(HallwayTask);

const Study = new Room ("study");
Study.description = "is a large desk with a computer, a lamp, a bookshelf brimming with books and a comfortable armchair. ";
const StudyTask = new Task ("desk");
StudyTask.description = "a thin layer of dust and some crumbs on the desk. ";
Study.addTask(StudyTask);

//=================================================

Kitchen.addLinkedRoom(Hallway, "east");
Kitchen.addLinkedRoom(DiningRoom, "south");
DiningRoom.addLinkedRoom(Kitchen,"north");
DiningRoom.addLinkedRoom(LivingRoom, "east");
LivingRoom.addLinkedRoom(DiningRoom, "west");
LivingRoom.addLinkedRoom(Study, "west");
Study.addLinkedRoom(LivingRoom, "east");
Study.addLinkedRoom(DownstairsLoo, "north");
DownstairsLoo.addLinkedRoom(Study, "south");
DownstairsLoo.addLinkedRoom(Hallway, "west");
Hallway.addLinkedRoom(Kitchen, "west");
Hallway.addLinkedRoom(DownstairsLoo, "east");

//=======================================================================

const welcomePage = document.getElementById("welcome-page");
const gamePage = document.getElementById("game-page");
const startButton = document.getElementById("start-button");

let currentRoom = Kitchen;
let completedTasks = [];
let currentScore = 0;

function populateRoomDescription(room){

  const currentRm = document.getElementById("current-room");
  const rmDescription = document.getElementById("room-description");

  const roomName = room.name;
  const roomDescription = room.addRoomDescription();
  const exits = room.getLinkedRooms().join("<br>");
   
  currentRm.innerHTML = roomName;
  rmDescription.innerHTML = ` 
  <p> ${roomDescription} </p>
  <p> ${exits} </p>
  `;
}

function completeTask(taskName){
  if (currentRoom.taskNotCompleted(taskName)) {
    currentRoom.removeTask(taskName);
    completedTasks.push(taskName);
    currentScore += 1;
    return true;
  } 
  return false;
}

function checkWin(){
  if (completedTasks.length === 6) {
    return true;
  }
}

// ======================= enter GAME once button is clicked ================================

function enterHouse(){

   const welcomePage = document.getElementById("welcome-page");
   const gamePage = document.getElementById("game-page");

    welcomePage.classList.add("hidden");
    gamePage.classList.remove("hidden");

    currentRoom = Kitchen;
    
    populateRoomDescription(currentRoom);

     const userInput = document.getElementById("user-input");

     document.addEventListener("keydown", function(event){

     if (event.key === "Enter") {
      const command = userInput.value.trim().toLowerCase();
      const directions = ["north", "south", "east", "west"];
      const messageText = document.getElementById("output");

      if (directions.includes(command)) {
        currentRoom = currentRoom.move(command);
        populateRoomDescription(currentRoom);
      } else if (command.startsWith("clean")){
         const TaskName = command.replace("clean","")
         if (completeTask(TaskName)){
          messageText.innerHTML = `<p>Thank you for cleaning the ${taskName} in the ${currentRoom}</p>`
         }
            if (checkWin()){
             messageText.innerHTML = `<p>Well done, you have cleaned the whole house! </p>`
             userInput.disabled = true;
         } else {
          messageText.innerHTML = `<p>The ${taskName} doesn't need any cleaning right now. </p>`
        }
      } else {
        messageText.innerHTML = `<p>Unknown command, please try again. </p>`
      }
    };
  });
}


  


  
