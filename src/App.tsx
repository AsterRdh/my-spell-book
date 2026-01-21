import './App.css'
import {ConfigProvider, theme} from "antd";
import useTheme from "./hooks/useTheme.ts";
import SpellBook from "./pages/SpellBook/SpellBook.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";


const router = createBrowserRouter([
    {
        path: "/SpellBook",
        element: <SpellBook/>,
    },
]);

function App() {
    const {isDarkMode} = useTheme()
    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <div className={'app'}>
                <RouterProvider router={router} />,
            </div>
        </ConfigProvider>
    )
}

export default App
