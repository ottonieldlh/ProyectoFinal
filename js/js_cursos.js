$(document).ready(function (e) {

    const queryString = window.location.search;
    
    const urlParams = new URLSearchParams(queryString);

    const idUsuario = urlParams.get('id1');

    console.log(idUsuario);
	$.ajax({
		url: "../clases/cursos.php?idUsuario="+ idUsuario,
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
                let $table = $("<table class='table'></table>");
                $table.append("<tr><th>Curso</th><th>No. de Proyectos</th></tr>")
				data.forEach(element => {
					let tr = $("<tr>").append(
						$('<td>').html("<a href=proyectos.html?id1=1&id2="+element.id+">"+element.Nombre+"</a>"),
						$('<td>').text(element.Proyectos)
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
