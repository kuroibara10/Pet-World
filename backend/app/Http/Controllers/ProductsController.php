<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductsResource;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index(){
        $product = Products::get();
        if($product->count()>0){
            return ProductsResource::collection($product);
        }else{
            return response()->json(['message'=>'There is no product']);
        }
    }
    public function store(Request $request){}
    public function show($id){
        $product = Products::findOrFail($id);
        if ($product){
            return new ProductsResource($product);
        }else{
            return response()->json(['message'=>'This product does not exist']);
        }
    }
    public function update(Request $request, $id){}
    public function destroy($id){
        $product = Products::findOrfail($id);
        if($product){
            $product->delete();
            return response()->json(
                ['message' => 'Product Deleted Successfully'],200
            );
        }else{
            return response()->json(['message'=>'This product does not exist']);
        }
    }
}
