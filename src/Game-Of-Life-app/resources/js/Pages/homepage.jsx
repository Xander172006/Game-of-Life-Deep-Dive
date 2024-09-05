import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Homepage({ auth }) {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Grid state (15 rows x 35 cols, all set to 0 initially)
    const [gridState, setGridState] = useState(() => {
        const rows = 15;
        const cols = 35;
        return Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => 0)
        );
    });

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        } else if (!isRunning && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, timer]);

    const handleClick = (row, col) => {
        const updatedGrid = gridState.map((r, rowIndex) =>
            r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? 1 - cell : cell))
        );
        setGridState(updatedGrid);
    };

    const handleSubmitGrid = () => {
        // Send the grid state to the backend via POST request
        fetch('/submit-grid', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify({
                grid: gridState, // Send the gridState (2D array)
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Grid data submitted:', data);
            })
            .catch(error => console.error('Error submitting grid:', error));
    };

    const renderGridBoard = () => {
        const rows = 15;
        const cols = 35;
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
                        <tbody>
                            {renderGridBoard()}
                        </tbody>
                    </table>
                </section>

                <section className='p-11 flex justify-center items-center gap-5'>
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
                        <p className='text-gray-300'>Timer: {`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`}</p>
                    </div>

                    {/* New button to submit grid */}
                    <div>
                        <button 
                            className="text-white bg-blue-500 px-7 py-3 rounded-xl font-bold text-[1.25rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:bg-blue-700 focus:text-gray-200" 
                            type="button"
                            onClick={handleSubmitGrid}
                        >
                            Submit Grid
                        </button>
                    </div>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}
