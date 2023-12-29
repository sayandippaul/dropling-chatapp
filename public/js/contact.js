$(".messages").animate({ scrollTop: $(document).height() }, "fast");

$("#profile-img").click(function() {
	$("#status-options").toggleClass("active");
});

$(".expand-button").click(function() {
  $("#profile").toggleClass("expanded");
	$("#contacts").toggleClass("expanded");
});
$(".expand1-button").click(function() {

  $("#profile").toggleClass("showgrp");
	$("#contacts").toggleClass("showgrp");
});

$("#status-options ul li").click(function() {
	$("#profile-img").removeClass();
	$("#status-online").removeClass("active");
	$("#status-away").removeClass("active");
	$("#status-busy").removeClass("active");
	$("#status-offline").removeClass("active");
	$(this).addClass("active");
	
	if($("#status-online").hasClass("active")) {
		$("#profile-img").addClass("online");
	} else if ($("#status-away").hasClass("active")) {
		$("#profile-img").addClass("away");
	} else if ($("#status-busy").hasClass("active")) {
		$("#profile-img").addClass("busy");
	} else if ($("#status-offline").hasClass("active")) {
		$("#profile-img").addClass("offline");
	} else {
		$("#profile-img").removeClass();
	};
	
	$("#status-options").removeClass("active");
});

function newMessage() {
	message = $(".message-input input").val();
	if($.trim(message) == '') {
		return false;
	}
	$('<li class="sent"><img  src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
	$('.message-input input').val(null);
	$('.contact.active .preview').html('<span>You: </span>' + message);
	$(".messages").animate({ scrollTop: $(document).height() }, "fast");
};

$('.submit').click(function() {
  newMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    newMessage();
    return false;
  }
});



// socket connected here 
// here we set toid and userid 


var socket=io('/user',{
  auth:{
    toid:localStorage.getItem(("toid")),
    token:localStorage.getItem("userid"),
  }
});

// the loader is loaded then the main content is loaded
// loadscreen is loaded for loading the main content
// offscreen is loaded for loading the loader

function loadscreen(){
   document.getElementById("loader").style.display="none";
  document.getElementById("frame").style.display="";
}
function offscreen(){
    document.getElementById("loader").style.display="";
  document.getElementById("frame").style.display="none";
}



// here we check the online and offline status

window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus(event) {
  var isOnline = navigator.onLine
if (isOnline) {
    //alert("Awesome! You are online");
  socket.emit("setonlinebynet",{userid:localStorage.getItem("userid")});
    loadscreen();
} else {
    alert("Please check your Internet Connectivity");
  socket.emit("setofflinebynet",{userid:localStorage.getItem("userid")});
    offscreen();
}

  }


updateOnlineStatus("e");




var isfilter=0;

function showfilter(){
if(isfilter==0){
    document.getElementById("showcontacts").style.display="block";
    isfilter=1;
    
}
else{
    document.getElementById("showcontacts").style.display="none";
     
    isfilter=0;

}
}

function checkfilter(){
  if(nowfilter=="inbox"){
showcontacts();
  }
  else{
    showall();
  }
}
window.setInterval(function(){
  if(rorf==0){

   //checkfilter();
  }
   }, 1000);





    var alluser=[];
    var allexistuser=[];
    function setusers(a){
      alluser=a;
    }
     function setallusers(a){
      allexistuser=a;
    }
   
    var nowfilter="inbox";
    function setfilter(a){
      nowfilter=a;
    }





function setalldetailsofcontacts(){
     var ds = { userid:localStorage.getItem("userid") };

    fetch(url+"/Getuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(ds),
  })

    .then((res) => res.json())
        .then((data) => {
          setallusers(data);
localStorage.setItem("allcontacts",JSON.stringify(data));
console.log(data);

        })
        .catch((err) => console.log(err));




}
setalldetailsofcontacts();


