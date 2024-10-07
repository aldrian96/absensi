<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class AttendanceController extends Controller
{
    public static function isTodayAttendanceSubmitted(): bool
    {
        if (Auth::check()) {
            return Attendance::where("user_id", Auth::id())
                            ->whereDate('created_at', now()->toDateString())
                            ->exists();
        }
        return false;
    }

    public function index(): Response
    {
        // Query all attendances, order by created_at descending and paginate it
        $attendances = Attendance::with('user')
            ->orderBy('created_at', 'desc') // Mengurutkan berdasarkan created_at
            ->paginate(10);

        return Inertia::render('Attendance/Index', [
            'attendances' => $attendances
        ]);
    }

    public function submit(Request $request){
        $request->validate([
            'status' => 'required',
            'description' => 'required_if:status,sick,leave,permit,business_trip,remote',
            'latitude' => 'required',
            'longitude' => 'required',
            'address'=> 'required',
        ]);

        Attendance::create([
            // 'user_id'=> auth()->id(),
            'user_id'=> Auth::id(),
            'status' => $request->status,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'address' => $request->address
        ]);

        // return redirect::route('dashboard');
    }

    // Maps
    // Di AttendanceController
    public function map()
    {
        return Inertia::render('Map/Index', [
            'userId' => Auth::id() // Mengirim ID pengguna yang sedang login
        ]);
    }


    public function getAttendanceData()
    {
        // Ambil semua data absensi, termasuk informasi pengguna
        $attendances = Attendance::with('user')->get();

        return response()->json($attendances); // Kembalikan data dalam format JSON
    }


}
