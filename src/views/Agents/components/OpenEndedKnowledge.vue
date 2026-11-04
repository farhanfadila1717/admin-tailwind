<script setup lang="ts">
import type { KnowledgeSummary } from '@/types/aiagent';

export interface QnAKnowledgeProps {
  KnowledgeSummary: KnowledgeSummary
}
const props = defineProps<QnAKnowledgeProps>();
</script>

<template>
  <p class="bg-gray-100/50 rounded-lg p-4">{{ props.KnowledgeSummary.OpenEndedKnowledge.OpenEndedKnowledgeData }}</p>
</template>