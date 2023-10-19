 <?php
/*
Template Name: Template - Listing Rental - old
*/
?>
<?php get_header(); ?>
<?php
	
	$idPage=get_the_ID();
	$fields=get_fields($idPage);
	
	// GET VILLA BY COLLLECTION
	wp_reset_query();
	if(isset($_SESSION['booking']['nbbeds']) && $_SESSION['booking']['nbbeds']!='')
	{
		$arg = array(
			'post_type' => 'rental', 
			'meta_query' => array(
				array(
					'key' => 'villa_bedrooms',
					'value' => $_SESSION['booking']['nbbeds'],
					'compare' => '>=')
			),
			'posts_per_page' =>-1,
			'post_status'=>'publish',
			'orderby' => 'date',
			'order' => 'DESC'
		); 
	}
	else
	{
		$arg = array(
			'post_type' => 'rental', 
			'posts_per_page' =>-1,
			'post_status'=>'publish',
			'orderby' => 'date',
			'order' => 'DESC'
		); 
	}
	$ListeV= new WP_Query($arg);
	$villas=$ListeV->posts;
	$nbNights=count($_SESSION['booking']['dates']);

	/*
	echo '<pre style="background:black;position:absolute;top:0;left:0;z-index:20000;width:100%;">';
	print_r($_SESSION['booking']);
	echo '</pre>';
	*/
