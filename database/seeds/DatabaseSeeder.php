<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
     public function run()
    {
    	$faker = Faker::create();
    	foreach (range(1,20) as $index) {
	        DB::table('customers')->insert([
	            'name' => $faker->name,
                'lastnames' => $faker->company,
	            'phone' => $faker->phoneNumber,
                'email' => $faker->email,
                'card' => $faker->creditCardNumber,
	        ]);
        }
    }
}
