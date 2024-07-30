// const win = require("global");

// const { on } = require("nodemailer/lib/xoauth2");



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
  function sendmessage(v) {

if(v==1){
//send message
}
else if(v==2){
  document.getElementById("uploadpic").click();
  document.getElementById("uploadpic").onchange = function() {
    var files = this.files;
    var fileNames = [];
    // for (var i = 0; i < files.length; i++) {
    //   fileNames.push(files[i].name);

    // }
    console.log(fileNames);
    upload();
    return;
  };

//send photos
}
else if(v==3){
  //send video
}
















    var chat_deliver = document.getElementById("chatinput").value.trim();
    // alert(chat_deliver);
    if (chat_deliver.trim() != "") {
      chat_deliver = chat_deliver.replace(/\n/g, "<br>");
      
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

  function extractIdFromLink(link) {
    let id = '';
    if (link.includes('drive.google.com')) {
      const match = link.match(/\/file\/d\/(.+?)\//);
      if (match) {
        id = match[1];
      }
    } else if (link.includes('youtube.com')) {
      const match = link.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|$|&)/);
      if (match) {
        id = match[1];
      }
    }
    return id;
  }



  function sendphoto(allsharablelinks) {  

    for(var i=0;i<allsharablelinks.length;i++){
      var chat_deliver = allsharablelinks[i];
    // alert(chat_deliver);
    var c="";
    if (chat_deliver.trim() != "") {
      var linkid=extractIdFromLink(chat_deliver);
      c =c+ `<div><iframe style='width: 100%;' src='https://drive.google.com/file/d/`+linkid+`/preview'   height='200' allow='autoplay' allowfullscreen></iframe></div><br>`;
      

    }

    }
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
      var ds = { time: time, toid: localStorage.getItem("toid"), chatbody: c, ownid: localStorage.getItem("userid"), toname: localStorage.getItem("tousername"), ownname: localStorage.getItem("username"), swipe: swipevalue };
      //console.log(ds);
var data=ds;

 
      
      
      swipevalue = "";
    document.getElementById("showswipe").style.display="none";
    document.getElementById("closeswipe").style.visibility="hidden";


        socket.emit("newchat",ds);




  }   



function sendphoto(allsharablelinks, index = 0) {  
  if (index < allsharablelinks.length) {
    var chat_deliver = allsharablelinks[index];
    if (chat_deliver.trim() != "") {
      var linkid = extractIdFromLink(chat_deliver);
      chat_deliver = `<div><iframe style='width: 100%;' src='https://drive.google.com/file/d/${linkid}/preview' height='200' allow='autoplay' allowfullscreen></iframe></div>`;
      
      var unseen = getunseenno();

      if(localStorage.getItem("soundvalue") == 1){
        document.getElementById("send").play(); 
      }

      var date = new Date();
      var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      var current_time = date.getHours() + ":" + date.getMinutes();
      var time = current_date + " " + current_time;  
      var ds = { 
        time: time, 
        toid: localStorage.getItem("toid"), 
        chatbody: chat_deliver, 
        ownid: localStorage.getItem("userid"), 
        toname: localStorage.getItem("tousername"), 
        ownname: localStorage.getItem("username"), 
        swipe: swipevalue 
      };

      swipevalue = "";
      document.getElementById("showswipe").style.display = "none";
      document.getElementById("closeswipe").style.visibility = "hidden";

      socket.emit("newchat", ds, function() {
        // Callback function to ensure the message was sent before continuing
        sendphoto(allsharablelinks, index + 1); // Recursive call to process the next link
      });
    } else {
      // If the current link is empty, skip to the next one
      sendphoto(allsharablelinks, index + 1);
    }
  }
  
}



function sendphoto(allsharablelinks, index = 0) {  
  if (index < allsharablelinks.length) {
    var chat_deliver = allsharablelinks[index];
    if (chat_deliver.trim() != "") {
      var linkid = extractIdFromLink(chat_deliver);
      chat_deliver = `<div><iframe style='width: 100%;' src='https://drive.google.com/file/d/${linkid}/preview' height='200' allow='autoplay' allowfullscreen></iframe></div>`;
      
      var unseen = getunseenno();

      if(localStorage.getItem("soundvalue") == 1){
        document.getElementById("send").play(); 
      }

      var date = new Date();
      var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      var current_time = date.getHours() + ":" + date.getMinutes();
      var time = current_date + " " + current_time;  
      var ds = { 
        time: time, 
        toid: localStorage.getItem("toid"), 
        chatbody: chat_deliver, 
        ownid: localStorage.getItem("userid"), 
        toname: localStorage.getItem("tousername"), 
        ownname: localStorage.getItem("username"), 
        swipe: swipevalue 
      };

      swipevalue = "";
      document.getElementById("showswipe").style.display = "none";
      document.getElementById("closeswipe").style.visibility = "hidden";

      // Assuming socket.emit can take a callback function to execute after the message is sent
      socket.emit("newchat", ds, () => {
        // After the message is sent, call sendphoto recursively to send the next photo
        sendphoto(allsharablelinks, index + 1);
      });
    } else {
      // If the current link is empty, skip to the next one
      sendphoto(allsharablelinks, index + 1);
    }
  }
}




  $('#chatinput').on('keydown', function(e) {
    if (e.keyCode === 13) { // check if enter key is pressed
      e.preventDefault(); // prevent default behavior of enter key
      var message = $(this).val(); // get the message from the textarea
      $(this).val(message + '\n'); // append a new line to the message
    }
  });


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
        if(text!=undefined && !text.includes("<iframe")){

        
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
    var a1,a2;
  if (a.includes('drive.google.com') && a.length > 5) {
    var link = a.substring(5);
    if (link.includes('drive.google.com')) {
      a=`<div ><iframe style='width: 50px;' src='`+link+`'   height='20' allow='autoplay' allowfullscreen></iframe></div>`;
      a2=`<div id="swipe"><iframe style='width: 50px;' src='`+link+`'   height='20' allow='autoplay' allowfullscreen></iframe></div>`;
    }
  }
  swipevalue = a2;
    

    document.getElementById("showswipe").innerHTML=a;
    document.getElementById("showswipe").style.display="block";
    document.getElementById("closeswipe").style.visibility="visible";

    console.log(swipevalue);
  }
  function closeswipe() {
    swipevalue = "";
    

    document.getElementById("showswipe").innerHTML="";
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
            if (swipeable.includes("<iframe")) {
              var linkStartIndex = swipeable.indexOf("src=\'") + 5;
              var linkEndIndex = swipeable.indexOf("\'", linkStartIndex);
              var link = swipeable.substring(linkStartIndex, linkEndIndex);
              swipeable ="sandy"+ link;
            }
            
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
if (swipeable.includes("<iframe")) {
  var linkStartIndex = swipeable.indexOf("src=\'") + 5;
  var linkEndIndex = swipeable.indexOf("\'", linkStartIndex);
  var link = swipeable.substring(linkStartIndex, linkEndIndex);
  // swipeable = link;
  swipeable ="sandy"+ link;

}

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



// var player;
// function onYouTubeIframeAPIReady(id) {
//   player = new YT.Player('videoplayer', {
//          // Ensure 'videoplayer' is the ID of the iframe or container

//     height: '150',
//     width: '100%',
//     videoId: id, // YouTube Video ID
    
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }
// function onPlayerReady(event) {
//   console.log("Player ready");
//   event.target.playVideo();
//   // event.target.pauseVideo();
//   // event.target.stopVideo();
//   // event.target.seekTo(50);
//   // event.target.setVolume(100);
//   // event.target.setPlaybackRate(1);
//   // event.target.setLoop(true);
//   // event.target.mute();
//   // event.target.unMute();
//   // event.target.isMuted();
//   // event.target.getVolume();
//   // event.target.getPlaybackRate();
//   // event.target.getVideoUrl();
// }
// function onPlayerStateChange(event) {
//   changeBorderColor(event.data);
// }


// // Your existing functions
// function changeBorderColor(playerStatus) {
//   console.log("Player's new state: " + playerStatus);
//   // Your existing code to change border color
// }



// var iframe = document.getElementById('videoplayer');
// var targetOrigin = 'https://www.youtube.com'; // Ensure this matches the iframe's origin

// // Example message
// var message = { type: 'playVideo', videoId: 'dQw4w9WgXcQ' };

// // Sending the message
// iframe.contentWindow.postMessage(message, targetOrigin);


// function changeVideo(videoId) {
//   if (player && player.loadVideoById) {
//   }
// }


function startplay(){
  var prompt=window.prompt("Enter Link to play the music or video","");
if(prompt!=null){
      var songlink=extractIdFromLink(prompt);
    if(songlink==null || songlink==""){
      alert("enter valid link");
      return;
    }
    else{
      var id=songlink;
      songlink="https://www.youtube.com/embed/"+songlink+"?autoplay=1";
      document.getElementById("videoplayersection").style.display="block";
      document.getElementById("videoplayer").src=songlink;
      // document.getElementById("videoplayer").play();
      document.getElementById("closeplayer").disabled=false;

      // onYouTubeIframeAPIReady(id);
      // player.loadVideoById(id);

      // changeVideo(id);
      // document.getElementById("videoplayer").src=songlink;

      // socket.emit("showmusic",{ownid:localStorage.getItem("userid"),toid:localStorage.getItem("toid"),link:songlink});  
      // document.getElementById("videoplayer").nextVideo();

      socket.emit("playmusic",{ownid:localStorage.getItem("userid"),toid:localStorage.getItem("toid"),link:songlink});

      // console.log(document.getElementById("videoplayer"));
    }

    }
    else{
      alert("Please enter  the link to play the music or video");
    }

}

// document.getElementById("videoplayer").onStateChange = function() {
//   alert("Player's new state: " );
//   // Your existing code to change border color
// }
// document.getElementById("videoplayer").addEventListener("timeupdate", function() {
//   // alert("Player time has changed");
//   console.log("time changed");
//   var currentTime = document.getElementById("videoplayer").currentTime;
  
//   var videoLink = document.getElementById("videoplayer").src;
//   var updatedLink = videoLink + "&start=" + currentTime;
//   console.log(updatedLink);
  
//   socket.emit("playmusic",{ownid:localStorage.getItem("userid"),toid:localStorage.getItem("toid"),link:updatedLink});

// });

// document.getElementById("videoplayer").addEventListener("play", function() {
//   // alert("Player is playing");
//   var currentTime = document.getElementById("videoplayer").currentTime;
//   var videoLink = document.getElementById("videoplayer").src;
//   var updatedLink = videoLink + "&start=" + currentTime;
//   console.log(updatedLink);
//   socket.emit("playmusic",{ownid:localStorage.getItem("userid"),toid:localStorage.getItem("toid"),link:updatedLink});
// });

// document.getElementById("videoplayer").addEventListener("PAUSED", function() {
//   // alert("Player is paused");
//   console.log("paused");
//   socket.emit("pausemusic",{ownid:localStorage.getItem("userid"),toid:localStorage.getItem("toid")});
// });


socket.on("playmusic",function(data){
  if(data.ownid==localStorage.getItem("toid") && data.toid==localStorage.getItem("userid")){
    // alert("music started");
    console.log("music started");
    // onYouTubeIframeAPIReady(data.link);

    document.getElementById("videoplayersection").style.display="block";

    document.getElementById("closeplayer").disabled=false;  
    document.getElementById("videoplayer").src=data.link;
    // document.getElementById("videoplayer").play();
  }
})

socket.on("pausemusic",function(data){
  if(data.ownid==localStorage.getItem("toid") && data.toid==localStorage.getItem("userid")){
    document.getElementById("videoplayer").pause();
  }
}
)

function closeplayer(){
  document.getElementById("videoplayersection").style.display="none";
  document.getElementById("videoplayer").src="";
  document.getElementById("closeplayer").disabled=true;

  socket.emit("closeplayer",{ownid:localStorage.getItem("userid"),toid:localStorage.getItem("toid")});
}
socket.on("closeplayer",function(data){
  if(data.ownid==localStorage.getItem("toid") && data.toid==localStorage.getItem("userid")){
    document.getElementById("closeplayer").disabled=true;
    document.getElementById("videoplayersection").style.display="none";
    document.getElementById("videoplayer").src="";
  }
})


//   var songs=document.getElementById("songfile")

//   songs.onchange = function() {
//     document.getElementById("musicplayer").classname="musicplayernew";
//     document.getElementById("musicplayer").setAttribute('id',"musicplayernew");
//     document.getElementById("musicplayernew").style.backgroundImage=`url(demopage/appback2.png)`;

//    var files = this.files;
//     var file = URL.createObjectURL(files[0]);
//     audio_player.src = file; 
//     audio_player.play();
//     document.getElementById("musicshow").value=file; 

// };
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
function startvideocall(){
  alert("video call started");
  document.getElementById("audio_player").innerHTML="Calling...";
  // var link=`${ location.origin }?room=`+localStorage.getItem("username")+`_`+localStorage.getItem("tousername")+`_${Math.floor(Math.random() * 100)  }`;
  var room=localStorage.getItem("username")+`_`+localStorage.getItem("tousername");
  localStorage.setItem("vcroom",room);
  fetch(url+"/create", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
  })

    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // var link="https://dropling.onrender.com/videocall"+data;
      socket.emit("startvideocall",{ownid:localStorage.getItem("userid"),toid:localStorage.getItem("toid"),link:url+"/videocall/"+data,room:data});
      // window.open(data.link);
      // window
    }
    )
    .catch((err) => console.log(err));


}
function acceptcall(){
  if(videocalllink=="" || acceptroom==""){
    alert("No call to accept");
    return;
  }
  console.log("accepting call");
  socket.emit("videocalljoined", { ownid: localStorage.getItem("userid"), toid: localStorage.getItem("toid"), link: videocalllink });
  localStorage.setItem("vcroom", acceptroom);
  alert("video call joined");
  setTimeout(function() {
    window.location.replace(videocalllink);
  }, 500);
  // socket.emit("videocalljoined",{ownid:localStorage.getItem("userid"),toid:localStorage.getItem("toid"),link:videocalllink});
  // localStorage.setItem("vcroom",acceptroom);

  // // window.open(videocalllink);
  // window.location.replace(videocalllink);
    
}
function rejectcall(){
      alert("video call cancelled");
      document.getElementById("audio_player").style.display="";
      document.getElementById("videocallbuttons").style.display="none";
      document.getElementById("audio_player").innerHTML="Video Call 🎦";
    
        socket.emit("videocallcancelled",{ownid:localStorage.getItem("userid"),toid:localStorage.getItem("toid")});
    
}
var videocalllink="",acceptroom=""; 
socket.on("startvideocall",function(data){
  if(data.ownid==localStorage.getItem("toid") && data.toid==localStorage.getItem("userid")){
    // alert("video call started");
    videocalllink= `/videocall/${data.room}`;
    document.getElementById("ring").play(); 

    console.log("video call started");

    // var roomId = new URL(data.link).pathname.slice(1);

      // Extract room ID from URL

     

    acceptroom=data.room;
    // if(confirm("Do you want to join the video call?")==true){
    // }
    //   else{
    //     alert("video call cancelled");
    //     socket.emit("videocallcancelled",{ownid:localStorage.getItem("userid"),toid:localStorage.getItem("toid")});
    //   }
    document.getElementById("audio_player").style.display="none";
    document.getElementById("videocallbuttons").style.display="";
  }
})
socket.on("videocalljoined",function(data){
  console.log("joined");
  if(data.ownid==localStorage.getItem("toid") && data.toid==localStorage.getItem("userid")){
    alert("other person video call joined");
    document.getElementById("audio_player").innerHTML="Call joined";
    // window.open(data.link);
  window.location.replace(data.link);

  }
})
socket.on("videocallcancelled",function(data){
  if(data.ownid==localStorage.getItem("toid") && data.toid==localStorage.getItem("userid")){
    alert("video call cancelled");
    document.getElementById("audio_player").innerHTML="Video Call 🎦";

  }
})













