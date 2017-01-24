<?php
// https://github.com/IceTimux/SMTP-Bootstrap-Contact-Form
if (isset($_POST['submit'])) {
	$subpages = explode("_", $_POST['pcSubpages']);
	$texts = explode("_", $_POST['pcTexts']);
	$photos = explode("_", $_POST['pcPhotos']);
	$message =
		'Name:<br/>
			- '.$_POST['contactName'].'<br/><br/>
		Stadt:<br/>
			- '.$_POST['contactCity'].'<br/><br/>
		Email-Adresse:<br/>
			- '.$_POST['contactEmail'].'<br/><br/>
		Telefonnummer:<br/>
			- '.$_POST['contactNumber'].'<br/>
			'.(
				isset($_POST['contactRecall']) ?
					'- '.$_POST['contactRecall'].'<br/>' :
					''
			).'
		<br/>
		Persöhnliche Nachricht:<br/>
			- '.$_POST['contactMessage'].'<br/>
		<br/>
		#######################################<br/>
		# <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 #<br/>
		#######################################
		<br/>
		<br/>
		Anfrage im Gesamtwert von
		'.(
			explode("_b_", $_POST['basicService'])[1] ?
				explode("_b_", $_POST['basicService'])[0].'€' :
				explode("_p_", $_POST['basicService'])[0].'€'
		).'
		<br/>
		--------------------------------------
		<br/>
		<br/>
		'.(
			explode("_b_", $_POST['basicService'])[1] ?
				'Basis Paket für '.explode("_b_", $_POST['basicService'])[1].'€' :
				'Premium Paket für '.explode("_p_", $_POST['basicService'])[1].'€'
		).(
			($subpages[0] !== '') ?
				'<br/><br/>'.$subpages[0].' Unterseiten für je '.$subpages[1].'€<br/>- Gesamt: '.($subpages[0]*$subpages[1]).'€' :
				''
		).(
			($texts[0] !== '') ?
				'<br/><br/>'.$texts[0].' Texte für je '.$texts[1].'€<br/>- Gesamt: '.($texts[0]*$texts[1]).'€' :
				''
		).(
			($photos[0] !== '') ?
				'<br/><br/>'.$photos[0].' Fotos für je '.$texts[1].'€<br/>- Gesamt: '.($photos[0]*$photos[1]).'€' :
				''
		).(
			isset($_POST['pcMaps']) ?
				'<br/><br/>Maps für '.$_POST['pcMaps'].'€' :
				''
		).(
			isset($_POST['pcContact']) ?
				'<br/><br/>Kontaktformular für '.$_POST['pcContact'].'€' :
				''
		).(
			isset($_POST['pcFbPlugin']) ?
				'<br/><br/>Facebook Plugin für '.$_POST['pcFbPlugin'].'€' :
				''
		).(
			isset($_POST['pcIcons']) ?
				'<br/><br/>Eigene Icons für '.$_POST['pcIcons'].'€' :
				''
		).(
			isset($_POST['pcLogo']) ?
				'<br/><br/>Eigenes Logo für '.$_POST['pcLogo'].'€' :
				''
		).(
			isset($_POST['pcSeo']) ?
				'<br/><br/>SEO für '.$_POST['pcSeo'].'€' :
				''
		);

	require 'phpmailer/PHPMailerAutoload.php';

	// Instantiate Class
	$mail = new PHPMailer();

	// Set up SMTP //
	// Sets up a SMTP connection
	$mail->IsSMTP();
	// Connection with the SMTP does require authorization
	$mail->SMTPAuth = true;
	// Connect using a TLS connection
	$mail->SMTPSecure = "ssl";
	//Gmail SMTP server address
	$mail->Host = "smtp.gmail.com";
	//Gmail SMTP port
	$mail->Port = 465;
	$mail->Encoding = '7bit';

	// Authentication
	$mail->Username = "jacek.bewerbung@gmail.com";
	$mail->Password = "alphaalpha12";

	// Compose
	$mail->SetFrom($_POST['contactEmail'], $_POST['contactName']);
	$mail->AddReplyTo($_POST['contactEmail'], $_POST['contactName']);
	$mail->Subject = "Neue Kundenanfrage an Webfabrikant";
	$mail->CharSet = 'UTF-8';
	$mail->WordWrap = 50;
	$mail->IsHTML(true);
	$mail->Body = $message;

	// Send To
	$mail->AddAddress("jacek@jungerpadawan.de", "Jacek");
	if ($mail->Send()) {
		echo 'Message could be sent.';
	} else {
		echo 'Message could not be sent.';
	}

	unset($mail);
}
?>
