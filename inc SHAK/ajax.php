<?php

// AJAX EXCHANGE
add_action( 'wp_ajax_exchange', 'exchange' );
add_action( 'wp_ajax_nopriv_exchange', 'exchange' );
function exchange(){

	$exchange = array_map('trim', $_POST);
	global $wpdb;

	$_SESSION['rates']['EUR']=$exchange['EUR'];
	$_SESSION['rates']['CAD']=$exchange['CAD'];
	$_SESSION['rates']['CHF']=$exchange['CHF'];
	$_SESSION['rates']['JPY']=$exchange['JPY'];
	$_SESSION['rates']['RUB']=$exchange['RUB'];
	$_SESSION['rates']['BRL']=$exchange['BRL'];
	$_SESSION['rates']['GBP']=$exchange['GBP'];
	
	/*
	echo '<pre>';
	print_r($_SESSION['rates']);
	echo '<pre>';
	*/
	
	wp_reset_query();
	$arg = array(
		'post_type' => 'rental', 
		'posts_per_page' =>-1,
		'post_status'=>'publish',
		'orderby' => 'date',
		'order' => 'DESC'
	); 
	$ListeV= new WP_Query($arg);
	$villas=$ListeV->posts;
	
	$rates=array();
	foreach($villas as $key => $oV)
	{
		$villa_rates=get_field('villa_rates', $oV->ID);

		$blop=array();
		foreach($villa_rates as $key => $oVR)
		{
			/*echo '<pre>';
			print_r($oVR);
			echo '<pre>';
			*/
			$tmp=array();
			foreach($oVR['bedrooms_infos'] as $key => $oVRBd)
			{
				$price=$oVRBd['price_dollar'];
				$tmp[$oVRBd['nb_bedrooms']]['USD']=$price;
				$tmp[$oVRBd['nb_bedrooms']]['EUR']=number_format($price*$_SESSION['rates']['EUR'],0,',',' ');
				$tmp[$oVRBd['nb_bedrooms']]['CAD']=number_format($price*$_SESSION['rates']['CAD'],0,',',' ');
				$tmp[$oVRBd['nb_bedrooms']]['CHF']=number_format($price*$_SESSION['rates']['CHF'],0,',',' ');
				$tmp[$oVRBd['nb_bedrooms']]['JPY']=number_format($price*$_SESSION['rates']['JPY'],0,',',' ');
				$tmp[$oVRBd['nb_bedrooms']]['RUB']=number_format($price*$_SESSION['rates']['RUB'],0,',',' ');
				$tmp[$oVRBd['nb_bedrooms']]['BRL']=number_format($price*$_SESSION['rates']['BRL'],0,',',' ');
				$tmp[$oVRBd['nb_bedrooms']]['GBP']=number_format($price*$_SESSION['rates']['GBP'],0,',',' ');
			}
			$oVR['rate_season_type'];
			$blop[$oVR['rate_season_type']]=$tmp;
			
		}
		
		$rates[$oV->ID]=$blop;	
	}
	$_SESSION['ratestab']=$rates;
	echo '<pre>';
	print_r($_SESSION['ratestab']);
	echo '<pre>';
	die();
}	




