<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DriverResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'documento' => $this->documento,
            'nombres' => $this->nombres,
            'apellidos' => $this->apellidos,
            'organization' => $this->organization,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
