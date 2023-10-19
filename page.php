<?php get_header(); ?>
<?php
	$idPage=get_the_ID();
	$fields=get_fields($idPage);
	
	/*echo '<pre style="background:cyan">';
	print_r($fields);
	echo '</pre>';*/
?>
<!-- PAGE -->


<div id="template-default" class="template">

<?php if( get_field('template_title') ): ?>

	<div id="template-header"  style="background-color: #696969;">
		<div id="template-header-content">
			<p class="description"><?php echo $fields['template_description']; ?></p>
			<h2><?php echo $fields['template_title']; ?></h2>
		</div>
	</div>

<?php endif; ?>


<div id="template-content">
		<div class="container">

		<?php if( get_field('template_title') ): ?>	
			<div class="breadcrumb">
				<?php custom_breadcrumbs(); ?>
			</div>
		<?php endif; ?>

		<div class="row">
			<div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
				<div class="post-content">
					<?php the_content(); ?>
				</div>
			</div>
			<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
				<div id="sidebar">
					<?php dynamic_sidebar('sidebar'); ?>
				</div>
			</div>
		</div>
	</div>
</div>

</div>
<?php get_footer(); ?>