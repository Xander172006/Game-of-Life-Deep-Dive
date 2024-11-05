export const handleSubmitGrid = (gridState) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch('/submit-grid', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
        },

        body: JSON.stringify({ 
            grid: gridState,
            name: document.querySelector('input[name="name-board"]').value
        }),
    })

    .then(response => response.json())
    .then(data => console.log('Grid data submitted:', data))
    .catch(error => console.error('Error submitting grid:', error));
};


// load random board
export const loadRandomBoard = (gridState, setGridState) => {
    const randomGrid = gridState.map(row => 
        // use formula
        row.map(() => (Math.random() < 0.3 ? 1 : 0))
    );
    setGridState(randomGrid);
};


// load selected board
export const loadSelectedBoard = (board, setGridState, setShowSavedBoards) => {
    const parsedGrid = JSON.parse(board.grid);
    setGridState(parsedGrid);
    setShowSavedBoards(false);
};