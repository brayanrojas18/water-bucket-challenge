<script setup lang="ts">
import { ref } from "vue";

// STATE
const form = ref<any>({
  first_bucket: null,
  last_bucket: null,
  quantity: null,
});
const bucket1 = ref<number>(0);
const bucket2 = ref<number>(0);

const activeMenu = ref<string | null>(null);
const menuStyle = ref<Record<string, string>>({});
const savedData = ref<boolean>(false);
const showPopover = ref<boolean>(false);
const resultMessage = ref<string>("");
const showResponse = ref<boolean>(false);

const popoverStyle = { top: "70px", left: "800px" };

const openMenu = (menuId: string, event: MouseEvent) => {
  if (!savedData.value) {
    togglePopover();
    return;
  }

  activeMenu.value = activeMenu.value === menuId ? null : menuId;
  if (activeMenu.value === menuId) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    menuStyle.value = {
      top: `${rect.top + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
    };
  }
};
const togglePopover = () => {
  showPopover.value = !showPopover.value;
};
const checkSolution = () => {
  if (
    bucket1.value === form.value.quantity ||
    bucket2.value === form.value.quantity
  ) {
    resultMessage.value = "Solved";
    showResponse.value = true;
    return true;
  }
};
const hanledFill = (bucket: string) => {
  if (bucket == "x") {
    bucket1.value = form.value.first_bucket;
  }
  if (bucket == "y") {
    bucket2.value = form.value.last_bucket;
  }
  checkSolution();
};
const handleTransfer = (bucket: string) => {
  if (bucket === "x") {
    if (bucket1.value > 0) {
      if (bucket1.value === form.value.first_bucket) {
        return;
      } else {
        const value = form.value.first_bucket - bucket1.value;
        if (value > bucket2.value) {
          bucket1.value += bucket2.value;
          bucket2.value = 0;
        } else {
          bucket1.value = form.value.first_bucket;
          bucket2.value -= value;
        }
      }
    } else {
      const valueToTransfer = Math.min(form.value.first_bucket, bucket2.value);
      bucket1.value += valueToTransfer;
      bucket2.value -= valueToTransfer;
    }
  } else if (bucket === "y") {
    if (bucket2.value > 0) {
      if (bucket2.value === form.value.last_bucket) {
        return;
      } else {
        const value = form.value.last_bucket - bucket2.value;
        if (value > bucket1.value) {
          bucket2.value += bucket1.value;
          bucket1.value = 0;
        } else {
          bucket2.value = form.value.last_bucket;
          bucket1.value -= value;
        }
      }
    } else {
      const valueToTransfer = Math.min(form.value.last_bucket, bucket1.value);
      bucket2.value += valueToTransfer;
      bucket1.value -= valueToTransfer;
    }
  }
  checkSolution();
};
const handleEmpty = (bucket: string) => {
  if (bucket == "x") {
    bucket1.value = 0;
  }
  if (bucket == "y") {
    bucket2.value = 0;
  }
  checkSolution();
};

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};
const validateSolution = () => {
  console.log("entra");
  const x = form.value.first_bucket;
  const y = form.value.last_bucket;
  const z = form.value.quantity;
  if (z > Math.max(x, y) || z % gcd(x, y) !== 0) {
    resultMessage.value = "No solution";
    showResponse.value = true;
    savedData.value = false;
    return;
  }
  savedData.value = true;
};
</script>

<template>
  <main class="flex flex-row h-screen">
    <div
      class="w-1/3 h-full flex flex-col items-center justify-center gap-4 border-r-2 border-gray-300"
    >
      <div>
        <label
          for="first_bucket"
          class="block mb-2 text-sm font-medium text-white"
          >Bucket 1</label
        >
        <input
          type="number"
          min="1"
          id="first_bucket"
          class="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="capacity"
          required
          v-model="form.first_bucket"
        />
        <p class="mt-2 text-sm">Set bucket capacity</p>
      </div>
      <div>
        <label
          for="last_bucket"
          class="block mb-2 text-sm font-medium text-white"
          >Bucket 2</label
        >
        <input
          type="number"
          min="1"
          id="last_bucket"
          class="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="capacity"
          required
          v-model="form.last_bucket"
        />
        <p class="mt-2 text-sm">Set bucket capacity</p>
      </div>
      <div>
        <label for="quantity" class="block mb-2 text-sm font-medium text-white"
          >Needed Quantity</label
        >
        <input
          type="number"
          min="1"
          id="quantity"
          class="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="quantity"
          required
          v-model="form.quantity"
        />
        <p class="mt-2 text-sm">Set the desired quantity</p>
      </div>

      <div>
        <button
          :disabled="!form.first_bucket || !form.last_bucket || !form.quantity"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          :class="
            !form.first_bucket || !form.last_bucket || !form.quantity
              ? 'cursor-not-allowed'
              : ''
          "
          @click="validateSolution"
        >
          Save
        </button>
      </div>
    </div>
    <div
      class="w-2/3 h-full text-center flex items-center justify-center gap-20"
    >
      <div class="relative">
        <div class="flex flex-col items-center gap-5">
          <span class="text-2xl font-bold text-white">{{ bucket1 }} L</span>
          <font-awesome-icon
            :icon="['fas', 'bucket']"
            class="text-[250px] cursor-pointer"
            :class="bucket1 > 0 ? 'text-blue-400' : ''"
            @click="openMenu('menu1', $event)"
          />
          <span
            >Capacity buscket 1:
            {{ form.first_bucket ? form.first_bucket + " L" : "0 L" }}</span
          >
        </div>
        <div
          v-if="activeMenu === 'menu1'"
          :style="menuStyle"
          class="fixed group"
        >
          <div class="flex flex-col items-center mb-4 space-y-2">
            <button
              type="button"
              class="w-[56px] h-[56px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              @click="hanledFill('x'), (activeMenu = null)"
            >
              <font-awesome-icon
                :icon="['fas', 'water']"
                class="cursor-pointer"
              />
              <span class="block mb-px text-xs font-medium">Fill</span>
            </button>
            <button
              type="button"
              class="w-[56px] h-[56px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              @click="handleTransfer('y'), (activeMenu = null)"
            >
              <font-awesome-icon
                :icon="['fas', 'fill']"
                class="cursor-pointer"
              />
              <span class="block mb-px text-xs font-medium">Transfer</span>
            </button>
            <button
              type="button"
              class="w-[56px] h-[56px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              @click="handleEmpty('x'), (activeMenu = null)"
            >
              <font-awesome-icon
                :icon="['fas', 'right-left']"
                class="cursor-pointer"
              />
              <span class="block mb-px text-xs font-medium">Empty</span>
            </button>
          </div>
        </div>
      </div>
      <div class="relative">
        <div class="flex flex-col items-center gap-5">
          <span class="text-2xl font-bold text-white">{{ bucket2 }} L</span>
          <font-awesome-icon
            :icon="['fas', 'bucket']"
            class="text-[250px] cursor-pointer"
            :class="bucket2 > 0 ? 'text-blue-400' : ''"
            @click="openMenu('menu2', $event)"
          />
          <span
            >Capacity buscket 2:
            {{ form.last_bucket ? form.last_bucket + " L" : "0 L" }}</span
          >
        </div>
        <div
          v-if="activeMenu === 'menu2'"
          :style="menuStyle"
          class="fixed group"
        >
          <div class="flex flex-col items-center mb-4 space-y-2">
            <button
              type="button"
              class="w-[56px] h-[56px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              @click="hanledFill('y'), (activeMenu = null)"
            >
              <font-awesome-icon
                :icon="['fas', 'water']"
                class="cursor-pointer"
              />
              <span class="block mb-px text-xs font-medium">Fill</span>
            </button>
            <button
              type="button"
              class="w-[56px] h-[56px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              @click="handleTransfer('x'), (activeMenu = null)"
            >
              <font-awesome-icon
                :icon="['fas', 'fill']"
                class="cursor-pointer"
              />
              <span class="block mb-px text-xs font-medium">Transfer</span>
            </button>
            <button
              type="button"
              class="w-[56px] h-[56px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              @click="handleEmpty('y'), (activeMenu = null)"
            >
              <font-awesome-icon
                :icon="['fas', 'right-left']"
                class="cursor-pointer"
              />
              <span class="block mb-px text-xs font-medium">Empty</span>
            </button>
          </div>
        </div>
      </div>

      <div class="absolute bottom-10">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          @click="
            bucket1 = 0;
            bucket2 = 0;
          "
        >
          Restore
        </button>
      </div>

      <!-- MODAL AND POPPOVER -->
      <div
        v-if="showPopover"
        :style="popoverStyle"
        class="absolute z-10 w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        role="tooltip"
      >
        <div
          class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white">
            Not allowed
          </h3>
        </div>
        <div class="px-3 py-2">
          <p>You must configure and save to be able to perform this action.</p>
        </div>
        <div data-popper-arrow></div>
      </div>
      <div
        v-if="showResponse"
        tabindex="-1"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
      >
        <div class="relative w-full max-w-md p-4 max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="p-4 md:p-5 text-center">
              <svg
                class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3
                class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
              >
                {{ resultMessage }}
              </h3>
              <button
                @click="
                  showResponse = false;
                  bucket1 = 0;
                  bucket2 = 0;
                "
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
