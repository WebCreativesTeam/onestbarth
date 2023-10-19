 <?php
/*
Template Name: Template - Contact
*/
?>
<?php get_header(); ?>
<?php
	
	$idPage=get_the_ID();
	$fields=get_fields($idPage);
	
	/*
	echo '<pre style="background:black;position:absolute;top:0;left:0;z-index:20000;width:100%;">';
	print_r($fields);
	echo '</pre>';
	*/
?>
<!-- CONTACT -->
<div id="template-contact" class="template">

	<!-- MycoMMent -->
	<?php 
		/*<div id="template-header" style="background-image:url(<?php echo $fields['template_bg']['url']; ?>);"> */
	?>

	<div id="template-header" style="background-image:url(<?php echo $fields['template_bg']['url']; ?>);">
		<div id="template-header-content">
			<h1><?php echo $fields['template_title']; ?></h1>
			<p>
				<a href="tel:<?php echo str_replace(" ","",$fields['contact_telephone']); ?>" title="<?php echo $fields['contact_telephone']; ?>"><?php echo $fields['contact_telephone']; ?></a>
				<a href="mailto:<?php echo $fields['contact_email']; ?>" title="<?php echo $fields['contact_email']; ?>"><?php echo $fields['contact_email']; ?></a>
			</p>
		</div>
	</div>
	
	<!-- FAVORITE CONTENT-->
	<div id="template-content" class="contactus-page-form">
		<div class="container">
			<div class="mw_content">
			<?php 
				the_content(); 
			?>
			</div>
		
		<?php echo do_shortcode( '[gravityform id="5" title="true" description="true"]' );  ?>
			<!-- <form id="contact-form" action="#" method="POST">
                <div class="clearfix">
					<input type="text" name="contact-name" id="contact-name" placeholder="<?php _e("Name and firstname","onestbarts"); ?>"/>
                </div>
				<div class="clearfix">
					<input type="email" name="contact-email" id="contact-email" placeholder="<?php _e("Your email","onestbarts"); ?>"/>
                </div>
                <div class="clearfix">
					<input type="text" name="contact-message" id="contact-message" placeholder="<?php _e("Your message","onestbarts"); ?>"/>
                </div>
                <div id="contact-validation">
                    <a href="#" title="<?php _e("Get in Touch", "onestbarts"); ?>" id="valider-contact" class="valider">
                        <span><?php _e("Get in Touch","onestbarts"); ?></span>
                        <i class="fa fa-spinner"></i>
                    </a>
                </div>
                <div id="msg-contact" class="backmsg"></div>
            </form> -->
			
			<div id="contact-content">
				<h3><?php echo $fields['contact_location_title']; ?></h3>
				<h4><?php echo $fields['contact_location_adress']; ?></h4>
			</div>
		</div>
		
		<!-- TEMPLATE MAP-->
		<div id="template-map">
			<div id="ggmap"></div>
		</div> 
	</div>
</div>
<?php get_footer(); ?>