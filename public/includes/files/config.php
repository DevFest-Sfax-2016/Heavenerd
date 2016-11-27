<?php


  error_reporting(0);

  /*
  define('MYSQL_HOSTNAME',  'eu-cdbr-azure-north-e.cloudapp.net:3306');  // hostname
  define('MYSQL_USERNAME',  'b5bc3dc18bb01b');       // username
  define('MYSQL_PASSWORD',  '2dc16253');   // password 
  define('MYSQL_DATABASE',  'pfefss'); // database 
  */



  define('MYSQL_HOSTNAME',  'localhost:3308');  // hostname 
  define('MYSQL_USERNAME',  'root');       	   // username 
  define('MYSQL_PASSWORD',  'mysql');    // password
  define('MYSQL_DATABASE',  'netbeanspfefss');       // database

  
  
  /* Login successful the redirect to */
  define('SUCCESS_LOGIN_GOTO' ,'index.php');
 
/* if the USERS_TABLE_NAME doesn't exist in the DB then this module  will automatically create this TABLE  */
  define('USERS_TABLE_NAME','fss_users');
  
  
  
  /* Advance Configuration - no need to edit this section */
  define('AJAX_TIMEOUT',        '10000000');
  define('AJAX_TARGET_ELEMENT', 'ajax_target');
  define('AJAX_WAIT_TEXT',      'Veuillez patienter ...');
  define('AJAX_FORM_ELEMENT',   'ajax_form');
  define('AJAX_WAIT_ELEMENT',   'ajax_wait');
  define('AJAX_NOTIFY_ELEMENT', 'ajax_notify');
  
  
    /* Advance Configuration - User Config*/
	define('eleve','ELEVE');
	define('prof','PROF');
	define('admin','ADMIN');
	define('banni','BANNED');

	define('ERR_IS_CO','Vous ne pouvez pas accéder à cette page si vous êtes deja connecté');

	define('ERR_IS_NOT_CO','Vous ne pouvez pas accéder à cette page si vous n\'êtes pas connecté');

	define('ERR_AUTH_VIEW','Vous ne pouvez pas accéder à ce forum si vous n\'êtes pas connecté');
	
	
	
		 try
		{
			$fssdb = new \PDO('mysql:host='.MYSQL_HOSTNAME.';dbname='.MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD);
		}
		catch (Exception $e)
		{
				die('Erreur : ' . $e->getMessage());
		}
?>
  
  
           

