console.log("hello")
let songs;
let currentSong = new Audio;
// console.log(currentSong.index())

async function getSongs() {



  let a = await fetch("http://127.0.0.1:3000/songs/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  // console.log(a);
  // console.log(response)
  // console.log(tds)
  let as = div.getElementsByTagName("a")
  // console.log(as)
  let songss = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songss.push(element.href.split("/songs/")[1]);
    }
  }
  return songss
}


const playMusic = (track, pause = false) => {
  // let audio = new Audio("/songs/"+track)
  // audio.play()
  currentSong.src = "/songs/" + track;
  console.log(decodeURI(track))
  if (!pause) {
    currentSong.play();
    play.src = "assests/images/PlayBar/pausesong.svg"
  }

  document.querySelector(".songtitle").innerHTML = decodeURI(track)
  document.querySelector(".song-time").innerHTML = "00:00/00:00"
  // console.log(document.querySelector(".song-time"))

};
let countt = 1;

currentSong.addEventListener("ended", () => {
  // currentIndex = (currentIndex + 1) % songs.length; // Loop back after the last song
  // playMusic(songs[currentIndex]); // Play next song

  
   
    if (countt < songs.length) {
      nextSong(songs[countt])
      // console.log(countt);
      countt++;

    }
    else {
      countt = 0;
    }


  

});

 

const nextSong = (track) => {

  currentSong.src = "/songs/" + track;
  console.log(decodeURI(track))

  currentSong.play();
  play.src = "assests/images/PlayBar/pausesong.svg"


  document.querySelector(".songtitle").innerHTML = decodeURI(track)
  document.querySelector(".song-time").innerHTML = "00:00/00:00"
  // console.log(document.querySelector(".song-time"))

}


const preSong = (track) => {

  currentSong.src = "/songs/" + track;
  console.log(decodeURI(track))

  currentSong.play();
  play.src = "assests/images/PlayBar/pausesong.svg"


  document.querySelector(".songtitle").innerHTML = decodeURI(track)
  document.querySelector(".song-time").innerHTML = "00:00/00:00"
  // console.log(document.querySelector(".song-time"))

}





function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60) % 100; // Ensures minutes stay within two digits
  let secs = Math.floor(seconds % 60); // Gets remaining seconds

  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
async function main() {

  songs = await getSongs()
  // console.log(s);
  playMusic(songs[0], true)

  let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
  // console.log(songUL)
  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `
        <li>
              <img src="assests/images/music.svg" alt="">
              <div class="info">
                <div class="songname">${song.replaceAll("%20", " ")}</div>
                <div>Adesh</div>
              </div>
              <div class="playnow flex ">
                <span>Play Now</span>
                <img src="assests/images/play.svg" alt="">
              </div>
            </li>`
      ;

  }

  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())


    })
  })


  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play()
      play.src = "assests/images/PlayBar/pausesong.svg"
    }
    else {
      currentSong.pause()
      play.src = "assests/images/PlayBar/playsong.svg"
    }
  })

  
  let count = 1;
  next.addEventListener("click", () => {
    // alert("hii")
    // nextSong()
    //  console.log(count)
    //  console.log(songs.length)
    //     while(count<=songs.length){
    //  playMusic(songs[count], true);
    //     }

    if (count < songs.length) {
      nextSong(songs[count])
      // console.log(count);
      count++;

    }
    else {
      count = 0;
    }


  })



  let countpre = songs.length - 1;
  // console.log(countpre)
  pre.addEventListener("click", () => {


    if (countpre >= 0) {

      preSong(songs[countpre])
      // console.log(countpre);
      countpre--;


    }
    else {
      countpre = songs.length - 1;
    }
    // while(count>songs.length)
    // {playMusic(songs[count], true);

    // }
    //  for (count; count < songs.length; count++) {
    //     // console.log(songs[count])
    //     playMusic(songs[count], true);
    //     // console.log(playMusic(songs[i], true))
    //   }

  })


  // currentSong.addEventListener("timeupdate",()=>{
  //   document.querySelector(".song-time").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
  //   document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%";
  //   console.log(document.querySelector(".circle"))
  // })

  currentSong.addEventListener("timeupdate", () => {
    // console.log(currentSong.currentTime,currentSong.duration)
    document.querySelector(".song-time").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`

    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"


    document.querySelector(".seekbar").addEventListener("click", e => {
      let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
      document.querySelector(".circle").style.left = percent + "%";
      currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })
  })

  let librarypluse = document.querySelector(".library-plus").addEventListener("click", () => {
    // console.log("hii")
    // alert("Hii")
    // console.log(document.querySelector(".left"))
    // document.querySelector(".left").style.border="2px solid red";
    // document.querySelector(".left").style.display="none";
    let newSongList = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    const newElement = document.createElement("li"); // Create an <li> element
    newElement.textContent = "Hii"; 
   
    newSongList.insertAdjacentElement("beforebegin", newElement); 
    
    

    console.log(newSongList)
  })

   console.log(document.querySelector("#song-count"))
  // let songCount =document.querySelector("#song-count")
  // let changeCount=0;
  // songCount.addEventListener("click",()=>{

  //  changeCount=changeCount+1;
  //  console.log(changeCount)
  //  if(changeCount==1){
  //   document.querySelector("#song-count").innerHTML="<h1> Hii </h1>";
  //   changeCount.src="assests/images/PlayBar/playall.svg"
  //  }


  // })
  let changeCount = 1;
  let songCount = document.querySelector("#song-count"); // Ensure this is correctly referenced
  
  songCount.addEventListener("click", () => {
    
  
      console.log(changeCount);
  
      if (changeCount === 1) {
        songCount.src = "assests/images/PlayBar/playall.svg";

        // nextSong(songs[countt])
        // for(changeCount;countt>=songs.length;countt){
        //   if(countt==songs.length){
        //     countt++
        //     console.log("count if "+countt)
        //   }
        //   else{
        // nextSong(songs[countt])
        // console.log("countt before"+countt)
        // countt++
        // console.log("countt after"+countt)
        //   }
        
      }
      else if(changeCount==2){
        songCount.src = "assests/images/PlayBar/playcross.svg";
        
      }
      else if(changeCount==3){
        songCount.src = "assests/images/PlayBar/repeat1.svg";
        playMusic(songs[countt], true)
        // currentSong.play()
        console.log("countt"+countt)
        changeCount=0
      }
      else {
        
      }
      changeCount += 1; 
  });
  
}

main()


