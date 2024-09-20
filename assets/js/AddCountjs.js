let cart = [];
// Obtener el valor del contador desde localStorage
let contador = 0
   contador= localStorage.getItem('cartItems2') ? parseInt(localStorage.getItem('cartItems2')) : 0;

// Inicializar el contador en la página
//cart = document.getElementById('cartItems2').innerHTML = contador;
// Inicializar el contador en la página

if (contador >= 0 && contador != null) {
    contador = 0;
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('cartItems2').innerHTML = contador.toString();
        updateCart();
        
    });
   

} 


// Manejador de eventos general para todos los enlaces
//document.addEventListener('click', function (event) {
//    if (event.target.tagName === 'A' && event.target.href != null) {
//        event.preventDefault(); // Prevenir la recarga de la página
//        // Aquí puedes manejar el evento onclick según sea necesario
//        if (event.target.id === 'cartLink') {
//            addToCart('Producto');
//        } else {
           
//            console.log('Enlace clicado:', contador);
//            updateCart()
//            window.location.href = event.target.href;

//        }
//    }
//});

function addToCart(product) {
    cart.push(product);
    contador = document.getElementById('cartItems2').Value
    //contador = localStorage.getItem('cartItems2') ? parseInt(localStorage.getItem('cartItems2')) : 0;
    updateCart();
}

function updateCart() {

    const cartItems2 = document.getElementById('cartItems2');
    //const totalItems = document.getElementById('totalItems');

    cartItems2.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartItems2.appendChild(li);
    });

    totalItems.textContent = cart.length;
    cartItems2.innerHTML = cart.length;

    // Guardar el valor del contador en localStorage
    localStorage.setItem('cartItems2', cart.length);
    //localStorage.setItem = cartItems2.innerHTML;
    // Mostrar un mensaje de confirmación usando SweetAlert
    mostrar("success", "Listo", `${productName} agregado al carrito`);

   
}

//SweetAlert
function mostrar(icono, titulo, mensaje) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
    });
}

