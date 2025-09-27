import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Setting = () => {
    const { darkMode, setTheme } = useContext(ThemeContext);
    const [themeChoice, setThemeChoice] = useState("system");

    // Load initial preference
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "system";
        setThemeChoice(savedTheme);
        if (savedTheme !== "system") {
            setTheme(savedTheme === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(prefersDark);
        }
    }, [setTheme]);

    const handleThemeChange = (value) => {
        setThemeChoice(value);
        localStorage.setItem("theme", value);

        if (value === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(prefersDark);
        } else {
            setTheme(value === "dark");
        }
    };

    return (
        <div className={`p-8 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}>
            {/* Page Header */}
            <h1 className="text-3xl font-extrabold mb-8 border-b border-gray-300 pb-3">
                ⚙️ Settings
            </h1>

            {/* Appearance Section */}
            <div className={`rounded-2xl shadow-lg p-6 transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <h2 className="text-xl font-semibold mb-4">🌈 Appearance</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Choose how you want the app to look.
                </p>

                <div className="flex flex-col gap-4">
                    {/* Light Mode */}
                    <label className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer border transition duration-200 ${themeChoice === "light" ? "border-indigo-500 bg-indigo-50 dark:bg-gray-700" : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                        <input
                            type="radio"
                            name="theme"
                            value="light"
                            checked={themeChoice === "light"}
                            onChange={() => handleThemeChange("light")}
                            className="accent-indigo-500"
                        />
                        <span className="flex items-center gap-2 font-medium">🌞 Light Mode</span>
                    </label>

                    {/* Dark Mode */}
                    <label className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer border transition duration-200 ${themeChoice === "dark" ? "border-indigo-500 bg-indigo-50 dark:bg-gray-700" : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                        <input
                            type="radio"
                            name="theme"
                            value="dark"
                            checked={themeChoice === "dark"}
                            onChange={() => handleThemeChange("dark")}
                            className="accent-indigo-500"
                        />
                        <span className="flex items-center gap-2 font-medium">🌙 Dark Mode</span>
                    </label>

                    {/* System Default */}
                    <label className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer border transition duration-200 ${themeChoice === "system" ? "border-indigo-500 bg-indigo-50 dark:bg-gray-700" : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                        <input
                            type="radio"
                            name="theme"
                            value="system"
                            checked={themeChoice === "system"}
                            onChange={() => handleThemeChange("system")}
                            className="accent-indigo-500"
                        />
                        <span className="flex items-center gap-2 font-medium">💻 System Default</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Setting;
