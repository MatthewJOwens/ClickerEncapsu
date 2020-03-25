export class Wizard {
  constructor(data = 0) {
    console.log("Wizard has been created.");
    this.mana = {
      total: data,
      perSecond: 0,
      perClick: 1,
      multiplier: 1,
    }
  }
}

export class ClickUpgrades {
  constructor(data) {
    console.log("hello from ClickUpgrades")
    this.tome = {
      cost: 20,
      number: 0,
      perClick: 5
    }
    this.familiar = {
      summoned: false,
      cost: 500,
      multiplier: 2
    }
    if (data) {
      this.tome = data.tome || this.tome
      this.familiar = data.familiar || this.familiar
    }
  }
}

export class AutomaticUpgrades {
  constructor(data) {
    console.log("hello from AutomaticUpgrades");
    this.apprentice = {
      cost: 1000,
      number: 0,
      perSecond: 50
    }
    this.cabal = {
      joined: false,
      cost: 5000,
      multiplier: 3,
    }
    if (data) {
      this.apprentice = data.apprentice || this.apprentice
      this.cabal = data.cabal || this.cabal
    }
  }
}