<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id'])){
        $id=$_POST['id'];
        $img=null;
        $caption=null;
        $location=null;
        $tag=null;
        $post=1;
        $response_result= array(); 
        $information= new stdClass();
        if(isset($_POST['img'])){
            $img=$_POST['img'];
            $post=0;
        }
        if(isset($_POST['caption'])){
            $caption=$_POST['caption'];
        }
        if(isset($_POST['tag'])){
            foreach($_POST['tag'] as $tags){
                $x = $tags." ";
                $tag = $tag.$x;
            }
        }
 
      
        if($img != null || $caption != null){
            date_default_timezone_set('Asia/Beirut'); 
            $time=date('Y-m-d-H-i-s');
            sleep(1);
            $upload="INSERT INTO `userpost`(`ID`, `time`, `post_type`, `pic`, `sentence`, `tagedperson`) VALUES ('$id','$time','$post','$img','$caption','$tag')";     
            $results=mysqli_query($con,$upload);
            $search="SELECT*FROM userpost WHERE ID='$id' AND time='$time' ";     
            $query=mysqli_query($con,$search);
            while($rows=mysqli_fetch_assoc($query)){
                $information->response='uploaded';
                array_push($response_result, $information);
            }          
        }   
        echo json_encode($response_result);
    }
?>