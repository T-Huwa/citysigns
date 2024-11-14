<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RepairController;
use App\Http\Controllers\SignController;
use App\Http\Controllers\UserController;
use App\Models\Repair;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [SignController::class, 'renderDashboard'])->middleware(['auth'])->name('dashboard');

Route::prefix('users')->group(function(){
    Route::get('/', [UserController::class, 'index'])->name('users');
    Route::post('/change-status', [UserController::class, 'changeStatus'])->name('status.change');

    Route::get('/register', [RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->prefix('signs')->group(function (){
    Route::get('/', [SignController::class, 'index'])->name('signs');
    Route::get('/create', [SignController::class, 'create'])->name('signs.create');
    Route::post('/store', [SignController::class, 'store'])->name('signs.store');
    Route::get('/{id}', [SignController::class, 'show'])->name('signs.view.one');
    Route::post('/{id}/update-damage', [SignController::class, 'updateDamageScale'])->name('sign.update.damageScale');
});

Route::middleware('auth')->prefix('repairs')->group(function (){
    Route::get('/', [RepairController::class, 'index'])->name('repairs');
    Route::post('/store', [RepairController::class, 'store'])->name('repairs.store');
    Route::put('/{id}', [RepairController::class, 'update'])->name('repairs.update');
    Route::put('/{id}/update-status', [SignController::class, 'accept'])->name('repairs.update.status');
});

Route::get('/requests', function (){
    $user = Auth::user();
    if($user->role === 'Admin'){
        return Inertia::render('Admin/Requests', ['requests' => Repair::with(['user', 'sign'])->get()]);
    }
    return Inertia::render('Requests', ['requests' => Repair::with(['user', 'sign'])->where('user_id', $user->id)->get()]);
})->name('requests');

require __DIR__.'/auth.php';
