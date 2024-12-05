<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Update extends Model
{
    protected $fillable = ['sign_id', 'damage_scale', 'notes', 'images', 'informant_id'];

    public function informant()
    {
        return $this->belongsTo(User::class, 'informant_id');
    }

    public function sign()
    {
        return $this->belongsTo(Sign::class);
    }

}
