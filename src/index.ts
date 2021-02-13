import * as fs from 'fs'
import Table from 'cli-table'
import ejs from 'ejs'
import type { Result } from './types'
import testEventEmitter3 from './eventemitter3'
import testMitt from './mitt'
import testNanoevents from './nanoevents'
import testNodejs from './nodejs'
import testRxjs from './rxjs'
import testTapable from './tapable'
import testZhook from './zhook'

const testMap = {
  eventemitter3: testEventEmitter3,
  mitt: testMitt,
  nanoevents: testNanoevents,
  nodejs: testNodejs,
  rxjs: testRxjs,
  tapable: testTapable,
  zhook: testZhook,
}

function trunc(x: number): number {
  return Math.round(x * 1000) / 1000
}

function min(list: number[]): number {
  return trunc(Math.min(...list))
}

function max(list: number[]): number {
  return trunc(Math.max(...list))
}

function avg(list: number[]): number {
  return trunc(list.reduce((acc, cur) => acc + cur, 0) / list.length)
}

function preprocessResult({ stage1, stage2 }: Result) {
  const total = stage1 + stage2

  return { stage1, stage2, total }
}

const table = new Table({
  head: [
    'Library',
    'S1 min',
    'S1 max',
    'S1 avg',
    'S2 min',
    'S2 max',
    'S2 avg',
    'T min',
    'T max',
    'T avg',
  ],
})

const libs = Object.keys(testMap) as Array<keyof typeof testMap>
const results: [string, ...number[]][] = libs.map((lib) => {
  const result = Array.from({ length: 100 }).map(() =>
    preprocessResult(testMap[lib]())
  )
  const stage1 = result.map(({ stage1 }) => stage1)
  const stage2 = result.map(({ stage2 }) => stage2)
  const total = result.map(({ total }) => total)

  return [
    lib,
    min(stage1),
    max(stage1),
    avg(stage1),
    min(stage2),
    max(stage2),
    avg(stage2),
    min(total),
    max(total),
    avg(total),
  ]
})

table.push(...results)
console.log(table.toString())

ejs.renderFile(
  './template.md',
  {
    results: results.map((item) => {
      if (item[0] === 'nodejs') {
        return item
      }

      const [name] = item
      item[0] = `[${name}](https://www.npmjs.com/package/${name})`
      return item
    }),
  },
  async (error, rendered) => {
    if (error) {
      throw error
    }

    await fs.promises.writeFile('./result.md', rendered)
  }
)
