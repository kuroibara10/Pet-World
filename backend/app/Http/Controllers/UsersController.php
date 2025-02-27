<?php

namespace App\Http\Controllers;

use App\Http\Resources\UsersResource;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function index(){
        $users = Users::get();
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
        $users = Users::create([
            'name' => $request->name,
            'prenom' => $request->prenom,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json(
            [
                'message' => 'User Created Successfully',
                'data' => new UsersController($users),
            ],200
        );
    }
    public function show($id){
        $users = Users::find($id);

        if (!$users) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        return new UsersResource($users);

        // $users = Users::findOrFail($id);
        // if ($users){
        //     return new UsersResource($users);
        // }else{
        //     return response()->json(['message'=>'This client does not exist']);
        // }
    }
    // public function update(Request $request, $id){
    //     $validate = Validator::make($request->all(),[
    //         'name' => 'string|max:255',
    //         'prenom' => 'string|max:255',
    //         'username' => 'required|string|max:255',
    //         'email' => 'required|string|max:255',
    //         'password' => 'required|string|max:255',
    //         'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    //     ]);
    //     if($validate->fails()){
    //         return response()->json([
    //             'message'=> 'All fields are mandetory',
    //             'error'=> $validate->messages()
    //         ],422);    
    //     }
    //     $users = Users::create([
    //         'name' => $request->name,
    //         'prenom' => $request->prenom,
    //         'username' => $request->username,
    //         'email' => $request->email,
    //         'password' => $request->password,
    //     ]);
    //     return response()->json(
    //         [
    //             'message' => 'User Update Successfully',
    //             'data' => new UsersController($users),
    //         ],200
    //     );
        
    // }
public function update(Request $request, $id)
{
    // البحث عن المستخدم
    $user = Users::find($id);

    if (!$user) {
        return response()->json([
            'message' => 'User not found'
        ], 404);
    }

    // التحقق من البيانات المرسلة
    $validate = Validator::make($request->all(), [
        'name' => 'sometimes|string|max:255',
        'prenom' => 'sometimes|string|max:255',
        'username' => 'sometimes|string|max:255',
        'email' => 'sometimes|email|max:255|unique:users,email,' . $id,
        'password' => 'sometimes|string|min:6',
        'photo' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($validate->fails()) {
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $validate->messages()
        ], 422);
    }

    // تحديث البيانات إذا تم إرسالها
    if ($request->has('name')) $user->name = $request->name;
    if ($request->has('prenom')) $user->prenom = $request->prenom;
    if ($request->has('username')) $user->username = $request->username;
    if ($request->has('email')) $user->email = $request->email;
    if ($request->has('password')) $user->password = bcrypt($request->password);

    // تحديث الصورة إذا تم رفعها
    if ($request->hasFile('photo')) {
        $path = $request->file('photo')->store('users', 'public');
        $user->photo = $path;
    }

    $user->save();

    return response()->json([
        'message' => 'User Updated Successfully',
        'data' => $user
    ], 200);
}

    public function destroy($id){
        $user = Users::findOrfail($id);
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
