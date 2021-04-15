<template>
  <el-form :model="form.data" label-width="80px" size="mini">
    <el-form-item label="数据类型">
      <el-button 
        v-for="btn of form.type.options" 
        :key="btn.code" 
        @click="form.type.click(btn)" 
        :type="form.data.type === btn.code ? 'primary' : 'text'"
      >{{ btn.label }}</el-button>
    </el-form-item>
    <el-form-item label="数据长度" v-if="form.data.type === 'string'">
      <el-input-number v-model="form.data.length"></el-input-number>
    </el-form-item>
    <el-form-item label="整数位数" v-if="form.data.type === 'number'">
      <el-input-number v-model="form.data.intLength"></el-input-number>
    </el-form-item>
    <el-form-item label="小数位数" v-if="form.data.type === 'number'">
      <el-input-number v-model="form.data.decLength"></el-input-number>
    </el-form-item>
    <el-form-item label="自定义" v-if="form.data.type === 'self'">
      <el-input v-model="form.data.self" type="textarea" :rows="4"></el-input>
      <span>{{ `Mock.mock(${form.data.self})` }}</span>
    </el-form-item>
  </el-form>

  <el-card>
    <template #header>
      <div class="card-header">
        <span>结果</span>
        <el-button type="text" @click="copyClick">复制</el-button>
      </div>
    </template>
    <div>
      <span v-if="form.data.type === 'string'">{{ mockString }}</span>
      <span v-if="form.data.type === 'number'">{{ mockNumber }}</span>
      <span v-if="form.data.type === 'self'">{{ mockSelf }}</span>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import Mock from 'mockjs'
import { ElNotification } from 'element-plus'

const capitalize = (string: String) => {
  const [capital, ...tail] = string.split('')
  return capital.toUpperCase() + tail.join('')
} 

export default defineComponent({
  name: 'App',

  setup () {
    const form = reactive({
      data: {
        type: 'string',
        length: 10,
        intLength: 2,
        decLength: 2,
        self: `{'string|1-10': '★'}`
      },
      type: {
        options: [
          { label: '字符串', code: 'string' },
          { label: '数字', code: 'number' },
          { label: '自定义', code: 'self' }
        ],
        click (option: any) {
          form.data.type = option.code
        }
      }
    })

    const mockString = computed(() => Mock.mock(`@cword(${form.data.length})`))

    const mockNumber = computed(() => 
    Mock.mock(`@float(${(form.data.intLength - 1) * 10}, ${Math.pow(10, form.data.intLength)}, ${form.data.decLength}, ${form.data.decLength})`))
    const mockSelf = computed(() => Mock.mock(form.data.self))

    return { form, mockString, mockNumber, mockSelf }
  },

  methods: {
    copyClick (e: any) {
      const input = document.createElement('input')
      input.value = this[`mock${capitalize(this.form.data.type)}`]
      // input.value = ''
      document.body.appendChild(input)
      input.select()
      document.execCommand("Copy")
      document.body.removeChild(input)
      ElNotification({ title: '', message: '复制成功', type: 'success' })
      e.stopPropagation()
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
}
</style>