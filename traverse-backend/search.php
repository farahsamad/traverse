<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
    if(isset($_POST['id'])  && isset($_POST['search'])){
        $id=$_POST['id'];
        $search=$_POST['search'];
        $response_result= array(); 
        if(strlen($search) > 2){
            $searchuser="SELECT * FROM user WHERE username LIKE '%$search%' LIMIT 20 ";
        }
        else if(strlen($search) >= 1){
            $searchuser="SELECT * FROM user WHERE username LIKE '%$search%'  ORDER BY RAND()  LIMIT 20 ";
        }
        $resultsearchuser=mysqli_query($con,$searchuser);
        while($rowuser=mysqli_fetch_assoc($resultsearchuser)){
            $username=$rowuser['username'];
            $userimage=$rowuser['profile'];
            $userbio=$rowuser['bio'];
            $userID=$rowuser['ID'];
            $userclass= new stdClass();
            $userclass->username=$username;
            $userclass->userimage=$userimage;
            $userclass->userbio=$userbio;
            $userclass->userID=$userID;
            array_push($response_result, $userclass);
        }

        echo json_encode($response_result);
    }         
?>