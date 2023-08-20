<?php
include("./connection.php");
header("Access-Control-Allow-Origin: http://localhost:3000");
if(isset($_POST['ids']) && isset($_POST['pids'])){
    $id=$_POST['ids'];
    $pid=$_POST['pids'];
            $search="SELECT*FROM saves WHERE ID='$id' AND PID='$pid'";
            $searchResult=mysqli_query($con,$search);
            $response=mysqli_fetch_assoc($searchResult);
            $save=$response['SID'];
            if($save == null){
                echo json_encode(0);
            }
            else if($save != null){
                echo json_encode(1);
            }
}
?>