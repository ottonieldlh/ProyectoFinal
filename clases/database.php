<?php

class MySqli_DB
{
    private $con;
    private $error;
    public $query_id;

    public function __construct()
    {
        $this->db_connect();
    }

    public function query($sql)
    {
        if (trim($sql != ""))
        {
            $this->query_id = $this->con->query($sql);
        }

        if (!$this->query_id)
        {
            $this->error = "Error ejecutando la instruccion en base de datos";
        }

        return $this->query_id;
    }

    public function db_disconnect()
    {
        if (isset($this->con))
        {
            mysqli_close($this->con);
            unset($this->con);
        }
    }

    public function db_connect()
    {
        $this->con = mysqli_connect(DB_HOST, DB_USER, DB_PASS);

        if (!$this->con) {
            die("Falló la conexión a la base de datos:". mysqli_connect_error());
        } else {
            $select_db = $this->con->select_db(DB_NAME);

            if (!$select_db) {
                die("Falló la selección de la base de datos.". mysqli_connect_error());
            }
        }
    }

    public function error()
    {
        $err = "";

        if (!empty($this->error))
            $err = $this->error;
        else
            $err = mysqli_error($this->con);

        return $err;
    }

}

$db = new MySqli_DB();