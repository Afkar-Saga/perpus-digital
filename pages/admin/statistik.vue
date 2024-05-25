<template>
  <div>
    <div class="container mt-4 py-4">
      <div class="row mb-3">
        <div class="col">
          <h1 class="fw-bold text-center">Statistik Pengunjung</h1>
        </div>
      </div>
      <div class="row gy-3 justify-content-between mb-3">
        <div class="col">
          <div class="stats-container">
            <h4>Total Pengunjung</h4>
            <h2 class="stats">{{ visitors?.length }}</h2>
          </div>
        </div>
        <div class="col">
          <div class="stats-container">
            <h4>Pengunjung Bulan Ini</h4>
            <h2 class="stats">{{ currentMonthVisitors?.length }}</h2>
          </div>
        </div>
        <div class="col">
          <div class="stats-container">
            <h4>Total Buku</h4>
            <h2 class="stats">{{ books?.length }}</h2>
          </div>
        </div>
      </div>
      <div class="row gy-3">
        <div class="col-md-8 col-12">
          <div class="stats-container">
            <div class="row">
              <div class="col-auto">
                <h4>Pengunjung per </h4>
              </div>
              <div class="col-auto">
                <select v-model="visitorBy" class="form-control form-select d-inline-block">
                  <option>Bulan</option>
                  <option>Jam</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <Bar :data="chartMonthlyVisitorsData" :options="chartOptions" v-if="visitorBy == 'Bulan'" />
                <Line :data="chartHourlyVisitorsData" :options="chartOptions" v-if="visitorBy == 'Jam'" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-12">
          <div class="stats-container">
            <div class="row">
              <div class="col-auto d-flex align-items-center fw-semibold">
                Jumlah Pengunjung Berdasarkan
              </div>
              <div class="col-auto">
                <select v-model="visitorBasedOn" class="form-control form-select" style="font-size: 0.75em">
                  <option>Keanggotaan</option>
                  <option>Keperluan</option>
                </select>
              </div>
            </div>
            <Pie :data="chartVisitorsByMembersData" :options="chartOptions" v-if="visitorBasedOn == 'Keanggotaan'" />
            <Pie :data="chartVisitorsByNeedsData" :options="chartOptions" v-if="visitorBasedOn == 'Keperluan'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

import { Bar, Line, Pie } from 'vue-chartjs'

const supabase = useSupabaseClient()

const { data: visitors } = useAsyncData('pengunjung', async () => {
  const { data, error } = await supabase.from('pengunjung').select()
  if (error) throw error
  if (data) {
    updateVisitorsData(data)
  }
  return data
})
const { data: books } = useAsyncData('buku', async () => {
  const { data, error } = await supabase.from('buku').select()
  if (error) throw error
  return data
})
const { data: members } = useAsyncData('keanggotaan', async () => {
  const { data, error } = await supabase.from('keanggotaan').select()
  if (error) throw error
  return data
})
const { data: needs } = useAsyncData('keperluan', async () => {
  const { data, error } = await supabase.from('keperluan').select()
  if (error) throw error
  return data
})

const visitorBy = ref('Bulan')
const visitorBasedOn = ref('Keanggotaan')

const d = new Date()
const month = d.getMonth()
const currentMonthVisitors = computed(() => {
  return visitors.value?.filter(v => {
    let createdAtMonth = new Date(v.created_at).getMonth()
    return createdAtMonth == month
  })
})

const monthlyVisitors = ref(Array(12).fill(0))
const hourlyVisitors = ref(Array(24).fill(0))

function updateVisitorsData(data) {
  data.forEach(visitor => {
    let createdAtDate = new Date(visitor.created_at)

    let createdAtMonth = createdAtDate.getMonth()
    monthlyVisitors.value[createdAtMonth]++

    let createdAtHours = createdAtDate.getUTCHours()
    hourlyVisitors.value[createdAtHours]++
  })
  chartMonthlyVisitorsData.value.datasets[0].data = monthlyVisitors.value
  chartHourlyVisitorsData.value.datasets[0].data = hourlyVisitors.value
}
const countVisitorsByMember = visitors => visitors?.reduce((counts, { keanggotaan }) => (counts[keanggotaan - 1] = (counts[keanggotaan - 1] || 0) + 1, counts), Array(members.value?.length).fill(0))
const countVisitorsByNeeds = visitors => {
  const counts = visitors.reduce((counts, { keperluan }) => {
    if (keperluan === null) {
      counts.nullCount++
    } else {
      counts.array[keperluan - 1] = (counts.array[keperluan - 1] || 0) + 1
    }
    return counts
  }, { array: Array(needs.value?.length).fill(0), nullCount: 0})
  return [...counts.array, counts.nullCount]
}

const colors = [
  'rgb(66, 133, 244)',
  'rgb(52, 168, 83)',
  'rgb(251, 188, 5)',
  'rgb(234, 67, 53)',
  'rgb(163, 42, 125)'
]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const chartMonthlyVisitorsData = ref({
  labels: months,
  datasets: [{
    label: 'Pengunjung',
    data: [],
    backgroundColor: 'rgb(53, 162, 235)'
  }]
})
const chartHourlyVisitorsData = ref({
  labels: Array.from({ length: 24 }, (_, i) => i),
  datasets: [{
    label: 'Pengunjung',
    data: [],
    borderColor: 'rgb(53, 162, 235)',
    tension: 0.1
  }]
})
const chartVisitorsByMembersData = computed(() => {
  return {
    labels: members.value?.map(({ nama }) => nama),
    datasets: [{
      label: 'Pengunjung',
      data: countVisitorsByMember(visitors.value),
      backgroundColor: colors
    }]
  }
})
const chartVisitorsByNeedsData = computed(() => {
  return {
    labels: [...needs.value?.map(({ nama }) => nama), 'Lainnya'],
    datasets: [{
      label: 'Pengunjung',
      data: countVisitorsByNeeds(visitors.value),
      backgroundColor: colors
    }]
  }
})
const chartOptions = ref({
  responsive: true
})
</script>

<style scoped>
.stats-container {
  background-color: #fafafa;
  width: 100%;
  height: 100%;
  padding: 1em;
  border-radius: 20px;
}

.stats {
  font-size: 3em;
  font-weight: bold;
}
</style>