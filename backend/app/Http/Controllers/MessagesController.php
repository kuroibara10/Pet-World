<?php

namespace App\Http\Controllers;

use App\Http\Resources\MessagesResource;
use App\Models\Message;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    public function index(){
        $message = Message::get();
        if($message->count()>0){
            return MessagesResource::collection($message);
        }else{
            return response()->json(['message'=>'There is no message']);
        }
    }
    public function store(Request $request){}
    public function show($id){
        $message = Message::findOrFail($id);
        if ($message){
            return new MessagesResource($message);
        }else{
            return response()->json(['message'=>'This message does not exist']);
        }
    }
    public function update(Request $request, $id){}
    public function destroy($id){
        $message = Message::findOrfail($id);
        if($message){
            $message->delete();
            return response()->json(
                ['message' => 'Message Deleted Successfully'],200
            );
        }else{
            return response()->json(['message'=>'This message does not exist']);
        }
    }
}
