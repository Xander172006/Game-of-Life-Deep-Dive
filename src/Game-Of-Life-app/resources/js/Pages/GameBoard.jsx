import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import GridComponent from '@/Components/GameOfLife/GridComponent';
import ControlsComponent from '@/Components/GameOfLife/ControlsComponent';
import SavedBoardsComponent from '@/Components/GameOfLife/SavedBoardsComponent';
import useMouseEvents from '@/Components/GameOfLife/MouseEventsComponent';
import { handleSubmitGrid, loadRandomBoard, loadSelectedBoard } from '@/Components/GameOfLife/RequestComponents';
import { createEmptyGrid, computeNextGeneration } from '@/Components/GameOfLife/GameBoardHelpers';

export default function Homepage({ auth, savedBoards }) {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showSavedBoards, setShowSavedBoards] = useState(false);
    const [hoveredCell, setHoveredCell] = useState(null);
    const [gridState, setGridState] = useState(() => createEmptyGrid(23, 40));

    // setup grid x & y dimensions
    const initialGridState = () => {
        const rows = 23;
        const cols = 40;
        return Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => 0)
        );
    };

    // mouse events
    const {
        handleClick,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove
    } = useMouseEvents(gridState, setGridState);

    // start game loop
    useEffect(() => {
        let gameInterval = null;
        let timerInterval = null;

        if (isRunning) {
            gameInterval = setInterval(() => {
                // update grid
                setGridState(prevGrid => computeNextGeneration(prevGrid));
            }, 100);
            
            // update timer
            timerInterval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        }

        // clear timer
        return () => {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
        };
    }, [isRunning]);


    // stop game
    const handleStop = () => {
        setIsRunning(false);
        setTimer(0);
        setGridState(initialGridState());
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
                            <GridComponent
                                gridState={gridState}
                                handleClick={handleClick}
                                handleMouseDown={handleMouseDown}
                                handleMouseUp={handleMouseUp}
                                handleMouseMove={handleMouseMove}
                                hoveredCell={hoveredCell}
                                setHoveredCell={setHoveredCell}
                            />
                        </div>
                    </section>

                    <ControlsComponent
                        isRunning={isRunning}
                        setIsRunning={setIsRunning}
                        handleStop={handleStop}
                        loadRandomBoard={() => loadRandomBoard(gridState, setGridState)}
                        handleSubmitGrid={() => handleSubmitGrid(gridState)}
                        setShowSavedBoards={setShowSavedBoards}
                        showSavedBoards={showSavedBoards}
                    />

                    {showSavedBoards && (
                        <SavedBoardsComponent
                            savedBoards={savedBoards}
                            loadSelectedBoard={(board) => loadSelectedBoard(board, setGridState, setShowSavedBoards)}
                        />
                    )}
                </main>
        </AuthenticatedLayout>
    );
}