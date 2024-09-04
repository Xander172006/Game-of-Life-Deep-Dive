import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';

export default function ManageBoards(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        grid: '',
    });

    // State to store the list of boards
    const [boards, setBoards] = useState(props.boards || []);
    const [flash, setFlash] = useState(props.flash?.message || '');


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
        // Add your logic here to load the grid data based on the board ID
        console.log(`Loading grid for board ${boardId}`);
    }

    return (
        <div>
            <h1>Game of Life - Manage Boards</h1>

            {flash && (
                <div className="alert alert-success">
                    {flash}
                </div>
            )}

            {errors && (
                <div>
                    <ul>
                        {Object.keys(errors).map((error, index) => (
                            <li key={index}>{errors[error]}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Board Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name} // This should be correctly bound to the form data
                            onChange={(e) => setData('name', e.target.value)} // This should update the form data
                            required
                        />
                </div>

                <div>
                    <label htmlFor="grid">Board State (as a JSON string):</label>
                    <textarea
                        id="grid"
                        name="grid"
                        rows="10"
                        value={data.grid}
                        onChange={(e) => setData('grid', e.target.value)}
                        required
                    ></textarea>
                </div>

                <button type="submit">Save Board</button>
            </form>

            <div>
                <h2>Saved Boards</h2>
                <ul id="boards-list">
                    {boards.length > 0 ? (
                        boards.map((board) => (
                            <li key={board.id}>
                                {`${board.name} - Created at: ${new Date(board.created_at).toLocaleString()}`}
                                <button onClick={() => loadGrid(board.id)}>Load Grid</button>
                            </li>
                        ))
                    ) : (
                        <p>No boards available</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
