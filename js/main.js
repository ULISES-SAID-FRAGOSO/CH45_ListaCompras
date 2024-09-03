const btnAgregar = document.getElementById("btnAgregar");

const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");


let isValid = true;
let contador = 0;
let precio = 0;

let costoTotal = 0;
let totalProductos = 0;

function validarCantidad(){
    if (txtNumber.value.length == 0) {
        return false;
    }

    if (isNaN(txtNumber.value)) {
        return false;
    }

    if(Number(txtNumber.value)<=0){
        return false;
    }
    
    return true;
    
}

function getPrecio(){
    return Math.round((Math.random()*10000))/100;
}


btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.style.border="";
    txtNumber.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    isValid = true;


//validar el nombre del producto
    if (txtNombre.value.length<3) {
        txtNombre.style.border="solid red medium";
        alertValidacionesTexto.innerHTML="el <strong>nombre</strong> no es correcto </br>";
        alertValidaciones.style.display="block";
        isValid = false;
    }

//validar la cantidad
    if (! validarCantidad()) {
        txtNumber.style.border="solid red medium";
        alertValidacionesTexto.innerHTML+="el <strong>cantidad</strong> no es correcto </br>";
        alertValidaciones.style.display="block";
        isValid = false;
    }

//agregar elementos a la tabla
    if (isValid) {
        contador++;
        precio = getPrecio();
        let row = `<tr>
                <td>${contador}</td>
                <td>${txtNombre.value}</td>
                <td>${txtNumber.value}</td>
                <td>${precio}</td>
        </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        totalProductos += Number(txtNumber.value);
        contadorProductos.innerText = contador;
        productosTotal.innerText = totalProductos;
        precioTotal.innerText = "$" + costoTotal.toFixed(2);

        localStorage.setItem("contador", contador);
        localStorage.setItem("totalProductos", totalProductos);
        localStorage.setItem("costoTotal", costoTotal);


        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();

    }
   

}); //addEventListener

//evento blur es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur",function(event){
    txtNombre.value = txtNombre.value.trim();
})//txtNombre.addEventListener

txtNumber.addEventListener("blur",function(event){
    txtNumber.value = txtNumber.value.trim();
})//txtNumber.addEventListener


window.addEventListener("load", function(event){
     if (this.localStorage.getItem("contador") !=null){
        contador = Number(this.localStorage.getItem("contador"));
     }
     if (this.localStorage.getItem("totalProductos") !=null){
        contador = Number(this.localStorage.getItem("totalProductos"));
     } 
     if (this.localStorage.getItem("costoTotal") !=null){
        contador = Number(this.localStorage.getItem("costoTotal"));
     }     
     contadorProductos.innerText = contador;
        productosTotal.innerText = totalProductos;
        precioTotal.innerText = "$" + costoTotal.toFixed(2);
})
