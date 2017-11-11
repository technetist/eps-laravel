<?php

use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CostReqsTableSeeder::class);
        $this->call(InventoriesTableSeeder::class);
        $this->call(OrderListsTableSeeder::class);

    }
}
