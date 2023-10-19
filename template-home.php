<?php
/*
Template Name: Template - HOME
*/
?>
<?php get_header(); ?>
<?php
	
	$idPage=get_the_ID();
	$fields=get_fields($idPage);
	
	createDateRangeArray();
	
	if(isset($_GET['debug']))
	{
		echo '<pre style="background:black">';
		print_r($fields['home_villa_collections']);
		echo '</pre>';	
	}
	
	// VILLA ENTRY
	// $arg = array( 'post_type' => 'rental', 'category_name' => 'new_entry', 'posts_per_page' =>3,'post_status'=>'publish','orderby' => 'rand'); 

	function array_random($arr, $num = 1) {
	    shuffle($arr);
	    
	    $r = array();
	    for ($i = 0; $i < $num; $i++) {
	        $r[] = $arr[$i];
	    }
	    return $num == 1 ? $r[0] : $r;
	}
	$a = array("apple", "banana", "cherry");
// print_r(array_random($a));
// print_r(array_random($a, 2));

// exit();

	$arg = array( 
			'post_type' => 'rental',
			'post_status'=>'publish', 
			'posts_per_page' => 10, 
			// 'orderby' => 'rand',
			'meta_query' => array(
								array(	
									'key' => 'featured',
									'value' => '1',
									'compare' => '='
								)
							)
		); 
	
	$ListeV = new WP_Query($arg);

	// $listrand = array_rand($ListeV->posts, 3);
	// echo "<pre>";
	$a = $ListeV->posts;
	$villa_entry = array_random($a, 3);

	// $random_keys=array_rand($a, 3);

	// print_r($a[$random_keys[0]]);
	// echo "<hr>";
	// print_r($a[$random_keys[1]]);
	// echo "<hr>";
	// print_r($a[$random_keys[2]]);

	// print_r($ListeV->posts);
	// exit();
	

	// $villa_entry=$ListeV->posts;
	
	/*
	echo '<pre style="background:black">';
	print_r($_SESSION['ratestab']);
	echo '</pre>';	
	*/
?>


<?php
/*
<!-- SLIDER HOME -->
<div id="home-slider" class="clearfix">
	<?php //<img src="<?php echo THEME_URI; ?>/dist/img/logo-white.png" alt="Onestbarts"/> ?>
	<div id="home-slider-content" class="owl-carousel">
		<?php
			foreach($fields['page_slider'] as $key => $oS){
				echo '<article style="background-image:url('.$oS['image']['url'].');">';
				//echo '	<img src="'.$oS['image']['url'].'" alt="'.$oS['image']['title'].'"/>';
				
				echo '<div class="caption">';
				echo '	<b class="title-top">'.$oS['title_top'].'</b>';
				echo '	<h2 class="title">'.$oS['title'].'</h2>';
				echo '	<p class="subtitle">'.$oS['subtitle'].'</p>';
				if(isset($oS['link_text']) && $oS['link_text']!='' && isset($oS['link_redirection']) && $oS['link_redirection']!='')
				{
					echo '<a href="'.$oS['link_redirection'].'" title="'.$oS['link_text'].'" class="btn-1 btn-slider-home">'.$oS['link_text'].'</a>';
				}
				echo '</div>';
				echo '</article>';
			}
		?>
	</div>
	<a href="#home" id="scroll-down">
		<img src="<?php echo THEME_URI; ?>/dist/img/thin-arrow.png"/>
		<span><?php _e("Scroll Down","onestbarts"); ?></span>
	</a>
</div>

*/
?>

<!-- PARALLAX HOME -->
<div id="home-parallax" class="clearfix">
	<article>
		<div class="bg-mobile" style="background-image:url(<?php echo $fields['parallax_img_responsive']['url']; ?>);"></div>
		<ul class="parallax-container"  data-friction-y="0.1" data-friction-x="0.1">
			<li class="layer" data-depth="0.05"><div class="layer" style="background-image:url(<?php echo $fields['parallax_img_bg']['url']; ?>);"></div></li>
			<li class="layer" data-depth="0.1"><div class="layer" style="background-image:url(<?php echo $fields['parallax_img_middle']['url']; ?>);"></div></li>
			<li class="layer" data-depth="0.15"><div class="layer" style="background-image:url(<?php echo $fields['parallax_img_first']['url']; ?>);"></div></li>
		</ul>
		<div class="caption">
			<b class="title-top"><?php echo $fields['parallax_title_top']; ?></b>
			<h2 class="title"><?php echo $fields['parallax_title']; ?></h2>
			<p class="subtitle"><?php echo $fields['parallax_subtitle']; ?></p>
		<?php
			if(isset($fields['parallax_link_text']) && $fields['parallax_link_text']!='' && isset($fields['parallax_link_redirection']) && $fields['parallax_link_redirection']!='')
			{
				echo '<a href="'.$fields['parallax_link_redirection'].'" title="'.$fields['parallax_link_text'].'" class="btn-1 btn-slider-home">'.$fields['parallax_link_text'].'</a>';

			}
		?>
		</div>
		<a href="#home" id="scroll-down">
			<img src="<?php echo THEME_URI; ?>/dist/img/thin-arrow.png"/>
			<span><?php _e("Scroll Down","onestbarts"); ?></span>
		</a>
	</article>
