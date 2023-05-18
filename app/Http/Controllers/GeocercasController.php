<?php

namespace App\Http\Controllers;

use App\Models\Geocercas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class GeocercasController extends Controller
{
    public function store(Request $request)
    {
        $geocerca = array();
        foreach ($request->longitudes as $key => $value) {
            $positon = array( $value['lat'], $value['lng'] );
            array_push($geocerca, $positon);
        }

        try {
            $device = new Geocercas;

            $device->nombre = $request->nombre;
            $device->longitudes = json_encode($geocerca);
            $device->id_grupo = $request->id_grupo;
            $device->save();

            return Redirect::route('dashboard')->with('success', 'Geocerca registrada');
        } catch (\Throwable $th) {
            return Redirect::route('dashboard')->with('error', 'No se pudo registrar la geocerca, errors: '.$th );
        }
    }
}
