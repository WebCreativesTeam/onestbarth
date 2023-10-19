<?php
/* CUSTOM POST TYPE
************************************************/
add_action('init', 'create_cpt');
function create_cpt()
{
	// RENTAL
	$labelsRental = array(
		'name'                => __( 'Rental', 'Post Type General Name', 'Jchrisbard' ),
		'singular_name'       => __( 'Rental', 'Post Type Singular Name', 'Jchrisbard' ),
		'menu_name'           => __( 'Rental', 'Jchrisbard' ),
		'parent_item_colon'   => __( 'Villa parent:', 'Jchrisbard' ),
		'all_items'           => __( 'All villas', 'Jchrisbard' ),
		'view_item'           => __( 'See villa', 'Jchrisbard' ),
		'add_new_item'        => __( 'Add a villa', 'Jchrisbard' ),
		'add_new'             => __( 'New villa', 'Jchrisbard' ),
		'edit_item'           => __( 'Edit villa', 'Jchrisbard' ),
		'update_item'         => __( 'Update villa', 'Jchrisbard' ),
		'search_items'        => __( 'Search a villa', 'Jchrisbard' ),
		'not_found'           => __( 'No villa found', 'Jchrisbard' ),
		'not_found_in_trash'  => __( 'No villa in the trash', 'Jchrisbard'),
	);
	
	register_post_type('rental', array(
		'label' => 'rental', 
		'labels' => $labelsRental, 
		'public' => true,
		'show_ui' => true,
		'capability_type' => 'post',
		'taxonomies' => array('category'),  
		'hierarchical' => false,
		'supports' => array('title', 'editor', 'thumbnail','excerpt')
	));
	
	// SUGGESTIONS
	$labelsSuggestions = array(
		'name'                => __( 'Suggestions', 'Post Type General Name', 'Jchrisbard' ),
		'singular_name'       => __( 'Suggestion', 'Post Type Singular Name', 'Jchrisbard' ),
		'menu_name'           => __( 'Suggestions', 'Jchrisbard' ),
		'parent_item_colon'   => __( 'Suggestion parente:', 'Jchrisbard' ),
		'all_items'           => __( 'Toutes les Suggestions', 'Jchrisbard' ),
		'view_item'           => __( 'Voir la Suggestion', 'Jchrisbard' ),
		'add_new_item'        => __( 'Ajouter une Suggestion', 'Jchrisbard' ),
		'add_new'             => __( 'Nouvelle Suggestion', 'Jchrisbard' ),
		'edit_item'           => __( 'Editer Suggestion', 'Jchrisbard' ),
		'update_item'         => __( 'MAJ de la Suggestion', 'Jchrisbard' ),
		'search_items'        => __( 'Rechercher une Suggestion  ', 'Jchrisbard' ),
		'not_found'           => __( 'Aucune Suggestion trouvée', 'Jchrisbard' ),
		'not_found_in_trash'  => __( 'Aucune Suggestion dans la poubelle', 'Jchrisbard'),
	);
	
	register_post_type('suggestion', array(
		'label' => 'suggestion', 
		'labels' => $labelsSuggestions, 
		'public' => true,
		'show_ui' => true,
		'capability_type' => 'post',
		'hierarchical' => false,
		'supports' => array('title', 'editor')
	));
}



/* TAXONOMY
************************************************/
add_action( 'init', 'create_taxonomy', 0 );
function create_taxonomy() {
	
	// LOCATION
	$labelsLocation = array(
		'name' => __( 'Location', 'JChris69' ),
		'singular_name' => __( 'Location', 'JChris69' ),
		'search_items' =>  __( 'Search a location', 'JChris69' ),
		'all_items' => __( 'All locations', 'JChris69' ),
		'parent_item' => __( 'Parent location', 'JChris69' ),
		'parent_item_colon' => __( 'Parent location :', 'JChris69' ),
		'edit_item' => __( 'Edit a location', 'JChris69' ),
		'update_item' => __( 'Update location', 'JChris69' ),
		'add_new_item' => __( 'Add a location', 'JChris69' ),
		'new_item_name' => __( 'New location', 'JChris69' ),
		'menu_name' => __( 'Locations', 'JChris69' ),
	);   
 
	register_taxonomy('location',array('rental'), array(
		'hierarchical' => true,
		'labels' => $labelsLocation,
		'show_ui' => true,
		'show_admin_column' => true,
		'query_var' => true,
		'show_in_nav_menus' => false,
		'rewrite' => array( 'slug' => 'location' ),
	)); 
	
	// COLLECTION
	$labelsCollection = array(
		'name' => __( 'Collection', 'JChris69' ),
		'singular_name' => __( 'Collection', 'JChris69' ),
		'search_items' =>  __( 'Search a collection', 'JChris69' ),
		'all_items' => __( 'All collections', 'JChris69' ),
		'parent_item' => __( 'Parent collection', 'JChris69' ),
		'parent_item_colon' => __( 'Parent collection :', 'JChris69' ),
		'edit_item' => __( 'Edit a collection', 'JChris69' ),
		'update_item' => __( 'Update collection', 'JChris69' ),
		'add_new_item' => __( 'Add a collection', 'JChris69' ),
		'new_item_name' => __( 'New collection', 'JChris69' ),
		'menu_name' => __( 'Collections', 'JChris69' ),
	);   
 
	register_taxonomy('collection',array('rental'), array(
		'hierarchical' => true,
		'labels' => $labelsCollection,
		'show_ui' => true,
		'show_admin_column' => true,
		'query_var' => true,
		'show_in_nav_menus' => false,
		'rewrite' => array( 'slug' => 'collection' ),
	)); 
}
?>