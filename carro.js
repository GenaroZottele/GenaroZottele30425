let carrito = JSON.parse(localStorage.getItem('carrito'))
const contenedorProductos = document.getElementById('contenedor-productos')
const productosEnCarro = document.getElementById('carrito-contenedor')
const precioTotal = document.getElementById('precioTotal')
const botonVaciar = document.getElementById('vaciar-carrito')
const cantidad = document.getElementById('cantidad')
const botonCarro = document.getElementById('boton-carro')


botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    pintarCarrito()
    Toastify({
        text: "Vacio su carrito!!",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, violet, lightblue)'
        }
    }).showToast();
})


const pintarCarrito = () => {
    
    productosEnCarro.innerHTML = ""

    carrito.forEach((prod) =>{
        const div = document.createElement('tr')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <td class="pe-5">${prod.nombre} </td>
        <td class="px-5">${prod.cantidad} </td>
        <td class="px-5">${prod.precio} </td>
        <td><button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar">🗑️</button></td>
        `

        productosEnCarro.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    }) 
    
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito(carrito)
    }
})


const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 

    pintarCarrito(carrito) 

    Toastify({
        text: "Elimino un producto!!",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, violet, lightblue)'
        }
    }).showToast();
    
    console.log(carrito)
}

botonCarro.addEventListener('click',() =>{
    pintarCarrito(carrito)
})