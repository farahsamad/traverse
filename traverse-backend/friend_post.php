<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id']) && isset($_POST['postNumber'])){
        $id=$_POST['id'];
         $postNumber = $_POST['postNumber'];
        $rangepost = 3;
        $userfollower="SELECT follower_id,following_id FROM follow WHERE follower_id='$id' OR following_id='$id'";
        $resultuserfollower=mysqli_query($con,$userfollower);
        if(mysqli_num_rows($resultuserfollower) == 0){
            echo json_encode(null);
            exit();
        }
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
            // $searchcount="SELECT COUNT(*) FROM userpost NATURAL JOIN user WHERE ID='$followId' ";
            // $rescount = mysqli_query($con,$searchcount);
            // while($rowcount=mysqli_fetch_assoc($rescount)){
            //     $postCount = $rowcount['COUNT(*)'];
            // }
            // echo $rangepost."          ";
             if($postNumber == 0){
                $search="SELECT*FROM userpost NATURAL JOIN user WHERE ID='$followId'  ORDER BY time DESC LIMIT 3 ";
            }
            else{
                $search="SELECT*FROM userpost NATURAL JOIN user WHERE ID='$followId' ORDER BY time DESC LIMIT $postNumber,$rangepost";
            }
            
            // if($postCount >= $rangepost){
            //     $search="SELECT*FROM userpost NATURAL JOIN user WHERE ID='$followId' ORDER BY time DESC LIMIT $postNumber,$rangepost";
            // }
            // else if($postCount < $rangepost && $postCount > $postNumber){
            //     $search="SELECT*FROM userpost NATURAL JOIN user WHERE ID='$followId' ORDER BY time DESC LIMIT $postNumber,$rangepost";
            // }
            $res=mysqli_query($con,$search);
            while($fetch=mysqli_fetch_assoc($res)){
                
                $time= $fetch['time']; 
                $pic= $fetch['pic']; 
                $followingbio = $fetch['bio'];
                // $image = file_get_contents($pic);
                // $base64Image = base64_encode($image);
                $sentence= $fetch['sentence']; 
                $tagperson= $fetch['tagedperson']; 
                $PID= $fetch['PID'];
                $followingname= $fetch['username'];
                $followingpic= $fetch['profile'];
                date_default_timezone_set('Asia/Beirut'); 
                $new_time=explode(" ",$time);
                $time_day=$new_time[0];
                $time_hour=$new_time[1];
                $now=date('Y-m-d-H-i-s');
                $new_now=explode("-",$now);
                $now_year=$new_now[0];
                $now_month=$new_now[1];
                $now_days=$new_now[2];
                $now_hour=$new_now[3];
                $now_min=$new_now[4];
                $now_sec=$new_now[5];
                $new_times=explode("-",$time_day);
                $time_year=$new_times[0];
                $time_month=$new_times[1];
                $time_today=$new_times[2];
                if($time_year != $now_year){
                    $difference=$now_year - $time_year;
                    $unit=" y";
                }
                else{
                    if($time_month != $now_month){
                        $difference=$now_month - $time_month;
                        $unit=" M";
                    }
                    else{
                        if($time_today != $now_days){
                            $difference=$now_days - $time_today;
                            $unit=" d";
                        }
                        else{
                            $times_hour=explode(":",$time_hour);
                            $time_h=$times_hour[0];
                            $time_min=$times_hour[1];
                            $time_sec=$times_hour[2];
                            if($time_h != $now_hour){
                                $difference=$now_hour - $time_h;
                                $unit=" h";
                            }
                            else{
                                if($time_min != $now_min){
                                    $difference=$now_min - $time_min;
                                    $unit=" m";
                                }
                                else{
                                    if($time_sec != $now_sec){
                                        $difference=$now_sec - $time_sec;
                                        $unit=" s";
                                    }
                                }
                            }
                        }
                    }
                }
                $liked=0;
                $searchforlike="SELECT * FROM likes WHERE ID='$id' AND PID='$PID'";
                $likeresult=mysqli_query($con,$searchforlike);
                while($likesrow=mysqli_fetch_assoc($likeresult)){
                    $like= $likesrow['likes'];
                    if($like==1){
                        $liked=1;
                    }                                           
                }

                $likeCountSearch="SELECT COUNT(likes) FROM likes WHERE  PID='$PID'";
                $likeCountResult=mysqli_query($con,$likeCountSearch);
                while($likeCountRow=mysqli_fetch_assoc($likeCountResult)){
                    $likeCount= $likeCountRow['COUNT(likes)'];                                        
                }

                $comment_response=array();
                $searchforlike="SELECT * FROM comments WHERE PID='$PID'";
                $likeresult=mysqli_query($con,$searchforlike);
                if($likeresult = mysqli_query($con,$searchforlike)){
                    $comentCount = mysqli_num_rows($likeresult);
                }
                while($likesrow=mysqli_fetch_assoc($likeresult)){
                    $comments= $likesrow['comment']; 
                    $CID= $likesrow['CID']; 
                    $commenterPID= $likesrow['PID']; 
                    $commenterid= $likesrow['ID']; 
                    date_default_timezone_set('Asia/Beirut');
                    $tim=$likesrow['time'];
                    $new_tim=explode(" ",$tim);
                    $time_da=$new_tim[0];
                    $time_hou=$new_tim[1];
                    $no=date('Y-m-d-H-i-s');
                    $new_no=explode("-",$no);
                    $now_yea=$new_no[0];
                    $now_mont=$new_no[1];
                    $now_day=$new_no[2];
                    $now_hou=$new_no[3];
                    $now_mi=$new_no[4];
                    $now_se=$new_no[5];
                    $new_time=explode("-",$time_da);
                    $time_yea=$new_time[0];
                    $time_mont=$new_time[1];
                    $time_toda=$new_time[2];
                    if($time_yea != $now_yea){
                        $differenc=$now_yea - $time_yea;
                        $uni=" y";
                    }
                    else{
                        if($time_mont != $now_mont){
                            $differenc=$now_mont - $time_mont;
                            $uni=" M";
                        }
                        else{
                            if($time_toda != $now_day){
                                $differenc=$now_day - $time_toda;
                                $uni=" d";
                            }
                            else{
                                $time_hou=explode(":",$time_hou);
                                $time_hs=$time_hou[0];
                                $time_mins=$time_hou[1];
                                $time_secs=$time_hou[2];
                                if($time_hs != $now_hou){
                                    $differenc=$now_hou - $time_hs;
                                    $uni=" h";
                                }
                                else{
                                    if($time_mins != $now_mi){
                                        $differenc=$now_mi - $time_mins;
                                        $uni=" m";
                                    }
                                    else{
                                        if($time_secs != $now_se){
                                            $differenc=$now_se - $time_secs;
                                            $uni=" s";
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $searchuser="SELECT * FROM user WHERE ID='$commenterid'";
                    $searchresult=mysqli_query($con,$searchuser);   
                    while($elemnts=mysqli_fetch_assoc($searchresult)){
                        $username=$elemnts['username'];
                        $profile=$elemnts['profile'];
                    } 
                    $commentresults= new stdClass();
                    $commentresults->comments=$comments;
                    $commentresults->CID=$CID;
                    $commentresults->PID=$commenterPID;
                    $commentresults->differenc=$differenc;
                    $commentresults->unit=$uni;
                    $commentresults->username=$username;
                    $commentresults->profile=$profile;
                    array_push($comment_response, $commentresults);                                          
                }
                // $searchfor="SELECT*FROM user WHERE ID='$followId'";
                // $resfor=mysqli_query($con,$searchfor);
                // while($rowfor=mysqli_fetch_assoc($resfor)){
                // $followingname= $rowfor['username'];
                // $followingpic= $rowfor['profile'];
                // }
                
                $value= new stdClass();
                $value->picture=$pic;
                $value->followId=$followId;
                $value->followingbio=$followingbio;
                $value->like=$liked;
                $value->comment=$comment_response;
                $value->followingname=$followingname;
                $value->followingpic=$followingpic;
                $value->sentence=$sentence;
                $value->tagperson=$tagperson;
                $value->PID=$PID;
                $value->difference=$difference;
                $value->unit=$unit;
                $value->likeCount=$likeCount;
                $value->comentCount=$comentCount;
                array_push($response_result, $value);
                
            }
        }
        echo json_encode($response_result);
    }
            ?>