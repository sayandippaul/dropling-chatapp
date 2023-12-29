

// {{!-- 
//     function getCookie(cName) {
//      const name = cName + "=";
//      const cDecoded = decodeURIComponent(document.cookie); //to be careful
//      const cArr = cDecoded.split('; ');
//      let res;
//      cArr.forEach(val => {
//        if (val.indexOf(name) === 0) res = val.substring(name.length);
//      })
//      return res
//    }
//    console.log("hi"+getCookie("g_state")); --}}
   
   function setCookie() {
           document.cookie = 'g_state = {"i_l":0}' ;
   }
   setCookie();
       
   
           function handleCredentialResponse(response){
             console.log(response);
             if(response.credential){
               let jwt=response.credential;
               let user=JSON.parse(atob(jwt.split(".")[1]));
               console.log(user.email)
               
   ds={ pass:"",email:user.email,value:1 };
             submitd(1);
             }
           }
   
           function init(){
   setCookie();
   
             google.accounts.id.initialize({
               client_id:"31628992962-m5n46j7rb9to747vgnufnn0ks2clb3je.apps.googleusercontent.com",
               auto_select:false,
               callback:handleCredentialResponse
             })
             google.accounts.id.prompt()
   
           }
   
    //        {{!-- function handleCredentialResponse(response) {
    //     // decodeJwtResponse() is a custom function defined by you
    //     // to decode the credential response.
    //     const responsePayload = decodeJwtResponse(response.credential);
   
    //     console.log("ID: " + responsePayload.sub);
    //     console.log('Full Name: ' + responsePayload.name);
    //     console.log('Given Name: ' + responsePayload.given_name);
    //     console.log('Family Name: ' + responsePayload.family_name);
    //     console.log("Image URL: " + responsePayload.picture);
    //     console.log("Email: " + responsePayload.email);
    //  }
    //         const pass_field = document.querySelector('.pass-key');
    //         const showBtn = document.querySelector('.show');
    //         showBtn.addEventListener('click', function(){
    //          if(pass_field.type === "password"){
    //            pass_field.type = "text";
    //            showBtn.textContent = "HIDE";
    //            showBtn.style.color = "#3498db";
    //          }else{
    //            pass_field.type = "password";
    //            showBtn.textContent = "SHOW";
    //            showBtn.style.color = "#222";
    //          }
    //         }); --}}
   var ds={ pass:"",email:"",value:"" };
              function submitd(k){
               event.preventDefault();
               if(k==0){
   
               var email=document.getElementById("email").value;
               var pass=document.getElementById("pass").value;
   
                   ds = { pass:pass,email:email,value:k };
               }
         console.log(ds);
               //var name=document.getElementById("name").value;
   
       fetch(url+"/loginuser", {
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
         if(data!=null && data!=undefined){
   
         alert("welcome "+data.username); localStorage.setItem("username",data.username);
         localStorage.setItem("email",data.email);
         localStorage.setItem("about",data.about);
         localStorage.setItem("userid",data.userid);
         localStorage.setItem("dp",data.dp);
   
         localStorage.setItem("scrollvalue",1);
         localStorage.setItem("soundvalue",1);
        console.log(data);
         window.location.replace("contact");
         }
         else{
            alert("wrong credentials");
            //window.location.replace("login");
         }
   
         })
         .catch((err) => console.log(err));
       
   }
   
   
        function isloggedin(){
         var l=localStorage.getItem("userid");
   
         if( l=="null" || l==null || l=="undefined" || l==undefined ){
   
         }
         else{
           window.location.replace("contact");
         }
        } 
        isloggedin();   
   
   
   
   
//    {{!-- 
//    function onSignIn(googleUser) {
//      var profile = googleUser.getBasicProfile();
//      alert("hi");
//      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//      console.log('Name: ' + profile.getName());
//      console.log('Image URL: ' + profile.getImageUrl());
//      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//    } --}}
//    {{!-- const button = document.getElementById('signout_button');
//    button.onclick = () => {
//      google.accounts.id.disableAutoSelect();
//    } --}}
   
   
   
   function sendmailforgotpassword() {
               var email=document.getElementById("email").value;
               if(email.trim()!=""){
                 alert("password sent to your registered email id");
   
               
   
         fetch(url+"/sendmailforgotpassword", {
           method: "POST",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
             "Access-Control-Allow-Headers": "Content-Type",
             "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
             "Access-Control-Allow-Origin": "*",
           },
           body: JSON.stringify({email:email}),
         })
           .then((res) => res.json())
           .then((data) => { })
           .catch((err) => console.log(err));
               }
               else{
                 alert("enter email id");
               }
       }
   function showpassword(){
     document.getElementById("pass").type="text";
   }