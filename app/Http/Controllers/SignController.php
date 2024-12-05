<?php

namespace App\Http\Controllers;

use App\Models\Repair;
use App\Models\Sign;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('RoadSigns', ['signs' => Sign::all()]);
    }

    public function api()
    {
        return response()->json(['signs' => Sign::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/NewSign');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'words' => 'nullable|string|max:255',
            'damageScale' => 'required|integer|min:0|max:10',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $sign = new Sign();
        $sign->location = $request->location;
        $sign->type = $request->type;
        $sign->road = $request->street;
        $sign->words = $request->words;
        $sign->damageScale = $request->damageScale;
        $sign->save();

        return redirect()->route('signs')
            ->with('success', 'Sign created successfully.');
    }

    public function accept($id)
    {
        $repair = Repair::find($id);

        if (!$repair) {
            return response()->json(['error' => 'Repair not found'], 404);
        }

        $repair->status = 'in_progress';
        $repair->save();

        return response()->json(['message' => 'Repair status updated to in_progress', 'repair' => $repair]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $sign = Sign::findOrFail($id);

        return Inertia::render('Sign', [
            'sign' => $sign,
            'officers' => User::where('role', 'Officer')
                                ->where('status', 'Active')
                                ->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sign $sign)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDamageScale(Request $request, $id)
    {
        $request->validate([
            'damageScale' => 'required|integer|min:1|max:5',
        ]);

        $sign = Sign::findOrFail($id);

        $sign->damageScale = $request->damageScale;

        $sign->save();

        return response()->json([
            'message' => 'Damage scale updated successfully!'
        ]);
    }

    public function renderDashboard(){
        $user = Auth::user();

        if($user->role === 'Admin'){
            $totalSigns = Sign::count();
            $totalDamaged = Sign::where('damageScale', 5)->count();
            $totalCompleted = Repair::where('status', 'completed')->count();

            $activeRequests = Repair::where('status', 'pending')
                                    ->orWhere('status', 'in_progress')
                                    ->with(['sign', 'user'])
                                    ->get();

            $assignments = Repair::where('status', 'in_progress')
                                    ->with(['user'])
                                    ->take(3)
                                    ->get();

            $recentUpdates = Sign::orderBy('updated_at', 'desc')
                                    ->take(5)
                                    ->get();

            return Inertia::render('Admin/Dashboard', [
                'totalSigns' => $totalSigns,
                'totalDamaged' => $totalDamaged,
                'totalCompleted' => $totalCompleted,
                'activeRequests' => $activeRequests,
                'assignments' => $assignments,
                'recentUpdates' => $recentUpdates,
            ]);
        }

        if($user->role === 'Informant'){
            $signs = Sign::all();
            return Inertia::render('Informant/Dashboard', ['signs' => $signs]);
        }

        $assignedRequests = Repair::where('user_id', $user->id)
            ->where('status', 'pending')
            ->with(['sign'])
            ->get();

        $nearbySigns = Repair::where('status', 'pending')
            ->with(['sign'])
            ->get();

        return Inertia::render('Dashboard', [
            'assignedRequests' => $assignedRequests,
            'nearbySigns' => $nearbySigns,
        ]);
    }
}
