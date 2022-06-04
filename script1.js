var selectedRow = null

function enviarFormulario(e) {
	event.preventDefault();
        var formData = leerDatosForrmulario();
        if (selectedRow == null){
            AgregarNuevoRegistro(formData);
		}
        else{
            modificarRegistro(formData);
		}
        borrarDelFormulario(formData);
}

//Devuelve los datos del formulario
function leerDatosForrmulario() {
    var formData = {};
    formData["personaNombre"] = document.getElementById("personaNombre").value;
    formData["personaApellido"] = document.getElementById("personaApellido").value;
    formData["personaPais"] = document.getElementById("personaPais").value;
    formData["personaOcupacion"] = document.getElementById("personaOcupacion").value;
    return formData;
    
}

//Inserta datos 
function AgregarNuevoRegistro(data) {
    var table = document.getElementById("listaTabla").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    celda1= newRow.insertCell(0);
		celda1.innerHTML = data.personaNombre;
    celda2 = newRow.insertCell(1);
		celda2.innerHTML = data.personaApellido;
    celda3 = newRow.insertCell(2);
		celda3.innerHTML = data.personaPais;
    celda4 = newRow.insertCell(3);
		celda4.innerHTML = data.personaOcupacion ;
    celda5 = newRow.insertCell(4);
        celda5.innerHTML = `<button onClick="obtenerRegistroEditado(this)">Edit</button> <button onClick="Borrar(this)">Delete</button>`;
}

//Obtiene datos del registro y Edita un registro
function obtenerRegistroEditado(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("personaNombre").value = selectedRow.cells[0].innerHTML;
    document.getElementById("personaApellido").value = selectedRow.cells[1].innerHTML;
    document.getElementById("personaPais").value = selectedRow.cells[2].innerHTML;
    document.getElementById("personaOcupacion").value = selectedRow.cells[3].innerHTML;
}
function modificarRegistro(formData) {
    selectedRow.cells[0].innerHTML = formData.personaNombre;
    selectedRow.cells[1].innerHTML = formData.personaApellido;
    selectedRow.cells[2].innerHTML = formData.personaPais;
    selectedRow.cells[3].innerHTML = formData.personaOcupacion;
}

//borrar registro
function Borrar(td) {
    if (confirm('esta seguro que desea eliminar este registro?')) {
        row = td.parentElement.parentElement;
        document.getElementById('listaTabla').deleteRow(row.rowIndex);
        borrarDelFormulario();
    }
}

//Limpia el formulario
function borrarDelFormulario() {
    document.getElementById("personaNombre").value = '';
    document.getElementById("personaApellido").value = '';
    document.getElementById("personaPais").value = '';
    document.getElementById("personaOcupacion").value = '';
    selectedRow = null;
}