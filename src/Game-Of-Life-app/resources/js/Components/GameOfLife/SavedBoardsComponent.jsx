import React from 'react';

const SavedBoardsComponent = ({ savedBoards, loadSelectedBoard }) => {
    return (
        <div>
            <h3 className="text-white font-bold text-[1.25rem] mb-2">Select a Saved Board</h3>
            <ul className="bg-gray-800 p-4 rounded-md text-white max-h-[200px] overflow-auto">
                {savedBoards.map((board) => (
                    <li key={board.id} className="cursor-pointer hover:bg-gray-600 p-2" onClick={() => loadSelectedBoard(board)}>
                        {board.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SavedBoardsComponent;