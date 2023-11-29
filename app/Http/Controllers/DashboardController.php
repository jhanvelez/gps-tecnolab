<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Device;
use App\Models\Eventos;
use App\Models\Gpstrack;
use App\Models\Geocercas;
use Illuminate\Support\Facades\DB;

use App\Http\Resources\DriverCollection;
use App\Http\Resources\GroupsCollection;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $devices = Device::select('id', 'placa', 'status', 'imei', 'grupo')
        ->addSelect(['fecha' => Gpstrack::select('track_date')
            ->whereColumn('imei', 'devices.imei')
            ->orderByDesc('id')
            ->limit(1)
        ])->addSelect(['hora' => Gpstrack::select('track_time')
            ->whereColumn('imei', 'devices.imei')
            ->orderByDesc('id')
            ->limit(1)
        ])->addSelect(['lng' => Gpstrack::select('track_lng')
            ->whereColumn('imei', 'devices.imei')
            ->orderByDesc('id')
            ->limit(1)
        ])->addSelect(['lat' => Gpstrack::select('track_lat')
            ->whereColumn('imei', 'devices.imei')
            ->orderByDesc('id')
            ->limit(1)
        ])->addSelect(['fecha_registro' => Gpstrack::select('created_at')
            ->whereColumn('imei', 'devices.imei')
            ->orderByDesc('id')
            ->limit(1)
        ])->get();


        $devices = $devices->map(function ($device) {

            $date = Carbon::parse($device->fecha_registro);
            $now = Carbon::now();

            $diff_in_minutes = $date->diffInMinutes($now);

            return [
                'id' => $device->id,
                'placa' => $device->placa,
                'status' => $device->status,
                'imei' => $device->imei,
                'fecha' => $device->fecha,
                'hora' => $device->hora,
                'lng' => $device->lng,
                'lat' => $device->lat,
                'grupo' => $device->grupo,
                'connect' => ($date->diffInDays($now) > 0 && $diff_in_minutes > 5) ? false : true
            ];
        });
        
        return Inertia::render('Dashboard/Index', [
            'devices' => $devices,
            'geocercas' => Geocercas::select('id', 'nombre', 'longitudes')->get(),
            'events' => Eventos::select('id', 'event', DB::raw('(SELECT placa as device FROM devices where devices.id = device) as device'), 'position', 'positian_name', 'created_at')->get(),
            'drivers' =>  new DriverCollection(
                Auth::user()->account->drivers()
                    ->orderBy('nombres')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
            'groups' =>new GroupsCollection(
                Auth::user()->account->groups()
                    ->with('organization')
                    ->orderBy('id')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            )
        ]);
    }
}
