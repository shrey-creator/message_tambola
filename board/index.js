
//https://myhousie.herokuapp.com/
var roomname=location.search.slice(0).split("&")[0];
var roomtype=location.search.slice(0).split("&")[1];
if(roomtype)
{
  var personname=roomname.split("_")[1];
   roomname=roomname.split("_")[0];
   var name=personname.split("=")[1];
var type=roomtype.split("=")[1];
var room=roomname.split("=")[1];
}
console.log(type+" "+room+" "+name);
var store=[];
/*                                            For room joining                                                              */
if(roomtype != null)
{
  var socket=io.connect('http://localhost:5000');
  if(type=="join")
  {
    $(".tap").text("");
  }
  
  $(".roomName").text("Room - "+room);
  socket.emit('join',{room,type});
  socket.on('join',(data)=>{
    for(i=0;i<data.length;i++)
    {

      store.push(data[i]);
      $("."+data[i]).attr('id',"pressed");
    }
    $(".no").text(90-store.length);
  });
  if(type=="host" && store.length<=90){
    
  $(".tapper").click(function(){
    randomnumberRoom();
  
  });
  
}
else if(store.length>90)
{
  $(".tap").text("Game ends");
}
  function randomnumberRoom()
  {
    var ran=Math.floor(Math.random()*90+1);
    while(true)
    {
      if(!(store.includes(ran)))
      {
        //store.push(ran);
        break;
      }
      else {
        ran=Math.floor(Math.random()*90+1)
  
      }
    }
    
    
    socket.emit('number',{
      ran:ran,
      room:room})
  }
  socket.on('number',(data)=>{
    
    store.push(data.ran)
    var ran=data.ran;
   
  var sound=ran+".wav";
  console.log(store.length);
  $("h1").text(ran);
  $(".no").text(90-store.length);
  $("."+ran).attr('id',"pressed");
  var audio=new Audio(sound);
   audio.play();
  if(store.length>1)
  {
    $(".prev").text(store[store.length-2])
  }
  })
  
}    

/*                                                        to start game directly                   */
else{
  if(store.length<90)
  {
  $(".tapper").click(function(){
    randomnumber();
  
  });
}
else 
{
  $(".tap").text("Game ends");
}

  function randomnumber()
  {
    var ran=Math.floor(Math.random()*90+1);
    while(true)
    {
      if(!(store.includes(ran)))
      {
        //store.push(ran);
        break;
      }
      else {
        ran=Math.floor(Math.random()*90+1)
  
      }
    }
    playSound(ran);
    
  }

  function playSound(ran)
  {
    for( i=0;i<store.length;i++)
    {
      if(ran==store[i])
      {
        console.log("no repeated"+data.ran);
      }
    }
    store.push(ran)
    var sound=ran+".wav";
  
  $("h1").text(ran);
  console.log(store.length);
  $(".no").text(90-store.length);
  $("."+ran).attr('id',"pressed");
  var audio=new Audio(sound);
   audio.play();
  if(store.length>1)
  {
    $(".prev").text(store[store.length-2])
  }
  }

 
   
  
  
}


//https://myhousie.herokuapp.com/