export default {
    editer: () => import('./editer').then(x => x.default),
    testa: () => import('./testa').then(x => x.default),
    testb: () => import('./testb').then(x => x.default),
    testc: () => import('./testc').then(x => x.default),
    testd: () => import('./testd').then(x => x.default),
    teste: () => import('./teste').then(x => x.default)
}