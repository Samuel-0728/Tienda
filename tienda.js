function mostrarNotificacion(mensaje) {
  const noti = document.getElementById("notificacion");
  noti.textContent = mensaje;
  noti.classList.add("mostrar");
  setTimeout(() => {
    noti.classList.remove("mostrar");
  }, 2000); 
}


document.addEventListener("DOMContentLoaded", () => {
  const botonesVer = document.querySelectorAll(".ver");
  const botonesCerrar = document.querySelectorAll(".cerrar");
  const botonesAgregar = document.querySelectorAll(".agregar");
  const opciones = document.querySelectorAll(".opcion");

  let opcionElegida = "";

  botonesVer.forEach(boton => {
    boton.addEventListener("click", () => {
      const idModal = boton.parentElement.getAttribute("data-modal");
      document.getElementById(idModal).style.display = "flex";
      opcionElegida = "";
    });
  });

  botonesCerrar.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });

  opciones.forEach(img => {
    img.addEventListener("click", () => {
      const contenedor = img.parentElement;
      contenedor.querySelectorAll(".opcion").forEach(o => o.classList.remove("seleccionada"));
      img.classList.add("seleccionada");
      opcionElegida = img.src;
    });
  });

  botonesAgregar.forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      const titulo = modal.querySelector("h2").textContent;
      const seleccion = modal.querySelector(".opcion.seleccionada");

      if (!seleccion) {
        alert("Por favor selecciona un diseño antes de agregar.");
        return;
      }

      const [nombre, precioTexto] = titulo.split(" - ");
      const precio = Number(precioTexto.replace(/[^\d]/g, ""));

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      const existe = carrito.find(item => item.nombre === nombre && item.opcion === seleccion.src);

      if (existe) {
        existe.cantidad += 1;
      } else {
        carrito.push({
          nombre,
          precio,
          opcion: seleccion.src,
          cantidad: 1
        });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));

      mostrarNotificacion(`${nombre} agregado al carrito 🛒`);
      modal.style.display = "none";
    });
  });
});
