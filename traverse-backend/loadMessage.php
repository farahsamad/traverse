<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id']) && isset($_POST['userid']) && isset($_POST['messageNumber'])){
        $id=$_POST['id'];
        $userid=$_POST['userid'];
        $messageNumber=$_POST['messageNumber'];
        $rangemessage = 20;
        $response_result= array(); 
        
        if($messageNumber == 1){
            
            $search="SELECT * FROM message WHERE  ID='$id' AND RID='$userid' OR ID='$userid' AND RID='$id' ORDER BY MID desc LIMIT 10 ";
        }
        else{
            $search="SELECT * FROM message WHERE  ID='$id' AND RID='$userid' OR ID='$userid' AND RID='$id' ORDER BY MID desc LIMIT $messageNumber,$rangemessage  ";
        }
        $res=mysqli_query($con,$search);
        while($fetch=mysqli_fetch_assoc($res)){
            $senderId= $fetch['ID']; 
            if($senderId == $id){
                $sendby = $id;
            }
            else if($senderId == $userid){
                $sendby = $userid;
            }
            $message= $fetch['message']; 
            $date= $fetch['date']; 
            $message_status= $fetch['message_status']; 
            $MID= $fetch['MID']; 
            date_default_timezone_set('Asia/Beirut'); 
            $new_time=explode(" ",$date);
            $time_day=$new_time[0];
            $time_hour=$new_time[1];
            $times_hour=explode(":",$time_hour);
            $time_h=$times_hour[0];
            $time_min=$times_hour[1];
            $send_time=substr($time_hour,0,5);
            // $liked=0;
            // $searchforlike="SELECT * FROM likes WHERE ID='$id' AND PID='$PID'";
            // $likeresult=mysqli_query($con,$searchforlike);
            // while($likesrow=mysqli_fetch_assoc($likeresult)){
            //     $like= $likesrow['likes'];
            //     if($like==1){
            //         $liked=1;
            //     }  
            // }                                         
            $value= new stdClass();
            $value->MID=$MID;
            $value->sendby=$sendby;
            $value->message=$message;
            $value->message_status=$message_status;
            // $value->difference=$difference;
            // $value->unit=$unit;
            $value->time_day=$time_day;
            $value->send_time=$send_time;
            array_push($response_result, $value);                 
        }
        echo json_encode($response_result);
    }
?>