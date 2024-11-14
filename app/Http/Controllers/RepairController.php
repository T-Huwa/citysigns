<?php

namespace App\Http\Controllers;

use App\Models\Repair;
use App\Models\Officer;
use App\Models\Sign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RepairController extends Controller
{
    /**
     * Display a list of the resource
     */
    public function index(){
        $user = Auth::user();

        if($user->role === 'Admin'){
            $repairs = Repair::with(['sign', 'user'])->get();

            return Inertia::render('Repairs', [
                'repairs' => $repairs,
            ]);
        }

        $repairs = Repair::with(['sign', 'user'])
            ->where('user_id', $user->id)
            ->get();
        
        return Inertia::render('Repairs', [
            'repairs' => $repairs,
        ]);
    }

    /**
     * Store a new repair record.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'officer_id' => 'required|exists:users,id',
            'sign_id' => 'required|exists:signs,id', 
        ]);

        try {
            $repair = Repair::create([
                'user_id' => $validated['officer_id'],
                'sign_id' => $validated['sign_id'],
            ]);

            return response()->json([
                'message' => 'Repair assigned successfully!',
                'repair' => $repair
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to assign repair.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $repair = Repair::find($id);

        if (!$repair) {
            return response()->json(['message' => 'Repair not found'], 404);
        }

        $repair->notes = $request->notes;
        $repair->cost = $request->cost;
        $repair->status = 'completed';
        $repair->completion_date = now();
        $repair->save();

        return response()->json(['message' => 'Repair updated successfully']);
    }
}
