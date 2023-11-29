<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DevicesStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'placa' => ['required', 'max:100'],
            'imei' => ['required', 'max:100'],
            'telefono' => ['required', 'max:15'],
            'status' => ['required', 'boolean'],
            'conductor' => ['required', 'max:100'],
            'grupo' => ['required', 'max:100'],
        ];
    }
}
