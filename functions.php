<?php
// WARNING PHP
ini_set('display_errors', 0);
error_reporting(E_ALL);

if(isset($_GET['warning']))
{
	ini_set('display_errors', 1);
	error_reporting(E_ALL);
}

/***************************************************************************/
//  DEFINE
/***************************************************************************/
$current_theme = wp_get_theme();
define('THEME_DIR', get_template_directory());
define('THEME_URI', get_template_directory_uri());
define('THEME_NAME', $current_theme->Name);
define('THEME_SLUG', strtolower($current_theme->Name));
define('THEME_VERSION', $current_theme->Version);

session_start();

/***************************************************************************/
//  REMOVE ACCENT
/***************************************************************************/
function rmvAcc($str, $charset='utf-8')
{
    $str = htmlentities($str, ENT_NOQUOTES, $charset);
    
    $str = preg_replace('#&([A-za-z])(?:acute|cedil|caron|circ|grave|orn|ring|slash|th|tilde|uml);#', '\1', $str);
    $str = preg_replace('#&([A-za-z]{2})(?:lig);#', '\1', $str); // pour les ligatures e.g. '&oelig;'
    $str = preg_replace('#&[^;]+;#', '', $str); // supprime les autres caractères
    
    return $str;
}

/***************************************************************************/
//  REQUIRE
/***************************************************************************/
require_once(THEME_DIR.'/inc/security.php');
require_once(THEME_DIR.'/inc/common.php');
require_once(THEME_DIR.'/inc/cpt.php');
require_once(THEME_DIR.'/inc/ajax.php');
//require_once(THEME_DIR.'/inc/customer.php');
require_once(THEME_DIR.'/inc/admin/admin.php');


/***************************************************************************/
//  GESTION DE SESSION
/***************************************************************************/

// OPTIONS
//if(!isset($_SESSION['options'])){
	$_SESSION['options'] = get_fields('options');
//}


// MONEY
if(!isset($_SESSION['money'])){
	$_SESSION['money']=array(
		'dollar' => 'USD',
		'euro' => 'EUR',
		'canadian_dollar' => 'CAD',
		'swiss_franc' => 'CHF',
		'yen' => 'JPY',
		'ruble' => 'RUB',
		'livre' => 'GBP',
		'real' => 'BRL',
	);
}


// SEASON
if(!isset($_SESSION['season'])){
	$_SESSION['season']=get_field('season', 5);
}



// MONEY EXCHANGE
$_SESSION['money_tab_flag']='yes';
if(isset($_SESSION['ratestab']) && $_SESSION['ratestab']!=''){
	$_SESSION['money_tab_flag']='no';
}

// MONEY ACTIVE
if(!isset($_SESSION['money_active'])){
	$_SESSION['money_active']='dollar';
	$_SESSION['money_active_sigle']='USD';
}

// FAVORITE
if(!isset($_SESSION['favorite'])){
	$_SESSION['favorite']=0;
}


// DATE DEFAULT
if(!isset($_SESSION['booking']['arrivaldate']))
{
	$_SESSION['booking']['arrivaldate']=date('Y-m-d');
}

if(!isset($_SESSION['booking']['departuredate']))
{
	$_SESSION['booking']['departuredate']=date('Y-m-d', strtotime($_SESSION['booking']['arrivaldate'].' + 1 DAY'));
	createDateRangeArray();
}

// NB BEDS DEFAULT
if(!isset($_SESSION['booking']['nbbeds']))
{
	$_SESSION['booking']['nbbeds']=1;
}

// TAB FAVORITE
if(isset($_COOKIE["fav"]) && $_COOKIE["fav"]!='')
{
	$_SESSION['favorite']=explode(',',substr($_COOKIE["fav"],0,strlen($_COOKIE["fav"])-1));
}
else
{
	$_SESSION['favorite']=array();
}

$_SESSION['season']= get_field('season', 5);

/*
echo '<pre style="background:chartreuse">';
print_r($_SESSION['season']);
echo '</pre>';	
*/

