EnhancedHeader.tsx:142 Uncaught (in promise) AbortError: signal is aborted without reason
    at EnhancedHeader.tsx:142:18
    at safelyCallDestroy (chunk-WALXKXZM.js?v=9738aa4a:16769:13)
    at commitHookEffectListUnmount (chunk-WALXKXZM.js?v=9738aa4a:16896:19)
    at invokePassiveEffectUnmountInDEV (chunk-WALXKXZM.js?v=9738aa4a:18391:19)
    at invokeEffectsInDev (chunk-WALXKXZM.js?v=9738aa4a:19729:19)
    at commitDoubleInvokeEffectsInDEV (chunk-WALXKXZM.js?v=9738aa4a:19710:15)
    at flushPassiveEffectsImpl (chunk-WALXKXZM.js?v=9738aa4a:19531:13)
    at flushPassiveEffects (chunk-WALXKXZM.js?v=9738aa4a:19475:22)
    at performSyncWorkOnRoot (chunk-WALXKXZM.js?v=9738aa4a:18896:11)
    at flushSyncCallbacks (chunk-WALXKXZM.js?v=9738aa4a:9135:30)
(anonymous) @ EnhancedHeader.tsx:142
safelyCallDestroy @ chunk-WALXKXZM.js?v=9738aa4a:16769
commitHookEffectListUnmount @ chunk-WALXKXZM.js?v=9738aa4a:16896
invokePassiveEffectUnmountInDEV @ chunk-WALXKXZM.js?v=9738aa4a:18391
invokeEffectsInDev @ chunk-WALXKXZM.js?v=9738aa4a:19729
commitDoubleInvokeEffectsInDEV @ chunk-WALXKXZM.js?v=9738aa4a:19710
flushPassiveEffectsImpl @ chunk-WALXKXZM.js?v=9738aa4a:19531
flushPassiveEffects @ chunk-WALXKXZM.js?v=9738aa4a:19475
performSyncWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18896
flushSyncCallbacks @ chunk-WALXKXZM.js?v=9738aa4a:9135
commitRootImpl @ chunk-WALXKXZM.js?v=9738aa4a:19460
commitRoot @ chunk-WALXKXZM.js?v=9738aa4a:19305
finishConcurrentRender @ chunk-WALXKXZM.js?v=9738aa4a:18833
performConcurrentWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18746
workLoop @ chunk-WALXKXZM.js?v=9738aa4a:197
flushWork @ chunk-WALXKXZM.js?v=9738aa4a:176
performWorkUntilDeadline @ chunk-WALXKXZM.js?v=9738aa4a:384
Promise.then
e @ frame_ant.js:2
u @ frame_ant.js:2
(anonymous) @ frame_ant.js:2
(anonymous) @ frame_ant.js:2
c @ frame_ant.js:2
s @ frame_ant.js:2
window.fetch @ frame_ant.js:2
request @ api.ts:67
getCategories @ api.ts:87
run @ EnhancedHeader.tsx:104
(anonymous) @ EnhancedHeader.tsx:138
commitHookEffectListMount @ chunk-WALXKXZM.js?v=9738aa4a:16936
commitPassiveMountOnFiber @ chunk-WALXKXZM.js?v=9738aa4a:18184
commitPassiveMountEffects_complete @ chunk-WALXKXZM.js?v=9738aa4a:18157
commitPassiveMountEffects_begin @ chunk-WALXKXZM.js?v=9738aa4a:18147
commitPassiveMountEffects @ chunk-WALXKXZM.js?v=9738aa4a:18137
flushPassiveEffectsImpl @ chunk-WALXKXZM.js?v=9738aa4a:19518
flushPassiveEffects @ chunk-WALXKXZM.js?v=9738aa4a:19475
performSyncWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18896
flushSyncCallbacks @ chunk-WALXKXZM.js?v=9738aa4a:9135
commitRootImpl @ chunk-WALXKXZM.js?v=9738aa4a:19460
commitRoot @ chunk-WALXKXZM.js?v=9738aa4a:19305
finishConcurrentRender @ chunk-WALXKXZM.js?v=9738aa4a:18833
performConcurrentWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18746
workLoop @ chunk-WALXKXZM.js?v=9738aa4a:197
flushWork @ chunk-WALXKXZM.js?v=9738aa4a:176
performWorkUntilDeadline @ chunk-WALXKXZM.js?v=9738aa4a:384
Show 32 more frames
Show lessUnderstand this error
frame_ant.js:2 
        
        
       GET http://localhost:3000/banners/by_position/sidebar 404 (Not Found)
