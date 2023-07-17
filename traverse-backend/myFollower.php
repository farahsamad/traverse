<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id'])){
        $id=$_POST['id'];
        $response_result= array(); 
        $follower_result= array(); 
        $following_result= array(); 
        $queryfollower="SELECT count(follower_id) FROM follow WHERE following_id='$id' AND follower_request='1' OR follower_id='$id' AND following_request='1'";
        $resultfollower=mysqli_query($con,$queryfollower);
        while($rowfollower=mysqli_fetch_assoc($resultfollower)){
            $countfollower=$rowfollower['count(follower_id)'];
            // echo"countfollower".$countfollower;

        }
        $searchfollowerid="SELECT * FROM follow WHERE following_id='$id' AND follower_request='1'";
        $resultsearchfollowerid=mysqli_query($con,$searchfollowerid);
        while($rowfollowerid=mysqli_fetch_assoc($resultsearchfollowerid)){
            $followingid=$rowfollowerid['follower_id'];
            $FID=$rowfollowerid['FID'];
            $searchfollower="SELECT * FROM user WHERE ID='$followingid' ";
            $resultsearchfollower=mysqli_query($con,$searchfollower);
            while($rowfollowername=mysqli_fetch_assoc($resultsearchfollower)){
                $followername=$rowfollowername['username'];
                $followerimage=$rowfollowername['profile'];
                $followerbio=$rowfollowername['bio'];
                $followerclass= new stdClass();
                $followerclass->followername=$followername;
                $followerclass->followerimage=$followerimage;
                $followerclass->followerbio=$followerbio;
                $followerclass->FID=$FID;
                $followerclass->followingid=$followingid;
                array_push($follower_result, $followerclass);
            }
        }
        $searchfollowerid2="SELECT * FROM follow WHERE follower_id='$id' AND following_request='1'";
        $resultsearchfollowerid2=mysqli_query($con,$searchfollowerid2);
        while($rowfollowerids=mysqli_fetch_assoc($resultsearchfollowerid2)){
            $followingids=$rowfollowerids['following_id'];
            $FID=$rowfollowerids['FID'];
            $searchfollowers="SELECT * FROM user WHERE ID='$followingids' ";
            $resultsearchfollowers=mysqli_query($con,$searchfollowers);
            while($rowfollowernames=mysqli_fetch_assoc($resultsearchfollowers)){
                $followernames=$rowfollowernames['username'];
                $followerimages=$rowfollowernames['profile'];
                $followerbio=$rowfollowernames['bio'];
                $followerclasss= new stdClass();
                $followerclasss->followername=$followernames;
                $followerclasss->followerimage=$followerimages;
                $followerclasss->followerbio=$followerbio;
                $followerclasss->FID=$FID;
                $followerclasss->followingid=$followingids;
                array_push($follower_result, $followerclasss);
            }
        }
        $queryfollowing="SELECT count(following_id) FROM follow WHERE follower_id='$id' AND follower_request='1' OR following_id='$id' AND following_request='1'";
        $resultfollowing=mysqli_query($con,$queryfollowing);
        while($rowfollowing=mysqli_fetch_assoc($resultfollowing)){
            $countfollowing=$rowfollowing['count(following_id)'];
        }
        $searchfollowingid="SELECT * FROM follow WHERE follower_id='$id' AND follower_request='1'";
        $resultsearchfollowingid=mysqli_query($con,$searchfollowingid);
        while($rowfollowingid=mysqli_fetch_assoc($resultsearchfollowingid)){
            $followerid=$rowfollowingid['following_id'];
            $FID=$rowfollowingid['FID'];
            $searchfollowing="SELECT * FROM user WHERE ID='$followerid' ";
            $resultsearchfollowing=mysqli_query($con,$searchfollowing);
            while($rowfollowingname=mysqli_fetch_assoc($resultsearchfollowing)){
                $followingname=$rowfollowingname['username'];
                $followingimage=$rowfollowingname['profile'];
                $followingbio=$rowfollowingname['bio'];
                $followingclass= new stdClass();
                $followingclass->followingname=$followingname;
                $followingclass->followingimage=$followingimage;
                $followingclass->followingbio=$followingbio;
                $followingclass->FID=$FID;
                $followingclass->followerid=$followerid;
                array_push($following_result, $followingclass);
            }
        }
        $searchfollowingid2="SELECT * FROM follow WHERE following_id='$id' AND following_request='1'";
        $resultsearchfollowingid2=mysqli_query($con,$searchfollowingid2);
        while($rowfollowingids=mysqli_fetch_assoc($resultsearchfollowingid2)){
            $followerids=$rowfollowingids['follower_id'];
            $FID=$rowfollowingids['FID'];
            $searchfollowings="SELECT * FROM user WHERE ID='$followerids' ";
            $resultsearchfollowings=mysqli_query($con,$searchfollowings);
            while($rowfollowingnames=mysqli_fetch_assoc($resultsearchfollowings)){
                $followingnames=$rowfollowingnames['username'];
                $followingimages=$rowfollowingnames['profile'];
                $followingbio=$rowfollowingnames['bio'];
                $followingclasss= new stdClass();
                $followingclasss->followingname=$followingnames;
                $followingclasss->followingimage=$followingimages;
                $followingclasss->followingbio=$followingbio;
                $followingclasss->FID=$FID;
                $followingclasss->followerid=$followerids;
                array_push($following_result, $followingclasss);
            }
        }
        $countfollow= new stdClass();
        $countfollow->countfollowing=$countfollowing;
        array_push($response_result, $countfollow);
        $countfollows= new stdClass();
        $countfollows->countfollower=$countfollower;
        array_push($response_result, $countfollows);
        $followingcla= new stdClass();
        $followingcla->followingsnames=$following_result;
        array_push($response_result, $followingcla);
        $followercla= new stdClass();
        $followercla->followersnames=$follower_result;
        array_push($response_result, $followercla);
        echo json_encode($response_result);
    }         
?>