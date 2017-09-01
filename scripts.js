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

// implement speed up (likely using vidya.playbackRate)

// implement volume? (.volume a double from 0.0 muted to 1.0 loudest)