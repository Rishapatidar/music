console.log("Welcome to Spotify");

let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay'); 
let myProgressBar = document.getElementById('myProgressBar'); 
let gif = document.getElementById('gif'); 
let songitems = Array.from(document.getElementsByClassName('songitem'));


let songs = [
    { songName: "salam-e-Ishq", filepath:"songs/1.mp3", coverpath:"covers/1.jpg" },
    { songName: "-e-Ishq", filepath:"songs/2.mp3", coverpath:"covers/2.jpg" },
    { songName: "-Ishq", filepath:"songs/3.mp3", coverpath:"covers/3.jpg" },
    { songName: "Ishq2", filepath:"songs/4.mp3", coverpath:"covers/4.jpg" },
    { songName: "salam", filepath:"songs/5.mp3", coverpath:"covers/5.jpg" },
    { songName: "salam-e-", filepath:"songs/6.mp3", coverpath:"covers/6.jpg" },
    { songName: "salam2", filepath:"songs/7.mp3", coverpath:"covers/7.jpg" },
    { songName: "-e-", filepath:"songs/8.mp3", coverpath:"covers/8.jpg" },
    { songName: "e2", filepath:"songs/9.mp3", coverpath:"covers/9.jpg" },
    { songName: "salam-e-Ishq2", filepath:"songs/10.mp3", coverpath:"covers/10.jpg" }
];

songitems.forEach((element, i) => {
    let imgTag = element.getElementsByTagName('img')[0];
    let songNameTag = element.getElementsByClassName('songName')[0];

    if (imgTag) {
        imgTag.src = songs[i].coverpath; // Set correct cover path
        imgTag.style.opacity = 1; // Make sure the image is visible
    }
    if (songNameTag) {
        songNameTag.innerText = songs[i].songName; // Set correct song name
    }
});


// Play/Pause Functionality
masterplay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Update Progress Bar
audioElement.addEventListener('timeupdate', ()=> {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
     myProgressBar.value = progress;
});

// Change Song Time on Progress Bar Change
myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});
  
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach ((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
           
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach ((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        console.log(e.target)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = 'songs/3.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
    })
})



// Function to play the next song when the current one ends
audioElement.addEventListener('ended', () => {
    if (songindex < songs.length - 1) {
        songindex++; // Move to the next song
    } else {
        songindex = 0; // If last song, loop back to the first song
    }
    audioElement.src = songs[songindex].filepath; // Set new song
    audioElement.play(); // Play the new song
    updateUI(); // Update UI for the new song
});

// Function to update UI when song changes
const updateUI = () => {
    document.getElementById('gif').style.opacity = 1; // Show gif when playing
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
};

document.querySelector('.fa-forward').addEventListener('click', () => {
    if (songindex < songs.length - 1) {
        songindex++;
    } else {
        songindex = 0;
    }
    audioElement.src = songs[songindex].filepath;
    audioElement.play();
    updateUI();
});

document.querySelector('.fa-backward').addEventListener('click', () => {
    if (songindex > 0) {
        songindex--;
    } else {
        songindex = songs.length - 1;
    }
    audioElement.src = songs[songindex].filepath;
    audioElement.play();
    updateUI();
});
