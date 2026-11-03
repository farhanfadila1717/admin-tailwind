<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { Button } from '@/components/ui/button';
import ArrowRightIcon from '@/icons/layout/ArrowRightIcon.vue';
import PlusIcon from '@/icons/layout/PlusIcon.vue';
</script>


<!-- 
TODO:
  1. Create agent card
  2. Navigate to agen detail
    2.1 Define agent detail route 
  3. Add floating Add Agent button
-->

<template>
  <AdminLayout>

    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Agent List</h1>
      <Button class="mt-4" variant="outline">
        Create
        <PlusIcon />
      </Button>
    </div>

    <div class="mt-6 grid grid-cols-4 gap-4">
      <div class="agent-card cursor-pointer bg-white p-4 rounded-lg" p>
        <div class="flex justify-between items-center">
          <h1 class="font-bold">Agen 1</h1>
          <div class="font-semibold bg-blue-50 px-4 py-2 text-sm rounded-2xl">ID:123</div>
        </div>
        <p class="mt-2 line-clamp-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride
          Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's
          Body Type sheets
        </p>
        <Button class="mt-4">
          Detail
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  </AdminLayout>
</template>
