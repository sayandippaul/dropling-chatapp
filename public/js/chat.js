


 jQuery(function($) { // DOM ready and $ alias secured

  $('#chatinput').on('input', function(e){
    var key = e.which || this.value.substr(-1).charCodeAt(0);
    typing();

  });

});

  

if(localStorage.getItem("toid")=="null" || localStorage.getItem("toid")=="undefined" || localStorage.getItem("toid")==null|| localStorage.getItem("toid")==undefined){
    window.location.replace("contact");
  

}

var socket=io('/user',{
  auth:{
    token:localStorage.getItem("userid"),
    toid:localStorage.getItem(("toid"))
  }
});

function loadscreen(){
   document.getElementById("loader").style.display="none";
  document.getElementById("frame").style.display="";
}
function offscreen(){
    document.getElementById("loader").style.display="";
  document.getElementById("frame").style.display="none";
}


window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus(event) {
  var isOnline = navigator.onLine
if (isOnline) {
    //alert("Awesome! You are online");
    loadscreen();
  socket.emit("setonlinebynet",{userid:localStorage.getItem("userid")});

} else {
    alert("Please check your Internet Connectivity");
  socket.emit("setofflinebynet",{userid:localStorage.getItem("userid")});
    offscreen();
}

}
updateOnlineStatus();

  document.getElementById("showtochatname").innerHTML = localStorage.getItem("tousername");
   var allexistuser=JSON.parse(localStorage.getItem("allcontacts"));


 var index = allexistuser.findIndex(item => item.userid == localStorage.getItem("toid"));
 document.getElementById("dp").src="dp/dp"+allexistuser[index].dp+".png";

   socket.on("dpchanged",function(data){
          var allexistuser=JSON.parse(localStorage.getItem("allcontacts"));

if((data.ownid)==localStorage.getItem("toid")){

document.getElementById("dp").src="dp/dp"+data.dp+".png";
}
    var index = allexistuser.findIndex(item => item.userid ==data.ownid);
allexistuser[index].dp=data.dp;
localStorage.setItem("allcontacts",JSON.stringify(allexistuser));


})


  function right() {
    //alert("hi");
    //window.location.replace("login");
  }
  function sendmessage() {
    var chat_deliver = document.getElementById("chatinput").value.trim();
    // alert(chat_deliver);
    if (chat_deliver.trim() != "") {
      
var unseen=getunseenno();




      if(localStorage.getItem("soundvalue")==1){
      document.getElementById("send").play(); 

      }



    //   {{!-- var today = new Date(); --}}
    //   {{!-- var time = today.getHours() + ":" + today.getMinutes(); --}}
      var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	var current_time = date.getHours()+":"+date.getMinutes();
	var time = current_date+" "+current_time;	
      var ds = { time: time, toid: localStorage.getItem("toid"), chatbody: chat_deliver, ownid: localStorage.getItem("userid"), toname: localStorage.getItem("tousername"), ownname: localStorage.getItem("username"), swipe: swipevalue };
      //console.log(ds);
var data=ds;

 
      
      
      swipevalue = "";
    document.getElementById("showswipe").style.display="none";
    document.getElementById("closeswipe").style.visibility="hidden";


        socket.emit("newchat",ds);




    }
    document.getElementById("chatinput").value = "";
  }


  function gotocontact() {
    setunseentozero();
    localStorage.setItem("tousername", null);
    localStorage.setItem("toid", null);

    window.location.replace("contact");
  }

  function gotosettings() {
    setunseentozero();
    localStorage.setItem("tousername", null);
    localStorage.setItem("toid", null);

    window.location.replace("settings");
  }


    var unseenforthisuser = 0;
    function setunseenforthisuser(a){
      
unseenforthisuser=a;
return unseenforthisuser;
    }
var nowuser="null";
     function setnowuser(a){
nowuser=a;
return nowuser;
     }

function getunseenno(){
    var ds = { toid: localStorage.getItem("toid"), ownid: localStorage.getItem("userid") };
var s;
 fetch(url+"/getunseenno", {
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
        if(data!=null){
          console.log("unseen "+ data.nowuser);
         unseenforthisuser=setunseenforthisuser(data.unseen);
         setnowuser(data.nowuser);
        
        }

      })
      .catch((err) => console.log(err));

      return unseenforthisuser;



}
showmessages();




