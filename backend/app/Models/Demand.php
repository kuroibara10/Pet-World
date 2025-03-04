<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demand extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'date_finish',
    ];

    // تعريف العلاقة بين الطلب والمستخدم
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // العلاقة مع المنتجات عبر جدول pivot (demand_products)
    public function products()
    {
        return $this->belongsToMany(Product::class, 'demand_products')
                    ->withPivot('quantity', 'price')
                    ->withTimestamps();
    }
}
