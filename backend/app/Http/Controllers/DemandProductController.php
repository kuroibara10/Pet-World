<?php

namespace App\Http\Controllers;

use App\Models\DemandProduct;
use Illuminate\Http\Request;

class DemandProductController extends Controller
{
    // عرض جميع المنتجات المرتبطة بالطلب
    public function index($demandId)
    {
        $demandProducts = DemandProduct::where('demand_id', $demandId)->get();
        return response()->json($demandProducts);
    }

    // إضافة منتج إلى الطلب
    public function store(Request $request, $demandId)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        $demandProduct = DemandProduct::create([
            'demand_id' => $demandId,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'price' => $request->price,
        ]);

        return response()->json($demandProduct, 201);
    }

    // حذف منتج من الطلب
    public function destroy($demandId, $productId)
    {
        $demandProduct = DemandProduct::where('demand_id', $demandId)
                                       ->where('product_id', $productId)
                                       ->firstOrFail();

        $demandProduct->delete();

        return response()->json(['message' => 'المنتج تم حذفه من الطلب بنجاح']);
    }
}
