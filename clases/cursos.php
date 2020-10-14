<?php
    require_once (dirname(__DIR__, 1) . '/clases/load.php');

    $result = [
        "msgtype" => false,
        "msgdisplay" => [],
        "error" => ""
    ];

    header('Content-Type: application/json');

    $idUsuario = $_REQUEST['idUsuario'];

    $sql = "call sp_Cursos($idUsuario);";
    global $db;

    if ($resultdata = $db->query($sql))
    {
        foreach($resultdata as $row)
        {
            $array = [
                "id" => $row["idCursos"],
                "Nombre" => $row["Nombre"],
                "Proyectos" => $row["TotalProyectos"]

            ];
            array_push($result["msgdisplay"], $array);
        }
        $result["msgtype"] = true;    
    }else
    {
        $result["msgdisplay"] = "Error generando la informaci&oacute;n solicitada.";
        $result["error"] = $db->error();
    }

    

    $db->db_disconnect();
    $db->db_connect();

    echo json_encode($result);

    