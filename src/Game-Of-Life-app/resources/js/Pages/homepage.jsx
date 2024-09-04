import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Homepage({ auth }) {
    // generate grid function
    const renderGridBoard = () => {
        const board = [];
        const rows = 15;
        const cols = 30;

        for (let row = 1; row <= rows; row++) {
            const columns = [];
            for (let col = 1; col <= cols; col++) {
                const total = row + col;
                const isBlack = total % 2 === 0;
                columns.push(
                    <td 
                        // add css styles 
                        key={`${row}-${col}`}
                        style={{
                            width: '35px',
                            height: '34px',
                            backgroundColor: isBlack ? '#000' : '#000',
                            border: '1px solid gray',
                            transition: 'background-color 0.5s ease',
                        }}

                        // hover effect 
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#404040';
                            setTimeout(() => {
                                e.target.style.backgroundColor = isBlack ? '#000' : '#000';
                            }, 400);
                        }}

                        // click effect
                        onClick={(e) => {
                            e.target.style.backgroundColor = '#cccccc';
                            setTimeout(() => {
                                e.target.style.backgroundColor = isBlack ? '#000' : '#000';
                            }, 1000); 
                        }}
                    ></td>
                );
            }
            board.push(<tr key={row}>{columns}</tr>);
        }
        return board;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Homepage" />
            <main className="w-full h-[80%] flex flex-col justify-center items-center mx-auto p-0 m-0">
                <section className="w-full h-[70vh] flex justify-center items-center overflow-auto mb-auto">
                    <table className="border-[5px] border-gray-500">
                        <tbody>
                            {renderGridBoard()}
                        </tbody>
                    </table>
                </section>

                <section className='p-11'>
                    <button className="text-white bg-green-500 px-8 py-4 rounded-xl font-bold text-[1.25rem] hover:scale-[1.1] transition-all duration-300 ease-in-out focus:bg-green-700 focus:text-gray-200" type="button">Play</button>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}
