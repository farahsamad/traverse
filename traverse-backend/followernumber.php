<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id'])){
        $id=$_POST['id'];
        $followernbr= new stdClass();
        $follower="SELECT follower_id,following_id FROM follow WHERE follower_id='$id' OR following_id='$id'";
        $followerresult=mysqli_query($con,$follower);
        if(mysqli_num_rows($followerresult) <= 0){
            $followernbr->nbr="0";
        }
        else{
            $followernbr->nbr="1";
            $query="SELECT*FROM follow WHERE follower_id='$id' AND follower_request='1' OR following_id='$id' AND following_request='1' ";
            $result=mysqli_query($con,$query);
            $response_result= array();
            while($row=mysqli_fetch_assoc($result)){
                $following= $row['following_id']; 
                $follower_id= $row['follower_id'];
                if($id == $follower_id){
                    $followId= $following; 
                }
                if($id == $following){
                    $followId= $follower_id; 
                }       
                if($postNumber == 0){
                    $search="SELECT*FROM userpost NATURAL JOIN user WHERE ID='$followId'  ORDER BY time DESC LIMIT 3 ";
                }
                else{
                    $search="SELECT*FROM userpost NATURAL JOIN user WHERE ID='$followId' ORDER BY time DESC LIMIT $postNumber,$rangepost";
                }
                 $res=mysqli_query($con,$search);
                if(mysqli_num_rows($res) == 0){
                    $followernbr->postnbr="0";
                }
                else{
                     $followernbr->postnbr="1";
                }
            }
        }
        echo json_encode($followernbr);
    }
?>