<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobCard extends Model
{
    protected $fillable = ['reference_number', 'status', 'description', 'assigned_to'];

    public function updates()
    {
        return $this->belongsToMany(Update::class, 'job_card_update')
                    ->withTimestamps();
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    // Auto-generate reference number
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($jobCard) {
            $latestCard = static::whereYear('created_at', now()->year)
                               ->latest()
                               ->first();

            $sequence = $latestCard ? intval(substr($latestCard->reference_number, -3)) + 1 : 1;
            $jobCard->reference_number = 'JC-' . now()->year . '-' . str_pad($sequence, 3, '0', STR_PAD_LEFT);
        });
    }
}
