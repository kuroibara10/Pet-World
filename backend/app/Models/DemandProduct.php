<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'demand_id',
        'product_id',
        'quantity',
        'price',
    ];

    // العلاقة مع الطلب
    public function demand()
    {
        return $this->belongsTo(Demand::class);
    }

    // العلاقة مع المنتج
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
