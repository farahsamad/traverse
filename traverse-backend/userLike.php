<?php
include("./connection.php");
header("Access-Control-Allow-Origin: http://localhost:3000");
if(isset($_POST['ids']) && isset($_POST['pids'])){
    if(isset($_POST['like'])){
        $id=$_POST['ids'];
        $pid=$_POST['pids'];
        $like=$_POST['like'];    
            $query="SELECT * FROM likes WHERE ID='$id' AND PID='$pid'";
            $result=mysqli_query($con,$query);
            $ifLiked=22;
            while($rows=mysqli_fetch_assoc($result)){
                $ifLiked= $rows['likes'];             
            }
            if($ifLiked==22){
                if($like==0){
                    $insert="INSERT INTO `likes`(`ID`, `PID`, `likes`) VALUES ('$id','$pid','1')";
                    mysqli_query($con,$insert);
                    echo json_encode(1);
                }
            }
            else{
                if($like==0){
                    $insert="UPDATE `likes` SET `likes`='1' WHERE ID='$id' AND PID='$pid' ";
                    mysqli_query($con,$insert);
                    echo json_encode(1);

                }
                else if($like==1){
                    $insert="DELETE FROM `likes` WHERE ID='$id' AND PID='$pid' ";
                    mysqli_query($con,$insert);
                    echo json_encode(0);

                }
            }  
    }
}
?>