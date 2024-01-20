<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Gpstrack;
use Illuminate\Http\Request;

class GpstracksController extends Controller
{
    //

    public function get(Request $request)
    {
        $history = Gpstrack::whereBetween('created_at', [$request->route('date_i'), $request->route('date_f')])
                            ->where('imei', $request->route('device'))
                            ->orderBy('id', 'asc')
                            ->limit(100)
                            ->get();

        $history = $history->map(function ($h) {
            $date = Carbon::parse($h->created_at);


            return [
                'id' => $h->id,
                'imei' => $h->imei,
                'track_date' => Carbon::parse($date)->format('Y-m-d'),
                'track_time' => Carbon::parse($date)->format('H:i'),
                'track_lng' => $h->track_lng,
                'track_lat' => $h->track_lat,
                'speed' => $h->speed,
                'created_at' => $h->created_at,
                'updated_at' => $h->updated_at,
            ];
        });

        return response()->json(compact('history'), 200);
    }
}
