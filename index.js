

let carrito = [];


function agregar_a_carrito (e){
    //console.log("boton compra");

    
    let hijo = e.target;
    let padre = e.target.parentNode;
    let abuelo = e.target.parentNode.parentNode;

    /* 
    console.log(hijo);
    console.log(padre);
    console.log(abuelo);
     */

    let img_producto = abuelo.querySelector("img").src;
    let nombre_producto = abuelo.querySelector("h3").textContent;
    let precio_producto = abuelo.querySelector("h5").textContent;


    let producto = {
        nombre: nombre_producto,
        precio: precio_producto,
        img: img_producto,
        cantidad: 1
    };


    //agregar un push del objeto seleccionado al arreglo "carrito"
    carrito.push(producto); //Nota: aca habria que hacer una copia del carrito en local storage, 
    //actualizando la cantidad, 
    //si ya existe no agregarlo de nuevo (CONDICIONAL), etc.     //mostrar carrito sin duplicados
    //Tener la copia en el local storage y renderizarlo desde ahi
    // con un REDUCE puedo mostrar el total del carrito
    
    let carrito_JSON = JSON.stringify(carrito);
    //console.log(carrito);
    //console.log(carrito_JSON);
    localStorage.setItem("carrito_compras", carrito_JSON);

    mostrar_carrito();


    // notificacion de toastify para avisar que el producto fue añadido al carrito
    Toastify({
        text: "Producto añadido a carrito",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();


}


//funcion que se encarga de renderizar el producto en el carrito
function mostrar_carrito (){
    
    let tabla = document.getElementById("tablaCarrito");
    tabla.innerHTML = ""; // esta parte no deberia estar, deberia ir a buscar al local storage lo que hay guardado y renderizarlo
    let carrito_guardado = localStorage.getItem("carrito_compras");
    carrito_guardado = JSON.parse(carrito_guardado);
    //console.log(carrito_guardado);


    for (let producto of carrito_guardado) {

        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img src="${producto.img}"></td>
                          <td><p>${producto.nombre}</p></td>
                          <td>${producto.precio}</td>
                          <td>${producto.cantidad}</td>
                          <td><button class="borrar_elemento">Borrar</button></td>`;
                          

        tabla.append(fila);
    }


    let btn_borrar = document.querySelectorAll(".borrar_elemento"); 

    for( let btn of btn_borrar){
        btn.addEventListener("click", borrar_producto)
    }


    function borrar_producto(e){

        let abuelo = e.target.parentNode.parentNode;
        abuelo.remove();

        //Obtener el arreglo del localStorage, modificar el arreglo quitando el objeto eliminado y guardando el nuevo arreglo en localStorage 
        // let carrito_guardado = localStorage.getItem("carrito_compras");
        // carrito_guardado = JSON.parse(carrito_guardado);
        // console.log ("carrito_guardado es: ", carrito_guardado);
        // let producto_borrado = carrito_guardado.find((carrito) => carrito.nombre);
        // console.log("El producto borrado es: ", producto_borrado);
        // let newCarrito = carrito.filter((carrito)=>carrito.nombre!=nombre);
        // console.log("El carrito actualizado es: ", carrito);
        // let index = carrito.findIndex((carrito) => carrito.abuelo == abuelo);
        // console.log(carrito[index]);


        //Eliminar producto de carrito en Local Storage
        localStorage.removeItem("carrito_compras") // NO FUNCIONA del todo bien porque elimina todo el carrito




    // notificacion de toastify para avisar que el producto fue eliminado del carrito
    Toastify({
        text: "Producto eliminado",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #E6765E, #E59989)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    }

}




// Aplico Reduce para calcular el valor total del carrito -- NO FUNCIONA BIEN
function calcular_total(acumulador, producto){
    acumulador = acumulador + producto.precio;
    return acumulador
}

let venta_total = carrito.reduce(calcular_total, 0);
console.log(venta_total); //NO FUNCIONA






//EVENTOS CARRITO

let btn_comprar = document.querySelectorAll(".btn_comprar"); // tambien se puede usar getElementbyID("btn_comprar")

// console.log(btn_comprar);


for(let boton of btn_comprar){
    
    boton.addEventListener("click", agregar_a_carrito);

}