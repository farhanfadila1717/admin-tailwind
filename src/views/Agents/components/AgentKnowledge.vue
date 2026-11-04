<script setup lang="ts">
import { getAiAgentKnowledgeList } from '@/services/aiagent.service';
import type { KnowledgeSummary } from '@/types/aiagent';
import { onMounted, ref } from 'vue';
import QnAKnowledge from './QnAKnowledge.vue';
import OpenEndedKnowledge from './OpenEndedKnowledge.vue';
import ExternalKnowledge from './ExternalKnowledge.vue';
import PlusIcon from '@/icons/layout/PlusIcon.vue';
import { TrashBinIcon } from '@/icons/layout/index.ts';
import Button from '@/components/ui/button/Button.vue';
import Switch from '@/components/ui/switch/Switch.vue';
import AddKnowledge from './AddKnowledge/AddKnowledge.vue'

export interface AgentKnowledgeProps {
  agentId: string;
}

const props = defineProps<AgentKnowledgeProps>();

const knowledgeList = ref<KnowledgeSummary[]>([])

const loading = ref(false)
const errorMessage = ref("")
const showAddDialog = ref(false)

async function fetchAiAgentKnowledgeList() {
  loading.value = true
  errorMessage.value = ""

  try {
    const response = await getAiAgentKnowledgeList(props.agentId)

    knowledgeList.value = response.KnowledgeSummaryList
  } catch (ex) {
    errorMessage.value = `${ex}`
  } finally {
    loading.value = false
  }
}

onMounted(fetchAiAgentKnowledgeList)

</script>

<template>
  <Button variant="default" class="mb-4" @click="showAddDialog = true">
    <PlusIcon />
    Add Knowledge
  </Button>
  <AddKnowledge v-model:open="showAddDialog" :agent-id="agentId" @added="fetchAiAgentKnowledgeList" />

  <!-- Loading view: skeleton rows matching the knowledge card layout -->
  <div v-if="loading" class="flex flex-col gap-4" aria-busy="true" aria-live="polite">
    <span class="sr-only">Loading knowledge...</span>
    <div v-for="n in 3" :key="n" class="animate-pulse rounded-lg border p-4" aria-hidden="true">
      <!-- header: status dot, name, switch + delete button -->
      <div class="mb-4 flex items-center space-x-2">
        <div class="size-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div class="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div class="ml-auto flex items-center gap-4">
          <div class="h-5 w-9 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div class="h-9 w-24 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>

      <!-- body lines -->
      <div class="space-y-2">
        <div class="h-3 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
        <div class="h-3 w-11/12 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div class="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  </div>

  <!-- Loaded view -->
  <div v-else class="flex flex-col gap-4">
    <div v-for="value in knowledgeList" :key="value.KnowledgeSummaryId">
      <div class="border p-4 rounded-lg">
        <div class="flex items-center space-x-2 mb-2">
          <div class="size-2 outline-2 outline-green-100 bg-green-400 rounded-full"></div>
          <h1>{{ value.KnowledgeSummaryName }}</h1>
          <div class="ml-auto">
            <Switch :model-value="value.KnowledgeSummaryStatus === `ACTIVE`" class="mr-4" />
            <Button variant="outline">
              <TrashBinIcon />
              Delete
            </Button>
          </div>
        </div>
        <QnAKnowledge v-if="value.KnowledgeSummaryType === 'FREQUENTLY_ASKED_QUESTIONS'" :-knowledge-summary="value" />
        <OpenEndedKnowledge v-else-if="value.KnowledgeSummaryType === 'OPEN_ENDED'" :-knowledge-summary="value" />
        <ExternalKnowledge v-else-if="value.KnowledgeSummaryType === 'EXTERNAL_KNOWLEDGE'"
          :-knowledge-summary="value" />
      </div>
    </div>
  </div>
</template>