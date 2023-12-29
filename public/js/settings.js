
   function gotocontact() {
  
    window.location.replace("contact");
  }
  function changesettings(a){
    if(localStorage.getItem(a)==1){
    localStorage.setItem(a,0);

      //document.getElementById(a).value=0;
    }
    else{
     // document.getElementById(a).value=1;
    localStorage.setItem(a,1);


    }
    console.log(a+document.getElementById(a).value);
  }

  var allsettings=["scrollvalue","soundvalue"];
  function showsettings(){
    for(var i=0;i<allsettings.length;i++){
      var val=localStorage.getItem(allsettings[i]);
      if(val==0){
        document.getElementById(allsettings[i]).checked=false;
      }
      else{
        document.getElementById(allsettings[i]).checked=true;

      }
    }
    }
  showsettings();
  function logout(){
    localStorage.setItem("userid",null);
    localStorage.setItem("scrollvalue",null);
    localStorage.setItem("soundvalue",null);
    localStorage.setItem("email",null);
    localStorage.setItem("about",null);
    localStorage.setItem("username",null);
    localStorage.setItem("tousername",null);
    localStorage.setItem("toid",null);
    localStorage.setItem("allcontacts",null);
    window.location.replace("login");
  }
