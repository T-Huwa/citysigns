<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(){
        return Inertia::render('Users', [
            'users' => User::all(),
        ]);
    }

    public function changeStatus(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',  // Ensure user_id exists in the users table
            'status' => 'required|in:Active,Inactive',  // Ensure status is either Active or Inactive
        ]);

        $user = User::find($request->input('user_id'));

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->status = $request->input('status');
        $user->save();

        return response()->json(['message' => 'User status updated successfully', 'status' => $user->status]);
    }
}
