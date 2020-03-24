import { Wizard, ClickUpgrades, AutomaticUpgrades } from "../models/ClickerModels.js"

//NOTE private data
let _wizardConfigObj = {
  mana.total = 1000
}
let _wizard = new Wizard(_wizardConfigObj)
let _clickUpgrades = new ClickUpgrades
let _automaticUpgrades = new AutomaticUpgrades
let _intervalStarted = false
let _manaGainOnClick = 1

//NOTE public data
export default class GameService {
  constructor() {
    console.log("hello from GameService")
  }

  increaseMana() {
    console.log("harvesting mana");
    if (_clickUpgrades.familiar.summoned == true) {
      _wizard.mana.total += _manaGainOnClick
      // mana.total = mana.total + (mana.perClick + (clickUpgrades.tome.perClick * clickUpgrades.tome.number) * clickUpgrades.familiar.multiplier);
    } else {
      _wizard.mana.total += _manaGainOnClick
      // mana.total = mana.total + mana.perClick + (clickUpgrades.tome.perClick * clickUpgrades.tome.number)
    }
    document.getElementById("mana").textContent = _wizard.mana.total.toString();
  }





}