
  
  var quiz = {
    // (A) PROPERTIES 
     // (A1) QUESTIONS & ANSWERS
     // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
     data: [
     {
       q : "Css ni o'rganishdan oldin qanday ko'nikmalarga ega bo;lish kerak",
       o : [
        "Html",
        "Javascript",
        "Bootstrap"
       ],
       a : 0 // arrays start with 0, so answer is 70 meters
     },
     {
       q : "Css HTMLning qaysi qismida asosan joylashdi",
       o : [
         "Link",
         "Body",
         "Head",
         "h1"
       ],
       a : 3
     },
    
    
     ],
   
     // (A2) HTML ELEMENTS
     hWrap: null, // HTML quiz container
     hQn: null, // HTML question wrapper
     hAns: null, // HTML answers wrapper
    
     // (A3) GAME FLAGS
     now: 0, // current question
     score: 0, // current score
    
     // (B) INIT QUIZ HTML
     init: function(){
       // (B1) WRAPPER
       quiz.hwrap = document.getElementById("quizWrap");
       
       // (B2) QUESTIONS SECTION
       quiz.hqn = document.createElement("div");
       quiz.hqn.id = "quizQn";
       quiz.hwrap.appendChild(quiz.hqn);
       
       // (B3) ANSWERS SECTION
       quiz.hans = document.createElement("div");
       quiz.hans.id = "quizAns";
       quiz.hwrap.appendChild(quiz.hans);
       
       // (B4) GO!
       quiz.draw();
     },
   
     // (C) DRAW QUESTION
     draw: function(){
       // (C1) QUESTION
       quiz.hqn.innerHTML = quiz.data[quiz.now].q;
       
       // (C2) OPTIONS
       quiz.hans.innerHTML = "";
       for (let i in quiz.data[quiz.now].o) {
         let radio = document.createElement("input");
         radio.type = "radio";
         radio.name = "quiz";
         radio.id = "quizo" + i;
         quiz.hans.appendChild(radio);
         let label = document.createElement("label");
         label.innerHTML = quiz.data[quiz.now].o[i];
         label.setAttribute("for", "quizo" + i);
         label.dataset.idx = i;
         label.addEventListener("click", quiz.select);
         quiz.hans.appendChild(label);
       }
     },
     
     // (D) OPTION SELECTED
     select: function(){
       // (D1) DETACH ALL ONCLICK
       let all = quiz.hAns.getElementsByTagName("label");
       for (let label of all) {
         label.removeEventListener("click", quiz.select);
       }
    
       // (D2) CHECK IF CORRECT
       let correct = this.dataset.idx == quiz.data[quiz.now].a;
       if (correct) { 
         quiz.score++; 
         this.classList.add("correct");
       } else {
         this.classList.add("wrong");
       }
       // (D3) NEXT QUESTION OR END GAME
       quiz.now++;
       setTimeout(function(){
         if (quiz.now < quiz.data.length) { quiz.draw(); } 
         else {
           quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
           quiz.hAns.innerHTML = "";
         }
       }, 1000);
     }
   };
   window.addEventListener("load", quiz.init);