class Game {
  start() {
    // llamar a welcome para el proceso de bienvenida y obtener el arreglo [name, pokemon, pokemonName]
    // crear un Player con la info obtenida (tu pokemon empieza con nivel 3 por defecto). Asignarlo al atributo 'player'
    // Empezar el bucle del juego
    // Usar menu() para pedir al usuario que elija entre Train, Leader o Stats
    // Ejecutar train(), challengeLeader() o showStats() segun la opción del usuario
    // Continuar el bucle hasta que el usuario aprete Cancel
    // Llamar a goodbye para la despedida
  }

  train() {
    // Crear un Bot llamado "Random Person", con un Pokemon aleatorio de nivel entre 1 y 5
    // Anunciar "[nombre] challenges [oponente] for training"
    // Anunciar "[oponente] has a [pokemon] level [nivel]"
    // Usar confirm() para preguntar al usuario si quiere pelear "Do you want to fight?"
    // Si, sí quiere pelear
    // Crear una Batalla entre el player y el oponente
    // empezar la batalla con su start
  }

  challengeLeader() {
    // mismo mecanismo que train() pero el Bot se llama Brock y usa un Onix nivel 10
  }

  showStats() {
    // usar console.table para presentar las estadisticas de tu pokemon:
    /*
      - species
      - level
      - type
      - experiencePoints
      stats:
      - hp
      - attack
      - defense
      - specialAttack
      - specialDefense
      - speed
    */
  }

  static welcome() {
    alert(`Welcome to Pokemon Yellow

Hello there! Welcome to the world of POKEMON! My name is OAK! People call me the POKEMON PROF!

This world is inhabited by creatures called POKEMON! For some people, POKEMON are pets. Others use them for fights.

Myself... I study POKEMON as a profession.`);

    const name = prompt("First, what is your name?", "Ash");

    alert(`Right! So your name is ${name.toUpperCase()}!

Your very own POKEMON legend is about to unfold! A world of dreams and adventures with POKEMON awaits! Let's go!

Here, ${name.toUpperCase()}! There are 3 POKEMON here!

When I was young, I was a serious POKEMON trainer. In my old age, I have only 3 left, but you can have one!`);

    const options = ["Bulbasaur", "Charmander", "Squirtle"];
    let pokemon;
    while (true) {
      pokemon = prompt(
        `Choose your pokemon:\n${options.join("\n")}`,
        options[0]
      );
      if (options.includes(pokemon)) break;

      alert("Invalid option");
    }

    alert(`You selected ${pokemon.toUpperCase()}. Great choice!`);

    const pokemonName =
      prompt("You can name your pokemon:", pokemon) || pokemon;

    alert(`${name.toUpperCase()}, raise your young ${pokemonName.toUpperCase()} by making it fight!

When you feel ready you can challenge BROCK, the PEWTER's GYM LEADER`);

    return [name, pokemon, pokemonName];
  }

  static menu() {
    // pedir al usuario que elija entre "Train", "Stats", "Leader";
    // retornar una opcion valida
  }

  static goodbye() {
    console.log("%cThanks for playing Pokemon Yellow", "font-weight: bold");
    console.log("This game was created with love by: ...");
  }
}
