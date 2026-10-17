(function () {
  // ---- Contador de goles ----
  var goles = 0;
  var botonGol = document.getElementById("gol");
  var contador = document.getElementById("golN");
  botonGol.addEventListener("click", function () {
    goles += 1;
    contador.textContent = goles;
  });

  // ---- Historia en fechas ----
  var HITOS = [
    { anio: "1975", titulo: "Primera final de Copa América", texto: "Colombia llega por primera vez a la final del torneo continental y cae ante Perú." },
    { anio: "1990", titulo: "Vuelve al Mundial", texto: "Después de 28 años sin jugar una Copa del Mundo, la Selección clasifica a Italia 1990 y llega a octavos de final." },
    { anio: "1993", titulo: "5-0 a Argentina", texto: "En las eliminatorias, Colombia golea 5-0 a Argentina en Buenos Aires. Es una de las noches más recordadas del fútbol colombiano." },
    { anio: "2001", titulo: "Campeón de la Copa América", texto: "Jugando en casa, la Selección conquista su único título de Copa América, venciendo a México en la final." },
    { anio: "2014", titulo: "Cuartos de final en Brasil", texto: "James Rodríguez es el goleador del Mundial y Colombia alcanza los cuartos de final, su mejor resultado en una Copa del Mundo." },
    { anio: "2024", titulo: "Subcampeón de la Copa América", texto: "Colombia llega invicta a la final en Estados Unidos y pierde 1-0 con Argentina en el tiempo extra." },
    { anio: "2026", titulo: "Octavos en el Mundial", texto: "Primera de su grupo y eliminada en octavos de final por Suiza, en penales (4-3), en Vancouver." }
  ];
  var contAnios = document.getElementById("anios");
  var hito = document.getElementById("hito");
  var botones = [];

  function mostrar(i, enfocar) {
    botones.forEach(function (b, j) {
      b.setAttribute("aria-selected", i === j);
      b.tabIndex = i === j ? 0 : -1;
    });
    var h = HITOS[i];
    hito.innerHTML = '<span class="num">' + h.anio + "</span><h3>" + h.titulo + "</h3><p>" + h.texto + "</p>";
    if (enfocar) botones[i].focus();
  }
  HITOS.forEach(function (h, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.textContent = h.anio;
    b.addEventListener("click", function () { mostrar(i, false); });
    b.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") mostrar((i + 1) % HITOS.length, true);
      if (e.key === "ArrowLeft") mostrar((i - 1 + HITOS.length) % HITOS.length, true);
    });
    contAnios.appendChild(b);
    botones.push(b);
  });
  mostrar(HITOS.length - 1, false);

  // ---- Trivia ----
  var PREGUNTAS = [
    { p: "¿En qué año ganó Colombia la Copa América?", o: ["1993", "2001", "2014", "2024"], c: 1 },
    { p: "¿Quién fue el goleador del Mundial 2014?", o: ["Radamel Falcao", "Carlos Valderrama", "James Rodríguez", "Luis Díaz"], c: 2 },
    { p: "¿Contra quién perdió Colombia la final de la Copa América 2024?", o: ["Brasil", "Argentina", "Uruguay", "Perú"], c: 1 },
    { p: "¿Cuál fue el marcador del famoso triunfo de Colombia en Buenos Aires en 1993?", o: ["3-0", "4-1", "5-0", "2-1"], c: 2 },
    { p: "¿Qué selección eliminó a Colombia en octavos del Mundial 2026?", o: ["Suiza", "Portugal", "Ghana", "Brasil"], c: 0 }
  ];
  var quiz = document.getElementById("quiz");
  var indice = 0, puntos = 0;

  function pintar() {
    quiz.innerHTML = "";
    if (indice >= PREGUNTAS.length) {
      var frase = puntos === PREGUNTAS.length ? "¡Eres un verdadero hincha!" :
                  puntos >= 3 ? "¡Muy bien, vas por buen camino!" : "Repasa la historia y vuelve a intentarlo.";
      quiz.innerHTML = '<p class="final">' + puntos + " de " + PREGUNTAS.length + "</p><p>" + frase + "</p>";
      var otra = document.createElement("button");
      otra.type = "button"; otra.className = "sig"; otra.textContent = "Jugar otra vez";
      otra.addEventListener("click", function () { indice = 0; puntos = 0; pintar(); });
      quiz.appendChild(otra);
      return;
    }
    var q = PREGUNTAS[indice];
    var prog = document.createElement("p");
    prog.className = "prog";
    prog.textContent = "Pregunta " + (indice + 1) + " de " + PREGUNTAS.length;
    var titulo = document.createElement("h3");
    titulo.textContent = q.p;
    var ops = document.createElement("div");
    ops.className = "ops";
    var nota = document.createElement("p");
    nota.className = "nota";
    nota.setAttribute("role", "status");

    q.o.forEach(function (texto, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = texto;
      b.addEventListener("click", function () {
        var botonesOp = ops.querySelectorAll("button");
        botonesOp.forEach(function (x) { x.disabled = true; });
        botonesOp[q.c].classList.add("bien");
        if (i === q.c) { puntos += 1; nota.textContent = "¡Correcto!"; }
        else { b.classList.add("mal"); nota.textContent = "Casi. La respuesta era: " + q.o[q.c] + "."; }
        var sig = document.createElement("button");
        sig.type = "button"; sig.className = "sig";
        sig.textContent = indice === PREGUNTAS.length - 1 ? "Ver resultado" : "Siguiente";
        sig.addEventListener("click", function () { indice += 1; pintar(); });
        quiz.appendChild(sig);
        sig.focus();
      });
      ops.appendChild(b);
    });
    quiz.appendChild(prog);
    quiz.appendChild(titulo);
    quiz.appendChild(ops);
    quiz.appendChild(nota);
  }
  pintar();
})();
