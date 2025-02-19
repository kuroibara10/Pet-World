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
        Schema::create('products',function(Blueprint $table){
            $table->id();
            $table->string('name')->unique();
            $table->string('description')->unique();
            $table->float('prix')->unique();
            $table->integer('quantity')->unique();
            $table->string('image')->default('public/product/product.png')->change();
            $table->enum('suitable', ['dogs','cats','births','fishs'])->unique();
            $table->enum('type', ['food','accessoir'])->unique();
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
        //
    }
};
