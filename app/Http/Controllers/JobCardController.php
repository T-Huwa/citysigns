<?php

namespace App\Http\Controllers;

use App\Models\JobCard;
use App\Models\Update;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JobCardController extends Controller
{
public function index()
{
    $user = Auth::user();
    
    $jobCardsQuery = JobCard::with(['updates', 'assignedTo'])->latest();

    if ($user->role === 'Officer') {
        $jobCardsQuery->whereHas('assignedTo', function($query) use ($user) {
            $query->where('id', $user->id);
        });
    }

    return Inertia::render('Admin/JobCards', [
        'jobCards' => $jobCardsQuery->get()
    ]);
}


    public function create()
    {
        return Inertia::render('Admin/CreateJobCards', [
            'users' => User::select('id', 'name')
                ->where('role', 'Officer') // Adjust based on your user roles
                ->get(),
            'updates' => Update::with(['sign:id,name', 'informant:id,name'])
                ->where('status', 'Pending') // Only show non-completed updates
                ->select('id', 'sign_id', 'informant_id', 'notes', 'damage_scale', 'created_at')
                ->latest()
                ->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'assigned_to' => 'required|exists:users,id',
            'update_ids' => 'required|array',
            'update_ids.*' => 'exists:updates,id'
        ]);

        $jobCard = JobCard::create([
            'description' => $validated['description'],
            'assigned_to' => $validated['assigned_to'],
            'status' => 'Open'
        ]);

        $jobCard->updates()->attach($validated['update_ids']);

        Update::whereIn('id', $validated['update_ids'])->update(['status' => 'InProgress']);

        return redirect()->route('job-cards.index')
                ->with('success', 'Job card created successfully');
    }

    public function show(JobCard $jobCard)
    {
        $updates = $jobCard->updates()->get();

        return Inertia::render('JobCard', [
            'jobCard' => $jobCard,
            'updates' => $updates,
        ]);
    }

    public function complete(JobCard $jobCard)
    {
        $jobCard->update(['status' => 'Completed']);

        $jobCard->updates()->update(['status' => 'Completed']);

        return redirect()->route('job-cards.index')
            ->with('success', 'Job card and updates marked as completed.');
    }

    public function updateStatus(JobCard $jobCard, Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|in:Open,In Progress,Completed'
        ]);

        $jobCard->update(['status' => $validated['status']]);

        return back()->with('success', 'Status updated successfully');
    }
}