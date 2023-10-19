<?php
/********************************************************************/
/********************************************************************/
/***************************   COMMON  ******************************/
/********************************************************************/
/********************************************************************/


/***************************************************************************/
//Mise en mémoire des scripts js et css pour utilisation dans le header
/***************************************************************************/
function initScripts(){
	//wp_register_style('font_pt','https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700');
	//wp_enqueue_style('font_pt');
	
	wp_register_style('raleway','https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900',array(),null,'all');
	wp_register_style('main_css',THEME_URI.'/dist/css/all.css?ver='.time(),array(),null,'all');
	wp_register_style('new_style',THEME_URI.'/dist/css/new_style.css?ver='.time(),array(),null,'all');
	wp_enqueue_style('main_css');
	wp_enqueue_style('new_style');
	wp_deregister_script('jquery');
	wp_deregister_script('wp-embed');
	
	//wp_enqueue_script('jquery',THEME_URI.'/dist/js/jquery.js', array(), '1.0.0', false );
	wp_enqueue_script('jquery','https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js', array(), '1.0.0', false );
	wp_enqueue_script('ggmap','https://maps.googleapis.com/maps/api/js?key=AIzaSyD8MU7ZoNxgYquI_TNQLAonz4pQLm5P2hE', array(), '1.0.0', false );
	
	wp_enqueue_script('main_js',THEME_URI.'/dist/js/all.js?ver='.time(), array(),null, true );
	
	// pass Ajax Url to script.js
	wp_localize_script('main_js', 'ajaxurl', admin_url( 'admin-ajax.php' ) );
}
add_action('wp_enqueue_scripts', 'initScripts');


/***************************************************************************/
//  CUSTOM LOGO ADMIN  
/***************************************************************************/
function my_login_logo() { ?>
    <style type="text/css">
		body.login{background:#eee;}
        body.login h1 a {background-image: url(<?php echo THEME_URI; ?>/dist/img/logo-black.png);background-repeat:no-repeat;background-size:100%;width:253px;height:25px;}
		body.login #nav a,.login #backtoblog a{color:#ff000;}
    </style>
<?php }
add_action( 'login_enqueue_scripts', 'my_login_logo' );


/***************************************************************************/
//  ADD OPTION PAGE
/***************************************************************************/
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
}


/***************************************************************************/
//  GESTION DES IMAGES   
/***************************************************************************/

if ( function_exists( 'add_image_size' ) ) {
    //add_image_size( 'slider',1440, 720 , true );
	add_image_size( 'thumb-paysage',480, 380 , true );
	add_image_size( 'thumb-paysage-big',800, 600 , true );
	add_image_size( 'thumb-wide',480, 320 , true );
	add_image_size( 'thumb-carre',380, 380 , true );
	add_image_size( 'thumb-carre-big',600, 600 , true );
	add_image_size( 'thumb-portrait',380, 480 , true );
	add_image_size( 'thumb-portrait-big',450, 600 , true );
}

add_filter('image_size_names_choose', 'my_image_sizes'); // le filtre qui permet d'ajouter la nouvelle taille au gestionnaire de médias
function my_image_sizes($sizes) {
	$addsizes = array(
		//"img-slider" => __( "Slider"),
		"thumb-paysage" => __( "Thumb Paysage"),
		"thumb-paysage-big" => __( "Thumb Paysage"),
		"thumb-wide" => __( "Thumb Wide"),
		"thumb-carre" => __( "Thumb carre"),
		"thumb-carre-big" => __( "Thumb carre big"),
		"thumb-portrait" => __( "Thumb Portrait"),
		"thumb-portrait-big" => __( "Thumb Portrait big"),
	);
	$newsizes = array_merge($sizes, $addsizes);
	return $newsizes;
}

/***************************************************************************/
//  ENREGISTREMENT DES MENUS  
/***************************************************************************/
register_nav_menus( array(
	'header' => 'Menu HEADER',
	'footer' => 'Menu FOOTER',
));
	
/***************************************************************************/
//   AJOUT IMAGES A LA UNE
/***************************************************************************/	
add_theme_support( 'post-thumbnails' ); 




/***************************************************************************/
//  FORM SEARCH 
/***************************************************************************/
function search_onestbarts(){
	echo '<form action="'.get_home_url().'" class="searchform clearfix" id="searchform" method="get" role="search">';
	echo '		<input type="text" id="s" name="s" value="" placeholder="'.__("Search anything","onestbarts").'">';
	echo '		<button type="submit"  id="searchsubmit"><i class="fa fa-search"></i></button>';
	echo '</form>';
}


