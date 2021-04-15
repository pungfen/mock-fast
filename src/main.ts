import { createApp } from 'vue'

import { ElForm, ElFormItem, ElButton, ElInput, ElInputNumber, ElCard } from 'element-plus'
// import ElementPlus from 'element-plus'

import App from './App.vue'

const app = createApp(App)

// app.use(ElementPlus)

app.component(ElForm.name, ElForm)
app.component(ElFormItem.name, ElFormItem)
app.component(ElButton.name, ElButton)
app.component(ElInput.name, ElInput)
app.component(ElInputNumber.name, ElInputNumber)
app.component(ElCard.name, ElCard)

app.mount('#app')
