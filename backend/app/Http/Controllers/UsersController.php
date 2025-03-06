<?php

namespace App\Http\Controllers;

use App\Http\Resources\UsersResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function index(){
        $users = User::get();
        if($users->count()>0){
            return UsersResource::collection($users);
        }else{
            return response()->json(['message'=>'There is no user']);
        }
    }
    public function store(Request $request){
        $validate = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'password' => 'required|string|max:255',
        ]);
        if($validate->fails()){
            return response()->json([
                'message'=> 'All fields are mandetory',
                'error'=> $validate->messages()
            ],422);    
        }
        $users = User::create([
            'name' => $request->name,
            'prenom' => $request->prenom,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'admin'
        ]);
        return response()->json(
            [
                'message' => 'User Created Successfully',
                'data' => new UsersController($users),
            ],200
        );
    }
    public function show($id){
        $users = User::find($id);

        if (!$users) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        return new UsersResource($users);
    }
    // public function update(Request $request, $id)
    // {
    //     // البحث عن المنتج وإذا لم يُوجد سيرمي استثناء 404
    //     $user = User::findOrFail($id);
    
    //     // التحقق من صحة البيانات مع السماح بنفس الاسم للمنتج الحالي
    //     $validatedData = $request->validate([
    //         'name' => 'sometimes|string|max:255',
    //         'prenom' => 'sometimes|string|max:255',
    //         'username' => 'sometimes|string|max:255',
    //         'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
    //         'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
    //     ]);
    
    //     if ($request->hasFile('photo')) {
    //         $validatedData['photo'] = $request->file('photo')->store('users', 'public');
    //     }
    
    //     // تحديث المنتج بالبيانات المُحققة
    //     $user->update($validatedData);
    
    //     return response()->json($user, 200);
    // }
    public function update(Request $request, $id)
    {
        // البحث عن المستخدم وإذا لم يُوجد سيرمي استثناء 404
        $user = User::findOrFail($id);
    
        // التحقق من صحة البيانات مع السماح بنفس الاسم للمستخدم الحالي
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'username' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
    
        // إذا كان يوجد صورة جديدة يتم تخزينها
        if ($request->hasFile('photo')) {
            $validatedData['photo'] = $request->file('photo')->store('users', 'public');
        }
    
        // الآن نحتفظ بالقيم القديمة للعناصر التي لم يتم إرسالها في الطلب
        $user->name = $validatedData['name'] ?? $user->name;
        $user->prenom = $validatedData['prenom'] ?? $user->prenom;
        $user->username = $validatedData['username'] ?? $user->username;
        $user->email = $validatedData['email'] ?? $user->email;
        $user->photo = $validatedData['photo'] ?? $user->photo;
    
        // تحديث المستخدم بالبيانات المحققة
        $user->save();
    
        return response()->json($user, 200);
    }
    
    // public function update(Request $request, $id)
    // {
    //     // البحث عن المستخدم
    //     $user = User::findOrFail($id);

    //     if (!$user) {
    //         return response()->json([
    //             'message' => 'User not found'
    //         ], 404);
    //     }

    //     // التحقق من البيانات المرسلة
    //     $validate = Validator::make($request->all(), [
    //         'name' => 'sometimes|string|max:255',
    //         'prenom' => 'sometimes|string|max:255',
    //         'username' => 'sometimes|string|max:255',
    //         'email' => 'sometimes|email|max:255|unique:users,email,' . $id,
    //         'password' => 'sometimes|string|min:6',
    //         'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
    //     ]);

    //     if ($validate->fails()) {
    //         return response()->json([
    //             'message' => 'Validation failed',
    //             'errors' => $validate->messages()
    //         ], 422);
    //     }


    //     // تحديث البيانات إذا تم إرسالها
    //     if ($request->has('name')) $user->name = $request->name;
    //     if ($request->has('prenom')) $user->prenom = $request->prenom;
    //     if ($request->has('username')) $user->username = $request->username;
    //     if ($request->has('email')) $user->email = $request->email;
    //     if ($request->has('password')) $user->password = bcrypt($request->password);

    //     // تحديث الصورة إذا تم رفعها
    //     if ($request->hasFile('photo')) {
    //         $validate['photo'] = $request->file('photo')->store('users', 'public');
    //     }
    //     $user->update($validate);

    //     // $user->save();

    //     return response()->json([
    //         'message' => 'User Updated Successfully',
    //         'data' => $user
    //     ], 200);
    // }
    public function updateUserPassword(Request $request, $id)
    {
        // **1. التحقق من صحة البيانات المدخلة**
        $request->validate([
            'new_password' => 'required|min:8|confirmed',
        ]);

        // **2. العثور على المستخدم بناءً على الـ ID**
        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json(['error' => 'المستخدم غير موجود'], 404);
        }

        // **3. السماح فقط للمسؤولين أو المستخدم نفسه بتغيير كلمة مروره**
        if (Auth::user()->id !== $user->id && !Auth::user()->is_admin) {
            return response()->json(['error' => 'غير مسموح لك بتغيير كلمة مرور هذا المستخدم'], 403);
        }

        // **4. تحديث كلمة المرور**
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'تم تحديث كلمة المرور بنجاح']);
    }

    public function updateProfileImage(Request $request, $id)
{
    // التحقق من إذا كان المستخدم موجودًا
    $user = User::findOrfail($id);
    if (!$user) {
        return response()->json(['error' => 'المستخدم غير موجود'], 404);
    }

    // التحقق من وجود الصورة في الطلب
    if ($request->hasFile('photo')) {
        $image = $request->file('photo');
        
        // حفظ الصورة في مجلد 'public/profile_images' داخل الـ storage
        $path = $image->store('users', 'public');

        // تحديث مسار الصورة في قاعدة البيانات
        $user->profile_image = $path;
        $user->save();

        return response()->json(['message' => 'تم تحديث الصورة بنجاح', 'image' => $path], 200);
    }

    return response()->json(['error' => 'لم يتم إرسال صورة'], 400);
}


    public function destroy($id){
        $user = User::findOrfail($id);
        if($user){
            $user->delete();
            return response()->json(
                ['message' => 'User Deleted Successfully'],200
            );
        }else{
            return response()->json(['message'=>'This client does not exist']);
        }
    }
}
