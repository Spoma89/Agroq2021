const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}


function addItemCarrito(newItem){

  const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderCarrito()
} 


function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
   itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
   let button = document.getElementById("pagar");
   button.onclick = muestraAlerta; // 
    
  function muestraAlerta(evento) { if (Total <=0) {
    
    swal("carrito vacio", "Elige alguno de nuestros productos");

  }else{
       swal("Compra realizada!", "el Proceso de compra finalizo correctamente!", "success");
  }
   
  }
}


function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}

//Json

const tabla = document.querySelector('#lista-usuarios tbody');

function cargarSucursal(){
    fetch('sucursales.json')
        .then(respuesta => respuesta.json()) 
        .then(usuarios => {
            usuarios.forEach(sucursal => {
                const row = document.createElement('tr');
                row.innerHTML += `
                    <td>${sucursal.id}</td>
                    <td>${sucursal.name}</td>
                    <td>${sucursal.email}</td>
                    <td>${sucursal.address.city}</td>

                `;
                tabla.appendChild(row);                
            });
        }) 
}

cargarSucursal();


//Modal//

const modalAbrir = document.getElementById('modal-abrir')
const modalCerrar = document.getElementById('modal-cerrar')
const modalContainer = document.getElementById('modal-container')

const activarModal = () => { modalContainer.classList.toggle('modal-active') }
modalAbrir.onclick = activarModal
modalCerrar.onclick = activarModal

const inputNombre = document.getElementById('nombre')
const inputDireccion = document.getElementById('direccion')


inputNombre.addEventListener('input', (event) => {


    const valor = inputNombre.value

    if (valor.length < 5) {
        inputNombre.classList.add('invalido')
        inputNombre.classList.remove('valido')
    } else {
        inputNombre.classList.add('valido')
        inputNombre.classList.remove('invalido')
    }
})

inputDireccion.addEventListener('input', () => {
    const valor = inputDireccion.value

    if (valor.length < 6) {
        inputDireccion.classList.add('invalido')
        inputDireccion.classList.remove('valido')
    } else {
        inputDireccion.classList.add('valido')
        inputDireccion.classList.remove('invalido')
    }
})

const form = document.getElementById('formulario')


const usuarios = []

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const nombre = inputNombre.value
    const direccion = inputDireccion.value

    if (nombre.length < 3) {
        alert('Nombre inválido')
        return
    } 

    if (direccion.length < 3) {
        alert('direccion inválida')
        return
    }

  const usuario = {
        nombre: nombre,
        direccion: direccion
    }

    usuarios.push(usuario)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    alert('Enviado correctamente!')

    inputNombre.classList.remove('invalido', 'valido')
    inputDireccion.classList.remove('invalido', 'valido')

    form.reset()
    modalCerrar.click()

})
