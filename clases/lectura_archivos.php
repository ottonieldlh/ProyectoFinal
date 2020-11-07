<?php
$url = $_POST['url'];
$cont =  file_get_contents($url);
$cont = str_replace("<?php","",$cont);
$cont = str_replace("echo","'echo'",$cont);

echo $cont;