var alreadyaccesstoken="";







// function upload() {

//   var fileInput = document.getElementById("uploadpic");
//   console.log(fileInput);
//   var n=fileInput.files.length;
//           for(var i=0;i<fileInput.files.length;i++){
//             var file = fileInput.files[i];
//             var mimeType = file.type;
//              console.log(file)
//             // Determine the file type
//             if (mimeType.includes('pdf')) {
//                 uploadFile(n,i,file, 'application/pdf');
//             } else if (mimeType.includes('image')) {
//                 uploadFile(n,i,file, mimeType);
//             } else if (mimeType.includes('video')) {
//                 uploadFile(n,i,file, mimeType);
//             }
//             else if(mimeType.includes('audio')){
//               uploadFile(n,i,file, mimeType);
//             }
//              else {
//                 console.error('Unsupported file type');
//             }
    
//           }

// }

var allsharablelinks=[];
function upload() {
  var fileInput = document.getElementById("uploadpic");
  var totalFiles = fileInput.files.length;

  function uploadNext(index) {
    if (index < totalFiles) {
      var file = fileInput.files[index];
      var mimeType = file.type;

      // Determine the file type and upload
      if (mimeType.includes('pdf')) {
        uploadFile(totalFiles, index, file, 'application/pdf', () => uploadNext(index + 1));
      } else if (mimeType.includes('image')) {
        uploadFile(totalFiles, index, file, mimeType, () => uploadNext(index + 1));
      } else if (mimeType.includes('video')) {
        uploadFile(totalFiles, index, file, mimeType, () => uploadNext(index + 1));
      } else if (mimeType.includes('audio')) {
        uploadFile(totalFiles, index, file, mimeType, () => uploadNext(index + 1));
      }
    } else {
      console.log('All files have been uploaded.');
    }
  }

  uploadNext(0); // Start the recursive upload process
}


