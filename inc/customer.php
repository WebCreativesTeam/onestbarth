<?php
//***************************************************************************/
// GESTION DES DROITS DES NONS ADMIN
/***************************************************************************/


// The following code will allow "Editors" to access the MailChimp for WordPress settings.
add_filter( 'mc4wp_admin_required_capability', function( $capability ) {
	return 'edit_pages';
});


function modify_capabilities() {
	/*$editor_role = get_role('editor');
	add_role('client', 'Client', $editor_role->capabilities);
	$owner_role = get_role('client');*/

	// Editor manage USERS
	$role = get_role('editor');
	$role->remove_cap('edit_theme_options');

}
//add_action('init','modify_capabilities');

// Pas d'update pour les non-admin
if (!current_user_can('update_plugins')) {
	add_action('admin_init', create_function(false,"remove_action('admin_notices', 'update_nag', 3);"));
}


/***************************************************************************/
// GESTION DES DROITS DES RH
/***************************************************************************/
$current_user = wp_get_current_user();
if(isset($current_user->roles) && !empty($current_user->roles))
{
	if($current_user->roles[0]=='editor')
	{
		// SUPP WIDGET DU DASHBOARD
		 function disable_default_dashboard_widgets() {
			//remove_meta_box('dashboard_right_now', 'dashboard', 'core');
			remove_meta_box('dashboard_recent_comments', 'dashboard', 'core');
			remove_meta_box('dashboard_incoming_links', 'dashboard', 'core');
			remove_meta_box('dashboard_plugins', 'dashboard', 'core');
			remove_meta_box('dashboard_quick_press', 'dashboard', 'core');
			remove_meta_box('dashboard_recent_drafts', 'dashboard', 'core');
			remove_meta_box('dashboard_primary', 'dashboard', 'core');			// Autres news WordPress
			remove_meta_box('dashboard_secondary', 'dashboard', 'core');			// News WordPress
		}
		add_action('admin_menu', 'disable_default_dashboard_widgets');
		
		// CAcher dashboadr infos
		function cache_dashbord_infos() {
			echo '<style type="text/css">#wpseo-dashboard-overview,#wp-admin-bar-new-content,#dashboard_activity,#toplevel_page_mailchimp-for-wp,.versions *,#footer-thankyou, #wpadminbar #wp-admin-bar-root-default #wp-admin-bar-comments, #wpadminbar #wp-admin-bar-root-default #wp-admin-bar-wpseo-menu, #wpadminbar #wp-admin-bar-root-default #wp-admin-bar-WPML_ALS,.table_discussion, .b.b-posts, .t.posts, .b.b_pages, .t.pages, .b.b-cats, .t.cats,.b.b-tags, .t.tags, #toplevel_page_wpseo_dashboard{display:none;}</style>';
		}
		add_action('admin_head', 'cache_dashbord_infos');
		
		
		// SUPPRIMER LES MENUS
		function custom_admin_menu() {
			global $menu;
			$restricted = array(__('Posts'),__('Tools'), __('Settings'), __('Comments'), __('Plugins'), __('Apparence'), __('MailChimp for WP'));
			end ($menu);
			while (prev($menu)) {
				$value = explode(' ',$menu[key($menu)][0]);
				if(in_array($value[0] != NULL?$value[0]:"" , $restricted)) {
					unset($menu[key($menu)]);
				}
			}
		}
		add_action('admin_menu', 'custom_admin_menu', 11);
	}
}
?>