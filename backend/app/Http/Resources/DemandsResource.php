<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DemandsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nameProducts' => $this->nameProducts,
            'prixProducts' => $this->prixProducts,
            'statue' => $this->statue,
            'dateFinish' => $this->dateFinish,
        ];
    }
}
