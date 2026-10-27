
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

// Menú para celulares
menuToggle.addEventListener("click", () => {
  const abierto = nav.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", abierto);
  menuToggle.setAttribute(
    "aria-label",
    abierto ? "Cerrar menú" : "Abrir menú"
  );
  menuToggle.textContent = abierto ? "✕" : "☰";
});

// Cerrar el menú al elegir una sección
nav.querySelectorAll("a").forEach((enlace) => {
  enlace.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  });
});

// Año actual en el pie de página
document.getElementById("anio").textContent =
  new Date().getFullYear();

// Contador de días para Navidad
function actualizarContador() {
  const ahora = new Date();
  let navidad = new Date(ahora.getFullYear(), 11, 25);

  // Si Navidad ya pasó, contar hacia la del próximo año
  if (ahora >= navidad) {
    navidad = new Date(ahora.getFullYear() + 1, 11, 25);
  }

  const diferencia = navidad - ahora;
  const dias = Math.ceil(
    diferencia / (1000 * 60 * 60 * 24)
  );

  document.getElementById("cuentaRegresiva").textContent =
    `🎁 ¡Faltan ${dias} días para Navidad!`;
}

actualizarContador();

// Botón para compartir
const compartirBtn = document.getElementById("compartirBtn");
const mensaje = document.getElementById("mensajeCompartir");

compartirBtn.addEventListener("click", async () => {
  const datos = {
    title: "Navitlanejo | Festival Navideño",
    text: "🎄 ¡Descubre Navitlanejo! Un festival lleno de comida, regalos y espíritu navideño.",
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(datos);
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(
        `${datos.text} ${datos.url}`
      );
      mensaje.textContent =
        "¡Enlace copiado! Ya puedes compartirlo.";
    } else {
      mensaje.textContent =
        "Copia la dirección de esta página desde tu navegador para compartirla.";
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      mensaje.textContent =
        "No se pudo compartir automáticamente. Copia el enlace de la página.";
    }
  }
});

// Botón para regresar al inicio
const volverArriba = document.getElementById("volverArriba");

window.addEventListener("scroll", () => {
  volverArriba.classList.toggle("visible", window.scrollY > 350);
});

volverArriba.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