window.fetch @ frame_ant.js:2
fetchBanners @ usePromoBanners.ts:47
(anonymous) @ usePromoBanners.ts:108
commitHookEffectListMount @ chunk-WALXKXZM.js?v=9738aa4a:16936
commitPassiveMountOnFiber @ chunk-WALXKXZM.js?v=9738aa4a:18184
commitPassiveMountEffects_complete @ chunk-WALXKXZM.js?v=9738aa4a:18157
commitPassiveMountEffects_begin @ chunk-WALXKXZM.js?v=9738aa4a:18147
commitPassiveMountEffects @ chunk-WALXKXZM.js?v=9738aa4a:18137
flushPassiveEffectsImpl @ chunk-WALXKXZM.js?v=9738aa4a:19518
flushPassiveEffects @ chunk-WALXKXZM.js?v=9738aa4a:19475
performSyncWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18896
flushSyncCallbacks @ chunk-WALXKXZM.js?v=9738aa4a:9135
commitRootImpl @ chunk-WALXKXZM.js?v=9738aa4a:19460
commitRoot @ chunk-WALXKXZM.js?v=9738aa4a:19305
finishConcurrentRender @ chunk-WALXKXZM.js?v=9738aa4a:18833
performConcurrentWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18746
workLoop @ chunk-WALXKXZM.js?v=9738aa4a:197
flushWork @ chunk-WALXKXZM.js?v=9738aa4a:176
performWorkUntilDeadline @ chunk-WALXKXZM.js?v=9738aa4a:384
Show 16 more frames
Show lessUnderstand this error
usePromoBanners.ts:60 Error fetching banners: Error: Falha ao carregar banners
    at fetchBanners (usePromoBanners.ts:50:17)
fetchBanners @ usePromoBanners.ts:60
await in fetchBanners
(anonymous) @ usePromoBanners.ts:108
commitHookEffectListMount @ chunk-WALXKXZM.js?v=9738aa4a:16936
commitPassiveMountOnFiber @ chunk-WALXKXZM.js?v=9738aa4a:18184
commitPassiveMountEffects_complete @ chunk-WALXKXZM.js?v=9738aa4a:18157
commitPassiveMountEffects_begin @ chunk-WALXKXZM.js?v=9738aa4a:18147
commitPassiveMountEffects @ chunk-WALXKXZM.js?v=9738aa4a:18137
flushPassiveEffectsImpl @ chunk-WALXKXZM.js?v=9738aa4a:19518
flushPassiveEffects @ chunk-WALXKXZM.js?v=9738aa4a:19475
performSyncWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18896
flushSyncCallbacks @ chunk-WALXKXZM.js?v=9738aa4a:9135
commitRootImpl @ chunk-WALXKXZM.js?v=9738aa4a:19460
commitRoot @ chunk-WALXKXZM.js?v=9738aa4a:19305
finishConcurrentRender @ chunk-WALXKXZM.js?v=9738aa4a:18833
performConcurrentWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18746
workLoop @ chunk-WALXKXZM.js?v=9738aa4a:197
flushWork @ chunk-WALXKXZM.js?v=9738aa4a:176
performWorkUntilDeadline @ chunk-WALXKXZM.js?v=9738aa4a:384
Show 16 more frames
Show lessUnderstand this error
frame_ant.js:2 
        
        
       GET http://localhost:3000/banners/by_position/sidebar 404 (Not Found)
