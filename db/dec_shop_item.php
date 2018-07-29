<?php
$servername = "localhost";
$username = "hannay_admin";
$password = "Hanna1234";
$dbname = "hannay_data";

//Get id, if any
if($_GET['id']){
    $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if($id){
    $id = preg_replace('/\D/', '', $id);
    $sql = "UPDATE shop_item SET quantity = quantity - 1 WHERE id = '".$id."'";

    echo $conn->query($sql);

    $conn->close();
}
?>
