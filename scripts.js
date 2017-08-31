const vidya    = document.querySelector('.player__video');
const controls = document.querySelector('.player__controls');
const playBtn  = document.querySelector('.player__button');


playBtn.onclick = () => {
    //Play and Pause return promises, can we do something neat with that?
    /* documentation seems to say that promises natively support then,
     * I suppose it's fair to say that we only want to remove the playing
     * class if the pause was successful?
     */
    if ( vidya.classList.contains('playing') ) {
        vidya.pause();
        vidya.classList.remove( 'playing' );
    } else {
        vidya.play();
        vidya.classList.add( 'playing' );
    }

    console.log( vidya.classList );
}