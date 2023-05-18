<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGpstracksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gpstracks', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('imei');
            $table->date('track_date');
            $table->time('track_time');
            $table->decimal('track_lng', 11, 7);
            $table->decimal('track_lat', 11, 7);
            $table->decimal('speed', 10, 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gpstracks');
    }
}
