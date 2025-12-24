let mainword = "SPACE";
let entered_values = [];
let total_elements = entered_values.length
let inputtxt = document.querySelectorAll("input")[0];

// this loop gets the values from the elements

function boxColor(line1) {
    if (!line1) return;

    const letters1 = line1.querySelectorAll("p");
    const boxes = line1.querySelectorAll("span");

    for (let j = 0; j < letters1.length; j++) {
        const letter = letters1[j].textContent;

        if (letter === mainword[j]) {
            boxes[j].style.backgroundColor = "green";
        } else if (mainword.includes(letter)) {
            boxes[j].style.backgroundColor = "gold";
        } else {
            boxes[j].style.backgroundColor = "gray";
        }


    }
}


function execute() {

    let text = inputtxt.value.toUpperCase();
    const line = document.getElementById(`line${total_elements + 1}`);
    if (!line) return;

    const letters = line.querySelectorAll("p");

    if (text.length < 5) {
        inputtxt.value = "";
        alert("Only 5 letter words are accepted.")
        return;
    };



    for (let i = 0; i < letters.length; i++) {
        letters[i].textContent = text[i] || "";
    }


    boxColor(line);
    entered_values.push(text);
    total_elements++;

    inputtxt.value = "";


    if (text === mainword) {
        alert(`Congratulations!! You guessed the word in ${total_elements} attempt(s)`);
    }
    else if (total_elements === 6 && text != mainword) {
        alert(`You Lose. The correct word is ${mainword}`)
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