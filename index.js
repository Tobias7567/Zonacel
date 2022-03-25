let carrito = document.getElementById("carrito");
let conten = document.getElementById("ubicaciondecompra");
let vaciarboton = document.querySelector(".Vaciarcarrito");
let contenedordebloque = document.getElementById("contenedor");
let buttonmostrarcompra = document.getElementById("buttoncarrito");

let articulosCarrito = [];

const URLGET = "./productos.json";

$.get(URLGET, function (respuesta, estado) {
  if (estado === "success") {
    let misdatos = respuesta;
    for (const dato of misdatos) {
      $(contenedordebloque).prepend(`<div class = "Contenedordecelular">
        <h2 id="nombre"> ${dato.Nombre} </h2>
        <img src= "${dato.imagen}"></img>
        <div id="contenedordeprecio"><h3>$</h3>
        <h3 id="precio">${dato.precio}</h3></div>
        <p id = "pdeproducto">Memoria:${dato.memoria}</p>
        <p id = "pdeproducto">Color: ${dato.color}</p>
        <button class="buttoncomprar">Comprar</button>
        </div >`);
    }
  }
});

buttonmostrarcompra.addEventListener("click", mostrarcarrito);
contenedordebloque.addEventListener("click", agregarcelular);
vaciarboton.addEventListener("click", () => {
  articulosCarrito = [];
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
  limpiarcarrito();
});
conten.addEventListener("click", eliminarCelular);
let clic = 1;
function mostrarcarrito() {
  if (clic == 1) {
    carrito.style.display = "block"

    clic = clic + 1;
  } else {
    carrito.style.display = "none";
    clic = 1;
  }
}
// buscador de  datos de combo
function agregarcelular(e) {
  if (e.target.classList.contains("buttoncomprar")) {
    let datoscelular = e.target.parentElement;
    leerDatosCombo(datoscelular);
  }
}
//lector de datos de combo
function leerDatosCombo(datoscelular) {
  const infocelular = {
    titulo: datoscelular.querySelector("#nombre").textContent,
    precio: datoscelular.querySelector("#precio").textContent,
    cantidad: 1,
  };

  const existe = articulosCarrito.some(
    (celular) => celular.titulo === infocelular.titulo
  );
  {
    if (existe) {
      const celular = articulosCarrito.map((celular) => {
        if (celular.titulo === infocelular.titulo) {
          celular.cantidad++;
          return celular;
        }
      });
    } else {
      articulosCarrito = [...articulosCarrito, infocelular];
    }
  }

  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));

  carritoenhtml();
}

function eliminarCelular(e) {
  if (e.target.classList.contains("borrar-celular")) {
    const titulo = e.target.getAttribute("titulo");

    // Eliminar del arreglo del carrito
    articulosCarrito = articulosCarrito.filter(
      (celular) => celular.titulo !== titulo
    );

    carritoenhtml();
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
  }
}

function carritoenhtml() {
  limpiarcarrito();
  articulosCarrito.forEach((celular) => {
    let row = document.createElement("tr");
    row.innerHTML = `<td > ${celular.titulo}  </td>
                  <td class ="tddejs" > $${celular.precio}  </td>
                  <td class ="tddejs">${celular.cantidad} </td>
                  <td class ="tddejs"><button class="borrar-celular" titulo="${celular.titulo}"> X</button></td>`;
    conten.appendChild(row);
  });
}

function limpiarcarrito() {
  while (conten.firstChild) {
    conten.removeChild(conten.firstChild);
  }
}
