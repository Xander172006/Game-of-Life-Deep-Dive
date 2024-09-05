import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';

export default function ManageBoards(props) {
    const { auth, boards, flash } = props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        grid: '',
    });

    const [boardsList, setBoards] = useState(boards || []);
    const [flashMessage, setFlash] = useState(flash?.message || '');

    // Fetch boards when component mounts
    useEffect(() => {
        fetch('/api/boards')
            .then(response => response.json())
            .then(data => {
                setBoards(data.boards || []);
            })
            .catch(error => console.error('Error fetching boards:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        
        post(route('boards.store'), {
            onSuccess: () => {
                setFlash('Board created successfully.');
            }
        });
    }

    function loadGrid(boardId) {
        console.log(`Loading grid for board ${boardId}`);
    }

    return (
        <AuthenticatedLayout user={auth.user} page="Testing Endpoints">
            <Head title="Testing" />
                <div className='dark:text-gray-200 text-black grid place-content-center gap-12 grid-cols-2 place-items-center w-[75%] mx-auto items-center my-[5%]'>
                    <section className='mb-auto w-[85%]'>
                        <h1 className='font-bold text-[1.75rem]'>Manage Boards</h1>

                        <form onSubmit={handleSubmit} className='my-[5%] flex flex-col gap-6'>
                            <div className='flex justify-start items-center gap-5'>
                                <label htmlFor="name" className='dark:text-gray-400 text-[0.9rem]'>Board Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className='ml-auto h-8 rounded-lg bg-black border-[1px] border-gray-600'
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                            </div>

                            <div className='flex justify-start gap-5'>
                                <label htmlFor="grid" className='text-gray-400 text-[0.9rem]'>Board State (as a JSON string):</label>
                                <textarea
                                    id="grid"
                                    name="grid"
                                    rows="10"
                                    className='ml-auto h-auto rounded-lg bg-black border-[1px] border-gray-600'
                                    value={data.grid}
                                    onChange={(e) => setData('grid', e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className='flex justify-start dark:bg-gray-300 bg-white w-[25%] items-center px-4 text-center py-2 rounded-md dark:text-gray-700 text-white dark:focus:bg-gray-400 focus:bg-gray-100'>Save Board</button>
                        </form>

                        {flashMessage && (
                            <div className="alert alert-success text-green-600">
                                {flashMessage}
                            </div>
                        )}

                        {errors && (
                            <div>
                                <ul className='text-red-600'>
                                    {Object.keys(errors).map((error, index) => (
                                        <li key={index}>{errors[error]}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>

                    <section className='mb-auto w-[75%]'>
                        <div>
                            <h2 className='font-bold text-[1.75rem]'>Saved Boards</h2>
                            <ul id="boards-list" className='bg-black flex flex-col rounded-md p-3'>
                                {boardsList.length > 0 ? (
                                    boardsList.map((board) => (
                                        <li key={board.id} className='bg-gray-800 text-[0.8rem] font-thin p-1 rounded-md'>
                                            {`${board.name} - Created at: ${new Date(board.created_at).toLocaleString()}`}
                                            <button onClick={() => loadGrid(board.id)}>Load Grid</button>
                                        </li>
                                    ))
                                ) : (
                                    <p>No boards available</p>
                                )}
                            </ul>
                        </div>
                    </section>
                </div>
        </AuthenticatedLayout>
    );
}
