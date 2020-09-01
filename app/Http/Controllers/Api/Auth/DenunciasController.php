<?php

namespace App\Http\Controllers\Api\Auth;

use App\Denuncias;
use App\ProcesoDenuncia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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

        $randID =  $id = str_random(6);

        $regDenuncia = Denuncias::create([
            "dataJson" => json_encode($request->dataJson),
            "codigoReg" => $randID
        ]);

        return response()->json(['status' => trans($randID)], 200);
    }

    public function getallDenuncias (Request $request){

        $all = Denuncias::select("codigoReg AS codigo", "created_at AS fecha", "tipo_denuncia AS tipo", "mensaje", "id")
            ->where("id_estado", "=", 0)
            ->orderBy('id', 'desc')
            ->get();

        $pross = Denuncias::select("codigoReg AS codigo", "created_at AS fecha", "tipo_denuncia AS tipo", "mensaje", "id")
            ->where("id_estado", "=", 1)
            ->orderBy('id', 'desc')
            ->get();

        $concluidas = Denuncias::select("codigoReg AS codigo", "created_at AS fecha", "tipo_denuncia AS tipo", "mensaje", "id")
            ->where("id_estado", "=", 2)
            ->orderBy('id', 'desc')
            ->get();

        $spam = Denuncias::select("codigoReg AS codigo", "created_at AS fecha", "tipo_denuncia AS tipo", "mensaje", "id")
            ->where("id_estado", "=", 3)
            ->orderBy('id', 'desc')
            ->get();
        //return response()->json(['data' => trans($denuncias)], 200);

        $denuncias = array("todas" => $all, "pross" => $pross, "concluidas" => $concluidas, "spam" => $spam);


        return response()->json(['data' => $denuncias ], 200);
    }


    public function getDetaleDenuncia (Request $request) {

        $denuncias = Denuncias::select()
            ->leftJoin("proceso_denuncia", "proceso_denuncia.id_denuncia", "=", "reg_denuncias.id")
            ->where("reg_denuncias.id", "=", $request->id_denuncia)
            ->first();

        return response()->json(['data' => $denuncias ], 200);

    }

    public function postChangeDenuncia (Request $request){
        $datosTemp = json_decode($request->datos);
        $datos = $datosTemp->listado;

        Denuncias::where('id', $datos->id_denuncia)
            ->update(['id_estado' => 2]);

        ProcesoDenuncia::create ([
            "id_denuncia" => $datos->id_denuncia,
            "respuesta"=> $datos->mensaje
        ]);

    }

    public function postChangeStatus (Request $request){

        $datos = json_decode($request->datos);

        Denuncias::where('id', $datos->id_denuncia)
            ->update(['id_estado' => $datos->id_estado]);
    }

    public function getDenunciaCodigo (Request $request) {

        $denuncias = Denuncias::select()
            ->leftJoin("proceso_denuncia", "proceso_denuncia.id_denuncia", "=", "reg_denuncias.id")
            ->where("reg_denuncias.codigo", "=", $request->codigo)
            ->first();

        return response()->json(['data' => $denuncias ], 200);

    }
}
