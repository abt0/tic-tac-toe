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
    
    // Animation for cell placement
    function animateCellPlacement(cell, player) {
        cell.textContent = player;
        cell.setAttribute('data-player', player);
        cell.style.transform = 'scale(0.5)';
        cell.style.opacity = '0.5';
        
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
            cell.style.opacity = '1';
        }, 50);
    }
    
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
        animateCellPlacement(clickedCell, currentPlayer);
        
        // Check for win or draw
        checkResult();
    }
    
    // Highlight winning cells
    function highlightWinningCells(combination) {
        combination.forEach(index => {
            const cell = document.querySelector(`[data-index="${index}"]`);
            cell.style.backgroundColor = currentPlayer === 'X' ? 'rgba(108, 92, 231, 0.2)' : 'rgba(253, 121, 168, 0.2)';
            cell.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
            cell.style.transform = 'scale(1.05)';
        });
    }
    
    // Check for win or draw
    function checkResult() {
        let roundWon = false;
        let winningCombination = [];
        
        // Check for win
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                winningCombination = [a, b, c];
                break;
            }
        }
        
        // Handle win
        if (roundWon) {
            highlightWinningCells(winningCombination);
            status.textContent = `Player ${currentPlayer} wins! 🎉`;
            status.style.color = currentPlayer === 'X' ? 'var(--primary-color)' : 'var(--secondary-color)';
            gameActive = false;
            return;
        }
        
        // Handle draw
        if (!gameState.includes('')) {
            status.textContent = 'Game ended in a draw! 🤝';
            status.style.color = 'var(--text-color)';
            gameActive = false;
            return;
        }
        
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
        status.style.color = currentPlayer === 'X' ? 'var(--primary-color)' : 'var(--secondary-color)';
    }
    
    // Reset game with animation
    function resetGame() {
        // Add a small animation to the button
        resetButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            resetButton.style.transform = 'scale(1)';
        }, 100);
        
        // Reset the game state with a small delay for visual effect
        setTimeout(() => {
            currentPlayer = 'X';
            gameState = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            status.textContent = `Player ${currentPlayer}'s turn`;
            status.style.color = 'var(--primary-color)';
            
            cells.forEach(cell => {
                cell.textContent = '';
                cell.removeAttribute('data-player');
                cell.style.backgroundColor = 'var(--cell-bg-color)';
                cell.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                cell.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    cell.style.transform = 'scale(1)';
                }, 50);
            });
        }, 200);
    }
    
    // Initialize game
    function initGame() {
        status.style.color = 'var(--primary-color)';
        
        // Event listeners
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
        
        resetButton.addEventListener('click', resetGame);
    }
    
    // Start the game
    initGame();
});
