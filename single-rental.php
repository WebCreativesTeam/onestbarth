<?php 
	if(isset($_GET['format']))
	{
		require_once(THEME_DIR.'/pdf/single.php');

	}
?>
<?php get_header(); ?>
<?php



	$idPage=get_the_ID();
    
    //$_SESSION['money_active_sigle'] = get_post_custom_values('villa_price_from', $idPage)[0];
    
	$vilaimage = get_the_post_thumbnail_url($villa->ID,'full');
	$fields=get_fields($idPage);
	
	if(isset($_GET['debug']))
	{
		echo '<pre style="background:black">';
		print_r($fields['villa_slider']);
		echo '</pre>';	
	}
	
	// CURENT VILLA PRICE
	$_SESSION['booking']['idvilla']=$idPage;
	$_SESSION['booking']['villa_image']=$vilaimage;

	// CURRENT LOCATION
	$location = get_the_terms( $idPage, 'location');
	
	// NB NIGHTS
	$nbNights=count($_SESSION['booking']['dates']);
	
	// LOCAL AREA
	$localArea = get_term( $fields['villa_local_area'], 'location' );
	
	
	$tabPrice=$_SESSION['ratestab'][$idPage];
	/*echo "<pre>";
    print_r($_SESSION);
    echo "</pre>";*/
	// HACK NB NBROOM
	$tabNbBed=$NbBed=array();
	while( have_rows('villa_rates') ): the_row();
		$infos_bedroom = get_sub_field('bedrooms_infos');
		foreach($infos_bedroom as $key => $oB)
		{
			if(!in_array($oB['nb_bedrooms'],$tabNbBed))
			{
				$tabNbBed[]=$oB['nb_bedrooms'];
			}
		}
	endwhile; 
	asort($tabNbBed);
	foreach($tabNbBed as $key => $oN)
	{
		$NbBed[]=$oN;
	}
	
	if(!in_array($_SESSION['booking']['nbbeds'], $NbBed)) 
	{
		$_SESSION['booking']['nbbeds']=min($NbBed);
	}
	
	/*
	echo '<pre style="background:black">';
	print_r($tabPrice);
	echo '</pre>';	
	*/
	
	/*
	echo '<pre style="background:black;margin-top:80px;">';
	//print_r($_SESSION['ratestab'][$idPage]);
	print_r($_SESSION['booking']);
	echo '</pre>';	
	*/
?>

<?php

/*
<!-- SLIDER SINGLE RENTAL -->
<div id="villa-slider" class="single-slider clearfix">
	<div class="owl-carousel">
		<?php
			foreach($fields['villa_slider'] as $key => $oS){
				echo '<article style="background-image:url('.$oS['image']['url'].');">';
				//echo '	<img src="'.$oS['image']['url'].'" alt="'.$oS['image']['title'].'"/>';
				
				echo '<div class="caption">';
				echo '	<b class="title-top">'.$location[0]->name.', '.$fields['villa_bedrooms'].' '.__("bedroom(s)","onestbarts").'</b>';
				echo '	<h2 class="title">'.get_the_title().'</h2>';
				echo '	<p class="subtitle">'.$oS['subtitle'].'</p>';
				if(isset($oS['link_text']) && $oS['link_text']!='')
				{
					echo '<a href="#single-rental" title="'.$oS['link_text'].'" class="btn-1 btn-slider-home">'.$oS['link_text'].'</a>';
				}
				echo '</div>';
				echo '</article>';
			}
		?>
	</div>
	<a href="#" id="diaporama">
		<p><?php _e("Click to see", "onestbarts"); ?> <span></span> <?php _e("photos", "onestbarts"); ?></p>
		<i class="fa fa-expand"></i>
	</a>
</div>
*/
?>

<!-- PARALLAX SINGLE -->
<div id="single-parallax" class="clearfix">
	<article>
		<?php	
			if(isset($fields['parallax_img_responsive']) && !empty($fields['parallax_img_responsive']))
			{
				echo '<div class="bg-mobile" style="background-image:url('.$fields['parallax_img_responsive']['url'].');"></div>';
			}
			else
			{
				echo '<div class="bg-mobile" style="background-image:url('.$fields['parallax_img_bg']['url'].');"></div>';
			}
		?>
		<ul class="parallax-container"  data-friction-y="0.1" data-friction-x="0.1">
			<li class="layer" data-depth="0.05"><div class="layer" style="background-image:url(<?php echo $fields['parallax_img_bg']['url']; ?>);"></div></li>
			<li class="layer" data-depth="0.1"><div class="layer" style="background-image:url(<?php echo $fields['parallax_img_middle']['url']; ?>);"></div></li>
			<li class="layer" data-depth="0.15"><div class="layer" style="background-image:url(<?php echo $fields['parallax_img_first']['url']; ?>);"></div></li>
		</ul>
		<div class="caption">
			<b class="title-top"><?php echo $location[0]->name.', '.$fields['villa_bedrooms'].' '.__("bedroom(s)","onestbarts"); ?></b>
			<h2 class="title"><?php echo get_the_title(); ?></h2>
			<p class="subtitle"><?php echo $fields['parallax_subtitle']; ?></p>
		<?php
			if(isset($fields['parallax_link_text']) && $fields['parallax_link_text']!='' && isset($fields['parallax_link_redirection']) && $fields['parallax_link_redirection']!='')
			{
				echo '<a href="'.$fields['parallax_link_redirection'].'" title="'.$fields['parallax_link_text'].'" class="btn-1 btn-slider-home">'.$fields['parallax_link_text'].'</a>';
			}
		?>
		</div>
		<a href="#" id="diaporama">
			<p><?php _e("Click to see", "onestbarts"); ?> <span></span> <?php _e("photos", "onestbarts"); ?></p>
			<!-- <i class="fa fa-expand"></i> -->
			<i class="new-expand"></i>	
		</a>
	</article>
</div>

