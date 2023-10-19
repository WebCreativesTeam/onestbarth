<?php get_header(); ?>
<?php 
	$idPage=get_the_ID();
	$fields=get_fields($idPage);
	if(isset($_GET['debug']))
	{
		echo '<pre style="background:black;osition:absolute;top:0;z-index:100000000;">';
		print_r($fields);
		echo '</pre>';	
	}
	
	// SESSION DATES
	createDateRangeArray();
	
	$villas=$fields['suggestion_villas'];
	$nbNights=count($_SESSION['booking']['dates']);
	$number_of_cards = count($cards);
	$vilastring='';
	foreach($villas as $key => $oV)
	{
		$vilastring .= $oV['villa']->ID.'|';
	}
	$villastring=substr($vilastring,0, strlen($vilastring)-1);


	
	
	// echo '<pre style="position:absolute;width:100%;background:black;z-index:2000;">';
	// print_r($_SESSION['ratestab']);
	// echo '</pre>';
	
?>
<div id="suggestion">
	<div id="suggestion-header" style="background-image:url(<?php echo $fields['suggestion_bg']['url']; ?>);">
		<div id="suggestion-header-content">
			 <!-- <div class="suggestion-logo"><img src="<?php echo THEME_URI; ?>/dist/img/logo-white-new.png" alt="Onestbarts"/> </div> -->
			<?php    ?>
			<h1><?php echo $fields['suggestion_title']; ?></h1>
			<p>
				<?php _e("Displaying <span id='nbresults'>".count($villas)."</span> hand-picked homes. Tentative Traveling Dates:", "onestbarts"); ?>
				<?php echo $fields['suggestion_arrival_date']; ?> <?php _e("to", "onestbarts"); ?> <?php echo $fields['suggestion_departure_date']; ?>
			</p>
		</div>
	</div>
	
	
	<!-- SUGGESTION CONTENT-->
	<div id="suggestion-content">
	
		<!-- SUGGESTION MAP-->
		<div id="suggestion-map">
			<div id="ggmap"></div>
		</div>
		
		
		<div id="suggestion-villas">
			<div class="container">
				<!-- SUGGESTION MAP-->
				<div id="suggestion-villa-filter">
					<div id="suggestion-villa-filter-left">
						<?php /* <a href="#" title="<?php _e("Open filter", "onestbarts"); ?>" id="open-filter-2"><i class="fa fa-sliders"></i></a> */ ?>
						<select id="filter-tri" name="filter-tri" data-villa="<?php echo $villastring; ?>">
							<option value="recommended"><?php _e("Recommended", "onestbarts"); ?></option>
							<option value="prixmin"><?php _e("Prix Min/Max", "onestbarts"); ?></option>
							<option value="prixmax"><?php _e("Prix Max/Min", "onestbarts"); ?></option>
							<option value="nameASC"><?php _e("Name (A - Z)", "onestbarts"); ?></option>
							<option value="nameDESC"><?php _e("Name (Z - A)", "onestbarts"); ?></option>
						</select>
					</div>

					<div id="suggestion-villa-filter-right">
						<select id="filter-money" name="filter-money" autocomplete="off" >
							<?php
								foreach($_SESSION['money'] as $name => $sigle){
									if($name == $_SESSION['money_active'])
									{
										echo '<option value="'.str_replace(' ','-',$name).'" selected="selected">'.strtoupper($sigle).'</option>';
									}
									else
									{
										echo '<option value="'.str_replace(' ','-',$name).'">'.strtoupper($sigle).'</option>';
									}
								}
							?>
						</select>
						<a href="#" title="<?php _e("Map mode", "onestbarts"); ?>" id="open-map" class="active"><?php _e("Map mode", "onestbarts"); ?></a>
						<a href="#" title="<?php _e("Grid mode", "onestbarts"); ?>" id="open-grid"><?php _e("Grid mode", "onestbarts"); ?></a>
					</div>
				</div>
<?php 

