<?php

namespace App\Http\Requests\Reservation;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProcessStep1Request extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'vehicle_id' => ['required', 'string', 'max:20', Rule::exists('vehicles', 'vehicle_id')],
            'date' => ['required', 'date_format:Y-m-d', 'after:today'],
        ];
    }
}
