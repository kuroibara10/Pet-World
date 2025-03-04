<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    // 🟢 تسجيل الدخول
    public function login(Request $request)
    {
        // التحقق من صحة البيانات المدخلة
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // التأكد من أن البريد موجود في قاعدة البيانات
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'البريد الإلكتروني غير مسجل'], 404);
        }

        // التحقق من صحة كلمة المرور
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'كلمة المرور غير صحيحة'], 401);
        }

        // تسجيل الدخول وإنشاء توكن جديد
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'تم تسجيل الدخول بنجاح',
            'token' => $token,
            'user' => $user
        ], 200);
    }

    // 🔴 تسجيل الخروج
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete(); // حذف جميع التوكينات الخاصة بالمستخدم
        return response()->json(['message' => 'تم تسجيل الخروج بنجاح'], 200);
    }
}
