let startRecording;
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recon = new webkitSpeechRecognition();
recon.interimResults = true;
recon.continuous = true;
recon.lang = 'ru-RU';
reset();
recon.onend = reset();

recon.onresult = function(event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            textarea.value += event.results[i][0].transcript;
        }
    }
}

function reset() {
    startRecording = false;
}


function toggleStartStopRu() {
    if (startRecording) {
        recon.stop();
        reset();
    } else {
        recon.start();
        startRecording = true;
    }
}