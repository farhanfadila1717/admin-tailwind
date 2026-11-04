<script setup lang="ts">
import { Field, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { ref, watch } from 'vue'

const emit = defineEmits<{
  change: [value: string]
}>()

const openEnded = ref('')

watch(openEnded, (newValue) => {
  emit('change', newValue)
})
</script>

<template>
  <div class="mt-2 border p-4 rounded-lg">
    <Field>
      <FieldLabel>Open Ended Knowledge</FieldLabel>
      <Textarea v-model="openEnded" placeholder="Type open ended here" class="mt-2" />
    </Field>
  </div>
</template>