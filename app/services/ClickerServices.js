import { Wizard, ClickUpgrades, AutomaticUpgrades } from "../models/ClickerModels.js"

//NOTE private data
let _wizardConfigObj = {
  mana: {
    total: 5000

  }
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
  get WizardMana() {
    return _wizard.mana.total.toString()
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

  buyTome() {
    if (_wizard.mana.total >= _clickUpgrades.tome.cost) {
      _wizard.mana.total -= _clickUpgrades.tome.cost;
      _clickUpgrades.tome.number++;
      _clickUpgrades.tome.cost = Math.ceil(_clickUpgrades.tome.cost * 1.2)
      document.getElementById("tome-cost").textContent = _clickUpgrades.tome.cost.toString()
    }
    document.getElementById("tomes-owned").textContent = _clickUpgrades.tome.number.toString()
    if (_clickUpgrades.familiar.summoned == true) {
      _manaGainOnClick = (_wizard.mana.perClick + (_clickUpgrades.tome.perClick * _clickUpgrades.tome.number)) * _clickUpgrades.familiar.multiplier;
    } else {
      _manaGainOnClick = _wizard.mana.perClick + (_clickUpgrades.tome.perClick * _clickUpgrades.tome.number)
    }
    document.getElementById("mana").textContent = _wizard.mana.total.toString();
    document.getElementById("mana-per-click").textContent = _manaGainOnClick.toString()
  }
}