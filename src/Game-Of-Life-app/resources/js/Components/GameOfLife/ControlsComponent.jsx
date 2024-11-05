import React from 'react';

const ControlsComponent = ({ isRunning, setIsRunning, handleStop, loadRandomBoard, handleSubmitGrid, setShowSavedBoards, showSavedBoards }) => {
    return (
        <>
            <section className='p-4 grid place-items-start place-content-start items-start grid-cols-1 gap-5 mt-[2.5%] w-[35%] mr-[5%] mb-auto'>

                <h3 className='text-white font-bold font-playfull text-[1.5rem]'>Start game</h3>
                <div className='w-full flex justify-start items-start gap-4 mt-[2%]'>
                    <div>
                        <button 
                            className={`text-white ${isRunning ? 'bg-orange-600 border-orange-500 focus:bg-orange-700' : 'bg-green-500 border-green-500 focus:bg-green-700'} px-5 bg-opacity-30 border-[1px] py-2 rounded-md font-bold text-[0.85rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:text-gray-200 font-pixelify`} 
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
                            onClick={() => setShowSavedBoards(!showSavedBoards)}
                        >
                            Load Board
                        </button>
                    </div>
                </div>


                <h4 className='text-white font-bold font-playfull text-[1rem] mt-5'>Save</h4>
                <div className='flex justify-center items-center gap-4'>
                    <div>
                        <label htmlFor="name-bord"></label>
                        <input type="text" name='name-board' className='w-full bg-gray-800 text-white' placeholder='name board'/>
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

            <section>
            </section>
        </>
    );
};

export default ControlsComponent;