// FILTER LISTING
add_action( 'wp_ajax_filterlisting', 'filterlisting' );
add_action( 'wp_ajax_nopriv_filterlisting', 'filterlisting' );
function filterlisting(){

	$filter= array_map('trim', $_POST);
	
	/*
	echo '<pre>';
	print_r($filter);
	echo '</pre>';
	*/
	
	wp_reset_query();
	$args = array(
		'post_type' => 'rental', 
		'posts_per_page' =>-1,
		'post_status'=>'publish',
	);
	
	// TRI
	switch($filter['tri']){
		case 'recommended':
			$args['orderby'] = 'date';
			$args['order'] = 'DESC';
		break;
		case 'nameASC':
			$args['orderby'] = 'name';
			$args['order'] = 'ASC';
		break;
		case 'nameDESC':
			$args['orderby'] = 'name';
			$args['order'] = 'DESC';
		
		break;
		case 'prixmin':
			$args['orderby']='meta_value_num';
			$args['meta_key']='villa_price_from';
			$args['order'] = 'ASC';
		break;
		case 'prixmax':
			$args['orderby']='meta_value_num';
			$args['meta_key']='villa_price_from';
			$args['order'] = 'DESC';
		break;
	}
	
	// DATES
	if(isset($filter['dateArrival']) && $filter['dateArrival']!=''){
		$_SESSION['booking']['arrivaldate'] = $filter['dateArrival'];
	}
	
	if(isset($filter['dateDeparture']) && $filter['dateDeparture']!=''){
		$_SESSION['booking']['departuredate'] = $filter['dateDeparture'];
	}
	
	
	if(isset($filter['dateArrival']) && $filter['dateArrival']!='' && isset($filter['dateDeparture']) && $filter['dateDeparture']!=''){
		createDateRangeArray();
	}

	// PRICE
	/*
	if(isset($filter['priceMin']) && $filter['priceMin']!=''){
		$args['meta_query'][] = array(
			'key' => 'villa_price_from',
			'value' => $filter['priceMin'],
			'compare' => '>='
		);
	}
	
	
	if(isset($filter['priceMax']) && $filter['priceMax']!=''){
		$args['meta_query'][] = array(
			'key' => 'villa_price_from',
			'value' => $filter['priceMax'],
			'compare' => '<='
		);
	}
	
	if(isset($filter['priceMin']) && $filter['priceMin']!='' && isset($filter['priceMax']) && $filter['priceMax']!=''){
		$args['meta_query']['relation'] = 'AND';
	}
	*/
	
	if(isset($filter['priceMin']) && $filter['priceMin']!='' && isset($filter['priceMax']) && $filter['priceMax']!=''){
		$args['meta_query'][] = array(
			'key' => 'villa_price_from',
			'value' => array($filter['priceMin'],$filter['priceMax']),
			'compare' => 'BETWEEN',
			'type'   => 'numeric',
		);
	}
	
	
	// BEDROOMS
	$tabBed=array();
	if(isset($filter['bedroom']) && $filter['bedroom']!=''){
		if(is_numeric($filter['bedroom']))
		{
			$args['meta_query'][] = array(
				'key' => 'villa_bedrooms',
				'value' => $filter['bedroom'],
				'compare' => '>='
			);
			$_SESSION['booking']['nbbeds'] = $filter['bedroom'];
		}
		else
		{
			$tabBed=explode('|',$filter['bedroom']);
			$args['meta_query'][] = array(
				'relation' => 'AND',
				array(
					'key' => 'villa_bedrooms',
					'value' => min($tabBed),
					'compare' => '>='
				),
				array(
					'key' => 'villa_bedrooms',
					'value' => max($tabBed),
					'compare' => '<='
				)
			);
		}
	}
	else{
		$_SESSION['booking']['nbbeds'] = '';
	}
	
	
	// LOCATIONS
	if(isset($filter['location']) && $filter['location']!=''){
		$tmpL = explode('|',$filter['location']);
		$l=Array();
		
		foreach($tmpL as $oL){
			$l[]=$oL;
		}
		
		$args['tax_query'][] = array(
			'taxonomy' => 'location',
			'field' => 'slug',
			'terms' => $l
		);
	}
	
	// COLLECTIONS
	if(isset($filter['collection']) && $filter['collection']!=''){
		$tmpC = explode('|',$filter['collection']);
		$c=Array();
		
		foreach($tmpC as $oC){
			$c[]=$oC;
		}
		
		$args['tax_query'][] = array(
			'taxonomy' => 'collection',
			'field' => 'slug',
			'terms' => $c
		);
	}
	
	if(isset($filter['location']) && $filter['location']!='' && isset($filter['collection']) && $filter['collection']!=''){
		$args['tax_query']['relation'] = 'OR';
	}
	
	/*
	echo '<pre>';
	print_r($args);
	print_r($tabBed);
	echo '</pre>';
	*/
	
	$ListeV= new WP_Query($args);
	$villas=$ListeV->posts;

	/*echo '<pre>';
	print_r($_SESSION['ratestab']);
	echo '</pre>';*/
	
	$html='';
	$nbNights=count($_SESSION['booking']['dates']);
	$nbvillas=0;

	if(!empty($villas))
	{
		$i=0;
		foreach($villas as $key => $oV)
		{
			$img = wp_get_attachment_image_src(get_post_thumbnail_id($oV->ID),'thumb-paysage-big');
			$metas=get_post_meta($oV->ID);
			$fields=get_fields($oV->ID);
			
			$tab= array();
			
			// BEDROOM NUMBER
			foreach($fields['villa_rates'][0]['bedrooms_infos'] as $k => $obed)
			{
				$tab[]=$obed['nb_bedrooms'];
			}
			/*
			echo '<pre>';
			print_r($tab);
			echo '</pre>';
			*/
			if(empty($tabBed))
			{
				if(in_array($_SESSION['booking']['nbbeds'], $tab))
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
					$location = get_the_terms( $oV->ID, 'location');

					
					$html.= '<article class="card" id="card-'.$oV->ID.'" data-idmarker="'.$i.'" data-link="'.get_permalink($oV->ID).'" data-latitude="'.$metas['villa_latitude'][0].'" data-longitude="'.$metas['villa_longitude'][0].'" data-title="'.$oV->post_title.'" data-img="'.$img[0].'" data-bedrooms="'.$metas['villa_bedrooms'][0].'"   data-pools="'.$metas['villa_pools'][0].'" data-location="'.$metas['villa_address'][0].'">';
					$html.= '	<a href="'.get_permalink($oV->ID).'" title="'.$oV->post_title.'" class="link-villa">';
					$html.= '		<div class="bg" style="background-image:url('.$img[0].');"></div>';
					$html.= '		<div class="bg-over"></div>';
					$html.= '		<div class="card-content">';
					$html.= '			<div class="card-content-left">';
					$html.= '				<b>'.$oV->post_title.'dd dq</b>';
					$html.= '				<p class="infos">'.$location[0]->name.', '.$metas['villa_bedrooms'][0].' '.__("bedroom(s)","onestbarts").'</p>';
					$html.= '				<p class="description">'.$oV->post_excerpt.'<img src="'.THEME_URI.'/dist/img/arrow-long.png"/></p>';
					$html.= '			</div>';
					$html.= '			<div class="card-content-right">';
					foreach($_SESSION['money'] as $name => $sigle){
						$priceTmp=$tabPrice[$sigle];
						if($name == $_SESSION['money_active'])
						{
							if($from)
							{
								$html.= '<b class="'.str_replace(' ','-',$name).' active">'.__("From","onestbarts").' '.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
								$html.= '<em class="'.str_replace(' ','-',$name).' active">'.__("Total","onestbarts").': '.__("From","onestbarts").' '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
							}
							else{
								$html.= '<b class="'.str_replace(' ','-',$name).' active">'.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
								$html.= '<em class="'.str_replace(' ','-',$name).' active">'.__("Total","onestbarts").': '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
							}
						}
						else
						{
							if($from)
							{
								$html.= '<b class="'.str_replace(' ','-',$name).'">'.__("From","onestbarts").' '.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
								$html.= '<em class="'.str_replace(' ','-',$name).'">'.__("Total","onestbarts").': '.__("From","onestbarts").' '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
							}
							else{
								$html.= '<b class="'.str_replace(' ','-',$name).'">'.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
								$html.= '<em class="'.str_replace(' ','-',$name).'">'.__("Total","onestbarts").': '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
							}
						}
					}
					
					$html.= '			</div>';
					$html.= '		</div>';
					$html.= '	</a>';
					if(!in_array($oV->ID,$_SESSION['favorite']))
					{
						$html.= '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav active" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
						$html.= '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
					}
					else
					{
						$html.= '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
						$html.= '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav active" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
					}
					$html.= '</article>';
					$i++;
					$nbvillas++;
				}
			}
			else
			{
				/*echo '<pre>';
				print_r($tabBed);
				print_r($tab);
				echo '</pre>';*/
				foreach($tabBed as $b){
					
					if(in_array($b, $tab))
					{
					
						$tabPrice=array();
						$from=false;
						if(count($_SESSION['booking']['dates']) == 1)
						{
							$tmpTabPrice=$_SESSION['ratestab'][$oV->ID]['lowseason'];
							$from=true;
						}
						else{
							$tmpTabPrice=$_SESSION['ratestab'][$oV->ID][$_SESSION['booking']['dates'][0]['season'].'season'];
						}
						for($j = 20; $j >= $_SESSION['booking']['nbbeds']; $j--)
						{
							if(!empty($tmpTabPrice[$j]))
							{
								$tabPrice=$tmpTabPrice[$j];
							}	
						}
						$location = get_the_terms( $oV->ID, 'location');
						
						$html.= '<article class="card" id="card-'.$oV->ID.'" data-idmarker="'.$i.'" data-link="'.get_permalink($oV->ID).'" data-latitude="'.$metas['villa_latitude'][0].'" data-longitude="'.$metas['villa_longitude'][0].'" data-title="'.$oV->post_title.'" data-img="'.$img[0].'" data-bedrooms="'.$metas['villa_bedrooms'][0].'"   data-pools="'.$metas['villa_pools'][0].'" data-location="'.$metas['villa_address'][0].'">';
						$html.= '	<a href="'.get_permalink($oV->ID).'" title="'.$oV->post_title.'" class="link-villa">';
						$html.= '		<div class="bg" style="background-image:url('.$img[0].');"></div>';
						$html.= '		<div class="bg-over"></div>';
						$html.= '		<div class="card-content">';
						$html.= '			<div class="card-content-left">';
						$html.= '				<b>'.$oV->post_title.'</b>';
						$html.= '				<p class="infos">'.$location[0]->name.', '.$metas['villa_bedrooms'][0].' '.__("bedroom(s)","onestbarts").'</p>';
						$html.= '				<p class="description">'.$oV->post_excerpt.'<img src="'.THEME_URI.'/dist/img/arrow-long.png"/></p>';
						$html.= '			</div>';
						$html.= '			<div class="card-content-right">';
						foreach($_SESSION['money'] as $name => $sigle){
							$priceTmp=$tabPrice[$sigle];
							if($name == $_SESSION['money_active'])
							{
								if($from)
								{
									$html.= '<b class="'.str_replace(' ','-',$name).' active">'.__("From","onestbarts").' '.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
									$html.= '<em class="'.str_replace(' ','-',$name).' active">'.__("Total","onestbarts").': '.__("From","onestbarts").' '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
								}
								else{
									$html.= '<b class="'.str_replace(' ','-',$name).' active">'.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
									$html.= '<em class="'.str_replace(' ','-',$name).' active">'.__("Total","onestbarts").': '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
								}
							}
							else
							{
								if($from)
								{
									$html.= '<b class="'.str_replace(' ','-',$name).'">'.__("From","onestbarts").' '.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
									$html.= '<em class="'.str_replace(' ','-',$name).'">'.__("Total","onestbarts").': '.__("From","onestbarts").' '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
								}
								else{
									$html.= '<b class="'.str_replace(' ','-',$name).'">'.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
									$html.= '<em class="'.str_replace(' ','-',$name).'">'.__("Total","onestbarts").': '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
								}
							}
						}
						
						$html.= '			</div>';
						$html.= '		</div>';
						$html.= '	</a>';
						if(!in_array($oV->ID,$_SESSION['favorite']))
						{
							$html.= '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav active" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
							$html.= '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
						}
						else
						{
							$html.= '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
							$html.= '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav active" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
						}
						$html.= '</article>';
						$i++;
						$nbvillas++;
						break;
					}
				}
			}
		}
		
		if($nbvillas == 0){
			
			$html.='<div class="noresult">';
			$html.= '	<p>'.__("No villas available for your research.", "onestbarts").'</p>';
			$html.= '</div>';
		}
	}
	else{
		$html.='<div class="noresult">';
		$html.= '	<p>'.__("No villas available for your research.", "onestbarts").'</p>';
		$html.= '</div>';
	}
	
	$json=array(
		'dateArrival'=>$filter['dateArrival'],
		'dateDeparture'=>$filter['dateDeparture'],
		'html'=>$html,
		'nbresults' => $nbvillas
	);
	echo json_encode($json);
	
	die();
}	




