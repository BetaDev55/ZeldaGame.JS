window.input = function (a) {
  var prompted = prompt(a);
  if (!isNaN(prompted)) return parseInt(prompted);
  return prompted;
};

window.output = function (a) {
  document.write(a);
};

window.clear = function () {
  document.body.innerHTML = ``;
};

//Variables globales que serán util en está aventura.
var elementosSeleccionados = 1; // Se encarga de contar las cartas seleccionadas por el usuario.
var bossHP = 500; // Contador de la vida del jefe.
//Distintas invocaciones de etiquetas html que son utiles para dar un poco de estilo al juego.
var button =
  "<div><button id='start' onclick='startGame()'>Haz click para empezar.</button>";
var buttonVolver =
  "<div><button id='volver' onclick='volver()'>Volver al menu principal.</button>";
var easy = "<div><button id='easy' onclick='dif(easy)'>Facil</button>";
var medium = "<div><button id='medium' onclick='dif(medium)'>Medio</button>";
var hard = "<div><button id='hard' onclick='dif(hard)'>Dificil</button>";
var hot =
  "<div><button id='hot' onclick='dif(hot)'>Heroe Del Tiempo</button></button>";
var dificulty = "<div><p id='dificulty'>Dificultad</p>";
var enemy = "";
var title1 = "<div id='icontainer'><h1 id='title1'>KILL MOLDORM</h1>";
var title2 = "<div><h1 id='title2'>KILL TRINEXX</h1>";
var title3 = "<div><h1 id='title3'>KILL HELMASAUR</h1>";
var title4 = "<div><h1 id='title4'>KILL GANON</h1>";
var textWin =
  "<div><h1 id='textWin'>¡FELICIDADES! !GANASTE!" +
  "<br>" +
  "LA SIGUIENTE AVENTURA TE ESPERA.</h1>";
var textWinH =
  "<div><h1 id='textWinH'>¡GANON FUE DERROTADO!" +
  "<br>" +
  "MUCHAS GRACIAS POR JUGAR.</h1>";
var hpContainer = "<div id='hpContainer'>";
var bar = "<div id='bar'>";
var hp = "<div id='hp'>";
var img1 = "<div id='img1'><img src='moldorm.png'>";
var img2 = "<div id='img2'><img src='trinexx.png'>";
var img3 = "<div id='img3'><img src='helmasaur.png'>";
var img4 = "<div id='img4'><img src='ganon.png'>";
// Variables encargadas de desbloquear el nivel secreto.
var easyb = false;
var mediumb = false;
var hardb = false;

// función encargada de elegir los parametros del juego en base a la dificultad elegida por el usuario.

function dif(dificulty) {
  if (dificulty == easy) {
    document.getElementById("board2").style.display = "block"; // En caso de que la dificultad sea facil, se muestra el tablero de 2x2
    loseLife = 250; // Variable que determina cuanta vida pierde el enemigo en base a la dificultad.
    document.getElementById("hp").style.width = bossHP + "px"; //recarga la vida de los jefes, ya que se usa la misma barra para todos, una vez que matabas a un jefe
    //la barra desaparecia, y esa fue la solución que se me ocurrió.
    generarTablero("2"); // Indica el parametro para la función generarTablero que explicaré más abajo.
    enemy = "MOLDORM"; // Indica el enemigo que será usado en está dificultad para distintos parametros.
    document.getElementById("img1").style.display = "block"; //Muestra la imagen del enemigo seleccionado
    document.getElementById("title1").style.display = "block"; // Muestra el titulo ("KILL "X" ")
    document.getElementById("hpContainer").style.display = "block"; //Muestra el contenedor del HP del boss (Eso aplica para todas las dificultades, salvo Hero of time.)
  } else if (dificulty == medium) {
    document.getElementById("board4").style.display = "block";
    loseLife = 62.5;
    document.getElementById("hp").style.width = bossHP + "px";
    generarTablero("4");
    enemy = "TRINEXX";
    document.getElementById("img2").style.display = "block";
    document.getElementById("title2").style.display = "block";
    document.getElementById("hpContainer").style.display = "block";
  } else if (dificulty == hard) {
    document.getElementById("board8").style.display = "block";
    generarTablero("8");
    loseLife = 15.625;
    document.getElementById("hp").style.width = bossHP + "px";
    enemy = "HELMASAUR";
    document.getElementById("img3").style.display = "block";
    document.getElementById("title3").style.display = "block";
    document.getElementById("hpContainer").style.display = "block";
  } else if (dificulty == hot) {
    // Dificultad secreta hero of time.
    document.getElementById("board16").style.display = "block";
    generarTablero("16");
    loseLife = 15.625;
    document.getElementById("hp").style.width = bossHP + "px";
    enemy = "GANON";
    document.getElementById("img4").style.display = "block";
    document.getElementById("title4").style.display = "block";
  }
  document.body.style.backgroundImage = "url('./bg4.jpg')"; //Cambia el fondo de la pantalla
  document.body.style.backgroundRepeat = "no-repeat"; // No repeat al bg
  document.body.style.backgroundSize = "cover"; // cover al bg
  document.getElementById("dif").style.display = "none"; //Oculta los distintos botones de dificultad para que solo aparezca el de Hero Of Time.
  document.getElementById("hot").style.display = "none";
  document.getElementById("dificulty").style.display = "none"; //Oculta el texto "Dificultad"
  document.getElementById("icontainer").style.display = "block"; // Muestra el contenido del div icontainer.
}

