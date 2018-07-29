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
    $sql = "SELECT item.id, item.display_name, item.dollar_cost, item.quantity, item.description, item.filename, IFNULL(GROUP_CONCAT(category.name SEPARATOR ', '), '') AS categories FROM `shop_item` AS item LEFT JOIN `shop_item-category` AS itemCategory ON itemCategory.item_id = item.id LEFT JOIN `shop_category` AS category ON category.id = itemCategory.category_id WHERE item.id = ".$id." GROUP BY item.id";
} else{
    $sql = "SELECT item.id, item.display_name, item.dollar_cost, item.quantity, item.description, item.filename, IFNULL(GROUP_CONCAT(category.name SEPARATOR ', '), '') AS categories FROM `shop_item` AS item LEFT JOIN `shop_item-category` AS itemCategory ON itemCategory.item_id = item.id LEFT JOIN `shop_category` AS category ON category.id = itemCategory.category_id GROUP BY item.id";
}
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
