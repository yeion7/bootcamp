const KEY =
  'trnsl.1.1.20180112T221056Z.8848e1e6254f8c7f.468f6bce14fd29c322f486cb49c9fd9d1dde7276';

const translateText = text =>
  fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${KEY}&text=${text}&lang=es-en`,
  )
    .then(response => response.json())
    .then(response => response.text);

const synth = window.speechSynthesis;
const makeUtter = text => {
  const a = new SpeechSynthesisUtterance(text);
  a.voice = speechSynthesis.getVoices()[8];

  return a;
};

document.addEventListener('DOMContentLoaded', function(event) {
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const recordSignal = document.getElementById('recordSignal');
  const originTextArea = document.getElementById('origin');
  const translateTextArea = document.getElementById('translate');

  const play = document.getElementById('play');
  const pause = document.getElementById('pause');

  const recordSection = document.getElementById('record');
  const transcriptSection = document.getElementById('transcript');
  const speakSection = document.getElementById('speak');

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'es-CO';

  const text = makeUtter('');

  recognition.onresult = async function(event) {
    const content = event.results[0][0].transcript.toLocaleLowerCase();
    const traduccion = await translateText(content);
    originTextArea.innerText = content;

    translateTextArea.innerText = traduccion[0];

    if (event.results[0].isFinal) {
      text = makeUtter(event.results[0][0].transcript);
    }
  };

  recognition.onaudiostart = function(event) {
    recordSignal.hidden = false;
  };

  recognition.onaudioend = function(event) {
    recordSignal.hidden = true;
  };

  start.addEventListener('click', e => {
    e.preventDefault();
    recognition.start();

    transcriptSection.hidden = false;
    start.disabled = true;
    stop.disabled = false;
  });

  stop.addEventListener('click', e => {
    e.preventDefault();
    recognition.stop();

    transcriptSection.hidden = false;
    start.disabled = false;
    stop.disabled = true;
    speak.hidden = false;
  });

  play.addEventListener('click', e => {
    console.log(synth);
    pause.hidden = false;

    if (synth.speaking) {
      synth.resume();
    } else {
      synth.speak(text);
    }
  });

  pause.addEventListener('click', e => {
    synth.pause();
  });
});
