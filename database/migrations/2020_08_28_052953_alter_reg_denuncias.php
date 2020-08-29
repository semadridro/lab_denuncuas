<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterRegDenuncias extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $sql = "ALTER TABLE `reg_denuncias` ADD COLUMN `tipo_denuncia` VARCHAR(255) NOT NULL AFTER `updated_at`, ADD COLUMN `mensaje` TEXT NULL AFTER `tipo_denuncia`, ADD COLUMN `url_attch` TEXT NULL AFTER `mensaje`;  ";
        DB::statement($sql);
        $sql = "ALTER TABLE reg_denuncias ADD COLUMN `id_estado` INT NULL AFTER `url_attch`; ";
        DB::statement($sql);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