// Pre carga todo el contenido que se verá en el transcurso de esta aventura. (El motivo de hacer preload a todo es que no encontré otro modo de poder usar css,
//ya que al intentar invocar cualquier cosa que no estuviera precargada, era el equivalente a hacer un clear();
//todo menos ese algo desaparecia.)

function start() {
  output(button);
  output("</div>");
  output(buttonVolver);
  output("</div>");
  output("<div id='dif'>");
  output(easy);
  output("</div>");
  output(medium);
  output("</div>");
  output(hard);
  output("</div>");
  output("</div>");
  output(dificulty);
  output("</div>");
  output(hot);
  output("</div>");
  output("</div>");
  output(title1);
  output(title2);
  output(title3);
  output(title4);
  output(hpContainer);
  output(bar);
  output(hp);
  output("</div>");
  output("</div>");
  output("</div>");
  output(img1);
  output("</div>");
  output(img2);
  output("</div>");
  output(img3);
  output("</div>");
  output(img4);
  output("</div>");
  output("<div/>");
  output(textWin);
  output("</div>");
  output(textWinH);
  output("</div>");
  document.body.style.backgroundImage = "url('./bg1.jpg')";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}

start();

//Función que se encarga de mostrar el menu de seleccion de dificultades.

function startGame() {
  document.body.style.backgroundImage = "url('./bg2.jpg')";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.getElementById("start").style.display = "none"; //Oculta el texto de haz click para empezar
  if (easyb && mediumb && hardb == true) {
    //Checa si las condiciones para activar la dificultad Hero Of Time se cumplen o no.
    document.getElementById("hot").style.display = "block"; // En caso de que sí, muestra el botón de dicha dificultad y oculta los demás.
    document.getElementById("dificulty").style.display = "block";
  } else {
    document.getElementById("dif").style.display = "block"; // Muestra las distintas dificultades
    document.getElementById("dificulty").style.display = "block"; // Muestra el texto "Dificultad"
  }
  if (easyb == true) {
    // Checa si ya se pasó el nivel de dificultad al menos una vez y en caso de que así sea, oculta el respectivo botón. (Esto aplica a todas las dificultades más abajo.)
    document.getElementById("easy").style.display = "none";
  }
  if (mediumb == true) {
    document.getElementById("medium").style.display = "none";
  }
  if (hardb == true) {
    document.getElementById("hard").style.display = "none";
  }
}
// Funcion que genera un tablero de 16 x 16 (Maxima dificultad) que puede ser aprovechado por todas las dificultades para el acomodo de las cartas.
output("<div>");
// tablero de 8x8
var tablero = [];
output("</div>");
for (i = 0; i < 16; i++) {
  tablero.push(["", "", "", ""]);
}

function generarTablero(x) {
  //Para generar tableros con distintas medidas, se usa una función con un parametro "x"
  numeros = []; //Variable que tomara los 32 valores *2 (64)
  posicionesLibres = []; //Variable que tomará todos los espacios del tablero
  // Creo una lista con 32 numeros repetidos (64)
  for (let i = 1; i <= x * x; i++) {
    //Loop para crear la lista de 32 numeros sin consumir tanto codigo.
    numeros.push(i);
    numeros.push(i);
  }

  // Creo una lista de 64 elementos
  for (let i = 1; i <= x * x; i++) {
    posicionesLibres.push(i);
  }
  //recorrer 64 veces
  // for que busca fila
  for (i = 0; i < x; i++) {
    // for que busca en columna
    for (j = 0; j < x; j++) {
      //toma de una lista de posiciones, una posicion aleatoria
      posicion = Math.floor(Math.random() * posicionesLibres.length);
      //Asigna esa posición al valor de [i][j] del tablero.
      tablero[i][j] = numeros[posicion];
      //Elimina la posición y el elemento que ya use de las dos listas para evitar más de 2 duplicados y undefineds (motivo por el cual hay dos listas.)
      numeros.splice(posicion, 1);
      posicionesLibres.splice(posicion, 1);
    }
  }
}