function showall(){
  setfilter("allcontacts");
 document.getElementById("showinbox").style.background="#2c3e50";
    document.getElementById("showall").style.background="black";
     

        var ds = { userid:localStorage.getItem("userid") };

    fetch(url+"/Getuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(ds),

    })

      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alluser=data;
        setusers(data);

localStorage.setItem("allcontacts",JSON.stringify(data))

        var all="";

for(var i=0;i<alluser.length;i++){
  var showonlinestatus="";
  if(alluser[i].online==1){
    showonlinestatus=`
						<span class="contact-status online"></span>
    `;
  }
  else{
			 showonlinestatus=`
						<span id="online`+alluser[i].userid+`"  class="contact-status busy"></span>
    `;

  }
    if(alluser[i].userid!=localStorage.getItem("userid")){

        all=all+`<li onclick=gotouser("`+alluser[i].userid+`","`+alluser[i].username+`")  class="contact">
					<div class="wrap">
					`+showonlinestatus+`
						<img id="dpuser`+alluser[i].userid+`" style="object-fit:fill;height:40px;width:40px" src="dp/dp`+alluser[i].dp+`.png" alt="" />
						<div class="meta">
                            
							<p id="name`+alluser[i].userid+`" class="name"><a>`+alluser[i].username+`</a></p>
							<p id="about`+alluser[i].userid+`" class="preview">`+alluser[i].about+`</p>
						</div>
					</div>
				</li>
                
				`
    }
      }
      document.getElementById("showchat").innerHTML=all;
    
      })
      .catch((err) => console.log(err));

}


