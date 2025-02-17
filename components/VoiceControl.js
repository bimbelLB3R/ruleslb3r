// import { MicrophoneIcon } from "@heroicons/24/outline";
export default function VoiceControl() {
    const startListening = () => {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.lang = "id-ID";
      recognition.start();
  
      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log("Perintah:", command);
  
        if (command.includes("buka absen")) {
          window.open("http://192.168.100.129/aplikasibimbel2/public/data_tentor/", "_blank");
        } else if (command.includes("buka program")) {
          window.open("https://www.bimbellb3r.com/layanan", "_blank");
        } else {
          alert("Perintah tidak dikenali.");
        }
      };
    };
  
    return (
      <div className="fixed bottom-12 left-8 md:bottom-12 md:left-12 z-20">
        <button onClick={startListening} className="p-3 rounded-full bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/>
</svg>
        </button>
      </div>
    );
  }
  