import React from 'react';
import '../../../css/style.css'

const ControlsComponent = ({ isRunning, setIsRunning, handleStop, loadRandomBoard, handleSubmitGrid, setShowSavedBoards, showSavedBoards, speed, setSpeed }) => {
    return (
        <main className='flex flex-col justify-center gap-0'>
            <section className='p-2 grid place-items-start place-content-start items-start grid-cols-1 gap-9 w-full mr-[5%] text-[0.85rem]'>
                <div className='border-[1.5px] border-gray-800 w-full'>

                    <div class="relative group cursor-pointer flex justify-center items-center ">
                        <div class="absolute -inset-[2.5px] bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-35"></div>
                        <div
                            class="relative border-[1.5px] border-gray-800 px-4 w-full bg-opacity-40 shadow-lg shadow-black h-28 py-4 bg-black text-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-center space-x-6">
                            <div className='flex flex-col justify-center items-center gap-3 py-2'>
                                <h3 className='text-white font-bold font-playfull text-[1.25rem]'>Start game</h3>

                                <div className='flex gap-4'>
                                    <div>
                                        <button 
                                            className={`text-white ${isRunning ? 'bg-orange-600 border-orange-500 focus:bg-orange-700' : 'bg-green-500 border-green-500 focus:bg-green-700'} px-5 bg-opacity-30 border-[1px] py-2 rounded-md font-bold text-[0.85rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:text-gray-200 font-pixelify w-[10rem]`} 
                                            type="button"
                                            onClick={() => setIsRunning(!isRunning)}
                                        >
                                            {isRunning ? 'Pause' : 'Play'}
                                        </button>
                                    </div>

                                    <div>
                                        <button 
                                            className="text-white bg-red-500 px-5 py-2 bg-opacity-30 border-red-400 border-[1px] rounded-md font-bold hover:scale-[1.1] font-pixelify transition-all duration-300 ease-in-out focus:bg-red-700 focus:text-gray-200 w-[10rem]" 
                                            type="button"
                                            onClick={handleStop}
                                        >
                                            Stop
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className='grid grid-cols-2 gap-9 w-full'>
                    <div class="relative group cursor-pointer flex justify-center items-center ">
                        <div class="absolute -inset-[2.5px] bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-35"></div>
                        <div
                            class="relative border-[1.5px] border-gray-800 px-2 w-full bg-opacity-40 shadow-lg shadow-black h-36 py-4 bg-black text-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-center">
                            <div className='flex flex-col justify-center items-center gap-3 py-2 w-full'>
                                <button
                                    className="text-white font-pixelify bg-black bg-opacity-40 border-gray-800 border-[1.5px] px-3 py-3 rounded-md font-bold text-[0.85rem] hover:scale-[1.010] hover:bg-gray-900 hover:bg-opacity-30 hover:border-black transition-all duration-300 ease-in-out focus:text-gray-200 w-full h-12"
                                    type="button"
                                    onClick={loadRandomBoard}
                                >
                                    Random board
                                </button>
                                <button
                                    className="text-white font-pixelify bg-black bg-opacity-40 border-gray-800 border-[1.5px] px-3 py-3 rounded-md font-bold text-[0.85rem] hover:scale-[1.010] hover:bg-gray-900 hover:bg-opacity-30 hover:border-black transition-all duration-300 ease-in-out focus:text-gray-200 w-full h-12"
                                    type="button"
                                    onClick={() => setShowSavedBoards(!showSavedBoards)}
                                >
                                    Button Text
                                </button>
                            </div>
                        </div>
                    </div>

                
                    <div class="relative group cursor-pointer flex justify-center items-center ">
                        <div class="absolute -inset-[2.5px] bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-35"></div>
                        <div
                            class="relative border-[1.5px] border-gray-800 px-4 w-full bg-opacity-40 shadow-lg shadow-black h-36 py-4 bg-black text-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-center space-x-6">
                            <div className='flex flex-col justify-center items-center gap-3 py-2'>
                                color picker
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <section className='grid grid-cols-1 place-items-center my-4 w-[97.5%] mx-auto rounded-lg mt-8'>
                <div class="relative group cursor-pointer flex justify-center items-center w-full">
                    <div class="absolute -inset-[2.5px] bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-35"></div>
                        <div
                            class="relative border-[1.5px] border-gray-800 px-4 w-full bg-opacity-40 shadow-lg shadow-black h-[8.5rem] py-8 bg-black text-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-center space-x-6">
                            <div className="flex flex-col justify-center items-center gap-3 py-2 w-full">
                                <h4 className="mr-auto font-bold font-playfull text-[1.05rem]">Upload Board</h4>
                                <label htmlFor="name-board"></label>

                                <div className="w-full p-[2px] rounded-md bg-gradient-to-r from-sky-500 via-red-500 to-yellow-500 bg-[length:200%_200%] animate-gradient grid grid-cols-3">
                                    <input
                                        type="text"
                                        name="name-board"
                                        className="w-full bg-black bg-opacity-80 border-0 rounded-md focus:ring-0 focus:outline-none text-white p-2 focus:bg-opacity-60 placeholder:text-stone-500 font-mono col-span-2"
                                        placeholder="Upload your board here"
                                    />
                                    <button className="text-white w-auto font-pixelify bg-black bg-opacity-60 border-sky-300 border-[1px] px-5 py-[0.6rem] rounded-md font-bold text-[0.9rem] transition-all duration-300 ease-in-out focus:bg-opacity-20 focus:text-gray-200" type="button" onClick={handleSubmitGrid}>
                                        post
                                    </button>
                                </div>

                            </div>
                        </div>
                </div>
            </section>

            <section className='grid grid-cols-1 place-items-center my-4 w-[97.5%] mx-auto rounded-lg mt-5'>
                <div class="relative group cursor-pointer flex justify-center items-center w-full">
                    <div class="absolute -inset-[2.5px] bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-35"></div>
                        <div
                            class="relative border-[1.5px] border-gray-800 px-4 w-full bg-opacity-40 shadow-lg shadow-black h-26 py-4 bg-black text-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-center space-x-6">
                        <div className='flex flex-col justify-center items-center gap-3 py-1 w-full'>
                            <h4 className='text-white font-bold font-playfull text-[1.15rem] mb-4 mr-auto'>Play Speed</h4>
                            <input 
                                type="range" 
                                name="Play-Speed" 
                                id="Play-Speed"
                                className="w-full"
                                onChange={(e) => setSpeed(e.target.value)} // Update speed state
                                value={speed} // Bind speed state
                                min="1"
                                max="30"
                                step="1"   
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ControlsComponent;