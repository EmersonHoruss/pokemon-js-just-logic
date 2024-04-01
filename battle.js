class Battle {
  player1 = null;
  player2 = null;
  constructor(player1, player2) {
    // asigna los jugadores a sus respectivos atributos
    this.player1 = player1;
    this.player2 = player2;
  }

  start() {
    // Anunciar "The battle is about to start!"
    // preparar la batalla con prepareBattle()
    // Usar un bucle para todos los turnos
    // Ambos jugadores seleccionan un movimiento
    // Si al seleccionar un movimiento, retorna 'true' terminar la batalla y anunciar "[nombre] run away!"
    // Calcular quien atacara primero
    // El primero ataca al segundo
    // Si el segundo aun no se desmaya...
    // El segundo ataca al primero
    // El bucle continua hasta que alguno se desmaye
    // Al terminar el bucle, identificar al ganador y al perdedor
    // Anunciar "[perdedor] FAINTED!"
    // Anunciar "[ganador] WINS!"
    // Se procesa la victoria
    console.log("%cThe battle is about to start!", "font-weight: bold;")
    this.prepareBattle()
    while(!this.player1.pokemon.isFainted() && !this.player2.pokemon.isFainted()){
      console.log("start status of the battle")
      this.printBattleStatus()
      if(this.player1.selectMove()){
        console.log(`${this.player1.name} run away!`);
        return
      }
      if(this.player2.selectMove()){
        console.log(`${this.player2.name} run away!`);
        return
      }
      const attacker = this.getFirstPokemon()
      if(attacker === this.player1.pokemon){
        attacker.attack(this.player2.pokemon)
      }
      if(attacker === this.player2.pokemon && !this.player2.pokemon.isFainted()){
        this.player2.pokemon.attack(this.player1.pokemon)
      }
      console.log("end status of the battle")
      this.printBattleStatus()
    }
    if(this.player1.pokemon.isFainted()){
      winner = this.player2
      losser = this.player1
    }else{
      winner = this.player1
      losser = this.player2
    }

    if(winner instanceof Bot){
      console.log(`%c${winner.name} have won the game!`, "font-weight: bold")
    } else {
      winner.pokemon.processVictory()
      console.log("%cCongratulation! You have won the game!", "font-weight: bold")
      console.log("You can continue training your Pokemon if you want")
    }
  }

  prepareBattle() {
    // llamar a prepareForBattle de los pokemones de ambos jugadores
    // anunciar "[judgador]sent out [POKEMON]!" para ambos jugadores
    this.player1.pokemon.prepareForBattle(),
    this.player2.pokemon.prepareForBattle(),
    console.log(`${this.player1.name} sent out ${this.player1.pokemon.name.toUpperCase()}!`),
    console.log(`${this.player2.name} sent out ${this.player2.pokemon.name.toUpperCase()}!`)
  }

  getFirstPokemon() {
    // verificar si un pokemon empieza por tener movimiento con mayor prioridad con firstByPriority
    // verificar si un pokemon empieza por tener  mayor velocidad con firstBySpeed
    // si no, elegir uno de manera aleatorio
    const pokemonFirstByPriority = this.firstByPriority()
    if(pokemonFirstByPriority){
      return pokemonFirstByPriority
    }
    const pokemonFirstBySpeed = this.firstBySpeed()
    if(pokemonFirstBySpeed){
      return pokemonFirstBySpeed
    }
    const aleatoryPokemon = randomBetween(0, 1)
    return [this.player1.pokemon, this.player2.pokemon][aleatoryPokemon]
  }

  firstByPriority() {
    // retornar el pokemon con movimiento de mayor prioridad. Si igualan, retornar null
    let priorityDiff = this.player1.pokemon.currentMove.priority - this.player2.pokemon.currentMove.priority;
    return priorityDiff < 0 ? this.player2.pokemon : priorityDiff > 0 ? this.player1.pokemon : null
  }

  firstBySpeed() {
    // retornar el pokemon de mayor velocidad. Si igualan, retornar null
    let speedDiff = this.player1.pokemon.stats.speed - this.player2.pokemon.stats.speed;
    return speedDiff < 0 ? this.player2.pokemon : speedDiff > 0 ? this.player1.pokemon : null    
  }

  printBattleStatus() {
    // usar conole.table para mostrar el status de la batalla (player, pokemon, level, currentHp)
    console.table([{
      player: this.player1.name,
      pokemon: this.player1.pokemon.name,
      level: this.player1.pokemon.level,
      HP: this.player1.pokemon.currentHp
    }, {
      player: this.player2.name,
      pokemon: this.player2.pokemon.name,
      level: this.player2.pokemon.level,
      HP: this.player2.pokemon.currentHp
    }])
  }
}
