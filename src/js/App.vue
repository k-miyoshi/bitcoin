<template>
    <div id="app">
        <aside v-if="!isLoaded"><p class="loader"></p></aside>
        <current-price v-show="isLoaded" :results="currentResults"></current-price>
        <historical-price v-show="isLoaded" :results="historicalResults"></historical-price>
    </div>
</template>

<style lang="scss" scoped>
aside {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
}
.loader {
    border-radius: 50%;
    width:  60px;
    height:  60px;
    border: solid 8px rgba(#666666, 0.2);
    border-top-color: #666666;
    animation: spin 1s infinite linear;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
import 'babel-polyfill' // need for async/await
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
  data: function () {
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
      },
      isLoaded: false
    }
  },
  created: async function () {
    const currentResponse = await axios.get(CURRENT_API)
    const historyResponse = await axios.get(HISTORICAL_API)

    this.currentResults = currentResponse.data
    this.currentResults.time.updated = this._UTCtoJST(currentResponse.data.time.updated)
    this.currentResults.chartData = historyResponse.data.bpi

    this.historicalResults.bpi = this._compare(historyResponse.data.bpi)
    this.historicalResults.disclaimer = historyResponse.data.disclaimer

    this._compare(historyResponse.data)
    this.isLoaded = true
  },
  methods: {
    _UTCtoJST: function (dateParam) {
      const utc = new Date(dateParam)
      return utc.toLocaleString()
    },
    _compare: function (dataParam) {
      const objDate = Object.keys(dataParam).reverse()
      const sorted = {}

      for (var i = 0; i < objDate.length; i++) {
        sorted[objDate[i]] = dataParam[objDate[i]]
      }
      return sorted
    }
  }
}
</script>
