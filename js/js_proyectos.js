$(document).ready(function (e) {

    const queryString = window.location.search;
    
    const urlParams = new URLSearchParams(queryString);

    const idUsuario = urlParams.get('id1');
    const idCurso = urlParams.get('id2')
    console.log(idUsuario);
    console.log(idCurso);


	$.ajax({
		url: "../clases/proyectos.php?idUsuario="+idUsuario+"&idCurso="+idCurso,
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

			if (message.msgtype == 1) {
				const data = message.msgdisplay;
                let $table = $("<table class='table'></table>");
                $table.append("<tr><th>Nombre</th><th>Descripción</th></tr>")
				data.forEach(element => {
					let tr = $("<tr>").append(
						$("<td>").text(element.Nombre),
						$("<td>").text(element.Descripcion)
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
