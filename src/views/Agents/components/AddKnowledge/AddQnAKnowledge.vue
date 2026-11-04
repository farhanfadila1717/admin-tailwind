<script setup lang="ts">
import { Button } from '@/components/ui/button'
import PlusIcon from '@/icons/layout/PlusIcon.vue'
import { Field, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import type { QuestionAndAnswer } from '@/types/aiagent'
import { ref, watch } from 'vue'
import TrashBinIcon from '@/icons/layout/TrashBinIcon.vue'

const emit = defineEmits<{
  change: [value: QuestionAndAnswer[]]
}>()

const items = ref<QuestionAndAnswer[]>([
  { Question: '', Answer: '' },
])

watch(
  items,
  (newValue) => {
    emit('change', newValue)
  },
  { deep: true },
)

const addItem = () => {
  items.value.push({
    Question: '',
    Answer: '',
  })
}

const onRemoveItem = (index: number) => {
  items.value.splice(index, 1)
}
</script>

<template>
  <div class="flex flex-col gap-4 mt-2 border p-4 rounded-lg">
    <div v-for="(qNA, index) in items" :key="index">
      <div class="flex">
        <div class="grow">
          <Field>
            <FieldLabel>Question {{ index + 1 }}</FieldLabel>
            <Input v-model="qNA.Question" type="text" placeholder="Type question here" />
          </Field>

          <Field class="mt-2">
            <FieldLabel>Answer</FieldLabel>
            <Textarea v-model="qNA.Answer" placeholder="Type answer here" />
          </Field>
          <Button v-if="items.length != 1" variant="destructive" size="xs" class='mt-2'
            @click="() => onRemoveItem(index)">
            <TrashBinIcon />
            Remove
          </Button>
        </div>

      </div>
    </div>
  </div>

  <Button variant="outline" class="mt-2" @click="addItem">
    <PlusIcon />
    Add More QnA
  </Button>
</template>