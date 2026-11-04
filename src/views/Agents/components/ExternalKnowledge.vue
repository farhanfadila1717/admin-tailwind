<script setup lang="ts">
import type { KnowledgeSummary } from '@/types/aiagent';

interface ExternalKnowledgeProps {
  KnowledgeSummary: KnowledgeSummary
}

const props = defineProps<ExternalKnowledgeProps>();
const externalKnowledge = props.KnowledgeSummary.ExternalKnowledge;

</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="bg-gray-100/50 p-4 rounded-lg">
      <p class="text-sm font-normal text-brand-500">Type</p>
      <p>{{ externalKnowledge.ExternalKnowledgeType }}</p>
    </div>
    <div class="bg-gray-100/50 p-4 rounded-lg">
      <p class="text-sm font-normal text-brand-500">Scope</p>
      <p>{{ externalKnowledge.ExternalKnowledgeScope }}</p>
    </div>
    <div class="bg-gray-100/50 p-4 rounded-lg">
      <p class="text-sm font-normal text-brand-500">Destination</p>
      <p>{{ externalKnowledge.ExternalKnowledgeDestination }}</p>
    </div>
  </div>
</template>