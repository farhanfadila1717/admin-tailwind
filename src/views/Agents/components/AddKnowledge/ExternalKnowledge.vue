<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';
import { Field, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import type { ExternalKnowledge } from '@/types/aiagent'
import { ref } from 'vue'

const emit = defineEmits<{
  change: [value: ExternalKnowledge]
}>()

const scope = ref()
const destination = ref()


</script>

<template>
  <div class="mt-2 border p-4 rounded-lg">
    <h2 class="font-semibold mb-2">External Knowledge</h2>
    <Field>
      <FieldLabel>Type</FieldLabel>
      <Input v-model="scope" type="text" placeholder="Type open ended here" class="mt-1 mb-2" />
    </Field>
    <Field>
      <FieldLabel>Scope</FieldLabel>
      <Input v-model="scope" type="text" placeholder="Type open ended here" class="mt-1 mb-2" />
    </Field>
    <Field>
      <FieldLabel>Destination</FieldLabel>
      <Textarea v-model="destination" type="text" placeholder="Type open ended here" class="mt-1" />
    </Field>
  </div>
</template>