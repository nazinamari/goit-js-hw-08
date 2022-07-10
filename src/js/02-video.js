import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const localStorage = 'videoplayer-current-time';

const onPlay = function (data) {
  localStorage.setItem(localStorage, data.seconds);

  console.log(localStorage.getItem(localStorage));
};

setCurrentTime();

function setCurrentTime() {
  if (!localStorage.getItem(localStorage)) {
    return;
  }
  player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY));
}

player.on('timeupdate', throttle(onPlay, 1000));