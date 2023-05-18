<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class DevicesController extends Controller
{
    //Register device
    public function store(Request $request)
    {
        try {
            $device = new Device;

            $device->placa = $request->placa;
            $device->imei = $request->imei;
            $device->telefono = $request->telefono;
            $device->conductor = $request->conductor;
            $device->status = false;
            $device->save();

            return Redirect::route('dashboard')->with('success', 'Dispositivo registrado');
        } catch (\Throwable $th) {
            return Redirect::route('dashboard')->with('error', 'No se pudo registrar el dispositivo');
        }
    }
}
