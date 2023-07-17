<?php
    include("./connection.php");
    header('Access-Control-Allow-Origin: http://localhost:3000 ');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Header, X-Requested-With');
    header('Access-Control-Allow-Methods: POST,GET');
    $_POST= json_decode(file_get_contents("php://input"),true);
                    if(isset($_POST['id'])){
                    $id=$_POST['id'];
                    $userfollower="SELECT follower_id,following_id FROM follow WHERE follower_id='$id' OR following_id='$id'";
                    $resultuserfollower=mysqli_query($con,$userfollower);
                    if(mysqli_num_rows($resultuserfollower) == 0){
                        echo json_encode(null);
                        exit();
                    }
                    $query="SELECT*FROM follow WHERE follower_id='$id' AND follower_request='1' OR following_id='$id' AND following_request='1' ";
                    $result=mysqli_query($con,$query);
                    $response_result= array();
                    while($row=mysqli_fetch_assoc($result)){
                        $following= $row['following_id']; 
                        $follower_id= $row['follower_id'];
                        if($id == $follower_id){
                            $followId= $following; 
                        }
                        if($id == $following){
                            $followId= $follower_id; 
                        }
                        $search="SELECT*FROM userpost NATURAL JOIN user WHERE ID='$followId' ORDER BY time DESC";
                        $res=mysqli_query($con,$search);
                        while($fetch=mysqli_fetch_assoc($res)){
                            $time= $fetch['time']; 
                            $pic= $fetch['pic']; 
                            // $image = file_get_contents($pic);
                            // $base64Image = base64_encode($image);
                            $sentence= $fetch['sentence']; 
                            $tagperson= $fetch['tagedperson']; 
                            $PID= $fetch['PID'];
                            $followingname= $fetch['username'];
                            $followingpic= $fetch['profile'];
                            date_default_timezone_set('Asia/Beirut'); 
                            $new_time=explode(" ",$time);
                            $time_day=$new_time[0];
                            $time_hour=$new_time[1];
                            $now=date('Y-m-d-H-i-s');
                            $new_now=explode("-",$now);
                            $now_year=$new_now[0];
                            $now_month=$new_now[1];
                            $now_days=$new_now[2];
                            $now_hour=$new_now[3];
                            $now_min=$new_now[4];
                            $now_sec=$new_now[5];
                            $new_times=explode("-",$time_day);
                            $time_year=$new_times[0];
                            $time_month=$new_times[1];
                            $time_today=$new_times[2];
                            if($time_year != $now_year){
                                $difference=$now_year - $time_year;
                                $unit=" y";
                            }
                            else{
                                if($time_month != $now_month){
                                    $difference=$now_month - $time_month;
                                    $unit=" M";
                                }
                                else{
                                    if($time_today != $now_days){
                                        $difference=$now_days - $time_today;
                                        $unit=" d";
                                    }
                                    else{
                                        $times_hour=explode(":",$time_hour);
                                        $time_h=$times_hour[0];
                                        $time_min=$times_hour[1];
                                        $time_sec=$times_hour[2];
                                        if($time_h != $now_hour){
                                            $difference=$now_hour - $time_h;
                                            $unit=" h";
                                        }
                                        else{
                                            if($time_min != $now_min){
                                                $difference=$now_min - $time_min;
                                                $unit=" m";
                                            }
                                            else{
                                                if($time_sec != $now_sec){
                                                    $difference=$now_sec - $time_sec;
                                                    $unit=" s";
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            $liked=0;
                            $searchforlike="SELECT * FROM likes WHERE ID='$id' AND PID='$PID'";
                            $likeresult=mysqli_query($con,$searchforlike);
                            while($likesrow=mysqli_fetch_assoc($likeresult)){
                                $like= $likesrow['likes'];
                                if($like==1){
                                    $liked=1;
                                }                                           
                            }

                            $comment_response=array();
                            $searchforlike="SELECT * FROM comments WHERE PID='$PID'";
                            $likeresult=mysqli_query($con,$searchforlike);
                            while($likesrow=mysqli_fetch_assoc($likeresult)){
                                $comments= $likesrow['comment']; 
                                $CID= $likesrow['CID']; 
                                $commenterPID= $likesrow['PID']; 
                                $commenterid= $likesrow['ID']; 
                                date_default_timezone_set('Asia/Beirut');
                                $tim=$likesrow['time'];
                                $new_tim=explode(" ",$tim);
                                $time_da=$new_tim[0];
                                $time_hou=$new_tim[1];
                                $no=date('Y-m-d-H-i-s');
                                $new_no=explode("-",$no);
                                $now_yea=$new_no[0];
                                $now_mont=$new_no[1];
                                $now_day=$new_no[2];
                                $now_hou=$new_no[3];
                                $now_mi=$new_no[4];
                                $now_se=$new_no[5];
                                $new_time=explode("-",$time_da);
                                $time_yea=$new_time[0];
                                $time_mont=$new_time[1];
                                $time_toda=$new_time[2];
                                if($time_yea != $now_yea){
                                    $differenc=$now_yea - $time_yea;
                                    $uni=" y";
                                }
                                else{
                                    if($time_mont != $now_mont){
                                        $differenc=$now_mont - $time_mont;
                                        $uni=" M";
                                    }
                                    else{
                                        if($time_toda != $now_day){
                                            $differenc=$now_day - $time_toda;
                                            $uni=" d";
                                        }
                                        else{
                                            $time_hou=explode(":",$time_hou);
                                            $time_hs=$time_hou[0];
                                            $time_mins=$time_hou[1];
                                            $time_secs=$time_hou[2];
                                            if($time_hs != $now_hou){
                                                $differenc=$now_hou - $time_hs;
                                                $uni=" h";
                                            }
                                            else{
                                                if($time_mins != $now_mi){
                                                    $differenc=$now_mi - $time_mins;
                                                    $uni=" m";
                                                }
                                                else{
                                                    if($time_secs != $now_se){
                                                        $differenc=$now_se - $time_secs;
                                                        $uni=" s";
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                $searchuser="SELECT * FROM user WHERE ID='$commenterid'";
                                $searchresult=mysqli_query($con,$searchuser);   
                                while($elemnts=mysqli_fetch_assoc($searchresult)){
                                    $username=$elemnts['username'];
                                    $profile=$elemnts['profile'];
                                } 
                                $commentresults= new stdClass();
                                $commentresults->comments=$comments;
                                $commentresults->CID=$CID;
                                $commentresults->PID=$commenterPID;
                                $commentresults->difference=$differenc;
                                $commentresults->unit=$uni;
                                $commentresults->username=$username;
                                $commentresults->profile=$profile;
                                array_push($comment_response, $commentresults);                                          
                            }
                            // $searchfor="SELECT*FROM user WHERE ID='$followId'";
                            // $resfor=mysqli_query($con,$searchfor);
                            // while($rowfor=mysqli_fetch_assoc($resfor)){
                            // $followingname= $rowfor['username'];
                            // $followingpic= $rowfor['profile'];
                            // }
                            
                            $value= new stdClass();
                            $value->picture=$pic;
                            $value->like=$liked;
                            $value->comment=$comment_response;
                            $value->followingname=$followingname;
                            $value->followingpic=$followingpic;
                            $value->sentence=$sentence;
                            $value->tagperson=$tagperson;
                            $value->PID=$PID;
                            $value->difference=$difference;
                            $value->unit=$unit;
                            array_push($response_result, $value);

                                        // if($pic != ''){
                                        //        // <div class="posted-image" id="<?php echo $postid">
                                        // }
                                        //             $seak="SELECT * FROM interaction WHERE PID='$PID' AND ID='$id'";
                                        //             $out=mysqli_query($con,$seak);
                                        //             $like=0;
                                        //                 while($rows=mysqli_fetch_assoc($out)){
                                        //                     $like= $rows['likes'];              
                                        //                 }
                                                    // if($like==1){
                                                    // <input type='text' id='likeinput' value='<?php echo $like ' hidden>
                                                    //     <i class='fas fa-pizza-slice pizza-icon likes' onclick='Pizzaclicked("<?php echo $PID 
                                                
                                                    // else{
                                                    //     <input type='text' id='likeinput' value='<?php echo $like ' hidden>
                                                    //     <i class='fas fa-pizza-slice pizza-icon unliked'  onclick='Pizzaclicked("")' id=''></i>
                                                    //  }
                                                //         function Pizzaclicked(pid, id){
                                                //             var like;
                                                //             var isliked= document.getElementById(pid);
                                                //             if(isliked.classList.contains("unliked")){
                                                //                 isliked.classList.remove("unliked");
                                                //                 isliked.classList.add("likes");
                                                //             }
                                                //             else if(isliked.classList.contains("likes")){
                                                //                 isliked.classList.remove("likes");
                                                //                 isliked.classList.add("unliked");
                                                //             }
                                                //             like=1;
                                                //             if(isliked.classList.contains("likes")){
                                                //                 like=0;
                                                //             }
                                                //             $(function(){
                                                //                     $.ajax({
                                                //                         method: "GET",
                                                //                         url: "./test.php",
                                                //                         data: { id: id, pid: pid, like:  like},
                                                //                         success: function(data){
                                                //                         },
                                                //                     });
                                                //             });                                     
                                                //         }
                                                // </form>
                                            // <script>
                                            //     function sendclicked(pid, id, commenttext, commentlist){
                                            //         var commentLists = document.getElementById(commentlist);
                                            //         var commentTexts = document.getElementById(commenttext);
                                            //         $(function(){
                                            //             $.ajax({
                                            //                 method: "GET",
                                            //                 url: "./test.php",
                                            //                 data: { id: id, pid: pid, comment:  $(commentTexts).val()},
                                            //                 success: function(data){
                                            //                     $(commentTexts).val("");
                                            //                     $.ajax({
                                            //                         method: "GET",
                                            //                         url: "./comment_list.php",
                                            //                         data: {pid: pid},
                                            //                         success: function(data){
                                            //                             commentLists.innerHTML = data;
                                            //                         },
                                            //                     }); 
                                            //                 },
                                            //             });
                                            //         });               
                                            //     }
                                            // </script>
                                            // <script>  
                                            //     var width = window.innerWidth;
                                            //     var height = window.innerHeight;
                                            //     function Commentclicked(pid, pids, id, commentid, commentlist, commentsend, commententer, commenttext, uploadpost, postid){
                                            //         var commentpids = document.getElementById(pids);
                                            //         var commentLists = document.getElementById(commentlist);
                                            //         var commentSends = document.getElementById(commentsend);
                                            //         var commentTexts = document.getElementById(commenttext);
                                            //         var uploadPost = document.getElementById(uploadpost);
                                            //         var commentPostid = document.getElementById(postid);
                                            //         document.getElementById(pids).style.width="100%";
                                            //         window.onclick = function(event){
                                            //             if(document.getElementById(pids).style.display=="block"){
                                            //                 if(event.target == document.getElementById(pids)
                                            //                     || event.target == document.getElementById(commententer) 
                                            //                     || event.target == document.getElementById(commentid)
                                            //                     || event.target == document.getElementById(commenttext)
                                            //                     || event.target == document.getElementById(commentsend)
                                            //                     || event.target == document.getElementById("commenter-name")
                                            //                     || event.target == document.getElementById("commnet-entered-text")
                                            //                     || event.target == document.getElementById("commnet-list")
                                            //                     || event.target == document.getElementById("comment-layer")
                                            //                     || event.target == document.getElementById("comment-list-container")
                                            //                     || event.target == document.getElementById("comment-list-contant")
                                            //                     || event.target == document.getElementById("commenter-info")
                                            //                     || event.target == document.getElementById("commenter-info-container")
                                            //                     || event.target == document.getElementById("comment-time")
                                            //                 ){
                                            //                     uploadPost.style.position="relative";
                                            //                     if(commentPostid == null){
                                            //                             commentpids.style.marginTop="-80px";
                                            //                     }
                                            //                     else if(commentPostid != null){
                                            //                         commentpids.style.marginTop="-70%";
                                            //                     }                                                               
                                            //                     document.getElementById(pids).style.display="block";
                                            //                     var commentArray = document.querySelectorAll(".commant-layer-container");
                                            //                         var elements="";
                                            //                         var element="";
                                            //                     commentArray.forEach(function(element){
                                            //                         elements="";
                                            //                         elements=element.id;
                                            //                         if( elements == pids){
                                            //                             element.style.display="block";
                                            //                         }
                                            //                         else{
                                            //                             element.style.display="none";
                                            //                         }
                                            //                     });
                                            //                 }
                                            //                 else{
                                            //                     document.getElementById(pids).style.display="none";
                                            //                     uploadPost.style.position="";
                                            //                 }
                                            //             } 
                                            //             else if(document.getElementById("search-list").style.display=="block"){
                                            //                 if(event.target != document.getElementById("search-text")){
                                            //                     if(event.target != document.getElementById("search-list")){
                                            //                         document.getElementById("search-list").style.display="none";
                                            //                         document.getElementById("search-text").style.display="none";
                                            //                     }
                                            //                 }
                                            //             }
                                            //             else if(event.target != document.getElementById("customer-photo")){
                                            //                     document.getElementById("photo-click").style.display="none";
                                            //                     document.getElementById("account-logo").style.marginTop="-25px";
                                            //             }
                                            //         }  
                                            //         if(window.innerWidth > 499  && window.innerHeight > 599){
                                            //             document.getElementById(pids).style.display="block";
                                            //         }
                                            //         else{
                                            //             if(window.innerWidth < 499){
                                            //                 window.location.href="./comment.php?pid="+pids;
                                            //             }
                                            //         }
                                            //         $(document).ready(function(){  
                                            //             $.ajax({
                                            //                 method: "GET",
                                            //                 url: "./comment_list.php",
                                            //                 data: {pid: pid},
                                            //                 success: function(data){
                                            //                     commentLists.innerHTML = data;
                                            //                 },
                                            //             }); 
                                            //         });
                                            //         $(".commant-layer-container").submit(function(e){
                                            //             e.preventDefault();
                                            //         });
                                            //         $("#"+commenttext).on("keypress", function(event){
                                            //             if(event.keyCode === 13){
                                            //                 $(function(){
                                            //                     $.ajax({
                                            //                         method: "GET",
                                            //                         url: "./test.php",
                                            //                         data: { id: id, pid: pid, comment:  $(commentTexts).val()},
                                            //                         success: function(data){
                                            //                             document.getElementById(pids).style.display="block";
                                            //                             uploadPost.style.position="relative";
                                            //                             document.getElementById(pids).style.width="100%";
                                            //                             $(commentTexts).val("");
                                            //                             $.ajax({
                                            //                                 method: "GET",
                                            //                                 url: "./comment_list.php",
                                            //                                 data: {pid: pid},
                                            //                                 success: function(data){
                                            //                                     commentLists.innerHTML = data;
                                            //                                 },
                                            //                             }); 
                                            //                         },
                                            //                     });
                                            //                 });
                                            //             }
                                            //         });
                                            //     }
                                            // </script>
                            
                        }
                    }
                    echo json_encode($response_result);
                }
            ?>