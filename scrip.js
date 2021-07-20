"use strict";

const musicContaniner = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContaniner = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

//Titulos musicas

const songs = ["beatbox", "brunomars", "charliejr"];

//Manter o controle das músicas

let songIndex = 1;

//Initially load song info DOM

loadSong(songs[songIndex]);

//update song details

function loadSong(song) {
  title.innerHTML = song;
  audio.src = `audio/${song}.mp3`;
  cover.src = `imagens/${song}.jpg`;
}

function playSong() {
  musicContaniner.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContaniner.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function upDateProgress(e) {
  /* console.log(e.srcElement.duration); */
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

///Event listeners

playBtn.addEventListener("click", () => {
  const isPlaying = musicContaniner.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Change song events

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//avançar musica

audio.addEventListener("timeupdate", upDateProgress);
progressContaniner.addEventListener("click", setProgress);

//tocar a proxima musica
audio.addEventListener("ended", nextSong);
