$(document).ready(function (e) {

	$.ajax({
		url: "../clases/carga.php?idUsuario=0&idProyecto=1",
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
						$("<td>").text(element.Ubicacion),
						$("<td>").text(element.Fecha)
					);
					$table.append(tr);
				});
				$(".table-responsive").append($table);
			}
		},
		error: function (request, status, error) {
			$("#response").html(request.responseText);
		},
	});
});
