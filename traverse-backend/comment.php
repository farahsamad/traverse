<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
        if(isset($_POST['id'])  && isset($_POST['pid'])){
        if(isset($_POST['commentvalues'])){
            date_default_timezone_set('Asia/Beirut');
            $time=date('Y-m-d-H-i-s');
            $id=$_POST['id'];
            $pid=$_POST['pid'];
            $comment=$_POST['commentvalues'];        
            $insert="INSERT INTO `comments`(`ID`, `PID`, `comment`, `time`) VALUES ('$id','$pid','$comment','$time')";
            mysqli_query($con,$insert);
            echo"hiiiiiiiiiiiiiiiiii";
        }
    }
?>