<div id="single-rental" class="single-villa" data-title="<?php echo get_the_title(); ?>" data-latitude="<?php echo $fields['villa_latitude']; ?>" data-longitude="<?php echo $fields['villa_longitude']; ?>">
	
	<!-- SINGLE CONTENT-->
	<section id="single-content" class="section">
		<div class="container">
			<?php //echo $_SESSION['booking']['villa_image']; ?>
			<?php the_content(); ?>
		</div>
	</section>
	
	<div id="booking-container">
		
		<!-- SINGLE BOOK-->
		<section id="single-book" class="section">
			<div class="container">
				<div class="col-7">
					<h3><?php _e("Why book with us ?","onestbarts"); ?></h3>
					<div id="single-book-content">
						<?php echo wpautop($fields['villa_book']); ?>
					</div>
				</div>
			</div>
		</section>
		
		<!-- SINGLE DETAILS-->
		<section id="single-details" class="section">
			<div class="container">
				<div class="col-7">
					<h3 class="click"><?php _e("Details","onestbarts"); ?></h3>
					<div id="single-details-content">
						<?php echo wpautop($fields['villa_details']); ?>
					</div>
				</div>
			</div>
		</section>
		
		<!-- SINGLE AMENETIES-->
		<section id="single-ameneties" class="section">
			<div class="container">
				<div class="col-7">
					<h3 class="click"><?php _e("Amenities","onestbarts"); ?></h3>
					<div id="single-ameneties-content">
						<div class="col-6">
							<?php echo wpautop($fields['villa_ameneties_left']); ?>
						</div>
						<div class="col-6">
							<?php echo wpautop($fields['villa_ameneties_right']); ?>
						</div>
					</div>
				</div>
			</div>
		</section>
		
		<!-- SINGLE GALERY-->
		<section id="single-gallery" class="section">
			<div class="container">
				<h3><?php _e("Gallery","onestbarts"); ?></h3>
				<a href="#" title="<?php _e("Floor plan","onestbarts"); ?>" id="floor-plan" class="btn-2" target="_blank"><?php _e("Floor plan","onestbarts"); ?></a>
			</div>
			<div class="container-percent">
				<div id="single-gallery-content">
					<?php
						$ind=0;
						foreach($fields['villa_gallery_category'] as $key => $oP){
							echo '<a href="#" title="'.$oP['category_name'].'" class="gallery-category" data-category="'.str_replace(' ','-',rmvAcc(strtolower($oP['category_name']))).'" data-slide="'.$ind.'">';
							echo '	<div class="img" style="background-image:url('.$oP['category_gallery'][0]['sizes']['thumb-portrait'].');"></div>';
							echo ' 	</figure>';
							echo '	<div class="over">';
							echo '		<div class="over-content">';
							echo '			<h4>'.$oP['category_name'].'</h4>';
							echo '			<p class="nbphotos"><span>'.count($oP['category_gallery']).'</span> '.__("Photos","onestbarts").'</p>';
							echo '		</div>';
							echo '	</div>';
							echo '</a>';
							$ind=$ind + count($oP['category_gallery']);
						}
					?>
				</div>
			</div>
		</section>
		
		<!-- SINGLE SERVICES-->
		<section id="single-services" class="section">
			<div class="container">
				<div class="col-7">
					<div class="content-title-services">
						<a href="#" id="link-stay-includes" title="<?php _e("Every Stay Includes","onestbarts"); ?>" class="active"><?php _e("Every Stay Includes","onestbarts"); ?></a>
						<a href="#" id="link-extra-services" title="<?php _e("Extra Services","onestbarts"); ?>"><?php _e("Extra Services","onestbarts"); ?></a>
					</div>
					<div id="single-services-content">
						<div id="stay-includes" class="active">
							<?php echo wpautop($fields['villa_every_stay_includes']); ?>
						</div>
						<div id="extra-services">
							<?php echo wpautop($fields['villa_extra_services']); ?>
						</div>
					</div>
				</div>
			</div>
		</section>
		
		<!-- SINGLE THRUTHS-->
		<section id="single-truths" class="section">
			<div class="container">
				<div class="col-7">
					<h3><?php _e("Home truths","onestbarts"); ?></h3>
					<div id="single-truths-content">
						<?php echo wpautop($fields['villa_home_truths']); ?>
					</div>
				</div>
			</div>
		</section>
		
		
		<!-- SINGLE LOCAL AREA-->
		<section id="single-local-area" class="section">
			<div class="container">
				<h3><?php _e("Local Area","onestbarts"); ?></h3>
				<div id="single-local-area-content">
					<article>
						<?php
							$imgLocalArea=get_field('tax_image', 'location_'.$fields['villa_local_area']);
						?>
						<figure style="background-image:url(<?php echo $imgLocalArea['sizes']['thumb-carre-big'] ; ?>);"></figure>
						<div class="text">
							<strong><?php the_field('tax_title', 'location_'.$fields['villa_local_area']); ?></strong>
							<?php echo wpautop($localArea->description); ?>
						</div>
					</article>
				</div>
			</div>
		</section>
	
		<!-- SINGLE RATES-->
		<section id="single-rates" class="section">
			<div class="container">
				<div class="col-7">
					<h3><?php _e("Rates","onestbarts"); ?></h3>
					<div id="single-rates-content">
                    <?php //echo "<pre>";
                    //print_r($_SESSION);
                    //echo "</pre>";?>
                    
                    <?php //echo "<pre>";
                    //print_r(get_post_meta($idPage));
                    //echo "</pre>";?>
						<?php
							echo '	<span class="single-rates-content-span">'.$fields['text_rates_header'].' :</span>';
							echo '<div class="villa_rates_filter">';
							// echo '	<span>'.$fields['text_rates_header'].' :</span>';
							
							// echo '	<select style="display: none" class="cs-select-left cs-select cs-skin-border " name="money" id="money" autocomplete="off">';
							
							echo '	<select name="money" id="money" autocomplete="off">';
										foreach($_SESSION['money'] as $cle => $oM){
										if($oM == "USD" || $oM == "EUR"){
											if($cle == $_SESSION['money_active'])
											{
												// echo '<option value="'.str_replace(' ','-',$cle).'" selected>'.$oM.'</option>';
												echo '<option value="'.str_replace(' ','-',$cle).'" selected>'.$oM.'</option>';
											}
											else
											{
												echo '<option value="'.str_replace(' ','-',$cle).'">'.$oM.'</option>';
											}
										}
										}
							echo '	</select>';
							// echo '	<select style="display: none" class="cs-select-right cs-select cs-skin-border" name="nb_bedrooms" id="nb_bedrooms" autocomplete="off">';
							echo '	<select name="nb_bedrooms" id="nb_bedrooms" autocomplete="off">';
										foreach($NbBed as $cle => $oNbB)
										{
											$Guests=$oNbB*2;
											if(isset($_SESSION['booking']['nbbeds']) && $_SESSION['booking']['nbbeds']==$oNbB)
											{
												echo '<option value="'.$oNbB.'" selected="selected">'.$oNbB.' '.__("Bedroom(s)","onestbarts").'</option>';
											}
											else
											{
												echo '<option value="'.$oNbB.'">'.$oNbB.' '.__("Bedroom(s)","onestbarts").'</option>';
											}
										}
							echo '	</select>';
							echo '</div>';
							echo '	<div class="table-responsive">';
							echo '		<table class="table table-condensed table-responsive table-striped">';
							echo '		<thead>';
							echo '			<tr>';
							echo '				<th>'.__("Date Range","onestbarts").'</th>';
							echo '				<th>'.__("Nightly Rate","onestbarts").'</th>';
							echo '				<th>'.__("Min Nights","onestbarts").'</th>';		
							echo '			</tr>';
							echo '		</thead>';
							echo '		<tbody>';

										while( have_rows('villa_rates') ): the_row();
											$rate_season_type = get_sub_field('rate_season_type');
											foreach($_SESSION['season'] as $k => $oS)
											{
												if($oS['type_de_saison'] == $rate_season_type){
													$date_range_title = $oS['titre'];
													$date_range_date = $oS['description'];
													//break;
												}
												
											}
											$infos_bedroom = get_sub_field('bedrooms_infos');
											foreach($infos_bedroom as $key => $oB)
											{
												if(isset($_SESSION['booking']['nbbeds']) && $_SESSION['booking']['nbbeds']!='')
												{
													if($oB['nb_bedrooms']!=$_SESSION['booking']['nbbeds'])
													{
														echo '	<tr class="nbbed-'.$oB['nb_bedrooms'].'" style="display:none;">'; 
													}
													else
													{
														echo '	<tr class="nbbed-'.$oB['nb_bedrooms'].'">'; 
													}
												}
												else
												{
													if($oB['nb_bedrooms']!=$NbBed[0])
													{
														echo '	<tr class="nbbed-'.$oB['nb_bedrooms'].'" style="display:none;">'; 
													}
													else
													{
														echo '	<tr class="nbbed-'.$oB['nb_bedrooms'].'">'; 
													}
												}
												echo '		<td data-title="'.__("Date Range","onestbarts").'" class="first"><b>'.$date_range_title.'</b><span>'.$date_range_date.'</span></td>';
												$priceHtml='';
												foreach($_SESSION['money'] as $name => $sigle){
													if($name == $_SESSION['money_active'])
													{
														$priceHtml.='<span class="money '.str_replace(' ','-',$name).' active">'.$sigle.' '.number_format(str_replace(' ','',$tabPrice[$rate_season_type][$oB['nb_bedrooms']][$sigle]),0,'',' ').'</span>';
													}
													else
													{
														$priceHtml.='<span class="money '.str_replace(' ','-',$name).'">'.$sigle.' '.number_format(str_replace(' ','',$tabPrice[$rate_season_type][$oB['nb_bedrooms']][$sigle]),0,'',' ').'</span>';
													}
												}
												echo '		<td data-title="'.__("Weekly Rate","onestbarts").'" >'.$priceHtml.'</td>';
												echo '		<td data-title="'.__("Min Nights","onestbarts").'" >'.$oB['nb_nights_minimum'].'</td>';
												echo '	</tr>';
											}
										endwhile; 

							echo '		</tbody>';
							echo '		</table>';
							echo '	<div class="villa_rates_footer">'.$fields['text_rates_footer'].'</div>';
							echo '</div>';
						
						?>
					
					</div>
				</div>
			</div>
		</section>
		
		<!-- SINGLE GGMAP-->
		<section id="single-ggmap" class="section">
		</section>
		
		<!-- SINGLE POLICIES-->
		<section id="single-policies" class="section">
			<div class="container">
				<div class="col-7">
					<h3 class="click"><?php _e("Policies","onestbarts"); ?></h3>
					<div id="single-policies-content">
						<?php echo wpautop($fields['villa_policies']); ?>
					</div>
				</div>
			</div>
		</section>
	
		<!-- SINGLE RELATED-->
		<section id="single-related" class="section">
			<div class="container">
				<h3><?php _e("Similar homes","onestbarts"); ?></h3>
				<div id="single-related-content">
					<?php
						foreach($fields['villa_similar_houses'] as $key => $oR){
							$img = wp_get_attachment_image_src(get_post_thumbnail_id($oR['similar_villa']->ID),'thumb-wide');
							$metas=get_post_meta($oR['similar_villa']->ID);
							$loc = get_the_terms( $oR['similar_villa']->ID, 'location');
							echo '<a href="'.get_permalink($oR['similar_villa']->ID).'" title="'.$oR['similar_villa']->post_title.'" class="col-4">';
							echo '	<figure>';
							echo '		<img src="'.$img[0].'" alt="'.$oR['similar_villa']->post_title.'"/>';
							echo ' 	</figure>';
							echo '	<h4>'.$oR['similar_villa']->post_title.'</h4>';
							echo '	<p class="desc">'.$loc[0]->name.' - '.$metas['villa_bedrooms'][0].' '.__("bedroom(s)","onestbarts").'</p>';
							echo '	<p class="price">'.__("From","onestbarts").' '.$_SESSION['money_active_sigle'].' '.get_min_price($oR['similar_villa']->ID, $_SESSION['money_active_sigle']).' /<sup>'.__("nt","onestbarts").'</sup></p>';
							echo '</a>';
						}
					?>
				</div>
			</div>
		</section>
		
		
		
		<div id="single-booking" data-datearrival="<?php echo $_SESSION['booking']['arrivaldate']; ?>" data-datedeparture="<?php echo $_SESSION['booking']['departuredate']; ?>">
			<a href="#" title="<?php _e("Close", "onestbarts"); ?>" id="single-booking-close"><span></span><span></span></a>
			<h3><?php _e("Plan your trip","onestbarts"); ?></h3>
			
			<form id="booking-form" method="POST" action="#">
			
				<label><?php _e("arrival date","onestbarts"); ?></label>
				<input type="text" id="booking-arrival" name="booking-arrival" data-pmu-date="<?php echo $_SESSION['booking']['arrivaldate']; ?>"/>
				<label><?php _e("departure date","onestbarts"); ?></label>
				<input type="text" id="booking-departure" name="booking-departure" data-pmu-date="<?php echo $_SESSION['booking']['departuredate']; ?>"/>
				<div id="booking-bedrooms">
					<span data-text="<?php _e("bedroom(s)","onestbarts"); ?>"><?php echo $_SESSION['booking']['nbbeds']; ?> <?php _e("bedroom(s)","onestbarts") ?></span>
				
					<ul id="booking-bedrooms-options">
						<?php
							foreach($NbBed as $cle => $oB)
							{
								if(isset($_SESSION['booking']['nbbeds']) && $_SESSION['booking']['nbbeds']==$oB)
								{
									echo '<li data-value="'.$oB.'" class="active nb-'.$oB.'">'.$oB.'</li>';
								}
								else
								{
									echo '<li data-value="'.$oB.'" class="nb-'.$oB.'">'.$oB.'</li>';
								}
							}
						?>
						
					</ul>
				</div>
				<input type="hidden" id="nb-booking-bedrooms" name="nb-booking-bedrooms">
				<div id="booking-price">
					<div id="booking-price-top">
						<div  id="booking-price-top-left">
							<span class="nbnights-field"><?php echo $nbNights; ?></span> <?php _e("nts","onestbarts"); ?>
						</div>
						<div  id="booking-price-top-right">
							<?php echo $_SESSION['money_active_sigle']; ?> 
							<span class="pricepernight-field"><?php echo number_format(str_replace(' ','',get_price_by_beds_nb($idPage,$_SESSION['money_active_sigle'])),0,'.',' '); ?></span> 
							<?php _e("per night","onestbarts"); ?>
						</div>
					</div>
					<div id="booking-price-bottom">
						<div id="booking-price-subtotal">
							<?php _e("Subtotal","onestbarts"); ?>: <?php echo $_SESSION['money_active_sigle']; ?> 
							<span class="subtotal-field"><?php echo number_format(str_replace(' ','',get_price_by_beds_nb($idPage,$_SESSION['money_active_sigle'])) * $nbNights,0,'.',' '); ?></span>
						</div>
						<em>(<?php _e("taxes & fees not included","onestbarts"); ?>)</em>
					</div>
				</div>
				<input type="hidden" id="idvilla" name="idvilla" value="<?php echo get_the_ID(); ?>"/>
				<a href="#" id="booking-inquire" title="<?php _e("Inquire now","onestbarts"); ?>" class="booking-inquire"><?php _e("Inquire now","onestbarts"); ?></a>
				<a href="tel:+590690560426<?php// echo the_field('specialist_phone_number'); ?>" id="booking-inquire-call" title="<?php _e("CALL A HOME SPECIALIST","onestbarts"); ?>" class="booking-inquire-call"><?php _e("CALL A HOME SPECIALIST","onestbarts"); ?></a>
				<?php /*<a href="#" id="booking-call" title="<?php _e("Call a home specialist","onestbarts"); ?>"><?php _e("Call a home specialist","onestbarts"); ?></a>*/ ?>
					
			</form>
		</div>
		
	</div>
