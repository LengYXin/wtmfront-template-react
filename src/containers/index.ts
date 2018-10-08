export default {
    editer: () => import('./editer').then(x => x.default),
    test: () => import('./test').then(x => x.default),
    testgg: () => import('./testgg').then(x => x.default),
    testuu: () => import('./testuu').then(x => x.default)
}