import { name } from '../package.json'
import css from 'rollup-plugin-css-only'
import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript2 from 'rollup-plugin-typescript2'
const file = type => `dist/${name}.${type}.js`
const overrides = {
  compilierOptions: {
    declaration: true,
    exclude: [
      'node_modules',
      'src/App.vue',
      'src/index.ts'
    ]
  }
}

function myExample () {
  return {
    name: 'my-example',
    // 构建开始
    buildStart (options) {

    },
    // 加载中， 拿到的id为文件地址
    load (id) {

    },
    // 转换，可拿到源代码和文件地址
    transform (code, id) {
      if (code.slice(-5) !== '.json') return null
      try {
        const parsed = JSON.parse(code)
        const transformCode = dataToEsm(parsed)
        console.log(transformCode)
        return {
          code: transformCode
        }
      } catch (error) {

      }
    },
    // 构建结束
    buildEnd (error) {
      console.log(error)
    }
  }
}

export default {
  input: 'src/index.ts',
  output: {
    name,
    file: file('esm'),
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    typescript2({ tsconfigOverride: overrides }),
    vue(),
    css({ output: 'bundle.css' })
  ],
  external: [
    'vue', 'lodash-es'
  ]
}