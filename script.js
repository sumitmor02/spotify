console.log("Welcome to spotify");

//initialise the variables
let songindex = 0;
let audioElement = new Audio('./audio/1.m4a');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    {songname: "Let Me Love You - Justin Beiber", filepath: "audio/1.m4a", coverpath: "images/1.jpg"},
    {songname: "Sia - Unstoppable", filepath: "audio/2.m4a", coverpath: "images/2.jpg"},
    {songname: "Love Me Like You Do - Ellie Goulding", filepath: "audio/3.m4a", coverpath: "images/3.avif"},
    {songname: "Levitating - Dua Lipa", filepath: "audio/4.m4a", coverpath: "images/5.jpg"},
    {songname: "Ed sheeran - Perfect", filepath: "audio/5.m4a", coverpath: "images/7.gif"},
]

songitems.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})

// audioElement.play();

//handle play/pause click
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

//listen to events 
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})

const makeallplays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        makeallplays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `audio/${songindex+1}.m4a`;
        mastersongname.innerText = songs[songindex].songname;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=9){
    songindex =0;
    }
    else{
        songindex+=1;
    }
    audioElement.src = `audio/${songindex+1}.m4a`;
    mastersongname.innerText = songs[songindex].songname;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0){
    songindex =0;
    }
    else{
        songindex-=1;
    }
    audioElement.src = `audio/${songindex+1}.m4a`;
    mastersongname.innerText = songs[songindex].songname;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})