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
                $idProyecto = $_REQUEST['idProyecto'];

                $sql = "call sp_Carga(1,$idUsuario,$idProyecto,'','');";
                
                if ($resultdata = $db->query($sql))
                {
                    foreach($resultdata as $row)
                    {
                        $array = [
                            "Carga" => $row["idCarga"],
                            "Proyecto" => $row["idProyecto"],
                            "Nombre" => $row["Nombre"],
                            "Carnet" => $row["Carnet"],
                            "Descripcion" => $row["Descripcion"],
                            "Ubicacion" => $row["Path"],
                            "Fecha" => $row["FECHA"]
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

        case 'POST':
            try{

                $idUsuario = $_REQUEST['idUsuario'];
                $idProyecto = $_REQUEST['idProyecto'];
                $Descripcion = $_REQUEST['Descripcion'];
                $Path = $_REQUEST['Path'];

                $sql = "call sp_Carga(2,$idUsuario,$idProyecto,'$Descripcion','$Path');";
                
                if ($resultdata = $db->query($sql))
                {
                    foreach($resultdata as $row){ 
                        $result["msgtype"] = true;
                        $result["msgdisplay"] = $row["id"];
                        $result["error"] = $db->error();
                    }
                   
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

    