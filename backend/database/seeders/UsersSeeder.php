<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersSeeder extends Seeder
{
    public function run()
    {
        // استخدام الـ Factory لإضافة 20 مستخدمًا
        User::factory(20)->create();
    }
}
