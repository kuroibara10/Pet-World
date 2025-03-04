<?php

// database/seeders/DemandSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Demand;
use App\Models\DemandProduct;
use App\Models\User;

class DemandSeeder extends Seeder
{
    // public function run()
    // {
    //     // إنشاء 60 طلب عشوائي
    //     Demand::factory(60)->create()->each(function ($demand) {
    //         // لكل طلب، نقوم بإنشاء منتج مرتبط به
    //         DemandProduct::factory(3)->create(['demand_id' => $demand->id]);  // 3 منتجات لكل طلب
    //     });
    // }
    public function run()
{
    // إنشاء 60 طلبات بشكل عشوائي
    Demand::factory()->count(60)->create([
        'user_id' => User::inRandomOrder()->first()->id // اختيار مستخدم عشوائي
    ]);
}

}
