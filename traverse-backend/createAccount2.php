<?php 
include("./connection.php");
header('Access-Control-Allow-Origin: http://localhost:3000 ');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
header('Access-Control-Allow-Methods: POST,GET');
$_POST= json_decode(file_get_contents("php://input"),true);
if(isset($_POST['name']) && isset($_POST['birthday']) && isset($_POST['nationality']) && isset($_POST['gender']) && isset($_POST['username']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['password'])){                    
    $information= new stdClass();
    if(empty($_POST['name'])){                                               
        $information->response='!choose name';
        echo json_encode($information);
    }
    else if(empty($_POST['birthday'])){                                               
        $information->response='!choose birthday';
        echo json_encode($information);
    }
    else if(!empty($_POST['birthday'])){
        date_default_timezone_set('Asia/Beirut'); 
        $birthyear=explode("/",$_POST['birthday']);
        $year=$birthyear[0];
        $userbirth=explode("-",$year);
        $theyear=$userbirth[0];
        $now=date('Y');
        $age = $now - $theyear;
        if($age < 14){
            $information->response='!child can\'t create account';
            echo json_encode($information);
        }
        else if(empty($_POST['nationality'])){                                               
            $information->response='!choose nationality';
            echo json_encode($information);
        }
        else if(empty($_POST['gender'])){                                               
            $information->response='!choose gender';
            echo json_encode($information);
        }
        else {
            $name=$_POST['name'];
            $birthday=$_POST['birthday'];
            $nationality=$_POST['nationality'];
            $gender=$_POST['gender'];
            $username=$_POST['username'];
            $password=$_POST['password'];
            $email=$_POST['email'];
            $phone=$_POST['phone'];
            $insert="INSERT INTO `user`(`username`, `password`, `name`, `phone`, `email`, `date_of_birth`, `nationality`, `user_type`, `accounr_type`, `gender`, `profile`) VALUES ('$username','$password','$name','$phone','$email','$birthday','$nationality','0','0','$gender','false')";
            $out= mysqli_query($con,$insert);
            $search="SELECT*FROM user WHERE username='$username' ";
            $results=mysqli_query($con,$search);
            while($rows=mysqli_fetch_assoc($results)){
                $ID=$rows['ID'];   
            }
            $information->response='signin';
            $information->ID=$ID;
            $information->name=$username;
            echo json_encode($information);         
        }
    }
}
?>