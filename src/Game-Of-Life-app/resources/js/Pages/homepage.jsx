import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Homepage({ auth }) {
    // generate grid function
    const renderGridBoard = () => {
        const board = [];
        // 27 x 62
        for (let row = 1; row <= 27; row++) {
            const columns = [];
            for (let col = 1; col <= 62; col++) {
                const total = row + col;
                const isBlack = total % 2 === 0;
                columns.push(
                    // create elements
                    <td 
                        key={`${row}-${col}`}
                        style={{
                            width: '25px',
                            height: '25px',
                            backgroundColor: isBlack ? '#000' : '#000',
                            border: '1px solid gray',
                            transition: 'background-color 0.5s ease',
                        }}
                        onClick={(e) => {
                            e.target.style.backgroundColor = '#cccccc';
                            setTimeout(() => {
                                e.target.style.backgroundColor = isBlack ? '#000' : '#000';
                            }, 400); // 2000ms = 2 seconds
                        }}
                    ></td>
                );
            }
            // set elements to board
            board.push(<tr key={row}>{columns}</tr>);
        }
        return board;
    };

    return (
        // front-end layout
        <AuthenticatedLayout user={auth.user}>
            <Head title="Homepage" />
            <main className="w-full h-auto">
                <table>
                    <tbody>
                        {renderGridBoard()}
                    </tbody>
                </table>
            </main>
        </AuthenticatedLayout>
    );
}
