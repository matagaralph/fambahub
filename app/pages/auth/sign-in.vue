<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="space-y-1">
        <h1 class="text-xl font-semibold">Welcome back</h1>
        <p class="text-sm text-muted">Sign in to FambaHub</p>
      </div>
    </template>

    <UForm class="space-y-4">
      <UFormGroup label="Email" name="email">
        <UInput type="email" placeholder="you@example.com" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput type="password" placeholder="••••••••" />
      </UFormGroup>

      <UButton type="submit" block label="Sign in" />
    </UForm>

    <template #footer>
      <p class="text-xs text-muted">
        By continuing you agree to FambaHub terms.
      </p>
    </template>
  </UCard>
</template>
