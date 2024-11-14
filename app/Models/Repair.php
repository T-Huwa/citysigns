<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repair extends Model
{
    use HasFactory;

    protected $table = 'repairs';

    protected $fillable = [
        'user_id',
        'sign_id',
        'status',
        'completion_date',
        'notes',
        'cost',
    ];

    /**
     * Get the user that is assigned to the repair.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the sign that is being repaired.
     */
    public function sign()
    {
        return $this->belongsTo(Sign::class);
    }
}