</div>


<!-- HOME -->
<div id="home" class="clearfix">
	<!-- HOME CONTENT-->
	<section id="home-content" class="section">
		<div class="container">
			<?php the_content(); ?>
		</div>
	</section>
	

	
	<section id="home-collections" class="section">
		<div class="container">
			<div>
				<h1 class="home-collection-h1"><?php echo $fields['ctitle']; ?></h1>

				<p class="home-collection-p"><?php echo $fields['cdescription']; ?></p>
			</div>
			<div id="home-collections-content" >
			
			<?php echo do_shortcode( $fields['slider_info'] ); ?>

			
			<?php // echo do_shortcode( "[slide-anything id='5838']"); ?>
			<!--
				<?php /*
					if( have_rows('villa_collections_new') ):
						while ( have_rows('villa_collections_new') ) : the_row();
							echo '<article>';
							echo '	<figure style="background-image:url('.get_sub_field('villa_image').');"></figure>';
							echo '	<div class="text">';
							echo '		<h4>'.get_sub_field('villa_title').'</h4>';
							echo '		<h3>'.get_sub_field('villa_subtitle').'</h3>';
							echo '		<p class="desc">'.get_sub_field('excerpt').'</p>';
							echo '		<div class="collections-link" data-aaaaa="'.$oC['page_collection'].'">';
							echo '			<a href="'.get_sub_field('collections_link').'" title="'.__(get_sub_field('villa_button'),"onestbarts").'" >'.__(get_sub_field('villa_button'),"onestbarts").'</a>';
							echo '		</div>';
							echo '	</div>';
							echo '</article>';
						endwhile;	
					endif;
					*/
				?>-->
			</div> 
		</div>
	</section>


	<!-- HOME SERVICES-->
	<section id="home-services" class="section">
		<div class="container">
			<h3><?php echo $fields['services_title']; ?></h3>
			<p class="desc"><?php echo $fields['services_description']; ?></p>
			<div id="home-services-content">
				<span id="bullet"></span>
				<?php
					$i=1;
					foreach($fields['services'] as $key => $oS){
						echo '<a href="#" title="'.$oS['service_title'].'" data-slide="'.$i.'" class="service">';
						echo '	<span>'.$i.'</span>';
						echo '	<b class="tagline">'.$oS['service_title'].'</b>';
						echo '</a>';
						$i++;
					}
				?>
			</div>
		</div>
	</section>
	
	<!-- HOME ENTRY-->
	<section id="home-entry" class="section">
		<div class="container">
			<h3><?php echo $fields['entry_title']; ?></h3>
			<p class="desc"><?php echo $fields['entry_description']; ?></p>
			<div id="home-entry-content"  class="owl-carousel">
				<?php

					foreach($villa_entry as $key => $oE){
						$img = wp_get_attachment_image_src(get_post_thumbnail_id($oE->ID),'thumb-portrait');
						$bedrooms=get_field('villa_bedrooms',$oE->ID);
						$location = get_the_terms( $oE->ID, 'location');
						echo '<a href="'.get_permalink($oE->ID).'" title="'.$oE->post_title.'">';
						echo '	<figure>';
						echo '		<img src="'.$img[0].'" alt="'.$oE->post_title.'"/>';
						echo ' 	</figure>';
						echo '	<div class="over"></div>';
						echo '	<div class="home-entry-text">';
						echo '		<h4>'.$oE->post_title.'</h4>';
						echo '		<p class="infos">'.$bedrooms.' '.__("bedroom(s)","onestbarts").' | '.$location[0]->name.'</p>';
						echo '		<span class="btn-2">'.__("View villa","onestbarts").'</span>';
						echo '	</div>';
						echo '</a>';
					}
				?>
			</div>
			<div id="home-entry-seemore">
				<a href="<?php echo get_category_link(4); ?>" title="<?php _e("VIEW THE LATEST ENTRIES", "onestbarts"); ?>" class="btn-1"><?php _e("VIEW THE LATEST ENTRIES", "onestbarts"); ?></a>
			</div>
		</div>
	</section>
	
	<!-- HOME EXPERIENCES-->
	<section id="home-experiences" class="section">
		<div class="container">
			<h3><?php echo $fields['exp_title']; ?></h3>
			<p class="desc"><?php echo $fields['exp_description']; ?></p>
			<div id="home-experiences-content" class="owl-carousel">
				<?php
					foreach($fields['experiences'] as $key => $oE){
						echo '<article>';
						echo '	<figure>';
						echo '		<img src="'.$oE['image']['url'].'" alt="'.$oE['title'].'"/>';
						echo ' 	</figure>';
						echo '	<div class="over">';
						echo '		<h4>'.$oE['title'].'</h4>';
						echo '		<p class="category">'.$oE['category'].'</p>';
						echo '		<p class="desc">'.$oE['description'].'</p>';
						echo '	</div>';
						echo '</article>';
					}
				?>
			</div>
			<?php
			/*
			<div id="home-experiences-seemore">
				<a href="#" title="<?php _e("ENQUIRE NOW", "onestbarts"); ?>" class="btn-1 open-inquire"><?php _e("ENQUIRE NOW", "onestbarts"); ?></a>
			</div>
			*/
			?>
		</div>
	</section>
	
	<!-- HOME INSTAGRAM-->
	<section id="home-instagram" class="section">
		<div class="container">
			<h3><?php echo $fields['instagram_title']; ?></h3>
			<p class="desc"><?php echo $fields['instagram_description']; ?></p>
			<div id="home-instagram-content">
				<?php # echo wdi_feed(array('id'=>'1')); ?>
				<?php echo do_shortcode('[instagram-feed]'); ?>
			</div>
		</div>
	</section>
