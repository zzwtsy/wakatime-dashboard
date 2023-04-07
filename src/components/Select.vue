<template>
  <div class="select">
    <div
      class="select-header"
      :class="{ 'select-header-active': dropdownVisible }"
      @click="toggleDropdownVisible"
    >
      <div class="select-selected">{{ selectedValue }}</div>
      <div class="select-arrow">&#9660;</div>
    </div>
    <div class="select-dropdown" v-show="dropdownVisible">
      <div
        class="select-option"
        v-for="(option, index) in options"
        :key="index"
        :class="{ 'select-option-selected': value === selectedValue }"
        @click="selectOption(value)"
      >
        {{ option.lable }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  options: {
    type: Array<{ value: String; lable: String }>,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
const dropdownVisible = ref(false);
const selectedValue = ref(props.value);

const toggleDropdownVisible = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const selectOption = (value: string) => {
  selectedValue.value = value;
  dropdownVisible.value = false;
    // emit("update:value", value);
};

onMounted(() => {
  selectedValue.value = props.value;
});
</script>

<style>
.select {
  position: relative;
  display: inline-block;
}

.select-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border: 1px solid #eaecef;
  border-radius: 6px;
  cursor: pointer;
}

.select-header-active {
  border-color: #0366d6;
}

.select-selected {
  font-size: 1rem;
  font-weight: 600;
}

.select-arrow {
  margin-left: 0.5rem;
  font-size: 0.8rem;
}

.select-dropdown {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  z-index: 1;
  display: none;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #eaecef;
  border-radius: 6px;
}

.select-dropdown.active {
  display: block;
}

.select-option {
  display: block;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.select-option:hover,
.select-option-selected {
  background-color: #0366d6;
  color: #fff;
}

.select-option-selected:hover {
  background-color: #005cc5;
}
</style>
