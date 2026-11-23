<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/utils/cn'
import { ArrowRightIcon } from '@/icons/layout'
import { useRouter } from 'vue-router'
import type { ExecutionSummary } from '@/types/execution'

export interface ExecutionRow {
  item: ExecutionSummary
}

const props = defineProps<ExecutionRow>()
const router = useRouter()

function goToDetail(event: MouseEvent) {
  // Let the inner link/button handle its own click, so we don't navigate twice
  if ((event.target as HTMLElement).closest('a, button')) return
  router.push(`/execution/${props.item.execution_id}`)
}
</script>

<template>
  <TableRow :class="cn('cursor-pointer')" @click="goToDetail">
    <TableCell class="px-6 py-4 text-start">
      <div class="flex items-center gap-3">

        <span class="text-sm font-medium text-gray-700 dark:text-gray-400">
          {{ item.execution_id }}
        </span>
      </div>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <span class="block text-sm text-gray-700 dark:text-gray-400">
        {{ item.agent_name }}
      </span>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        {{ item.conversation_id }}
      </span>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        {{ item.completed_at }}
      </span>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <RouterLink :to="`/execution/${item.execution_id}`" class="mt-auto">
        <Button class="self-start">
          Detail
          <ArrowRightIcon />
        </Button>
      </RouterLink>
    </TableCell>

  </TableRow>
</template>