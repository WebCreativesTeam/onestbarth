var hWin=jQuery(window).height();	
var wWin=jQuery(window).width();

jQuery(document).ready(function(){

	// OPEN VILA RATES
	jQuery('#villa-rates .villa-title a').on('click',function(){
		jQuery(this).toggleClass('close');
		
		var text1=jQuery(this).attr('title');
		var text2=jQuery(this).data('text');
		
		jQuery(this).attr('title',text2);
		jQuery(this).data('text',text1);
		
		jQuery('#villa-rates .content-form').removeClass('active');
		jQuery(this).parent().parent().find('.content-form').addClass('active');
			
		return false;
	})
	
	// VALIDE MODIF
	jQuery('#villa-rates a.valid').on('click',function(){
		jQuery(this).addClass('loading');
		jQuery.post(
			ajaxurl,
			{
				'action': 'villarates',
				'datas': jQuery(this).parent().parent().parent().serialize(),
			},
			function(response){
				//alert(response);
				jQuery('a.valid').removeClass('loading');
			}
		);
		return false;
	})
})