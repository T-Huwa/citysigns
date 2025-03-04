<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\JobCardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RepairController;
use App\Http\Controllers\SignController;
use App\Http\Controllers\UpdateController;
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

// All Signs API endpoint
Route::get('/signs/api', [SignController::class, 'api'])->name('signs.api');

Route::get('/dashboard', [SignController::class, 'renderDashboard'])->middleware(['auth'])->name('dashboard');

Route::prefix('users')->group(function(){
    Route::get('/', [UserController::class, 'index'])->name('users');
    Route::post('/change-status', [UserController::class, 'changeStatus'])->name('status.change');

    Route::get('/register', [RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
});

//route for all informants
Route::get('/informants', [UserController::class, 'informants'])->name('informants');

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

Route::group(['prefix'=> 'updates'], function (){
    Route::get('/', [UpdateController::class,'index'])->name('updates');
    Route::post('/store', [UpdateController::class,'store'])->name('updates.store');
    Route::patch('/updates/{update}/approve', [UpdateController::class, 'approve'])->name('updates.approve');
});

Route::resource('job-cards', JobCardController::class);
Route::patch('job-cards/{jobCard}/status', [JobCardController::class, 'updateStatus'])
    ->name('job-cards.update-status');
Route::get('/job-cards/{jobCard}', [JobCardController::class, 'show'])->name('job-cards.show');
Route::post('/job-cards/{jobCard}/complete', [JobCardController::class, 'complete'])->name('job-cards.complete');


require __DIR__.'/auth.php';
