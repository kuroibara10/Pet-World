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
        // Schema::create('demands',function(Blueprint $table){
        //     $table->id();
        //     $table->json('nameProducts');
        //     $table->json('prixProducts');
        //     $table->string('Demandeur');
        //     $table->enum('statue', ['Under_preparation', 'in_the_way', 'success', 'reject'])->default('Under_preparation');
        //     $table->date('dateFinish')->nullable();
        //     $table->timestamps();
        // });

        Schema::create('demands', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // ربط الطلب بالمستخدم
            $table->enum('status', ['Under_preparation', 'In_the_way', 'Success', 'Reject'])->default('Under_preparation');
            $table->datetime('date_finish')->nullable(); // تغيير date إلى datetime
            $table->timestamps();
        });

        Schema::create('demand_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('demand_id')->constrained('demands')->onDelete('cascade'); // ربط المنتج بالطلب
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // ربط المنتج بجدول المنتجات
            $table->integer('quantity'); // كمية المنتج في الطلب
            $table->decimal('price', 10, 2); // سعر المنتج عند وقت الطلب
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
