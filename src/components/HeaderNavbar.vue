<template>
  <nav class="fixed top-0 left-0 z-50 w-full p-4">
    <div class="container flex items-center justify-between mx-auto">
      <!-- Logo or brand name -->
      <div class="text-4xl font-bold text-white">🪱</div>

      <!-- Navigation links -->
      <ul class="flex space-x-4 text-xl text-red-600">
        <li>
          <router-link class="font-semibold hover:underline" to="/posts">Artiklar</router-link>
        </li>

        <li>
          <router-link to="#adviceSection" class="font-semibold hover:underline"
            >Tipsa oss!?</router-link
          >
        </li>
        <li>
          <a class="font-semibold hover:underline">Prenumerera</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
