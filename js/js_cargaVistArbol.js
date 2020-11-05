$(document).ready(function (e) {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const idCarga = urlParams.get("id1");
    const path = urlParams.get("id2");
    const idUsuario = urlParams.get("id3");
    mosDat(idUsuario);


    $.ajax({
        url: "../clases/detallecarga.php?idCarga=" + idCarga,
        type: "GET",
        success: function (response) {
            const message = response;

            if (message.msgtype == 1) {
                const data = message.msgdisplay;

                let $table = $("<table class='table'></table>");
                $table.append("<tr><th>Ruta</th" +
                    "</tr>")
                data.forEach(element => {
                    let tr = $("<tr id='trDtTabla'>").append(
                       // $('<td id="datosTabla">').text(element.detallecarga)
                        $('<td id="datosTabla">').append('<a href="../uploads/'+path+'/'+element.detallecarga+'">'+element.detallecarga+'</a>')
                    );
                    $table.append(tr);
                });
                $(".table-responsive").append($table);
            }

        },
        error: function (request, status, error) {
            console.log(request)
            $("#response").html(request.responseText);
        },
    });
});

