(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=t(l);fetch(l.href,i)}})();var Ws={exports:{}},Jr={},$s={exports:{}},I={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bt=Symbol.for("react.element"),tc=Symbol.for("react.portal"),rc=Symbol.for("react.fragment"),lc=Symbol.for("react.strict_mode"),ic=Symbol.for("react.profiler"),oc=Symbol.for("react.provider"),sc=Symbol.for("react.context"),ac=Symbol.for("react.forward_ref"),uc=Symbol.for("react.suspense"),cc=Symbol.for("react.memo"),dc=Symbol.for("react.lazy"),Lo=Symbol.iterator;function fc(e){return e===null||typeof e!="object"?null:(e=Lo&&e[Lo]||e["@@iterator"],typeof e=="function"?e:null)}var Bs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Vs=Object.assign,Hs={};function rt(e,n,t){this.props=e,this.context=n,this.refs=Hs,this.updater=t||Bs}rt.prototype.isReactComponent={};rt.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};rt.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Qs(){}Qs.prototype=rt.prototype;function Mi(e,n,t){this.props=e,this.context=n,this.refs=Hs,this.updater=t||Bs}var Fi=Mi.prototype=new Qs;Fi.constructor=Mi;Vs(Fi,rt.prototype);Fi.isPureReactComponent=!0;var Ro=Array.isArray,bs=Object.prototype.hasOwnProperty,Di={current:null},Ys={key:!0,ref:!0,__self:!0,__source:!0};function Gs(e,n,t){var r,l={},i=null,o=null;if(n!=null)for(r in n.ref!==void 0&&(o=n.ref),n.key!==void 0&&(i=""+n.key),n)bs.call(n,r)&&!Ys.hasOwnProperty(r)&&(l[r]=n[r]);var s=arguments.length-2;if(s===1)l.children=t;else if(1<s){for(var a=Array(s),c=0;c<s;c++)a[c]=arguments[c+2];l.children=a}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)l[r]===void 0&&(l[r]=s[r]);return{$$typeof:bt,type:e,key:i,ref:o,props:l,_owner:Di.current}}function pc(e,n){return{$$typeof:bt,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ji(e){return typeof e=="object"&&e!==null&&e.$$typeof===bt}function mc(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var Ao=/\/+/g;function hl(e,n){return typeof e=="object"&&e!==null&&e.key!=null?mc(""+e.key):n.toString(36)}function vr(e,n,t,r,l){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case bt:case tc:o=!0}}if(o)return o=e,l=l(o),e=r===""?"."+hl(o,0):r,Ro(l)?(t="",e!=null&&(t=e.replace(Ao,"$&/")+"/"),vr(l,n,t,"",function(c){return c})):l!=null&&(ji(l)&&(l=pc(l,t+(!l.key||o&&o.key===l.key?"":(""+l.key).replace(Ao,"$&/")+"/")+e)),n.push(l)),1;if(o=0,r=r===""?".":r+":",Ro(e))for(var s=0;s<e.length;s++){i=e[s];var a=r+hl(i,s);o+=vr(i,n,t,a,l)}else if(a=fc(e),typeof a=="function")for(e=a.call(e),s=0;!(i=e.next()).done;)i=i.value,a=r+hl(i,s++),o+=vr(i,n,t,a,l);else if(i==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return o}function qt(e,n,t){if(e==null)return e;var r=[],l=0;return vr(e,r,"","",function(i){return n.call(t,i,l++)}),r}function gc(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var oe={current:null},hr={transition:null},vc={ReactCurrentDispatcher:oe,ReactCurrentBatchConfig:hr,ReactCurrentOwner:Di};function Ks(){throw Error("act(...) is not supported in production builds of React.")}I.Children={map:qt,forEach:function(e,n,t){qt(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return qt(e,function(){n++}),n},toArray:function(e){return qt(e,function(n){return n})||[]},only:function(e){if(!ji(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};I.Component=rt;I.Fragment=rc;I.Profiler=ic;I.PureComponent=Mi;I.StrictMode=lc;I.Suspense=uc;I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vc;I.act=Ks;I.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Vs({},e.props),l=e.key,i=e.ref,o=e._owner;if(n!=null){if(n.ref!==void 0&&(i=n.ref,o=Di.current),n.key!==void 0&&(l=""+n.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(a in n)bs.call(n,a)&&!Ys.hasOwnProperty(a)&&(r[a]=n[a]===void 0&&s!==void 0?s[a]:n[a])}var a=arguments.length-2;if(a===1)r.children=t;else if(1<a){s=Array(a);for(var c=0;c<a;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:bt,type:e.type,key:l,ref:i,props:r,_owner:o}};I.createContext=function(e){return e={$$typeof:sc,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:oc,_context:e},e.Consumer=e};I.createElement=Gs;I.createFactory=function(e){var n=Gs.bind(null,e);return n.type=e,n};I.createRef=function(){return{current:null}};I.forwardRef=function(e){return{$$typeof:ac,render:e}};I.isValidElement=ji;I.lazy=function(e){return{$$typeof:dc,_payload:{_status:-1,_result:e},_init:gc}};I.memo=function(e,n){return{$$typeof:cc,type:e,compare:n===void 0?null:n}};I.startTransition=function(e){var n=hr.transition;hr.transition={};try{e()}finally{hr.transition=n}};I.unstable_act=Ks;I.useCallback=function(e,n){return oe.current.useCallback(e,n)};I.useContext=function(e){return oe.current.useContext(e)};I.useDebugValue=function(){};I.useDeferredValue=function(e){return oe.current.useDeferredValue(e)};I.useEffect=function(e,n){return oe.current.useEffect(e,n)};I.useId=function(){return oe.current.useId()};I.useImperativeHandle=function(e,n,t){return oe.current.useImperativeHandle(e,n,t)};I.useInsertionEffect=function(e,n){return oe.current.useInsertionEffect(e,n)};I.useLayoutEffect=function(e,n){return oe.current.useLayoutEffect(e,n)};I.useMemo=function(e,n){return oe.current.useMemo(e,n)};I.useReducer=function(e,n,t){return oe.current.useReducer(e,n,t)};I.useRef=function(e){return oe.current.useRef(e)};I.useState=function(e){return oe.current.useState(e)};I.useSyncExternalStore=function(e,n,t){return oe.current.useSyncExternalStore(e,n,t)};I.useTransition=function(){return oe.current.useTransition()};I.version="18.3.1";$s.exports=I;var Xs=$s.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hc=Xs,yc=Symbol.for("react.element"),wc=Symbol.for("react.fragment"),kc=Object.prototype.hasOwnProperty,Sc=hc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,xc={key:!0,ref:!0,__self:!0,__source:!0};function Zs(e,n,t){var r,l={},i=null,o=null;t!==void 0&&(i=""+t),n.key!==void 0&&(i=""+n.key),n.ref!==void 0&&(o=n.ref);for(r in n)kc.call(n,r)&&!xc.hasOwnProperty(r)&&(l[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)l[r]===void 0&&(l[r]=n[r]);return{$$typeof:yc,type:e,key:i,ref:o,props:l,_owner:Sc.current}}Jr.Fragment=wc;Jr.jsx=Zs;Jr.jsxs=Zs;Ws.exports=Jr;var Js=Ws.exports,qs={exports:{}},he={},ea={exports:{}},na={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(E,_){var N=E.length;E.push(_);e:for(;0<N;){var V=N-1>>>1,G=E[V];if(0<l(G,_))E[V]=_,E[N]=G,N=V;else break e}}function t(E){return E.length===0?null:E[0]}function r(E){if(E.length===0)return null;var _=E[0],N=E.pop();if(N!==_){E[0]=N;e:for(var V=0,G=E.length,Zt=G>>>1;V<Zt;){var gn=2*(V+1)-1,vl=E[gn],vn=gn+1,Jt=E[vn];if(0>l(vl,N))vn<G&&0>l(Jt,vl)?(E[V]=Jt,E[vn]=N,V=vn):(E[V]=vl,E[gn]=N,V=gn);else if(vn<G&&0>l(Jt,N))E[V]=Jt,E[vn]=N,V=vn;else break e}}return _}function l(E,_){var N=E.sortIndex-_.sortIndex;return N!==0?N:E.id-_.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var a=[],c=[],g=1,m=null,p=3,y=!1,w=!1,k=!1,F=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(E){for(var _=t(c);_!==null;){if(_.callback===null)r(c);else if(_.startTime<=E)r(c),_.sortIndex=_.expirationTime,n(a,_);else break;_=t(c)}}function v(E){if(k=!1,f(E),!w)if(t(a)!==null)w=!0,ml(x);else{var _=t(c);_!==null&&gl(v,_.startTime-E)}}function x(E,_){w=!1,k&&(k=!1,d(P),P=-1),y=!0;var N=p;try{for(f(_),m=t(a);m!==null&&(!(m.expirationTime>_)||E&&!ze());){var V=m.callback;if(typeof V=="function"){m.callback=null,p=m.priorityLevel;var G=V(m.expirationTime<=_);_=e.unstable_now(),typeof G=="function"?m.callback=G:m===t(a)&&r(a),f(_)}else r(a);m=t(a)}if(m!==null)var Zt=!0;else{var gn=t(c);gn!==null&&gl(v,gn.startTime-_),Zt=!1}return Zt}finally{m=null,p=N,y=!1}}var C=!1,z=null,P=-1,B=5,T=-1;function ze(){return!(e.unstable_now()-T<B)}function ot(){if(z!==null){var E=e.unstable_now();T=E;var _=!0;try{_=z(!0,E)}finally{_?st():(C=!1,z=null)}}else C=!1}var st;if(typeof u=="function")st=function(){u(ot)};else if(typeof MessageChannel<"u"){var To=new MessageChannel,nc=To.port2;To.port1.onmessage=ot,st=function(){nc.postMessage(null)}}else st=function(){F(ot,0)};function ml(E){z=E,C||(C=!0,st())}function gl(E,_){P=F(function(){E(e.unstable_now())},_)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){w||y||(w=!0,ml(x))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return t(a)},e.unstable_next=function(E){switch(p){case 1:case 2:case 3:var _=3;break;default:_=p}var N=p;p=_;try{return E()}finally{p=N}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,_){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var N=p;p=E;try{return _()}finally{p=N}},e.unstable_scheduleCallback=function(E,_,N){var V=e.unstable_now();switch(typeof N=="object"&&N!==null?(N=N.delay,N=typeof N=="number"&&0<N?V+N:V):N=V,E){case 1:var G=-1;break;case 2:G=250;break;case 5:G=1073741823;break;case 4:G=1e4;break;default:G=5e3}return G=N+G,E={id:g++,callback:_,priorityLevel:E,startTime:N,expirationTime:G,sortIndex:-1},N>V?(E.sortIndex=N,n(c,E),t(a)===null&&E===t(c)&&(k?(d(P),P=-1):k=!0,gl(v,N-V))):(E.sortIndex=G,n(a,E),w||y||(w=!0,ml(x))),E},e.unstable_shouldYield=ze,e.unstable_wrapCallback=function(E){var _=p;return function(){var N=p;p=_;try{return E.apply(this,arguments)}finally{p=N}}}})(na);ea.exports=na;var Ec=ea.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cc=Xs,ve=Ec;function h(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ta=new Set,It={};function In(e,n){Xn(e,n),Xn(e+"Capture",n)}function Xn(e,n){for(It[e]=n,e=0;e<n.length;e++)ta.add(n[e])}var Ve=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Vl=Object.prototype.hasOwnProperty,zc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Oo={},Mo={};function Pc(e){return Vl.call(Mo,e)?!0:Vl.call(Oo,e)?!1:zc.test(e)?Mo[e]=!0:(Oo[e]=!0,!1)}function _c(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Nc(e,n,t,r){if(n===null||typeof n>"u"||_c(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function se(e,n,t,r,l,i,o){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=i,this.removeEmptyString=o}var q={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){q[e]=new se(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];q[n]=new se(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){q[e]=new se(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){q[e]=new se(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){q[e]=new se(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){q[e]=new se(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){q[e]=new se(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){q[e]=new se(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){q[e]=new se(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ui=/[\-:]([a-z])/g;function Wi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Ui,Wi);q[n]=new se(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Ui,Wi);q[n]=new se(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Ui,Wi);q[n]=new se(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){q[e]=new se(e,1,!1,e.toLowerCase(),null,!1,!1)});q.xlinkHref=new se("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){q[e]=new se(e,1,!1,e.toLowerCase(),null,!0,!0)});function $i(e,n,t,r){var l=q.hasOwnProperty(n)?q[n]:null;(l!==null?l.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Nc(n,t,l,r)&&(t=null),r||l===null?Pc(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):l.mustUseProperty?e[l.propertyName]=t===null?l.type===3?!1:"":t:(n=l.attributeName,r=l.attributeNamespace,t===null?e.removeAttribute(n):(l=l.type,t=l===3||l===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Ye=Cc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,er=Symbol.for("react.element"),Rn=Symbol.for("react.portal"),An=Symbol.for("react.fragment"),Bi=Symbol.for("react.strict_mode"),Hl=Symbol.for("react.profiler"),ra=Symbol.for("react.provider"),la=Symbol.for("react.context"),Vi=Symbol.for("react.forward_ref"),Ql=Symbol.for("react.suspense"),bl=Symbol.for("react.suspense_list"),Hi=Symbol.for("react.memo"),Ke=Symbol.for("react.lazy"),ia=Symbol.for("react.offscreen"),Fo=Symbol.iterator;function at(e){return e===null||typeof e!="object"?null:(e=Fo&&e[Fo]||e["@@iterator"],typeof e=="function"?e:null)}var W=Object.assign,yl;function vt(e){if(yl===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);yl=n&&n[1]||""}return`
`+yl+e}var wl=!1;function kl(e,n){if(!e||wl)return"";wl=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(c){var r=c}Reflect.construct(e,[],n)}else{try{n.call()}catch(c){r=c}e.call(n.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var l=c.stack.split(`
`),i=r.stack.split(`
`),o=l.length-1,s=i.length-1;1<=o&&0<=s&&l[o]!==i[s];)s--;for(;1<=o&&0<=s;o--,s--)if(l[o]!==i[s]){if(o!==1||s!==1)do if(o--,s--,0>s||l[o]!==i[s]){var a=`
`+l[o].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=o&&0<=s);break}}}finally{wl=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?vt(e):""}function Ic(e){switch(e.tag){case 5:return vt(e.type);case 16:return vt("Lazy");case 13:return vt("Suspense");case 19:return vt("SuspenseList");case 0:case 2:case 15:return e=kl(e.type,!1),e;case 11:return e=kl(e.type.render,!1),e;case 1:return e=kl(e.type,!0),e;default:return""}}function Yl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case An:return"Fragment";case Rn:return"Portal";case Hl:return"Profiler";case Bi:return"StrictMode";case Ql:return"Suspense";case bl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case la:return(e.displayName||"Context")+".Consumer";case ra:return(e._context.displayName||"Context")+".Provider";case Vi:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Hi:return n=e.displayName||null,n!==null?n:Yl(e.type)||"Memo";case Ke:n=e._payload,e=e._init;try{return Yl(e(n))}catch{}}return null}function Tc(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Yl(n);case 8:return n===Bi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function cn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function oa(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Lc(e){var n=oa(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var l=t.get,i=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return l.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function nr(e){e._valueTracker||(e._valueTracker=Lc(e))}function sa(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=oa(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Nr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Gl(e,n){var t=n.checked;return W({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function Do(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=cn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function aa(e,n){n=n.checked,n!=null&&$i(e,"checked",n,!1)}function Kl(e,n){aa(e,n);var t=cn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?Xl(e,n.type,t):n.hasOwnProperty("defaultValue")&&Xl(e,n.type,cn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function jo(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function Xl(e,n,t){(n!=="number"||Nr(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var ht=Array.isArray;function Hn(e,n,t,r){if(e=e.options,n){n={};for(var l=0;l<t.length;l++)n["$"+t[l]]=!0;for(t=0;t<e.length;t++)l=n.hasOwnProperty("$"+e[t].value),e[t].selected!==l&&(e[t].selected=l),l&&r&&(e[t].defaultSelected=!0)}else{for(t=""+cn(t),n=null,l=0;l<e.length;l++){if(e[l].value===t){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}n!==null||e[l].disabled||(n=e[l])}n!==null&&(n.selected=!0)}}function Zl(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(h(91));return W({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Uo(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(h(92));if(ht(t)){if(1<t.length)throw Error(h(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:cn(t)}}function ua(e,n){var t=cn(n.value),r=cn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function Wo(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function ca(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Jl(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?ca(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var tr,da=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,l){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,l)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(tr=tr||document.createElement("div"),tr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=tr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Tt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var kt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Rc=["Webkit","ms","Moz","O"];Object.keys(kt).forEach(function(e){Rc.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),kt[n]=kt[e]})});function fa(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||kt.hasOwnProperty(e)&&kt[e]?(""+n).trim():n+"px"}function pa(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,l=fa(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,l):e[t]=l}}var Ac=W({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ql(e,n){if(n){if(Ac[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(h(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(h(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(h(61))}if(n.style!=null&&typeof n.style!="object")throw Error(h(62))}}function ei(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ni=null;function Qi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ti=null,Qn=null,bn=null;function $o(e){if(e=Kt(e)){if(typeof ti!="function")throw Error(h(280));var n=e.stateNode;n&&(n=rl(n),ti(e.stateNode,e.type,n))}}function ma(e){Qn?bn?bn.push(e):bn=[e]:Qn=e}function ga(){if(Qn){var e=Qn,n=bn;if(bn=Qn=null,$o(e),n)for(e=0;e<n.length;e++)$o(n[e])}}function va(e,n){return e(n)}function ha(){}var Sl=!1;function ya(e,n,t){if(Sl)return e(n,t);Sl=!0;try{return va(e,n,t)}finally{Sl=!1,(Qn!==null||bn!==null)&&(ha(),ga())}}function Lt(e,n){var t=e.stateNode;if(t===null)return null;var r=rl(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(h(231,n,typeof t));return t}var ri=!1;if(Ve)try{var ut={};Object.defineProperty(ut,"passive",{get:function(){ri=!0}}),window.addEventListener("test",ut,ut),window.removeEventListener("test",ut,ut)}catch{ri=!1}function Oc(e,n,t,r,l,i,o,s,a){var c=Array.prototype.slice.call(arguments,3);try{n.apply(t,c)}catch(g){this.onError(g)}}var St=!1,Ir=null,Tr=!1,li=null,Mc={onError:function(e){St=!0,Ir=e}};function Fc(e,n,t,r,l,i,o,s,a){St=!1,Ir=null,Oc.apply(Mc,arguments)}function Dc(e,n,t,r,l,i,o,s,a){if(Fc.apply(this,arguments),St){if(St){var c=Ir;St=!1,Ir=null}else throw Error(h(198));Tr||(Tr=!0,li=c)}}function Tn(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function wa(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function Bo(e){if(Tn(e)!==e)throw Error(h(188))}function jc(e){var n=e.alternate;if(!n){if(n=Tn(e),n===null)throw Error(h(188));return n!==e?null:e}for(var t=e,r=n;;){var l=t.return;if(l===null)break;var i=l.alternate;if(i===null){if(r=l.return,r!==null){t=r;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===t)return Bo(l),e;if(i===r)return Bo(l),n;i=i.sibling}throw Error(h(188))}if(t.return!==r.return)t=l,r=i;else{for(var o=!1,s=l.child;s;){if(s===t){o=!0,t=l,r=i;break}if(s===r){o=!0,r=l,t=i;break}s=s.sibling}if(!o){for(s=i.child;s;){if(s===t){o=!0,t=i,r=l;break}if(s===r){o=!0,r=i,t=l;break}s=s.sibling}if(!o)throw Error(h(189))}}if(t.alternate!==r)throw Error(h(190))}if(t.tag!==3)throw Error(h(188));return t.stateNode.current===t?e:n}function ka(e){return e=jc(e),e!==null?Sa(e):null}function Sa(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Sa(e);if(n!==null)return n;e=e.sibling}return null}var xa=ve.unstable_scheduleCallback,Vo=ve.unstable_cancelCallback,Uc=ve.unstable_shouldYield,Wc=ve.unstable_requestPaint,H=ve.unstable_now,$c=ve.unstable_getCurrentPriorityLevel,bi=ve.unstable_ImmediatePriority,Ea=ve.unstable_UserBlockingPriority,Lr=ve.unstable_NormalPriority,Bc=ve.unstable_LowPriority,Ca=ve.unstable_IdlePriority,qr=null,Fe=null;function Vc(e){if(Fe&&typeof Fe.onCommitFiberRoot=="function")try{Fe.onCommitFiberRoot(qr,e,void 0,(e.current.flags&128)===128)}catch{}}var Te=Math.clz32?Math.clz32:bc,Hc=Math.log,Qc=Math.LN2;function bc(e){return e>>>=0,e===0?32:31-(Hc(e)/Qc|0)|0}var rr=64,lr=4194304;function yt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Rr(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,l=e.suspendedLanes,i=e.pingedLanes,o=t&268435455;if(o!==0){var s=o&~l;s!==0?r=yt(s):(i&=o,i!==0&&(r=yt(i)))}else o=t&~l,o!==0?r=yt(o):i!==0&&(r=yt(i));if(r===0)return 0;if(n!==0&&n!==r&&!(n&l)&&(l=r&-r,i=n&-n,l>=i||l===16&&(i&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Te(n),l=1<<t,r|=e[t],n&=~l;return r}function Yc(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Gc(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-Te(i),s=1<<o,a=l[o];a===-1?(!(s&t)||s&r)&&(l[o]=Yc(s,n)):a<=n&&(e.expiredLanes|=s),i&=~s}}function ii(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function za(){var e=rr;return rr<<=1,!(rr&4194240)&&(rr=64),e}function xl(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function Yt(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Te(n),e[n]=t}function Kc(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var l=31-Te(t),i=1<<l;n[l]=0,r[l]=-1,e[l]=-1,t&=~i}}function Yi(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Te(t),l=1<<r;l&n|e[r]&n&&(e[r]|=n),t&=~l}}var R=0;function Pa(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var _a,Gi,Na,Ia,Ta,oi=!1,ir=[],nn=null,tn=null,rn=null,Rt=new Map,At=new Map,Ze=[],Xc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ho(e,n){switch(e){case"focusin":case"focusout":nn=null;break;case"dragenter":case"dragleave":tn=null;break;case"mouseover":case"mouseout":rn=null;break;case"pointerover":case"pointerout":Rt.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":At.delete(n.pointerId)}}function ct(e,n,t,r,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:i,targetContainers:[l]},n!==null&&(n=Kt(n),n!==null&&Gi(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,l!==null&&n.indexOf(l)===-1&&n.push(l),e)}function Zc(e,n,t,r,l){switch(n){case"focusin":return nn=ct(nn,e,n,t,r,l),!0;case"dragenter":return tn=ct(tn,e,n,t,r,l),!0;case"mouseover":return rn=ct(rn,e,n,t,r,l),!0;case"pointerover":var i=l.pointerId;return Rt.set(i,ct(Rt.get(i)||null,e,n,t,r,l)),!0;case"gotpointercapture":return i=l.pointerId,At.set(i,ct(At.get(i)||null,e,n,t,r,l)),!0}return!1}function La(e){var n=wn(e.target);if(n!==null){var t=Tn(n);if(t!==null){if(n=t.tag,n===13){if(n=wa(t),n!==null){e.blockedOn=n,Ta(e.priority,function(){Na(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function yr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=si(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);ni=r,t.target.dispatchEvent(r),ni=null}else return n=Kt(t),n!==null&&Gi(n),e.blockedOn=t,!1;n.shift()}return!0}function Qo(e,n,t){yr(e)&&t.delete(n)}function Jc(){oi=!1,nn!==null&&yr(nn)&&(nn=null),tn!==null&&yr(tn)&&(tn=null),rn!==null&&yr(rn)&&(rn=null),Rt.forEach(Qo),At.forEach(Qo)}function dt(e,n){e.blockedOn===n&&(e.blockedOn=null,oi||(oi=!0,ve.unstable_scheduleCallback(ve.unstable_NormalPriority,Jc)))}function Ot(e){function n(l){return dt(l,e)}if(0<ir.length){dt(ir[0],e);for(var t=1;t<ir.length;t++){var r=ir[t];r.blockedOn===e&&(r.blockedOn=null)}}for(nn!==null&&dt(nn,e),tn!==null&&dt(tn,e),rn!==null&&dt(rn,e),Rt.forEach(n),At.forEach(n),t=0;t<Ze.length;t++)r=Ze[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<Ze.length&&(t=Ze[0],t.blockedOn===null);)La(t),t.blockedOn===null&&Ze.shift()}var Yn=Ye.ReactCurrentBatchConfig,Ar=!0;function qc(e,n,t,r){var l=R,i=Yn.transition;Yn.transition=null;try{R=1,Ki(e,n,t,r)}finally{R=l,Yn.transition=i}}function ed(e,n,t,r){var l=R,i=Yn.transition;Yn.transition=null;try{R=4,Ki(e,n,t,r)}finally{R=l,Yn.transition=i}}function Ki(e,n,t,r){if(Ar){var l=si(e,n,t,r);if(l===null)Rl(e,n,r,Or,t),Ho(e,r);else if(Zc(l,e,n,t,r))r.stopPropagation();else if(Ho(e,r),n&4&&-1<Xc.indexOf(e)){for(;l!==null;){var i=Kt(l);if(i!==null&&_a(i),i=si(e,n,t,r),i===null&&Rl(e,n,r,Or,t),i===l)break;l=i}l!==null&&r.stopPropagation()}else Rl(e,n,r,null,t)}}var Or=null;function si(e,n,t,r){if(Or=null,e=Qi(r),e=wn(e),e!==null)if(n=Tn(e),n===null)e=null;else if(t=n.tag,t===13){if(e=wa(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Or=e,null}function Ra(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch($c()){case bi:return 1;case Ea:return 4;case Lr:case Bc:return 16;case Ca:return 536870912;default:return 16}default:return 16}}var qe=null,Xi=null,wr=null;function Aa(){if(wr)return wr;var e,n=Xi,t=n.length,r,l="value"in qe?qe.value:qe.textContent,i=l.length;for(e=0;e<t&&n[e]===l[e];e++);var o=t-e;for(r=1;r<=o&&n[t-r]===l[i-r];r++);return wr=l.slice(e,1<r?1-r:void 0)}function kr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function or(){return!0}function bo(){return!1}function ye(e){function n(t,r,l,i,o){this._reactName=t,this._targetInst=l,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(t=e[s],this[s]=t?t(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?or:bo,this.isPropagationStopped=bo,this}return W(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=or)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=or)},persist:function(){},isPersistent:or}),n}var lt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Zi=ye(lt),Gt=W({},lt,{view:0,detail:0}),nd=ye(Gt),El,Cl,ft,el=W({},Gt,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ji,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ft&&(ft&&e.type==="mousemove"?(El=e.screenX-ft.screenX,Cl=e.screenY-ft.screenY):Cl=El=0,ft=e),El)},movementY:function(e){return"movementY"in e?e.movementY:Cl}}),Yo=ye(el),td=W({},el,{dataTransfer:0}),rd=ye(td),ld=W({},Gt,{relatedTarget:0}),zl=ye(ld),id=W({},lt,{animationName:0,elapsedTime:0,pseudoElement:0}),od=ye(id),sd=W({},lt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ad=ye(sd),ud=W({},lt,{data:0}),Go=ye(ud),cd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},dd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},fd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function pd(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=fd[e])?!!n[e]:!1}function Ji(){return pd}var md=W({},Gt,{key:function(e){if(e.key){var n=cd[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=kr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?dd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ji,charCode:function(e){return e.type==="keypress"?kr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?kr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),gd=ye(md),vd=W({},el,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ko=ye(vd),hd=W({},Gt,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ji}),yd=ye(hd),wd=W({},lt,{propertyName:0,elapsedTime:0,pseudoElement:0}),kd=ye(wd),Sd=W({},el,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),xd=ye(Sd),Ed=[9,13,27,32],qi=Ve&&"CompositionEvent"in window,xt=null;Ve&&"documentMode"in document&&(xt=document.documentMode);var Cd=Ve&&"TextEvent"in window&&!xt,Oa=Ve&&(!qi||xt&&8<xt&&11>=xt),Xo=String.fromCharCode(32),Zo=!1;function Ma(e,n){switch(e){case"keyup":return Ed.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Fa(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var On=!1;function zd(e,n){switch(e){case"compositionend":return Fa(n);case"keypress":return n.which!==32?null:(Zo=!0,Xo);case"textInput":return e=n.data,e===Xo&&Zo?null:e;default:return null}}function Pd(e,n){if(On)return e==="compositionend"||!qi&&Ma(e,n)?(e=Aa(),wr=Xi=qe=null,On=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Oa&&n.locale!=="ko"?null:n.data;default:return null}}var _d={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Jo(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!_d[e.type]:n==="textarea"}function Da(e,n,t,r){ma(r),n=Mr(n,"onChange"),0<n.length&&(t=new Zi("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Et=null,Mt=null;function Nd(e){Ga(e,0)}function nl(e){var n=Dn(e);if(sa(n))return e}function Id(e,n){if(e==="change")return n}var ja=!1;if(Ve){var Pl;if(Ve){var _l="oninput"in document;if(!_l){var qo=document.createElement("div");qo.setAttribute("oninput","return;"),_l=typeof qo.oninput=="function"}Pl=_l}else Pl=!1;ja=Pl&&(!document.documentMode||9<document.documentMode)}function es(){Et&&(Et.detachEvent("onpropertychange",Ua),Mt=Et=null)}function Ua(e){if(e.propertyName==="value"&&nl(Mt)){var n=[];Da(n,Mt,e,Qi(e)),ya(Nd,n)}}function Td(e,n,t){e==="focusin"?(es(),Et=n,Mt=t,Et.attachEvent("onpropertychange",Ua)):e==="focusout"&&es()}function Ld(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return nl(Mt)}function Rd(e,n){if(e==="click")return nl(n)}function Ad(e,n){if(e==="input"||e==="change")return nl(n)}function Od(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Re=typeof Object.is=="function"?Object.is:Od;function Ft(e,n){if(Re(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var l=t[r];if(!Vl.call(n,l)||!Re(e[l],n[l]))return!1}return!0}function ns(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ts(e,n){var t=ns(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=ns(t)}}function Wa(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Wa(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function $a(){for(var e=window,n=Nr();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Nr(e.document)}return n}function eo(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Md(e){var n=$a(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&Wa(t.ownerDocument.documentElement,t)){if(r!==null&&eo(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var l=t.textContent.length,i=Math.min(r.start,l);r=r.end===void 0?i:Math.min(r.end,l),!e.extend&&i>r&&(l=r,r=i,i=l),l=ts(t,i);var o=ts(t,r);l&&o&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(n=n.createRange(),n.setStart(l.node,l.offset),e.removeAllRanges(),i>r?(e.addRange(n),e.extend(o.node,o.offset)):(n.setEnd(o.node,o.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Fd=Ve&&"documentMode"in document&&11>=document.documentMode,Mn=null,ai=null,Ct=null,ui=!1;function rs(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;ui||Mn==null||Mn!==Nr(r)||(r=Mn,"selectionStart"in r&&eo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ct&&Ft(Ct,r)||(Ct=r,r=Mr(ai,"onSelect"),0<r.length&&(n=new Zi("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Mn)))}function sr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Fn={animationend:sr("Animation","AnimationEnd"),animationiteration:sr("Animation","AnimationIteration"),animationstart:sr("Animation","AnimationStart"),transitionend:sr("Transition","TransitionEnd")},Nl={},Ba={};Ve&&(Ba=document.createElement("div").style,"AnimationEvent"in window||(delete Fn.animationend.animation,delete Fn.animationiteration.animation,delete Fn.animationstart.animation),"TransitionEvent"in window||delete Fn.transitionend.transition);function tl(e){if(Nl[e])return Nl[e];if(!Fn[e])return e;var n=Fn[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in Ba)return Nl[e]=n[t];return e}var Va=tl("animationend"),Ha=tl("animationiteration"),Qa=tl("animationstart"),ba=tl("transitionend"),Ya=new Map,ls="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function fn(e,n){Ya.set(e,n),In(n,[e])}for(var Il=0;Il<ls.length;Il++){var Tl=ls[Il],Dd=Tl.toLowerCase(),jd=Tl[0].toUpperCase()+Tl.slice(1);fn(Dd,"on"+jd)}fn(Va,"onAnimationEnd");fn(Ha,"onAnimationIteration");fn(Qa,"onAnimationStart");fn("dblclick","onDoubleClick");fn("focusin","onFocus");fn("focusout","onBlur");fn(ba,"onTransitionEnd");Xn("onMouseEnter",["mouseout","mouseover"]);Xn("onMouseLeave",["mouseout","mouseover"]);Xn("onPointerEnter",["pointerout","pointerover"]);Xn("onPointerLeave",["pointerout","pointerover"]);In("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));In("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));In("onBeforeInput",["compositionend","keypress","textInput","paste"]);In("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));In("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));In("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wt="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ud=new Set("cancel close invalid load scroll toggle".split(" ").concat(wt));function is(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,Dc(r,n,void 0,e),e.currentTarget=null}function Ga(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],l=r.event;r=r.listeners;e:{var i=void 0;if(n)for(var o=r.length-1;0<=o;o--){var s=r[o],a=s.instance,c=s.currentTarget;if(s=s.listener,a!==i&&l.isPropagationStopped())break e;is(l,s,c),i=a}else for(o=0;o<r.length;o++){if(s=r[o],a=s.instance,c=s.currentTarget,s=s.listener,a!==i&&l.isPropagationStopped())break e;is(l,s,c),i=a}}}if(Tr)throw e=li,Tr=!1,li=null,e}function O(e,n){var t=n[mi];t===void 0&&(t=n[mi]=new Set);var r=e+"__bubble";t.has(r)||(Ka(n,e,2,!1),t.add(r))}function Ll(e,n,t){var r=0;n&&(r|=4),Ka(t,e,r,n)}var ar="_reactListening"+Math.random().toString(36).slice(2);function Dt(e){if(!e[ar]){e[ar]=!0,ta.forEach(function(t){t!=="selectionchange"&&(Ud.has(t)||Ll(t,!1,e),Ll(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[ar]||(n[ar]=!0,Ll("selectionchange",!1,n))}}function Ka(e,n,t,r){switch(Ra(n)){case 1:var l=qc;break;case 4:l=ed;break;default:l=Ki}t=l.bind(null,n,t,e),l=void 0,!ri||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(n,t,{capture:!0,passive:l}):e.addEventListener(n,t,!0):l!==void 0?e.addEventListener(n,t,{passive:l}):e.addEventListener(n,t,!1)}function Rl(e,n,t,r,l){var i=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===l||s.nodeType===8&&s.parentNode===l)break;if(o===4)for(o=r.return;o!==null;){var a=o.tag;if((a===3||a===4)&&(a=o.stateNode.containerInfo,a===l||a.nodeType===8&&a.parentNode===l))return;o=o.return}for(;s!==null;){if(o=wn(s),o===null)return;if(a=o.tag,a===5||a===6){r=i=o;continue e}s=s.parentNode}}r=r.return}ya(function(){var c=i,g=Qi(t),m=[];e:{var p=Ya.get(e);if(p!==void 0){var y=Zi,w=e;switch(e){case"keypress":if(kr(t)===0)break e;case"keydown":case"keyup":y=gd;break;case"focusin":w="focus",y=zl;break;case"focusout":w="blur",y=zl;break;case"beforeblur":case"afterblur":y=zl;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Yo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=rd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=yd;break;case Va:case Ha:case Qa:y=od;break;case ba:y=kd;break;case"scroll":y=nd;break;case"wheel":y=xd;break;case"copy":case"cut":case"paste":y=ad;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Ko}var k=(n&4)!==0,F=!k&&e==="scroll",d=k?p!==null?p+"Capture":null:p;k=[];for(var u=c,f;u!==null;){f=u;var v=f.stateNode;if(f.tag===5&&v!==null&&(f=v,d!==null&&(v=Lt(u,d),v!=null&&k.push(jt(u,v,f)))),F)break;u=u.return}0<k.length&&(p=new y(p,w,null,t,g),m.push({event:p,listeners:k}))}}if(!(n&7)){e:{if(p=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",p&&t!==ni&&(w=t.relatedTarget||t.fromElement)&&(wn(w)||w[He]))break e;if((y||p)&&(p=g.window===g?g:(p=g.ownerDocument)?p.defaultView||p.parentWindow:window,y?(w=t.relatedTarget||t.toElement,y=c,w=w?wn(w):null,w!==null&&(F=Tn(w),w!==F||w.tag!==5&&w.tag!==6)&&(w=null)):(y=null,w=c),y!==w)){if(k=Yo,v="onMouseLeave",d="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(k=Ko,v="onPointerLeave",d="onPointerEnter",u="pointer"),F=y==null?p:Dn(y),f=w==null?p:Dn(w),p=new k(v,u+"leave",y,t,g),p.target=F,p.relatedTarget=f,v=null,wn(g)===c&&(k=new k(d,u+"enter",w,t,g),k.target=f,k.relatedTarget=F,v=k),F=v,y&&w)n:{for(k=y,d=w,u=0,f=k;f;f=Ln(f))u++;for(f=0,v=d;v;v=Ln(v))f++;for(;0<u-f;)k=Ln(k),u--;for(;0<f-u;)d=Ln(d),f--;for(;u--;){if(k===d||d!==null&&k===d.alternate)break n;k=Ln(k),d=Ln(d)}k=null}else k=null;y!==null&&os(m,p,y,k,!1),w!==null&&F!==null&&os(m,F,w,k,!0)}}e:{if(p=c?Dn(c):window,y=p.nodeName&&p.nodeName.toLowerCase(),y==="select"||y==="input"&&p.type==="file")var x=Id;else if(Jo(p))if(ja)x=Ad;else{x=Ld;var C=Td}else(y=p.nodeName)&&y.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(x=Rd);if(x&&(x=x(e,c))){Da(m,x,t,g);break e}C&&C(e,p,c),e==="focusout"&&(C=p._wrapperState)&&C.controlled&&p.type==="number"&&Xl(p,"number",p.value)}switch(C=c?Dn(c):window,e){case"focusin":(Jo(C)||C.contentEditable==="true")&&(Mn=C,ai=c,Ct=null);break;case"focusout":Ct=ai=Mn=null;break;case"mousedown":ui=!0;break;case"contextmenu":case"mouseup":case"dragend":ui=!1,rs(m,t,g);break;case"selectionchange":if(Fd)break;case"keydown":case"keyup":rs(m,t,g)}var z;if(qi)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else On?Ma(e,t)&&(P="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(P="onCompositionStart");P&&(Oa&&t.locale!=="ko"&&(On||P!=="onCompositionStart"?P==="onCompositionEnd"&&On&&(z=Aa()):(qe=g,Xi="value"in qe?qe.value:qe.textContent,On=!0)),C=Mr(c,P),0<C.length&&(P=new Go(P,e,null,t,g),m.push({event:P,listeners:C}),z?P.data=z:(z=Fa(t),z!==null&&(P.data=z)))),(z=Cd?zd(e,t):Pd(e,t))&&(c=Mr(c,"onBeforeInput"),0<c.length&&(g=new Go("onBeforeInput","beforeinput",null,t,g),m.push({event:g,listeners:c}),g.data=z))}Ga(m,n)})}function jt(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Mr(e,n){for(var t=n+"Capture",r=[];e!==null;){var l=e,i=l.stateNode;l.tag===5&&i!==null&&(l=i,i=Lt(e,t),i!=null&&r.unshift(jt(e,i,l)),i=Lt(e,n),i!=null&&r.push(jt(e,i,l))),e=e.return}return r}function Ln(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function os(e,n,t,r,l){for(var i=n._reactName,o=[];t!==null&&t!==r;){var s=t,a=s.alternate,c=s.stateNode;if(a!==null&&a===r)break;s.tag===5&&c!==null&&(s=c,l?(a=Lt(t,i),a!=null&&o.unshift(jt(t,a,s))):l||(a=Lt(t,i),a!=null&&o.push(jt(t,a,s)))),t=t.return}o.length!==0&&e.push({event:n,listeners:o})}var Wd=/\r\n?/g,$d=/\u0000|\uFFFD/g;function ss(e){return(typeof e=="string"?e:""+e).replace(Wd,`
`).replace($d,"")}function ur(e,n,t){if(n=ss(n),ss(e)!==n&&t)throw Error(h(425))}function Fr(){}var ci=null,di=null;function fi(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var pi=typeof setTimeout=="function"?setTimeout:void 0,Bd=typeof clearTimeout=="function"?clearTimeout:void 0,as=typeof Promise=="function"?Promise:void 0,Vd=typeof queueMicrotask=="function"?queueMicrotask:typeof as<"u"?function(e){return as.resolve(null).then(e).catch(Hd)}:pi;function Hd(e){setTimeout(function(){throw e})}function Al(e,n){var t=n,r=0;do{var l=t.nextSibling;if(e.removeChild(t),l&&l.nodeType===8)if(t=l.data,t==="/$"){if(r===0){e.removeChild(l),Ot(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=l}while(t);Ot(n)}function ln(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function us(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var it=Math.random().toString(36).slice(2),Me="__reactFiber$"+it,Ut="__reactProps$"+it,He="__reactContainer$"+it,mi="__reactEvents$"+it,Qd="__reactListeners$"+it,bd="__reactHandles$"+it;function wn(e){var n=e[Me];if(n)return n;for(var t=e.parentNode;t;){if(n=t[He]||t[Me]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=us(e);e!==null;){if(t=e[Me])return t;e=us(e)}return n}e=t,t=e.parentNode}return null}function Kt(e){return e=e[Me]||e[He],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Dn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(h(33))}function rl(e){return e[Ut]||null}var gi=[],jn=-1;function pn(e){return{current:e}}function M(e){0>jn||(e.current=gi[jn],gi[jn]=null,jn--)}function A(e,n){jn++,gi[jn]=e.current,e.current=n}var dn={},re=pn(dn),ce=pn(!1),Cn=dn;function Zn(e,n){var t=e.type.contextTypes;if(!t)return dn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var l={},i;for(i in t)l[i]=n[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=l),l}function de(e){return e=e.childContextTypes,e!=null}function Dr(){M(ce),M(re)}function cs(e,n,t){if(re.current!==dn)throw Error(h(168));A(re,n),A(ce,t)}function Xa(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var l in r)if(!(l in n))throw Error(h(108,Tc(e)||"Unknown",l));return W({},t,r)}function jr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||dn,Cn=re.current,A(re,e),A(ce,ce.current),!0}function ds(e,n,t){var r=e.stateNode;if(!r)throw Error(h(169));t?(e=Xa(e,n,Cn),r.__reactInternalMemoizedMergedChildContext=e,M(ce),M(re),A(re,e)):M(ce),A(ce,t)}var Ue=null,ll=!1,Ol=!1;function Za(e){Ue===null?Ue=[e]:Ue.push(e)}function Yd(e){ll=!0,Za(e)}function mn(){if(!Ol&&Ue!==null){Ol=!0;var e=0,n=R;try{var t=Ue;for(R=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}Ue=null,ll=!1}catch(l){throw Ue!==null&&(Ue=Ue.slice(e+1)),xa(bi,mn),l}finally{R=n,Ol=!1}}return null}var Un=[],Wn=0,Ur=null,Wr=0,we=[],ke=0,zn=null,We=1,$e="";function hn(e,n){Un[Wn++]=Wr,Un[Wn++]=Ur,Ur=e,Wr=n}function Ja(e,n,t){we[ke++]=We,we[ke++]=$e,we[ke++]=zn,zn=e;var r=We;e=$e;var l=32-Te(r)-1;r&=~(1<<l),t+=1;var i=32-Te(n)+l;if(30<i){var o=l-l%5;i=(r&(1<<o)-1).toString(32),r>>=o,l-=o,We=1<<32-Te(n)+l|t<<l|r,$e=i+e}else We=1<<i|t<<l|r,$e=e}function no(e){e.return!==null&&(hn(e,1),Ja(e,1,0))}function to(e){for(;e===Ur;)Ur=Un[--Wn],Un[Wn]=null,Wr=Un[--Wn],Un[Wn]=null;for(;e===zn;)zn=we[--ke],we[ke]=null,$e=we[--ke],we[ke]=null,We=we[--ke],we[ke]=null}var ge=null,me=null,D=!1,Ie=null;function qa(e,n){var t=Se(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function fs(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,ge=e,me=ln(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,ge=e,me=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=zn!==null?{id:We,overflow:$e}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Se(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,ge=e,me=null,!0):!1;default:return!1}}function vi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function hi(e){if(D){var n=me;if(n){var t=n;if(!fs(e,n)){if(vi(e))throw Error(h(418));n=ln(t.nextSibling);var r=ge;n&&fs(e,n)?qa(r,t):(e.flags=e.flags&-4097|2,D=!1,ge=e)}}else{if(vi(e))throw Error(h(418));e.flags=e.flags&-4097|2,D=!1,ge=e}}}function ps(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ge=e}function cr(e){if(e!==ge)return!1;if(!D)return ps(e),D=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!fi(e.type,e.memoizedProps)),n&&(n=me)){if(vi(e))throw eu(),Error(h(418));for(;n;)qa(e,n),n=ln(n.nextSibling)}if(ps(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(h(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){me=ln(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}me=null}}else me=ge?ln(e.stateNode.nextSibling):null;return!0}function eu(){for(var e=me;e;)e=ln(e.nextSibling)}function Jn(){me=ge=null,D=!1}function ro(e){Ie===null?Ie=[e]:Ie.push(e)}var Gd=Ye.ReactCurrentBatchConfig;function pt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(h(309));var r=t.stateNode}if(!r)throw Error(h(147,e));var l=r,i=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===i?n.ref:(n=function(o){var s=l.refs;o===null?delete s[i]:s[i]=o},n._stringRef=i,n)}if(typeof e!="string")throw Error(h(284));if(!t._owner)throw Error(h(290,e))}return e}function dr(e,n){throw e=Object.prototype.toString.call(n),Error(h(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function ms(e){var n=e._init;return n(e._payload)}function nu(e){function n(d,u){if(e){var f=d.deletions;f===null?(d.deletions=[u],d.flags|=16):f.push(u)}}function t(d,u){if(!e)return null;for(;u!==null;)n(d,u),u=u.sibling;return null}function r(d,u){for(d=new Map;u!==null;)u.key!==null?d.set(u.key,u):d.set(u.index,u),u=u.sibling;return d}function l(d,u){return d=un(d,u),d.index=0,d.sibling=null,d}function i(d,u,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<u?(d.flags|=2,u):f):(d.flags|=2,u)):(d.flags|=1048576,u)}function o(d){return e&&d.alternate===null&&(d.flags|=2),d}function s(d,u,f,v){return u===null||u.tag!==6?(u=$l(f,d.mode,v),u.return=d,u):(u=l(u,f),u.return=d,u)}function a(d,u,f,v){var x=f.type;return x===An?g(d,u,f.props.children,v,f.key):u!==null&&(u.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===Ke&&ms(x)===u.type)?(v=l(u,f.props),v.ref=pt(d,u,f),v.return=d,v):(v=_r(f.type,f.key,f.props,null,d.mode,v),v.ref=pt(d,u,f),v.return=d,v)}function c(d,u,f,v){return u===null||u.tag!==4||u.stateNode.containerInfo!==f.containerInfo||u.stateNode.implementation!==f.implementation?(u=Bl(f,d.mode,v),u.return=d,u):(u=l(u,f.children||[]),u.return=d,u)}function g(d,u,f,v,x){return u===null||u.tag!==7?(u=En(f,d.mode,v,x),u.return=d,u):(u=l(u,f),u.return=d,u)}function m(d,u,f){if(typeof u=="string"&&u!==""||typeof u=="number")return u=$l(""+u,d.mode,f),u.return=d,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case er:return f=_r(u.type,u.key,u.props,null,d.mode,f),f.ref=pt(d,null,u),f.return=d,f;case Rn:return u=Bl(u,d.mode,f),u.return=d,u;case Ke:var v=u._init;return m(d,v(u._payload),f)}if(ht(u)||at(u))return u=En(u,d.mode,f,null),u.return=d,u;dr(d,u)}return null}function p(d,u,f,v){var x=u!==null?u.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return x!==null?null:s(d,u,""+f,v);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case er:return f.key===x?a(d,u,f,v):null;case Rn:return f.key===x?c(d,u,f,v):null;case Ke:return x=f._init,p(d,u,x(f._payload),v)}if(ht(f)||at(f))return x!==null?null:g(d,u,f,v,null);dr(d,f)}return null}function y(d,u,f,v,x){if(typeof v=="string"&&v!==""||typeof v=="number")return d=d.get(f)||null,s(u,d,""+v,x);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case er:return d=d.get(v.key===null?f:v.key)||null,a(u,d,v,x);case Rn:return d=d.get(v.key===null?f:v.key)||null,c(u,d,v,x);case Ke:var C=v._init;return y(d,u,f,C(v._payload),x)}if(ht(v)||at(v))return d=d.get(f)||null,g(u,d,v,x,null);dr(u,v)}return null}function w(d,u,f,v){for(var x=null,C=null,z=u,P=u=0,B=null;z!==null&&P<f.length;P++){z.index>P?(B=z,z=null):B=z.sibling;var T=p(d,z,f[P],v);if(T===null){z===null&&(z=B);break}e&&z&&T.alternate===null&&n(d,z),u=i(T,u,P),C===null?x=T:C.sibling=T,C=T,z=B}if(P===f.length)return t(d,z),D&&hn(d,P),x;if(z===null){for(;P<f.length;P++)z=m(d,f[P],v),z!==null&&(u=i(z,u,P),C===null?x=z:C.sibling=z,C=z);return D&&hn(d,P),x}for(z=r(d,z);P<f.length;P++)B=y(z,d,P,f[P],v),B!==null&&(e&&B.alternate!==null&&z.delete(B.key===null?P:B.key),u=i(B,u,P),C===null?x=B:C.sibling=B,C=B);return e&&z.forEach(function(ze){return n(d,ze)}),D&&hn(d,P),x}function k(d,u,f,v){var x=at(f);if(typeof x!="function")throw Error(h(150));if(f=x.call(f),f==null)throw Error(h(151));for(var C=x=null,z=u,P=u=0,B=null,T=f.next();z!==null&&!T.done;P++,T=f.next()){z.index>P?(B=z,z=null):B=z.sibling;var ze=p(d,z,T.value,v);if(ze===null){z===null&&(z=B);break}e&&z&&ze.alternate===null&&n(d,z),u=i(ze,u,P),C===null?x=ze:C.sibling=ze,C=ze,z=B}if(T.done)return t(d,z),D&&hn(d,P),x;if(z===null){for(;!T.done;P++,T=f.next())T=m(d,T.value,v),T!==null&&(u=i(T,u,P),C===null?x=T:C.sibling=T,C=T);return D&&hn(d,P),x}for(z=r(d,z);!T.done;P++,T=f.next())T=y(z,d,P,T.value,v),T!==null&&(e&&T.alternate!==null&&z.delete(T.key===null?P:T.key),u=i(T,u,P),C===null?x=T:C.sibling=T,C=T);return e&&z.forEach(function(ot){return n(d,ot)}),D&&hn(d,P),x}function F(d,u,f,v){if(typeof f=="object"&&f!==null&&f.type===An&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case er:e:{for(var x=f.key,C=u;C!==null;){if(C.key===x){if(x=f.type,x===An){if(C.tag===7){t(d,C.sibling),u=l(C,f.props.children),u.return=d,d=u;break e}}else if(C.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===Ke&&ms(x)===C.type){t(d,C.sibling),u=l(C,f.props),u.ref=pt(d,C,f),u.return=d,d=u;break e}t(d,C);break}else n(d,C);C=C.sibling}f.type===An?(u=En(f.props.children,d.mode,v,f.key),u.return=d,d=u):(v=_r(f.type,f.key,f.props,null,d.mode,v),v.ref=pt(d,u,f),v.return=d,d=v)}return o(d);case Rn:e:{for(C=f.key;u!==null;){if(u.key===C)if(u.tag===4&&u.stateNode.containerInfo===f.containerInfo&&u.stateNode.implementation===f.implementation){t(d,u.sibling),u=l(u,f.children||[]),u.return=d,d=u;break e}else{t(d,u);break}else n(d,u);u=u.sibling}u=Bl(f,d.mode,v),u.return=d,d=u}return o(d);case Ke:return C=f._init,F(d,u,C(f._payload),v)}if(ht(f))return w(d,u,f,v);if(at(f))return k(d,u,f,v);dr(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,u!==null&&u.tag===6?(t(d,u.sibling),u=l(u,f),u.return=d,d=u):(t(d,u),u=$l(f,d.mode,v),u.return=d,d=u),o(d)):t(d,u)}return F}var qn=nu(!0),tu=nu(!1),$r=pn(null),Br=null,$n=null,lo=null;function io(){lo=$n=Br=null}function oo(e){var n=$r.current;M($r),e._currentValue=n}function yi(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function Gn(e,n){Br=e,lo=$n=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(ue=!0),e.firstContext=null)}function Ee(e){var n=e._currentValue;if(lo!==e)if(e={context:e,memoizedValue:n,next:null},$n===null){if(Br===null)throw Error(h(308));$n=e,Br.dependencies={lanes:0,firstContext:e}}else $n=$n.next=e;return n}var kn=null;function so(e){kn===null?kn=[e]:kn.push(e)}function ru(e,n,t,r){var l=n.interleaved;return l===null?(t.next=t,so(n)):(t.next=l.next,l.next=t),n.interleaved=t,Qe(e,r)}function Qe(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var Xe=!1;function ao(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function lu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Be(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function on(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,L&2){var l=r.pending;return l===null?n.next=n:(n.next=l.next,l.next=n),r.pending=n,Qe(e,t)}return l=r.interleaved,l===null?(n.next=n,so(r)):(n.next=l.next,l.next=n),r.interleaved=n,Qe(e,t)}function Sr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,Yi(e,t)}}function gs(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var l=null,i=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};i===null?l=i=o:i=i.next=o,t=t.next}while(t!==null);i===null?l=i=n:i=i.next=n}else l=i=n;t={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function Vr(e,n,t,r){var l=e.updateQueue;Xe=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,s=l.shared.pending;if(s!==null){l.shared.pending=null;var a=s,c=a.next;a.next=null,o===null?i=c:o.next=c,o=a;var g=e.alternate;g!==null&&(g=g.updateQueue,s=g.lastBaseUpdate,s!==o&&(s===null?g.firstBaseUpdate=c:s.next=c,g.lastBaseUpdate=a))}if(i!==null){var m=l.baseState;o=0,g=c=a=null,s=i;do{var p=s.lane,y=s.eventTime;if((r&p)===p){g!==null&&(g=g.next={eventTime:y,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var w=e,k=s;switch(p=n,y=t,k.tag){case 1:if(w=k.payload,typeof w=="function"){m=w.call(y,m,p);break e}m=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=k.payload,p=typeof w=="function"?w.call(y,m,p):w,p==null)break e;m=W({},m,p);break e;case 2:Xe=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,p=l.effects,p===null?l.effects=[s]:p.push(s))}else y={eventTime:y,lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},g===null?(c=g=y,a=m):g=g.next=y,o|=p;if(s=s.next,s===null){if(s=l.shared.pending,s===null)break;p=s,s=p.next,p.next=null,l.lastBaseUpdate=p,l.shared.pending=null}}while(1);if(g===null&&(a=m),l.baseState=a,l.firstBaseUpdate=c,l.lastBaseUpdate=g,n=l.shared.interleaved,n!==null){l=n;do o|=l.lane,l=l.next;while(l!==n)}else i===null&&(l.shared.lanes=0);_n|=o,e.lanes=o,e.memoizedState=m}}function vs(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],l=r.callback;if(l!==null){if(r.callback=null,r=t,typeof l!="function")throw Error(h(191,l));l.call(r)}}}var Xt={},De=pn(Xt),Wt=pn(Xt),$t=pn(Xt);function Sn(e){if(e===Xt)throw Error(h(174));return e}function uo(e,n){switch(A($t,n),A(Wt,e),A(De,Xt),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:Jl(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=Jl(n,e)}M(De),A(De,n)}function et(){M(De),M(Wt),M($t)}function iu(e){Sn($t.current);var n=Sn(De.current),t=Jl(n,e.type);n!==t&&(A(Wt,e),A(De,t))}function co(e){Wt.current===e&&(M(De),M(Wt))}var j=pn(0);function Hr(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Ml=[];function fo(){for(var e=0;e<Ml.length;e++)Ml[e]._workInProgressVersionPrimary=null;Ml.length=0}var xr=Ye.ReactCurrentDispatcher,Fl=Ye.ReactCurrentBatchConfig,Pn=0,U=null,b=null,K=null,Qr=!1,zt=!1,Bt=0,Kd=0;function ee(){throw Error(h(321))}function po(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Re(e[t],n[t]))return!1;return!0}function mo(e,n,t,r,l,i){if(Pn=i,U=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,xr.current=e===null||e.memoizedState===null?qd:ef,e=t(r,l),zt){i=0;do{if(zt=!1,Bt=0,25<=i)throw Error(h(301));i+=1,K=b=null,n.updateQueue=null,xr.current=nf,e=t(r,l)}while(zt)}if(xr.current=br,n=b!==null&&b.next!==null,Pn=0,K=b=U=null,Qr=!1,n)throw Error(h(300));return e}function go(){var e=Bt!==0;return Bt=0,e}function Oe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return K===null?U.memoizedState=K=e:K=K.next=e,K}function Ce(){if(b===null){var e=U.alternate;e=e!==null?e.memoizedState:null}else e=b.next;var n=K===null?U.memoizedState:K.next;if(n!==null)K=n,b=e;else{if(e===null)throw Error(h(310));b=e,e={memoizedState:b.memoizedState,baseState:b.baseState,baseQueue:b.baseQueue,queue:b.queue,next:null},K===null?U.memoizedState=K=e:K=K.next=e}return K}function Vt(e,n){return typeof n=="function"?n(e):n}function Dl(e){var n=Ce(),t=n.queue;if(t===null)throw Error(h(311));t.lastRenderedReducer=e;var r=b,l=r.baseQueue,i=t.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}r.baseQueue=l=i,t.pending=null}if(l!==null){i=l.next,r=r.baseState;var s=o=null,a=null,c=i;do{var g=c.lane;if((Pn&g)===g)a!==null&&(a=a.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var m={lane:g,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};a===null?(s=a=m,o=r):a=a.next=m,U.lanes|=g,_n|=g}c=c.next}while(c!==null&&c!==i);a===null?o=r:a.next=s,Re(r,n.memoizedState)||(ue=!0),n.memoizedState=r,n.baseState=o,n.baseQueue=a,t.lastRenderedState=r}if(e=t.interleaved,e!==null){l=e;do i=l.lane,U.lanes|=i,_n|=i,l=l.next;while(l!==e)}else l===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function jl(e){var n=Ce(),t=n.queue;if(t===null)throw Error(h(311));t.lastRenderedReducer=e;var r=t.dispatch,l=t.pending,i=n.memoizedState;if(l!==null){t.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);Re(i,n.memoizedState)||(ue=!0),n.memoizedState=i,n.baseQueue===null&&(n.baseState=i),t.lastRenderedState=i}return[i,r]}function ou(){}function su(e,n){var t=U,r=Ce(),l=n(),i=!Re(r.memoizedState,l);if(i&&(r.memoizedState=l,ue=!0),r=r.queue,vo(cu.bind(null,t,r,e),[e]),r.getSnapshot!==n||i||K!==null&&K.memoizedState.tag&1){if(t.flags|=2048,Ht(9,uu.bind(null,t,r,l,n),void 0,null),X===null)throw Error(h(349));Pn&30||au(t,n,l)}return l}function au(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=U.updateQueue,n===null?(n={lastEffect:null,stores:null},U.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function uu(e,n,t,r){n.value=t,n.getSnapshot=r,du(n)&&fu(e)}function cu(e,n,t){return t(function(){du(n)&&fu(e)})}function du(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Re(e,t)}catch{return!0}}function fu(e){var n=Qe(e,1);n!==null&&Le(n,e,1,-1)}function hs(e){var n=Oe();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vt,lastRenderedState:e},n.queue=e,e=e.dispatch=Jd.bind(null,U,e),[n.memoizedState,e]}function Ht(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=U.updateQueue,n===null?(n={lastEffect:null,stores:null},U.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function pu(){return Ce().memoizedState}function Er(e,n,t,r){var l=Oe();U.flags|=e,l.memoizedState=Ht(1|n,t,void 0,r===void 0?null:r)}function il(e,n,t,r){var l=Ce();r=r===void 0?null:r;var i=void 0;if(b!==null){var o=b.memoizedState;if(i=o.destroy,r!==null&&po(r,o.deps)){l.memoizedState=Ht(n,t,i,r);return}}U.flags|=e,l.memoizedState=Ht(1|n,t,i,r)}function ys(e,n){return Er(8390656,8,e,n)}function vo(e,n){return il(2048,8,e,n)}function mu(e,n){return il(4,2,e,n)}function gu(e,n){return il(4,4,e,n)}function vu(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function hu(e,n,t){return t=t!=null?t.concat([e]):null,il(4,4,vu.bind(null,n,e),t)}function ho(){}function yu(e,n){var t=Ce();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&po(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function wu(e,n){var t=Ce();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&po(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function ku(e,n,t){return Pn&21?(Re(t,n)||(t=za(),U.lanes|=t,_n|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,ue=!0),e.memoizedState=t)}function Xd(e,n){var t=R;R=t!==0&&4>t?t:4,e(!0);var r=Fl.transition;Fl.transition={};try{e(!1),n()}finally{R=t,Fl.transition=r}}function Su(){return Ce().memoizedState}function Zd(e,n,t){var r=an(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},xu(e))Eu(n,t);else if(t=ru(e,n,t,r),t!==null){var l=ie();Le(t,e,r,l),Cu(t,n,r)}}function Jd(e,n,t){var r=an(e),l={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(xu(e))Eu(n,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=n.lastRenderedReducer,i!==null))try{var o=n.lastRenderedState,s=i(o,t);if(l.hasEagerState=!0,l.eagerState=s,Re(s,o)){var a=n.interleaved;a===null?(l.next=l,so(n)):(l.next=a.next,a.next=l),n.interleaved=l;return}}catch{}finally{}t=ru(e,n,l,r),t!==null&&(l=ie(),Le(t,e,r,l),Cu(t,n,r))}}function xu(e){var n=e.alternate;return e===U||n!==null&&n===U}function Eu(e,n){zt=Qr=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Cu(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,Yi(e,t)}}var br={readContext:Ee,useCallback:ee,useContext:ee,useEffect:ee,useImperativeHandle:ee,useInsertionEffect:ee,useLayoutEffect:ee,useMemo:ee,useReducer:ee,useRef:ee,useState:ee,useDebugValue:ee,useDeferredValue:ee,useTransition:ee,useMutableSource:ee,useSyncExternalStore:ee,useId:ee,unstable_isNewReconciler:!1},qd={readContext:Ee,useCallback:function(e,n){return Oe().memoizedState=[e,n===void 0?null:n],e},useContext:Ee,useEffect:ys,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Er(4194308,4,vu.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Er(4194308,4,e,n)},useInsertionEffect:function(e,n){return Er(4,2,e,n)},useMemo:function(e,n){var t=Oe();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Oe();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=Zd.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var n=Oe();return e={current:e},n.memoizedState=e},useState:hs,useDebugValue:ho,useDeferredValue:function(e){return Oe().memoizedState=e},useTransition:function(){var e=hs(!1),n=e[0];return e=Xd.bind(null,e[1]),Oe().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=U,l=Oe();if(D){if(t===void 0)throw Error(h(407));t=t()}else{if(t=n(),X===null)throw Error(h(349));Pn&30||au(r,n,t)}l.memoizedState=t;var i={value:t,getSnapshot:n};return l.queue=i,ys(cu.bind(null,r,i,e),[e]),r.flags|=2048,Ht(9,uu.bind(null,r,i,t,n),void 0,null),t},useId:function(){var e=Oe(),n=X.identifierPrefix;if(D){var t=$e,r=We;t=(r&~(1<<32-Te(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=Bt++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=Kd++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},ef={readContext:Ee,useCallback:yu,useContext:Ee,useEffect:vo,useImperativeHandle:hu,useInsertionEffect:mu,useLayoutEffect:gu,useMemo:wu,useReducer:Dl,useRef:pu,useState:function(){return Dl(Vt)},useDebugValue:ho,useDeferredValue:function(e){var n=Ce();return ku(n,b.memoizedState,e)},useTransition:function(){var e=Dl(Vt)[0],n=Ce().memoizedState;return[e,n]},useMutableSource:ou,useSyncExternalStore:su,useId:Su,unstable_isNewReconciler:!1},nf={readContext:Ee,useCallback:yu,useContext:Ee,useEffect:vo,useImperativeHandle:hu,useInsertionEffect:mu,useLayoutEffect:gu,useMemo:wu,useReducer:jl,useRef:pu,useState:function(){return jl(Vt)},useDebugValue:ho,useDeferredValue:function(e){var n=Ce();return b===null?n.memoizedState=e:ku(n,b.memoizedState,e)},useTransition:function(){var e=jl(Vt)[0],n=Ce().memoizedState;return[e,n]},useMutableSource:ou,useSyncExternalStore:su,useId:Su,unstable_isNewReconciler:!1};function _e(e,n){if(e&&e.defaultProps){n=W({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function wi(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:W({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var ol={isMounted:function(e){return(e=e._reactInternals)?Tn(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=ie(),l=an(e),i=Be(r,l);i.payload=n,t!=null&&(i.callback=t),n=on(e,i,l),n!==null&&(Le(n,e,l,r),Sr(n,e,l))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=ie(),l=an(e),i=Be(r,l);i.tag=1,i.payload=n,t!=null&&(i.callback=t),n=on(e,i,l),n!==null&&(Le(n,e,l,r),Sr(n,e,l))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=ie(),r=an(e),l=Be(t,r);l.tag=2,n!=null&&(l.callback=n),n=on(e,l,r),n!==null&&(Le(n,e,r,t),Sr(n,e,r))}};function ws(e,n,t,r,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):n.prototype&&n.prototype.isPureReactComponent?!Ft(t,r)||!Ft(l,i):!0}function zu(e,n,t){var r=!1,l=dn,i=n.contextType;return typeof i=="object"&&i!==null?i=Ee(i):(l=de(n)?Cn:re.current,r=n.contextTypes,i=(r=r!=null)?Zn(e,l):dn),n=new n(t,i),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=ol,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=i),n}function ks(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&ol.enqueueReplaceState(n,n.state,null)}function ki(e,n,t,r){var l=e.stateNode;l.props=t,l.state=e.memoizedState,l.refs={},ao(e);var i=n.contextType;typeof i=="object"&&i!==null?l.context=Ee(i):(i=de(n)?Cn:re.current,l.context=Zn(e,i)),l.state=e.memoizedState,i=n.getDerivedStateFromProps,typeof i=="function"&&(wi(e,n,i,t),l.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(n=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),n!==l.state&&ol.enqueueReplaceState(l,l.state,null),Vr(e,t,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function nt(e,n){try{var t="",r=n;do t+=Ic(r),r=r.return;while(r);var l=t}catch(i){l=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:n,stack:l,digest:null}}function Ul(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Si(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var tf=typeof WeakMap=="function"?WeakMap:Map;function Pu(e,n,t){t=Be(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){Gr||(Gr=!0,Li=r),Si(e,n)},t}function _u(e,n,t){t=Be(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=n.value;t.payload=function(){return r(l)},t.callback=function(){Si(e,n)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(t.callback=function(){Si(e,n),typeof r!="function"&&(sn===null?sn=new Set([this]):sn.add(this));var o=n.stack;this.componentDidCatch(n.value,{componentStack:o!==null?o:""})}),t}function Ss(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new tf;var l=new Set;r.set(n,l)}else l=r.get(n),l===void 0&&(l=new Set,r.set(n,l));l.has(t)||(l.add(t),e=hf.bind(null,e,n,t),n.then(e,e))}function xs(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Es(e,n,t,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Be(-1,1),n.tag=2,on(t,n,1))),t.lanes|=1),e)}var rf=Ye.ReactCurrentOwner,ue=!1;function le(e,n,t,r){n.child=e===null?tu(n,null,t,r):qn(n,e.child,t,r)}function Cs(e,n,t,r,l){t=t.render;var i=n.ref;return Gn(n,l),r=mo(e,n,t,r,i,l),t=go(),e!==null&&!ue?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,be(e,n,l)):(D&&t&&no(n),n.flags|=1,le(e,n,r,l),n.child)}function zs(e,n,t,r,l){if(e===null){var i=t.type;return typeof i=="function"&&!zo(i)&&i.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=i,Nu(e,n,i,r,l)):(e=_r(t.type,null,r,n,n.mode,l),e.ref=n.ref,e.return=n,n.child=e)}if(i=e.child,!(e.lanes&l)){var o=i.memoizedProps;if(t=t.compare,t=t!==null?t:Ft,t(o,r)&&e.ref===n.ref)return be(e,n,l)}return n.flags|=1,e=un(i,r),e.ref=n.ref,e.return=n,n.child=e}function Nu(e,n,t,r,l){if(e!==null){var i=e.memoizedProps;if(Ft(i,r)&&e.ref===n.ref)if(ue=!1,n.pendingProps=r=i,(e.lanes&l)!==0)e.flags&131072&&(ue=!0);else return n.lanes=e.lanes,be(e,n,l)}return xi(e,n,t,r,l)}function Iu(e,n,t){var r=n.pendingProps,l=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},A(Vn,pe),pe|=t;else{if(!(t&1073741824))return e=i!==null?i.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,A(Vn,pe),pe|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:t,A(Vn,pe),pe|=r}else i!==null?(r=i.baseLanes|t,n.memoizedState=null):r=t,A(Vn,pe),pe|=r;return le(e,n,l,t),n.child}function Tu(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function xi(e,n,t,r,l){var i=de(t)?Cn:re.current;return i=Zn(n,i),Gn(n,l),t=mo(e,n,t,r,i,l),r=go(),e!==null&&!ue?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,be(e,n,l)):(D&&r&&no(n),n.flags|=1,le(e,n,t,l),n.child)}function Ps(e,n,t,r,l){if(de(t)){var i=!0;jr(n)}else i=!1;if(Gn(n,l),n.stateNode===null)Cr(e,n),zu(n,t,r),ki(n,t,r,l),r=!0;else if(e===null){var o=n.stateNode,s=n.memoizedProps;o.props=s;var a=o.context,c=t.contextType;typeof c=="object"&&c!==null?c=Ee(c):(c=de(t)?Cn:re.current,c=Zn(n,c));var g=t.getDerivedStateFromProps,m=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==r||a!==c)&&ks(n,o,r,c),Xe=!1;var p=n.memoizedState;o.state=p,Vr(n,r,o,l),a=n.memoizedState,s!==r||p!==a||ce.current||Xe?(typeof g=="function"&&(wi(n,t,g,r),a=n.memoizedState),(s=Xe||ws(n,t,s,r,p,a,c))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(n.flags|=4194308)):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=a),o.props=r,o.state=a,o.context=c,r=s):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{o=n.stateNode,lu(e,n),s=n.memoizedProps,c=n.type===n.elementType?s:_e(n.type,s),o.props=c,m=n.pendingProps,p=o.context,a=t.contextType,typeof a=="object"&&a!==null?a=Ee(a):(a=de(t)?Cn:re.current,a=Zn(n,a));var y=t.getDerivedStateFromProps;(g=typeof y=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==m||p!==a)&&ks(n,o,r,a),Xe=!1,p=n.memoizedState,o.state=p,Vr(n,r,o,l);var w=n.memoizedState;s!==m||p!==w||ce.current||Xe?(typeof y=="function"&&(wi(n,t,y,r),w=n.memoizedState),(c=Xe||ws(n,t,c,r,p,w,a)||!1)?(g||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,w,a),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,w,a)),typeof o.componentDidUpdate=="function"&&(n.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=w),o.props=r,o.state=w,o.context=a,r=c):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),r=!1)}return Ei(e,n,t,r,i,l)}function Ei(e,n,t,r,l,i){Tu(e,n);var o=(n.flags&128)!==0;if(!r&&!o)return l&&ds(n,t,!1),be(e,n,i);r=n.stateNode,rf.current=n;var s=o&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&o?(n.child=qn(n,e.child,null,i),n.child=qn(n,null,s,i)):le(e,n,s,i),n.memoizedState=r.state,l&&ds(n,t,!0),n.child}function Lu(e){var n=e.stateNode;n.pendingContext?cs(e,n.pendingContext,n.pendingContext!==n.context):n.context&&cs(e,n.context,!1),uo(e,n.containerInfo)}function _s(e,n,t,r,l){return Jn(),ro(l),n.flags|=256,le(e,n,t,r),n.child}var Ci={dehydrated:null,treeContext:null,retryLane:0};function zi(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ru(e,n,t){var r=n.pendingProps,l=j.current,i=!1,o=(n.flags&128)!==0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(l&2)!==0),s?(i=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),A(j,l&1),e===null)return hi(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(o=r.children,e=r.fallback,i?(r=n.mode,i=n.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=ul(o,r,0,null),e=En(e,r,t,null),i.return=n,e.return=n,i.sibling=e,n.child=i,n.child.memoizedState=zi(t),n.memoizedState=Ci,e):yo(n,o));if(l=e.memoizedState,l!==null&&(s=l.dehydrated,s!==null))return lf(e,n,o,r,s,l,t);if(i){i=r.fallback,o=n.mode,l=e.child,s=l.sibling;var a={mode:"hidden",children:r.children};return!(o&1)&&n.child!==l?(r=n.child,r.childLanes=0,r.pendingProps=a,n.deletions=null):(r=un(l,a),r.subtreeFlags=l.subtreeFlags&14680064),s!==null?i=un(s,i):(i=En(i,o,t,null),i.flags|=2),i.return=n,r.return=n,r.sibling=i,n.child=r,r=i,i=n.child,o=e.child.memoizedState,o=o===null?zi(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~t,n.memoizedState=Ci,r}return i=e.child,e=i.sibling,r=un(i,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function yo(e,n){return n=ul({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function fr(e,n,t,r){return r!==null&&ro(r),qn(n,e.child,null,t),e=yo(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function lf(e,n,t,r,l,i,o){if(t)return n.flags&256?(n.flags&=-257,r=Ul(Error(h(422))),fr(e,n,o,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(i=r.fallback,l=n.mode,r=ul({mode:"visible",children:r.children},l,0,null),i=En(i,l,o,null),i.flags|=2,r.return=n,i.return=n,r.sibling=i,n.child=r,n.mode&1&&qn(n,e.child,null,o),n.child.memoizedState=zi(o),n.memoizedState=Ci,i);if(!(n.mode&1))return fr(e,n,o,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var s=r.dgst;return r=s,i=Error(h(419)),r=Ul(i,r,void 0),fr(e,n,o,r)}if(s=(o&e.childLanes)!==0,ue||s){if(r=X,r!==null){switch(o&-o){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|o)?0:l,l!==0&&l!==i.retryLane&&(i.retryLane=l,Qe(e,l),Le(r,e,l,-1))}return Co(),r=Ul(Error(h(421))),fr(e,n,o,r)}return l.data==="$?"?(n.flags|=128,n.child=e.child,n=yf.bind(null,e),l._reactRetry=n,null):(e=i.treeContext,me=ln(l.nextSibling),ge=n,D=!0,Ie=null,e!==null&&(we[ke++]=We,we[ke++]=$e,we[ke++]=zn,We=e.id,$e=e.overflow,zn=n),n=yo(n,r.children),n.flags|=4096,n)}function Ns(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),yi(e.return,n,t)}function Wl(e,n,t,r,l){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:l}:(i.isBackwards=n,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=t,i.tailMode=l)}function Au(e,n,t){var r=n.pendingProps,l=r.revealOrder,i=r.tail;if(le(e,n,r.children,t),r=j.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ns(e,t,n);else if(e.tag===19)Ns(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(A(j,r),!(n.mode&1))n.memoizedState=null;else switch(l){case"forwards":for(t=n.child,l=null;t!==null;)e=t.alternate,e!==null&&Hr(e)===null&&(l=t),t=t.sibling;t=l,t===null?(l=n.child,n.child=null):(l=t.sibling,t.sibling=null),Wl(n,!1,l,t,i);break;case"backwards":for(t=null,l=n.child,n.child=null;l!==null;){if(e=l.alternate,e!==null&&Hr(e)===null){n.child=l;break}e=l.sibling,l.sibling=t,t=l,l=e}Wl(n,!0,t,null,i);break;case"together":Wl(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Cr(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function be(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),_n|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(h(153));if(n.child!==null){for(e=n.child,t=un(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=un(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function of(e,n,t){switch(n.tag){case 3:Lu(n),Jn();break;case 5:iu(n);break;case 1:de(n.type)&&jr(n);break;case 4:uo(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,l=n.memoizedProps.value;A($r,r._currentValue),r._currentValue=l;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(A(j,j.current&1),n.flags|=128,null):t&n.child.childLanes?Ru(e,n,t):(A(j,j.current&1),e=be(e,n,t),e!==null?e.sibling:null);A(j,j.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return Au(e,n,t);n.flags|=128}if(l=n.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),A(j,j.current),r)break;return null;case 22:case 23:return n.lanes=0,Iu(e,n,t)}return be(e,n,t)}var Ou,Pi,Mu,Fu;Ou=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Pi=function(){};Mu=function(e,n,t,r){var l=e.memoizedProps;if(l!==r){e=n.stateNode,Sn(De.current);var i=null;switch(t){case"input":l=Gl(e,l),r=Gl(e,r),i=[];break;case"select":l=W({},l,{value:void 0}),r=W({},r,{value:void 0}),i=[];break;case"textarea":l=Zl(e,l),r=Zl(e,r),i=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Fr)}ql(t,r);var o;t=null;for(c in l)if(!r.hasOwnProperty(c)&&l.hasOwnProperty(c)&&l[c]!=null)if(c==="style"){var s=l[c];for(o in s)s.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(It.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var a=r[c];if(s=l!=null?l[c]:void 0,r.hasOwnProperty(c)&&a!==s&&(a!=null||s!=null))if(c==="style")if(s){for(o in s)!s.hasOwnProperty(o)||a&&a.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in a)a.hasOwnProperty(o)&&s[o]!==a[o]&&(t||(t={}),t[o]=a[o])}else t||(i||(i=[]),i.push(c,t)),t=a;else c==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,s=s?s.__html:void 0,a!=null&&s!==a&&(i=i||[]).push(c,a)):c==="children"?typeof a!="string"&&typeof a!="number"||(i=i||[]).push(c,""+a):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(It.hasOwnProperty(c)?(a!=null&&c==="onScroll"&&O("scroll",e),i||s===a||(i=[])):(i=i||[]).push(c,a))}t&&(i=i||[]).push("style",t);var c=i;(n.updateQueue=c)&&(n.flags|=4)}};Fu=function(e,n,t,r){t!==r&&(n.flags|=4)};function mt(e,n){if(!D)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ne(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var l=e.child;l!==null;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function sf(e,n,t){var r=n.pendingProps;switch(to(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ne(n),null;case 1:return de(n.type)&&Dr(),ne(n),null;case 3:return r=n.stateNode,et(),M(ce),M(re),fo(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(cr(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,Ie!==null&&(Oi(Ie),Ie=null))),Pi(e,n),ne(n),null;case 5:co(n);var l=Sn($t.current);if(t=n.type,e!==null&&n.stateNode!=null)Mu(e,n,t,r,l),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(h(166));return ne(n),null}if(e=Sn(De.current),cr(n)){r=n.stateNode,t=n.type;var i=n.memoizedProps;switch(r[Me]=n,r[Ut]=i,e=(n.mode&1)!==0,t){case"dialog":O("cancel",r),O("close",r);break;case"iframe":case"object":case"embed":O("load",r);break;case"video":case"audio":for(l=0;l<wt.length;l++)O(wt[l],r);break;case"source":O("error",r);break;case"img":case"image":case"link":O("error",r),O("load",r);break;case"details":O("toggle",r);break;case"input":Do(r,i),O("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},O("invalid",r);break;case"textarea":Uo(r,i),O("invalid",r)}ql(t,i),l=null;for(var o in i)if(i.hasOwnProperty(o)){var s=i[o];o==="children"?typeof s=="string"?r.textContent!==s&&(i.suppressHydrationWarning!==!0&&ur(r.textContent,s,e),l=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&ur(r.textContent,s,e),l=["children",""+s]):It.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&O("scroll",r)}switch(t){case"input":nr(r),jo(r,i,!0);break;case"textarea":nr(r),Wo(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Fr)}r=l,n.updateQueue=r,r!==null&&(n.flags|=4)}else{o=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ca(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(t,{is:r.is}):(e=o.createElement(t),t==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,t),e[Me]=n,e[Ut]=r,Ou(e,n,!1,!1),n.stateNode=e;e:{switch(o=ei(t,r),t){case"dialog":O("cancel",e),O("close",e),l=r;break;case"iframe":case"object":case"embed":O("load",e),l=r;break;case"video":case"audio":for(l=0;l<wt.length;l++)O(wt[l],e);l=r;break;case"source":O("error",e),l=r;break;case"img":case"image":case"link":O("error",e),O("load",e),l=r;break;case"details":O("toggle",e),l=r;break;case"input":Do(e,r),l=Gl(e,r),O("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=W({},r,{value:void 0}),O("invalid",e);break;case"textarea":Uo(e,r),l=Zl(e,r),O("invalid",e);break;default:l=r}ql(t,l),s=l;for(i in s)if(s.hasOwnProperty(i)){var a=s[i];i==="style"?pa(e,a):i==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&da(e,a)):i==="children"?typeof a=="string"?(t!=="textarea"||a!=="")&&Tt(e,a):typeof a=="number"&&Tt(e,""+a):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(It.hasOwnProperty(i)?a!=null&&i==="onScroll"&&O("scroll",e):a!=null&&$i(e,i,a,o))}switch(t){case"input":nr(e),jo(e,r,!1);break;case"textarea":nr(e),Wo(e);break;case"option":r.value!=null&&e.setAttribute("value",""+cn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Hn(e,!!r.multiple,i,!1):r.defaultValue!=null&&Hn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Fr)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return ne(n),null;case 6:if(e&&n.stateNode!=null)Fu(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(h(166));if(t=Sn($t.current),Sn(De.current),cr(n)){if(r=n.stateNode,t=n.memoizedProps,r[Me]=n,(i=r.nodeValue!==t)&&(e=ge,e!==null))switch(e.tag){case 3:ur(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ur(r.nodeValue,t,(e.mode&1)!==0)}i&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Me]=n,n.stateNode=r}return ne(n),null;case 13:if(M(j),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(D&&me!==null&&n.mode&1&&!(n.flags&128))eu(),Jn(),n.flags|=98560,i=!1;else if(i=cr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(h(318));if(i=n.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(h(317));i[Me]=n}else Jn(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;ne(n),i=!1}else Ie!==null&&(Oi(Ie),Ie=null),i=!0;if(!i)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||j.current&1?Y===0&&(Y=3):Co())),n.updateQueue!==null&&(n.flags|=4),ne(n),null);case 4:return et(),Pi(e,n),e===null&&Dt(n.stateNode.containerInfo),ne(n),null;case 10:return oo(n.type._context),ne(n),null;case 17:return de(n.type)&&Dr(),ne(n),null;case 19:if(M(j),i=n.memoizedState,i===null)return ne(n),null;if(r=(n.flags&128)!==0,o=i.rendering,o===null)if(r)mt(i,!1);else{if(Y!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(o=Hr(e),o!==null){for(n.flags|=128,mt(i,!1),r=o.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)i=t,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return A(j,j.current&1|2),n.child}e=e.sibling}i.tail!==null&&H()>tt&&(n.flags|=128,r=!0,mt(i,!1),n.lanes=4194304)}else{if(!r)if(e=Hr(o),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),mt(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!D)return ne(n),null}else 2*H()-i.renderingStartTime>tt&&t!==1073741824&&(n.flags|=128,r=!0,mt(i,!1),n.lanes=4194304);i.isBackwards?(o.sibling=n.child,n.child=o):(t=i.last,t!==null?t.sibling=o:n.child=o,i.last=o)}return i.tail!==null?(n=i.tail,i.rendering=n,i.tail=n.sibling,i.renderingStartTime=H(),n.sibling=null,t=j.current,A(j,r?t&1|2:t&1),n):(ne(n),null);case 22:case 23:return Eo(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?pe&1073741824&&(ne(n),n.subtreeFlags&6&&(n.flags|=8192)):ne(n),null;case 24:return null;case 25:return null}throw Error(h(156,n.tag))}function af(e,n){switch(to(n),n.tag){case 1:return de(n.type)&&Dr(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return et(),M(ce),M(re),fo(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return co(n),null;case 13:if(M(j),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(h(340));Jn()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return M(j),null;case 4:return et(),null;case 10:return oo(n.type._context),null;case 22:case 23:return Eo(),null;case 24:return null;default:return null}}var pr=!1,te=!1,uf=typeof WeakSet=="function"?WeakSet:Set,S=null;function Bn(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){$(e,n,r)}else t.current=null}function _i(e,n,t){try{t()}catch(r){$(e,n,r)}}var Is=!1;function cf(e,n){if(ci=Ar,e=$a(),eo(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var l=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{t.nodeType,i.nodeType}catch{t=null;break e}var o=0,s=-1,a=-1,c=0,g=0,m=e,p=null;n:for(;;){for(var y;m!==t||l!==0&&m.nodeType!==3||(s=o+l),m!==i||r!==0&&m.nodeType!==3||(a=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(y=m.firstChild)!==null;)p=m,m=y;for(;;){if(m===e)break n;if(p===t&&++c===l&&(s=o),p===i&&++g===r&&(a=o),(y=m.nextSibling)!==null)break;m=p,p=m.parentNode}m=y}t=s===-1||a===-1?null:{start:s,end:a}}else t=null}t=t||{start:0,end:0}}else t=null;for(di={focusedElem:e,selectionRange:t},Ar=!1,S=n;S!==null;)if(n=S,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,S=e;else for(;S!==null;){n=S;try{var w=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var k=w.memoizedProps,F=w.memoizedState,d=n.stateNode,u=d.getSnapshotBeforeUpdate(n.elementType===n.type?k:_e(n.type,k),F);d.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var f=n.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(h(163))}}catch(v){$(n,n.return,v)}if(e=n.sibling,e!==null){e.return=n.return,S=e;break}S=n.return}return w=Is,Is=!1,w}function Pt(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var i=l.destroy;l.destroy=void 0,i!==void 0&&_i(n,t,i)}l=l.next}while(l!==r)}}function sl(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function Ni(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function Du(e){var n=e.alternate;n!==null&&(e.alternate=null,Du(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Me],delete n[Ut],delete n[mi],delete n[Qd],delete n[bd])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function ju(e){return e.tag===5||e.tag===3||e.tag===4}function Ts(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||ju(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ii(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Fr));else if(r!==4&&(e=e.child,e!==null))for(Ii(e,n,t),e=e.sibling;e!==null;)Ii(e,n,t),e=e.sibling}function Ti(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ti(e,n,t),e=e.sibling;e!==null;)Ti(e,n,t),e=e.sibling}var Z=null,Ne=!1;function Ge(e,n,t){for(t=t.child;t!==null;)Uu(e,n,t),t=t.sibling}function Uu(e,n,t){if(Fe&&typeof Fe.onCommitFiberUnmount=="function")try{Fe.onCommitFiberUnmount(qr,t)}catch{}switch(t.tag){case 5:te||Bn(t,n);case 6:var r=Z,l=Ne;Z=null,Ge(e,n,t),Z=r,Ne=l,Z!==null&&(Ne?(e=Z,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):Z.removeChild(t.stateNode));break;case 18:Z!==null&&(Ne?(e=Z,t=t.stateNode,e.nodeType===8?Al(e.parentNode,t):e.nodeType===1&&Al(e,t),Ot(e)):Al(Z,t.stateNode));break;case 4:r=Z,l=Ne,Z=t.stateNode.containerInfo,Ne=!0,Ge(e,n,t),Z=r,Ne=l;break;case 0:case 11:case 14:case 15:if(!te&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var i=l,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&_i(t,n,o),l=l.next}while(l!==r)}Ge(e,n,t);break;case 1:if(!te&&(Bn(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(s){$(t,n,s)}Ge(e,n,t);break;case 21:Ge(e,n,t);break;case 22:t.mode&1?(te=(r=te)||t.memoizedState!==null,Ge(e,n,t),te=r):Ge(e,n,t);break;default:Ge(e,n,t)}}function Ls(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new uf),n.forEach(function(r){var l=wf.bind(null,e,r);t.has(r)||(t.add(r),r.then(l,l))})}}function Pe(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var l=t[r];try{var i=e,o=n,s=o;e:for(;s!==null;){switch(s.tag){case 5:Z=s.stateNode,Ne=!1;break e;case 3:Z=s.stateNode.containerInfo,Ne=!0;break e;case 4:Z=s.stateNode.containerInfo,Ne=!0;break e}s=s.return}if(Z===null)throw Error(h(160));Uu(i,o,l),Z=null,Ne=!1;var a=l.alternate;a!==null&&(a.return=null),l.return=null}catch(c){$(l,n,c)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)Wu(n,e),n=n.sibling}function Wu(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pe(n,e),Ae(e),r&4){try{Pt(3,e,e.return),sl(3,e)}catch(k){$(e,e.return,k)}try{Pt(5,e,e.return)}catch(k){$(e,e.return,k)}}break;case 1:Pe(n,e),Ae(e),r&512&&t!==null&&Bn(t,t.return);break;case 5:if(Pe(n,e),Ae(e),r&512&&t!==null&&Bn(t,t.return),e.flags&32){var l=e.stateNode;try{Tt(l,"")}catch(k){$(e,e.return,k)}}if(r&4&&(l=e.stateNode,l!=null)){var i=e.memoizedProps,o=t!==null?t.memoizedProps:i,s=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&aa(l,i),ei(s,o);var c=ei(s,i);for(o=0;o<a.length;o+=2){var g=a[o],m=a[o+1];g==="style"?pa(l,m):g==="dangerouslySetInnerHTML"?da(l,m):g==="children"?Tt(l,m):$i(l,g,m,c)}switch(s){case"input":Kl(l,i);break;case"textarea":ua(l,i);break;case"select":var p=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!i.multiple;var y=i.value;y!=null?Hn(l,!!i.multiple,y,!1):p!==!!i.multiple&&(i.defaultValue!=null?Hn(l,!!i.multiple,i.defaultValue,!0):Hn(l,!!i.multiple,i.multiple?[]:"",!1))}l[Ut]=i}catch(k){$(e,e.return,k)}}break;case 6:if(Pe(n,e),Ae(e),r&4){if(e.stateNode===null)throw Error(h(162));l=e.stateNode,i=e.memoizedProps;try{l.nodeValue=i}catch(k){$(e,e.return,k)}}break;case 3:if(Pe(n,e),Ae(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Ot(n.containerInfo)}catch(k){$(e,e.return,k)}break;case 4:Pe(n,e),Ae(e);break;case 13:Pe(n,e),Ae(e),l=e.child,l.flags&8192&&(i=l.memoizedState!==null,l.stateNode.isHidden=i,!i||l.alternate!==null&&l.alternate.memoizedState!==null||(So=H())),r&4&&Ls(e);break;case 22:if(g=t!==null&&t.memoizedState!==null,e.mode&1?(te=(c=te)||g,Pe(n,e),te=c):Pe(n,e),Ae(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!g&&e.mode&1)for(S=e,g=e.child;g!==null;){for(m=S=g;S!==null;){switch(p=S,y=p.child,p.tag){case 0:case 11:case 14:case 15:Pt(4,p,p.return);break;case 1:Bn(p,p.return);var w=p.stateNode;if(typeof w.componentWillUnmount=="function"){r=p,t=p.return;try{n=r,w.props=n.memoizedProps,w.state=n.memoizedState,w.componentWillUnmount()}catch(k){$(r,t,k)}}break;case 5:Bn(p,p.return);break;case 22:if(p.memoizedState!==null){As(m);continue}}y!==null?(y.return=p,S=y):As(m)}g=g.sibling}e:for(g=null,m=e;;){if(m.tag===5){if(g===null){g=m;try{l=m.stateNode,c?(i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=m.stateNode,a=m.memoizedProps.style,o=a!=null&&a.hasOwnProperty("display")?a.display:null,s.style.display=fa("display",o))}catch(k){$(e,e.return,k)}}}else if(m.tag===6){if(g===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(k){$(e,e.return,k)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;g===m&&(g=null),m=m.return}g===m&&(g=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Pe(n,e),Ae(e),r&4&&Ls(e);break;case 21:break;default:Pe(n,e),Ae(e)}}function Ae(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(ju(t)){var r=t;break e}t=t.return}throw Error(h(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Tt(l,""),r.flags&=-33);var i=Ts(e);Ti(e,i,l);break;case 3:case 4:var o=r.stateNode.containerInfo,s=Ts(e);Ii(e,s,o);break;default:throw Error(h(161))}}catch(a){$(e,e.return,a)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function df(e,n,t){S=e,$u(e)}function $u(e,n,t){for(var r=(e.mode&1)!==0;S!==null;){var l=S,i=l.child;if(l.tag===22&&r){var o=l.memoizedState!==null||pr;if(!o){var s=l.alternate,a=s!==null&&s.memoizedState!==null||te;s=pr;var c=te;if(pr=o,(te=a)&&!c)for(S=l;S!==null;)o=S,a=o.child,o.tag===22&&o.memoizedState!==null?Os(l):a!==null?(a.return=o,S=a):Os(l);for(;i!==null;)S=i,$u(i),i=i.sibling;S=l,pr=s,te=c}Rs(e)}else l.subtreeFlags&8772&&i!==null?(i.return=l,S=i):Rs(e)}}function Rs(e){for(;S!==null;){var n=S;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:te||sl(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!te)if(t===null)r.componentDidMount();else{var l=n.elementType===n.type?t.memoizedProps:_e(n.type,t.memoizedProps);r.componentDidUpdate(l,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=n.updateQueue;i!==null&&vs(n,i,r);break;case 3:var o=n.updateQueue;if(o!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}vs(n,o,t)}break;case 5:var s=n.stateNode;if(t===null&&n.flags&4){t=s;var a=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&t.focus();break;case"img":a.src&&(t.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var c=n.alternate;if(c!==null){var g=c.memoizedState;if(g!==null){var m=g.dehydrated;m!==null&&Ot(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(h(163))}te||n.flags&512&&Ni(n)}catch(p){$(n,n.return,p)}}if(n===e){S=null;break}if(t=n.sibling,t!==null){t.return=n.return,S=t;break}S=n.return}}function As(e){for(;S!==null;){var n=S;if(n===e){S=null;break}var t=n.sibling;if(t!==null){t.return=n.return,S=t;break}S=n.return}}function Os(e){for(;S!==null;){var n=S;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{sl(4,n)}catch(a){$(n,t,a)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var l=n.return;try{r.componentDidMount()}catch(a){$(n,l,a)}}var i=n.return;try{Ni(n)}catch(a){$(n,i,a)}break;case 5:var o=n.return;try{Ni(n)}catch(a){$(n,o,a)}}}catch(a){$(n,n.return,a)}if(n===e){S=null;break}var s=n.sibling;if(s!==null){s.return=n.return,S=s;break}S=n.return}}var ff=Math.ceil,Yr=Ye.ReactCurrentDispatcher,wo=Ye.ReactCurrentOwner,xe=Ye.ReactCurrentBatchConfig,L=0,X=null,Q=null,J=0,pe=0,Vn=pn(0),Y=0,Qt=null,_n=0,al=0,ko=0,_t=null,ae=null,So=0,tt=1/0,je=null,Gr=!1,Li=null,sn=null,mr=!1,en=null,Kr=0,Nt=0,Ri=null,zr=-1,Pr=0;function ie(){return L&6?H():zr!==-1?zr:zr=H()}function an(e){return e.mode&1?L&2&&J!==0?J&-J:Gd.transition!==null?(Pr===0&&(Pr=za()),Pr):(e=R,e!==0||(e=window.event,e=e===void 0?16:Ra(e.type)),e):1}function Le(e,n,t,r){if(50<Nt)throw Nt=0,Ri=null,Error(h(185));Yt(e,t,r),(!(L&2)||e!==X)&&(e===X&&(!(L&2)&&(al|=t),Y===4&&Je(e,J)),fe(e,r),t===1&&L===0&&!(n.mode&1)&&(tt=H()+500,ll&&mn()))}function fe(e,n){var t=e.callbackNode;Gc(e,n);var r=Rr(e,e===X?J:0);if(r===0)t!==null&&Vo(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&Vo(t),n===1)e.tag===0?Yd(Ms.bind(null,e)):Za(Ms.bind(null,e)),Vd(function(){!(L&6)&&mn()}),t=null;else{switch(Pa(r)){case 1:t=bi;break;case 4:t=Ea;break;case 16:t=Lr;break;case 536870912:t=Ca;break;default:t=Lr}t=Ku(t,Bu.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function Bu(e,n){if(zr=-1,Pr=0,L&6)throw Error(h(327));var t=e.callbackNode;if(Kn()&&e.callbackNode!==t)return null;var r=Rr(e,e===X?J:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=Xr(e,r);else{n=r;var l=L;L|=2;var i=Hu();(X!==e||J!==n)&&(je=null,tt=H()+500,xn(e,n));do try{gf();break}catch(s){Vu(e,s)}while(1);io(),Yr.current=i,L=l,Q!==null?n=0:(X=null,J=0,n=Y)}if(n!==0){if(n===2&&(l=ii(e),l!==0&&(r=l,n=Ai(e,l))),n===1)throw t=Qt,xn(e,0),Je(e,r),fe(e,H()),t;if(n===6)Je(e,r);else{if(l=e.current.alternate,!(r&30)&&!pf(l)&&(n=Xr(e,r),n===2&&(i=ii(e),i!==0&&(r=i,n=Ai(e,i))),n===1))throw t=Qt,xn(e,0),Je(e,r),fe(e,H()),t;switch(e.finishedWork=l,e.finishedLanes=r,n){case 0:case 1:throw Error(h(345));case 2:yn(e,ae,je);break;case 3:if(Je(e,r),(r&130023424)===r&&(n=So+500-H(),10<n)){if(Rr(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ie(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=pi(yn.bind(null,e,ae,je),n);break}yn(e,ae,je);break;case 4:if(Je(e,r),(r&4194240)===r)break;for(n=e.eventTimes,l=-1;0<r;){var o=31-Te(r);i=1<<o,o=n[o],o>l&&(l=o),r&=~i}if(r=l,r=H()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ff(r/1960))-r,10<r){e.timeoutHandle=pi(yn.bind(null,e,ae,je),r);break}yn(e,ae,je);break;case 5:yn(e,ae,je);break;default:throw Error(h(329))}}}return fe(e,H()),e.callbackNode===t?Bu.bind(null,e):null}function Ai(e,n){var t=_t;return e.current.memoizedState.isDehydrated&&(xn(e,n).flags|=256),e=Xr(e,n),e!==2&&(n=ae,ae=t,n!==null&&Oi(n)),e}function Oi(e){ae===null?ae=e:ae.push.apply(ae,e)}function pf(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var l=t[r],i=l.getSnapshot;l=l.value;try{if(!Re(i(),l))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Je(e,n){for(n&=~ko,n&=~al,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Te(n),r=1<<t;e[t]=-1,n&=~r}}function Ms(e){if(L&6)throw Error(h(327));Kn();var n=Rr(e,0);if(!(n&1))return fe(e,H()),null;var t=Xr(e,n);if(e.tag!==0&&t===2){var r=ii(e);r!==0&&(n=r,t=Ai(e,r))}if(t===1)throw t=Qt,xn(e,0),Je(e,n),fe(e,H()),t;if(t===6)throw Error(h(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,yn(e,ae,je),fe(e,H()),null}function xo(e,n){var t=L;L|=1;try{return e(n)}finally{L=t,L===0&&(tt=H()+500,ll&&mn())}}function Nn(e){en!==null&&en.tag===0&&!(L&6)&&Kn();var n=L;L|=1;var t=xe.transition,r=R;try{if(xe.transition=null,R=1,e)return e()}finally{R=r,xe.transition=t,L=n,!(L&6)&&mn()}}function Eo(){pe=Vn.current,M(Vn)}function xn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,Bd(t)),Q!==null)for(t=Q.return;t!==null;){var r=t;switch(to(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Dr();break;case 3:et(),M(ce),M(re),fo();break;case 5:co(r);break;case 4:et();break;case 13:M(j);break;case 19:M(j);break;case 10:oo(r.type._context);break;case 22:case 23:Eo()}t=t.return}if(X=e,Q=e=un(e.current,null),J=pe=n,Y=0,Qt=null,ko=al=_n=0,ae=_t=null,kn!==null){for(n=0;n<kn.length;n++)if(t=kn[n],r=t.interleaved,r!==null){t.interleaved=null;var l=r.next,i=t.pending;if(i!==null){var o=i.next;i.next=l,r.next=o}t.pending=r}kn=null}return e}function Vu(e,n){do{var t=Q;try{if(io(),xr.current=br,Qr){for(var r=U.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}Qr=!1}if(Pn=0,K=b=U=null,zt=!1,Bt=0,wo.current=null,t===null||t.return===null){Y=1,Qt=n,Q=null;break}e:{var i=e,o=t.return,s=t,a=n;if(n=J,s.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var c=a,g=s,m=g.tag;if(!(g.mode&1)&&(m===0||m===11||m===15)){var p=g.alternate;p?(g.updateQueue=p.updateQueue,g.memoizedState=p.memoizedState,g.lanes=p.lanes):(g.updateQueue=null,g.memoizedState=null)}var y=xs(o);if(y!==null){y.flags&=-257,Es(y,o,s,i,n),y.mode&1&&Ss(i,c,n),n=y,a=c;var w=n.updateQueue;if(w===null){var k=new Set;k.add(a),n.updateQueue=k}else w.add(a);break e}else{if(!(n&1)){Ss(i,c,n),Co();break e}a=Error(h(426))}}else if(D&&s.mode&1){var F=xs(o);if(F!==null){!(F.flags&65536)&&(F.flags|=256),Es(F,o,s,i,n),ro(nt(a,s));break e}}i=a=nt(a,s),Y!==4&&(Y=2),_t===null?_t=[i]:_t.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,n&=-n,i.lanes|=n;var d=Pu(i,a,n);gs(i,d);break e;case 1:s=a;var u=i.type,f=i.stateNode;if(!(i.flags&128)&&(typeof u.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(sn===null||!sn.has(f)))){i.flags|=65536,n&=-n,i.lanes|=n;var v=_u(i,s,n);gs(i,v);break e}}i=i.return}while(i!==null)}bu(t)}catch(x){n=x,Q===t&&t!==null&&(Q=t=t.return);continue}break}while(1)}function Hu(){var e=Yr.current;return Yr.current=br,e===null?br:e}function Co(){(Y===0||Y===3||Y===2)&&(Y=4),X===null||!(_n&268435455)&&!(al&268435455)||Je(X,J)}function Xr(e,n){var t=L;L|=2;var r=Hu();(X!==e||J!==n)&&(je=null,xn(e,n));do try{mf();break}catch(l){Vu(e,l)}while(1);if(io(),L=t,Yr.current=r,Q!==null)throw Error(h(261));return X=null,J=0,Y}function mf(){for(;Q!==null;)Qu(Q)}function gf(){for(;Q!==null&&!Uc();)Qu(Q)}function Qu(e){var n=Gu(e.alternate,e,pe);e.memoizedProps=e.pendingProps,n===null?bu(e):Q=n,wo.current=null}function bu(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=af(t,n),t!==null){t.flags&=32767,Q=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Y=6,Q=null;return}}else if(t=sf(t,n,pe),t!==null){Q=t;return}if(n=n.sibling,n!==null){Q=n;return}Q=n=e}while(n!==null);Y===0&&(Y=5)}function yn(e,n,t){var r=R,l=xe.transition;try{xe.transition=null,R=1,vf(e,n,t,r)}finally{xe.transition=l,R=r}return null}function vf(e,n,t,r){do Kn();while(en!==null);if(L&6)throw Error(h(327));t=e.finishedWork;var l=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(h(177));e.callbackNode=null,e.callbackPriority=0;var i=t.lanes|t.childLanes;if(Kc(e,i),e===X&&(Q=X=null,J=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||mr||(mr=!0,Ku(Lr,function(){return Kn(),null})),i=(t.flags&15990)!==0,t.subtreeFlags&15990||i){i=xe.transition,xe.transition=null;var o=R;R=1;var s=L;L|=4,wo.current=null,cf(e,t),Wu(t,e),Md(di),Ar=!!ci,di=ci=null,e.current=t,df(t),Wc(),L=s,R=o,xe.transition=i}else e.current=t;if(mr&&(mr=!1,en=e,Kr=l),i=e.pendingLanes,i===0&&(sn=null),Vc(t.stateNode),fe(e,H()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)l=n[t],r(l.value,{componentStack:l.stack,digest:l.digest});if(Gr)throw Gr=!1,e=Li,Li=null,e;return Kr&1&&e.tag!==0&&Kn(),i=e.pendingLanes,i&1?e===Ri?Nt++:(Nt=0,Ri=e):Nt=0,mn(),null}function Kn(){if(en!==null){var e=Pa(Kr),n=xe.transition,t=R;try{if(xe.transition=null,R=16>e?16:e,en===null)var r=!1;else{if(e=en,en=null,Kr=0,L&6)throw Error(h(331));var l=L;for(L|=4,S=e.current;S!==null;){var i=S,o=i.child;if(S.flags&16){var s=i.deletions;if(s!==null){for(var a=0;a<s.length;a++){var c=s[a];for(S=c;S!==null;){var g=S;switch(g.tag){case 0:case 11:case 15:Pt(8,g,i)}var m=g.child;if(m!==null)m.return=g,S=m;else for(;S!==null;){g=S;var p=g.sibling,y=g.return;if(Du(g),g===c){S=null;break}if(p!==null){p.return=y,S=p;break}S=y}}}var w=i.alternate;if(w!==null){var k=w.child;if(k!==null){w.child=null;do{var F=k.sibling;k.sibling=null,k=F}while(k!==null)}}S=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,S=o;else e:for(;S!==null;){if(i=S,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Pt(9,i,i.return)}var d=i.sibling;if(d!==null){d.return=i.return,S=d;break e}S=i.return}}var u=e.current;for(S=u;S!==null;){o=S;var f=o.child;if(o.subtreeFlags&2064&&f!==null)f.return=o,S=f;else e:for(o=u;S!==null;){if(s=S,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:sl(9,s)}}catch(x){$(s,s.return,x)}if(s===o){S=null;break e}var v=s.sibling;if(v!==null){v.return=s.return,S=v;break e}S=s.return}}if(L=l,mn(),Fe&&typeof Fe.onPostCommitFiberRoot=="function")try{Fe.onPostCommitFiberRoot(qr,e)}catch{}r=!0}return r}finally{R=t,xe.transition=n}}return!1}function Fs(e,n,t){n=nt(t,n),n=Pu(e,n,1),e=on(e,n,1),n=ie(),e!==null&&(Yt(e,1,n),fe(e,n))}function $(e,n,t){if(e.tag===3)Fs(e,e,t);else for(;n!==null;){if(n.tag===3){Fs(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(sn===null||!sn.has(r))){e=nt(t,e),e=_u(n,e,1),n=on(n,e,1),e=ie(),n!==null&&(Yt(n,1,e),fe(n,e));break}}n=n.return}}function hf(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=ie(),e.pingedLanes|=e.suspendedLanes&t,X===e&&(J&t)===t&&(Y===4||Y===3&&(J&130023424)===J&&500>H()-So?xn(e,0):ko|=t),fe(e,n)}function Yu(e,n){n===0&&(e.mode&1?(n=lr,lr<<=1,!(lr&130023424)&&(lr=4194304)):n=1);var t=ie();e=Qe(e,n),e!==null&&(Yt(e,n,t),fe(e,t))}function yf(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),Yu(e,t)}function wf(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(t=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(h(314))}r!==null&&r.delete(n),Yu(e,t)}var Gu;Gu=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||ce.current)ue=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return ue=!1,of(e,n,t);ue=!!(e.flags&131072)}else ue=!1,D&&n.flags&1048576&&Ja(n,Wr,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Cr(e,n),e=n.pendingProps;var l=Zn(n,re.current);Gn(n,t),l=mo(null,n,r,e,l,t);var i=go();return n.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,de(r)?(i=!0,jr(n)):i=!1,n.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,ao(n),l.updater=ol,n.stateNode=l,l._reactInternals=n,ki(n,r,e,t),n=Ei(null,n,r,!0,i,t)):(n.tag=0,D&&i&&no(n),le(null,n,l,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Cr(e,n),e=n.pendingProps,l=r._init,r=l(r._payload),n.type=r,l=n.tag=Sf(r),e=_e(r,e),l){case 0:n=xi(null,n,r,e,t);break e;case 1:n=Ps(null,n,r,e,t);break e;case 11:n=Cs(null,n,r,e,t);break e;case 14:n=zs(null,n,r,_e(r.type,e),t);break e}throw Error(h(306,r,""))}return n;case 0:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:_e(r,l),xi(e,n,r,l,t);case 1:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:_e(r,l),Ps(e,n,r,l,t);case 3:e:{if(Lu(n),e===null)throw Error(h(387));r=n.pendingProps,i=n.memoizedState,l=i.element,lu(e,n),Vr(n,r,null,t);var o=n.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},n.updateQueue.baseState=i,n.memoizedState=i,n.flags&256){l=nt(Error(h(423)),n),n=_s(e,n,r,t,l);break e}else if(r!==l){l=nt(Error(h(424)),n),n=_s(e,n,r,t,l);break e}else for(me=ln(n.stateNode.containerInfo.firstChild),ge=n,D=!0,Ie=null,t=tu(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Jn(),r===l){n=be(e,n,t);break e}le(e,n,r,t)}n=n.child}return n;case 5:return iu(n),e===null&&hi(n),r=n.type,l=n.pendingProps,i=e!==null?e.memoizedProps:null,o=l.children,fi(r,l)?o=null:i!==null&&fi(r,i)&&(n.flags|=32),Tu(e,n),le(e,n,o,t),n.child;case 6:return e===null&&hi(n),null;case 13:return Ru(e,n,t);case 4:return uo(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=qn(n,null,r,t):le(e,n,r,t),n.child;case 11:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:_e(r,l),Cs(e,n,r,l,t);case 7:return le(e,n,n.pendingProps,t),n.child;case 8:return le(e,n,n.pendingProps.children,t),n.child;case 12:return le(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,l=n.pendingProps,i=n.memoizedProps,o=l.value,A($r,r._currentValue),r._currentValue=o,i!==null)if(Re(i.value,o)){if(i.children===l.children&&!ce.current){n=be(e,n,t);break e}}else for(i=n.child,i!==null&&(i.return=n);i!==null;){var s=i.dependencies;if(s!==null){o=i.child;for(var a=s.firstContext;a!==null;){if(a.context===r){if(i.tag===1){a=Be(-1,t&-t),a.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var g=c.pending;g===null?a.next=a:(a.next=g.next,g.next=a),c.pending=a}}i.lanes|=t,a=i.alternate,a!==null&&(a.lanes|=t),yi(i.return,t,n),s.lanes|=t;break}a=a.next}}else if(i.tag===10)o=i.type===n.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(h(341));o.lanes|=t,s=o.alternate,s!==null&&(s.lanes|=t),yi(o,t,n),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===n){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}le(e,n,l.children,t),n=n.child}return n;case 9:return l=n.type,r=n.pendingProps.children,Gn(n,t),l=Ee(l),r=r(l),n.flags|=1,le(e,n,r,t),n.child;case 14:return r=n.type,l=_e(r,n.pendingProps),l=_e(r.type,l),zs(e,n,r,l,t);case 15:return Nu(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:_e(r,l),Cr(e,n),n.tag=1,de(r)?(e=!0,jr(n)):e=!1,Gn(n,t),zu(n,r,l),ki(n,r,l,t),Ei(null,n,r,!0,e,t);case 19:return Au(e,n,t);case 22:return Iu(e,n,t)}throw Error(h(156,n.tag))};function Ku(e,n){return xa(e,n)}function kf(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Se(e,n,t,r){return new kf(e,n,t,r)}function zo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Sf(e){if(typeof e=="function")return zo(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Vi)return 11;if(e===Hi)return 14}return 2}function un(e,n){var t=e.alternate;return t===null?(t=Se(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function _r(e,n,t,r,l,i){var o=2;if(r=e,typeof e=="function")zo(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case An:return En(t.children,l,i,n);case Bi:o=8,l|=8;break;case Hl:return e=Se(12,t,n,l|2),e.elementType=Hl,e.lanes=i,e;case Ql:return e=Se(13,t,n,l),e.elementType=Ql,e.lanes=i,e;case bl:return e=Se(19,t,n,l),e.elementType=bl,e.lanes=i,e;case ia:return ul(t,l,i,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ra:o=10;break e;case la:o=9;break e;case Vi:o=11;break e;case Hi:o=14;break e;case Ke:o=16,r=null;break e}throw Error(h(130,e==null?e:typeof e,""))}return n=Se(o,t,n,l),n.elementType=e,n.type=r,n.lanes=i,n}function En(e,n,t,r){return e=Se(7,e,r,n),e.lanes=t,e}function ul(e,n,t,r){return e=Se(22,e,r,n),e.elementType=ia,e.lanes=t,e.stateNode={isHidden:!1},e}function $l(e,n,t){return e=Se(6,e,null,n),e.lanes=t,e}function Bl(e,n,t){return n=Se(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function xf(e,n,t,r,l){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=xl(0),this.expirationTimes=xl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Po(e,n,t,r,l,i,o,s,a){return e=new xf(e,n,t,s,a),n===1?(n=1,i===!0&&(n|=8)):n=0,i=Se(3,null,null,n),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},ao(i),e}function Ef(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Rn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function Xu(e){if(!e)return dn;e=e._reactInternals;e:{if(Tn(e)!==e||e.tag!==1)throw Error(h(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(de(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(h(171))}if(e.tag===1){var t=e.type;if(de(t))return Xa(e,t,n)}return n}function Zu(e,n,t,r,l,i,o,s,a){return e=Po(t,r,!0,e,l,i,o,s,a),e.context=Xu(null),t=e.current,r=ie(),l=an(t),i=Be(r,l),i.callback=n??null,on(t,i,l),e.current.lanes=l,Yt(e,l,r),fe(e,r),e}function cl(e,n,t,r){var l=n.current,i=ie(),o=an(l);return t=Xu(t),n.context===null?n.context=t:n.pendingContext=t,n=Be(i,o),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=on(l,n,o),e!==null&&(Le(e,l,o,i),Sr(e,l,o)),o}function Zr(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ds(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function _o(e,n){Ds(e,n),(e=e.alternate)&&Ds(e,n)}function Cf(){return null}var Ju=typeof reportError=="function"?reportError:function(e){console.error(e)};function No(e){this._internalRoot=e}dl.prototype.render=No.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(h(409));cl(e,n,null,null)};dl.prototype.unmount=No.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Nn(function(){cl(null,e,null,null)}),n[He]=null}};function dl(e){this._internalRoot=e}dl.prototype.unstable_scheduleHydration=function(e){if(e){var n=Ia();e={blockedOn:null,target:e,priority:n};for(var t=0;t<Ze.length&&n!==0&&n<Ze[t].priority;t++);Ze.splice(t,0,e),t===0&&La(e)}};function Io(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function fl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function js(){}function zf(e,n,t,r,l){if(l){if(typeof r=="function"){var i=r;r=function(){var c=Zr(o);i.call(c)}}var o=Zu(n,r,e,0,null,!1,!1,"",js);return e._reactRootContainer=o,e[He]=o.current,Dt(e.nodeType===8?e.parentNode:e),Nn(),o}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var s=r;r=function(){var c=Zr(a);s.call(c)}}var a=Po(e,0,!1,null,null,!1,!1,"",js);return e._reactRootContainer=a,e[He]=a.current,Dt(e.nodeType===8?e.parentNode:e),Nn(function(){cl(n,a,t,r)}),a}function pl(e,n,t,r,l){var i=t._reactRootContainer;if(i){var o=i;if(typeof l=="function"){var s=l;l=function(){var a=Zr(o);s.call(a)}}cl(n,o,e,l)}else o=zf(t,n,e,l,r);return Zr(o)}_a=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=yt(n.pendingLanes);t!==0&&(Yi(n,t|1),fe(n,H()),!(L&6)&&(tt=H()+500,mn()))}break;case 13:Nn(function(){var r=Qe(e,1);if(r!==null){var l=ie();Le(r,e,1,l)}}),_o(e,1)}};Gi=function(e){if(e.tag===13){var n=Qe(e,134217728);if(n!==null){var t=ie();Le(n,e,134217728,t)}_o(e,134217728)}};Na=function(e){if(e.tag===13){var n=an(e),t=Qe(e,n);if(t!==null){var r=ie();Le(t,e,n,r)}_o(e,n)}};Ia=function(){return R};Ta=function(e,n){var t=R;try{return R=e,n()}finally{R=t}};ti=function(e,n,t){switch(n){case"input":if(Kl(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var l=rl(r);if(!l)throw Error(h(90));sa(r),Kl(r,l)}}}break;case"textarea":ua(e,t);break;case"select":n=t.value,n!=null&&Hn(e,!!t.multiple,n,!1)}};va=xo;ha=Nn;var Pf={usingClientEntryPoint:!1,Events:[Kt,Dn,rl,ma,ga,xo]},gt={findFiberByHostInstance:wn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},_f={bundleType:gt.bundleType,version:gt.version,rendererPackageName:gt.rendererPackageName,rendererConfig:gt.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ye.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ka(e),e===null?null:e.stateNode},findFiberByHostInstance:gt.findFiberByHostInstance||Cf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var gr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!gr.isDisabled&&gr.supportsFiber)try{qr=gr.inject(_f),Fe=gr}catch{}}he.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Pf;he.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Io(n))throw Error(h(200));return Ef(e,n,null,t)};he.createRoot=function(e,n){if(!Io(e))throw Error(h(299));var t=!1,r="",l=Ju;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),n=Po(e,1,!1,null,null,t,!1,r,l),e[He]=n.current,Dt(e.nodeType===8?e.parentNode:e),new No(n)};he.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(h(188)):(e=Object.keys(e).join(","),Error(h(268,e)));return e=ka(n),e=e===null?null:e.stateNode,e};he.flushSync=function(e){return Nn(e)};he.hydrate=function(e,n,t){if(!fl(n))throw Error(h(200));return pl(null,e,n,!0,t)};he.hydrateRoot=function(e,n,t){if(!Io(e))throw Error(h(405));var r=t!=null&&t.hydratedSources||null,l=!1,i="",o=Ju;if(t!=null&&(t.unstable_strictMode===!0&&(l=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),n=Zu(n,null,e,1,t??null,l,!1,i,o),e[He]=n.current,Dt(e),r)for(e=0;e<r.length;e++)t=r[e],l=t._getVersion,l=l(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,l]:n.mutableSourceEagerHydrationData.push(t,l);return new dl(n)};he.render=function(e,n,t){if(!fl(n))throw Error(h(200));return pl(null,e,n,!1,t)};he.unmountComponentAtNode=function(e){if(!fl(e))throw Error(h(40));return e._reactRootContainer?(Nn(function(){pl(null,null,e,!1,function(){e._reactRootContainer=null,e[He]=null})}),!0):!1};he.unstable_batchedUpdates=xo;he.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!fl(t))throw Error(h(200));if(e==null||e._reactInternals===void 0)throw Error(h(38));return pl(e,n,t,!1,r)};he.version="18.3.1-next-f1338f8080-20240426";function qu(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(qu)}catch(e){console.error(e)}}qu(),qs.exports=he;var Nf=qs.exports,ec,Us=Nf;ec=Us.createRoot,Us.hydrateRoot;const If=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LaunchLayer — AI Automation That Works While You Sleep</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0a0a0f;
    --bg2: #111118;
    --bg3: #181820;
    --border: rgba(255,255,255,0.08);
    --amber: #f5a623;
    --amber2: #ff7a1a;
    --teal: #00c9b1;
    --text: #e8e8f0;
    --muted: #7a7a9a;
    --white: #ffffff;
    --card-bg: rgba(255,255,255,0.03);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Instrument Sans', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* ─── NOISE TEXTURE OVERLAY ─── */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; opacity: 0.4;
  }

  /* ─── NAV ─── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 4rem;
    background: rgba(10,10,15,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }

  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 1.4rem;
    color: var(--white);
    text-decoration: none;
    display: flex; align-items: center; gap: 0.5rem;
  }

  .nav-logo .dot {
    width: 8px; height: 8px;
    background: var(--amber);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.4); }
  }

  .nav-links {
    display: flex; align-items: center; gap: 2.5rem;
    list-style: none;
  }

  .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: color 0.2s;
  }

  .nav-links a:hover { color: var(--white); }

  .nav-cta {
    background: var(--amber);
    color: #0a0a0f !important;
    padding: 0.55rem 1.3rem;
    border-radius: 6px;
    font-weight: 600 !important;
    transition: background 0.2s, transform 0.1s !important;
  }

  .nav-cta:hover {
    background: var(--amber2) !important;
    transform: translateY(-1px);
    color: #0a0a0f !important;
  }

  /* ─── ANNOUNCEMENT BAR ─── */
  .announcement {
    background: linear-gradient(90deg, var(--amber), var(--amber2));
    text-align: center;
    padding: 0.55rem 1rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: #0a0a0f;
    letter-spacing: 0.03em;
    position: relative; z-index: 101;
  }

  /* ─── HERO ─── */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 8rem 4rem 4rem;
    position: relative;
    overflow: hidden;
  }

  .hero-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(245,166,35,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,166,35,0.05) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  }

  .hero-glow {
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 65%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .hero-content {
    position: relative; z-index: 1;
    text-align: center; max-width: 900px;
  }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(245,166,35,0.1);
    border: 1px solid rgba(245,166,35,0.3);
    border-radius: 100px;
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
    color: var(--amber);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 2rem;
    animation: fadeUp 0.6s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: var(--white);
    animation: fadeUp 0.7s 0.1s ease both;
  }

  .hero h1 .accent { color: var(--amber); }
  .hero h1 .accent2 { color: var(--teal); }

  .hero-sub {
    font-size: 1.15rem;
    color: var(--muted);
    max-width: 600px;
    margin: 1.5rem auto 2.5rem;
    line-height: 1.7;
    animation: fadeUp 0.7s 0.2s ease both;
  }

  .hero-btns {
    display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
    animation: fadeUp 0.7s 0.3s ease both;
  }

  .btn-primary {
    background: var(--amber);
    color: #0a0a0f;
    padding: 0.85rem 2rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.95rem;
    text-decoration: none;
    border: none; cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 0 30px rgba(245,166,35,0.25);
  }

  .btn-primary:hover {
    background: var(--amber2);
    transform: translateY(-2px);
    box-shadow: 0 0 40px rgba(245,166,35,0.35);
  }

  .btn-secondary {
    background: transparent;
    color: var(--text);
    padding: 0.85rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    border: 1px solid var(--border);
    transition: border-color 0.2s, transform 0.15s;
  }

  .btn-secondary:hover {
    border-color: rgba(255,255,255,0.25);
    transform: translateY(-2px);
  }

  /* ─── STATS BAR ─── */
  .stats-bar {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: var(--bg2);
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }

  .stat-item {
    padding: 2.5rem 2rem;
    text-align: center;
    border-right: 1px solid var(--border);
    transition: background 0.2s;
  }

  .stat-item:last-child { border-right: none; }
  .stat-item:hover { background: rgba(245,166,35,0.04); }

  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 2.4rem;
    font-weight: 800;
    color: var(--amber);
    display: block;
  }

  .stat-label {
    font-size: 0.82rem;
    color: var(--muted);
    letter-spacing: 0.03em;
    margin-top: 0.25rem;
  }

  /* ─── SECTION BASICS ─── */
  section { padding: 6rem 4rem; position: relative; }

  .section-tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 1rem;
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--white);
    line-height: 1.15;
    letter-spacing: -0.02em;
    max-width: 700px;
  }

  .section-body {
    color: var(--muted);
    max-width: 580px;
    margin-top: 1rem;
    font-size: 1.02rem;
    line-height: 1.7;
  }

  /* ─── PROBLEM SECTION ─── */
  .problem-section {
    background: var(--bg2);
    display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
  }

  .problem-cards {
    display: grid; gap: 1rem;
  }

  .problem-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.4rem 1.6rem;
    display: flex; align-items: flex-start; gap: 1rem;
    transition: border-color 0.2s;
  }

  .problem-card:hover { border-color: rgba(245,166,35,0.25); }

  .problem-icon {
    font-size: 1.5rem;
    min-width: 36px;
    margin-top: 2px;
  }

  .problem-card h4 {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--white);
    margin-bottom: 0.3rem;
  }

  .problem-card p {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.5;
  }

  /* ─── SERVICES ─── */
  .services-section { background: var(--bg); }

  .services-header {
    text-align: center; margin-bottom: 3.5rem;
  }

  .services-header .section-title { max-width: 100%; margin: 0 auto; }
  .services-header .section-body { margin: 1rem auto 0; text-align: center; }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }

  .service-card {
    background: var(--bg2);
    padding: 2.2rem 2rem;
    transition: background 0.25s;
    position: relative;
    overflow: hidden;
  }

  .service-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--amber), var(--amber2));
    transform: scaleX(0);
    transition: transform 0.3s;
    transform-origin: left;
  }

  .service-card:hover::before { transform: scaleX(1); }
  .service-card:hover { background: var(--bg3); }

  .service-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    display: block;
  }

  .service-card h3 {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--white);
    margin-bottom: 0.6rem;
  }

  .service-card p {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .service-tag-list {
    display: flex; flex-wrap: wrap; gap: 0.4rem;
  }

  .stag {
    font-size: 0.72rem;
    font-weight: 600;
    background: rgba(245,166,35,0.1);
    border: 1px solid rgba(245,166,35,0.2);
    color: var(--amber);
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
    letter-spacing: 0.02em;
  }

  /* ─── USE CASE ─── */
  .usecase-section {
    background: var(--bg2);
  }

  .usecase-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;
    margin-top: 3rem;
  }

  .usecase-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }

  .usecase-header {
    background: linear-gradient(135deg, rgba(245,166,35,0.15), rgba(0,201,177,0.1));
    border-bottom: 1px solid var(--border);
    padding: 1.5rem 1.8rem;
    display: flex; align-items: center; gap: 1rem;
  }

  .usecase-header .uc-emoji { font-size: 2rem; }

  .usecase-header h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--white);
  }

  .usecase-header span {
    font-size: 0.78rem;
    color: var(--muted);
  }

  .usecase-body { padding: 1.8rem; }

  .uc-scenario {
    background: rgba(255,255,255,0.04);
    border-left: 3px solid var(--amber);
    padding: 0.9rem 1rem;
    border-radius: 0 6px 6px 0;
    margin-bottom: 1rem;
    font-size: 0.88rem;
    color: var(--muted);
    font-style: italic;
  }

  .uc-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: var(--amber);
    margin-bottom: 0.4rem;
  }

  .uc-result {
    font-size: 0.88rem;
    color: var(--text);
    line-height: 1.6;
  }

  .uc-metrics {
    display: flex; gap: 1rem; margin-top: 1.2rem;
  }

  .uc-metric {
    flex: 1;
    background: rgba(0,201,177,0.07);
    border: 1px solid rgba(0,201,177,0.2);
    border-radius: 8px;
    padding: 0.7rem 0.8rem;
    text-align: center;
  }

  .uc-metric strong {
    display: block;
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    color: var(--teal);
    font-weight: 800;
  }

  .uc-metric span {
    font-size: 0.72rem;
    color: var(--muted);
  }

  /* ─── INDUSTRIES ─── */
  .industries-section { background: var(--bg); }

  .industries-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 3rem;
  }

  .industry-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.6rem 1.4rem;
    transition: border-color 0.2s, transform 0.2s;
    cursor: default;
  }

  .industry-card:hover {
    border-color: rgba(245,166,35,0.3);
    transform: translateY(-3px);
  }

  .ind-emoji { font-size: 2rem; margin-bottom: 0.8rem; display: block; }

  .industry-card h4 {
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 0.4rem;
  }

  .industry-card p {
    font-size: 0.8rem;
    color: var(--muted);
    line-height: 1.5;
  }

  .ind-badge {
    display: inline-block;
    margin-top: 0.7rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
  }

  .ind-india { background: rgba(255,153,0,0.15); color: #ff9900; }
  .ind-global { background: rgba(0,201,177,0.15); color: var(--teal); }
  .ind-both { background: rgba(245,166,35,0.15); color: var(--amber); }

  /* ─── HOW IT WORKS ─── */
  .hiw-section {
    background: var(--bg2);
  }

  .hiw-steps {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3.5rem;
    position: relative;
  }

  .hiw-steps::before {
    content: '';
    position: absolute; top: 30px; left: calc(16.6% + 1rem); right: calc(16.6% + 1rem);
    height: 1px;
    background: linear-gradient(90deg, var(--amber), transparent, var(--teal));
    z-index: 0;
  }

  .hiw-step {
    position: relative; z-index: 1;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 2rem 1.6rem 1.8rem;
  }

  .step-num {
    width: 48px; height: 48px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
  }

  .step-num.s1 { background: rgba(245,166,35,0.15); color: var(--amber); border: 1px solid rgba(245,166,35,0.3); }
  .step-num.s2 { background: rgba(255,122,26,0.15); color: var(--amber2); border: 1px solid rgba(255,122,26,0.3); }
  .step-num.s3 { background: rgba(0,201,177,0.15); color: var(--teal); border: 1px solid rgba(0,201,177,0.3); }

  .hiw-step h3 {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: var(--white);
    margin-bottom: 0.6rem;
  }

  .hiw-step p {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.6;
  }

  /* ─── TOOLS ─── */
  .tools-section { background: var(--bg); }

  .tools-intro {
    display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
  }

  .tools-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.8rem;
  }

  .tool-pill {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.8rem 1rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text);
    display: flex; align-items: center; gap: 0.5rem;
    transition: border-color 0.2s;
  }

  .tool-pill:hover { border-color: rgba(245,166,35,0.3); }

  .tool-pill .t-cost {
    margin-left: auto;
    font-size: 0.68rem;
    color: var(--teal);
    font-weight: 700;
  }

  /* ─── PRICING ─── */
  .pricing-section { background: var(--bg2); }

  .pricing-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3rem;
  }

  .pricing-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2.2rem;
    position: relative;
    transition: transform 0.2s;
  }

  .pricing-card:hover { transform: translateY(-4px); }

  .pricing-card.featured {
    border-color: var(--amber);
    background: linear-gradient(160deg, rgba(245,166,35,0.06), var(--bg3));
  }

  .featured-tag {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--amber);
    color: #0a0a0f;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.25rem 0.9rem;
    border-radius: 100px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .pricing-card h3 {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1rem;
  }

  .pricing-price {
    font-family: 'Syne', sans-serif;
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--white);
    line-height: 1;
    margin-bottom: 0.3rem;
  }

  .pricing-price span {
    font-size: 1rem;
    color: var(--muted);
    font-weight: 400;
  }

  .pricing-desc {
    font-size: 0.82rem;
    color: var(--muted);
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border);
  }

  .pricing-features {
    list-style: none;
    display: flex; flex-direction: column; gap: 0.6rem;
    margin-bottom: 2rem;
  }

  .pricing-features li {
    font-size: 0.85rem;
    color: var(--text);
    display: flex; align-items: flex-start; gap: 0.6rem;
  }

  .pricing-features li::before {
    content: '✓';
    color: var(--teal);
    font-weight: 700;
    min-width: 14px;
  }

  .pricing-btn {
    width: 100%;
    padding: 0.85rem;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text);
    font-family: 'Instrument Sans', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: block;
    text-align: center;
  }

  .pricing-btn:hover { border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.04); }

  .pricing-btn.featured-btn {
    background: var(--amber);
    border-color: var(--amber);
    color: #0a0a0f;
    font-weight: 700;
  }

  .pricing-btn.featured-btn:hover {
    background: var(--amber2);
    border-color: var(--amber2);
  }

  /* ─── CTA SECTION ─── */
  .cta-section {
    background: var(--bg);
    text-align: center;
    padding: 7rem 4rem;
  }

  .cta-box {
    max-width: 700px;
    margin: 0 auto;
    background: linear-gradient(135deg, rgba(245,166,35,0.1), rgba(0,201,177,0.07));
    border: 1px solid rgba(245,166,35,0.2);
    border-radius: 24px;
    padding: 4rem;
    position: relative;
    overflow: hidden;
  }

  .cta-box::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(245,166,35,0.15), transparent 65%);
    pointer-events: none;
  }

  .cta-box h2 {
    font-family: 'Syne', sans-serif;
    font-size: 2.4rem;
    font-weight: 800;
    color: var(--white);
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
  }

  .cta-box p {
    color: var(--muted);
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  .cta-inputs {
    display: flex; gap: 0.8rem; max-width: 420px; margin: 0 auto;
  }

  .cta-inputs input {
    flex: 1;
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: var(--text);
    font-family: 'Instrument Sans', sans-serif;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s;
  }

  .cta-inputs input:focus { border-color: rgba(245,166,35,0.5); }

  .cta-inputs input::placeholder { color: var(--muted); }

  /* ─── BRAND STRATEGY SECTION ─── */
  .brand-section {
    background: var(--bg2);
  }

  .brand-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 3rem;
  }

  .brand-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.8rem;
  }

  .brand-card h4 {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: var(--white);
    margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.6rem;
  }

  .brand-card ul {
    list-style: none;
    display: flex; flex-direction: column; gap: 0.6rem;
  }

  .brand-card ul li {
    font-size: 0.85rem;
    color: var(--muted);
    padding-left: 1rem;
    position: relative;
    line-height: 1.5;
  }

  .brand-card ul li::before {
    content: '→';
    position: absolute; left: 0;
    color: var(--amber);
    font-size: 0.8rem;
  }

  /* ─── FOOTER ─── */
  footer {
    background: var(--bg);
    border-top: 1px solid var(--border);
    padding: 3rem 4rem;
    display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 3rem;
  }

  .footer-brand h3 {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.3rem;
    color: var(--white);
    margin-bottom: 0.7rem;
  }

  .footer-brand p {
    font-size: 0.82rem;
    color: var(--muted);
    line-height: 1.6;
  }

  .footer-col h4 {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    margin-bottom: 1rem;
  }

  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }

  .footer-col ul li a {
    font-size: 0.85rem;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-col ul li a:hover { color: var(--white); }

  .footer-bottom {
    border-top: 1px solid var(--border);
    padding: 1.5rem 4rem;
    display: flex; align-items: center; justify-content: space-between;
    background: var(--bg);
  }

  .footer-bottom p {
    font-size: 0.8rem;
    color: var(--muted);
  }

  .footer-flags { display: flex; gap: 0.5rem; font-size: 1.1rem; align-items: center; }
  .footer-flags span { font-size: 0.78rem; color: var(--muted); margin-right: 0.3rem; }

  /* ─── CONTACT FORM ─── */
  .contact-section {
    background: var(--bg);
    display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;
  }

  .contact-form {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2.5rem;
  }

  .form-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;
  }

  .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }

  .form-group label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .form-group input, .form-group select, .form-group textarea {
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.8rem 1rem;
    color: var(--text);
    font-family: 'Instrument Sans', sans-serif;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }

  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: rgba(245,166,35,0.5);
  }

  .form-group textarea { resize: vertical; min-height: 100px; }

  .form-group select option { background: #1a1a25; }

  .contact-info { padding-top: 1rem; }

  .contact-info h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--white);
    margin-bottom: 1rem;
  }

  .contact-item {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 1.2rem;
  }

  .contact-icon {
    width: 40px; height: 40px;
    background: rgba(245,166,35,0.1);
    border: 1px solid rgba(245,166,35,0.2);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
  }

  .contact-detail h5 {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.15rem;
  }

  .contact-detail a {
    color: var(--text);
    font-size: 0.9rem;
    text-decoration: none;
  }

  .contact-detail a:hover { color: var(--amber); }

  .availability-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(0,201,177,0.1);
    border: 1px solid rgba(0,201,177,0.25);
    padding: 0.5rem 1rem;
    border-radius: 100px;
    font-size: 0.8rem;
    color: var(--teal);
    font-weight: 600;
    margin-top: 2rem;
  }

  .avail-dot {
    width: 7px; height: 7px;
    background: var(--teal);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 900px) {
    nav { padding: 1rem 1.5rem; }
    section { padding: 4rem 1.5rem; }
    .stats-bar { grid-template-columns: repeat(2, 1fr); }
    .problem-section, .usecase-grid, .tools-intro, .brand-grid, .contact-section { grid-template-columns: 1fr; gap: 2rem; }
    .services-grid, .pricing-grid { grid-template-columns: 1fr; }
    .industries-grid { grid-template-columns: repeat(2, 1fr); }
    .hiw-steps { grid-template-columns: 1fr; }
    .hiw-steps::before { display: none; }
    footer { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .form-row { grid-template-columns: 1fr; }
    .hero { padding: 6rem 1.5rem 3rem; }
  }
</style>
</head>
<body>

<!-- ─── ANNOUNCEMENT ─── -->
<div class="announcement">
  🇮🇳 Now serving clients across India & 🌍 Global markets — Book a FREE 30-min AI Audit Call
</div>

<!-- ─── NAV ─── -->
<nav>
  <a href="#" class="nav-logo">
    <span>LaunchLayer</span>
    <span class="dot"></span>
  </a>
  <ul class="nav-links">
    <li><a href="#services">Services</a></li>
    <li><a href="#industries">Industries</a></li>
    <li><a href="#use-cases">Case Studies</a></li>
    <li><a href="#pricing">Pricing</a></li>
    <li><a href="#contact" class="nav-cta">Book Free Audit →</a></li>
  </ul>
</nav>

<!-- ─── HERO ─── -->
<section class="hero">
  <div class="hero-grid-bg"></div>
  <div class="hero-glow"></div>
  <div class="hero-content">
    <div class="hero-badge">🤖 AI Automation Agency · India & Global</div>
    <h1>Your Business.<br><span class="accent">Automated.</span><br><span class="accent2">Elevated.</span></h1>
    <p class="hero-sub">
      We replace repetitive manual work with AI-powered workflows — so your team stops firefighting and starts scaling. From ₹0 manual processes to intelligent automation in weeks, not months.
    </p>
    <div class="hero-btns">
      <a href="#contact" class="btn-primary">Book Free AI Audit →</a>
      <a href="#use-cases" class="btn-secondary">See Real Use Cases</a>
    </div>
  </div>
</section>

<!-- ─── STATS ─── -->
<div class="stats-bar">
  <div class="stat-item">
    <span class="stat-num">200+</span>
    <span class="stat-label">Hours saved per client/month</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">70%</span>
    <span class="stat-label">Cost reduction on manual tasks</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">$30/hr</span>
    <span class="stat-label">Starting engagement rate</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">2 Wks</span>
    <span class="stat-label">Average time to first automation live</span>
  </div>
</div>

<!-- ─── PROBLEM SECTION ─── -->
<section class="problem-section" id="problem">
  <div>
    <p class="section-tag">The Real Problem</p>
    <h2 class="section-title">Your team is talented. But buried in tasks AI could handle.</h2>
    <p class="section-body">
      Every hour your team spends on copy-paste, manual reports, follow-up emails, and data entry is an hour not spent on strategy and growth. We've seen it across every industry.
    </p>
    <br>
    <p class="section-body" style="font-size:0.9rem;">
      <strong style="color:var(--white)">Real example:</strong> A mid-sized trading company in Mumbai had 3 staff spending 4 hours daily just updating Excel sheets from emails and WhatsApp messages. We automated the entire process with an AI pipeline. Those same staff now handle 3x more client accounts.
    </p>
  </div>
  <div class="problem-cards">
    <div class="problem-card">
      <span class="problem-icon">📋</span>
      <div>
        <h4>Manual Data Entry Hell</h4>
        <p>Teams spend hours copying data between spreadsheets, emails, and systems — all of which can be automated in days.</p>
      </div>
    </div>
    <div class="problem-card">
      <span class="problem-icon">⏰</span>
      <div>
        <h4>Slow Report Generation</h4>
        <p>Monthly/weekly reports that take hours to compile manually can be auto-generated and delivered on schedule.</p>
      </div>
    </div>
    <div class="problem-card">
      <span class="problem-icon">📨</span>
      <div>
        <h4>Lost Leads & Follow-ups</h4>
        <p>Inquiries that fall through the cracks or delayed responses — an AI can respond, qualify, and route leads 24/7.</p>
      </div>
    </div>
    <div class="problem-card">
      <span class="problem-icon">🔍</span>
      <div>
        <h4>Data Scattered Everywhere</h4>
        <p>ERP here, WhatsApp there, email somewhere else. AI can unify, clean, and make data instantly queryable.</p>
      </div>
    </div>
  </div>
</section>

<!-- ─── SERVICES ─── -->
<section class="services-section" id="services">
  <div class="services-header">
    <p class="section-tag">What We Do</p>
    <h2 class="section-title">Six pillars of AI-powered transformation</h2>
    <p class="section-body">Practical, affordable automation that replaces manual work with intelligent processes — no data science degree required from your team.</p>
  </div>

  <div class="services-grid">
    <div class="service-card">
      <span class="service-icon">🤖</span>
      <h3>AI Workflow Automation</h3>
      <p>Connect your apps, emails, WhatsApp, ERP and databases into automated pipelines that run without human input — using n8n, Make, or Zapier.</p>
      <div class="service-tag-list">
        <span class="stag">n8n</span>
        <span class="stag">Make.com</span>
        <span class="stag">Zapier</span>
        <span class="stag">Low-cost</span>
      </div>
    </div>
    <div class="service-card">
      <span class="service-icon">💬</span>
      <h3>AI Chatbot & Virtual Assistants</h3>
      <p>Deploy AI assistants on your website, WhatsApp, or internal portal to handle customer queries, lead qualification, and support tickets 24/7.</p>
      <div class="service-tag-list">
        <span class="stag">GPT-4o</span>
        <span class="stag">Claude</span>
        <span class="stag">WhatsApp API</span>
      </div>
    </div>
    <div class="service-card">
      <span class="service-icon">📊</span>
      <h3>AI-Powered Reporting & Analytics</h3>
      <p>Turn your scattered data into auto-generated dashboards and reports. Ask business questions in plain English — like asking a very smart analyst.</p>
      <div class="service-tag-list">
        <span class="stag">Power BI</span>
        <span class="stag">Looker</span>
        <span class="stag">LLM Analytics</span>
      </div>
    </div>
    <div class="service-card">
      <span class="service-icon">📄</span>
      <h3>Document Intelligence & OCR</h3>
      <p>Extract data from invoices, purchase orders, forms, and PDFs automatically — no more manual keying. Integrates into your ERP or accounting software.</p>
      <div class="service-tag-list">
        <span class="stag">Invoice AI</span>
        <span class="stag">OCR</span>
        <span class="stag">ERP Integration</span>
      </div>
    </div>
    <div class="service-card">
      <span class="service-icon">🔗</span>
      <h3>Systems Integration & API</h3>
      <p>Connect your CRM, ERP, accounting tools, logistics platforms and e-commerce systems so data flows automatically across your business stack.</p>
      <div class="service-tag-list">
        <span class="stag">REST APIs</span>
        <span class="stag">Tally</span>
        <span class="stag">SAP/Zoho</span>
      </div>
    </div>
    <div class="service-card">
      <span class="service-icon">🚀</span>
      <h3>AI Lead Generation & Marketing</h3>
      <p>Build AI-driven sales funnels, automated email sequences, and lead scoring systems that continuously bring in qualified prospects with minimal manual effort.</p>
      <div class="service-tag-list">
        <span class="stag">CRM Automation</span>
        <span class="stag">Email AI</span>
        <span class="stag">LinkedIn AI</span>
      </div>
    </div>
  </div>
</section>

<!-- ─── USE CASES ─── -->
<section class="usecase-section" id="use-cases">
  <p class="section-tag">Real Use Cases</p>
  <h2 class="section-title">What AI automation looks like in the real world</h2>
  <p class="section-body">Not theory. Actual scenarios from businesses like yours, explained simply.</p>

  <div class="usecase-grid">
    <div class="usecase-card">
      <div class="usecase-header">
        <span class="uc-emoji">🏭</span>
        <div>
          <h3>Manufacturing Company — Purchase Order Processing</h3>
          <span>India · SME · 50 employees</span>
        </div>
      </div>
      <div class="usecase-body">
        <div class="uc-label">The Problem</div>
        <div class="uc-scenario">"We have 3 people whose entire job is receiving supplier emails, reading POs, updating Excel, and forwarding to accounts. It takes them all day."</div>
        <div class="uc-label" style="margin-top:1rem;">The AI Solution</div>
        <p class="uc-result">We built an AI pipeline that reads incoming emails, extracts PO details using AI, updates their ERP automatically, and sends confirmation back to suppliers — all without any human touching it. Exceptions are flagged for human review only.</p>
        <div class="uc-metrics">
          <div class="uc-metric"><strong>90%</strong><span>Less manual work</span></div>
          <div class="uc-metric"><strong>3hrs→5min</strong><span>Processing time</span></div>
          <div class="uc-metric"><strong>₹4L/yr</strong><span>Labour cost saved</span></div>
        </div>
      </div>
    </div>

    <div class="usecase-card">
      <div class="usecase-header">
        <span class="uc-emoji">🏥</span>
        <div>
          <h3>Healthcare Clinic — Patient Follow-up & Scheduling</h3>
          <span>Global · Mid-sized clinic · 20 staff</span>
        </div>
      </div>
      <div class="usecase-body">
        <div class="uc-label">The Problem</div>
        <div class="uc-scenario">"Our receptionist spends 4 hours daily calling patients for appointment reminders, and we still have 30% no-shows."</div>
        <div class="uc-label" style="margin-top:1rem;">The AI Solution</div>
        <p class="uc-result">We deployed a WhatsApp AI assistant that sends personalized appointment reminders, answers FAQs, and allows patients to confirm, reschedule, or cancel — automatically updating the scheduling system. The receptionist now handles only complex queries.</p>
        <div class="uc-metrics">
          <div class="uc-metric"><strong>45%</strong><span>No-shows reduced</span></div>
          <div class="uc-metric"><strong>4hrs</strong><span>Receptionist time freed</span></div>
          <div class="uc-metric"><strong>24/7</strong><span>Patient support</span></div>
        </div>
      </div>
    </div>

    <div class="usecase-card">
      <div class="usecase-header">
        <span class="uc-emoji">🛒</span>
        <div>
          <h3>E-commerce Brand — Customer Support AI</h3>
          <span>India D2C Brand · 200+ orders/day</span>
        </div>
      </div>
      <div class="usecase-body">
        <div class="uc-label">The Problem</div>
        <div class="uc-scenario">"We get 150+ customer messages a day — order status, returns, complaints. Our 2 support agents are overwhelmed and response time is 12+ hours."</div>
        <div class="uc-label" style="margin-top:1rem;">The AI Solution</div>
        <p class="uc-result">We integrated an AI chatbot trained on their FAQs, connected to their order management system. It resolves 80% of queries instantly — order tracking, returns initiation, product questions — and only escalates complex cases to human agents.</p>
        <div class="uc-metrics">
          <div class="uc-metric"><strong>80%</strong><span>Queries auto-resolved</span></div>
          <div class="uc-metric"><strong>2min</strong><span>Avg response time</span></div>
          <div class="uc-metric"><strong>4.8★</strong><span>Support rating</span></div>
        </div>
      </div>
    </div>

    <div class="usecase-card">
      <div class="usecase-header">
        <span class="uc-emoji">🏗️</span>
        <div>
          <h3>Real Estate Agency — Lead Qualification & Nurturing</h3>
          <span>Overseas · UK/UAE Market</span>
        </div>
      </div>
      <div class="usecase-body">
        <div class="uc-label">The Problem</div>
        <div class="uc-scenario">"We get 200 enquiries monthly from ads but our agents only have time to call maybe 40. The rest go cold. We know we're losing deals."</div>
        <div class="uc-label" style="margin-top:1rem;">The AI Solution</div>
        <p class="uc-result">We built an AI funnel: instant WhatsApp/email response to every enquiry, AI qualification questions to score lead quality, automated nurture sequences, and only the top 30% of leads are passed to agents — pre-qualified and warm.</p>
        <div class="uc-metrics">
          <div class="uc-metric"><strong>3x</strong><span>More leads worked</span></div>
          <div class="uc-metric"><strong>60%</strong><span>Agent time saved</span></div>
          <div class="uc-metric"><strong>28%</strong><span>Conversion uplift</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ─── INDUSTRIES ─── -->
<section class="industries-section" id="industries">
  <p class="section-tag">Who We Serve</p>
  <h2 class="section-title">Industries & Departments We Target</h2>
  <p class="section-body">We focus on businesses and departments where manual repetitive work is highest and AI ROI is fastest.</p>

  <div class="industries-grid">
    <div class="industry-card">
      <span class="ind-emoji">🏭</span>
      <h4>Manufacturing & Supply Chain</h4>
      <p>PO processing, inventory tracking, supplier coordination, quality alerts.</p>
      <span class="ind-badge ind-india">🇮🇳 Strong India Market</span>
    </div>
    <div class="industry-card">
      <span class="ind-emoji">🛒</span>
      <h4>E-Commerce & D2C Brands</h4>
      <p>Customer support bots, order automation, returns processing, reviews AI.</p>
      <span class="ind-badge ind-both">🌍 India + Global</span>
    </div>
    <div class="industry-card">
      <span class="ind-emoji">🏥</span>
      <h4>Healthcare & Clinics</h4>
      <p>Appointment bots, patient follow-ups, prescription reminders, billing workflows.</p>
      <span class="ind-badge ind-both">🌍 India + Global</span>
    </div>
    <div class="industry-card">
      <span class="ind-emoji">🏦</span>
      <h4>Finance, CA & Legal Firms</h4>
      <p>Document extraction, compliance checklists, client onboarding, invoice AI.</p>
      <span class="ind-badge ind-india">🇮🇳 Strong India Market</span>
    </div>
    <div class="industry-card">
      <span class="ind-emoji">🏠</span>
      <h4>Real Estate</h4>
      <p>Lead qualification funnels, WhatsApp AI, property matching bots, CRM automation.</p>
      <span class="ind-badge ind-both">🌍 India + Global</span>
    </div>
    <div class="industry-card">
      <span class="ind-emoji">🎓</span>
      <h4>EdTech & Coaching</h4>
      <p>Student enquiry bots, admission funnels, fee reminders, performance dashboards.</p>
      <span class="ind-badge ind-india">🇮🇳 Growing fast in India</span>
    </div>
    <div class="industry-card">
      <span class="ind-emoji">🚚</span>
      <h4>Logistics & 3PL</h4>
      <p>Tracking automation, delivery notifications, vendor communication, dispute AI.</p>
      <span class="ind-badge ind-global">🌍 Global / GCC</span>
    </div>
    <div class="industry-card">
      <span class="ind-emoji">🧑‍💼</span>
      <h4>HR & Recruitment</h4>
      <p>Resume screening AI, interview scheduling bots, onboarding automation, payroll alerts.</p>
      <span class="ind-badge ind-global">🌍 Global Outsourcing</span>
    </div>
  </div>
</section>

<!-- ─── HOW IT WORKS ─── -->
<section class="hiw-section" id="how-it-works">
  <p class="section-tag">Our Process</p>
  <h2 class="section-title">From pain point to live automation in 3 steps</h2>

  <div class="hiw-steps">
    <div class="hiw-step">
      <div class="step-num s1">01</div>
      <h3>Free AI Audit (30 mins)</h3>
      <p>We do a free call to understand your current workflows. We identify where your team is losing the most time to manual, repetitive tasks. You leave with a clear "automation priority map" — even if you don't hire us.</p>
    </div>
    <div class="hiw-step">
      <div class="step-num s2">02</div>
      <h3>Build & Test (1–2 weeks)</h3>
      <p>We build your first automation using low-cost, proven tools like n8n, Make.com, and GPT-4o. You see a live working prototype fast — usually within 5–10 business days. No long contracts, no big upfront.</p>
    </div>
    <div class="hiw-step">
      <div class="step-num s3">03</div>
      <h3>Go Live & Measure ROI</h3>
      <p>We deploy, monitor, and measure. You see the hours saved and the cost reduction. Happy? We expand to the next automation. You only pay for real, working results — not promises.</p>
    </div>
  </div>
</section>

<!-- ─── LOW-COST TOOLS ─── -->
<section class="tools-section" id="tools">
  <div class="tools-intro">
    <div>
      <p class="section-tag">Cost-Smart AI Stack</p>
      <h2 class="section-title">Powerful AI tools. Surprisingly affordable.</h2>
      <p class="section-body">
        You don't need a ₹50L budget to start with AI. We use a carefully chosen stack of tools that deliver enterprise-grade results at startup prices. Our approach: start lean, prove ROI, then scale.
      </p>
      <br>
      <p class="section-body" style="font-size:0.88rem; color: var(--muted);">
        For context: n8n (our core automation tool) can be self-hosted on a $5/month server and automate hundreds of workflows — the same capability that costs $500+/month on enterprise tools.
      </p>
    </div>
    <div class="tools-grid">
      <div class="tool-pill">🔧 n8n <span class="t-cost">FREE*</span></div>
      <div class="tool-pill">⚙️ Make.com <span class="t-cost">$9/mo</span></div>
      <div class="tool-pill">🤖 GPT-4o <span class="t-cost">Pay/use</span></div>
      <div class="tool-pill">💬 Voiceflow <span class="t-cost">Free tier</span></div>
      <div class="tool-pill">📊 Metabase <span class="t-cost">FREE</span></div>
      <div class="tool-pill">📧 Brevo <span class="t-cost">Free tier</span></div>
      <div class="tool-pill">🔌 Zapier <span class="t-cost">$20/mo</span></div>
      <div class="tool-pill">📦 Supabase <span class="t-cost">Free tier</span></div>
      <div class="tool-pill">☁️ Vercel <span class="t-cost">FREE</span></div>
    </div>
  </div>
</section>

<!-- ─── BRAND STRATEGY ─── -->
<section class="brand-section" id="brand">
  <p class="section-tag">Brand Strategy Notes</p>
  <h2 class="section-title">Why "LaunchLayer" Works — and How to Position It</h2>
  <p class="section-body">Here's a clear breakdown of how to think about your name, positioning, and messaging for both India and global markets.</p>

  <div class="brand-grid">
    <div class="brand-card">
      <h4>✅ The Name: LaunchLayer</h4>
      <ul>
        <li>Strong name — "Launch" signals speed and growth; "Layer" signals building blocks, tech depth, and stacking capabilities</li>
        <li>Memorable and pronounceable in English, Hindi, and most global markets</li>
        <li>Works both as a brand and a positioning statement — "We lay the AI layer under your business"</li>
        <li>Domain-friendly and not overused in the market</li>
        <li>Tagline suggestion: <strong style="color:var(--amber)">"Work Less. Automate More. Grow Faster."</strong></li>
        <li>Alternative tagline: <strong style="color:var(--amber)">"The AI Layer Your Business Was Missing."</strong></li>
      </ul>
    </div>
    <div class="brand-card">
      <h4>🎯 India vs Global Positioning</h4>
      <ul>
        <li><strong style="color:var(--white)">India:</strong> Lead with cost savings in INR, use WhatsApp-first approach, highlight Tally/Zoho/GST integrations, use simple jargon-free language</li>
        <li><strong style="color:var(--white)">Global:</strong> Lead with ROI and hours saved, emphasize data security, use USD pricing, highlight international compliance</li>
        <li>Use <strong style="color:var(--amber)">case studies in local contexts</strong> — Indian manufacturing examples for India, UAE logistics for GCC clients</li>
        <li>On LinkedIn: post in English for global, create a separate Hindi/regional content strategy for India outreach</li>
        <li>Keep pricing visible for India (₹ + $), builds trust for both markets</li>
      </ul>
    </div>
    <div class="brand-card">
      <h4>💰 Low-Cost Launch Strategy</h4>
      <ul>
        <li><strong style="color:var(--white)">Phase 1 (Month 1–3):</strong> Free GitHub Pages hosting, n8n self-hosted ($5/mo VPS), free tier tools only. Total: ~$20/month</li>
        <li><strong style="color:var(--white)">Phase 2 (Month 3–6):</strong> Buy a .com domain (~$12/yr), upgrade n8n, basic LinkedIn ads (₹5,000/mo). Total: ~$60/month</li>
        <li><strong style="color:var(--white)">Phase 3 (6mo+):</strong> Hire part-time freelancers, upgrade tools as revenue scales. Reinvest 30% of revenue</li>
        <li>Lead gen: Start with LinkedIn organic posts, WhatsApp groups, and referrals — zero cost</li>
        <li>Offer <strong style="color:var(--amber)">free AI audits</strong> as the top-of-funnel — converts 30%+ of prospects</li>
      </ul>
    </div>
    <div class="brand-card">
      <h4>📣 Lead Generation Funnel</h4>
      <ul>
        <li><strong style="color:var(--white)">Awareness:</strong> LinkedIn posts with real stats ("We saved a Mumbai CA firm 40 hrs/month"), YouTube Shorts showing automations in action</li>
        <li><strong style="color:var(--white)">Lead Magnet:</strong> Free "AI Automation Audit" call OR a free PDF "5 Workflows Any Indian SME Should Automate"</li>
        <li><strong style="color:var(--white)">Nurture:</strong> WhatsApp follow-up sequence (set up using n8n + Brevo — free)</li>
        <li><strong style="color:var(--white)">Convert:</strong> Discovery call → custom proposal → pilot project (₹15,000–₹50,000 first engagement)</li>
        <li><strong style="color:var(--white)">Expand:</strong> Retainer model post-pilot — aim for ₹25,000–₹75,000/month per client</li>
      </ul>
    </div>
  </div>
</section>

<!-- ─── PRICING ─── -->
<section class="pricing-section" id="pricing">
  <div style="text-align:center; margin-bottom: 1rem;">
    <p class="section-tag">Simple Pricing</p>
    <h2 class="section-title" style="margin: 0 auto; text-align:center;">Start small. Scale as you grow.</h2>
    <p class="section-body" style="text-align:center; margin: 1rem auto 0;">No long-term lock-in. No surprise bills. Just clear outcomes.</p>
  </div>

  <div class="pricing-grid">
    <div class="pricing-card">
      <h3>Starter</h3>
      <div class="pricing-price">$30 <span>/ hour</span></div>
      <p class="pricing-desc">Perfect for one-off automations and quick fixes. Pay only for what you need.</p>
      <ul class="pricing-features">
        <li>Single workflow automation build</li>
        <li>Integration with 1–2 apps</li>
        <li>Testing & handover documentation</li>
        <li>1 week of post-launch support</li>
        <li>Free 30-min audit call included</li>
      </ul>
      <a href="#contact" class="pricing-btn">Start with Hourly →</a>
    </div>

    <div class="pricing-card featured">
      <div class="featured-tag">Most Popular</div>
      <h3>Growth</h3>
      <div class="pricing-price">$400 <span>/ month</span></div>
      <p class="pricing-desc">10–20 hrs/month of dedicated automation + consulting. Best for growing SMEs.</p>
      <ul class="pricing-features">
        <li>Up to 3 workflow automations/month</li>
        <li>AI chatbot setup & management</li>
        <li>Monthly performance review & ROI report</li>
        <li>Priority WhatsApp support</li>
        <li>Dedicated solutions consultant</li>
        <li>Indian billing available (₹33,000/mo)</li>
      </ul>
      <a href="#contact" class="pricing-btn featured-btn">Book Free Audit First →</a>
    </div>

    <div class="pricing-card">
      <h3>Enterprise</h3>
      <div class="pricing-price">Custom</div>
      <p class="pricing-desc">Full-stack AI transformation for larger businesses with complex workflows.</p>
      <ul class="pricing-features">
        <li>Unlimited workflow scope</li>
        <li>Full ERP/CRM/API integration</li>
        <li>AI agents & custom LLM builds</li>
        <li>Dedicated team pod</li>
        <li>SLA-backed delivery</li>
        <li>NDAs & enterprise security</li>
      </ul>
      <a href="#contact" class="pricing-btn">Talk to Us →</a>
    </div>
  </div>
</section>

<!-- ─── CONTACT ─── -->
<section class="contact-section" id="contact">
  <div class="contact-info">
    <p class="section-tag">Let's Talk</p>
    <h3>Get your free AI Audit. No sales pitch. Just insights.</h3>
    <p class="section-body">We'll spend 30 minutes understanding your business and tell you exactly where AI can save you time and money — even if you don't hire us. Zero pressure.</p>

    <br>

    <div class="contact-item">
      <div class="contact-icon">📧</div>
      <div class="contact-detail">
        <h5>Email</h5>
        <a href="mailto:launchlayer.tech@gmail.com">launchlayer.tech@gmail.com</a>
      </div>
    </div>

    <div class="contact-item">
      <div class="contact-icon">💬</div>
      <div class="contact-detail">
        <h5>WhatsApp (India)</h5>
        <a href="https://wa.me/919831014716">+91 98310 14716</a>
      </div>
    </div>

    <div class="contact-item">
      <div class="contact-icon">🌍</div>
      <div class="contact-detail">
        <h5>Serving</h5>
        <a href="#">India 🇮🇳 · UAE 🇦🇪 · UK 🇬🇧 · USA 🇺🇸 · Australia 🇦🇺</a>
      </div>
    </div>

    <div class="availability-badge">
      <span class="avail-dot"></span>
      Currently accepting new projects
    </div>
  </div>

  <div class="contact-form">
    <h4 style="font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:700;color:var(--white);margin-bottom:1.5rem;">Book your free AI Audit</h4>
    <div class="form-row">
      <div class="form-group">
        <label>Your Name</label>
        <input type="text" placeholder="Rahul Sharma">
      </div>
      <div class="form-group">
        <label>Business Name</label>
        <input type="text" placeholder="Sharma Exports Pvt Ltd">
      </div>
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" placeholder="rahul@company.com">
    </div>
    <div class="form-group">
      <label>Industry</label>
      <select>
        <option value="">Select your industry...</option>
        <option>Manufacturing & Supply Chain</option>
        <option>E-Commerce / D2C</option>
        <option>Healthcare / Clinic</option>
        <option>Finance / CA / Legal</option>
        <option>Real Estate</option>
        <option>EdTech / Coaching</option>
        <option>Logistics / 3PL</option>
        <option>HR / Recruitment</option>
        <option>Other</option>
      </select>
    </div>
    <div class="form-group">
      <label>What's your biggest time-wasting manual process?</label>
      <textarea placeholder="e.g. We manually copy data from emails to Excel every day, takes 3 hours..."></textarea>
    </div>
    <button class="btn-primary" style="width:100%; border:none; font-size:1rem;">Book Free 30-min Audit →</button>
  </div>
</section>

<!-- ─── FOOTER ─── -->
<footer>
  <div class="footer-brand">
    <h3>LaunchLayer</h3>
    <p>AI automation agency serving Indian SMEs and global businesses. We replace manual work with intelligent workflows that save time and money.</p>
    <br>
    <p style="font-size:0.78rem; color: var(--muted);">The AI layer your business was missing.</p>
  </div>
  <div class="footer-col">
    <h4>Services</h4>
    <ul>
      <li><a href="#">AI Workflow Automation</a></li>
      <li><a href="#">AI Chatbots</a></li>
      <li><a href="#">Reporting & Analytics</a></li>
      <li><a href="#">Document Intelligence</a></li>
      <li><a href="#">Systems Integration</a></li>
      <li><a href="#">Lead Gen Automation</a></li>
    </ul>
  </div>
  <div class="footer-col">
    <h4>Company</h4>
    <ul>
      <li><a href="#">About Us</a></li>
      <li><a href="#">Case Studies</a></li>
      <li><a href="#">Blog</a></li>
      <li><a href="#">Careers</a></li>
      <li><a href="#">Privacy Policy</a></li>
    </ul>
  </div>
  <div class="footer-col">
    <h4>Contact</h4>
    <ul>
      <li><a href="mailto:launchlayer.tech@gmail.com">launchlayer.tech@gmail.com</a></li>
      <li><a href="https://wa.me/919831014716">WhatsApp India</a></li>
      <li><a href="#">Book a Call</a></li>
      <li><a href="#">LinkedIn</a></li>
    </ul>
  </div>
</footer>

<div class="footer-bottom">
  <p>© 2026 LaunchLayer. All rights reserved. Built with AI. Powered by purpose.</p>
  <div class="footer-flags">
    <span>Serving:</span>
    🇮🇳 🇦🇪 🇬🇧 🇺🇸 🇦🇺
  </div>
</div>

</body>
</html>
`;function Tf(){return Js.jsx("div",{dangerouslySetInnerHTML:{__html:If}})}const Lf=ec(document.getElementById("root"));Lf.render(Js.jsx(Tf,{}));
