let audio=true;
let localStream;
//created a client
let client = AgoraRTC.createClient({
     mode: "rtc",
     codec: "vp8",
});

//initialized the client
client.init("f472d104a61749cbaa8e7935c2b1bc75");

 //creating a room means a joining video call
 client.join("0067827aa5b223b4a5aa4759ac229bc0cc0IADJ1unsE0aSsuHcyQfSkQOIlN3VX7OVTL19RGMFt+A5ScTD3AMAAAAAEACXmsVzhxDzYAEAAQCHEPNg",
  "demochat", null, (uid)=>{
      let localStream = AgoraRTC.createStream({
           audio: true,
           video: true,
       });
       localStream.init(()=>{
           mystream = localStream;
           localStream.play("local");
           client.publish(localStream);
       });
    });

// Subscribe to the remote stream when it is published
client.on("stream-added", function(evt){
     client.subscribe(evt.stream);
 });


 client.on("stream-subscribed", function(evt){
     let stream = evt.stream;
     let streamId = String(stream.getId());
     let right = document.getElementById('remote')
     let div = document.createElement('div')
     div.id = streamId;
     right.appendChild(div);
     stream.play(streamId);
     div.setAttribute("style","height : 200px; width : 100%;margin-left:5px;margin-right:5px;")
     
 });
function mute() {
    mystream.muteAudio();
    audio=false
}

function unmute() {
    mystream.unmuteAudio();
}

function removeVid() {
    mystream.stop();
  mystream.leave();
}