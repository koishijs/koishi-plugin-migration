import { Context, Dict, Plugin, Schema } from 'koishi'
import { DataService } from '@koishijs/plugin-console'
import {} from '@koishijs/plugin-market'
import { resolve } from 'path'
import { gt } from 'semver'
import which from 'which-pm-runs'

declare module '@koishijs/plugin-console' {
  namespace Console {
    interface Services {
      migration: Migration
    }
  }

  interface Events {
    'migrate'(target: string): void
  }
}

export interface Payload {
  current: string
  next: string
}

export interface Config {}

const scripts: Dict<Plugin.Function> = {
  async '4.11.0'(ctx) {
    const installer = ctx.console.dependencies
    await installer.override({
      '@koishijs/cli': null,
      '@koishijs/plugin-console': '5.0.2',
      'koishi': '4.11.0',
    })
    const args: string[] = []
    const agent = which().name || 'npm'
    if (agent !== 'yarn') {
      args.push('install')
    }
    args.push('--registry', installer.registry)
    await installer.exec(agent, args)
    process.exit(0)
  },
}

export default class Migration extends DataService<Payload> {
  static using = ['console.dependencies'] as const
  static schema: Schema<Config> = Schema.object({})

  constructor(ctx: Context) {
    super(ctx, 'migration', { authority: 4 })

    ctx.console.addEntry({
      dev: resolve(__dirname, '../client/index.ts'),
      prod: resolve(__dirname, '../dist'),
    })

    ctx.console.addListener('migrate', async (target) => {
      return scripts[target](ctx, {})
    })
  }

  async get() {
    const deps = await this.ctx.console.dependencies.get()
    return {
      current: deps.koishi.resolved,
      next: Object.keys(scripts).find(version => gt(version, deps.koishi.resolved)),
    }
  }
}
