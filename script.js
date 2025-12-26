let mainword = "SPACE";
let entered_values = []; //no of lines entered
let total_elements = entered_values.length;
let guessed_places = [0, 0, 0, 0, 0]; //tells the which position is green now
let inputtxt = document.querySelectorAll("input")[0];
let hintused = 0;

// this loop gets the values from the elements

function boxColor(line1) {
    if (!line1) return;

    const letters1 = line1.querySelectorAll("p"); //letter itself
    const boxes = line1.querySelectorAll("span"); //box of the letter

    for (let j = 0; j < letters1.length; j++) {
        const letter = letters1[j].textContent;

        if (letter === mainword[j]) {
            boxes[j].style.backgroundColor = "#028100ff";
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
    }
});


function showhint() {
    const hintPanel = document.querySelector(".hint-panel");
    const hintElements = document.querySelectorAll(".hint-content, hr");

    hintElements.forEach(el => {
        el.style.display = "block";
    });

    hintPanel.style.transition = "height 0.3s ease";
    hintPanel.style.height = "5em";

    hintused = 1;
}

