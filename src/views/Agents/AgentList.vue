<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import { AiIcon } from '@/icons/layout/index.ts';
import PlusIcon from '@/icons/layout/PlusIcon.vue';
import { getAiAgentList } from '@/services/aiagent.service';
import type { AiAgent } from '@/types/aiagent';
import { cn } from '@/utils/cn';
import { onMounted, ref, watch } from 'vue';
import AgentRow from './components/AgentRow.vue';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table/index.ts';
import { CardHeader, Card, CardContent } from '@/components/ui/card/index.ts';
import DefaultPagination from '@/components/ui/pagination/DefaultPagination.vue';

const PAGE_SIZE = 10

const aiAgentList = ref<AiAgent[]>([])
const loading = ref(false)
const errorMessage = ref("")
const currentPage = ref(1)
const isLast = ref(false)

watch(currentPage, fetchAiAgentList)

async function fetchAiAgentList() {
  loading.value = true
  errorMessage.value = ""
  isLast.value = false

  try {
    const response = await getAiAgentList({
      limit: PAGE_SIZE,
      offset: (currentPage.value - 1) * PAGE_SIZE,
    })

    aiAgentList.value = response.AiAgentList
    isLast.value = response.AiAgentList.length < PAGE_SIZE
  } catch (ex) {
    errorMessage.value = `${ex}`
  } finally {
    loading.value = false
  }
}

onMounted(fetchAiAgentList)
</script>

<template>
  <AdminLayout>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold dark:text-white">Agent List</h1>
      <RouterLink to="/agents/create">
        <Button class="mt-4" variant="outline">
          Create
          <PlusIcon />
        </Button>
      </RouterLink>
    </div>

    <Card :class="cn(
      'mt-6 w-full max-w-full min-w-0 gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 sm:p-0 dark:border-gray-800 dark:bg-white/3',
    )">
      <!-- Table Header Controls -->
      <CardHeader />

      <!-- Table Content -->
      <CardContent>
        <div class="max-w-full overflow-x-auto">
          <div class="min-w-175 2xl:min-w-202">
            <Table :aria-busy="loading">
              <TableHeader class="border-y border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                <TableRow>
                  <TableCell isHeader class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                    Agent ID
                  </TableCell>
                  <TableCell isHeader class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                    Type
                  </TableCell>
                  <TableCell isHeader class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                    Description
                  </TableCell>
                  <TableCell isHeader class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody class="min-h-96 divide-y divide-gray-100 dark:divide-gray-800">
                <!-- Loading: skeleton rows matching the real row layout -->
                <template v-if="loading">
                  <TableRow v-for="n in PAGE_SIZE" :key="`skeleton-${n}`" class="animate-pulse" aria-hidden="true">
                    <!-- Agent ID -->
                    <TableCell class="px-6 py-4">
                      <div class="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </TableCell>
                    <!-- Type -->
                    <TableCell class="px-6 py-4">
                      <div class="h-6 w-20 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
                    </TableCell>
                    <!-- Description -->
                    <TableCell class="px-6 py-4">
                      <div class="space-y-2">
                        <div class="h-3 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
                        <div class="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    </TableCell>
                    <!-- Action -->
                    <TableCell class="px-6 py-4">
                      <div class="h-8 w-20 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                    </TableCell>
                  </TableRow>
                  <tr class="sr-only">
                    <td colspan="4">Loading agents...</td>
                  </tr>
                </template>

                <!-- Loaded -->
                <template v-else-if="aiAgentList.length > 0">
                  <AgentRow v-for="order in aiAgentList" :key="order.type" :order="order" />
                </template>

                <!-- Empty -->
                <TableRow v-else>
                  <TableCell :colspan="4" class="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div class="flex flex-col items-center justify-center">
                      <div
                        class="mb-3 flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <AiIcon class="size-6 text-gray-800 dark:text-white/90" />
                      </div>
                      <h4 class="text-base font-semibold text-gray-800 dark:text-white/90">
                        No agent found
                      </h4>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      <!-- Table Footer - Pagination -->
      <DefaultPagination :current-page="currentPage" :total-pages="10" :is-last="isLast"
        @page-change="(page) => (currentPage = page)" />
    </Card>
  </AdminLayout>
</template>