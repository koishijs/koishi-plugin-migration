import { Context, icons } from '@koishijs/client'
import type {} from 'koishi-plugin-migration/src'
import Migration from './migration.vue'
import Activity from './icons/activity.vue'

icons.register('migration', Activity)

export default (ctx: Context) => {
  ctx.page({
    path: '/migration',
    name: '更新与迁移',
    icon: 'migration',
    order: 650,
    authority: 4,
    fields: ['migration'],
    component: Migration,
  })
}
