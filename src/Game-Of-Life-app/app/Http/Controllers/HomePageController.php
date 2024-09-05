<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function index()
    {
        return Inertia::render('homepage');
    }

    public function submitGrid(Request $request)
    {
        // Receive the 2D grid array
        $grid = $request->input('grid');

        // Example: Log the grid or process it as needed
        \Log::info('Grid submitted', ['grid' => $grid]);

        // You can process the grid, save it to the database, etc.

        // Return a success response
        return response()->json([
            'message' => 'Grid data received successfully',
            'grid' => $grid,
        ]);
    }
}
