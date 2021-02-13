import * as assert from 'assert'
import timeSpan from 'time-span'
import { createNanoEvents } from 'nanoevents'
import type { Result } from './types'

export default (): Result => {
  const stage1Timing = timeSpan()

  const bus = createNanoEvents()
  Array.from({ length: 1000 }).forEach((_, i) => {
    Array.from({ length: 100 }).forEach(() => {
      bus.on(`event${i}`, (value) => {
        assert.strictEqual(value, i)
      })
    })
  })

  const stage1 = stage1Timing()
  const stage2Timing = timeSpan()

  Array.from({ length: 10 }).forEach(() => {
    Array.from({ length: 1000 }).forEach((_, i) => {
      bus.emit(`event${i}`, i)
    })
  })

  const stage2 = stage2Timing()

  return { stage1, stage2 }
}