function uploadFile(n,i,file, mimeType,c) {
  // var formData = new FormData();
  // formData.append('file', file);

  console.log(`Uploading file ${i + 1} of ${n}: ${file.name} (${mimeType})`);

  var progressBar = document.getElementById('progress');
  var progressContainer = document.getElementById('progress-container');
  // var cancelButton = document.getElementById('cancel-button');
  // var uploadbutton=document.getElementById("saveallfield");
  var uploadsection=document.getElementById("lowerbox");

  progressBar.style.width = '0';
  // progressContainer.style.display = 'block';
  progressContainer.style.visibility="visible";

  uploadsection.style.visibility="hidden";
  // cancelButton.style.display = 'inline-block';
const parentFolder = localStorage.getItem('Dropling_documnets');

  var metadata = {
'name': file.name,
'mimeType': mimeType,
parents: [parentFolder]
};
  var formData = new FormData();
formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
formData.append('file', file);

  // Additional metadata for the file (name, MIME type, etc.) can be added here
console.log(formData);
// var access_token;
// if(alreadyaccesstoken==""){

//   alreadyaccesstoken=access_token;
// }
// else{
//    access_token = alreadyaccesstoken;

// }
   access_token = gapi.auth.getToken().access_token;
   if(access_token==null || access_token==undefined || access_token=="" ){
    alert("Please login to your upload account first then reupload files");
    return;
   }



// var access_token="ya29.a0AXooCgsil-wEDZm3jC801DGWHY24p-6wDLMAxGPhoKzZ1pcZs8zD1lPWxKrVXdORCx_KuRp_GDIOcT297tWv2ZH6s_GbYFkE6M2-lh3aUkws-IYYcAYL-_VyLXrrmsPv9MDaLcaRqKszh1x1E4BlBxC-fBDWCKIvjwaCgYKAT8SARESFQHGX2MiXejOYXGFsUrO7CrYMTJYaQ0169";
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
  xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
  console.log('Bearer ' + access_token);

  xhr.upload.onprogress = function(event) {
      if (event.lengthComputable) {
          var percentComplete = (event.loaded / event.total) * 100;
          progressBar.style.width = percentComplete + '%';
          // uploadbutton.disabled = true;
          // uploadsection.style.display="none";
  uploadsection.style.visibility="hidden";

      }
  };

  xhr.onload = function() {
      if (xhr.status === 200) {
          console.log('File uploaded successfully!');
          // console.log('Generated Google Drive link:', JSON.parse(xhr.responseText).id);
          var fileId =JSON.parse(xhr.responseText).id;
var sharableLink = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
console.log('Sharable link:', sharableLink);
allsharablelinks.push(sharableLink);
console.log(n,i);
//  document.getElementById().value=sharableLink;
if(n==i+1){

  console.log(allsharablelinks);


  // alert("File uploaded successfully");
  // uploadsection.style.display="block";
  uploadsection.style.visibility="visible";


  sendphoto(allsharablelinks,0);

  allsharablelinks=[];
}
// uploadbutton.disabled = false;

      } else {
          console.error('Error uploading file:', xhr.statusText);
          console.error(xhr.responseText);
      }
      // Hide progress bar and cancel button
      // progressContainer.style.display = 'none';
  progressContainer.style.visibility="hidden";

      // uploadsection.style.display="block";
  uploadsection.style.visibility="visible";

      // cancelButton.style.display = 'none';
  };

  xhr.onerror = function() {
      alert('Error uploading file');
      console.error(xhr.statusText);
      // Hide progress bar and cancel button
      // progressContainer.style.display = 'none';
  progressContainer.style.visibility="hidden";

      // uploadsection.style.display="block";
  uploadsection.style.visibility="visible";


      // cancelButton.style.display = 'none';
  };

  // cancelButton.onclick = function() {
  //     xhr.abort(); // Cancel the upload
  // };

  xhr.send(formData);




  setTimeout(c, 1000); // Simulating async upload with a timeout

}



    // this source code used updated google sign in options 
