<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import StringExtensions from '@/extensions/StringExtensions';
import { getExecutionDetail } from '@/services/execution.service';
import type { ExecutionData } from '@/types/execution';
import { computed, onMounted, ref } from 'vue';

import { useRoute } from "vue-router";

const route = useRoute();

const executionId = route.params.id as string;

const executionDetail = ref<ExecutionData>()
const loading = ref(false)
const errorMessage = ref("")

const inputPct = computed(() =>
  Math.round(((executionDetail?.value?.usage?.input_tokens ?? 0) / (executionDetail?.value?.usage?.total_tokens ?? 0)) * 100),
)

const errorText = computed(() => {
  const e = executionDetail?.value?.error
  if (!e) return null
  return typeof e === 'string' ? e : (e.message ?? JSON.stringify(e))
})

const details = computed(() => [
  { label: 'Agent', value: executionDetail.value?.agent_name, sub: executionDetail.value?.agent_id },
  { label: 'Channel', value: executionDetail.value?.channel.name, sub: executionDetail.value?.channel.type },
  { label: 'Trigger', value: executionDetail.value?.trigger.type, sub: null },
  { label: 'Model', value: executionDetail.value?.model.name, sub: executionDetail.value?.model.provider },
  { label: 'User', value: executionDetail.value?.user_id, sub: null },
  { label: 'Conversation', value: executionDetail.value?.conversation_id, sub: null },
])


const queueMs = computed(
  () => new Date(executionDetail.value!.started_at).getTime() - new Date(executionDetail.value!.created_at).getTime(),
)
const runMs = computed(
  () => new Date(executionDetail.value!.completed_at).getTime() - new Date(executionDetail.value!.started_at).getTime(),
)

const fmtDuration = (ms: number) => (ms >= 1000 ? `${(ms / 1000).toFixed(2)} s` : `${ms} ms`)

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
  }) + ' UTC'

const timeline = computed(() => [
  { label: 'Created', time: executionDetail.value?.created_at, note: 'Execution queued' },
  { label: 'Started', time: executionDetail.value?.started_at, note: `Waited ${fmtDuration(queueMs.value)}` },
  { label: 'Completed', time: executionDetail.value?.completed_at, note: `Ran for ${fmtDuration(runMs.value)}` },
])


const fmtNum = (n: number) => n.toLocaleString('en-US')

async function fetchAiAgentKnowledgeList() {
  loading.value = true
  errorMessage.value = ""

  try {
    const response = await getExecutionDetail(executionId)

    executionDetail.value = response
  } catch (ex) {
    errorMessage.value = `${ex}`
  } finally {
    loading.value = false
  }
}

onMounted(fetchAiAgentKnowledgeList)

</script>


<template>
  <AdminLayout>
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold dark:text-white">Execution Detail ID</h1>
    </div>

    <h1 class="mt-2 mb-6 text-black dark:text-white">{{ executionId }}</h1>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <!-- Left Side -->
      <div class="space-y-6 xl:col-span-2">
        <section class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">Conversation</h2>

          <div class="space-y-5">
            <div class="flex items-start gap-3">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-theme-xs font-semibold text-gray-600 dark:bg-white/5 dark:text-gray-300">
                U
              </div>
              <div class="max-w-xl">
                <p class="mb-1 text-theme-xs text-gray-500 dark:text-gray-400">
                  {{ executionDetail?.user_id }} via {{ executionDetail?.channel.name }}
                </p>
                <div
                  class="rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 text-theme-sm text-gray-800 dark:bg-white/5 dark:text-white/90">
                  {{ executionDetail?.input_preview }}
                </div>
              </div>
            </div>

            <div class="flex flex-row-reverse items-start gap-3">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-theme-xs font-semibold text-white">
                AI
              </div>
              <div class="max-w-xl text-right">
                <p class="mb-1 text-theme-xs text-gray-500 dark:text-gray-400">
                  {{ executionDetail?.agent_name }}
                </p>
                <div class="rounded-2xl rounded-tr-sm bg-brand-500 px-4 py-3 text-left text-theme-sm text-white">
                  {{ executionDetail?.output_preview }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white/90">Token usage</h2>
            <span class="text-theme-sm text-gray-500 dark:text-gray-400">
              {{ 1 + 1 }} total
            </span>
          </div>
          <div class="flex h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div class="h-full bg-brand-500" :style="{ width: inputPct + '%' }"></div>
            <div class="h-full bg-brand-200 dark:bg-brand-800 flex-1"></div>
          </div>
          <div class="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-theme-sm text-gray-600 dark:text-gray-400">
            <span class="flex items-center gap-2">
              <span class="h-2.5 w-2.5 rounded-full bg-brand-500"></span>
              Input {{ fmtNum(executionDetail?.usage.input_tokens ?? 0) }} ({{ inputPct }}%)
            </span>
            <span class="flex items-center gap-2">
              <span class="h-2.5 w-2.5 rounded-full bg-brand-200 dark:bg-brand-800"></span>
              Output {{ fmtNum(executionDetail?.usage.output_tokens ?? 0) }} ({{ 100 - inputPct }}%)
            </span>
          </div>
        </section>

        <!-- Error -->
        <section class="mt-6 rounded-2xl border p-5" :class="errorText
          ? 'border-error-200 bg-error-50 dark:border-error-500/30 dark:bg-error-500/10'
          : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]'
          ">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white/90">Errors</h2>
          <p class="mt-2 text-theme-sm"
            :class="errorText ? 'text-error-600 dark:text-error-500' : 'text-gray-500 dark:text-gray-400'">
            {{ errorText ?? 'No errors. This execution finished without problems.' }}
          </p>
        </section>
      </div>

      <!-- Right Side -->
      <div class="space-y-6">
        <section class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Details</h2>
          <dl class="divide-y divide-gray-100 dark:divide-gray-800">
            <div v-for="d in details" :key="d.label" class="py-3">
              <dt class="text-theme-xs text-gray-500 dark:text-gray-400">{{ d.label }}</dt>
              <dd class="mt-0.5 break-all text-theme-sm font-medium text-gray-800 dark:text-white/90">
                <span class="capitalize" v-if="d.label === 'Trigger'">{{ d.value }}</span>
                <template v-else>{{ d.value }}</template>
                <span v-if="d.sub" class="ml-1 font-normal text-gray-500 dark:text-gray-400">
                  {{ d.sub }}
                </span>
              </dd>
            </div>
          </dl>
        </section>

        <section class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Timeline</h2>
          <ol class="relative ml-2 border-l border-gray-200 dark:border-gray-700">
            <li v-for="(t, i) in timeline" :key="t.label" class="mb-5 ml-5 last:mb-0">
              <span
                class="absolute -left-[7px] mt-1 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-900"
                :class="i === timeline.length - 1 ? 'bg-success-500' : 'bg-brand-500'"></span>
              <p class="text-theme-sm font-medium text-gray-800 dark:text-white/90">{{ t.label }}</p>
              <p class="text-theme-xs text-gray-500 dark:text-gray-400">{{ t.time }}</p>
              <p class="text-theme-xs text-gray-500 dark:text-gray-400">{{ t.note }}</p>
            </li>
          </ol>
        </section>
      </div>
    </div>
  </AdminLayout>
</template>
