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

    console.log(response)

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

    <div class="mt-6 grid sm:grid-cols-4 gap-4">
      <div v-for="aiagent in aiAgentList" key="aiagent.id" class="h-full">
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

          <Button class="mt-auto self-start">
            Detail
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