window.fetch @ frame_ant.js:2
fetchBanners @ usePromoBanners.ts:47
(anonymous) @ usePromoBanners.ts:108
commitHookEffectListMount @ chunk-WALXKXZM.js?v=9738aa4a:16936
invokePassiveEffectMountInDEV @ chunk-WALXKXZM.js?v=9738aa4a:18352
invokeEffectsInDev @ chunk-WALXKXZM.js?v=9738aa4a:19729
commitDoubleInvokeEffectsInDEV @ chunk-WALXKXZM.js?v=9738aa4a:19714
flushPassiveEffectsImpl @ chunk-WALXKXZM.js?v=9738aa4a:19531
flushPassiveEffects @ chunk-WALXKXZM.js?v=9738aa4a:19475
performSyncWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18896
flushSyncCallbacks @ chunk-WALXKXZM.js?v=9738aa4a:9135
commitRootImpl @ chunk-WALXKXZM.js?v=9738aa4a:19460
commitRoot @ chunk-WALXKXZM.js?v=9738aa4a:19305
finishConcurrentRender @ chunk-WALXKXZM.js?v=9738aa4a:18833
performConcurrentWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18746
workLoop @ chunk-WALXKXZM.js?v=9738aa4a:197
flushWork @ chunk-WALXKXZM.js?v=9738aa4a:176
performWorkUntilDeadline @ chunk-WALXKXZM.js?v=9738aa4a:384
Show 15 more frames
Show lessUnderstand this error
usePromoBanners.ts:60 Error fetching banners: Error: Falha ao carregar banners
    at fetchBanners (usePromoBanners.ts:50:17)
fetchBanners @ usePromoBanners.ts:60
await in fetchBanners
(anonymous) @ usePromoBanners.ts:108
commitHookEffectListMount @ chunk-WALXKXZM.js?v=9738aa4a:16936
invokePassiveEffectMountInDEV @ chunk-WALXKXZM.js?v=9738aa4a:18352
invokeEffectsInDev @ chunk-WALXKXZM.js?v=9738aa4a:19729
commitDoubleInvokeEffectsInDEV @ chunk-WALXKXZM.js?v=9738aa4a:19714
flushPassiveEffectsImpl @ chunk-WALXKXZM.js?v=9738aa4a:19531
flushPassiveEffects @ chunk-WALXKXZM.js?v=9738aa4a:19475
performSyncWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18896
flushSyncCallbacks @ chunk-WALXKXZM.js?v=9738aa4a:9135
commitRootImpl @ chunk-WALXKXZM.js?v=9738aa4a:19460
commitRoot @ chunk-WALXKXZM.js?v=9738aa4a:19305
finishConcurrentRender @ chunk-WALXKXZM.js?v=9738aa4a:18833
performConcurrentWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18746
workLoop @ chunk-WALXKXZM.js?v=9738aa4a:197
flushWork @ chunk-WALXKXZM.js?v=9738aa4a:176
performWorkUntilDeadline @ chunk-WALXKXZM.js?v=9738aa4a:384
Show 15 more frames
Show lessUnderstand this error
EnhancedCategoryPage.tsx:186 Uncaught (in promise) AbortError: signal is aborted without reason
    at EnhancedCategoryPage.tsx:186:18
    at safelyCallDestroy (chunk-WALXKXZM.js?v=9738aa4a:16769:13)
    at commitHookEffectListUnmount (chunk-WALXKXZM.js?v=9738aa4a:16896:19)
    at invokePassiveEffectUnmountInDEV (chunk-WALXKXZM.js?v=9738aa4a:18391:19)
    at invokeEffectsInDev (chunk-WALXKXZM.js?v=9738aa4a:19729:19)
    at commitDoubleInvokeEffectsInDEV (chunk-WALXKXZM.js?v=9738aa4a:19710:15)
    at flushPassiveEffectsImpl (chunk-WALXKXZM.js?v=9738aa4a:19531:13)
    at flushPassiveEffects (chunk-WALXKXZM.js?v=9738aa4a:19475:22)
    at commitRootImpl (chunk-WALXKXZM.js?v=9738aa4a:19444:13)
    at commitRoot (chunk-WALXKXZM.js?v=9738aa4a:19305:13)
