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

        $randID = $id = str_random(12);
        //var_dump($request);
        //var_dump($request->dataJson);
        //$data = json_decode($request->dataJson);

        //var_dump($_FILES);
        //var_dump($_POST);*/

        $data = json_decode($_POST['data']);

        if (!empty($_FILES)) {

            $file = $_FILES ["file"];
            if ($file["error"] == UPLOAD_ERR_OK) {
                $tmp_name = $file["tmp_name"];
                // basename() puede evitar ataques de denegación de sistema de ficheros;
                // podría ser apropiada más validación/saneamiento del nombre del fichero
                $name = basename($file["name"]);
                $path = public_path() . '/media/' . $data->codigo;
                $url = url('/media/' . $data->codigo . '/' . $name);
                if (!is_dir($path)) {
                    mkdir($path, 0777, true);
                }
                $path .= '/' . $name;
                move_uploaded_file($tmp_name, $path);
                chmod($path, 0775);
            }


            $arrCreate = [
                "dataJson" => json_encode($data->listado),
                "codigoReg" => $data->codigo,
                "tipo_denuncia" => empty($data->listado->TipoDenunci) ? $data->listado->queHara : $data->listado->TipoDenunci,
                "mensaje" => empty($data->listado->detalleGeneral) ? $data->listado->queHaraDetalle : $data->listado->detalleGeneral,
                "id_estado" => 0,
                "url_attch" => $url
            ];


            $regDenuncia = Denuncias::create($arrCreate);


        } else {

            $regDenuncia = Denuncias::create([
                "dataJson" => json_encode($data->listado),
                "codigoReg" => $data->codigo,
                "tipo_denuncia" => empty($data->listado->TipoDenunci) ? $data->listado->queHara : $data->listado->TipoDenunci,
                "mensaje" => empty($data->listado->detalleGeneral) ? $data->listado->queHaraDetalle : $data->listado->detalleGeneral,
                "id_estado" => 0
            ]);

        }


        return response()->json(['status' => $data->codigo], 200);
    }


    public function saveData(Request $request)
    {

        var_dump($request);

        $randID = $id = str_random(6);

        $regDenuncia = Denuncias::create([
            "dataJson" => json_encode($request->dataJson),
            "codigoReg" => $randID
        ]);

        return response()->json(['status' => trans($randID)], 200);
    }

    public function getallDenuncias(Request $request)
    {

        $denuncias = Denuncias::select("codigoReg AS codigo", "created_at AS fecha", "tipo_denuncia AS tipo", "mensaje", "id")
            ->where("id_estado", "=", $request->id_estado)
            ->orderBy('id', 'desc')
            ->get();

        //return response()->json(['data' => trans($denuncias)], 200);

        return response()->json(['data' => $denuncias], 200);
    }


    public function getDetaleDenuncia(Request $request)
    {

        $denuncias = Denuncias::select()
            ->leftJoin("proceso_denuncia", "proceso_denuncia.id_denuncia", "=", "reg_denuncias.id")
            ->where("reg_denuncias.id", "=", $request->id_denuncia)
            ->first();

        return response()->json(['data' => $denuncias], 200);

    }

    public function postChangeDenuncia(Request $request)
    {
        $datosTemp = json_decode($request->datos);
        $datos = $datosTemp->listado;

        Denuncias::where('id', $datos->id_denuncia)
            ->update(['id_estado' => 2]);

        ProcesoDenuncia::create([
            "id_denuncia" => $datos->id_denuncia,
            "respuesta" => $datos->mensaje
        ]);

    }

    public function postChangeStatus(Request $request)
    {

        $datos = json_decode($request->datos);

        Denuncias::where('id', $datos->id_denuncia)
            ->update(['id_estado' => $datos->id_estado]);
    }

    public function getDenunciaCodigo(Request $request)
    {

        $denuncias = Denuncias::select()
            ->leftJoin("proceso_denuncia", "proceso_denuncia.id_denuncia", "=", "reg_denuncias.id")
            ->where("reg_denuncias.codigo", "=", $request->codigo)
            ->first();

        return response()->json(['data' => $denuncias], 200);

    }
}
