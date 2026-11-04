<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { buttonVariants } from '../button'
import { cn } from '@/utils'
import ChevronDownIcon from '@/icons/layout/ChevronDownIcon.vue'

withDefaults(
  defineProps<{
    options: string[]
    label?: string
    placeholder?: string
    disabled?: boolean
  }>(),
  { placeholder: 'Select an option', disabled: false },
)

const emit = defineEmits<{ change: [value: string, index: number] }>()

// Single source of truth: the parent's value (v-model).
// Also works without v-model (local state), so no manual syncing is needed.
const model = defineModel<string>()

const handleItemChange = (value: string, index: number) => {
  if (value === model.value) return
  model.value = value
  emit('change', value, index)
}
</script>

<template>
  <!-- DropdownMenu closes itself after an item is selected -->
  <DropdownMenu>
    <DropdownMenuTrigger :disabled="disabled" aria-label="Select option"
      :class="cn(buttonVariants({ variant: 'outline' }), 'h-12.5 w-full flex justify-between items-center')">
      {{ model || placeholder }}
      <ChevronDownIcon />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" class="w-full">
      <DropdownMenuItem v-for="(value, index) in options" :key="value" class="w-full cursor-pointer"
        @select="handleItemChange(value, index)">
        {{ value }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>