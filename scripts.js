const vidya       = document.querySelector('.player__video');
const controls    = document.querySelector('.player__controls');
const playBtn     = document.querySelector('.player__button');
const skipButtons = document.querySelectorAll('[data-skip]');
const bahdy       = document.querySelector( 'body' ); // that's how John Mayer would say it.

// TODO here, can we show a pause graphic instead of play symbol?
playBtn.onclick = () => {
    if ( vidya.classList.contains('playing') ) {
        vidya.pause();
        vidya.classList.remove( 'playing' );
        /* turn the lights down for the attraction */
        bahdy.style.backgroundColor = '#2f2f2f';
    } else {
        vidya.play()
            .then(() => {
                // Anything in here is called after the promise is fulfilled
                vidya.classList.add( 'playing' );
                /* bring the lights up slowly */
                bahdy.style.backgroundColor = '#000';
            })
            .catch((err) => {
                console.log( err );
            });
    }
}

skipButtons.onclick = () => {
    console.log( 'haerawer' );
}

skipButtons[0].onclick = () => {
    console.log('test');
}



/* <video> element is and HTMLVideoElement which inherits from HTMLMediaElement
 * HTMLMediaElement contains a currentTime property which indicates the current playback time in seconds
 * can probably use this for seeking by calling .currentTime() += <value of data-skip seconds>
 *
 * May want to do a check for duration to make sure adding 25 seconds doesn't exceed it, not sure how that is
 * handled. May not be needed.
 *
 * method exists called fastSeek() that takes you to a given time
 */

// implement skip ahead -- seekable / seeking (bool)
/* seekable returns a TimeRange object that contains the time ranges a user is able to seek to */

// implement skip back

// implement speed up (likely using vidya.playbackRate)

// implement volume? (.volume a double from 0.0 muted to 1.0 loudest)