function search_onestbarts_villa(){
	echo '<form action="'.get_home_url().'" class="searchform" id="searchformvilla" method="get" role="search">';
	echo '		<input type="text" id="svilla" name="s" value="" placeholder="'.__("Search a villa","onestbarts").'">';
	echo '		<input type="hidden" name="post_type" value="rental"/>';
	echo '		<button type="submit"  id="searchsubmitvilla"><i class="fa fa-search"></i></button>';
	echo '</form>';
}



/***************************************************************************/
//  WIDGET
/***************************************************************************/
function create_sidebar() {
	// Footer 1
	register_sidebar( array(
		'name' => __( 'Widget footer 1', 'Jchrisbard' ),
		'id' => 'footer-1',
		'before_title' => '<b class="widget-title">',
		'after_title' => '</b>',
	) );
	// Footer 2
	register_sidebar( array(
		'name' => __( 'Widget footer 2', 'Jchrisbard' ),
		'id' => 'footer-2',
		'before_title' => '<b class="widget-title">',
		'after_title' => '</b>',
	) );
	// Footer 3
	register_sidebar( array(
		'name' => __( 'Widget footer 3', 'Jchrisbard' ),
		'id' => 'footer-3',
		'before_title' => '<b class="widget-title">',
		'after_title' => '</b>',
	) );
}
add_action( 'widgets_init', 'create_sidebar' );



/* FILTER HTML */
function display_filter(){
	$locations = get_terms( 'location', array('hide_empty' => false,));
	$collections = get_terms( 'collection', array('hide_empty' => false,));
	
	/*echo '<pre style="background:black;position:absolute;top:0;left:0;z-index:20000;width:100%;">';
	print_r($locations);
	echo '</pre>';*/
	
	?>
	<div id="filter-date" class="filter-container" data-datearrival="<?php echo $_SESSION['booking']['arrivaldate']; ?>" data-datedeparture="<?php echo $_SESSION['booking']['departuredate']; ?>">
		<input type="text" name="input-arrival" id="input-arrival" placeholder="<?php echo $_SESSION['booking']['arrivaldate']; ?>" value="<?php echo $_SESSION['booking']['arrivaldate']; ?>"/>
		<span class="arrow"><img src="<?php echo THEME_URI; ?>/dist/img/arrow-right-black.png"/></span>
		<input type="text" name="input-departure" id="input-departure" placeholder="<?php echo $_SESSION['booking']['departuredate']; ?>" value="<?php echo $_SESSION['booking']['departuredate']; ?>"/>
	</div>
	<div id="filter-price" class="filter-container">
		<div id="slider-price" class="noUi-horizontal"></div>
		<div id="price-min">
			<?php echo $_SESSION['money_active_sigle']; ?>
			<span>0</span>
			<?php _e("/night", "onestbarts"); ?>
		</div>
		<div id="price-max">
			<?php echo $_SESSION['money_active_sigle']; ?>
			<span>10000</span>
			<?php _e("/night", "onestbarts"); ?>
		</div>
	</div>
	<div id="filter-bedrooms" class="filter-container">
		<select name="selectbedrooms[]" id="select-bedrooms" class="select2-multiple" multiple="multiple" data-placeholder="<?php _e("Bedroom(s)", "onestbarts"); ?>">
			<?php
				for($i=1;$i<11;$i++)
				{
					if(isset($_SESSION['booking']['nbbeds']) && $_SESSION['booking']['nbbeds'] == $i)
					{
						echo '<option value="'.$i.'" selected="selected">'.$i.' '.__("bedroom(s)","onestbarts").'</option>';
					}
					else{
						echo '<option value="'.$i.'">'.$i.' '.__("bedroom(s)","onestbarts").'</option>';
					}
				}
			?>
		<select>
	</div>
	<div id="filter-location" class="filter-container">
		<select name="selectlocation[]" id="select-location" class="select2-multiple" multiple="multiple" data-placeholder="<?php _e("Location(s)", "onestbarts"); ?>">
			<?php
				foreach($locations  as $key => $oL)
				{
					echo '<option value="'.$oL->slug.'">'. $oL->name.'</option>';
				}
			?>
		<select>
	</div>
	<div id="filter-collections" class="filter-container">
		<select name="selectcollections[]" id="select-collections" class="select2-multiple" multiple="multiple" data-placeholder="<?php _e("Collection(s)", "onestbarts"); ?>">
			<?php
				foreach($collections  as $key => $oC)
				{
					echo '<option value="'.$oC->slug.'">'. $oC->name.'</option>';
				}
			?>
		<select>
	</div>
	<div id="filter-validation" class="filter-container">
		<a href="#" title="<?php _e("Go","onestbarts"); ?>"><?php _e("Go","onestbarts"); ?></a>
	</div>
	<div id="filter-reset" class="filter-container">
		<a href="#" title="<?php _e("Reset","onestbarts"); ?>"><?php _e("Reset","onestbarts"); ?></a>
	</div>
	<?php
}



