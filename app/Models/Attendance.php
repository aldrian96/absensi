<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids ;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class Attendance extends Model
{
    use HasUuids;
    use HasFactory;

    // protected $casts = [
    //     'created_at' => 'datetime:Y-m-d H:i:s',
    // ];
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->setTimezone(config('app.timezone'))->format('Y-m-d H:i:s');
    }

    protected $fillable = [
        "user_id",
        "latitude",
        "longitude",
        "address",
        "status",
        "description",
    ];

    public function newUniqueId(){
        return (string) Uuid::uuid4();
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}