(anonymous) @ EnhancedCategoryPage.tsx:186
safelyCallDestroy @ chunk-WALXKXZM.js?v=9738aa4a:16769
commitHookEffectListUnmount @ chunk-WALXKXZM.js?v=9738aa4a:16896
invokePassiveEffectUnmountInDEV @ chunk-WALXKXZM.js?v=9738aa4a:18391
invokeEffectsInDev @ chunk-WALXKXZM.js?v=9738aa4a:19729
commitDoubleInvokeEffectsInDEV @ chunk-WALXKXZM.js?v=9738aa4a:19710
flushPassiveEffectsImpl @ chunk-WALXKXZM.js?v=9738aa4a:19531
flushPassiveEffects @ chunk-WALXKXZM.js?v=9738aa4a:19475
commitRootImpl @ chunk-WALXKXZM.js?v=9738aa4a:19444
commitRoot @ chunk-WALXKXZM.js?v=9738aa4a:19305
performSyncWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18923
flushSyncCallbacks @ chunk-WALXKXZM.js?v=9738aa4a:9135
(anonymous) @ chunk-WALXKXZM.js?v=9738aa4a:18655
Promise.then
e @ frame_ant.js:2
u @ frame_ant.js:2
(anonymous) @ frame_ant.js:2
(anonymous) @ frame_ant.js:2
s @ frame_ant.js:2
window.fetch @ frame_ant.js:2
request @ api.ts:67
getCategoryBySlug @ api.ts:97
run @ EnhancedCategoryPage.tsx:124
(anonymous) @ EnhancedCategoryPage.tsx:182
commitHookEffectListMount @ chunk-WALXKXZM.js?v=9738aa4a:16936
commitPassiveMountOnFiber @ chunk-WALXKXZM.js?v=9738aa4a:18184
commitPassiveMountEffects_complete @ chunk-WALXKXZM.js?v=9738aa4a:18157
commitPassiveMountEffects_begin @ chunk-WALXKXZM.js?v=9738aa4a:18147
commitPassiveMountEffects @ chunk-WALXKXZM.js?v=9738aa4a:18137
flushPassiveEffectsImpl @ chunk-WALXKXZM.js?v=9738aa4a:19518
flushPassiveEffects @ chunk-WALXKXZM.js?v=9738aa4a:19475
commitRootImpl @ chunk-WALXKXZM.js?v=9738aa4a:19444
commitRoot @ chunk-WALXKXZM.js?v=9738aa4a:19305
performSyncWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18923
flushSyncCallbacks @ chunk-WALXKXZM.js?v=9738aa4a:9135
(anonymous) @ chunk-WALXKXZM.js?v=9738aa4a:18655
Show 24 more frames
Show lessUnderstand this error
EnhancedCategoryPage.tsx:186 Uncaught (in promise) AbortError: signal is aborted without reason
    at EnhancedCategoryPage.tsx:186:18
    at safelyCallDestroy (chunk-WALXKXZM.js?v=9738aa4a:16769:13)
    at commitHookEffectListUnmount (chunk-WALXKXZM.js?v=9738aa4a:16896:19)
    at invokePassiveEffectUnmountInDEV (chunk-WALXKXZM.js?v=9738aa4a:18391:19)
    at invokeEffectsInDev (chunk-WALXKXZM.js?v=9738aa4a:19729:19)
    at commitDoubleInvokeEffectsInDEV (chunk-WALXKXZM.js?v=9738aa4a:19710:15)
    at flushPassiveEffectsImpl (chunk-WALXKXZM.js?v=9738aa4a:19531:13)
    at flushPassiveEffects (chunk-WALXKXZM.js?v=9738aa4a:19475:22)
    at commitRootImpl (chunk-WALXKXZM.js?v=9738aa4a:19444:13)
    at commitRoot (chunk-WALXKXZM.js?v=9738aa4a:19305:13)
