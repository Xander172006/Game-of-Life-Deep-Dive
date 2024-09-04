<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BoardController extends Controller
{
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
        $board->user_id = Auth::id(); // Use the authenticated user's ID
        $board->save();

        return redirect()->route('home')->with('success', 'Board saved successfully!');
    }

    public function index()
    {
        $boards = Board::select('id', 'name', 'created_at')
            ->where('user_id', 1)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['boards' => $boards], 200);
    }

    public function getGrid($id)
    {
        $board = Board::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$board) {
            return response()->json(['error' => 'Board not found'], 404);
        }

        return response()->json(['grid' => $board->grid]);
    }
}
