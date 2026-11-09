<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { SidebarHeader } from '@/components/ui/sidebar'

interface AppSidebarHeaderProps {
  showContent: boolean
}

defineProps<AppSidebarHeaderProps>()
</script>

<template>
  <SidebarHeader class="px-5 py-8">
    <RouterLink to="/">
      <template v-if="showContent">
        <div class="flex items-center space-x-2">
          <img src="/images/logo/logo-icon.svg" alt="Logo" width="32" height="32"
            :style="{ width: 'auto', height: 'auto' }" />
          <h1 class="font-bold text-black dark:text-white">balesindong.ai</h1>
        </div>
      </template>
      <img v-else src="/images/logo/logo-icon.svg" alt="Logo" width="32" height="32"
        :style="{ width: 'auto', height: 'auto' }" />
    </RouterLink>
  </SidebarHeader>
</template>
