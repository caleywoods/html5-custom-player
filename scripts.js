const vidya    = document.querySelector('.player__video');
const controls = document.querySelector('.player__controls');
const playBtn  = document.querySelector('.player__button');


playBtn.onclick = () => {
    // only play returns a promise, pause does not.
    if ( vidya.classList.contains('playing') ) {
        vidya.pause();
        vidya.classList.remove( 'playing' );
    } else {
        vidya.play().then(() => {
            // Anything in here is called after the promise is fulfilled
            vidya.classList.add( 'playing' );
        });
    }
}