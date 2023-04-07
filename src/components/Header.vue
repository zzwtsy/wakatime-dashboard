<template>
  <header class="w-full">
    <nav
      class="flex justify-center items-center relative w-full h-16 border-b border-[#d0d7de] dark:border-[#444c56]"
    >
      <div class="absolute flex items-center left-60">
        <a
          target="_blank"
          href="https://github.com/zzwtsy/wakatime-dashboard-vue"
          class="ml-2 font-medium text-[#d0d7de] dark:text-[#444c56] hover:text-[#444c56] dark:hover:text-[#d0d7de]"
        >
          <span class="flex flex-row justify-center items-center">
            <IconGithub
              class="github-icon h-8 fill-[#d0d7de] dark:fill-[#444c56] mr-2"
            />
            wakatime-dashboard-vue
          </span>
        </a>
      </div>
      <div
        class="flex items-center mx-auto w-80 border border-[#d0d7de] dark:border-[#444c56] hover:border-[#444c56] hover:dark:border-[#d0d7de] rounded-2xl overflow-hidden"
      >
        <input
          @keyup.enter="enterSearch($event)"
          type="text"
          placeholder="请输入 Gist Id"
          class="w-full h-8 border-none outline-none bg-transparent text-center text-black dark:text-white"
        />
      </div>
      <ChangeTheme class="flex absolute items-center right-60" />
    </nav>
  </header>
</template>

<script setup lang="ts">
import IconGithub from "./icons/IconGithub.vue";
import ChangeTheme from "./ChangeTheme.vue";
import { getPieDataAndShow } from "../ts/service/GetPieDataAndShow";
import Tools from "../ts/tools/Tools";

/**
 * 根据用户输入的 Gist Id 搜索对应的 Gist，并解析 Gist 中的文章数据
 * @param event 事件对象
 */
const enterSearch = async (event: any) => {
  // 获取 input 里的 gistId
  let gistId = event.target.value.trim();

  const checkGistId = Tools.checkGistId(gistId);

  if (checkGistId == false) {
    alert("请输入 Gist Id");
    return;
  }

  gistId = checkGistId;

  await getPieDataAndShow(gistId);
};
</script>
