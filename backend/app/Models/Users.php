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
    // ✅ عند جلب قيمة `photo`، إذا كانت فارغة، قم بإرجاع الصورة الافتراضية
    public function getPhotoAttribute($value)
    {
        return $value ? asset('storage/' . $value) : asset('storage/users/user.png');
    }
    
    // ✅ عند حفظ مستخدم جديد، إذا لم يتم إرسال `photo`، يتم تعيين الصورة الافتراضية
    public function setPhotoAttribute($value)
    {
        $this->attributes['photo'] = $value ?: 'users/user.png';
    }    
}
