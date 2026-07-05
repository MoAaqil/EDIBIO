(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return l},searchParamsToUrlQuery:function(){return o},urlQueryToSearchParams:function(){return s}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});function o(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function i(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function s(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,i(e));else t.set(r,i(n));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return s},formatWithValidation:function(){return d},urlObjectKeys:function(){return l}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let o=e.r(90809)._(e.r(98183)),i=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:r}=e,n=e.protocol||"",a=e.pathname||"",s=e.hash||"",l=e.query||"",d=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?d=t+e.host:r&&(d=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(d+=":"+e.port)),l&&"object"==typeof l&&(l=String(o.urlQueryToSearchParams(l)));let u=e.search||l&&`?${l}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||i.test(n))&&!1!==d?(d="//"+(d||""),a&&"/"!==a[0]&&(a="/"+a)):d||(d=""),s&&"#"!==s[0]&&(s="#"+s),u&&"?"!==u[0]&&(u="?"+u),a=a.replace(/[?#]/g,encodeURIComponent),u=u.replace("#","%23"),`${n}${d}${a}${u}${s}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function d(e){return s(e)}},18967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return b},MiddlewareNotFoundError:function(){return j},MissingStaticPage:function(){return v},NormalizeError:function(){return y},PageNotFoundError:function(){return x},SP:function(){return m},ST:function(){return g},WEB_VITALS:function(){return o},execOnce:function(){return i},getDisplayName:function(){return c},getLocationOrigin:function(){return d},getURL:function(){return u},isAbsoluteUrl:function(){return l},isResSent:function(){return f},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return k}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let o=["CLS","FCP","FID","INP","LCP","TTFB"];function i(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>s.test(e);function d(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function u(){let{href:e}=window.location,t=d();return e.substring(t.length)}function c(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&f(r))return n;if(!n)throw Object.defineProperty(Error(`"${c(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return n}let m="u">typeof performance,g=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class b extends Error{}class y extends Error{}class x extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class v extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class j extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function k(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return o}});let n=e.r(18967),a=e.r(52817);function o(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,a.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return b},useLinkStatus:function(){return x}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let o=e.r(90809),i=e.r(43476),s=o._(e.r(71645)),l=e.r(95057),d=e.r(8372),u=e.r(18581),c=e.r(18967),f=e.r(5550);e.r(33525);let p=e.r(91949),h=e.r(73668),m=e.r(9396);function g(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}function b(t){var r;let n,a,o,[l,b]=(0,s.useOptimistic)(p.IDLE_LINK_STATUS),x=(0,s.useRef)(null),{href:v,as:j,children:k,prefetch:E=null,passHref:w,replace:P,shallow:S,scroll:C,onClick:N,onMouseEnter:O,onTouchStart:_,legacyBehavior:M=!1,onNavigate:T,ref:A,unstable_dynamicOnHover:L,...R}=t;n=k,M&&("string"==typeof n||"number"==typeof n)&&(n=(0,i.jsx)("a",{children:n}));let z=s.default.useContext(d.AppRouterContext),U=!1!==E,$=!1!==E?null===(r=E)||"auto"===r?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,{href:I,as:F}=s.default.useMemo(()=>{let e=g(v);return{href:e,as:j?g(j):e}},[v,j]);if(M){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});a=s.default.Children.only(n)}let D=M?a&&"object"==typeof a&&a.ref:A,B=s.default.useCallback(e=>(null!==z&&(x.current=(0,p.mountLinkInstance)(e,I,z,$,U,b)),()=>{x.current&&((0,p.unmountLinkForCurrentNavigation)(x.current),x.current=null),(0,p.unmountPrefetchableInstance)(e)}),[U,I,z,$,b]),K={ref:(0,u.useMergedRef)(B,D),onClick(t){M||"function"!=typeof N||N(t),M&&a.props&&"function"==typeof a.props.onClick&&a.props.onClick(t),!z||t.defaultPrevented||function(t,r,n,a,o,i,l){if("u">typeof window){let d,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((d=t.currentTarget.getAttribute("target"))&&"_self"!==d||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){o&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:c}=e.r(99781);s.default.startTransition(()=>{c(n||r,o?"replace":"push",i??!0,a.current)})}}(t,I,F,x,P,C,T)},onMouseEnter(e){M||"function"!=typeof O||O(e),M&&a.props&&"function"==typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),z&&U&&(0,p.onNavigationIntent)(e.currentTarget,!0===L)},onTouchStart:function(e){M||"function"!=typeof _||_(e),M&&a.props&&"function"==typeof a.props.onTouchStart&&a.props.onTouchStart(e),z&&U&&(0,p.onNavigationIntent)(e.currentTarget,!0===L)}};return(0,c.isAbsoluteUrl)(F)?K.href=F:M&&!w&&("a"!==a.type||"href"in a.props)||(K.href=(0,f.addBasePath)(F)),o=M?s.default.cloneElement(a,K):(0,i.jsx)("a",{...R,...K,children:n}),(0,i.jsx)(y.Provider,{value:l,children:o})}e.r(84508);let y=(0,s.createContext)(p.IDLE_LINK_STATUS),x=()=>(0,s.useContext)(y);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},61911,e=>{"use strict";let t=(0,e.i(75254).default)("users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]);e.s(["Users",()=>t],61911)},61659,e=>{"use strict";let t=(0,e.i(75254).default)("credit-card",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);e.s(["CreditCard",()=>t],61659)},92270,e=>{"use strict";let t=(0,e.i(75254).default)("log-out",[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]);e.s(["LogOut",()=>t],92270)},98919,e=>{"use strict";let t=(0,e.i(75254).default)("shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);e.s(["Shield",()=>t],98919)},92161,e=>{"use strict";let t=(0,e.i(75254).default)("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]);e.s(["Menu",()=>t],92161)},60289,e=>{"use strict";let t=(0,e.i(75254).default)("layout-dashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);e.s(["LayoutDashboard",()=>t],60289)},8374,e=>{"use strict";var t=e.i(43476),r=e.i(18566),n=e.i(4421),a=e.i(71645),o=e.i(22016),i=e.i(92270),s=e.i(60289),l=e.i(61911),d=e.i(61659),u=e.i(92161),c=e.i(37727),f=e.i(98919);function p({children:e}){let p=(0,r.useRouter)(),h=(0,r.usePathname)(),{user:m,logout:g}=(0,n.useStore)(),[b,y]=(0,a.useState)(!1),[x,v]=(0,a.useState)(!1);if((0,a.useEffect)(()=>{y(!0),m&&"admin"===m.role||p.replace("/login")},[m,p]),(0,a.useEffect)(()=>{v(!1)},[h]),!b||!m||"admin"!==m.role)return null;let j=[{href:"/admin",icon:s.LayoutDashboard,label:"Super Dashboard"},{href:"/admin/companies",icon:l.Users,label:"Registered Stores"},{href:"/admin/plans",icon:d.CreditCard,label:"Manage Plans"}];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:`
                /* ── Admin Shell ─────────────────────── */
                .adm-shell {
                    display: flex;
                    height: 100dvh;
                    background: #F0F2F8;
                    overflow: hidden;
                }

                /* ── Sidebar ─────────────────────────── */
                .adm-sidebar {
                    width: 240px;
                    background: linear-gradient(175deg, #12122A 0%, #1E1E40 100%);
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                    border-right: 1px solid rgba(255,255,255,0.05);
                    z-index: 100;
                    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
                }
                .adm-logo { 
                    padding: 24px 20px 20px; 
                    border-bottom: 1px solid rgba(255,255,255,0.07); 
                    display: flex; align-items: center; justify-content: space-between;
                }
                .adm-logo h2 { font-size: 18px; font-weight: 900; color: white; margin: 0; display: flex; align-items: center; gap: 8px; }
                .adm-nav { flex: 1; padding: 16px 10px; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; }
                .adm-nav-label { font-size: 9px; font-weight: 800; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 0.12em; padding: 0 10px; margin-bottom: 8px; }
                .adm-link {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 12px; border-radius: 8px;
                    color: rgba(255,255,255,0.5); text-decoration: none;
                    font-size: 13px; font-weight: 600;
                    transition: all 0.15s;
                }
                .adm-link:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85); }
                .adm-link-active { background: #E53E3E !important; color: white !important; box-shadow: 0 4px 14px rgba(229,62,62,0.35); }
                .adm-footer { padding: 14px; border-top: 1px solid rgba(255,255,255,0.07); }
                .adm-logout {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 12px; border-radius: 8px;
                    background: rgba(234,67,53,0.1); border: none;
                    color: #FC8181; cursor: pointer; width: 100%;
                    font-size: 13px; font-weight: 700;
                    transition: background 0.15s;
                }
                .adm-logout:hover { background: rgba(234,67,53,0.2); }
                .adm-ver { color: rgba(255,255,255,0.15); font-size: 10px; text-align: center; margin-top: 10px; }

                /* ── Main ────────────────────────────── */
                .adm-main {
                    flex: 1;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                /* ── Mobile topbar (inside adm-main) ── */
                .adm-topbar {
                    display: none;
                    height: 52px;
                    background: linear-gradient(90deg, #12122A, #1E1E40);
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 16px;
                    flex-shrink: 0;
                }
                .adm-topbar-brand { display: flex; align-items: center; gap: 8px; color: white; font-size: 15px; font-weight: 900; }
                .adm-menu-btn {
                    width: 36px; height: 36px; border-radius: 8px;
                    background: rgba(255,255,255,0.08); border: none;
                    color: white; cursor: pointer; display: flex;
                    align-items: center; justify-content: center;
                }

                /* ── Scrollable content area ─────────── */
                .adm-body { flex: 1; overflow-y: auto; padding: 28px; }

                /* ── Overlay ─────────────────────────── */
                .adm-overlay {
                    position: fixed; inset: 0;
                    background: rgba(0,0,0,0.55);
                    backdrop-filter: blur(3px);
                    z-index: 90;
                    animation: fadeIn 0.2s ease;
                }

                /* ── Mobile breakpoint ───────────────── */
                @media (max-width: 1023px) {
                    .adm-sidebar {
                        position: fixed;
                        top: 0; left: 0; bottom: 0;
                        transform: translateX(-100%);
                        width: 260px;
                    }
                    .adm-sidebar-open { transform: translateX(0) !important; }
                    .adm-topbar { display: flex !important; }
                    .adm-body { padding: 16px; }
                    .adm-logo .adm-close-btn { display: flex !important; }
                }
                @media (min-width: 1024px) {
                    .adm-logo .adm-close-btn { display: none !important; }
                }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}),(0,t.jsxs)("div",{className:"adm-shell",children:[x&&(0,t.jsx)("div",{className:"adm-overlay",onClick:()=>v(!1)}),(0,t.jsxs)("aside",{className:`adm-sidebar${x?" adm-sidebar-open":""}`,children:[(0,t.jsxs)("div",{className:"adm-logo",children:[(0,t.jsxs)("h2",{children:[(0,t.jsx)(f.Shield,{size:20,color:"#E53E3E"})," Edibio Admin"]}),(0,t.jsx)("button",{className:"adm-menu-btn adm-close-btn",onClick:()=>v(!1),style:{width:30,height:30,fontSize:0},children:(0,t.jsx)(c.X,{size:16})})]}),(0,t.jsxs)("nav",{className:"adm-nav",children:[(0,t.jsx)("p",{className:"adm-nav-label",children:"Control Center"}),j.map(e=>{let r=h===e.href;return(0,t.jsxs)(o.default,{href:e.href,className:`adm-link${r?" adm-link-active":""}`,children:[(0,t.jsx)(e.icon,{size:16})," ",e.label]},e.href)})]}),(0,t.jsxs)("div",{className:"adm-footer",children:[(0,t.jsxs)("button",{className:"adm-logout",onClick:()=>{g(),p.replace("/login")},children:[(0,t.jsx)(i.LogOut,{size:16})," Exit Admin"]}),(0,t.jsx)("p",{className:"adm-ver",children:"Edibio v2.5.0 · Super Admin"})]})]}),(0,t.jsxs)("main",{className:"adm-main",children:[(0,t.jsxs)("div",{className:"adm-topbar",children:[(0,t.jsx)("button",{className:"adm-menu-btn",onClick:()=>v(!0),children:(0,t.jsx)(u.Menu,{size:18})}),(0,t.jsxs)("div",{className:"adm-topbar-brand",children:[(0,t.jsx)(f.Shield,{size:16,color:"#E53E3E"})," Super Admin"]}),(0,t.jsx)("div",{style:{width:36}})]}),(0,t.jsx)("div",{className:"adm-body",children:e})]})]})]})}e.s(["default",()=>p])}]);