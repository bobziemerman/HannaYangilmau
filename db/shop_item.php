<?php
$servername = "localhost";
$username = "hannay_admin";
$password = "Hanna1234";
$dbname = "hannay_data";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT item.id, item.display_name, item.dollar_cost, item.description, item.filename, IFNULL(GROUP_CONCAT(category.name SEPARATOR ', '), '') AS categories FROM `shop_item` AS item LEFT JOIN `shop_item-category` AS itemCategory ON itemCategory.item_id = item.id LEFT JOIN `shop_category` AS category ON category.id = itemCategory.category_id GROUP BY item.id";
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
