function focusTextInput(elementId) {
  var element = document.getElementById(elementId);
  if (element) {
    element.focus();
  }
}

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
