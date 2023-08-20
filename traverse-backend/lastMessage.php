<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id'])){
        $id=$_POST['id'];
        $response_result= array(); 
        $search="SELECT * FROM message WHERE MID IN(SELECT MAX(MID) FROM message WHERE ID='$id' OR RID='$id'  GROUP by ID,RID )ORDER BY MID DESC";
        $res=mysqli_query($con,$search);
        while($fetch=mysqli_fetch_assoc($res)){
            $senderId= $fetch['ID']; 
            $receiverId= $fetch['RID']; 
            if($senderId == $id){
                $send = $receiverId;
            }
            else if($receiverId == $id){
                $send = $senderId;
            }
            if($senderId == $id){
                $sendby = $id;
            }
            else if($receiverId == $id){
                $sendby = $senderId;
            }
            $message= $fetch['message']; 
            $date= $fetch['date']; 
            $message_status= $fetch['message_status']; 
            $MID= $fetch['MID']; 
            $searchUser="SELECT * FROM user WHERE  ID='$send' ";
            $result=mysqli_query($con,$searchUser);
            while($userfetch=mysqli_fetch_assoc($result)){
                $username=$userfetch['username'];
                $userimage=$userfetch['profile'];
                $userbio=$userfetch['bio'];
            }
            date_default_timezone_set('Asia/Beirut'); 
            $new_time=explode(" ",$date);
            $time_day=$new_time[0];
            $time_hour=$new_time[1];
            $times_hour=explode(":",$time_hour);
            $time_h=$times_hour[0];
            $time_min=$times_hour[1];
            $send_time=substr($time_hour,0,5);                                       
            $value= new stdClass();
            $value->MID=$MID;
            $value->message=$message;
            $value->message_status=$message_status;
            // $value->difference=$difference;
            // $value->unit=$unit;
            $value->time_day=$time_day;
            $value->send_time=$send_time;
            $value->username=$username;
            $value->userimage=$userimage;
            $value->userbio=$userbio;
            $value->userID=$send;
            $value->sendby=$sendby;
            array_push($response_result, $value);                 
        }
        echo json_encode($response_result);
    }
?>