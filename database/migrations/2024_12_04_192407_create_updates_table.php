<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('updates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sign_id')->nullable()->constrained('signs')->onDelete('SET NULL');
            $table->foreignId('informant_id')->nullable()->constrained('users')->onDelete('SET NULL');
            $table->integer('damage_scale')->unsigned()->comment('Updated scale from 1 to 5');
            $table->text('notes')->nullable()->comment('Additional notes about the update');
            $table->json('images')->nullable()->comment('JSON array to store updated image paths or URLs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('updates');
    }
};
