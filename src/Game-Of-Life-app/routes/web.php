<?php

use App\Http\Controllers\ProfileController;

use App\Http\Controllers\GameBoardController;
use App\Http\Controllers\BoardController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('homepage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// make sure user needs to be authenticated to access the homepage
Route::middleware('auth')->group(function () {
    Route::get('/', [GameBoardController::class, 'index'])->name('homepage');
    Route::post('/submit-grid', [GameBoardController::class, 'submitGrid'])->name('homepage.submitGrid');
});


Route::get('/testing-api-endpoints', function () {
    return Inertia::render('Api/testings');
})->name('testing.api.endpoints');


Route::post('/boards', [BoardController::class, 'store'])->name('boards.store');
Route::get('/api/boards', [BoardController::class, 'index'])->name('boards.getSavedBoards');
Route::get('/boards/{id}/grid', [BoardController::class, 'getGrid'])->name('boards.getGrid');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
