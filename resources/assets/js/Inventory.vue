<template>
    <div id="app1">
        <inventory-chart :chart-data="InventoryChart.data" :width="InventoryChart.width" :height="InventoryChart.height"></inventory-chart>
    </div>
</template>

<script>
    import InventoryChart from './components/InventoryChart.vue'
    export default {
        name: 'app1',
        components: {
            InventoryChart
        },
        data () {
            return {
                InventoryChart: {
                    data: [
                        { x:100, close: 35 },
                    ],
                    width: 500,
                    height: 375,
                }
            }
        }
    }
</script>