// FILTER LISTING SUGGESTION
add_action( 'wp_ajax_filterlistingsuggestion', 'filterlistingsuggestion' );
add_action( 'wp_ajax_nopriv_filterlistingsuggestion', 'filterlistingsuggestion' );
function filterlistingsuggestion(){

	$filter= array_map('trim', $_POST);
	$tabSuggest = explode('|',$filter['villas']);
	
	/*
	echo '<pre>';
	print_r($filter);
	print_r($tabSuggest);
	echo '</pre>';
	*/
	
	wp_reset_query();
	$args = array(
		'post_type' => 'rental', 
		'posts_per_page' =>-1,
		'post_status'=>'publish',
	);
	
	// TRI
	switch($filter['tri']){
		case 'recommended':
			$args['orderby'] = 'date';
			$args['order'] = 'DESC';
		break;
		case 'nameASC':
			$args['orderby'] = 'name';
			$args['order'] = 'ASC';
		break;
		case 'nameDESC':
			$args['orderby'] = 'name';
			$args['order'] = 'DESC';
		
		break;
		case 'prixmin':
			$args['orderby']='meta_value_num';
			$args['meta_key']='villa_price_from';
			$args['order'] = 'ASC';
		break;
		case 'prixmax':
			$args['orderby']='meta_value_num';
			$args['meta_key']='villa_price_from';
			$args['order'] = 'DESC';
		break;
	}

	$ListeV= new WP_Query($args);
	$villas=$ListeV->posts;

	/*
	echo '<pre>';
	print_r($args);
	print_r($villas);
	echo '</pre>';
	*/
	
	$html='';
	$nbNights=count($_SESSION['booking']['dates']);

	if(!empty($villas))
	{
		$i=0;
		foreach($villas as $key => $oV)
		{
			if(in_array($oV->ID, $tabSuggest))
			{
				$tabPrice=array();
				$from=false;
				if(count($_SESSION['booking']['dates']) == 1)
				{
					$tmpTabPrice=$_SESSION['ratestab'][$oV->ID]['saison1'];
					$from=true;
				}
				else{
					$tmpTabPrice=$_SESSION['ratestab'][$oV->ID][$_SESSION['booking']['dates'][0]['season'].'season'];
				}
				for($j = 20; $j >= $_SESSION['booking']['nbbeds']; $j--)
				{
					if(!empty($tmpTabPrice[$j]))
					{
						$tabPrice=$tmpTabPrice[$j];
					}	
				}

				$img = wp_get_attachment_image_src(get_post_thumbnail_id($oV->ID),'thumb-wide');
				$metas=get_post_meta($oV->ID);
				$html.= '<article class="card" id="card-'.$oV->ID.'" data-idmarker="'.$i.'" data-link="'.get_permalink($oV->ID).'" data-latitude="'.$metas['villa_latitude'][0].'" data-longitude="'.$metas['villa_longitude'][0].'" data-title="'.$oV->post_title.'" data-img="'.$img[0].'" data-bedrooms="'.$metas['villa_bedrooms'][0].'"   data-pools="'.$metas['villa_pools'][0].'" data-location="'.$metas['villa_address'][0].'">';
				$html.= '	<a href="'.get_permalink($oV->ID).'" title="'.$oV->post_title.'" class="link-villa">';
				$html.= '		<div class="bg" style="background-image:url('.$img[0].');"></div>';
				$html.= '		<div class="bg-over"></div>';
				$html.= '		<div class="card-content">';
				$html.= '			<div class="card-content-left">';
				$html.= '				<b>'.$oV->post_title.'</b>';
				$html.= '				<p class="infos">'.$metas['villa_address'][0].', '.$metas['villa_bedrooms'][0].' '.__("bedroom(s)","onestbarts").'</p>';
				$html.= '				<p class="description">'.$oV->post_excerpt.'<img src="'.THEME_URI.'/dist/img/arrow-long.png"/></p>';
				$html.= '			</div>';
				$html.= '			<div class="card-content-right">';
				foreach($_SESSION['money'] as $name => $sigle){
					$priceTmp=$tabPrice[$sigle];
					if($name == $_SESSION['money_active'])
					{
						if($from)
						{
							$html.= '<b class="'.str_replace(' ','-',$name).' active">'.__("From","onestbarts").' '.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
							$html.= '<em class="'.str_replace(' ','-',$name).' active">'.__("Total","onestbarts").': '.__("From","onestbarts").' '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
						}
						else{
							$html.= '<b class="'.str_replace(' ','-',$name).' active">'.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
							$html.= '<em class="'.str_replace(' ','-',$name).' active">'.__("Total","onestbarts").': '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
						}
					}
					else
					{
						if($from)
						{
							$html.= '<b class="'.str_replace(' ','-',$name).'">'.__("From","onestbarts").' '.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
							$html.= '<em class="'.str_replace(' ','-',$name).'">'.__("Total","onestbarts").': '.__("From","onestbarts").' '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
						}
						else{
							$html.= '<b class="'.str_replace(' ','-',$name).'">'.$sigle.' '.number_format(str_replace(' ','',$priceTmp)).' /<sup>'.__("nt","onestbarts").'</sup></b>';
							$html.= '<em class="'.str_replace(' ','-',$name).'">'.__("Total","onestbarts").': '.$sigle.' <span>'.number_format(str_replace(' ','',$priceTmp)*$nbNights).'</span> '.__("for","onestbarts").' <span> '.$nbNights.' '.__("days","onestbarts").'</span></em>';
						}
					}
				}
				
				$html.= '			</div>';
				$html.= '		</div>';
				$html.= '	</a>';
				if(!in_array($oV->ID,$_SESSION['favorite']))
				{
					$html.= '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav active" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
					$html.= '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
				}
				else
				{
					$html.= '	<a href="#" title="'.__("Add to favorite", "onestbarts").'" class="add-to-fav" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
					$html.= '	<a href="#" title="'.__("Remove to favorite", "onestbarts").'" class="remove-to-fav active" data-id="'.$oV->ID.'" data-page=""><i class="fa fa-heart"></i></a>';
				}
				$html.= '</article>';
				$i++;
			}
		}
	}
	else{
		$html.='<div class="noresult">';
		$html.= '	<p>'.__("No villas available for your research.", "onestbarts").'</p>';
		$html.= '</div>';
	}
	
	$json=array(
		'html'=>$html,
		'nbresults' => count($i)
	);
	echo json_encode($json);
	
	die();
}	





// AJAX BOOKING CALENDAR
add_action( 'wp_ajax_bookingCalendar', 'bookingCalendar' );
add_action( 'wp_ajax_nopriv_bookingCalendar', 'bookingCalendar' );
function bookingCalendar(){
	$booking = array_map('trim', $_POST);
	
	/*
	echo '<pre>';
	print_r($booking);
	print_r($_SESSION['booking']);
	echo '<pre>';
	*/
	
	
	if(filter_var($booking['beds'], FILTER_SANITIZE_STRING) && $booking['beds']!='')
	{
		$_SESSION['booking']['nbbeds'] = $booking['beds'];
	}
	else 
	{
		$err[]= __("Please enter a number of bedroom(s)","onestbarts");
		$errField[]='beds';
	}
	
	if(filter_var($booking['arrivaldate'], FILTER_SANITIZE_STRING) && $booking['arrivaldate']!='')
	{
		$_SESSION['booking']['arrivaldate'] = $booking['arrivaldate'];
	}
	else 
	{
		$err[]= __("Please select a valid arrival date","onestbarts");
		$errField[]='arrivaldate';
	}
	
	if(filter_var($booking['departuredate'], FILTER_SANITIZE_STRING) && $booking['departuredate']!='')
	{
		$_SESSION['booking']['departuredate'] = $booking['departuredate'];
	}
	else 
	{
		$err[]= __("Please select a validedeparture date","onestbarts");
		$errField[]='departuredate';
	}

	if(strtotime($_SESSION['booking']['arrivaldate']) >= strtotime($_SESSION['booking']['departuredate'])){
		$err[]= __("Your dates of stay do not match","onestbarts");
	}
	
	if(empty($err))
	{
		$_SESSION['booking']['nbdays']=count($_SESSION['booking']['dates']);
		createDateRangeArray();
		$json=array('type'=>'succeed','link'=> get_permalink(170));
		echo json_encode($json);
	}
	else
	{
		$json=array('type'=>'error','msg'=>$err[0],'errFields'=>$errField);
		echo json_encode($json);
	}
	die();
}	

