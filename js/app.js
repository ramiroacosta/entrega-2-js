const TocarButton = document.querySelectorAll(".button")
const tbody = document.querySelector('.tbody')
let carrito = []

TocarButton.forEach(btn => {
    btn.addEventListener('click', agregarCarrito)
})

function agregarCarrito(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitulo = item.querySelector('.card-title').textContent;
    const itemPrecio = item.querySelector('.precio').textContent;
    const itemImagenes = item.querySelector('.card-img-top').src;

    const nuevoItem = {
        titulo: itemTitulo,
        precio: itemPrecio,
        img: itemImagenes,
        cantidad: 1,
    }

    agregarCarrito(nuevoItem)
}
function agregarCarrito(nuevoItem){
    const alert = document.querySelector('.alert')
    setTimeout( function(){
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')
    const inputElemento = tbody.getElementsByClassName('inputElemento')
    for(let i =0; i < carrito.length ; i++){
        if(carrito[i].title === nuevoItem.title){
            carrito[i].cantidad ++;
            const inpuntValor= inputElemento[i]
            inpuntValor.value++;
            sumaTotal()
            return null;
        }
    }
    carrito.push(nuevoItem)
    cargarCarrito()
}
function cargarCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito')
        const Contenido =  `
        <th scope="row">1</th>
                    <td class="tablaProductos">
                        <img src=${item.img} alt="">
                        <h6 class="titulo">${item.titulo}</h6>
                    </td>
                    <td class="tablaPrecio"><p>${item.precio}</p></td>
                    <td class="tablaCantidad">
                        <input type="number" min="1" value=${item.cantidad} class="inputElemento">
                        <button class="delete btn btn-danger">x</button>
                    </td>
        `
        tr.innerHTML = Contenido;
        tbody.append(tr)
        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".inputElemento").addEventListener('change', sumaCantidad)
    })
    sumaTotal()
}
function sumaTotal(){
    let total =  0
    const itemCardTotal = document.querySelector('.itemCardTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        total = total + precio*item.cantidad
    })
    itemCardTotal.innerHTML =  `total $${total}`
}
function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".itemCarrito")
    const title = tr.querySelector('.title')
    for(let i=0; i<carrito.length; i++){
      if(carrito[i].title === title) {
        carrito.splice(i, 1) 
      }
    }
    const alert = document.querySelector('.remove')
    setTimeout( function(){
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')
    tr.remove()
    sumaTotal()
}
function sumaCantidad(e){
    const sumaInput = e.target
    const tr = sumaInput.closest(".itemCarrito")
    const title = tr.querySelector('.title')
    carrito.forEach(item => {
        if(item.title === title){
            sumaInput.value < 1 ? (sumaInput.value =1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            sumaTotal()
        }
    })
}