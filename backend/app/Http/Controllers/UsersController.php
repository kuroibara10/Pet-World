<?php

namespace App\Http\Controllers;

use App\Http\Resources\UsersResource;
use App\Models\Users;
use Illuminate\Http\Request;
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
            'password' => $request->password,
        ]);
        return response()->json(
            [
                'message' => 'User Created Successfully',
                'data' => new UsersController($users),
            ],200
        );
    }
    public function show($id){
        $users = Users::findOrFail($id);
        if ($users){
            return new UsersResource($users);
        }else{
            return response()->json(['message'=>'This client does not exist']);
        }
    }
    public function update(Request $request, $id){}
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