function sortByTimestamp(array) {
   array.sort((b,a) => new Date(a.updatedAt) - new Date(b.updatedAt));
   return array;
}
function showcontacts(){
  setfilter("inbox");
  document.getElementById("showall").style.background="#2c3e50";
    document.getElementById("showinbox").style.background="black";
   
    
    var alluser=[];
        var ds = { userid:localStorage.getItem("userid") };

    fetch(url+"/Getinboxcontacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(ds),

    })

      .then((res) => res.json())
      .then((data) => {
        // {{!-- console.log("data"); --}}
        // {{!-- const timestamps = ["2023-08-04T12:00:00Z", "2023-08-03T12:00:00Z", "2023-08-02T12:00:00Z"]; --}}
      console.log("previous");
        console.log(data);

       data[0].totaltoid = sortByTimestamp(data[0].totaltoid);
      console.log("after");

        console.log(data);


            // {{!-- console.log(sortedTimestamps); // ["2023-08-02T12:00:00Z", "2023-08-03T12:00:00Z", "2023-08-04T12:00:00Z"] --}}
        alluser=data;
        setusers(data);

        //console.log(alluser[0].totaltoid);

        var all="";

          allexistuser=JSON.parse(localStorage.getItem("allcontacts"));


for(var i=0;i<alluser[0].totaltoid.length;i++){
    var a=(alluser[0].totaltoid[i].lastmessage[0].msgid);
    var b="you :";
    if(a[0]=="r"){
        b="";
    }
    var index = allexistuser.findIndex(item => item.userid === alluser[0].totaltoid[i].toid);
    var showonlinestatus="";
    if(allexistuser[index].online==1){
    showonlinestatus=`
						<span id="online`+alluser[0].totaltoid[i].toid+`" class="contact-status online"></span>
    `;
  }
  else{
			 showonlinestatus=`
						<span id="online`+alluser[0].totaltoid[i].toid+`" class="contact-status busy"></span>
    `;

  }
    if(alluser[0].totaltoid[i].unseen==0){
                  all=all+`<li id="all`+alluser[0].totaltoid[i].toid+`"  onclick=gotouser("`+alluser[0].totaltoid[i].toid+`","`+alluser[0].totaltoid[i].toname+`") class="contact">
                            <div class="wrap">
                              `+showonlinestatus+`
                              <img id="dpuser`+alluser[0].totaltoid[i].toid+`" style="object-fit:fill;height:40px;width:40px" src="dp/dp`+allexistuser[index].dp+`.png" alt="" />
                              <div class="meta">
                                  <p class="name"><a>`+alluser[0].totaltoid[i].toname+`</a> <p id="typing`+alluser[0].totaltoid[i].toid+`" class="typing"> Typing...... <p></p>
                                  <p id="chatbody`+alluser[0].totaltoid[i].toid+`" class="preview">`+b+` `+alluser[0].totaltoid[i].lastmessage[0].chatbody+`</p>
                                  <p id="unseen`+alluser[0].totaltoid[i].toid+`" class="unseenno" style="visibility:hidden" ><strong>`+alluser[0].totaltoid[i].unseen+`</strong></p>
                                  <p id="time`+alluser[0].totaltoid[i].toid+`" class="unseentime" ><strong>`+alluser[0].totaltoid[i].lastmessage[0].time+`</strong></p>
                     
                              </div>
                            </div>
                          </li>
                          `
    }

          
    else{
            all=all+`<li id="all`+alluser[0].totaltoid[i].toid+`" onclick=gotouser("`+alluser[0].totaltoid[i].toid+`","`+alluser[0].totaltoid[i].toname+`") class="contact">
                    <div class="wrap">
                `+showonlinestatus+`

                        <img id="dpuser`+alluser[0].totaltoid[i].toid+`" style="object-fit:fill;height:40px;width:40px" src="dp/dp`+allexistuser[index].dp+`.png" alt="" />
                         <div class="meta">
                        <p class="name"><a>`+alluser[0].totaltoid[i].toname+`</a> <p id="typing`+alluser[0].totaltoid[i].toid+`" class="typing"> Typing...... <p></p>
                        <p id="chatbody`+alluser[0].totaltoid[i].toid+`" class="preview">`+b+` `+alluser[0].totaltoid[i].lastmessage[0].chatbody+`</p>
                                  <p id="unseen`+alluser[0].totaltoid[i].toid+`" class="unseenno"><strong>`+alluser[0].totaltoid[i].unseen+`</strong></p>
                                  <p id="time`+alluser[0].totaltoid[i].toid+`" class="unseentime"><strong>`+alluser[0].totaltoid[i].lastmessage[0].time+`</strong></p>
                      </div>
                    </div>
                  </li>
                  `;
              

      }
        
      }
      document.getElementById("showchat").innerHTML=all;
      console.log(data);
    if(data.length==0 || data==null || data==undefined){
      document.getElementById("showchat").innerHTML="";
     

    }
    if(alluser[0].totaltoid.length==0){
      // showall();
      alert("There Are No User In your Contact List ..Pls Go to -->Filter And select --> All Contacts -->And Chat With Dropling Users.");

    }
      })
      .catch((err) => console.log(err));

      
}
showcontacts();

function gotouser(toid,name){

    localStorage.setItem("tousername",name);
    localStorage.setItem("toid", toid);
    console.log(document.getElementById("time"+toid));
    socket.emit("gotouser",{userid:localStorage.getItem("userid"),toid:toid});
if(nowfilter=="inbox" && document.getElementById("time"+toid)!=null){

document.getElementById("time"+toid).style.visibility="hidden";
document.getElementById("unseen"+toid).style.visibility="hidden";
}
    window.location.replace("/chat");
   //history.pushState({}, "", "/chat");

}

  var rorf=0;
function setreloadorfilter(a){
  rorf=a;
}




 function filterBySearch(d){ 

var c=document.getElementById("searchcontact").value;
if(c.trim()==""){
  setreloadorfilter(0);
}
else{
  setreloadorfilter(1);

}



 var all="";

ul = document.getElementById("showchatul");
    li = ul.getElementsByTagName("li");
    console.log(li);
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        var txtValue = a.textContent || a.innerText;

        if (txtValue.toUpperCase().indexOf(c.toUpperCase()) > -1) {
           console.log(txtValue);
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }



  };
function resetvalueofsearch(){
  document.getElementById("searchcontact").value="";
  filterBySearch("");
}




