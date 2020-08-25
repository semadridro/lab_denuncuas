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

        $regDenuncia = Denuncias::create([
            "dataJson" => json_encode($request->dataJson),
            "codigoReg" => $randID
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
}

