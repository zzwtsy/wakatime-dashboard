import { reactive } from "vue";

interface IStore {
  [key: string]: any;
}

export const store: IStore = reactive({
  languagePieChartOption: {},
  operatingSystemsOption: {},
  machinesOption: {},
  editorsOption: {},
  projectsOption: {},
  selectValue: 7,
  echartsLoading: false,
  userName: "",
});
