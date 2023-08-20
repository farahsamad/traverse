<?php

include("./connection.php");
header("Access-Control-Allow-Origin: http://localhost:3000");
//$_POST=json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['pid'])){
        $pid=$_POST['pid'];
        foreach($pid as $pids){
            $searchcomments="SELECT*FROM comments WHERE PID='$pids' ";
            $commentsresult=mysqli_query($con,$searchcomments);
            $comment_response=array();
            while($commentsrow=mysqli_fetch_assoc($commentsresult)){
                $comments=$commentsrow['comment'];
                $userid=$commentsrow['ID'];
                $CID=$commentsrow['CID'];
                date_default_timezone_set('Asia/Beirut');
                $time=$commentsrow['time'];
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
                            $time_hour=explode(":",$time_hour);
                            $time_h=$time_hour[0];
                            $time_min=$time_hour[1];
                            $time_sec=$time_hour[2];
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

                $search="SELECT * FROM user WHERE ID='$userid'";
                $searchresult=mysqli_query($con,$search);   
                while($elemnts=mysqli_fetch_assoc($searchresult)){
                    $username=$elemnts['username'];
                    $profile=$elemnts['profile'];
                }   
                if($comments!='null'){
                    $commentresults= new stdClass();
                    $commentresults->comments=$comments;
                    $commentresults->CID=$CID;
                    $commentresults->difference=$difference;
                    $commentresults->unit=$unit;
                    $commentresults->profile=$profile;
                    $commentresults->username=$username;
                    array_push($comment_response, $commentresults); 
                }                               
            }
        echo json_encode($comment_response);
        }
    }
    
?> 