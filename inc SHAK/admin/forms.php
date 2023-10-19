<?php
	global $wpdb;
	$user_ID = get_current_user_id();
?>
<div id="page-forms">
	<h2 class="theme-settings-title">Forms</h2>
	<label>Choose your form:</label>
	<script>
	function changerListingReservation(form)
	{
		window.location.href='/wp-admin/admin.php?page=forms&form='+form;
	}
	</script>
	<select onchange="changerListingReservation(this.value)">
		<option value="">Choose</option>
		<option value="contact" <?php if(isset($_GET['form']) && $_GET['form']=='contact'){echo 'selected="selected"';} ?>>Contact</option>
		<option value="transfert" <?php if(isset($_GET['form']) && $_GET['form']=='transfert'){echo 'selected="selected"';} ?>>Transfert request</option>
		<option value="contact_rental" <?php if(isset($_GET['form']) && $_GET['form']=='contact_rental'){echo 'selected="selected"';} ?>>Contact Rental</option>
		<option value="favorite" <?php if(isset($_GET['form']) && $_GET['form']=='favorite'){echo 'selected="selected"';} ?>>Favorite</option>
		<option value="booking" <?php if(isset($_GET['form']) && $_GET['form']=='booking'){echo 'selected="selected"';} ?>>Booking</option>
	</select>
	<br/>
	<br/>
	<?php
		if(isset($_GET['form']) && $_GET['form']!='')
		{
			$form=$_GET['form'];
			$tab=$wpdb->get_results( "SELECT * FROM `osb_".$form."` ORDER BY `date_saving` DESC");
			
			/*echo '<pre>';
			print_r($tab);
			echo '</pre>';*/
			
			if(!empty($tab)) 
			{
				echo '<div id="content-messages" class="clearfix">';
				echo '	<div class="table-responsive">';
				echo '		<table class="table table-bordered table-striped">';
				echo '			<thead>';
				echo '				<tr>';
				switch($form)
				{
					case 'contact':case 'transfert':
						echo '<th>id</th>';
						echo '<th>Name</th>';
						echo '<th>Email</th>';
						echo '<th>Message</th>';
						echo '<th>Registration Date</th>';
					break;
					case 'contact_rental':case 'favorite':
						echo '<th>id</th>';
						echo '<th>Name</th>';
						echo '<th>Email</th>';
						echo '<th>Phone</th>';
						echo '<th>Arrival</th>';
						echo '<th>Departure</th>';
						echo '<th>Budget</th>';
						echo '<th>Message</th>';
						echo '<th>Registration Date</th>';
					break;
					case 'booking':
						echo '<th>id</th>';
						echo '<th>Name</th>';
						echo '<th>Email</th>';
						echo '<th>Phone</th>';
						echo '<th>Arrival</th>';
						echo '<th>Departure</th>';
						echo '<th>Day(s)</th>';
						echo '<th>Bedroom(s)</th>';
						echo '<th>Villa</th>';
						echo '<th>Subtotal</th>';
						echo '<th>Total</th>';
						echo '<th>Comments</th>';
						echo '<th>Registration Date</th>';
					break;
				}
				echo '				</tr>';
				echo '			</thead>';
				echo '			<tbody>';
				foreach($tab as $key => $o) 
				{
								echo '<tr>';
					switch($form)
					{
						case 'transfert':
							echo '	<td>'.$o->idT.'</td>';
							echo '	<td>'.$o->name.'</td>';
							echo '	<td>'.$o->email.'</td>';
							echo '	<td>'.$o->message.'</td>';
							echo '	<td>'.$o->date_saving.'</td>';
							echo '</tr>';
						break;
						case 'contact':
							echo '	<td>'.$o->idC.'</td>';
							echo '	<td>'.$o->name.'</td>';
							echo '	<td>'.$o->email.'</td>';
							echo '	<td>'.$o->message.'</td>';
							echo '	<td>'.$o->date_saving.'</td>';
							echo '</tr>';
						break;
						case 'contact_rental':
							echo '	<td>'.$o->idCr.'</td>';
							echo '	<td>'.$o->firstname.' '.$o->lastname.'</td>';
							echo '	<td>'.$o->email.'</td>';
							echo '	<td>'.$o->phone.'</td>';
							echo '	<td>'.substr($o->arrival,0,10).'</td>';
							echo '	<td>'.substr($o->departure,0,10).'</td>';
							echo '	<td>'.$o->budget.'</td>';
							echo '	<td>'.$o->message.'</td>';
							echo '	<td>'.$o->date_saving.'</td>';
							echo '</tr>';
						break;
						case 'favorite':
							echo '	<td>'.$o->idFav.'</td>';
							echo '	<td>'.$o->firstname.' '.$o->lastname.'</td>';
							echo '	<td>'.$o->email.'</td>';
							echo '	<td>'.$o->phone.'</td>';
							echo '	<td>'.substr($o->arrival,0,10).'</td>';
							echo '	<td>'.substr($o->departure,0,10).'</td>';
							echo '	<td>'.$o->budget.'</td>';
							echo '	<td>'.$o->message.'</td>';
							echo '	<td>'.$o->date_saving.'</td>';
							echo '</tr>';
						break;
						case 'booking':
							echo '	<td>'.$o->idI.'</td>';
							echo '	<td>'.$o->name.'</td>';
							echo '	<td>'.$o->email.'</td>';
							echo '	<td>'.$o->phone.'</td>';
							echo '	<td>'.substr($o->arrival,0,10).'</td>';
							echo '	<td>'.substr($o->departure,0,10).'</td>';
							echo '	<td>'.$o->nbdays.'</td>';
							echo '	<td>'.$o->nbbeds.'</td>';
							echo '	<td>'.$o->villaname.'</td>';
							echo '	<td>'.$o->monnaie.' '.$o->price_subtotal.'</td>';
							echo '	<td>'.$o->monnaie.' '.$o->price_total.'</td>';
							echo '	<td>'.$o->comments.'</td>';
							echo '	<td>'.$o->date_saving.'</td>';
							echo '</tr>';
						break;
					}
				}
				echo '			</tbody>';
				echo '		</table>';
				echo '		<br/>';
				echo '		<a href="/wp-content/themes/onestbarth/inc/admin/export_'.$form.'.php" title="Export" class="button-primary export" target="blank">Export</a>';
				echo '	</div>';
				echo '</div>';
				
			}
			else
			{
				echo 'No emails';
			}
		}
	?>
</div>