function showdetails(){
  console.log(alluser);
  document.getElementById("updatename").value=localStorage.getItem("username");
  document.getElementById("updatephone").value=localStorage.getItem("email");
  document.getElementById("updateabout").value=localStorage.getItem("about");
}
showdetails();

//# sourceURL=pen.js


function setonlineseen(a){
var ds = {  ownid: localStorage.getItem("userid"), value: a };
      console.log("hi"+a);

      fetch(url+"/setonline", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(ds),
      })

        .then((res) => res.json())
        .then((data) => {

        })
        .catch((err) => console.log(err));




}

window.onblur = function() {
  // This code will be executed when the window loses focus.
   //setonlineseen(0);
};
window.onfocus = function() {
  // This code will be executed when the window loses focus.
  // setonlineseen(1);
};

 



 function gotosettings() {
   
    window.location.replace("settings");
  }





socket.on("showchat",function(data){
  console.log(data);

if(data.lastmessage.toid==localStorage.getItem("userid")){

Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            new Notification("New Message", {
              body: data.lastmessage.ownname+`: `+data.lastmessage.chatbody,
            });
          }
        });

          var allexistuser=JSON.parse(localStorage.getItem("allcontacts"));

console.log("chatbody"+data.lastmessage.ownid);
 var index = allexistuser.findIndex(item => item.userid == data.userid);
    console.log(allexistuser);

var showonlinestatus="";
    if(allexistuser[index].online==1){
    showonlinestatus=`
						<span id="online`+data.lastmessage.ownid+`" class="contact-status online"></span>
    `;
  }
  else{
			 showonlinestatus=`
						<span id="online`+data.lastmessage.ownid+`" class="contact-status busy"></span>
    `;

  }
  var typinghtml=`
  <p id="typing`+data.lastmessage.ownid+`" class="typing"> Typing...... <p>`;

  if(document.getElementById("chatbody"+data.lastmessage.ownid)!=null){

var elem=document.getElementById("all"+data.lastmessage.ownid);
  
document.getElementById("chatbody"+data.lastmessage.ownid).innerHTML=data.lastmessage.chatbody;


document.getElementById("time"+data.lastmessage.ownid).style.visibility="visible";
document.getElementById("unseen"+data.lastmessage.ownid).style.visibility="visible";


document.getElementById("time"+data.lastmessage.ownid).innerHTML=data.lastmessage.time;
document.getElementById("unseen"+data.lastmessage.ownid).innerHTML=data.unseenforthisuser;

elem.parentNode.removeChild(elem);

   
document.getElementById("showchat").innerHTML=`<li id="all`+data.lastmessage.ownid+`" i onclick=gotouser("`+data.lastmessage.ownid+`","`+data.lastmessage.ownname+`") class="contact">
					<div class="wrap">
                        <img id="dpuser`+data.lastmessage.ownid+`" style="object-fit:fill;height:40px;width:40px" src="dp/dp`+allexistuser[index].dp+`.png" alt="" />
                `+showonlinestatus+`
						<div class="meta">
							<p id="name`+data.lastmessage.ownid+`" class="name"><a>`+data.lastmessage.ownname+`</a> `+typinghtml+`</p>
							<p id="chatbody`+data.lastmessage.ownid+`" class="preview"> `+data.lastmessage.chatbody+`</p>
					              <p id="unseen`+data.lastmessage.ownid+`" class="unseenno"><strong>`+data.unseenforthisuser+`</strong></p>
					              <p id="time`+data.lastmessage.ownid+`" class="unseentime"><strong>`+data.lastmessage.time+`</strong></p>
						</div>
					</div>
				</li>
				`+document.getElementById("showchat").innerHTML;



  }




  else{
          var allexistuser=JSON.parse(localStorage.getItem("allcontacts"));


    document.getElementById("showchat").innerHTML=`<li id="all`+data.lastmessage.ownid+`" i onclick=gotouser("`+data.lastmessage.ownid+`","`+data.lastmessage.ownname+`") class="contact">
					<div class="wrap">
                        <img id="dpuser`+data.lastmessage.ownid+`" style="object-fit:fill;height:40px;width:40px" src="dp/dp`+allexistuser[index].dp+`.png" alt="" />
                `+showonlinestatus+`

						<div class="meta">
							<p class="name"><a>`+data.lastmessage.ownname+`</a> `+typinghtml+`</p>
							<p id="chatbody`+data.lastmessage.ownid+`" class="preview"> `+data.lastmessage.chatbody+`</p>
					              <p id="unseen`+data.lastmessage.ownid+`" class="unseenno"><strong>`+data.unseenforthisuser+`</strong></p>
					              <p id="time`+data.lastmessage.ownid+`" class="unseentime"><strong>`+data.lastmessage.time+`</strong></p>
						</div>
					</div>
				</li>
				`+document.getElementById("showchat").innerHTML;





  }
}

})



