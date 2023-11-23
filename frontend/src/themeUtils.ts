// themeUtils.ts
export const getThemePreference = (): string | null => {
    return localStorage.getItem('themePreference');
  };
  
  export const setThemePreference = (theme: string): void => {
    localStorage.setItem('themePreference', theme);
  };
  