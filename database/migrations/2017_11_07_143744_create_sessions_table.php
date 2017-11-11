<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('CONWIPparameters_0');
            $table->integer('CONWIPparameters_1');
            $table->integer('KANBANparameters_0');
            $table->integer('KANBANparameters_1');
            $table->integer('KANBANparameters_2');
            $table->integer('KANBANparameters_3');
            $table->integer('KANBANparameters_4');
            $table->integer('KANBANparameters_5');
            $table->integer('KANBANparameters_6');
            $table->integer('KANBANparameters_7');
            $table->integer('KANBANparameters_8');
            $table->integer('KANBANparameters_9');
            $table->integer('KANBANparameters_10');
            $table->integer('KANBANparameters_11');
            $table->integer('KANBANparameters_12');
            $table->integer('KANBANparameters_13');
            $table->integer('KANBANparameters_14');
            $table->integer('KANBANparameters_15');
            $table->integer('MRPparameters_0');
            $table->integer('MRPparameters_1');
            $table->integer('MRPparameters_2');
            $table->integer('MRPparameters_3');
            $table->integer('MRPparameters_4');
            $table->integer('MRPparameters_5');
            $table->integer('MRPparameters_6');
            $table->integer('MRPparameters_7');
            $table->integer('MRPparameters_8');
            $table->integer('MRPparameters_9');
            $table->integer('MRPparameters_10');
            $table->integer('MRPparameters_11');
            $table->integer('MRPparameters_12');
            $table->integer('MRPparameters_13');
            $table->integer('MRPparameters_14');
            $table->integer('MRPparameters_15');
            $table->integer('MRPparameters_16');
            $table->integer('MRPparameters_17');
            $table->integer('MRPparameters_18');
            $table->integer('MRPparameters_19');
            $table->integer('MRPparameters_20');
            $table->integer('MRPparameters_21');
            $table->integer('MRPparameters_22');
            $table->integer('MRPparameters_23');
            $table->float('averageFgi');
            $table->float('averageInv');
            $table->float('averageWip');
            $table->float('average_utilisation');
            $table->integer('leadtime')->nullable();
            $table->string('planningAlgoritm');
            $table->float('serviceLevel');
            $table->string('sessionName');
            $table->float('timePerPiece');
            $table->float('timePerPiece_M1');
            $table->float('timePerPiece_M2');
            $table->float('timePerPiece_M3');
            $table->float('timePerPiece_M4');
            $table->float('timePerPiece_M5');
            $table->integer('total_time');
            $table->integer('utilisation_M1');
            $table->integer('utilisation_M2');
            $table->integer('utilisation_M3');
            $table->integer('utilisation_M4');
            $table->integer('utilisation_M5');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations_
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sessions');
    }
}