// AJAX CONTACT RENTAL
add_action( 'wp_ajax_contactrental', 'contactrental' );
add_action( 'wp_ajax_nopriv_contactrental', 'contactrental' );
function contactrental(){
	$postContact = array_map('trim', $_POST);
	parse_str($postContact['datas'], $param);
	
	/*
	echo '<pre>';
	print_r($param);
	echo '<pre>';
	*/
	
	
	if(filter_var($param['firstname'], FILTER_SANITIZE_STRING) && $param['firstname']!='')
	{
		$contact['firstname'] = $param['firstname'];
	}
	else 
	{
		$err[]= __("Please enter a valid name","onestbarts");
		$errField[]='firstname';
	}
	
	if(filter_var($param['lastname'], FILTER_SANITIZE_STRING) && $param['lastname']!='')
	{
		$contact['lastname'] = $param['lastname'];
	}
	else 
	{
		$err[]= __("Please enter a valid name","onestbarts");
		$errField[]='lastname';
	}
	
	if(filter_var($param['email'], FILTER_VALIDATE_EMAIL) )
	{
		$contact['email'] = $param['email'];
	}
	else 
	{
		$err[]= __("Please enter a valid email","onestbarts");
		$errField[]='email';
	}
	
	
	if(filter_var($param['phone'], FILTER_SANITIZE_STRING) && $param['phone']!='')
	{
		$contact['phone'] = $param['phone'];
	}
	else 
	{
		$err[]= __("Please enter a valid phone number","onestbarts");
		$errField[]='phone';
	}

	if(empty($err))
	{
		
		$contact['arrival'] = $param['arrival'];
		$contact['departure'] = $param['departure'];
		$contact['budget'] = $param['budget'];
		$contact['message'] = $param['message'];
		
		// DATE
		$dateResa = new DateTime("now");
		$tz = new DateTimeZone('America/St_Barthelemy');
		$dateResa->setTimezone($tz);
		$contact['date_saving'] =$dateResa->format('Y-m-d H:i:s');
		
		// ENREGISTREMENT BDD
		global $wpdb;
		
		$arrivalDate=$contact['arrival'].' 00:00:00';
		$departureDate=$contact['departure'].' 00:00:00';
		
		//Insertion
		$query="insert into osb_contact_rental(
			`firstname`,
			`lastname`,
			`email`,
			`phone`,
			`arrival`,
			`departure`,
			`budget`,
			`message`,
			`date_saving`
			)values(
			'".addslashes($contact['firstname'])."',
			'".addslashes($contact['lastname'])."',
			'".addslashes($contact['email'])."',
			'".addslashes($contact['phone'])."',
			'".addslashes($arrivalDate)."',
			'".addslashes($departureDate)."',
			'".addslashes($contact['budget'])."',
			'".addslashes($contact['message'])."',
			'".addslashes($contact['date_saving'])."'
		)";
		$resSave=$wpdb->query($query);
		
		// ENVOI DU MAIL
		if($resSave===1)
		{
			// $mailTo="home@onestbarts.com";
			// Contact Email Id Add by Suska Dev at 11 JAv 2019
			// $mailTo="hello@suska.co";
			// Form Email Edit by Dev 
			$mailTo="hosting@suska.co";

			//$mailTo="jchristophe.bard.pro@gmail.com";
			$object="One St Barts - Beautiful Home | We can help! New Request from ".$contact['lastname']." ".$contact['firstname'];

			$headers ="From: Onestbarts <home@onestbarts.com>\n";
			$headers .="Reply-To: home@onestbarts.com\n";
			$headers .= "MIME-version: 1.0\n";	 
			$headers .= "Content-type: text/html; charset= utf-8\n";	
			
			
			// ENVOI MAIL ONESTBARTS
			require_once('emailing/emailing_we_can_help.php');
			file_put_contents($_SERVER['DOCUMENT_ROOT'].'/wp-content/themes/onestbarth/inc/emailing/html/email-we-can-help/'.$microtime.'.html',$body);
			
			wp_mail($mailTo,$object,$body,$headers);
			$json=array('type'=>'succeed','msg'=>__('Thank you for your request, our team will get back to you shortly',"onestbarts"));
			echo json_encode($json);
			
		}
		else
		{
			$json=array('type'=>'error','msg'=>__("An error occurred when registering","onestbarts"));
			echo json_encode($json);			
		}	
	}
	else
	{
		$json=array('type'=>'error','msg'=>$err[0],'errFields'=>$errField);
		echo json_encode($json);
	}
	die();
}		

// AJAX FORM FAVORITE
add_action( 'wp_ajax_formfavorite', 'formfavorite' );
add_action( 'wp_ajax_nopriv_formfavorite', 'formfavorite' );
function formfavorite(){
	$postFavorite = array_map('trim', $_POST);
	parse_str($postFavorite['datas'], $param);
	
	/*
	echo '<pre>';
	print_r($param);
	echo '<pre>';
	*/
	
	
	if(filter_var($param['firstname'], FILTER_SANITIZE_STRING) && $param['firstname']!='')
	{
		$favorite['firstname'] = $param['firstname'];
	}
	else 
	{
		$err[]= __("Please enter a valid name","onestbarts");
		$errField[]='firstname';
	}
	
	if(filter_var($param['lastname'], FILTER_SANITIZE_STRING) && $param['lastname']!='')
	{
		$favorite['lastname'] = $param['lastname'];
	}
	else 
	{
		$err[]= __("Please enter a valid name","onestbarts");
		$errField[]='lastname';
	}
	
	if(filter_var($param['email'], FILTER_VALIDATE_EMAIL) )
	{
		$favorite['email'] = $param['email'];
	}
	else 
	{
		$err[]= __("Please enter a valid email","onestbarts");
		$errField[]='email';
	}
	
	
	if(filter_var($param['phone'], FILTER_SANITIZE_STRING) && $param['phone']!='')
	{
		$favorite['phone'] = $param['phone'];
	}
	else 
	{
		$err[]= __("Please enter a valid phone number","onestbarts");
		$errField[]='phone';
	}

	if(empty($err))
	{
		
		$favorite['arrival'] = $param['arrival'];
		$favorite['departure'] = $param['departure'];
		$favorite['budget'] = $param['budget'];
		$favorite['message'] = $param['message'];
		
		// DATE
		$dateResa = new DateTime("now");
		$tz = new DateTimeZone('America/St_Barthelemy');
		$dateResa->setTimezone($tz);
		$favorite['date_saving'] =$dateResa->format('Y-m-d H:i:s');
		
		// ENREGISTREMENT BDD
		global $wpdb;
		
		$arrivalDate=$favorite['arrival'].' 00:00:00';
		$departureDate=$favorite['departure'].' 00:00:00';
		
		//Insertion
		$query="insert into osb_favorite(
			`firstname`,
			`lastname`,
			`email`,
			`phone`,
			`arrival`,
			`departure`,
			`budget`,
			`message`,
			`date_saving`
			)values(
			'".addslashes($favorite['firstname'])."',
			'".addslashes($favorite['lastname'])."',
			'".addslashes($favorite['email'])."',
			'".addslashes($favorite['phone'])."',
			'".addslashes($arrivalDate)."',
			'".addslashes($departureDate)."',
			'".addslashes($favorite['budget'])."',
			'".addslashes($favorite['message'])."',
			'".addslashes($favorite['date_saving'])."'
		)";
		$resSave=$wpdb->query($query);
		
		// ENVOI DU MAIL
		if($resSave===1)
		{
			// $mailTo="home@onestbarts.com";
			// Form Email Edit by Dev 
			$mailTo="hosting@suska.co";
			//$mailTo="jchristophe.bard.pro@gmail.com";
			$object="One St Barts - Beautiful Home | Your favorites villas on www.onestbarts.com";

			$headers ="From: Onestbarts <home@onestbarts.com>\n";
			$headers .="Reply-To: home@onestbarts.com\n";
			$headers .= "MIME-version: 1.0\n";	 
			$headers .= "Content-type: text/html; charset= utf-8\n";	

			$corps="Hi,<br/><br/>";
			$corps.="<b>New Form Favorite: </b><br/><br />";
			$corps.="First name: ".$favorite['firstname']."<br />";
			$corps.="Last name: ".$favorite['lastname']."<br />";
			$corps.="Email: ".$favorite['email']."<br />";
			$corps.="Phone: ".$favorite['phone']."<br />";
			$corps.="Arrival Date: ".$favorite['arrival']."<br />";
			$corps.="Departure Date: ".$favorite['departure']."<br />";
			$corps.="Budget: ".$favorite['budget']."<br />";
			$corps.="Message: ".$favorite['message']."<br />";
			$corps.="Registration date: ".$favorite['date_saving']."<br /><br />";
			$corps.="Thks.";
			
			//echo $corps;
			
			wp_mail($mailTo,$object,$corps,$headers);
			
			$json=array('type'=>'succeed','msg'=>__('Thank you for your request, our team will get back to you shortly',"onestbarts"));
			echo json_encode($json);
		}
		else
		{
			$json=array('type'=>'error','msg'=>__("An error occurred when registering","onestbarts"));
			echo json_encode($json);			
		}	
	}
	else
	{
		$json=array('type'=>'error','msg'=>$err[0],'errFields'=>$errField);
		echo json_encode($json);
	}
	die();
}		


