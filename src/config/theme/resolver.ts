import { Config } from 'tailwindcss'
import resolveConfig from 'tailwindcss/resolveConfig'
import { OptionalConfig } from 'tailwindcss/types/config.js'

import tailwindConfig from './tailwind.config.js'

type ColorShadeLevel = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

// NOTE: 型の互換性がないため一度unknownにしてからオーバーライドしてる
interface Custom extends ChangeTypeOfKeys<Config, 'color', unknown>, Partial<OptionalConfig> {
  theme: {
    colors: {
      [key: string]: Record<ColorShadeLevel, string>
    }
  }
}

const { theme } = resolveConfig<Custom>(tailwindConfig)

theme?.colors

export { theme }
