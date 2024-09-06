<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    public function loadSavedBoards()
    {
        $boards = QueryBuilder::for(Board::class)
            ->allowedFilters('name')
            ->where('user_id', Auth::id())
            ->select('id', 'name', 'grid', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return $boards; // Return the boards collection directly
    }


    public function index()
    {
        $savedBoards = self::loadSavedBoards();

        return Inertia::render('homepage', [
            'savedBoards' => $savedBoards
        ]);
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