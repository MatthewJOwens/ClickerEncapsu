import ClickerServices from "../services/ClickerServices.js"

//NOTE private area
let _clickerServices = new ClickerServices()


function _draw() {
  console.log("hello from the _draw() function");
  // draw initial page setup
  document.getElementById("mana").textContent = _clickerServices.WizardMana;
}
//NOTE Public area
export default class GameController {
  constructor() {
    console.log("hello from GameController.js")
    _draw()
  }

  increaseMana() {
    _clickerServices.increaseMana()
    console.log("increaseMana");

  }
}



