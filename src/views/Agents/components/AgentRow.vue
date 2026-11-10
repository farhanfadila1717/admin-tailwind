<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/utils/cn'
import type { AiAgent } from '@/types/aiagent'
import { ArrowRightIcon } from '@/icons/layout'

export interface AgentRow {
  order: AiAgent
}

const props = defineProps<AgentRow>()
</script>

<template>
  <TableRow :class="cn('cursor-pointer')">
    <TableCell class="px-6 py-4 text-start">
      <div class="flex items-center gap-3">

        <span class="text-sm font-medium text-gray-700 dark:text-gray-400">
          {{ order.id }}
        </span>
      </div>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <span class="block text-sm text-gray-700 dark:text-gray-400">
        {{ order.type }}
      </span>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        {{ order.description }}
      </span>
    </TableCell>
    <TableCell class="px-6 py-4 text-start">
      <RouterLink :to="`/agents/${order.id}`" class="mt-auto">
        <Button class="self-start">
          Detail
          <ArrowRightIcon />
        </Button>
      </RouterLink>
    </TableCell>

  </TableRow>
</template>