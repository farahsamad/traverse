<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id']) && isset($_POST['nameofuser']) && isset($_POST['username'])){
        $id=$_POST['id'];
        $nameofuser=$_POST['nameofuser'];
        $username=$_POST['username'];
        $bio = '';
        $img = '';
        if(isset($_POST['userbio'])){
            $bio=$_POST['userbio'];
        }
        if(isset($_POST['img'])){
            $img=$_POST['img'];
        }
        $response_result= array(); 
            $value= new stdClass();
            $value->name=$nameofuser;
            $value->username=$username;
            $value->bio=$bio;
            $value->img=$img;
            array_push($response_result, $value);
        $query="UPDATE `user` SET `username`='$username',`name`='$nameofuser',`profile`='$img',`bio`='$bio' WHERE ID='$id' ";
        $res=mysqli_query($con,$query);

        echo json_encode($response_result);
    }
?>