<template>
  <header
    class="w-full border-b border-[--border-color] dark:border-[--dark-border-color] fixed bg-white dark:bg-[--dark-bg-color] z-10 top-0"
  >
    <nav class="flex justify-center items-center relative container h-16">
      <div class="hidden lg:flex items-center absolute left-0 ml-8">
        <a
          target="_blank"
          href="https://github.com/zzwtsy/wakatime-dashboard-vue"
          class="font-medium text-[--text-color] dark:text-[--dark-text-color] hover:text-[--hover-text-color] dark:hover:text-[--dark-text-hover-color]"
        >
          <span class="flex flex-row justify-center items-center">
            <IconGithub
              class="mr-2 github-icon h-8 fill-[--icon-bg-color] dark:fill-[--dark-icon-bg-color]"
            />
            wakatime-dashboard-vue
          </span>
        </a>
      </div>
      <div
        class="flex items-center mx-auto w-80 border border-[--border-color] dark:border-[--dark-border-color] hover:border-[--dark-border-color] hover:dark:border-[--dark-hover-border-color] rounded-2xl overflow-hidden"
      >
        <input
          @keyup.enter="enterSearch($event)"
          type="text"
          placeholder="Input Your Gist Id"
          class="w-full h-8 border-none outline-none bg-transparent text-center text-black dark:text-white"
        />
      </div>
      <ChangeTheme class="hidden md:flex items-center absolute right-0 mr-8" />
    </nav>
  </header>
</template>

<script setup lang="ts">
import IconGithub from "./icons/IconGithub.vue";
import ChangeTheme from "./ChangeTheme.vue";
import { getChartsDataAndShow } from "../ts/service/GetChartsDataAndShow";
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

  await getChartsDataAndShow(gistId);
};
</script>
