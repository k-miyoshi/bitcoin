<template>
    <div>
        <canvas class="BitcoinChart" width="400" height="400"></canvas>
        <section>
            <h2>Monthly Bit Coin Price Table</h2>
            <dl>
                <template v-for="(value, key) in results.bpi">
                <dt>{{ key }}</dt>
                <dd>&yen; {{ value }}</dd>
                </template>
            </dl>
            <p class="copyright">{{ results.disclaimer }}</p>
        </section>
    </div>
</template>

<style lang="scss" scoped>
canvas {
    padding: 20px;
    box-sizing: border-box;
}
section {
    margin: 10px;
    padding: 20px;
    border-radius: 4px;
    background: #62727b;
    box-shadow: 0 1px 3px rgba(0,0,0,0.5);
}
h2 {
    padding: 10px 0;
    border-bottom: solid 1px #ffffff;
    text-align: center;
}
dl {
    margin: 20px 0;
    overflow: hidden;

    dt, dd {
        float: left;
        width: 50%;
        padding: 15px 0;
        box-sizing: border-box;
    }
    dt {
        clear: both;
    }
    dd {
        text-align: right;
    }
}
.copyright {
    font-size: 10px;
}
</style>

<script>
import 'babel-polyfill'; // need for async/await
import axios from 'axios'
import Chart from 'chart.js'

const HISTORICAL_API = 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=JPY'

export default {
    name: 'historical-price',
    data: function() {
        return {
            results: ''
        }
    },
    mounted: async function() {
        const response = await axios.get(HISTORICAL_API)
        this.results = response.data
        this._createChart()
    },
    methods: {
        _createChart: function() {
            /* chart rendering */
            const CTX = document.querySelector('.BitcoinChart')

            const labels = Object.keys(this.results.bpi)
            const datasets = Object.values(this.results.bpi)

            const bitcoinChart = new Chart(CTX, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'JPY',
                        fill : 'origin',
                        data: datasets
                    }]
                },
                options: {
                    showLine: true,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: false
                        }],
                        yAxes: [{
                            display: true
                        }]
                    }
                }
            })
        }
    }
}
</script>
