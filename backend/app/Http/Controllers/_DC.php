<?php

// namespace App\Http\Controllers;

// use App\Http\Resources\DemandsResource;
// use App\Models\Demand;
// use Illuminate\Http\Request;

// class DemandsController extends Controller
// {
//     public function index(){
//         $demand = Demand::get();
//         if($demand->count()>0){
//             return DemandsResource::collection($demand);
//         }else{
//             return response()->json(['message'=>'There is no demand']);
//         }
//     }
//     public function store(Request $request){}
//     public function show($id){
//         $demand = Demand::findOrFail($id);
//         if ($demand){
//             return new DemandsResource($demand);
//         }else{
//             return response()->json(['message'=>'This demand does not exist']);
//         }
//     }
//     public function update(Request $request, $id){}
//     public function destroy($id){
//         $demand = Demand::findOrfail($id);
//         if($demand){
//             $demand->delete();
//             return response()->json(
//                 ['message' => 'Demand Deleted Successfully'],200
//             );
//         }else{
//             return response()->json(['message'=>'This demand does not exist']);
//         }
//     }

// }
