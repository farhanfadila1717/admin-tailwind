<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    tabs: string[]
    modelValue?: number // active tab index (v-model)
    title?: string
  }>(),
  { modelValue: 0 },
)

const emit = defineEmits<{
  'update:modelValue': [index: number]
  change: [index: number, label: string]
}>()

// Works controlled (v-model) or uncontrolled (just @change)
const active = ref(props.modelValue)
watch(() => props.modelValue, (v) => (active.value = v))

const tabRefs = ref<HTMLButtonElement[]>([])

const select = (index: number) => {
  if (index === active.value) return
  active.value = index
  emit('update:modelValue', index)
  emit('change', index, props.tabs[index])
}

// Arrow-key navigation (WAI-ARIA tabs pattern)
const onKeydown = (e: KeyboardEvent, index: number) => {
  const last = props.tabs.length - 1
  let next = index
  if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1
  else if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = last
  else return

  e.preventDefault()
  select(next)
  tabRefs.value[next]?.focus()
}
</script>

<template>

  <!-- Card body -->
  <div class="mt-6">
    <div class="rounded-xl border border-gray-200 p-6 dark:border-gray-800 bg-white dark:bg-gray-800">
      <!-- Tab list -->
      <div class="border-b border-gray-200 dark:border-gray-800">
        <nav class="-mb-px flex space-x-6 overflow-x-auto [&::-webkit-scrollbar]:hidden" role="tablist">
          <button v-for="(label, index) in tabs" :key="label" :id="`tab-${index}`"
            :ref="(el) => (tabRefs[index] = el as HTMLButtonElement)" type="button" role="tab"
            :aria-selected="active === index" :aria-controls="`panel-${index}`" :tabindex="active === index ? 0 : -1"
            @click="select(index)" @keydown="onKeydown($event, index)" :class="[
              'inline-flex items-center whitespace-nowrap rounded-t-md border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40',
              active === index
                ? 'border-brand-500 text-brand-500 dark:border-brand-400 dark:text-brand-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
            ]">
            {{ label }}
          </button>
        </nav>
      </div>

      <!-- Content: rendered by the parent via the default slot -->
      <div :id="`panel-${active}`" role="tabpanel" :aria-labelledby="`tab-${active}`" tabindex="0"
        class="pt-4 focus-visible:outline-none">
        <slot :active="active" />
      </div>
    </div>
  </div>
</template>