console.log("Welcome to Spotify");

//Intialize the variables
let songIndex=0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay= document.getElementById('masterPlay');
let myProgessBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName: "Zara sa",filePath:"Songs/1.mp3",coverPath:"Covers/cover1.jpg"},
    {songName: "Ek Ladki ko Dekha To",filePath:"Songs/2.mp3",coverPath:"Covers/cover2.jpg"},
    {songName: "Falak Tak",filePath:"Songs/3.mp3",coverPath:"Covers/cover3.jpg"},
    {songName: "Main Hoon Na",filePath:"Songs/4.mp3",coverPath:"Covers/cover4.jpg"},
    {songName: "Kal Ho Naa Ho",filePath:"Songs/5.mp3",coverPath:"Covers/cover5.jpg"},
    {songName: "Lag Ja Gale",filePath:"Songs/6.mp3",coverPath:"Covers/cover6.jpg"},
    {songName: "Samjhawan",filePath:"Songs/7.mp3",coverPath:"Covers/cover7.jpg"},
    {songName: "Sun Zara",filePath:"Songs/8.mp3",coverPath:"Covers/cover8.jpg"},
    {songName: "Tujhse Naraz Nahi Zinadagi",filePath:"Songs/9.mp3",coverPath:"Covers/cover9.jpg"},
    {songName: "Tum Se Hi",filePath:"Songs/10.mp3",coverPath:"Covers/cover10.jpg"},
]   

songItems.forEach((element,i) => {
    //console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});
//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
         audioElement.play();
         masterPlay.classList.remove('fa-circle-play');
         masterPlay.classList.add('fa-circle-pause');
         gif.style.opacity=1;
    }
    else{
        audioElement.pause();
         masterPlay.classList.remove('fa-circle-pause');
         masterPlay.classList.add('fa-circle-play');
         gif.style.opacity=0;
    }
})
// listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //console.log('timeupdate');
    //Update Seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgessBar.value=progress;
})

myProgessBar.addEventListener('change',()=>{
    audioElement.currentTime=parseInt((myProgessBar.value * audioElement.duration)/100);
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        //console.log(e.target);
        makeAllPlays();
        
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.src=`Songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`Songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`Songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})