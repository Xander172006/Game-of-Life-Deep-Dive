import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Homepage({ auth }) {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const initialGridState = () => {
        const rows = 18;
        const cols = 30;
        return Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => 0)
        );
    };

    const [gridState, setGridState] = useState(() => {
        const rows = 18;
        const cols = 30;
        return createEmptyGrid(rows, cols);
    });


    useEffect(() => {
        let gameInterval = null;
        let timerInterval = null;

        if (isRunning) {
            gameInterval = setInterval(() => {
                setGridState(prevGrid => computeNextGeneration(prevGrid));
            }, 300);
            
            timerInterval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
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


    const loadBoard = () => {
        const hardcodedBoard = [
            [0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0],
            [1,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,1,0],
            [0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,1,1,0,0,0,0,1,0,0],
            [0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0],
            [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0],
            [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,1,0],
            [0,0,0,0,1,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1],
            [0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0],
            [0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0],
            [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0],
            [0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0]
        ];
        setGridState(hardcodedBoard);
    };


    const handleStop = () => {
        setIsRunning(false);
        setTimer(0);
        setGridState(initialGridState());
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
            <main className="w-[90%] h-full flex flex-row-reverse justify-center items-center mx-auto p-0 m-0">
                <section className="w-full h-[90vh] flex flex-col justify-center items-center overflow-auto mb-auto">
                    <div className='mr-auto my-2'>
                        <p className='text-gray-300'>Timer: {`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`}</p>
                    </div>
                    <div>
                        <table className="border-[5px] border-gray-500">
                            <tbody>
                                {renderGridBoard()}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className='p-4 grid place-items-start place-content-start items-start grid-cols-1 gap-5 mt-[2.5%] w-[35%] mr-[5%] mb-auto'>
                    <h3 className='text-white font-bold font-playfull text-[1.5rem]'>Start game</h3>
                    <div className='w-full flex justify-start items-start gap-4 mt-[2%]'>
                        <div>
                            <button 
                                className={`text-white ${isRunning ? 'bg-orange-600' : 'bg-green-500'} px-5 bg-opacity-30 border-green-400 border-[1px] py-2 rounded-md font-bold text-[0.85rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:bg-green-700 focus:text-gray-200 font-pixelify`} 
                                type="button"
                                onClick={() => setIsRunning(!isRunning)}
                            >
                                {isRunning ? 'Pause' : 'Play'}
                            </button>
                        </div>

                        <div>
                            <button 
                                className="text-white bg-red-500 px-5 py-2 bg-opacity-30 border-red-400 border-[1px] rounded-md font-bold text-[0.85rem] hover:scale-[1.1] font-pixelify transition-all duration-300 ease-in-out focus:bg-red-700 focus:text-gray-200" 
                                type="button"
                                onClick={handleStop}
                            >
                                Stop
                            </button>
                        </div>
                    </div>

                    <h4 className='text-white font-bold font-playfull text-[1rem] mt-5'>Options</h4>
                    <div className='flex justify-center items-start gap-4'>
                        <div>
                            
                            <button
                                className="text-white font-pixelify bg-gray-500 bg-opacity-40 border-slate-400 border-[1px] px-5 py-2 rounded-md font-bold text-[0.85rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:text-gray-200 "
                                type="button"
                                onClick={loadRandomBoard}
                            >
                                Random board
                            </button>
                        </div>
                        <div>
                            <button
                                className="text-white font-pixelify bg-gray-500 bg-opacity-40 border-slate-400 border-[1px] px-5 py-2 rounded-md font-bold text-[0.85rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:text-gray-200"
                                type="button"
                                onClick={loadBoard}
                            >
                                Load Board
                            </button>
                        </div>
                    </div>

                    <h4 className='text-white font-bold font-playfull text-[1rem] mt-5'>Save</h4>
                    <div className='flex justify-center items-center gap-4'>
                        <div>
                            <label htmlFor=""></label>
                            <input type="text" className='w-full bg-gray-800 text-white' />
                        </div>

                        <div className='w-[50%]'>
                            <button 
                                className="text-white w-full font-pixelify bg-blue-500 bg-opacity-30 border-sky-300 border-[1px] px-5 py-[0.6rem] rounded-md font-bold text-[0.9rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:bg-blue-700 focus:text-gray-200" 
                                type="button"
                                onClick={handleSubmitGrid}
                            >
                                Submit Grid
                            </button>
                        </div>
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