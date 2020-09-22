<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use HiHaHo\EncryptableTrait\Encryptable;

class Denuncias extends Model
{
    //

    protected $table = 'reg_denuncias';

    /*
    use Encryptable;

    protected $encryptable = [
        'dataJson',
    ];*/


    protected $fillable = [
        'dataJson', 'codigoReg', 'tipo_denuncia','mensaje','id_estado','url_attch'
    ];
}
