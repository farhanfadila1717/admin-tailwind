<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import AdminLayout from "@/components/layout/AdminLayout.vue";
import { Button } from "@/components/ui/button";

const router = useRouter();

interface CreateAgentForm {
    type: string;
    description: string;
    instructions: string;
}

const form = ref<CreateAgentForm>({
    type: "",
    description: "",
    instructions: "",
});

const loading = ref(false);
const errorMessage = ref("");

async function handleSubmit() {
    errorMessage.value = "";

    if (!form.value.type.trim()) {
        errorMessage.value = "Agent type is required.";
        return;
    }

    if (!form.value.description.trim()) {
        errorMessage.value = "Description is required.";
        return;
    }

    if (!form.value.instructions.trim()) {
        errorMessage.value = "Instructions are required.";
        return;
    }

    loading.value = true;

    try {

        router.push("/agents");
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
                <div class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div class="mb-6 border-b border-gray-100 pb-4 dark:border-gray-800">
                        <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
                            General Information
                        </h2>

                        <p class="mt-1 text-sm text-gray-500">
                            Provide basic information about your agent.
                        </p>
                    </div>

                    <div class="space-y-5">
                        <!-- Agent Type -->
                        <div>
                            <label for="type" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Agent Type <span class="text-red-500">*</span>
                            </label>

                            <input id="type" v-model="form.type" type="text" placeholder="e.g. Customer Support"
                                required
                                class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-gray-700 dark:text-white" />

                            <p class="mt-1.5 text-xs text-gray-500">
                                Identify the purpose or category of this agent.
                            </p>
                        </div>

                        <!-- Description -->
                        <div>
                            <label for="description"
                                class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description <span class="text-red-500">*</span>
                            </label>

                            <textarea id="description" v-model="form.description" rows="3"
                                placeholder="Describe what this agent does..." required
                                class="w-full resize-y rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-gray-700 dark:text-white" />

                            <p class="mt-1.5 text-xs text-gray-500">
                                A short description of the agent's responsibilities.
                            </p>
                        </div>

                        <!-- Instructions -->
                        <div>
                            <label for="instructions"
                                class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                System Instructions <span class="text-red-500">*</span>
                            </label>

                            <textarea id="instructions" v-model="form.instructions" rows="8"
                                placeholder="You are an AI customer support agent. Your responsibility is..." required
                                class="w-full resize-y rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-gray-700 dark:text-white" />

                            <p class="mt-1.5 text-xs text-gray-500">
                                Define the agent's behavior, role, and response guidelines.
                            </p>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="errorMessage"
                        class="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                        {{ errorMessage }}
                    </div>

                    <!-- Actions -->
                    <div class="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-gray-800">
                        <Button type="button" variant="outline" :disabled="loading" @click="handleCancel">
                            Cancel
                        </Button>

                        <Button type="submit" :disabled="loading">
                            {{ loading ? "Creating..." : "Create Agent" }}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>