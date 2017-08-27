<template>
<section>
    <h1><span>Bit Coin Price Index</span></h1>
    <canvas class="BitcoinChart" width="100" height="50"></canvas>
    <dl>
        <dt>{{ results.bpi.USD.description }}</dt>
        <dd>$ {{ results.bpi.USD.rate.split('.')[0] }}.<span>{{ results.bpi.USD.rate.split('.')[1] }}</span></dd>
        <dt>{{ results.bpi.JPY.description }}</dt>
        <dd>&yen; {{ results.bpi.JPY.rate.split('.')[0] }}.<span>{{ results.bpi.JPY.rate.split('.')[1] }}</span></dd>
    </dl>
    <time :datetime="results.time.updatedISO">updated {{ results.time.updated }}</time>
</section>
</template>

<style lang="scss" scoped>
section {
    margin: 10px;
    padding: 20px;
    border-radius: 4px;
    background: #37464f;
    box-shadow: 0 1px 3px rgba(0,0,0,0.5);
}
h1 {
    margin: 0 0 20px 0;
    font-size: 24px;
    text-align: center;

    span {
        display: block;
        padding: 15px 0;
        border: solid 4px #ffffff;
    }
}
dl {
    padding: 20px 0 10px 0;

    dt {
        padding: 10px 0 0 0;
    }
    dd {
        display: block;
        padding: 10px 0;
        border-bottom: solid 1px #62727b;
        font-size: 30px;
        text-align: right;

        span {
            font-size: 22px;
        }
    }
}
time {
    display: block;
    margin: 10px 0 0 0;
    font-size: 12px;
    text-align: right;
}
</style>

<script>
export default {
  name: 'current-price',
  props: ['results'],
  beforeUpdate: function() {
      if (this.results.chartData) {
        this._createChart(this.results.chartData)
      }
  },
  methods: {
      _createChart: function(dataParam) {
          const CTX = document.querySelector('.BitcoinChart')

          const labels = Object.keys(dataParam)
          const datasets = Object.values(dataParam)

          const bitcoinChart = new Chart(CTX, {
              type: "line",
              data: {
                  labels: labels,
                  datasets: [{
                      label: "JPY",
                      fill: false,
                      borderColor: "#ffffff",
                      borderWidth: 2,
                      pointRadius: 0,
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
                          display: false
                      }]
                  }
              }
          })
      }
  }
}
</script>