?>				
				<!-- SUGGESTION MAP-->
				<div id="suggestion-villa-content">
					<?php
						$i=0;
						foreach($villas as $key => $oV)
						{
							$tabPrice=array();
							$tmpTabPrice=$_SESSION['ratestab'][$oV['villa']->ID][$_SESSION['booking']['dates'][0]['season']];
							for($j = 20; $j >= $_SESSION['booking']['nbbeds']; $j--)
							{
								if(!empty($tmpTabPrice[$j]))
								{
									$tabPrice=$tmpTabPrice[$j];
								}	
							}
							/*
							echo '<pre style="position:absolute;width:100%;background:black;z-index:2000;">';
							print_r($tabPrice);
							echo '</pre>';
							*/
							$img = wp_get_attachment_image_src(get_post_thumbnail_id($oV['villa']->ID),'thumb-paysage-big');
							$metas=get_post_meta($oV['villa']->ID);
							echo '<article class="card" id="card-'.$oV['villa']->ID.'" data-idmarker="'.$i.'" data-link="'.get_permalink($oV['villa']->ID).'" data-latitude="'.$metas['villa_latitude'][0].'" data-longitude="'.$metas['villa_longitude'][0].'" data-title="'.$oV['villa']->post_title.'" data-img="'.$img[0].'" data-bedrooms="'.$metas['villa_bedrooms'][0].'"   data-pools="'.$metas['villa_pools'][0].'" data-location="'.$metas['villa_address'][0].'">';
							echo '	<div class="link-villa">';
							echo '		<div class="bg" style="background-image:url('.$img[0].');"></div>';
							echo '		<div class="bg-over"></div>';
							echo '		<div class="card-content">';
							echo '			<div class="card-content-left">';
							echo '				<b>'.$oV['villa']->post_title.'</b>';
							echo '				<p class="infos">'.$metas['villa_address'][0].', '.$metas['villa_bedrooms'][0].' '.__("bedroom(s)","onestbarts").'</p>';
							echo '				<p class="description">'.$oV['villa']->post_excerpt.'<a href="'.get_permalink($oV['villa']->ID).'" title="'.$oV['villa']->post_title.'"><img src="'.THEME_URI.'/dist/img/arrow-long.png"/></a></p>';
							echo '			</div>';
							echo '			<div class="card-content-right">';
							
							foreach($_SESSION['money'] as $name => $sigle){
								$priceTmp=$tabPrice[$sigle];
								
								if($name == $_SESSION['money_active'])
								{
									// echo '<b class="'.str_replace(' ','-',$name).' active">'.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
									// echo '<em class="'.str_replace(' ','-',$name).' active">'.__("Total","onestbarts").': '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
								}
								else
								{
									echo '<b class="'.str_replace(' ','-',$name).'">'.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
									echo '<em class="'.str_replace(' ','-',$name).'">'.__("Total","onestbarts").': '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
								}
							}
							
							
							echo '			</div>';
							echo '		</div>';
							echo '	</div>';
							echo '	<div class="comments-villa">';
							echo '		<p><b>'.__("Comments", "onestbarts").'</b><span>'.$oV['comments'].'</span></p>';
							echo '	</div>';
								foreach($_SESSION['money'] as $name => $sigle){
									$subtotal = str_replace(' ','',get_price_by_beds_nb($oV['villa']->ID,$_SESSION['money_active_sigle'])) * $nbNights;
									if($name == $_SESSION['money_active'])
									{
										echo '	<div class="total-villa total-'.str_replace(' ','-',$name).' active">';
										echo '		<p><b>'.__("Subtotal", "onestbarts").'</b><span>'.$sigle.' '.number_format($subtotal ,0,'.',' ').'</span></p>';
										echo '		<p><b>'.__("Total", "onestbarts").'</b><span>'.$sigle.' '.number_format($subtotal * 1.15,0,'.',' ').'</span></p>';
										echo '		<em>'.__("Services Charge (10%) + Government tax (5%)", "onestbarts").'</em>';
										echo '	</div>';
									}
									else
									{
										echo '	<div class="total-villa total-'.str_replace(' ','-',$name).'">';
										echo '		<p><b>'.__("Subtotal", "onestbarts").'</b><span>'.$sigle.' '.number_format($subtotal ,0,'.',' ').'</span></p>';
										echo '		<p><b>'.__("Total", "onestbarts").'</b><span>'.$sigle.' '.number_format($subtotal * 1.15,0,'.',' ').'</span></p>';
										echo '		<em>'.__("Services Charge (10%) + Government tax (5%)", "onestbarts").'</em>';
										echo '	</div>';
									}
								}
							//echo '	<div class="inquire-villa">';
							//echo '		<a href="#" title="'.__(Inquire now, "onestbarts").'" class="inquire-now" data-id="'.$oV['villa']->ID.'"><span>'.__("Inquire now", "onestbarts").'</span><i class="fa fa-spinner"></i></a>';
							//echo '	</div>';
								if(!in_array($oV['villa']->ID,$_SESSION['favorite']))
								{
									echo '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav active" data-id="'.$oV['villa']->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
									echo '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav" data-id="'.$oV['villa']->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
								}
								else
								{
									echo '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav" data-id="'.$oV['villa']->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
									echo '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav active" data-id="'.$oV['villa']->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
								}
							echo '<a href="#" id="booking-inquire" title="Inquire now" class="booking-inquire">Inquire now</a>

							</article>';
							$i++;
						}
					?>
				</div>
			</div>
		</div>
	</div>
</div>
<?php get_footer(); ?>