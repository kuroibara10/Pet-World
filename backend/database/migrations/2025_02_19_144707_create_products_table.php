<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->text('description'); 
            $table->decimal('prix', 10, 2); 
            $table->integer('quantity'); 
            $table->string('image')->default('public/product/product.png');
            $table->enum('suitable', ['dogs', 'cats', 'birds', 'fishes']); 
            $table->enum('type', ['food', 'accessory']);
            $table->boolean('discount_status')->default(false);
            $table->integer('discount_percentage')->nullable();    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products'); // حذف الجدول عند التراجع عن الترحيل
    }
};
