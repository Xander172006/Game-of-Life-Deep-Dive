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

    public function store(Request $request)
    {
        return response()->json([
            'message' => 'Coördinaten ontvangen',
            'row' => $request['row'],
            'col' => $request['col'],
        ]);
    }
}
