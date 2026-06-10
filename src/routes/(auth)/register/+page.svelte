<script>
  import RegisterForm from '$lib/components/forms/auth/register-form.svelte';
</script>

<svelte:head><title>Easync - Register your account</title></svelte:head>

<div
  class="flex min-h-svh flex-col items-center justify-center gap-6 bg-[url('/images/lunar-tides.jpg')] bg-cover bg-center p-6 md:p-10"
>
  <div class="absolute inset-0 bg-black/60"></div>
  <div class="z-50 flex w-full max-w-sm flex-col gap-6">
    <a href="#/" class="flex items-center gap-2 self-center font-medium">
      <p class="text-3xl font-bold">Easync</p>
    </a>
    <RegisterForm />
  </div>
</div>
