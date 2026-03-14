function makeTeams() {
    // 1. Grab the names from the input box
    let input = document.getElementById('playerInput').value;
    // 2. Turn that long string into a list (Array). We tell it to "split" every time it sees a comma
    let playerList = input.split(',');
    // 3. Show us what we got in the "Console"
    console.log(playerList);
    // This loop starts at the end of the list and works backward
    if (playerList.length % 2 !== 0) {
        alert("Oops! You need an even number of players for doubles.");
        return; // This tells the computer: "Stop right here! Don't do any more work."
    }
    for (let i = playerList.length - 1; i > 0; i--) {
        // 1. Pick a random "spot" in the list
        let j = Math.floor(Math.random() * (i + 1)); 
        // 2. Swap the person at spot 'i' with the person at spot 'j'
        // Like swapping two cards in your hand
        let temp = playerList[i];
        playerList[i] = playerList[j];
        playerList[j] = temp;
    }

    // let outputText = ""; // A fresh jar to hold our team sentences

    // for (let i = 0; i < playerList.length; i += 2) {
    //     let teamNum = (i / 2) + 1;
    //     // We combine the names into a nice sentence
    //     outputText += "Team " + teamNum + ": " + playerList[i] + " - " + playerList[i+1] + "<br>";
    // }
    let outputHTML = ""; // We'll store all our boxes here

    for (let i = 0; i < playerList.length; i += 2) {
        let teamNum = (i / 2) + 1;
        
        // We create a "box" string for each team
        outputHTML += `
            <div class="team-card">
                <span><strong>Team ${teamNum}</strong></span>
                <span>${playerList[i]} & ${playerList[i+1]}</span>
            </div>
        `;
    }

    document.getElementById('teamResults').innerHTML = outputHTML;

    // Finally, pour the jar into the bucket on the screen
    document.getElementById('teamResults').innerHTML = outputText;        
}