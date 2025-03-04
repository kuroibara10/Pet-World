<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class _De extends Model
{
    use HasFactory;
    // protected $table = "demands";
    protected $fillable = [
        'nameProducts',
        'prixProducts',
        'statue',
        'dateFinish',
    ];
}