</div>	

<div id="single-inquire">
	<a href="#" id="open-inquire" title="<?php _e("Inquire now","onestbarts"); ?>"><?php _e("Inquire now","onestbarts"); ?></a>
</div>

<div id="diaporama-villa">
	<div id="diaporama-villa-header">
		<a href="#" title="<?php _e("Close", "onestbarts"); ?>" id="diaporama-close"><span></span><span></span></a>
		<a href="<?php echo get_home_url(); ?>/" title="<?php _e("Home", "onestbarts"); ?>" id="diaporama-logo">
			<?php 
				/*
				<img src="<?php echo THEME_URI; ?>/dist/img/logo-black.png" alt="Onestbarts"/>
				*/
			?>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 68"><path d="M98.6 13c-.8 0-1.5.7-1.5 1.5V52c-3.8-3.8-11.4-11.2-20.5-18.6C58.9 19.2 44.1 12 32.6 12c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5c11.5 0 20.9 9.4 20.9 20.9s-9.4 20.9-20.9 20.9-20.9-9.4-20.9-20.9c0-.8-.7-1.5-1.5-1.5s-1.4.6-1.4 1.4c0 13.2 10.7 23.9 23.9 23.9S56.5 49 56.5 35.8c0-6.2-2.4-11.9-6.3-16.1 22.9 10.9 47 36.7 47.3 37 .4.5 1.1.6 1.6.4.6-.2 1-.8 1-1.4V14.5c0-.8-.7-1.5-1.5-1.5zm46.7 41.8h-27.7V37.2h5.8c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-5.8V16.9h27.1c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-30.1v20.3h-5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5v20.6h30.7c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5zm55.4-16.7c-1.5-.9-3.3-1.6-5.4-2.2-2.1-.6-4.4-1.1-6.9-1.5-2.5-.5-4.6-.9-6.4-1.4-1.7-.5-3.2-1-4.3-1.7-1-.6-1.8-1.4-2.3-2.2-.5-.9-.7-2-.7-3.3 0-2.8 1-5 3.1-6.6 2.1-1.7 5.7-2.5 10.6-2.5 2.6 0 4.9.3 6.8 1 1.8.6 3.6 1.8 5.3 3.6.1.2.4.2.6.2.2 0 .4-.1.5-.3l.9-1.2c.2-.3.2-.7-.1-1-1.9-1.9-4-3.3-6.3-4.1-2.2-.8-4.9-1.2-7.9-1.2-5 0-9.1 1-12.1 3-3.1 2.1-4.7 5.1-4.7 9 0 1.9.4 3.5 1.1 4.8.7 1.3 1.8 2.4 3.2 3.2 1.4.8 3.1 1.5 5.1 2.1 2 .5 4.2 1 6.8 1.5 2.6.5 4.8 1 6.7 1.5 1.8.5 3.4 1.2 4.5 1.9s2 1.6 2.5 2.5c.5 1 .8 2.1.8 3.5 0 2.9-1.2 4.9-3.6 6.3-2.5 1.4-5.9 2.2-10.1 2.2-3.4 0-6.5-.5-9.1-1.5-2.6-1-5-2.5-7.2-4.6-.3-.3-.8-.3-1 0l-1.1 1.1c-.1.1-.2.3-.2.6s.1.4.3.5c2.6 2.2 5.4 3.9 8.3 5 2.9 1.1 6.3 1.7 10 1.7 5.1 0 9.3-1 12.2-2.9 3.1-2 4.6-4.9 4.6-8.6 0-2-.4-3.7-1.2-5.1-.6-1.3-1.8-2.4-3.3-3.3zm46-24.2h-36.3c-.4 0-.8.3-.8.8v1.6c0 .4.3.8.8.8H227v39.3c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V17h16.6c.4 0 .8-.3.8-.8v-1.6c0-.4-.3-.7-.7-.7zm195.1 0h-36.3c-.4 0-.8.3-.8.8v1.6c0 .4.3.8.8.8h16.7V57c0 .4.3.8.8.8h1.6c.4 0 .8-.3.8-.8V17H442c.4 0 .8-.3.8-.8v-1.6c-.3-.4-.6-.7-1-.7zm39.1 27.6c-.8-1.4-2-2.5-3.6-3.4-1.5-.9-3.3-1.6-5.4-2.2-2.1-.6-4.4-1.1-6.9-1.5-2.5-.5-4.6-.9-6.4-1.4-1.7-.5-3.2-1-4.3-1.7-1-.6-1.8-1.4-2.3-2.2-.5-.9-.7-2-.7-3.3 0-2.8 1-5 3.1-6.6 2.1-1.7 5.7-2.5 10.6-2.5 2.6 0 4.9.3 6.8 1 1.8.6 3.6 1.8 5.3 3.6.1.2.4.2.6.2.2 0 .4-.1.5-.3l.9-1.2c.2-.3.2-.7-.1-1-1.9-1.9-4-3.3-6.3-4.1-2.2-.8-4.9-1.2-7.9-1.2-5 0-9.1 1-12.1 3-3.1 2.1-4.7 5.1-4.7 9 0 1.9.4 3.5 1.1 4.8.7 1.3 1.8 2.4 3.2 3.2 1.4.8 3.1 1.5 5.1 2.1 2 .5 4.2 1 6.8 1.5 2.6.5 4.8 1 6.7 1.5 1.8.5 3.3 1.2 4.5 1.9 1.1.7 2 1.6 2.5 2.5.5 1 .8 2.1.8 3.5 0 2.9-1.2 5-3.6 6.3-2.5 1.4-5.9 2.2-10.1 2.2-3.4 0-6.5-.5-9.1-1.5-2.6-1-5-2.5-7.2-4.6-.3-.3-.8-.3-1 0l-1.1 1.1c-.1.1-.2.3-.2.6s.1.4.3.5c2.6 2.2 5.4 3.9 8.3 5 2.9 1.1 6.3 1.7 10 1.7 5.1 0 9.3-1 12.2-2.9 3.1-2 4.6-4.9 4.6-8.6.4-1.9 0-3.6-.9-5zM339 14.3c-.1-.3-.4-.4-.7-.4h-1.4c-.3 0-.6.2-.7.4l-19.9 42.4c-.1.2-.1.5 0 .7s.4.3.6.3h1.7c.3 0 .6-.2.7-.4l7.1-15 .5-1.4 10.5-22.3 10.5 22.3.6 1.5 7 14.9c.1.3.4.4.7.4h1.7c.3 0 .5-.1.6-.3s.2-.5 0-.7L339 14.3zm57.9 22.4c1.1-1.2 1.9-2.6 2.5-4.2.6-1.5.9-3.2.9-4.9 0-1.7-.3-3.3-1-5-.7-1.6-1.6-3.1-2.9-4.4-1.2-1.3-2.7-2.3-4.3-3.1-1.7-.8-3.5-1.2-5.5-1.2h-18.7c-.4 0-.8.3-.8.8V57c0 .4.3.8.8.8h1.6c.4 0 .8-.3.8-.8V17h16.3c1.5 0 2.9.3 4.2.9 1.3.6 2.4 1.4 3.4 2.4s1.7 2.2 2.2 3.4c.5 1.3.8 2.6.8 3.9 0 1.3-.2 2.6-.7 3.9-.5 1.3-1.2 2.4-2.1 3.4-.9 1-1.9 1.8-3.2 2.4-1.1.5-2.3.8-3.7.9h-2.7c-.1 0-.2 0-.3.1h-.1c-.1 0-.1.1-.2.1h-.1c-.1.1-.1.1-.1.2v.4c0 .1.1.1.1.2l1.4 1.5L397 57.5c.1.2.4.3.6.3h1.9c.3 0 .5-.2.7-.4.1-.2.1-.5 0-.8L389.3 41c1.3-.2 2.6-.7 3.7-1.2 1.5-.8 2.8-1.9 3.9-3.1zm-89 2.3c-1.3-1.7-2.9-2.9-4.9-3.8 1.4-.8 2.6-2 3.5-3.3 1.3-1.9 1.9-4 1.9-6.3 0-1.4-.3-2.8-.8-4.2-.5-1.4-1.2-2.6-2.2-3.7-1-1.1-2.1-2-3.5-2.7-1.4-.7-3-1-4.7-1h-20.4c-.4 0-.8.3-.8.8v42.4c0 .4.3.8.8.8H298c1.7 0 3.3-.3 4.8-.9 1.5-.6 2.8-1.5 3.9-2.6s2-2.3 2.6-3.7c.6-1.4 1-2.9 1-4.6.1-2.7-.8-5.1-2.4-7.2zm-1.3 10.3c-.5 1.1-1.1 2-2 2.8-.8.8-1.8 1.5-2.9 2-1.1.5-2.3.8-3.6.8h-18.9V17.1h17.9c1.2 0 2.3.2 3.3.7 1 .5 1.9 1.1 2.6 1.9.7.8 1.3 1.7 1.7 2.8.4 1 .6 2.1.6 3.3 0 1-.2 2.1-.6 3.1-.4 1-1 2-1.8 2.8-.7.8-1.7 1.4-2.7 2-1 .5-2.2.7-3.4.7-.4 0-.7.3-.7.8v1.5c0 .4.3.8.8.8h1.8c1.2 0 2.4.2 3.5.7 1.1.5 2 1.1 2.8 2 .8.8 1.4 1.8 1.8 2.8.4 1.1.7 2.2.7 3.3-.2.9-.5 2-.9 3zm-52-16.1c-2.6 0-4.8 2.1-4.8 4.8s2.1 4.8 4.8 4.8 4.8-2.1 4.8-4.8-2.2-4.8-4.8-4.8zm0 7.5c-1.5 0-2.8-1.2-2.8-2.8s1.2-2.8 2.8-2.8 2.8 1.2 2.8 2.8-1.3 2.8-2.8 2.8z"/></svg>
		</a>
		<?php
		/*
		<select id="diaporama-category" name="diaporama-category">
			<?php
				$ind=0;
				foreach($fields['villa_gallery_category'] as $key => $oP){
					echo '<option id="option-'.str_replace(' ','-',rmvAcc(strtolower($oP['category_name']))).'" value="'.str_replace(' ','-',rmvAcc(strtolower($oP['category_name']))).'" data-slide="'.$ind.'">'.$oP['category_name'].'</option>';
					$ind=$ind + count($oP['category_gallery']);
				}
			?>
		</select>	
		*/
		?>
		<div id="diaporama-category">
			<span><?php echo $fields['villa_gallery_category'][0]['category_name']; ?></span>
			<ul id="diaporama-category-options">
				<?php
					foreach($fields['villa_gallery_category'] as $key => $oP){
						echo '<li data-slide="'.$ind.'" data-value="'.str_replace(' ','-',rmvAcc(strtolower($oP['category_name']))).'">'.$oP['category_name'].'</li>';
						$ind=$ind + count($oP['category_gallery']);
					}
				?>
			</ul>
		</div>
	</div>
	<div id="diaporama-villa-content">
		<div class="owl-carousel">
		<?php
			/*echo '<pre style="background:black">';
			print_r($fields['villa_gallery_category']);
			echo '</pre>';*/
		
			foreach($fields['villa_gallery_category'] as $key => $oC){
				$i=0;
				foreach($oC['category_gallery'] as $cle => $oS){
					echo '<div id="'.str_replace(' ','-',rmvAcc(strtolower($oC['category_name']))).'-'.$i.'" class="diapo-content-img" data-cat="'.str_replace(' ','-',rmvAcc(strtolower($oC['category_name']))).'"  data-catname="'.$oC['category_name'].'">';
					echo '	<div class="diapo-img" style="background-image:url('.$oS['url'].');"></div>';
					if(isset($oS['description']) && $oS['description']!='')
					{
						echo '	<p><span>'.$oS['description'].'</span></p>';
					}
					echo '</div>';
					$i++;
				}
			}
		?>
		</div>
	</div>
