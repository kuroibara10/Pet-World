<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;
    protected $table = "userss";
    protected $fillable = [
        'name',
        'prenom',
        'username',
        'email',
        'password',
        'photo',
        'role',
    ];
}
