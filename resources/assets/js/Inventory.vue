<template>
    <div id="app1">
        <inventory-chart :chart-data="InventoryChart.data" :width="InventoryChart.width" :height="InventoryChart.height">
            <g style="transform: translate(0, 10px)">
                <path :d="line" />
            </g>
        </inventory-chart>
    </div>
</template>

<script>
    import InventoryChart from './components/InventoryChart.vue'
    export default {
        name: 'app1',
        components: {
            InventoryChart
        },
        data() {
            return {
                InventoryChart: {
                    data: [
                        {x: 100, close: 35},
                        {x: 300, close: 75},
                    ],
                    width: 500,
                    height: 375,
                }
            }
        },


    };
</script>