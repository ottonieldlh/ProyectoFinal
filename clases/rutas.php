<?php 

    header('Content-Type: application/json');
    header('Access-Control-Allow-Methos: GET, POST, PUT, DELETE');

    $id = $_REQUEST['id'];
    //if (isset($_POST['id'])) { 
    //capture post varibles, sanitizing of course. 
    $dir = "C:\\xampp\\htdocs\\ProyectoFinal\\uploads\\"; 
    $dir = $dir.$id;

    $dh = opendir($dir); 
    while (false !== ($filename = readdir($dh))) { 
     $files[] = $filename; 
    } 
    //now, do stuf with files 

    sort($files); 
    print_r($files); 
    //} 

?> 