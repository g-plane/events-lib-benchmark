import * as assert from 'assert'
import timeSpan from 'time-span'
import { Subject } from 'rxjs'
import type { Result } from './types'

export default (): Result => {
  const stage1Timing = timeSpan()

  const subjects = Array.from({ length: 1000 }).map((_, i) => {
    const subject = new Subject<number>()
    Array.from({ length: 100 }).forEach(() => {
      subject.subscribe((value) => {
        assert.strictEqual(value, i)
      })
    })
    return subject
  })

  const stage1 = stage1Timing()
  const stage2Timing = timeSpan()

  Array.from({ length: 10 }).forEach(() => {
    subjects.forEach((subject, i) => {
      subject.next(i)
    })
  })

  const stage2 = stage2Timing()

  return { stage1, stage2 }
}
