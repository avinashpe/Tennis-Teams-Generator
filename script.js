/**
 * Doubles: Generates random pairs from a single list
 */
function makeTeams() {
    // 1. Grab raw input
    let input = document.getElementById('playerInput').value;
    
    // 2. Clean data: Split by comma, trim whitespace, and remove empty entries
    let rawList = input.split(',').map(name => name.trim()).filter(name => name !== "");

    // 3. De-duplication: Remove repeated names
    let playerList = [...new Set(rawList)];

    // 4. Feedback: Tell user if duplicates were removed
    if (playerList.length < rawList.length) {
        alert("Duplicate names detected and removed!");
    }

    // 5. Security Guard: Check for even numbers
    if (playerList.length % 2 !== 0) {
        alert("Oops! You need an even number of players for doubles.");
        return; 
    }

    // 6. Processing: Shuffle the unique list
    shuffle(playerList);

    // 7. Painter: Build the HTML cards
    let outputHTML = ""; 
    for (let i = 0; i < playerList.length; i += 2) {
        let teamNum = (i / 2) + 1;
        outputHTML += `
            <div class="team-card">
                <span><strong>Team ${teamNum}</strong></span>
                <span>${playerList[i]} & ${playerList[i+1]}</span>
            </div>
        `;
    }

    // 8. Output: Display results in the bucket
    document.getElementById('teamResults').innerHTML = outputHTML;
}

/**
 * Mixed Doubles: Pairs 1 Player from Grade A with 1 Player from Grade B
 */
function makeMixedTeams() {
    // 1. Grab and clean both lists
    let rawA = document.getElementById('gradeAInput').value.split(',').map(name => name.trim()).filter(name => name !== "");
    let rawB = document.getElementById('gradeBInput').value.split(',').map(name => name.trim()).filter(name => name !== "");

    // 2. De-duplication for each list
    let listA = [...new Set(rawA)];
    let listB = [...new Set(rawB)];

    // 3. Security Guard: Check for equal group sizes
    if (listA.length !== listB.length) {
        alert(`Uneven Groups! You have ${listA.length} A-Grade and ${listB.length} B-Grade players. They must be equal!`);
        return;
    }

    // 4. Cross-Check: Ensure no one is in BOTH lists
    let crossOver = listA.filter(name => listB.includes(name));
    if (crossOver.length > 0) {
        alert("Error: " + crossOver.join(", ") + " cannot be in both A and B lists!");
        return;
    }
    
    // 5. Processing: Shuffle both lists separately
    shuffle(listA);
    shuffle(listB);

    // 6. Painter: Pair them up 1-to-1
    let outputHTML = "";
    for (let i = 0; i < listA.length; i++) {
        outputHTML += `
            <div class="team-card">
                <span><strong>Mixed Team ${i + 1}</strong></span>
                <span>${listA[i]} (A) & ${listB[i]} (B)</span>
            </div>
        `;
    }
    document.getElementById('teamResults').innerHTML = outputHTML;
}

/**
 * UI NAVIGATION: Switches between Normal and Mixed sections
 */
function showTab(mode) {
    // 1. Get references to the buttons and sections
    const normalBtn = document.getElementById('normalBtn');
    const mixedBtn = document.getElementById('mixedBtn');
    const normalSec = document.getElementById('normalSection');
    const mixedSec = document.getElementById('mixedSection');

    if (mode === 'normal') {
        // Show Normal, Hide Mixed
        normalSec.style.display = 'block';
        mixedSec.style.display = 'none';
        
        // Update Button Highlighting
        normalBtn.classList.add('active');
        mixedBtn.classList.remove('active');
    } else {
        // Show Mixed, Hide Normal
        normalSec.style.display = 'none';
        mixedSec.style.display = 'block';
        
        // Update Button Highlighting
        mixedBtn.classList.add('active');
        normalBtn.classList.remove('active');
    }
    
    // Clear results when switching
    document.getElementById('teamResults').innerHTML = "";
}

/**
 * HELPER TOOL: Randomizes any array (Fisher-Yates Shuffle)
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}