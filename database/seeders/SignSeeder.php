<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sign;

class SignSeeder extends Seeder
{
    public function run()
    {
        $initialSigns = [
            [
                'location' => 'Main St & 1st Ave',
                'type' => 'Stop',
                'words' => 'STOP',
                'damageScale' => 1,
            ],
            [
                'location' => 'Oak Rd & Pine Ln',
                'type' => 'Yield',
                'words' => 'YIELD',
                'damageScale' => 3,
            ],
            [
                'location' => 'Elm St & 3rd Ave',
                'type' => 'Speed Limit',
                'words' => 'SPEED LIMIT 35',
                'damageScale' => 2,
            ],
            [
                'location' => 'Maple Dr & 5th St',
                'type' => 'No Parking',
                'words' => 'NO PARKING',
                'damageScale' => 4,
            ],
            [
                'location' => 'Cedar Ln & Birch Rd',
                'type' => 'One Way',
                'words' => 'ONE WAY →',
                'damageScale' => 5,
            ],
        ];

        foreach ($initialSigns as $sign) {
            Sign::create($sign);
        }
    }
}