add_filter('use_block_editor_for_post', '__return_false');
function custom_breadcrumbs() {
       
    // Settings
    $separator          = '/';
    $breadcrums_id      = 'breadcrumbs';
    $breadcrums_class   = 'breadcrumbs';
    $home_title         = 'Home';
      
    // If you have any custom post types with custom taxonomies, put the taxonomy name below (e.g. product_cat)
    $custom_taxonomy    = 'product_cat';
       
    // Get the query & post information
    global $post,$wp_query;
       
    // Do not display on the homepage
    if ( !is_front_page() ) {
       
        // Build the breadcrums
        echo '<ul id="' . $breadcrums_id . '" class="' . $breadcrums_class . '">';
           
        // Home page
        echo '<li class="item-home"><a class="bread-link bread-home" href="' . get_home_url() . '" title="' . $home_title . '">' . $home_title . '</a></li>';
        echo '<li class="separator separator-home"> ' . $separator . ' </li>';
           
        if ( is_archive() && !is_tax() && !is_category() && !is_tag() ) {
              
            echo '<li class="item-current item-archive"><strong class="bread-current bread-archive">' . post_type_archive_title($prefix, false) . '</strong></li>';
              
        } else if ( is_single() ) {
              
            // If post is a custom post type
            $post_type = get_post_type();
              
            // If it is a custom post type display name and link
            if($post_type != 'post') {
                  
                $post_type_object = get_post_type_object($post_type);
                $post_type_archive = get_post_type_archive_link($post_type);
              
                echo '<li class="item-cat item-custom-post-type-' . $post_type . '"><a class="bread-cat bread-custom-post-type-' . $post_type . '" href="' . $post_type_archive . '" title="' . $post_type_object->labels->name . '">' . $post_type_object->labels->name . '</a></li>';
                echo '<li class="separator"> ' . $separator . ' </li>';
              
            }
              
            // Get post category info
            $category = get_the_category();
             
            if(!empty($category)) {
              
                // Get last category post is in
                $last_category = end(array_values($category));
                  
                // Get parent any categories and create array
                $get_cat_parents = rtrim(get_category_parents($last_category->term_id, true, ','),',');
                $cat_parents = explode(',',$get_cat_parents);
                  
                // Loop through parent categories and store in variable $cat_display
                $cat_display = '';
                foreach($cat_parents as $parents) {
                    $cat_display .= '<li class="item-cat">'.$parents.'</li>';
                    $cat_display .= '<li class="separator"> ' . $separator . ' </li>';
                }
             
            }
              
            // If it's a custom post type within a custom taxonomy
            $taxonomy_exists = taxonomy_exists($custom_taxonomy);
            if(empty($last_category) && !empty($custom_taxonomy) && $taxonomy_exists) {
                   
                $taxonomy_terms = get_the_terms( $post->ID, $custom_taxonomy );
                $cat_id         = $taxonomy_terms[0]->term_id;
                $cat_nicename   = $taxonomy_terms[0]->slug;
                $cat_link       = get_term_link($taxonomy_terms[0]->term_id, $custom_taxonomy);
                $cat_name       = $taxonomy_terms[0]->name;
               
            }
              
            // Check if the post is in a category
            if(!empty($last_category)) {
                echo $cat_display;
                echo '<li class="item-current item-' . $post->ID . '"><strong class="bread-current bread-' . $post->ID . '" title="' . get_the_title() . '">' . get_the_title() . '</strong></li>';
                  
            // Else if post is in a custom taxonomy
            } else if(!empty($cat_id)) {
                  
                echo '<li class="item-cat item-cat-' . $cat_id . ' item-cat-' . $cat_nicename . '"><a class="bread-cat bread-cat-' . $cat_id . ' bread-cat-' . $cat_nicename . '" href="' . $cat_link . '" title="' . $cat_name . '">' . $cat_name . '</a></li>';
                echo '<li class="separator"> ' . $separator . ' </li>';
                echo '<li class="item-current item-' . $post->ID . '"><strong class="bread-current bread-' . $post->ID . '" title="' . get_the_title() . '">' . get_the_title() . '</strong></li>';
              
            } else {
                  
                echo '<li class="item-current item-' . $post->ID . '"><strong class="bread-current bread-' . $post->ID . '" title="' . get_the_title() . '">' . get_the_title() . '</strong></li>';
                  
            }
              
        }  else if ( is_page() ) {
               
            // Standard page
            if( $post->post_parent ){
                   
                // If child page, get parents 
                $anc = get_post_ancestors( $post->ID );
                   
                // Get parents in the right order
                $anc = array_reverse($anc);
                   
                // Parent page loop
                if ( !isset( $parents ) ) $parents = null;
                foreach ( $anc as $ancestor ) {
                    $parents .= '<li class="item-parent item-parent-' . $ancestor . '"><a class="bread-parent bread-parent-' . $ancestor . '" href="' . get_permalink($ancestor) . '" title="' . get_the_title($ancestor) . '">' . get_the_title($ancestor) . '</a></li>';
                    $parents .= '<li class="separator separator-' . $ancestor . '"> ' . $separator . ' </li>';
                }
                   
                // Display parent pages
                echo $parents;
                   
                // Current page
                echo '<li class="item-current item-' . $post->ID . '"><strong title="' . get_the_title() . '"> ' . get_the_title() . '</strong></li>';
                   
            } else {
                   
                // Just display current page if not parents
                echo '<li class="item-current item-' . $post->ID . '"><strong class="bread-current bread-' . $post->ID . '"> ' . get_the_title() . '</strong></li>';
                   
            }
               
        } elseif ( is_404() ) {
               
            // 404 page
            echo '<li>' . 'Error 404' . '</li>';
        }
       
        echo '</ul>';
           
    }
       
}
/*
class Popup_Nav_Menu extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth, $args) {
        global $wp_query;
        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
         
        $class_names = $value = '';
 
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
 
        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
        $class_names = ' class="' . esc_attr( $class_names ) . '"';
 
        $output .= $indent . '<li id="menu-item-'. $item->ID . '"' . $value . $class_names .'>';
 
        $attributes = ! empty( $item->attr_title ) ? ' title="' . esc_attr( $item->attr_title ) .'"' : '';
        $attributes .= ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) .'"' : '';
        $attributes .= ! empty( $item->xfn ) ? ' rel="' . esc_attr( $item->xfn ) .'"' : '';
        $attributes .= ! empty( $item->url ) ? ' href="' . esc_attr( $item->url ) .'"' : '';
 
        $item_output = $args->before;
        $item_output .= '<a'. $attributes .'>';
        $item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
        if(!empty($item->description)) { 
            $item_output .= '<br /><span class="sub">' . $item->description . '</span>';    
        }
        $item_output .= '</a>';

        if(!empty($item->_menu_subtitle)) {
            $item_output .= '<a href="'.$item->_menu_subtitle_link.'">';
            $item_output .= '<br /><span class="sub">' . $item->_menu_subtitle . '</span>';
            $item_output .= '</a>';
        }

        $item_output .= $args->after;
 
        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
}

function menu_item_desc( $item_id, $item ) {
	$menu_subtitle = get_post_meta( $item_id, '_menu_subtitle', true );
    $menu_subtitle_link = get_post_meta( $item_id, '_menu_subtitle_link', true );
	?>
	<div style="clear: both;">
	    <span class="description"><?php _e( "Sub Title", 'menu-subtitle' ); ?></span><br />
	    <input type="hidden" class="nav-menu-id" value="<?php echo $item_id ;?>" />
	    <div class="logged-input-holder">
	        <input type="text" name="menu_subtitle[<?php echo $item_id ;?>]" id="menu-subtitle-<?php echo $item_id ;?>" value="<?php echo esc_attr( $menu_subtitle ); ?>" />
	    </div>
	</div>
    <div style="clear: both;">
	    <span class="description"><?php _e( "Subtitle Link", 'menu-subtitle-link' ); ?></span><br />
	    <input type="hidden" class="nav-menu-id" value="<?php echo $item_id ;?>" />
	    <div class="logged-input-holder">
	        <input type="text" name="menu_subtitle_link[<?php echo $item_id ;?>]" id="menu-subtitle-link-<?php echo $item_id ;?>" value="<?php echo esc_attr( $menu_subtitle_link ); ?>" />
	    </div>
	</div>
	<?php
}
// add_action( 'wp_nav_menu_item_custom_fields', 'menu_item_desc', 10, 2 );

function save_menu_item_desc( $menu_id, $menu_item_db_id ) {
	if ( isset( $_POST['menu_subtitle'][$menu_item_db_id]  ) ) {
		$sanitized_data = sanitize_text_field( $_POST['menu_subtitle'][$menu_item_db_id] );
		update_post_meta( $menu_item_db_id, '_menu_subtitle', $sanitized_data );
	} else {
		delete_post_meta( $menu_item_db_id, '_menu_subtitle' );
	}

    if ( isset( $_POST['menu_subtitle_link'][$menu_item_db_id]  ) ) {
		$sanitized_data = sanitize_text_field( $_POST['menu_subtitle_link'][$menu_item_db_id] );
        update_post_meta( $menu_item_db_id, '_menu_subtitle_link', $sanitized_data );
	} else {
        delete_post_meta( $menu_item_db_id, '_menu_subtitle_link' );
	}
    
}
// add_action( 'wp_update_nav_menu_item', 'save_menu_item_desc', 10, 2 );

function show_menu_item_desc( $title, $item ) {
	if( is_object( $item ) && isset( $item->ID ) ) {
		$menu_subtitle = get_post_meta( $item->ID, '_menu_subtitle', true );
		if ( ! empty( $menu_subtitle ) ) {
			$title .= '<p class="menu-item-desc">' . $menu_subtitle . '</p>';
		}

        $menu_subtitle_link = get_post_meta( $item->ID, '_menu_subtitle_link', true );
        if ( ! empty( $menu_subtitle_link ) ) {
			$title .= '<p class="menu-item-desc">' . $menu_subtitle_link . '</p>';
		}
	}
	return $title;
}
// add_filter( 'nav_menu_item_title', 'show_menu_item_desc', 10, 2 );
*/
// Custom Menu Start 

