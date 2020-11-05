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

			if (message.msgtype == 1) {
				const data = message.msgdisplay;

				let $nav = $("<nav class=\"navbar navbar-light rgba-stylish-light\"></nav>");
				$nav.append("<a class='navbar-brand'></a>")
				data.forEach(element => {
					let h5 = $("<a>").append(
						$('<a>').html("<h5>"+element.Descripcion+" | "+element.Nombre+"</h5>"),
						$('<a>').html("<a href=cursos.html?id1="+ idUsuario +">Cursos |</a>"),	
						$('<a>').html("<a href=login.html> Salir</a>"),	
					);
					$nav.append(h5);
				});
				$("#header").append($nav);
			}

		},
		error: function (request, status, error) {
			$("#response").html(request.responseText);
		},
	});
}