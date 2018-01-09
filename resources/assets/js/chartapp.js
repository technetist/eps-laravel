
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

var Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/InventoryChart.vue'));
import App1 from './Inventory'

new Vue({
    el: '#app1',
    template: '<App1/>',
    components: { App1 },
    ready() {
        alert('Rendered!');
    }
});

import Trend from 'vuetrend'

Vue.use(Trend)

new Vue({
    el: '#app',
});

Vue.component('example-component', require('./components/ServicelevelChart.vue'));
import App2 from './Servicelevel'

new Vue({
    el: '#app2',
    template: '<App2/>',
    components: { App2 },
    ready() {
        alert('Rendered!');
    }
});
