<script setup lang="ts">
import { Field, FieldLabel } from '@/components/ui/field';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import { getAiAgentBehaviour } from '@/services/aiagent.service';
import { onMounted, ref } from 'vue';

export interface AgentBehaviourProps {
  agentId: string;
}

const props = defineProps<AgentBehaviourProps>();
const behaviour = ref('')
const loading = ref(false)
const errorMessage = ref("")

async function fetchAiAgentBehaviour() {
  loading.value = true
  errorMessage.value = ""

  try {
    const response = await getAiAgentBehaviour(props.agentId)

    behaviour.value = response.AiAgentBehaviour
  } catch (ex) {
    errorMessage.value = `${ex}`
  } finally {
    loading.value = false
  }
}

onMounted(fetchAiAgentBehaviour)

</script>

<template>
  <Field>
    <FieldLabel>Behaviour</FieldLabel>

    <!-- Loading view: skeleton matching the textarea size -->
    <div v-if="loading" class="animate-pulse space-y-3 rounded-md border p-3" aria-busy="true" aria-live="polite">
      <span class="sr-only">Loading behaviour...</span>
      <div class="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
      <div class="h-3 w-11/12 rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
      <div class="h-3 w-4/5 rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
      <div class="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
      <div class="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
      <div class="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
      <div class="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
    </div>

    <!-- Error view: no textarea, so an empty field can't be saved over real data -->
    <div v-else-if="errorMessage" role="alert"
      class="flex flex-col items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
      <div>
        <p class="font-medium text-red-700 dark:text-red-400">Failed to load behaviour</p>
        <p class="mt-1 wrap-break-word text-sm text-red-600 dark:text-red-400/80">{{ errorMessage }}</p>
      </div>
      <Button variant="outline" @click="fetchAiAgentBehaviour">Try again</Button>
    </div>

    <!-- Loaded view -->
    <Textarea v-else v-model="behaviour" placeholder="Type behaviour here" :rows="10" />
  </Field>
</template>