<?php
include("./connection.php");
header('Access-Control-Allow-Origin: http://localhost:3000');
    if(isset($_GET['username']) && isset($_GET['password'])){
            $username=$_GET['username'];
            $password=$_GET['password'];
            $query="SELECT*FROM user WHERE username='$username' ";
            $res=mysqli_query($con,$query);
            $row=mysqli_fetch_assoc($res);
            $name=$row['username'];
            $pass=$row['password'];
            $profile=$row['profile'];
            $bio=$row['bio'];
            $ID=$row['ID'];
            $value= new stdClass();
            if($name==$username){
                if($pass!=$password){
                    $value->response='!Incorrect password';
                    $value->id=null;
                    echo json_encode($value);
                }
                else{
                    session_start();
                    $value->response='success';
                    $value->id=$ID;
                    $value->name=$name;
                    $value->profile=$profile;
                    $value->bio=$bio;
                    echo json_encode($value);
                }
            }
            else{
                $value->response='!Incorrect username';
                $value->id=null;
                echo json_encode($value);
            }
    }
?>
