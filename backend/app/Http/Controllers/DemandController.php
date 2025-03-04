<?php

namespace App\Http\Controllers;

use App\Models\Demand;
use Illuminate\Http\Request;

class DemandController extends Controller
{
    // عرض جميع الطلبات
    public function index()
    {
        $demands = Demand::with('user', 'products')->get(); // تحميل الطلبات مع المستخدمين والمنتجات
        return response()->json($demands);
    }

    // عرض طلب واحد
    public function show($id)
    {
        $demand = Demand::with('user', 'products')->findOrFail($id);
        return response()->json($demand);
    }

    // إنشاء طلب جديد
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:Under_preparation,In_the_way,Success,Reject',
        ]);

        $demand = Demand::create($request->all());

        return response()->json($demand, 201);
    }

    // تحديث حالة الطلب
    public function update(Request $request, $id)
    {
        $demand = Demand::findOrFail($id);
        $demand->update($request->all());

        return response()->json($demand);
    }

    // حذف طلب
    public function destroy($id)
    {
        $demand = Demand::findOrFail($id);
        $demand->delete();

        return response()->json(['message' => 'طلب تم حذفه بنجاح']);
    }
}
