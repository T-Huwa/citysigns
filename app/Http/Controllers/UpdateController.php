<?php

namespace App\Http\Controllers;

use App\Models\Update;
use Illuminate\Http\Request;

class UpdateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            // Validate the request data
            $validated = $request->validate([
                'sign_id' => 'required|exists:signs,id',
                'damage_scale' => 'required|integer|min:1|max:5',
                'notes' => 'nullable|string',
                'images' => 'nullable|array',
                'images.*' => 'file|image|max:2048', // Limit individual image size to 2MB
                'informant_id' => 'required|exists:users,id',
            ]);

            // Handle image upload if present
            if ($request->has('images')) {
                $imagePaths = [];
                foreach ($request->file('images') as $image) {
                    $imagePaths[] = $image->store('uploads/images', 'public');
                }
                $validated['images'] = json_encode($imagePaths);
            }

            // Create the update record
            $update = Update::create($validated);

            // Return success response
            return response()->json([
                'message' => 'Update successfully created.',
                'data' => $update,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            // Handle general errors (e.g., database issues, image upload failures)
            return response()->json([
                'message' => 'An error occurred while processing the request.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
