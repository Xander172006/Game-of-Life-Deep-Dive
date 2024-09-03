<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Board;

class BoardController extends Controller
{
    /**
     * Store a newly created board in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
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

    
}
    