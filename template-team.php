 <?php
/*
Template Name: Template - Team
*/
?>
<?php get_header(); ?>
<?php
	
	$idPage=get_the_ID();
	$fields=get_fields($idPage);
	
	$collections = get_terms( 'collection', array(
		'hide_empty' => false,
	));
	
	/*
	echo '<pre style="background:black;position:absolute;top:0;left:0;z-index:20000;width:100%;">';
	print_r($collections);
	echo '</pre>';
	*/
?>
<!-- PHILOSOPHY -->
<div id="template-philosophy" class="template">
<?php 
// echo "<pre>";
// print_r($fields['philosophy_article']);
?>
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
			
			<div id="philosophy-baseline">
				<h2><?php echo $fields['philosophy_baseline']; ?></h2>
			</div>
			
			<div id="philosophy-content" class="meet-team">
				<?php
					foreach($fields['philosophy_article'] as $k => $oA)
					{
						echo '<article>';
						echo '	<figure>';
						echo '		<img src="'.$oA['image']['sizes']['medium_large'].'" alt="'.$oA['image']['title'].'"/>';
						echo '	</figure>';
						echo ' 	<div class="article-content">';		
						echo ' 		<h3>'.$oA['title'].'</h3>';
						echo ' 		<h4>'.$oA['desgination'].'</h4>';
						echo ' 		<div class="article-text">'.wpautop($oA['content']).'</div>';
						echo ' 		<div class="article-baseline">'.$oA['bottom_description'].'</div>';
						echo ' 		<div class="contact-email"><a href="mailto:'.$oA['email'].'">'.$oA['email'].'</a></div>';
						echo ' 		<div class="contact-number"><a href="tel:'.$oA['phone'].'">'.$oA['phone'].'</a></div>';
						echo '	</div>';
						echo '</article>';
					}
				?>
			</div>
			
			<div id="philosophy-collections">
				<h3><?php _e("Checkout villa collection","onestbarts"); ?></h3>
				<div class="owl-carousel">
				<?php
					foreach($collections as $k => $oC)
					{
						$imgCollection=get_field('collection_image', 'collection_'.$oC->term_id);
						echo '<div>';
						$linkof_term  = get_term_link( $oC->term_id );
						echo '<a href='.$linkof_term.'>';
						echo '	<img src="'.$imgCollection['sizes']['thumb-wide'].'" alt="'.$oC->name.'"/>';
						echo '	<strong>'.$oC->name.'</strong>';
						echo '</a>';
						echo '</div>';
						
					}
				?>
				</div>
			</div>
		</div>
	</div>
</div>
<?php get_footer(); ?>