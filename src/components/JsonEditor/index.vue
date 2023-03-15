<!--
 * @Description: JSON 编辑器
 * @Author: Amber
 * @Date: 2023-03-13 22:23:32
 * @LastEditTime: 2023-03-15 13:04:36
 * @LastEditors: Amber
-->
<template>
  <div ref="codeEditBox" class="codeEditBox" />
</template>
<script lang="ts">
import {
  defineComponent, onBeforeUnmount, onMounted, ref, watch,
} from 'vue'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import * as monaco from 'monaco-editor'
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution'
import { editorProps } from './types'
export default defineComponent({
  name: 'MonacoEditor',
  props: editorProps,
  emits: ['update:modelValue', 'change', 'editor-mounted'],
  setup(props, { emit }) {
    (self as any).MonacoEnvironment = {
      getWorker(_: string, label: string) {
        if (label === 'json') {
          return new JsonWorker()
        }
        if (['css', 'scss', 'less'].includes(label)) {
          return new CssWorker()
        }
        if (['html', 'handlebars', 'razor'].includes(label)) {
          return new HtmlWorker()
        }
        if (['typescript', 'javascript'].includes(label)) {
          return new TsWorker()
        }
        return new EditorWorker()
      },
    }
    
    let editor: any
    const codeEditBox = ref()

    const init = () => {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false,
      })
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
      })
      
      editor = monaco.editor.create(codeEditBox.value, {
        value: props.modelValue,
        language: props.language,
        readOnly: props.readOnly,
        theme: props.theme,
        ...props.options,
      })

      // 监听值的变化
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue() // 给父组件实时返回最新文本
        emit('update:modelValue', value)
        emit('change', value)
      })

      emit('editor-mounted', editor)
    }
    watch(
      () => props.modelValue,
      (newValue) => {
        if (editor) {
          const value = editor.getValue()
          if (newValue !== value) {
            editor.setValue(newValue)
          }
        }
      },
    )

    watch(
      () => props.options,
      (newValue) => {
        editor.updateOptions(newValue)
      },
      { deep: true },
    )
    watch(
      () => props.readOnly,
      () => {
        console.log('props.readOnly', props.readOnly)
        editor.updateOptions({ readOnly: props.readOnly })
      },
      { deep: true },
    )

    watch(
      () => props.language,
      (newValue) => {
        monaco.editor.setModelLanguage(editor.getModel()!, newValue)
      },
    )

    onBeforeUnmount(() => {
      editor.dispose()
    })

    onMounted(() => {
      init()
    })

    return { codeEditBox }
  },
})
</script>
<style lang="scss" scoped>
.codeEditBox {
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 100px;
  // height: 200px;
  overflow-y: auto;
}

.codeEditBox1 {
  height: calc(100% - 323px);
}
</style>
