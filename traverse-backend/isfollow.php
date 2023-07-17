<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['myId']) && isset($_POST['username'])){
        $id=$_POST['myId'];
        $username = $_POST['username'];
        $fetchid="SELECT * FROM user WHERE username='$username' ";
        $fetchidresult=mysqli_query($con,$fetchid);
        while($rowid=mysqli_fetch_assoc($fetchidresult)){
            $friendId=$rowid['ID'];
        $following_result= array(); 
        $searchfollowingid="SELECT count(follower_id) FROM follow WHERE follower_id='$id' AND following_id='$friendId' AND  follower_request='1'";
        $resultsearchfollowingid=mysqli_query($con,$searchfollowingid);
        while($rowfollowingid=mysqli_fetch_assoc($resultsearchfollowingid)){
            $countfollower=$rowfollowingid['count(follower_id)'];
            if($countfollower == 1){
                $followerclass= new stdClass();
                $followerclass->countfollowing=$countfollower;
                array_push($following_result, $followerclass);
            }
            if($countfollower == 0){
                $searchfollowingid2="SELECT count(following_id) FROM follow WHERE following_id='$id' AND follower_id='$friendId' AND following_request='1'";
                $resultsearchfollowingid2=mysqli_query($con,$searchfollowingid2);
                while($rowfollowingids=mysqli_fetch_assoc($resultsearchfollowingid2)){
                    $countfollowing=$rowfollowingids['count(following_id)'];
                    if($countfollowing ==1){
                        $followerclass= new stdClass();
                        $followerclass->countfollowing=$countfollowing;
                        array_push($following_result, $followerclass);
                    }
                    if($countfollowing ==0){
                        $empty=0;
                        $followerclass= new stdClass();
                        $followerclass->countfollowing=$empty;
                        array_push($following_result, $followerclass);
                    }
                }
            }
        }
    }
        echo json_encode($following_result);
    }
    ?>