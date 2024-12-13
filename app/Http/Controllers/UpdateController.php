<?php

namespace App\Http\Controllers;

use App\Models\Update;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UpdateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Updates', [
            'updates' => Update::with([
                'sign:id,name,location', 
                'informant:id,name'
            ])
                ->latest()
                ->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'sign_id' => 'required|exists:signs,id',
                'damage_scale' => 'required|integer|min:1|max:5',
                'notes' => 'nullable|string',
                'status' => 'nullable|string',
                'informant_id' => 'required|exists:users,id',
            ]);

            if ($request->has('images')) {
                $imagePaths = [];
                foreach ($request->file('images') as $image) {
                    $imagePaths[] = $image->store('uploads/images', 'public');
                }
                $validated['images'] = json_encode($imagePaths);
            }

            $update = Update::create($validated);
            // $update->status = "Pending";
            // $update->save();

            //return redirect()->route('dashboard')->with('success', 'Update successfully created!');

            return response()->json([
                'message' => 'Update successfully created.',
                'data' => $update,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            //return redirect()->route('dashboard')->with('error', 'Validation failed.');
            
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            //return redirect()->route('dashboard')->with('error', 'An error occurred while processing the request.');
            
            return response()->json([
                'message' => 'An error occurred while processing the request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function approve(Update $update)  // Laravel automatically finds Update with that ID
    {
        $update->update([
            'status' => 'Approved'
        ]);

        return back()->with('success', 'Update approved successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Update $update)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Update $update)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Update $update)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Update $update)
    {
        //
    }
}
