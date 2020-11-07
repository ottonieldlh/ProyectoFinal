$(document).ready(function (e) {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const url = urlParams.get('id1');

    $.post('../clases/lectura_archivos.php', { url: url }, function (data) {
        document.getElementById('lectura').innerHTML = data;
    });
});
