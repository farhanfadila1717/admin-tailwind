<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/utils/cn'
import { ArrowRightIcon } from '@/icons/layout'
import { useRouter } from 'vue-router'
import type { PlatformSummary } from '@/types/platform'

export interface PlatformRow {
  item: PlatformSummary
}

const props = defineProps<PlatformRow>()
const router = useRouter()

function goToDetail(event: MouseEvent) {
  // Let the inner link/button handle its own click, so we don't navigate twice
  if ((event.target as HTMLElement).closest('a, button')) return
  router.push(`/agents/${props.item.PlatformIntegrationId}`)
}
</script>

<template>
  <TableRow :class="cn('cursor-pointer')" @click="goToDetail">
    <TableCell class="px-6 py-4 text-start">
      <div class="flex items-center gap-3">

        <span class="text-sm font-medium text-gray-700 dark:text-gray-400">
          {{ item.PlatformIntegrationId }}
        </span>
      </div>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <span class="block text-sm text-gray-700 dark:text-gray-400">
        {{ item.PlatformIntegrationUserDefinedName }}
      </span>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        {{ item.PlatformIntegrationExternalId }}
      </span>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        {{ item.PlatformIntegrationStatus }}
      </span>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <RouterLink :to="`/platform/${item.PlatformIntegrationId}`" class="mt-auto">
        <Button class="self-start">
          Detail
          <ArrowRightIcon />
        </Button>
      </RouterLink>
    </TableCell>

  </TableRow>
</template>