</div>


<div id="popup-floorplan">
	<div id="popup-floorplan-header">
		<a href="#" title="<?php _e("Close", "onestbarts"); ?>" id="floorplan-close"><span></span><span></span></a>
		<a href="<?php echo get_home_url(); ?>/" title="<?php _e("Home", "onestbarts"); ?>" id="floorplan-logo">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 68"><path d="M98.6 13c-.8 0-1.5.7-1.5 1.5V52c-3.8-3.8-11.4-11.2-20.5-18.6C58.9 19.2 44.1 12 32.6 12c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5c11.5 0 20.9 9.4 20.9 20.9s-9.4 20.9-20.9 20.9-20.9-9.4-20.9-20.9c0-.8-.7-1.5-1.5-1.5s-1.4.6-1.4 1.4c0 13.2 10.7 23.9 23.9 23.9S56.5 49 56.5 35.8c0-6.2-2.4-11.9-6.3-16.1 22.9 10.9 47 36.7 47.3 37 .4.5 1.1.6 1.6.4.6-.2 1-.8 1-1.4V14.5c0-.8-.7-1.5-1.5-1.5zm46.7 41.8h-27.7V37.2h5.8c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-5.8V16.9h27.1c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-30.1v20.3h-5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5v20.6h30.7c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5zm55.4-16.7c-1.5-.9-3.3-1.6-5.4-2.2-2.1-.6-4.4-1.1-6.9-1.5-2.5-.5-4.6-.9-6.4-1.4-1.7-.5-3.2-1-4.3-1.7-1-.6-1.8-1.4-2.3-2.2-.5-.9-.7-2-.7-3.3 0-2.8 1-5 3.1-6.6 2.1-1.7 5.7-2.5 10.6-2.5 2.6 0 4.9.3 6.8 1 1.8.6 3.6 1.8 5.3 3.6.1.2.4.2.6.2.2 0 .4-.1.5-.3l.9-1.2c.2-.3.2-.7-.1-1-1.9-1.9-4-3.3-6.3-4.1-2.2-.8-4.9-1.2-7.9-1.2-5 0-9.1 1-12.1 3-3.1 2.1-4.7 5.1-4.7 9 0 1.9.4 3.5 1.1 4.8.7 1.3 1.8 2.4 3.2 3.2 1.4.8 3.1 1.5 5.1 2.1 2 .5 4.2 1 6.8 1.5 2.6.5 4.8 1 6.7 1.5 1.8.5 3.4 1.2 4.5 1.9s2 1.6 2.5 2.5c.5 1 .8 2.1.8 3.5 0 2.9-1.2 4.9-3.6 6.3-2.5 1.4-5.9 2.2-10.1 2.2-3.4 0-6.5-.5-9.1-1.5-2.6-1-5-2.5-7.2-4.6-.3-.3-.8-.3-1 0l-1.1 1.1c-.1.1-.2.3-.2.6s.1.4.3.5c2.6 2.2 5.4 3.9 8.3 5 2.9 1.1 6.3 1.7 10 1.7 5.1 0 9.3-1 12.2-2.9 3.1-2 4.6-4.9 4.6-8.6 0-2-.4-3.7-1.2-5.1-.6-1.3-1.8-2.4-3.3-3.3zm46-24.2h-36.3c-.4 0-.8.3-.8.8v1.6c0 .4.3.8.8.8H227v39.3c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V17h16.6c.4 0 .8-.3.8-.8v-1.6c0-.4-.3-.7-.7-.7zm195.1 0h-36.3c-.4 0-.8.3-.8.8v1.6c0 .4.3.8.8.8h16.7V57c0 .4.3.8.8.8h1.6c.4 0 .8-.3.8-.8V17H442c.4 0 .8-.3.8-.8v-1.6c-.3-.4-.6-.7-1-.7zm39.1 27.6c-.8-1.4-2-2.5-3.6-3.4-1.5-.9-3.3-1.6-5.4-2.2-2.1-.6-4.4-1.1-6.9-1.5-2.5-.5-4.6-.9-6.4-1.4-1.7-.5-3.2-1-4.3-1.7-1-.6-1.8-1.4-2.3-2.2-.5-.9-.7-2-.7-3.3 0-2.8 1-5 3.1-6.6 2.1-1.7 5.7-2.5 10.6-2.5 2.6 0 4.9.3 6.8 1 1.8.6 3.6 1.8 5.3 3.6.1.2.4.2.6.2.2 0 .4-.1.5-.3l.9-1.2c.2-.3.2-.7-.1-1-1.9-1.9-4-3.3-6.3-4.1-2.2-.8-4.9-1.2-7.9-1.2-5 0-9.1 1-12.1 3-3.1 2.1-4.7 5.1-4.7 9 0 1.9.4 3.5 1.1 4.8.7 1.3 1.8 2.4 3.2 3.2 1.4.8 3.1 1.5 5.1 2.1 2 .5 4.2 1 6.8 1.5 2.6.5 4.8 1 6.7 1.5 1.8.5 3.3 1.2 4.5 1.9 1.1.7 2 1.6 2.5 2.5.5 1 .8 2.1.8 3.5 0 2.9-1.2 5-3.6 6.3-2.5 1.4-5.9 2.2-10.1 2.2-3.4 0-6.5-.5-9.1-1.5-2.6-1-5-2.5-7.2-4.6-.3-.3-.8-.3-1 0l-1.1 1.1c-.1.1-.2.3-.2.6s.1.4.3.5c2.6 2.2 5.4 3.9 8.3 5 2.9 1.1 6.3 1.7 10 1.7 5.1 0 9.3-1 12.2-2.9 3.1-2 4.6-4.9 4.6-8.6.4-1.9 0-3.6-.9-5zM339 14.3c-.1-.3-.4-.4-.7-.4h-1.4c-.3 0-.6.2-.7.4l-19.9 42.4c-.1.2-.1.5 0 .7s.4.3.6.3h1.7c.3 0 .6-.2.7-.4l7.1-15 .5-1.4 10.5-22.3 10.5 22.3.6 1.5 7 14.9c.1.3.4.4.7.4h1.7c.3 0 .5-.1.6-.3s.2-.5 0-.7L339 14.3zm57.9 22.4c1.1-1.2 1.9-2.6 2.5-4.2.6-1.5.9-3.2.9-4.9 0-1.7-.3-3.3-1-5-.7-1.6-1.6-3.1-2.9-4.4-1.2-1.3-2.7-2.3-4.3-3.1-1.7-.8-3.5-1.2-5.5-1.2h-18.7c-.4 0-.8.3-.8.8V57c0 .4.3.8.8.8h1.6c.4 0 .8-.3.8-.8V17h16.3c1.5 0 2.9.3 4.2.9 1.3.6 2.4 1.4 3.4 2.4s1.7 2.2 2.2 3.4c.5 1.3.8 2.6.8 3.9 0 1.3-.2 2.6-.7 3.9-.5 1.3-1.2 2.4-2.1 3.4-.9 1-1.9 1.8-3.2 2.4-1.1.5-2.3.8-3.7.9h-2.7c-.1 0-.2 0-.3.1h-.1c-.1 0-.1.1-.2.1h-.1c-.1.1-.1.1-.1.2v.4c0 .1.1.1.1.2l1.4 1.5L397 57.5c.1.2.4.3.6.3h1.9c.3 0 .5-.2.7-.4.1-.2.1-.5 0-.8L389.3 41c1.3-.2 2.6-.7 3.7-1.2 1.5-.8 2.8-1.9 3.9-3.1zm-89 2.3c-1.3-1.7-2.9-2.9-4.9-3.8 1.4-.8 2.6-2 3.5-3.3 1.3-1.9 1.9-4 1.9-6.3 0-1.4-.3-2.8-.8-4.2-.5-1.4-1.2-2.6-2.2-3.7-1-1.1-2.1-2-3.5-2.7-1.4-.7-3-1-4.7-1h-20.4c-.4 0-.8.3-.8.8v42.4c0 .4.3.8.8.8H298c1.7 0 3.3-.3 4.8-.9 1.5-.6 2.8-1.5 3.9-2.6s2-2.3 2.6-3.7c.6-1.4 1-2.9 1-4.6.1-2.7-.8-5.1-2.4-7.2zm-1.3 10.3c-.5 1.1-1.1 2-2 2.8-.8.8-1.8 1.5-2.9 2-1.1.5-2.3.8-3.6.8h-18.9V17.1h17.9c1.2 0 2.3.2 3.3.7 1 .5 1.9 1.1 2.6 1.9.7.8 1.3 1.7 1.7 2.8.4 1 .6 2.1.6 3.3 0 1-.2 2.1-.6 3.1-.4 1-1 2-1.8 2.8-.7.8-1.7 1.4-2.7 2-1 .5-2.2.7-3.4.7-.4 0-.7.3-.7.8v1.5c0 .4.3.8.8.8h1.8c1.2 0 2.4.2 3.5.7 1.1.5 2 1.1 2.8 2 .8.8 1.4 1.8 1.8 2.8.4 1.1.7 2.2.7 3.3-.2.9-.5 2-.9 3zm-52-16.1c-2.6 0-4.8 2.1-4.8 4.8s2.1 4.8 4.8 4.8 4.8-2.1 4.8-4.8-2.2-4.8-4.8-4.8zm0 7.5c-1.5 0-2.8-1.2-2.8-2.8s1.2-2.8 2.8-2.8 2.8 1.2 2.8 2.8-1.3 2.8-2.8 2.8z"/></svg>
		</a>
	</div>
	<div id="popup-floorplan-content">
		<img src="<?php echo $fields['villa_floor_plan']['url']; ?>" alt="<?php echo $fields['villa_floor_plan']['title']; ?>"/>
	</div>
