<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import Linetab from '@/components/ui/linetab/Linetab.vue';

import { useRoute } from "vue-router";
import AgentBehaviour from './components/AgentBehaviour.vue';
import AgentKnowledge from './components/AgentKnowledge.vue';
import AgentConfiguration from './components/AgentConfiguration.vue';

const route = useRoute();

const agentId = route.params.id as string;

const tabs = ['Knowledge', 'Behaviour', 'Configuration']

</script>


<template>
  <AdminLayout>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold dark:text-white">Agent Detail ID: {{ agentId }}</h1>
    </div>

    <Linetab title="Line Variant" :tabs="tabs">
      <template #default="{ active }">
        <AgentKnowledge v-if="active === 0" :agent-id="agentId" />
        <AgentBehaviour v-else-if="active === 1" :agent-id="agentId" />
        <AgentConfiguration v-else-if="active === 2" :agent-id="agentId" />
      </template>
    </Linetab>
  </AdminLayout>
</template>
