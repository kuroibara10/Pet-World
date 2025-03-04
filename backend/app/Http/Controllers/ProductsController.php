<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductsResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    public function index(){
        $product = Product::get();
        if($product->count()>0){
            return ProductsResource::collection($product);
        }else{
            return response()->json(['message'=>'There is no product']);
        }
    }
    // public function store(Request $request){}
    public function show($id){
        $product = Product::findOrFail($id);
        if ($product){
            return new ProductsResource($product);
        }else{
            return response()->json(['message'=>'This product does not exist']);
        }
    }
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|string|unique:products,name',
        'description' => 'required|string',
        'prix' => 'required|numeric',
        'quantity' => 'required|integer',
        'suitable' => 'required|in:dogs,cats,birds,fishes',
        'type' => 'required|in:food,accessory',
        'discount_status' => 'boolean',
        'discount_percentage' => 'nullable|integer|min:0|max:100',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    if ($request->hasFile('image')) {
        $validatedData['image'] = $request->file('image')->store('public/products');
    }

    $product = Product::create($validatedData);

    return response()->json($product, 201);
}


    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $data = $request->all();
        if ($request->hasFile('image')) {
            Storage::delete($product->image);
            $data['image'] = $request->file('image')->store('public/products');
        }
        $product->update($data);
        return response()->json($product);
    }

    // public function update(Request $request, $id){}
    public function destroy($id){
        $product = Product::findOrfail($id);
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
