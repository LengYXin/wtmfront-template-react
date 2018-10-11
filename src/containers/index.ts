export default {
    editer: () => import('./editer').then(x => x.default),
    school: () => import('./school').then(x => x.default),
    studen: () => import('./studen').then(x => x.default),
    test: () => import('./test').then(x => x.default)
}