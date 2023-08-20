<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id']) && isset($_POST['PID']) && isset($_POST['state'])){
        $id=$_POST['id'];
        $pid=$_POST['PID'];
        $state = $_POST['state'];
        $caption=null;
        $location=null;
        $tag=null;
        $response_result= array(); 
        $information= new stdClass();
        if(isset($_POST['img'])){
            $img=$_POST['img'];
        }
        if(isset($_POST['caption'])){
            $caption=$_POST['caption'];
        }
        if(isset($_POST['tag'])){
            foreach($_POST['tag'] as $tags){
                $x = $tags." ";
                $tag = $tag.$x;
            }
        }
        if($state == "update"){
         if($img != null || $caption != null){
            $insert="UPDATE `userpost` SET `pic`='$img', `sentence`='$caption', `tagedperson`='$tag' WHERE ID='$id' AND PID='$pid' ";
            mysqli_query($con,$insert);
            $search="SELECT*FROM userpost WHERE ID='$id' AND PID='$pid' ";     
            $query=mysqli_query($con,$search);
            while($rows=mysqli_fetch_assoc($query)){
                $picture=$rows['pic'];
                $sentence=$rows['sentence'];
                $tagedperson=$rows['tagedperson'];
                if($img == $picture && $sentence == $caption ){
                    $information->response='updated';
                    array_push($response_result, $information);
                }
            }     
         }
        }
        if($state == "delete"){
            $insert="DELETE FROM `userpost` WHERE ID='$id' AND PID='$pid' ";
            mysqli_query($con,$insert);
             $information->response='deleted';
            array_push($response_result, $information);
        }
        echo json_encode($response_result);
    }
?>