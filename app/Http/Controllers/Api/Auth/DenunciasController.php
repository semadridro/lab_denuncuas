<?php

namespace App\Http\Controllers\Api\Auth;

use App\Denuncias;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class DenunciasController extends Controller
{
    public function __invoke(Request $request)
    {

        $randID =  $id = str_random(6);
        $data = json_decode($request->dataJson);
        var_dump($data->listado);
        var_dump($data->codigo);

        $regDenuncia = Denuncias::create([
            "dataJson" => json_encode($data->listado),
            "codigoReg" => $data->codigo,
            "tipo_denuncia" => empty($data->listado->tipo_denuncia)?$data->listado->queHara:$data->listado->tipo_denuncia,
            "mensaje" => empty($data->listado->detalleGeneral)?$data->listado->queHaraDetalle:$data->listado->detalleGeneral,
            "id_estado" => 0
        ]);


        return response()->json(['status' => trans($randID)], 200);
    }


    public function saveData(Request $request) {

        var_dump($request);

        $randID =  $id = str_random(6);

        $regDenuncia = Denuncias::create([
            "dataJson" => json_encode($request->dataJson),
            "codigoReg" => $randID
        ]);

        return response()->json(['status' => trans($randID)], 200);
    }

    public function getallDenuncias (Request $request){

        $denuncias = Denuncias::select("codigoReg AS codigo", "created_at AS fecha", "tipo_denuncia AS tipo", "mensaje", "id");

        if (!isset($request)){
            $denuncias = $denuncias->where("id_estado", "=", $request->id_estado);
        }

        $denuncias = $denuncias->get();

        //return response()->json(['data' => trans($denuncias)], 200);

        return response()->json(['data' => $denuncias ], 200);
    }


    public function getDetaleDenuncia (Request $request) {

        $denuncias = Denuncias::select()->where("id", "=", $request->id_denuncia)->first();
        return response()->json(['data' => $denuncias ], 200);

    }
}

