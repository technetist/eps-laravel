<template>
    <div id="app2">
        <servicelevel-chart :chart-data="ServicelevelChart.data" :width="ServicelevelChart.width" :height="ServicelevelChart.height"></servicelevel-chart>
    </div>
</template>

<script>
    import ServicelevelChart from './components/ServicelevelChart.vue'
    export default {
        name: 'app2',
        components: {
            ServicelevelChart
        },
        data () {
            return {
                ServicelevelChart: {
                    data: [
                        { x:100, close: 35 },

                        { x:5, close: 45 },
                    ],
                    width: 500,
                    height: 375,
                }
            }
        }
    }
</script>