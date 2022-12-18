import { Context, Schema } from 'koishi'
import { DataService } from '@koishijs/plugin-console'
import {} from '@koishijs/plugin-market'
import { resolve } from 'path'

declare module '@koishijs/plugin-console' {
  namespace Console {
    interface Services {
      migration: Migration
    }
  }
}

export interface Config {}

export default class Migration extends DataService<void> {
  static using = ['console'] as const
  static schema: Schema<Config> = Schema.object({})

  constructor(ctx: Context) {
    super(ctx, 'migration', { authority: 4 })

    ctx.console.addEntry({
      dev: resolve(__dirname, '../client/index.ts'),
      prod: resolve(__dirname, '../dist'),
    })
  }

  async get() {
  }
}
