import { ensureStoreMetadata } from '../internals';
import { State } from '../state';
import { Action } from '../action';

describe('Store', () => {
  it('infers correct name', () => {
    @State({})
    class BarState {}

    const meta = ensureStoreMetadata(BarState);
    expect(meta.name).toBe('bar');
  });

  it('infers correct name without suffix', () => {
    @State({})
    class Bar {}

    const meta = ensureStoreMetadata(Bar);
    expect(meta.name).toBe('bar');
  });

  it('describes correct name', () => {
    @State({
      name: 'moo'
    })
    class BarState {}

    const meta = ensureStoreMetadata(BarState);
    expect(meta.name).toBe('moo');
  });

  it('handles extending', () => {
    class Eat {}
    class Drink {}

    @State({
      name: 'bar'
    })
    class BarStore {
      @Action(Eat)
      eat() {}
    }

    @State({
      name: 'bar2'
    })
    class BarS2tore extends BarStore {
      @Action(Drink)
      drink() {}
    }

    const meta = ensureStoreMetadata(BarS2tore);
    expect(meta.actions['Eat']).toBeDefined();
    expect(meta.actions['Drink']).toBeDefined();
  });
});
