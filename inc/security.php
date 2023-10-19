<?php
/********************************************************************/
/********************************************************************/
//  CLEAN 
/********************************************************************/
/********************************************************************/

// Display the links to the extra feeds such as category feeds
remove_action( 'wp_head', 'feed_links_extra');
// Display the links to the general feeds: Post and Comment Feed
remove_action( 'wp_head', 'feed_links');
// Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action( 'wp_head', 'rsd_link');
// Display the link to the Windows Live Writer manifest file.
remove_action( 'wp_head', 'wlwmanifest_link' );
// index link
remove_action( 'wp_head', 'index_rel_link' );
// prev link
remove_action( 'wp_head', 'parent_post_rel_link', 10);
// start link
remove_action( 'wp_head', 'start_post_rel_link', 10);
// Display relational links for the posts adjacent to the current post.
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10);
// Display the XHTML generator that is generated on the wp_head hook, WP version
remove_action( 'wp_head', 'wp_generator'); 


/********************************************************************/
/********************************************************************/
//  SECURITY 
/********************************************************************/
/********************************************************************/
function no_generator() { return ''; }  
add_filter( 'the_generator', 'no_generator' );
add_filter('get_the_generator_rss2', 'no_generator');
add_filter('get_the_generator_atom', 'no_generator');

// Banaliser les erreurs de connexion de WordPress
//add_filter('login_errors',create_function('$erreur', "return 'Erreur de connexion';"));

// Désactiver l’éditeur de fichier
// define('DISALLOW_FILE_EDIT',true);

//  Filtrage obligatoire des uploads
define( 'ALLOW_UNFILTERED_UPLOADS', FALSE );


// Protect your blog from malicious URL Requests

if (strlen($_SERVER['REQUEST_URI']) > 255 || 
	strpos($_SERVER['REQUEST_URI'], "eval(") || 
	strpos($_SERVER['REQUEST_URI'], "CONCAT") || 
	strpos($_SERVER['REQUEST_URI'], "UNION+SELECT") || 
	strpos($_SERVER['REQUEST_URI'], "base64"))
	{
		@header("HTTP/1.1 414 Request-URI Too Long");
		@header("Status: 414 Request-URI Too Long");
		@header("Connection: Close");
		@exit;
}


//
add_filter('xmlrpc_enabled', '__return_false');

/***************************************************************************/
//  SUPPRESSION EMOJI
/***************************************************************************/
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

?>
