function mostrarNotificacion(mensaje) {
  const noti = document.getElementById("notificacion");
  noti.textContent = mensaje;
  noti.classList.add("mostrar");
  setTimeout(() => {
    noti.classList.remove("mostrar");
  }, 2000); 
}


document.addEventListener("DOMContentLoaded", () => {
  const carritoItems = document.getElementById("carrito-items");
  const totalGeneral = document.getElementById("total-general");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
  const comprarBtn = document.getElementById("comprar");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function renderizarCarrito() {
    carritoItems.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
      const subtotal = producto.precio * producto.cantidad;
      total += subtotal;

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>$${subtotal}</td>
        <td>
          <button class="eliminar" data-index="${index}">❌</button>
        </td>
      `;
      carritoItems.appendChild(fila);
    });

    totalGeneral.textContent = total.toFixed(2);

    if (carrito.length === 0) {
      carritoItems.innerHTML = `<tr><td colspan="5">Tu carrito está vacío 😔</td></tr>`;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  carritoItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
      const index = e.target.getAttribute("data-index");
      carrito.splice(index, 1);
      renderizarCarrito();
    }
  });

  vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    renderizarCarrito();
  });

  comprarBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
      mostrarNotificacion("Tu carrito está vacío 😅");
      return;
    }
    mostrarNotificacion("Gracias por tu compra 🖤");
    carrito = [];
    renderizarCarrito();
  });

  renderizarCarrito();
});
