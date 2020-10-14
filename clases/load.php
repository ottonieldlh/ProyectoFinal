<?php


define("URL_SEPARATOR", '/');
define("DS", DIRECTORY_SEPARATOR);

defined('SITE_ROOT')? null: define('SITE_ROOT', realpath(dirname(__FILE__)));
define("LIB_PATH_INC", SITE_ROOT.DS);
require_once (LIB_PATH_INC.'configdb.php');
require_once (LIB_PATH_INC.'database.php');
