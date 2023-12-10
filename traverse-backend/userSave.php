<?php
include("./connection.php");
header("Access-Control-Allow-Origin: http://localhost:3000");
if(isset($_POST['ids']) && isset($_POST['pids'])){
    if(isset($_POST['save'])){
        $id=$_POST['ids'];
        $pid=$_POST['pids'];
        $save=$_POST['save'];    
            $query="SELECT * FROM saves WHERE ID='$id' AND PID='$pid'";
            $result=mysqli_query($con,$query);
            $ifsaved=22;
            while($rows=mysqli_fetch_assoc($result)){
                $ifsaved= $rows['SID'];             
            }
            if($ifsaved==22){
                if($save==0){
                    $insert="INSERT INTO `saves`(`ID`, `PID`) VALUES ('$id','$pid')";
                    mysqli_query($con,$insert);
                    echo json_encode(1);
                }
            }
            else{
                if($save==0){
                    $insert="INSERT INTO `saves`(`ID`, `PID`) VALUES ('$id','$pid') ";
                    mysqli_query($con,$insert);
                    echo json_encode(1);

                }
                else if($save==1){
                    $insert="DELETE FROM `saves` WHERE ID='$id' AND PID='$pid' ";
                    mysqli_query($con,$insert);
                    echo json_encode(0);

                }
            }  
    }
}
?>