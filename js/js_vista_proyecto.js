let arrpath1 = [];
let arrpath2 = [];
let count = 0;
$(document).ready(function (e) {
	const queryString = window.location.search;

	const urlParams = new URLSearchParams(queryString);

	const idProyecto = urlParams.get("id1");
	const idUsuario = urlParams.get("id2");
	mosDat(idUsuario);

	$.ajax({
		url: "../clases/carga.php?idUsuario=0&idProyecto=" + idProyecto,
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
				$table.append(
					"<tr><th>Nombre</th><th>Carnet</th><th>Descripción</th><th>Ubicación</th><th>Fecha</th></tr>"
				);
				data.forEach(element => {
					let tr = $("<tr>").append(
						$("<td>").text(element.Nombre),
						$("<td>").text(element.Carnet),
						$("<td>").text(element.Descripcion),
						$("<td>").html("<a href=cargaVistArbol.html?id1=" + element.Carga + "&id2=" + element.Ubicacion + "&id3=" + idUsuario + ">" + element.Ubicacion + "</a>"),
						$("<td>").text(element.Fecha)
					);
					$table.append(tr);
					document.getElementById("sel1").innerHTML += "<option value='" + element.Ubicacion + "' data-id='" + element.Carga + "'>" + element.Nombre + "</option>";
					document.getElementById("sel2").innerHTML += "<option value='" + element.Ubicacion + "' data-id='" + element.Carga + "'>" + element.Nombre + "</option>";
				});
				$("#tabla").append($table);
			}
		},
		error: function (request, status, error) {
			$("#response").html(request.responseText);
		},
	});
});

$("#btnComparar").on("click", function () {
	const idCarga1 = $("option:selected", "#sel1").data("id");
	const idCarga2 = $("option:selected", "#sel2").data("id");
	const sel1 = document.getElementById("sel1").value;
	const sel2 = document.getElementById("sel2").value;
	arrpath1 = [];
	arrpath2 = [];
	count = 0;

	if (sel1 == sel2) {
		alert("Seleccione dos proyectos diferentes");
	} else {
		$.ajax({
			url: "../clases/compara.php?path1=" + sel1 + "&path2=" + sel2,
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
				const data = message.msgdisplay;
				let tot = 0;

				if (message.msgtype == 1) {
					$("#listing").empty();

					data.forEach(element => {
						$("#listing").append(
							"<li class='list-group-item'>" + element.detalle + ": " + element.valor + "</li>");
						tot += parseInt(element.valor);
					});

					$("#listing").append(
						"<li class='list-group-item'>Total: " + tot / data.length + "</li>"
					);

					$.ajax({
						url: "../clases/detallecarga.php?idCarga=" + idCarga1,
						type: "GET",
						success: function (response) {
							const message = response;

							if (message.msgtype == 1) {
								const data = message.msgdisplay;

								data.forEach(element => {
									let path1 = "../uploads/" + sel1 + "/" + element.detallecarga;

									arrpath1.push(path1);
								});
							}
						},
						error: function (request, status, error) {
							$("#response").html(request.responseText);
						},
					}).done(function () {
						$.ajax({
							url: "../clases/detallecarga.php?idCarga=" + idCarga2,
							type: "GET",
							success: function (response) {
								const message = response;

								if (message.msgtype == 1) {
									const data = message.msgdisplay;

									data.forEach(element => {
										let path2 = "../uploads/" + sel2 + "/" + element.detallecarga;
										arrpath2.push(path2);
									});
								}
							},
							error: function (request, status, error) {
								$("#response").html(request.responseText);
							},
						}).done(function () {
							$("#comparation table").remove();

							let $table = $("<table class='table'></table>");
							$table.append(
								"<tr><th>Archivo</th><th>Archivo Comparado</th><th>Similitud</th></tr>"
							);
							arrpath1.forEach(element => {
								arrpath2.forEach(element2 => {
									const ele1 = element.split("/");
									const ele2 = element2.split("/");
									$.ajax({
										url:
											"../clases/levenshtein.php?path1=" + element + "&path2=" + element2,
										type: "GET",
										success: function (response) {
											const message = 35 - parseInt(response);
											if (message > 0 && message < 6) {
												let tr = $("<tr>").append(
													$("<td>").text(ele1[ele1.length - 1]),
													$("<td>").text(ele2[ele2.length - 1]),
													$("<td>").text(message),
												);
												$table.append(tr);
												count += message;
											}
										},
										error: function (request, status, error) {
											$("#response").html(request.responseText);
										},
									});
								});
							});
							$("#comparation").append($table);
						});
					});
				}
			},
			error: function (request, status, error) {
				$("#response").html(request.responseText);
			},
		});
	}
});
