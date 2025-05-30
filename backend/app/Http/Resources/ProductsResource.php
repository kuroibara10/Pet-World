<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductsResource extends JsonResource
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
            'name' => $this->name,
            'description' => $this->description,
            'prix' => $this->prix,
            'quantity' => $this->quantity,
            'image' => $this->image,
            'suitable' => $this->suitable,
            'type' => $this->type,
            'discount_status' => $this->discount_status,
            'discount_percentage' => $this->discount_percentage,
        ];
    }
}
