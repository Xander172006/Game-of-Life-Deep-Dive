import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Homepage({ auth }) {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const [gridState, setGridState] = useState(() => {
        const rows = 15;
        const cols = 35;
        return createEmptyGrid(rows, cols);
    });

    useEffect(() => {
        let gameInterval = null;
        let timerInterval = null;
        let speedOfGame = 300;

        if (isRunning) {
            gameInterval = setInterval(() => {
                setGridState(prevGrid => computeNextGeneration(prevGrid));
            }, speedOfGame); // snelheid van spel 
            
            timerInterval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000); // snelheid van timer deze moet nooit verandere 
        }

        return () => {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
        };
    }, [isRunning]);

    const handleClick = (row, col) => {
        const updatedGrid = gridState.map((r, rowIndex) =>
            r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? 1 - cell : cell))
        );
        setGridState(updatedGrid);
    };

    const handleSubmitGrid = () => {
        fetch('/submit-grid', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify({ grid: gridState }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Grid data submitted:', data);
            })
            .catch(error => console.error('Error submitting grid:', error));
    };

    const loadRandomBoard = () => {
        const rows = gridState.length;
        const cols = gridState[0].length;
        const randomGrid = gridState.map(row => 
            row.map(() => (Math.random() < 0.3 ? 1 : 0))
        );
        setGridState(randomGrid);
    };
    

    const renderGridBoard = () => {
        const rows = gridState.length;
        const cols = gridState[0].length;
        const board = [];

        for (let row = 0; row < rows; row++) {
            const columns = [];
            for (let col = 0; col < cols; col++) {
                const isHighlighted = gridState[row][col] === 1;
                columns.push(
                    <td
                        key={`${row}-${col}`}
                        style={{
                            width: '35px',
                            height: '34px',
                            backgroundColor: isHighlighted ? '#ffffff' : '#000000',
                            border: '1px solid gray',
                        }}
                        onClick={() => handleClick(row, col)}
                    ></td>
                );
            }
            board.push(<tr key={row}>{columns}</tr>);
        }
        return board;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Homepage" />
            <main className="w-full h-[80%] flex flex-col justify-center items-center mx-auto p-0 m-0">
                <section className="w-full h-[70vh] flex justify-center items-center overflow-auto mb-auto">
                    <table className="border-[5px] border-gray-500">
                        <tbody>{renderGridBoard()}</tbody>
                    </table>
                </section>

                <section className="p-11 flex justify-center items-center gap-5">
                    <div>
                        <button
                            className="text-white bg-green-500 px-7 py-3 rounded-xl font-bold text-[1.25rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:bg-green-700 focus:text-gray-200"
                            type="button"
                            onClick={() => setIsRunning(true)}
                        >
                            Play
                        </button>
                    </div>

                    <div>
                        <button
                            className="text-white bg-red-500 px-7 py-3 rounded-xl font-bold text-[1.25rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:bg-red-700 focus:text-gray-200"
                            type="button"
                            onClick={() => setIsRunning(false)}
                        >
                            Stop
                        </button>
                    </div>

                    <div>
                        <p className="text-gray-300">
                            Timer: {`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`}
                        </p>
                    </div>

                    <div>
                        <button
                            className="text-white bg-blue-500 px-7 py-3 rounded-xl font-bold text-[1.25rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:bg-blue-700 focus:text-gray-200"
                            type="button"
                            onClick={handleSubmitGrid}
                        >
                            Submit Grid
                        </button>
                    </div>

                    <div>
                        <button
                            className="text-white bg-purple-500 px-7 py-3 rounded-xl font-bold text-[1.25rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:text-gray-200"
                            type="button"
                            onClick={loadRandomBoard}
                        >
                            Random board
                        </button>
                    </div>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}

function createEmptyGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function computeNextGeneration(grid) {
    const nextGrid = createEmptyGrid(grid.length, grid[0].length);
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const aliveNeighbors = countAliveNeighbors(grid, row, col);
            const isAlive = grid[row][col] === 1;
            nextGrid[row][col] = (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) || (!isAlive && aliveNeighbors === 3) ? 1 : 0;
        }
    }
    return nextGrid;
}

function countAliveNeighbors(grid, row, col) {
    let aliveCount = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const neighborRow = row + i;
            const neighborCol = col + j;
            if (neighborRow >= 0 && neighborRow < grid.length && neighborCol >= 0 && neighborCol < grid[0].length) {
                aliveCount += grid[neighborRow][neighborCol];
            }
        }
    }
    return aliveCount;
}
