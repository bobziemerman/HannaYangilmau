<?php
$servername = "localhost";
$username = "bobzieme_admin";
$password = "hostgatorAdmin1";
$dbname = "bobzieme_data";


$sql = "SELECT * FROM gallery_item";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM gallery_item";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    echo "[";
    $first = true;
    while($row = $result->fetch_assoc()) {
        if($first){
            $first = false;
        } else {
            echo ", ";
        }
        echo json_encode($row);
    }
    echo "]";
} else {
    echo "[]";
}
$conn->close();
?>
