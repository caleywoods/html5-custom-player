const vidya          = document.querySelector( '.player__video' );
const controls       = document.querySelector( '.player__controls' );
const playBtn        = document.querySelector( '.player__button' );
const skipButtons    = document.querySelectorAll( '[data-skip]' );
const bahdy          = document.querySelector( 'body' ); // that's how John Mayer would say it.
const playBackSlider = document.querySelector( '[name="playbackRate"]' );
const volumeSlider   = document.querySelector( '[name="volume"]' );
const fullscreen     = document.querySelector( '[name="fullscreen"]' );
const progress       = document.querySelector( '.progress' );
const progressBar    = document.querySelector( '.progress__filled' );

function updateProgress() {
  const percent  = (vidya.currentTime / vidya.duration) * 100 
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  /* e x axis offset is what position the mouse cursor is on the progress div
   * in pixels, divide by the width of the progress div in pixels to give us
   * a decimal percentage (0 to 1) of how far down the progress div the scrub
   * is happening. Multiply by video duration which is in seconds to give us
   * the appropriate number of seconds to send the video to. */
  const scrubTime   = (e.offsetX / progress.offsetWidth) * vidya.duration;
  vidya.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

vidya.addEventListener('timeupdate', updateProgress);

function playPause(e) {
  if ( vidya.classList.contains('playing') ) {
    vidya.pause();
    vidya.classList.remove( 'playing' );

    if ( e.target.nodeName === 'VIDEO' ) {
      playBtn.innerText = '►';
    } else {
      e.target.innerText = '►';
    }

    /* turn the lights down for the attraction */
    bahdy.style.backgroundColor = '#2f2f2f';
  } else {
    vidya.play()
      .then(() => {
        // Anything in here is called after the promise is fulfilled
        if ( e.target.nodeName === 'VIDEO' ) {
          playBtn.innerText = '❚ ❚';
        } else {
          e.target.innerText = '❚ ❚';
        }

        vidya.classList.add( 'playing' );
        /* bring the lights up slowly */
        bahdy.style.backgroundColor = '#000';
      })
      .catch((err) => {
        console.log( err );
      });
  }
}

playBtn.onclick = (e) => { playPause(e) };

vidya.onclick = (e) => { playPause(e) };

/**
 * We're binding to oninput, onchange only fires one time no matter how
 * far forward or backwards the user dragged the input and we need an event per
 * defined step of the el
 */
playBackSlider.oninput = function() {
  vidya.playbackRate = this.value;
}

volumeSlider.oninput = function() {
  vidya.volume = this.value;
}

fullscreen.onclick = () => {vidya.webkitRequestFullscreen()};

/**
 * since this is a function expression it must be defined prior to setting it 
 * as the callback for the onclick event of the skip buttons. This doesn't get
 * hoisted like a function declaration would.
 *
 * Also, using an arrow function here causes 'this' not to be bound so instead
 * of being able to use 'this' to refer to our button element all we get is the
 * MouseEvent, I knew this but this was a good reinforcement.
 *
 * You can get more succinct with:
 * const skiperino = function() {vidya.currentTime += parseFloat(this.dataset.skip);}
 * 
 * or lose the function expression all together and go with a declaration
 */
const skiperino = (e) => {
  let seconds     = e.target.dataset.skip;

  vidya.currentTime += parseFloat( seconds );
}

/**
 * this works to give each of the skip buttons an onclick event for handling
 * skipping the video. skipButtons is a NodeList and the documentation
 * mentions doing NodeList.prototype.addEventListener to attach an event
 * listener to each item in the NodeList though. Although I like this idea
 * since it reminds me of monkey patching in Ruby I don't think we should do it
 * in JS because every current or future NodeList would have that event
 * listener bound to it, even in other libraries because of prototypal inheritance.
 */
for ( let button of skipButtons ) {
  button.onclick = skiperino;
}