<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue'
import StringsDropdown from '@/components/ui/dropdown-menu/StringsDropdown.vue';
import { KNOWLEDGE_SUMMARY_TYPES, type CreateKnowladgeRequest, type ExternalKnowledge as ExternalKnowledgeType, type KnowledgeSummaryType, type OpenEndedKnowledge as OpenEndedKnowledgeType, type QuestionAndAnswer, type QuestionAndAnswerKnowledge } from '@/types/aiagent';
import AddQnAKnowledge from './AddQnAKnowledge.vue';
import OpenEndedKnowledge from './OpenEndedKnowledge.vue';
import ExternalKnowledge from './ExternalKnowledge.vue';
import { createAiAgentKnowledge } from '@/services/aiagent.service.ts';

const props = defineProps<{
  agentId: string
}>()

const emit = defineEmits<{
  added: [] // parent refreshes the knowledge list
}>()

// v-model:open from the parent controls visibility
const open = defineModel<boolean>('open', { default: false })

const submitting = ref(false)
const errorMessage = ref('')

async function onSubmit() {
  submitting.value = true
  errorMessage.value = ''

  const prevValue = createKnowledge.value
  switch (knowledgeType.value) {
    case "OPEN_ENDED":
      createKnowledge.value = {
        AiAgentId: Number.parseInt(props.agentId),
        AiKnowledgeType: "OPEN_ENDED",
        OpenEndedKnowledge: prevValue.OpenEndedKnowledge,
      }
      break;
    case "EXTERNAL_KNOWLEDGE":
      createKnowledge.value = {
        AiAgentId: Number.parseInt(props.agentId),
        AiKnowledgeType: "EXTERNAL_KNOWLEDGE",
        ExternalKnowledge: prevValue.ExternalKnowledge,
      }
      break;
    case "FREQUENTLY_ASKED_QUESTIONS":
      createKnowledge.value = {
        AiAgentId: Number.parseInt(props.agentId),
        AiKnowledgeType: "FREQUENTLY_ASKED_QUESTIONS",
        QuestionAndAnswerKnowledge: prevValue.QuestionAndAnswerKnowledge,
      }
      break;

    default:
      break;
  }

  try {
    const respone = await createAiAgentKnowledge(createKnowledge.value)

    if (!respone.IsSuccess) {
      throw 'Failed to create knowledge'
    }

    emit('added')
    open.value = false // close on success
  } catch (ex) {
    errorMessage.value = `${ex}`
  } finally {
    submitting.value = false
  }

}

const knowledgeType = ref<KnowledgeSummaryType>()
const createKnowledge = ref<CreateKnowladgeRequest>({
  AiAgentId: Number.parseInt(props.agentId),
})


function resetForm() {
  knowledgeType.value = undefined
  errorMessage.value = ''
  submitting.value = false
}

const handleItemChange = (value: string, _: number) => {
  knowledgeType.value = value as KnowledgeSummaryType
}

const handleFaqsChange = (value: QuestionAndAnswer[]) => {
  const questionAndAnswer: QuestionAndAnswerKnowledge = {
    QuestionAndAnswerList: value
  }

  createKnowledge.value!.QuestionAndAnswerKnowledge = questionAndAnswer
}

const handleOpenEndedChange = (value: string) => {
  const openEndedKnowledge: OpenEndedKnowledgeType = {
    OpenEndedKnowledgeData: value
  }

  createKnowledge.value!.OpenEndedKnowledge = openEndedKnowledge
}

const handleExternalKnowledgeChange = (value: ExternalKnowledgeType) => {
  createKnowledge.value!.ExternalKnowledge = value
}



// Reset every time the dialog closes (Cancel, X, overlay click, Esc, or after saving)
watch(open, (isOpen) => {
  if (!isOpen) resetForm()
})


</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="flex max-h-[85vh] flex-col sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Add Knowledge</DialogTitle>
      </DialogHeader>

      <!-- Put your form fields here -->
      <div class="-mx-6 min-h-0 flex-1 overflow-y-auto px-6 py-2">
        <h2 class="mb-2">Knowledge Type</h2>

        <StringsDropdown :options="[...KNOWLEDGE_SUMMARY_TYPES]" @change="handleItemChange" />
        <AddQnAKnowledge v-if="knowledgeType === 'FREQUENTLY_ASKED_QUESTIONS' && knowledgeType != null"
          v-on:change="handleFaqsChange" />
        <OpenEndedKnowledge v-else-if="knowledgeType === 'OPEN_ENDED' && knowledgeType != null"
          v-on:change="handleOpenEndedChange" />
        <ExternalKnowledge v-else-if="knowledgeType === 'EXTERNAL_KNOWLEDGE' && knowledgeType != null"
          v-on:change="handleExternalKnowledgeChange" />
      </div>

      <DialogFooter>
        <Button variant="outline" :disabled="submitting" @click="open = false">Cancel</Button>
        <Button :disabled="submitting" @click="onSubmit">
          {{ submitting ? 'Saving...' : 'Add' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>