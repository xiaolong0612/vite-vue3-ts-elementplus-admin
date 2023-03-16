<template>
  <div class="app-container">
    <aside class="mb-4">
      <a href="https://github.com/PanJiaChen/vue-countTo" target="_blank">countTo-component</a>
    </aside>
    <el-card>
      <count-to
        ref="example"
        :start-val="_startVal"
        :end-val="_endVal"
        :duration="_duration"
        :decimals="_decimals"
        :separator="_separator"
        :prefix="_prefix"
        :suffix="_suffix"
        :autoplay="false"
        class="example"
      />
    </el-card>
    <el-card :body-style="{padding: 0, paddingTop: '30px'}" class="mt-4 text-center">
      <label class="label" for="startValInput">startVal:
        <input v-model.number="setStartVal" type="number" name="startValInput">
      </label>
      <label class="label" for="endValInput">endVal:
        <input v-model.number="setEndVal" type="number" name="endVaInput">
      </label>
      <label class="label" for="durationInput">duration:
        <input v-model.number="setDuration" type="number" name="durationInput">
      </label>
      <div class="startBtn example-btn" @click="start">
        Start
      </div>
      <div class="pause-resume-btn example-btn" @click="pauseResume">
        pause/resume
      </div>
      <br>
      <label class="label" for="decimalsInput">decimals:
        <input v-model.number="setDecimals" type="number" name="decimalsInput">
      </label>
      <label class="label" for="separatorInput">separator:
        <input v-model="setSeparator" name="separatorInput">
      </label>
      <label class="label" for="prefixInput">prefix:
        <input v-model="setPrefix" name="prefixInput">
      </label>
      <label class="label" for="suffixInput">suffix:
        <input v-model="setSuffix" name="suffixInput">
      </label>
      <aside class="mt-4 text-center">
        &lt;count-to :start-val=&#x27;{{ _startVal }}&#x27; :end-val=&#x27;{{ _endVal }}&#x27; :duration=&#x27;{{ _duration }}&#x27;
        :decimals=&#x27;{{ _decimals }}&#x27; :separator=&#x27;{{ _separator }}&#x27; :prefix=&#x27;{{ _prefix }}&#x27; :suffix=&#x27;{{ _suffix }}&#x27;
        :autoplay=false&gt;
      </aside>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CountTo } from 'vue3-count-to'
import { computed, ref } from 'vue'

const setStartVal = ref<number>(0)
const setEndVal = ref<number>(2017)
const setDuration = ref<number>(4000)
const setDecimals = ref<number>(0)
const setSeparator = ref<string>(',')
const setSuffix = ref<string>('rmb')
const setPrefix = ref<string>('¥')

const _startVal = computed(() => {
  if (setStartVal.value) {
    return setStartVal.value
  } else {
    return 0
  }
})
const _endVal = computed(() => {
  if (setEndVal.value) {
    return setEndVal.value
  } else {
    return 0
  }
})
const _duration = computed(() => {
  if (setDuration.value) {
    return setDuration.value
  } else {
    return 0
  }
})
const _decimals = computed(() => {
  if (setDecimals.value) {
    if (setDecimals.value < 0 || setDecimals.value > 20) {
      alert('digits argument must be between 0 and 20')
      return 0
    }
    return setDecimals.value
  } else {
    return 0
  }
})
const _separator = computed(() => {
  return setSeparator.value
})
const _suffix = computed(() => {
  return setSuffix.value
})
const _prefix = computed(() => {
  return setPrefix.value
})
const example = ref<any>(null)
const start = () => {
  example.value.start()
}
const  pauseResume = () => {
  example.value.pauseResume()
}
</script>

<style scoped>
.example-btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 500;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  padding: 4px 15px;
  font-size: 12px;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  position: relative;
  color: rgba(0, 0, 0, .65);
  background-color: #fff;
  border-color: #d9d9d9;
}

.example-btn:hover {
  color: #4AB7BD;
  background-color: #fff;
  border-color: #4AB7BD;
}
.example {
  font-size: 50px;
  color: #F6416C;
  display: block;
  margin: 10px 0;
  text-align: center;
  font-size: 80px;
  font-weight: 500;
}

.label {
  color: #2f4f4f;
  font-size: 16px;
  display: inline-block;
  margin: 15px 30px 15px 0;
}

input {
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  width: 70px;
  height: 28px;
  cursor: text;
  font-size: 12px;
  line-height: 1.5;
  color: rgba(0, 0, 0, .65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all .3s;
  transition: all .3s;
}

.startBtn {
  margin-left: 20px;
  font-size: 20px;
  color: #30B08F;
  background-color: #fff;
}

.startBtn:hover {
  background-color: #30B08F;
  color: #fff;
  border-color: #30B08F;
}

.pause-resume-btn {
  font-size: 20px;
  color: #E65D6E;
  background-color: #fff;
}

.pause-resume-btn:hover {
  background-color: #E65D6E;
  color: #fff;
  border-color: #E65D6E;
}
</style>

