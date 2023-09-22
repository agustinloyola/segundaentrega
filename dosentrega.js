class Item{
    constructor(nombre, precio, imagen){
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    }
}

// Items 
const pocion = new Item("Poción Roja", 80, "pocion.png");
const espada = new Item("Espada Larga", 180, "espada.png");
const escudo = new Item("Escudo de Hierro", 100, "escudo.png");

// Array para el inventario (lugar donde se van a estar agregando los items)
const inventario = [];

// Oro del juego
let oro = 500;
// Elementos del DOM
const elOro = document.querySelector("#oro span");
elOro.innerText = oro; // Para que actualice el oro apenas carga la aplicación
const elInventario = document.getElementById("inventario");

function comprar(item){
    // Verificamos si tenemos oro disponible para la compra
    if (oro - item.precio >= 0){
      inventario.push(item);
      oro = oro - item.precio; // Actualizamos el oro
      actualizarHTML();
     
    }else{
        alert(`No tienes suficiente oro para comprar este ${item.nombre}.`);
    }
}


// Función para vender un item
function vender(nombreDelItem) {
    // Buscamos el item con find
    const itemEncontrado = inventario.find((item) => item.nombre == nombreDelItem);
  
    // Si está en el inventario, lo volamos y actualizamos el HTML
    if (itemEncontrado) {
      // Actualizamos el oro
      oro += itemEncontrado.precio;
      // Lo volamos del inventario
      const indice = inventario.indexOf(itemEncontrado);
      inventario.splice(indice, 1);
      // Actualizamos el HTML
      actualizarHTML();
    }
  }
  
  // Función para actualizar el HTML de la aplicación (oro e items)
  function actualizarHTML() {
    elInventario.innerHTML = "";
    for (const itemDelJuego of inventario) {
      const li = `
      <li onclick="vender('${itemDelJuego.nombre}')">
        <img src="img/${itemDelJuego.imagen}" alt="${itemDelJuego.imagen}" />
      </li>
      `;
      // Va a ir concatenando los li creados en el elemento #inventario (ul)
      elInventario.innerHTML += li;
    }
  
    elOro.innerText = oro;
}