add_action( 'wp_nav_menu_item_custom_fields', 'my_custom_fields', 10, 4 );

function my_custom_fields( $item_id, $item, $depth, $args ) {
    // Define the fields and their names
    $fields = [
        '_menu_subtitle' => 'Sub Title 1',
        '_menu_subtitle_link' => 'Subtitle Link 1',
        '_sub_title2' => 'Sub Title 2',
        '_sub_title_link2' => 'Subtitle Link 2',
        '_sub_title3' => 'Sub Title 3',
        '_sub_title_link3' => 'Subtitle Link 3',
        '_sub_title4' => 'Sub Title 4',
        '_sub_title_link4' => 'Subtitle Link 4',
        '_sub_title5' => 'Sub Title 5',
        '_sub_title_link5' => 'Subtitle Link 5',
        // Add more fields here
    ];

    // Loop through each field and create the input
    foreach ($fields as $field_key => $field_name) {
        $field_value = get_post_meta( $item_id, $field_key, true );
        ?>
        <p class="description description-wide">
            <label for="edit-menu-item-<?php echo $field_key; ?>-<?php echo $item_id; ?>">
                <?php echo $field_name; ?><br>
                <input type="text" id="edit-menu-item-<?php echo $field_key; ?>-<?php echo $item_id; ?>" name="menu-item-<?php echo $field_key; ?>[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $field_value ); ?>">
            </label>
        </p>
        <?php
    }
}

