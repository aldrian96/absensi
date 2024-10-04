<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users/store', action: [UserController::class, 'store'])->name('users.store');
    Route::get('/users/edit/{user}', action: [UserController::class, 'edit'])->name('users.edit');
    Route::patch('/users/update/{user}', action: [UserController::class, 'update'])->name('users.update');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('/attendances', action: [AttendanceController::class, 'index'])->name('attendances.index');
    // Route::post('/attendances/submit', action: [AttendanceController::class, 'submit'])->name('attendances.submit');

});
Route::middleware('auth')->group(function () {
    Route::post('/attendances/submit', action: [AttendanceController::class, 'submit'])->name('attendances.submit');

});

require __DIR__.'/auth.php';
