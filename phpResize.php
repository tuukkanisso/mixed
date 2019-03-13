/* To resize an uploaded photo so that height is 150px */

<?php
	$user=$_POST['user'];
	if(isset($_FILES["uploadImage"]["type"])){
		$path = $_FILES["uploadImage"]["name"];
		$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
		$wanted = '../img/recipes/'.$_POST["picName"].'_'.$user.'_thumb.jpeg';
		// The file
		$filename = $_FILES["uploadImage"]["tmp_name"];

		// Content type
		header('Content-type: image/jpeg');

		// Get new dimensions
		list($width, $height) = getimagesize($filename);
		$toCompress = 150 / $height;
		$new_width = $width * $toCompress;
		$new_height = $height * $toCompress;
		
		// Resample
		if($ext=='jpeg'){
			$image = imagecreatefromjpeg($filename);
		}
		if($ext=='jpg'){
			$image = imagecreatefromjpeg($filename);
		}elseif($ext=='png'){
			$image = imagecreatefrompng($filename);
		}elseif($ext=='gif'){
			$image = imagecreatefromgif($filename);
		}
		$image_p = imagecreatetruecolor($new_width, $new_height);
		imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

		// Output

		if (file_exists($wanted)) {
			echo "Sorry, file already exists.";
		}else{
			imagejpeg($image_p, $wanted, 100);
		}
	}
?>
