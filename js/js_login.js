$('#btnEntrar').on('click', function () {

    let user  = $('#inputEmail').val();
    let password = $('#inputPassword').val();

    $.ajax({
        url: '../clases/login.php?user=' +user+ '&password=' +password ,
        type: 'GET',
        beforeSend: function () {
            $('#response').html("<div class=\"spinner-grow text-primary\" role=\"status\">\n" +
                "  <span class=\"sr-only\">Loading...</span>\n" +
                "</div>");
        },
        success: function (response) {
            var message = response;
            //console.log("Contenido de Response");

            var tipoAlerta = fnTipoAlerta(message.msgtype);

            $('#response').html(tipoAlerta.concat(message.msgdisplay).concat("<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" onclick='$(\"#alert\").hide(200);'>\n" +
                "<span aria-hidden=\"true\">&times;</span></button></div>"));

            if (message.msgtype == 1) {
                //Redireccionamiento a pagina Cursos
                window.location.href = "../form/cursos.html?id1="+message.id;
            
            }
        },  
        error: function (request, status, error) {
            $('#response').html(request.responseText);
        }
    });
});


function fnTipoAlerta(codalerta) {
    if (codalerta == 1)
        return "<div id='alert' class='alert alert-success alert-dismissible fade show' role='alert'>";
    if (codalerta == 0)
        return "<div id='alert' class='alert alert-danger alert-dismissible fade show' role='alert'>";
    if (codalerta == 2)
        return "<div id='alert' class='alert alert-warning alert-dismissible fade show' role='alert'>";
    if (codalerta == 3)
        return "<div id='alert' class='alert alert-info alert-dismissible fade show' role='alert'>";

    return "<div class='alert alert-dark alert-dismissible fade show' role='alert'>";
}