<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens,HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    use HasFactory;
    protected $table = "users";
    protected $fillable = [
        'name',
        'prenom',
        'username',
        'email',
        'password',
        'photo',
        'role',
    ];  

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

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
