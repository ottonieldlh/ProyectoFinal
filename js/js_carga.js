let files;
document.getElementById("filepicker").addEventListener(
	"change",
	function (event) {
		let output = document.getElementById("listing");
		files = event.target.files;
		for (let i = 0; i < files.length; i++) {
			$("#listing").append(
				"<li class='list-group-item'>" + files[i].webkitRelativePath + "</li>"
			);
		}
	},
	false
);

function save() {
	try {
		if (files.length > 0) {
			let id = uploadFiles(files);
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const idUsuario = urlParams.get("id1");
			const idProyecto = urlParams.get("id2");
			const Descripcion = document.getElementById("description").value;
			const Path = id;

			$.ajax({
				url:
					"../clases/carga.php?idUsuario=" +
					idUsuario +
					"&idProyecto=" +
					idProyecto +
					"&Descripcion=" +
					Descripcion +
					"&Path=" +
					Path,
				type: "POST",
				beforeSend: function () {
					$("#response").html(
						'<div class="spinner-grow text-primary" role="status">\n' +
							'  <span class="sr-only">Loidading...</span>\n' +
							"</div>"
					);
				},
				success: function (response) {
					const message = response;
					console.log(message);
					if (message.msgtype == 1) {
						for (let i = 0; i < files.length; i++) {
							$.ajax({
								url:
									"../clases/detallecarga.php?idCarga=" +
									message.msgdisplay +
									"&detallecarga=" +
									files[i].webkitRelativePath,
								type: "POST",
								beforeSend: function () {
									$("#response").html(
										'<div class="spinner-grow text-primary" role="status">\n' +
											'  <span class="sr-only">Loidading...</span>\n' +
											"</div>"
									);
								},
								success: function (response) {
									const message = response;
									console.log(message);
									if (message.msgtype == 1) {

									}
								},
								error: function (request, status, error) {
									$("#response").html(request.responseText);
									console.log(request.responseText);
								},
							});
						}
					}
				},
				error: function (request, status, error) {
					$("#response").html(request.responseText);
					console.log(request.responseText);
				},
			});
			alert("Datos enviados correctamente");
			//window.history.go(-2);
		} else {
			alert("No se a seleccionado archivos");
		}
	} catch (error) {
		alert(error);
	}

	mosDat(idUsuario);
}

function reset() {
	try {
		alert("reset");
	} catch (error) {
		alert(error);
	}
}

function uploadFiles(files) {
	// Create a new HTTP requests, Form data item (data we will send to the server) and an empty string for the file paths.
	xhr = new XMLHttpRequest();
	data = new FormData();
	paths = "";

	// Set how to handle the response text from the server
	xhr.onreadystatechange = function (ev) {
		console.debug(xhr.responseText);
	};

	// Loop through the file list
	for (var i in files) {
		// Append the current file path to the paths variable (delimited by tripple hash signs - ###)
		paths += files[i].webkitRelativePath + "###";
		// Append current file to our FormData with the index of i
		data.append(i, files[i]);
	}
	// Append the paths variable to our FormData to be sent to the server
	// Currently, As far as I know, HTTP requests do not natively carry the path data
	// So we must add it to the request manually.
	let id = uuid.v4();
	data.append("paths", paths);
	data.append("id", id);

	// Open and send HHTP requests to upload.php
	xhr.open("POST", "../clases/upload.php", true);
	xhr.send(this.data);

	return id;
}


function mosDat(idUsuario) {
	$.ajax({
		url: "../clases/usuario.php?idUsuario="+ idUsuario,
		type: 'GET',
		beforeSend: function () {
			$("#response").html(
				'<div class="spinner-grow text-primary" role="status">\n' +
				'  <span class="sr-only">Loidading...</span>\n' +
				"</div>"
			);
		},
		success: function (response) {
			const message = response;
			console.log(message);

			if (message.msgtype == 1) {
				const data = message.msgdisplay;

				let $nav = $("<nav class=\"navbar navbar-light rgba-stylish-light\"></nav>");
				$nav.append("<a class='navbar-brand'></a>")
				data.forEach(element => {
					let h5 = $("<a>").append(
						$('<a>').html("<h5>"+element.Descripcion+" | "+element.Nombre+"</h5>"),
					);
					$nav.append(h5);
				});
				$(".table-responsive").append($nav);
			}

		},
		error: function (request, status, error) {
			$("#response").html(request.responseText);
		},
	});
}