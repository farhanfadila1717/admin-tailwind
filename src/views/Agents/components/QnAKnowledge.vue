<script setup lang="ts">
import type { KnowledgeSummary } from '@/types/aiagent';

export interface QnAKnowledgeProps {
  KnowledgeSummary: KnowledgeSummary
}

const props = defineProps<QnAKnowledgeProps>();
const QnAList = props.KnowledgeSummary.QuestionAndAnswerKnowledge.QuestionAndAnswerList ?? [];

</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="QnA in QnAList">
      <div class="flex items-center space-x-2">
        <div class="min-h-8 min-w-8 bg-indigo-600 rounded-4xl flex items-center justify-center text-white">
          Q
        </div>
        <p>{{ QnA.Question }}</p>
      </div>
      <div class="mt-1 flex items-center space-x-2">
        <div class="min-h-8 min-w-8 bg-slate-600 rounded-4xl flex items-center justify-center text-white">
          A
        </div>
        <p>{{ QnA.Answer }}</p>
      </div>
    </div>
  </div>
</template>