// AJAX CHANGE MONNAIE
add_action( 'wp_ajax_changemonnaie', 'changemonnaie' );
add_action( 'wp_ajax_nopriv_changemonnaie', 'changemonnaie' );
function changemonnaie(){
	$param = array_map('trim', $_POST);
	
	$_SESSION['money_active']=$param['money'];
	$_SESSION['money_active_sigle']=$_SESSION['money'][$param['money']];
	die();
}	


// AJAX CALCUL PRICE
/*
add_action( 'wp_ajax_calcul_price', 'calcul_price' );
add_action( 'wp_ajax_nopriv_calcul_price', 'calcul_price' );
function calcul_price(){
	$postInquire = array_map('trim', $_POST);
	parse_str($postInquire['datas'], $param);
	
	if(filter_var($param['arrival-date'], FILTER_SANITIZE_STRING) && $param['arrival-date']!='')
	{
		$_SESSION['booking']['arrivaldate'] = $param['arrival-date'];
	}
	else 
	{
		$err[]= __("Please enter a valid arrival date","onestbarts");
		$errField[]='arrival-date';
	}
	
	if(filter_var($param['departure-date'], FILTER_SANITIZE_STRING) && $param['departure-date']!='')
	{
		$_SESSION['booking']['arrivaldate'] = $param['departure-date'];
	}
	else 
	{
		$err[]= __("Please enter a valid departure date","onestbarts");
		$errField[]='departure-date';
	}
	
	if(filter_var($param['booking-bedrooms'], FILTER_SANITIZE_STRING) && $param['booking-bedrooms']!='')
	{
		$_SESSION['booking']['nbbeds'] = $param['booking-bedrooms'];
	}
	else 
	{
		$err[]= __("Please select a number of bed(s)","onestbarts");
		$errField[]='booking-bedrooms';
	}

	if(empty($err))
	{
		$_SESSION['booking']['nbdays']=count($_SESSION['booking']['dates']);
		$_SESSION['booking']['idvilla']=$param['idvilla'];
		$_SESSION['booking']['currentprice']=getPriceVilla();
	}
	else
	{
		$json=array('type'=>'error','msg'=>$err[0],'errFields'=>$errField);
		echo json_encode($json);
	}
	die();
}
*/

// CHANGE ARRIVAL DATE
add_action( 'wp_ajax_change_arrival_date', 'change_arrival_date' );
add_action( 'wp_ajax_nopriv_change_arrival_date', 'change_arrival_date' );
function change_arrival_date(){
	$param = array_map('trim', $_POST);
	
	$_SESSION['booking']['arrivaldate'] = $param['arrival'];	
	createDateRangeArray();
	$_SESSION['booking']['currentprice']=getPriceVilla();
	$total=$_SESSION['booking']['currentprice'] * 1.15;
	$pricePerNight=$_SESSION['ratestab'][$_SESSION['booking']['idvilla']][$_SESSION['booking']['dates'][0]['season']][$_SESSION['booking']['nbbeds']][$_SESSION['money_active_sigle']];
	
	
	$json=array(
		'type'=>'succeed',
		'nbnights'=>count($_SESSION['booking']['dates']),
		'subtotal'=>number_format(str_replace(' ','',$_SESSION['booking']['currentprice']),0,'.',' '),
		'total'=>number_format(str_replace(' ','',$total),0,'.',' '),
		'pricepernight'=>number_format(str_replace(' ','',$pricePerNight),0,'.',' '),
		'arrival'=>$_SESSION['booking']['arrivaldate'],
	);
	echo json_encode($json);
	die();
}



// CHANGE DEPARTURE DATE
add_action( 'wp_ajax_change_departure_date', 'change_departure_date' );
add_action( 'wp_ajax_nopriv_change_departure_date', 'change_departure_date' );
function change_departure_date(){
	$param = array_map('trim', $_POST);
	
	$_SESSION['booking']['departuredate'] = $param['departure'];	
	createDateRangeArray();
	$_SESSION['booking']['currentprice']=getPriceVilla();
	$total=$_SESSION['booking']['currentprice'] * 1.15;
	$pricePerNight=$_SESSION['ratestab'][$_SESSION['booking']['idvilla']][$_SESSION['booking']['dates'][0]['season']][$_SESSION['booking']['nbbeds']][$_SESSION['money_active_sigle']];
	
	
	$json=array(
		'type'=>'succeed',
		'nbnights'=>count($_SESSION['booking']['dates']),
		'subtotal'=>number_format(str_replace(' ','',$_SESSION['booking']['currentprice']),0,'.',' '),
		'total'=>number_format(str_replace(' ','',$total),0,'.',' '),
		'pricepernight'=>number_format(str_replace(' ','',$pricePerNight),0,'.',' '),
		'departure'=>$_SESSION['booking']['departuredate'],
	);
	echo json_encode($json);
	die();
}


// CHANGE NB BEDROOMS
add_action( 'wp_ajax_change_nbbedrooms', 'change_nbbedrooms' );
add_action( 'wp_ajax_nopriv_change_nbbedrooms', 'change_nbbedrooms' );
function change_nbbedrooms(){

	
	$param = array_map('trim', $_POST);
	/*
	echo '<pre style="background:black">';
	print_r($param);
	echo '</pre>';	
	*/
	$_SESSION['booking']['nbbeds'] = $param['bedrooms'];	
	createDateRangeArray();
	$_SESSION['booking']['currentprice']=getPriceVilla();
	$total=$_SESSION['booking']['currentprice'] * 1.15;
	$pricePerNight=$_SESSION['ratestab'][$_SESSION['booking']['idvilla']][$_SESSION['booking']['dates'][0]['season']][$_SESSION['booking']['nbbeds']][$_SESSION['money_active_sigle']];
	
	
	$json=array(
		'type'=>'succeed',
		'nbnights'=>count($_SESSION['booking']['dates']),
		'subtotal'=>number_format(str_replace(' ','',$_SESSION['booking']['currentprice']),0,'.',' '),
		'total'=>number_format(str_replace(' ','',$total),0,'.',' '),
		'pricepernight'=>number_format(str_replace(' ','',$pricePerNight),0,'.',' '),
		'departure'=>$_SESSION['booking']['departuredate'],
	);
	echo json_encode($json);
	die();
}


