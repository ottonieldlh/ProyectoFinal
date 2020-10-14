<?php

session_start();
//var_dump($_SESSION);
if (isset($_SESSION['user'])) {
    require_once './form/frmIndex.php';
} else {
    require_once './form/login.html';
}