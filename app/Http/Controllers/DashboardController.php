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
        ->addSelect(['speed' => Gpstrack::select('speed')
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
        ])
        ->when(Auth::user(), function ($query) {
            $query->whereHas('organization', function ($query) {
                $query->where('id', Auth::user()->organization);
            });
        })
        ->get();


        $devices = $devices->map(function ($device) {

            $date = Carbon::parse($device->fecha_registro);
            $now = Carbon::now();

            $diff_in_minutes = $date->diffInMinutes($now);

            // Obtén las últimas ubicaciones para este dispositivo
            $lastLocations = Gpstrack::select('track_lng', 'track_lat')
                ->where('imei', $device->imei)
                ->orderByDesc('id')
                ->limit(6)  // Cambia este número al número de ubicaciones que quieras obtener
                ->get()
                ->map(function ($location) {
                    return [
                        'lng' => $location->track_lng,
                        'lat' => $location->track_lat,
                    ];
                });
        
            // Obtén las últimas velocidades para este dispositivo
            $lastSpeeds = Gpstrack::select('speed')
                ->where('imei', $device->imei)
                ->orderByDesc('id')
                ->limit(5)  // Cambia este número al número de velocidades que quieras obtener
                ->get()
                ->pluck('speed');

            // Verifica si todas las últimas velocidades son 0
            $isParked = $lastSpeeds->every(function ($speed) {
                return $speed == 0;
            });

            return [
                'id' => $device->id,
                'placa' => $device->placa,
                'status' => $device->status,
                'imei' => $device->imei,
                'fecha' => Carbon::parse($date)->format('Y-m-d'),
                'hora' => Carbon::parse($date)->format('H:i'),
                'lng' => $device->lng,
                'lat' => $device->lat,
                'grupo' => $device->grupo,
                'speed' => $device->speed,
                'connect' => ($date->diffInDays($now) > 0 && $diff_in_minutes > 5) ? false : true,
                'lastLocations' => $lastLocations,
                'isParked' => $isParked,
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

    public function info()
    {
        $devices = Device::select('id', 'placa', 'status', 'imei', 'grupo')
        ->addSelect(['speed' => Gpstrack::select('speed')
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
        ])
        ->when(Auth::user(), function ($query) {
            $query->whereHas('organization', function ($query) {
                $query->where('id', Auth::user()->organization);
            });
        })->get();

        $devices = $devices->map(function ($device) {

            $date = Carbon::parse($device->fecha_registro);
            $now = Carbon::now();

            $diff_in_minutes = $date->diffInMinutes($now);

            // Obtén las últimas ubicaciones para este dispositivo
            $lastLocations = Gpstrack::select('track_lng', 'track_lat')
                ->where('imei', $device->imei)
                ->orderByDesc('id')
                ->limit(6)  // Cambia este número al número de ubicaciones que quieras obtener
                ->get()
                ->map(function ($location) {
                    return [
                        'lng' => $location->track_lng,
                        'lat' => $location->track_lat,
                    ];
                });
            
            // Obtén las últimas velocidades para este dispositivo
            $lastSpeeds = Gpstrack::select('speed')
                ->where('imei', $device->imei)
                ->orderByDesc('id')
                ->limit(5)  // Cambia este número al número de velocidades que quieras obtener
                ->get()
                ->pluck('speed');

            // Verifica si todas las últimas velocidades son 0
            $isParked = $lastSpeeds->every(function ($speed) {
                return $speed == 0;
            });

            return [
                'id' => $device->id,
                'placa' => $device->placa,
                'status' => $device->status,
                'imei' => $device->imei,
                'fecha' => Carbon::parse($date)->format('Y-m-d'),
                'hora' => Carbon::parse($date)->format('H:i'),
                'lng' => $device->lng,
                'lat' => $device->lat,
                'grupo' => $device->grupo,
                'speed' => $device->speed,
                'connect' => ($date->diffInDays($now) > 0 && $diff_in_minutes > 5) ? false : true,
                'lastLocations' => $lastLocations,
                'isParked' => $isParked,
            ];
        });

        return response()->json([
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