</div>	

<?php
	$img = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()),'thumb-portrait');
?>
<div id="popup-inquire-home" class="popup">	
	<div id="inquire-content" class="popup-content">
		<a href="#" title="<?php _e("close","onestbarts"); ?>" class="popup-close"><span></span><span></span></a>
		<div id="inquire-details" style="background-image:url(<?php echo $img[0]; ?>);" class="col-4">
			<div class="inquire-bg"></div>
			<div id="inquire-details-bottom">
				<?php echo $fields['home_popup_inquire_text']; ?>
			</div>
		</div>
		<div id="inquire-form" class="col-7">
			<form id="inquire-home" method="POST" action="#" class="form">
				<div class="clearfix">
					<label><?php _e("Name", "onestbarts"); ?> <sup>*</sup></label>
					<input type="name" name="name" id="name" value="<?php if(isset($_SESSION['booking']['name'])){echo $_SESSION['booking']['name'];} ?>"/>
				</div>
				<div class="clearfix">
					<label><?php _e("Email", "onestbarts"); ?> <sup>*</sup></label>
					<input type="email" name="email" id="email" value="<?php if(isset($_SESSION['booking']['email'])){echo $_SESSION['booking']['email'];} ?>"/>
				</div>
				<div class="clearfix">
					<label><?php _e("Comments", "onestbarts"); ?> </label>
					<textarea name="comments"><?php if(isset($_SESSION['booking']['comments'])){echo $_SESSION['booking']['comments'];} ?></textarea>
				</div>	
				<div id="msg-inquire" class="clearfix"></div>
				<a href="#" id="send-inquire" title="<?php _e("Inquire now","onestbarts"); ?>"><span><?php _e("Inquire now","onestbarts"); ?></span><i class="fa fa-spinner"></i></a>
				</div>
			</form>
		</div>
	</div>
</div>


<!-- POPUP SERVICES -->
<div id="popup-services" class="popup">	
	<a href="#" title="<?php _e("close","onestbarts"); ?>" class="popup-close"><span></span><span></span></a>
	<div id="popup-services-content" class="popup-content">
		<div id="popup-services-slider" class="owl-carousel">
			<?php
				$i=1;
				foreach($fields['services'] as $key => $oS){
					echo '<article>';
					echo '	<div class="service-title">';
					echo '		<div class="service-title-content">';
					echo '			<h3>'.$i.'|'.$oS['service_title'].'</h3>';
					echo '			<div class="post">'.$oS['service_text'].'</div>';
					echo '		</div>';
					echo '	</div>';
					echo '	<div class="service-content">';
					echo '		<figure style="background-image:url('.$oS['service_image']['url'].');"></figure>';
					echo '		<div class="service-content-text">'.$oS['service_content'];
					echo '			<div class="service-link">';
					echo '				<a href="#" title="'.__("Start PLANNING YOUR VACATIION","onestbarts").'" class="btn-1 open-booking">'.__("Start PLANNING YOUR VACATIION","onestbarts").'</a>';
					echo '			</div>';
					echo '		</div>';
					echo '	</div>';
					echo '</article>';
					$i++;
				}
			?>
		</div>
		<?php
			$i=1;
			echo '<div class="service-prev">'; 
				foreach($fields['services'] as $key => $oS){
					$prev=$i-1;
					if($prev > 0)
					{
						echo '<a href="#" data-slide="'.$prev.'" id="service-prev-'.$i.'">'.$prev.'</a>';
					}
					$i++;
				}
			echo '</div>';
			
			$i=1;
			echo '<div class="service-next">'; 
				foreach($fields['services'] as $key => $oS){
					$next=$i+1;
					if($next <= count($fields['services']))
					{
						echo '<a href="#" data-slide="'.$next.'" id="service-next-'.$i.'">'.$next.'</a>';
					}
					$i++;
				}
			echo '</div>';
		?>
	</div>
</div>





<?php get_footer(); ?>