function dibujarTablero(x) {
  // Lo mismo del parametro para poder dibujar tableros de distintas medidas.
  output("<div id='board" + x + "'>");
  for (var i = 0; i < x; i++) {
    for (var j = 0; j < x; j++) {
      var button ="<button id='" +i +"-" +j +"-" +x +"' onclick='voltear(" +i +"," +j +"," +x +")'>" +"-" +"</button>"; //Botones con un ID único y rastreables.
      output(button); // Invoca los botones definidos en la anterior linea.
    }
    output("<br>");
  }
  output("</div>");
}
function winner() {
  //Checa si se venció al boss.
  if (bossHP == 0) {
    // Condicion HP del boss = 0
    document.getElementById("textWin").style.display = "block"; //Muestra el texto de victoria de las dificultades normales.
    document.body.style.backgroundImage = "url('./bg3.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.getElementById("title1").style.display = "none"; //Oculta el texto "KILL "X"" de todos los boss.
    document.getElementById("title2").style.display = "none";
    document.getElementById("title3").style.display = "none";
    document.getElementById("title4").style.display = "none";
    document.getElementById("img1").style.display = "none"; // Oculta las imagenes de todos los boss.
    document.getElementById("img2").style.display = "none";
    document.getElementById("img3").style.display = "none";
    document.getElementById("img4").style.display = "none";
    document.getElementById("hpContainer").style.display = "none";
    document.getElementById("volver").style.display = "block"; // Muestra el botón de volver al menú principal.
  }
  if (bossHP == 0 && enemy == "MOLDORM") {
    // La función que verifica si ya se pasó el nivel facil, pasa a ser verdadera si se derrota a este boss y aparte reestablece el hp del boss.
    // Antes de reestablecer el hp del boss, tras matar a 1 el siguiente era un 1 hit porque al usar la misma barra para todos, la misma empezaba vacia.
    easyb = true;
    bossHP = 500;
  }
  if (bossHP == 0 && enemy == "TRINEXX") {
    mediumb = true;
    bossHP = 500;
  }
  if (bossHP == 0 && enemy == "HELMASAUR") {
    hardb = true;
    bossHP = 500;
  }
  if (bossHP == 0 && enemy == "GANON") {
    // Esta función checa si se pasó la dificultad secreta y muestra un texto diferente que indica el final del juego.
    document.getElementById("textWin").style.display = "none";
    document.getElementById("textWinH").style.display = "block";
    document.getElementById("volver").style.display = "block";
  }
}

function volver() {
  document.getElementById("textWinH").style.display = "none"; // Vuelve al menu principal ocultando y mostrando los elementos que sean necesarios.
  document.getElementById("textWin").style.display = "none";
  document.getElementById("start").style.display = "block";
  document.getElementById("volver").style.display = "none";
  document.body.style.backgroundImage = "url('./bg1.jpg')";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}
// Funcion encargada de voltear las cartas.
function voltear(i, j, x) {
  // Parametro I y J para ID, parametro X para evitar un error, donde dar clic en un tablero hacia que uno de los tableros invisibles recibiera
  //Necesitamos comprobar que solo haya dos elementos seleccionados
  switch (elementosSeleccionados) {
    case 1: // Switch con parametro según la cantidad de cartas seleccionadas.
      //Guardar boton como el mas más viejo
      botonAnterior2 = document.getElementById(i + "-" + j + "-" + x);
      //Mostrar elemento al clickearlo trackeandolo por medio del ID
      botonSeleccionado = document.getElementById(i + "-" + j + "-" + x);
      botonSeleccionado.innerHTML = tablero[i][j];
      //subir el contador
      elementosSeleccionados++;
      break;
    case 2:
      //Mostrar elemento al clickearlo trackeandolo por medio del ID
      botonSeleccionado = document.getElementById(i + "-" + j + "-" + x);
      botonSeleccionado.innerHTML = tablero[i][j];
      // Comparar si el botón seleccionado contiene el mismo valor del botón anterior y a su vez, que el ID de ambos sea diferente.
      if (
        botonSeleccionado.innerHTML == botonAnterior2.innerHTML &&
        botonSeleccionado.id != botonAnterior2.id
      ) {
        // Si todo lo anterior se cumple se procede a ejecutar este codigo:
        //Bajar la vida del boss
        bossHP = bossHP - loseLife;
        // Recarga el estilo de la barra para actualizarla al valor actual de la vida del jefe
        document.getElementById("hp").style.width = bossHP + "px";
        // Hacerle pop a los dos botones que resultaron ser iguales
        botonAnterior2.remove();
        botonSeleccionado.remove();
        // En caso contrario
      } else {
        //Guarda la posicion anterior menos antigua
        botonAnterior1 = document.getElementById(i + "-" + j + "-" + x);
        //Subir el contador
        elementosSeleccionados++;
      }
      break;
    case 3:
      //Borra el elemento mas viejo
      botonAnterior2.innerHTML = "-";
      //Borra el elemento anterior
      botonAnterior1.innerHTML = "-";
      //Mostrar elemento
      botonSeleccionado = document.getElementById(i + "-" + j + "-" + x);
      botonSeleccionado.innerHTML = tablero[i][j];
      botonAnterior2 = botonSeleccionado; // Se guarda el valor del botón actual como el más antiguo ya que desde aquí, jamás se entra al switch caso 1 denuevo.
      //Poner contador en 2 para ir al swtich caso 2.
      elementosSeleccionados = 2;
      break;
  }
  // Verificar ganador
  winner();
}
// Dibujar todos los tableros con sus distintos tamaños.
dibujarTablero("2");
dibujarTablero("4");
dibujarTablero("8");
dibujarTablero("16");
