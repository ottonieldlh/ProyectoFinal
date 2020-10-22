<?php
    require_once (dirname(__DIR__, 1) . '/clases/load.php');

    $result = [
        "msgtype" => false,
        "msgdisplay" => [],
        "error" => ""
    ];

    header('Content-Type: application/json');
    header('Access-Control-Allow-Methos: GET, POST, PUT, DELETE');

    global $db;

    switch($_SERVER["REQUEST_METHOD"]){
        case 'GET': 
            try{
                $idUsuario = $_REQUEST['idUsuario'];

                $sql = "call sp_Cursos($idUsuario);";
                
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
                    $result["msgtype"] = false;
                    $result["msgdisplay"] = "Error generando la informaci&oacute;n solicitada.";
                    $result["error"] = $db->error();
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

    