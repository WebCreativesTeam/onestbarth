	<?php
		$days = [1=>'Monday', 2=>'Tuesday', 3=>'Wednesday', 4=>'Thursday', 5=>'Friday', 1=>'Saturday',6=>'Sunday'];
		$months = [1=>'January', 2=>'February', 3=>'March', 4=>'April', 5=>'May', 6=>'June', 7=>'July', 8=>'August', 9=>'September', 10=>'October', 11=>'November', 12=>'December'];
	?>
	<footer id="footer" role="contentinfo" class="section"> 
		<div id="footer-top">
			<div class="container">
				<div id="footer-1" class="col-3">
					<b class="title"><?php _e("Current Weather","onestbarts"); ?></b>
					<span class="pink"><?php _e("Gustavia, Saint-Barthélemy","onestbarts"); ?></span>
					
					<!-- WIDGET WEATHER -->
					<div id="weather" class="clearfix" style="font-size:14px;">
						<?php
							// WEATHER
							//API: 264fcc7bb0de8c3dfeeead47f82e9ba9
							$request = 'https://api.openweathermap.org/data/2.5/weather?q=Gustavia&appid=09f104a97dc7484b4921ccba038d1d48&units=metric';
							$response  = file_get_contents($request);
							$jsonobj  = json_decode($response);
							
							/*echo '<pre>';
							print_r($jsonobj);
							echo '</pre>';*/
						?>
						<img src="https://openweathermap.org/img/w/<?php echo $jsonobj->weather[0]->icon; ?>.png"/> 
						<?php 
							$c=round($jsonobj->main->temp); 
							$f=round(($c * 1.8) + 32);
						?>
						<span class="temperature" data-c="<?php echo $c; ?>" data-f="<?php echo $f; ?>"><?php echo $c; ?></span>
						<a class="unit active" data-target="c" href="#">°C</a>
						<span class="units-separator"></span>
						<a class="unit" data-target="f" href="#">°F</a>
						
						<?php
							/*<span id="meteo-temperature"><?php echo round($jsonobj->list[0]->main->temp); ?><sup>°</sup></span>*/
						?>
					</div>
				</div>
				<div id="footer-2" class="col-3">
					<b class="title"><?php _e("Connect With Us","onestbarts"); ?></b>
					<span class="pink"><?php _e("Social Medias Channels","onestbarts"); ?></span>
					<ul class="social"><?php dynamic_sidebar('footer-2'); ?></ul> 
				</div>
				<div id="footer-3" class="col-6">
					<b class="title"><?php _e("Newsletter sign up","onestbarts"); ?></b>
					<span class="pink"><?php _e("Signup For Special Offers","onestbarts"); ?></span>
					<?php echo do_shortcode('[mc4wp_form id="237"]'); ?>
				</div>
			</div>
		</div>
		<div id="footer-bottom">
			<div class="container">
				<div id="footer-bottom-top">
					<div class="col-8">
						<?php wp_nav_menu( array('theme_location' => 'footer','menu_class'=> 'nav-footer clearfix') ); ?>
					</div>
					<div class="col-4">
						<select name="footer-money" id="footer-money">
							<?php
								foreach($_SESSION['money'] as $name => $sigle){
									
									if($name == $_SESSION['money_active'])
									{
										if($name == "dollar"){
										echo '<option value="'.$name.'" selected="selected">'.$sigle.'</option>';
										}
									}
									
									else
									{
										if($name == "dollar"){
										echo '<option value="'.$name.'">'.$sigle.'</option>';
										}
									}
								}
							?>
						</select>
					</div>
				</div>
				<div id="footer-bottom-bottom">
					<div class="col-8">
						<a href="<?php echo get_home_url(); ?>/" title="<?php _e("Home", "onestbarts"); ?>" id="header-logo">
							<img src="<?php echo get_bloginfo('template_url'); ?>/dist/img/logo.svg" alt="onestbarts" class="footer-bottom-logo-svg"/>
						</a>
					</div>
					<div class="col-4">
						<?php _e("Made with passion by", "onestbarts"); ?> <a href="https://www.kevinbarrallon.com" title="<?php _e("Made with passion by", "onestbarts"); ?> KB" target="_blank">KB</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
	
	<!-- BACK TO TOP -->
	<a href="#header" id="back-to-top"><i class="fa fa-long-arrow-up" aria-hidden="true"></i></a>
	
	<!-- BOOKING POPUP -->
	<div id="booking" class="popup">
		<div id="booking-header" class="popup-header">
			<a href="#" title="<?php _e("close","onestbarts"); ?>" class="popup-close"><span></span><span></span></a>
		</div>	
		<div class="container">
			<div id="booking-content" class="popup-content">
				<div class="white-logo">
					<img src="<?php echo get_bloginfo('template_url'); ?>/dist/img/logo-white.png" alt="Onestbarts">
				</div>
				<b class="title"><?php _e("Book your stay","onestbarts"); ?></b>
				<div id="booking-form">
					<div id="bedroom-select">
						<span data-text="<?php _e("Number of bedroom(s)", "onestbarts"); ?>">
							<?php 
								if(isset($_SESSION['booking']['nbbeds']) && $_SESSION['booking']['nbbeds']!='' && $_SESSION['booking']['nbbeds']!= 1)
								{
									echo __("Number of bedroom(s)", "onestbarts").': '.$_SESSION['booking']['nbbeds']; 
								}
								else
								{
									echo __("Select your bedroom ", "onestbarts"); 
								}
						?>
						</span>
						<ul id="bedroom-select-options">
							<?php
								for($i=1;$i<11;$i++)
								{
									if(isset($_SESSION['booking']['nbbeds']) && $_SESSION['booking']['nbbeds'] == $i)
									{
										echo '<li data-nb="'.$i.'" class="selected">'.$i.'</li>';
									}
									else
									{
										echo '<li data-nb="'.$i.'">'.$i.'</li>';
									}
								}
							?>
						</ul>
					</div>
					<div class="booking-dates">
						<div id="arrival" class="booking-date arrival" data-datearrival="<?php echo $_SESSION['booking']['arrivaldate']; ?>" data-datedeparture="<?php echo $_SESSION['booking']['departuredate']; ?>">
							<?php
								if(isset($_SESSION['booking']['arrivaldate']) && $_SESSION['booking']['arrivaldate']!='')
								{
									$dateArrival=$_SESSION['booking']['arrivaldate'];
									$dArrival=date('j', strtotime($dateArrival));
									$mArrival=date('F', strtotime($dateArrival));
									$yArrival=date('Y', strtotime($dateArrival));
									$dNameArrival=date('l', strtotime($dateArrival));
								}
								else
								{
									$dateArrival=date('Y-m-d');
									$dArrival=date('j');
									$mArrival=date('F');
									$yArrival=date('Y');
									$dNameArrival=date('l');
								}
							?>								
							<input id="arrivaldate" type="hidden" value="<?php echo $dateArrival;?>"/>
							<span class="date_title"><?php _e("Arrival","onestbarts"); ?></span>
							<div class="date-wrap">
								<span class="day"><?php echo $dArrival; ?></span>
								<span class="month-year"><?php echo $mArrival; ?>, <?php echo $yArrival; ?></span>
								<span class="day-text"><?php echo $dNameArrival; ?></span>
							</div>
						</div>
						<div id="departure" class="booking-date departure">
							<?php
								if(isset($_SESSION['booking']['departuredate']) && $_SESSION['booking']['departuredate']!='')
								{
									$dateDeparture=$_SESSION['booking']['departuredate'];
									$dDeparture=date('j', strtotime($dateDeparture));
									$mDeparture=date('F', strtotime($dateDeparture));
									$yDeparture=date('Y', strtotime($dateDeparture));
									$dNameDeparture=date('l', strtotime($dateDeparture));
								}
								else
								{
									$dDeparture=date('Y-m-d');
									$dDeparture=date('j');
									$mDeparture=date('F');
									$yDeparture=date('Y');
									$dNameArrival=date('l');
								}
							?>					
							<input id="departuredate" type="hidden" value="<?php echo $dateDeparture;?>"/>
							<span class="date_title"><?php _e("Departure","onestbarts"); ?></span>
							<div class="date-wrap">
								<span class="day"><?php echo $dDeparture; ?></span>
								<span class="month-year"><?php echo $mDeparture; ?>, <?php echo $yDeparture; ?></span>
								<span class="day-text"><?php echo $dNameArrival; ?></span>
							</div>
						</div>
					</div>
					<div id="arrivalCalendar" class="calendars"></div>
					<div id="departureCalendar" class="calendars"></div>
					<div id="msg-booking"></div>
					
					<div class="booking-validation">
						<a href="#" id="valid-calendar" title="<?php _e("Book your stay","onestbarts"); ?>"><span><?php _e("Book your stay","onestbarts"); ?></span><i class="fa fa-spinner"></i></a>
					</div>
				</div>
					
					<div class="col-12 footer-bottom-logo-div">
						<a href="<?php echo get_home_url(); ?>/" title="<?php _e("Home", "onestbarts"); ?>" id="header-logo">
							<img src="<?php echo THEME_URI; ?>/dist/img/logo.svg" alt="onestbarts" class="footer-bottom-logo-svg"/>
						</a>
					</div>
			</div>
			<div id="booking-footer" class="popup-footer">
				<div class="popup-footer-left">
					<?php _e("Stay in distinctive private homes - with an unprecedented level of service and care.","onestbarts"); ?>
				</div>
				<div class="popup-footer-right">
					<?php /* T: <a href="tel:590690555000" title="+590 690 555 000">+590 690 555 000</a>*/ ?>
					E: <a href="mailto:home@onestbarts.com" title="home@onestbarts.com" id="popup-footer-right-link">home@onestbarts.com</a>
				</div>
			</div>
		</div>
	</div>
	
	<script src="<?php echo get_bloginfo('template_url');?>/dist/js/classie.js"></script>
	<script src="<?php echo get_bloginfo('template_url');?>/dist/js/selectFx.js"></script>
	<script>
    /*$(document).ready(function(){
        console.log(<?php 
            //echo"<pre>";
            //print_r($_SESSION);
            //echo"</pre>";
        ?>);
    });*/
		// (function() {
		// 	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {	
		// 	new SelectFx(el, {
		// 		onChange : function( val ) { 
		// 			var e = val
		// 			console.log(val);
		// 			if($.isNumeric(val) == true) {
		// 				console.log('number');
		// 				$("#single-rates table tbody tr").hide(), $("#single-rates table tbody tr.nbbed-" + e).show(500), !1

		// 			} else {
		// 				console.log('not number');
		// 				$("#single-rates .money").removeClass("active"), $("#single-rates ." + e).addClass("active"), !1
		// 			}
		// 			return false; 
		// 		}
		// 	});
		// 	} );
		// })();
		
	</script>
	
	<?php wp_footer();?>
	<style>
	.white .sa_owl_theme .owl-nav .owl-prev {
background: url('https://onestbarts.com/wp-content/plugins/slide-anything/images/icon_prev.png') no-repeat center center !important;
}
.white .sa_owl_theme .owl-nav .owl-next {
	background: url('https://onestbarts.com/wp-content/plugins/slide-anything/images/icon_next.png') no-repeat center center !important;
}
#home .section#home-collections #home-collections-content .owl-dots {
	margin: 15px auto 0;
	border: none;
	display: block;
}
#home .section#home-collections #home-collections-content .owl-dots .owl-dot {
	background-color: transparent;
	margin: 0 2px;
	border: none;
	height: 15px;
}
#home .section#home-collections #home-collections-content .owl-dots .owl-dot.active {
	background-color: transparent;
}
#home .section#home-collections #home-collections-content .owl-dots .owl-dot.active span {
	background-color: black !important;
}
.sa_owl_theme .owl-dots .owl-dot span {
	display: inline-block !important;
	border-style: none !important;
	background-color: white !important;
	width: 10px !important;
	height: 10px !important;
	border-radius: 50% !important;
	margin: 0px 3px !important;
	transition: all .3s ease-in-out !important;
	-webkit-transition: all .3s ease-in-out !important;
	-moz-transition: all .3s ease-in-out !important;
	-o-transition: all .3s ease-in-out !important;
}
	</style>


	</body>
</html> 
