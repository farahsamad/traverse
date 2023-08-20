<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id'])){
        $id=$_POST['id'];
        $folloernbr= new stdClass();
        $follower="SELECT follower_id,following_id FROM follow WHERE follower_id='$id' OR following_id='$id'";
        $followerresult=mysqli_query($con,$follower);
        if(mysqli_num_rows($followerresult) == 0){
            $folloernbr->nbr="0";
        }
        else{
            $folloernbr->nbr="1";
        }
        echo json_encode($folloernbr);
    }
?>