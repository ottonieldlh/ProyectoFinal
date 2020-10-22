$(document).ready(function (e) {

    const queryString = window.location.search;
    
    const urlParams = new URLSearchParams(queryString);

    const idUsuario = urlParams.get('id1');
    const idCurso = urlParams.get('id2')


	$.ajax({
		url: "../clases/proyectos.php?idUsuario="+idUsuario+"&idCurso="+idCurso,
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

			if (message.msgtype == 1) {
				const data = message.msgdisplay;
                let $table = $("<table class='table'></table>");
                $table.append("<tr><th>Nombre</th><th>Descripción</th></tr>")
				data.forEach(element => {
					let tr = $("<tr>").append(
						$('<td>').html("<a href='#' onclick='redirect("+ idUsuario+","+element.id+");'>"+element.Nombre+"</a>"),
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

function redirect(user,id){

	$.ajax({
		url: "../clases/carga.php?idUsuario="+user+"&idProyecto="+id,
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

			if (message.msgtype == 1) {
				const data = message.msgdisplay;
                if (data.length > 0) {
					//Aqui ira a la pagina para ver el proyecto
					alert("Se mostrara el proyecto")
				}else{
					//aqui ira a la pagina para cargar el proyecto
					window.location.href = "../form/carga_proyecto.html?id1="+user;
				}
			}
		},
		error: function (request, status, error) {
			$("#response").html(request.responseText);
		},
	});
}
