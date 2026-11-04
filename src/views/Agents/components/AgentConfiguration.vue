<script setup lang="ts">
export interface AgentConfigurationProps {
    agentId: string;
}

const props = defineProps<AgentConfigurationProps>();

console.log(props.agentId);
</script>

<template>
    <h1>Agent Configuration</h1>
    <p>Agent ID: {{ props.agentId }}</p>
</template>