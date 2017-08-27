<template>
    <div id="app">
        <current-price :results="currentResults"></current-price>
        <historical-price :results="historicalResults"></historical-price>
    </div>
</template>

<script>
import 'babel-polyfill'; // need for async/await
import axios from 'axios'

import CurrentPrice from './components/CurrentPrice.vue'
import HistoricalPrice from './components/HistoricalPrice.vue'

const HISTORICAL_API = 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=JPY'

const CURRENT_API = 'https://api.coindesk.com/v1/bpi/currentprice/JPY.json'

export default {
    name: 'app',
    components: {
        CurrentPrice,
        HistoricalPrice
    },
    data: function(){
        return {
            currentResults: {
                bpi: {
                    USD: {
                        description: 'United States Dollar',
                        rate: '-'
                    },
                    JPY: {
                        description: 'Japanese Yen',
                        rate: '-'
                    }
                },
                time: {
                    updated: ''
                }
            },
            historicalResults: {
                bpi: {},
                disclaimer: ''
            }
        }
    },
    created: async function () {
        const currentResponse = await axios.get(CURRENT_API)
        const historyResponse = await axios.get(HISTORICAL_API)

        this.currentResults = currentResponse.data 
        this.currentResults.chartData = historyResponse.data.bpi

        this.historicalResults.bpi = this._compare(historyResponse.data.bpi)
        this.historicalResults.disclaimer = historyResponse.data.disclaimer

        this._compare(historyResponse.data);
    },
    methods: {
        _compare: function(dataParam) {
            const objDate = Object.keys(dataParam).reverse()
            let sorted = {}

            for (var i = 0; i < objDate.length; i++) {
                sorted[objDate[i]] = dataParam[objDate[i]]
            }
            return sorted
        }
    }
}
</script>
