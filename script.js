// Your script here.
 const synth = window.speechSynthesis;
        let voices = [];

        function populateVoices() {
            voices = synth.getVoices();
            const voiceSelect = document.getElementById('voiceSelect');
            voices.forEach((voice, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${voice.name} (${voice.lang})`;
                voiceSelect.appendChild(option);
            });
        }

        populateVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = populateVoices;
        }

        document.getElementById('startBtn').addEventListener('click', () => {
            const textInput = document.getElementById('textInput').value;
            const utterance = new SpeechSynthesisUtterance(textInput);
            const selectedVoice = voices[document.getElementById('voiceSelect').value];
            utterance.voice = selectedVoice;
            utterance.rate = document.getElementById('rate').value;
            utterance.pitch = document.getElementById('pitch').value;
            synth.speak(utterance);
        });

        document.getElementById('stopBtn').addEventListener('click', () => {
            synth.cancel();
        });