(anonymous) @ EnhancedCategoryPage.tsx:186
safelyCallDestroy @ chunk-WALXKXZM.js?v=9738aa4a:16769
commitHookEffectListUnmount @ chunk-WALXKXZM.js?v=9738aa4a:16896
invokePassiveEffectUnmountInDEV @ chunk-WALXKXZM.js?v=9738aa4a:18391
invokeEffectsInDev @ chunk-WALXKXZM.js?v=9738aa4a:19729
commitDoubleInvokeEffectsInDEV @ chunk-WALXKXZM.js?v=9738aa4a:19710
flushPassiveEffectsImpl @ chunk-WALXKXZM.js?v=9738aa4a:19531
flushPassiveEffects @ chunk-WALXKXZM.js?v=9738aa4a:19475
commitRootImpl @ chunk-WALXKXZM.js?v=9738aa4a:19444
commitRoot @ chunk-WALXKXZM.js?v=9738aa4a:19305
performSyncWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18923
flushSyncCallbacks @ chunk-WALXKXZM.js?v=9738aa4a:9135
(anonymous) @ chunk-WALXKXZM.js?v=9738aa4a:18655
Promise.then
e @ frame_ant.js:2
u @ frame_ant.js:2
(anonymous) @ frame_ant.js:2
(anonymous) @ frame_ant.js:2
s @ frame_ant.js:2
window.fetch @ frame_ant.js:2
request @ api.ts:67
getProviders @ api.ts:123
run @ EnhancedCategoryPage.tsx:125
(anonymous) @ EnhancedCategoryPage.tsx:182
commitHookEffectListMount @ chunk-WALXKXZM.js?v=9738aa4a:16936
commitPassiveMountOnFiber @ chunk-WALXKXZM.js?v=9738aa4a:18184
commitPassiveMountEffects_complete @ chunk-WALXKXZM.js?v=9738aa4a:18157
commitPassiveMountEffects_begin @ chunk-WALXKXZM.js?v=9738aa4a:18147
commitPassiveMountEffects @ chunk-WALXKXZM.js?v=9738aa4a:18137
flushPassiveEffectsImpl @ chunk-WALXKXZM.js?v=9738aa4a:19518
flushPassiveEffects @ chunk-WALXKXZM.js?v=9738aa4a:19475
commitRootImpl @ chunk-WALXKXZM.js?v=9738aa4a:19444
commitRoot @ chunk-WALXKXZM.js?v=9738aa4a:19305
performSyncWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18923
flushSyncCallbacks @ chunk-WALXKXZM.js?v=9738aa4a:9135
(anonymous) @ chunk-WALXKXZM.js?v=9738aa4a:18655
Show 24 more frames
Show lessUnderstand this error
frame_ant.js:2 
        
        
       GET http://localhost:3000/api/v1/providers/search?category_slug=armazenamento-de-energia 422 (Unprocessable Entity)
window.fetch @ frame_ant.js:2
request @ api.ts:67
getProviders @ api.ts:123
run @ EnhancedCategoryPage.tsx:125
(anonymous) @ EnhancedCategoryPage.tsx:182
commitHookEffectListMount @ chunk-WALXKXZM.js?v=9738aa4a:16936
invokePassiveEffectMountInDEV @ chunk-WALXKXZM.js?v=9738aa4a:18352
invokeEffectsInDev @ chunk-WALXKXZM.js?v=9738aa4a:19729
commitDoubleInvokeEffectsInDEV @ chunk-WALXKXZM.js?v=9738aa4a:19714
flushPassiveEffectsImpl @ chunk-WALXKXZM.js?v=9738aa4a:19531
flushPassiveEffects @ chunk-WALXKXZM.js?v=9738aa4a:19475
commitRootImpl @ chunk-WALXKXZM.js?v=9738aa4a:19444
commitRoot @ chunk-WALXKXZM.js?v=9738aa4a:19305
performSyncWorkOnRoot @ chunk-WALXKXZM.js?v=9738aa4a:18923
flushSyncCallbacks @ chunk-WALXKXZM.js?v=9738aa4a:9135
(anonymous) @ chunk-WALXKXZM.js?v=9738aa4a:18655
Show 11 more frames
Show lessUnderstand this error