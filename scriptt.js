var nomTabla;
var NombreModificar


function crearBaseDeDatos() {

	db = openDatabase('Mydb', '1.0', 'base de datos persona', 2 * 1024 * 1024);
}

function crearTabla() {
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS Persona(Nombre, Apellido, Pais, Ocupacion)');
		console.log("bd");
	});
}


function insertarTabla() {

	console.log("insertando");

	db.transaction(function (tx) {
		console.log("insertando");


		var nombre = document.getElementById('personaNombre').value;
		console.log(nombre);
		var apellido = document.getElementById('personaApellido').value;
		console.log(apellido);
		var pais = document.getElementById('personaPais').value;
		console.log(pais);
		var ocupacion = document.getElementById('personaOcupacion').value;
		console.log(ocupacion);

		tx.executeSql('INSERT INTO Persona (Nombre, Apellido, Pais, Ocupacion) VALUES (?,?,?,?)', [nombre, apellido, pais, ocupacion]);
		console.log("insertadooooo");
	});
}
function mostrarTabla() {
	db.transaction(function (tx) {
		console.log('XD');
		tx.executeSql('SELECT * FROM Persona', [],

			function callback(tx, results) {
				var len = results.rows.length, i;
				var lista = [];
				var table = document.getElementById("listaTabla").getElementsByTagName('tbody')[0];
				console.log('XD');

				for (i = 0; i < len; i++) {
					var newRow = table.insertRow(table.length);
					celda1 = newRow.insertCell(0);
					celda1.innerHTML = results.rows.item(i).Nombre;

					celda2 = newRow.insertCell(1);
					celda2.innerHTML = results.rows.item(i).Apellido;

					celda3 = newRow.insertCell(2);
					celda3.innerHTML = results.rows.item(i).Pais;

					celda4 = newRow.insertCell(3);
					celda4.innerHTML = results.rows.item(i).Ocupacion;
					celda5 = newRow.insertCell(4);
					nomTabla = results.rows.item(i).Nombre
					celda5.innerHTML = '<button onClick="obtenerRegistroEditado(this)">Edit</button> <button onClick="eliminarRegistro()">Delete</button>';
					//celda5.innerHTML =  '<button  class = "boton" type="button" onclick="eliminarRegistro()"></button><button  class = "boton" type="button" onclick="eliminarRegistro()"></button>';

					//<button onClick="borrarRegistro('+ nombre +');">Delete</button>
				}
			},
			function errorCallback(tx, error) {
				alert(error.message);
			}
		);
	});
}
function mostarHTML() {
 NombreModificar =nombre
	NombreModificar = nombre;
	console.log("modificando");
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM Persona WHERE Nombre ="' + nombre + '"', [],
			function callback(tx, results) {
				var lista = [];
				var len = results.rows.length, i;
				console.log("mostrando");

				for (var i = 0; i < len; i++) {
					console.log("mostrandox2");
					document.getElementById('personaNombre').value = results.rows.item(i).Nombre;
					document.getElementById('personaApellido').value = results.rows.item(i).Apellido;
					document.getElementById('personaPais').value = results.rows.item(i).Pais;
					document.getElementById('personaOcupacion').value = results.rows.item(i).Ocupacion;

				}

			},
			function errorCallback(tx, error) {
				alert(error.message);
			}
		);
	});

}

function obtenerRegistroEditado(td) {
	
    selectedRow = td.parentElement.parentElement;
    document.getElementById("personaNombre").value = selectedRow.cells[0].innerHTML;
	NombreModificar = document.getElementById("personaNombre").value;
    document.getElementById("personaApellido").value = selectedRow.cells[1].innerHTML;
    document.getElementById("personaPais").value = selectedRow.cells[2].innerHTML;
    document.getElementById("personaOcupacion").value = selectedRow.cells[3].innerHTML;
	

}
function guardarModificacion(){
	
	console.log("modificar");
	db.transaction(function (tx) {
		var nombre = document.getElementById('personaNombre').value;
		console.log(nombre);
		var apellido = document.getElementById('personaApellido').value;
		console.log(apellido);
		var pais = document.getElementById('personaPais').value;
		console.log(pais);
		var ocupacion = document.getElementById('personaOcupacion').value;
		console.log(ocupacion);
		if ((personaNombre == "") ||  (personaApellido == "") || (personaPais == "") || (personaOcupacion == "") ) {
			alert("Faltan datos por ingresar");
		} else {
			tx.executeSql('UPDATE Persona SET Nombre="'+nombre+'", Apellido="'+apellido+'",Pais="'+pais+'",Ocupacion="'+ocupacion+'" WHERE Nombre="' + NombreModificar + '"');
			console.log("modificandoooo");
		}
		mostrarTabla();
	});
}

function eliminarRegistro() {
	console.log(nomTabla);
	db.transaction(function (tx) {
		console.log("borrando2");

		tx.executeSql('DELETE FROM Persona WHERE Nombre ="' + nomTabla + '"');
		mostrarTabla();
		location.reload();
	});

}


/*function borrarTabla(){
	db.transaction(function (tx) {
		tx.executeSql('DROP TABLE IF EXISTS Personas');
	});
}*/