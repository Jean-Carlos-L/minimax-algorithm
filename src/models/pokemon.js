class Pokemon {
  constructor({
    name,
    type1,
    type2 = null,
    total,
    hp,
    attack,
    defense,
    spAtk,
    spDef,
    speed,
    generation = 1,
    legendary = false,
    attacks = []
  }) {
    this.name = name;
    this.type1 = type1;
    this.type2 = type2;
    this.total = total;
    this.maxHP = hp;
    this.currentHP = hp;
    this.attack = attack;
    this.defense = defense;
    this.spAtk = spAtk;
    this.spDef = spDef;
    this.speed = speed;
    this.generation = generation;
    this.legendary = legendary;
    this.attacks = attacks; 
  }

  isFainted() {
    return this.currentHP <= 0;
  }

  receiveDamage(amount) {
    this.currentHP -= amount;
    if (this.currentHP < 0) this.currentHP = 0;
  }
}

module.exports = Pokemon;
