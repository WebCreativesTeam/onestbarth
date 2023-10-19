 <?php
/*
Template Name: Template - Favoris
*/
?>
<?php get_header(); ?>
<?php
	
	$idPage=get_the_ID();
	$fields=get_fields($idPage);

	$nbNights=count($_SESSION['booking']['dates']);
	
	
	/*echo '<pre style="background:black;position:absolute;top:0;left:0;z-index:20000;width:100%;">';
	print_r($fields);
	echo '</pre>';*/
	

?>
<!-- FAVORITE -->
<div id="favorite" class="favorite">

	<!-- FILTER -->
	<div id="favorite-filter">
	
	</div>

	<div id="favorite-header" style="background-image:url(<?php echo $fields['favoris_bg']['url']; ?>);">
		<div id="favorite-header-content">
			<?php /*<img src="<?php echo THEME_URI; ?>/dist/img/logo-white.png" alt="Onestbarts"/>*/ ?>
			<h1><?php echo $fields['favoris_title']; ?></h1>
			<p>
				<?php _e("Displaying", "onestbarts"); ?>
				<span id="nbresults"><?php echo count($_SESSION['favorite']); ?> </span>
				<?php echo __("hand-picked homes", "onestbarts").'. '.__("Temptating travelling date:", "onestbarts").' <b>'.$_SESSION['booking']['arrivaldate'].'</b> '.__("to", "onestbarts").' <b>'.$_SESSION['booking']['departuredate'].'</b>'; ?>
			</p>
		</div>
	</div>
	
	<!-- FAVORITE CONTENT-->
	<div id="favorite-content">
		<div id="favorite-villas">
			<div class="container">
				<?php
					if(!empty($_SESSION['favorite']))
					{
						?>
							<div id="favorite-villa-filter">
								<div id="favorite-villa-filter-left">
									<select id="filter-tri" name="filter-tri">
										<option value=""><?php _e("Recommended", "onestbarts"); ?></option>
										<option value="Prix Min/Max"><?php _e("Prix Min/Max", "onestbarts"); ?></option>
										<option value="Prix Max/Min"><?php _e("Prix Max/Min", "onestbarts"); ?></option>
										<option value="Name (A - Z)"><?php _e("Name (A - Z)", "onestbarts"); ?></option>
										<option value="Name (Z - A)"><?php _e("Name (Z - A)", "onestbarts"); ?></option>
									</select>
								</div>
								<div id="favorite-villa-filter-right">
									<a href="#" title="<?php _e("Share my favorites", "onestbarts"); ?>" id="share-favorite"><i class="fa fa-envelope-o"></i><span><?php _e("Share my favorites", "onestbarts"); ?></span></a>
									<a href="#" title="<?php _e("Remove All", "onestbarts"); ?>" id="remove-all"><?php _e("Remove All", "onestbarts"); ?></a>
								</div>
							</div>
							
							<!-- FAVORITE VILLA-->
							<div id="favorite-villa-content">
								<?php
									$i=0;
									foreach($_SESSION['favorite'] as $key => $id)
									{									
										$oF=get_post($id);
										$img = wp_get_attachment_image_src(get_post_thumbnail_id($oF->ID),'thumb-paysage');
										$metas=get_post_meta($oF->ID);
										
																				$tabPrice=array();
										$tmpTabPrice=$_SESSION['ratestab'][$oF->ID][$_SESSION['booking']['dates'][0]['season']];
										for($j = 20; $j >= $_SESSION['booking']['nbbeds']; $j--)
										{
											if(!empty($tmpTabPrice[$j]))
											{
												$tabPrice=$tmpTabPrice[$j];
											}	
										}
										
										echo '<article class="card" id="card-'.$oF->ID.'" data-idmarker="'.$i.'" data-link="'.get_permalink($oF->ID).'" data-latitude="'.$metas['villa_latitude'][0].'" data-longitude="'.$metas['villa_longitude'][0].'" data-title="'.$oF->post_title.'" data-img="'.$img[0].'" data-bedrooms="'.$metas['villa_bedrooms'][0].'"   data-pools="'.$metas['villa_pools'][0].'" data-location="'.$metas['villa_address'][0].'">';
										echo '	<a href="'.get_permalink($oF->ID).'" title="'.$oF->post_title.'" class="link-villa">';
										echo '		<div class="bg" style="background-image:url('.$img[0].');"></div>';
										echo '		<div class="bg-oFer"></div>';
										echo '		<div class="card-content">';
										echo '			<div class="card-content-left">';
										echo '				<b>'.$oF->post_title.'</b>';
										echo '				<p class="infos">'.$metas['villa_address'][0].', '.$metas['villa_bedrooms'][0].' '.__("bedroom(s)","onestbarts").'</p>';
										echo '				<p class="description">'.$oF->post_excerpt.'<img src="'.THEME_URI.'/dist/img/arrow-long.png"/></p>';
										echo '			</div>';
										echo '			<div class="card-content-right">';
										foreach($_SESSION['money'] as $name => $sigle){
											//$priceTmp=$tabPrice[$sigle];
                                            $priceTmp = get_post_custom_values('villa_price_from', $oF->ID)[0];
											if($name == $_SESSION['money_active'])
											{
												echo '<b class="'.str_replace(' ','-',$name).' active">'.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
												echo '<em class="'.str_replace(' ','-',$name).' active">'.__("Total","onestbarts").': '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
											}
											else
											{
												echo '<b class="'.str_replace(' ','-',$name).'">'.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
												echo '<em class="'.str_replace(' ','-',$name).'">'.__("Total","onestbarts").': '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
											}
										}
										
										echo '			</div>';
										echo '		</div>';
										echo '	</a>';
										if(!in_array($oF->ID,$_SESSION['favorite']))
										{
											echo '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav active" data-id="'.$oF->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
											echo '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav" data-id="'.$oF->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
										}
										else
										{
											echo '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav" data-id="'.$oF->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
											echo '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav active" data-id="'.$oF->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
										}
										echo '</article>';
										$i++;
									}
								?>
							</div>
						<?php
					}
					else
					{
						echo '<div class="noresult">';
						echo '	<p>'.__(" No villas in your favorites", "onestbarts").'</p>';
						echo '</div>';
					}
				?>
				<?php 
				// var_dump($_SESSION);
					// var_dump($_COOKIE["fav"]);
				?>

				<!-- FAVORITE MAP-->
				<div id="favorite-villa-footer">
					<div id="favorite-villa-footer-left">
						<p class="baseline"><?php echo $fields['favoris_form_baseline']; ?></p>
						<h3><?php echo $fields['favoris_form_title']; ?></h3>
						<p class="subtitle"><?php echo $fields['favoris_form_subtitle']; ?></p>
						 <?php echo do_shortcode( '[gravityform id="8" title="true" description="true"]' );  ?>
				<!--		<form method="POST" action="#" class="form" id="form-favorite">
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
									<input type="text" name="arrival" id="arrival" placeholder="<?php _e("Check In", "onestbarts"); ?>" data-pmu-date="<?php echo $_SESSION['booking']['arrivaldate']; ?>"/>
									<input type="text" name="departure" id="departure" placeholder="<?php _e("Check Out", "onestbarts"); ?>" data-pmu-date="<?php echo $_SESSION['booking']['departuredate']; ?>"/>
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
								<a href="#" id="submit-inquiry" title="<?php _e("SUBMIT INQUIRY","onestbarts"); ?>" class="btn"><span><?php _e("SUBMIT INQUIRY","onestbarts"); ?></span><i class="fa fa-spinner"></i></a>
							</div>
						</form> -->
					</div>
					
					<div id="favorite-villa-footer-right">
						<?php
							foreach($fields['favoris_links'] as $key => $oL)
							{
								$img = wp_get_attachment_image_src(get_post_thumbnail_id($oL['link']->ID),'thumb-paysage-big');
								echo '<a href="'.get_permalink($oL['link']->ID).'" title="'.$oL['link']->post_title.'">';
								echo '	<div class="bgimg" style="background-image:url('.$img[0].');"></div>';
								echo '	<h3>'.$oL['link']->post_title.'</h3>';
								echo '</a>';
							}
						?>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>