/***************************************************************************/
//  FUNCTION
/***************************************************************************/
// GET MIN PRICE OF THE BEDROOM
function get_min_price($id,$money){
	/*
	$fields=get_fields($id);
	$tabPrice= Array();
	$money=str_replace(' ','',$money);
	
	foreach($fields['villa_rates'] as $key => $oR)
	{
		foreach($oR['bedrooms_infos'] as $cle => $oP)
		{
			$tabPrice[]=$oP['price_'.$money];
		}
	}
	if(isset($money) && $money!='')
	{
		$res='<span class="sigle">'.$_SESSION['money'][$money].'</span>'.min($tabPrice);
	}
	else
	{
		$res='<span class="sigle">'.$_SESSION['money_active_sigle'].'</span>'.min($tabPrice);
	}
	*/
	
	$res='';
	$tabPrice=$_SESSION['ratestab'][$id];
	foreach($tabPrice['saison1'] as $key => $oP)
	{
		$tmp[]=$oP[$_SESSION['money_active_sigle']];
	}
	if(isset($money) && $money!='')
	{
		$res='<span class="sigle">'.$_SESSION['money'][$money].'</span>'.min($tmp);
	}
	else
	{
		$res='<span class="sigle">'.$_SESSION['money_active_sigle'].'</span>'.min($tmp);
	}
	return $res;
}

// GET MIN PRICE OF THE BEDROOM WITHOUT MONNAIE
function get_min_price_nb($id,$money){
	$res='';
	$tabPrice=$_SESSION['ratestab'][$id];
	foreach($tabPrice['saison1'] as $key => $oP)
	{
		$tmp[]=$oP[$_SESSION['money_active_sigle']];
	}
	$res=min($tmp);
	return $res;
}


// GET MAX PRICE OF THE BEDROOM WITHOUT MONNAIE
function get_max_price_nb($id,$money){
	$res='';
	$tabPrice=$_SESSION['ratestab'][$id];
	foreach($tabPrice['saison1'] as $key => $oP)
	{
		$tmp[]=$oP[$_SESSION['money_active_sigle']];
	}
	$res=max($tmp);
	return $res;
}

// GET MAX PRICE OF THE BEDROOM
function get_max_price($id,$money){
	/*
	$fields=get_fields($id);
	$tabPrice= Array();
	$money=str_replace(' ','',$money);
	
	foreach($fields['villa_rates'] as $key => $oR)
	{
		if($oR['rate_season']==$_SESSION['booking']['dates'][0]['season'].'season')
		{
			foreach($oR['bedrooms_infos'] as $cle => $oP)
			{
				$tabPrice[]=$oP['price_'.$money];
			}
		}
	}
	if(isset($money) && $money!='')
	{
		$res=$_SESSION['money'][$money].' '.max($tabPrice);
	}
	else
	{
		$res=$_SESSION['money_active_sigle'].max($tabPrice);
	}
	return $res;
	*/
	
	$res='';
	$tabPrice=$_SESSION['ratestab'][$id];
	foreach($tabPrice['lowseason'] as $key => $oP)
	{
		$tmp[]=$oP[$_SESSION['money_active_sigle']];
	}
	if(isset($money) && $money!='')
	{
		$res=$_SESSION['money'][$money].' '.max($tmp);
	}
	else
	{
		$res=$_SESSION['money_active_sigle'].max($tmp);
	}
	return $res;
}



// GET THE VILLAS
function get_villas(){
	$arg = array( 'post_type' => 'rental', 'posts_per_page' =>-1,'post_status'=>'publish','orderby' => 'date', 'order' => 'DESC'); 
	$ListeV= new WP_Query($arg);
	$villa=$ListeV->posts;
	return $villa;
}

function get_price_by_beds($id,$money){
	$fields=get_fields($id);
	$res= '';
	$money=str_replace(' ','',$money);
	
	$tabPrice=$_SESSION['ratestab'][$id];
	/*
	echo '<pre style="background:black">';
	print_r($tabPrice);
	echo '</pre>';	
	*/
	
	foreach($fields['villa_rates'] as $key => $oR)
	{
		if($oR['rate_season_type']==$_SESSION['booking']['dates'][0]['season'])
		{
			/*foreach($oR['bedrooms_infos'] as $cle => $oP)
			{
				if($oP['nb_bedrooms']==$_SESSION['booking']['nbbeds'])
				{
					$res='<span class="sigle">'.$_SESSION['money'][$money].'</span> '.$oP['price_'.$money];
				}
			}*/
			$res='<span class="sigle">'.$_SESSION['money'][$money].'</span> '.$tabPrice[$oR['rate_season_type']][$oR['nb_bedrooms']][$money];
			
		}
	}
	if($res=='')
	{
		$res=__("From","onestbarth").' '.get_min_price($id,$money);	
	}
	return $res;
}