</div>


<!-- INQUIRE POPUP -->
<?php
	$img = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()),'thumb-portrait');
?>
<div id="popup-inquire" class="popup">	
	<div id="inquire-content" class="popup-content">
		<a href="#" title="<?php _e("close","onestbarts"); ?>" class="popup-close"><span></span><span></span></a>
		<div id="inquire-details" style="background-image:url(<?php echo $img[0]; ?>);" class="col-4">
			<div class="inquire-bg"></div>
			<div id="inquire-details-top">
				<b class="title"><?php echo get_the_title(); ?></b>
				<span><?php echo $fields['villa_bedrooms'].' '.__("bedroom(s)","onestbarts").', '.$location[0]->name; ?></span>
			</div>
			<div id="inquire-details-bottom">
				<?php echo $fields['villa_inquire_comments']; ?>
			</div>
		</div>
		<div id="inquire-form" class="col-8">
			<form id="inquire-villa" method="POST" action="#" class="form">
				<div class="col-6">
					<b class="title"><?php _e("Your infos","onestbarts"); ?></b>
					<div class="clearfix">
						<label><?php _e("name and firstname", "onestbarts"); ?> <sup>*</sup></label>
						<input type="text" name="name" id="name" value="<?php if(isset($_SESSION['booking']['name'])){echo $_SESSION['booking']['name'];} ?>"/>
					</div>
					<div class="clearfix">
						<label><?php _e("phone number", "onestbarts"); ?> <sup>*</sup></label>
						<input type="text" name="phone" id="phone" value="<?php if(isset($_SESSION['booking']['phone'])){echo $_SESSION['booking']['phone'];} ?>"/>
					</div>
					<div class="clearfix">
						<label><?php _e("Email", "onestbarts"); ?> <sup>*</sup></label>
						<input type="email" name="email" id="email" value="<?php if(isset($_SESSION['booking']['email'])){echo $_SESSION['booking']['email'];} ?>"/>
					</div>
					<div class="clearfix">
						<label><?php _e("additionnal comments", "onestbarts"); ?> </label>
						<textarea name="comments"><?php if(isset($_SESSION['booking']['comments'])){echo $_SESSION['booking']['comments'];} ?></textarea>
					</div>	
				</div>
				<div class="col-6">
					<b class="title"><?php _e("Plan your trip","onestbarts"); ?></b>
					<div class="clearfix">
						<label><?php _e("arrival date","onestbarts"); ?></label>
						<input type="text" id="popup-booking-arrival" name="popup-booking-arrival" data-pmu-date="<?php echo $_SESSION['booking']['arrivaldate']; ?>" />
					</div>
					<div class="clearfix">
						<label><?php _e("departure date","onestbarts"); ?></label>
						<input type="text" id="popup-booking-departure" name="popup-booking-departure" data-pmu-date="<?php echo $_SESSION['booking']['departuredate']; ?>"/>
					</div>
					<div class="clearfix">	
						<label><?php _e("Bedroom(s)","onestbarts"); ?></label>
						<select id="popup-booking-bedrooms" name="popup-booking-bedrooms" autocomplete="off">
							<?php
								foreach($NbBed as $cle => $oB)
								{
									if(isset($_SESSION['booking']['nbbeds']) && $_SESSION['booking']['nbbeds']==$oB)
									{
										echo '<option value="'.$oB.'" selected="selected">'.$oB.' '.__("Bedroom(s)","onestbarts").'</option>';
									}
									else
									{
										echo '<option value="'.$oB.'">'.$oB.' '.__("Bedroom(s)","onestbarts").'</option>';
									}
								}
							?>
						</select>
					</div>
					<div id="popup-booking-price" class="clearfix">
						<div id="popup-booking-price-top">
							<div  id="popup-booking-price-top-left">
								<span class="nbnights-field"><?php echo $nbNights; ?></span> <?php _e("nts","onestbarts"); ?>
							</div>
							<div  id="popup-booking-price-top-right">
								<?php echo $_SESSION['money_active_sigle']; ?> <span class="pricepernight-field"><?php echo number_format(str_replace(' ','',get_price_by_beds_nb($idPage,$_SESSION['money_active_sigle'])),0,'.',' '); ?></span> <?php _e("per night","onestbarts"); ?>
							</div>
						</div>
						<div id="popup-booking-price-bottom">
							<div id="popup-booking-price-subtotal"><?php _e("Subtotal","onestbarts"); ?>: <?php echo $_SESSION['money_active_sigle']; ?> <span class="subtotal-field"><?php echo number_format(str_replace(' ','',get_price_by_beds_nb($idPage,$_SESSION['money_active_sigle'])) * $nbNights,0,'.',' '); ?></span></div>
							<em>(<?php _e("taxes & fees not included","onestbarts"); ?>)</em>
						</div>
					</div>
					<div id="msg-inquire" class="clearfix"></div>
					<input type="hidden" id="popup-idvilla" name="popup-idvilla" value="<?php echo get_the_ID(); ?>"/>
					<a href="#" id="send-inquire" title="<?php _e("send inquire","onestbarts"); ?>"><span><?php _e("send inquire","onestbarts"); ?></span><i class="fa fa-spinner"></i></a>
				</div>
			</form>
		</div>
	</div>
</div>

<?php get_footer(); ?>