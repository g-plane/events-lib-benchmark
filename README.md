# Node.js Events Libraries Benchmarks

Benchmarks of some Node.js events libraries.

## Methodology

There are two stages when running benchmark.

### Stage 1

1. Create 1000 events.
2. For each event, register 100 listeners.

### Stage 2

1. Trigger those 1000 events.
2. Repeat previous step 10 times.

### Calculating time

In result table, `S1` means Stage 1, and `S2` means Stage 2,
and `T` means total time which is `S1 + S2`.

## Libraries

- [eventemitter3 v4.0.7](https://github.com/primus/eventemitter3)
- [mitt v2.1.0](https://github.com/developit/mitt)
- [nanoevents v5.1.10](https://github.com/ai/nanoevents)
- [nodejs v14.15.4](https://nodejs.org/en/)
- [rxjs v6.6.3](https://github.com/ReactiveX/rxjs)
- [tapable v2.2.0](https://github.com/webpack/tapable)
- [zhook v0.1.1](https://github.com/g-plane/zhook)

## Result

See [here](./result.md).

## Run by Yourself

1. Clone this repository.
2. Install dependencies with pnpm.
3. Build this project by running `pnpm build`.
4. Run benchmark by running `pnpm start`, and result will be generated at `result.md` file.

## License

MIT License

2021-present (c) Pig Fang
