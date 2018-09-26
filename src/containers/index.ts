export default {
    editer: () => import('./editer').then(x => x.default),
    TTT: () => import('./TTT').then(x => x.default)
}