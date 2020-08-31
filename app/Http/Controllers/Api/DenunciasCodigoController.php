<?php


namespace App\Http\Controllers\Api;

use App\Denuncias;
use App\ProcesoDenuncia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DenunciasCodigoController extends Controller {

    public function buscocodigo(Request $request){

        $denuncias = Denuncias::select()
            ->leftJoin("proceso_denuncia", "proceso_denuncia.id_denuncia", "=", "reg_denuncias.id")
            ->where("reg_denuncias.codigoReg", "=", $request->codigo)
            ->first();

        return response()->json(['data' => $denuncias ], 200);
    }
}
