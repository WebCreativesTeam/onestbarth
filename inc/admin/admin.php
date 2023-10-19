<?php
//ADMIN
// Add scripts and styles to backend
if( is_admin() ){
	add_action('admin_enqueue_scripts', 'theme_backend_asset_files');
}

	
// Add scripts & styles to backend
function theme_backend_asset_files() 
{
	global $pagenow;

	wp_register_style('admin', THEME_URI.'/inc/admin/assets/css/admin.css', false, THEME_VERSION, 'screen');
	wp_register_script('admin-main', THEME_URI.'/inc/admin/assets/js/main.js', array('jquery'), THEME_VERSION, false );

	if($pagenow == 'admin.php' ) { wp_enqueue_media(); }
	wp_enqueue_style('admin');
	wp_enqueue_script('admin-main');
}	


/*** Admin CONTACT
*************************************/
if( is_admin() ){
	add_action('admin_menu', 'admin_message', 9);
}

function admin_message()
{
	add_menu_page('Forms', __('Forms',  'Jchrisbard'), 'moderate_comments', 'forms', 'load_theme_pages',  THEME_URI . '', 58);
	add_menu_page('Villa Rates', __('Villa Rates',  'Jchrisbard'), 'moderate_comments', 'villa_rates', 'load_theme_pages',  THEME_URI . '', 59);
}

//dashicons-email

// This function be used for load theme pages.
if ( !function_exists('load_theme_pages') )
{
	function load_theme_pages() 
	{
		$page = include(THEME_DIR . '/inc/admin/' . $_GET['page']. '.php');
		if($page['auto'])
		{
			new theme_options_generator($page['name'],$page['options']);
		}
	}
}

// Theme options class--loads the default theme options.
if ( !class_exists('theme_options') )
{
	/*class theme_options
	{
		function theme_init_options() {
			global $theme_options;
			$theme_options = array();
			$option_files = array(
				'phsg',
				'quartiers',
			);
			foreach($option_files as $file){
				$page = include (THEME_DIR . '/inc/admin/' . $file.'.php');
				$theme_options[$page['name']] = array();
				foreach($page['options'] as $option) {
					if (isset($option['std'])) {
						$theme_options[$page['name']][$option['id']] = $option['std'];
					}
				}
				$theme_options[$page['name']] = array_merge((array) $theme_options[$page['name']], (array) get_option('theme_' .THEME_SLUG . '_' . $page['name']));
			}
		}
	}
	$load_theme_options = new theme_options();
	$load_theme_options->theme_init_options();
	*/
}

function get_theme_option($page, $name = NULL) 
{
	global $theme_options;
	if ($name == NULL) {
		if (isset($theme_options[$page])) {
			return $theme_options[$page];
		} else {
			return false;
		}

	} else {
		if (isset($theme_options[$page][$name])) {
			return $theme_options[$page][$name];
		} else {
			return false;
		}
	}
}

?>