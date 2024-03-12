let screen = document.getElementById('screen');
let movies = document.querySelectorAll('.movie-list li');
let outerScreen = document.getElementById('outer-screen-frame');
let error = false;
let videoElement;

movies.forEach(function (movie) {
    movie.addEventListener('click', function () {
        let movieName = movie.id;
        screen.innerHTML = '<div id="screen-overlay"></div>' +
            '<video autoplay>' +
            '<source src="vids/' + movieName + '.mp4" type="video/mp4">' +
            '</video>';
        videoElement = screen.querySelector('video');
        setTimeout(function () {
            outerScreen.style.boxShadow = 'none';
        }, 100);
        setTimeout(handleVideoEnd, 30000);
    });
});

function handleVideoEnd() {
    screen.innerHTML = '<div id="screen-overlay" style="background-size: 50% 3px, 30px 50%;"></div><div id="noise-overlay" style="background-color:white;">Too many scratches on the DVD<br>Try another one if you are lucky😉</div>';
    error = true;
}

let power = true;
let btn = document.querySelector('button');
let selectionScreen = document.getElementById('selection-scr');
let noiseOverlay = document.getElementById('noise-overlay');

btn.addEventListener('click', function () {
    if (error == true) {
        location.reload();
        error = false;
    }
    if (power == true) {
        selectionScreen.style.display = 'none';
        screen.style.background = 'black';
        outerScreen.style.boxShadow = 'none';
        if (videoElement) {
            videoElement.pause();
            videoElement.style.visibility = 'hidden';
        }
        power = false;
    }
    else {
        selectionScreen.style.display = 'block';
        screen.style.background = 'linear-gradient(135deg, #3366ff 0%, #000066 100%)';
        outerScreen.style.boxShadow = '-0px 10px 80px #3366ff';
        if (videoElement && !error) {
            videoElement.play();
            videoElement.style.visibility = 'visible';
            outerScreen.style.boxShadow = 'none';
        }
        power = true;
    }
});
