export class Wizard {
  constructor(data) {
    console.log("Wizard has been created.");
    this.mana = {
      total: data.mana.total || 1000,
      perSecond: data.mana.perSecond || 0,
      perClick: data.mana.perClick || 1,
      multiplier: data.mana.multiplier || 1,
    }
  }
}

export class ClickUpgrades {
  constructor(data) {
    console.log("hello from ClickUpgrades")
    this.tome = {
      cost: data.tome.cost || 20,
      number: data.tome.number || 0,
      perClick: data.tome.perClick || 5
    }
    this.familiar = {
      summoned: data.familiar.summoned || false,
      cost: data.familiar.cost || 500,
      multiplier: data.familiar.multiplier || 2
    }
  }
}

export class AutomaticUpgrades {
  constructor(data) {
    console.log("hello from AutomaticUpgrades");
    this.apprentice = {
      cost: data.apprentice.cost || 1000,
      number: data.apprentice.number || 0,
      perSecond: data.apprentice.perSecond || 50
    }
    this.cabal = {
      joined: data.cabal.joined || false,
      cost: data.cabal.cost || 5000,
      multiplier: data.cabal.multiplier || 3,
    }
  }
}