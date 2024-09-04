// resources/js/Pages/ManageBoards.jsx
import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, router } from '@inertiajs/react';

export default function ManageBoards() {
    const [values, setValues] = useState({
        name: '',
        grid: '',
    });

    const { errors, boards } = usePage().props;

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const grid = formData.get('grid');

        Inertia.post('/api/boards', { name, grid });
        console.log('worked' + name + grid);
        
    }


    return (
        <div>
            <h1>Game of Life - Manage Boards</h1>

            {/* {errors && (
                <div>
                    <ul>
                        {Object.keys(errors).map((error, index) => (
                            <li key={index}>{errors[error]}</li>
                        ))}
                    </ul>
                </div>
            )} */}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Board Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="grid">Board State (as a JSON string):</label>
                    <textarea
                        id="grid"
                        name="grid"
                        rows="10"
                        required
                    ></textarea>
                </div>

                <button type="submit">Save Board</button>
            </form>

            <div>
                <h2>Saved Boards</h2>
                <ul id='boards-list'>
                </ul>
            </div>

            {/* <div>
                <h2>Saved Boards</h2>
                <ul id="boards-list">
                    {boards.map((board) => (
                        <li key={board.id}>
                            {`${board.name} - Created at: ${new Date(board.created_at).toLocaleString()}`}
                            <button onClick={() => loadGrid(board.id)}>Load Grid</button>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
}
