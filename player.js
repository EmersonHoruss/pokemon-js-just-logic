class Player {
  name = "";
  pokemon = null;

  static DEFAULT_LEVEL = 3;

  constructor(name, species, pokeName, level = Player.DEFAULT_LEVEL) {
    // asignar name a un atributo con el mismo nombre
    // crear un Pokemon con el resto de parametros y asignarlo al atributo pokemon
    this.name = name;
    this.pokemon = new Pokemon(species, pokeName, level);
  }

  selectMove() {
    // mostrar al usuario los movimientos dosponibles
    // Volver a pedir si ingresa un movimiento invalido
    // Asigna el movimiento con 'setCurrentMove'
    // retornar 'true' en caso el usuario apreta Cancel
    const maxOptions = this.pokemon.moves.length
    const option = this.menu()
    if (option === null) {
      return true
    }
    if(parseInt(option) >= 1 && parseInt(option) <= maxOptions){
      this.pokemon.setCurrentMove(this.pokemon.moves[option-1])
    }else{
      alert("Invalid option")
      this.selectMove()
    }
  }

  menu() {
    const pokemonMoves = this.pokemon.moves.reduce((a,b, index)=> `\n${index}. ${a}`)
    const menu = pokemonMoves.reduce((acumulador, opcion, indice) => {
        acumulador += `${indice + 1}. ${opcion} \n`;
        return acumulador;
    }, "Choose one option: \n");
    return prompt(menu, 1);
  }
}

class Bot extends Player {
  static RANDOM_NAME = "Random Person";
  static RANDOM_MIN_LEVEL = 1;
  static RANDOM_MAX_LEVEL = 5;
  static LEADER_NAME = "Brock";
  static LEADER_LEVEL = 10;
  static LEADER_POKEMON_SPECIES = "Onix";

  constructor(type = typeBot.random) {
    super();
    if (type === typeBot.random) {
      this.createRandom();
      console.log("___",this)
    }
    if (type === typeBot.leader) {
      this.createLeader();
    }
  }

  createRandom() {
    this.name = Bot.RANDOM_NAME;
    const randomIndex = randomBetween(0, Pokemons.length - 1);
    const { species } = Pokemons[randomIndex];
    const randomLevel = randomBetween(
      Bot.RANDOM_MIN_LEVEL,
      Bot.RANDOM_MAX_LEVEL
    );
    this.pokemon = new Pokemon(species, species, randomLevel);
  }

  createLeader() {
    this.name = Bot.RANDOM_NAME;
    this.pokemon = new Pokemon(
      Bot.LEADER_POKEMON_SPECIES,
      Bot.LEADER_POKEMON_SPECIES,
      Bot.LEADER_LEVEL
    );
  }

  selectMove() {
    // selecciona un movimiento de maner aleatoria
    // los asigna con 'setCurrentMove'
    const randomIndex = randomBetween(0, this.pokemon.moves.length-1)
    this.pokemon.setCurrentMove(this.pokemon.moves[randomIndex])
  }
}

const typeBot = {
  random: "random",
  leader: "leader",
};
