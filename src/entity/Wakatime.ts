export interface WakatimeData {
  /**
   * 表示代码分类的统计信息
   */
  // categories: CategoryStat[];
  /**
   * 表示依赖库或模块的时间统计
   */
  // dependencies: DependencyStat[];
  /**
   * 表示使用的代码编辑器的时间统计
   */
  editors: EditorStat[];
  /**
   * 表示总共的时间统计
   */
  // grand_total: TotalStat;
  /**
   * 表示使用的编程语言的时间统计
   */
  languages: LanguageStat[];
  /**
   * 表示使用的设备的时间统计
   */
  machines: MachineStat[];
  /**
   * 表示使用的操作系统的时间统计
   */
  operating_systems: OperatingSystemStat[];
  /**
   * 表示项目的时间统计
   */
  projects: ProjectStat[];
  /**
   * 表示统计的时间范围
   */
  range: TimeRange;
}

/**
 * 表示代码分类的统计信息
 */
export interface CategoryStat {
  /**
   * 以小数形式表示的时间比例
   */
  decimal: string;
  /**
   * 以小时、分钟和秒的数字形式表示的时间
   */
  digital: string;
  /**
   * 以小时为单位的时间
   */
  hours: number;
  /**
   *  以分钟为单位的时间
   */
  minutes: number;
  /**
   *  分类的名称
   */
  name: string;
  /**
   * 所占总时间的百分比
   */
  percent: number;
  /**
   * 以秒为单位的时间
   */
  seconds: number;
  /**
   * 以易读的文本形式表示的时间
   */
  text: string;
  /**
   * 总共的时间，以秒为单位
   */
  total_seconds: number;
}

/**
 * 表示依赖库或模块的时间统计
 */
export interface DependencyStat {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  /**
   *  依赖库或模块的名称
   */
  name: string;
  /**
   * : 所占总时间的百分比
   */
  percent: number;
  seconds: number;
  text: string;
  total_seconds: number;
}

/**
 * 表示使用的代码编辑器的时间统计
 */
export interface EditorStat {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  /**
   * 代码编辑器的名称
   */
  name: string;
  percent: number;
  seconds: number;
  text: string;
  total_seconds: number;
}

/**
 *  表示总共的时间统计
 */
export interface TotalStat {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  text: string;
  total_seconds: number;
}
/**
 * 表示使用的编程语言的时间统计
 */
export interface LanguageStat {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  /**
   * 编程语言的名称
   */
  name: string;
  percent: number;
  seconds: number;
  text: string;
  total_seconds: number;
}

/**
 * 表示使用的设备的时间统计
 */
export interface MachineStat {
  decimal: string;
  digital: string;
  hours: number;
  /**
   * 设备的唯一标识符
   */
  machine_name_id: string;
  minutes: number;
  /**
   * 设备的名称
   */
  name: string;
  percent: number;
  seconds: number;
  text: string;
  total_seconds: number;
}

/**
 * 表示使用的操作系统的时间统计
 */
export interface OperatingSystemStat {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  /**
   * 操作系统的名称
   */
  name: string;
  percent: number;
  seconds: number;
  text: string;
  total_seconds: number;
}

/**
 * 表示项目的时间统计
 */
export interface ProjectStat {
  /**
   * 项目的颜色（可能为空）
   */
  color: string | null;
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  /**
   * 项目的名称
   */
  name: string;
  percent: number;
  seconds: number;
  text: string;
  total_seconds: number;
}

/**
 * 表示统计的时间范围
 */
export interface TimeRange {
  /**
   * 统计结束的日期
   */
  date: string;
  /**
   * 统计结束的时间（日期和时间戳）
   */
  end: string;
  /**
   * 统计开始的时间（日期和时间戳）
   */
  start: string;
  /**
   *  时间范围的文本描述
   */
  text: string;
  /**
   * 时间范围的时区
   */
  timezone: string;
}