// after the previous button is deprecated

// var CLIENT_ID = '639609669934-eaescllh1k9fpp4nggtdoh1lc0p8kihh.apps.googleusercontent.com';
// var API_KEY = 'AIzaSyAXs-Hb9cjDptjCqjS2ST5gd0_c7KbSvAM';
// sayandip email id
// const CLIENT_ID = '31628992962-u8rfhl4f69tt6g13q89dojpsj0feqp87.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyCSZDg-69xCM1Mpyidx3Lex9Abd1RKp4Uo';

// project email id
// chatapp
const CLIENT_ID = '31628992962-m5n46j7rb9to747vgnufnn0ks2clb3je.apps.googleusercontent.com';
// rajarshi sir
// const CLIENT_ID = '132542636094-1lgfuf3glm64bfc0850h3n1puae6n1gq.apps.googleusercontent.com';
// rajarshi sir
// const API_KEY = 'AIzaSyBwMUYN2wJMytWsKjQ7BJAdI6SO0OksRD0';
const API_KEY = 'AIzaSyDcpeWWqbxbldfmuFvnR0pe9F7PqsGzFNo';

  
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';
let tokenClient;
let gapiInited = false;
let gisInited = false;




window.onload = () => {


//const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
//if (storedUserDetails && storedUserDetails.isSignedIn) {
//    signinButton.style.display = 'none';
 //   signoutButton.style.display = 'block';
//}
}
gapiLoaded();
gisLoaded();




