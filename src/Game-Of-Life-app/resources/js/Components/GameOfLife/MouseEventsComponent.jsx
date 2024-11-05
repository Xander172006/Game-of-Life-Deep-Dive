import { useState } from 'react';

const useMouseEvents = (gridState, setGridState) => {
    const [isLeftMouseDown, setIsLeftMouseDown] = useState(false);

    const handleClick = (row, col) => {
        const updatedGrid = gridState.map((r, rowIndex) =>
            r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? 1 : cell))
        );
        setGridState(updatedGrid);
    };


    const handleMouseDown = (event, row, col) => {
        if (event.button === 0) {
            setIsLeftMouseDown(true);
            handleClick(row, col);
        }
    };


    const handleMouseUp = (event) => {
        if (event.button === 0) {
            setIsLeftMouseDown(false);
        }
    };


    const handleMouseMove = (row, col) => {
        if (isLeftMouseDown) {
            handleClick(row, col);
        }
    };
    

    return {
        handleClick,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
        isLeftMouseDown,
        setIsLeftMouseDown
    };
};

export default useMouseEvents;