// AJAX INQUIRE
add_action( 'wp_ajax_inquire', 'inquire' );
add_action( 'wp_ajax_nopriv_inquire', 'inquire' );
function inquire(){
	$postInquire = array_map('trim', $_POST);
	parse_str($postInquire['datas'], $param);
	$inquire=Array();
	
	
	
	/*echo '<pre>';
	print_r($param);
	echo '<pre>';*/
	
	
	if(filter_var($param['name'], FILTER_SANITIZE_STRING) && $param['name']!='')
	{
		$_SESSION['booking']['name'] = $param['name'];
	}
	else 
	{
		$err[]= __("Please enter a valid name","onestbarts");
		$errField[]='name';
	}
	
	if(filter_var($param['phone'], FILTER_SANITIZE_STRING) && $param['phone']!='')
	{
		$_SESSION['booking']['phone'] = $param['phone'];
	}
	else 
	{
		$err[]= __("Please enter a valid phone","onestbarts");
		$errField[]='phone';
	}
	
	if(filter_var($param['email'], FILTER_VALIDATE_EMAIL) )
	{
		$_SESSION['booking']['email'] = $param['email'];
	}
	else 
	{
		$err[]= __("Please enter a valid email","onestbarts");
		$errField[]='email';
	}
	
	if(filter_var($param['popup-booking-arrival'], FILTER_SANITIZE_STRING) && $param['popup-booking-arrival']!='')
	{
		$_SESSION['booking']['arrivaldate'] = $param['popup-booking-arrival'];
	}
	else 
	{
		$err[]= __("Please enter a valid arrival date","onestbarts");
		$errField[]='popup-booking-arrival';
	}
	
	if(filter_var($param['popup-booking-departure'], FILTER_SANITIZE_STRING) && $param['popup-booking-departure']!='')
	{
		$_SESSION['booking']['departuredate'] = $param['popup-booking-departure'];
	}
	else 
	{
		$err[]= __("Please enter a valid departure date","onestbarts");
		$errField[]='popup-booking-departure';
	}
	
	if(filter_var($param['popup-booking-bedrooms'], FILTER_SANITIZE_STRING) && $param['popup-booking-bedrooms']!='')
	{
		$_SESSION['booking']['nbbeds'] = $param['popup-booking-bedrooms'];
	}
	else 
	{
		$err[]= __("Please select a number of bed(s)","onestbarts");
		$errField[]='popup-booking-bedrooms';
	}

	if(empty($err))
	{
		$_SESSION['booking']['currentprice']=getPriceVilla();
		if(filter_var($param['comments'], FILTER_SANITIZE_STRING) && $param['comments']!='')
		{
			$_SESSION['booking']['comments'] = $param['comments'];
		}
		else 
		{
			$_SESSION['booking']['comments'] = '';
		}
		
		$_SESSION['booking']['currentprice']=getPriceVilla();
		
		// DATE
		$dateResa = new DateTime("now");
		$tz = new DateTimeZone('America/St_Barthelemy');
		$dateResa->setTimezone($tz);
		$date_saving =$dateResa->format('Y-m-d H:i:s');
		
		// ENREGISTREMENT BDD
		global $wpdb;

		// INFOS VILLA
		$villa=get_post($_SESSION['booking']['idvilla']);
		
		// INFOS PRICE
		$pricetotal=$_SESSION['booking']['currentprice']*1.15;
		
		//Insertion
		$query="insert into osb_booking(
			`name`,
			`phone`,
			`email`,
			`arrival`,
			`departure`,
			`nbdays`,
			`nbbeds`,
			`villaname`,
			`price_subtotal`,
			`price_total`,
			`monnaie`,
			`comments`,
			`date_saving`
			)values(
			'".addslashes($_SESSION['booking']['name'])."',
			'".addslashes($_SESSION['booking']['phone'])."',
			'".addslashes($_SESSION['booking']['email'])."',
			'".addslashes($_SESSION['booking']['arrivaldate'])."',
			'".addslashes($_SESSION['booking']['departuredate'])."',
			'".addslashes($_SESSION['booking']['nbdays'])."',
			'".addslashes($_SESSION['booking']['nbbeds'])."',
			'".addslashes($villa->post_title)."',
			'".addslashes($_SESSION['booking']['currentprice'])."',
			'".addslashes($pricetotal)."',
			'".addslashes($_SESSION['money_active'])."',
			'".addslashes($_SESSION['booking']['comments'])."',
			'".addslashes($date_saving )."'
		)";
		$resSave=$wpdb->query($query);
		
		// ENVOI DU MAIL
		if($resSave===1)
		{
			// $mailTo="home@onestbarts.com";
			// Form Email Edit by Dev 
			$mailTo="hosting@suska.co";
			//$mailTo="jchristophe.bard.pro@gmail.com";
			$object="One St Barts - Beautiful Home | New Villa Request from ".$_SESSION['booking']['name'];

			$headers ="From: Onestbarts <home@onestbarts.com>\n";
			$headers .="Reply-To: home@onestbarts.com\n";
			$headers .= "MIME-version: 1.0\n";	 
			$headers .= "Content-type: text/html; charset= utf-8\n";	

			$pricePerNight=$_SESSION['ratestab'][$_SESSION['booking']['idvilla']][$_SESSION['booking']['dates'][0]['season'].'season'][$_SESSION['booking']['nbbeds']][$_SESSION['money_active_sigle']];
			$microtime=microtime(true);
			
			// ENVOI MAIL CLIENT
			require_once('emailing/email_booking.php');
			file_put_contents($_SERVER['DOCUMENT_ROOT'].'/wp-content/themes/onestbarth/inc/emailing/html/email-booking/'.$microtime.'.html',$body);
			
			wp_mail($_SESSION['booking']['email'],$object,$body,$headers);
			
			// ENVOI MAIL ONESTBARTS
			/*
			require_once('emailing/email_booking_osb.php');
			file_put_contents($_SERVER['DOCUMENT_ROOT'].'/wp-content/themes/onestbarth/inc/emailing/html/email-booking-osb/'.$microtime.'.html',$body);
			wp_mail($mailTo,$object,$body,$headers);
			*/
			
			// RETOURS
			$related=get_field('villa_similar_houses',$_SESSION['booking']['idvilla']);
			
			
			$html='';
			$html.='<div id="inquire-feedback">';
			$html.='	<b class="title">'.__("Thank you","onestbarts").' '.$_SESSION['booking']['name'].'</b>';
			$html.='	<p>'.__("Your request for","onestbarts").' <span class="pink">'.$villa->post_title.'</span> '.__("from","onestbarts").' '.$_SESSION['booking']['arrivaldate'].' '.__("to","onestbarts").' '.$_SESSION['booking']['departuredate'].' '.__("has been sent","onestbarts").'.</p>';
			$html.='	<p>'.__("A confirmation email has been sent to","onestbarts").' '.$_SESSION['booking']['email'].'</p>';
			$html.='	<br/><br/>';
			$html.='	<p>'.__("A villa specialist will revert to you shortly","onestbarts").'</p>';
			$html.='	<br/><br/>';
			$html.='	<strong>'.__("For any assistance please contact us","onestbarts").'</strong>';
			$html.='	<div class="inquire-links">';
			$html.='		<a href="mailto:home@onestbarts.com" title="home@onestbarts.com">home@onestbarts.com</a>';
			$html.='		<span>|</span>';
			$html.='		<a href="tel:+590690560426" title="+590 690 56 04 26">+590 690 56 04 26</a>';
			$html.='	</div>';
			$html.='	<div class="inquire-close-content">';
			$html.='		<a href="#" title="'.__("Close","onestbarts").'" class="close-inquire">'.__("Close","onestbarts").'</a>';
			$html.='	</div>';
			$html.='	<div class="inquire-related">';
			foreach($related as $key => $oR){
				$img = wp_get_attachment_image_src(get_post_thumbnail_id($oR['similar_villa']->ID),'thumb-carre');
				$html.= '<a href="'.get_permalink($oR['similar_villa']->ID).'" title="'.$oR['similar_villa']->post_title.'" class="col-4">';
				$html.= '	<figure>';
				$html.= '		<img src="'.$img[0].'" alt="'.$oR['similar_villa']->post_title.'"/>';
				$html.= ' 	</figure>';
				$html.= '	<h4>'.$oR['similar_villa']->post_title.'</h4>';
				$html.= '</a>';
			}
			$html.='	</div>';
			$html.='</div>';
			
			$json=array('type'=>'succeed','html'=>$html);
			echo json_encode($json);
		}
		else
		{
			$json=array('type'=>'error','msg'=>__("An error occurred when registering","onestbarts"));
			echo json_encode($json);			
		}	
	}
	else
	{
		$json=array('type'=>'error','msg'=>$err[0],'errFields'=>$errField);
		echo json_encode($json);
	}
	die();
}	



