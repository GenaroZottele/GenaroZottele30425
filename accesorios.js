const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorAccesorios = document.getElementById('contenedor-accesorios')
const productosEnCarro = document.getElementById('carrito-contenedor')
const precioTotal = document.getElementById('precioTotal')
const botonVaciar = document.getElementById('vaciar-carrito')
const cantidad = document.getElementById('cantidad')
const botonCarro = document.getElementById('boton-carro')

// let carrito = [];
let carrito = JSON.parse(localStorage.getItem('carrito'))


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


fetch('../data.json')
    .then( (res) => res.json())
    .then( (data) => {
        data.forEach((producto) => {
            if (producto.id > 20) {
                const div = document.createElement('div')
                div.classList.add('producto')
                div.innerHTML = `
                <img class="img-card" src=${producto.img} alt= "">
                <h3>${producto.nombre}</h3>
                <p class="precioProducto">Precio:$ ${producto.precio}</p>
                <button id="comprar${producto.id}" class="boton-comprar">Comprar <i class="fas fa-shopping-cart"></i></button>
                `
                contenedorAccesorios.appendChild(div)
            
                const boton = document.getElementById(`comprar${producto.id}`)
            
                boton.addEventListener('click', () => {
            
                    agregarAlCarrito(producto.id)
                    Toastify({
                        text: "Agrego un producto a su carrito!!",
                        duration: 3000,
                        gravity: 'top',
                        position: 'right',
                        style: {
                            background: 'linear-gradient(to right, violet, lightblue)'
                        }
                    }).showToast();
                
            
                })
            } 

        }) 
        const agregarAlCarrito = (prodId) => {
            const existe = carrito.some (prod => prod.id === prodId);
            
            if (existe) {
                let prod = carrito.map (prod => {
                    if (prod.id === prodId) {
                        prod.cantidad++
                    }
                })
            }else {
                const item = data.find((prod) => prod.id === prodId)
                carrito.push(item)
            }
            localStorage.setItem('carrito', JSON.stringify(carrito))
            pintarCarrito(carrito);
        }
        


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