add_action( 'wp_update_nav_menu_item', 'my_custom_fields_update', 10, 3 );

function my_custom_fields_update( $menu_id, $menu_item_db_id, $menu_item_args ) {
    // Define the fields and their names
    $fields = [
        '_menu_subtitle',
        '_menu_subtitle_link',
        '_sub_title2',
        '_sub_title_link2',
        '_sub_title3',
        '_sub_title_link3',
        '_sub_title4',
        '_sub_title_link4',
        '_sub_title5',
        '_sub_title_link5',
        // Add more fields here
    ];

    // Loop through each field and save the data
    foreach ($fields as $field_key) {
        if ( isset( $_POST['menu-item-' . $field_key][$menu_item_db_id] ) ) {
            $field_value = $_POST['menu-item-' . $field_key][$menu_item_db_id];
            update_post_meta( $menu_item_db_id, $field_key, $field_value );
        }
    }
}

class Popup_Nav_Menu extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth, $args) {
        global $wp_query;
        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
         
        $class_names = $value = '';
 
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
 
        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
        $class_names = ' class="' . esc_attr( $class_names ) . '"';
 
        $output .= $indent . '<li id="menu-item-'. $item->ID . '"' . $value . $class_names .'>';
 
        $attributes = ! empty( $item->attr_title ) ? ' title="' . esc_attr( $item->attr_title ) .'"' : '';
        $attributes .= ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) .'"' : '';
        $attributes .= ! empty( $item->xfn ) ? ' rel="' . esc_attr( $item->xfn ) .'"' : '';
        $attributes .= ! empty( $item->url ) ? ' href="' . esc_attr( $item->url ) .'"' : '';
 
        $item_output = $args->before;
        $item_output .= '<a'. $attributes .'>';
        $item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
        if(!empty($item->description)) { 
            $item_output .= '<br /><span class="sub">' . $item->description . '</span>';    
        }
        $item_output .= '</a>';

        // if(!empty($item->_menu_subtitle)) {
        //     $item_output .= '<a href="'.$item->_menu_subtitle_link.'">';
        //     $item_output .= '<br /><span class="sub">' . $item->_menu_subtitle . '</span>';
        //     $item_output .= '</a>';
        // }

        // Define the fields and their names
        $fields = [
            '_menu_subtitle',
            '_menu_subtitle_link',
            '_sub_title2',
            '_sub_title_link2',
            '_sub_title3',
            '_sub_title_link3',
            '_sub_title4',
            '_sub_title_link4',
            '_sub_title5',
            '_sub_title_link5',
            // Add more fields here
        ];

        // Loop through each pair of fields and output the data
        for ($i = 0; $i < count($fields); $i += 2) {
            $sub_title_key = $fields[$i];
            $sub_title_link_key = $fields[$i + 1];
            
            if( $sub_title_key == $fields[0] ) {
                $ftext = "";
            } else {
                $ftext = "";
            }

            $sub_title = $item->$sub_title_key;
            $sub_title_link = $item->$sub_title_link_key;

            if (!empty($sub_title)) {
                $item_output .= $ftext.'<a href="' . esc_url( $sub_title_link ) . '"><span class="sub">' . esc_html( $sub_title ) . '</span></a>';
            }
        }
        // ... existing code ...

        $item_output .= $args->after;
 
        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
    
}


?>