socket.on("onlineuser",function(data){
  if(document.getElementById("online"+data.userid)!=null){

    document.getElementById("online"+data.userid).className="contact-status online";
  }
})
socket.on("offlineuser",function(data){

     if(document.getElementById("online"+data.userid)!=null){

    document.getElementById("online"+data.userid).className="contact-status busy";
  }
})




function updateabout(){
  var newabout=document.getElementById("updateabout").value;
  if(newabout!=localStorage.getItem("about")){
var ds = {  ownid: localStorage.getItem("userid"), about: newabout };

      fetch(url+"/updateabout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(ds),
      })

        .then((res) => res.json())
        .then((data) => {

        })
        .catch((err) => console.log(err));
document.getElementById("updateabout").value=newabout;
localStorage.setItem("about",newabout);
alert("Your about updated now.")

  }
  else{
    alert("Change Your about now.")
  }
}


var profileimg=localStorage.getItem("dp");
document.getElementById("profile-img").src="dp/dp"+profileimg+".png";


var totaldp=30;

function showalldp(){
  
  var alldp="";

for(var i=1;i<=totaldp;i++){
alldp=alldp+`
  <img  style="object-fit:fill;height:50px;width:50px" onclick="setdp(`+i+`)" id="dp`+i+`" src="dp/dp`+i+`.png" alt="dp/`+i+`.png">

`;
  }
  
  document.getElementById("showdp").innerHTML=alldp;
  
for(var i=1;i<=totaldp;i++){
  document.getElementById("dp"+i).style.borderColor="white";
  }
  document.getElementById("dp"+profileimg).style.borderColor="yellow";


}
showalldp();

function setdp(a){
  for(var i=1;i<=totaldp;i++){

  document.getElementById("dp"+i).style.borderColor="white";
  }
  document.getElementById("dp"+a).style.borderColor="Yellow";


  var ds = {  ownid: localStorage.getItem("userid"), dp: a };
      console.log("hi"+a);

    
        socket.emit("setdpbysocket",ds);


localStorage.setItem("dp",a);
document.getElementById("profile-img").src="dp/dp"+a+".png";



}


socket.on("dpchanged",function(data){
          var allexistuser=JSON.parse(localStorage.getItem("allcontacts"));

if(document.getElementById("dpuser"+data.ownid)!=null){

document.getElementById("dpuser"+data.ownid).src="dp/dp"+data.dp+".png";
}
    var index = allexistuser.findIndex(item => item.userid ==data.ownid);
    allexistuser[index].dp=data.dp;
localStorage.setItem("allcontacts",JSON.stringify(allexistuser));

})

socket.on("showtypingstart",function(data){
console.log(data);
  if(data.toid==localStorage.getItem("userid") && document.getElementById("chatbody"+data.ownid)!=null){
    document.getElementById("typing"+data.ownid).style.visibility="visible";
  }


})

socket.on("showtypingend",function(data){

  if(data.toid==localStorage.getItem("userid") && document.getElementById("chatbody"+data.ownid)!=null){
    document.getElementById("typing"+data.ownid).style.visibility="hidden";
  }


})
showcontacts();