// AJAX SHARE FAVORITE
add_action( 'wp_ajax_inquirehome', 'inquirehome' );
add_action( 'wp_ajax_nopriv_inquirehome', 'inquirehome' );
function inquirehome(){
	$postShareFav = array_map('trim', $_POST);
	parse_str($postShareFav['datas'], $param);
	
	/*echo '<pre>';
	print_r($param);
	echo '<pre>';*/
	
	if(filter_var($param['name'], FILTER_SANITIZE_STRING) && $param['name']!='')
	{
		$_SESSION['booking']['name'] = $param['name'];
	}
	else 
	{
		$err[]= __("Please enter a valid name","onestbarts");
		$errField[]='name';
	}
	
	if(filter_var($param['email'], FILTER_VALIDATE_EMAIL) )
	{
		$_SESSION['booking']['email'] = $param['email'];
	}
	else 
	{
		$err[]= __("Please enter a valid email","onestbarts");
		$errField[]='email';
	}
	
	if(empty($err))
	{
		
		if(filter_var($param['comments'], FILTER_SANITIZE_STRING) && $param['comments']!='')
		{
			$_SESSION['booking']['comments'] = $param['comments'];
		}
		else 
		{
			$_SESSION['booking']['comments'] = '';
		}
		
		// DATE
		$dateResa = new DateTime("now");
		$tz = new DateTimeZone('America/St_Barthelemy');
		$dateResa->setTimezone($tz);
		$date_saving =$dateResa->format('Y-m-d H:i:s');
		
		
		// ENREGISTREMENT BDD
		global $wpdb;

		// INFOS VILLA
		$villa=get_post($_SESSION['booking']['idvilla']);
		
		// INFOS PRICE
		$pricetotal=$_SESSION['booking']['currentprice']*1.15;
		
		//Insertion
		$query="insert into osb_inquire_home(
			`name`,
			`email`,
			`comments`,
			`date_saving`
			)values(
			'".addslashes($_SESSION['booking']['name'])."',
			'".addslashes($_SESSION['booking']['email'])."',
			'".addslashes($_SESSION['booking']['comments'])."',
			'".addslashes($date_saving )."'
		)";
		$resSave=$wpdb->query($query);
		
		// ENVOI DU MAIL
		if($resSave===1)
		{
				
			// $mailTo="home@onestbarts.com";
			// Form Email Edit by Dev 
			$mailTo="hosting@suska.co";
			//$mailTo="jchristophe.bard.pro@gmail.com";
			$object="Onestbarts - Booking";

			$headers ="From: Onestbarts - Inquire Home <home@onestbarts.com>\n";
			$headers .="Reply-To: home@onestbarts.com\n";
			$headers .= "MIME-version: 1.0\n";	 
			$headers .= "Content-type: text/html; charset= utf-8\n";	

			$microtime=microtime(true);
			
			
			// ENVOI MAIL ONESTBARTS
			require_once('emailing/email_experience_osb.php');
			file_put_contents($_SERVER['DOCUMENT_ROOT'].'/wp-content/themes/onestbarth/inc/emailing/html/email-experience/'.$microtime.'.html',$body);
			wp_mail($mailTo,$object,$body,$headers);

			$html='';
			$html.='<div id="inquire-feedback">';
			$html.='	<b class="title">'.__("Thank you","onestbarts").' '.$_SESSION['booking']['name'].'</b>';
			$html.='	<p>'.__("A villa specialist will revert to you shortly","onestbarts").'</p>';
			$html.='	<br/><br/>';
			$html.='	<strong>'.__("For any assistance please contact us","onestbarts").'</strong>';
			$html.='	<div class="inquire-links">';
			$html.='		<a href="mailto:home@onestbarts.com" title="home@onestbarts.com">home@onestbarts.com</a>';
			$html.='		<span>|</span>';
			$html.='		<a href="tel:+590690560426" title="+590 690 56 04 26">+590 690 56 04 26</a>';
			$html.='	</div>';
			$html.='	<div class="inquire-close-content">';
			$html.='		<a href="#" title="'.__("Close","onestbarts").'" class="close-inquire">'.__("Close","onestbarts").'</a>';
			$html.='	</div>';
			$html.='</div>';
			
			$json=array('type'=>'succeed','html'=>$html);
			echo json_encode($json);	
		}
		else
		{	
			$json=array('type'=>'error','msg'=>__("An error occurred when registering","onestbarts"));
			echo json_encode($json);		
		}
	}
	else
	{
		$json=array('type'=>'error','msg'=>$err[0],'errFields'=>$errField);
		echo json_encode($json);
	}
	die();
}	



// AJAX SHARE FAVORITE
add_action( 'wp_ajax_sharefavorite', 'sharefavorite' );
add_action( 'wp_ajax_nopriv_sharefavorite', 'sharefavorite' );
function sharefavorite(){
	$postShareFav = array_map('trim', $_POST);
	parse_str($postShareFav['datas'], $param);
	
	/*echo '<pre>';
	print_r($param);
	echo '<pre>';*/
	
	if(filter_var($param['email'], FILTER_VALIDATE_EMAIL) )
	{
		$favoritesh['email'] = $param['email'];
	}
	else 
	{
		$err[]= __("Please enter a valid email","onestbarts");
		$errField[]='email';
	}
	
	if(filter_var($param['name'], FILTER_SANITIZE_STRING) && $param['name']!='')
	{
		$favoritesh['name'] = $param['name'];
	}
	else 
	{
		$err[]= __("Please enter a valid name","onestbarts");
		$errField[]='name';
	}
	
	if(filter_var($param['message'], FILTER_SANITIZE_STRING) && $param['message']!='')
	{
		$favoritesh['message'] = $param['message'];
	}
	else 
	{
		$err[]= __("Please enter a valid name","onestbarts");
		$errField[]='message';
	}
	
	if(empty($err))
	{
		// DATE
		$dateResa = new DateTime("now");
		$tz = new DateTimeZone('America/St_Barthelemy');
		$dateResa->setTimezone($tz);
		$date_saving =$dateResa->format('Y-m-d H:i:s');
		
		
		// $mailTo="home@onestbarts.com";
		// Form Email Edit by Dev 
		$mailTo="hosting@suska.co";
		//$mailTo="jchristophe.bard.pro@gmail.com";
		$object="One St Barts - Beautiful Home | Your favorites villas on www.onestbarts.com";

		$headers ="From: Onestbarts <home@onestbarts.com>\n";
		$headers .="Reply-To: home@onestbarts.com\n";
		$headers .= "MIME-version: 1.0\n";	 
		$headers .= "Content-type: text/html; charset= utf-8\n";	

		/*echo '<pre>';
		print_r($_SESSION['favorite']);
		echo '</pre>';*/
		
		$microtime=microtime(true);
		require_once('emailing/email_share_favorite.php');
		file_put_contents($_SERVER['DOCUMENT_ROOT'].'/wp-content/themes/onestbarth/inc/emailing/html/email-share-favorite/'.$microtime.'.html',$body);
		
		wp_mail($favoritesh['email'],$object,$body,$headers);

		$html='';
		$html.='<div id="popup-favoris-feedback">';
		$html.='	<b class="title">'.__("Thank you","onestbarts").' '.$favoritesh['name'].'</b>';
		$html.='	<p>'.__("Thanks for sharing").' !</p>';
		$html.='	<br/><br/>';
		$html.='	<p>'.__("Your message has been sent.").' !</p>';
		$html.='	<br/><br/>';
		$html.='	<strong>'.__("For any assistance please contact us","onestbarts").'</strong>';
		$html.='	<div class="popup-favoris-links">';
		$html.='		<a href="mailto:home@onestbarts.com" title="home@onestbarts.com">home@onestbarts.com</a>';
		$html.='		<span>|</span>';
		$html.='		<a href="tel:+590690560426" title="+590 690 56 04 26">+590 690 56 04 26</a>';
		$html.='	</div>';
		$html.='	<br/><br/>';
		$html.='	<div class="popup-favoris-close-content">';
		$html.='		<a href="#" title="'.__("Close","onestbarts").'" class="close-popup-favoris">'.__("Close","onestbarts").'</a>';
		$html.='	</div>';
		$html.='</div>';
		
		$json=array('type'=>'succeed','html'=>$html);
		echo json_encode($json);	
	}
	else
	{
		$json=array('type'=>'error','msg'=>$err[0],'errFields'=>$errField);
		echo json_encode($json);
	}
	die();
}	


// FORM CONTACT
add_action( 'wp_ajax_form_contact', 'form_contact' );
add_action( 'wp_ajax_nopriv_form_contact', 'form_contact' );

