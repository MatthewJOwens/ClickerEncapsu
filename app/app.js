import ClickerController from "./controllers/ClickerController.js"



class App {
  constructor() {
    this.gameController = new ClickerController
    console.log("hello from app.js");

  }
}




window["app"] = new App()