?>
<!-- LISTING -->
<div id="listing" class="listing">

	<!-- FILTER -->
	<div id="listing-filter">
		<?php echo display_filter(); ?>
	</div>

	<div id="listing-header" style="background-image:url(<?php echo $fields['rental_bg']['url']; ?>);">
		<div id="listing-header-content">
			<?php /*<img src="<?php echo THEME_URI; ?>/dist/img/logo-white.png" alt="Onestbarts"/>*/ ?>
			<h1><?php echo $fields['rental_title']; ?></h1>
			<p>
				<?php _e("Displaying", "onestbarts"); ?>
				<span id="nbresults"><?php echo count($villas); ?> </span>
				<?php _e("hand-picked homes in your search", "onestbarts"); ?>.
			</p>
		</div>
	</div>
	
	
	<!-- LISTING CONTENT-->
	<div id="listing-content" class="">
	
		<!-- LISTING MAP-->
		<div id="listing-map">
			<div id="ggmap"></div>
		</div>
		<div id="listing-villas">
			<div class="container">
	
	
	
				<!-- LISTING MAP-->
				<div id="listing-villa-filter">
					<?php //echo display_filter(); ?>
					<div id="listing-villa-filter-left">
						<?php /* <a href="#" title="<?php _e("Open filter", "onestbarts"); ?>" id="open-filter-2"><i class="fa fa-sliders"></i></a>*/ ?>
						<select id="filter-tri" name="filter-tri">
							<option value="recommended"><?php _e("Recommended", "onestbarts"); ?></option>
							<option value="prixmin"><?php _e("Prix Min/Max", "onestbarts"); ?></option>
							<option value="prixmax"><?php _e("Prix Max/Min", "onestbarts"); ?></option>
							<option value="nameASC"><?php _e("Name (A - Z)", "onestbarts"); ?></option>
							<option value="nameDESC"><?php _e("Name (Z - A)", "onestbarts"); ?></option>
						</select>
					</div>

					<div id="listing-villa-filter-right">
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
				
				<!-- LISTING MAP-->
				<div id="listing-villa-content">
					<?php
					if(!empty($villas))
					{
					
						$i=0;
						foreach($villas as $key => $oV)
						{
							$tabPrice=array();
							$from=false;
							if(count($_SESSION['booking']['dates']) == 1)
							{
								$tmpTabPrice=$_SESSION['ratestab'][$oV->ID]['saison1'];
								$from=true;
							}
							else{
								$tmpTabPrice=$_SESSION['ratestab'][$oV->ID][$_SESSION['booking']['dates'][0]['season']];
							}
							for($j = 20; $j >= $_SESSION['booking']['nbbeds']; $j--)
							{
								if(!empty($tmpTabPrice[$j]))
								{
									$tabPrice=$tmpTabPrice[$j];
								}	
							}
							
							/*
							echo '<pre style="background:black;top:0;left:0;z-index:20000;width:100%;">';
							print_r($tmpTabPrice);
							echo '</pre>';
							*/
							
							$location = get_the_terms( $oV->ID, 'location');
				
							$img = wp_get_attachment_image_src(get_post_thumbnail_id($oV->ID),'thumb-paysage-big');
							$metas=get_post_meta($oV->ID);
							echo '<article class="card" id="card-'.$oV->ID.'" data-idmarker="'.$i.'" data-link="'.get_permalink($oV->ID).'" data-latitude="'.$metas['villa_latitude'][0].'" data-longitude="'.$metas['villa_longitude'][0].'" data-title="'.$oV->post_title.'" data-img="'.$img[0].'" data-bedrooms="'.$metas['villa_bedrooms'][0].'"   data-pools="'.$metas['villa_pools'][0].'" data-location="'.$metas['villa_address'][0].'">';
							echo '	<a href="'.get_permalink($oV->ID).'" title="'.$oV->post_title.'" class="link-villa" target="_blank">';
							echo '		<div class="bg" style="background-image:url('.$img[0].');"></div>';
							echo '		<div class="bg-over"></div>';
							echo '		<div class="card-content">';
							echo '			<div class="card-content-left">';
							echo '				<b>'.$oV->post_title.'</b>';
							echo '				<p class="infos">'.strtoupper($location[0]->name).', '.$metas['villa_bedrooms'][0].' '.__("bedroom(s)","onestbarts").'</p>';
							echo '				<p class="description">'.$oV->post_excerpt.'<img src="'.THEME_URI.'/dist/img/arrow-long.png"/></p>';
							echo '			</div>';
							echo '			<div class="card-content-right">';
							foreach($_SESSION['money'] as $name => $sigle){
								$priceTmp=$tabPrice[$sigle];
								if($name == $_SESSION['money_active'])
								{
									if($from)
									{
										echo '<b class="'.str_replace(' ','-',$name).' active">'.__("From","onestbarts").' '.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
										echo '<em class="'.str_replace(' ','-',$name).' active">'.__("Total","onestbarts").': '.__("From","onestbarts").' '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
									}
									else{
										echo '<b class="'.str_replace(' ','-',$name).' active">'.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
										echo '<em class="'.str_replace(' ','-',$name).' active">'.__("Total","onestbarts").': '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
									}
								}
								else
								{
									if($from)
									{
										echo '<b class="'.str_replace(' ','-',$name).'">'.__("From","onestbarts").' '.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
										echo '<em class="'.str_replace(' ','-',$name).'">'.__("Total","onestbarts").': '.__("From","onestbarts").' '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
									}
									else{
										echo '<b class="'.str_replace(' ','-',$name).'">'.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
										echo '<em class="'.str_replace(' ','-',$name).'">'.__("Total","onestbarts").': '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
									}
								}
							}
							
							echo '			</div>';
							echo '		</div>';
							echo '	</a>';
							if(!in_array($oV->ID,$_SESSION['favorite']))
							{
								echo '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav active" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
								echo '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
							}
							else
							{
								echo '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
								echo '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav active" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
							}
							echo '</article>';
							$i++;
						}
					}
					else
					{
						echo '<div class="noresult">';
						echo '	<p>'.__("No villas available for your research.", "onestbarts").'</p>';
						echo '</div>';
					}
					?>
				</div>
				<div id="listing-loading"></div>
					
						
				<!-- LISTING MAP-->
				<div id="listing-villa-footer">
					<div id="listing-villa-footer-left">
						<?php
							foreach($fields['rental_links'] as $key => $oL)
							{
								$img = wp_get_attachment_image_src(get_post_thumbnail_id($oL['link']->ID),'thumb-wide');
								echo '<a href="'.get_permalink($oL['link']->ID).'" title="'.$oL['link']->post_title.'">';
								echo '	<div class="bgimg" style="background-image:url('.$img[0].');"></div>';
								echo '	<h3>'.$oL['link']->post_title.'</h3>';
								echo '</a>';
							}
						?>
					</div>
					
					<div id="listing-villa-footer-right">
						<?php /*<p class="baseline"><?php echo $fields['rental_form_baseline']; ?></p>*/ ?>
						<h3><?php echo $fields['rental_form_title']; ?></h3>
						<p class="subtitle"><?php echo $fields['rental_form_subtitle']; ?></p>
						<form method="POST" action="#" class="form" id="form-contact">
							<div class="clearfix">
								<div class="col-6">
									<label><?php _e("First name", "onestbarts"); ?> <sup>*</sup></label>
									<input type="text" name="firstname" id="firstname"/>
								</div>
								<div class="col-6">
									<label><?php _e("Last name", "onestbarts"); ?> <sup>*</sup></label>
									<input type="text" name="lastname" id="lastname"/>
								</div>
							</div>
							<div class="clearfix">
								<div class="col-6">
									<label><?php _e("Email", "onestbarts"); ?> <sup>*</sup></label>
									<input type="email" name="email" id="email"/>
								</div>
								<div class="col-6">
									<label><?php _e("Phone number", "onestbarts"); ?> <sup>*</sup></label>
									<input type="text" name="phone" id="phone"/>
								</div>
							</div>
							<div class="clearfix">
								<div class="col-6">
									<label><?php _e("Tentative travel dates", "onestbarts"); ?></label>
									<input type="text" name="arrival" id="arrival" placeholder="<?php _e("Arrival", "onestbarts"); ?>" data-pmu-date="<?php echo $_SESSION['booking']['arrivaldate']; ?>"/>
									<input type="text" name="departure" id="departure" placeholder="<?php _e("Departure", "onestbarts"); ?>" data-pmu-date="<?php echo $_SESSION['booking']['departuredate']; ?>"/>
								</div>
								<div class="col-6">
									<label><?php _e("Budget", "onestbarts"); ?> <em>(<?php _e("Price per night", "onestbarts"); ?> )</em></label>
									<select name="budget" id="budget">
										<option value=""><?php _e("Select a Price Range", "onestbarts"); ?></option>
										<option value="<?php echo $_SESSION['options']['tranche_1']; ?>"><?php echo $_SESSION['options']['tranche_1']; ?></option>
										<option value="<?php echo $_SESSION['options']['tranche_2']; ?>"><?php echo $_SESSION['options']['tranche_2']; ?></option>
										<option value="<?php echo $_SESSION['options']['tranche_3']; ?>"><?php echo $_SESSION['options']['tranche_3']; ?></option>
										<option value="<?php echo $_SESSION['options']['tranche_4']; ?>"><?php echo $_SESSION['options']['tranche_4']; ?></option>
										<option value="<?php echo $_SESSION['options']['tranche_5']; ?>"><?php echo $_SESSION['options']['tranche_5']; ?></option>
									<select>
								</div>
							</div>
							<div class="clearfix">
								<label><?php _e("Message", "onestbarts"); ?></label>
								<textarea name="message" id="message"></textarea>
							</div>
							<div class="clearfix">
								<div id="msg">
								
								</div>
							</div>
							<div class="clearfix">
								<a href="#" id="submit-inquiry" title="<?php _e("INQUIRY","onestbarts"); ?>" class="btn"><span><?php _e("SUBMIT INQUIRY","onestbarts"); ?></span><i class="fa fa-spinner"></i></a>
							</div>
						</form>
					</div>
					
					<div id="listing-villa-assitance">
						<b><?php _e("FOR ANY ASSISTANCE PLEASE CONTACT US","onestbarts"); ?></b>
						<p>
							<a href="mailto:home@onestbarts.com">home@onestbarts.com</a> | <a href="590690560426">+590 690 56 04 26</a>
						</p>
					</div>
					
				</div>
			</div>
		</div>
	</div>

</div>

<?php get_footer(); ?>