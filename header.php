<!DOCTYPE html>

<?php /*echo"<pre style='background:#000;'>";
print_r($_SESSION);
echo"</pre>";*/?>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<title><?php wp_title( '|', true, 'right' );?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
		<link rel="icon" type="image/png" href="<?php echo THEME_URI; ?>/dist/img/favicon.png" />
		<?php wp_head(); ?>

		<!-- drop down css linkns  -->
		<!-- <link rel="stylesheet" type="text/css" href="<?php echo get_bloginfo('template_url');?>/dist/css/normalize.css" /> -->
		<!-- <link rel="stylesheet" type="text/css" href="<?php echo get_bloginfo('template_url');?>/dist/css/demo.css" /> -->
		<link rel="stylesheet" type="text/css" href="<?php echo get_bloginfo('template_url');?>/dist/css/cs-select.css" />
		<link rel="stylesheet" type="text/css" href="<?php echo get_bloginfo('template_url');?>/dist/css/cs-skin-border.css" />

	</head>
	<?php 
	// printf($_SESSION);
	?>
	<body <?php body_class(); ?> data-request-money="<?php echo $_SESSION['money_tab_flag']; ?>">

		<!-- MENU POPUP -->
		<div id="popup-menu">
			<a href="#" title="<?php _e("Menu", "onestbarts"); ?>" id="close-menu"><span></span><span></span></a>
			<div id="popup-menu-content">
				<a href="<?php echo get_home_url(); ?>/" title="<?php _e("Home", "onestbarts"); ?>" id="menu-logo">
					<img src="<?php echo THEME_URI; ?>/dist/img/logo-white.png" alt="Onestbarts"/>
				</a>
				<?php 
				$walker = new Popup_Nav_Menu;
				wp_nav_menu( array('theme_location' => 'header','menu_class'=> 'clearfix', 'walker' => $walker) ); 
				
				?>
				<div id="search-onestbarts">
					<?php echo search_onestbarts(); ?>
				</div>
				<div id="menu-footer">
					<div id="menu-footer-top">
						<?php _e("Stay in distinctive private homes", "onestbarts"); ?><br/>
						<?php _e("with an unprecedented level of service and care.", "onestbarts"); ?>				
					</div>
					<div id="menu-footer-bottom">
						T: <a href="tel:+590690555000" title="+590 690 56 04 26">+590 690 56 04 26</a> |
						E: <a href="mailto:home@onestbarts.com" title="home@onestbarts.com">home@onestbarts.com</a>
					</div>
				</div>
			</div>
		</div>
	
		<header id="header" role="banner">	
			<div id="header-sticky" class="active">
				<a href="#" title="<?php _e("Menu", "onestbarts"); ?>" id="open-menu" class="active"><span></span><span></span><span></span></a>
				<a href="<?php echo get_home_url(); ?>/" title="<?php _e("Home", "onestbarts"); ?>" id="header-logo" class="active">
					<?php /* <img src="<?php echo THEME_URI; ?>/dist/img/logo-black.png" alt="Onestbarts"/> */ ?>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 68"><path d="M98.6 13c-.8 0-1.5.7-1.5 1.5V52c-3.8-3.8-11.4-11.2-20.5-18.6C58.9 19.2 44.1 12 32.6 12c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5c11.5 0 20.9 9.4 20.9 20.9s-9.4 20.9-20.9 20.9-20.9-9.4-20.9-20.9c0-.8-.7-1.5-1.5-1.5s-1.4.6-1.4 1.4c0 13.2 10.7 23.9 23.9 23.9S56.5 49 56.5 35.8c0-6.2-2.4-11.9-6.3-16.1 22.9 10.9 47 36.7 47.3 37 .4.5 1.1.6 1.6.4.6-.2 1-.8 1-1.4V14.5c0-.8-.7-1.5-1.5-1.5zm46.7 41.8h-27.7V37.2h5.8c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-5.8V16.9h27.1c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-30.1v20.3h-5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5v20.6h30.7c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5zm55.4-16.7c-1.5-.9-3.3-1.6-5.4-2.2-2.1-.6-4.4-1.1-6.9-1.5-2.5-.5-4.6-.9-6.4-1.4-1.7-.5-3.2-1-4.3-1.7-1-.6-1.8-1.4-2.3-2.2-.5-.9-.7-2-.7-3.3 0-2.8 1-5 3.1-6.6 2.1-1.7 5.7-2.5 10.6-2.5 2.6 0 4.9.3 6.8 1 1.8.6 3.6 1.8 5.3 3.6.1.2.4.2.6.2.2 0 .4-.1.5-.3l.9-1.2c.2-.3.2-.7-.1-1-1.9-1.9-4-3.3-6.3-4.1-2.2-.8-4.9-1.2-7.9-1.2-5 0-9.1 1-12.1 3-3.1 2.1-4.7 5.1-4.7 9 0 1.9.4 3.5 1.1 4.8.7 1.3 1.8 2.4 3.2 3.2 1.4.8 3.1 1.5 5.1 2.1 2 .5 4.2 1 6.8 1.5 2.6.5 4.8 1 6.7 1.5 1.8.5 3.4 1.2 4.5 1.9s2 1.6 2.5 2.5c.5 1 .8 2.1.8 3.5 0 2.9-1.2 4.9-3.6 6.3-2.5 1.4-5.9 2.2-10.1 2.2-3.4 0-6.5-.5-9.1-1.5-2.6-1-5-2.5-7.2-4.6-.3-.3-.8-.3-1 0l-1.1 1.1c-.1.1-.2.3-.2.6s.1.4.3.5c2.6 2.2 5.4 3.9 8.3 5 2.9 1.1 6.3 1.7 10 1.7 5.1 0 9.3-1 12.2-2.9 3.1-2 4.6-4.9 4.6-8.6 0-2-.4-3.7-1.2-5.1-.6-1.3-1.8-2.4-3.3-3.3zm46-24.2h-36.3c-.4 0-.8.3-.8.8v1.6c0 .4.3.8.8.8H227v39.3c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V17h16.6c.4 0 .8-.3.8-.8v-1.6c0-.4-.3-.7-.7-.7zm195.1 0h-36.3c-.4 0-.8.3-.8.8v1.6c0 .4.3.8.8.8h16.7V57c0 .4.3.8.8.8h1.6c.4 0 .8-.3.8-.8V17H442c.4 0 .8-.3.8-.8v-1.6c-.3-.4-.6-.7-1-.7zm39.1 27.6c-.8-1.4-2-2.5-3.6-3.4-1.5-.9-3.3-1.6-5.4-2.2-2.1-.6-4.4-1.1-6.9-1.5-2.5-.5-4.6-.9-6.4-1.4-1.7-.5-3.2-1-4.3-1.7-1-.6-1.8-1.4-2.3-2.2-.5-.9-.7-2-.7-3.3 0-2.8 1-5 3.1-6.6 2.1-1.7 5.7-2.5 10.6-2.5 2.6 0 4.9.3 6.8 1 1.8.6 3.6 1.8 5.3 3.6.1.2.4.2.6.2.2 0 .4-.1.5-.3l.9-1.2c.2-.3.2-.7-.1-1-1.9-1.9-4-3.3-6.3-4.1-2.2-.8-4.9-1.2-7.9-1.2-5 0-9.1 1-12.1 3-3.1 2.1-4.7 5.1-4.7 9 0 1.9.4 3.5 1.1 4.8.7 1.3 1.8 2.4 3.2 3.2 1.4.8 3.1 1.5 5.1 2.1 2 .5 4.2 1 6.8 1.5 2.6.5 4.8 1 6.7 1.5 1.8.5 3.3 1.2 4.5 1.9 1.1.7 2 1.6 2.5 2.5.5 1 .8 2.1.8 3.5 0 2.9-1.2 5-3.6 6.3-2.5 1.4-5.9 2.2-10.1 2.2-3.4 0-6.5-.5-9.1-1.5-2.6-1-5-2.5-7.2-4.6-.3-.3-.8-.3-1 0l-1.1 1.1c-.1.1-.2.3-.2.6s.1.4.3.5c2.6 2.2 5.4 3.9 8.3 5 2.9 1.1 6.3 1.7 10 1.7 5.1 0 9.3-1 12.2-2.9 3.1-2 4.6-4.9 4.6-8.6.4-1.9 0-3.6-.9-5zM339 14.3c-.1-.3-.4-.4-.7-.4h-1.4c-.3 0-.6.2-.7.4l-19.9 42.4c-.1.2-.1.5 0 .7s.4.3.6.3h1.7c.3 0 .6-.2.7-.4l7.1-15 .5-1.4 10.5-22.3 10.5 22.3.6 1.5 7 14.9c.1.3.4.4.7.4h1.7c.3 0 .5-.1.6-.3s.2-.5 0-.7L339 14.3zm57.9 22.4c1.1-1.2 1.9-2.6 2.5-4.2.6-1.5.9-3.2.9-4.9 0-1.7-.3-3.3-1-5-.7-1.6-1.6-3.1-2.9-4.4-1.2-1.3-2.7-2.3-4.3-3.1-1.7-.8-3.5-1.2-5.5-1.2h-18.7c-.4 0-.8.3-.8.8V57c0 .4.3.8.8.8h1.6c.4 0 .8-.3.8-.8V17h16.3c1.5 0 2.9.3 4.2.9 1.3.6 2.4 1.4 3.4 2.4s1.7 2.2 2.2 3.4c.5 1.3.8 2.6.8 3.9 0 1.3-.2 2.6-.7 3.9-.5 1.3-1.2 2.4-2.1 3.4-.9 1-1.9 1.8-3.2 2.4-1.1.5-2.3.8-3.7.9h-2.7c-.1 0-.2 0-.3.1h-.1c-.1 0-.1.1-.2.1h-.1c-.1.1-.1.1-.1.2v.4c0 .1.1.1.1.2l1.4 1.5L397 57.5c.1.2.4.3.6.3h1.9c.3 0 .5-.2.7-.4.1-.2.1-.5 0-.8L389.3 41c1.3-.2 2.6-.7 3.7-1.2 1.5-.8 2.8-1.9 3.9-3.1zm-89 2.3c-1.3-1.7-2.9-2.9-4.9-3.8 1.4-.8 2.6-2 3.5-3.3 1.3-1.9 1.9-4 1.9-6.3 0-1.4-.3-2.8-.8-4.2-.5-1.4-1.2-2.6-2.2-3.7-1-1.1-2.1-2-3.5-2.7-1.4-.7-3-1-4.7-1h-20.4c-.4 0-.8.3-.8.8v42.4c0 .4.3.8.8.8H298c1.7 0 3.3-.3 4.8-.9 1.5-.6 2.8-1.5 3.9-2.6s2-2.3 2.6-3.7c.6-1.4 1-2.9 1-4.6.1-2.7-.8-5.1-2.4-7.2zm-1.3 10.3c-.5 1.1-1.1 2-2 2.8-.8.8-1.8 1.5-2.9 2-1.1.5-2.3.8-3.6.8h-18.9V17.1h17.9c1.2 0 2.3.2 3.3.7 1 .5 1.9 1.1 2.6 1.9.7.8 1.3 1.7 1.7 2.8.4 1 .6 2.1.6 3.3 0 1-.2 2.1-.6 3.1-.4 1-1 2-1.8 2.8-.7.8-1.7 1.4-2.7 2-1 .5-2.2.7-3.4.7-.4 0-.7.3-.7.8v1.5c0 .4.3.8.8.8h1.8c1.2 0 2.4.2 3.5.7 1.1.5 2 1.1 2.8 2 .8.8 1.4 1.8 1.8 2.8.4 1.1.7 2.2.7 3.3-.2.9-.5 2-.9 3zm-52-16.1c-2.6 0-4.8 2.1-4.8 4.8s2.1 4.8 4.8 4.8 4.8-2.1 4.8-4.8-2.2-4.8-4.8-4.8zm0 7.5c-1.5 0-2.8-1.2-2.8-2.8s1.2-2.8 2.8-2.8 2.8 1.2 2.8 2.8-1.3 2.8-2.8 2.8z"/></svg>
				</a>
				<div id="sticky-search">
					<?php echo search_onestbarts_villa(); ?>
					<div id="search-results"></div>
				</div>
				
				<div id="header-sticky-right">
					<?php
						if(is_single())
						{
							$idV=get_the_ID();
							?>
							<a href="#" title="<?php _e("Search", "onestbarts"); ?>" id="open-search" class="active"><i class="fa fa-search"></i></a>
							<a href="#" title="<?php _e("Close search", "onestbarts"); ?>" id="close-search"><span></span><span></span></a>
							<a href="<?php echo get_permalink(212); ?>" title="<?php _e("View favorite", "onestbarts"); ?>" id="view-favorite">
								<i class="fa fa-heart"></i>
								<span><?php echo count($_SESSION['favorite']); ?></span>
							</a>
							<?php	
								if(!in_array($idV,$_SESSION['favorite']))
								{
									echo '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav borderLeft active" data-id="'.$idV.'"><i class="fa fa-heart"></i></a>';
									echo '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav borderLeft" data-id="'.$idV.'"><i class="fa fa-heart"></i></a>';
								}
								else
								{
									echo '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav borderLeft" data-id="'.$idV.'"><i class="fa fa-heart"></i></a>';
									echo '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav borderLeft active" data-id="'.$idV.'"><i class="fa fa-heart"></i></a>';
								}
							if(get_post_type()=='suggestion')
							{
								$fields=get_fields(get_the_ID());	
								// SI LES DATES ET NB CHAMBRES SONT RENSEIGNES
								if(isset($fields['suggestion_arrival_date']) && $fields['suggestion_arrival_date']!=''){
									$_SESSION['booking']['arrivaldate']=$fields['suggestion_arrival_date'];
								}
								if(isset($fields['suggestion_departure_date']) && $fields['suggestion_departure_date']!=''){
									$_SESSION['booking']['departuredate']=$fields['suggestion_departure_date'];
								}
								if(isset($fields['nb_bedrooms']) && $fields['nb_bedrooms']!=''){
									$_SESSION['booking']['nbbeds']=$fields['nb_bedrooms'];
								}
								?>
									<div id="header-date">
										<span><?php _e("From", "onestbarts"); ?></span>
										<span id="header-date-from"><?php echo $_SESSION['booking']['arrivaldate']; ?></span>
										<span><?php _e("To", "onestbarts"); ?></span>
										<span id="header-date-to"><?php echo $_SESSION['booking']['departuredate']; ?></span>
									</div>
									<a href="#" title="<?php _e("Open filter", "onestbarts"); ?>" id="open-filter"><i class="fa fa-sliders"></i></a>
								<?php
							}
							else
							{
								$file = get_field('pdf_upload');
								?>
								
								<a href="<?php echo $file['url']; ?>" title="<?php _e("Download as PDF", "onestbarts"); ?>" id="open-pdf" class="borderLeft" target="_blank"><i class="fa fa-file-pdf-o"></i></a>
								<a href="#" title="<?php _e("Book", "onestbarts"); ?> <?php the_title();?>" class="book-villa booking-inquire"><?php _e("Book", "onestbarts"); ?> <span><?php the_title();?></span></a>
								<?php
							}
						}
						else
						{
							if(is_front_page())
							{
								?>
								<a href="#" title="<?php _e("Search", "onestbarts"); ?>" id="open-search" class="active"><i class="fa fa-search"></i></a>
								<a href="#" title="<?php _e("Close search", "onestbarts"); ?>" id="close-search"><span></span><span></span></a>
								<a href="#" title="<?php _e("Book your stay", "onestbarts"); ?>" id="open-booking" class="open-booking"><?php _e("Book your stay", "onestbarts"); ?></a>
								<?php	
							}
							else
							{
								?>
								<a href="#" title="<?php _e("Search", "onestbarts"); ?>" id="open-search" class="active"><i class="fa fa-search"></i></a>
								<a href="#" title="<?php _e("Close search", "onestbarts"); ?>" id="close-search"><span></span></a>
								<a href="<?php echo get_permalink(212); ?>" title="<?php _e("View favorite", "onestbarts"); ?>" id="view-favorite">
									<i class="fa fa-heart"></i>
									<span><?php echo count($_SESSION['favorite']); ?></span>
								</a>
								<div id="header-date" class="open-booking">
									<span><?php _e("From", "onestbarts"); ?></span>
									<span id="header-date-from"><?php echo $_SESSION['booking']['arrivaldate']; ?></span>
									<span><?php _e("To", "onestbarts"); ?></span>
									<span id="header-date-to"><?php echo $_SESSION['booking']['departuredate']; ?></span>
								</div>
								<a href="#" title="<?php _e("Open filter", "onestbarts"); ?>" id="open-booking2" class="open-filter"><i class="fa fa-sliders"></i></a>
								<?php
							}
							
							/*
							// LISTING || FAVORITE  
							if(get_the_ID() == 170 || get_the_ID() == 212)
							{
								?>
								<a href="#" title="<?php _e("Search", "onestbarts"); ?>" id="open-search"><i class="fa fa-search"></i></a>
								<a href="<?php echo get_permalink(212); ?>" title="<?php _e("View favorite", "onestbarts"); ?>" id="view-favorite">
									<i class="fa fa-heart"></i>
									<span><?php echo count($_SESSION['favorite']); ?></span>
								</a>
								<div id="header-date">
									<span><?php _e("From", "onestbarts"); ?></span>
									<span id="header-date-from"><?php echo $_SESSION['booking']['arrivaldate']; ?></span>
									<span><?php _e("To", "onestbarts"); ?></span>
									<span id="header-date-to"><?php echo $_SESSION['booking']['departuredate']; ?></span>
								</div>
								<a href="#" title="<?php _e("Open filter", "onestbarts"); ?>" id="open-filter"><i class="fa fa-sliders"></i></a>
								<?php
							}
							else
							{
							?>
								<a href="#" title="<?php _e("Book your stay", "onestbarts"); ?>" id="open-booking" class="open-booking"><?php _e("Book your stay", "onestbarts"); ?></a>
							<?php
							}
							*/
						}
					?>
				</div>
			</div>
		</header>