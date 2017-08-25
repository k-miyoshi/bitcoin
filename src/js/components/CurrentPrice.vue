<template>
<section>
    <h1><span>Bit Coin Price Index</span></h1>
    <dl>
        <dt>{{ results.bpi.USD.description }}</dt>
        <dd>$ {{ results.bpi.USD.rate }}</dd>
        <dt>{{ results.bpi.JPY.description }}</dt>
        <dd>&yen; {{ results.bpi.JPY.rate }}</dd>
    </dl>
    <time :datetime="results.time.updatedISO">updated {{ results.time.updatedISO }}</time>
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
    padding: 10px 0;

    dt {
        padding: 10px 0 0 0;
    }
    dd {
        display: block;
        padding: 10px 0;
        border-bottom: solid 1px #62727b;
        font-size: 30px;
        text-align: right;
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
import axios from 'axios'

const CURRENT_API = 'https://api.coindesk.com/v1/bpi/currentprice/JPY.json'

export default {
  name: 'current-price',
  data: function() {
    return {
        results: {
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
        }
    }
  },
  created: function() {
    axios.get(CURRENT_API)
    .then((response) => {
        this.results = response.data
    })
    .catch((error) => {
        console.log(error)
    })
  }
}
</script>
