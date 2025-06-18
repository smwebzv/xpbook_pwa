function focusTextInput(elementId) {
  var element = document.getElementById(elementId);
  if (element) {
    element.focus();
  }
}

function isAppInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

document.addEventListener("DOMContentLoaded", async () => {
  let deferredPrompt;
  const installBtnPopover = document.getElementById('install-android-element');
  const installAndroidApp = document.getElementById('android-install-the-app');

  document.getElementById("android-close-button").addEventListener("click", () => {
    installBtnPopover.style.display = 'none';
  });

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (!isAppInstalled()) {
      installBtnPopover.style.display = 'inline-block';
    }

    installAndroidApp.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ User accepted the install prompt');
        } else {
          console.log('❌ User dismissed the install prompt');
          installBtnPopover.style.display = 'none';
        }
        deferredPrompt = null;
      });
    });
  });

  window.addEventListener('appinstalled', () => {
    console.log('✅ App was successfully installed');
    installBtnPopover.style.display = 'none';
  });
});

// document.addEventListener("DOMContentLoaded", async () => {
//   setTimeout(() => {
//     console.log("START SPEEEACCHHH");
//     var SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     // const speechRecognitionList = new SpeechGrammarList();
//     // speechRecognitionList.addFromString(grammar, 1);
//     // recognition.grammars = speechRecognitionList;
//     recognition.continuous = true;
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     document.body.onclick = () => {
//       recognition.start();
//       console.log("Ready to receive a color command.");
//     };

//     recognition.start();

//     recognition.onresult = (event) => {
//       console.log("WHAT ARE RESULTS HERE", event);
//     };
//   }, 2000);
// });
