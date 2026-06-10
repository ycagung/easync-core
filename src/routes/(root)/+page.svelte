<script>
  import { Button } from '$lib/components/ui/button';
  import * as Avatar from '$lib/components/ui/avatar';
</script>

<main
  class="flex h-screen w-screen items-center justify-center bg-[url('/images/lunar-tides.jpg')] bg-cover bg-center"
>
  <div class="absolute inset-0 bg-black/60"></div>
  <div
    class="absolute top-4 left-4 z-50 flex w-[calc(100vw-2rem)] items-center justify-between rounded-full liquid-glass p-2"
  >
    <p class="ml-4 font-bold">Easync</p>
    <div class="flex items-center gap-4">
      <p class="text-sm font-medium">Superadmin</p>
      <Avatar.Root class="size-8 rounded-lg">
        <Avatar.Image src="https://i.pravatar.cc/300" alt="Superadmin" />
        <Avatar.Fallback class="rounded-lg">EA</Avatar.Fallback>
      </Avatar.Root>
    </div>
  </div>
  <div class="z-50 grid grid-cols-3 gap-8">
    <Button href="#">Credentials</Button>
  </div>
</main>