function get_price_by_beds_nb($id,$money){
	
	$fields=get_fields($id);
	$res= '';
	$money=str_replace(' ','',$money);
	$tabPrice=$_SESSION['ratestab'][$id];
	
	foreach($fields['villa_rates'] as $key => $oR)
	{
		//echo $oR['rate_season'].' - '.$_SESSION['booking']['dates'][0]['season'].'season';
		//echo '<br/>';
		if($oR['rate_season_type']==$_SESSION['booking']['dates'][0]['season'])
		{
			foreach($oR['bedrooms_infos'] as $cle => $oP)
			{
				if($oP['nb_bedrooms']==$_SESSION['booking']['nbbeds'])
				{
					$res=$tabPrice[$oR['rate_season_type']][$oP['nb_bedrooms']][$money];
				}
			}
		}
	}
	if($res=='')
	{
		$res=get_min_price_nb($id,$money);	
	}
	return $res;
}


function createDateRangeArray()
{
	$aryRange=array();
	$arySeason=array();
	$iDateFrom=mktime(1,0,0,substr($_SESSION['booking']['arrivaldate'],5,2),substr($_SESSION['booking']['arrivaldate'],8,2),substr($_SESSION['booking']['arrivaldate'],0,4));
    $iDateTo=mktime(1,0,0,substr($_SESSION['booking']['departuredate'],5,2),substr($_SESSION['booking']['departuredate'],8,2),substr($_SESSION['booking']['departuredate'],0,4));
	unset($_SESSION['booking']['dates']);
	
	//var_dump($iDateTo.' versus '.$iDateFrom);
    if ($iDateTo>=$iDateFrom)
    {
		//$iDateTo=$iDateTo-86400;
        array_push($aryRange,date('Y-m-d',$iDateFrom)); // first entry
		$i=0;
        while ($iDateFrom<$iDateTo)
        {
            $iDateFrom+=86400; // add 24 hours
            array_push($aryRange,date('Y-m-d',$iDateFrom));
			$_SESSION['booking']['dates'][$i]['date']=date('Y-m-d',$iDateFrom);
			$_SESSION['booking']['dates'][$i]['season']=getSeasonByDay(date('Y-m-d',$iDateFrom));
			$i++;
        }
	}
	$_SESSION['booking']['nbdays']=count($_SESSION['booking']['dates']);
    return $aryRange;
}


function getPriceVilla()
{
	$villaRates=get_field('villa_rates',$_SESSION['booking']['idvilla']);
	/*echo '<pre>';
	print_r($villaRates);
	echo '</pre>';*/
	$price=0;
	
	$tabPrice=$_SESSION['ratestab'][$_SESSION['booking']['idvilla']];
	/*
	echo '<pre>';
	print_r($tabPrice);
	echo '</pre>';
	*/
	
	foreach($_SESSION['booking']['dates'] as $key => $oD)
	{
		foreach($villaRates as $key => $oR)
		{
			//echo $oR['rate_season'].'  -  '.$oD['season'].'season';
			//echo '<br/>';
			if($oR['rate_season_type']==$oD['season'])
			{
				foreach($oR['bedrooms_infos'] as $cle => $oP)
				{
					//echo $oP['nb_bedrooms'].' - '.$_SESSION['booking']['nbbeds'];
					//echo '<br/>';
					if($oP['nb_bedrooms']==$_SESSION['booking']['nbbeds'])
					{
						//echo 'price_'.str_replace(' ','',$_SESSION['money_active']);
						//echo '<br/>';
						//$price+=$oP['price_'.str_replace(' ','',$_SESSION['money_active'])];
						//echo 'aaaa'.$tabPrice[$oR['rate_season']][$oP['nb_bedrooms']][$_SESSION['money_active_sigle']];
						$price = $price + str_replace(' ','',$tabPrice[$oR['rate_season_type']][$oP['nb_bedrooms']][$_SESSION['money_active_sigle']]);
					}
				}
			}
		}
	}
	return $price;
}


function getSeasonByDay($day)
{
	$res='';
	foreach($_SESSION['season'] as $k => $oS)
	{
		//echo strtotime($day).' > '.strtotime($oS['date_debut']).' && '.strtotime($day).' < '.strtotime($oS['date_fin']);
		//echo '<br/>';
		if(strtotime($day) >= strtotime($oS['date_debut']) && strtotime($day) <= strtotime($oS['date_fin']))
		{
			$res=$oS['type_de_saison'];
			break;
		}
	}
	

	return $res;
}
?>