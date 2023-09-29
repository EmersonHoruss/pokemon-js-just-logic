class Pokemon {
  constructor(species, name, level) {
    // Inicializar atributos usando los parámetros
    // Inicializar atributos usando la información del Pokedex
    // Inicializar atributos según otras indicaciones
    // this.experiencePoints = ;
    // this.individualValues = ;
    // this.effortValues = ;
  }

  get stats() {
    const stats = {};

    // calcular las estadisticas actuales del Pokémon

    return stats;
  }

  expForLevel(n) {
    // obtener la función de crecimiento del pokedex
    // retornar el resultado de llamar a la función pasando `n`
  }

  prepareForBattle() {
    // asignar al atributo currentHp la estadistica HP del Pokemon
    // resetear el atributo currentMove a null
  }

  receiveDamage(damage) {
    // reducir currentHp en la cantidad de damage. No debe quedar menor a 0.
  }

  setCurrentMove(move) {
    // buscar el move (string) en el pokedex y asignarlo al atributo currentMove
  }

  isFainted() {
    // retornar si currentHp es 0 o no
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
  }

  moveHits() {
    // calcular si pega en base al accuracy del currentMove
  }

  isCritical() {
    // 1/16 de probabilidad que sea critico
  }

  calculateBaseDamage(target) {
    // determinar si el movimiento es especial comparando el currentMove con la data de Pokedex (SpecialMoveTypes)
    // determinar si se usara el stat attack o specialAttack del atacante
    // determinar si se usara el stat defense o specialDefense del defensor
    // retornar el rsultado de la formula de daño
  }

  calculateEffectiveness(target) {
    // caluclar el multiplicador de efectividad tomando el tipo del currentMove y el tipo de pokemon del oponente
  }

  processVictory(target) {
    // calcular la experiencia ganada e incrementarla a tus experiencePoints
    // incrementar los effortValues en la estadística correspondiente con la información de effortPoints del oponente
    // anunciar "[nombre] gained [cantidad] experience points"
    // verificar si los nuevos experiencePoints te llevan a subir de nivel
    // si se sube de nivel
    // incrementar nivel y Anunciar "[nombre] reached level [nivel]!"
  }
}
