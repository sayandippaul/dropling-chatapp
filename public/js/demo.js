
    // document.getElementById("model").play();
//minimum no will be 7
var now=1;
var showno=9;
function showall(){
    var all="";
    var t=0;
for(var i=1;i<=showno;i++){
    var p=t+1;
    var q=t+2;
    var r=t+3;
    if( i==showno){
all=all+`<div id="div`+p+`" style="visibility:hidden" class="divleft"></div>
                        <div  id="div`+q+`"  class="divmid divmidlastnotactive"></div>
                        <div  id="div`+r+`"  style="visibility:hidden" class="divright"></div>
                      
                      
                 `;
                 t=r;
    }
    else if(i==1){
all=all+`<div id="div`+p+`"  style="visibility:hidden" class="divleft"></div>
                        <div id="div`+q+`"  class="divmid divmid1" ></div>
                        <div id="div`+r+`"  style="visibility:hidden" class="divright"></div>
                      
                      
                  <hr id="hr`+p+`" style="visibility:hidden"  class="hrleft">
                  <hr id="hr`+q+`" class="hrmid">
                  <hr id="hr`+p+`" style="visibility:hidden" class="hrright">
          `;
          t=r;

    }
    else if(i%2==0){
        all=all+`<div id="div`+p+`"   class="divleft"><img id="icon`+p+`"  class="iconimageleft" src="demopage/showleftrightdivimage.png"></div>
                        <div id="div`+q+`"  class="divmid divmidothersnotactive"></div>
                        <div  id="div`+r+`" style="visibility:hidden" class="divright"></div>
                      
                      
                  <hr id="hr`+p+`"   class="hrleft">
                  <hr id="hr`+q+`"  class="hrmid">
                  <hr id="hr`+r+`" style="visibility:hidden" class="hrright">
          `;
          t=r;


    }
    else if(i%2==1){
        all=all+`<div id="div`+p+`"  style="visibility:hidden" class="divleft"></div>
                        <div  id="div`+q+`" class="divmid divmidothersnotactive"></div>
                        <div  id="div`+r+`"  class="divright"><img id="icon`+p+`" class="iconimageright" src="demopage/showleftrightdivimage.png"></div>
                      
                      
                  <hr id="hr`+r+`" style="visibility:hidden"  class="hrleft">
                  <hr id="hr`+q+`"  class="hrmid">
                  <hr id="hr`+p+`"  class="hrright">
          `;
                 t=r;

    }
}
document.getElementById("showmapnow").innerHTML=all;
now=1;
}
showall();

function change(){
    now++;
    speakvoice("hi");
    var g=now-1;
    var a=now*3-1;
    document.getElementById("showchat"+g).setAttribute('id',"showchat"+now);
    document.getElementById("showchat"+now).style.visibility="hidden";
    
    setTimeout(()=>{ // speak after 2 seconds 
    document.getElementById("showchat"+now).style.visibility="visible";
           
           document.getElementById("showchat"+now).className="showchatnew";
   
             }, 500);
          
   
             setTimeout(()=>{ // speak after 2 seconds 
           
           document.getElementById("showchat"+now).className="";
   
             }, 100);
          
   
          

    // var prev=document.getElementsByClassName("showchat"+now);
    // prev[0].className="showchat";
    


    // document.getElementById("showchat").className=("showchat showchatnew");
    // document.getElementById("showchat").classList.add("showchatnew");
    // $("#showchat").load(location.href,"");
    console.log(a);
    if(now<showno){
        

         document.getElementById("div"+a).className="divmid divmidothers";
        var u=now*3-2;
        setTimeout(()=>{ // speak after 2 seconds 
            document.getElementById("icon"+u).src="demopage/showleftrightdivimage2.png";
        var e=u-2;
        document.getElementById("hr"+e).style.backgroundColor="aqua";
        document.getElementById("hr"+u).style.backgroundColor="aqua";

          }, 1800);
       
        


        if(now>5){
            var n=a-12;
            document.getElementById("div"+n).scrollIntoView({ behavior: "smooth", inline: "nearest" });
        }
    }
    else if(now==showno){
        var u=now*3-4;
        
        document.getElementById("div"+a).className="divmidlast"
        document.getElementById("hr"+u).style.backgroundColor="aqua";
       

    }
}




        let voices = speechSynthesis.getVoices();
           function getVoices() {
         if(!voices.length){
         // some time the voice will not be initialized so we can call speak with empty string
         // this will initialize the voices 
         let utterance = new SpeechSynthesisUtterance("");
         speechSynthesis.speak(utterance);
         voices = speechSynthesis.getVoices();
         }
         return voices;
         }
         
         
         function speak(text, voice, rate, pitch, volume) {
         // create a SpeechSynthesisUtterance to configure the how text to be spoken 
         let speakData = new SpeechSynthesisUtterance();
         speakData.volume = volume; // From 0 to 1
         speakData.rate = rate; // From 0.1 to 10
         speakData.pitch = pitch; // From 0 to 2
         speakData.text = text;
         speakData.lang = 'en';
         speakData.voice = voice;
         
         // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking 
         speechSynthesis.speak(speakData);
    // document.getElementById("model").pause();

         
         }
         
         
        function speakvoice(t){

            let voices = getVoices();
         let rate = 0.9, pitch =1.1, volume = 1;
        //  let text = "hi sandy i am your sayantan. please ignore sayandip for the sake of our relationship";
        let text = "malo is a vey good boy .genarally he is failed in different type of exams. ";

         console.log(voices.length);
         //10
        speak(text, voices[5], rate, pitch, volume);
         
        setTimeout(()=>{ // speak after 2 seconds 
        //  rate = 0.5; pitch = 1.5, volume = 0.5;
        //  text = "Spaecking with volume = 0.5 rate = 0.5 pitch = 1.5 ";
        //  speak(text, voices[10], rate, pitch, volume );
    document.getElementById("model").play();

         }, 1000);
         setTimeout(()=>{ // speak after 2 seconds 
        //  rate = 0.5; pitch = 1.5, volume = 0.5;
        //  text = "Spaecking with volume = 0.5 rate = 0.5 pitch = 1.5 ";
        //  speak(text, voices[10], rate, pitch, volume );
    document.getElementById("model").pause();
    document.getElementById("model").currentTime = 0;
         }, 7000);
        
        }





        //  document.getElementById('speak').addEventListener('click', () => {
        //    function getVoices() {
        //  let voices = speechSynthesis.getVoices();
        //  if(!voices.length){
        //  // some time the voice will not be initialized so we can call speak with empty string
        //  // this will initialize the voices 
        //  let utterance = new SpeechSynthesisUtterance("");
        //  speechSynthesis.speak(utterance);
        //  voices = speechSynthesis.getVoices();
        //  }
        //  return voices;
        //  }
         
         
        //  function speak(text, voice, rate, pitch, volume) {
        //  // create a SpeechSynthesisUtterance to configure the how text to be spoken 
        //  let speakData = new SpeechSynthesisUtterance();
        //  speakData.volume = volume; // From 0 to 1
        //  speakData.rate = rate; // From 0.1 to 10
        //  speakData.pitch = pitch; // From 0 to 2
        //  speakData.text = text;
        //  speakData.lang = 'en';
        //  speakData.voice = voice;
         
        //  // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking 
        //  speechSynthesis.speak(speakData);
         
        //  }
         
        // //  if ('speechSynthesis' in window) {
         
        //  let voices = getVoices();
        //  let rate = 1, pitch = 2, volume = 1;
        //  let text = "Spaecking with volume = 1 rate =1 pitch =2 ";
         
        //  speak(text, voices[5], rate, pitch, volume);
         
        //  setTimeout(()=>{ // speak after 2 seconds 
        //  rate = 0.5; pitch = 1.5, volume = 0.5;
        //  text = "Spaecking with volume = 0.5 rate = 0.5 pitch = 1.5 ";
        //  speak(text, voices[10], rate, pitch, volume );
        //  }, 2000);
        //  }else{
        // //  console.log(' Speech Synthesis Not Supported 😞'); 
        // //  }
        //  });

