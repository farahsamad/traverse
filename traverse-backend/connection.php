<?php
$con= mysqli_connect("localhost","root","","traverse");
if(mysqli_connect_errno()){
    echo"Failed to connect to SQL: ".
    mysqli_connect_error();
}
?>