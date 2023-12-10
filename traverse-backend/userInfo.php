<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id'])){
        $id=$_POST['id'];
        $response_result= array(); 
            $search="SELECT * FROM `user` WHERE ID='$id' ";
            $result=mysqli_query($con,$search);
            while($fetch=mysqli_fetch_assoc($result)){
                $name=$fetch['name'];
                $info=$fetch['bio'];
                $value= new stdClass();
                $value->name=$name;
                $value->bio=$info;
                array_push($response_result, $value);
        }
        echo json_encode($response_result);
    }
?>