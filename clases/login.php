<?php
    require_once (dirname(__DIR__, 1) . '/clases/load.php');

    $result = [
        "msgtype" => false,
        "msgdisplay" => "",
        "id" => 0,
        "error" => ""
    ];

    header('Content-Type: application/json');
    header('Access-Control-Allow-Methos: GET, POST, PUT, DELETE');

    global $db;

    switch($_SERVER["REQUEST_METHOD"]){
        case 'GET': 
            try{
                $user = $_REQUEST['user'];
                $pass = $_REQUEST['password'];
                $sql = "CALL sp_Usuario('$user','$pass');";
                
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
                    $result["msgtype"] = false;
                    $arrayMessage["msgdisplay"] = "Error generando la informaci&oacute;n solicitada.";
                    $arrayMessage["error"] = $db->error();
                }
            }catch(Exception $e){
                $result["msgtype"] = false;
                $result["msgdisplay"] = [];
                $result["error"] = $e->getMessage();
            }
        break;
    }

    $db->db_disconnect();
    $db->db_connect();

    echo json_encode($result);

    