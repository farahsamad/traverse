<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id']) && isset($_POST['PID'])){
        $id=$_POST['id'];
        $pid=$_POST['PID'];
        $response_result= array(); 
        $search="SELECT*FROM userpost WHERE ID='$id' AND PID='$pid'";
        $res=mysqli_query($con,$search);
        while($fetch=mysqli_fetch_assoc($res)){
            $pic= $fetch['pic']; 
            $sentence= $fetch['sentence']; 
            $tagperson= $fetch['tagedperson'];                                    
            $value= new stdClass();
            $value->picture=$pic;
            $value->sentence=$sentence;
            $value->tagperson=$tagperson;
            array_push($response_result, $value);                 
        }
        echo json_encode($response_result);
    }
?>