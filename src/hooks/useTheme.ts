import {useEffect, useState} from "react"

export type ThemeName = "light" | "dark"

// 提取主题初始化逻辑
function getInitialTheme(): ThemeName {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"
    }
    return "light"
}

function useTheme() {
    const [themeName, setThemeName] = useState<ThemeName>(getInitialTheme())
    useEffect(() => {
        // 监听系统颜色切换
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (event) => {
                if (event.matches) {
                    setThemeName("dark")
                } else {
                    setThemeName("light")
                }
            })
    }, [])
    return {
        themeName,
        isDarkMode: themeName === "dark",
        isLightMode: themeName === "light",
    }
}

export default useTheme