<?php		
	require_once( $_SERVER["DOCUMENT_ROOT"]."/wp-load.php" );
	
	$today=date("d.m.Y-His");
	header("Content-Encoding: Windows-1252");
	header("Content-type: application/vnd.ms-excel; name='excel'");
	header("Content-Disposition: attachment; filename=booking-".$today.".xls");
	header("Pragma: no-cache");
	header("Expires: 0");

	$res=$wpdb->get_results( "SELECT * FROM `osb_booking` ORDER BY `date_saving` DESC");
	/*echo '<pre>';
	print_r($res);	
	echo '</pre>';
	*/
	$tab="\t";
	$ret="\n";
	$line='';
	$data='';
	
	$header = 'ID'.$tab.'FIRST NAME'.$tab.'EMAIL'.$tab.'PHONE'.$tab.'ARRIVAL DATE'.$tab.'DEPARTURE DATE'.$tab.'NB DAY(S)'.$tab.'BEDROOM(S)'.$tab.'VILLA'.$tab.'SUBTOTAL'.$tab.'TOTAL'.$tab.'COMMENTS'.$tab.'REGISTRATION DATE';
	foreach($res as $key => $arr)
	{
		$v = str_replace('"', '""', $arr->idI);
		$v = $v.$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', $arr->name);
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', $arr->email);
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', $arr->phone);
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', substr($arr->arrival,0,10));
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', substr($arr->departure,0,10));
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', $arr->nbdays);
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', $arr->nbbeds);
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', $arr->villaname);
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = $arr->price_subtotal.' '.$arr->monnaie;
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = $arr->price_total.' '.$arr->monnaie;
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', $arr->comments);
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', $arr->date_saving);
		$v = utf8_decode($v).$tab;
		$line .= $v;

		$data .= trim($line).$ret;
		$line='';
	}

	echo $header."\n".$data;
?>