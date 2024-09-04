<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Board;
use Illuminate\Support\Facades\Auth;

class BoardController extends Controller
{
    /**
     * Store a newly created board in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return 1
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'grid' => 'required|string'
        ]);

        // Create and save the board to the database
        $board = new Board();
        $board->name = $request->input('name');
        $board->grid = $request->input('grid');
        $board->user_id = 1; // has to be changed to 'auth()->id()' when in the app
        $board->save();
        
        return 1;
    }

    /**
     * Display a list of the saved boards for the authenticated user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Fetch the boards belonging to the authenticated user, ordered by creation date (newest first)
        $boards = Board::select('id', 'name', 'created_at')
            ->where('user_id', 1)      // 1 has to be changed to 'Auth::id()' when in app
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($boards);
    }

    /**
     * Get the grid data for a specific board.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getGrid($id)
    {
        $board = Board::where('id', $id)
            ->where('user_id', 1)  // 1 has to be changed to 'Auth::id()' when in app
            ->first();

        if (!$board) {
            return response()->json(['error' => 'Board not found'], 404);
        }

        return response()->json(['grid' => $board->grid]);
    }
}
