<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id'])){
        $id=$_POST['id'];
        $response_result= array(); 
        $queryfollower="SELECT * FROM follow WHERE following_id='$id' AND follower_request='1' AND following_request='1' OR follower_id='$id' AND following_request='1' AND follower_request='1' ";
        $resultfollower=mysqli_query($con,$queryfollower);
        while($rowfollowerid=mysqli_fetch_assoc($resultfollower)){
            $followingid=$rowfollowerid['follower_id'];
            $followerid=$rowfollowerid['following_id'];
            $FID=$rowfollowerid['FID'];
            if($id == $followerid){
                $followId= $followingid; 
            }
            if($id == $followingid){
                $followId= $followerid; 
            }
            $searchfollower="SELECT * FROM user WHERE ID='$followId' ";
            $resultsearchfollower=mysqli_query($con,$searchfollower);
            while($rowfollowername=mysqli_fetch_assoc($resultsearchfollower)){
                $followername=$rowfollowername['username'];
                $followerimage=$rowfollowername['profile'];
                $followerclass= new stdClass();
                $followerclass->followername=$followername;
                $followerclass->followerimage=$followerimage;
                $followerclass->FID=$FID;
                $followerclass->followingid=$followingid;
                array_push($response_result, $followerclass);
            }

        }
        echo json_encode($response_result);
    }         
?>