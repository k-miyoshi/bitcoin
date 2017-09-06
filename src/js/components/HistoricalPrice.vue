<template>
    <div>

        <section>
            <h2>Monthly Bit Coin Price</h2>
            <dl>
                <template v-for="(value, key) in results.bpi">
                <dt>{{ key }}</dt>
                <dd>&yen; {{ value.toFixed(4) }}</dd>
                </template>
            </dl>
            <p class="copyright">{{ results.disclaimer }}</p>
        </section>
    </div>
</template>

<style lang="scss" scoped>
section {
    margin: 40px 20px 20px 20px;
    padding: 0 20px 10px 20px;
    color: #666666;
}
h2 {
    padding: 10px 0;
    border: solid 1px #666666;
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
import Chart from 'chart.js'

export default {
    name: 'historical-price',
    props: ['results']
}
</script>
