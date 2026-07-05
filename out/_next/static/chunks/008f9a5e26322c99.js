(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"warnOnce",{enumerable:!0,get:function(){return o}});let o=e=>{}},18581,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"useMergedRef",{enumerable:!0,get:function(){return r}});let o=e.r(71645);function r(e,t){let a=(0,o.useRef)(null),r=(0,o.useRef)(null);return(0,o.useCallback)(o=>{if(null===o){let e=a.current;e&&(a.current=null,e());let t=r.current;t&&(r.current=null,t())}else e&&(a.current=i(e,o)),t&&(r.current=i(t,o))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let a=e(t);return"function"==typeof a?a:()=>e(null)}}("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},5766,e=>{"use strict";let t,a;var o,r=e.i(71645);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,s=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let a="",o="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":o+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?o+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=d.p?d.p(i,n):i+":"+n+";")}return a+(t&&r?t+"{"+r+"}":r)+o},c={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e};function p(e){let t,a,o=this||{},r=e.call?e(o.p):e;return((e,t,a,o,r)=>{var i;let p=u(e),m=c[p]||(c[p]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(p));if(!c[m]){let t=p!==e?e:(e=>{let t,a,o=[{}];for(;t=n.exec(e.replace(s,""));)t[4]?o.shift():t[3]?(a=t[3].replace(l," ").trim(),o.unshift(o[0][a]=o[0][a]||{})):o[0][t[1]]=t[2].replace(l," ").trim();return o[0]})(e);c[m]=d(r?{["@keyframes "+m]:t}:t,a?"":"."+m)}let g=a&&c.g?c.g:null;return a&&(c.g=c[m]),i=c[m],g?t.data=t.data.replace(g,i):-1===t.data.indexOf(i)&&(t.data=o?i+t.data:t.data+i),m})(r.unshift?r.raw?(t=[].slice.call(arguments,1),a=o.p,r.reduce((e,o,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+o+(null==i?"":i)},"")):r.reduce((e,t)=>Object.assign(e,t&&t.call?t(o.p):t),{}):r,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(o.target),o.g,o.o,o.k)}p.bind({g:1});let m,g,h,y=p.bind({k:1});function f(e,t){let a=this||{};return function(){let o=arguments;function r(i,n){let s=Object.assign({},i),l=s.className||r.className;a.p=Object.assign({theme:g&&g()},s),a.o=/ *go\d+/.test(l),s.className=p.apply(a,o)+(l?" "+l:""),t&&(s.ref=n);let d=e;return e[0]&&(d=s.as||e,delete s.as),h&&d[0]&&h(s),m(d,s)}return t?t(r):r}}var w=(e,t)=>"function"==typeof e?e(t):e,b=(t=0,()=>(++t).toString()),F=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},A="default",v=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:o}=t;return v(e,{type:+!!e.toasts.find(e=>e.id===o.id),toast:o});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},x=[],S={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},D=(e,t=A)=>{C[t]=v(C[t]||S,e),x.forEach(([e,a])=>{e===t&&a(C[t])})},I=e=>Object.keys(C).forEach(t=>D(e,t)),B=(e=A)=>t=>{D(t,e)},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},P=(e={},t=A)=>{let[a,o]=(0,r.useState)(C[t]||S),i=(0,r.useRef)(C[t]);(0,r.useEffect)(()=>(i.current!==C[t]&&o(C[t]),x.push([t,o]),()=>{let e=x.findIndex(([e])=>e===t);e>-1&&x.splice(e,1)}),[t]);let n=a.toasts.map(t=>{var a,o,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(o=e[t.type])?void 0:o.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...a,toasts:n}},k=e=>(t,a)=>{let o,r=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||b()}))(t,e,a);return B(r.toasterId||(o=r.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===o))))({type:2,toast:r}),r.id},E=(e,t)=>k("blank")(e,t);E.error=k("error"),E.success=k("success"),E.loading=k("loading"),E.custom=k("custom"),E.dismiss=(e,t)=>{let a={type:3,toastId:e};t?B(t)(a):I(a)},E.dismissAll=e=>E.dismiss(void 0,e),E.remove=(e,t)=>{let a={type:4,toastId:e};t?B(t)(a):I(a)},E.removeAll=e=>E.remove(void 0,e),E.promise=(e,t,a)=>{let o=E.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?w(t.success,e):void 0;return r?E.success(r,{id:o,...a,...null==a?void 0:a.success}):E.dismiss(o),e}).catch(e=>{let r=t.error?w(t.error,e):void 0;r?E.error(r,{id:o,...a,...null==a?void 0:a.error}):E.dismiss(o)}),e};var M=1e3,H=(e,t="default")=>{let{toasts:a,pausedAt:o}=P(e,t),i=(0,r.useRef)(new Map).current,n=(0,r.useCallback)((e,t=M)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),s({type:4,toastId:e})},t);i.set(e,a)},[]);(0,r.useEffect)(()=>{if(o)return;let e=Date.now(),r=a.map(a=>{if(a.duration===1/0)return;let o=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(o<0){a.visible&&E.dismiss(a.id);return}return setTimeout(()=>E.dismiss(a.id,t),o)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[a,o,t]);let s=(0,r.useCallback)(B(t),[t]),l=(0,r.useCallback)(()=>{s({type:5,time:Date.now()})},[s]),d=(0,r.useCallback)((e,t)=>{s({type:1,toast:{id:e,height:t}})},[s]),c=(0,r.useCallback)(()=>{o&&s({type:6,time:Date.now()})},[o,s]),u=(0,r.useCallback)((e,t)=>{let{reverseOrder:o=!1,gutter:r=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),s=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<s&&e.visible).length;return n.filter(e=>e.visible).slice(...o?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[a]);return(0,r.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,n]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},O=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,j=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,N=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,z=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${O} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${j} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${N} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,L=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,$=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${L} 1s linear infinite;
`,_=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,R=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Q=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${_} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${R} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,G=f("div")`
  position: absolute;
`,W=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,U=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${U} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=({toast:e})=>{let{icon:t,type:a,iconTheme:o}=e;return void 0!==t?"string"==typeof t?r.createElement(K,null,t):t:"blank"===a?null:r.createElement(W,null,r.createElement($,{...o}),"loading"!==a&&r.createElement(G,null,"error"===a?r.createElement(z,{...o}):r.createElement(Q,{...o})))},J=f("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Z=f("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,q=r.memo(({toast:e,position:t,style:a,children:o})=>{let i=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[o,r]=F()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${y(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=r.createElement(V,{toast:e}),s=r.createElement(Z,{...e.ariaProps},w(e.message,e));return r.createElement(J,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof o?o({icon:n,message:s}):r.createElement(r.Fragment,null,n,s))});o=r.createElement,d.p=void 0,m=o,g=void 0,h=void 0;var Y=({id:e,className:t,style:a,onHeightUpdate:o,children:i})=>{let n=r.useCallback(t=>{if(t){let a=()=>{o(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return r.createElement("div",{ref:n,className:t,style:a},i)},X=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:o,children:i,toasterId:n,containerStyle:s,containerClassName:l})=>{let{toasts:d,handlers:c}=H(a,n);return r.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let n,s,l=a.position||t,d=c.calculateOffset(a,{reverseOrder:e,gutter:o,defaultPosition:t}),u=(n=l.includes("top"),s=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:F()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...s});return r.createElement(Y,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?X:"",style:u},"custom"===a.type?w(a.message,a):i?i(a):r.createElement(q,{toast:a,position:l}))}))};e.s(["CheckmarkIcon",()=>Q,"ErrorIcon",()=>z,"LoaderIcon",()=>$,"ToastBar",()=>q,"ToastIcon",()=>V,"Toaster",()=>ee,"default",()=>E,"resolveValue",()=>w,"toast",()=>E,"useToaster",()=>H,"useToasterStore",()=>P],5766)},75254,e=>{"use strict";var t=e.i(71645);let a=(...e)=>e.filter((e,t,a)=>!!e&&""!==e.trim()&&a.indexOf(e)===t).join(" ").trim(),o=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,a)=>a?a.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,t.forwardRef)(({color:e="currentColor",size:o=24,strokeWidth:i=2,absoluteStrokeWidth:n,className:s="",children:l,iconNode:d,...c},u)=>(0,t.createElement)("svg",{ref:u,...r,width:o,height:o,stroke:e,strokeWidth:n?24*Number(i)/Number(o):i,className:a("lucide",s),...!l&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(c)&&{"aria-hidden":"true"},...c},[...d.map(([e,a])=>(0,t.createElement)(e,a)),...Array.isArray(l)?l:[l]])),n=(e,r)=>{let n=(0,t.forwardRef)(({className:n,...s},l)=>(0,t.createElement)(i,{ref:l,iconNode:r,className:a(`lucide-${o(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,n),...s}));return n.displayName=o(e),n};e.s(["default",()=>n],75254)},4421,e=>{"use strict";let t,a,o,r;var i=e.i(71645);let n=e=>{let t,a=new Set,o=(e,o)=>{let r="function"==typeof e?e(t):e;if(!Object.is(r,t)){let e=t;t=(null!=o?o:"object"!=typeof r||null===r)?r:Object.assign({},t,r),a.forEach(a=>a(t,e))}},r=()=>t,i={setState:o,getState:r,getInitialState:()=>n,subscribe:e=>(a.add(e),()=>a.delete(e))},n=t=e(o,r,i);return i},s=e=>{let t=e?n(e):n,a=e=>(function(e,t=e=>e){let a=i.default.useSyncExternalStore(e.subscribe,i.default.useCallback(()=>t(e.getState()),[e,t]),i.default.useCallback(()=>t(e.getInitialState()),[e,t]));return i.default.useDebugValue(a),a})(t,e);return Object.assign(a,t),a};function l(e,t){let a;try{a=e()}catch(e){return}return{getItem:e=>{var o;let r=e=>null===e?null:JSON.parse(e,null==t?void 0:t.reviver),i=null!=(o=a.getItem(e))?o:null;return i instanceof Promise?i.then(r):r(i)},setItem:(e,o)=>a.setItem(e,JSON.stringify(o,null==t?void 0:t.replacer)),removeItem:e=>a.removeItem(e)}}let d=e=>t=>{try{let a=e(t);if(a instanceof Promise)return a;return{then:e=>d(e)(a),catch(e){return this}}}catch(e){return{then(e){return this},catch:t=>d(t)(e)}}};function c(e){return new Promise((t,a)=>{e.oncomplete=e.onsuccess=()=>t(e.result),e.onabort=e.onerror=()=>a(e.error)})}function u(){var e;let a;return t||(e="keyval",t=(t,o)=>(()=>{if(a)return a;let t=indexedDB.open("keyval-store");return t.onupgradeneeded=()=>t.result.createObjectStore(e),(a=c(t)).then(e=>{e.onclose=()=>a=void 0},()=>{}),a})().then(a=>o(a.transaction(e,t).objectStore(e)))),t}var p=e.i(5766);let m={getItem:async e=>await function(e,t=u()){return t("readonly",t=>c(t.get(e)))}(e)||null,setItem:async(e,t)=>{await function(e,t,a=u()){return a("readwrite",a=>(a.put(t,e),c(a.transaction)))}(e,t)},removeItem:async e=>{await function(e,t=u()){return t("readwrite",t=>(t.delete(e),c(t.transaction)))}(e)}},g=e=>{},h=()=>Math.random().toString(36).slice(2)+Date.now().toString(36),y=[{id:"classic",name:"Classic",layout:"classic",paperSize:"A4",headerBg:"#1A1A2E",headerText:"#FFFFFF",accentColor:"#4285F4",tableHeaderBg:"#F8F9FA",tableHeaderText:"#2D3748",bodyBg:"#FFFFFF",bodyText:"#1A1A2E",fontFamily:"Inter",fontSize:12,showLogo:!0,showGstNumber:!0,showHsn:!0,showTaxBreakdown:!0,showSignature:!0,showTerms:!0,showAmountInWords:!0,showQrCode:!1,showBalanceDue:!0,showPaymentHistory:!0,logoAlign:"left",amountAlign:"right"},{id:"modern",name:"Modern",layout:"modern",paperSize:"A4",headerBg:"#4285F4",headerText:"#FFFFFF",accentColor:"#34A853",tableHeaderBg:"#E8F0FE",tableHeaderText:"#1967D2",bodyBg:"#FAFAFA",bodyText:"#1A1A2E",fontFamily:"Inter",fontSize:12,showLogo:!0,showGstNumber:!0,showHsn:!0,showTaxBreakdown:!0,showSignature:!1,showTerms:!0,showAmountInWords:!0,showQrCode:!0,showBalanceDue:!0,showPaymentHistory:!1,logoAlign:"center",amountAlign:"right"},{id:"minimal",name:"Minimal",layout:"minimal",paperSize:"A4",headerBg:"#FFFFFF",headerText:"#1A1A2E",accentColor:"#1A1A2E",tableHeaderBg:"#FFFFFF",tableHeaderText:"#4A5568",bodyBg:"#FFFFFF",bodyText:"#1A1A2E",fontFamily:"Inter",fontSize:11,showLogo:!0,showGstNumber:!0,showHsn:!1,showTaxBreakdown:!1,showSignature:!1,showTerms:!1,showAmountInWords:!1,showQrCode:!1,showBalanceDue:!0,showPaymentHistory:!1,logoAlign:"right",amountAlign:"right"},{id:"thermal",name:"Thermal Receipt",layout:"minimal",paperSize:"thermal_80",headerBg:"#FFFFFF",headerText:"#000000",accentColor:"#000000",tableHeaderBg:"#FFFFFF",tableHeaderText:"#000000",bodyBg:"#FFFFFF",bodyText:"#000000",fontFamily:"monospace",fontSize:10,showLogo:!0,showGstNumber:!0,showHsn:!1,showTaxBreakdown:!0,showSignature:!1,showTerms:!1,showAmountInWords:!0,showQrCode:!1,showBalanceDue:!0,showPaymentHistory:!1,logoAlign:"center",amountAlign:"right",footerText:"Thank you! Visit Again."},{id:"elegant",name:"Elegant Dark",layout:"classic",paperSize:"A4",headerBg:"#111827",headerText:"#F3F4F6",accentColor:"#111827",tableHeaderBg:"#1F2937",tableHeaderText:"#FFFFFF",bodyBg:"#FFFFFF",bodyText:"#1F2937",fontFamily:"Outfit",fontSize:12,showLogo:!0,showGstNumber:!0,showHsn:!0,showTaxBreakdown:!0,showSignature:!0,showTerms:!0,showAmountInWords:!0,showQrCode:!0,showBalanceDue:!0,showPaymentHistory:!0,logoAlign:"left",amountAlign:"right"},{id:"vibrant",name:"Vibrant Blue",layout:"modern",paperSize:"A4",headerBg:"#EFF6FF",headerText:"#1E40AF",accentColor:"#3B82F6",tableHeaderBg:"#DBEAFE",tableHeaderText:"#1E40AF",bodyBg:"#FFFFFF",bodyText:"#1E3A8A",fontFamily:"Inter",fontSize:12,showLogo:!0,showGstNumber:!0,showHsn:!0,showTaxBreakdown:!0,showSignature:!1,showTerms:!0,showAmountInWords:!0,showQrCode:!0,showBalanceDue:!0,showPaymentHistory:!1,logoAlign:"center",amountAlign:"right"},{id:"retro",name:"Retro Typewriter",layout:"minimal",paperSize:"A4",headerBg:"#FFFFFF",headerText:"#000000",accentColor:"#000000",tableHeaderBg:"#FFFFFF",tableHeaderText:"#000000",bodyBg:"#FDFCF0",bodyText:"#000000",fontFamily:"Courier Prime",fontSize:11,showLogo:!1,showGstNumber:!0,showHsn:!1,showTaxBreakdown:!1,showSignature:!0,showTerms:!0,showAmountInWords:!1,showQrCode:!1,showBalanceDue:!0,showPaymentHistory:!1,logoAlign:"left",amountAlign:"right"},{id:"quick_bill",name:"Quick Bill (Compact)",layout:"classic",paperSize:"A4",headerBg:"#FFFFFF",headerText:"#000000",accentColor:"#000000",tableHeaderBg:"#F8F9FA",tableHeaderText:"#000000",bodyBg:"#FFFFFF",bodyText:"#000000",fontFamily:"Arial",fontSize:11,showLogo:!1,showGstNumber:!0,showHsn:!0,showTaxBreakdown:!1,showSignature:!0,showTerms:!0,showAmountInWords:!0,showQrCode:!1,showBalanceDue:!0,showPaymentHistory:!1,logoAlign:"center",amountAlign:"right"},{id:"bold_orange",name:"Bold Retail",layout:"modern",paperSize:"A4",headerBg:"#DD6B20",headerText:"#FFFFFF",accentColor:"#DD6B20",tableHeaderBg:"#FBD38D",tableHeaderText:"#9C4221",bodyBg:"#FFFAFA",bodyText:"#1A202C",fontFamily:"Inter",fontSize:12,showLogo:!0,showGstNumber:!0,showHsn:!0,showTaxBreakdown:!0,showSignature:!0,showTerms:!0,showAmountInWords:!0,showQrCode:!0,showBalanceDue:!0,showPaymentHistory:!0,logoAlign:"left",amountAlign:"right"},{id:"waves",name:"Waves Playful",layout:"modern",paperSize:"A4",headerBg:"#FF6B6B",headerText:"#FFFFFF",accentColor:"#FF8E53",tableHeaderBg:"#FFF5F5",tableHeaderText:"#E53E3E",bodyBg:"#FAFAFA",bodyText:"#1A202C",fontFamily:"Inter",fontSize:12,showLogo:!0,showGstNumber:!0,showHsn:!0,showTaxBreakdown:!0,showSignature:!1,showTerms:!0,showAmountInWords:!0,showQrCode:!0,showBalanceDue:!0,showPaymentHistory:!1,logoAlign:"left",amountAlign:"right"},{id:"creative",name:"Creative Portfolio",layout:"modern",paperSize:"A4",headerBg:"#1A202C",headerText:"#FFFFFF",accentColor:"#4A5568",tableHeaderBg:"#F7FAFC",tableHeaderText:"#4A5568",bodyBg:"#F8FAFC",bodyText:"#1A202C",fontFamily:"Inter",fontSize:13,showLogo:!0,showGstNumber:!0,showHsn:!0,showTaxBreakdown:!0,showSignature:!1,showTerms:!0,showAmountInWords:!0,showQrCode:!0,showBalanceDue:!0,showPaymentHistory:!0,logoAlign:"right",amountAlign:"right"},{id:"luxe_gold",name:"Luxe Gold (Premium)",layout:"modern",paperSize:"A4",headerBg:"#0F172A",headerText:"#FDE047",accentColor:"#CA8A04",tableHeaderBg:"#1E293B",tableHeaderText:"#FDE047",bodyBg:"#0F172A",bodyText:"#F1F5F9",fontFamily:"Inter",fontSize:12,showLogo:!0,showGstNumber:!0,showHsn:!0,showTaxBreakdown:!0,showSignature:!1,showTerms:!0,showAmountInWords:!0,showQrCode:!0,showBalanceDue:!0,showPaymentHistory:!0,logoAlign:"left",amountAlign:"right"}],f=(a?s(a):s)((o=(e,t)=>({user:null,isAuthenticated:!1,isHydrating:!0,setIsHydrating:t=>e({isHydrating:t}),syncStatus:"idle",lastSyncedAt:null,syncError:null,setSyncStatus:t=>e({syncStatus:t}),setLastSyncedAt:t=>e({lastSyncedAt:t}),setSyncError:t=>e({syncError:t}),setUser:t=>{if(t&&!t.trialExpiresAt){let e=new Date(new Date(t.createdAt||Date.now()));e.setDate(e.getDate()+3),t.trialExpiresAt=e.toISOString(),t.trialClaimed=!1}e({user:t,isAuthenticated:!!t,lastModified:Date.now()})},updateUser:t=>e(e=>({user:e.user?{...e.user,...t}:null,lastModified:Date.now()})),logout:()=>e({user:null,isAuthenticated:!1,activeCompanyId:null,isDemo:!1,demoExpiresAt:null}),lastModified:Date.now(),bump:()=>e({lastModified:Date.now()}),aiApiKey:null,aiUsageCount:0,setAiApiKey:t=>e({aiApiKey:t,lastModified:Date.now()}),activeCompanyId:null,primarySwapCount:0,setPrimarySwapCount:t=>e({primarySwapCount:t,lastModified:Date.now()}),isDemo:!1,demoExpiresAt:null,startDemo:()=>{let a="demo_user_123",o=new Date;o.setHours(o.getHours()+1);let r={uid:a,email:"demo@edibio.app",name:"Demo Manager",createdAt:new Date().toISOString()},i=t().companies.find(e=>"Edibio Store"===e.name);if(!i){let t={id:"demo_co_123",userId:a,name:"Edibio Store",type:"Supermarket",phone:"9876543210",email:"store@edibio.app",address:"Market Yard, Shop No 45",city:"Mumbai",state:"Maharashtra",pincode:"400001",colorAccent:"#4285F4",godowns:[],currency:"INR",financialYear:"2024-25",invoicePrefix:"ES",invoiceCounter:6,templateId:"classic",createdAt:new Date().toISOString(),licenseNo:"DEMO1234"},o=[{id:h(),companyId:t.id,name:"Amul Milk 1L",category:"Dairy",unit:"packet",purchasePrice:60,sellingPrice:66,mrp:66,stockQty:100,lowStockAlertQty:10,gstRate:0,taxIncluded:!0},{id:h(),companyId:t.id,name:"Parle-G 800g",category:"Biscuits",unit:"pack",purchasePrice:70,sellingPrice:80,mrp:80,stockQty:50,lowStockAlertQty:5,gstRate:5,taxIncluded:!0},{id:h(),companyId:t.id,name:"Basmati Rice 5kg",category:"Grains",unit:"bag",purchasePrice:450,sellingPrice:550,mrp:600,stockQty:20,lowStockAlertQty:2,gstRate:5,taxIncluded:!0},{id:h(),companyId:t.id,name:"Dettol Soap 125g",category:"Personal Care",unit:"pcs",purchasePrice:35,sellingPrice:42,mrp:45,stockQty:40,lowStockAlertQty:10,gstRate:18,taxIncluded:!0}],r=[{id:h(),companyId:t.id,type:"customer",name:"Rahul Sharma",phone:"9820012345",address:"Bandra West",balance:500,openingBalance:0},{id:h(),companyId:t.id,type:"customer",name:"Anita Patel",phone:"9123456789",address:"Andheri East",balance:0,openingBalance:0},{id:h(),companyId:t.id,type:"supplier",name:"Metro Wholesalers",phone:"022-2445566",address:"Navi Mumbai",balance:-5e3,openingBalance:0}],n=[],s=new Date;for(let e=0;e<5;e++){let a=new Date(s);a.setDate(a.getDate()-e),n.push({id:"demo_inv_"+e,companyId:t.id,invoiceType:"sale",invoiceNumber:"ES03MN"+(e+1),date:a.toISOString().split("T")[0],partyId:r[0].id,partyName:r[0].name,items:[{name:"Demo Item",qty:e+1,unit:"pcs",rate:100,discount:0,discountAmt:0,taxableAmt:100*(e+1),gstRate:18,cgst:9,sgst:9,igst:0,cess:0,totalGst:18,amount:118*(e+1)}],subTotal:100*(e+1),totalDiscount:0,taxableAmount:100*(e+1),totalCgst:9*(e+1),totalSgst:9*(e+1),totalIgst:0,totalCess:0,totalGst:18*(e+1),shippingCharges:0,packingCharges:0,adjustmentAmount:0,roundOff:0,grandTotal:118*(e+1),paymentStatus:"paid",amountPaid:118*(e+1),balanceDue:0,payments:[],paymentMethod:"cash",isGstBill:!0,isHidden:!1,isPrivate:!1,createdAt:a.toISOString(),updatedAt:a.toISOString()})}i=t,e(e=>({companies:[...e.companies,t],products:[...e.products,...o],parties:[...e.parties,...r],invoices:[...e.invoices,...n]}))}e({user:r,isAuthenticated:!0,activeCompanyId:i.id,isDemo:!0,demoExpiresAt:o.toISOString()})},clearDemo:()=>e({isDemo:!1,demoExpiresAt:null}),setActiveCompany:t=>e({activeCompanyId:t}),companies:[],addCompany:a=>{let o=t().user?.uid,r={...a,id:h(),userId:o,licenseNo:Math.floor(1e7+9e7*Math.random()).toString(),godowns:[],invoiceCounter:1,currency:"INR",templateId:"classic",createdAt:new Date().toISOString(),auditLogs:[]};return e(e=>({companies:[...e.companies,r],lastModified:Date.now()})),g(t),r},updateCompany:(t,a)=>e(e=>({companies:e.companies.map(e=>e.id===t?{...e,...a}:e),lastModified:Date.now()})),deleteCompany:t=>e(e=>({companies:e.companies.filter(e=>e.id!==t),activeCompanyId:e.activeCompanyId===t?null:e.activeCompanyId,lastModified:Date.now()})),addGodown:(t,a)=>e(e=>({companies:e.companies.map(e=>e.id!==t||e.godowns.length>=2?e:{...e,godowns:[...e.godowns,{...a,id:h()}]}),lastModified:Date.now()})),removeGodown:(t,a)=>e(e=>({companies:e.companies.map(e=>e.id!==t?e:{...e,godowns:e.godowns.filter(e=>e.id!==a)}),lastModified:Date.now()})),parties:[],addParty:a=>{let o={...a,id:h(),createdAt:new Date().toISOString()};return e(e=>({parties:[o,...e.parties],lastModified:Date.now()})),g(t),o},updateParty:(t,a)=>e(e=>({parties:e.parties.map(e=>e.id===t?{...e,...a}:e),lastModified:Date.now()})),deleteParty:t=>e(e=>({parties:e.parties.filter(e=>e.id!==t),lastModified:Date.now()})),products:[],addProduct:a=>{let o={...a,id:h(),createdAt:new Date().toISOString()};return e(e=>({products:[o,...e.products],lastModified:Date.now()})),g(t),o},importProductsBulk:a=>{let o=a.map(e=>({...e,id:h(),createdAt:new Date().toISOString()}));e(e=>({products:[...o,...e.products],lastModified:Date.now()})),g(t)},updateProduct:(t,a)=>e(e=>({products:e.products.map(e=>e.id===t?{...e,...a}:e),lastModified:Date.now()})),deleteProduct:t=>e(e=>({products:e.products.filter(e=>e.id!==t),lastModified:Date.now()})),adjustStock:(t,a)=>e(e=>({products:e.products.map(e=>e.id===t?{...e,stockQty:Math.max(0,e.stockQty+a)}:e),lastModified:Date.now()})),assignProductsToParty:(t,a)=>e(e=>({parties:e.parties.map(e=>{if(e.id!==t)return e;let o=Array.from(new Set([...e.assignedProductIds||[],...a]));return{...e,assignedProductIds:o}}),lastModified:Date.now()})),invoices:[],addInvoice:a=>{if(e(e=>({invoices:[a,...e.invoices],companies:e.companies.map(e=>e.id===a.companyId?{...e,invoiceCounter:e.invoiceCounter+1}:e),lastModified:Date.now()})),g(t),"purchase"===a.invoiceType&&a.partyId){let e=a.items.map(e=>e.productId).filter(Boolean);e.length>0&&t().assignProductsToParty(a.partyId,e)}},updateInvoice:(t,a)=>e(e=>({invoices:e.invoices.map(e=>e.id===t?{...e,...a}:e),lastModified:Date.now()})),deleteInvoice:t=>e(e=>({invoices:e.invoices.filter(e=>e.id!==t),lastModified:Date.now()})),nextInvoiceNumber:(e,a="MN")=>{let o=t().companies.find(t=>t.id===e);if(!o)return"INV-001";let r=(o.name.replace(/[^a-zA-Z]/g,"").substring(0,3)||"SHP").toUpperCase(),i=new Date,n=String(i.getMonth()+1).padStart(2,"0"),s=String(i.getDate()),l=String(o.invoiceCounter).padStart(6,"0");return`${r}${n}${a}${s}${l}`},expenses:[],addExpense:t=>e(e=>({expenses:[{...t,id:h(),createdAt:new Date().toISOString()},...e.expenses],lastModified:Date.now()})),deleteExpense:t=>e(e=>({expenses:e.expenses.filter(e=>e.id!==t),lastModified:Date.now()})),agencyClients:[],addAgencyClient:t=>{let a={...t,id:h(),createdAt:new Date().toISOString()};return e(e=>({agencyClients:[a,...e.agencyClients],lastModified:Date.now()})),a},updateAgencyClient:(t,a)=>e(e=>({agencyClients:e.agencyClients.map(e=>e.id===t?{...e,...a}:e),lastModified:Date.now()})),deleteAgencyClient:t=>e(e=>({agencyClients:e.agencyClients.filter(e=>e.id!==t),lastModified:Date.now()})),agencyProjects:[],addAgencyProject:t=>{let a={...t,id:h(),createdAt:new Date().toISOString()};return e(e=>({agencyProjects:[a,...e.agencyProjects],lastModified:Date.now()})),a},updateAgencyProject:(t,a)=>e(e=>({agencyProjects:e.agencyProjects.map(e=>e.id===t?{...e,...a}:e),lastModified:Date.now()})),deleteAgencyProject:t=>e(e=>({agencyProjects:e.agencyProjects.filter(e=>e.id!==t),lastModified:Date.now()})),templates:y,addTemplate:t=>e(e=>({templates:[...e.templates,{...t,id:h()}],lastModified:Date.now()})),updateTemplate:(t,a)=>e(e=>({templates:e.templates.map(e=>e.id===t?{...e,...a}:e),lastModified:Date.now()})),deleteTemplate:t=>e(e=>({templates:e.templates.filter(e=>e.id!==t),lastModified:Date.now()})),hsnCache:[],addToHsnCache:t=>e(e=>({hsnCache:[t,...e.hsnCache.filter(e=>e.code!==t.code)].slice(0,200)})),resetAll:()=>e({companies:[],parties:[],products:[],invoices:[],expenses:[],agencyClients:[],agencyProjects:[],hsnCache:[],templates:y,user:null,isAuthenticated:!1,activeCompanyId:null,isHydrating:!0,primarySwapCount:0,aiApiKey:null,aiUsageCount:0,lastSyncedAt:null,syncStatus:"idle",syncError:null,lastModified:Date.now(),isDemo:!1,demoExpiresAt:null}),exportBackup:()=>{let e=f.getState(),t=new Blob([JSON.stringify({version:2,exportedAt:new Date().toISOString(),user:e.user,companies:e.companies,parties:e.parties,products:e.products,invoices:e.invoices,expenses:e.expenses,agencyClients:e.agencyClients,agencyProjects:e.agencyProjects,hsnCache:e.hsnCache,aiApiKey:e.aiApiKey},null,2)],{type:"application/json"}),a=URL.createObjectURL(t),o=document.createElement("a");o.href=a,o.download=`edibio_backup_${new Date().toISOString().slice(0,10)}.json`,o.click(),URL.revokeObjectURL(a)},importBackup:a=>{try{let o=JSON.parse(a);if(!o.companies)throw Error("Invalid backup file — missing companies data.");e({companies:o.companies||[],parties:o.parties||[],products:o.products||[],invoices:o.invoices||[],expenses:o.expenses||[],agencyClients:o.agencyClients||[],agencyProjects:o.agencyProjects||[],hsnCache:o.hsnCache||[],aiApiKey:o.aiApiKey||null}),g(t),p.default.success("Backup imported successfully!")}catch(e){p.default.error("Import failed: "+e.message)}},addAuditLog:a=>{let{activeCompanyId:o,user:r}=t();if(!o||!r)return;let i={...a,id:h(),timestamp:new Date().toISOString()};e(e=>({companies:e.companies.map(e=>e.id===o?{...e,auditLogs:[i,...e.auditLogs||[]]}:e),lastModified:Date.now()})),g(t)}}),r={name:"edibio-store",version:1,storage:l(()=>m)},(e,t,a)=>{let i,n={storage:l(()=>window.localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...r},s=!1,c=0,u=new Set,p=new Set,m=n.storage;if(!m)return o((...t)=>{console.warn(`[zustand persist middleware] Unable to update item '${n.name}', the given storage is currently unavailable.`),e(...t)},t,a);let g=()=>{let e=n.partialize({...t()});return m.setItem(n.name,{state:e,version:n.version})},h=a.setState;a.setState=(e,t)=>(h(e,t),g());let y=o((...t)=>(e(...t),g()),t,a);a.getInitialState=()=>y;let f=()=>{var a,o;if(!m)return;let r=++c;s=!1,u.forEach(e=>{var a;return e(null!=(a=t())?a:y)});let l=(null==(o=n.onRehydrateStorage)?void 0:o.call(n,null!=(a=t())?a:y))||void 0;return d(m.getItem.bind(m))(n.name).then(e=>{if(e)if("number"!=typeof e.version||e.version===n.version)return[!1,e.state];else{if(n.migrate){let t=n.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}return[!1,void 0]}).then(a=>{var o;if(r!==c)return;let[s,l]=a;if(e(i=n.merge(l,null!=(o=t())?o:y),!0),s)return g()}).then(()=>{r===c&&(null==l||l(i,void 0),i=t(),s=!0,p.forEach(e=>e(i)))}).catch(e=>{r===c&&(null==l||l(void 0,e))})};return a.persist={setOptions:e=>{n={...n,...e},e.storage&&(m=e.storage)},clearStorage:()=>{null==m||m.removeItem(n.name)},getOptions:()=>n,rehydrate:()=>f(),hasHydrated:()=>s,onHydrate:e=>(u.add(e),()=>{u.delete(e)}),onFinishHydration:e=>(p.add(e),()=>{p.delete(e)})},n.skipHydration||f(),i||y}));e.s(["useActiveCompany",0,()=>{let{companies:e,activeCompanyId:t}=f();return e.find(e=>e.id===t)??null},"useCompanyData",0,e=>{let{[e]:t,activeCompanyId:a}=f();return(0,i.useMemo)(()=>(t||[]).filter(e=>e.companyId===a),[t,a])},"useStore",0,f,"useUserCompanies",0,()=>{let{companies:e,user:t}=f();return(0,i.useMemo)(()=>e.filter(e=>!(e.userId&&(e.userId!==t?.uid||t?.role))||!!e.team&&!!t&&e.team.some(e=>{let a=e.contact.toLowerCase().trim();return t.email&&t.email.toLowerCase().trim()===a||t.phone&&t.phone.trim()===a})),[e,t])}],4421)},18566,(e,t,a)=>{t.exports=e.r(76562)}]);