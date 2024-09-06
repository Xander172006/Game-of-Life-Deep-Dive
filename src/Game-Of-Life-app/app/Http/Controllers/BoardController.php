<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\Requests\storeBoards;

class BoardController extends Controller
{
    public function store(storeBoards $request): redirectResponse
    {
        // validation
        $validatedData = $request->validated();

        // store
        $board = Board::create([
                'name' => $validatedData['name'],
                'grid' => $validatedData['grid'],
                'user_id' => Auth::id(),
        ]);

        session()->flash('success', 'Board created successfully!');

        // redirect
        return redirect()->route('testing.api.endpoints');
    }

    public function index()
    {
        $boards = QueryBuilder::for(Board::class)
            ->allowedFilters('name')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get(); 

        return response()->json([
            'boards' => $boards,
            'flash' => session('success'),
        ]);
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
