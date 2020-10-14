<?php
    require_once (dirname(__DIR__, 1) . '/clases/load.php');

    $result = [
        "msgtype" => false,
        "msgdisplay" => "",
        "id" => 0,
        "error" => ""
    ];

    header('Content-Type: application/json');


    $user = $_REQUEST['user'];
    $pass = $_REQUEST['password'];

    $sql = "CALL sp_Usuario('$user','$pass');";
    global $db;

    if ($resultdata = $db->query($sql))
    {
        foreach($resultdata as $row)
        {
            $result["msgtype"] = $row["vEstado"];
            $result["msgdisplay"] =  $row["vMensaje"];
            $result["id"] =  $row["vid"];
        }
    }else
    {
        $arrayMessage["msgdisplay"] = "Error generando la informaci&oacute;n solicitada.";
        $arrayMessage["error"] = $db->error();
    }

    $db->db_disconnect();
    $db->db_connect();

    echo json_encode($result);

    