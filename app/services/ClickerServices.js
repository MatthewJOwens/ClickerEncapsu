import { Wizard, ClickUpgrades, AutomaticUpgrades } from "../models/ClickerModels.js"

//NOTE private data
let _wizard = new Wizard(5000)

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
      // mana.total = _wizard.mana.total + (_wizard.mana.perClick + (_clickUpgrades.tome.perClick * _clickUpgrades.tome.number) * _clickUpgrades.familiar.multiplier);
    } else {
      _wizard.mana.total += _manaGainOnClick
      // _wizard.mana.total = _wizard.mana.total + _wizard.mana.perClick + (_clickUpgrades.tome.perClick * _clickUpgrades.tome.number)
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

  summonFamiliar() {
    if (_wizard.mana.total >= _clickUpgrades.familiar.cost) {
      if (_clickUpgrades.familiar.summoned == false) {
        _clickUpgrades.familiar.summoned = true;
        _wizard.mana.total -= _clickUpgrades.familiar.cost;
        _manaGainOnClick = (_wizard.mana.perClick + (_clickUpgrades.tome.perClick * _clickUpgrades.tome.number)) * _clickUpgrades.familiar.multiplier;
        document.getElementById("familiar-btn").classList.remove("btn-outline-warning")
        document.getElementById("familiar-btn").classList.add("btn-warning")
        document.getElementById("mana").textContent = _wizard.mana.total.toString();
        document.getElementById("familiar-cost").textContent = "--"
        document.getElementById("mana-per-click").textContent = _manaGainOnClick.toString()
      } else {
        alert("You already have a familiar.")
      }
    }
  }


  acceptApprentice() {
    if (_wizard.mana.total >= _automaticUpgrades.apprentice.cost) {
      if (_intervalStarted == false) {
        _intervalStarted = true
        this.startInterval()
      }
      _wizard.mana.total -= _automaticUpgrades.apprentice.cost
      _automaticUpgrades.apprentice.number++
      _automaticUpgrades.apprentice.cost = Math.ceil(_automaticUpgrades.apprentice.cost * 1.3)
      document.getElementById("apprentice-cost").textContent = _automaticUpgrades.apprentice.cost.toString()
    }
    document.getElementById("apprentices").textContent = _automaticUpgrades.apprentice.number.toString()
    document.getElementById("mana").textContent = _wizard.mana.total.toString()
    if (_automaticUpgrades.cabal.joined == true) {
      _wizard.mana.perSecond = (_automaticUpgrades.apprentice.perSecond * _automaticUpgrades.apprentice.number) * _automaticUpgrades.cabal.multiplier
    } else {
      _wizard.mana.perSecond = _automaticUpgrades.apprentice.perSecond * _automaticUpgrades.apprentice.number
    }
    document.getElementById("mana-per-second").textContent = _wizard.mana.perSecond.toString()
  }

  joinCabal() {
    if (_wizard.mana.total >= _automaticUpgrades.cabal.cost && _automaticUpgrades.apprentice.number >= 5) {
      if (_intervalStarted == false) {
        _intervalStarted = true
        this.startInterval()
      }
      if (_automaticUpgrades.cabal.joined == false) {
        _wizard.mana.total -= _automaticUpgrades.cabal.cost
        _automaticUpgrades.cabal.joined = true
        _wizard.mana.perSecond = (_automaticUpgrades.apprentice.perSecond * _automaticUpgrades.apprentice.number) * _automaticUpgrades.cabal.multiplier
        document.getElementById("mana").textContent = _wizard.mana.total.toString();
        document.getElementById("familiar-btn").classList.remove("btn-outline-warning")
        document.getElementById("familiar-btn").classList.add("btn-warning")
        document.getElementById("mana-per-second").textContent = _wizard.mana.perSecond.toString()
      } else {
        alert("You've already joined a wizard cabal.")
      }
    } else {
      alert("You must have " + _automaticUpgrades.cabal.cost + " mana and 5 apprentices before you can join a cabal.")
    }
  }

  startInterval() {
    let collectionInterval = setInterval(this.collectAutoUpgrades, 1000);
  }

  collectAutoUpgrades() {
    if (_automaticUpgrades.cabal.joined == true) {
      _wizard.mana.total = _wizard.mana.total + ((_automaticUpgrades.apprentice.perSecond * _automaticUpgrades.apprentice.number) * _automaticUpgrades.cabal.multiplier)

    } else {
      _wizard.mana.total = _wizard.mana.total + (_automaticUpgrades.apprentice.perSecond * _automaticUpgrades.apprentice.number)
    }
    document.getElementById("mana").textContent = _wizard.mana.total.toString();
  }
}