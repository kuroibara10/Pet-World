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
        Schema::create('demands',function(Blueprint $table){
            $table->id();
            $table->json('nameProducts');
            $table->json('prixProducts');
            $table->enum('statue', ['Under_preparation', 'in_the_way', 'success', 'reject'])->default('Under_preparation');
            $table->date('dateFinish')->nullable();
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
