<script setup lang="ts">
export interface AgentBehaviourProps {
    agentId: string;
}

const props = defineProps<AgentBehaviourProps>();

</script>

<template>
    <h1>Agent Behaviour</h1>
    <p>Agent ID: {{ props.agentId }}</p>
</template>