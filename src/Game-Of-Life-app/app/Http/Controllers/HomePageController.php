<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\QueryBuilder;

use App\Http\Requests\storeBoards;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    public function index()
    {
        return Inertia::render('homepage');
    }

    public function submitGrid(Request $request)
    {
        // Receive the 2D grid array
        $grid = $request->all();

        // Example: Log the grid or process it as needed
        \Log::info('Grid submitted', ['grid' => $grid]);
        $serializedGrid = json_encode($grid['grid']);

        $board = Board::create([
            'name' => 'Game of Life',
            'grid' => $serializedGrid,
            'user_id' => Auth::id(),
        ]);

        // Return a success response
        return response()->json([
            'message' => 'Grid data received successfully',
            'grid' => $grid,
        ]);
    }
}
