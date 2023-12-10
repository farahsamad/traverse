<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
        if(isset($_POST['username'])){
            $username=$_POST['username'];
            $info= array(); 
            $query="SELECT*FROM user WHERE username='$username' ";
            $res=mysqli_query($con,$query);
            $row=mysqli_fetch_assoc($res);
            $image=$row['profile'];
            $bio=$row['bio'];
            $id=$row['ID'];
            $value= new stdClass();
            $value->id=$id;
            $value->image=$image;
            $value->bio=$bio;
            array_push($info, $value);
            echo json_encode($info);
    }
?>
