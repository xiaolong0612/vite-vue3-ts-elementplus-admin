<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "redirect",
  created() {
    const { params, query } = useRoute()
    const { path } = params
    useRouter().replace({ path: '/' + path, query }).catch((err) => {
      console.warn(err)
    })
  },

  // eslint-disable-next-line vue/require-render-return
  render() {
    return ''
  }

})
</script>