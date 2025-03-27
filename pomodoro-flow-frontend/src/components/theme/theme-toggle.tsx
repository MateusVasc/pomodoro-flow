import { Moon, Sun } from 'lucide-react'
import { Button } from '../ui/button'
import { useTheme } from './theme-provider'

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    return (
    <div onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="flex">
        <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-180 dark:scale-0 duration-500" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-500" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    </div>
    )
}

export default ThemeToggle