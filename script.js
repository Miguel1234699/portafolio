(function () {
  var raiz = document.documentElement;

  // Tema claro / oscuro
  try {
    var guardado = localStorage.getItem("tema");
    if (guardado) raiz.dataset.theme = guardado;
  } catch (e) {}

  document.getElementById("tema").addEventListener("click", function () {
    var actual = raiz.dataset.theme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var siguiente = actual === "dark" ? "light" : "dark";
    raiz.dataset.theme = siguiente;
    try { localStorage.setItem("tema", siguiente); } catch (e) {}
  });

  // Pestañas
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function activar(tab) {
    tabs.forEach(function (t) {
      var activa = t === tab;
      t.setAttribute("aria-selected", activa);
      t.tabIndex = activa ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !activa;
    });
    tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { activar(tab); });
    tab.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") activar(tabs[(i + 1) % tabs.length]);
      if (e.key === "ArrowLeft") activar(tabs[(i - 1 + tabs.length) % tabs.length]);
    });
  });

  // Formulario: abre el correo con el mensaje escrito
  var CORREO = "tucorreo@ejemplo.com"; // <-- cambia esto por tu correo
  var form = document.getElementById("form");
  var estado = document.getElementById("estado");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var campos = [form.nombre, form.mensaje];
    var faltan = campos.filter(function (c) {
      var vacio = !c.value.trim();
      c.setAttribute("aria-invalid", vacio);
      return vacio;
    });
    if (faltan.length) {
      estado.textContent = "Completa tu nombre y el mensaje antes de enviar.";
      faltan[0].focus();
      return;
    }
    var asunto = encodeURIComponent("Mensaje de " + form.nombre.value.trim());
    var cuerpo = encodeURIComponent(form.mensaje.value.trim());
    estado.textContent = "Abriendo tu aplicación de correo…";
    window.location.href = "mailto:" + CORREO + "?subject=" + asunto + "&body=" + cuerpo;
  });

  document.getElementById("anio").textContent = new Date().getFullYear();
})();
