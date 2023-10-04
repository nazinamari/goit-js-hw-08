import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const player = new Player(document.querySelector('#vimeo-player'));
const VIDEO_CURR_TIME = 'videoplayer-current-time';

if (localStorage.getItem(VIDEO_CURR_TIME)) {
  player
    .setCurrentTime(JSON.parse(localStorage.getItem(VIDEO_CURR_TIME)))
    .catch(error => {
      switch (error.name) {
        case 'RangeError':
          console.error(
            'The time was less than 0 or greater than the video’s duration.'
          );
          player.setCurrentTime(0);
          break;
        
        default:
          console.error(error.name);
          break;
      }
  })
}

player.on(
  'timeupdate',
  throttle(e => {
    localStorage.setItem(VIDEO_CURR_TIME, e.seconds);
  }, 1000)
);
