import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _7400a366 = () => import('../pages/homePage.vue' /* webpackChunkName: "pages/homePage" */).then(m => m.default || m)
const _f2da33d4 = () => import('../pages/dashBoard/management.vue' /* webpackChunkName: "pages/dashBoard/management" */).then(m => m.default || m)
const _62c9b58a = () => import('../pages/dashBoard/createEvent.vue' /* webpackChunkName: "pages/dashBoard/createEvent" */).then(m => m.default || m)
const _03bc7ebc = () => import('../pages/dashBoard/_userId.vue' /* webpackChunkName: "pages/dashBoard/_userId" */).then(m => m.default || m)
const _370a56aa = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _4abc0124 = () => import('../pages/_eventId.vue' /* webpackChunkName: "pages/_eventId" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/homePage",
			component: _7400a366,
			name: "homePage"
		},
		{
			path: "/dashBoard/management",
			component: _f2da33d4,
			name: "dashBoard-management"
		},
		{
			path: "/dashBoard/createEvent",
			component: _62c9b58a,
			name: "dashBoard-createEvent"
		},
		{
			path: "/dashBoard/:userId?",
			component: _03bc7ebc,
			name: "dashBoard-userId"
		},
		{
			path: "/",
			component: _370a56aa,
			name: "index"
		},
		{
			path: "/:eventId",
			component: _4abc0124,
			name: "eventId"
		}
    ],
    
    
    fallback: false
  })
}
