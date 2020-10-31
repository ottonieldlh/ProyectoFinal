$(document).ready(function (e) {

	const queryString = window.location.search;

	const urlParams = new URLSearchParams(queryString);

	const idProyecto = urlParams.get("id1");
	const idUsuario = urlParams.get("id2");
	mosDat(idUsuario);

	$.ajax({
		url: "../clases/carga.php?idUsuario=0&idProyecto="+ idProyecto,
		type: "GET",
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
                let $table = $("<table class='table'></table>");
                $table.append("<tr><th>Nombre</th><th>Carnet</th><th>Descripción</th><th>Ubicación</th><th>Fecha</th></tr>")
				data.forEach(element => {
					let tr = $("<tr>").append(
						$("<td>").text(element.Nombre),
						$("<td>").text(element.Carnet),
						$("<td>").text(element.Descripcion),
						$('<td>').html("<a href=cargaVistArbol.html?id1=" + element.Carga +"&id2="+ element.Ubicacion+"&id3="+idUsuario+">"+element.Ubicacion+"</a>"),
						$("<td>").text(element.Fecha)
					);
					$table.append(tr);
					document.getElementById("sel1").innerHTML += "<option value='"+element.Ubicacion+"'>"+element.Nombre+"</option>";
					document.getElementById("sel2").innerHTML += "<option value='"+element.Ubicacion+"'>"+element.Nombre+"</option>";
				});
				$(".table-responsive").append($table);
			}
		},
		error: function (request, status, error) {
			$("#response").html(request.responseText);
		},
	});
});
