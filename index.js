// Versión síncrona:
// Crear un nuevo Game y llamar al método start

// Versión asíncrona:
// Iniciar un contador de 10 segundos antes de empezar el juego
// Inciar un intervalo para mostras los segundos restantes en la consola
// Recuerda 'cancelar' el intervalo cuando llegue a 0 segundos

document.getElementById("startSyncronous").addEventListener("click", () => {
  console.log("Game started");
  new Game().start();
});

document.getElementById("startAsyncronous").addEventListener("click", () => {
  let seconds = 10;
  const MILISECONDS = 1000;
  const countDown = setInterval(() => {
    console.clear();
    console.log(`Game starts... ${seconds}`);
    seconds--;
  }, MILISECONDS);
  setTimeout(() => {
    clearInterval(countDown);
    console.log("Game started");
    new Game().start();
  }, seconds * MILISECONDS);
});
