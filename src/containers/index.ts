export default {
    editer: () => import('./editer').then(x => x.default),
    test: () => import('./test').then(x => x.default),
    testAAAAAAAAAAAAA: () => import('./testAAAAAAAAAAAAA').then(x => x.default)
}