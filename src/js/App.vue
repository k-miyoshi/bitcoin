<template>
    <div id="app">
        <current-price></current-price>
        <historical-price></historical-price>
    </div>
</template>

<script>
import CurrentPrice from './components/CurrentPrice.vue'
import HistoricalPrice from './components/HistoricalPrice.vue'

export default {
    name: 'app',
    components: {
        CurrentPrice,
        HistoricalPrice
    }
}
</script>
