import React from 'react';

const GridComponent = ({ gridState, handleClick, handleMouseDown, handleMouseUp, handleMouseMove, hoveredCell, setHoveredCell }) => {
    const renderGridBoard = () => {
        const rows = gridState.length;
        const cols = gridState[0].length;
        const board = [];

        // loop through each cell
        for (let row = 0; row < rows; row++) {
            const columns = [];
            for (let col = 0; col < cols; col++) {
                
                // check if cell is highlighted or hovered
                const isHighlighted = gridState[row][col] === 1;
                const isHovered = hoveredCell && hoveredCell.row === row && hoveredCell.col === col;

                columns.push(
                    <td
                        key={`${row}-${col}`}
                        style={{
                            width: '60px',
                            height: '30px', 
                            backgroundColor: isHighlighted
                                ? '#ffffff'
                                : isHovered
                                    ? '#aaaaaa'
                                    : '#000000',
                            border: '1px solid gray',
                        }}

                        // mouse state events
                        onClick={() => handleClick(row, col)}
                        onMouseDown={(event) => handleMouseDown(event, row, col)} // 
                        onMouseUp={handleMouseUp}
                        onMouseMove={() => handleMouseMove(row, col)}
                        onMouseEnter={() => setHoveredCell({ row, col })}
                        onMouseLeave={() => setHoveredCell(null)}
                    ></td>
                );
            }

            // push the row to the board
            board.push(<tr key={row}>{columns}</tr>);
        }
        return board;
    };

    return (
        <table className="border-[5px] border-gray-500">
            <tbody>
                {renderGridBoard()}
            </tbody>
        </table>
    );
};

export default GridComponent;