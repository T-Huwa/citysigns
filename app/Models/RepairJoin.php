<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairJoin extends Model
{
    use HasFactory;

    protected $table = 'repair_join';

    protected $fillable = [
        'repair_id',
        'sign_id',
    ];

    /**
     * Get the repair.
     */
    public function repair()
    {
        return $this->belongsTo(Repair::class);
    }

    /**
     * Get the sign that is being repaired.
     */
    public function sign()
    {
        return $this->belongsTo(Sign::class);
    }
}
