// Lyrics to complete
const lyrics = {
    '你是我的眼': ['你', '是', '我的', '眼'],
    '我应该在车底': ['我', '应该', '在', '车底'],
    '九妹九妹漂亮的妹妹': ['九妹', '九妹', '漂亮的', '妹妹']
};

let fallingWords = [];
let completedLyrics = 0;
let currentLyric = [];
let currentLyricName = null;

// Create the game area and display area
const gameArea = document.getElementById('gameArea');
const displayArea = document.getElementById('displayArea');

// Function to create a word element
function createWordElement(word, lyricName) {
    const wordElement = document.createElement('div');
    wordElement.className = 'word';
    wordElement.textContent = word;
    wordElement.style.left = `${Math.random() * 90}%`; // Random horizontal position
    wordElement.style.top = '0';
    
    gameArea.appendChild(wordElement);
    
    // Word falling logic
    let interval = setInterval(() => {
        wordElement.style.top = `${parseInt(wordElement.style.top) + 1}px`;
        if (parseInt(wordElement.style.top) > window.innerHeight - 100) {
            gameArea.removeChild(wordElement);
            clearInterval(interval);
        }
    }, 50); // Adjust speed of falling here

    // Click event for selecting the word
    wordElement.addEventListener('click', () => {
        if (!currentLyricName) {
            currentLyricName = lyricName; // Set the lyric being formed
        }

        if (currentLyricName === lyricName) {
            currentLyric.push(word);
            displayArea.textContent = currentLyric.join(' ');
            
            // Check if lyric is completed
            if (currentLyric.length === lyrics[lyricName].length) {
                alert(`Completed: ${currentLyric.join(' ')}`);
                completedLyrics += 1;
                currentLyric = [];
                currentLyricName = null;
                displayArea.textContent = '';
                
                // Check if the game is won
                if (completedLyrics === 3) {
                    alert('You win!');
                    resetGame();
                }
            }
        } else {
            // Reset if the player starts another lyric
            currentLyric = [word];
            currentLyricName = lyricName;
            displayArea.textContent = word;
        }

        // Remove the clicked word
        gameArea.removeChild(wordElement);
        clearInterval(interval);
    });
}

// Function to randomly drop words
function dropRandomWords() {
    const lyricNames = Object.keys(lyrics);
    const randomLyric = lyricNames[Math.floor(Math.random() * lyricNames.length)];
    const randomWord = lyrics[randomLyric][Math.floor(Math.random() * lyrics[randomLyric].length)];
    
    createWordElement(randomWord, randomLyric);
}

// Start dropping words at intervals
function startGame() {
    setInterval(dropRandomWords, 1000); // 1 word per second
}

// Reset the game
function resetGame() {
    completedLyrics = 0;
    currentLyric = [];
    currentLyricName = null;
    displayArea.textContent = '';
    gameArea.innerHTML = ''; // Clear all words
}

// Start the game
startGame();