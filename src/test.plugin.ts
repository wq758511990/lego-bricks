import { App } from 'vue'
const plugins = {
  install: (app: App) => {
    app.config.globalProperties.$echo = () => {
      console.log('a plugin')
    }
    // app.component(component.name, component) // 注册全局组件
  },
}

export default plugins

/**
 * main.ts中
 * import plugins from './test.plugin.ts'
 * app.use(plugins)
 */