function checkFolder() {
  gapi.client.drive.files.list({
      'q': 'name = "Dropling_documnets"',
  }).then(function (response) {
      var files = response.result.files;
      if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
              var file = files[i];
              localStorage.setItem('Dropling_documnets', file.id);
              console.log('Folder Available');
              // get files if folder available
          }
      } else {
      console.log('Folder not available');
          // if folder not available then create
          createFolder();
      }
  })
}


function createFolder() {
 
      var access_token = gapi.auth.getToken().access_token;
//       var access_token;
// if(alreadyaccesstoken==""){

//    access_token = gapi.auth.getToken().access_token;
//   alreadyaccesstoken=access_token;
// }
// else{
//    access_token = alreadyaccesstoken;

// }

  
  var request = gapi.client.request({
      'path': 'drive/v2/files',
      'method': 'POST',
      'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token,
      },
      'body': {
          'title': 'Dropling_documnets',
          'mimeType': 'application/vnd.google-apps.folder'
      }
  });
  request.execute(function (response) {
      localStorage.setItem('Dropling_documnets', response.id);
      console.log('Folder Created');
  })
}


function handleAuthClick() {
  if (gapiInited && gisInited) {
  }
  else{
    gapiLoaded();
gisLoaded();

  }
  
tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
        throw (resp);
    }
    const userDetails = {
        isSignedIn: true,
        accessToken: resp.access_token,
        idToken: resp.id_token,
        expiresIn: resp.expires_in,
        tokenType: resp.token_type,
        scope: resp.scope,
        refreshToken: resp.refresh_token,
        issuedAt: Date.now()
    };
    checkFolder();
};

if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: 'consent' });
} else {
    tokenClient.requestAccessToken({ prompt: '' });
}


}

function handleSignoutClick() {
const token = gapi.client.getToken();
if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
}
}


function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
  }
  
  async function initializeGapiClient() {
  await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: DISCOVERY_DOCS,
  });
  gapiInited = true;
  }
  
  function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: ''
  });
  gisInited = true;

  }

  setTimeout(handleAuthClick, 2000);
  
  








  
  
  