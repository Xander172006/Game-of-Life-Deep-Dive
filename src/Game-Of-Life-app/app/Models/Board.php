<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'grid', 'user_id'];

    /**
     * Get the user that owns the board.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}