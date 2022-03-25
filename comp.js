let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
let ubicaciondedatos = document.getElementById("ubicaciondedatos");
let ubicaciondetotal = document.getElementById("ubicaciondetotal");
let realizarcompra = document.getElementById("procesar-compra");
let cliente = document.getElementById("cliente");
let correo = document.getElementById("correo");
let adenav = document.getElementById("adenav");

creadordetexto();
creadordetotal();
realizarcompra.addEventListener("click", mostrarcartel);
adenav.addEventListener("click", borrarcarrito);

function borrarcarrito() {
  articulosCarrito = [];
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}
function mostrarcartel(e) {

  if (carritoLocalStorage == "") {
      e.preventDefault();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Antes debes selecionar al menos un producto!",
    });

  } else {
    const btn = document.getElementById("procesar-compra");

    document
      .getElementById("procesar-pago")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        btn.value = "Enviando...";

        const serviceID = "default_service";
        const templateID = "template_h8uffqu";

        emailjs.sendForm(serviceID, templateID, this).then(
          () => {
            btn.value = "Realizar Compra";
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Revisa tu correo!",
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (err) => {
            btn.value = "Send Email";
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Surgio un problema!",
            });
          }
        );
      });
  }
}

function creadordetexto() {
  carritoLocalStorage.forEach((celular) => {
    let texto = document.createElement("tr");
    texto.innerHTML = `<td class ="tddecompra" > ${celular.titulo}  </td>
                  <td class ="tddecompra" > $${celular.precio}  </td>
                  <td class ="tddecompra">${celular.cantidad} </td>
                  <td class ="tddecompra"> ${
                    celular.precio * celular.cantidad
                  } </td>
                  `;
    ubicaciondedatos.appendChild(texto);
  });
}

function creadordetotal() {
  let total;
  let precioapagar = 0;
  total = carritoLocalStorage;
  for (let i = 0; i < total.length; i++) {
    const element = total[i].precio * total[i].cantidad;
    precioapagar = precioapagar + element;
  }

  let texto = document.createElement("h3");
  texto.innerHTML = `<h3 class = "h3dejs" name ="totalapagar"> Total a pagar : $${precioapagar}</h3> `;

  ubicaciondetotal.appendChild(texto);
}
