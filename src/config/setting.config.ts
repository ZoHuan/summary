const colorList = [
  { key: "薄暮", color: "#F5222D" },
  { key: "火山", color: "#FA541C" },
  { key: "日暮", color: "#FAAD14" },
  { key: "明青", color: "#13C2C2" },
  { key: "极光绿", color: "#52C41A" },
  { key: "拂晓蓝（默认）", color: "#1890FF" },
  { key: "极客蓝", color: "#2F54EB" },
  { key: "酱紫", color: "#722ED1" },
];

const updateTheme = (color: string) => {
  const el = document.documentElement;
  el.style.setProperty("--el-color-primary", color);
  const tempColors = color.split("#")[1];
  const r = parseInt("0x" + tempColors.slice(0, 2));
  const g = parseInt("0x" + tempColors.slice(2, 4));
  const b = parseInt("0x" + tempColors.slice(4, 6));
  for (let i = 1; i <= 9; i++) {
    el.style.setProperty(
      "--el-color-primary-light-" + i,
      `rgba(${r}, ${g}, ${b}, ${1 - i * 0.1})`
    );
  }
};

const updateColorWeak = (colorWeak: boolean) => {
  const app = document.body.querySelector("#app");
  colorWeak ? app?.classList.add("weak") : app?.classList.remove("weak");
};

export { colorList, updateTheme, updateColorWeak };
