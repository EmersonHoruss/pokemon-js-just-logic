class Player {
  constructor(name, species, pokeName, level) {
    // asignar name a un atributo con el mismo nombre
    // crear un Pokemon con el resto de parametros y asignarlo al atributo pokemon
  }

  selectMove() {
    // mostrar al usuario los movimientos dosponibles
    // Volver a pedir si ingresa un movimiento invalido
    // Asigna el movimiento con 'setCurrentMove'
    // retornar 'true' en caso el usuario apreta Cancel
  }
}

class Bot extends Player {
  selectMove() {
    // selecciona un movimiento de maner aleatoria
    // los asigna con 'setCurrentMove'
  }
}
