<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import AdminLayout from "@/components/layout/AdminLayout.vue";
import { Button } from "@/components/ui/button";
import Field from "@/components/ui/field/Field.vue";
import FieldLabel from "@/components/ui/field/FieldLabel.vue";
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import type { AiAgentCreateRequest } from "@/types/aiagent";
import { createAiAgent } from "@/services/aiagent.service";

const router = useRouter();

const agentType = ref('')
const agentName = ref('')
const agentDescription = ref('')
const agentBehaviour = ref('')
const platformIntegration = ref('')

const loading = ref(false);
const errorMessage = ref("");

async function handleSubmit() {
  errorMessage.value = "";

  const platformsIntegrationIdNum: number[] = platformIntegration.value.trim()
    ? platformIntegration.value.split(',').map((value) => Number(value.trim()))
    : []

  const form: AiAgentCreateRequest = {
    AiAgentType: agentType.value,
    AiAgentName: agentName.value,
    AiAgentDescription: agentName.value,
    AiAgentBehaviour: agentBehaviour.value,
    AiAgentLinkedPlatformIntegrationId: platformsIntegrationIdNum
  }

  if (!form.AiAgentType.trim()) {
    errorMessage.value = "Agent type is required.";
    return;
  }

  if (!form.AiAgentName.trim()) {
    errorMessage.value = "Agent name is required.";
    return;
  }

  if (!form.AiAgentBehaviour.trim()) {
    errorMessage.value = "Agent behaviour is required.";
    return;
  }

  loading.value = true;

  try {
    const response = await createAiAgent(form)

    if (!response.IsSuccess) {
      throw 'Failed to Create new AiAgent'
    }

    // router.push("/agents");
  } catch (error) {
    console.error("Failed to create agent:", error);
    errorMessage.value = "Failed to create agent. Please try again.";
  } finally {
    loading.value = false;
  }
}

function handleCancel() {
  router.push("/agents");
}
</script>

<template>
  <AdminLayout>
    <div class="mx-auto max-w-5xl">
      <!-- Page Header -->
      <div class="mb-6">
        <button type="button" class="mb-3 text-sm text-gray-500 hover:text-gray-800" @click="handleCancel">
          ← Back to Agents
        </button>

        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          Create Agent
        </h1>

        <p class="mt-1 text-sm text-gray-500">
          Configure a new AI agent for your platform.
        </p>
      </div>

      <!-- Form Card -->
      <form @submit.prevent="handleSubmit">
        <div class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800">
          <div class="space-y-4">
            <!-- Agent Type -->
            <div>
              <Field>
                <FieldLabel>
                  Agent Type
                </FieldLabel>

                <Input v-model="agentType" type="text" placeholder="Type agent type here" />
              </Field>
            </div>

            <div>
              <Field>
                <FieldLabel>
                  Agent Name
                </FieldLabel>

                <Input v-model="agentName" type="text" placeholder="Type agent name here" />
              </Field>
            </div>

            <!-- Description -->
            <div>
              <Field>
                <FieldLabel>
                  Agent Description
                </FieldLabel>

                <Textarea v-model="agentDescription" placeholder="Type agent description here" />
              </Field>
            </div>

            <div>
              <Field>
                <FieldLabel>
                  Agent Behaviour
                </FieldLabel>
                <Textarea v-model="agentBehaviour" placeholder="Type agent behaviour here" />
              </Field>
            </div>

            <div>
              <Field>
                <FieldLabel>
                  Platform Integration
                </FieldLabel>

                <Input type="text" v-model="platformIntegration"
                  placeholder="Type agent type here (eg. 111, 112, 113)" />
              </Field>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage"
            class="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
            {{ errorMessage }}
          </div>

          <!-- Actions -->
          <div class="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-gray-800">

            <Button type="submit" :disabled="loading">
              {{ loading ? "Creating..." : "Create Agent" }}
            </Button>
          </div>
        </div>
      </form>
    </div>
  </AdminLayout>
</template>