<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { Button } from "@/components/ui/button";
import Field from "@/components/ui/field/Field.vue";
import FieldLabel from "@/components/ui/field/FieldLabel.vue";
import { Input } from '@/components/ui/input';
import { createPlatform } from '@/services/platform.service';
import type { PlatformCreateRequest } from '@/types/platform';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const platformExternalId = ref("")
const platformUserDefinedName = ref("")
const loading = ref(false);
const errorMessage = ref("");

async function handleSubmit() {
  errorMessage.value = "";

  const form: PlatformCreateRequest = {
    platform_id: "",
    platform_external_id: platformExternalId.value.trim(),
    platform_user_defined_name: platformUserDefinedName.value.trim(),
  }

  if (!form.platform_external_id) {
    errorMessage.value = "Platform external id is required.";
    return;
  }

  if (!form.platform_user_defined_name) {
    errorMessage.value = "Platform user defined name is required.";
    return;
  }


  loading.value = true;

  try {
    const response = await createPlatform(form)

    if (!response.IsSuccess) {
      throw 'Failed to Create new Platform'
    }
  } catch (error) {
    console.error("Failed to create platform:", error);
    errorMessage.value = "Failed to create platform. Please try again.";
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
          Create Platform
        </h1>

        <p class="mt-1 text-sm text-gray-500">
          Configure a new Platform
        </p>
      </div>

      <!-- Form Card -->
      <form @submit.prevent="handleSubmit">
        <div class="rounded-xl border border-gray-200 bg-white dark:bg-gray-800 p-6 dark:border-gray-800">
          <div class="space-y-4">
            <!-- Agent Type -->
            <div>
              <Field>
                <FieldLabel>
                  Platform External ID
                </FieldLabel>

                <Input v-model="platformExternalId" type="text" placeholder="Type platform external id" />
              </Field>
            </div>

            <div>
              <Field>
                <FieldLabel>
                  Platform User Defined Name
                </FieldLabel>

                <Input v-model="platformUserDefinedName" type="text" placeholder="Type platform defined name" />
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
              {{ loading ? "Creating..." : "Create" }}
            </Button>
          </div>
        </div>
      </form>
    </div>
  </AdminLayout>
</template>