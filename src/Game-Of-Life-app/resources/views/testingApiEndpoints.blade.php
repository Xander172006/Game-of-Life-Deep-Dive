<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game of Life - Manage Boards</title>
</head>
<body>
    <div>
        <h1>Game of Life - Manage Boards</h1>

        @if (session('success'))
            <div>
                {{ session('success') }}
            </div>
        @endif

        @if ($errors->any())
            <div>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('boards.store') }}" method="POST">
            @csrf
            <div>
                <label for="name">Board Name:</label>
                <input type="text" id="name" name="name" required>
            </div>

            <div>
                <label for="grid">Board State (as a JSON string):</label>
                <textarea id="grid" name="grid" rows="10" required></textarea>
            </div>

            <button type="submit">Save Board</button>
        </form>

        <div>
            <h2>Saved Boards</h2>
            <ul id="boards-list">
            </ul>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            fetchBoards();
        });

        function fetchBoards() {
            fetch('{{ route('boards.getSavedBoards') }}')
                .then(response => response.json())
                .then(data => {
                    const boardsList = document.getElementById('boards-list');
                    boardsList.innerHTML = '';

                    data.forEach(board => {
                        const boardItem = document.createElement('li');
                        boardItem.textContent = `${board.name} - Created at: ${new Date(board.created_at).toLocaleString()}`;

                        const loadButton = document.createElement('button');
                        loadButton.textContent = 'Load Grid';
                        loadButton.onclick = function () {
                            loadGrid(board.id);
                        };

                        boardItem.appendChild(loadButton);
                        boardsList.appendChild(boardItem);
                    });
                })
                .catch(error => {
                    console.error('Error fetching boards:', error);
                });
        }

        function loadGrid(boardId) {
            fetch(`/boards/${boardId}/grid`)
                .then(response => response.json())
                .then(data => {
                    alert('Grid Data Loaded: ' + data.grid);
                })
                .catch(error => {
                    console.error('Error loading grid:', error);
                });
        }
    </script>
</body>
</html>
