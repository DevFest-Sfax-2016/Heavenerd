<?php

include("config.php");
include("identifiants.php");


function realip() {
   //recupere l adresse ip de l ordi de l utilisateur
   if (isSet($_SERVER)) {
    if (isSet($_SERVER["HTTP_X_FORWARDED_FOR"])) {
     $realip = $_SERVER["HTTP_X_FORWARDED_FOR"];
    } elseif (isSet($_SERVER["HTTP_CLIENT_IP"])) {
     $realip = $_SERVER["HTTP_CLIENT_IP"];
    } else {
     $realip = $_SERVER["REMOTE_ADDR"];
    }

   } else {
    if ( getenv( 'HTTP_X_FORWARDED_FOR' ) ) {
     $realip = getenv( 'HTTP_X_FORWARDED_FOR' );
    } elseif ( getenv( 'HTTP_CLIENT_IP' ) ) {
     $realip = getenv( 'HTTP_CLIENT_IP' );
    } else {
     $realip = getenv( 'REMOTE_ADDR' );
    }
   }
   return $realip;
}

function BienvenueClient($nomuser)
{
	$heure = date('H');
$minute = date('i');
$date_totale=date('d/m/Y');
// Maintenant on peut afficher ce qu'on a recueilli
echo '<h3>Bonjour '.$nomuser.' ! Nous sommes le '.$date_totale.' et il est '.$heure. ' h ' . $minute.'mn</h3>';
echo '<br/>';
}

function getCountAction($param,$param2)
{
$date_totale=date('d/m/Y');	

	$query=$db->prepare('SELECT count(*) FROM historique WHERE ProduitDe =:pseudo AND Date_de_Vente BETWEEN '.$param2.' AND CURRENT_DATE');
	
        $query->bindValue(':pseudo',$param, PDO::PARAM_STR);
        $query->execute();
        $data=$query->fetch();
return $data[0];

}

function erreur($err='')
{
   $mess=($err!='')? $err:'Une erreur inconnue s\'est produite';
   exit('<div id="error"><p>'.$mess.'</p>
   <p>Cliquez <a href="./index.php">ici</a> pour revenir à la page d\'accueil</p></div></body></html>');
}


function verif_auth()
{
$id_user=(isset($_SESSION['id']))?$_SESSION['id']:-999;
return (0 <= intval($id_user));
}
?>