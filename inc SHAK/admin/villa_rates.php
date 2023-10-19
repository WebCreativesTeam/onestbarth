<?php
	global $wpdb;
	$user_ID = get_current_user_id();
	
	$arg = array( 'post_type' => 'rental', 'posts_per_page' =>-1,'post_status'=>'publish','orderby' => 'date', 'order' => 'DESC'); 
	$ListeV= new WP_Query($arg);
	$villas=$ListeV->posts;
	
?>
<div id="villa-rates">
	<h2 id="villa-rates-title">VILLA RATES</h2>
	<div id="villa-rates-content">
		<?php
			foreach($villas as $key => $oV)
			{
				$fields=get_fields($oV->ID);
				/*echo '<pre>';
				print_r($fields['villa_rates']);
				echo '</pre>';*/
				
				echo '	<div class="table-responsive">';
				echo '		<div class="villa-title">';
				echo '			<h3>'.$oV->post_title.'</h3>';
				echo '			<a href="#" title="open" data-text="close"><span></span><span></span></a>';
				echo '		</div>';
				echo '		<div class="content-form">';
				echo '			<ul class="thead">';
				echo '				<li>Season</li>';
				echo '				<li>NB bedrooms</li>';
				echo '				<li>NB nights</li>';
				echo '				<li>Price DOL</li>';
				echo '				<li>Price EUR</li>';
				echo '				<li>Price CAD</li>';
				echo '				<li>Price CHF</li>';
				echo '				<li>Price JPY</li>';
				echo '				<li>Price RUB</li>';
				echo '				<li>Price GBP</li>';
				echo '				<li>Price BRL</li>';
				echo '				<li>Validation</li>';
				echo '			</ul>';
				$i=0;
				foreach($fields['villa_rates'] as $key2 => $oR)
				{
					$j=0;
					foreach($oR['bedrooms_infos'] as $key2 => $oB)
					{
						/*echo '<pre>';
						print_r($oB);
						echo '</pre>';*/
						echo '<form meliod="POST" action="#">';
						echo '	<ul>';
						echo '		<li><b>'.strtoupper($oR['rate_season']).'</b></li>';
						echo '		<li>'.$oB['nb_bedrooms'].'</li>';
						echo '		<li><input type="text" name="villa_rates_'.$i.'_bedrooms_infos_'.$j.'_nb_nights_minimum" value="'.$oB['nb_nights_minimum'].'"/></li>';
						echo '		<li><input type="text" name="villa_rates_'.$i.'_bedrooms_infos_'.$j.'_price_dollar" value="'.$oB['price_dollar'].'"/></li>';
						echo '		<li><input type="text" name="villa_rates_'.$i.'_bedrooms_infos_'.$j.'_price_euro" value="'.$oB['price_euro'].'"/></li>';
						echo '		<li><input type="text" name="villa_rates_'.$i.'_bedrooms_infos_'.$j.'_price_dollar_canadien" value="'.$oB['price_dollar_canadien'].'"/></li>';
						echo '		<li><input type="text" name="villa_rates_'.$i.'_bedrooms_infos_'.$j.'_price_franc_suisse" value="'.$oB['price_franc_suisse'].'"/></li>';
						echo '		<li><input type="text" name="villa_rates_'.$i.'_bedrooms_infos_'.$j.'_price_yen" value="'.$oB['price_yen'].'"/></li>';
						echo '		<li><input type="text" name="villa_rates_'.$i.'_bedrooms_infos_'.$j.'_price_rouble" value="'.$oB['price_rouble'].'"/></li>';
						echo '		<li><input type="text" name="villa_rates_'.$i.'_bedrooms_infos_'.$j.'_price_livre" value="'.$oB['price_livre'].'"/></li>';
						echo '		<li><input type="text" name="villa_rates_'.$i.'_bedrooms_infos_'.$j.'_price_real" value="'.$oB['price_real'].'"/></li>';
						echo '		<li><a href="#" class="button button-primary button-large valid"><span>OK</span><i class="fa fa-spinner"></i></a></li>';
						echo '		<input type="hidden" name="villa_id" value="'.$oV->ID.'"/>';
						echo '	</ul>';
						echo '</form>';
						$j++;						
					}
					$i++;	
				}
				echo '	</div>';
				echo '</div>';
			}
		?>
	</div>
</div>