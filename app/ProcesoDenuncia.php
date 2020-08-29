<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProcesoDenuncia extends Model
{
    //

    protected $table = 'proceso_denuncia';

    /*
    use Encryptable;

    protected $encryptable = [
        'dataJson',
    ];*/


    protected $fillable = [
        'id_denuncia', 'respuesta', 'json'
    ];
}
