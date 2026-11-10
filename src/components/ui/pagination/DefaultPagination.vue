<script setup lang="ts">

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utils/cn'

export interface CardFooterProps {
  currentPage?: number
  isLast?: boolean
  className?: string
}

const props = withDefaults(defineProps<CardFooterProps>(), {
  currentPage: 1,
  totalPages: 10,
  className: undefined,
})

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

const goPrevious = () => {
  if (props.currentPage > 1) emit('pageChange', props.currentPage - 1)
}
const goNext = () => {
  if (!props.isLast) emit('pageChange', props.currentPage + 1)
}
</script>

<template>
  <div :class="cn('border-t-0 px-5 py-4 sm:px-6', className)">
    <!-- Mobile Pagination (< sm) -->
    <div class="flex w-full items-center justify-between sm:hidden">
      <div class="flex items-center gap-2">
        <PaginationPrevious href="#" size="icon" variant="outline" :disabled="currentPage <= 1"
          @click.prevent="goPrevious" />
        <!-- <PaginationNext href="#" size="icon" variant="outline" :disabled="currentPage >= totalPages"
          @click.prevent="goNext" /> -->
      </div>
    </div>

    <!-- Desktop Pagination (>= sm) -->
    <div class="hidden sm:flex sm:items-center sm:justify-start">
      <Pagination class="mx-0 w-auto justify-start">
        <PaginationContent class="gap-1.5">
          <PaginationItem>
            <PaginationPrevious href="#" size="icon" variant="outline" :disabled="currentPage <= 1"
              @click.prevent="goPrevious" />
          </PaginationItem>

          <!-- <template v-for="item in pages" :key="item">
            <PaginationItem v-if="item === 'ellipsis-start' || item === 'ellipsis-end'">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem v-else>
              <PaginationLink href="#" size="icon" variant="outline" :is-active="currentPage === item"
                @click.prevent="emit('pageChange', item)">
                {{ item }}
              </PaginationLink>
            </PaginationItem>
          </template> -->
          <h1 class="mx-2">{{ currentPage }}</h1>
          <PaginationItem>
            <PaginationNext href="#" size="icon" variant="outline" :disabled="isLast" @click.prevent="goNext" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  </div>
</template>
