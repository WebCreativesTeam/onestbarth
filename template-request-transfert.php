 <?php
/*
Template Name: Template - Request Transfert
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
<!-- REQUEST TRANSFERT -->
<div id="template-transfert" class="template">

	<div id="template-header" style="background-image:url(<?php echo $fields['template_bg']['url']; ?>);">
		<div id="template-header-content">
			<p class="description"><?php echo $fields['template_description']; ?></p>
			<h1><?php echo $fields['template_title']; ?></h1>
		</div>
	</div>
	
	<!-- FAVORITE CONTENT-->
	<div id="template-content">
		<div class="container">
			<div class="breadcrumb">
				<a href ="<?php echo get_home_url(); ?>" title="<?php _e("Home","onestbarts"); ?>"><?php _e("Home","onestbarts"); ?></a> /
				<span><?php the_title(); ?></span>
			</div>
			
			<div id="transfert-baseline">
				<h2><?php echo $fields['transfert_baseline']; ?></h2>
			</div>
			
			<div id="transfert-content">
				<?php
					foreach($fields['transfert_article'] as $k => $oA)
					{
						echo '<article>';
						echo ' <h3>'.$oA['title'].'</h3>';
						echo ' <div class="article-content">'.wpautop($oA['content']).'</div>';
						echo ' <div class="article-slider owl-carousel">';
						foreach($oA['galerie'] as $cle => $oS)
						{
							echo '<img src="'.$oS['sizes']['large'].'" alt="'.$oS['title'].'"/>';
						}
						echo '	</div>';
						echo '</article>';
					}
				?>
			</div>
			<?php echo do_shortcode( '[gravityform id="6" title="true" description="true"]' );  ?>
			<!--<form id="transfert-form" action="#" method="POST">
				<h3><?php the_title(); ?></h3>
                <div class="clearfix">
					<input type="text" name="transfert-name" id="transfert-name" placeholder="<?php _e("Name and firstname","onestbarts"); ?>"/>
                </div>
				<div class="clearfix">
					<input type="email" name="transfert-email" id="transfert-email" placeholder="<?php _e("Your email","onestbarts"); ?>"/>
                </div>
                <div class="clearfix">
					<input type="text" name="transfert-message" id="transfert-message" placeholder="<?php _e("Your message","onestbarts"); ?>"/>
                </div>
                <div id="transfert-validation">
                    <a href="#" title="<?php _e("SEND INQUIRY", "onestbarts"); ?>" id="valider-transfert" class="valider">
                        <span><?php _e("SEND INQUIRY","onestbarts"); ?></span>
                        <i class="fa fa-spinner"></i>
                    </a>
                </div>
                <div id="msg-transfert" class="backmsg"></div>
            </form>  --> 
			
		</div>
	</div>
</div>
<?php get_footer(); ?>