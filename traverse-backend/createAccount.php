<?php
include("./connection.php");
header('Access-Control-Allow-Origin: http://localhost:3000 ');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
header('Access-Control-Allow-Methods: POST,GET');
$_POST= json_decode(file_get_contents("php://input"),true);
if(isset($_POST['username']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['password']) && isset($_POST['repassword'])){
    $username=$_POST['username'];
    $password=$_POST['password'];
    $email=$_POST['email'];
    $phone=$_POST['phone'];
    $repassword=$_POST['repassword'];
    $query="SELECT * FROM user WHERE username='$username' ";
    $result=mysqli_query($con,$query);
    $names='';
    $information= new stdClass();
    while($row=mysqli_fetch_assoc($result)){
        $names= $row['username'];              
    }
    if(empty($_POST['username'])){                                                 
                $information->response='!choose username';
                echo json_encode($information);
    }
    else if(empty($_POST['password'])){                                               
            $information->response='!choose password';
            echo json_encode($information);
    }
    else if(empty($_POST['repassword'])){                                            
        $information->response='!choose password';
        echo json_encode($information);
    }
    else if(empty($_POST['email'])){                                               
        $information->response='!choose email';
        echo json_encode($information);
    }
    else if(empty($_POST['phone'])){                                               
        $information->response='!choose phone';
        echo json_encode($information);
    }
    else{
        if($names==''){
            if($password==$repassword){
                $information->response='success';
                echo json_encode($information);         
            }
            else{ 
                $information->response='!incorrect password';
                echo json_encode($information);
            }
        }
        else{
        $information->response='!username already exist';
        echo json_encode($information);
        }
    }
}
?>