function form_contact(){	
	ini_set('display_errors', 1);
	error_reporting(E_ALL);
	
	
	$param = array_map('trim', $_POST);
	parse_str($param['datas'], $form);
	
	
	/*echo '<pre>';
	print_r($form);
	echo '<pre>';*/
	
	if(filter_var($form['contact-name'], FILTER_SANITIZE_STRING) && $form['contact-name']!='')
	{
		$_SESSION['contact']['name'] = $form['contact-name'];
	}
	else 
	{
		$err[]= __("Please enter your name","onestbarts");
		$errField[]='name';
	}
   
	if(filter_var($form['contact-email'], FILTER_VALIDATE_EMAIL) )
	{
		$_SESSION['contact']['email'] = $form['contact-email'];
	}
	else 
	{
		$err[]= __("Please enter your email","onestbarts");
		$errField[]='email';
	}
    
    $_SESSION['contact']['message'] = '';
    if(isset($form['contact-message']) && $form['contact-message']!='')
	{
		$_SESSION['contact']['message'] = $form['contact-message'];
	}

	if(empty($err))
	{
		// DATE
		$dateResa = new DateTime("now");
		$tz = new DateTimeZone('America/St_Barthelemy');
		$dateResa->setTimezone($tz);
		$_SESSION['contact']['date_saving'] =$dateResa->format('Y-m-d H:i:s');
		
		
		// INSERT BDD
		global $wpdb;
		$query="insert into osb_contact(
			`name`,
			`email`,
			`message`,
			`date_saving`
			)values(
			'".addslashes($_SESSION['contact']['name'])."',
			'".addslashes($_SESSION['contact']['email'])."',
			'".addslashes($_SESSION['contact']['message'])."',
			'".addslashes($_SESSION['contact']['date_saving'])."'
		)";
		$resSave=$wpdb->query($query);
		
		// $mailTo="home@onestbarts.com";
		// Form Email Edit by Dev 
		$mailTo="hosting@suska.co";
		//$mailTo="jchristophe.bard.pro@gmail.com";
		
		$object="One St Barts - Beautiful Home | New message from ".$_SESSION['contact']['name'];

		$headers ="From: Onestbarts <home@onestbarts.com>\n";
		$headers .="Reply-To: home@onestbarts.com\n";
		$headers .= "MIME-version: 1.0\n";	 
		$headers .= "Content-type: text/html; charset= utf-8\n";	
		
		$microtime=microtime(true);
		require_once('emailing/email_contact.php');
		file_put_contents($_SERVER['DOCUMENT_ROOT'].'/wp-content/themes/onestbarth/inc/emailing/html/email-contact/'.$microtime.'.html',$body);
		
		wp_mail($mailTo,$object,$body,$headers);
		
		$json=array('type'=>'succeed','msg'=>__("Your message has been sent","onestbarts"));
		echo json_encode($json);
	}
	else
	{
		$json=array('type'=>'error','msg'=>$err[0],'errFields'=>$errField);
		echo json_encode($json);
	}
	die();
}			





// FORM TRANFERT REQUEST
add_action( 'wp_ajax_form_transfert', 'form_transfert' );
add_action( 'wp_ajax_nopriv_form_transfert', 'form_transfert' );

function form_transfert(){	
	ini_set('display_errors', 1);
	error_reporting(E_ALL);
	
	
	$param = array_map('trim', $_POST);
	parse_str($param['datas'], $form);
	
	
	/*echo '<pre>';
	print_r($form);
	echo '<pre>';*/
	
	if(filter_var($form['transfert-name'], FILTER_SANITIZE_STRING) && $form['transfert-name']!='')
	{
		$_SESSION['transfert']['name'] = $form['transfert-name'];
	}
	else 
	{
		$err[]= __("Please enter your name","onestbarts");
		$errField[]='name';
	}
   
	if(filter_var($form['transfert-email'], FILTER_VALIDATE_EMAIL) )
	{
		$_SESSION['transfert']['email'] = $form['transfert-email'];
	}
	else 
	{
		$err[]= __("Please enter your email","onestbarts");
		$errField[]='email';
	}
    
    $_SESSION['transfert']['message'] = '';
    if(isset($form['transfert-message']) && $form['transfert-message']!='')
	{
		$_SESSION['transfert']['message'] = $form['transfert-message'];
	}

	if(empty($err))
	{
		// DATE
		$dateResa = new DateTime("now");
		$tz = new DateTimeZone('America/St_Barthelemy');
		$dateResa->setTimezone($tz);
		$_SESSION['transfert']['date_saving'] =$dateResa->format('Y-m-d H:i:s');
		
		
		// INSERT BDD
		global $wpdb;
		$query="insert into osb_transfert(
			`name`,
			`email`,
			`message`,
			`date_saving`
			)values(
			'".addslashes($_SESSION['transfert']['name'])."',
			'".addslashes($_SESSION['transfert']['email'])."',
			'".addslashes($_SESSION['transfert']['message'])."',
			'".addslashes($_SESSION['transfert']['date_saving'])."'
		)";
		$resSave=$wpdb->query($query);
		
		// $mailTo="home@onestbarts.com";
		// Form Email Edit by Dev 
		$mailTo="hosting@suska.co";
		//$mailTo="jchristophe.bard.pro@gmail.com";
		
		$object="One St Barts - Beautiful Home | New Transfer Request from ".$_SESSION['transfert']['name'];

		$headers ="From: Onestbarts <home@onestbarts.com>\n";
		$headers .="Reply-To: home@onestbarts.com\n";
		$headers .= "MIME-version: 1.0\n";	 
		$headers .= "Content-type: text/html; charset= utf-8\n";	
		
		/*
		$microtime=microtime(true);
		require_once('emailing/email_transfert.php');
		file_put_contents($_SERVER['DOCUMENT_ROOT'].'/wp-content/themes/onestbarth/inc/emailing/html/email-transfert/'.$microtime.'.html',$body);
		*/
		
		$body="Hi,<br/><br/>";
		$body.="<b>New Transfer Request: </b><br/><br />";
		$body.="Name: ".$_SESSION['transfert']['name']."<br />";
		$body.="Email: ".$_SESSION['transfert']['email']."<br />";
		$body.="Message: ".$_SESSION['transfert']['message']."<br />";
		$body.="Registration date: ".$_SESSION['transfert']['date_saving']."<br /><br />";
		$body.="Thks.";
	
		wp_mail($mailTo,$object,$body,$headers);
		
		$json=array('type'=>'succeed','msg'=>__("Your message has been sent","onestbarts"));
		echo json_encode($json);
	}
	else
	{
		$json=array('type'=>'error','msg'=>$err[0],'errFields'=>$errField);
		echo json_encode($json);
	}
	die();
}			




// SEARCH AUTOCOMPLETE
add_action( 'wp_ajax_searchautocomplete', 'searchautocomplete' );
add_action( 'wp_ajax_nopriv_searchautocomplete', 'searchautocomplete' );
function searchautocomplete(){
	
	$search = array_map('trim', $_POST);
	/*
	echo '<pre>';
	print_r($search);
	echo '<pre>';
	*/
	global $wpdb;
	
	$name = $wpdb->esc_like(stripslashes($search['text'])); //escape for use in LIKE statement
	$sql = "select post_title, ID 
		from $wpdb->posts 
		where post_title like '%".$name."%' 
		and post_type='rental' and post_status='publish'";
	//echo $sql;
	//$sql = $wpdb->prepare($sql, $name);
	
	$results = $wpdb->get_results($sql);
 
	//copy the business titles to a simple array
	$html = '<ul>';
	if(!empty($results))
	{
		foreach( $results as $r )
		{
			$html .= '<li><a href="'.get_permalink($r->ID).'" title="'.addslashes($r->post_title).'">'.addslashes($r->post_title).'</a></li>';
		}		
	}
	else{
		$html .='<li><span>'.__("No results","onestbarts").'</span></li>';
	}
	$html .= '</ul>';	
	
	$json=array('html'=>$html);
	echo json_encode($json);
	
	die(); //stop "0" from being output
}	


























// AJAX SAVE MODIF VILLA RATES ADMIN
add_action( 'wp_ajax_villarates', 'villarates' );
add_action( 'wp_ajax_nopriv_villarates', 'villarates' );
function villarates(){
	$villaRates = array_map('trim', $_POST);
	parse_str($villaRates['datas'], $param);
	
	$idVilla=$param['villa_id'];
	$table_name='osb_postmeta';
	/*echo '<pre>';
	print_r($param);
	echo '<pre>';*/
	global $wpdb;
	$tabrequete=array();
	foreach($param as $meta_key => $meta_value)
	{
		if($meta_key!='villa_id')
		{
			$tabrequete[$meta_key]=stripslashes($meta_value);
			$wpdb->query($wpdb->prepare("UPDATE `$table_name` SET `meta_value`=$meta_value WHERE `post_id`=$idVilla AND `meta_key`='$meta_key'"));
			//echo "UPDATE `$table_name` SET `meta_value`=$meta_value WHERE `post_id`=$idVilla AND `meta_key`='$meta_key'";
			//echo '<br/>';
		}
	}
	
	$json=array('type'=>'succeed');
	echo json_encode($json);
	die();
}	


?>