function linkify(text) {
        if(text!=undefined){

        
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
        }
        return text;
}
  function showmessages() {










unseenforthisuser=getunseenno();


   




    var ds = { toid: localStorage.getItem("toid"), ownid: localStorage.getItem("userid") };




    fetch(url+"/Showmessage", {
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
        console.log(unseenforthisuser);
            showfinalmessages(data,unseenforthisuser);
        })
      .catch((err) => console.log(err));





  }
  showmessages();
  var swipevalue = "";
  function swipe(a) {
    swipevalue = a;
    

    document.getElementById("showswipe").value=a;
    document.getElementById("showswipe").style.display="block";
    document.getElementById("closeswipe").style.visibility="visible";

    console.log(swipevalue);
  }
  function closeswipe() {
    swipevalue = "";
    

    document.getElementById("showswipe").value="";
    document.getElementById("showswipe").style.display="none";
    document.getElementById("closeswipe").style.visibility="hidden";

  }
  




  var o = 0;
  function addfav() {

    var ds = { toid: localStorage.getItem("toid"), ownid: localStorage.getItem("userid"), set: o };

    fetch(url+"/setfavorites", {
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



    if (o == 0) {


      document.getElementById("changeheart1").style.display = "none";
      document.getElementById("changeheart2").style.display = "block";


      o = 1;
    }
    else {
      document.getElementById("changeheart1").style.display = "block";
      document.getElementById("changeheart2").style.display = "none";
      o = 0;

    }
  }



  setunseentozero();
  function setunseentozero() {
    var ds = { toid: localStorage.getItem("toid"), ownid: localStorage.getItem("userid") };

    fetch(url+"/Setunseentozero", {
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
   setonlineseen(0);
};
window.onfocus = function() {
  // This code will be executed when the window loses focus.
   setonlineseen(1);
};

 function getonlineoroffline() {
    var ds = { toid: localStorage.getItem("toid"), ownid: localStorage.getItem("userid") };

    fetch(url+"/gettoidonlinestatus", {
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
        console.log("data online"+data.online);
        if(data.online==1){
          document.getElementById("showstatus").innerHTML="Online";
        }
        else{
          document.getElementById("showstatus").innerHTML="Offline";

        }

      })
      .catch((err) => console.log(err));

  }
getonlineoroffline();
  function deletefullchat(){
if(confirm("It will delete all the chats done with the user.Are you sure?")==true){

     var ds = { toid: localStorage.getItem("toid"), ownid: localStorage.getItem("userid") };

    fetch(url+"/deletefullchat", {
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

          window.location.reload();
  }
  }
console.log(
  JSON.parse(localStorage.getItem("allcontacts"))

);




socket.on("onlineuser",function(data){
console.log("hi" +data.userid);
  if(localStorage.getItem("toid")==data.userid){
    document.getElementById("showstatus").innerHTML="Online";
  }
})
socket.on("offlineuser",function(data){

  if(localStorage.getItem("toid")==data.userid){
    document.getElementById("showstatus").innerHTML="Offline";
  }
})

socket.on("showchat",function(data){
    //showmessages();

    //alert("mressage done");
console.log(data);
if(data.userid==localStorage.getItem("toid") && data.toid==localStorage.getItem("userid")){
  console.log("hitted now")
showfinalmessages(data.data,data.unseenforthisuser)
  //if(data)
}
else{
//   {{!-- Notification.requestPermission().then((perm) => {
//           if (perm === "granted") {
//             new Notification("New Message", {
//               body: data.lastmessage.ownname+`: `+data.lastmessage.chatbody,
//             });
//           }
//         }); --}}

        navigator.serviceWorker.register('js/sw.js');
Notification.requestPermission(function(result) {
  if (result == 'granted') {
   navigator.serviceWorker.ready.then( function( registration )
            {
                registration.showNotification( "New Message", { body:data.lastmessage.ownname+`: `+data.lastmessage.chatbody } );
            } );

  }
  });


}

    
    
  
})


function showfinalmessages(data,unseenforthisuser){
    var allchats = "";

   if (data != null) {


          for (var i = 0; i < data.length; i++) {
            var swipeable=data[i].chatbody;
            data[i].chatbody=linkify(data[i].chatbody);
            //  console.log(data[i].msgid[0]);
            if (data[i].msgid[0] == 'r') {
              if (data[i].tagged == "" || data[i].tagged == undefined) {


                allchats = allchats + `<span style="margin-top:2%" class="friend last">
                      `+ data[i].chatbody + `
                        
                        <span   class="time">
                          `+ data[i].time + `
                          <span onclick="swipe('`+ swipeable + `')" class="tickothers"> <i  style="visibility:hidden" class="fa fa-solid fa-share fa-flip-horizontal"></i> </span>
                          
                        </span>
                  </span>`;
              }
              else {
                allchats = allchats + `<span style="margin-top:2%" class="friend last">
                      <p id="swipe" >`+ data[i].tagged + `<p>
                            <hr id="swipehr">
                      `+ data[i].chatbody + `
                        
                        <span  class="time">
                         
                          `+ data[i].time + `
                          <span onclick="swipe('`+ swipeable + `')" class="tickothers"> <i style="visibility:hidden" class="fa fa-solid fa-share fa-flip-horizontal"></i> </span>

                          
                        </span>
                  </span>`;


              }
            }
            else {

              if (data.length - i > unseenforthisuser) {
                if (data[i].tagged == "" || data[i].tagged == undefined) {


                  allchats = allchats + `<span style="margin-top:2%;"  class="you first">
                       `+ data[i].chatbody + `
                        <span  class="time">
                          `+ data[i].time + `
                          <span  class="seen"><i style="visibility:hidden" class="fa fa-solid fa-share fa-flip-horizontal"></i>  </span>
                          <span onclick="swipe('`+ swipeable + `')" class="tick">  </span>
                        </span>
                  </span>

                  `;

                }
                else {

                  allchats = allchats + `<span style="margin-top:2%;"  class="you first">
                     <p id="swipe" >`+ data[i].tagged + `<p>
                            <hr id="swipehr">
  
                       `+ data[i].chatbody + `
                        <span  class="time">
                          `+ data[i].time + `
                          <span  class="seen"> <i style="visibility:hidden" class="fa fa-solid fa-share fa-flip-horizontal"></i> </span>
                          <span onclick="swipe('`+ swipeable + `')" class="tick"></span>
                        </span>
                  </span>

                  `;


                }
              }
              else {
                if (data[i].tagged == "" || data[i].tagged == undefined) {

                  allchats = allchats + `<span style="margin-top:2%;"  class="you first">
                       `+ data[i].chatbody + `
                        <span  class="time">
                          `+ data[i].time + `
                          <span class="redtogreen" ><i style="visibility:hidden"  class="fa fa-solid fa-share fa-flip-horizontal"></i>  </span>
                          <span class="tick" onclick="swipe('`+ swipeable + `')">  </span>
                        
                        </span>
                  </span>
                  `;

                }
              
              else {
                allchats = allchats + `<span style="margin-top:2%;"  class="you first">
                  <p id="swipe" >`+ data[i].tagged + `<p>
                            <hr id="swipehr">
                     
                       `+ data[i].chatbody + `
                        <span  class="time">
                          `+ data[i].time + `
                          <span class="redtogreen" ><i style="visibility:hidden" class="fa fa-solid fa-share fa-flip-horizontal"></i>  </span>
                          <span class="tick" onclick="swipe('`+ swipeable + `')">  </span>

                        </span>
                  </span>
                  `;

              }
              }
            }
          }
          allfinalmessages=allchats;
          setallfinalmessages(allchats);
          document.getElementById("showchat").innerHTML = allchats;
        }
        else {
          document.getElementById("showchat").innerHTML = "<div style='height:20%;border:2px solid aqua;border-radius:20%;padding:5px;text-align:center;background:black;color:white;font-weight:bolder;font-size:smaller;'>NO CHATS HERE TO SHOW  .       LET'S TYPE YOUR FIRST MESSAGE NOW<div>";
 ismessagenull=1;
        }
        var messageBody = document.querySelector('.chat');
        if(localStorage.getItem("scrollvalue")==1){

        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
        }
        //var chatHistory = document.getElementById("messageBody");
        //chatHistory.scrollTop = chatHistory.scrollHeight;
     
}
var ismessagenull=0;
 var messageBody = document.querySelector('.chat');
        if(localStorage.getItem("scrollvalue")==1){

        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
        }
       

var allfinalmessages="";
function setallfinalmessages(data){
  allfinalmessages=allfinalmessages;
}





socket.on("showchattome",function (all){
console.log(all);
var data=all.obj;
var swipeable=data.chatbody;
            data.chatbody=linkify(data.chatbody);

   var allmessages ="";
      //showmessages();
      if (all.nowuser==localStorage.getItem("userid") && all.online==1) {
                if (data.swipe == "" || data.swipe == undefined) {


                  allmessages = allmessages + `<span style="margin-top:2%;"  class="you first">
                       `+ data.chatbody + `
                        <span  class="time">
                          `+ data.time + `
                          <span class="seen" ><i style="visibility:hidden" class="fa fa-solid fa-share fa-flip-horizontal"></i>  </span>
                          <span onclick="swipe('`+ swipeable + `')" class="tick" ></i>  </span>
                        </span>
                  </span>

                  `;

                }
                else {

                  allmessages = allmessages + `<span style="margin-top:2%;"  class="you first">
                     <p id="swipe" >`+ data.swipe + `<p>
                            <hr id="swipehr">
  
                       `+ data.chatbody + `
                        <span  class="time">
                          `+ data.time + `
                          <span class="seen"><i style="visibility:hidden" class="fa fa-solid fa-share fa-flip-horizontal"></i>   </span>
                          <span onclick="swipe('`+ swipeable + `')" class="tick"></i>   </span>
                        </span>
                  </span>

                  `;


                }
              }
              else {
                if (data.swipe == "" || data.swipe == undefined) {

                  allmessages = allmessages + `<span style="margin-top:2%;"  class="you first">
                       `+ data.chatbody + `
                        <span  class="time">
                          `+ data.time + `
                          <span class="redtogreen"><i style="visibility:hidden" class="fa fa-solid fa-share fa-flip-horizontal"></i>   </span>
                          <span class="tick" onclick="swipe('`+ swipeable + `')" > </span>
                        </span>
                  </span>
                  `;

                }
              
              else {
                allmessages = allmessages + `<span style="margin-top:2%;"  class="you first">
                  <p id="swipe" >`+ data.swipe + `<p>
                            <hr id="swipehr">
                     
                       `+ data.chatbody + `
                        <span  class="time">
                          `+ data.time + `
                          <span class="redtogreen" ><i style="visibility:hidden" class="fa fa-solid fa-share fa-flip-horizontal"></i>   </span>
                          <span class="tick" onclick="swipe('`+ swipeable + `')" > </span>

                        </span>
                  </span>
                  `;

              }
              }
              if(ismessagenull==1){
  allfinalmessages="";
  ismessagenull=0;
}
           allfinalmessages=allfinalmessages+allmessages;
         // setallfinalmessages(allmessages);
          document.getElementById("showchat").innerHTML = allfinalmessages;

        var messageBody = document.querySelector('.chat');
        if(localStorage.getItem("scrollvalue")==1){

        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
        }
         

})


socket.on("iamenteredchat",function(data){
  console.log("yo boy "+data.userid+" toid-"+data.toid);
  if(data.userid=localStorage.getItem("toid")  && data.toid==localStorage.getItem("userid")){
    var elements = document.getElementsByClassName('redtogreen'); // get all elements
	for(var i = 0; i < elements.length; i++){
		//elements[i].style.background = "greenyellow";
		elements[i].className = "seen";
	}
  allfinalmessages=document.getElementById("showchat").innerHTML;
  }
  
})
function startplay(){

}
  var songs=document.getElementById("songfile")

  songs.onchange = function() {
    document.getElementById("musicplayer").classname="musicplayernew";
    document.getElementById("musicplayer").setAttribute('id',"musicplayernew");
    document.getElementById("musicplayernew").style.backgroundImage=`url(demopage/appback2.png)`;

   var files = this.files;
    var file = URL.createObjectURL(files[0]);
    audio_player.src = file; 
    audio_player.play();
    document.getElementById("musicshow").value=file; 

};
function typing(){
  console.log("typing startred");

  socket.emit("typingstart",{ownid:localStorage.getItem("userid"),toid:localStorage.getItem("toid")});
  setTimeout(endtyping,1000);
}
function endtyping(){
  console.log("typing ended");

  socket.emit("typingend",{ownid:localStorage.getItem("userid"),toid:localStorage.getItem("toid")});

}


socket.on("showtypingstart",function(data){

  if(data.ownid==localStorage.getItem("toid") && data.toid==localStorage.getItem("userid")){
   document.getElementById("showtyping").style.visibility="visible"; 

  }


})

socket.on("showtypingend",function(data){

  if(data.ownid==localStorage.getItem("toid") && data.toid==localStorage.getItem("userid")){
    document.getElementById("showtyping").style.visibility="hidden";

  }

})