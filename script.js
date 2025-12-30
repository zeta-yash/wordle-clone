///////////////DECIDING THE MAIN WORD/////////////////////

let randomword;
let mainword; // Declare it globally so other functions can use it

async function initGame() {
  try {
    const res = await fetch("valid_solutions.json");
    const data = await res.json();

    const randomword = data.words[Math.floor(Math.random() * data.words.length)];
    mainword = randomword.toUpperCase(); // Set global variable

    // Show the word in the demo element
    const demo = document.querySelector(".demo");
    demo.innerHTML = mainword;

  } catch (err) {
    console.error("Error fetching or processing the data:", err);
  }
  hintMatter()
}

// Call the async function to initialize
initGame();


// mainword = randomword;
let entered_values = []; //no of lines entered
let total_elements = entered_values.length;
//==============================================================
let guessed_places = new Map([ //tells the which position is green now
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0]
]);
let left_positions = [1,2,3,4,5]
let position_update = () => {

  guessed_places.forEach((value, key) => {
    if (value === 0) {
      left_positions.push(key);
    }
  });
  return left_positions;
};
//=================================================================


let inputtxt = document.querySelectorAll(".input")[0];

let hintused = 0;
let toggle = 0;
// this loop gets the values from the elements



function hintMatter(){
  ////HINT TEXT FORMATING//////
let hint_content = document.querySelector(".hint-content");
let random_sample_leftPs = left_positions[Math.floor(Math.random() * left_positions.length)];
hint_content.innerHTML = `Letter ${random_sample_leftPs} is ${mainword[random_sample_leftPs-1]} `;
}



function boxColor(line1) {
  if (!line1) return;

  const letters1 = line1.querySelectorAll("p"); //letter itself
  const boxes = line1.querySelectorAll("span"); //box of the letter


  for (let j = 0; j < letters1.length; j++) {
    const letter = letters1[j].textContent;

    if (letter === mainword[j]) {
      boxes[j].style.backgroundColor = "#028100ff";
      guessed_places.set(j + 1, 1); //set map value 1 for key j-th in guessed palces
      console.log(guessed_places)
      // guessed_places.forEach((value, key) => {
      //   if (value === 0) {
      //     left_positions.push(key);
      //   }})


      } else if (mainword.includes(letter)) {
        boxes[j].style.backgroundColor = "orange";
      } else {
        boxes[j].style.backgroundColor = "gray";
      }


    }

  }


  function execute() { //this code runs for 1 line per execution

    let text = inputtxt.value.toUpperCase();
    const line = document.getElementById(`line${total_elements + 1}`);
    if (!line) return;

    const letters = line.querySelectorAll("p"); //act as line{num} > p

    if (text.length < 5) {
      inputtxt.value = "";
      alert("Only 5 letter words are accepted.")
      return;
    };



    for (let i = 0; i < letters.length; i++) {
      letters[i].textContent = text[i] || "";
      // console.log(i, text[i])
    }


    boxColor(line); //boxColoring command runs on the line which is last executed.
    entered_values.push(text);
    total_elements++;

    inputtxt.value = "";


    if (text === mainword) {
      setTimeout(() => {
        alert(`Congratulations!! You guessed the word in ${total_elements} attempt(s)`);
      }, 500);

    }
    else if (total_elements === 6 && text != mainword) {
      setTimeout(() => {
        alert(`You Lose. The correct word is ${mainword}`)
      }, 500);

    }



  }


  // Execute a function when the user presses a key on the keyboard
  inputtxt.addEventListener("keydown", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Call your custom function or trigger a button click
      // document.getElementById("submitbtn").click();

      execute();
      // console.log("Enter")
    }
  });


  function showhint() {
    
    const hintPanel = document.querySelector(".hint-panel");
    const hintElements = document.querySelectorAll(".hint-content, hr");



    hintElements.forEach(el => {
      setTimeout(() => {
        el.style.display = "block";
      }, 100);

    });

    hintPanel.style.transition = "height 0.3s ease";
    hintPanel.style.height = "5em";

    hintused = 1;
  }

  function toggleTheme(el) {
    if (el.checked) { //Light Mode
      toggle = 1;
      document.documentElement.style.setProperty(
        "--primary-color",
        "#002f2a80"
      );
      document.documentElement.style.setProperty(
        "--bg-image",
        "url(wordle-bg-light-hd.webp)"
      );
      document.documentElement.style.setProperty(
        "--title-color",
        "gold"
      );
    } else {
      document.documentElement.style.setProperty(
        "--primary-color",
        "rgba(0, 145, 120, 0.349)"
      );
      document.documentElement.style.setProperty(
        "--bg-image",
        "url(wordle-bg.webp)"
      );
      document.documentElement.style.setProperty(
        "--title-color",
        "lemonchiffon"
      );
    }
  }





