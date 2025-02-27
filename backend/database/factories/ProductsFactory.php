<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use App\Models\Products;

class ProductsFactory extends Factory
{
    protected $model = Products::class;

    public function definition(): array
    {
        // Random pet images
        $petImages = [
            "https://placekitten.com/300/300", // Cats
            "https://placedog.net/300/300", // Dogs
            "https://loremflickr.com/300/300/bird", // Birds
            "https://loremflickr.com/300/300/fish" // Fish
        ];

        // Select a random pet image
        $imageUrl = $this->faker->randomElement($petImages);
        $imageName = 'product_' . uniqid() . '.jpg';
        $imagePath = 'public/product/' . $imageName;

        // Disable SSL verification
        $imageContents = Http::withOptions([
            'verify' => false,  // Disable SSL verification
        ])->get($imageUrl)->body();

        Storage::put($imagePath, $imageContents);

        return [
            'name' => $this->faker->unique()->word(),
            'description' => $this->faker->sentence(),
            'prix' => $this->faker->randomFloat(2, 5, 200),
            'quantity' => $this->faker->numberBetween(1, 100),
            'image' => $imagePath, // Save the image path
            'suitable' => $this->faker->randomElement(['dogs', 'cats', 'birds', 'fishes']),
            'type' => $this->faker->randomElement(['food', 'accessory']),
            'discount_status' => $this->faker->boolean(30),
            'discount_percentage' => function (array $attributes) {
                return $attributes['discount_status'] ? rand(5, 50) : null;
            },
        ];
    }
}
