document.getElementById("filepicker").addEventListener("change", function (event) {
    let output = document.getElementById("listing");
    console.log(output);
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        let item = document.createElement("li");
        item.innerHTML = files[i].webkitRelativePath;
        output.appendChild(item);
        console.log(output);
    };
}, false);

function save(){
    try{
        $.ajax({
            url: "../clases/carga.php?idUsuario="+idUsuario,
            type: 'POST',
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
            },
        });

    }catch(error){
        alert(error);
    }
}

function reset(){
    try{
        alert("reset");
    }catch(error){
        alert(error);
    }
}

