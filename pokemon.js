class Pokemon {
  species = "";
  name = species;
  level = 1;

  type = [];
  baseExp = 0;
  effortPoints = {};
  growthRate = "";
  baseStats = {};
  moves = [];

  experiencePoints = 0;
  individualValues = {};
  effortValues = {};

  currentHp = 0
  currentMove = null

  constructor(species, name, level) {
    // Inicializar atributos usando los parámetros
    // Inicializar atributos usando la información del Pokedex
    // Inicializar atributos según otras indicaciones
    // this.experiencePoints = ;
    // this.individualValues = ;
    // this.effortValues = ;
    this.species = species;
    this.name = name;
    this.level = level;

    const rootPokemon = Pokemons.find((pokemon) => pokemon.species === species);
    this.type = rootPokemon.type;
    this.baseExp = rootPokemon.baseExp;
    this.effortPoints = rootPokemon.effortPoints;
    this.growthRate = rootPokemon.growthRate;
    this.baseStats = rootPokemon.baseStats;
    this.moves = rootPokemon.moves;

    this.experiencePoints = this.level === 1 ? 0 : this.expForLevel(this.level);
    this.individualValues = {
      hp: randomBetween(0, 31),
      attack: randomBetween(0, 31),
      defense: randomBetween(0, 31),
      specialAttack: randomBetween(0, 31),
      specialDefense: randomBetween(0, 31),
      speed: randomBetween(0, 31),
    };
    this.effortValues = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };
  }

  get stats() {
    const stats = {};

    // calcular las estadisticas actuales del Pokémon
    stats.hp = Math.floor((2 * this.baseStats.hp + this.individualValues.hp + this.effortValues.hp / 4) * this.level / 100 + this.level + 10)
    stats.attack = Math.floor((2 * this.baseStats.attack + this.individualValues.attack + this.effortValues.attack / 4) * this.level / 100 + 5)
    stats.defense = Math.floor((2 * this.baseStats.defense + this.individualValues.defense + this.effortValues.defense / 4) * this.level / 100 + 5)
    stats.specialAttack = Math.floor((2 * this.baseStats.specialAttack + this.individualValues.specialAttack + this.effortValues.specialAttack / 4) * this.level / 100 + 5)
    stats.specialDefense = Math.floor((2 * this.baseStats.specialDefense + this.individualValues.specialDefense + this.effortValues.specialDefense / 4) * this.level / 100 + 5)
    stats.speed = Math.floor((2 * this.baseStats.speed + this.individualValues.speed + this.effortValues.speed / 4) * this.level / 100 + 5)

    return stats;
  }

  expForLevel(n) {
    // obtener la función de crecimiento del pokedex
    // retornar el resultado de llamar a la función pasando `n`
    return ExperienceCurves[this.growthRate](n)
  }

  prepareForBattle() {
    // asignar al atributo currentHp la estadistica HP del Pokemon
    // resetear el atributo currentMove a null
    this.currentHp = this.stats.hp
    this.currentMove = null
  }

  receiveDamage(damage) {
    // reducir currentHp en la cantidad de damage. No debe quedar menor a 0.
    this.currentHp = damage >= this.currentHp ? 0 : this.currentHp - damage;
  }

  setCurrentMove(move) {
    // buscar el move (string) en el pokedex y asignarlo al atributo currentMove
    this.currentMove = Moves.find(currentMove => currentMove.name === move)
  }

  isFainted() {
    // retornar si currentHp es 0 o no
    return !!this.currentHp
  }

  attack(target) {
    // anunciar "[nombre] used [MOVE]!"
    // determinar si el movimiento "pega" con moveHits()
    // si "pega":
    //  calcular daño base con calculateDamage
    //  determinar si es un critical hit con isCritical
    //  si es critico, anunciarlo
    //  calcular el multiplicador de efectividad con calculateEffectiveness
    //  anunciar mensaje según efectividad. Por ejemplo "It's not very effective..."
    //  calcular el daño final usando el daño base, si fue critico o no y la efectividad
    //  Hacer daño al oponente usando su metedo receiveDamage
    //  Anunciar el daño hecho: "And it hit [oponente] with [daño] damage"
    // si no "pega"
    //  anunciar "But it MISSED!"
    console.log(`${this.name} used ${this.currentMove.name}`)
    if(this.moveHits()){
      let damage = this.calculateBaseDamage(target)
      const isCritical = this.isCritical()
      if(isCritical){
        console.log("It was a CRITICAL hit!")
        damage *= 1.5
      }
      const effectiveness = this.calculateEffectiveness(target)
      if(effectiveness === 0){
        console.log(`It doesn't affect ${target.name}!`)
      }else if(effectiveness <= 0.5){
        console.log("It's not very effective...")
      }else if(effectiveness >= 1.5){
        console.log("It's super effective!")
      }
      damage = Math.floor(damage * effectiveness)
      target.receiveDamage(damage)
      console.log(`And it hit ${target.name} with ${damage} damage`)
    }else{
      console.log("But it MISSED!")
    }
  }

  moveHits() {
    // calcular si pega en base al accuracy del currentMove
    if(this.currentMove.accuracy === 100){
      return true
    }
    const aleatory = randomBetween(1, 100)
    return aleatory <= this.currentMove.accuracy
  }

  isCritical() {
    // 1/16 de probabilidad que sea critico
    const aleatory = randomBetween(1,16)
    return aleatory <= 1
  }

  calculateBaseDamage(target) {
    // determinar si el movimiento es especial comparando el currentMove con la data de Pokedex (SpecialMoveTypes)
    // determinar si se usara el stat attack o specialAttack del atacante
    // determinar si se usara el stat defense o specialDefense del defensor
    // retornar el rsultado de la formula de daño
    const isSpecialMove =  !!SpecialMoveTypes.find(moveType => moveType === this.currentMove.type)
    const offensiveStat = isSpecialMove ? this.stats.specialAttack : this.stats.attack
    const targetDefensiveStat = isSpecialMove ? target.stats.specialDefense : target.stats.defense
    return Math.floor(Math.floor(Math.floor(2 * this.level / 5.0 + 2) * offensiveStat * this.currentMove.power / targetDefensiveStat) / 50) + 2
  }

  calculateEffectiveness(target) {
    // caluclar el multiplicador de efectividad tomando el tipo del currentMove y el tipo de pokemon del oponente
    let effectiveness = 1
    target.type.forEach(type=>{
      effectiveness *= TypeMultiplier[this.currentMove.type][type]
    })
    return effectiveness
  }

  processVictory(target) {
    // calcular la experiencia ganada e incrementarla a tus experiencePoints
    // incrementar los effortValues en la estadística correspondiente con la información de effortPoints del oponente
    // anunciar "[nombre] gained [cantidad] experience points"
    // verificar si los nuevos experiencePoints te llevan a subir de nivel
    // si se sube de nivel
    // incrementar nivel y Anunciar "[nombre] reached level [nivel]!"
    const gainedExperience = Math.floor(target.baseExp * target.level / 7);
    this.effortValues += gainedExperience
    this.effortValues[target.effortPoints.type] += target.effortPoints.amount
    console.log(`${this.name} gained ${gainedExperience} experience points`);
    if(this.expForLevel(this.level+1)){
      this.level++
      console.log(`${this.name} reached level ${this.level}!`)
    }
  }
}