let snowflakes_count = 200;

// let base_css = ``; // Put your custom base css here

if (typeof total !== 'undefined'){
    snowflakes_count = total;
}


// This function allows you to turn on and off the snow
function toggle_snow() {
    let check_box = document.getElementById("toggle_snow");
    if (check_box.checked == true) {
        document.getElementById('snow').style.display = "block";
    }
    else {
        document.getElementById('snow').style.display = "none";
    }
}

// Creating snowflakes
function spawn_snow(snow_density = 200) {
    snow_density -= 1;

    for (let x = 0; x < snow_density; x++) {
        let board = document.createElement('div');
        board.className = "snowflake";

        document.getElementById('snow').appendChild(board);
    }
}

// Append style for each snowflake to the head
function add_css(rule) {
    let css = document.createElement('style');
    css.type = 'text/css';
    css.appendChild(document.createTextNode(rule)); // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css);
}



// Math
function random_int(value = 100){
    return Math.floor(Math.random() * value) + 1;
}

function random_range(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Create style for snowflake
function spawnSnowCSS(snow_density = 200){
    let snowflake_name = "snowflake";
    let rule = ``;
    if (typeof base_css !== 'undefined'){
        rule = base_css;
    }
    
    for(let i = 1; i < snow_density; i++){
        let random_x = Math.random() * 100; // vw
        let random_offset = random_range(-100000, 100000) * 0.0001; // vw;
        let random_x_end = random_x + random_offset;
        let random_x_end_yoyo = random_x + (random_offset / 2);
        let random_yoyo_time = random_range(30000, 80000) / 100000;
        let random_yoyo_y = random_yoyo_time * 100; // vh
        let random_scale = Math.random();
        let fall_duration = random_range(10, 30) * 1; // s
        let fall_delay = random_int(30) * -1; // s
        let opacity_ = Math.random();

        rule += `
        .${snowflake_name}:nth-child(${i}) {
            opacity: ${opacity_};
            transform: translate(${random_x}vw, -10px) scale(${random_scale});
            animation: fall-${i} ${fall_duration}s ${fall_delay}s linear infinite;
        }

        @keyframes fall-${i} {
            ${random_yoyo_time*100}% {
                transform: translate(${random_x_end}vw, ${random_yoyo_y}vh) scale(${random_scale});
            }

            to {
                transform: translate(${random_x_end_yoyo}vw, 100vh) scale(${random_scale});
            }
            
        }
        `
    }

    add_css(rule);
}

// Load the rules and execute after the DOM loads
window.onload = function() {
    spawnSnowCSS(snowflakes_count);
    spawn_snow(snowflakes_count);
};

// TODO add progress bar for slower clients

   