module.exports=[38783,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactServerDOMTurbopackClient},60246,a=>{"use strict";let b=(0,a.i(70106).default)("users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]);a.s(["Users",()=>b],60246)},11156,a=>{"use strict";let b=(0,a.i(70106).default)("credit-card",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);a.s(["CreditCard",()=>b],11156)},20005,a=>{"use strict";let b=(0,a.i(70106).default)("log-out",[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]);a.s(["LogOut",()=>b],20005)},3314,a=>{"use strict";let b=(0,a.i(70106).default)("shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);a.s(["Shield",()=>b],3314)},72692,a=>{"use strict";let b=(0,a.i(70106).default)("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]);a.s(["Menu",()=>b],72692)},30617,a=>{"use strict";let b=(0,a.i(70106).default)("layout-dashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);a.s(["LayoutDashboard",()=>b],30617)},78170,a=>{"use strict";var b=a.i(87924),c=a.i(50944),d=a.i(68515),e=a.i(72131),f=a.i(38246),g=a.i(20005),h=a.i(30617),i=a.i(60246),j=a.i(11156),k=a.i(72692),l=a.i(33508),m=a.i(3314);function n({children:a}){let n=(0,c.useRouter)(),o=(0,c.usePathname)(),{user:p,logout:q}=(0,d.useStore)(),[r,s]=(0,e.useState)(!1),[t,u]=(0,e.useState)(!1);if((0,e.useEffect)(()=>{s(!0),p&&"admin"===p.role||n.replace("/login")},[p,n]),(0,e.useEffect)(()=>{u(!1)},[o]),!r||!p||"admin"!==p.role)return null;let v=[{href:"/admin",icon:h.LayoutDashboard,label:"Super Dashboard"},{href:"/admin/companies",icon:i.Users,label:"Registered Stores"},{href:"/admin/plans",icon:j.CreditCard,label:"Manage Plans"}];return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
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
            `}),(0,b.jsxs)("div",{className:"adm-shell",children:[t&&(0,b.jsx)("div",{className:"adm-overlay",onClick:()=>u(!1)}),(0,b.jsxs)("aside",{className:`adm-sidebar${t?" adm-sidebar-open":""}`,children:[(0,b.jsxs)("div",{className:"adm-logo",children:[(0,b.jsxs)("h2",{children:[(0,b.jsx)(m.Shield,{size:20,color:"#E53E3E"})," Edibio Admin"]}),(0,b.jsx)("button",{className:"adm-menu-btn adm-close-btn",onClick:()=>u(!1),style:{width:30,height:30,fontSize:0},children:(0,b.jsx)(l.X,{size:16})})]}),(0,b.jsxs)("nav",{className:"adm-nav",children:[(0,b.jsx)("p",{className:"adm-nav-label",children:"Control Center"}),v.map(a=>{let c=o===a.href;return(0,b.jsxs)(f.default,{href:a.href,className:`adm-link${c?" adm-link-active":""}`,children:[(0,b.jsx)(a.icon,{size:16})," ",a.label]},a.href)})]}),(0,b.jsxs)("div",{className:"adm-footer",children:[(0,b.jsxs)("button",{className:"adm-logout",onClick:()=>{q(),n.replace("/login")},children:[(0,b.jsx)(g.LogOut,{size:16})," Exit Admin"]}),(0,b.jsx)("p",{className:"adm-ver",children:"Edibio v2.5.0 · Super Admin"})]})]}),(0,b.jsxs)("main",{className:"adm-main",children:[(0,b.jsxs)("div",{className:"adm-topbar",children:[(0,b.jsx)("button",{className:"adm-menu-btn",onClick:()=>u(!0),children:(0,b.jsx)(k.Menu,{size:18})}),(0,b.jsxs)("div",{className:"adm-topbar-brand",children:[(0,b.jsx)(m.Shield,{size:16,color:"#E53E3E"})," Super Admin"]}),(0,b.jsx)("div",{style:{width:36}})]}),(0,b.jsx)("div",{className:"adm-body",children:a})]})]})]})}a.s(["default",()=>n])}];

//# sourceMappingURL=_e7890671._.js.map