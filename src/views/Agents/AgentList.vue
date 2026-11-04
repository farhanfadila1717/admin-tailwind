<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import ArrowRightIcon from '@/icons/layout/ArrowRightIcon.vue';
import PlusIcon from '@/icons/layout/PlusIcon.vue';
import { getAiAgentList } from '@/services/aiagent.service';
import type { AiAgent } from '@/types/aiagent';
import { onMounted, ref } from 'vue';

const aiAgentList = ref<AiAgent[]>([])
const loading = ref(false)
const errorMessage = ref("")

async function fetchAiAgentList() {
  loading.value = true
  errorMessage.value = ""

  try {
    const response = await getAiAgentList({ limit: 10, offset: 0 })

    aiAgentList.value = response.AiAgentList
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

    <!-- Loading view: skeleton cards matching the real card size -->
    <div v-if="loading" class="mt-6 grid sm:grid-cols-4 gap-4" aria-busy="true" aria-live="polite">
      <span class="sr-only">Loading agents...</span>
      <div v-for="n in 8" :key="n" class="flex h-50 animate-pulse flex-col rounded-lg bg-white dark:bg-gray-800 p-4"
        aria-hidden="true">
        <!-- title + ID badge -->
        <div class="flex items-center justify-between">
          <div class="h-5 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div class="h-8 w-16 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
        </div>

        <!-- description lines -->
        <div class="mt-4 space-y-2">
          <div class="h-3 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
          <div class="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div class="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>

        <!-- button -->
        <div class="mt-auto h-9 w-24 rounded-md bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>

    <!-- Loaded view -->
    <div v-else class="mt-6 grid sm:grid-cols-4 gap-4">
      <div v-for="aiagent in aiAgentList" key="aiagent.id" class="h-full">
        <RouterLink :to="`/agents/${aiagent.id}`">
          <div class="agent-card flex h-50 flex-col cursor-pointer rounded-lg bg-white dark:bg-gray-800 p-4">
            <div class="flex items-center justify-between">
              <h1 class="font-bold dark:text-white">{{ aiagent.type }}</h1>

              <div class="rounded-2xl bg-blue-50 px-4 py-2 text-sm font-semibold">
                ID: {{ aiagent.id }}
              </div>
            </div>

            <p class="mt-2 line-clamp-3 dark:text-white">
              {{ aiagent.description }}
            </p>

            <RouterLink :to="`/agents/${aiagent.id}`" class="mt-auto">
              <Button class="self-start">
                Detail
                <ArrowRightIcon />
              </Button>
            </RouterLink>
          </div>
        </RouterLink>
      </div>
    </div>
  </AdminLayout>
</template>