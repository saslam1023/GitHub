<?php
$date = "{$_POST['date']}";
$colour = "{$_POST['colour']}";
$h1 = "{$_POST['h1']}";
$h2 = "{$_POST['h2']}";
$boxlink = "{$_POST['boxlink']}"; 
$boxcontent = "{$_POST['boxcontent']}"; 
$status = "{$_POST['status']}";
$image = "{$_POST['imagefile']}";
$h3 = "{$_POST['h3']}";
$contact = "{$_POST['contact']}";
$phone = "{$_POST['phone']}";
$email = "{$_POST['email']}";
$category = "{$_POST['category']}";
$icon = "{$_POST['icon']}";
$link = "{$_POST['link']}";
$content = "{$_POST['content']}";
$block = "{$_POST['block']}";
$file = "../json/data.json";
$json = json_decode(file_get_contents($file), true);
$items = "items";
$item = "item";
$cid = "{$_POST['counter']}";
$counter = "0000";
$name = ucwords($name);


$id = $json[$items];

$iCount = count($id);
$counttotal = $iCount+1;

$name = nl2br($name);
$dateexpires = date('Y-m-d', strtotime("+365 days"));

$itemarray = array (
"heading" => $h2, 
"subheading" => $h3, 
"date" => $date,  
"image" => $image, 
"content" => $content, 
"colour" => $colour, 
"block" => $block, 
"link" => $link, 
"status" =>  $status
);
$contactarray = array ("name" => $contact, "email" => $email, "phone" => $phone);
$mainarray = array("id" => $counttotal, "category" => $category, "h1" => $h1, "h2" => $h2, "h3" => $h3,  "icon" => $icon, "boxlink" => $boxlink, "boxcontent" => $boxcontent, "item" => $itemarray, "contact" => $contactarray);

$json[$items] []  = $mainarray;

file_put_contents($file, json_encode($json));

header('Location: ../dashboard.html');

?>


