import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Homepage({ auth }) {
    // define the timer state
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // update timer function
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


    // set up the grid board
    const renderGridBoard = () => {
        const board = [];
        const rows = 15;
        const cols = 35;

        const handleClick = (row, col) => {
            // send post request to the server
            fetch('/receive-field', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                // send json data
                body: JSON.stringify({
                    row: row,
                    col: col,
                }),
            })
                // receive response
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error fetching boards:', error));
        };

        // create the grid board
        for (let row = 1; row <= rows; row++) {
            const columns = [];
            for (let col = 1; col <= cols; col++) {
                const total = row + col;
                const isBlack = total % 2 === 0;
                columns.push(
                    <td
                        key={`${row}-${col}`}
                        style={{
                            width: '35px',
                            height: '34px',
                            backgroundColor: isBlack ? '#000' : '#000',
                            border: '1px solid gray',
                            transition: 'background-color 0.5s ease',
                        }}

                        // hover effect 
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#404040';
                            setTimeout(() => {
                                e.target.style.backgroundColor = isBlack ? '#000' : '#000';
                            }, 400);
                        }}

                        // click effect
                        onClick={(e) => {
                            // send request
                            handleClick(row, col);

                            // Change the color on click
                            e.target.style.backgroundColor = '#cccccc';
                            setTimeout(() => {
                                e.target.style.backgroundColor = isBlack ? '#000' : '#000';
                            }, 1000); 
                        }}
                    ></td>
                );
            }
            board.push(<tr key={row}>{columns}</tr>);
        }
        return board;
    };


    // play button handler
    const handlePlayClick = () => {
        console.log('Play button clicked');
        setTimer(0);
        setIsRunning(true);
    };

    // stop button handler
    const handleStopClick = () => {
        setIsRunning(false);
    };

    // time formatting
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
                            onClick={handlePlayClick} // Attach the click handler here
                        >
                            Play
                        </button>
                    </div>

                    <div>
                        <button 
                            className="text-white bg-red-500 px-7 py-3 rounded-xl font-bold text-[1.25rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:bg-red-700 focus:text-gray-200" 
                            type="button"
                            onClick={handleStopClick} // Stop the timer
                        >
                            Stop
                        </button>
                    </div>

                    <div>
                        <p className='text-gray-300'>Timer: {formatTime(timer)}</p>
                    </div>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}
