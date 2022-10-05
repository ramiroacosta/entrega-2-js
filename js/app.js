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
        cantidad: 1
    }

    agregarCarrito(nuevoItem)
}
function agregarCarrito(nuevoItem){
    for(let i =0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === nuevoItem.title.trim()){
            carrito[i].cantidad ++;
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
        const content =  `
        <th scope="row">1</th>
                    <td class="tablaProductos">
                        <img src=${item.img} alt="">
                        <h6 class="titulo">${item.titulo}</h6>
                    </td>
                    <td class="tablaPrecio"><p>${item.precio}</p></td>
                    <td class="tablaCantidad">
                        <input type="number" min="1" value=${item.cantidad}>
                        <button class="delete btn btn-danger">x</button>
                    </td>
        `
        tr.innerHTML = content;
        tbody.append(tr)
    })
}