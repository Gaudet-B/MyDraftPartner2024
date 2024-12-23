const BUTTON_THEMES = {
  action: {
    light:
      "bg-sky-100 bg-opacity-80 hover:bg-opacity-100 text-sky-900 border border-sky-900",
    dark: "bg-sky-900 hover:bg-sky-800 text-sky-100 border border-gray-400",
  },
  "action-lg": {
    light:
      "bg-sky-100 bg-opacity-80 hover:bg-opacity-100 text-sky-900 border-2 border-sky-900 font-semibold px-3 py-2",
    dark: "bg-sky-900 hover:bg-sky-800 text-sky-100 border-2 border-gray-400 font-semibold px-3 py-2",
  },
  "action-lt": {
    light:
      "pt-[2px] text-sky-400 bg-gray-200 hover:bg-gray-100 border-2 border-sky-300 hover:border-sky-200",
    dark: "pt-[2px] text-sky-600 bg-gray-900 hover:bg-gray-800 border-2 border-sky-900 hover:border-sky-800",
  },
  "modal-close": {
    light: "font-semibold hover:bg-sky-100",
    dark: "font-semibold text-gray-200 hover:bg-gray-700",
  },
  "nav-burger": {
    light: "z-20",
    dark: "z-20",
  },
  pagination: {
    light: "rounded-full py-1 px-3 hover:bg-gray-400 hover:text-white",
    dark: "rounded-full py-1 px-3 hover:bg-gray-400 hover:text-white",
  },
  submit: {
    light:
      "text-white font-semibold border border-gray-300 bg-sky-900 hover:bg-sky-700 px-2 py-2",
    dark: "text-white font-semibold border border-gray-300 bg-sky-900 hover:bg-sky-700 px-2 py-2",
  },
  "submit-light": {
    light: "text-white bg-sky-600 hover:bg-sky-700 px-3 py-2",
    dark: "text-white bg-sky-600 hover:bg-sky-700 px-3 py-2",
  },
  "submit-secondary": {
    light: "text-white bg-sky-400 hover:bg-sky-500 px-3 py-2",
    dark: "text-white bg-sky-600 hover:bg-sky-500 px-3 py-2",
  },
  cancel: {
    light:
      "text-gray-100 bg-red-900 hover:bg-red-700 font-semibold border border-gray-300",
    dark: "text-gray-100 bg-red-900 hover:bg-red-700 font-semibold border border-gray-300",
  },
  "cancel-light": {
    light: "text-white bg-red-500 hover:bg-red-600 border border-gray-200",
    dark: "text-white bg-red-500 hover:bg-red-600 border border-gray-200",
  },
  /** use 'transparent' when <Button> is a wrapper around child components */
  transparent: {
    light: "",
    dark: "",
  },
  "transparent-hover": {
    light: "hover:bg-sky-100 hover:text-sky-900",
    dark: "hover:bg-sky-900 hover:text-sky-100",
  },
  // primary: {
  //   light: 'bg-blue-500 text-white',
  //   dark: '',
  // },
  // secondary: {
  //   light: 'bg-gray-300 text-gray-800',
  //   dark: '',
  // },
  // danger: {
  //   light: 'bg-red-500 text-white',
  //   dark: '',
  // },
  // warning: {
  //   light: 'bg-yellow-500 text-white',
  //   dark: '',
  // },
} as const;

export default BUTTON_THEMES;

export type ButtonTheme = keyof typeof BUTTON_THEMES;
