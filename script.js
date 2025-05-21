document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const resetButton = document.querySelector('.reset');
    
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    // Handle cell click
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        // Check if cell is already filled or game is not active
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Update game state
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        // Check for win or draw
        checkResult();
    }
    
    // Check for win or draw
    function checkResult() {
        let roundWon = false;
        
        // Check for win
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }
        
        // Handle win
        if (roundWon) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            // Highlight winning cells
            for (let i = 0; i < winningConditions.length; i++) {
                const [a, b, c] = winningConditions[i];
                if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                    document.querySelector(`[data-index='${a}']`).classList.add('winning-cell');
                    document.querySelector(`[data-index='${b}']`).classList.add('winning-cell');
                    document.querySelector(`[data-index='${c}']`).classList.add('winning-cell');
                    break; 
                }
            }
            return;
        }
        
        // Handle draw
        if (!gameState.includes('')) {
            status.textContent = 'Game ended in a draw!';
            gameActive = false;
            return;
        }
        
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
    
    // Reset game
    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell'); // Remove winning-cell class
        });
    }
    
    // Event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    resetButton.addEventListener('click', resetGame);
});
