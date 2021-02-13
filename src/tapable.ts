import * as assert from 'assert'
import timeSpan from 'time-span'
import { SyncHook } from 'tapable'
import type { Result } from './types'

export default (): Result => {
  const stage1Timing = timeSpan()

  const hooks = Array.from({ length: 1000 }).map((_, i) => {
    const hook = new SyncHook<[i: number]>(['i'])
    Array.from({ length: 100 }).forEach(() => {
      hook.tap('listener', (value) => {
        assert.strictEqual(value, i)
      })
    })
    return hook
  })

  const stage1 = stage1Timing()
  const stage2Timing = timeSpan()

  Array.from({ length: 10 }).forEach(() => {
    hooks.forEach((hook, i) => {
      hook.call(i)
    })
  })

  const stage2 = stage2Timing()

  return { stage1, stage2 }
}
