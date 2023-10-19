<?php		
	require_once( $_SERVER["DOCUMENT_ROOT"]."/wp-load.php" );
	
	$today=date("d.m.Y-His");
	header("Content-Encoding: Windows-1252");
	header("Content-type: application/vnd.ms-excel; name='excel'");
	header("Content-Disposition: attachment; filename=contact-".$today.".xls");
	header("Pragma: no-cache");
	header("Expires: 0");

	$res=$wpdb->get_results( "SELECT * FROM `osb_contact` ORDER BY `date_saving` DESC");
	/*echo '<pre>';
	print_r($res);	
	echo '</pre>';
	*/
	$tab="\t";
	$ret="\n";
	$line='';
	$data='';
	
	$header = 'ID'.$tab.'NAME'.$tab.'EMAIL'.$tab.'MESSAGE'.$tab.'REGISTRATION DATE';
	foreach($res as $key => $arr)
	{
		$v = str_replace('"', '""', $arr->idC);
		$v = $v.$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', $arr->name);
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', $arr->email);
		$v = utf8_decode($v).$tab;
		$line .= $v;
		
		$v = str_replace('"', '""', $arr->message);
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