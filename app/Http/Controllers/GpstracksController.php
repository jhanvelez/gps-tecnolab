<?php

namespace App\Http\Controllers;

use App\Models\Gpstrack;
use Illuminate\Http\Request;

class GpstracksController extends Controller
{
    //

    public function get(Request $request)
    {
        $history = Gpstrack::whereBetween('track_date', [$request->route('date_i'), $request->route('date_f')])
                            ->where('imei', $request->route('device'))
                            ->orderBy('id', 'asc')
                            ->get();
        return response()->json(compact('history'), 200);
    }
}
