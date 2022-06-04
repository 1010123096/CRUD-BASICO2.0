
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
					celda5.innerHTML =  '<button onClick="borrarRegistro('+ results.rows.item(i).Nombre +')">Delete</button>';
				}
			},
			function errorCallback(tx, error) {
				alert(error.message);
			}
		);
	});
}


function borrarRegistro(nombre){
console.log(nombre);
	db.transaction(function (tx) {
		console.log("borrando2");
		
		tx.executeSql('DELETE FROM Persona WHERE Nombre="'+ nombre +'"');
		mostrarTabla();
	});
}


/*function borrarTabla(){
	db.transaction(function (tx) {
		tx.executeSql('DROP TABLE IF EXISTS Personas');
	});
}*/