<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id']) && isset($_POST['userid']) && isset($_POST['message']) && isset($_POST['Messagestatus'])){
        $id=$_POST['id'];
        $userid=$_POST['userid'];
        $message=$_POST['message'];
        $Messagestatus=$_POST['Messagestatus'];
        $response_result= array(); 
        $information= new stdClass();
        date_default_timezone_set('Asia/Beirut'); 
        // echo $Messagestatus. "hi";
        $time=date('Y-m-d-H-i-s');
        if($Messagestatus == "send"){
            $upload="INSERT INTO `message`(`ID`, `RID`, `message`, `date`, `message_status`) VALUES ('$id','$userid','$message','$time','unread')";     
            $results=mysqli_query($con,$upload);
            $search="SELECT*FROM `message` WHERE ID='$id' AND date='$time' ";     
            $query=mysqli_query($con,$search);
            while($rows=mysqli_fetch_assoc($query)){
                $information->response='sent';
                array_push($response_result, $information);
            }  
        }
        if($Messagestatus == "read"){
            $upload="UPDATE `message` SET `message_status`='$Messagestatus' WHERE ID='$userid' AND RID='$id' ";     
            $results=mysqli_query($con,$upload);
            $search="SELECT*FROM `message` WHERE ID='$userid' AND RID='$id' AND message_status='$Messagestatus' ";     
            $query=mysqli_query($con,$search);
            while($rows=mysqli_fetch_assoc($query)){
                $information->response='read';
                array_push($response_result, $information);
            }  
        }
                
        echo json_encode($response_result);
    }
?>