<?php
	$img = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()),'thumb-portrait');
?>
<div id="popup-favoris" class="popup">	
	<div id="popup-favoris-content" class="popup-content">
		<a href="#" title="<?php _e("close","onestbarts"); ?>" class="popup-close"><span></span><span></span></a>
		<div id="popup-favoris-details" style="background-image:url(<?php echo $img[0]; ?>);" class="col-4">
			<div class="popup-favoris-bg"></div>
			<div id="popup-favoris-details-bottom">
				<?php echo $fields['favorite_form_comments']; ?>
			</div>
		</div>
		<div id="popup-favoris-form" class="col-7">
			<h3><?php _e("SHARE WITH A FRIEND","onestbarts"); ?></h3>
			<p class="baseline">
				<?php _e("Your friend will receive a message with ","onestbarts"); ?><br/>
				<?php _e("a link to your favorite properties","onestbarts"); ?>.
			</p>
			<form id="popup-favoris-share" method="POST" action="#" class="form">
				<div class="clearfix">
					<label><?php _e("To", "onestbarts"); ?> <sup>*</sup></label>
					<input type="email" name="email" id="sh-email" placeholder="<?php _e("Friend's email","onestbarts"); ?>"/>
				</div>
				<div class="clearfix">
					<label><?php _e("From", "onestbarts"); ?> <sup>*</sup></label>
					<input type="text" name="name" id="sh-name" placeholder="<?php _e("Your name","onestbarts"); ?>"/>
				</div>
				<div class="clearfix">
					<label><?php _e("Your message", "onestbarts"); ?> <sup>*</sup></label>
					<input type="text" name="message" id="sh-message" placeholder="<?php _e("Look what I found for our next vacation!","onestbarts"); ?>"/>
				</div>
				<div id="msg-popup-favoris" class="clearfix"></div>
				<a href="#" id="send-popup-favoris" title="<?php _e("send message","onestbarts"); ?>"><span><?php _e("send message","onestbarts"); ?></span><i class="fa fa-spinner"></i></a>
				</div>
			</form>
		</div>
	</div>
</div>
<?php get_footer(); ?>