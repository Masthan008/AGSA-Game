var Lf=Object.defineProperty;var Mf=(e,t,n)=>t in e?Lf(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ct=(e,t,n)=>Mf(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function Rf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var cu={exports:{}},Eo={},du={exports:{}},Z={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ii=Symbol.for("react.element"),Bf=Symbol.for("react.portal"),qf=Symbol.for("react.fragment"),Df=Symbol.for("react.strict_mode"),Wf=Symbol.for("react.profiler"),Uf=Symbol.for("react.provider"),$f=Symbol.for("react.context"),Vf=Symbol.for("react.forward_ref"),Hf=Symbol.for("react.suspense"),Kf=Symbol.for("react.memo"),Gf=Symbol.for("react.lazy"),xc=Symbol.iterator;function Qf(e){return e===null||typeof e!="object"?null:(e=xc&&e[xc]||e["@@iterator"],typeof e=="function"?e:null)}var uu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},hu=Object.assign,pu={};function lr(e,t,n){this.props=e,this.context=t,this.refs=pu,this.updater=n||uu}lr.prototype.isReactComponent={};lr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};lr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function fu(){}fu.prototype=lr.prototype;function sl(e,t,n){this.props=e,this.context=t,this.refs=pu,this.updater=n||uu}var al=sl.prototype=new fu;al.constructor=sl;hu(al,lr.prototype);al.isPureReactComponent=!0;var kc=Array.isArray,mu=Object.prototype.hasOwnProperty,ll={current:null},gu={key:!0,ref:!0,__self:!0,__source:!0};function yu(e,t,n){var r,i={},o=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(o=""+t.key),t)mu.call(t,r)&&!gu.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:ii,type:e,key:o,ref:s,props:i,_owner:ll.current}}function Xf(e,t){return{$$typeof:ii,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function cl(e){return typeof e=="object"&&e!==null&&e.$$typeof===ii}function Yf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var wc=/\/+/g;function ss(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Yf(""+e.key):t.toString(36)}function Li(e,t,n,r,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case ii:case Bf:s=!0}}if(s)return s=e,i=i(s),e=r===""?"."+ss(s,0):r,kc(i)?(n="",e!=null&&(n=e.replace(wc,"$&/")+"/"),Li(i,t,n,"",function(u){return u})):i!=null&&(cl(i)&&(i=Xf(i,n+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(wc,"$&/")+"/")+e)),t.push(i)),1;if(s=0,r=r===""?".":r+":",kc(e))for(var l=0;l<e.length;l++){o=e[l];var c=r+ss(o,l);s+=Li(o,t,n,c,i)}else if(c=Qf(e),typeof c=="function")for(e=c.call(e),l=0;!(o=e.next()).done;)o=o.value,c=r+ss(o,l++),s+=Li(o,t,n,c,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function hi(e,t,n){if(e==null)return e;var r=[],i=0;return Li(e,r,"","",function(o){return t.call(n,o,i++)}),r}function Zf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Be={current:null},Mi={transition:null},Jf={ReactCurrentDispatcher:Be,ReactCurrentBatchConfig:Mi,ReactCurrentOwner:ll};function vu(){throw Error("act(...) is not supported in production builds of React.")}Z.Children={map:hi,forEach:function(e,t,n){hi(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return hi(e,function(){t++}),t},toArray:function(e){return hi(e,function(t){return t})||[]},only:function(e){if(!cl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Z.Component=lr;Z.Fragment=qf;Z.Profiler=Wf;Z.PureComponent=sl;Z.StrictMode=Df;Z.Suspense=Hf;Z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Jf;Z.act=vu;Z.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=hu({},e.props),i=e.key,o=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,s=ll.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)mu.call(t,c)&&!gu.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];r.children=l}return{$$typeof:ii,type:e.type,key:i,ref:o,props:r,_owner:s}};Z.createContext=function(e){return e={$$typeof:$f,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Uf,_context:e},e.Consumer=e};Z.createElement=yu;Z.createFactory=function(e){var t=yu.bind(null,e);return t.type=e,t};Z.createRef=function(){return{current:null}};Z.forwardRef=function(e){return{$$typeof:Vf,render:e}};Z.isValidElement=cl;Z.lazy=function(e){return{$$typeof:Gf,_payload:{_status:-1,_result:e},_init:Zf}};Z.memo=function(e,t){return{$$typeof:Kf,type:e,compare:t===void 0?null:t}};Z.startTransition=function(e){var t=Mi.transition;Mi.transition={};try{e()}finally{Mi.transition=t}};Z.unstable_act=vu;Z.useCallback=function(e,t){return Be.current.useCallback(e,t)};Z.useContext=function(e){return Be.current.useContext(e)};Z.useDebugValue=function(){};Z.useDeferredValue=function(e){return Be.current.useDeferredValue(e)};Z.useEffect=function(e,t){return Be.current.useEffect(e,t)};Z.useId=function(){return Be.current.useId()};Z.useImperativeHandle=function(e,t,n){return Be.current.useImperativeHandle(e,t,n)};Z.useInsertionEffect=function(e,t){return Be.current.useInsertionEffect(e,t)};Z.useLayoutEffect=function(e,t){return Be.current.useLayoutEffect(e,t)};Z.useMemo=function(e,t){return Be.current.useMemo(e,t)};Z.useReducer=function(e,t,n){return Be.current.useReducer(e,t,n)};Z.useRef=function(e){return Be.current.useRef(e)};Z.useState=function(e){return Be.current.useState(e)};Z.useSyncExternalStore=function(e,t,n){return Be.current.useSyncExternalStore(e,t,n)};Z.useTransition=function(){return Be.current.useTransition()};Z.version="18.3.1";du.exports=Z;var z=du.exports;const j=Rf(z);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var em=z,tm=Symbol.for("react.element"),nm=Symbol.for("react.fragment"),rm=Object.prototype.hasOwnProperty,im=em.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,om={key:!0,ref:!0,__self:!0,__source:!0};function xu(e,t,n){var r,i={},o=null,s=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)rm.call(t,r)&&!om.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:tm,type:e,key:o,ref:s,props:i,_owner:im.current}}Eo.Fragment=nm;Eo.jsx=xu;Eo.jsxs=xu;cu.exports=Eo;var a=cu.exports,Zs={},ku={exports:{}},Je={},wu={exports:{}},bu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(E,I){var y=E.length;E.push(I);e:for(;0<y;){var k=y-1>>>1,F=E[k];if(0<i(F,I))E[k]=I,E[y]=F,y=k;else break e}}function n(E){return E.length===0?null:E[0]}function r(E){if(E.length===0)return null;var I=E[0],y=E.pop();if(y!==I){E[0]=y;e:for(var k=0,F=E.length,W=F>>>1;k<W;){var H=2*(k+1)-1,X=E[H],Q=H+1,$=E[Q];if(0>i(X,y))Q<F&&0>i($,X)?(E[k]=$,E[Q]=y,k=Q):(E[k]=X,E[H]=y,k=H);else if(Q<F&&0>i($,y))E[k]=$,E[Q]=y,k=Q;else break e}}return I}function i(E,I){var y=E.sortIndex-I.sortIndex;return y!==0?y:E.id-I.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,l=s.now();e.unstable_now=function(){return s.now()-l}}var c=[],u=[],d=1,h=null,p=3,x=!1,b=!1,v=!1,A=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(E){for(var I=n(u);I!==null;){if(I.callback===null)r(u);else if(I.startTime<=E)r(u),I.sortIndex=I.expirationTime,t(c,I);else break;I=n(u)}}function w(E){if(v=!1,m(E),!b)if(n(c)!==null)b=!0,ve(S);else{var I=n(u);I!==null&&O(w,I.startTime-E)}}function S(E,I){b=!1,v&&(v=!1,g(C),C=-1),x=!0;var y=p;try{for(m(I),h=n(c);h!==null&&(!(h.expirationTime>I)||E&&!L());){var k=h.callback;if(typeof k=="function"){h.callback=null,p=h.priorityLevel;var F=k(h.expirationTime<=I);I=e.unstable_now(),typeof F=="function"?h.callback=F:h===n(c)&&r(c),m(I)}else r(c);h=n(c)}if(h!==null)var W=!0;else{var H=n(u);H!==null&&O(w,H.startTime-I),W=!1}return W}finally{h=null,p=y,x=!1}}var N=!1,T=null,C=-1,M=5,R=-1;function L(){return!(e.unstable_now()-R<M)}function V(){if(T!==null){var E=e.unstable_now();R=E;var I=!0;try{I=T(!0,E)}finally{I?K():(N=!1,T=null)}}else N=!1}var K;if(typeof f=="function")K=function(){f(V)};else if(typeof MessageChannel<"u"){var G=new MessageChannel,ie=G.port2;G.port1.onmessage=V,K=function(){ie.postMessage(null)}}else K=function(){A(V,0)};function ve(E){T=E,N||(N=!0,K())}function O(E,I){C=A(function(){E(e.unstable_now())},I)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){b||x||(b=!0,ve(S))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(E){switch(p){case 1:case 2:case 3:var I=3;break;default:I=p}var y=p;p=I;try{return E()}finally{p=y}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,I){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var y=p;p=E;try{return I()}finally{p=y}},e.unstable_scheduleCallback=function(E,I,y){var k=e.unstable_now();switch(typeof y=="object"&&y!==null?(y=y.delay,y=typeof y=="number"&&0<y?k+y:k):y=k,E){case 1:var F=-1;break;case 2:F=250;break;case 5:F=1073741823;break;case 4:F=1e4;break;default:F=5e3}return F=y+F,E={id:d++,callback:I,priorityLevel:E,startTime:y,expirationTime:F,sortIndex:-1},y>k?(E.sortIndex=y,t(u,E),n(c)===null&&E===n(u)&&(v?(g(C),C=-1):v=!0,O(w,y-k))):(E.sortIndex=F,t(c,E),b||x||(b=!0,ve(S))),E},e.unstable_shouldYield=L,e.unstable_wrapCallback=function(E){var I=p;return function(){var y=p;p=I;try{return E.apply(this,arguments)}finally{p=y}}}})(bu);wu.exports=bu;var sm=wu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var am=z,Ze=sm;function P(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Su=new Set,Mr={};function Tn(e,t){er(e,t),er(e+"Capture",t)}function er(e,t){for(Mr[e]=t,e=0;e<t.length;e++)Su.add(t[e])}var zt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Js=Object.prototype.hasOwnProperty,lm=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,bc={},Sc={};function cm(e){return Js.call(Sc,e)?!0:Js.call(bc,e)?!1:lm.test(e)?Sc[e]=!0:(bc[e]=!0,!1)}function dm(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function um(e,t,n,r){if(t===null||typeof t>"u"||dm(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function qe(e,t,n,r,i,o,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var Ae={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ae[e]=new qe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ae[t]=new qe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ae[e]=new qe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ae[e]=new qe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ae[e]=new qe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ae[e]=new qe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ae[e]=new qe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ae[e]=new qe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ae[e]=new qe(e,5,!1,e.toLowerCase(),null,!1,!1)});var dl=/[\-:]([a-z])/g;function ul(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(dl,ul);Ae[t]=new qe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(dl,ul);Ae[t]=new qe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(dl,ul);Ae[t]=new qe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ae[e]=new qe(e,1,!1,e.toLowerCase(),null,!1,!1)});Ae.xlinkHref=new qe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ae[e]=new qe(e,1,!1,e.toLowerCase(),null,!0,!0)});function hl(e,t,n,r){var i=Ae.hasOwnProperty(t)?Ae[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(um(t,n,i,r)&&(n=null),r||i===null?cm(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Lt=am.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,pi=Symbol.for("react.element"),_n=Symbol.for("react.portal"),Ln=Symbol.for("react.fragment"),pl=Symbol.for("react.strict_mode"),ea=Symbol.for("react.profiler"),Nu=Symbol.for("react.provider"),ju=Symbol.for("react.context"),fl=Symbol.for("react.forward_ref"),ta=Symbol.for("react.suspense"),na=Symbol.for("react.suspense_list"),ml=Symbol.for("react.memo"),Dt=Symbol.for("react.lazy"),Cu=Symbol.for("react.offscreen"),Nc=Symbol.iterator;function hr(e){return e===null||typeof e!="object"?null:(e=Nc&&e[Nc]||e["@@iterator"],typeof e=="function"?e:null)}var fe=Object.assign,as;function wr(e){if(as===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);as=t&&t[1]||""}return`
`+as+e}var ls=!1;function cs(e,t){if(!e||ls)return"";ls=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),o=r.stack.split(`
`),s=i.length-1,l=o.length-1;1<=s&&0<=l&&i[s]!==o[l];)l--;for(;1<=s&&0<=l;s--,l--)if(i[s]!==o[l]){if(s!==1||l!==1)do if(s--,l--,0>l||i[s]!==o[l]){var c=`
`+i[s].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=s&&0<=l);break}}}finally{ls=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?wr(e):""}function hm(e){switch(e.tag){case 5:return wr(e.type);case 16:return wr("Lazy");case 13:return wr("Suspense");case 19:return wr("SuspenseList");case 0:case 2:case 15:return e=cs(e.type,!1),e;case 11:return e=cs(e.type.render,!1),e;case 1:return e=cs(e.type,!0),e;default:return""}}function ra(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ln:return"Fragment";case _n:return"Portal";case ea:return"Profiler";case pl:return"StrictMode";case ta:return"Suspense";case na:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ju:return(e.displayName||"Context")+".Consumer";case Nu:return(e._context.displayName||"Context")+".Provider";case fl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ml:return t=e.displayName||null,t!==null?t:ra(e.type)||"Memo";case Dt:t=e._payload,e=e._init;try{return ra(e(t))}catch{}}return null}function pm(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ra(t);case 8:return t===pl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function sn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Au(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function fm(e){var t=Au(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(s){r=""+s,o.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function fi(e){e._valueTracker||(e._valueTracker=fm(e))}function Iu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Au(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Yi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ia(e,t){var n=t.checked;return fe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function jc(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=sn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ou(e,t){t=t.checked,t!=null&&hl(e,"checked",t,!1)}function oa(e,t){Ou(e,t);var n=sn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?sa(e,t.type,n):t.hasOwnProperty("defaultValue")&&sa(e,t.type,sn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Cc(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function sa(e,t,n){(t!=="number"||Yi(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var br=Array.isArray;function Gn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+sn(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function aa(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(P(91));return fe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ac(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(P(92));if(br(n)){if(1<n.length)throw Error(P(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:sn(n)}}function Tu(e,t){var n=sn(t.value),r=sn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ic(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Eu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function la(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Eu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var mi,zu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(mi=mi||document.createElement("div"),mi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=mi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Rr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Cr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},mm=["Webkit","ms","Moz","O"];Object.keys(Cr).forEach(function(e){mm.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Cr[t]=Cr[e]})});function Pu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Cr.hasOwnProperty(e)&&Cr[e]?(""+t).trim():t+"px"}function Fu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Pu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var gm=fe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ca(e,t){if(t){if(gm[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(P(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(P(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(P(61))}if(t.style!=null&&typeof t.style!="object")throw Error(P(62))}}function da(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ua=null;function gl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ha=null,Qn=null,Xn=null;function Oc(e){if(e=ai(e)){if(typeof ha!="function")throw Error(P(280));var t=e.stateNode;t&&(t=Lo(t),ha(e.stateNode,e.type,t))}}function _u(e){Qn?Xn?Xn.push(e):Xn=[e]:Qn=e}function Lu(){if(Qn){var e=Qn,t=Xn;if(Xn=Qn=null,Oc(e),t)for(e=0;e<t.length;e++)Oc(t[e])}}function Mu(e,t){return e(t)}function Ru(){}var ds=!1;function Bu(e,t,n){if(ds)return e(t,n);ds=!0;try{return Mu(e,t,n)}finally{ds=!1,(Qn!==null||Xn!==null)&&(Ru(),Lu())}}function Br(e,t){var n=e.stateNode;if(n===null)return null;var r=Lo(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(P(231,t,typeof n));return n}var pa=!1;if(zt)try{var pr={};Object.defineProperty(pr,"passive",{get:function(){pa=!0}}),window.addEventListener("test",pr,pr),window.removeEventListener("test",pr,pr)}catch{pa=!1}function ym(e,t,n,r,i,o,s,l,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var Ar=!1,Zi=null,Ji=!1,fa=null,vm={onError:function(e){Ar=!0,Zi=e}};function xm(e,t,n,r,i,o,s,l,c){Ar=!1,Zi=null,ym.apply(vm,arguments)}function km(e,t,n,r,i,o,s,l,c){if(xm.apply(this,arguments),Ar){if(Ar){var u=Zi;Ar=!1,Zi=null}else throw Error(P(198));Ji||(Ji=!0,fa=u)}}function En(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function qu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Tc(e){if(En(e)!==e)throw Error(P(188))}function wm(e){var t=e.alternate;if(!t){if(t=En(e),t===null)throw Error(P(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return Tc(i),e;if(o===r)return Tc(i),t;o=o.sibling}throw Error(P(188))}if(n.return!==r.return)n=i,r=o;else{for(var s=!1,l=i.child;l;){if(l===n){s=!0,n=i,r=o;break}if(l===r){s=!0,r=i,n=o;break}l=l.sibling}if(!s){for(l=o.child;l;){if(l===n){s=!0,n=o,r=i;break}if(l===r){s=!0,r=o,n=i;break}l=l.sibling}if(!s)throw Error(P(189))}}if(n.alternate!==r)throw Error(P(190))}if(n.tag!==3)throw Error(P(188));return n.stateNode.current===n?e:t}function Du(e){return e=wm(e),e!==null?Wu(e):null}function Wu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Wu(e);if(t!==null)return t;e=e.sibling}return null}var Uu=Ze.unstable_scheduleCallback,Ec=Ze.unstable_cancelCallback,bm=Ze.unstable_shouldYield,Sm=Ze.unstable_requestPaint,ge=Ze.unstable_now,Nm=Ze.unstable_getCurrentPriorityLevel,yl=Ze.unstable_ImmediatePriority,$u=Ze.unstable_UserBlockingPriority,eo=Ze.unstable_NormalPriority,jm=Ze.unstable_LowPriority,Vu=Ze.unstable_IdlePriority,zo=null,bt=null;function Cm(e){if(bt&&typeof bt.onCommitFiberRoot=="function")try{bt.onCommitFiberRoot(zo,e,void 0,(e.current.flags&128)===128)}catch{}}var ht=Math.clz32?Math.clz32:Om,Am=Math.log,Im=Math.LN2;function Om(e){return e>>>=0,e===0?32:31-(Am(e)/Im|0)|0}var gi=64,yi=4194304;function Sr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function to(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,s=n&268435455;if(s!==0){var l=s&~i;l!==0?r=Sr(l):(o&=s,o!==0&&(r=Sr(o)))}else s=n&~i,s!==0?r=Sr(s):o!==0&&(r=Sr(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-ht(t),i=1<<n,r|=e[n],t&=~i;return r}function Tm(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Em(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-ht(o),l=1<<s,c=i[s];c===-1?(!(l&n)||l&r)&&(i[s]=Tm(l,t)):c<=t&&(e.expiredLanes|=l),o&=~l}}function ma(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Hu(){var e=gi;return gi<<=1,!(gi&4194240)&&(gi=64),e}function us(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function oi(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ht(t),e[t]=n}function zm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-ht(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}function vl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ht(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var ee=0;function Ku(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Gu,xl,Qu,Xu,Yu,ga=!1,vi=[],Yt=null,Zt=null,Jt=null,qr=new Map,Dr=new Map,$t=[],Pm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function zc(e,t){switch(e){case"focusin":case"focusout":Yt=null;break;case"dragenter":case"dragleave":Zt=null;break;case"mouseover":case"mouseout":Jt=null;break;case"pointerover":case"pointerout":qr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Dr.delete(t.pointerId)}}function fr(e,t,n,r,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},t!==null&&(t=ai(t),t!==null&&xl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Fm(e,t,n,r,i){switch(t){case"focusin":return Yt=fr(Yt,e,t,n,r,i),!0;case"dragenter":return Zt=fr(Zt,e,t,n,r,i),!0;case"mouseover":return Jt=fr(Jt,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return qr.set(o,fr(qr.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,Dr.set(o,fr(Dr.get(o)||null,e,t,n,r,i)),!0}return!1}function Zu(e){var t=mn(e.target);if(t!==null){var n=En(t);if(n!==null){if(t=n.tag,t===13){if(t=qu(n),t!==null){e.blockedOn=t,Yu(e.priority,function(){Qu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ri(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ya(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ua=r,n.target.dispatchEvent(r),ua=null}else return t=ai(n),t!==null&&xl(t),e.blockedOn=n,!1;t.shift()}return!0}function Pc(e,t,n){Ri(e)&&n.delete(t)}function _m(){ga=!1,Yt!==null&&Ri(Yt)&&(Yt=null),Zt!==null&&Ri(Zt)&&(Zt=null),Jt!==null&&Ri(Jt)&&(Jt=null),qr.forEach(Pc),Dr.forEach(Pc)}function mr(e,t){e.blockedOn===t&&(e.blockedOn=null,ga||(ga=!0,Ze.unstable_scheduleCallback(Ze.unstable_NormalPriority,_m)))}function Wr(e){function t(i){return mr(i,e)}if(0<vi.length){mr(vi[0],e);for(var n=1;n<vi.length;n++){var r=vi[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Yt!==null&&mr(Yt,e),Zt!==null&&mr(Zt,e),Jt!==null&&mr(Jt,e),qr.forEach(t),Dr.forEach(t),n=0;n<$t.length;n++)r=$t[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<$t.length&&(n=$t[0],n.blockedOn===null);)Zu(n),n.blockedOn===null&&$t.shift()}var Yn=Lt.ReactCurrentBatchConfig,no=!0;function Lm(e,t,n,r){var i=ee,o=Yn.transition;Yn.transition=null;try{ee=1,kl(e,t,n,r)}finally{ee=i,Yn.transition=o}}function Mm(e,t,n,r){var i=ee,o=Yn.transition;Yn.transition=null;try{ee=4,kl(e,t,n,r)}finally{ee=i,Yn.transition=o}}function kl(e,t,n,r){if(no){var i=ya(e,t,n,r);if(i===null)ws(e,t,r,ro,n),zc(e,r);else if(Fm(i,e,t,n,r))r.stopPropagation();else if(zc(e,r),t&4&&-1<Pm.indexOf(e)){for(;i!==null;){var o=ai(i);if(o!==null&&Gu(o),o=ya(e,t,n,r),o===null&&ws(e,t,r,ro,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else ws(e,t,r,null,n)}}var ro=null;function ya(e,t,n,r){if(ro=null,e=gl(r),e=mn(e),e!==null)if(t=En(e),t===null)e=null;else if(n=t.tag,n===13){if(e=qu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ro=e,null}function Ju(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Nm()){case yl:return 1;case $u:return 4;case eo:case jm:return 16;case Vu:return 536870912;default:return 16}default:return 16}}var Gt=null,wl=null,Bi=null;function eh(){if(Bi)return Bi;var e,t=wl,n=t.length,r,i="value"in Gt?Gt.value:Gt.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===i[o-r];r++);return Bi=i.slice(e,1<r?1-r:void 0)}function qi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function xi(){return!0}function Fc(){return!1}function et(e){function t(n,r,i,o,s){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?xi:Fc,this.isPropagationStopped=Fc,this}return fe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=xi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=xi)},persist:function(){},isPersistent:xi}),t}var cr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},bl=et(cr),si=fe({},cr,{view:0,detail:0}),Rm=et(si),hs,ps,gr,Po=fe({},si,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Sl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==gr&&(gr&&e.type==="mousemove"?(hs=e.screenX-gr.screenX,ps=e.screenY-gr.screenY):ps=hs=0,gr=e),hs)},movementY:function(e){return"movementY"in e?e.movementY:ps}}),_c=et(Po),Bm=fe({},Po,{dataTransfer:0}),qm=et(Bm),Dm=fe({},si,{relatedTarget:0}),fs=et(Dm),Wm=fe({},cr,{animationName:0,elapsedTime:0,pseudoElement:0}),Um=et(Wm),$m=fe({},cr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Vm=et($m),Hm=fe({},cr,{data:0}),Lc=et(Hm),Km={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Qm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Qm[e])?!!t[e]:!1}function Sl(){return Xm}var Ym=fe({},si,{key:function(e){if(e.key){var t=Km[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=qi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Gm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Sl,charCode:function(e){return e.type==="keypress"?qi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?qi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Zm=et(Ym),Jm=fe({},Po,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Mc=et(Jm),eg=fe({},si,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Sl}),tg=et(eg),ng=fe({},cr,{propertyName:0,elapsedTime:0,pseudoElement:0}),rg=et(ng),ig=fe({},Po,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),og=et(ig),sg=[9,13,27,32],Nl=zt&&"CompositionEvent"in window,Ir=null;zt&&"documentMode"in document&&(Ir=document.documentMode);var ag=zt&&"TextEvent"in window&&!Ir,th=zt&&(!Nl||Ir&&8<Ir&&11>=Ir),Rc=" ",Bc=!1;function nh(e,t){switch(e){case"keyup":return sg.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function rh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Mn=!1;function lg(e,t){switch(e){case"compositionend":return rh(t);case"keypress":return t.which!==32?null:(Bc=!0,Rc);case"textInput":return e=t.data,e===Rc&&Bc?null:e;default:return null}}function cg(e,t){if(Mn)return e==="compositionend"||!Nl&&nh(e,t)?(e=eh(),Bi=wl=Gt=null,Mn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return th&&t.locale!=="ko"?null:t.data;default:return null}}var dg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function qc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!dg[e.type]:t==="textarea"}function ih(e,t,n,r){_u(r),t=io(t,"onChange"),0<t.length&&(n=new bl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Or=null,Ur=null;function ug(e){mh(e,0)}function Fo(e){var t=qn(e);if(Iu(t))return e}function hg(e,t){if(e==="change")return t}var oh=!1;if(zt){var ms;if(zt){var gs="oninput"in document;if(!gs){var Dc=document.createElement("div");Dc.setAttribute("oninput","return;"),gs=typeof Dc.oninput=="function"}ms=gs}else ms=!1;oh=ms&&(!document.documentMode||9<document.documentMode)}function Wc(){Or&&(Or.detachEvent("onpropertychange",sh),Ur=Or=null)}function sh(e){if(e.propertyName==="value"&&Fo(Ur)){var t=[];ih(t,Ur,e,gl(e)),Bu(ug,t)}}function pg(e,t,n){e==="focusin"?(Wc(),Or=t,Ur=n,Or.attachEvent("onpropertychange",sh)):e==="focusout"&&Wc()}function fg(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Fo(Ur)}function mg(e,t){if(e==="click")return Fo(t)}function gg(e,t){if(e==="input"||e==="change")return Fo(t)}function yg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var mt=typeof Object.is=="function"?Object.is:yg;function $r(e,t){if(mt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Js.call(t,i)||!mt(e[i],t[i]))return!1}return!0}function Uc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function $c(e,t){var n=Uc(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Uc(n)}}function ah(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ah(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function lh(){for(var e=window,t=Yi();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Yi(e.document)}return t}function jl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function vg(e){var t=lh(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ah(n.ownerDocument.documentElement,n)){if(r!==null&&jl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=$c(n,o);var s=$c(n,r);i&&s&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var xg=zt&&"documentMode"in document&&11>=document.documentMode,Rn=null,va=null,Tr=null,xa=!1;function Vc(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;xa||Rn==null||Rn!==Yi(r)||(r=Rn,"selectionStart"in r&&jl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Tr&&$r(Tr,r)||(Tr=r,r=io(va,"onSelect"),0<r.length&&(t=new bl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Rn)))}function ki(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Bn={animationend:ki("Animation","AnimationEnd"),animationiteration:ki("Animation","AnimationIteration"),animationstart:ki("Animation","AnimationStart"),transitionend:ki("Transition","TransitionEnd")},ys={},ch={};zt&&(ch=document.createElement("div").style,"AnimationEvent"in window||(delete Bn.animationend.animation,delete Bn.animationiteration.animation,delete Bn.animationstart.animation),"TransitionEvent"in window||delete Bn.transitionend.transition);function _o(e){if(ys[e])return ys[e];if(!Bn[e])return e;var t=Bn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ch)return ys[e]=t[n];return e}var dh=_o("animationend"),uh=_o("animationiteration"),hh=_o("animationstart"),ph=_o("transitionend"),fh=new Map,Hc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ln(e,t){fh.set(e,t),Tn(t,[e])}for(var vs=0;vs<Hc.length;vs++){var xs=Hc[vs],kg=xs.toLowerCase(),wg=xs[0].toUpperCase()+xs.slice(1);ln(kg,"on"+wg)}ln(dh,"onAnimationEnd");ln(uh,"onAnimationIteration");ln(hh,"onAnimationStart");ln("dblclick","onDoubleClick");ln("focusin","onFocus");ln("focusout","onBlur");ln(ph,"onTransitionEnd");er("onMouseEnter",["mouseout","mouseover"]);er("onMouseLeave",["mouseout","mouseover"]);er("onPointerEnter",["pointerout","pointerover"]);er("onPointerLeave",["pointerout","pointerover"]);Tn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Tn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Tn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Tn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Tn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Tn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Nr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bg=new Set("cancel close invalid load scroll toggle".split(" ").concat(Nr));function Kc(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,km(r,t,void 0,e),e.currentTarget=null}function mh(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var s=r.length-1;0<=s;s--){var l=r[s],c=l.instance,u=l.currentTarget;if(l=l.listener,c!==o&&i.isPropagationStopped())break e;Kc(i,l,u),o=c}else for(s=0;s<r.length;s++){if(l=r[s],c=l.instance,u=l.currentTarget,l=l.listener,c!==o&&i.isPropagationStopped())break e;Kc(i,l,u),o=c}}}if(Ji)throw e=fa,Ji=!1,fa=null,e}function ae(e,t){var n=t[Na];n===void 0&&(n=t[Na]=new Set);var r=e+"__bubble";n.has(r)||(gh(t,e,2,!1),n.add(r))}function ks(e,t,n){var r=0;t&&(r|=4),gh(n,e,r,t)}var wi="_reactListening"+Math.random().toString(36).slice(2);function Vr(e){if(!e[wi]){e[wi]=!0,Su.forEach(function(n){n!=="selectionchange"&&(bg.has(n)||ks(n,!1,e),ks(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[wi]||(t[wi]=!0,ks("selectionchange",!1,t))}}function gh(e,t,n,r){switch(Ju(t)){case 1:var i=Lm;break;case 4:i=Mm;break;default:i=kl}n=i.bind(null,t,n,e),i=void 0,!pa||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function ws(e,t,n,r,i){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(s===4)for(s=r.return;s!==null;){var c=s.tag;if((c===3||c===4)&&(c=s.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;s=s.return}for(;l!==null;){if(s=mn(l),s===null)return;if(c=s.tag,c===5||c===6){r=o=s;continue e}l=l.parentNode}}r=r.return}Bu(function(){var u=o,d=gl(n),h=[];e:{var p=fh.get(e);if(p!==void 0){var x=bl,b=e;switch(e){case"keypress":if(qi(n)===0)break e;case"keydown":case"keyup":x=Zm;break;case"focusin":b="focus",x=fs;break;case"focusout":b="blur",x=fs;break;case"beforeblur":case"afterblur":x=fs;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=_c;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=qm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=tg;break;case dh:case uh:case hh:x=Um;break;case ph:x=rg;break;case"scroll":x=Rm;break;case"wheel":x=og;break;case"copy":case"cut":case"paste":x=Vm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=Mc}var v=(t&4)!==0,A=!v&&e==="scroll",g=v?p!==null?p+"Capture":null:p;v=[];for(var f=u,m;f!==null;){m=f;var w=m.stateNode;if(m.tag===5&&w!==null&&(m=w,g!==null&&(w=Br(f,g),w!=null&&v.push(Hr(f,w,m)))),A)break;f=f.return}0<v.length&&(p=new x(p,b,null,n,d),h.push({event:p,listeners:v}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",p&&n!==ua&&(b=n.relatedTarget||n.fromElement)&&(mn(b)||b[Pt]))break e;if((x||p)&&(p=d.window===d?d:(p=d.ownerDocument)?p.defaultView||p.parentWindow:window,x?(b=n.relatedTarget||n.toElement,x=u,b=b?mn(b):null,b!==null&&(A=En(b),b!==A||b.tag!==5&&b.tag!==6)&&(b=null)):(x=null,b=u),x!==b)){if(v=_c,w="onMouseLeave",g="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(v=Mc,w="onPointerLeave",g="onPointerEnter",f="pointer"),A=x==null?p:qn(x),m=b==null?p:qn(b),p=new v(w,f+"leave",x,n,d),p.target=A,p.relatedTarget=m,w=null,mn(d)===u&&(v=new v(g,f+"enter",b,n,d),v.target=m,v.relatedTarget=A,w=v),A=w,x&&b)t:{for(v=x,g=b,f=0,m=v;m;m=zn(m))f++;for(m=0,w=g;w;w=zn(w))m++;for(;0<f-m;)v=zn(v),f--;for(;0<m-f;)g=zn(g),m--;for(;f--;){if(v===g||g!==null&&v===g.alternate)break t;v=zn(v),g=zn(g)}v=null}else v=null;x!==null&&Gc(h,p,x,v,!1),b!==null&&A!==null&&Gc(h,A,b,v,!0)}}e:{if(p=u?qn(u):window,x=p.nodeName&&p.nodeName.toLowerCase(),x==="select"||x==="input"&&p.type==="file")var S=hg;else if(qc(p))if(oh)S=gg;else{S=fg;var N=pg}else(x=p.nodeName)&&x.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(S=mg);if(S&&(S=S(e,u))){ih(h,S,n,d);break e}N&&N(e,p,u),e==="focusout"&&(N=p._wrapperState)&&N.controlled&&p.type==="number"&&sa(p,"number",p.value)}switch(N=u?qn(u):window,e){case"focusin":(qc(N)||N.contentEditable==="true")&&(Rn=N,va=u,Tr=null);break;case"focusout":Tr=va=Rn=null;break;case"mousedown":xa=!0;break;case"contextmenu":case"mouseup":case"dragend":xa=!1,Vc(h,n,d);break;case"selectionchange":if(xg)break;case"keydown":case"keyup":Vc(h,n,d)}var T;if(Nl)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else Mn?nh(e,n)&&(C="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(th&&n.locale!=="ko"&&(Mn||C!=="onCompositionStart"?C==="onCompositionEnd"&&Mn&&(T=eh()):(Gt=d,wl="value"in Gt?Gt.value:Gt.textContent,Mn=!0)),N=io(u,C),0<N.length&&(C=new Lc(C,e,null,n,d),h.push({event:C,listeners:N}),T?C.data=T:(T=rh(n),T!==null&&(C.data=T)))),(T=ag?lg(e,n):cg(e,n))&&(u=io(u,"onBeforeInput"),0<u.length&&(d=new Lc("onBeforeInput","beforeinput",null,n,d),h.push({event:d,listeners:u}),d.data=T))}mh(h,t)})}function Hr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function io(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=Br(e,n),o!=null&&r.unshift(Hr(e,o,i)),o=Br(e,t),o!=null&&r.push(Hr(e,o,i))),e=e.return}return r}function zn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Gc(e,t,n,r,i){for(var o=t._reactName,s=[];n!==null&&n!==r;){var l=n,c=l.alternate,u=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&u!==null&&(l=u,i?(c=Br(n,o),c!=null&&s.unshift(Hr(n,c,l))):i||(c=Br(n,o),c!=null&&s.push(Hr(n,c,l)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var Sg=/\r\n?/g,Ng=/\u0000|\uFFFD/g;function Qc(e){return(typeof e=="string"?e:""+e).replace(Sg,`
`).replace(Ng,"")}function bi(e,t,n){if(t=Qc(t),Qc(e)!==t&&n)throw Error(P(425))}function oo(){}var ka=null,wa=null;function ba(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Sa=typeof setTimeout=="function"?setTimeout:void 0,jg=typeof clearTimeout=="function"?clearTimeout:void 0,Xc=typeof Promise=="function"?Promise:void 0,Cg=typeof queueMicrotask=="function"?queueMicrotask:typeof Xc<"u"?function(e){return Xc.resolve(null).then(e).catch(Ag)}:Sa;function Ag(e){setTimeout(function(){throw e})}function bs(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Wr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Wr(t)}function en(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Yc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var dr=Math.random().toString(36).slice(2),wt="__reactFiber$"+dr,Kr="__reactProps$"+dr,Pt="__reactContainer$"+dr,Na="__reactEvents$"+dr,Ig="__reactListeners$"+dr,Og="__reactHandles$"+dr;function mn(e){var t=e[wt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Pt]||n[wt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Yc(e);e!==null;){if(n=e[wt])return n;e=Yc(e)}return t}e=n,n=e.parentNode}return null}function ai(e){return e=e[wt]||e[Pt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function qn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(P(33))}function Lo(e){return e[Kr]||null}var ja=[],Dn=-1;function cn(e){return{current:e}}function le(e){0>Dn||(e.current=ja[Dn],ja[Dn]=null,Dn--)}function oe(e,t){Dn++,ja[Dn]=e.current,e.current=t}var an={},ze=cn(an),Ue=cn(!1),Sn=an;function tr(e,t){var n=e.type.contextTypes;if(!n)return an;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function $e(e){return e=e.childContextTypes,e!=null}function so(){le(Ue),le(ze)}function Zc(e,t,n){if(ze.current!==an)throw Error(P(168));oe(ze,t),oe(Ue,n)}function yh(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(P(108,pm(e)||"Unknown",i));return fe({},n,r)}function ao(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||an,Sn=ze.current,oe(ze,e),oe(Ue,Ue.current),!0}function Jc(e,t,n){var r=e.stateNode;if(!r)throw Error(P(169));n?(e=yh(e,t,Sn),r.__reactInternalMemoizedMergedChildContext=e,le(Ue),le(ze),oe(ze,e)):le(Ue),oe(Ue,n)}var It=null,Mo=!1,Ss=!1;function vh(e){It===null?It=[e]:It.push(e)}function Tg(e){Mo=!0,vh(e)}function dn(){if(!Ss&&It!==null){Ss=!0;var e=0,t=ee;try{var n=It;for(ee=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}It=null,Mo=!1}catch(i){throw It!==null&&(It=It.slice(e+1)),Uu(yl,dn),i}finally{ee=t,Ss=!1}}return null}var Wn=[],Un=0,lo=null,co=0,tt=[],nt=0,Nn=null,Ot=1,Tt="";function pn(e,t){Wn[Un++]=co,Wn[Un++]=lo,lo=e,co=t}function xh(e,t,n){tt[nt++]=Ot,tt[nt++]=Tt,tt[nt++]=Nn,Nn=e;var r=Ot;e=Tt;var i=32-ht(r)-1;r&=~(1<<i),n+=1;var o=32-ht(t)+i;if(30<o){var s=i-i%5;o=(r&(1<<s)-1).toString(32),r>>=s,i-=s,Ot=1<<32-ht(t)+i|n<<i|r,Tt=o+e}else Ot=1<<o|n<<i|r,Tt=e}function Cl(e){e.return!==null&&(pn(e,1),xh(e,1,0))}function Al(e){for(;e===lo;)lo=Wn[--Un],Wn[Un]=null,co=Wn[--Un],Wn[Un]=null;for(;e===Nn;)Nn=tt[--nt],tt[nt]=null,Tt=tt[--nt],tt[nt]=null,Ot=tt[--nt],tt[nt]=null}var Ye=null,Xe=null,de=!1,dt=null;function kh(e,t){var n=rt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function ed(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ye=e,Xe=en(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ye=e,Xe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Nn!==null?{id:Ot,overflow:Tt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=rt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ye=e,Xe=null,!0):!1;default:return!1}}function Ca(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Aa(e){if(de){var t=Xe;if(t){var n=t;if(!ed(e,t)){if(Ca(e))throw Error(P(418));t=en(n.nextSibling);var r=Ye;t&&ed(e,t)?kh(r,n):(e.flags=e.flags&-4097|2,de=!1,Ye=e)}}else{if(Ca(e))throw Error(P(418));e.flags=e.flags&-4097|2,de=!1,Ye=e}}}function td(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ye=e}function Si(e){if(e!==Ye)return!1;if(!de)return td(e),de=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ba(e.type,e.memoizedProps)),t&&(t=Xe)){if(Ca(e))throw wh(),Error(P(418));for(;t;)kh(e,t),t=en(t.nextSibling)}if(td(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(P(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Xe=en(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Xe=null}}else Xe=Ye?en(e.stateNode.nextSibling):null;return!0}function wh(){for(var e=Xe;e;)e=en(e.nextSibling)}function nr(){Xe=Ye=null,de=!1}function Il(e){dt===null?dt=[e]:dt.push(e)}var Eg=Lt.ReactCurrentBatchConfig;function yr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(P(309));var r=n.stateNode}if(!r)throw Error(P(147,e));var i=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(s){var l=i.refs;s===null?delete l[o]:l[o]=s},t._stringRef=o,t)}if(typeof e!="string")throw Error(P(284));if(!n._owner)throw Error(P(290,e))}return e}function Ni(e,t){throw e=Object.prototype.toString.call(t),Error(P(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function nd(e){var t=e._init;return t(e._payload)}function bh(e){function t(g,f){if(e){var m=g.deletions;m===null?(g.deletions=[f],g.flags|=16):m.push(f)}}function n(g,f){if(!e)return null;for(;f!==null;)t(g,f),f=f.sibling;return null}function r(g,f){for(g=new Map;f!==null;)f.key!==null?g.set(f.key,f):g.set(f.index,f),f=f.sibling;return g}function i(g,f){return g=on(g,f),g.index=0,g.sibling=null,g}function o(g,f,m){return g.index=m,e?(m=g.alternate,m!==null?(m=m.index,m<f?(g.flags|=2,f):m):(g.flags|=2,f)):(g.flags|=1048576,f)}function s(g){return e&&g.alternate===null&&(g.flags|=2),g}function l(g,f,m,w){return f===null||f.tag!==6?(f=Ts(m,g.mode,w),f.return=g,f):(f=i(f,m),f.return=g,f)}function c(g,f,m,w){var S=m.type;return S===Ln?d(g,f,m.props.children,w,m.key):f!==null&&(f.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Dt&&nd(S)===f.type)?(w=i(f,m.props),w.ref=yr(g,f,m),w.return=g,w):(w=Ki(m.type,m.key,m.props,null,g.mode,w),w.ref=yr(g,f,m),w.return=g,w)}function u(g,f,m,w){return f===null||f.tag!==4||f.stateNode.containerInfo!==m.containerInfo||f.stateNode.implementation!==m.implementation?(f=Es(m,g.mode,w),f.return=g,f):(f=i(f,m.children||[]),f.return=g,f)}function d(g,f,m,w,S){return f===null||f.tag!==7?(f=bn(m,g.mode,w,S),f.return=g,f):(f=i(f,m),f.return=g,f)}function h(g,f,m){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Ts(""+f,g.mode,m),f.return=g,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case pi:return m=Ki(f.type,f.key,f.props,null,g.mode,m),m.ref=yr(g,null,f),m.return=g,m;case _n:return f=Es(f,g.mode,m),f.return=g,f;case Dt:var w=f._init;return h(g,w(f._payload),m)}if(br(f)||hr(f))return f=bn(f,g.mode,m,null),f.return=g,f;Ni(g,f)}return null}function p(g,f,m,w){var S=f!==null?f.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return S!==null?null:l(g,f,""+m,w);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case pi:return m.key===S?c(g,f,m,w):null;case _n:return m.key===S?u(g,f,m,w):null;case Dt:return S=m._init,p(g,f,S(m._payload),w)}if(br(m)||hr(m))return S!==null?null:d(g,f,m,w,null);Ni(g,m)}return null}function x(g,f,m,w,S){if(typeof w=="string"&&w!==""||typeof w=="number")return g=g.get(m)||null,l(f,g,""+w,S);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case pi:return g=g.get(w.key===null?m:w.key)||null,c(f,g,w,S);case _n:return g=g.get(w.key===null?m:w.key)||null,u(f,g,w,S);case Dt:var N=w._init;return x(g,f,m,N(w._payload),S)}if(br(w)||hr(w))return g=g.get(m)||null,d(f,g,w,S,null);Ni(f,w)}return null}function b(g,f,m,w){for(var S=null,N=null,T=f,C=f=0,M=null;T!==null&&C<m.length;C++){T.index>C?(M=T,T=null):M=T.sibling;var R=p(g,T,m[C],w);if(R===null){T===null&&(T=M);break}e&&T&&R.alternate===null&&t(g,T),f=o(R,f,C),N===null?S=R:N.sibling=R,N=R,T=M}if(C===m.length)return n(g,T),de&&pn(g,C),S;if(T===null){for(;C<m.length;C++)T=h(g,m[C],w),T!==null&&(f=o(T,f,C),N===null?S=T:N.sibling=T,N=T);return de&&pn(g,C),S}for(T=r(g,T);C<m.length;C++)M=x(T,g,C,m[C],w),M!==null&&(e&&M.alternate!==null&&T.delete(M.key===null?C:M.key),f=o(M,f,C),N===null?S=M:N.sibling=M,N=M);return e&&T.forEach(function(L){return t(g,L)}),de&&pn(g,C),S}function v(g,f,m,w){var S=hr(m);if(typeof S!="function")throw Error(P(150));if(m=S.call(m),m==null)throw Error(P(151));for(var N=S=null,T=f,C=f=0,M=null,R=m.next();T!==null&&!R.done;C++,R=m.next()){T.index>C?(M=T,T=null):M=T.sibling;var L=p(g,T,R.value,w);if(L===null){T===null&&(T=M);break}e&&T&&L.alternate===null&&t(g,T),f=o(L,f,C),N===null?S=L:N.sibling=L,N=L,T=M}if(R.done)return n(g,T),de&&pn(g,C),S;if(T===null){for(;!R.done;C++,R=m.next())R=h(g,R.value,w),R!==null&&(f=o(R,f,C),N===null?S=R:N.sibling=R,N=R);return de&&pn(g,C),S}for(T=r(g,T);!R.done;C++,R=m.next())R=x(T,g,C,R.value,w),R!==null&&(e&&R.alternate!==null&&T.delete(R.key===null?C:R.key),f=o(R,f,C),N===null?S=R:N.sibling=R,N=R);return e&&T.forEach(function(V){return t(g,V)}),de&&pn(g,C),S}function A(g,f,m,w){if(typeof m=="object"&&m!==null&&m.type===Ln&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case pi:e:{for(var S=m.key,N=f;N!==null;){if(N.key===S){if(S=m.type,S===Ln){if(N.tag===7){n(g,N.sibling),f=i(N,m.props.children),f.return=g,g=f;break e}}else if(N.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Dt&&nd(S)===N.type){n(g,N.sibling),f=i(N,m.props),f.ref=yr(g,N,m),f.return=g,g=f;break e}n(g,N);break}else t(g,N);N=N.sibling}m.type===Ln?(f=bn(m.props.children,g.mode,w,m.key),f.return=g,g=f):(w=Ki(m.type,m.key,m.props,null,g.mode,w),w.ref=yr(g,f,m),w.return=g,g=w)}return s(g);case _n:e:{for(N=m.key;f!==null;){if(f.key===N)if(f.tag===4&&f.stateNode.containerInfo===m.containerInfo&&f.stateNode.implementation===m.implementation){n(g,f.sibling),f=i(f,m.children||[]),f.return=g,g=f;break e}else{n(g,f);break}else t(g,f);f=f.sibling}f=Es(m,g.mode,w),f.return=g,g=f}return s(g);case Dt:return N=m._init,A(g,f,N(m._payload),w)}if(br(m))return b(g,f,m,w);if(hr(m))return v(g,f,m,w);Ni(g,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,f!==null&&f.tag===6?(n(g,f.sibling),f=i(f,m),f.return=g,g=f):(n(g,f),f=Ts(m,g.mode,w),f.return=g,g=f),s(g)):n(g,f)}return A}var rr=bh(!0),Sh=bh(!1),uo=cn(null),ho=null,$n=null,Ol=null;function Tl(){Ol=$n=ho=null}function El(e){var t=uo.current;le(uo),e._currentValue=t}function Ia(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Zn(e,t){ho=e,Ol=$n=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(We=!0),e.firstContext=null)}function ot(e){var t=e._currentValue;if(Ol!==e)if(e={context:e,memoizedValue:t,next:null},$n===null){if(ho===null)throw Error(P(308));$n=e,ho.dependencies={lanes:0,firstContext:e}}else $n=$n.next=e;return t}var gn=null;function zl(e){gn===null?gn=[e]:gn.push(e)}function Nh(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,zl(t)):(n.next=i.next,i.next=n),t.interleaved=n,Ft(e,r)}function Ft(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Wt=!1;function Pl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function jh(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Et(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function tn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,J&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Ft(e,n)}return i=r.interleaved,i===null?(t.next=t,zl(r)):(t.next=i.next,i.next=t),r.interleaved=t,Ft(e,n)}function Di(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,vl(e,n)}}function rd(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=s:o=o.next=s,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function po(e,t,n,r){var i=e.updateQueue;Wt=!1;var o=i.firstBaseUpdate,s=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var c=l,u=c.next;c.next=null,s===null?o=u:s.next=u,s=c;var d=e.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==s&&(l===null?d.firstBaseUpdate=u:l.next=u,d.lastBaseUpdate=c))}if(o!==null){var h=i.baseState;s=0,d=u=c=null,l=o;do{var p=l.lane,x=l.eventTime;if((r&p)===p){d!==null&&(d=d.next={eventTime:x,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var b=e,v=l;switch(p=t,x=n,v.tag){case 1:if(b=v.payload,typeof b=="function"){h=b.call(x,h,p);break e}h=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=v.payload,p=typeof b=="function"?b.call(x,h,p):b,p==null)break e;h=fe({},h,p);break e;case 2:Wt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[l]:p.push(l))}else x={eventTime:x,lane:p,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(u=d=x,c=h):d=d.next=x,s|=p;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;p=l,l=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(d===null&&(c=h),i.baseState=c,i.firstBaseUpdate=u,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do s|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);Cn|=s,e.lanes=s,e.memoizedState=h}}function id(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(P(191,i));i.call(r)}}}var li={},St=cn(li),Gr=cn(li),Qr=cn(li);function yn(e){if(e===li)throw Error(P(174));return e}function Fl(e,t){switch(oe(Qr,t),oe(Gr,e),oe(St,li),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:la(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=la(t,e)}le(St),oe(St,t)}function ir(){le(St),le(Gr),le(Qr)}function Ch(e){yn(Qr.current);var t=yn(St.current),n=la(t,e.type);t!==n&&(oe(Gr,e),oe(St,n))}function _l(e){Gr.current===e&&(le(St),le(Gr))}var he=cn(0);function fo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ns=[];function Ll(){for(var e=0;e<Ns.length;e++)Ns[e]._workInProgressVersionPrimary=null;Ns.length=0}var Wi=Lt.ReactCurrentDispatcher,js=Lt.ReactCurrentBatchConfig,jn=0,pe=null,xe=null,be=null,mo=!1,Er=!1,Xr=0,zg=0;function Oe(){throw Error(P(321))}function Ml(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!mt(e[n],t[n]))return!1;return!0}function Rl(e,t,n,r,i,o){if(jn=o,pe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Wi.current=e===null||e.memoizedState===null?Lg:Mg,e=n(r,i),Er){o=0;do{if(Er=!1,Xr=0,25<=o)throw Error(P(301));o+=1,be=xe=null,t.updateQueue=null,Wi.current=Rg,e=n(r,i)}while(Er)}if(Wi.current=go,t=xe!==null&&xe.next!==null,jn=0,be=xe=pe=null,mo=!1,t)throw Error(P(300));return e}function Bl(){var e=Xr!==0;return Xr=0,e}function kt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return be===null?pe.memoizedState=be=e:be=be.next=e,be}function st(){if(xe===null){var e=pe.alternate;e=e!==null?e.memoizedState:null}else e=xe.next;var t=be===null?pe.memoizedState:be.next;if(t!==null)be=t,xe=e;else{if(e===null)throw Error(P(310));xe=e,e={memoizedState:xe.memoizedState,baseState:xe.baseState,baseQueue:xe.baseQueue,queue:xe.queue,next:null},be===null?pe.memoizedState=be=e:be=be.next=e}return be}function Yr(e,t){return typeof t=="function"?t(e):t}function Cs(e){var t=st(),n=t.queue;if(n===null)throw Error(P(311));n.lastRenderedReducer=e;var r=xe,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var s=i.next;i.next=o.next,o.next=s}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var l=s=null,c=null,u=o;do{var d=u.lane;if((jn&d)===d)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(l=c=h,s=r):c=c.next=h,pe.lanes|=d,Cn|=d}u=u.next}while(u!==null&&u!==o);c===null?s=r:c.next=l,mt(r,t.memoizedState)||(We=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do o=i.lane,pe.lanes|=o,Cn|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function As(e){var t=st(),n=t.queue;if(n===null)throw Error(P(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var s=i=i.next;do o=e(o,s.action),s=s.next;while(s!==i);mt(o,t.memoizedState)||(We=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Ah(){}function Ih(e,t){var n=pe,r=st(),i=t(),o=!mt(r.memoizedState,i);if(o&&(r.memoizedState=i,We=!0),r=r.queue,ql(Eh.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||be!==null&&be.memoizedState.tag&1){if(n.flags|=2048,Zr(9,Th.bind(null,n,r,i,t),void 0,null),Se===null)throw Error(P(349));jn&30||Oh(n,t,i)}return i}function Oh(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=pe.updateQueue,t===null?(t={lastEffect:null,stores:null},pe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Th(e,t,n,r){t.value=n,t.getSnapshot=r,zh(t)&&Ph(e)}function Eh(e,t,n){return n(function(){zh(t)&&Ph(e)})}function zh(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!mt(e,n)}catch{return!0}}function Ph(e){var t=Ft(e,1);t!==null&&pt(t,e,1,-1)}function od(e){var t=kt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Yr,lastRenderedState:e},t.queue=e,e=e.dispatch=_g.bind(null,pe,e),[t.memoizedState,e]}function Zr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=pe.updateQueue,t===null?(t={lastEffect:null,stores:null},pe.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Fh(){return st().memoizedState}function Ui(e,t,n,r){var i=kt();pe.flags|=e,i.memoizedState=Zr(1|t,n,void 0,r===void 0?null:r)}function Ro(e,t,n,r){var i=st();r=r===void 0?null:r;var o=void 0;if(xe!==null){var s=xe.memoizedState;if(o=s.destroy,r!==null&&Ml(r,s.deps)){i.memoizedState=Zr(t,n,o,r);return}}pe.flags|=e,i.memoizedState=Zr(1|t,n,o,r)}function sd(e,t){return Ui(8390656,8,e,t)}function ql(e,t){return Ro(2048,8,e,t)}function _h(e,t){return Ro(4,2,e,t)}function Lh(e,t){return Ro(4,4,e,t)}function Mh(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Rh(e,t,n){return n=n!=null?n.concat([e]):null,Ro(4,4,Mh.bind(null,t,e),n)}function Dl(){}function Bh(e,t){var n=st();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ml(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qh(e,t){var n=st();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ml(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Dh(e,t,n){return jn&21?(mt(n,t)||(n=Hu(),pe.lanes|=n,Cn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,We=!0),e.memoizedState=n)}function Pg(e,t){var n=ee;ee=n!==0&&4>n?n:4,e(!0);var r=js.transition;js.transition={};try{e(!1),t()}finally{ee=n,js.transition=r}}function Wh(){return st().memoizedState}function Fg(e,t,n){var r=rn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Uh(e))$h(t,n);else if(n=Nh(e,t,n,r),n!==null){var i=Re();pt(n,e,r,i),Vh(n,t,r)}}function _g(e,t,n){var r=rn(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Uh(e))$h(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var s=t.lastRenderedState,l=o(s,n);if(i.hasEagerState=!0,i.eagerState=l,mt(l,s)){var c=t.interleaved;c===null?(i.next=i,zl(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}finally{}n=Nh(e,t,i,r),n!==null&&(i=Re(),pt(n,e,r,i),Vh(n,t,r))}}function Uh(e){var t=e.alternate;return e===pe||t!==null&&t===pe}function $h(e,t){Er=mo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Vh(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,vl(e,n)}}var go={readContext:ot,useCallback:Oe,useContext:Oe,useEffect:Oe,useImperativeHandle:Oe,useInsertionEffect:Oe,useLayoutEffect:Oe,useMemo:Oe,useReducer:Oe,useRef:Oe,useState:Oe,useDebugValue:Oe,useDeferredValue:Oe,useTransition:Oe,useMutableSource:Oe,useSyncExternalStore:Oe,useId:Oe,unstable_isNewReconciler:!1},Lg={readContext:ot,useCallback:function(e,t){return kt().memoizedState=[e,t===void 0?null:t],e},useContext:ot,useEffect:sd,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ui(4194308,4,Mh.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ui(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ui(4,2,e,t)},useMemo:function(e,t){var n=kt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=kt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Fg.bind(null,pe,e),[r.memoizedState,e]},useRef:function(e){var t=kt();return e={current:e},t.memoizedState=e},useState:od,useDebugValue:Dl,useDeferredValue:function(e){return kt().memoizedState=e},useTransition:function(){var e=od(!1),t=e[0];return e=Pg.bind(null,e[1]),kt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=pe,i=kt();if(de){if(n===void 0)throw Error(P(407));n=n()}else{if(n=t(),Se===null)throw Error(P(349));jn&30||Oh(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,sd(Eh.bind(null,r,o,e),[e]),r.flags|=2048,Zr(9,Th.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=kt(),t=Se.identifierPrefix;if(de){var n=Tt,r=Ot;n=(r&~(1<<32-ht(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Xr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=zg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Mg={readContext:ot,useCallback:Bh,useContext:ot,useEffect:ql,useImperativeHandle:Rh,useInsertionEffect:_h,useLayoutEffect:Lh,useMemo:qh,useReducer:Cs,useRef:Fh,useState:function(){return Cs(Yr)},useDebugValue:Dl,useDeferredValue:function(e){var t=st();return Dh(t,xe.memoizedState,e)},useTransition:function(){var e=Cs(Yr)[0],t=st().memoizedState;return[e,t]},useMutableSource:Ah,useSyncExternalStore:Ih,useId:Wh,unstable_isNewReconciler:!1},Rg={readContext:ot,useCallback:Bh,useContext:ot,useEffect:ql,useImperativeHandle:Rh,useInsertionEffect:_h,useLayoutEffect:Lh,useMemo:qh,useReducer:As,useRef:Fh,useState:function(){return As(Yr)},useDebugValue:Dl,useDeferredValue:function(e){var t=st();return xe===null?t.memoizedState=e:Dh(t,xe.memoizedState,e)},useTransition:function(){var e=As(Yr)[0],t=st().memoizedState;return[e,t]},useMutableSource:Ah,useSyncExternalStore:Ih,useId:Wh,unstable_isNewReconciler:!1};function lt(e,t){if(e&&e.defaultProps){t=fe({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Oa(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:fe({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Bo={isMounted:function(e){return(e=e._reactInternals)?En(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Re(),i=rn(e),o=Et(r,i);o.payload=t,n!=null&&(o.callback=n),t=tn(e,o,i),t!==null&&(pt(t,e,i,r),Di(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Re(),i=rn(e),o=Et(r,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=tn(e,o,i),t!==null&&(pt(t,e,i,r),Di(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Re(),r=rn(e),i=Et(n,r);i.tag=2,t!=null&&(i.callback=t),t=tn(e,i,r),t!==null&&(pt(t,e,r,n),Di(t,e,r))}};function ad(e,t,n,r,i,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,s):t.prototype&&t.prototype.isPureReactComponent?!$r(n,r)||!$r(i,o):!0}function Hh(e,t,n){var r=!1,i=an,o=t.contextType;return typeof o=="object"&&o!==null?o=ot(o):(i=$e(t)?Sn:ze.current,r=t.contextTypes,o=(r=r!=null)?tr(e,i):an),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Bo,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function ld(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Bo.enqueueReplaceState(t,t.state,null)}function Ta(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Pl(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=ot(o):(o=$e(t)?Sn:ze.current,i.context=tr(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Oa(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&Bo.enqueueReplaceState(i,i.state,null),po(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function or(e,t){try{var n="",r=t;do n+=hm(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function Is(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ea(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Bg=typeof WeakMap=="function"?WeakMap:Map;function Kh(e,t,n){n=Et(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){vo||(vo=!0,Da=r),Ea(e,t)},n}function Gh(e,t,n){n=Et(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Ea(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Ea(e,t),typeof r!="function"&&(nn===null?nn=new Set([this]):nn.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function cd(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Bg;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=Jg.bind(null,e,t,n),t.then(e,e))}function dd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ud(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Et(-1,1),t.tag=2,tn(n,t,1))),n.lanes|=1),e)}var qg=Lt.ReactCurrentOwner,We=!1;function _e(e,t,n,r){t.child=e===null?Sh(t,null,n,r):rr(t,e.child,n,r)}function hd(e,t,n,r,i){n=n.render;var o=t.ref;return Zn(t,i),r=Rl(e,t,n,r,o,i),n=Bl(),e!==null&&!We?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,_t(e,t,i)):(de&&n&&Cl(t),t.flags|=1,_e(e,t,r,i),t.child)}function pd(e,t,n,r,i){if(e===null){var o=n.type;return typeof o=="function"&&!Ql(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Qh(e,t,o,r,i)):(e=Ki(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var s=o.memoizedProps;if(n=n.compare,n=n!==null?n:$r,n(s,r)&&e.ref===t.ref)return _t(e,t,i)}return t.flags|=1,e=on(o,r),e.ref=t.ref,e.return=t,t.child=e}function Qh(e,t,n,r,i){if(e!==null){var o=e.memoizedProps;if($r(o,r)&&e.ref===t.ref)if(We=!1,t.pendingProps=r=o,(e.lanes&i)!==0)e.flags&131072&&(We=!0);else return t.lanes=e.lanes,_t(e,t,i)}return za(e,t,n,r,i)}function Xh(e,t,n){var r=t.pendingProps,i=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},oe(Hn,Ke),Ke|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,oe(Hn,Ke),Ke|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,oe(Hn,Ke),Ke|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,oe(Hn,Ke),Ke|=r;return _e(e,t,i,n),t.child}function Yh(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function za(e,t,n,r,i){var o=$e(n)?Sn:ze.current;return o=tr(t,o),Zn(t,i),n=Rl(e,t,n,r,o,i),r=Bl(),e!==null&&!We?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,_t(e,t,i)):(de&&r&&Cl(t),t.flags|=1,_e(e,t,n,i),t.child)}function fd(e,t,n,r,i){if($e(n)){var o=!0;ao(t)}else o=!1;if(Zn(t,i),t.stateNode===null)$i(e,t),Hh(t,n,r),Ta(t,n,r,i),r=!0;else if(e===null){var s=t.stateNode,l=t.memoizedProps;s.props=l;var c=s.context,u=n.contextType;typeof u=="object"&&u!==null?u=ot(u):(u=$e(n)?Sn:ze.current,u=tr(t,u));var d=n.getDerivedStateFromProps,h=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function";h||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==r||c!==u)&&ld(t,s,r,u),Wt=!1;var p=t.memoizedState;s.state=p,po(t,r,s,i),c=t.memoizedState,l!==r||p!==c||Ue.current||Wt?(typeof d=="function"&&(Oa(t,n,d,r),c=t.memoizedState),(l=Wt||ad(t,n,l,r,p,c,u))?(h||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),s.props=r,s.state=c,s.context=u,r=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,jh(e,t),l=t.memoizedProps,u=t.type===t.elementType?l:lt(t.type,l),s.props=u,h=t.pendingProps,p=s.context,c=n.contextType,typeof c=="object"&&c!==null?c=ot(c):(c=$e(n)?Sn:ze.current,c=tr(t,c));var x=n.getDerivedStateFromProps;(d=typeof x=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==h||p!==c)&&ld(t,s,r,c),Wt=!1,p=t.memoizedState,s.state=p,po(t,r,s,i);var b=t.memoizedState;l!==h||p!==b||Ue.current||Wt?(typeof x=="function"&&(Oa(t,n,x,r),b=t.memoizedState),(u=Wt||ad(t,n,u,r,p,b,c)||!1)?(d||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,b,c),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,b,c)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=b),s.props=r,s.state=b,s.context=c,r=u):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return Pa(e,t,n,r,o,i)}function Pa(e,t,n,r,i,o){Yh(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return i&&Jc(t,n,!1),_t(e,t,o);r=t.stateNode,qg.current=t;var l=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=rr(t,e.child,null,o),t.child=rr(t,null,l,o)):_e(e,t,l,o),t.memoizedState=r.state,i&&Jc(t,n,!0),t.child}function Zh(e){var t=e.stateNode;t.pendingContext?Zc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Zc(e,t.context,!1),Fl(e,t.containerInfo)}function md(e,t,n,r,i){return nr(),Il(i),t.flags|=256,_e(e,t,n,r),t.child}var Fa={dehydrated:null,treeContext:null,retryLane:0};function _a(e){return{baseLanes:e,cachePool:null,transitions:null}}function Jh(e,t,n){var r=t.pendingProps,i=he.current,o=!1,s=(t.flags&128)!==0,l;if((l=s)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),oe(he,i&1),e===null)return Aa(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=r.children,e=r.fallback,o?(r=t.mode,o=t.child,s={mode:"hidden",children:s},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=Wo(s,r,0,null),e=bn(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=_a(n),t.memoizedState=Fa,e):Wl(t,s));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return Dg(e,t,s,r,l,i,n);if(o){o=r.fallback,s=t.mode,i=e.child,l=i.sibling;var c={mode:"hidden",children:r.children};return!(s&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=on(i,c),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?o=on(l,o):(o=bn(o,s,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,s=e.child.memoizedState,s=s===null?_a(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~n,t.memoizedState=Fa,r}return o=e.child,e=o.sibling,r=on(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Wl(e,t){return t=Wo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ji(e,t,n,r){return r!==null&&Il(r),rr(t,e.child,null,n),e=Wl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Dg(e,t,n,r,i,o,s){if(n)return t.flags&256?(t.flags&=-257,r=Is(Error(P(422))),ji(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=Wo({mode:"visible",children:r.children},i,0,null),o=bn(o,i,s,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&rr(t,e.child,null,s),t.child.memoizedState=_a(s),t.memoizedState=Fa,o);if(!(t.mode&1))return ji(e,t,s,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,o=Error(P(419)),r=Is(o,r,void 0),ji(e,t,s,r)}if(l=(s&e.childLanes)!==0,We||l){if(r=Se,r!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|s)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,Ft(e,i),pt(r,e,i,-1))}return Gl(),r=Is(Error(P(421))),ji(e,t,s,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=ey.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,Xe=en(i.nextSibling),Ye=t,de=!0,dt=null,e!==null&&(tt[nt++]=Ot,tt[nt++]=Tt,tt[nt++]=Nn,Ot=e.id,Tt=e.overflow,Nn=t),t=Wl(t,r.children),t.flags|=4096,t)}function gd(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ia(e.return,t,n)}function Os(e,t,n,r,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function ep(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(_e(e,t,r.children,n),r=he.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&gd(e,n,t);else if(e.tag===19)gd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(oe(he,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&fo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Os(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&fo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Os(t,!0,n,null,o);break;case"together":Os(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function $i(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function _t(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Cn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(P(153));if(t.child!==null){for(e=t.child,n=on(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=on(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Wg(e,t,n){switch(t.tag){case 3:Zh(t),nr();break;case 5:Ch(t);break;case 1:$e(t.type)&&ao(t);break;case 4:Fl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;oe(uo,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(oe(he,he.current&1),t.flags|=128,null):n&t.child.childLanes?Jh(e,t,n):(oe(he,he.current&1),e=_t(e,t,n),e!==null?e.sibling:null);oe(he,he.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return ep(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),oe(he,he.current),r)break;return null;case 22:case 23:return t.lanes=0,Xh(e,t,n)}return _t(e,t,n)}var tp,La,np,rp;tp=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};La=function(){};np=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,yn(St.current);var o=null;switch(n){case"input":i=ia(e,i),r=ia(e,r),o=[];break;case"select":i=fe({},i,{value:void 0}),r=fe({},r,{value:void 0}),o=[];break;case"textarea":i=aa(e,i),r=aa(e,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=oo)}ca(n,r);var s;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var l=i[u];for(s in l)l.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Mr.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in r){var c=r[u];if(l=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&c!==l&&(c!=null||l!=null))if(u==="style")if(l){for(s in l)!l.hasOwnProperty(s)||c&&c.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in c)c.hasOwnProperty(s)&&l[s]!==c[s]&&(n||(n={}),n[s]=c[s])}else n||(o||(o=[]),o.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(o=o||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Mr.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&ae("scroll",e),o||l===c||(o=[])):(o=o||[]).push(u,c))}n&&(o=o||[]).push("style",n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};rp=function(e,t,n,r){n!==r&&(t.flags|=4)};function vr(e,t){if(!de)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Te(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ug(e,t,n){var r=t.pendingProps;switch(Al(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Te(t),null;case 1:return $e(t.type)&&so(),Te(t),null;case 3:return r=t.stateNode,ir(),le(Ue),le(ze),Ll(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Si(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,dt!==null&&($a(dt),dt=null))),La(e,t),Te(t),null;case 5:_l(t);var i=yn(Qr.current);if(n=t.type,e!==null&&t.stateNode!=null)np(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(P(166));return Te(t),null}if(e=yn(St.current),Si(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[wt]=t,r[Kr]=o,e=(t.mode&1)!==0,n){case"dialog":ae("cancel",r),ae("close",r);break;case"iframe":case"object":case"embed":ae("load",r);break;case"video":case"audio":for(i=0;i<Nr.length;i++)ae(Nr[i],r);break;case"source":ae("error",r);break;case"img":case"image":case"link":ae("error",r),ae("load",r);break;case"details":ae("toggle",r);break;case"input":jc(r,o),ae("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},ae("invalid",r);break;case"textarea":Ac(r,o),ae("invalid",r)}ca(n,o),i=null;for(var s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="children"?typeof l=="string"?r.textContent!==l&&(o.suppressHydrationWarning!==!0&&bi(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&bi(r.textContent,l,e),i=["children",""+l]):Mr.hasOwnProperty(s)&&l!=null&&s==="onScroll"&&ae("scroll",r)}switch(n){case"input":fi(r),Cc(r,o,!0);break;case"textarea":fi(r),Ic(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=oo)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Eu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[wt]=t,e[Kr]=r,tp(e,t,!1,!1),t.stateNode=e;e:{switch(s=da(n,r),n){case"dialog":ae("cancel",e),ae("close",e),i=r;break;case"iframe":case"object":case"embed":ae("load",e),i=r;break;case"video":case"audio":for(i=0;i<Nr.length;i++)ae(Nr[i],e);i=r;break;case"source":ae("error",e),i=r;break;case"img":case"image":case"link":ae("error",e),ae("load",e),i=r;break;case"details":ae("toggle",e),i=r;break;case"input":jc(e,r),i=ia(e,r),ae("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=fe({},r,{value:void 0}),ae("invalid",e);break;case"textarea":Ac(e,r),i=aa(e,r),ae("invalid",e);break;default:i=r}ca(n,i),l=i;for(o in l)if(l.hasOwnProperty(o)){var c=l[o];o==="style"?Fu(e,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&zu(e,c)):o==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Rr(e,c):typeof c=="number"&&Rr(e,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Mr.hasOwnProperty(o)?c!=null&&o==="onScroll"&&ae("scroll",e):c!=null&&hl(e,o,c,s))}switch(n){case"input":fi(e),Cc(e,r,!1);break;case"textarea":fi(e),Ic(e);break;case"option":r.value!=null&&e.setAttribute("value",""+sn(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?Gn(e,!!r.multiple,o,!1):r.defaultValue!=null&&Gn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=oo)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Te(t),null;case 6:if(e&&t.stateNode!=null)rp(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(P(166));if(n=yn(Qr.current),yn(St.current),Si(t)){if(r=t.stateNode,n=t.memoizedProps,r[wt]=t,(o=r.nodeValue!==n)&&(e=Ye,e!==null))switch(e.tag){case 3:bi(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&bi(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[wt]=t,t.stateNode=r}return Te(t),null;case 13:if(le(he),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(de&&Xe!==null&&t.mode&1&&!(t.flags&128))wh(),nr(),t.flags|=98560,o=!1;else if(o=Si(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(P(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(P(317));o[wt]=t}else nr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Te(t),o=!1}else dt!==null&&($a(dt),dt=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||he.current&1?ke===0&&(ke=3):Gl())),t.updateQueue!==null&&(t.flags|=4),Te(t),null);case 4:return ir(),La(e,t),e===null&&Vr(t.stateNode.containerInfo),Te(t),null;case 10:return El(t.type._context),Te(t),null;case 17:return $e(t.type)&&so(),Te(t),null;case 19:if(le(he),o=t.memoizedState,o===null)return Te(t),null;if(r=(t.flags&128)!==0,s=o.rendering,s===null)if(r)vr(o,!1);else{if(ke!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=fo(e),s!==null){for(t.flags|=128,vr(o,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return oe(he,he.current&1|2),t.child}e=e.sibling}o.tail!==null&&ge()>sr&&(t.flags|=128,r=!0,vr(o,!1),t.lanes=4194304)}else{if(!r)if(e=fo(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),vr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!de)return Te(t),null}else 2*ge()-o.renderingStartTime>sr&&n!==1073741824&&(t.flags|=128,r=!0,vr(o,!1),t.lanes=4194304);o.isBackwards?(s.sibling=t.child,t.child=s):(n=o.last,n!==null?n.sibling=s:t.child=s,o.last=s)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=ge(),t.sibling=null,n=he.current,oe(he,r?n&1|2:n&1),t):(Te(t),null);case 22:case 23:return Kl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ke&1073741824&&(Te(t),t.subtreeFlags&6&&(t.flags|=8192)):Te(t),null;case 24:return null;case 25:return null}throw Error(P(156,t.tag))}function $g(e,t){switch(Al(t),t.tag){case 1:return $e(t.type)&&so(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ir(),le(Ue),le(ze),Ll(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return _l(t),null;case 13:if(le(he),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(P(340));nr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return le(he),null;case 4:return ir(),null;case 10:return El(t.type._context),null;case 22:case 23:return Kl(),null;case 24:return null;default:return null}}var Ci=!1,Ee=!1,Vg=typeof WeakSet=="function"?WeakSet:Set,B=null;function Vn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){me(e,t,r)}else n.current=null}function Ma(e,t,n){try{n()}catch(r){me(e,t,r)}}var yd=!1;function Hg(e,t){if(ka=no,e=lh(),jl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var s=0,l=-1,c=-1,u=0,d=0,h=e,p=null;t:for(;;){for(var x;h!==n||i!==0&&h.nodeType!==3||(l=s+i),h!==o||r!==0&&h.nodeType!==3||(c=s+r),h.nodeType===3&&(s+=h.nodeValue.length),(x=h.firstChild)!==null;)p=h,h=x;for(;;){if(h===e)break t;if(p===n&&++u===i&&(l=s),p===o&&++d===r&&(c=s),(x=h.nextSibling)!==null)break;h=p,p=h.parentNode}h=x}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(wa={focusedElem:e,selectionRange:n},no=!1,B=t;B!==null;)if(t=B,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,B=e;else for(;B!==null;){t=B;try{var b=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(b!==null){var v=b.memoizedProps,A=b.memoizedState,g=t.stateNode,f=g.getSnapshotBeforeUpdate(t.elementType===t.type?v:lt(t.type,v),A);g.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(P(163))}}catch(w){me(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,B=e;break}B=t.return}return b=yd,yd=!1,b}function zr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&Ma(t,n,o)}i=i.next}while(i!==r)}}function qo(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ra(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function ip(e){var t=e.alternate;t!==null&&(e.alternate=null,ip(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[wt],delete t[Kr],delete t[Na],delete t[Ig],delete t[Og])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function op(e){return e.tag===5||e.tag===3||e.tag===4}function vd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||op(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ba(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=oo));else if(r!==4&&(e=e.child,e!==null))for(Ba(e,t,n),e=e.sibling;e!==null;)Ba(e,t,n),e=e.sibling}function qa(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(qa(e,t,n),e=e.sibling;e!==null;)qa(e,t,n),e=e.sibling}var je=null,ct=!1;function Rt(e,t,n){for(n=n.child;n!==null;)sp(e,t,n),n=n.sibling}function sp(e,t,n){if(bt&&typeof bt.onCommitFiberUnmount=="function")try{bt.onCommitFiberUnmount(zo,n)}catch{}switch(n.tag){case 5:Ee||Vn(n,t);case 6:var r=je,i=ct;je=null,Rt(e,t,n),je=r,ct=i,je!==null&&(ct?(e=je,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):je.removeChild(n.stateNode));break;case 18:je!==null&&(ct?(e=je,n=n.stateNode,e.nodeType===8?bs(e.parentNode,n):e.nodeType===1&&bs(e,n),Wr(e)):bs(je,n.stateNode));break;case 4:r=je,i=ct,je=n.stateNode.containerInfo,ct=!0,Rt(e,t,n),je=r,ct=i;break;case 0:case 11:case 14:case 15:if(!Ee&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&Ma(n,t,s),i=i.next}while(i!==r)}Rt(e,t,n);break;case 1:if(!Ee&&(Vn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){me(n,t,l)}Rt(e,t,n);break;case 21:Rt(e,t,n);break;case 22:n.mode&1?(Ee=(r=Ee)||n.memoizedState!==null,Rt(e,t,n),Ee=r):Rt(e,t,n);break;default:Rt(e,t,n)}}function xd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Vg),t.forEach(function(r){var i=ty.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function at(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,s=t,l=s;e:for(;l!==null;){switch(l.tag){case 5:je=l.stateNode,ct=!1;break e;case 3:je=l.stateNode.containerInfo,ct=!0;break e;case 4:je=l.stateNode.containerInfo,ct=!0;break e}l=l.return}if(je===null)throw Error(P(160));sp(o,s,i),je=null,ct=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(u){me(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)ap(t,e),t=t.sibling}function ap(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(at(t,e),vt(e),r&4){try{zr(3,e,e.return),qo(3,e)}catch(v){me(e,e.return,v)}try{zr(5,e,e.return)}catch(v){me(e,e.return,v)}}break;case 1:at(t,e),vt(e),r&512&&n!==null&&Vn(n,n.return);break;case 5:if(at(t,e),vt(e),r&512&&n!==null&&Vn(n,n.return),e.flags&32){var i=e.stateNode;try{Rr(i,"")}catch(v){me(e,e.return,v)}}if(r&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,s=n!==null?n.memoizedProps:o,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&Ou(i,o),da(l,s);var u=da(l,o);for(s=0;s<c.length;s+=2){var d=c[s],h=c[s+1];d==="style"?Fu(i,h):d==="dangerouslySetInnerHTML"?zu(i,h):d==="children"?Rr(i,h):hl(i,d,h,u)}switch(l){case"input":oa(i,o);break;case"textarea":Tu(i,o);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var x=o.value;x!=null?Gn(i,!!o.multiple,x,!1):p!==!!o.multiple&&(o.defaultValue!=null?Gn(i,!!o.multiple,o.defaultValue,!0):Gn(i,!!o.multiple,o.multiple?[]:"",!1))}i[Kr]=o}catch(v){me(e,e.return,v)}}break;case 6:if(at(t,e),vt(e),r&4){if(e.stateNode===null)throw Error(P(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(v){me(e,e.return,v)}}break;case 3:if(at(t,e),vt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Wr(t.containerInfo)}catch(v){me(e,e.return,v)}break;case 4:at(t,e),vt(e);break;case 13:at(t,e),vt(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(Vl=ge())),r&4&&xd(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(Ee=(u=Ee)||d,at(t,e),Ee=u):at(t,e),vt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(B=e,d=e.child;d!==null;){for(h=B=d;B!==null;){switch(p=B,x=p.child,p.tag){case 0:case 11:case 14:case 15:zr(4,p,p.return);break;case 1:Vn(p,p.return);var b=p.stateNode;if(typeof b.componentWillUnmount=="function"){r=p,n=p.return;try{t=r,b.props=t.memoizedProps,b.state=t.memoizedState,b.componentWillUnmount()}catch(v){me(r,n,v)}}break;case 5:Vn(p,p.return);break;case 22:if(p.memoizedState!==null){wd(h);continue}}x!==null?(x.return=p,B=x):wd(h)}d=d.sibling}e:for(d=null,h=e;;){if(h.tag===5){if(d===null){d=h;try{i=h.stateNode,u?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=h.stateNode,c=h.memoizedProps.style,s=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=Pu("display",s))}catch(v){me(e,e.return,v)}}}else if(h.tag===6){if(d===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(v){me(e,e.return,v)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:at(t,e),vt(e),r&4&&xd(e);break;case 21:break;default:at(t,e),vt(e)}}function vt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(op(n)){var r=n;break e}n=n.return}throw Error(P(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Rr(i,""),r.flags&=-33);var o=vd(e);qa(e,o,i);break;case 3:case 4:var s=r.stateNode.containerInfo,l=vd(e);Ba(e,l,s);break;default:throw Error(P(161))}}catch(c){me(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Kg(e,t,n){B=e,lp(e)}function lp(e,t,n){for(var r=(e.mode&1)!==0;B!==null;){var i=B,o=i.child;if(i.tag===22&&r){var s=i.memoizedState!==null||Ci;if(!s){var l=i.alternate,c=l!==null&&l.memoizedState!==null||Ee;l=Ci;var u=Ee;if(Ci=s,(Ee=c)&&!u)for(B=i;B!==null;)s=B,c=s.child,s.tag===22&&s.memoizedState!==null?bd(i):c!==null?(c.return=s,B=c):bd(i);for(;o!==null;)B=o,lp(o),o=o.sibling;B=i,Ci=l,Ee=u}kd(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,B=o):kd(e)}}function kd(e){for(;B!==null;){var t=B;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Ee||qo(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ee)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:lt(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&id(t,o,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}id(t,s,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var h=d.dehydrated;h!==null&&Wr(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(P(163))}Ee||t.flags&512&&Ra(t)}catch(p){me(t,t.return,p)}}if(t===e){B=null;break}if(n=t.sibling,n!==null){n.return=t.return,B=n;break}B=t.return}}function wd(e){for(;B!==null;){var t=B;if(t===e){B=null;break}var n=t.sibling;if(n!==null){n.return=t.return,B=n;break}B=t.return}}function bd(e){for(;B!==null;){var t=B;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{qo(4,t)}catch(c){me(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(c){me(t,i,c)}}var o=t.return;try{Ra(t)}catch(c){me(t,o,c)}break;case 5:var s=t.return;try{Ra(t)}catch(c){me(t,s,c)}}}catch(c){me(t,t.return,c)}if(t===e){B=null;break}var l=t.sibling;if(l!==null){l.return=t.return,B=l;break}B=t.return}}var Gg=Math.ceil,yo=Lt.ReactCurrentDispatcher,Ul=Lt.ReactCurrentOwner,it=Lt.ReactCurrentBatchConfig,J=0,Se=null,ye=null,Ce=0,Ke=0,Hn=cn(0),ke=0,Jr=null,Cn=0,Do=0,$l=0,Pr=null,De=null,Vl=0,sr=1/0,At=null,vo=!1,Da=null,nn=null,Ai=!1,Qt=null,xo=0,Fr=0,Wa=null,Vi=-1,Hi=0;function Re(){return J&6?ge():Vi!==-1?Vi:Vi=ge()}function rn(e){return e.mode&1?J&2&&Ce!==0?Ce&-Ce:Eg.transition!==null?(Hi===0&&(Hi=Hu()),Hi):(e=ee,e!==0||(e=window.event,e=e===void 0?16:Ju(e.type)),e):1}function pt(e,t,n,r){if(50<Fr)throw Fr=0,Wa=null,Error(P(185));oi(e,n,r),(!(J&2)||e!==Se)&&(e===Se&&(!(J&2)&&(Do|=n),ke===4&&Vt(e,Ce)),Ve(e,r),n===1&&J===0&&!(t.mode&1)&&(sr=ge()+500,Mo&&dn()))}function Ve(e,t){var n=e.callbackNode;Em(e,t);var r=to(e,e===Se?Ce:0);if(r===0)n!==null&&Ec(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Ec(n),t===1)e.tag===0?Tg(Sd.bind(null,e)):vh(Sd.bind(null,e)),Cg(function(){!(J&6)&&dn()}),n=null;else{switch(Ku(r)){case 1:n=yl;break;case 4:n=$u;break;case 16:n=eo;break;case 536870912:n=Vu;break;default:n=eo}n=gp(n,cp.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function cp(e,t){if(Vi=-1,Hi=0,J&6)throw Error(P(327));var n=e.callbackNode;if(Jn()&&e.callbackNode!==n)return null;var r=to(e,e===Se?Ce:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=ko(e,r);else{t=r;var i=J;J|=2;var o=up();(Se!==e||Ce!==t)&&(At=null,sr=ge()+500,wn(e,t));do try{Yg();break}catch(l){dp(e,l)}while(!0);Tl(),yo.current=o,J=i,ye!==null?t=0:(Se=null,Ce=0,t=ke)}if(t!==0){if(t===2&&(i=ma(e),i!==0&&(r=i,t=Ua(e,i))),t===1)throw n=Jr,wn(e,0),Vt(e,r),Ve(e,ge()),n;if(t===6)Vt(e,r);else{if(i=e.current.alternate,!(r&30)&&!Qg(i)&&(t=ko(e,r),t===2&&(o=ma(e),o!==0&&(r=o,t=Ua(e,o))),t===1))throw n=Jr,wn(e,0),Vt(e,r),Ve(e,ge()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(P(345));case 2:fn(e,De,At);break;case 3:if(Vt(e,r),(r&130023424)===r&&(t=Vl+500-ge(),10<t)){if(to(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Re(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Sa(fn.bind(null,e,De,At),t);break}fn(e,De,At);break;case 4:if(Vt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var s=31-ht(r);o=1<<s,s=t[s],s>i&&(i=s),r&=~o}if(r=i,r=ge()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Gg(r/1960))-r,10<r){e.timeoutHandle=Sa(fn.bind(null,e,De,At),r);break}fn(e,De,At);break;case 5:fn(e,De,At);break;default:throw Error(P(329))}}}return Ve(e,ge()),e.callbackNode===n?cp.bind(null,e):null}function Ua(e,t){var n=Pr;return e.current.memoizedState.isDehydrated&&(wn(e,t).flags|=256),e=ko(e,t),e!==2&&(t=De,De=n,t!==null&&$a(t)),e}function $a(e){De===null?De=e:De.push.apply(De,e)}function Qg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!mt(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Vt(e,t){for(t&=~$l,t&=~Do,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ht(t),r=1<<n;e[n]=-1,t&=~r}}function Sd(e){if(J&6)throw Error(P(327));Jn();var t=to(e,0);if(!(t&1))return Ve(e,ge()),null;var n=ko(e,t);if(e.tag!==0&&n===2){var r=ma(e);r!==0&&(t=r,n=Ua(e,r))}if(n===1)throw n=Jr,wn(e,0),Vt(e,t),Ve(e,ge()),n;if(n===6)throw Error(P(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,fn(e,De,At),Ve(e,ge()),null}function Hl(e,t){var n=J;J|=1;try{return e(t)}finally{J=n,J===0&&(sr=ge()+500,Mo&&dn())}}function An(e){Qt!==null&&Qt.tag===0&&!(J&6)&&Jn();var t=J;J|=1;var n=it.transition,r=ee;try{if(it.transition=null,ee=1,e)return e()}finally{ee=r,it.transition=n,J=t,!(J&6)&&dn()}}function Kl(){Ke=Hn.current,le(Hn)}function wn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,jg(n)),ye!==null)for(n=ye.return;n!==null;){var r=n;switch(Al(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&so();break;case 3:ir(),le(Ue),le(ze),Ll();break;case 5:_l(r);break;case 4:ir();break;case 13:le(he);break;case 19:le(he);break;case 10:El(r.type._context);break;case 22:case 23:Kl()}n=n.return}if(Se=e,ye=e=on(e.current,null),Ce=Ke=t,ke=0,Jr=null,$l=Do=Cn=0,De=Pr=null,gn!==null){for(t=0;t<gn.length;t++)if(n=gn[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var s=o.next;o.next=i,r.next=s}n.pending=r}gn=null}return e}function dp(e,t){do{var n=ye;try{if(Tl(),Wi.current=go,mo){for(var r=pe.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}mo=!1}if(jn=0,be=xe=pe=null,Er=!1,Xr=0,Ul.current=null,n===null||n.return===null){ke=1,Jr=t,ye=null;break}e:{var o=e,s=n.return,l=n,c=t;if(t=Ce,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,d=l,h=d.tag;if(!(d.mode&1)&&(h===0||h===11||h===15)){var p=d.alternate;p?(d.updateQueue=p.updateQueue,d.memoizedState=p.memoizedState,d.lanes=p.lanes):(d.updateQueue=null,d.memoizedState=null)}var x=dd(s);if(x!==null){x.flags&=-257,ud(x,s,l,o,t),x.mode&1&&cd(o,u,t),t=x,c=u;var b=t.updateQueue;if(b===null){var v=new Set;v.add(c),t.updateQueue=v}else b.add(c);break e}else{if(!(t&1)){cd(o,u,t),Gl();break e}c=Error(P(426))}}else if(de&&l.mode&1){var A=dd(s);if(A!==null){!(A.flags&65536)&&(A.flags|=256),ud(A,s,l,o,t),Il(or(c,l));break e}}o=c=or(c,l),ke!==4&&(ke=2),Pr===null?Pr=[o]:Pr.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var g=Kh(o,c,t);rd(o,g);break e;case 1:l=c;var f=o.type,m=o.stateNode;if(!(o.flags&128)&&(typeof f.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(nn===null||!nn.has(m)))){o.flags|=65536,t&=-t,o.lanes|=t;var w=Gh(o,l,t);rd(o,w);break e}}o=o.return}while(o!==null)}pp(n)}catch(S){t=S,ye===n&&n!==null&&(ye=n=n.return);continue}break}while(!0)}function up(){var e=yo.current;return yo.current=go,e===null?go:e}function Gl(){(ke===0||ke===3||ke===2)&&(ke=4),Se===null||!(Cn&268435455)&&!(Do&268435455)||Vt(Se,Ce)}function ko(e,t){var n=J;J|=2;var r=up();(Se!==e||Ce!==t)&&(At=null,wn(e,t));do try{Xg();break}catch(i){dp(e,i)}while(!0);if(Tl(),J=n,yo.current=r,ye!==null)throw Error(P(261));return Se=null,Ce=0,ke}function Xg(){for(;ye!==null;)hp(ye)}function Yg(){for(;ye!==null&&!bm();)hp(ye)}function hp(e){var t=mp(e.alternate,e,Ke);e.memoizedProps=e.pendingProps,t===null?pp(e):ye=t,Ul.current=null}function pp(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=$g(n,t),n!==null){n.flags&=32767,ye=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ke=6,ye=null;return}}else if(n=Ug(n,t,Ke),n!==null){ye=n;return}if(t=t.sibling,t!==null){ye=t;return}ye=t=e}while(t!==null);ke===0&&(ke=5)}function fn(e,t,n){var r=ee,i=it.transition;try{it.transition=null,ee=1,Zg(e,t,n,r)}finally{it.transition=i,ee=r}return null}function Zg(e,t,n,r){do Jn();while(Qt!==null);if(J&6)throw Error(P(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(P(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(zm(e,o),e===Se&&(ye=Se=null,Ce=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ai||(Ai=!0,gp(eo,function(){return Jn(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=it.transition,it.transition=null;var s=ee;ee=1;var l=J;J|=4,Ul.current=null,Hg(e,n),ap(n,e),vg(wa),no=!!ka,wa=ka=null,e.current=n,Kg(n),Sm(),J=l,ee=s,it.transition=o}else e.current=n;if(Ai&&(Ai=!1,Qt=e,xo=i),o=e.pendingLanes,o===0&&(nn=null),Cm(n.stateNode),Ve(e,ge()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(vo)throw vo=!1,e=Da,Da=null,e;return xo&1&&e.tag!==0&&Jn(),o=e.pendingLanes,o&1?e===Wa?Fr++:(Fr=0,Wa=e):Fr=0,dn(),null}function Jn(){if(Qt!==null){var e=Ku(xo),t=it.transition,n=ee;try{if(it.transition=null,ee=16>e?16:e,Qt===null)var r=!1;else{if(e=Qt,Qt=null,xo=0,J&6)throw Error(P(331));var i=J;for(J|=4,B=e.current;B!==null;){var o=B,s=o.child;if(B.flags&16){var l=o.deletions;if(l!==null){for(var c=0;c<l.length;c++){var u=l[c];for(B=u;B!==null;){var d=B;switch(d.tag){case 0:case 11:case 15:zr(8,d,o)}var h=d.child;if(h!==null)h.return=d,B=h;else for(;B!==null;){d=B;var p=d.sibling,x=d.return;if(ip(d),d===u){B=null;break}if(p!==null){p.return=x,B=p;break}B=x}}}var b=o.alternate;if(b!==null){var v=b.child;if(v!==null){b.child=null;do{var A=v.sibling;v.sibling=null,v=A}while(v!==null)}}B=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,B=s;else e:for(;B!==null;){if(o=B,o.flags&2048)switch(o.tag){case 0:case 11:case 15:zr(9,o,o.return)}var g=o.sibling;if(g!==null){g.return=o.return,B=g;break e}B=o.return}}var f=e.current;for(B=f;B!==null;){s=B;var m=s.child;if(s.subtreeFlags&2064&&m!==null)m.return=s,B=m;else e:for(s=f;B!==null;){if(l=B,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:qo(9,l)}}catch(S){me(l,l.return,S)}if(l===s){B=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,B=w;break e}B=l.return}}if(J=i,dn(),bt&&typeof bt.onPostCommitFiberRoot=="function")try{bt.onPostCommitFiberRoot(zo,e)}catch{}r=!0}return r}finally{ee=n,it.transition=t}}return!1}function Nd(e,t,n){t=or(n,t),t=Kh(e,t,1),e=tn(e,t,1),t=Re(),e!==null&&(oi(e,1,t),Ve(e,t))}function me(e,t,n){if(e.tag===3)Nd(e,e,n);else for(;t!==null;){if(t.tag===3){Nd(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(nn===null||!nn.has(r))){e=or(n,e),e=Gh(t,e,1),t=tn(t,e,1),e=Re(),t!==null&&(oi(t,1,e),Ve(t,e));break}}t=t.return}}function Jg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Re(),e.pingedLanes|=e.suspendedLanes&n,Se===e&&(Ce&n)===n&&(ke===4||ke===3&&(Ce&130023424)===Ce&&500>ge()-Vl?wn(e,0):$l|=n),Ve(e,t)}function fp(e,t){t===0&&(e.mode&1?(t=yi,yi<<=1,!(yi&130023424)&&(yi=4194304)):t=1);var n=Re();e=Ft(e,t),e!==null&&(oi(e,t,n),Ve(e,n))}function ey(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),fp(e,n)}function ty(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(P(314))}r!==null&&r.delete(t),fp(e,n)}var mp;mp=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ue.current)We=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return We=!1,Wg(e,t,n);We=!!(e.flags&131072)}else We=!1,de&&t.flags&1048576&&xh(t,co,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;$i(e,t),e=t.pendingProps;var i=tr(t,ze.current);Zn(t,n),i=Rl(null,t,r,e,i,n);var o=Bl();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,$e(r)?(o=!0,ao(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Pl(t),i.updater=Bo,t.stateNode=i,i._reactInternals=t,Ta(t,r,e,n),t=Pa(null,t,r,!0,o,n)):(t.tag=0,de&&o&&Cl(t),_e(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch($i(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=ry(r),e=lt(r,e),i){case 0:t=za(null,t,r,e,n);break e;case 1:t=fd(null,t,r,e,n);break e;case 11:t=hd(null,t,r,e,n);break e;case 14:t=pd(null,t,r,lt(r.type,e),n);break e}throw Error(P(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:lt(r,i),za(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:lt(r,i),fd(e,t,r,i,n);case 3:e:{if(Zh(t),e===null)throw Error(P(387));r=t.pendingProps,o=t.memoizedState,i=o.element,jh(e,t),po(t,r,null,n);var s=t.memoizedState;if(r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=or(Error(P(423)),t),t=md(e,t,r,n,i);break e}else if(r!==i){i=or(Error(P(424)),t),t=md(e,t,r,n,i);break e}else for(Xe=en(t.stateNode.containerInfo.firstChild),Ye=t,de=!0,dt=null,n=Sh(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(nr(),r===i){t=_t(e,t,n);break e}_e(e,t,r,n)}t=t.child}return t;case 5:return Ch(t),e===null&&Aa(t),r=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,s=i.children,ba(r,i)?s=null:o!==null&&ba(r,o)&&(t.flags|=32),Yh(e,t),_e(e,t,s,n),t.child;case 6:return e===null&&Aa(t),null;case 13:return Jh(e,t,n);case 4:return Fl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=rr(t,null,r,n):_e(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:lt(r,i),hd(e,t,r,i,n);case 7:return _e(e,t,t.pendingProps,n),t.child;case 8:return _e(e,t,t.pendingProps.children,n),t.child;case 12:return _e(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,s=i.value,oe(uo,r._currentValue),r._currentValue=s,o!==null)if(mt(o.value,s)){if(o.children===i.children&&!Ue.current){t=_t(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){s=o.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(o.tag===1){c=Et(-1,n&-n),c.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Ia(o.return,n,t),l.lanes|=n;break}c=c.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(P(341));s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Ia(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}_e(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Zn(t,n),i=ot(i),r=r(i),t.flags|=1,_e(e,t,r,n),t.child;case 14:return r=t.type,i=lt(r,t.pendingProps),i=lt(r.type,i),pd(e,t,r,i,n);case 15:return Qh(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:lt(r,i),$i(e,t),t.tag=1,$e(r)?(e=!0,ao(t)):e=!1,Zn(t,n),Hh(t,r,i),Ta(t,r,i,n),Pa(null,t,r,!0,e,n);case 19:return ep(e,t,n);case 22:return Xh(e,t,n)}throw Error(P(156,t.tag))};function gp(e,t){return Uu(e,t)}function ny(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function rt(e,t,n,r){return new ny(e,t,n,r)}function Ql(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ry(e){if(typeof e=="function")return Ql(e)?1:0;if(e!=null){if(e=e.$$typeof,e===fl)return 11;if(e===ml)return 14}return 2}function on(e,t){var n=e.alternate;return n===null?(n=rt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ki(e,t,n,r,i,o){var s=2;if(r=e,typeof e=="function")Ql(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case Ln:return bn(n.children,i,o,t);case pl:s=8,i|=8;break;case ea:return e=rt(12,n,t,i|2),e.elementType=ea,e.lanes=o,e;case ta:return e=rt(13,n,t,i),e.elementType=ta,e.lanes=o,e;case na:return e=rt(19,n,t,i),e.elementType=na,e.lanes=o,e;case Cu:return Wo(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Nu:s=10;break e;case ju:s=9;break e;case fl:s=11;break e;case ml:s=14;break e;case Dt:s=16,r=null;break e}throw Error(P(130,e==null?e:typeof e,""))}return t=rt(s,n,t,i),t.elementType=e,t.type=r,t.lanes=o,t}function bn(e,t,n,r){return e=rt(7,e,r,t),e.lanes=n,e}function Wo(e,t,n,r){return e=rt(22,e,r,t),e.elementType=Cu,e.lanes=n,e.stateNode={isHidden:!1},e}function Ts(e,t,n){return e=rt(6,e,null,t),e.lanes=n,e}function Es(e,t,n){return t=rt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function iy(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=us(0),this.expirationTimes=us(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=us(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Xl(e,t,n,r,i,o,s,l,c){return e=new iy(e,t,n,l,c),t===1?(t=1,o===!0&&(t|=8)):t=0,o=rt(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Pl(o),e}function oy(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:_n,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function yp(e){if(!e)return an;e=e._reactInternals;e:{if(En(e)!==e||e.tag!==1)throw Error(P(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if($e(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(P(171))}if(e.tag===1){var n=e.type;if($e(n))return yh(e,n,t)}return t}function vp(e,t,n,r,i,o,s,l,c){return e=Xl(n,r,!0,e,i,o,s,l,c),e.context=yp(null),n=e.current,r=Re(),i=rn(n),o=Et(r,i),o.callback=t??null,tn(n,o,i),e.current.lanes=i,oi(e,i,r),Ve(e,r),e}function Uo(e,t,n,r){var i=t.current,o=Re(),s=rn(i);return n=yp(n),t.context===null?t.context=n:t.pendingContext=n,t=Et(o,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=tn(i,t,s),e!==null&&(pt(e,i,s,o),Di(e,i,s)),s}function wo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function jd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Yl(e,t){jd(e,t),(e=e.alternate)&&jd(e,t)}function sy(){return null}var xp=typeof reportError=="function"?reportError:function(e){console.error(e)};function Zl(e){this._internalRoot=e}$o.prototype.render=Zl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(P(409));Uo(e,t,null,null)};$o.prototype.unmount=Zl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;An(function(){Uo(null,e,null,null)}),t[Pt]=null}};function $o(e){this._internalRoot=e}$o.prototype.unstable_scheduleHydration=function(e){if(e){var t=Xu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<$t.length&&t!==0&&t<$t[n].priority;n++);$t.splice(n,0,e),n===0&&Zu(e)}};function Jl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Vo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Cd(){}function ay(e,t,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var u=wo(s);o.call(u)}}var s=vp(t,r,e,0,null,!1,!1,"",Cd);return e._reactRootContainer=s,e[Pt]=s.current,Vr(e.nodeType===8?e.parentNode:e),An(),s}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var u=wo(c);l.call(u)}}var c=Xl(e,0,!1,null,null,!1,!1,"",Cd);return e._reactRootContainer=c,e[Pt]=c.current,Vr(e.nodeType===8?e.parentNode:e),An(function(){Uo(t,c,n,r)}),c}function Ho(e,t,n,r,i){var o=n._reactRootContainer;if(o){var s=o;if(typeof i=="function"){var l=i;i=function(){var c=wo(s);l.call(c)}}Uo(t,s,e,i)}else s=ay(n,t,e,i,r);return wo(s)}Gu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Sr(t.pendingLanes);n!==0&&(vl(t,n|1),Ve(t,ge()),!(J&6)&&(sr=ge()+500,dn()))}break;case 13:An(function(){var r=Ft(e,1);if(r!==null){var i=Re();pt(r,e,1,i)}}),Yl(e,1)}};xl=function(e){if(e.tag===13){var t=Ft(e,134217728);if(t!==null){var n=Re();pt(t,e,134217728,n)}Yl(e,134217728)}};Qu=function(e){if(e.tag===13){var t=rn(e),n=Ft(e,t);if(n!==null){var r=Re();pt(n,e,t,r)}Yl(e,t)}};Xu=function(){return ee};Yu=function(e,t){var n=ee;try{return ee=e,t()}finally{ee=n}};ha=function(e,t,n){switch(t){case"input":if(oa(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Lo(r);if(!i)throw Error(P(90));Iu(r),oa(r,i)}}}break;case"textarea":Tu(e,n);break;case"select":t=n.value,t!=null&&Gn(e,!!n.multiple,t,!1)}};Mu=Hl;Ru=An;var ly={usingClientEntryPoint:!1,Events:[ai,qn,Lo,_u,Lu,Hl]},xr={findFiberByHostInstance:mn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},cy={bundleType:xr.bundleType,version:xr.version,rendererPackageName:xr.rendererPackageName,rendererConfig:xr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Lt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Du(e),e===null?null:e.stateNode},findFiberByHostInstance:xr.findFiberByHostInstance||sy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ii=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ii.isDisabled&&Ii.supportsFiber)try{zo=Ii.inject(cy),bt=Ii}catch{}}Je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ly;Je.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Jl(t))throw Error(P(200));return oy(e,t,null,n)};Je.createRoot=function(e,t){if(!Jl(e))throw Error(P(299));var n=!1,r="",i=xp;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Xl(e,1,!1,null,null,n,!1,r,i),e[Pt]=t.current,Vr(e.nodeType===8?e.parentNode:e),new Zl(t)};Je.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(P(188)):(e=Object.keys(e).join(","),Error(P(268,e)));return e=Du(t),e=e===null?null:e.stateNode,e};Je.flushSync=function(e){return An(e)};Je.hydrate=function(e,t,n){if(!Vo(t))throw Error(P(200));return Ho(null,e,t,!0,n)};Je.hydrateRoot=function(e,t,n){if(!Jl(e))throw Error(P(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",s=xp;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=vp(t,null,e,1,n??null,i,!1,o,s),e[Pt]=t.current,Vr(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new $o(t)};Je.render=function(e,t,n){if(!Vo(t))throw Error(P(200));return Ho(null,e,t,!1,n)};Je.unmountComponentAtNode=function(e){if(!Vo(e))throw Error(P(40));return e._reactRootContainer?(An(function(){Ho(null,null,e,!1,function(){e._reactRootContainer=null,e[Pt]=null})}),!0):!1};Je.unstable_batchedUpdates=Hl;Je.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Vo(n))throw Error(P(200));if(e==null||e._reactInternals===void 0)throw Error(P(38));return Ho(e,t,n,!1,r)};Je.version="18.3.1-next-f1338f8080-20240426";function kp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kp)}catch(e){console.error(e)}}kp(),ku.exports=Je;var wp=ku.exports,Ad=wp;Zs.createRoot=Ad.createRoot,Zs.hydrateRoot=Ad.hydrateRoot;var xn,dy=(xn=class extends Error{constructor(n){super(new.target.formatMessage(new.target.kind,n.message,n.code,n.docsUrl),{cause:n.cause});Ct(this,"clerkError",!0);Ct(this,"code");Ct(this,"longMessage");Ct(this,"docsUrl");Ct(this,"cause");Object.setPrototypeOf(this,xn.prototype),this.code=n.code,this.docsUrl=n.docsUrl,this.longMessage=n.longMessage,this.cause=n.cause}get name(){return this.constructor.name}toString(){return`[${this.name}]
Message:${this.message}`}static formatMessage(n,r,i,o){const s="Clerk:",l=new RegExp(s.replace(" ","\\s*"),"i");return r=r.replace(l,""),r=`${s} ${r.trim()}

(code="${i}")

`,o&&(r+=`

Docs: ${o}`),r}},Ct(xn,"kind","ClerkError"),xn);const uy=Object.freeze({InvalidProxyUrlErrorMessage:"The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})",InvalidPublishableKeyErrorMessage:"The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})",MissingPublishableKeyErrorMessage:"Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.",MissingSecretKeyErrorMessage:"Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.",MissingClerkProvider:"{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider"});function bp({packageName:e,customMessages:t}){let n=e;function r(o,s){if(!s)return`${n}: ${o}`;let l=o;const c=o.matchAll(/{{([a-zA-Z0-9-_]+)}}/g);for(const u of c){const d=(s[u[1]]||"").toString();l=l.replace(`{{${u[1]}}}`,d)}return`${n}: ${l}`}const i={...uy,...t};return{setPackageName({packageName:o}){return typeof o=="string"&&(n=o),this},setMessages({customMessages:o}){return Object.assign(i,o||{}),this},throwInvalidPublishableKeyError(o){throw new Error(r(i.InvalidPublishableKeyErrorMessage,o))},throwInvalidProxyUrl(o){throw new Error(r(i.InvalidProxyUrlErrorMessage,o))},throwMissingPublishableKeyError(){throw new Error(r(i.MissingPublishableKeyErrorMessage))},throwMissingSecretKeyError(){throw new Error(r(i.MissingSecretKeyErrorMessage))},throwMissingClerkProviderError(o){throw new Error(r(i.MissingClerkProvider,o))},throw(o){throw new Error(r(o))}}}var kn,Va=(kn=class extends dy{constructor(n,r){super({...r,message:n});Ct(this,"clerkRuntimeError",!0);Object.setPrototypeOf(this,kn.prototype)}},Ct(kn,"kind","ClerkRuntimeError"),kn);const hy={strict_mfa:{afterMinutes:10,level:"multi_factor"},strict:{afterMinutes:10,level:"second_factor"},moderate:{afterMinutes:60,level:"second_factor"},lax:{afterMinutes:1440,level:"second_factor"}},py=new Set(["first_factor","second_factor","multi_factor"]),fy=new Set(["strict_mfa","strict","moderate","lax"]),my=e=>typeof e=="number"&&e>0,gy=e=>py.has(e),yy=e=>fy.has(e),Id=e=>typeof e=="number"&&Number.isFinite(e)&&(e===-1||e>=0),zs=e=>e.replace(/^(org:)*/,"org:"),vy=(e,t)=>{const{orgId:n,orgRole:r,orgPermissions:i}=t,o=e.role!==void 0,s=e.permission!==void 0;return!o&&!s?"skip":o&&typeof e.role!="string"||s&&typeof e.permission!="string"||!n||o&&(typeof r!="string"||!r||zs(r)!==zs(e.role))||s&&(!Array.isArray(i)||!i.includes(zs(e.permission)))?"fail":"pass"},Od=(e,t)=>{const{org:n,user:r}=ky(e),[i,o]=t.split(":"),s=o||i;return i==="org"?n.includes(s):i==="user"?r.includes(s):[...n,...r].includes(s)},xy=(e,t)=>{const{features:n,plans:r}=t,i=e.feature!==void 0,o=e.plan!==void 0;if(!i&&!o)return"skip";if(i&&typeof e.feature!="string"||o&&typeof e.plan!="string")return"fail";if(i){if(typeof n!="string"||!n)return"fail";try{if(!Od(n,e.feature))return"fail"}catch{return"fail"}}if(o){if(typeof r!="string"||!r)return"fail";try{if(!Od(r,e.plan))return"fail"}catch{return"fail"}}return"pass"},ky=e=>{const t=e?e.split(",").map(n=>n.trim()):[];return{org:t.filter(n=>n.split(":")[0].includes("o")).map(n=>n.split(":")[1]),user:t.filter(n=>n.split(":")[0].includes("u")).map(n=>n.split(":")[1])}},wy=e=>{if(!e)return!1;const t=i=>typeof i=="string"?hy[i]:i,n=typeof e=="string"&&yy(e),r=typeof e=="object"&&gy(e.level)&&my(e.afterMinutes);return n||r?t.bind(null,e):!1},by=(e,{factorVerificationAge:t})=>{if(e.reverification===void 0)return"skip";if(!t||!Array.isArray(t)||t.length!==2||!Id(t[0])||!Id(t[1]))return"fail";const n=wy(e.reverification);if(!n)return"fail";const{level:r,afterMinutes:i}=n(),[o,s]=t;if(o===-1&&s===-1)return"fail";const l=o!==-1&&i>o,c=s!==-1&&i>s;switch(r){case"first_factor":return l?"pass":"fail";case"second_factor":return s===-1?l?"pass":"fail":c?"pass":"fail";case"multi_factor":return s===-1?l?"pass":"fail":o===-1?"fail":l&&c?"pass":"fail"}},Sy=e=>e.some(t=>t==="pass")&&e.every(t=>t==="pass"||t==="skip"),Ny=e=>t=>e.userId?Sy([vy(t,e),xy(t,e),by(t,e)]):!1,jy=({authObject:{sessionId:e,sessionStatus:t,userId:n,actor:r,orgId:i,orgRole:o,orgSlug:s,signOut:l,getToken:c,has:u,sessionClaims:d},options:{treatPendingAsSignedOut:h=!0}})=>{if(e===void 0&&n===void 0)return{isLoaded:!1,isSignedIn:void 0,sessionId:e,sessionClaims:void 0,userId:n,actor:void 0,orgId:void 0,orgRole:void 0,orgSlug:void 0,has:void 0,signOut:l,getToken:c};if(e===null&&n===null)return{isLoaded:!0,isSignedIn:!1,sessionId:e,userId:n,sessionClaims:null,actor:null,orgId:null,orgRole:null,orgSlug:null,has:()=>!1,signOut:l,getToken:c};if(h&&t==="pending")return{isLoaded:!0,isSignedIn:!1,sessionId:null,userId:null,sessionClaims:null,actor:null,orgId:null,orgRole:null,orgSlug:null,has:()=>!1,signOut:l,getToken:c};if(e&&d&&n&&i&&o)return{isLoaded:!0,isSignedIn:!0,sessionId:e,sessionClaims:d,userId:n,actor:r||null,orgId:i,orgRole:o,orgSlug:s||null,has:u,signOut:l,getToken:c};if(e&&d&&n&&!i)return{isLoaded:!0,isSignedIn:!0,sessionId:e,sessionClaims:d,userId:n,actor:r||null,orgId:null,orgRole:null,orgSlug:null,has:u,signOut:l,getToken:c}},Cy=[".lcl.dev",".stg.dev",".lclstage.dev",".stgstage.dev",".dev.lclclerk.com",".stg.lclclerk.com",".accounts.lclclerk.com","accountsstage.dev","accounts.dev"],Sp=e=>typeof atob<"u"&&typeof atob=="function"?atob(e):typeof global<"u"&&global.Buffer?new global.Buffer(e,"base64").toString():e,Np="pk_live_",Ay="pk_test_";function jp(e){if(!e.endsWith("$"))return!1;const t=e.slice(0,-1);return t.includes("$")?!1:t.includes(".")}function Td(e,t={}){if(e=e||"",!e||!Ha(e)){if(t.fatal&&!e)throw new Error("Publishable key is missing. Ensure that your publishable key is correctly configured. Double-check your environment configuration for your keys, or access them here: https://dashboard.clerk.com/last-active?path=api-keys");if(t.fatal&&!Ha(e))throw new Error("Publishable key not valid.");return null}const n=e.startsWith(Np)?"production":"development";let r;try{r=Sp(e.split("_")[2])}catch{if(t.fatal)throw new Error("Publishable key not valid: Failed to decode key.");return null}if(!jp(r)){if(t.fatal)throw new Error("Publishable key not valid: Decoded key has invalid format.");return null}let i=r.slice(0,-1);return t.proxyUrl?i=t.proxyUrl:n!=="development"&&t.domain&&t.isSatellite&&(i=`clerk.${t.domain}`),{instanceType:n,frontendApi:i}}function Ha(e=""){try{if(!(e.startsWith(Np)||e.startsWith(Ay)))return!1;const t=e.split("_");if(t.length!==3)return!1;const n=t[2];return n?jp(Sp(n)):!1}catch{return!1}}function Iy(){const e=new Map;return{isDevOrStagingUrl:t=>{if(!t)return!1;const n=typeof t=="string"?t:t.hostname;let r=e.get(n);return r===void 0&&(r=Cy.some(i=>n.endsWith(i)),e.set(n,r)),r}}}const Oy="METHOD_CALLED",Ty=.1;function Cp(e,t){return{event:Oy,eventSamplingRate:Ty,payload:{method:e,...t}}}var Ey={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ar=z;function zy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Py=typeof Object.is=="function"?Object.is:zy,Fy=ar.useState,_y=ar.useEffect,Ly=ar.useLayoutEffect,My=ar.useDebugValue;function Ry(e,t){var n=t(),r=Fy({inst:{value:n,getSnapshot:t}}),i=r[0].inst,o=r[1];return Ly(function(){i.value=n,i.getSnapshot=t,Ps(i)&&o({inst:i})},[e,n,t]),_y(function(){return Ps(i)&&o({inst:i}),e(function(){Ps(i)&&o({inst:i})})},[e]),My(n),n}function Ps(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Py(e,n)}catch{return!0}}function By(e,t){return t()}var qy=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?By:Ry;Ey.useSyncExternalStore=ar.useSyncExternalStore!==void 0?ar.useSyncExternalStore:qy;const Dy=0,Wy=1,Uy=2;var Ed=Object.prototype.hasOwnProperty;function Ka(e,t){var n,r;if(e===t)return!0;if(e&&t&&(n=e.constructor)===t.constructor){if(n===Date)return e.getTime()===t.getTime();if(n===RegExp)return e.toString()===t.toString();if(n===Array){if((r=e.length)===t.length)for(;r--&&Ka(e[r],t[r]););return r===-1}if(!n||typeof e=="object"){r=0;for(n in e)if(Ed.call(e,n)&&++r&&!Ed.call(t,n)||!(n in t)||!Ka(e[n],t[n]))return!1;return Object.keys(t).length===r}}return e!==e&&t!==t}const Ht=new WeakMap,Xt=()=>{},Ge=Xt(),bo=Object,ut=e=>e===Ge,Kt=e=>typeof e=="function",In=(e,t)=>({...e,...t}),$y=e=>Kt(e.then),Fs={},Oi={},Ap="undefined",Ko=typeof window!=Ap,Ga=typeof document!=Ap,Vy=Ko&&"Deno"in window,Hy=(e,t)=>{const n=Ht.get(e);return[()=>!ut(t)&&e.get(t)||Fs,r=>{if(!ut(t)){const i=e.get(t);t in Oi||(Oi[t]=i),n[5](t,In(i,r),i||Fs)}},n[6],()=>!ut(t)&&t in Oi?Oi[t]:!ut(t)&&e.get(t)||Fs]};let Qa=!0;const Ky=()=>Qa,[Xa,Ya]=Ko&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[Xt,Xt],Gy=()=>{const e=Ga&&document.visibilityState;return ut(e)||e!=="hidden"},Qy=e=>(Ga&&document.addEventListener("visibilitychange",e),Xa("focus",e),()=>{Ga&&document.removeEventListener("visibilitychange",e),Ya("focus",e)}),Xy=e=>{const t=()=>{Qa=!0,e()},n=()=>{Qa=!1};return Xa("online",t),Xa("offline",n),()=>{Ya("online",t),Ya("offline",n)}},Yy={isOnline:Ky,isVisible:Gy},Zy={initFocus:Qy,initReconnect:Xy};j.useId;const ec=!Ko||Vy,Jy=ec?z.useEffect:z.useLayoutEffect,_s=typeof navigator<"u"&&navigator.connection,zd=!ec&&_s&&(["slow-2g","2g"].includes(_s.effectiveType)||_s.saveData),Ti=new WeakMap,ev=e=>bo.prototype.toString.call(e),Ls=(e,t)=>e===`[object ${t}]`;let tv=0;const Za=e=>{const t=typeof e,n=ev(e),r=Ls(n,"Date"),i=Ls(n,"RegExp"),o=Ls(n,"Object");let s,l;if(bo(e)===e&&!r&&!i){if(s=Ti.get(e),s)return s;if(s=++tv+"~",Ti.set(e,s),Array.isArray(e)){for(s="@",l=0;l<e.length;l++)s+=Za(e[l])+",";Ti.set(e,s)}if(o){s="#";const c=bo.keys(e).sort();for(;!ut(l=c.pop());)ut(e[l])||(s+=l+":"+Za(e[l])+",");Ti.set(e,s)}}else s=r?e.toJSON():t=="symbol"?e.toString():t=="string"?JSON.stringify(e):""+e;return s},Ip=e=>{if(Kt(e))try{e=e()}catch{e=""}const t=e;return e=typeof e=="string"?e:(Array.isArray(e)?e.length:e)?Za(e):"",[e,t]};let nv=0;const Pd=()=>++nv;async function rv(...e){const[t,n,r,i]=e,o=In({populateCache:!0,throwOnError:!0},typeof i=="boolean"?{revalidate:i}:i||{});let s=o.populateCache;const l=o.rollbackOnError;let c=o.optimisticData;const u=p=>typeof l=="function"?l(p):l!==!1,d=o.throwOnError;if(Kt(n)){const p=n,x=[],b=t.keys();for(const v of b)!/^\$(inf|sub)\$/.test(v)&&p(t.get(v)._k)&&x.push(v);return Promise.all(x.map(h))}return h(n);async function h(p){const[x]=Ip(p);if(!x)return;const[b,v]=Hy(t,x),[A,g,f,m]=Ht.get(t),w=()=>{const G=A[x];return(Kt(o.revalidate)?o.revalidate(b().data,p):o.revalidate!==!1)&&(delete f[x],delete m[x],G&&G[0])?G[0](Uy).then(()=>b().data):b().data};if(e.length<3)return w();let S=r,N,T=!1;const C=Pd();g[x]=[C,0];const M=!ut(c),R=b(),L=R.data,V=R._c,K=ut(V)?L:V;if(M&&(c=Kt(c)?c(K,L):c,v({data:c,_c:K})),Kt(S))try{S=S(K)}catch(G){N=G,T=!0}if(S&&$y(S))if(S=await S.catch(G=>{N=G,T=!0}),C!==g[x][0]){if(T)throw N;return S}else T&&M&&u(N)&&(s=!0,v({data:K,_c:Ge}));if(s&&!T)if(Kt(s)){const G=s(S,K);v({data:G,error:Ge,_c:Ge})}else v({data:S,error:Ge,_c:Ge});if(g[x][1]=Pd(),Promise.resolve(w()).then(()=>{v({_c:Ge})}),T){if(d)throw N;return}return S}}const Fd=(e,t)=>{for(const n in e)e[n][0]&&e[n][0](t)},Op=(e,t)=>{if(!Ht.has(e)){const n=In(Zy,t),r=Object.create(null),i=rv.bind(Ge,e);let o=Xt;const s=Object.create(null),l=(d,h)=>{const p=s[d]||[];return s[d]=p,p.push(h),()=>p.splice(p.indexOf(h),1)},c=(d,h,p)=>{e.set(d,h);const x=s[d];if(x)for(const b of x)b(h,p)},u=()=>{if(!Ht.has(e)&&(Ht.set(e,[r,Object.create(null),Object.create(null),Object.create(null),i,c,l]),!ec)){const d=n.initFocus(setTimeout.bind(Ge,Fd.bind(Ge,r,Dy))),h=n.initReconnect(setTimeout.bind(Ge,Fd.bind(Ge,r,Wy)));o=()=>{d&&d(),h&&h(),Ht.delete(e)}}};return u(),[e,i,u,o]}return[e,Ht.get(e)[4]]},iv=(e,t,n,r,i)=>{const o=n.errorRetryCount,s=i.retryCount,l=~~((Math.random()+.5)*(1<<(s<8?s:8)))*n.errorRetryInterval;!ut(o)&&s>o||setTimeout(r,l,i)},ov=Ka,[tc,sv]=Op(new Map),av=In({onLoadingSlow:Xt,onSuccess:Xt,onError:Xt,onErrorRetry:iv,onDiscarded:Xt,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:zd?1e4:5e3,focusThrottleInterval:5*1e3,dedupingInterval:2*1e3,loadingTimeout:zd?5e3:3e3,compare:ov,isPaused:()=>!1,cache:tc,mutate:sv,fallback:{}},Yy),lv=(e,t)=>{const n=In(e,t);if(t){const{use:r,fallback:i}=e,{use:o,fallback:s}=t;r&&o&&(n.use=r.concat(o)),i&&s&&(n.fallback=In(i,s))}return n},_d=z.createContext({}),cv=e=>{const{value:t}=e,n=z.useContext(_d),r=Kt(t),i=z.useMemo(()=>r?t(n):t,[r,n,t]),o=z.useMemo(()=>r?i:lv(n,i),[r,n,i]),s=i&&i.provider,l=z.useRef(Ge);s&&!l.current&&(l.current=Op(s(o.cache||tc),i));const c=l.current;return c&&(o.cache=c[0],o.mutate=c[1]),Jy(()=>{if(c)return c[2]&&c[2](),c[3]},[]),z.createElement(_d.Provider,In(e,{value:o}))},dv="$inf$",Tp=Ko&&window.__SWR_DEVTOOLS_USE__,uv=Tp?window.__SWR_DEVTOOLS_USE__:[],hv=()=>{Tp&&(window.__SWR_DEVTOOLS_REACT__=j)},pv=e=>(t,n,r)=>e(t,n&&((...o)=>{const[s]=Ip(t),[,,,l]=Ht.get(tc);if(s.startsWith(dv))return n(...o);const c=l[s];return ut(c)?n(...o):(delete l[s],c)}),r);uv.concat(pv);hv();j.use;const fv=bo.defineProperty(cv,"defaultValue",{value:av});var Ld=Object.prototype.hasOwnProperty;function Md(e,t,n){for(n of e.keys())if(_r(n,t))return n}function _r(e,t){var n,r,i;if(e===t)return!0;if(e&&t&&(n=e.constructor)===t.constructor){if(n===Date)return e.getTime()===t.getTime();if(n===RegExp)return e.toString()===t.toString();if(n===Array){if((r=e.length)===t.length)for(;r--&&_r(e[r],t[r]););return r===-1}if(n===Set){if(e.size!==t.size)return!1;for(r of e)if(i=r,i&&typeof i=="object"&&(i=Md(t,i),!i)||!t.has(i))return!1;return!0}if(n===Map){if(e.size!==t.size)return!1;for(r of e)if(i=r[0],i&&typeof i=="object"&&(i=Md(t,i),!i)||!_r(r[1],t.get(i)))return!1;return!0}if(n===ArrayBuffer)e=new Uint8Array(e),t=new Uint8Array(t);else if(n===DataView){if((r=e.byteLength)===t.byteLength)for(;r--&&e.getInt8(r)===t.getInt8(r););return r===-1}if(ArrayBuffer.isView(e)){if((r=e.byteLength)===t.byteLength)for(;r--&&e[r]===t[r];);return r===-1}if(!n||typeof e=="object"){r=0;for(n in e)if(Ld.call(e,n)&&++r&&!Ld.call(t,n)||!(n in t)||!_r(e[n],t[n]))return!1;return Object.keys(t).length===r}}return e!==e&&t!==t}function mv(e,t){if(!e)throw typeof t=="string"?new Error(t):new Error(`${t.displayName} not found`)}const Mt=(e,t)=>{const{assertCtxFn:n=mv}={},r=j.createContext(void 0);return r.displayName=e,[r,()=>{const s=j.useContext(r);return n(s,`${e} not found`),s.value},()=>{const s=j.useContext(r);return s?s.value:{}}]};function gv({swrConfig:e,children:t}){return j.createElement(fv,{value:e},t)}const[Ep,zp]=Mt("ClerkInstanceContext"),[yv,vv]=Mt("UserContext"),[xv]=Mt("ClientContext"),[kv]=Mt("SessionContext");j.createContext({});const[wv]=Mt("CheckoutContext"),bv=({children:e,...t})=>j.createElement(wv.Provider,{value:{value:t}},e),[Sv]=Mt("OrganizationContext"),Nv=({children:e,organization:t,swrConfig:n})=>j.createElement(gv,{swrConfig:n},j.createElement(Sv.Provider,{value:{value:{organization:t}}},e));function Pp(e){if(!j.useContext(Ep)){if(typeof e=="function"){e();return}throw new Error(`${e} can only be used within the <ClerkProvider /> component.

Possible fixes:
1. Ensure that the <ClerkProvider /> is correctly wrapping your application where this component is used.
2. Check for multiple versions of the \`@clerk/shared\` package in your project. Use a tool like \`npm ls @clerk/shared\` to identify multiple versions, and update your dependencies to only rely on one.

Learn more: https://clerk.com/docs/components/clerk-provider`.trim())}}typeof window<"u"?j.useLayoutEffect:j.useEffect;const Rd="useUser";function nc(){var t;Pp(Rd);const e=vv();return(t=zp().telemetry)==null||t.record(Cp(Rd)),e===void 0?{isLoaded:!1,isSignedIn:void 0,user:void 0}:e===null?{isLoaded:!0,isSignedIn:!1,user:null}:{isLoaded:!0,isSignedIn:!0,user:e}}const Bd=_r,jv=e=>{const t=z.useRef(e);return z.useEffect(()=>{t.current=e},[e]),t.current},He=(e,t,n)=>{const r=!!n,i=z.useRef(n);z.useEffect(()=>{i.current=n},[n]),z.useEffect(()=>{if(!r||!e)return()=>{};const o=(...s)=>{i.current&&i.current(...s)};return e.on(t,o),()=>{e.off(t,o)}},[r,t,e,i])},Fp=j.createContext(null);Fp.displayName="ElementsContext";const Cv=(e,t)=>{if(!e)throw new Error(`Could not find Elements context; You need to wrap the part of your app that ${t} in an <Elements> provider.`);return e},So=e=>e!==null&&typeof e=="object",Av=(e,t,n)=>So(e)?Object.keys(e).reduce((r,i)=>{const o=!So(t)||!_p(e[i],t[i]);return n.includes(i)?(o&&console.warn(`Unsupported prop change: options.${i} is not a mutable property.`),r):o?{...r||{},[i]:e[i]}:r},null):null,qd="[object Object]",_p=(e,t)=>{if(!So(e)||!So(t))return e===t;const n=Array.isArray(e);if(n!==Array.isArray(t))return!1;const r=Object.prototype.toString.call(e)===qd;if(r!==(Object.prototype.toString.call(t)===qd))return!1;if(!r&&!n)return e===t;const i=Object.keys(e),o=Object.keys(t);if(i.length!==o.length)return!1;const s={};for(let h=0;h<i.length;h+=1)s[i[h]]=!0;for(let h=0;h<o.length;h+=1)s[o[h]]=!0;const l=Object.keys(s);if(l.length!==i.length)return!1;const c=e,u=t,d=h=>_p(c[h],u[h]);return l.every(d)},Dd=e=>Cv(j.useContext(Fp),e),Iv=e=>e.charAt(0).toUpperCase()+e.slice(1),Ov=(e,t)=>{const n=`${Iv(e)}Element`,o=t?s=>{Dd(`mounts <${n}>`);const{id:l,className:c}=s;return j.createElement("div",{id:l,className:c})}:({id:s,className:l,fallback:c,options:u={},onBlur:d,onFocus:h,onReady:p,onChange:x,onEscape:b,onClick:v,onLoadError:A,onLoaderStart:g,onNetworksChange:f,onConfirm:m,onCancel:w,onShippingAddressChange:S,onShippingRateChange:N})=>{const T=Dd(`mounts <${n}>`),C="elements"in T?T.elements:null,[M,R]=j.useState(null),L=j.useRef(null),V=j.useRef(null),[K,G]=z.useState(!1);He(M,"blur",d),He(M,"focus",h),He(M,"escape",b),He(M,"click",v),He(M,"loaderror",A),He(M,"loaderstart",g),He(M,"networkschange",f),He(M,"confirm",m),He(M,"cancel",w),He(M,"shippingaddresschange",S),He(M,"shippingratechange",N),He(M,"change",x);let ie;p&&(ie=()=>{G(!0),p(M)}),He(M,"ready",ie),j.useLayoutEffect(()=>{if(L.current===null&&V.current!==null&&C){let O=null;C&&(O=C.create(e,u)),L.current=O,R(O),O&&O.mount(V.current)}},[C,u]);const ve=jv(u);return j.useEffect(()=>{if(!L.current)return;const O=Av(u,ve,["paymentRequest"]);O&&"update"in L.current&&L.current.update(O)},[u,ve]),j.useLayoutEffect(()=>()=>{if(L.current&&typeof L.current.destroy=="function")try{L.current.destroy(),L.current=null}catch{}},[]),j.createElement(j.Fragment,null,!K&&c,j.createElement("div",{id:s,style:{height:K?"unset":"0px",visibility:K?"visible":"hidden"},className:l,ref:V}))};return o.displayName=n,o.__elementType=e,o};Ov("payment",typeof window>"u");Mt("PaymentElementContext");Mt("StripeUtilsContext");var ft=bp({packageName:"@clerk/clerk-react"});function Tv(e){ft.setMessages(e).setPackageName(e)}var[Ev,zv]=Mt("AuthContext"),Pv=Ep,Lp=zp,Fv="You've added multiple <ClerkProvider> components in your React component tree. Wrap your components in a single <ClerkProvider>.",_v=e=>`You've passed multiple children components to <${e}/>. You can only pass a single child component or text.`,Lv="Invalid state. Feel free to submit a bug or reach out to support here: https://clerk.com/support",Ms="Unsupported usage of isSatellite, domain or proxyUrl. The usage of isSatellite, domain or proxyUrl as function is not supported in non-browser environments.",Mv="<UserProfile.Page /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.",Rv="<UserProfile.Link /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.",Bv="<OrganizationProfile.Page /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.",qv="<OrganizationProfile.Link /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.",Dv=e=>`<${e} /> can only accept <${e}.Page /> and <${e}.Link /> as its children. Any other provided component will be ignored. Additionally, please ensure that the component is rendered in a client component.`,Wv=e=>`Missing props. <${e}.Page /> component requires the following props: url, label, labelIcon, alongside with children to be rendered inside the page.`,Uv=e=>`Missing props. <${e}.Link /> component requires the following props: url, label and labelIcon.`,$v="<UserButton /> can only accept <UserButton.UserProfilePage />, <UserButton.UserProfileLink /> and <UserButton.MenuItems /> as its children. Any other provided component will be ignored. Additionally, please ensure that the component is rendered in a client component.",Vv="<UserButton.MenuItems /> component can only accept <UserButton.Action /> and <UserButton.Link /> as its children. Any other provided component will be ignored. Additionally, please ensure that the component is rendered in a client component.",Hv="<UserButton.MenuItems /> component needs to be a direct child of `<UserButton />`.",Kv="<UserButton.Action /> component needs to be a direct child of `<UserButton.MenuItems />`.",Gv="<UserButton.Link /> component needs to be a direct child of `<UserButton.MenuItems />`.",Qv="Missing props. <UserButton.Link /> component requires the following props: href, label and labelIcon.",Xv="Missing props. <UserButton.Action /> component requires the following props: label.",Go=e=>{Pp(()=>{ft.throwMissingClerkProviderError({source:e})})},Mp=e=>new Promise(t=>{const n=r=>{["ready","degraded"].includes(r)&&(t(),e.off("status",n))};e.on("status",n,{notify:!0})}),Yv=e=>async t=>(await Mp(e),e.session?e.session.getToken(t):null),Zv=e=>async(...t)=>(await Mp(e),e.signOut(...t)),Rp=(e={})=>{var t;Go("useAuth");const{treatPendingAsSignedOut:n,...r}=e??{},i=r;let s=zv();s.sessionId===void 0&&s.userId===void 0&&(s=i??{});const l=Lp(),c=z.useCallback(Yv(l),[l]),u=z.useCallback(Zv(l),[l]);return(t=l.telemetry)==null||t.record(Cp("useAuth",{treatPendingAsSignedOut:n})),Jv({...s,getToken:c,signOut:u},{treatPendingAsSignedOut:n})};function Jv(e,{treatPendingAsSignedOut:t=!0}={}){const{userId:n,orgId:r,orgRole:i,has:o,signOut:s,getToken:l,orgPermissions:c,factorVerificationAge:u,sessionClaims:d}=e??{},h=z.useCallback(x=>o?o(x):Ny({userId:n,orgId:r,orgRole:i,orgPermissions:c,factorVerificationAge:u,features:(d==null?void 0:d.fea)||"",plans:(d==null?void 0:d.pla)||""})(x),[o,n,r,i,c,u,d]),p=jy({authObject:{...e,getToken:l,signOut:s,has:h},options:{treatPendingAsSignedOut:t}});return p||ft.throw(Lv)}var re=(e,t)=>{const r=(typeof t=="string"?t:t==null?void 0:t.component)||e.displayName||e.name||"Component";e.displayName=r;const i=typeof t=="string"?void 0:t,o=s=>{Go(r||"withClerk");const l=Lp();return!l.loaded&&!(i!=null&&i.renderWhileLoading)?null:j.createElement(e,{...s,component:r,clerk:l})};return o.displayName=`withClerk(${r})`,o};const e0=()=>{try{return!1}catch{}return!1},t0=()=>{try{return!1}catch{}return!1},n0=()=>{try{return!0}catch{}return!1},Wd=new Set,rc=(e,t,n)=>{const r=t0()||n0(),i=e;Wd.has(i)||r||(Wd.add(i),console.warn(`Clerk - DEPRECATION WARNING: "${e}" is deprecated and will be removed in the next major release.
${t}`))};var r0=({children:e,treatPendingAsSignedOut:t})=>{Go("SignedIn");const{userId:n}=Rp({treatPendingAsSignedOut:t});return n?e:null},i0=({children:e,treatPendingAsSignedOut:t})=>{Go("SignedOut");const{userId:n}=Rp({treatPendingAsSignedOut:t});return n===null?e:null};re(({clerk:e,...t})=>{const{client:n,session:r}=e,i=n.signedInSessions?n.signedInSessions.length>0:n.activeSessions&&n.activeSessions.length>0;return j.useEffect(()=>{r===null&&i?e.redirectToAfterSignOut():e.redirectToSignIn(t)},[]),null},"RedirectToSignIn");re(({clerk:e,...t})=>(j.useEffect(()=>{e.redirectToSignUp(t)},[]),null),"RedirectToSignUp");re(({clerk:e,...t})=>(j.useEffect(()=>{e.redirectToTasks(t)},[]),null),"RedirectToTasks");re(({clerk:e})=>(j.useEffect(()=>{rc("RedirectToUserProfile","Use the `redirectToUserProfile()` method instead."),e.redirectToUserProfile()},[]),null),"RedirectToUserProfile");re(({clerk:e})=>(j.useEffect(()=>{rc("RedirectToOrganizationProfile","Use the `redirectToOrganizationProfile()` method instead."),e.redirectToOrganizationProfile()},[]),null),"RedirectToOrganizationProfile");re(({clerk:e})=>(j.useEffect(()=>{rc("RedirectToCreateOrganization","Use the `redirectToCreateOrganization()` method instead."),e.redirectToCreateOrganization()},[]),null),"RedirectToCreateOrganization");re(({clerk:e,...t})=>(j.useEffect(()=>{e.handleRedirectCallback(t)},[]),null),"AuthenticateWithRedirectCallback");function Rs(e,t,n){if(typeof e=="function")return e(t);if(typeof e<"u")return e;if(typeof n<"u")return n}const Me=e=>{e0()&&console.error(`Clerk: ${e}`)},Ud=(e,...t)=>{const n={...e};for(const r of t)delete n[r];return n};var Qo=e=>t=>{try{return j.Children.only(e)}catch{return ft.throw(_v(t))}},Xo=(e,t)=>(e||(e=t),typeof e=="string"&&(e=j.createElement("button",null,e)),e),Yo=e=>(...t)=>{if(e&&typeof e=="function")return e(...t)};function o0(e){return typeof e=="function"}var Ei=new Map;function s0(e,t,n=1){j.useEffect(()=>{const r=Ei.get(e)||0;return r==n?ft.throw(t):(Ei.set(e,r+1),()=>{Ei.set(e,(Ei.get(e)||1)-1)})},[])}function a0(e,t,n){const r=e.displayName||e.name||t||"Component",i=o=>(s0(t,n),j.createElement(e,{...o}));return i.displayName=`withMaxAllowedInstancesGuard(${r})`,i}var Lr=e=>{const[t,n]=z.useState(new Map);return e.map(r=>({id:r.id,mount:i=>n(o=>new Map(o).set(String(r.id),i)),unmount:()=>n(i=>{const o=new Map(i);return o.set(String(r.id),null),o}),portal:()=>{const i=t.get(String(r.id));return i?wp.createPortal(r.component,i):null}}))},Le=(e,t)=>!!e&&j.isValidElement(e)&&(e==null?void 0:e.type)===t,Bp=(e,t)=>Wp({children:e,reorderItemsLabels:["account","security","billing","apiKeys"],LinkComponent:di,PageComponent:ci,MenuItemsComponent:Jo,componentName:"UserProfile"},t),qp=(e,t)=>Wp({children:e,reorderItemsLabels:["general","members","billing","apiKeys"],LinkComponent:ts,PageComponent:es,componentName:"OrganizationProfile"},t),Dp=e=>{const t=[],n=[ts,es,Jo,ci,di];return j.Children.forEach(e,r=>{n.some(i=>Le(r,i))||t.push(r)}),t},Wp=(e,t)=>{const{children:n,LinkComponent:r,PageComponent:i,MenuItemsComponent:o,reorderItemsLabels:s,componentName:l}=e,{allowForAnyChildren:c=!1}=t||{},u=[];j.Children.forEach(n,f=>{if(!Le(f,i)&&!Le(f,r)&&!Le(f,o)){f&&!c&&Me(Dv(l));return}const{props:m}=f,{children:w,label:S,url:N,labelIcon:T}=m;if(Le(f,i))if($d(m,s))u.push({label:S});else if(Bs(m))u.push({label:S,labelIcon:T,children:w,url:N});else{Me(Wv(l));return}if(Le(f,r))if(qs(m))u.push({label:S,labelIcon:T,url:N});else{Me(Uv(l));return}});const d=[],h=[],p=[];u.forEach((f,m)=>{if(Bs(f)){d.push({component:f.children,id:m}),h.push({component:f.labelIcon,id:m});return}qs(f)&&p.push({component:f.labelIcon,id:m})});const x=Lr(d),b=Lr(h),v=Lr(p),A=[],g=[];return u.forEach((f,m)=>{if($d(f,s)){A.push({label:f.label});return}if(Bs(f)){const{portal:w,mount:S,unmount:N}=x.find(R=>R.id===m),{portal:T,mount:C,unmount:M}=b.find(R=>R.id===m);A.push({label:f.label,url:f.url,mount:S,unmount:N,mountIcon:C,unmountIcon:M}),g.push(w),g.push(T);return}if(qs(f)){const{portal:w,mount:S,unmount:N}=v.find(T=>T.id===m);A.push({label:f.label,url:f.url,mountIcon:S,unmountIcon:N}),g.push(w);return}}),{customPages:A,customPagesPortals:g}},$d=(e,t)=>{const{children:n,label:r,url:i,labelIcon:o}=e;return!n&&!i&&!o&&t.some(s=>s===r)},Bs=e=>{const{children:t,label:n,url:r,labelIcon:i}=e;return!!t&&!!r&&!!i&&!!n},qs=e=>{const{children:t,label:n,url:r,labelIcon:i}=e;return!t&&!!r&&!!i&&!!n},l0=(e,t)=>{var n;return c0({children:e,reorderItemsLabels:["manageAccount","signOut"],MenuItemsComponent:Jo,MenuActionComponent:$p,MenuLinkComponent:Vp,UserProfileLinkComponent:di,UserProfilePageComponent:ci,allowForAnyChildren:(n=t==null?void 0:t.allowForAnyChildren)!=null?n:!1})},c0=({children:e,MenuItemsComponent:t,MenuActionComponent:n,MenuLinkComponent:r,UserProfileLinkComponent:i,UserProfilePageComponent:o,reorderItemsLabels:s,allowForAnyChildren:l=!1})=>{const c=[],u=[],d=[];j.Children.forEach(e,v=>{if(!Le(v,t)&&!Le(v,i)&&!Le(v,o)){v&&!l&&Me($v);return}if(Le(v,i)||Le(v,o))return;const{props:A}=v;j.Children.forEach(A.children,g=>{if(!Le(g,n)&&!Le(g,r)){g&&Me(Vv);return}const{props:f}=g,{label:m,labelIcon:w,href:S,onClick:N,open:T}=f;if(Le(g,n))if(Vd(f,s))c.push({label:m});else if(Ds(f)){const C={label:m,labelIcon:w};if(N!==void 0)c.push({...C,onClick:N});else if(T!==void 0)c.push({...C,open:T.startsWith("/")?T:`/${T}`});else{Me("Custom menu item must have either onClick or open property");return}}else{Me(Xv);return}if(Le(g,r))if(Ws(f))c.push({label:m,labelIcon:w,href:S});else{Me(Qv);return}})});const h=[],p=[];c.forEach((v,A)=>{Ds(v)&&h.push({component:v.labelIcon,id:A}),Ws(v)&&p.push({component:v.labelIcon,id:A})});const x=Lr(h),b=Lr(p);return c.forEach((v,A)=>{if(Vd(v,s)&&u.push({label:v.label}),Ds(v)){const{portal:g,mount:f,unmount:m}=x.find(S=>S.id===A),w={label:v.label,mountIcon:f,unmountIcon:m};"onClick"in v?w.onClick=v.onClick:"open"in v&&(w.open=v.open),u.push(w),d.push(g)}if(Ws(v)){const{portal:g,mount:f,unmount:m}=b.find(w=>w.id===A);u.push({label:v.label,href:v.href,mountIcon:f,unmountIcon:m}),d.push(g)}}),{customMenuItems:u,customMenuItemsPortals:d}},Vd=(e,t)=>{const{children:n,label:r,onClick:i,labelIcon:o}=e;return!n&&!i&&!o&&t.some(s=>s===r)},Ds=e=>{const{label:t,labelIcon:n,onClick:r,open:i}=e;return!!n&&!!t&&(typeof r=="function"||typeof i=="string")},Ws=e=>{const{label:t,href:n,labelIcon:r}=e;return!!n&&!!r&&!!t},d0=e=>{const t=e==null?void 0:e.isReady;return n=>new Promise((r,i)=>{const{root:o=document==null?void 0:document.body,selector:s,timeout:l=0}=n;if(!o){i(new Error("No root element provided"));return}let c=o;if(s&&(c=o==null?void 0:o.querySelector(s)),t(c,s)){r();return}const u=new MutationObserver(d=>{for(const h of d)if(!c&&s&&(c=o==null?void 0:o.querySelector(s)),(e.childList&&h.type==="childList"||e.attributes&&h.type==="attributes")&&t(c,s)){u.disconnect(),r();return}});u.observe(o,e),l>0&&setTimeout(()=>{u.disconnect(),i(new Error(`Timeout waiting for ${s}`))},l)})},u0=d0({childList:!0,subtree:!0,isReady:(e,t)=>{var n;return!!(e!=null&&e.childElementCount)&&((n=e==null?void 0:e.matches)==null?void 0:n.call(e,t))&&e.childElementCount>0}});function Pe(e,t){const n=z.useRef(),[r,i]=z.useState("rendering");return z.useEffect(()=>{if(!e)throw new Error("Clerk: no component name provided, unable to detect mount.");if(typeof window<"u"&&!n.current){const o=`[data-clerk-component="${e}"]`,s=t==null?void 0:t.selector;n.current=u0({selector:s?o+s:o}).then(()=>{i("rendered")}).catch(()=>{i("error")})}},[e,t==null?void 0:t.selector]),r}var zi=e=>"mount"in e,Hd=e=>"open"in e,Kd=e=>e==null?void 0:e.map(({mountIcon:t,unmountIcon:n,...r})=>r),Ne=class extends j.PureComponent{constructor(){super(...arguments),this.rootRef=j.createRef()}componentDidUpdate(e){var t,n,r,i;if(!zi(e)||!zi(this.props))return;const o=Ud(e.props,"customPages","customMenuItems","children"),s=Ud(this.props.props,"customPages","customMenuItems","children"),l=((t=o.customPages)==null?void 0:t.length)!==((n=s.customPages)==null?void 0:n.length),c=((r=o.customMenuItems)==null?void 0:r.length)!==((i=s.customMenuItems)==null?void 0:i.length),u=Kd(e.props.customMenuItems),d=Kd(this.props.props.customMenuItems);(!Bd(o,s)||!Bd(u,d)||l||c)&&this.rootRef.current&&this.props.updateProps({node:this.rootRef.current,props:this.props.props})}componentDidMount(){this.rootRef.current&&(zi(this.props)&&this.props.mount(this.rootRef.current,this.props.props),Hd(this.props)&&this.props.open(this.props.props))}componentWillUnmount(){this.rootRef.current&&(zi(this.props)&&this.props.unmount(this.rootRef.current),Hd(this.props)&&this.props.close())}render(){const{hideRootHtmlElement:e=!1}=this.props,t={ref:this.rootRef,...this.props.rootProps,...this.props.component&&{"data-clerk-component":this.props.component}};return j.createElement(j.Fragment,null,!e&&j.createElement("div",{...t}),this.props.children)}},Zo=e=>{var t,n;return j.createElement(j.Fragment,null,(t=e==null?void 0:e.customPagesPortals)==null?void 0:t.map((r,i)=>z.createElement(r,{key:i})),(n=e==null?void 0:e.customMenuItemsPortals)==null?void 0:n.map((r,i)=>z.createElement(r,{key:i})))},h0=re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}};return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,mount:e.mountSignIn,unmount:e.unmountSignIn,updateProps:e.__unstable__updateProps,props:r,rootProps:s}))},{component:"SignIn",renderWhileLoading:!0}),p0=re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}};return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,mount:e.mountSignUp,unmount:e.unmountSignUp,updateProps:e.__unstable__updateProps,props:r,rootProps:s}))},{component:"SignUp",renderWhileLoading:!0});function ci({children:e}){return Me(Mv),j.createElement(j.Fragment,null,e)}function di({children:e}){return Me(Rv),j.createElement(j.Fragment,null,e)}var f0=re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}},{customPages:l,customPagesPortals:c}=Bp(r.children);return j.createElement(j.Fragment,null,o&&n,j.createElement(Ne,{component:t,mount:e.mountUserProfile,unmount:e.unmountUserProfile,updateProps:e.__unstable__updateProps,props:{...r,customPages:l},rootProps:s},j.createElement(Zo,{customPagesPortals:c})))},{component:"UserProfile",renderWhileLoading:!0});Object.assign(f0,{Page:ci,Link:di});var Up=z.createContext({mount:()=>{},unmount:()=>{},updateProps:()=>{}}),m0=re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}},{customPages:l,customPagesPortals:c}=Bp(r.children,{allowForAnyChildren:!!r.__experimental_asProvider}),u={...r.userProfileProps,customPages:l},{customMenuItems:d,customMenuItemsPortals:h}=l0(r.children,{allowForAnyChildren:!!r.__experimental_asProvider}),p=Dp(r.children),x={mount:e.mountUserButton,unmount:e.unmountUserButton,updateProps:e.__unstable__updateProps,props:{...r,userProfileProps:u,customMenuItems:d}},b={customPagesPortals:c,customMenuItemsPortals:h};return j.createElement(Up.Provider,{value:x},o&&n,e.loaded&&j.createElement(Ne,{component:t,...x,hideRootHtmlElement:!!r.__experimental_asProvider,rootProps:s},r.__experimental_asProvider?p:null,j.createElement(Zo,{...b})))},{component:"UserButton",renderWhileLoading:!0});function Jo({children:e}){return Me(Hv),j.createElement(j.Fragment,null,e)}function $p({children:e}){return Me(Kv),j.createElement(j.Fragment,null,e)}function Vp({children:e}){return Me(Gv),j.createElement(j.Fragment,null,e)}function g0(e){const t=z.useContext(Up),n={...t,props:{...t.props,...e}};return j.createElement(Ne,{...n})}var y0=Object.assign(m0,{UserProfilePage:ci,UserProfileLink:di,MenuItems:Jo,Action:$p,Link:Vp,__experimental_Outlet:g0});function es({children:e}){return Me(Bv),j.createElement(j.Fragment,null,e)}function ts({children:e}){return Me(qv),j.createElement(j.Fragment,null,e)}var v0=re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}},{customPages:l,customPagesPortals:c}=qp(r.children);return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,mount:e.mountOrganizationProfile,unmount:e.unmountOrganizationProfile,updateProps:e.__unstable__updateProps,props:{...r,customPages:l},rootProps:s},j.createElement(Zo,{customPagesPortals:c})))},{component:"OrganizationProfile",renderWhileLoading:!0});Object.assign(v0,{Page:es,Link:ts});re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}};return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,mount:e.mountCreateOrganization,unmount:e.unmountCreateOrganization,updateProps:e.__unstable__updateProps,props:r,rootProps:s}))},{component:"CreateOrganization",renderWhileLoading:!0});var Hp=z.createContext({mount:()=>{},unmount:()=>{},updateProps:()=>{}}),x0=re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}},{customPages:l,customPagesPortals:c}=qp(r.children,{allowForAnyChildren:!!r.__experimental_asProvider}),u={...r.organizationProfileProps,customPages:l},d=Dp(r.children),h={mount:e.mountOrganizationSwitcher,unmount:e.unmountOrganizationSwitcher,updateProps:e.__unstable__updateProps,props:{...r,organizationProfileProps:u},rootProps:s,component:t};return e.__experimental_prefetchOrganizationSwitcher(),j.createElement(Hp.Provider,{value:h},j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{...h,hideRootHtmlElement:!!r.__experimental_asProvider},r.__experimental_asProvider?d:null,j.createElement(Zo,{customPagesPortals:c}))))},{component:"OrganizationSwitcher",renderWhileLoading:!0});function k0(e){const t=z.useContext(Hp),n={...t,props:{...t.props,...e}};return j.createElement(Ne,{...n})}Object.assign(x0,{OrganizationProfilePage:es,OrganizationProfileLink:ts,__experimental_Outlet:k0});re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}};return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,mount:e.mountOrganizationList,unmount:e.unmountOrganizationList,updateProps:e.__unstable__updateProps,props:r,rootProps:s}))},{component:"OrganizationList",renderWhileLoading:!0});re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}};return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,open:e.openGoogleOneTap,close:e.closeGoogleOneTap,updateProps:e.__unstable__updateProps,props:r,rootProps:s}))},{component:"GoogleOneTap",renderWhileLoading:!0});re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}};return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,mount:e.mountWaitlist,unmount:e.unmountWaitlist,updateProps:e.__unstable__updateProps,props:r,rootProps:s}))},{component:"Waitlist",renderWhileLoading:!0});re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t,{selector:'[data-component-status="ready"]'})==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}};return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,mount:e.mountPricingTable,unmount:e.unmountPricingTable,updateProps:e.__unstable__updateProps,props:r,rootProps:s}))},{component:"PricingTable",renderWhileLoading:!0});re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}};return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,mount:e.mountAPIKeys,unmount:e.unmountAPIKeys,updateProps:e.__unstable__updateProps,props:r,rootProps:s}))},{component:"ApiKeys",renderWhileLoading:!0});re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}};return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,mount:e.mountUserAvatar,unmount:e.unmountUserAvatar,updateProps:e.__unstable__updateProps,props:r,rootProps:s}))},{component:"UserAvatar",renderWhileLoading:!0});re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}};return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,mount:e.mountTaskChooseOrganization,unmount:e.unmountTaskChooseOrganization,updateProps:e.__unstable__updateProps,props:r,rootProps:s}))},{component:"TaskChooseOrganization",renderWhileLoading:!0});re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}};return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,mount:e.mountTaskResetPassword,unmount:e.unmountTaskResetPassword,updateProps:e.__unstable__updateProps,props:r,rootProps:s}))},{component:"TaskResetPassword",renderWhileLoading:!0});re(({clerk:e,component:t,fallback:n,...r})=>{const o=Pe(t)==="rendering"||!e.loaded,s={...o&&n&&{style:{display:"none"}}};return j.createElement(j.Fragment,null,o&&n,e.loaded&&j.createElement(Ne,{component:t,mount:e.mountTaskSetupMFA,unmount:e.unmountTaskSetupMFA,updateProps:e.__unstable__updateProps,props:r,rootProps:s}))},{component:"TaskSetupMFA",renderWhileLoading:!0});var Kp=e=>{throw TypeError(e)},ic=(e,t,n)=>t.has(e)||Kp("Cannot "+n),se=(e,t,n)=>(ic(e,t,"read from private field"),n?n.call(e):t.get(e)),Bt=(e,t,n)=>t.has(e)?Kp("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),hn=(e,t,n,r)=>(ic(e,t,"write to private field"),t.set(e,n),n),Us=(e,t,n)=>(ic(e,t,"access private method"),n);const w0={initialDelay:125,maxDelayBetweenRetries:0,factor:2,shouldRetry:(e,t)=>t<5,retryImmediately:!1,jitter:!0},b0=100,Gp=async e=>new Promise(t=>setTimeout(t,e)),Qp=(e,t)=>t?e*(1+Math.random()):e,S0=e=>{let t=0;const n=()=>{const r=e.initialDelay,i=e.factor;let o=r*Math.pow(i,t);return o=Qp(o,e.jitter),Math.min(e.maxDelayBetweenRetries||o,o)};return async()=>{await Gp(n()),t++}},N0=async(e,t={})=>{let n=0;const{shouldRetry:r,initialDelay:i,maxDelayBetweenRetries:o,factor:s,retryImmediately:l,jitter:c,onBeforeRetry:u}={...w0,...t},d=S0({initialDelay:i,maxDelayBetweenRetries:o,factor:s,jitter:c});for(;;)try{return await e()}catch(h){if(n++,!r(h,n))throw h;u&&await u(n),l&&n===1?await Gp(Qp(b0,c)):await d()}},j0="loadScript cannot be called when document does not exist",C0="loadScript cannot be called without a src";async function A0(e="",t){const{async:n,defer:r,beforeLoad:i,crossOrigin:o,nonce:s}=t||{};return N0(()=>new Promise((c,u)=>{e||u(new Error(C0)),(!document||!document.body)&&u(new Error(j0));const d=document.createElement("script");o&&d.setAttribute("crossorigin",o),d.async=n||!1,d.defer=r||!1,d.addEventListener("load",()=>{d.remove(),c(d)}),d.addEventListener("error",h=>{d.remove(),u(h.error??new Error(`failed to load script: ${e}`))}),d.src=e,d.nonce=s,i==null||i(d),document.body.appendChild(d)}),{shouldRetry:(c,u)=>u<=5})}function I0(e){return e?O0(e)||Xp(e):!0}function O0(e){return/^http(s)?:\/\//.test(e||"")}function Xp(e){return e.startsWith("/")}function T0(e){return e?Xp(e)?new URL(e,window.location.origin).toString():e:""}function E0(e){if(!e)return"";let t;if(e.match(/^(clerk\.)+\w*$/))t=/(clerk\.)*(?=clerk\.)/;else{if(e.match(/\.clerk.accounts/))return e;t=/^(clerk\.)*/gi}return`clerk.${e.replace(t,"")}`}const z0=(e,t="5.127.1")=>{if(e)return e;const n=P0(t);return n?n==="snapshot"?"5.127.1":n:F0(t)},P0=e=>{var t;return(t=e.trim().replace(/^v/,"").match(/-(.+?)(\.|$)/))==null?void 0:t[1]},F0=e=>e.trim().replace(/^v/,"").split(".")[0],Yp="failed_to_load_clerk_js",_0="failed_to_load_clerk_js_timeout",Ja="Failed to load Clerk",{isDevOrStagingUrl:L0}=Iy(),Zp=bp({packageName:"@clerk/shared"});function M0(e){Zp.setPackageName({packageName:e})}function el(){if(typeof window>"u"||!window.Clerk)return!1;const e=window.Clerk;return typeof e=="object"&&typeof e.load=="function"}function R0(e){if(typeof window>"u"||!window.performance)return!1;const t=performance.getEntriesByName(e,"resource");if(t.length===0)return!1;const n=t[t.length-1];return n.transferSize===0&&n.decodedBodySize===0&&(n.responseEnd===0||n.responseEnd>0&&n.responseStart>0||"responseStatus"in n&&(n.responseStatus>=400||n.responseStatus===0))}function Gd(e,t){return new Promise((n,r)=>{let i=!1;const o=(d,h)=>{clearTimeout(d),clearInterval(h)};t==null||t.addEventListener("error",()=>{o(c,u),r(new Va(Ja,{code:Yp}))});const s=()=>{i||el()&&(i=!0,o(c,u),n(null))},c=setTimeout(()=>{i||(i=!0,o(c,u),el()?n(null):r(new Va(Ja,{code:_0})))},e);s();const u=setInterval(()=>{if(i){clearInterval(u);return}s()},100)})}const B0=async e=>{const t=(e==null?void 0:e.scriptLoadTimeout)??15e3;if(el())return null;if(!(e!=null&&e.publishableKey))return Zp.throwMissingPublishableKeyError(),null;const n=q0(e),r=document.querySelector("script[data-clerk-js-script]");if(r)if(R0(n))r.remove();else try{return await Gd(t,r),null}catch{r.remove()}const i=Gd(t);return A0(n,{async:!0,crossOrigin:"anonymous",nonce:e.nonce,beforeLoad:W0(e)}).catch(o=>{throw new Va(Ja+(o.message?`, ${o.message}`:""),{code:Yp,cause:o})}),i},q0=e=>{var d,h;const{clerkJSUrl:t,clerkJSVariant:n,clerkJSVersion:r,proxyUrl:i,domain:o,publishableKey:s}=e;if(t)return t;let l="";i&&I0(i)?l=T0(i).replace(/http(s)?:\/\//,""):o&&!L0(((d=Td(s))==null?void 0:d.frontendApi)||"")?l=E0(o):l=((h=Td(s))==null?void 0:h.frontendApi)||"";const c=n?`${n.replace(/\.+$/,"")}.`:"",u=z0(r);return`https://${l}/npm/@clerk/clerk-js@${u}/dist/clerk.${c}browser.js`},D0=e=>{const t={};return e.publishableKey&&(t["data-clerk-publishable-key"]=e.publishableKey),e.proxyUrl&&(t["data-clerk-proxy-url"]=e.proxyUrl),e.domain&&(t["data-clerk-domain"]=e.domain),e.nonce&&(t.nonce=e.nonce),t},W0=e=>t=>{const n=D0(e);for(const r in n)t.setAttribute(r,n[r])},U0=(e,t,n)=>!e&&n?$0(n):V0(t),$0=e=>{const t=e.userId,n=e.user,r=e.sessionId,i=e.sessionStatus,o=e.sessionClaims;return{userId:t,user:n,sessionId:r,session:e.session,sessionStatus:i,sessionClaims:o,organization:e.organization,orgId:e.orgId,orgRole:e.orgRole,orgPermissions:e.orgPermissions,orgSlug:e.orgSlug,actor:e.actor,factorVerificationAge:e.factorVerificationAge}},V0=e=>{var b,v,A,g;const t=e.user?e.user.id:e.user,n=e.user,r=e.session?e.session.id:e.session,i=e.session,o=(b=e.session)==null?void 0:b.status,s=e.session?(A=(v=e.session.lastActiveToken)==null?void 0:v.jwt)==null?void 0:A.claims:null,l=e.session?e.session.factorVerificationAge:null,c=i==null?void 0:i.actor,u=e.organization,d=e.organization?e.organization.id:e.organization,h=u==null?void 0:u.slug,p=u&&((g=n==null?void 0:n.organizationMemberships)==null?void 0:g.find(f=>f.organization.id===d)),x=p&&p.permissions;return{userId:t,user:n,sessionId:r,session:i,sessionStatus:o,sessionClaims:s,organization:u,orgId:d,orgRole:p&&p.role,orgSlug:h,orgPermissions:x,actor:c,factorVerificationAge:l}};function No(){return typeof window<"u"}const Qd=(e,t,n,r,i)=>{const{notify:o}=i||{};let s=e.get(n);s||(s=[],e.set(n,s)),s.push(r),o&&t.has(n)&&r(t.get(n))},Xd=(e,t,n)=>(e.get(t)||[]).map(r=>r(n)),Yd=(e,t,n)=>{const r=e.get(t);r&&(n?r.splice(r.indexOf(n)>>>0,1):e.set(t,[]))},H0=()=>{const e=new Map,t=new Map,n=new Map;return{on:(...i)=>Qd(e,t,...i),prioritizedOn:(...i)=>Qd(n,t,...i),emit:(i,o)=>{t.set(i,o),Xd(n,i,o),Xd(e,i,o)},off:(...i)=>Yd(e,...i),prioritizedOff:(...i)=>Yd(n,...i),internal:{retrieveListeners:i=>e.get(i)||[]}}},Pi={Status:"status"},K0=()=>H0();typeof window<"u"&&!window.global&&(window.global=typeof global>"u"?window:global);re(({clerk:e,children:t,...n})=>{const{appearance:r,signUpFallbackRedirectUrl:i,forceRedirectUrl:o,fallbackRedirectUrl:s,signUpForceRedirectUrl:l,mode:c,initialValues:u,withSignUp:d,oauthFlow:h,...p}=n;t=Xo(t,"Sign in");const x=Qo(t)("SignInButton"),b=()=>{const g={forceRedirectUrl:o,fallbackRedirectUrl:s,signUpFallbackRedirectUrl:i,signUpForceRedirectUrl:l,initialValues:u,withSignUp:d,oauthFlow:h};return c==="modal"?e.openSignIn({...g,appearance:r}):e.redirectToSignIn({...g,signInFallbackRedirectUrl:s,signInForceRedirectUrl:o})},A={...p,onClick:async g=>(x&&typeof x=="object"&&"props"in x&&await Yo(x.props.onClick)(g),b())};return j.cloneElement(x,A)},{component:"SignInButton",renderWhileLoading:!0});re(({clerk:e,children:t,...n})=>{const{redirectUrl:r,...i}=n;t=Xo(t,"Sign in with Metamask");const o=Qo(t)("SignInWithMetamaskButton"),s=async()=>{async function u(){await e.authenticateWithMetamask({redirectUrl:r||void 0})}u()},c={...i,onClick:async u=>(await Yo(o.props.onClick)(u),s())};return j.cloneElement(o,c)},{component:"SignInWithMetamask",renderWhileLoading:!0});re(({clerk:e,children:t,...n})=>{const{redirectUrl:r="/",signOutOptions:i,...o}=n;t=Xo(t,"Sign out");const s=Qo(t)("SignOutButton"),l=()=>e.signOut({redirectUrl:r,...i}),u={...o,onClick:async d=>(await Yo(s.props.onClick)(d),l())};return j.cloneElement(s,u)},{component:"SignOutButton",renderWhileLoading:!0});re(({clerk:e,children:t,...n})=>{const{appearance:r,unsafeMetadata:i,fallbackRedirectUrl:o,forceRedirectUrl:s,signInFallbackRedirectUrl:l,signInForceRedirectUrl:c,mode:u,initialValues:d,oauthFlow:h,...p}=n;t=Xo(t,"Sign up");const x=Qo(t)("SignUpButton"),b=()=>{const g={fallbackRedirectUrl:o,forceRedirectUrl:s,signInFallbackRedirectUrl:l,signInForceRedirectUrl:c,initialValues:d,oauthFlow:h};return u==="modal"?e.openSignUp({...g,appearance:r,unsafeMetadata:i}):e.redirectToSignUp({...g,signUpFallbackRedirectUrl:o,signUpForceRedirectUrl:s})},A={...p,onClick:async g=>(x&&typeof x=="object"&&"props"in x&&await Yo(x.props.onClick)(g),b())};return j.cloneElement(x,A)},{component:"SignUpButton",renderWhileLoading:!0});var G0=()=>({fields:{identifier:null,password:null,code:null},raw:null,global:null}),Q0=()=>({fields:{firstName:null,lastName:null,emailAddress:null,phoneNumber:null,password:null,username:null,code:null,captcha:null,legalAccepted:null},raw:null,global:null}),X0=class{constructor(e){this.isomorphicClerk=e,this.signInSignalProxy=this.buildSignInProxy(),this.signUpSignalProxy=this.buildSignUpProxy()}signInSignal(){return this.signInSignalProxy}signUpSignal(){return this.signUpSignalProxy}buildSignInProxy(){const e=this.gateProperty.bind(this),t=()=>this.client.signIn.__internal_future;return{errors:G0(),fetchStatus:"idle",signIn:{status:"needs_identifier",availableStrategies:[],isTransferable:!1,get id(){return e(t,"id",void 0)},get supportedFirstFactors(){return e(t,"supportedFirstFactors",[])},get supportedSecondFactors(){return e(t,"supportedSecondFactors",[])},get secondFactorVerification(){return e(t,"secondFactorVerification",{status:null,error:null,expireAt:null,externalVerificationRedirectURL:null,nonce:null,attempts:null,message:null,strategy:null,verifiedAtClient:null,verifiedFromTheSameClient:()=>!1,__internal_toSnapshot:()=>{throw new Error("__internal_toSnapshot called before Clerk is loaded")},pathRoot:"",reload:()=>{throw new Error("__internal_toSnapshot called before Clerk is loaded")}})},get identifier(){return e(t,"identifier",null)},get createdSessionId(){return e(t,"createdSessionId",null)},get userData(){return e(t,"userData",{})},get firstFactorVerification(){return e(t,"firstFactorVerification",{status:null,error:null,expireAt:null,externalVerificationRedirectURL:null,nonce:null,attempts:null,message:null,strategy:null,verifiedAtClient:null,verifiedFromTheSameClient:()=>!1,__internal_toSnapshot:()=>{throw new Error("__internal_toSnapshot called before Clerk is loaded")},pathRoot:"",reload:()=>{throw new Error("__internal_toSnapshot called before Clerk is loaded")}})},create:this.gateMethod(t,"create"),password:this.gateMethod(t,"password"),sso:this.gateMethod(t,"sso"),finalize:this.gateMethod(t,"finalize"),emailCode:this.wrapMethods(()=>t().emailCode,["sendCode","verifyCode"]),emailLink:this.wrapStruct(()=>t().emailLink,["sendLink","waitForVerification"],["verification"],{verification:null}),resetPasswordEmailCode:this.wrapMethods(()=>t().resetPasswordEmailCode,["sendCode","verifyCode","submitPassword"]),phoneCode:this.wrapMethods(()=>t().phoneCode,["sendCode","verifyCode"]),mfa:this.wrapMethods(()=>t().mfa,["sendPhoneCode","verifyPhoneCode","verifyTOTP","verifyBackupCode"]),ticket:this.gateMethod(t,"ticket"),passkey:this.gateMethod(t,"passkey"),web3:this.gateMethod(t,"web3")}}}buildSignUpProxy(){const e=this.gateProperty.bind(this),t=this.gateMethod.bind(this),n=this.wrapMethods.bind(this),r=()=>this.client.signUp.__internal_future;return{errors:Q0(),fetchStatus:"idle",signUp:{get id(){return e(r,"id",void 0)},get requiredFields(){return e(r,"requiredFields",[])},get optionalFields(){return e(r,"optionalFields",[])},get missingFields(){return e(r,"missingFields",[])},get username(){return e(r,"username",null)},get firstName(){return e(r,"firstName",null)},get lastName(){return e(r,"lastName",null)},get emailAddress(){return e(r,"emailAddress",null)},get phoneNumber(){return e(r,"phoneNumber",null)},get web3Wallet(){return e(r,"web3Wallet",null)},get hasPassword(){return e(r,"hasPassword",!1)},get unsafeMetadata(){return e(r,"unsafeMetadata",{})},get createdSessionId(){return e(r,"createdSessionId",null)},get createdUserId(){return e(r,"createdUserId",null)},get abandonAt(){return e(r,"abandonAt",null)},get legalAcceptedAt(){return e(r,"legalAcceptedAt",null)},get locale(){return e(r,"locale",null)},get status(){return e(r,"status","missing_requirements")},get unverifiedFields(){return e(r,"unverifiedFields",[])},get isTransferable(){return e(r,"isTransferable",!1)},create:t(r,"create"),update:t(r,"update"),sso:t(r,"sso"),password:t(r,"password"),ticket:t(r,"ticket"),web3:t(r,"web3"),finalize:t(r,"finalize"),verifications:n(()=>r().verifications,["sendEmailCode","verifyEmailCode","sendPhoneCode","verifyPhoneCode"])}}}__internal_effect(e){throw new Error("__internal_effect called before Clerk is loaded")}__internal_computed(e){throw new Error("__internal_computed called before Clerk is loaded")}get client(){const e=this.isomorphicClerk.client;if(!e)throw new Error("Clerk client not ready");return e}gateProperty(e,t,n){return!No()||!this.isomorphicClerk.loaded?n:e()[t]}gateMethod(e,t){return async(...n)=>{if(!No())return ft.throw(`Attempted to call a method (${t}) that is not supported on the server.`);this.isomorphicClerk.loaded||await new Promise(i=>this.isomorphicClerk.addOnLoaded(i));const r=e();return r[t].apply(r,n)}}wrapMethods(e,t){return Object.fromEntries(t.map(n=>[n,this.gateMethod(e,n)]))}wrapStruct(e,t,n,r){const i={};for(const o of t)i[o]=this.gateMethod(e,o);for(const o of n)Object.defineProperty(i,o,{get:()=>this.gateProperty(e,o,r[o]),enumerable:!0});return i}};typeof globalThis.__BUILD_DISABLE_RHC__>"u"&&(globalThis.__BUILD_DISABLE_RHC__=!1);var Y0={name:"@clerk/clerk-react",version:"5.61.9",environment:"production"},Gi,Pn,Fn,qt,xt,Qi,Ut,jr,Xi,Jp=class ef{constructor(t){Bt(this,jr),this.clerkjs=null,this.preopenOneTap=null,this.preopenUserVerification=null,this.preopenEnableOrganizationsPrompt=null,this.preopenSignIn=null,this.preopenCheckout=null,this.preopenPlanDetails=null,this.preopenSubscriptionDetails=null,this.preopenSignUp=null,this.preopenUserProfile=null,this.preopenOrganizationProfile=null,this.preopenCreateOrganization=null,this.preOpenWaitlist=null,this.premountSignInNodes=new Map,this.premountSignUpNodes=new Map,this.premountUserAvatarNodes=new Map,this.premountUserProfileNodes=new Map,this.premountUserButtonNodes=new Map,this.premountOrganizationProfileNodes=new Map,this.premountCreateOrganizationNodes=new Map,this.premountOrganizationSwitcherNodes=new Map,this.premountOrganizationListNodes=new Map,this.premountMethodCalls=new Map,this.premountWaitlistNodes=new Map,this.premountPricingTableNodes=new Map,this.premountAPIKeysNodes=new Map,this.premountOAuthConsentNodes=new Map,this.premountTaskChooseOrganizationNodes=new Map,this.premountTaskResetPasswordNodes=new Map,this.premountTaskSetupMFANodes=new Map,this.premountAddListenerCalls=new Map,this.loadedListeners=[],Bt(this,Gi,"loading"),Bt(this,Pn),Bt(this,Fn),Bt(this,qt),Bt(this,xt,K0()),Bt(this,Qi),this.buildSignInUrl=i=>{const o=()=>{var s;return((s=this.clerkjs)==null?void 0:s.buildSignInUrl(i))||""};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("buildSignInUrl",o)},this.buildSignUpUrl=i=>{const o=()=>{var s;return((s=this.clerkjs)==null?void 0:s.buildSignUpUrl(i))||""};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("buildSignUpUrl",o)},this.buildAfterSignInUrl=(...i)=>{const o=()=>{var s;return((s=this.clerkjs)==null?void 0:s.buildAfterSignInUrl(...i))||""};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("buildAfterSignInUrl",o)},this.buildAfterSignUpUrl=(...i)=>{const o=()=>{var s;return((s=this.clerkjs)==null?void 0:s.buildAfterSignUpUrl(...i))||""};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("buildAfterSignUpUrl",o)},this.buildAfterSignOutUrl=()=>{const i=()=>{var o;return((o=this.clerkjs)==null?void 0:o.buildAfterSignOutUrl())||""};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("buildAfterSignOutUrl",i)},this.buildNewSubscriptionRedirectUrl=()=>{const i=()=>{var o;return((o=this.clerkjs)==null?void 0:o.buildNewSubscriptionRedirectUrl())||""};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("buildNewSubscriptionRedirectUrl",i)},this.buildAfterMultiSessionSingleSignOutUrl=()=>{const i=()=>{var o;return((o=this.clerkjs)==null?void 0:o.buildAfterMultiSessionSingleSignOutUrl())||""};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("buildAfterMultiSessionSingleSignOutUrl",i)},this.buildUserProfileUrl=()=>{const i=()=>{var o;return((o=this.clerkjs)==null?void 0:o.buildUserProfileUrl())||""};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("buildUserProfileUrl",i)},this.buildCreateOrganizationUrl=()=>{const i=()=>{var o;return((o=this.clerkjs)==null?void 0:o.buildCreateOrganizationUrl())||""};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("buildCreateOrganizationUrl",i)},this.buildOrganizationProfileUrl=()=>{const i=()=>{var o;return((o=this.clerkjs)==null?void 0:o.buildOrganizationProfileUrl())||""};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("buildOrganizationProfileUrl",i)},this.buildWaitlistUrl=()=>{const i=()=>{var o;return((o=this.clerkjs)==null?void 0:o.buildWaitlistUrl())||""};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("buildWaitlistUrl",i)},this.buildTasksUrl=()=>{const i=()=>{var o;return((o=this.clerkjs)==null?void 0:o.buildTasksUrl())||""};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("buildTasksUrl",i)},this.buildUrlWithAuth=i=>{const o=()=>{var s;return((s=this.clerkjs)==null?void 0:s.buildUrlWithAuth(i))||""};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("buildUrlWithAuth",o)},this.handleUnauthenticated=async()=>{const i=()=>{var o;return(o=this.clerkjs)==null?void 0:o.handleUnauthenticated()};this.clerkjs&&this.loaded?i():this.premountMethodCalls.set("handleUnauthenticated",i)},this.on=(...i)=>{var o;if((o=this.clerkjs)!=null&&o.on)return this.clerkjs.on(...i);se(this,xt).on(...i)},this.off=(...i)=>{var o;if((o=this.clerkjs)!=null&&o.off)return this.clerkjs.off(...i);se(this,xt).off(...i)},this.addOnLoaded=i=>{this.loadedListeners.push(i),this.loaded&&this.emitLoaded()},this.emitLoaded=()=>{this.loadedListeners.forEach(i=>i()),this.loadedListeners=[]},this.beforeLoad=i=>{if(!i)throw new Error("Failed to hydrate latest Clerk JS")},this.hydrateClerkJS=i=>{var o,s;if(!i)throw new Error("Failed to hydrate latest Clerk JS");return this.clerkjs=i,this.premountMethodCalls.forEach(l=>l()),this.premountAddListenerCalls.forEach((l,c)=>{l.nativeUnsubscribe=i.addListener(c)}),(o=se(this,xt).internal.retrieveListeners("status"))==null||o.forEach(l=>{this.on("status",l,{notify:!0})}),(s=se(this,xt).internal.retrieveListeners("queryClientStatus"))==null||s.forEach(l=>{this.on("queryClientStatus",l,{notify:!0})}),this.preopenSignIn!==null&&i.openSignIn(this.preopenSignIn),this.preopenCheckout!==null&&i.__internal_openCheckout(this.preopenCheckout),this.preopenPlanDetails!==null&&i.__internal_openPlanDetails(this.preopenPlanDetails),this.preopenSubscriptionDetails!==null&&i.__internal_openSubscriptionDetails(this.preopenSubscriptionDetails),this.preopenSignUp!==null&&i.openSignUp(this.preopenSignUp),this.preopenUserProfile!==null&&i.openUserProfile(this.preopenUserProfile),this.preopenUserVerification!==null&&i.__internal_openReverification(this.preopenUserVerification),this.preopenOneTap!==null&&i.openGoogleOneTap(this.preopenOneTap),this.preopenOrganizationProfile!==null&&i.openOrganizationProfile(this.preopenOrganizationProfile),this.preopenCreateOrganization!==null&&i.openCreateOrganization(this.preopenCreateOrganization),this.preOpenWaitlist!==null&&i.openWaitlist(this.preOpenWaitlist),this.preopenEnableOrganizationsPrompt&&i.__internal_openEnableOrganizationsPrompt(this.preopenEnableOrganizationsPrompt),this.premountSignInNodes.forEach((l,c)=>{i.mountSignIn(c,l)}),this.premountSignUpNodes.forEach((l,c)=>{i.mountSignUp(c,l)}),this.premountUserProfileNodes.forEach((l,c)=>{i.mountUserProfile(c,l)}),this.premountUserAvatarNodes.forEach((l,c)=>{i.mountUserAvatar(c,l)}),this.premountUserButtonNodes.forEach((l,c)=>{i.mountUserButton(c,l)}),this.premountOrganizationListNodes.forEach((l,c)=>{i.mountOrganizationList(c,l)}),this.premountWaitlistNodes.forEach((l,c)=>{i.mountWaitlist(c,l)}),this.premountPricingTableNodes.forEach((l,c)=>{i.mountPricingTable(c,l)}),this.premountAPIKeysNodes.forEach((l,c)=>{i.mountAPIKeys(c,l)}),this.premountOAuthConsentNodes.forEach((l,c)=>{i.__internal_mountOAuthConsent(c,l)}),this.premountTaskChooseOrganizationNodes.forEach((l,c)=>{i.mountTaskChooseOrganization(c,l)}),this.premountTaskResetPasswordNodes.forEach((l,c)=>{i.mountTaskResetPassword(c,l)}),this.premountTaskSetupMFANodes.forEach((l,c)=>{i.mountTaskSetupMFA(c,l)}),typeof this.clerkjs.status>"u"&&se(this,xt).emit(Pi.Status,"ready"),this.emitLoaded(),this.clerkjs},this.__experimental_checkout=(...i)=>{var o;return(o=this.clerkjs)==null?void 0:o.__experimental_checkout(...i)},this.__unstable__updateProps=async i=>{const o=await Us(this,jr,Xi).call(this);if(o&&"__unstable__updateProps"in o)return o.__unstable__updateProps(i)},this.setActive=i=>this.clerkjs?this.clerkjs.setActive(i):Promise.reject(),this.openSignIn=i=>{this.clerkjs&&this.loaded?this.clerkjs.openSignIn(i):this.preopenSignIn=i},this.closeSignIn=()=>{this.clerkjs&&this.loaded?this.clerkjs.closeSignIn():this.preopenSignIn=null},this.__internal_openCheckout=i=>{this.clerkjs&&this.loaded?this.clerkjs.__internal_openCheckout(i):this.preopenCheckout=i},this.__internal_closeCheckout=()=>{this.clerkjs&&this.loaded?this.clerkjs.__internal_closeCheckout():this.preopenCheckout=null},this.__internal_openPlanDetails=i=>{this.clerkjs&&this.loaded?this.clerkjs.__internal_openPlanDetails(i):this.preopenPlanDetails=i},this.__internal_closePlanDetails=()=>{this.clerkjs&&this.loaded?this.clerkjs.__internal_closePlanDetails():this.preopenPlanDetails=null},this.__internal_openSubscriptionDetails=i=>{this.clerkjs&&this.loaded?this.clerkjs.__internal_openSubscriptionDetails(i):this.preopenSubscriptionDetails=i??null},this.__internal_closeSubscriptionDetails=()=>{this.clerkjs&&this.loaded?this.clerkjs.__internal_closeSubscriptionDetails():this.preopenSubscriptionDetails=null},this.__internal_openReverification=i=>{this.clerkjs&&this.loaded?this.clerkjs.__internal_openReverification(i):this.preopenUserVerification=i},this.__internal_closeReverification=()=>{this.clerkjs&&this.loaded?this.clerkjs.__internal_closeReverification():this.preopenUserVerification=null},this.__internal_openEnableOrganizationsPrompt=i=>{this.clerkjs&&this.loaded?this.clerkjs.__internal_openEnableOrganizationsPrompt(i):this.preopenEnableOrganizationsPrompt=i},this.__internal_closeEnableOrganizationsPrompt=()=>{this.clerkjs&&this.loaded?this.clerkjs.__internal_closeEnableOrganizationsPrompt():this.preopenEnableOrganizationsPrompt=null},this.openGoogleOneTap=i=>{this.clerkjs&&this.loaded?this.clerkjs.openGoogleOneTap(i):this.preopenOneTap=i},this.closeGoogleOneTap=()=>{this.clerkjs&&this.loaded?this.clerkjs.closeGoogleOneTap():this.preopenOneTap=null},this.openUserProfile=i=>{this.clerkjs&&this.loaded?this.clerkjs.openUserProfile(i):this.preopenUserProfile=i},this.closeUserProfile=()=>{this.clerkjs&&this.loaded?this.clerkjs.closeUserProfile():this.preopenUserProfile=null},this.openOrganizationProfile=i=>{this.clerkjs&&this.loaded?this.clerkjs.openOrganizationProfile(i):this.preopenOrganizationProfile=i},this.closeOrganizationProfile=()=>{this.clerkjs&&this.loaded?this.clerkjs.closeOrganizationProfile():this.preopenOrganizationProfile=null},this.openCreateOrganization=i=>{this.clerkjs&&this.loaded?this.clerkjs.openCreateOrganization(i):this.preopenCreateOrganization=i},this.closeCreateOrganization=()=>{this.clerkjs&&this.loaded?this.clerkjs.closeCreateOrganization():this.preopenCreateOrganization=null},this.openWaitlist=i=>{this.clerkjs&&this.loaded?this.clerkjs.openWaitlist(i):this.preOpenWaitlist=i},this.closeWaitlist=()=>{this.clerkjs&&this.loaded?this.clerkjs.closeWaitlist():this.preOpenWaitlist=null},this.openSignUp=i=>{this.clerkjs&&this.loaded?this.clerkjs.openSignUp(i):this.preopenSignUp=i},this.closeSignUp=()=>{this.clerkjs&&this.loaded?this.clerkjs.closeSignUp():this.preopenSignUp=null},this.mountSignIn=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountSignIn(i,o):this.premountSignInNodes.set(i,o)},this.unmountSignIn=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountSignIn(i):this.premountSignInNodes.delete(i)},this.mountSignUp=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountSignUp(i,o):this.premountSignUpNodes.set(i,o)},this.unmountSignUp=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountSignUp(i):this.premountSignUpNodes.delete(i)},this.mountUserAvatar=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountUserAvatar(i,o):this.premountUserAvatarNodes.set(i,o)},this.unmountUserAvatar=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountUserAvatar(i):this.premountUserAvatarNodes.delete(i)},this.mountUserProfile=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountUserProfile(i,o):this.premountUserProfileNodes.set(i,o)},this.unmountUserProfile=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountUserProfile(i):this.premountUserProfileNodes.delete(i)},this.mountOrganizationProfile=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountOrganizationProfile(i,o):this.premountOrganizationProfileNodes.set(i,o)},this.unmountOrganizationProfile=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountOrganizationProfile(i):this.premountOrganizationProfileNodes.delete(i)},this.mountCreateOrganization=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountCreateOrganization(i,o):this.premountCreateOrganizationNodes.set(i,o)},this.unmountCreateOrganization=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountCreateOrganization(i):this.premountCreateOrganizationNodes.delete(i)},this.mountOrganizationSwitcher=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountOrganizationSwitcher(i,o):this.premountOrganizationSwitcherNodes.set(i,o)},this.unmountOrganizationSwitcher=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountOrganizationSwitcher(i):this.premountOrganizationSwitcherNodes.delete(i)},this.__experimental_prefetchOrganizationSwitcher=()=>{const i=()=>{var o;return(o=this.clerkjs)==null?void 0:o.__experimental_prefetchOrganizationSwitcher()};this.clerkjs&&this.loaded?i():this.premountMethodCalls.set("__experimental_prefetchOrganizationSwitcher",i)},this.mountOrganizationList=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountOrganizationList(i,o):this.premountOrganizationListNodes.set(i,o)},this.unmountOrganizationList=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountOrganizationList(i):this.premountOrganizationListNodes.delete(i)},this.mountUserButton=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountUserButton(i,o):this.premountUserButtonNodes.set(i,o)},this.unmountUserButton=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountUserButton(i):this.premountUserButtonNodes.delete(i)},this.mountWaitlist=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountWaitlist(i,o):this.premountWaitlistNodes.set(i,o)},this.unmountWaitlist=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountWaitlist(i):this.premountWaitlistNodes.delete(i)},this.mountPricingTable=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountPricingTable(i,o):this.premountPricingTableNodes.set(i,o)},this.unmountPricingTable=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountPricingTable(i):this.premountPricingTableNodes.delete(i)},this.mountAPIKeys=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountAPIKeys(i,o):this.premountAPIKeysNodes.set(i,o)},this.unmountAPIKeys=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountAPIKeys(i):this.premountAPIKeysNodes.delete(i)},this.__internal_mountOAuthConsent=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.__internal_mountOAuthConsent(i,o):this.premountOAuthConsentNodes.set(i,o)},this.__internal_unmountOAuthConsent=i=>{this.clerkjs&&this.loaded?this.clerkjs.__internal_unmountOAuthConsent(i):this.premountOAuthConsentNodes.delete(i)},this.mountTaskChooseOrganization=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountTaskChooseOrganization(i,o):this.premountTaskChooseOrganizationNodes.set(i,o)},this.unmountTaskChooseOrganization=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountTaskChooseOrganization(i):this.premountTaskChooseOrganizationNodes.delete(i)},this.mountTaskResetPassword=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountTaskResetPassword(i,o):this.premountTaskResetPasswordNodes.set(i,o)},this.unmountTaskResetPassword=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountTaskResetPassword(i):this.premountTaskResetPasswordNodes.delete(i)},this.mountTaskSetupMFA=(i,o)=>{this.clerkjs&&this.loaded?this.clerkjs.mountTaskSetupMFA(i,o):this.premountTaskSetupMFANodes.set(i,o)},this.unmountTaskSetupMFA=i=>{this.clerkjs&&this.loaded?this.clerkjs.unmountTaskSetupMFA(i):this.premountTaskSetupMFANodes.delete(i)},this.addListener=i=>{if(this.clerkjs)return this.clerkjs.addListener(i);{const o=()=>{var s;const l=this.premountAddListenerCalls.get(i);l&&((s=l.nativeUnsubscribe)==null||s.call(l),this.premountAddListenerCalls.delete(i))};return this.premountAddListenerCalls.set(i,{unsubscribe:o,nativeUnsubscribe:void 0}),o}},this.navigate=i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.navigate(i)};this.clerkjs&&this.loaded?o():this.premountMethodCalls.set("navigate",o)},this.redirectWithAuth=async(...i)=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.redirectWithAuth(...i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("redirectWithAuth",o)},this.redirectToSignIn=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.redirectToSignIn(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("redirectToSignIn",o)},this.redirectToSignUp=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.redirectToSignUp(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("redirectToSignUp",o)},this.redirectToUserProfile=async()=>{const i=()=>{var o;return(o=this.clerkjs)==null?void 0:o.redirectToUserProfile()};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("redirectToUserProfile",i)},this.redirectToAfterSignUp=()=>{const i=()=>{var o;return(o=this.clerkjs)==null?void 0:o.redirectToAfterSignUp()};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("redirectToAfterSignUp",i)},this.redirectToAfterSignIn=()=>{const i=()=>{var o;return(o=this.clerkjs)==null?void 0:o.redirectToAfterSignIn()};this.clerkjs&&this.loaded?i():this.premountMethodCalls.set("redirectToAfterSignIn",i)},this.redirectToAfterSignOut=()=>{const i=()=>{var o;return(o=this.clerkjs)==null?void 0:o.redirectToAfterSignOut()};this.clerkjs&&this.loaded?i():this.premountMethodCalls.set("redirectToAfterSignOut",i)},this.redirectToOrganizationProfile=async()=>{const i=()=>{var o;return(o=this.clerkjs)==null?void 0:o.redirectToOrganizationProfile()};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("redirectToOrganizationProfile",i)},this.redirectToCreateOrganization=async()=>{const i=()=>{var o;return(o=this.clerkjs)==null?void 0:o.redirectToCreateOrganization()};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("redirectToCreateOrganization",i)},this.redirectToWaitlist=async()=>{const i=()=>{var o;return(o=this.clerkjs)==null?void 0:o.redirectToWaitlist()};if(this.clerkjs&&this.loaded)return i();this.premountMethodCalls.set("redirectToWaitlist",i)},this.redirectToTasks=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.redirectToTasks(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("redirectToTasks",o)},this.handleRedirectCallback=async i=>{var o;const s=()=>{var l;return(l=this.clerkjs)==null?void 0:l.handleRedirectCallback(i)};this.clerkjs&&this.loaded?(o=s())==null||o.catch(()=>{}):this.premountMethodCalls.set("handleRedirectCallback",s)},this.handleGoogleOneTapCallback=async(i,o)=>{var s;const l=()=>{var c;return(c=this.clerkjs)==null?void 0:c.handleGoogleOneTapCallback(i,o)};this.clerkjs&&this.loaded?(s=l())==null||s.catch(()=>{}):this.premountMethodCalls.set("handleGoogleOneTapCallback",l)},this.handleEmailLinkVerification=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.handleEmailLinkVerification(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("handleEmailLinkVerification",o)},this.authenticateWithMetamask=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.authenticateWithMetamask(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("authenticateWithMetamask",o)},this.authenticateWithCoinbaseWallet=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.authenticateWithCoinbaseWallet(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("authenticateWithCoinbaseWallet",o)},this.authenticateWithBase=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.authenticateWithBase(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("authenticateWithBase",o)},this.authenticateWithOKXWallet=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.authenticateWithOKXWallet(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("authenticateWithOKXWallet",o)},this.authenticateWithSolana=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.authenticateWithSolana(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("authenticateWithSolana",o)},this.authenticateWithWeb3=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.authenticateWithWeb3(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("authenticateWithWeb3",o)},this.authenticateWithGoogleOneTap=async i=>(await Us(this,jr,Xi).call(this)).authenticateWithGoogleOneTap(i),this.__internal_loadStripeJs=async()=>(await Us(this,jr,Xi).call(this)).__internal_loadStripeJs(),this.createOrganization=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.createOrganization(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("createOrganization",o)},this.getOrganization=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.getOrganization(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("getOrganization",o)},this.joinWaitlist=async i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.joinWaitlist(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("joinWaitlist",o)},this.signOut=async(...i)=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.signOut(...i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("signOut",o)},this.__internal_attemptToEnableEnvironmentSetting=i=>{const o=()=>{var s;return(s=this.clerkjs)==null?void 0:s.__internal_attemptToEnableEnvironmentSetting(i)};if(this.clerkjs&&this.loaded)return o();this.premountMethodCalls.set("__internal_attemptToEnableEnvironmentSetting",o)};const{Clerk:n=null,publishableKey:r}=t||{};hn(this,qt,r),hn(this,Fn,t==null?void 0:t.proxyUrl),hn(this,Pn,t==null?void 0:t.domain),this.options=t,this.Clerk=n,this.mode=No()?"browser":"server",hn(this,Qi,new X0(this)),this.options.sdkMetadata||(this.options.sdkMetadata=Y0),se(this,xt).emit(Pi.Status,"loading"),se(this,xt).prioritizedOn(Pi.Status,i=>hn(this,Gi,i)),se(this,qt)&&this.loadClerkJS()}get publishableKey(){return se(this,qt)}get loaded(){var t;return((t=this.clerkjs)==null?void 0:t.loaded)||!1}get status(){var t;return this.clerkjs?((t=this.clerkjs)==null?void 0:t.status)||(this.clerkjs.loaded?"ready":"loading"):se(this,Gi)}static getOrCreateInstance(t){return(!No()||!se(this,Ut)||t.Clerk&&se(this,Ut).Clerk!==t.Clerk||se(this,Ut).publishableKey!==t.publishableKey)&&hn(this,Ut,new ef(t)),se(this,Ut)}static clearInstance(){hn(this,Ut,null)}get domain(){return typeof window<"u"&&window.location?Rs(se(this,Pn),new URL(window.location.href),""):typeof se(this,Pn)=="function"?ft.throw(Ms):se(this,Pn)||""}get proxyUrl(){return typeof window<"u"&&window.location?Rs(se(this,Fn),new URL(window.location.href),""):typeof se(this,Fn)=="function"?ft.throw(Ms):se(this,Fn)||""}__internal_getOption(t){var n,r;return(n=this.clerkjs)!=null&&n.__internal_getOption?(r=this.clerkjs)==null?void 0:r.__internal_getOption(t):this.options[t]}get sdkMetadata(){var t;return((t=this.clerkjs)==null?void 0:t.sdkMetadata)||this.options.sdkMetadata||void 0}get instanceType(){var t;return(t=this.clerkjs)==null?void 0:t.instanceType}get frontendApi(){var t;return((t=this.clerkjs)==null?void 0:t.frontendApi)||""}get isStandardBrowser(){var t;return((t=this.clerkjs)==null?void 0:t.isStandardBrowser)||this.options.standardBrowser||!1}get __internal_queryClient(){var t;return(t=this.clerkjs)==null?void 0:t.__internal_queryClient}get isSatellite(){return typeof window<"u"&&window.location?Rs(this.options.isSatellite,new URL(window.location.href),!1):typeof this.options.isSatellite=="function"?ft.throw(Ms):!1}async loadClerkJS(){var t;if(!(this.mode!=="browser"||this.loaded)){typeof window<"u"&&(window.__clerk_publishable_key=se(this,qt),window.__clerk_proxy_url=this.proxyUrl,window.__clerk_domain=this.domain);try{if(this.Clerk){let n;o0(this.Clerk)?(n=new this.Clerk(se(this,qt),{proxyUrl:this.proxyUrl,domain:this.domain}),this.beforeLoad(n),await n.load(this.options)):(n=this.Clerk,n.loaded||(this.beforeLoad(n),await n.load(this.options))),global.Clerk=n}else if(!__BUILD_DISABLE_RHC__){if(global.Clerk||await B0({...this.options,publishableKey:se(this,qt),proxyUrl:this.proxyUrl,domain:this.domain,nonce:this.options.nonce}),!global.Clerk)throw new Error("Failed to download latest ClerkJS. Contact support@clerk.com.");this.beforeLoad(global.Clerk),await global.Clerk.load(this.options)}return(t=global.Clerk)!=null&&t.loaded?this.hydrateClerkJS(global.Clerk):void 0}catch(n){const r=n;se(this,xt).emit(Pi.Status,"error"),console.error(r.stack||r.message||r);return}}}get version(){var t;return(t=this.clerkjs)==null?void 0:t.version}get client(){if(this.clerkjs)return this.clerkjs.client}get session(){if(this.clerkjs)return this.clerkjs.session}get user(){if(this.clerkjs)return this.clerkjs.user}get organization(){if(this.clerkjs)return this.clerkjs.organization}get telemetry(){if(this.clerkjs)return this.clerkjs.telemetry}get __unstable__environment(){if(this.clerkjs)return this.clerkjs.__unstable__environment}get isSignedIn(){return this.clerkjs?this.clerkjs.isSignedIn:!1}get billing(){var t;return(t=this.clerkjs)==null?void 0:t.billing}get __internal_state(){return this.loaded&&this.clerkjs?this.clerkjs.__internal_state:se(this,Qi)}get apiKeys(){var t;return(t=this.clerkjs)==null?void 0:t.apiKeys}__unstable__setEnvironment(...t){if(this.clerkjs&&"__unstable__setEnvironment"in this.clerkjs)this.clerkjs.__unstable__setEnvironment(t);else return}};Gi=new WeakMap;Pn=new WeakMap;Fn=new WeakMap;qt=new WeakMap;xt=new WeakMap;Qi=new WeakMap;Ut=new WeakMap;jr=new WeakSet;Xi=function(){return new Promise(e=>{this.addOnLoaded(()=>e(this.clerkjs))})};Bt(Jp,Ut);var Zd=Jp;function Z0(e){const{isomorphicClerkOptions:t,initialState:n,children:r}=e,{isomorphicClerk:i,clerkStatus:o}=J0(t),[s,l]=j.useState({client:i.client,session:i.session,user:i.user,organization:i.organization});j.useEffect(()=>i.addListener(V=>l({...V})),[]);const c=U0(i.loaded,s,n),u=j.useMemo(()=>({value:i}),[o]),d=j.useMemo(()=>({value:s.client}),[s.client]),{sessionId:h,sessionStatus:p,sessionClaims:x,session:b,userId:v,user:A,orgId:g,actor:f,organization:m,orgRole:w,orgSlug:S,orgPermissions:N,factorVerificationAge:T}=c,C=j.useMemo(()=>({value:{sessionId:h,sessionStatus:p,sessionClaims:x,userId:v,actor:f,orgId:g,orgRole:w,orgSlug:S,orgPermissions:N,factorVerificationAge:T}}),[h,p,v,f,g,w,S,T,x==null?void 0:x.__raw]),M=j.useMemo(()=>({value:b}),[h,b]),R=j.useMemo(()=>({value:A}),[v,A]),L=j.useMemo(()=>({value:{organization:m}}),[g,m]);return j.createElement(Pv.Provider,{value:u},j.createElement(xv.Provider,{value:d},j.createElement(kv.Provider,{value:M},j.createElement(Nv,{...L.value},j.createElement(Ev.Provider,{value:C},j.createElement(yv.Provider,{value:R},j.createElement(bv,{value:void 0},r)))))))}var J0=e=>{const t=j.useRef(Zd.getOrCreateInstance(e)),[n,r]=j.useState(t.current.status);return j.useEffect(()=>{t.current.__unstable__updateProps({appearance:e.appearance})},[e.appearance]),j.useEffect(()=>{t.current.__unstable__updateProps({options:e})},[e.localization]),j.useEffect(()=>(t.current.on("status",r),()=>{t.current&&t.current.off("status",r),Zd.clearInstance()}),[]),{isomorphicClerk:t.current,clerkStatus:n}};function ex(e){const{initialState:t,children:n,__internal_bypassMissingPublishableKey:r,...i}=e,{publishableKey:o="",Clerk:s}=i;return!s&&!r&&(o?o&&!Ha(o)&&ft.throwInvalidPublishableKeyError({key:o}):ft.throwMissingPublishableKeyError()),j.createElement(Z0,{initialState:t,isomorphicClerkOptions:i},n)}var tf=a0(ex,"ClerkProvider",Fv);tf.displayName="ClerkProvider";Tv({packageName:"@clerk/clerk-react"});M0("@clerk/clerk-react");const Qe=[{id:"level-1-bst",levelNumber:1,title:"BST Basics & Insertions",category:"Trees",description:"Learn Binary Search Tree (BST) ordering property: Left < Node < Right.",algorithmKey:"bst",difficulty:"Easy",estimatedMinutes:5,defaultInput:[15,10,20,8,12,17,25],quizQuestions:[{id:"q1",question:"Which traversal of a BST outputs elements in sorted ascending order?",options:["Pre-order","In-order","Post-order","Level-order"],correctAnswerIndex:1,explanation:"In-order traversal visits (Left, Root, Right), which outputs keys in strictly sorted order."}]},{id:"level-2-avl",levelNumber:2,title:"AVL Tree Rotations",category:"Trees",description:"Master self-balancing BST height balance conditions and LL/RR/LR/RL rotations.",algorithmKey:"avl",difficulty:"Medium",estimatedMinutes:8,defaultInput:[10,20,30,40,50,25],quizQuestions:[{id:"q2",question:"What is the balance factor constraint for every node in an AVL tree?",options:["Height(left) - Height(right) ∈ {-1, 0, 1}","Height <= 5","Left child count = Right child count","Balance Factor = 0 strictly"],correctAnswerIndex:0,explanation:"AVL trees enforce |Balance Factor| ≤ 1 across all nodes."}]},{id:"level-3-redblack",levelNumber:3,title:"Red-Black Tree Properties",category:"Trees",description:"Understand node coloring, black-height balance, and double red violations.",algorithmKey:"redblack",difficulty:"Medium",estimatedMinutes:10,defaultInput:[10,18,7,15,16,30],quizQuestions:[{id:"q3",question:"Can a Red node have a Red child in a Red-Black tree?",options:["Yes, always","No, Red nodes must have Black children","Only at root","Only if leaf is black"],correctAnswerIndex:1,explanation:"No two consecutive Red nodes are allowed on any path (Red Property)."}]},{id:"level-4-heap",levelNumber:4,title:"Min & Max Heap Priority Queue",category:"Trees",description:"Explore complete binary trees, array representation, and sift-up/sift-down heapify.",algorithmKey:"heap",difficulty:"Easy",estimatedMinutes:6,defaultInput:[5,12,9,20,14,18,3],quizQuestions:[{id:"q4",question:"For a 0-indexed heap array, what is the left child index of node i?",options:["2i","2i + 1","2i + 2","i / 2"],correctAnswerIndex:1,explanation:"In 0-indexed arrays, left child = 2i + 1 and right child = 2i + 2."}]},{id:"level-5-btree",levelNumber:5,title:"B-Tree & Database Indexing",category:"Trees",description:"Multi-way search tree used in OS filesystems and database indexing.",algorithmKey:"btree",difficulty:"Hard",estimatedMinutes:12,defaultInput:[10,20,30,40,50,60,70],quizQuestions:[{id:"q5",question:"Why are B-Trees preferred over AVL trees for disk storage?",options:["They use less memory","They minimize disk I/O reads by having large branching factors","They are binary trees","They never split nodes"],correctAnswerIndex:1,explanation:"High branching factor reduces tree height, minimizing disk block reads."}]},{id:"level-6-segment",levelNumber:6,title:"Segment Tree Range Queries",category:"Trees",description:"Perform range sum and range minimum queries with point updates in O(log N).",algorithmKey:"segment",difficulty:"Hard",estimatedMinutes:12,defaultInput:[1,3,5,7,9,11],quizQuestions:[{id:"q6",question:"What is the time complexity to query a range sum in a Segment Tree?",options:["O(N)","O(log N)","O(1)","O(N log N)"],correctAnswerIndex:1,explanation:"Segment tree range query decomposes into at most 2 log N subsegment nodes."}]},{id:"level-7-trie",levelNumber:7,title:"Trie Prefix Search Engine",category:"StringAndTrie",description:"Build prefix search engines for dictionary lookups and auto-complete.",algorithmKey:"trie",difficulty:"Medium",estimatedMinutes:8,defaultInput:["cat","car","cart","dog","dot"],quizQuestions:[{id:"q7",question:"What is the search time complexity for a word of length L in a Trie?",options:["O(N)","O(L)","O(N log L)","O(2^L)"],correctAnswerIndex:1,explanation:"Search depends strictly on length L of target word."}]},{id:"level-8-bfsdfs",levelNumber:8,title:"BFS & DFS Graph Traversals",category:"Graphs",description:"Queue-based Breadth-First Search vs Stack-based Depth-First Search.",algorithmKey:"bfsdfs",difficulty:"Easy",estimatedMinutes:6,defaultInput:[0,1,2,3,4],quizQuestions:[{id:"q8",question:"Which data structure is used to implement Breadth-First Search (BFS)?",options:["Stack","Queue","Priority Queue","Array"],correctAnswerIndex:1,explanation:"BFS processes vertices in FIFO order using a Queue."}]},{id:"level-9-dijkstra",levelNumber:9,title:"Dijkstra's Shortest Path",category:"Graphs",description:"Greedy shortest path algorithm for non-negative weighted graphs.",algorithmKey:"dijkstra",difficulty:"Medium",estimatedMinutes:10,defaultInput:[0,1,2,3,4],quizQuestions:[{id:"q9",question:"Does Dijkstra's algorithm work with negative edge weights?",options:["Yes, always","No, it can get stuck in cycles or yield incorrect results","Only if graph is a tree","Only for directed graphs"],correctAnswerIndex:1,explanation:"Dijkstra assumes distances only increase; negative edges break greedy choice."}]},{id:"level-10-bellmanford",levelNumber:10,title:"Bellman-Ford Algorithm",category:"Graphs",description:"Single-source shortest path algorithm capable of detecting negative weight cycles.",algorithmKey:"bellmanford",difficulty:"Medium",estimatedMinutes:10,defaultInput:[0,1,2,3],quizQuestions:[{id:"q10",question:"How many edge relaxation passes does Bellman-Ford run?",options:["V - 1 passes","V passes","E passes","log V passes"],correctAnswerIndex:0,explanation:"A simple shortest path can have at most V-1 edges, so V-1 relaxations suffice."}]},{id:"level-11-mst",levelNumber:11,title:"Prim's & Kruskal's MST",category:"Graphs",description:"Minimum Spanning Tree algorithms connecting graph nodes with minimum total weight.",algorithmKey:"mst",difficulty:"Medium",estimatedMinutes:10,defaultInput:[0,1,2,3,4],quizQuestions:[{id:"q11",question:"What data structure makes Kruskal's MST algorithm efficient?",options:["Disjoint Set Union (DSU)","BST","Trie","Hash Table"],correctAnswerIndex:0,explanation:"DSU with path compression checks cycle formation in near O(1) time."}]},{id:"level-12-tarjan",levelNumber:12,title:"Tarjan's Strongly Connected Components",category:"Graphs",description:"Find all Strongly Connected Components (SCC) in a directed graph using DFS & low-links.",algorithmKey:"tarjan",difficulty:"Hard",estimatedMinutes:14,defaultInput:[0,1,2,3,4,5],quizQuestions:[{id:"q12",question:"What is the time complexity of Tarjan's SCC algorithm?",options:["O(V + E)","O(V²)","O(V E)","O(V log V)"],correctAnswerIndex:0,explanation:"Tarjan runs a single DFS traversal visiting every vertex and edge once."}]},{id:"level-13-knapsack",levelNumber:13,title:"0/1 Knapsack Problem (DP)",category:"DynamicProgramming",description:"Maximize value under knapsack capacity using 2D DP state tabulation.",algorithmKey:"knapsack",difficulty:"Medium",estimatedMinutes:10,defaultInput:[10,20,30],quizQuestions:[{id:"q13",question:"What is the recurrence relation for 0/1 Knapsack?",options:["dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])","dp[i][w] = dp[i-1][w] + val[i]","dp[i] = dp[i-1]","dp[i] = min(wt[i])"],correctAnswerIndex:0,explanation:"Max of excluding item (dp[i-1][w]) or including item (val + dp[i-1][w-wt])."}]},{id:"level-14-lcs",levelNumber:14,title:"Longest Common Subsequence (LCS)",category:"DynamicProgramming",description:"Find longest common sequence between two strings using DP grid.",algorithmKey:"lcs",difficulty:"Medium",estimatedMinutes:10,defaultInput:["ABCDGH","AEDFHR"],quizQuestions:[{id:"q14",question:"If characters match at S1[i] and S2[j], what is the DP state update?",options:["1 + dp[i-1][j-1]","dp[i-1][j]","dp[i][j-1]","max(dp[i-1][j], dp[i][j-1])"],correctAnswerIndex:0,explanation:"Matching character extends previous sub-problem length by 1."}]},{id:"level-15-floydwarshall",levelNumber:15,title:"Floyd-Warshall All-Pairs Shortest Path",category:"DynamicProgramming",description:"Find shortest paths between all pairs of vertices using triple loop DP.",algorithmKey:"floydwarshall",difficulty:"Hard",estimatedMinutes:12,defaultInput:[0,1,2,3],quizQuestions:[{id:"q15",question:"What is the time complexity of Floyd-Warshall algorithm?",options:["O(V³)","O(V²)","O(V E)","O(V log V)"],correctAnswerIndex:0,explanation:"Uses 3 nested loops iterating through intermediate vertex k, source i, and dest j."}]},{id:"level-16-matrixchain",levelNumber:16,title:"Matrix Chain Multiplication",category:"DynamicProgramming",description:"Find optimal scalar multiplication ordering for a chain of matrices.",algorithmKey:"matrixchain",difficulty:"Hard",estimatedMinutes:14,defaultInput:[10,20,30,40,30],quizQuestions:[{id:"q16",question:"Matrix Chain Multiplication DP solves which problem optimization?",options:["Parenthesization ordering to minimize scalar multiplications","Matrix inversion","Eigenvalue decomposition","Determinant sum"],correctAnswerIndex:0,explanation:"Matrix multiplication is associative; choice of parentheses drastically changes operations."}]},{id:"level-17-dsu",levelNumber:17,title:"Disjoint Set Union (DSU)",category:"AdvancedSets",description:"Union-Find data structure with Path Compression and Rank optimization.",algorithmKey:"dsu",difficulty:"Medium",estimatedMinutes:8,defaultInput:[0,1,2,3,4,5],quizQuestions:[{id:"q17",question:"What is the amortized time complexity per find operation with Path Compression?",options:["O(α(N)) near O(1)","O(log N)","O(N)","O(N²)"],correctAnswerIndex:0,explanation:"Path compression + rank union yields Inverse Ackermann function α(N) ≈ O(1)."}]},{id:"level-18-kmp",levelNumber:18,title:"KMP Pattern Matching",category:"StringAndTrie",description:"Knuth-Morris-Pratt string matching using Longest Prefix Suffix (LPS) array.",algorithmKey:"kmp",difficulty:"Hard",estimatedMinutes:12,defaultInput:["ABABDABACDABABCABAB","ABABCABAB"],quizQuestions:[{id:"q18",question:"What is the worst-case time complexity of KMP algorithm?",options:["O(N + M)","O(N * M)","O(N log M)","O(N²)"],correctAnswerIndex:0,explanation:"LPS preprocessing takes O(M) and text search takes O(N)."}]},{id:"level-19-suffixarray",levelNumber:19,title:"Suffix Array & LCP Array",category:"StringAndTrie",description:"Sorted array of all suffixes of a string for fast substring searching.",algorithmKey:"suffixarray",difficulty:"Hard",estimatedMinutes:15,defaultInput:["banana"],quizQuestions:[{id:"q19",question:"How fast can substring binary search be performed using a Suffix Array of length N?",options:["O(M log N)","O(N * M)","O(N²)","O(N log N)"],correctAnswerIndex:0,explanation:"Binary search on N sorted suffixes for pattern length M takes O(M log N)."}]},{id:"level-20-amortized",levelNumber:20,title:"JNTUA Unit 1: Amortized Analysis Methods",category:"Trees",description:"Master Aggregate, Accounting, and Potential Methods for analyzing sequence operation bounds.",algorithmKey:"avl",difficulty:"Master",estimatedMinutes:15,defaultInput:[10,20,30,40],quizQuestions:[{id:"q20",question:"Which amortized method assigns pre-paid credit (tokens) to early operations to pay for later expensive operations?",options:["Accounting Method","Aggregate Method","Potential Method","Brute Force"],correctAnswerIndex:0,explanation:"The Accounting Method charges overcharges early operations to store credit for costly operations."}]},{id:"level-21-fibonacci",levelNumber:21,title:"JNTUA Unit 2: Fibonacci Heap Operations",category:"Trees",description:"Master Fibonacci Heap Decrease-Key in amortized O(1) time using cascading cuts.",algorithmKey:"heap",difficulty:"Master",estimatedMinutes:15,defaultInput:[10,20,30,40,50],quizQuestions:[{id:"q21",question:"What is the amortized time complexity of Decrease-Key in a Fibonacci Heap?",options:["O(1)","O(log N)","O(N)","O(N log N)"],correctAnswerIndex:0,explanation:"Fibonacci Heaps achieve O(1) amortized Decrease-Key via lazy tree consolidation."}]},{id:"level-22-rabinkarp",levelNumber:22,title:"JNTUA Unit 3: Rabin-Karp & Boyer-Moore String Search",category:"StringAndTrie",description:"Explore Rolling Hash (Rabin-Karp) and Bad Character Heuristic (Boyer-Moore).",algorithmKey:"kmp",difficulty:"Hard",estimatedMinutes:14,defaultInput:["GEEKS FOR GEEKS","GEEK"],quizQuestions:[{id:"q22",question:"What technique allows Rabin-Karp to compute pattern hash values in O(1) per shift?",options:["Rolling Hash Function","Binary Search","LPS Array","Prefix Tree"],correctAnswerIndex:0,explanation:"Rolling hash subtracts leading char hash and adds trailing char hash in O(1)."}]},{id:"level-23-convexhull",levelNumber:23,title:"JNTUA Unit 5: Convex Hull (Graham Scan & Jarvis March)",category:"AdvancedSets",description:"Find smallest convex polygon enclosing 2D points using cross-product orientation.",algorithmKey:"segment",difficulty:"Master",estimatedMinutes:16,defaultInput:[0,3,1,1,2,2,4,4,0,0,1,2,3,1,3,3],quizQuestions:[{id:"q23",question:"What is the time complexity of Graham's Scan Convex Hull algorithm?",options:["O(N log N)","O(N²)","O(N³)","O(2^N)"],correctAnswerIndex:0,explanation:"Sorting points by polar angle takes O(N log N); linear stack scan takes O(N)."}]},{id:"level-24-npcomplete",levelNumber:24,title:"JNTUA Unit 5: NP-Completeness & Approximation",category:"AdvancedSets",description:"Learn P vs NP, 3-SAT reductions, Vertex Cover 2-approximation, and TSP limits.",algorithmKey:"knapsack",difficulty:"Master",estimatedMinutes:18,defaultInput:[0,1,2,3],quizQuestions:[{id:"q24",question:"What approximation ratio does the Greedy Vertex Cover algorithm guarantee?",options:["2-Approximation (Result <= 2 * OPT)","1.5-Approximation","Polynomial Exact","No bound"],correctAnswerIndex:0,explanation:"Greedy maximal matching picks both endpoints of un-covered edges, guaranteeing ≤ 2 * OPT."}]}],tx={bst:{title:"Binary Search Tree (BST)",timeComplexity:"O(log N) average • O(N) worst",spaceComplexity:"O(N)",explanationText:"A BST keeps keys ordered so that every left subtree holds smaller keys and every right subtree holds larger keys. Search, insert and delete run in O(log N) on balanced trees, but degrade to O(N) on skewed trees.",cpp:`#include <iostream>
using namespace std;

struct Node {
    int key;
    Node *left, *right;
    Node(int k) : key(k), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int key) {
    if (!root) return new Node(key);
    if (key < root->key) root->left = insert(root->left, key);
    else if (key > root->key) root->right = insert(root->right, key);
    return root;
}

bool search(Node* root, int key) {
    if (!root) return false;
    if (key == root->key) return true;
    return key < root->key ? search(root->left, key) : search(root->right, key);
}

Node* minValueNode(Node* node) {
    while (node && node->left) node = node->left;
    return node;
}

Node* deleteNode(Node* root, int key) {
    if (!root) return nullptr;
    if (key < root->key) root->left = deleteNode(root->left, key);
    else if (key > root->key) root->right = deleteNode(root->right, key);
    else {
        if (!root->left) { Node* t = root->right; delete root; return t; }
        if (!root->right) { Node* t = root->left; delete root; return t; }
        Node* succ = minValueNode(root->right);
        root->key = succ->key;
        root->right = deleteNode(root->right, succ->key);
    }
    return root;
}

void inorder(Node* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->key << " ";
    inorder(root->right);
}`,java:`public class BST {
    static class Node {
        int key;
        Node left, right;
        Node(int k) { key = k; }
    }

    Node insert(Node root, int key) {
        if (root == null) return new Node(key);
        if (key < root.key) root.left = insert(root.left, key);
        else if (key > root.key) root.right = insert(root.right, key);
        return root;
    }

    boolean search(Node root, int key) {
        if (root == null) return false;
        if (key == root.key) return true;
        return key < root.key ? search(root.left, key) : search(root.right, key);
    }

    Node minValueNode(Node n) {
        while (n != null && n.left != null) n = n.left;
        return n;
    }

    Node deleteNode(Node root, int key) {
        if (root == null) return null;
        if (key < root.key) root.left = deleteNode(root.left, key);
        else if (key > root.key) root.right = deleteNode(root.right, key);
        else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            Node succ = minValueNode(root.right);
            root.key = succ.key;
            root.right = deleteNode(root.right, succ.key);
        }
        return root;
    }
}`,python:`class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root

def search(root, key):
    if root is None:
        return False
    if key == root.key:
        return True
    return search(root.left, key) if key < root.key else search(root.right, key)

def min_value_node(node):
    while node and node.left:
        node = node.left
    return node

def delete_node(root, key):
    if root is None:
        return None
    if key < root.key:
        root.left = delete_node(root.left, key)
    elif key > root.key:
        root.right = delete_node(root.right, key)
    else:
        if root.left is None:
            return root.right
        if root.right is None:
            return root.left
        succ = min_value_node(root.right)
        root.key = succ.key
        root.right = delete_node(root.right, succ.key)
    return root`,javascript:`class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

function insert(root, key) {
  if (!root) return new Node(key);
  if (key < root.key) root.left = insert(root.left, key);
  else if (key > root.key) root.right = insert(root.right, key);
  return root;
}

function search(root, key) {
  if (!root) return false;
  if (key === root.key) return true;
  return key < root.key ? search(root.left, key) : search(root.right, key);
}

function minValueNode(node) {
  while (node && node.left) node = node.left;
  return node;
}

function deleteNode(root, key) {
  if (!root) return null;
  if (key < root.key) root.left = deleteNode(root.left, key);
  else if (key > root.key) root.right = deleteNode(root.right, key);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    const succ = minValueNode(root.right);
    root.key = succ.key;
    root.right = deleteNode(root.right, succ.key);
  }
  return root;
}`},avl:{title:"AVL Tree (Self-Balancing BST)",timeComplexity:"O(log N)",spaceComplexity:"O(N)",explanationText:"An AVL tree keeps every node’s balance factor (Height(left) − Height(right)) within { −1, 0, +1 }. When an insertion or deletion breaks this invariant, LL / RR / LR / RL rotations rebalance the tree in O(1), guaranteeing O(log N) operations.",cpp:`#include <iostream>
#include <algorithm>
using namespace std;

struct Node {
    int key;
    Node *left, *right;
    int height;
    Node(int k) : key(k), left(nullptr), right(nullptr), height(1) {}
};

int height(Node *n) { return n ? n->height : 0; }
int getBalance(Node *n) { return n ? height(n->left) - height(n->right) : 0; }

Node* rightRotate(Node *y) {
    Node *x = y->left;
    Node *T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    return x;
}

Node* leftRotate(Node *x) {
    Node *y = x->right;
    Node *T2 = y->left;
    y->left = x;
    x->right = T2;
    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;
    return y;
}

Node* insert(Node* node, int key) {
    if (!node) return new Node(key);
    if (key < node->key) node->left = insert(node->left, key);
    else if (key > node->key) node->right = insert(node->right, key);
    else return node;

    node->height = 1 + max(height(node->left), height(node->right));
    int balance = getBalance(node);

    if (balance > 1 && key < node->left->key) return rightRotate(node);
    if (balance < -1 && key > node->right->key) return leftRotate(node);
    if (balance > 1 && key > node->left->key) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }
    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }
    return node;
}

bool search(Node* node, int key) {
    if (!node) return false;
    if (key == node->key) return true;
    return key < node->key ? search(node->left, key) : search(node->right, key);
}`,java:`public class AVLTree {
    static class Node {
        int key, height = 1;
        Node left, right;
        Node(int d) { key = d; }
    }

    int height(Node N) { return N == null ? 0 : N.height; }
    int getBalance(Node N) { return N == null ? 0 : height(N.left) - height(N.right); }

    Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        return x;
    }

    Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        return y;
    }

    Node insert(Node node, int key) {
        if (node == null) return new Node(key);
        if (key < node.key) node.left = insert(node.left, key);
        else if (key > node.key) node.right = insert(node.right, key);
        else return node;

        node.height = 1 + Math.max(height(node.left), height(node.right));
        int balance = getBalance(node);

        if (balance > 1 && key < node.left.key) return rightRotate(node);
        if (balance < -1 && key > node.right.key) return leftRotate(node);
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }

    boolean search(Node node, int key) {
        if (node == null) return false;
        if (key == node.key) return true;
        return key < node.key ? search(node.left, key) : search(node.right, key);
    }
}`,python:`class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

def get_height(node):
    return node.height if node else 0

def get_balance(node):
    return get_height(node.left) - get_height(node.right) if node else 0

def right_rotate(y):
    x = y.left
    t2 = x.right
    x.right = y
    y.left = t2
    y.height = 1 + max(get_height(y.left), get_height(y.right))
    x.height = 1 + max(get_height(x.left), get_height(x.right))
    return x

def left_rotate(x):
    y = x.right
    t2 = y.left
    y.left = x
    x.right = t2
    x.height = 1 + max(get_height(x.left), get_height(x.right))
    y.height = 1 + max(get_height(y.left), get_height(y.right))
    return y

def insert(node, key):
    if node is None:
        return Node(key)
    if key < node.key:
        node.left = insert(node.left, key)
    elif key > node.key:
        node.right = insert(node.right, key)
    else:
        return node

    node.height = 1 + max(get_height(node.left), get_height(node.right))
    balance = get_balance(node)

    if balance > 1 and key < node.left.key:
        return right_rotate(node)
    if balance < -1 and key > node.right.key:
        return left_rotate(node)
    if balance > 1 and key > node.left.key:
        node.left = left_rotate(node.left)
        return right_rotate(node)
    if balance < -1 and key < node.right.key:
        node.right = right_rotate(node.right)
        return left_rotate(node)
    return node

def search(node, key):
    if node is None:
        return False
    if key == node.key:
        return True
    return search(node.left, key) if key < node.key else search(node.right, key)`,javascript:`class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

const getHeight = (n) => (n ? n.height : 0);
const getBalance = (n) => (n ? getHeight(n.left) - getHeight(n.right) : 0);

function rightRotate(y) {
  const x = y.left;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
  return x;
}

function leftRotate(x) {
  const y = x.right;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
  y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
  return y;
}

function insert(node, key) {
  if (!node) return new Node(key);
  if (key < node.key) node.left = insert(node.left, key);
  else if (key > node.key) node.right = insert(node.right, key);
  else return node;

  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  const balance = getBalance(node);

  if (balance > 1 && key < node.left.key) return rightRotate(node);
  if (balance < -1 && key > node.right.key) return leftRotate(node);
  if (balance > 1 && key > node.left.key) {
    node.left = leftRotate(node.left);
    return rightRotate(node);
  }
  if (balance < -1 && key < node.right.key) {
    node.right = rightRotate(node.right);
    return leftRotate(node);
  }
  return node;
}

function search(node, key) {
  if (!node) return false;
  if (key === node.key) return true;
  return key < node.key ? search(node.left, key) : search(node.right, key);
}`},redblack:{title:"Red-Black Tree",timeComplexity:"O(log N)",spaceComplexity:"O(N)",explanationText:"Red-Black trees balance using node colors: root is black, red nodes cannot have red children, and every root-to-leaf path has the same black height. Insertion recovers violations by recoloring and at most 2 rotations — fewer rotations than AVL, hence faster writes.",cpp:`#include <iostream>
using namespace std;

enum Color { RED, BLACK };

struct Node {
    int key;
    bool color;
    Node *left, *right, *parent;
    Node(int k) : key(k), color(RED), left(nullptr), right(nullptr), parent(nullptr) {}
};

class RedBlackTree {
public:
    Node* root;

    RedBlackTree() : root(nullptr) {}

    void rotateLeft(Node* x) {
        Node* y = x->right;
        x->right = y->left;
        if (y->left) y->left->parent = x;
        y->parent = x->parent;
        if (!x->parent) root = y;
        else if (x == x->parent->left) x->parent->left = y;
        else x->parent->right = y;
        y->left = x;
        x->parent = y;
    }

    void rotateRight(Node* x) {
        Node* y = x->left;
        x->left = y->right;
        if (y->right) y->right->parent = x;
        y->parent = x->parent;
        if (!x->parent) root = y;
        else if (x == x->parent->right) x->parent->right = y;
        else x->parent->left = y;
        y->right = x;
        x->parent = y;
    }

    void fixInsert(Node* z) {
        while (z->parent && z->parent->color == RED) {
            Node* gp = z->parent->parent;
            if (z->parent == gp->left) {
                Node* uncle = gp->right;
                if (uncle && uncle->color == RED) {
                    z->parent->color = BLACK;
                    uncle->color = BLACK;
                    gp->color = RED;
                    z = gp;
                } else {
                    if (z == z->parent->right) { z = z->parent; rotateLeft(z); }
                    z->parent->color = BLACK;
                    gp->color = RED;
                    rotateRight(gp);
                }
            } else {
                Node* uncle = gp->left;
                if (uncle && uncle->color == RED) {
                    z->parent->color = BLACK;
                    uncle->color = BLACK;
                    gp->color = RED;
                    z = gp;
                } else {
                    if (z == z->parent->left) { z = z->parent; rotateRight(z); }
                    z->parent->color = BLACK;
                    gp->color = RED;
                    rotateLeft(gp);
                }
            }
        }
        root->color = BLACK;
    }

    void insert(int key) {
        Node* z = new Node(key);
        Node* y = nullptr;
        Node* x = root;
        while (x) { y = x; x = (key < x->key) ? x->left : x->right; }
        z->parent = y;
        if (!y) root = z;
        else if (key < y->key) y->left = z;
        else y->right = z;
        fixInsert(z);
    }
};`,java:`public class RedBlackTree {
    static final boolean RED = true, BLACK = false;

    static class Node {
        int key;
        boolean color;
        Node left, right, parent;
        Node(int k) { key = k; color = RED; }
    }

    Node root;

    void rotateLeft(Node x) {
        Node y = x.right;
        x.right = y.left;
        if (y.left != null) y.left.parent = x;
        y.parent = x.parent;
        if (x.parent == null) root = y;
        else if (x == x.parent.left) x.parent.left = y;
        else x.parent.right = y;
        y.left = x;
        x.parent = y;
    }

    void rotateRight(Node x) {
        Node y = x.left;
        x.left = y.right;
        if (y.right != null) y.right.parent = x;
        y.parent = x.parent;
        if (x.parent == null) root = y;
        else if (x == x.parent.right) x.parent.right = y;
        else x.parent.left = y;
        y.right = x;
        x.parent = y;
    }

    void fixInsert(Node z) {
        while (z.parent != null && z.parent.color == RED) {
            Node gp = z.parent.parent;
            if (z.parent == gp.left) {
                Node uncle = gp.right;
                if (uncle != null && uncle.color == RED) {
                    z.parent.color = BLACK;
                    uncle.color = BLACK;
                    gp.color = RED;
                    z = gp;
                } else {
                    if (z == z.parent.right) { z = z.parent; rotateLeft(z); }
                    z.parent.color = BLACK;
                    gp.color = RED;
                    rotateRight(gp);
                }
            } else {
                Node uncle = gp.left;
                if (uncle != null && uncle.color == RED) {
                    z.parent.color = BLACK;
                    uncle.color = BLACK;
                    gp.color = RED;
                    z = gp;
                } else {
                    if (z == z.parent.left) { z = z.parent; rotateRight(z); }
                    z.parent.color = BLACK;
                    gp.color = RED;
                    rotateLeft(gp);
                }
            }
        }
        root.color = BLACK;
    }

    void insert(int key) {
        Node z = new Node(key);
        Node y = null, x = root;
        while (x != null) { y = x; x = key < x.key ? x.left : x.right; }
        z.parent = y;
        if (y == null) root = z;
        else if (key < y.key) y.left = z;
        else y.right = z;
        fixInsert(z);
    }
}`,python:`RED, BLACK = True, False

class Node:
    def __init__(self, key):
        self.key = key
        self.color = RED
        self.left = None
        self.right = None
        self.parent = None

class RedBlackTree:
    def __init__(self):
        self.root = None

    def rotate_left(self, x):
        y = x.right
        x.right = y.left
        if y.left:
            y.left.parent = x
        y.parent = x.parent
        if not x.parent:
            self.root = y
        elif x == x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y
        y.left = x
        x.parent = y

    def rotate_right(self, x):
        y = x.left
        x.left = y.right
        if y.right:
            y.right.parent = x
        y.parent = x.parent
        if not x.parent:
            self.root = y
        elif x == x.parent.right:
            x.parent.right = y
        else:
            x.parent.left = y
        y.right = x
        x.parent = y

    def fix_insert(self, z):
        while z.parent and z.parent.color == RED:
            gp = z.parent.parent
            if z.parent == gp.left:
                uncle = gp.right
                if uncle and uncle.color == RED:
                    z.parent.color = BLACK
                    uncle.color = BLACK
                    gp.color = RED
                    z = gp
                else:
                    if z == z.parent.right:
                        z = z.parent
                        self.rotate_left(z)
                    z.parent.color = BLACK
                    gp.color = RED
                    self.rotate_right(gp)
            else:
                uncle = gp.left
                if uncle and uncle.color == RED:
                    z.parent.color = BLACK
                    uncle.color = BLACK
                    gp.color = RED
                    z = gp
                else:
                    if z == z.parent.left:
                        z = z.parent
                        self.rotate_right(z)
                    z.parent.color = BLACK
                    gp.color = RED
                    self.rotate_left(gp)
        self.root.color = BLACK

    def insert(self, key):
        z = Node(key)
        y, x = None, self.root
        while x:
            y = x
            x = x.left if key < x.key else x.right
        z.parent = y
        if not y:
            self.root = z
        elif key < y.key:
            y.left = z
        else:
            y.right = z
        self.fix_insert(z)`,javascript:`const RED = true, BLACK = false;

class Node {
  constructor(key) {
    this.key = key;
    this.color = RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class RedBlackTree {
  constructor() { this.root = null; }

  rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    if (y.left) y.left.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  rotateRight(x) {
    const y = x.left;
    x.left = y.right;
    if (y.right) y.right.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.right) x.parent.right = y;
    else x.parent.left = y;
    y.right = x;
    x.parent = y;
  }

  fixInsert(z) {
    while (z.parent && z.parent.color === RED) {
      const gp = z.parent.parent;
      if (z.parent === gp.left) {
        const uncle = gp.right;
        if (uncle && uncle.color === RED) {
          z.parent.color = BLACK;
          uncle.color = BLACK;
          gp.color = RED;
          z = gp;
        } else {
          if (z === z.parent.right) { z = z.parent; this.rotateLeft(z); }
          z.parent.color = BLACK;
          gp.color = RED;
          this.rotateRight(gp);
        }
      } else {
        const uncle = gp.left;
        if (uncle && uncle.color === RED) {
          z.parent.color = BLACK;
          uncle.color = BLACK;
          gp.color = RED;
          z = gp;
        } else {
          if (z === z.parent.left) { z = z.parent; this.rotateRight(z); }
          z.parent.color = BLACK;
          gp.color = RED;
          this.rotateLeft(gp);
        }
      }
    }
    this.root.color = BLACK;
  }

  insert(key) {
    const z = new Node(key);
    let y = null, x = this.root;
    while (x) { y = x; x = key < x.key ? x.left : x.right; }
    z.parent = y;
    if (!y) this.root = z;
    else if (key < y.key) y.left = z;
    else y.right = z;
    this.fixInsert(z);
  }
}`},heap:{title:"Binary Heap / Priority Queue (Min-Heap)",timeComplexity:"push O(log N) • pop O(log N) • peek O(1)",spaceComplexity:"O(N)",explanationText:"A binary heap is a complete binary tree stored in an array. A min-heap guarantees parent <= children, maintained with sift-up (insertion) and sift-down (removal). It backs the standard Priority Queue used by Dijkstra and heap sort.",cpp:`#include <vector>
#include <stdexcept>
using namespace std;

class MinHeap {
    vector<int> h;

    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return 2 * i + 1; }
    int right(int i) { return 2 * i + 2; }

    void siftUp(int i) {
        while (i > 0 && h[i] < h[parent(i)]) {
            swap(h[i], h[parent(i)]);
            i = parent(i);
        }
    }

    void siftDown(int i) {
        int n = h.size();
        while (true) {
            int smallest = i;
            int l = left(i), r = right(i);
            if (l < n && h[l] < h[smallest]) smallest = l;
            if (r < n && h[r] < h[smallest]) smallest = r;
            if (smallest == i) break;
            swap(h[i], h[smallest]);
            i = smallest;
        }
    }

public:
    void push(int val) {
        h.push_back(val);
        siftUp(h.size() - 1);
    }

    int pop() {
        if (h.empty()) throw out_of_range("empty heap");
        int top = h[0];
        h[0] = h.back();
        h.pop_back();
        if (!h.empty()) siftDown(0);
        return top;
    }

    int peek() { return h[0]; }
    int size() { return h.size(); }
};`,java:`import java.util.*;

public class MinHeap {
    private List<Integer> h = new ArrayList<>();

    private int parent(int i) { return (i - 1) / 2; }
    private int left(int i) { return 2 * i + 1; }
    private int right(int i) { return 2 * i + 2; }

    private void siftUp(int i) {
        while (i > 0 && h.get(i) < h.get(parent(i))) {
            Collections.swap(h, i, parent(i));
            i = parent(i);
        }
    }

    private void siftDown(int i) {
        int n = h.size();
        while (true) {
            int smallest = i;
            int l = left(i), r = right(i);
            if (l < n && h.get(l) < h.get(smallest)) smallest = l;
            if (r < n && h.get(r) < h.get(smallest)) smallest = r;
            if (smallest == i) break;
            Collections.swap(h, i, smallest);
            i = smallest;
        }
    }

    public void push(int val) {
        h.add(val);
        siftUp(h.size() - 1);
    }

    public int pop() {
        int top = h.get(0);
        h.set(0, h.get(h.size() - 1));
        h.remove(h.size() - 1);
        if (!h.isEmpty()) siftDown(0);
        return top;
    }

    public int peek() { return h.get(0); }
}`,python:`class MinHeap:
    def __init__(self):
        self.h = []

    def _parent(self, i): return (i - 1) // 2
    def _left(self, i): return 2 * i + 1
    def _right(self, i): return 2 * i + 2

    def _sift_up(self, i):
        while i > 0 and self.h[i] < self.h[self._parent(i)]:
            self.h[i], self.h[self._parent(i)] = self.h[self._parent(i)], self.h[i]
            i = self._parent(i)

    def _sift_down(self, i):
        n = len(self.h)
        while True:
            smallest = i
            l, r = self._left(i), self._right(i)
            if l < n and self.h[l] < self.h[smallest]:
                smallest = l
            if r < n and self.h[r] < self.h[smallest]:
                smallest = r
            if smallest == i:
                break
            self.h[i], self.h[smallest] = self.h[smallest], self.h[i]
            i = smallest

    def push(self, val):
        self.h.append(val)
        self._sift_up(len(self.h) - 1)

    def pop(self):
        top = self.h[0]
        self.h[0] = self.h[-1]
        self.h.pop()
        if self.h:
            self._sift_down(0)
        return top

    def peek(self):
        return self.h[0]`,javascript:`class MinHeap {
  constructor() { this.h = []; }

  parent(i) { return Math.floor((i - 1) / 2); }
  left(i) { return 2 * i + 1; }
  right(i) { return 2 * i + 2; }

  siftUp(i) {
    while (i > 0 && this.h[i] < this.h[this.parent(i)]) {
      [this.h[i], this.h[this.parent(i)]] = [this.h[this.parent(i)], this.h[i]];
      i = this.parent(i);
    }
  }

  siftDown(i) {
    const n = this.h.length;
    while (true) {
      let smallest = i;
      const l = this.left(i), r = this.right(i);
      if (l < n && this.h[l] < this.h[smallest]) smallest = l;
      if (r < n && this.h[r] < this.h[smallest]) smallest = r;
      if (smallest === i) break;
      [this.h[i], this.h[smallest]] = [this.h[smallest], this.h[i]];
      i = smallest;
    }
  }

  push(val) {
    this.h.push(val);
    this.siftUp(this.h.length - 1);
  }

  pop() {
    const top = this.h[0];
    this.h[0] = this.h[this.h.length - 1];
    this.h.pop();
    if (this.h.length) this.siftDown(0);
    return top;
  }

  peek() { return this.h[0]; }
}`},btree:{title:"B-Tree (Order 3 / 2-3 Tree)",timeComplexity:"O(log N)",spaceComplexity:"O(N)",explanationText:"A B-Tree is a balanced multi-way search tree. Each node can hold up to M−1 keys and M children, which keeps height tiny and minimizes disk I/O — the reason databases and file systems use it. Here we build a minimal order-3 (2-3) tree.",cpp:`#include <iostream>
#include <vector>
using namespace std;

const int M = 3;

struct BTreeNode {
    vector<int> keys;
    vector<BTreeNode*> children;
    bool leaf;

    BTreeNode(bool l) : leaf(l) {}

    int findKey(int k) {
        int idx = 0;
        while (idx < keys.size() && keys[idx] < k) idx++;
        return idx;
    }
};

void traverse(BTreeNode* node) {
    if (!node) return;
    for (int i = 0; i < node->keys.size(); i++) {
        if (!node->leaf) traverse(node->children[i]);
        cout << node->keys[i] << " ";
    }
    if (!node->leaf) traverse(node->children.back());
}

BTreeNode* splitChild(BTreeNode* parent, int i) {
    BTreeNode* full = parent->children[i];
    BTreeNode* newNode = new BTreeNode(full->leaf);

    int mid = full->keys.size() / 2;
    int midKey = full->keys[mid];

    for (int j = mid + 1; j < full->keys.size(); j++)
        newNode->keys.push_back(full->keys[j]);
    full->keys.resize(mid);

    if (!full->leaf) {
        for (int j = mid + 1; j < full->children.size(); j++)
            newNode->children.push_back(full->children[j]);
        full->children.resize(mid + 1);
    }

    parent->children.insert(parent->children.begin() + i + 1, newNode);
    parent->keys.insert(parent->keys.begin() + i, midKey);
    return parent;
}

BTreeNode* insertNonFull(BTreeNode* node, int k) {
    int i = node->findKey(k);
    if (node->leaf) {
        node->keys.insert(node->keys.begin() + i, k);
        return node;
    }
    if (node->children[i]->keys.size() == M - 1) {
        node = splitChild(node, i);
        if (k > node->keys[i]) i++;
    }
    node->children[i] = insertNonFull(node->children[i], k);
    return node;
}

BTreeNode* insert(BTreeNode* root, int k) {
    if (!root) return new BTreeNode(true);
    if (root->keys.size() == M - 1) {
        BTreeNode* s = new BTreeNode(false);
        s->children.push_back(root);
        s = splitChild(s, 0);
        return insertNonFull(s, k);
    }
    return insertNonFull(root, k);
}`,java:`import java.util.*;

public class BTree {
    static final int M = 3;

    static class Node {
        List<Integer> keys = new ArrayList<>();
        List<Node> children = new ArrayList<>();
        boolean leaf;

        Node(boolean l) { leaf = l; }

        int findKey(int k) {
            int idx = 0;
            while (idx < keys.size() && keys.get(idx) < k) idx++;
            return idx;
        }
    }

    Node splitChild(Node parent, int i) {
        Node full = parent.children.get(i);
        Node newNode = new Node(full.leaf);
        int mid = full.keys.size() / 2;
        int midKey = full.keys.get(mid);

        for (int j = mid + 1; j < full.keys.size(); j++)
            newNode.keys.add(full.keys.get(j));
        full.keys.subList(mid, full.keys.size()).clear();

        if (!full.leaf) {
            for (int j = mid + 1; j < full.children.size(); j++)
                newNode.children.add(full.children.get(j));
            full.children.subList(mid + 1, full.children.size()).clear();
        }

        parent.children.add(i + 1, newNode);
        parent.keys.add(i, midKey);
        return parent;
    }

    Node insertNonFull(Node node, int k) {
        int i = node.findKey(k);
        if (node.leaf) {
            node.keys.add(i, k);
            return node;
        }
        if (node.children.get(i).keys.size() == M - 1) {
            node = splitChild(node, i);
            if (k > node.keys.get(i)) i++;
        }
        node.children.set(i, insertNonFull(node.children.get(i), k));
        return node;
    }

    Node insert(Node root, int k) {
        if (root == null) return new Node(true);
        if (root.keys.size() == M - 1) {
            Node s = new Node(false);
            s.children.add(root);
            s = splitChild(s, 0);
            return insertNonFull(s, k);
        }
        return insertNonFull(root, k);
    }
}`,python:`M = 3

class BTreeNode:
    def __init__(self, leaf):
        self.keys = []
        self.children = []
        self.leaf = leaf

    def find_key(self, k):
        idx = 0
        while idx < len(self.keys) and self.keys[idx] < k:
            idx += 1
        return idx

def split_child(parent, i):
    full = parent.children[i]
    new_node = BTreeNode(full.leaf)
    mid = len(full.keys) // 2
    mid_key = full.keys[mid]

    new_node.keys = full.keys[mid + 1:]
    full.keys = full.keys[:mid]

    if not full.leaf:
        new_node.children = full.children[mid + 1:]
        full.children = full.children[:mid + 1]

    parent.children.insert(i + 1, new_node)
    parent.keys.insert(i, mid_key)
    return parent

def insert_non_full(node, k):
    i = node.find_key(k)
    if node.leaf:
        node.keys.insert(i, k)
        return node
    if len(node.children[i].keys) == M - 1:
        node = split_child(node, i)
        if k > node.keys[i]:
            i += 1
    node.children[i] = insert_non_full(node.children[i], k)
    return node

def insert(root, k):
    if root is None:
        return BTreeNode(True)
    if len(root.keys) == M - 1:
        s = BTreeNode(False)
        s.children.append(root)
        s = split_child(s, 0)
        return insert_non_full(s, k)
    return insert_non_full(root, k)`,javascript:`const M = 3;

class BTreeNode {
  constructor(leaf) {
    this.keys = [];
    this.children = [];
    this.leaf = leaf;
  }

  findKey(k) {
    let idx = 0;
    while (idx < this.keys.length && this.keys[idx] < k) idx++;
    return idx;
  }
}

function splitChild(parent, i) {
  const full = parent.children[i];
  const newNode = new BTreeNode(full.leaf);
  const mid = Math.floor(full.keys.length / 2);
  const midKey = full.keys[mid];

  newNode.keys = full.keys.slice(mid + 1);
  full.keys = full.keys.slice(0, mid);

  if (!full.leaf) {
    newNode.children = full.children.slice(mid + 1);
    full.children = full.children.slice(0, mid + 1);
  }

  parent.children.splice(i + 1, 0, newNode);
  parent.keys.splice(i, 0, midKey);
  return parent;
}

function insertNonFull(node, k) {
  let i = node.findKey(k);
  if (node.leaf) {
    node.keys.splice(i, 0, k);
    return node;
  }
  if (node.children[i].keys.length === M - 1) {
    node = splitChild(node, i);
    if (k > node.keys[i]) i++;
  }
  node.children[i] = insertNonFull(node.children[i], k);
  return node;
}

function insert(root, k) {
  if (!root) return new BTreeNode(true);
  if (root.keys.length === M - 1) {
    const s = new BTreeNode(false);
    s.children.push(root);
    return insertNonFull(splitChild(s, 0), k);
  }
  return insertNonFull(root, k);
}`},segment:{title:"Segment Tree (Range Sum)",timeComplexity:"build O(N) • query O(log N) • update O(log N)",spaceComplexity:"O(4N)",explanationText:"A segment tree stores aggregate information (sum, min, max, gcd) for intervals of an array. Each node covers a range; queries merge O(log N) interval nodes, and point updates propagate in O(log N). Perfect for range queries with mutations.",cpp:`#include <vector>
using namespace std;

class SegmentTree {
    vector<int> tree;
    int n;

    int build(const vector<int>& a, int node, int l, int r) {
        if (l == r) return tree[node] = a[l];
        int mid = (l + r) / 2;
        return tree[node] = build(a, 2 * node, l, mid)
                          + build(a, 2 * node + 1, mid + 1, r);
    }

public:
    SegmentTree(const vector<int>& a) {
        n = a.size();
        tree.assign(4 * n, 0);
        if (n > 0) build(a, 1, 0, n - 1);
    }

    int query(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        return query(2 * node, l, mid, ql, qr)
             + query(2 * node + 1, mid + 1, r, ql, qr);
    }

    void update(int node, int l, int r, int idx, int val) {
        if (l == r) { tree[node] = val; return; }
        int mid = (l + r) / 2;
        if (idx <= mid) update(2 * node, l, mid, idx, val);
        else update(2 * node + 1, mid + 1, r, idx, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    int rangeSum(int l, int r) { return query(1, 0, n - 1, l, r); }
    void pointUpdate(int idx, int val) { update(1, 0, n - 1, idx, val); }
};`,java:`public class SegmentTree {
    int[] tree;
    int n;

    public SegmentTree(int[] a) {
        n = a.length;
        tree = new int[4 * n];
        if (n > 0) build(a, 1, 0, n - 1);
    }

    private int build(int[] a, int node, int l, int r) {
        if (l == r) return tree[node] = a[l];
        int mid = (l + r) / 2;
        return tree[node] = build(a, 2 * node, l, mid)
                          + build(a, 2 * node + 1, mid + 1, r);
    }

    private int query(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        return query(2 * node, l, mid, ql, qr)
             + query(2 * node + 1, mid + 1, r, ql, qr);
    }

    private void update(int node, int l, int r, int idx, int val) {
        if (l == r) { tree[node] = val; return; }
        int mid = (l + r) / 2;
        if (idx <= mid) update(2 * node, l, mid, idx, val);
        else update(2 * node + 1, mid + 1, r, idx, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    public int rangeSum(int l, int r) { return query(1, 0, n - 1, l, r); }
    public void pointUpdate(int idx, int val) { update(1, 0, n - 1, idx, val); }
}`,python:`class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        if self.n > 0:
            self._build(arr, 1, 0, self.n - 1)

    def _build(self, arr, node, l, r):
        if l == r:
            self.tree[node] = arr[l]
            return self.tree[node]
        mid = (l + r) // 2
        self.tree[node] = self._build(arr, 2 * node, l, mid)                         + self._build(arr, 2 * node + 1, mid + 1, r)
        return self.tree[node]

    def _query(self, node, l, r, ql, qr):
        if ql > r or qr < l:
            return 0
        if ql <= l and r <= qr:
            return self.tree[node]
        mid = (l + r) // 2
        return self._query(2 * node, l, mid, ql, qr)              + self._query(2 * node + 1, mid + 1, r, ql, qr)

    def _update(self, node, l, r, idx, val):
        if l == r:
            self.tree[node] = val
            return
        mid = (l + r) // 2
        if idx <= mid:
            self._update(2 * node, l, mid, idx, val)
        else:
            self._update(2 * node + 1, mid + 1, r, idx, val)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def range_sum(self, l, r):
        return self._query(1, 0, self.n - 1, l, r)

    def point_update(self, idx, val):
        self._update(1, 0, self.n - 1, idx, val)`,javascript:`class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    if (this.n > 0) this.build(arr, 1, 0, this.n - 1);
  }

  build(arr, node, l, r) {
    if (l === r) return (this.tree[node] = arr[l]);
    const mid = Math.floor((l + r) / 2);
    return (this.tree[node] =
      this.build(arr, 2 * node, l, mid) +
      this.build(arr, 2 * node + 1, mid + 1, r));
  }

  query(node, l, r, ql, qr) {
    if (ql > r || qr < l) return 0;
    if (ql <= l && r <= qr) return this.tree[node];
    const mid = Math.floor((l + r) / 2);
    return this.query(2 * node, l, mid, ql, qr) +
           this.query(2 * node + 1, mid + 1, r, ql, qr);
  }

  update(node, l, r, idx, val) {
    if (l === r) { this.tree[node] = val; return; }
    const mid = Math.floor((l + r) / 2);
    if (idx <= mid) this.update(2 * node, l, mid, idx, val);
    else this.update(2 * node + 1, mid + 1, r, idx, val);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  rangeSum(l, r) { return this.query(1, 0, this.n - 1, l, r); }
  pointUpdate(idx, val) { this.update(1, 0, this.n - 1, idx, val); }
}`}},nx={treap:{title:"Treap (Randomized BST + Heap)",timeComplexity:"O(log N) expected",spaceComplexity:"O(N)",explanationText:"A treap combines a BST key ordering with a max-heap on random priorities. Rotations restore the heap property after insert/delete, so the tree stays balanced with high probability — no complicated rebalancing logic needed.",cpp:`#include <iostream>
using namespace std;

struct Node {
    int key, priority;
    Node *left, *right;
    Node(int k) : key(k), priority(rand()), left(nullptr), right(nullptr) {}
};

Node* rotateRight(Node* y) {
    Node* x = y->left;
    y->left = x->right;
    x->right = y;
    return x;
}

Node* rotateLeft(Node* x) {
    Node* y = x->right;
    x->right = y->left;
    y->left = x;
    return y;
}

Node* insert(Node* root, int key) {
    if (!root) return new Node(key);
    if (key < root->key) {
        root->left = insert(root->left, key);
        if (root->left->priority > root->priority)
            root = rotateRight(root);
    } else if (key > root->key) {
        root->right = insert(root->right, key);
        if (root->right->priority > root->priority)
            root = rotateLeft(root);
    }
    return root;
}

Node* erase(Node* root, int key) {
    if (!root) return nullptr;
    if (key < root->key) root->left = erase(root->left, key);
    else if (key > root->key) root->right = erase(root->right, key);
    else {
        if (!root->left) return root->right;
        if (!root->right) return root->left;
        if (root->left->priority > root->right->priority)
            root = rotateRight(root), root->right = erase(root->right, key);
        else
            root = rotateLeft(root), root->left = erase(root->left, key);
    }
    return root;
}

bool search(Node* root, int key) {
    if (!root) return false;
    if (key == root->key) return true;
    return key < root->key ? search(root->left, key) : search(root->right, key);
}`,java:`import java.util.Random;

public class Treap {
    static class Node {
        int key, priority;
        Node left, right;
        Node(int k) { key = k; priority = new Random().nextInt(); }
    }

    Node rotateRight(Node y) {
        Node x = y.left;
        y.left = x.right;
        x.right = y;
        return x;
    }

    Node rotateLeft(Node x) {
        Node y = x.right;
        x.right = y.left;
        y.left = x;
        return y;
    }

    Node insert(Node root, int key) {
        if (root == null) return new Node(key);
        if (key < root.key) {
            root.left = insert(root.left, key);
            if (root.left.priority > root.priority) root = rotateRight(root);
        } else if (key > root.key) {
            root.right = insert(root.right, key);
            if (root.right.priority > root.priority) root = rotateLeft(root);
        }
        return root;
    }

    Node erase(Node root, int key) {
        if (root == null) return null;
        if (key < root.key) root.left = erase(root.left, key);
        else if (key > root.key) root.right = erase(root.right, key);
        else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            if (root.left.priority > root.right.priority) {
                root = rotateRight(root);
                root.right = erase(root.right, key);
            } else {
                root = rotateLeft(root);
                root.left = erase(root.left, key);
            }
        }
        return root;
    }

    boolean search(Node root, int key) {
        if (root == null) return false;
        if (key == root.key) return true;
        return key < root.key ? search(root.left, key) : search(root.right, key);
    }
}`,python:`import random

class Node:
    def __init__(self, key):
        self.key = key
        self.priority = random.random()
        self.left = None
        self.right = None

def rotate_right(y):
    x = y.left
    y.left = x.right
    x.right = y
    return x

def rotate_left(x):
    y = x.right
    x.right = y.left
    y.left = x
    return y

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
        if root.left.priority > root.priority:
            root = rotate_right(root)
    elif key > root.key:
        root.right = insert(root.right, key)
        if root.right.priority > root.priority:
            root = rotate_left(root)
    return root

def erase(root, key):
    if root is None:
        return None
    if key < root.key:
        root.left = erase(root.left, key)
    elif key > root.key:
        root.right = erase(root.right, key)
    else:
        if root.left is None:
            return root.right
        if root.right is None:
            return root.left
        if root.left.priority > root.right.priority:
            root = rotate_right(root)
            root.right = erase(root.right, key)
        else:
            root = rotate_left(root)
            root.left = erase(root.left, key)
    return root

def search(root, key):
    if root is None:
        return False
    if key == root.key:
        return True
    return search(root.left, key) if key < root.key else search(root.right, key)`,javascript:`class Node {
  constructor(key) {
    this.key = key;
    this.priority = Math.random();
    this.left = null;
    this.right = null;
  }
}

function rotateRight(y) {
  const x = y.left;
  y.left = x.right;
  x.right = y;
  return x;
}

function rotateLeft(x) {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  return y;
}

function insert(root, key) {
  if (!root) return new Node(key);
  if (key < root.key) {
    root.left = insert(root.left, key);
    if (root.left.priority > root.priority) root = rotateRight(root);
  } else if (key > root.key) {
    root.right = insert(root.right, key);
    if (root.right.priority > root.priority) root = rotateLeft(root);
  }
  return root;
}

function erase(root, key) {
  if (!root) return null;
  if (key < root.key) root.left = erase(root.left, key);
  else if (key > root.key) root.right = erase(root.right, key);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    if (root.left.priority > root.right.priority) {
      root = rotateRight(root);
      root.right = erase(root.right, key);
    } else {
      root = rotateLeft(root);
      root.left = erase(root.left, key);
    }
  }
  return root;
}

function search(root, key) {
  if (!root) return false;
  if (key === root.key) return true;
  return key < root.key ? search(root.left, key) : search(root.right, key);
}`},splay:{title:"Splay Tree",timeComplexity:"O(log N) amortized",spaceComplexity:"O(N)",explanationText:"A splay tree moves every accessed node to the root via zig, zig-zig and zig-zag rotations. Frequently accessed keys become cheap to reach — great for caching and access-locality workloads.",cpp:`struct Node {
    int key;
    Node *left, *right;
    Node(int k) : key(k), left(nullptr), right(nullptr) {}
};

Node* rightRotate(Node* x) {
    Node* y = x->left;
    x->left = y->right;
    y->right = x;
    return y;
}

Node* leftRotate(Node* x) {
    Node* y = x->right;
    x->right = y->left;
    y->left = x;
    return y;
}

Node* splay(Node* root, int key) {
    if (!root || root->key == key) return root;

    if (key < root->key) {
        if (!root->left) return root;
        if (key < root->left->key) {
            root->left->left = splay(root->left->left, key);
            root = rightRotate(root);
        } else if (key > root->left->key) {
            root->left->right = splay(root->left->right, key);
            if (root->left->right) root->left = leftRotate(root->left);
        }
        return root->left ? rightRotate(root) : root;
    } else {
        if (!root->right) return root;
        if (key > root->right->key) {
            root->right->right = splay(root->right->right, key);
            root = leftRotate(root);
        } else if (key < root->right->key) {
            root->right->left = splay(root->right->left, key);
            if (root->right->left) root->right = rightRotate(root->right);
        }
        return root->right ? leftRotate(root) : root;
    }
}

Node* insert(Node* root, int key) {
    if (!root) return new Node(key);
    root = splay(root, key);
    if (root->key == key) return root;

    Node* node = new Node(key);
    if (key < root->key) {
        node->right = root;
        node->left = root->left;
        root->left = nullptr;
    } else {
        node->left = root;
        node->right = root->right;
        root->right = nullptr;
    }
    return node;
}

Node* search(Node* root, int key) {
    return splay(root, key);
}`,java:`public class SplayTree {
    static class Node {
        int key;
        Node left, right;
        Node(int k) { key = k; }
    }

    Node rightRotate(Node x) {
        Node y = x.left;
        x.left = y.right;
        y.right = x;
        return y;
    }

    Node leftRotate(Node x) {
        Node y = x.right;
        x.right = y.left;
        y.left = x;
        return y;
    }

    Node splay(Node root, int key) {
        if (root == null || root.key == key) return root;
        if (key < root.key) {
            if (root.left == null) return root;
            if (key < root.left.key) {
                root.left.left = splay(root.left.left, key);
                root = rightRotate(root);
            } else if (key > root.left.key) {
                root.left.right = splay(root.left.right, key);
                if (root.left.right != null) root.left = leftRotate(root.left);
            }
            return root.left != null ? rightRotate(root) : root;
        } else {
            if (root.right == null) return root;
            if (key > root.right.key) {
                root.right.right = splay(root.right.right, key);
                root = leftRotate(root);
            } else if (key < root.right.key) {
                root.right.left = splay(root.right.left, key);
                if (root.right.left != null) root.right = rightRotate(root.right);
            }
            return root.right != null ? leftRotate(root) : root;
        }
    }

    Node insert(Node root, int key) {
        if (root == null) return new Node(key);
        root = splay(root, key);
        if (root.key == key) return root;
        Node node = new Node(key);
        if (key < root.key) {
            node.right = root;
            node.left = root.left;
            root.left = null;
        } else {
            node.left = root;
            node.right = root.right;
            root.right = null;
        }
        return node;
    }

    Node search(Node root, int key) {
        return splay(root, key);
    }
}`,python:`class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def right_rotate(x):
    y = x.left
    x.left = y.right
    y.right = x
    return y

def left_rotate(x):
    y = x.right
    x.right = y.left
    y.left = x
    return y

def splay(root, key):
    if root is None or root.key == key:
        return root
    if key < root.key:
        if root.left is None:
            return root
        if key < root.left.key:
            root.left.left = splay(root.left.left, key)
            root = right_rotate(root)
        elif key > root.left.key:
            root.left.right = splay(root.left.right, key)
            if root.left.right:
                root.left = left_rotate(root.left)
        return right_rotate(root) if root.left else root
    else:
        if root.right is None:
            return root
        if key > root.right.key:
            root.right.right = splay(root.right.right, key)
            root = left_rotate(root)
        elif key < root.right.key:
            root.right.left = splay(root.right.left, key)
            if root.right.left:
                root.right = right_rotate(root.right)
        return left_rotate(root) if root.right else root

def insert(root, key):
    if root is None:
        return Node(key)
    root = splay(root, key)
    if root.key == key:
        return root
    node = Node(key)
    if key < root.key:
        node.right = root
        node.left = root.left
        root.left = None
    else:
        node.left = root
        node.right = root.right
        root.right = None
    return node

def search(root, key):
    return splay(root, key)`,javascript:`class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

function rightRotate(x) {
  const y = x.left;
  x.left = y.right;
  y.right = x;
  return y;
}

function leftRotate(x) {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  return y;
}

function splay(root, key) {
  if (!root || root.key === key) return root;
  if (key < root.key) {
    if (!root.left) return root;
    if (key < root.left.key) {
      root.left.left = splay(root.left.left, key);
      root = rightRotate(root);
    } else if (key > root.left.key) {
      root.left.right = splay(root.left.right, key);
      if (root.left.right) root.left = leftRotate(root.left);
    }
    return root.left ? rightRotate(root) : root;
  } else {
    if (!root.right) return root;
    if (key > root.right.key) {
      root.right.right = splay(root.right.right, key);
      root = leftRotate(root);
    } else if (key < root.right.key) {
      root.right.left = splay(root.right.left, key);
      if (root.right.left) root.right = rightRotate(root.right);
    }
    return root.right ? leftRotate(root) : root;
  }
}

function insert(root, key) {
  if (!root) return new Node(key);
  root = splay(root, key);
  if (root.key === key) return root;
  const node = new Node(key);
  if (key < root.key) {
    node.right = root;
    node.left = root.left;
    root.left = null;
  } else {
    node.left = root;
    node.right = root.right;
    root.right = null;
  }
  return node;
}

function search(root, key) {
  return splay(root, key);
}`},fenwick:{title:"Fenwick Tree (Binary Indexed Tree)",timeComplexity:"query O(log N) • update O(log N)",spaceComplexity:"O(N)",explanationText:"A Fenwick tree stores prefix aggregates in a flat array where index i covers a range of length lowbit(i) = i & (-i). Point updates and prefix queries both run in O(log N) using only a handful of bitwise operations — ideal for frequency counters.",cpp:`#include <vector>
using namespace std;

class FenwickTree {
    vector<int> bit;
    int n;

public:
    FenwickTree(int size) : n(size), bit(size + 1, 0) {}

    void add(int idx, int delta) {  // 1-indexed
        while (idx <= n) {
            bit[idx] += delta;
            idx += idx & (-idx);
        }
    }

    int prefixSum(int idx) {
        int sum = 0;
        while (idx > 0) {
            sum += bit[idx];
            idx -= idx & (-idx);
        }
        return sum;
    }

    int rangeSum(int l, int r) {
        return prefixSum(r) - prefixSum(l - 1);
    }
};`,java:`public class FenwickTree {
    int[] bit;
    int n;

    public FenwickTree(int size) {
        n = size;
        bit = new int[size + 1];
    }

    void add(int idx, int delta) {
        while (idx <= n) {
            bit[idx] += delta;
            idx += idx & (-idx);
        }
    }

    int prefixSum(int idx) {
        int sum = 0;
        while (idx > 0) {
            sum += bit[idx];
            idx -= idx & (-idx);
        }
        return sum;
    }

    int rangeSum(int l, int r) {
        return prefixSum(r) - prefixSum(l - 1);
    }
}`,python:`class FenwickTree:
    def __init__(self, size):
        self.n = size
        self.bit = [0] * (size + 1)

    def add(self, idx, delta):
        while idx <= self.n:
            self.bit[idx] += delta
            idx += idx & (-idx)

    def prefix_sum(self, idx):
        total = 0
        while idx > 0:
            total += self.bit[idx]
            idx -= idx & (-idx)
        return total

    def range_sum(self, l, r):
        return self.prefix_sum(r) - self.prefix_sum(l - 1)`,javascript:`class FenwickTree {
  constructor(size) {
    this.n = size;
    this.bit = new Array(size + 1).fill(0);
  }

  add(idx, delta) {
    while (idx <= this.n) {
      this.bit[idx] += delta;
      idx += idx & -idx;
    }
  }

  prefixSum(idx) {
    let sum = 0;
    while (idx > 0) {
      sum += this.bit[idx];
      idx -= idx & -idx;
    }
    return sum;
  }

  rangeSum(l, r) {
    return this.prefixSum(r) - this.prefixSum(l - 1);
  }
}`},rbtdelete:{title:"Red-Black Tree Deletion (Fix-up)",timeComplexity:"O(log N)",spaceComplexity:"O(N)",explanationText:"Deleting from a red-black tree may create a “double black” node when a black node is removed. The delete-fixup resolves it with recoloring and rotations, maintaining black height so the tree stays balanced at O(log N).",cpp:`#include <iostream>
using namespace std;

enum Color { RED, BLACK };

struct Node {
    int key;
    Color color;
    Node *left, *right, *parent;
    Node(int k) : key(k), color(RED), left(nullptr), right(nullptr), parent(nullptr) {}
};

Node* minimum(Node* x) {
    while (x->left) x = x->left;
    return x;
}

void transplant(Node*& root, Node* u, Node* v) {
    if (!u->parent) root = v;
    else if (u == u->parent->left) u->parent->left = v;
    else u->parent->right = v;
    if (v) v->parent = u->parent;
}

void fixDelete(Node*& root, Node* x) {
    while (x && x != root && x->color == BLACK) {
        if (x == x->parent->left) {
            Node* w = x->parent->right;
            if (w->color == RED) {
                w->color = BLACK;
                x->parent->color = RED;
                // leftRotate(x->parent) then reassign w
            }
            if ((!w->left || w->left->color == BLACK) &&
                (!w->right || w->right->color == BLACK)) {
                w->color = RED;
                x = x->parent;
            } else {
                if (!w->right || w->right->color == BLACK) {
                    if (w->left) w->left->color = BLACK;
                    w->color = RED;
                    // rightRotate(w); w = x->parent->right;
                }
                w->color = x->parent->color;
                x->parent->color = BLACK;
                if (w->right) w->right->color = BLACK;
                // leftRotate(x->parent);
                x = root;
            }
        } else { /* mirror image of the above */ }
    }
    if (x) x->color = BLACK;
}

void rbDelete(Node*& root, Node* z) {
    Node* y = z;
    Color yOriginal = y->color;
    Node* x;
    if (!z->left) {
        x = z->right;
        transplant(root, z, z->right);
    } else if (!z->right) {
        x = z->left;
        transplant(root, z, z->left);
    } else {
        y = minimum(z->right);
        yOriginal = y->color;
        x = y->right;
        if (y->parent == z) {
            if (x) x->parent = y;
        } else {
            transplant(root, y, y->right);
            y->right = z->right;
            y->right->parent = y;
        }
        transplant(root, z, y);
        y->left = z->left;
        y->left->parent = y;
        y->color = z->color;
    }
    delete z;
    if (yOriginal == BLACK) fixDelete(root, x);
}`,java:`public class RBDelete {
    static final boolean RED = true, BLACK = false;

    static class Node {
        int key;
        boolean color;
        Node left, right, parent;
        Node(int k) { key = k; color = RED; }
    }

    Node minimum(Node x) {
        while (x.left != null) x = x.left;
        return x;
    }

    void transplant(Node root, Node u, Node v) {
        if (u.parent == null) { /* set root = v externally */ }
        else if (u == u.parent.left) u.parent.left = v;
        else u.parent.right = v;
        if (v != null) v.parent = u.parent;
    }

    void rbDelete(Node root, Node z) {
        Node y = z;
        boolean yOriginal = y.color;
        Node x;
        if (z.left == null) { x = z.right; transplant(root, z, z.right); }
        else if (z.right == null) { x = z.left; transplant(root, z, z.left); }
        else {
            y = minimum(z.right);
            yOriginal = y.color;
            x = y.right;
            if (y.parent == z) {
                if (x != null) x.parent = y;
            } else {
                transplant(root, y, y.right);
                y.right = z.right;
                y.right.parent = y;
            }
            transplant(root, z, y);
            y.left = z.left;
            y.left.parent = y;
            y.color = z.color;
        }
        if (yOriginal == BLACK) fixDelete(root, x);
    }
}`,python:`RED, BLACK = True, False

class Node:
    def __init__(self, key):
        self.key = key
        self.color = RED
        self.left = None
        self.right = None
        self.parent = None

def minimum(x):
    while x.left:
        x = x.left
    return x

def transplant(root, u, v):
    if u.parent is None:
        root = v
    elif u == u.parent.left:
        u.parent.left = v
    else:
        u.parent.right = v
    if v:
        v.parent = u.parent
    return root

def fix_delete(root, x):
    while x and x != root and x.color == BLACK:
        if x == x.parent.left:
            w = x.parent.right
            if w.color == RED:
                w.color = BLACK
                x.parent.color = RED
                root = left_rotate(root, x.parent)
                w = x.parent.right
            if (w.left is None or w.left.color == BLACK) and                (w.right is None or w.right.color == BLACK):
                w.color = RED
                x = x.parent
            else:
                if w.right is None or w.right.color == BLACK:
                    if w.left:
                        w.left.color = BLACK
                    w.color = RED
                    root = right_rotate(root, w)
                    w = x.parent.right
                w.color = x.parent.color
                x.parent.color = BLACK
                if w.right:
                    w.right.color = BLACK
                root = left_rotate(root, x.parent)
                x = root
        else:
            w = x.parent.left
            if w.color == RED:
                w.color = BLACK
                x.parent.color = RED
                root = right_rotate(root, x.parent)
                w = x.parent.left
            if (w.right is None or w.right.color == BLACK) and                (w.left is None or w.left.color == BLACK):
                w.color = RED
                x = x.parent
            else:
                if w.left is None or w.left.color == BLACK:
                    if w.right:
                        w.right.color = BLACK
                    w.color = RED
                    root = left_rotate(root, w)
                    w = x.parent.left
                w.color = x.parent.color
                x.parent.color = BLACK
                if w.left:
                    w.left.color = BLACK
                root = right_rotate(root, x.parent)
                x = root
    if x:
        x.color = BLACK
    return root`,javascript:`const RED = true, BLACK = false;

class Node {
  constructor(key) {
    this.key = key;
    this.color = RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

function minimum(x) {
  while (x.left) x = x.left;
  return x;
}

function transplant(root, u, v) {
  if (!u.parent) root = v;
  else if (u === u.parent.left) u.parent.left = v;
  else u.parent.right = v;
  if (v) v.parent = u.parent;
  return root;
}

function fixDelete(root, x) {
  while (x && x !== root && x.color === BLACK) {
    if (x === x.parent.left) {
      let w = x.parent.right;
      if (w.color === RED) {
        w.color = BLACK;
        x.parent.color = RED;
        root = leftRotate(root, x.parent);
        w = x.parent.right;
      }
      if ((!w.left || w.left.color === BLACK) &&
          (!w.right || w.right.color === BLACK)) {
        w.color = RED;
        x = x.parent;
      } else {
        if (!w.right || w.right.color === BLACK) {
          if (w.left) w.left.color = BLACK;
          w.color = RED;
          root = rightRotate(root, w);
          w = x.parent.right;
        }
        w.color = x.parent.color;
        x.parent.color = BLACK;
        if (w.right) w.right.color = BLACK;
        root = leftRotate(root, x.parent);
        x = root;
      }
    } else {
      let w = x.parent.left;
      if (w.color === RED) {
        w.color = BLACK;
        x.parent.color = RED;
        root = rightRotate(root, x.parent);
        w = x.parent.left;
      }
      if ((!w.right || w.right.color === BLACK) &&
          (!w.left || w.left.color === BLACK)) {
        w.color = RED;
        x = x.parent;
      } else {
        if (!w.left || w.left.color === BLACK) {
          if (w.right) w.right.color = BLACK;
          w.color = RED;
          root = leftRotate(root, w);
          w = x.parent.left;
        }
        w.color = x.parent.color;
        x.parent.color = BLACK;
        if (w.left) w.left.color = BLACK;
        root = rightRotate(root, x.parent);
        x = root;
      }
    }
  }
  if (x) x.color = BLACK;
  return root;
}`}},rx={bfsdfs:{title:"BFS & DFS Graph Traversal",timeComplexity:"O(V + E)",spaceComplexity:"O(V)",explanationText:"BFS explores level by level using a queue, guaranteeing shortest paths in unweighted graphs. DFS dives deep using a stack (or recursion). Both visit every vertex and edge exactly once, giving O(V + E).",cpp:`#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void bfs(const vector<vector<int>>& adj, int start) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}

void dfs(const vector<vector<int>>& adj, vector<bool>& visited, int u) {
    visited[u] = true;
    cout << u << " ";
    for (int v : adj[u]) {
        if (!visited[v]) dfs(adj, visited, v);
    }
}`,java:`import java.util.*;

public class GraphTraversal {
    static void bfs(List<List<Integer>> adj, int start) {
        boolean[] visited = new boolean[adj.size()];
        Queue<Integer> q = new LinkedList<>();
        visited[start] = true;
        q.add(start);
        while (!q.isEmpty()) {
            int u = q.poll();
            System.out.print(u + " ");
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    q.add(v);
                }
            }
        }
    }

    static void dfs(List<List<Integer>> adj, boolean[] visited, int u) {
        visited[u] = true;
        System.out.print(u + " ");
        for (int v : adj.get(u)) {
            if (!visited[v]) dfs(adj, visited, v);
        }
    }
}`,python:`from collections import deque

def bfs(adj, start):
    visited = [False] * len(adj)
    queue = deque([start])
    visited[start] = True
    while queue:
        u = queue.popleft()
        print(u, end=" ")
        for v in adj[u]:
            if not visited[v]:
                visited[v] = True
                queue.append(v)

def dfs(adj, visited, u):
    visited[u] = True
    print(u, end=" ")
    for v in adj[u]:
        if not visited[v]:
            dfs(adj, visited, v)`,javascript:`function bfs(adj, start) {
  const visited = new Array(adj.length).fill(false);
  const queue = [start];
  visited[start] = true;
  while (queue.length) {
    const u = queue.shift();
    console.log(u);
    for (const v of adj[u]) {
      if (!visited[v]) {
        visited[v] = true;
        queue.push(v);
      }
    }
  }
}

function dfs(adj, visited, u) {
  visited[u] = true;
  console.log(u);
  for (const v of adj[u]) {
    if (!visited[v]) dfs(adj, visited, v);
  }
}`},dijkstra:{title:"Dijkstra's Shortest Path",timeComplexity:"O((V + E) log V)",spaceComplexity:"O(V + E)",explanationText:"Dijkstra greedily extracts the unvisited vertex with the smallest tentative distance and relaxes its edges using a min-heap. The greedy choice is valid only for non-negative edge weights, giving O((V+E) log V).",cpp:`#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

typedef pair<int, int> PII;

vector<int> dijkstra(int src, const vector<vector<PII>>& adj) {
    int n = adj.size();
    vector<int> dist(n, INT_MAX);
    dist[src] = 0;

    priority_queue<PII, vector<PII>, greater<PII>> pq;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;

        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,java:`import java.util.*;

public class Dijkstra {
    public static int[] dijkstra(int src, List<List<int[]>> adj) {
        int n = adj.size();
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.add(new int[]{0, src});

        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int d = top[0], u = top[1];
            if (d > dist[u]) continue;

            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.add(new int[]{dist[v], v});
                }
            }
        }
        return dist;
    }
}`,python:`import heapq

def dijkstra(src, adj):
    n = len(adj)
    dist = [float("inf")] * n
    dist[src] = 0
    pq = [(0, src)]

    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,javascript:`function dijkstra(src, adj) {
  const n = adj.length;
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;

  const pq = [[0, src]];
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > dist[u]) continue;

    for (const [v, w] of adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
}`},bellmanford:{title:"Bellman-Ford Shortest Path",timeComplexity:"O(V × E)",spaceComplexity:"O(V)",explanationText:"Bellman-Ford relaxes every edge V−1 times. Since any simple shortest path uses at most V−1 edges, this guarantees correctness even with negative weights — and a final relaxation pass detects negative cycles.",cpp:`#include <iostream>
#include <vector>
#include <climits>
using namespace std;

struct Edge { int u, v, w; };

vector<int> bellmanFord(int src, int V, const vector<Edge>& edges) {
    vector<int> dist(V, INT_MAX);
    dist[src] = 0;

    for (int i = 0; i < V - 1; i++) {
        bool updated = false;
        for (const Edge& e : edges) {
            if (dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
                updated = true;
            }
        }
        if (!updated) break;
    }

    for (const Edge& e : edges) {
        if (dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v])
            cout << "Negative weight cycle detected!" << endl;
    }
    return dist;
}`,java:`import java.util.*;

public class BellmanFord {
    static class Edge { int u, v, w; Edge(int a, int b, int c) { u = a; v = b; w = c; } }

    static int[] bellmanFord(int src, int V, List<Edge> edges) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        for (int i = 0; i < V - 1; i++) {
            boolean updated = false;
            for (Edge e : edges) {
                if (dist[e.u] != Integer.MAX_VALUE && dist[e.u] + e.w < dist[e.v]) {
                    dist[e.v] = dist[e.u] + e.w;
                    updated = true;
                }
            }
            if (!updated) break;
        }

        for (Edge e : edges) {
            if (dist[e.u] != Integer.MAX_VALUE && dist[e.u] + e.w < dist[e.v])
                System.out.println("Negative weight cycle detected!");
        }
        return dist;
    }
}`,python:`def bellman_ford(src, V, edges):
    dist = [float("inf")] * V
    dist[src] = 0

    for _ in range(V - 1):
        updated = False
        for u, v, w in edges:
            if dist[u] != float("inf") and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                updated = True
        if not updated:
            break

    for u, v, w in edges:
        if dist[u] != float("inf") and dist[u] + w < dist[v]:
            print("Negative weight cycle detected!")
    return dist`,javascript:`function bellmanFord(src, V, edges) {
  const dist = new Array(V).fill(Infinity);
  dist[src] = 0;

  for (let i = 0; i < V - 1; i++) {
    let updated = false;
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        updated = true;
      }
    }
    if (!updated) break;
  }

  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      console.log('Negative weight cycle detected!');
    }
  }
  return dist;
}`},mst:{title:"Kruskal's MST Algorithm",timeComplexity:"O(E log E)",spaceComplexity:"O(V + E)",explanationText:"Kruskal's sorts all edges by weight and greedily adds an edge only if it doesn't form a cycle, tracked with Disjoint Set Union. Sorting dominates, giving O(E log E). Works best on sparse graphs.",cpp:`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge { int u, v, w; };

class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) {
        parent.resize(n);
        rank.assign(n, 0);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (rank[a] < rank[b]) swap(a, b);
        parent[b] = a;
        if (rank[a] == rank[b]) rank[a]++;
        return true;
    }
};

long long kruskal(int V, vector<Edge> edges) {
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
        return a.w < b.w;
    });
    DSU dsu(V);
    long long total = 0;
    for (const Edge& e : edges) {
        if (dsu.unite(e.u, e.v)) total += e.w;
    }
    return total;
}`,java:`import java.util.*;

public class Kruskal {
    static class Edge implements Comparable<Edge> {
        int u, v, w;
        Edge(int a, int b, int c) { u = a; v = b; w = c; }
        public int compareTo(Edge o) { return this.w - o.w; }
    }

    static class DSU {
        int[] parent, rank;
        DSU(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;
        }
        int find(int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        }
        boolean unite(int a, int b) {
            a = find(a); b = find(b);
            if (a == b) return false;
            if (rank[a] < rank[b]) { int t = a; a = b; b = t; }
            parent[b] = a;
            if (rank[a] == rank[b]) rank[a]++;
            return true;
        }
    }

    static long kruskal(int V, List<Edge> edges) {
        Collections.sort(edges);
        DSU dsu = new DSU(V);
        long total = 0;
        for (Edge e : edges) {
            if (dsu.unite(e.u, e.v)) total += e.w;
        }
        return total;
    }
}`,python:`class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def unite(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return False
        if self.rank[a] < self.rank[b]:
            a, b = b, a
        self.parent[b] = a
        if self.rank[a] == self.rank[b]:
            self.rank[a] += 1
        return True

def kruskal(V, edges):
    edges.sort(key=lambda e: e[2])
    dsu = DSU(V)
    total = 0
    for u, v, w in edges:
        if dsu.unite(u, v):
            total += w
    return total`,javascript:`class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  unite(a, b) {
    a = this.find(a); b = this.find(b);
    if (a === b) return false;
    if (this.rank[a] < this.rank[b]) [a, b] = [b, a];
    this.parent[b] = a;
    if (this.rank[a] === this.rank[b]) this.rank[a]++;
    return true;
  }
}

function kruskal(V, edges) {
  edges.sort((a, b) => a[2] - b[2]);
  const dsu = new DSU(V);
  let total = 0;
  for (const [u, v, w] of edges) {
    if (dsu.unite(u, v)) total += w;
  }
  return total;
}`},tarjan:{title:"Tarjan's Strongly Connected Components",timeComplexity:"O(V + E)",spaceComplexity:"O(V)",explanationText:"Tarjan’s SCC algorithm runs a single DFS while tracking discovery times and “low-link” values. When low[u] == disc[u], u roots a new SCC. Every vertex and edge is visited once, so the total is O(V + E).",cpp:`#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<vector<int>> sccs;
int timer = 0;

void tarjanDFS(int u, const vector<vector<int>>& adj,
               vector<int>& disc, vector<int>& low, vector<bool>& inStack, stack<int>& st) {
    disc[u] = low[u] = ++timer;
    st.push(u);
    inStack[u] = true;

    for (int v : adj[u]) {
        if (disc[v] == -1) {
            tarjanDFS(v, adj, disc, low, inStack, st);
            low[u] = min(low[u], low[v]);
        } else if (inStack[v]) {
            low[u] = min(low[u], disc[v]);
        }
    }

    if (low[u] == disc[u]) {
        vector<int> comp;
        while (true) {
            int v = st.top();
            st.pop();
            inStack[v] = false;
            comp.push_back(v);
            if (v == u) break;
        }
        sccs.push_back(comp);
    }
}

vector<vector<int>> tarjanSCC(int n, const vector<vector<int>>& adj) {
    vector<int> disc(n, -1), low(n, 0);
    vector<bool> inStack(n, false);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        if (disc[i] == -1) tarjanDFS(i, adj, disc, low, inStack, st);
    }
    return sccs;
}`,java:`import java.util.*;

public class TarjanSCC {
    static int timer = 0;
    static List<List<Integer>> sccs = new ArrayList<>();
    static Stack<Integer> stack = new Stack<>();

    static void dfs(int u, List<List<Integer>> adj, int[] disc, int[] low, boolean[] inStack) {
        disc[u] = low[u] = ++timer;
        stack.push(u);
        inStack[u] = true;

        for (int v : adj.get(u)) {
            if (disc[v] == -1) {
                dfs(v, adj, disc, low, inStack);
                low[u] = Math.min(low[u], low[v]);
            } else if (inStack[v]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }

        if (low[u] == disc[u]) {
            List<Integer> comp = new ArrayList<>();
            while (true) {
                int v = stack.pop();
                inStack[v] = false;
                comp.add(v);
                if (v == u) break;
            }
            sccs.add(comp);
        }
    }

    static List<List<Integer>> tarjanSCC(int n, List<List<Integer>> adj) {
        int[] disc = new int[n];
        Arrays.fill(disc, -1);
        int[] low = new int[n];
        boolean[] inStack = new boolean[n];
        for (int i = 0; i < n; i++) {
            if (disc[i] == -1) dfs(i, adj, disc, low, inStack);
        }
        return sccs;
    }
}`,python:`def tarjan_scc(n, adj):
    disc = [-1] * n
    low = [0] * n
    in_stack = [False] * n
    stack = []
    sccs = []
    timer = 0

    def dfs(u):
        nonlocal timer
        timer += 1
        disc[u] = low[u] = timer
        stack.append(u)
        in_stack[u] = True

        for v in adj[u]:
            if disc[v] == -1:
                dfs(v)
                low[u] = min(low[u], low[v])
            elif in_stack[v]:
                low[u] = min(low[u], disc[v])

        if low[u] == disc[u]:
            comp = []
            while True:
                v = stack.pop()
                in_stack[v] = False
                comp.append(v)
                if v == u:
                    break
            sccs.append(comp)

    for i in range(n):
        if disc[i] == -1:
            dfs(i)
    return sccs`,javascript:`function tarjanSCC(n, adj) {
  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(0);
  const inStack = new Array(n).fill(false);
  const stack = [];
  const sccs = [];
  let timer = 0;

  function dfs(u) {
    disc[u] = low[u] = ++timer;
    stack.push(u);
    inStack[u] = true;

    for (const v of adj[u]) {
      if (disc[v] === -1) {
        dfs(v);
        low[u] = Math.min(low[u], low[v]);
      } else if (inStack[v]) {
        low[u] = Math.min(low[u], disc[v]);
      }
    }

    if (low[u] === disc[u]) {
      const comp = [];
      let v;
      do {
        v = stack.pop();
        inStack[v] = false;
        comp.push(v);
      } while (v !== u);
      sccs.push(comp);
    }
  }

  for (let i = 0; i < n; i++) {
    if (disc[i] === -1) dfs(i);
  }
  return sccs;
}`},floydwarshall:{title:"Floyd-Warshall All-Pairs Shortest Path",timeComplexity:"O(V³)",spaceComplexity:"O(V²)",explanationText:"Floyd-Warshall incrementally allows vertex k as an intermediate hop for every pair (i, j). Three nested loops over V vertices make it O(V³), which is best for dense graphs and detecting negative cycles.",cpp:`#include <iostream>
#include <vector>
using namespace std;

const int INF = 1e9;

vector<vector<int>> floydWarshall(vector<vector<int>> dist, int V) {
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }

    for (int i = 0; i < V; i++) {
        if (dist[i][i] < 0)
            cout << "Negative weight cycle detected!" << endl;
    }
    return dist;
}`,java:`import java.util.*;

public class FloydWarshall {
    static final int INF = 1_000_000_000;

    static int[][] floydWarshall(int[][] dist, int V) {
        for (int k = 0; k < V; k++) {
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    if (dist[i][k] != INF && dist[k][j] != INF)
                        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }

        for (int i = 0; i < V; i++) {
            if (dist[i][i] < 0)
                System.out.println("Negative weight cycle detected!");
        }
        return dist;
    }
}`,python:`def floyd_warshall(dist, V):
    INF = float("inf")
    for k in range(V):
        for i in range(V):
            for j in range(V):
                if dist[i][k] != INF and dist[k][j] != INF:
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

    for i in range(V):
        if dist[i][i] < 0:
            print("Negative weight cycle detected!")
    return dist`,javascript:`function floydWarshall(dist, V) {
  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }
  for (let i = 0; i < V; i++) {
    if (dist[i][i] < 0) console.log('Negative weight cycle detected!');
  }
  return dist;
}`},dsu:{title:"Disjoint Set Union (Union-Find)",timeComplexity:"O(α(N)) ≈ O(1) amortized",spaceComplexity:"O(N)",explanationText:"Union-Find tracks connected components. Path compression flattens trees during find, and union by rank keeps trees shallow. Together they yield the inverse-Ackermann O(α(N)) amortized bound — effectively constant.",cpp:`#include <vector>
using namespace std;

class DSU {
    vector<int> parent, rank;

public:
    DSU(int n) {
        parent.resize(n);
        rank.assign(n, 0);
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);  // path compression
        return parent[x];
    }

    bool unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return false;

        if (rank[a] < rank[b]) swap(a, b);  // union by rank
        parent[b] = a;
        if (rank[a] == rank[b]) rank[a]++;
        return true;
    }

    bool connected(int a, int b) { return find(a) == find(b); }
};`,java:`public class DSU {
    int[] parent, rank;

    public DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    boolean unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return false;
        if (rank[a] < rank[b]) { int t = a; a = b; b = t; }
        parent[b] = a;
        if (rank[a] == rank[b]) rank[a]++;
        return true;
    }

    boolean connected(int a, int b) { return find(a) == find(b); }
}`,python:`class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def unite(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return False
        if self.rank[a] < self.rank[b]:
            a, b = b, a
        self.parent[b] = a
        if self.rank[a] == self.rank[b]:
            self.rank[a] += 1
        return True

    def connected(self, a, b):
        return self.find(a) == self.find(b)`,javascript:`class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  unite(a, b) {
    a = this.find(a);
    b = this.find(b);
    if (a === b) return false;
    if (this.rank[a] < this.rank[b]) [a, b] = [b, a];
    this.parent[b] = a;
    if (this.rank[a] === this.rank[b]) this.rank[a]++;
    return true;
  }

  connected(a, b) { return this.find(a) === this.find(b); }
}`},astar:{title:"A* Search Algorithm",timeComplexity:"O(E log V) typical",spaceComplexity:"O(V)",explanationText:"A* extends Dijkstra with a heuristic h(n) that estimates the cost to the goal. Priority is f(n) = g(n) + h(n). With an admissible (never overestimating) heuristic, A* is guaranteed optimal and usually much faster than plain Dijkstra.",cpp:`#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <climits>
using namespace std;

typedef pair<int, int> PII;

int astar(int start, int goal,
          const vector<vector<PII>>& adj,
          unordered_map<int, int> heuristic) {
    priority_queue<PII, vector<PII>, greater<PII>> open;
    unordered_map<int, int> gScore;
    gScore[start] = 0;
    open.push({heuristic[start], start});

    while (!open.empty()) {
        auto [f, u] = open.top();
        open.pop();
        if (u == goal) return gScore[u];

        for (auto [v, w] : adj[u]) {
            int tentative = gScore[u] + w;
            if (gScore.find(v) == gScore.end() || tentative < gScore[v]) {
                gScore[v] = tentative;
                open.push({tentative + heuristic[v], v});
            }
        }
    }
    return -1;  // goal unreachable
}`,java:`import java.util.*;

public class AStar {
    static int astar(int start, int goal,
                     List<List<int[]>> adj, Map<Integer, Integer> heuristic) {
        PriorityQueue<int[]> open = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        Map<Integer, Integer> gScore = new HashMap<>();
        gScore.put(start, 0);
        open.add(new int[]{heuristic.get(start), start});

        while (!open.isEmpty()) {
            int[] top = open.poll();
            int f = top[0], u = top[1];
            if (u == goal) return gScore.get(u);

            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                int tentative = gScore.get(u) + w;
                if (!gScore.containsKey(v) || tentative < gScore.get(v)) {
                    gScore.put(v, tentative);
                    open.add(new int[]{tentative + heuristic.getOrDefault(v, 0), v});
                }
            }
        }
        return -1;
    }
}`,python:`import heapq

def astar(start, goal, adj, heuristic):
    g_score = {start: 0}
    open_set = [(heuristic(start), start)]

    while open_set:
        f, u = heapq.heappop(open_set)
        if u == goal:
            return g_score[u]

        for v, w in adj[u]:
            tentative = g_score[u] + w
            if v not in g_score or tentative < g_score[v]:
                g_score[v] = tentative
                heapq.heappush(open_set, (tentative + heuristic(v), v))
    return -1`,javascript:`function astar(start, goal, adj, heuristic) {
  const gScore = new Map([[start, 0]]);
  const open = [[heuristic(start), start]];

  while (open.length) {
    open.sort((a, b) => a[0] - b[0]);
    const [f, u] = open.shift();
    if (u === goal) return gScore.get(u);

    for (const [v, w] of adj[u]) {
      const tentative = gScore.get(u) + w;
      if (!gScore.has(v) || tentative < gScore.get(v)) {
        gScore.set(v, tentative);
        open.push([tentative + heuristic(v), v]);
      }
    }
  }
  return -1;
}`},hld:{title:"Heavy-Light Decomposition",timeComplexity:"O(log² N) per path query",spaceComplexity:"O(N)",explanationText:"HLD splits a tree into “heavy” chains, mapping each chain to a contiguous segment in a segment tree or Fenwick tree. Any root-to-node path decomposes into O(log N) chains, so queries and updates run in O(log² N).",cpp:`#include <iostream>
#include <vector>
using namespace std;

struct HLD {
    vector<vector<int>> adj;
    vector<int> parent, depth, heavy, head, pos, size;
    vector<int> tree;  // segment tree over positions
    int curPos;

    HLD(int n) : adj(n), parent(n, -1), depth(n), heavy(n, -1),
                 head(n), pos(n), size(n), tree(4 * n, 0), curPos(0) {}

    int dfsSize(int u) {
        int sz = 1, maxSub = 0;
        for (int v : adj[u]) {
            if (v == parent[u]) continue;
            parent[v] = u;
            depth[v] = depth[u] + 1;
            int sub = dfsSize(v);
            if (sub > maxSub) { maxSub = sub; heavy[u] = v; }
            sz += sub;
        }
        return size[u] = sz;
    }

    void decompose(int u, int h) {
        head[u] = h;
        pos[u] = curPos++;
        if (heavy[u] != -1) decompose(heavy[u], h);
        for (int v : adj[u]) {
            if (v != parent[u] && v != heavy[u]) decompose(v, v);
        }
    }

    void updateTree(int node, int l, int r, int idx, int val) {
        if (l == r) { tree[node] = val; return; }
        int mid = (l + r) / 2;
        if (idx <= mid) updateTree(2 * node, l, mid, idx, val);
        else updateTree(2 * node + 1, mid + 1, r, idx, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    int queryTree(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        return queryTree(2 * node, l, mid, ql, qr) +
               queryTree(2 * node + 1, mid + 1, r, ql, qr);
    }

    int pathQuery(int u, int v) {
        int res = 0;
        while (head[u] != head[v]) {
            if (depth[head[u]] < depth[head[v]]) swap(u, v);
            res += queryTree(1, 0, curPos - 1, pos[head[u]], pos[u]);
            u = parent[head[u]];
        }
        if (depth[u] > depth[v]) swap(u, v);
        res += queryTree(1, 0, curPos - 1, pos[u], pos[v]);
        return res;
    }
};`,java:`import java.util.*;

public class HLD {
    List<List<Integer>> adj;
    int[] parent, depth, heavy, head, pos, size, tree;
    int curPos;

    HLD(int n) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        parent = new int[n]; depth = new int[n]; heavy = new int[n];
        head = new int[n]; pos = new int[n]; size = new int[n];
        tree = new int[4 * n];
        Arrays.fill(parent, -1);
        Arrays.fill(heavy, -1);
        curPos = 0;
    }

    int dfsSize(int u) {
        int sz = 1, maxSub = 0;
        for (int v : adj.get(u)) {
            if (v == parent[u]) continue;
            parent[v] = u;
            depth[v] = depth[u] + 1;
            int sub = dfsSize(v);
            if (sub > maxSub) { maxSub = sub; heavy[u] = v; }
            sz += sub;
        }
        size[u] = sz;
        return sz;
    }

    void decompose(int u, int h) {
        head[u] = h;
        pos[u] = curPos++;
        if (heavy[u] != -1) decompose(heavy[u], h);
        for (int v : adj.get(u)) {
            if (v != parent[u] && v != heavy[u]) decompose(v, v);
        }
    }
}`,python:`class HLD:
    def __init__(self, n):
        self.n = n
        self.adj = [[] for _ in range(n)]
        self.parent = [-1] * n
        self.depth = [0] * n
        self.heavy = [-1] * n
        self.head = [0] * n
        self.pos = [0] * n
        self.size = [0] * n
        self.cur_pos = 0

    def dfs_size(self, u):
        sz = 1
        max_sub = 0
        for v in self.adj[u]:
            if v == self.parent[u]:
                continue
            self.parent[v] = u
            self.depth[v] = self.depth[u] + 1
            sub = self.dfs_size(v)
            if sub > max_sub:
                max_sub = sub
                self.heavy[u] = v
            sz += sub
        self.size[u] = sz
        return sz

    def decompose(self, u, h):
        self.head[u] = h
        self.pos[u] = self.cur_pos
        self.cur_pos += 1
        if self.heavy[u] != -1:
            self.decompose(self.heavy[u], h)
        for v in self.adj[u]:
            if v != self.parent[u] and v != self.heavy[u]:
                self.decompose(v, v)`,javascript:`class HLD {
  constructor(n) {
    this.n = n;
    this.adj = Array.from({ length: n }, () => []);
    this.parent = new Array(n).fill(-1);
    this.depth = new Array(n).fill(0);
    this.heavy = new Array(n).fill(-1);
    this.head = new Array(n).fill(0);
    this.pos = new Array(n).fill(0);
    this.size = new Array(n).fill(0);
    this.curPos = 0;
  }

  dfsSize(u) {
    let sz = 1, maxSub = 0;
    for (const v of this.adj[u]) {
      if (v === this.parent[u]) continue;
      this.parent[v] = u;
      this.depth[v] = this.depth[u] + 1;
      const sub = this.dfsSize(v);
      if (sub > maxSub) { maxSub = sub; this.heavy[u] = v; }
      sz += sub;
    }
    this.size[u] = sz;
    return sz;
  }

  decompose(u, h) {
    this.head[u] = h;
    this.pos[u] = this.curPos++;
    if (this.heavy[u] !== -1) this.decompose(this.heavy[u], h);
    for (const v of this.adj[u]) {
      if (v !== this.parent[u] && v !== this.heavy[u]) this.decompose(v, v);
    }
  }
}`},maxflow:{title:"Dinic's Max Flow Algorithm",timeComplexity:"O(V²E) worst • O(E√V) unit capacities",spaceComplexity:"O(V + E)",explanationText:"Dinic’s algorithm repeatedly builds a level graph with BFS and sends blocking flow with DFS. Each blocking flow phase saturates at least one shortest path, so at most V phases run — giving O(V²E) worst case.",cpp:`#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

struct Edge { int to, cap, flow; };

class Dinic {
    vector<vector<int>> g;
    vector<Edge> edges;
    vector<int> level, ptr;

public:
    Dinic(int n) : g(n), level(n), ptr(n) {}

    void addEdge(int u, int v, int cap) {
        g[u].push_back(edges.size());
        edges.push_back({v, cap, 0});
        g[v].push_back(edges.size());
        edges.push_back({u, 0, 0});
    }

    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        queue<int> q;
        level[s] = 0;
        q.push(s);
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            for (int id : g[u]) {
                Edge& e = edges[id];
                if (e.cap - e.flow > 0 && level[e.to] == -1) {
                    level[e.to] = level[u] + 1;
                    q.push(e.to);
                }
            }
        }
        return level[t] != -1;
    }

    int dfs(int u, int t, int pushed) {
        if (pushed == 0 || u == t) return pushed;
        for (int& cid = ptr[u]; cid < g[u].size(); cid++) {
            int id = g[u][cid];
            Edge& e = edges[id];
            if (level[e.to] != level[u] + 1 || e.cap - e.flow == 0) continue;
            int tr = dfs(e.to, t, min(pushed, e.cap - e.flow));
            if (tr == 0) continue;
            e.flow += tr;
            edges[id ^ 1].flow -= tr;
            return tr;
        }
        return 0;
    }

    int maxFlow(int s, int t) {
        int flow = 0;
        while (bfs(s, t)) {
            fill(ptr.begin(), ptr.end(), 0);
            while (int pushed = dfs(s, t, INT_MAX)) flow += pushed;
        }
        return flow;
    }
};`,java:`import java.util.*;

public class Dinic {
    static class Edge { int to, cap, flow; Edge(int t, int c) { to = t; cap = c; } }

    List<Integer>[] g;
    List<Edge> edges = new ArrayList<>();
    int[] level, ptr;

    @SuppressWarnings("unchecked")
    Dinic(int n) {
        g = new List[n];
        for (int i = 0; i < n; i++) g[i] = new ArrayList<>();
        level = new int[n];
        ptr = new int[n];
    }

    void addEdge(int u, int v, int cap) {
        g[u].add(edges.size());
        edges.add(new Edge(v, cap));
        g[v].add(edges.size());
        edges.add(new Edge(u, 0));
    }

    boolean bfs(int s, int t) {
        Arrays.fill(level, -1);
        Queue<Integer> q = new LinkedList<>();
        level[s] = 0;
        q.add(s);
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int id : g[u]) {
                Edge e = edges.get(id);
                if (e.cap - e.flow > 0 && level[e.to] == -1) {
                    level[e.to] = level[u] + 1;
                    q.add(e.to);
                }
            }
        }
        return level[t] != -1;
    }

    int dfs(int u, int t, int pushed) {
        if (pushed == 0 || u == t) return pushed;
        for (; ptr[u] < g[u].size(); ptr[u]++) {
            Edge e = edges.get(g[u].get(ptr[u]));
            if (level[e.to] != level[u] + 1 || e.cap - e.flow == 0) continue;
            int tr = dfs(e.to, t, Math.min(pushed, e.cap - e.flow));
            if (tr == 0) continue;
            e.flow += tr;
            edges.get(g[u].get(ptr[u]) ^ 1).flow -= tr;
            return tr;
        }
        return 0;
    }

    int maxFlow(int s, int t) {
        int flow = 0;
        while (bfs(s, t)) {
            Arrays.fill(ptr, 0);
            int pushed;
            while ((pushed = dfs(s, t, Integer.MAX_VALUE)) > 0) flow += pushed;
        }
        return flow;
    }
}`,python:`from collections import deque

class Dinic:
    def __init__(self, n):
        self.n = n
        self.g = [[] for _ in range(n)]
        self.edges = []

    def add_edge(self, u, v, cap):
        self.g[u].append(len(self.edges))
        self.edges.append([v, cap, 0])
        self.g[v].append(len(self.edges))
        self.edges.append([u, 0, 0])

    def bfs(self, s, t):
        self.level = [-1] * self.n
        self.level[s] = 0
        q = deque([s])
        while q:
            u = q.popleft()
            for eid in self.g[u]:
                v, cap, flow = self.edges[eid]
                if cap - flow > 0 and self.level[v] == -1:
                    self.level[v] = self.level[u] + 1
                    q.append(v)
        return self.level[t] != -1

    def dfs(self, u, t, pushed):
        if pushed == 0 or u == t:
            return pushed
        while self.ptr[u] < len(self.g[u]):
            eid = self.g[u][self.ptr[u]]
            v, cap, flow = self.edges[eid]
            if self.level[v] == self.level[u] + 1 and cap - flow > 0:
                tr = self.dfs(v, t, min(pushed, cap - flow))
                if tr > 0:
                    self.edges[eid][2] += tr
                    self.edges[eid ^ 1][2] -= tr
                    return tr
            self.ptr[u] += 1
        return 0

    def max_flow(self, s, t):
        flow = 0
        while self.bfs(s, t):
            self.ptr = [0] * self.n
            while True:
                pushed = self.dfs(s, t, float("inf"))
                if pushed == 0:
                    break
                flow += pushed
        return flow`,javascript:`class Dinic {
  constructor(n) {
    this.n = n;
    this.g = Array.from({ length: n }, () => []);
    this.edges = [];
  }

  addEdge(u, v, cap) {
    this.g[u].push(this.edges.length);
    this.edges.push([v, cap, 0]);
    this.g[v].push(this.edges.length);
    this.edges.push([u, 0, 0]);
  }

  bfs(s, t) {
    this.level = new Array(this.n).fill(-1);
    this.level[s] = 0;
    const q = [s];
    while (q.length) {
      const u = q.shift();
      for (const eid of this.g[u]) {
        const [v, cap, flow] = this.edges[eid];
        if (cap - flow > 0 && this.level[v] === -1) {
          this.level[v] = this.level[u] + 1;
          q.push(v);
        }
      }
    }
    return this.level[t] !== -1;
  }

  dfs(u, t, pushed) {
    if (pushed === 0 || u === t) return pushed;
    while (this.ptr[u] < this.g[u].length) {
      const eid = this.g[u][this.ptr[u]];
      const [v, cap, flow] = this.edges[eid];
      if (this.level[v] === this.level[u] + 1 && cap - flow > 0) {
        const tr = this.dfs(v, t, Math.min(pushed, cap - flow));
        if (tr > 0) {
          this.edges[eid][2] += tr;
          this.edges[eid ^ 1][2] -= tr;
          return tr;
        }
      }
      this.ptr[u]++;
    }
    return 0;
  }

  maxFlow(s, t) {
    let flow = 0;
    while (this.bfs(s, t)) {
      this.ptr = new Array(this.n).fill(0);
      let pushed;
      while ((pushed = this.dfs(s, t, Infinity)) > 0) flow += pushed;
    }
    return flow;
  }
}`}},ix={knapsack:{title:"0/1 Knapsack (Dynamic Programming)",timeComplexity:"O(N × W)",spaceComplexity:"O(N × W)",explanationText:"dp[i][w] = max profit using a subset of the first i items under weight capacity w. Each cell compares excluding the item (dp[i-1][w]) with including it (value + dp[i-1][w-wt]). The 2D table makes the O(N×W) complexity explicit.",cpp:`#include <iostream>
#include <vector>
using namespace std;

int knapsack(int W, const vector<int>& wt, const vector<int>& val) {
    int n = wt.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = max(dp[i - 1][w],
                               val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}`,java:`public class Knapsack {
    static int knapsack(int W, int[] wt, int[] val) {
        int n = wt.length;
        int[][] dp = new int[n + 1][W + 1];

        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= W; w++) {
                if (wt[i - 1] <= w) {
                    dp[i][w] = Math.max(dp[i - 1][w],
                                        val[i - 1] + dp[i - 1][w - wt[i - 1]]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        return dp[n][W];
    }
}`,python:`def knapsack(W, wt, val):
    n = len(wt)
    dp = [[0] * (W + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(W + 1):
            if wt[i - 1] <= w:
                dp[i][w] = max(dp[i - 1][w],
                               val[i - 1] + dp[i - 1][w - wt[i - 1]])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][W]`,javascript:`function knapsack(W, wt, val) {
  const n = wt.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      if (wt[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          val[i - 1] + dp[i - 1][w - wt[i - 1]]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][W];
}`},lcs:{title:"Longest Common Subsequence (LCS)",timeComplexity:"O(N × M)",spaceComplexity:"O(N × M)",explanationText:"dp[i][j] = length of LCS of the first i chars of string A and first j chars of string B. If characters match, extend by 1 (dp[i-1][j-1] + 1); otherwise take the max of skipping either character. O(N×M) for N and M lengths.",cpp:`#include <iostream>
#include <vector>
#include <string>
using namespace std;

int lcs(const string& a, const string& b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[n][m];
}

string buildLCS(const string& a, const string& b, const vector<vector<int>>& dp) {
    string result;
    int i = a.size(), j = b.size();
    while (i > 0 && j > 0) {
        if (a[i - 1] == b[j - 1]) {
            result = a[i - 1] + result;
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    return result;
}`,java:`public class LCS {
    static int lcs(String a, String b) {
        int n = a.length(), m = b.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[n][m];
    }
}`,python:`def lcs(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]`,javascript:`function lcs(a, b) {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[n][m];
}`},matrixchain:{title:"Matrix Chain Multiplication",timeComplexity:"O(N³)",spaceComplexity:"O(N²)",explanationText:"dp[i][j] = minimum scalar multiplications to multiply matrices i..j. We try every split k between i and j: cost = dp[i][k] + dp[k+1][j] + dims[i-1]·dims[k]·dims[j]. O(N³) time for N matrices.",cpp:`#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int matrixChainOrder(const vector<int>& dims) {
    int n = dims.size() - 1;  // number of matrices
    vector<vector<int>> dp(n, vector<int>(n, 0));

    for (int len = 2; len <= n; len++) {
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k + 1][j]
                         + dims[i] * dims[k + 1] * dims[j + 1];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[0][n - 1];
}`,java:`public class MatrixChain {
    static int matrixChainOrder(int[] dims) {
        int n = dims.length - 1;
        int[][] dp = new int[n][n];

        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k + 1][j]
                             + dims[i] * dims[k + 1] * dims[j + 1];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        return dp[0][n - 1];
    }
}`,python:`def matrix_chain_order(dims):
    n = len(dims) - 1
    dp = [[0] * n for _ in range(n)]

    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float("inf")
            for k in range(i, j):
                cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1]
                dp[i][j] = min(dp[i][j], cost)
    return dp[0][n - 1]`,javascript:`function matrixChainOrder(dims) {
  const n = dims.length - 1;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }
  return dp[0][n - 1];
}`},bitmaskdp:{title:"Bitmask DP (Travelling Salesman)",timeComplexity:"O(2ᴺ × N²)",spaceComplexity:"O(2ᴺ × N)",explanationText:"dp[mask][i] = minimum cost to visit the set of cities in mask, ending at city i. Each transition visits a new city j ≈ mask in O(1), over 2ᴺ masks and N×N pairs, giving O(2ᴺN²) — feasible only for small N.",cpp:`#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int tsp(const vector<vector<int>>& dist) {
    int n = dist.size();
    int full = (1 << n) - 1;
    vector<vector<int>> dp(1 << n, vector<int>(n, INT_MAX));
    dp[1][0] = 0;  // start at city 0

    for (int mask = 1; mask <= full; mask++) {
        for (int i = 0; i < n; i++) {
            if (!(mask & (1 << i)) || dp[mask][i] == INT_MAX) continue;
            for (int j = 0; j < n; j++) {
                if (mask & (1 << j)) continue;
                dp[mask | (1 << j)][j] = min(dp[mask | (1 << j)][j],
                                             dp[mask][i] + dist[i][j]);
            }
        }
    }

    int ans = INT_MAX;
    for (int i = 1; i < n; i++) {
        if (dp[full][i] != INT_MAX)
            ans = min(ans, dp[full][i] + dist[i][0]);
    }
    return ans;
}`,java:`import java.util.*;

public class TSP {
    static int tsp(int[][] dist) {
        int n = dist.length;
        int full = (1 << n) - 1;
        int[][] dp = new int[1 << n][n];
        for (int[] row : dp) Arrays.fill(row, Integer.MAX_VALUE);
        dp[1][0] = 0;

        for (int mask = 1; mask <= full; mask++) {
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) == 0 || dp[mask][i] == Integer.MAX_VALUE) continue;
                for (int j = 0; j < n; j++) {
                    if ((mask & (1 << j)) != 0) continue;
                    dp[mask | (1 << j)][j] = Math.min(
                        dp[mask | (1 << j)][j], dp[mask][i] + dist[i][j]);
                }
            }
        }

        int ans = Integer.MAX_VALUE;
        for (int i = 1; i < n; i++) {
            if (dp[full][i] != Integer.MAX_VALUE)
                ans = Math.min(ans, dp[full][i] + dist[i][0]);
        }
        return ans;
    }
}`,python:`def tsp(dist):
    n = len(dist)
    full = (1 << n) - 1
    dp = [[float("inf")] * n for _ in range(1 << n)]
    dp[1][0] = 0

    for mask in range(1, full + 1):
        for i in range(n):
            if not (mask & (1 << i)) or dp[mask][i] == float("inf"):
                continue
            for j in range(n):
                if mask & (1 << j):
                    continue
                dp[mask | (1 << j)][j] = min(
                    dp[mask | (1 << j)][j], dp[mask][i] + dist[i][j])

    ans = float("inf")
    for i in range(1, n):
        if dp[full][i] != float("inf"):
            ans = min(ans, dp[full][i] + dist[i][0])
    return ans`,javascript:`function tsp(dist) {
  const n = dist.length;
  const full = (1 << n) - 1;
  const dp = Array.from({ length: 1 << n }, () => new Array(n).fill(Infinity));
  dp[1][0] = 0;

  for (let mask = 1; mask <= full; mask++) {
    for (let i = 0; i < n; i++) {
      if (!(mask & (1 << i)) || dp[mask][i] === Infinity) continue;
      for (let j = 0; j < n; j++) {
        if (mask & (1 << j)) continue;
        dp[mask | (1 << j)][j] = Math.min(
          dp[mask | (1 << j)][j],
          dp[mask][i] + dist[i][j]
        );
      }
    }
  }

  let ans = Infinity;
  for (let i = 1; i < n; i++) {
    if (dp[full][i] !== Infinity) ans = Math.min(ans, dp[full][i] + dist[i][0]);
  }
  return ans;
}`}},ox={trie:{title:"Trie (Prefix Tree)",timeComplexity:"insert O(L) • search O(L)",spaceComplexity:"O(N × L × Alphabet)",explanationText:"A trie stores strings as shared character prefixes. Each node holds a map of children plus an end-of-word flag. Insert and search only depend on word length L, making it O(L) regardless of how many words are stored.",cpp:`#include <unordered_map>
using namespace std;

class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isEnd = false;
};

class Trie {
    TrieNode* root;

public:
    Trie() : root(new TrieNode()) {}

    void insert(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c])
                node->children[c] = new TrieNode();
            node = node->children[c];
        }
        node->isEnd = true;
    }

    bool search(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) return false;
            node = node->children[c];
        }
        return node->isEnd;
    }

    bool startsWith(const string& prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (!node->children.count(c)) return false;
            node = node->children[c];
        }
        return true;
    }
};`,java:`import java.util.*;

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEnd = false;
}

public class Trie {
    private TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node = node.children.computeIfAbsent(c, k -> new TrieNode());
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (!node.children.containsKey(c)) return false;
            node = node.children.get(c);
        }
        return node.isEnd;
    }

    public boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            if (!node.children.containsKey(c)) return false;
            node = node.children.get(c);
        }
        return true;
    }
}`,python:`class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                return False
            node = node.children[c]
        return node.is_end

    def starts_with(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children:
                return False
            node = node.children[c]
        return True`,javascript:`class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children.has(c)) node.children.set(c, new TrieNode());
      node = node.children.get(c);
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children.has(c)) return false;
      node = node.children.get(c);
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const c of prefix) {
      if (!node.children.has(c)) return false;
      node = node.children.get(c);
    }
    return true;
  }
}`},kmp:{title:"KMP Pattern Matching",timeComplexity:"O(N + M)",spaceComplexity:"O(M)",explanationText:"KMP precomputes the LPS (Longest Proper Prefix which is also Suffix) array for the pattern in O(M). The text scan never backtracks — on mismatch, it jumps i to lps[i-1] — guaranteeing linear O(N + M) matching.",cpp:`#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> buildLPS(const string& pattern) {
    int m = pattern.size();
    vector<int> lps(m, 0);
    int len = 0;

    for (int i = 1; i < m; i++) {
        while (len > 0 && pattern[i] != pattern[len])
            len = lps[len - 1];
        if (pattern[i] == pattern[len]) len++;
        lps[i] = len;
    }
    return lps;
}

vector<int> kmpSearch(const string& text, const string& pattern) {
    vector<int> lps = buildLPS(pattern);
    vector<int> matches;
    int i = 0, j = 0;
    int n = text.size(), m = pattern.size();

    while (i < n) {
        if (text[i] == pattern[j]) {
            i++;
            j++;
        }
        if (j == m) {
            matches.push_back(i - j);
            j = lps[j - 1];
        } else if (i < n && text[i] != pattern[j]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
    return matches;
}`,java:`import java.util.*;

public class KMP {
    static int[] buildLPS(String pattern) {
        int m = pattern.length();
        int[] lps = new int[m];
        int len = 0;
        for (int i = 1; i < m; i++) {
            while (len > 0 && pattern.charAt(i) != pattern.charAt(len))
                len = lps[len - 1];
            if (pattern.charAt(i) == pattern.charAt(len)) len++;
            lps[i] = len;
        }
        return lps;
    }

    static List<Integer> kmpSearch(String text, String pattern) {
        int[] lps = buildLPS(pattern);
        List<Integer> matches = new ArrayList<>();
        int i = 0, j = 0;
        int n = text.length(), m = pattern.length();

        while (i < n) {
            if (text.charAt(i) == pattern.charAt(j)) { i++; j++; }
            if (j == m) {
                matches.add(i - j);
                j = lps[j - 1];
            } else if (i < n && text.charAt(i) != pattern.charAt(j)) {
                if (j != 0) j = lps[j - 1];
                else i++;
            }
        }
        return matches;
    }
}`,python:`def build_lps(pattern):
    m = len(pattern)
    lps = [0] * m
    length = 0
    for i in range(1, m):
        while length > 0 and pattern[i] != pattern[length]:
            length = lps[length - 1]
        if pattern[i] == pattern[length]:
            length += 1
        lps[i] = length
    return lps

def kmp_search(text, pattern):
    lps = build_lps(pattern)
    matches = []
    i = j = 0
    n, m = len(text), len(pattern)

    while i < n:
        if text[i] == pattern[j]:
            i += 1
            j += 1
        if j == m:
            matches.append(i - j)
            j = lps[j - 1]
        elif i < n and text[i] != pattern[j]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    return matches`,javascript:`function buildLPS(pattern) {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let len = 0;
  for (let i = 1; i < m; i++) {
    while (len > 0 && pattern[i] !== pattern[len]) len = lps[len - 1];
    if (pattern[i] === pattern[len]) len++;
    lps[i] = len;
  }
  return lps;
}

function kmpSearch(text, pattern) {
  const lps = buildLPS(pattern);
  const matches = [];
  let i = 0, j = 0;
  const n = text.length, m = pattern.length;

  while (i < n) {
    if (text[i] === pattern[j]) { i++; j++; }
    if (j === m) {
      matches.push(i - j);
      j = lps[j - 1];
    } else if (i < n && text[i] !== pattern[j]) {
      if (j !== 0) j = lps[j - 1];
      else i++;
    }
  }
  return matches;
}`},suffixarray:{title:"Suffix Array (Radix Sort)",timeComplexity:"O(N log N)",spaceComplexity:"O(N)",explanationText:"A suffix array lists all suffixes of a string in sorted order. We build it with doubling + radix sort: sort by the first 2^k characters each round, taking O(log N) rounds at O(N) each — O(N log N) total. Substring search then runs in O(M log N).",cpp:`#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

vector<int> buildSuffixArray(const string& s) {
    int n = s.size();
    vector<int> sa(n), rank(n), tmp(n);

    for (int i = 0; i < n; i++) sa[i] = i, rank[i] = s[i];

    for (int k = 1; k < n; k *= 2) {
        auto cmp = [&](int a, int b) {
            if (rank[a] != rank[b]) return rank[a] < rank[b];
            int ra = a + k < n ? rank[a + k] : -1;
            int rb = b + k < n ? rank[b + k] : -1;
            return ra < rb;
        };
        sort(sa.begin(), sa.end(), cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++)
            tmp[sa[i]] = tmp[sa[i - 1]] + (cmp(sa[i - 1], sa[i]) ? 1 : 0);
        rank = tmp;
    }
    return sa;
}`,java:`import java.util.*;

public class SuffixArray {
    static int[] buildSuffixArray(String s) {
        int n = s.length();
        Integer[] sa = new Integer[n];
        int[] rank = new int[n];

        for (int i = 0; i < n; i++) { sa[i] = i; rank[i] = s.charAt(i); }

        for (int k = 1; k < n; k *= 2) {
            final int K = k;
            Comparator<Integer> cmp = (a, b) -> {
                if (rank[a] != rank[b]) return rank[a] - rank[b];
                int ra = a + K < n ? rank[a + K] : -1;
                int rb = b + K < n ? rank[b + K] : -1;
                return ra - rb;
            };
            Arrays.sort(sa, cmp);
            int[] tmp = new int[n];
            tmp[sa[0]] = 0;
            for (int i = 1; i < n; i++)
                tmp[sa[i]] = tmp[sa[i - 1]] + (cmp.compare(sa[i - 1], sa[i]) < 0 ? 1 : 0);
            rank = tmp;
        }
        int[] result = new int[n];
        for (int i = 0; i < n; i++) result[i] = sa[i];
        return result;
    }
}`,python:`def build_suffix_array(s):
    n = len(s)
    sa = list(range(n))
    rank = [ord(c) for c in s]

    k = 1
    while k < n:
        def cmp(i):
            return (rank[i], rank[i + k] if i + k < n else -1)

        sa.sort(key=cmp)
        tmp = [0] * n
        tmp[sa[0]] = 0
        for i in range(1, n):
            tmp[sa[i]] = tmp[sa[i - 1]] + (1 if cmp(sa[i - 1]) != cmp(sa[i]) else 0)
        rank = tmp
        k *= 2
    return sa`,javascript:`function buildSuffixArray(s) {
  const n = s.length;
  let sa = Array.from({ length: n }, (_, i) => i);
  let rank = [...s].map((c) => c.charCodeAt(0));

  for (let k = 1; k < n; k *= 2) {
    const cmp = (a, b) => {
      if (rank[a] !== rank[b]) return rank[a] - rank[b];
      const ra = a + k < n ? rank[a + k] : -1;
      const rb = b + k < n ? rank[b + k] : -1;
      return ra - rb;
    };
    sa.sort(cmp);
    const tmp = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
      tmp[sa[i]] = tmp[sa[i - 1]] + (cmp(sa[i - 1], sa[i]) < 0 ? 1 : 0);
    }
    rank = tmp;
  }
  return sa;
}`},rabinkarp:{title:"Rabin-Karp Rolling Hash",timeComplexity:"O(N + M) average",spaceComplexity:"O(1)",explanationText:"Rabin-Karp hashes the pattern and every window of the text with a rolling hash: subtract the outgoing character, multiply by base, add the incoming character — each shift in O(1). Average-case O(N + M), worst-case O(N·M) on hash collisions.",cpp:`#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> rabinKarp(const string& text, const string& pattern) {
    const int BASE = 256, MOD = 1e9 + 7;
    int n = text.size(), m = pattern.size();
    if (m > n) return {};

    long long patHash = 0, txtHash = 0, power = 1;
    for (int i = 0; i < m; i++) {
        patHash = (patHash * BASE + pattern[i]) % MOD;
        txtHash = (txtHash * BASE + text[i]) % MOD;
        power = (power * BASE) % MOD;
    }

    vector<int> matches;
    for (int i = 0; i <= n - m; i++) {
        if (patHash == txtHash && text.substr(i, m) == pattern)
            matches.push_back(i);

        if (i < n - m) {
            txtHash = (txtHash * BASE - text[i] * power + text[i + m]) % MOD;
            if (txtHash < 0) txtHash += MOD;
        }
    }
    return matches;
}`,java:`import java.util.*;

public class RabinKarp {
    static List<Integer> rabinKarp(String text, String pattern) {
        final int BASE = 256, MOD = 1_000_000_007;
        int n = text.length(), m = pattern.length();
        if (m > n) return new ArrayList<>();

        long patHash = 0, txtHash = 0, power = 1;
        for (int i = 0; i < m; i++) {
            patHash = (patHash * BASE + pattern.charAt(i)) % MOD;
            txtHash = (txtHash * BASE + text.charAt(i)) % MOD;
            power = (power * BASE) % MOD;
        }

        List<Integer> matches = new ArrayList<>();
        for (int i = 0; i <= n - m; i++) {
            if (patHash == txtHash && text.substring(i, i + m).equals(pattern))
                matches.add(i);

            if (i < n - m) {
                txtHash = (txtHash * BASE - text.charAt(i) * power + text.charAt(i + m)) % MOD;
                if (txtHash < 0) txtHash += MOD;
            }
        }
        return matches;
    }
}`,python:`def rabin_karp(text, pattern):
    BASE, MOD = 256, 10**9 + 7
    n, m = len(text), len(pattern)
    if m > n:
        return []

    pat_hash = txt_hash = 0
    power = 1
    for i in range(m):
        pat_hash = (pat_hash * BASE + ord(pattern[i])) % MOD
        txt_hash = (txt_hash * BASE + ord(text[i])) % MOD
        power = (power * BASE) % MOD

    matches = []
    for i in range(n - m + 1):
        if pat_hash == txt_hash and text[i:i + m] == pattern:
            matches.append(i)
        if i < n - m:
            txt_hash = (txt_hash * BASE - ord(text[i]) * power + ord(text[i + m])) % MOD
            if txt_hash < 0:
                txt_hash += MOD
    return matches`,javascript:`function rabinKarp(text, pattern) {
  const BASE = 256, MOD = 1e9 + 7;
  const n = text.length, m = pattern.length;
  if (m > n) return [];

  let patHash = 0, txtHash = 0, power = 1;
  for (let i = 0; i < m; i++) {
    patHash = (patHash * BASE + pattern.charCodeAt(i)) % MOD;
    txtHash = (txtHash * BASE + text.charCodeAt(i)) % MOD;
    power = (power * BASE) % MOD;
  }

  const matches = [];
  for (let i = 0; i <= n - m; i++) {
    if (patHash === txtHash && text.substring(i, i + m) === pattern) {
      matches.push(i);
    }
    if (i < n - m) {
      txtHash = (txtHash * BASE - text.charCodeAt(i) * power + text.charCodeAt(i + m)) % MOD;
      if (txtHash < 0) txtHash += MOD;
    }
  }
  return matches;
}`},boyermoore:{title:"Boyer-Moore String Matching",timeComplexity:"O(N/M) average • O(N·M) worst",spaceComplexity:"O(Alphabet)",explanationText:"Boyer-Moore scans the pattern from right to left and precomputes a bad-character table of the last occurrence of each character. On mismatch, the pattern shifts past the mismatching text character — giving sub-linear average time on large alphabets.",cpp:`#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> boyerMoore(const string& text, const string& pattern) {
    int n = text.size(), m = pattern.size();
    if (m == 0 || m > n) return {};

    vector<int> last(256, -1);
    for (int i = 0; i < m; i++) last[pattern[i]] = i;

    vector<int> matches;
    int shift = 0;
    while (shift <= n - m) {
        int j = m - 1;
        while (j >= 0 && pattern[j] == text[shift + j]) j--;

        if (j < 0) {
            matches.push_back(shift);
            shift += (shift + m < n) ? m - last[text[shift + m]] : 1;
        } else {
            shift += max(1, j - last[text[shift + j]]);
        }
    }
    return matches;
}`,java:`import java.util.*;

public class BoyerMoore {
    static List<Integer> boyerMoore(String text, String pattern) {
        int n = text.length(), m = pattern.length();
        if (m == 0 || m > n) return new ArrayList<>();

        int[] last = new int[256];
        Arrays.fill(last, -1);
        for (int i = 0; i < m; i++) last[pattern.charAt(i)] = i;

        List<Integer> matches = new ArrayList<>();
        int shift = 0;
        while (shift <= n - m) {
            int j = m - 1;
            while (j >= 0 && pattern.charAt(j) == text.charAt(shift + j)) j--;

            if (j < 0) {
                matches.add(shift);
                shift += (shift + m < n) ? m - last[text.charAt(shift + m)] : 1;
            } else {
                shift += Math.max(1, j - last[text.charAt(shift + j)]);
            }
        }
        return matches;
    }
}`,python:`def boyer_moore(text, pattern):
    n, m = len(text), len(pattern)
    if m == 0 or m > n:
        return []

    last = {}
    for i, c in enumerate(pattern):
        last[c] = i

    matches = []
    shift = 0
    while shift <= n - m:
        j = m - 1
        while j >= 0 and pattern[j] == text[shift + j]:
            j -= 1

        if j < 0:
            matches.append(shift)
            if shift + m < n:
                shift += m - last.get(text[shift + m], -1)
            else:
                shift += 1
        else:
            shift += max(1, j - last.get(text[shift + j], -1))
    return matches`,javascript:`function boyerMoore(text, pattern) {
  const n = text.length, m = pattern.length;
  if (m === 0 || m > n) return [];

  const last = new Array(256).fill(-1);
  for (let i = 0; i < m; i++) last[pattern.charCodeAt(i)] = i;

  const matches = [];
  let shift = 0;
  while (shift <= n - m) {
    let j = m - 1;
    while (j >= 0 && pattern[j] === text[shift + j]) j--;

    if (j < 0) {
      matches.push(shift);
      shift += shift + m < n ? m - last[text.charCodeAt(shift + m)] : 1;
    } else {
      shift += Math.max(1, j - last[text.charCodeAt(shift + j)]);
    }
  }
  return matches;
}`},suffixautomaton:{title:"Suffix Automaton",timeComplexity:"build O(N)",spaceComplexity:"O(N × Alphabet)",explanationText:"A suffix automaton is the minimal DFA accepting all substrings of a string. Each character is appended in amortized O(1) using state links and cloning, so the whole automaton builds in O(N) and answers substring / LCS queries in linear time.",cpp:`#include <iostream>
#include <vector>
#include <map>
using namespace std;

struct State {
    int len, link;
    map<char, int> next;
    State() : len(0), link(-1) {}
};

class SuffixAutomaton {
    vector<State> st;
    int last;

public:
    SuffixAutomaton() : st(1), last(0) {}

    void extend(char c) {
        int cur = st.size();
        st.push_back(State());
        st[cur].len = st[last].len + 1;

        int p = last;
        while (p != -1 && !st[p].next.count(c)) {
            st[p].next[c] = cur;
            p = st[p].link;
        }

        if (p == -1) {
            st[cur].link = 0;
        } else {
            int q = st[p].next[c];
            if (st[p].len + 1 == st[q].len) {
                st[cur].link = q;
            } else {
                int clone = st.size();
                st.push_back(st[q]);
                st[clone].len = st[p].len + 1;
                while (p != -1 && st[p].next[c] == q) {
                    st[p].next[c] = clone;
                    p = st[p].link;
                }
                st[q].link = st[cur].link = clone;
            }
        }
        last = cur;
    }

    bool contains(const string& text) {
        int cur = 0;
        for (char c : text) {
            if (!st[cur].next.count(c)) return false;
            cur = st[cur].next[c];
        }
        return true;
    }
};`,java:`import java.util.*;

public class SuffixAutomaton {
    static class State {
        int len, link = -1;
        Map<Character, Integer> next = new HashMap<>();
    }

    List<State> st = new ArrayList<>();
    int last;

    SuffixAutomaton() {
        st.add(new State());
        last = 0;
    }

    void extend(char c) {
        int cur = st.size();
        st.add(new State());
        st.get(cur).len = st.get(last).len + 1;

        int p = last;
        while (p != -1 && !st.get(p).next.containsKey(c)) {
            st.get(p).next.put(c, cur);
            p = st.get(p).link;
        }

        if (p == -1) {
            st.get(cur).link = 0;
        } else {
            int q = st.get(p).next.get(c);
            if (st.get(p).len + 1 == st.get(q).len) {
                st.get(cur).link = q;
            } else {
                int clone = st.size();
                st.add(st.get(q));
                st.get(clone).len = st.get(p).len + 1;
                while (p != -1 && st.get(p).next.get(c) == q) {
                    st.get(p).next.put(c, clone);
                    p = st.get(p).link;
                }
                st.get(q).link = st.get(cur).link = clone;
            }
        }
        last = cur;
    }

    boolean contains(String text) {
        int cur = 0;
        for (char c : text.toCharArray()) {
            if (!st.get(cur).next.containsKey(c)) return false;
            cur = st.get(cur).next.get(c);
        }
        return true;
    }
}`,python:`class State:
    def __init__(self):
        self.len = 0
        self.link = -1
        self.next = {}

class SuffixAutomaton:
    def __init__(self):
        self.st = [State()]
        self.last = 0

    def extend(self, c):
        cur = len(self.st)
        self.st.append(State())
        self.st[cur].len = self.st[self.last].len + 1

        p = self.last
        while p != -1 and c not in self.st[p].next:
            self.st[p].next[c] = cur
            p = self.st[p].link

        if p == -1:
            self.st[cur].link = 0
        else:
            q = self.st[p].next[c]
            if self.st[p].len + 1 == self.st[q].len:
                self.st[cur].link = q
            else:
                clone = len(self.st)
                self.st.append(State())
                self.st[clone].len = self.st[p].len + 1
                self.st[clone].next = dict(self.st[q].next)
                self.st[clone].link = self.st[q].link
                while p != -1 and self.st[p].next.get(c) == q:
                    self.st[p].next[c] = clone
                    p = self.st[p].link
                self.st[q].link = self.st[cur].link = clone
        self.last = cur

    def contains(self, text):
        cur = 0
        for c in text:
            if c not in self.st[cur].next:
                return False
            cur = self.st[cur].next[c]
        return True`,javascript:`class State {
  constructor() {
    this.len = 0;
    this.link = -1;
    this.next = new Map();
  }
}

class SuffixAutomaton {
  constructor() {
    this.st = [new State()];
    this.last = 0;
  }

  extend(c) {
    const cur = this.st.length;
    this.st.push(new State());
    this.st[cur].len = this.st[this.last].len + 1;

    let p = this.last;
    while (p !== -1 && !this.st[p].next.has(c)) {
      this.st[p].next.set(c, cur);
      p = this.st[p].link;
    }

    if (p === -1) {
      this.st[cur].link = 0;
    } else {
      const q = this.st[p].next.get(c);
      if (this.st[p].len + 1 === this.st[q].len) {
        this.st[cur].link = q;
      } else {
        const clone = this.st.length;
        this.st.push(new State());
        this.st[clone].len = this.st[p].len + 1;
        this.st[clone].next = new Map(this.st[q].next);
        this.st[clone].link = this.st[q].link;
        while (p !== -1 && this.st[p].next.get(c) === q) {
          this.st[p].next.set(c, clone);
          p = this.st[p].link;
        }
        this.st[q].link = this.st[cur].link = clone;
      }
    }
    this.last = cur;
  }

  contains(text) {
    let cur = 0;
    for (const c of text) {
      if (!this.st[cur].next.has(c)) return false;
      cur = this.st[cur].next.get(c);
    }
    return true;
  }
}`}},sx={fibonacci:{title:"Fibonacci Heap (Decrease-Key & Extract-Min)",timeComplexity:"decrease-key O(1) amortized • extract-min O(log N)",spaceComplexity:"O(N)",explanationText:"Fibonacci heaps are lazy binomial-heap forests. Decrease-key simply cuts the node and marks its parent (cascading cuts), costing O(1) amortized — which accelerates Dijkstra/Prim to O(E + V log V). Extract-min merges equal-degree roots with an O(log N) bound.",cpp:`#include <iostream>
#include <vector>
#include <cmath>
#include <climits>
using namespace std;

struct FibNode {
    int key;
    int degree = 0;
    bool marked = false;
    FibNode* parent = nullptr;
    FibNode* child = nullptr;
    FibNode* left = this;
    FibNode* right = this;

    FibNode(int k) : key(k) {}
};

class FibonacciHeap {
    FibNode* minNode = nullptr;
    int size = 0;

    void insertIntoList(FibNode* head, FibNode* node) {
        if (!head) { node->left = node->right = node; return; }
        node->right = head->right;
        node->left = head;
        head->right->left = node;
        head->right = node;
    }

    void removeFromList(FibNode* node) {
        node->left->right = node->right;
        node->right->left = node->left;
    }

    void link(FibNode* y, FibNode* x) {  // y becomes child of x
        removeFromList(y);
        y->parent = x;
        y->marked = false;
        if (!x->child) x->child = y;
        else insertIntoList(x->child, y);
        x->degree++;
    }

public:
    FibNode* insert(int key) {
        FibNode* node = new FibNode(key);
        if (!minNode) {
            minNode = node;
        } else {
            insertIntoList(minNode, node);
            if (node->key < minNode->key) minNode = node;
        }
        size++;
        return node;
    }

    int getMin() { return minNode->key; }

    void consolidate() {
        int maxDegree = (int)(log2(size)) + 2;
        vector<FibNode*> degreeTable(maxDegree, nullptr);
        vector<FibNode*> roots;
        FibNode* cur = minNode;
        do { roots.push_back(cur); cur = cur->right; } while (cur != minNode);

        for (FibNode* w : roots) {
            FibNode* x = w;
            int d = x->degree;
            while (degreeTable[d]) {
                FibNode* y = degreeTable[d];
                if (x->key > y->key) swap(x, y);
                link(y, x);
                degreeTable[d] = nullptr;
                d++;
            }
            degreeTable[d] = x;
        }

        minNode = nullptr;
        for (FibNode* root : degreeTable) {
            if (root) {
                if (!minNode) minNode = root;
                else {
                    insertIntoList(minNode, root);
                    if (root->key < minNode->key) minNode = root;
                }
            }
        }
    }

    int extractMin() {
        FibNode* z = minNode;
        if (!z) return -1;

        FibNode* child = z->child;
        for (int i = 0; i < z->degree; i++) {
            FibNode* next = child->right;
            child->parent = nullptr;
            insertIntoList(z, child);  // move child to root list
            child = next;
        }
        removeFromList(z);
        if (z->right == z) {
            minNode = nullptr;
        } else {
            minNode = z->right;
            consolidate();
        }
        size--;
        int result = z->key;
        delete z;
        return result;
    }

    void decreaseKey(FibNode* x, int newKey) {
        if (newKey > x->key) return;
        x->key = newKey;
        FibNode* p = x->parent;
        if (p && x->key < p->key) {
            cut(x, p);
            cascadingCut(p);
        }
        if (x->key < minNode->key) minNode = x;
    }

    void cut(FibNode* x, FibNode* p) {
        removeFromList(x);
        p->degree--;
        if (p->child == x) p->child = x->right == x ? nullptr : x->right;
        x->parent = nullptr;
        x->marked = false;
        insertIntoList(minNode, x);
    }

    void cascadingCut(FibNode* y) {
        FibNode* p = y->parent;
        if (p) {
            if (!y->marked) {
                y->marked = true;
            } else {
                cut(y, p);
                cascadingCut(p);
            }
        }
    }
};`,python:`import math

class FibNode:
    def __init__(self, key):
        self.key = key
        self.degree = 0
        self.marked = False
        self.parent = None
        self.child = None
        self.left = self
        self.right = self

class FibonacciHeap:
    def __init__(self):
        self.min_node = None
        self.size = 0

    def _insert_into_list(self, head, node):
        if head is None:
            node.left = node.right = node
            return
        node.right = head.right
        node.left = head
        head.right.left = node
        head.right = node

    def _remove_from_list(self, node):
        node.left.right = node.right
        node.right.left = node.left

    def insert(self, key):
        node = FibNode(key)
        if self.min_node is None:
            self.min_node = node
        else:
            self._insert_into_list(self.min_node, node)
            if node.key < self.min_node.key:
                self.min_node = node
        self.size += 1
        return node

    def _link(self, y, x):
        self._remove_from_list(y)
        y.parent = x
        y.marked = False
        if x.child is None:
            x.child = y
        else:
            self._insert_into_list(x.child, y)
        x.degree += 1

    def consolidate(self):
        max_degree = int(math.log2(self.size)) + 2
        table = [None] * max_degree
        roots = []
        cur = self.min_node
        while True:
            roots.append(cur)
            cur = cur.right
            if cur == self.min_node:
                break

        for w in roots:
            x = w
            d = x.degree
            while table[d]:
                y = table[d]
                if x.key > y.key:
                    x, y = y, x
                self._link(y, x)
                table[d] = None
                d += 1
            table[d] = x

        self.min_node = None
        for root in table:
            if root:
                if self.min_node is None:
                    self.min_node = root
                else:
                    self._insert_into_list(self.min_node, root)
                    if root.key < self.min_node.key:
                        self.min_node = root

    def extract_min(self):
        z = self.min_node
        if z is None:
            return None
        child = z.child
        for _ in range(z.degree):
            nxt = child.right
            child.parent = None
            self._insert_into_list(z, child)
            child = nxt
        self._remove_from_list(z)
        if z.right == z:
            self.min_node = None
        else:
            self.min_node = z.right
            self.consolidate()
        self.size -= 1
        return z.key

    def decrease_key(self, x, new_key):
        if new_key > x.key:
            return
        x.key = new_key
        p = x.parent
        if p and x.key < p.key:
            self._cut(x, p)
            self._cascading_cut(p)
        if x.key < self.min_node.key:
            self.min_node = x

    def _cut(self, x, p):
        self._remove_from_list(x)
        p.degree -= 1
        if p.child == x:
            p.child = None if x.right == x else x.right
        x.parent = None
        x.marked = False
        self._insert_into_list(self.min_node, x)

    def _cascading_cut(self, y):
        p = y.parent
        if p:
            if not y.marked:
                y.marked = True
            else:
                self._cut(y, p)
                self._cascading_cut(p)`,javascript:`class FibNode {
  constructor(key) {
    this.key = key;
    this.degree = 0;
    this.marked = false;
    this.parent = null;
    this.child = null;
    this.left = this;
    this.right = this;
  }
}

class FibonacciHeap {
  constructor() {
    this.minNode = null;
    this.size = 0;
  }

  insertIntoList(head, node) {
    if (!head) { node.left = node.right = node; return; }
    node.right = head.right;
    node.left = head;
    head.right.left = node;
    head.right = node;
  }

  removeFromList(node) {
    node.left.right = node.right;
    node.right.left = node.left;
  }

  insert(key) {
    const node = new FibNode(key);
    if (!this.minNode) this.minNode = node;
    else {
      this.insertIntoList(this.minNode, node);
      if (node.key < this.minNode.key) this.minNode = node;
    }
    this.size++;
    return node;
  }

  link(y, x) {
    this.removeFromList(y);
    y.parent = x;
    y.marked = false;
    if (!x.child) x.child = y;
    else this.insertIntoList(x.child, y);
    x.degree++;
  }

  consolidate() {
    const maxDegree = Math.floor(Math.log2(this.size)) + 2;
    const table = new Array(maxDegree).fill(null);
    const roots = [];
    let cur = this.minNode;
    do { roots.push(cur); cur = cur.right; } while (cur !== this.minNode);

    for (const w of roots) {
      let x = w;
      let d = x.degree;
      while (table[d]) {
        let y = table[d];
        if (x.key > y.key) [x, y] = [y, x];
        this.link(y, x);
        table[d] = null;
        d++;
      }
      table[d] = x;
    }

    this.minNode = null;
    for (const root of table) {
      if (root) {
        if (!this.minNode) this.minNode = root;
        else {
          this.insertIntoList(this.minNode, root);
          if (root.key < this.minNode.key) this.minNode = root;
        }
      }
    }
  }

  extractMin() {
    const z = this.minNode;
    if (!z) return null;

    let child = z.child;
    for (let i = 0; i < z.degree; i++) {
      const next = child.right;
      child.parent = null;
      this.insertIntoList(z, child);
      child = next;
    }
    this.removeFromList(z);
    if (z.right === z) this.minNode = null;
    else { this.minNode = z.right; this.consolidate(); }
    this.size--;
    return z.key;
  }

  decreaseKey(x, newKey) {
    if (newKey > x.key) return;
    x.key = newKey;
    const p = x.parent;
    if (p && x.key < p.key) {
      this.cut(x, p);
      this.cascadingCut(p);
    }
    if (x.key < this.minNode.key) this.minNode = x;
  }

  cut(x, p) {
    this.removeFromList(x);
    p.degree--;
    if (p.child === x) p.child = x.right === x ? null : x.right;
    x.parent = null;
    x.marked = false;
    this.insertIntoList(this.minNode, x);
  }

  cascadingCut(y) {
    const p = y.parent;
    if (p) {
      if (!y.marked) y.marked = true;
      else { this.cut(y, p); this.cascadingCut(p); }
    }
  }
}`},convexhull:{title:"Convex Hull (Graham Scan)",timeComplexity:"O(N log N)",spaceComplexity:"O(N)",explanationText:"Graham Scan sorts points by polar angle (O(N log N)), then walks the points with a monotone stack, popping any point whose turn is not counter-clockwise. The stack holds the hull vertices, so the scan itself is linear.",cpp:`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Point {
    long long x, y;
    bool operator<(const Point& p) const {
        return x < p.x || (x == p.x && y < p.y);
    }
};

long long cross(const Point& o, const Point& a, const Point& b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

vector<Point> convexHull(vector<Point> pts) {
    sort(pts.begin(), pts.end());
    int n = pts.size();
    if (n <= 1) return pts;

    vector<Point> hull(2 * n);
    int k = 0;

    for (int i = 0; i < n; i++) {              // lower hull
        while (k >= 2 && cross(hull[k - 2], hull[k - 1], pts[i]) <= 0) k--;
        hull[k++] = pts[i];
    }
    for (int i = n - 2, t = k + 1; i >= 0; i--) {  // upper hull
        while (k >= t && cross(hull[k - 2], hull[k - 1], pts[i]) <= 0) k--;
        hull[k++] = pts[i];
    }

    hull.resize(k - 1);
    return hull;
}`,java:`import java.util.*;

public class ConvexHull {
    static class Point {
        long x, y;
        Point(long x, long y) { this.x = x; this.y = y; }
    }

    static long cross(Point o, Point a, Point b) {
        return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    }

    static List<Point> convexHull(List<Point> pts) {
        pts.sort((a, b) -> a.x != b.x ? Long.compare(a.x, b.x) : Long.compare(a.y, b.y));
        int n = pts.size();
        if (n <= 1) return pts;

        List<Point> hull = new ArrayList<>();
        for (Point p : pts) {                       // lower hull
            while (hull.size() >= 2 &&
                   cross(hull.get(hull.size() - 2), hull.get(hull.size() - 1), p) <= 0)
                hull.remove(hull.size() - 1);
            hull.add(p);
        }
        int lowerSize = hull.size();
        for (int i = n - 2; i >= 0; i--) {          // upper hull
            Point p = pts.get(i);
            while (hull.size() > lowerSize &&
                   cross(hull.get(hull.size() - 2), hull.get(hull.size() - 1), p) <= 0)
                hull.remove(hull.size() - 1);
            hull.add(p);
        }
        hull.remove(hull.size() - 1);
        return hull;
    }
}`,python:`def cross(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

def convex_hull(points):
    points = sorted(points)
    if len(points) <= 1:
        return points

    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)

    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)

    return lower[:-1] + upper[:-1]`,javascript:`function cross(o, a, b) {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

function convexHull(points) {
  points.sort((a, b) => (a.x !== b.x ? a.x - b.x : a.y - b.y));
  const n = points.length;
  if (n <= 1) return points;

  const hull = [];
  for (const p of points) {  // lower hull
    while (hull.length >= 2 && cross(hull[hull.length - 2], hull[hull.length - 1], p) <= 0) {
      hull.pop();
    }
    hull.push(p);
  }
  const lowerSize = hull.length;
  for (let i = n - 2; i >= 0; i--) {  // upper hull
    const p = points[i];
    while (hull.length > lowerSize && cross(hull[hull.length - 2], hull[hull.length - 1], p) <= 0) {
      hull.pop();
    }
    hull.push(p);
  }
  hull.pop();
  return hull;
}`},grandmaster:{title:"Longest Increasing Subsequence (O(N log N))",timeComplexity:"O(N log N)",spaceComplexity:"O(N)",explanationText:"Instead of the O(N²) DP, maintain a patience-sorting array “tails” where tails[i] is the smallest tail of an increasing subsequence of length i+1. Binary search (upper_bound) finds the insertion spot, giving O(N log N) — the grandmaster classic.",cpp:`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLIS(const vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x);
        } else {
            *it = x;
        }
    }
    return tails.size();
}`,java:`import java.util.*;

public class LIS {
    static int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int len = 0;

        for (int x : nums) {
            int pos = Arrays.binarySearch(tails, 0, len, x);
            if (pos < 0) pos = -(pos + 1);
            tails[pos] = x;
            if (pos == len) len++;
        }
        return len;
    }
}`,python:`from bisect import bisect_left

def length_of_lis(nums):
    tails = []
    for x in nums:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)`,javascript:`function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {  // lower_bound
      const mid = Math.floor((lo + hi) / 2);
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    if (lo === tails.length) tails.push(x);
    else tails[lo] = x;
  }
  return tails.length;
}`}},Kn={...tx,...nx,...rx,...ix,...ox,...sx},Jd={bst:{topicKey:"bst",title:"Binary Search Tree (BST)",category:"Trees",overview:"A fundamental node-based binary tree data structure where keys in the left subtree are smaller than the node, and keys in the right subtree are larger.",definition:"For every node N in a BST: (1) All nodes in N.left have value < N.value, (2) All nodes in N.right have value > N.value, (3) Both left and right subtrees must also be valid BSTs.",keyProperties:["In-order traversal yields nodes in strictly sorted ascending order.","Search, Insertion, and Deletion average O(log N) time.","Worst-case height becomes O(N) when nodes are inserted in sorted order (skewed tree)."],timeComplexities:[{operation:"Search",best:"O(1)",average:"O(log N)",worst:"O(N)"},{operation:"Insertion",best:"O(1)",average:"O(log N)",worst:"O(N)"},{operation:"Deletion",best:"O(1)",average:"O(log N)",worst:"O(N)"}],spaceComplexity:"O(N) for storing N nodes. Auxiliary recursion stack: O(h) where h is tree height.",pinToPinSteps:[{stepNumber:1,title:"Compare with Root Node",explanation:"Start at root. If target value equals current node value, item is found."},{stepNumber:2,title:"Traverse Left or Right Subtree",explanation:"If target < current node value, move to left child. If target > current node value, move to right child.",formula:"NextNode = (target < current.val) ? current.left : current.right"},{stepNumber:3,title:"Insert or Replace (For Mutating Operations)",explanation:"For insertion, attach new node once null child pointer is reached. For deletion, handle 3 cases: (a) Leaf, (b) 1 Child, (c) 2 Children (replace with in-order successor)."}],realWorldApplications:["Database Indexing (B-Trees / BST variants)","Expression evaluation and Symbol Tables in Compilers","Auto-complete dictionary prefix lookups"],edgeCases:["Empty Tree (Root is null)","Inserting duplicate values","Deleting root node with 2 children","Degenerate/Skewed linked-list tree"]},avl:{topicKey:"avl",title:"AVL Tree (Self-Balancing BST)",category:"Trees",overview:"Invented by Adelson-Velsky and Landis, an AVL tree guarantees strict O(log N) operations by maintaining height balance across every node.",definition:"An AVL tree is a self-balancing BST where the Balance Factor (BF) of every node N satisfies: BalanceFactor(N) = Height(N.left) - Height(N.right) ∈ {-1, 0, +1}.",keyProperties:["Strictly balanced: Tree height is bounded by h ≤ 1.44 log₂(N).","Imbalance detected when |BalanceFactor| > 1.","Rebalanced instantly using 4 single/double rotations: LL, RR, LR, RL."],timeComplexities:[{operation:"Search",best:"O(1)",average:"O(log N)",worst:"O(log N)"},{operation:"Insertion",best:"O(1)",average:"O(log N)",worst:"O(log N)"},{operation:"Deletion",best:"O(1)",average:"O(log N)",worst:"O(log N)"}],spaceComplexity:"O(N) total space with O(1) balance factor stored per node.",pinToPinSteps:[{stepNumber:1,title:"Standard BST Insertion",explanation:"Recursively insert the new value like a regular BST."},{stepNumber:2,title:"Update Heights & Calculate Balance Factor",explanation:"Backtrack up ancestors, updating node.height = 1 + max(height(left), height(right)) and computing BF.",formula:"BalanceFactor = Height(Left) - Height(Right)"},{stepNumber:3,title:"Perform Tree Rotations if Unbalanced",explanation:"If BF > +1 and val < left.val => Right Rotation (LL). If BF < -1 and val > right.val => Left Rotation (RR). Handle LR/RL double rotations accordingly."}],realWorldApplications:["Database indexing where lookups are far more frequent than writes","High-performance memory allocation allocators","Geographic spatial queries and Range Trees"],edgeCases:["Double rotation (LR / RL) where inner subtree is unbalanced","Cascade rebalancing during deletion from leaf up to root","Inserting strictly increasing values"]},redblack:{topicKey:"redblack",title:"Red-Black Tree Properties",category:"Trees",overview:"A self-balancing BST where every node is colored RED or BLACK, satisfying strict black-height invariant rules.",definition:"Rules: (1) Every node is RED or BLACK, (2) Root is BLACK, (3) Leaves (null) are BLACK, (4) If a node is RED, both children are BLACK (no consecutive REDs), (5) Every simple path from a node to descendant null leaves contains the same number of BLACK nodes.",keyProperties:["Tree height is bounded by h ≤ 2 log₂(N + 1).","Faster insertion and deletion than AVL due to fewer rotations (max 3 rotations per delete).","Used as standard C++ std::map and Java TreeMap implementation."],timeComplexities:[{operation:"Search",best:"O(1)",average:"O(log N)",worst:"O(log N)"},{operation:"Insertion",best:"O(1)",average:"O(log N)",worst:"O(log N)"},{operation:"Deletion",best:"O(1)",average:"O(log N)",worst:"O(log N)"}],spaceComplexity:"O(N) with 1 bit per node for color.",pinToPinSteps:[{stepNumber:1,title:"Insert RED Leaf Node",explanation:"Always insert new key as a RED leaf node to preserve black-height."},{stepNumber:2,title:"Check Double-Red Violation",explanation:"If parent is RED, a double-red violation occurs. Check Uncle node color."},{stepNumber:3,title:"Recolor or Rotate",explanation:"If Uncle is RED => Recolor Parent, Uncle to BLACK, and Grandparent to RED. If Uncle is BLACK => Perform Tree Rotation (LL/RR/LR/RL)."}],realWorldApplications:["C++ STL std::map and std::set implementation","Java java.util.TreeMap and java.util.TreeSet","Linux Kernel Completely Fair Scheduler (CFS)"],edgeCases:["Double Black resolution during deletion","Root recoloring to BLACK","Uncle node null (treated as BLACK)"]},dijkstra:{topicKey:"dijkstra",title:"Dijkstra's Shortest Path Algorithm",category:"Graphs",overview:"Edgar Dijkstra's greedy algorithm finds the shortest path from a single source vertex to all other vertices in a non-negative weighted graph.",definition:"Uses a priority queue (min-heap) to greedily select the unvisited vertex u with minimum tentative distance dist[u], then relaxes all outgoing edges (u, v, weight).",keyProperties:["Greedy choice property: Shortest path to current min-distance node is finalized.","Edge Relaxation Condition: If dist[u] + weight(u, v) < dist[v], update dist[v] = dist[u] + weight(u, v).","Fails on negative edge weights (use Bellman-Ford for negative weights)."],timeComplexities:[{operation:"Min-Heap Dijkstra",best:"O(V log V)",average:"O((V + E) log V)",worst:"O((V + E) log V)"},{operation:"Array Dijkstra",best:"O(V²)",average:"O(V²)",worst:"O(V²)"}],spaceComplexity:"O(V + E) for Graph Adjacency List and O(V) for Distances array & Min-Heap.",pinToPinSteps:[{stepNumber:1,title:"Initialize Distance Array",explanation:"Set dist[source] = 0 and dist[v] = ∞ for all other vertices. Push (0, source) into Min-Heap.",formula:"dist[src] = 0, dist[v] = ∞"},{stepNumber:2,title:"Extract Minimum Vertex",explanation:"Pop (d, u) with minimum distance from Heap. If d > dist[u], skip duplicate."},{stepNumber:3,title:"Relax Outgoing Edges",explanation:"For each neighbor v with edge weight w: if dist[u] + w < dist[v], update dist[v] = dist[u] + w and insert (dist[v], v) into Heap.",formula:"dist[v] = min(dist[v], dist[u] + weight(u, v))"}],realWorldApplications:["Google Maps & GPS Navigation systems (Road Network Routing)","IP Routing Protocols (OSPF — Open Shortest Path First)","Flight network connection optimization"],edgeCases:["Disconnected graph (some vertices remain distance ∞)","Graph with 0-weight edges","Self-loops or multiple edges between same pair of nodes"]},knapsack:{topicKey:"knapsack",title:"0/1 Knapsack Problem (Dynamic Programming)",category:"DynamicProgramming",overview:"Given items with weights and values, find the subset of items that maximizes total value without exceeding knapsack capacity W.",definition:"Dynamic Programming tabular state dp[i][w] represents the maximum total value achievable using a subset of the first i items with weight capacity w.",keyProperties:["Items cannot be broken into fractions (either taken completely 1 or left 0).","Overlapping subproblems & Optimal substructure properties.","State transition recurrence depends on whether item i-1 fits in capacity w."],timeComplexities:[{operation:"DP Tabulation",best:"O(N × W)",average:"O(N × W)",worst:"O(N × W)"},{operation:"Recursive Brute Force",best:"O(2ⁿ)",average:"O(2ⁿ)",worst:"O(2ⁿ)"}],spaceComplexity:"O(N × W) for 2D DP Table, optimizable to O(W) with 1D DP Array.",pinToPinSteps:[{stepNumber:1,title:"Define Base Cases",explanation:"dp[0][w] = 0 (0 items available) and dp[i][0] = 0 (capacity is 0).",formula:"dp[0][w] = 0, dp[i][0] = 0"},{stepNumber:2,title:"Evaluate Item Include / Exclude",explanation:"For item i with weight wt[i-1] and value val[i-1]: If wt[i-1] ≤ w, choose max between excluding item (dp[i-1][w]) and including item (val[i-1] + dp[i-1][w - wt[i-1]]).",formula:"dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])"},{stepNumber:3,title:"Backtrack Optimal Item Subset",explanation:"Start at dp[N][W]. If dp[i][w] ≠ dp[i-1][w], item i was included; subtract wt[i-1] from capacity and repeat."}],realWorldApplications:["Resource Allocation & Financial Budgeting","Cargo Loading Optimization in Shipping","Bandwidth and Server Cache Memory Allocation"],edgeCases:["All item weights exceed knapsack capacity W (Result = 0)","Item weights or values are zero","Capacity W = 0"]},trie:{topicKey:"trie",title:"Trie (Prefix Tree)",category:"StringAndTrie",overview:"An efficient tree-like data structure used for storing and searching strings where nodes represent shared character prefixes.",definition:"Each node in a Trie contains an array/map of child pointers for every alphabet character and a boolean flag isEndOfWord indicating complete words.",keyProperties:["Search & Insert time depends ONLY on word length L, not total words N.","Shares common prefixes among words, saving redundant character storage.","Ideal for prefix-matching auto-complete queries."],timeComplexities:[{operation:"Word Search",best:"O(L)",average:"O(L)",worst:"O(L)"},{operation:"Prefix Search",best:"O(L)",average:"O(L)",worst:"O(L)"},{operation:"Word Insertion",best:"O(L)",average:"O(L)",worst:"O(L)"}],spaceComplexity:"O(N × L × AlphabetSize) worst case, heavily compressed when words share prefixes.",pinToPinSteps:[{stepNumber:1,title:"Traverse Character by Character",explanation:"Start at root. For each char c in word, check if node.children[c] exists."},{stepNumber:2,title:"Create Missing Node Pointers",explanation:"If child pointer for char c is null during insertion, instantiate a new TrieNode."},{stepNumber:3,title:"Mark Word Termination",explanation:"After reaching last character of word, set current.isEndOfWord = true."}],realWorldApplications:["Search Engine Auto-complete suggestions","Spell checkers & Dictionary lookups","IP Router Longest Prefix Matching (LPM)"],edgeCases:['Searching empty string ""','Inserting words that are prefixes of existing words (e.g., "cat" in "catalog")',"Case-sensitivity & non-ASCII characters"]},heap:{topicKey:"heap",title:"Binary Heap & Priority Queue",category:"Trees",overview:"A complete binary tree stored in an array where every parent satisfies the heap property — used as the backbone of priority queues.",definition:"Max-Heap: key(parent) ≥ key(child) for every node. Min-Heap: key(parent) ≤ key(child). Both are complete binary trees, so the array index of node i gives left child 2i+1 and right child 2i+2.",keyProperties:["Insert and Extract-Max/Min both run in O(log N) via sift-up / sift-down.","Build-Heap runs in O(N) using bottom-up heapify, not O(N log N).","Always a complete tree: new nodes are added left-to-right at the deepest level."],timeComplexities:[{operation:"Insert",best:"O(1)",average:"O(log N)",worst:"O(log N)"},{operation:"Extract Max/Min",best:"O(1)",average:"O(log N)",worst:"O(log N)"},{operation:"Build Heap",best:"O(N)",average:"O(N)",worst:"O(N)"},{operation:"Peek",best:"O(1)",average:"O(1)",worst:"O(1)"}],spaceComplexity:"O(N) — stored implicitly in a flat array, no pointers needed.",pinToPinSteps:[{stepNumber:1,title:"Insert at Bottom",explanation:"Place the new key in the next free slot (rightmost leaf) to keep the tree complete."},{stepNumber:2,title:"Sift-Up (Bubble Up)",explanation:"Compare with the parent. If the heap property is violated, swap with parent and repeat.",formula:"while (a[i] > a[parent]) swap(i, parent)"},{stepNumber:3,title:"Extract Root",explanation:"Remove the root, move the last element to the root, then sift-down: swap with the larger child until the heap property holds."}],realWorldApplications:["Priority queues for task schedulers and Dijkstra/Prim","Heap sort — O(N log N) in-place comparison sort","K largest/smallest elements and median stream problems"],edgeCases:["Empty heap (extract must throw or return sentinel)","Duplicates — heap does not enforce uniqueness","Heapify with an array that is not complete"]},btree:{topicKey:"btree",title:"B-Tree (Balanced Multi-Way Search Tree)",category:"Trees",overview:"A self-balancing multi-way search tree optimized for disk storage where each node holds multiple keys and pointers.",definition:"A B-Tree of minimum degree t satisfies: (1) Every node holds at most 2t-1 keys, (2) Every non-root node holds at least t-1 keys, (3) All leaves are at the same depth, (4) A node with k keys has k+1 children.",keyProperties:["Height stays O(log_t N) — extremely shallow for millions of records.","A node spans one disk block, minimizing disk I/O per lookup.","Splits when a node overflows (2t-1 keys) and merges/borrows when underflow occurs."],timeComplexities:[{operation:"Search",best:"O(1)",average:"O(log_t N)",worst:"O(log N)"},{operation:"Insertion",best:"O(log N)",average:"O(log N)",worst:"O(log N)"},{operation:"Deletion",best:"O(log N)",average:"O(log N)",worst:"O(log N)"}],spaceComplexity:"O(N) — plus one extra node slot per overflow during split.",pinToPinSteps:[{stepNumber:1,title:"Search Down the Tree",explanation:"Binary-search the keys in the current node to decide which child pointer to follow."},{stepNumber:2,title:"Insert & Split on Overflow",explanation:"Insert key into a leaf; if the leaf reaches 2t-1 keys, split it into two nodes and promote the median to the parent."},{stepNumber:3,title:"Propagate Splits Upward",explanation:"If the parent also overflows, split it too — the tree grows only by a new root."}],realWorldApplications:["PostgreSQL and MySQL InnoDB index implementation","Filesystem directories (ext4 H-tree variant)","Database range scans — in-order leaves are linked"],edgeCases:["Splitting the root creates a new root (tree height increases)","Deletion from internal nodes requires successor borrowing","Minimum degree t=2 is a 2-3-4 tree"]},segment:{topicKey:"segment",title:"Segment Tree (Range Query Tree)",category:"Trees",overview:"A binary tree that stores aggregate information (sum, min, max, gcd) about intervals, enabling logarithmic range queries with point updates.",definition:"Each node represents a contiguous interval [l, r]. The root covers [0, N-1]; a node with interval [l, r] has children [l, mid] and [mid+1, r]. Leaves are single elements.",keyProperties:["Range query and point update both cost O(log N).","Built in O(N) — total 4N array nodes are typical.","Supports any associative aggregate: sum, min, max, gcd, XOR."],timeComplexities:[{operation:"Range Query",best:"O(1)",average:"O(log N)",worst:"O(log N)"},{operation:"Point Update",best:"O(1)",average:"O(log N)",worst:"O(log N)"},{operation:"Build",best:"O(N)",average:"O(N)",worst:"O(N)"}],spaceComplexity:"O(4N) using array storage — safe upper bound for recursive implementations.",pinToPinSteps:[{stepNumber:1,title:"Build Recursively",explanation:"Combine child values: tree[i] = tree[2i+1] op tree[2i+2]. Leaves store the original array values."},{stepNumber:2,title:"Range Query with 3 Cases",explanation:"If node interval fully inside [l, r] → return its value. If fully outside → return neutral element. Else recurse on both children and combine.",formula:"Query(l, r) = Combine(Query(left), Query(right))"},{stepNumber:3,title:"Point Update",explanation:"Walk down to the leaf at position i, update it, then recompute every ancestor on the path back up."}],realWorldApplications:["Competitive programming range sum / RMQ problems","Stock price windows, sensor time-series aggregates","With lazy propagation: range add / range assign updates"],edgeCases:["Zero-length queries and out-of-range bounds","Neutral element choice per operation (0 for sum, +∞ for min)","1-indexed vs 0-indexed array conventions"]},bfsdfs:{topicKey:"bfsdfs",title:"Graph Traversal: BFS & DFS",category:"Graphs",overview:"The two fundamental graph traversal strategies — breadth-first (queue, level order) and depth-first (stack/recursion, go deep first).",definition:"BFS explores all neighbors of a node before moving to the next level. DFS explores a branch completely before backtracking. Both visit every vertex and edge exactly once: O(V + E).",keyProperties:["BFS finds the shortest path in unweighted graphs (number of edges).","DFS produces spanning trees, detects cycles, and supports topological order.","BFS uses a queue; DFS uses a stack (or recursion)."],timeComplexities:[{operation:"Traversal (BFS)",best:"O(V + E)",average:"O(V + E)",worst:"O(V + E)"},{operation:"Traversal (DFS)",best:"O(V + E)",average:"O(V + E)",worst:"O(V + E)"},{operation:"BFS Space (Queue)",best:"O(1)",average:"O(V)",worst:"O(V)"},{operation:"DFS Space (Stack)",best:"O(1)",average:"O(h)",worst:"O(V)"}],spaceComplexity:"BFS: O(V) queue in the worst case. DFS: O(h) recursion stack where h is the longest path.",pinToPinSteps:[{stepNumber:1,title:"Mark Source Visited",explanation:"BFS: enqueue source. DFS: push source (or call recursively)."},{stepNumber:2,title:"Explore Frontier / Descend",explanation:"BFS: dequeue, process, enqueue all unvisited neighbors. DFS: pick first unvisited neighbor and recurse immediately."},{stepNumber:3,title:"Repeat Until Exhausted",explanation:"Continue until the queue/stack is empty. For disconnected graphs, restart from any unvisited vertex."}],realWorldApplications:["BFS: social network friend-of-friend, GPS level expansion","DFS: maze solving, cycle detection, connected components","Both: web crawling, garbage collection marking"],edgeCases:["Disconnected graphs — need a loop over all vertices","Graphs with cycles — visited set prevents infinite loops","Self-loops and parallel edges"]},bellmanford:{topicKey:"bellmanford",title:"Bellman-Ford Shortest Path Algorithm",category:"Graphs",overview:"A dynamic-programming shortest-path algorithm that relaxes all edges V-1 times, handling negative weights and detecting negative cycles.",definition:"Relax every edge (u, v, w) repeatedly: if dist[u] + w < dist[v], update dist[v]. After V-1 full passes, all shortest paths are final; a V-th pass that still relaxes proves a negative cycle.",keyProperties:["Works with negative edge weights — Dijkstra does not.","O(V × E) time regardless of graph density.","Detects negative weight cycles reachable from the source."],timeComplexities:[{operation:"Shortest Paths",best:"O(E)",average:"O(V × E)",worst:"O(V × E)"},{operation:"Negative Cycle Detect",best:"O(E)",average:"O(V × E)",worst:"O(V × E)"}],spaceComplexity:"O(V) for the distance array (adjacency list is input).",pinToPinSteps:[{stepNumber:1,title:"Initialize Distances",explanation:"dist[source] = 0, all others ∞."},{stepNumber:2,title:"Relax All Edges V-1 Times",explanation:"In each pass, scan every edge and relax dist[v] = min(dist[v], dist[u] + w).",formula:"dist[v] = min(dist[v], dist[u] + w(u,v))"},{stepNumber:3,title:"Check the V-th Pass",explanation:"If any edge still relaxes on pass V, a negative cycle reachable from the source exists."}],realWorldApplications:["Currency arbitrage detection (negative cycles in exchange graphs)","Network routing protocols (RIP — Routing Information Protocol)","Finance: detecting profitable trade loops"],edgeCases:["Negative cycle unreachable from source — not detected","Early termination when a pass makes zero updates","Overflow on ∞ distances with large weights"]},mst:{topicKey:"mst",title:"Minimum Spanning Tree (Prim & Kruskal)",category:"Graphs",overview:"Two greedy algorithms that connect all vertices with the minimum total edge weight — the MST.",definition:"MST: a spanning tree (V-1 edges, connected, acyclic) minimizing total edge weight. Prim grows a tree from a seed vertex using a min-priority queue; Kruskal sorts edges and greedily joins components with DSU.",keyProperties:["Cut property: the cheapest edge crossing any cut belongs to some MST.","Prim: O(E log V) with a binary heap — best on dense graphs.","Kruskal: O(E log E) dominated by sorting — best on sparse graphs."],timeComplexities:[{operation:"Prim (Heap)",best:"O(E + V log V)",average:"O(E log V)",worst:"O(E log V)"},{operation:"Kruskal",best:"O(E log E)",average:"O(E log E)",worst:"O(E log E)"},{operation:"DSU Phase (Kruskal)",best:"O(E α(V))",average:"O(E α(V))",worst:"O(E α(V))"}],spaceComplexity:"O(V + E) for adjacency lists; O(V) for the heap/visited arrays.",pinToPinSteps:[{stepNumber:1,title:"Prim: Seed & Grow",explanation:"Start from any vertex, push all its edges into a min-heap, and repeatedly take the cheapest edge leading to an unvisited vertex."},{stepNumber:2,title:"Kruskal: Sort & Union",explanation:"Sort edges by weight. Walk edges in order; add an edge only if its endpoints are in different DSU components."},{stepNumber:3,title:"Stop at V-1 Edges",explanation:"A tree needs exactly V-1 edges. If fewer are found, the graph is disconnected — no MST exists."}],realWorldApplications:["Network design: laying cable/fiber between cities","Cluster analysis via single-linkage (MST-based)","Approximation for the Traveling Salesman Problem"],edgeCases:["Disconnected graph — MST undefined (minimum spanning FOREST)","Equal-weight edges — multiple valid MSTs","Complete graph with all edges equal"]},tarjan:{topicKey:"tarjan",title:"Tarjan's Strongly Connected Components",category:"Graphs",overview:"A single-pass DFS algorithm that partitions a directed graph into maximal strongly connected components (SCCs).",definition:"An SCC is a maximal set of vertices where every vertex is reachable from every other. Tarjan uses two arrays: discovery time disc[u] and low-link low[u] = min reachable discovery time, plus an index stack.",keyProperties:["Runs in O(V + E) — one DFS pass, no reverse graph needed.","Each SCC is popped from the stack when low[u] == disc[u].","Condensing SCCs yields a DAG — enabling topological reasoning."],timeComplexities:[{operation:"SCC Detection",best:"O(V + E)",average:"O(V + E)",worst:"O(V + E)"},{operation:"Topological Order of SCCs",best:"O(V + E)",average:"O(V + E)",worst:"O(V + E)"}],spaceComplexity:"O(V) for disc/low arrays, the stack, and the visited set.",pinToPinSteps:[{stepNumber:1,title:"DFS with Discovery Time",explanation:"Assign disc[u] = low[u] = current counter and push u onto the index stack."},{stepNumber:2,title:"Update Low-Link",explanation:"For each neighbor v: if unvisited, recurse and set low[u] = min(low[u], low[v]). If v is on the stack, low[u] = min(low[u], disc[v]).",formula:"low[u] = min(low[u], disc[v]) for back edges"},{stepNumber:3,title:"Pop the Component",explanation:"When low[u] == disc[u], u is the root of an SCC — pop the stack until u, emitting one component."}],realWorldApplications:["Social network community detection","Compilers: build dependency analysis between modules","Game theory: 2-SAT implication graph solutions"],edgeCases:["Self-loops — a vertex alone forms an SCC","DAGs — every vertex is its own SCC","Multiple roots — restart DFS from unvisited vertices"]},lcs:{topicKey:"lcs",title:"Longest Common Subsequence (LCS)",category:"DynamicProgramming",overview:"The classic sequence-alignment DP that finds the longest subsequence present in both strings, preserving order but allowing gaps.",definition:"dp[i][j] = length of LCS of prefixes X[0..i-1] and Y[0..j-1]. Transition: if X[i-1] == Y[j-1] then dp[i][j] = 1 + dp[i-1][j-1], else dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",keyProperties:["Optimal substructure: prefix LCS feeds full LCS.","O(N × M) time; O(min(N, M)) space with rolling rows.","Backtracking from dp[N][M] reconstructs the actual subsequence."],timeComplexities:[{operation:"DP Table Fill",best:"O(N × M)",average:"O(N × M)",worst:"O(N × M)"},{operation:"Backtrack Reconstruction",best:"O(N + M)",average:"O(N + M)",worst:"O(N + M)"}],spaceComplexity:"O(N × M) full table, O(min(N, M)) for length-only with rolling rows.",pinToPinSteps:[{stepNumber:1,title:"Base Cases",explanation:"dp[0][j] = 0 and dp[i][0] = 0 — an empty prefix matches nothing."},{stepNumber:2,title:"Match or Skip",explanation:"If characters match, extend the diagonal. Otherwise keep the best of skipping one character from either string.",formula:"dp[i][j] = 1 + dp[i-1][j-1] if match, else max(dp[i-1][j], dp[i][j-1])"},{stepNumber:3,title:"Backtrack",explanation:"Walk from dp[N][M]; moving diagonally collects matched characters, horizontal/vertical moves are skips."}],realWorldApplications:["git diff and version-control change detection","DNA/protein sequence alignment in bioinformatics","Plagiarism detection and similarity scoring"],edgeCases:["Empty string inputs — LCS length 0","Identical strings — LCS is the whole string","All characters distinct — LCS length 1"]},floydwarshall:{topicKey:"floydwarshall",title:"Floyd-Warshall All-Pairs Shortest Paths",category:"Graphs",overview:"A dynamic-programming algorithm that computes shortest paths between every pair of vertices in O(V³) — elegantly simple, dense-friendly.",definition:"dist[i][j] holds the shortest path from i to j. For each intermediate vertex k: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]). After V phases, all pairs are final.",keyProperties:["Works with negative weights (no negative cycles).","Only V nested iterations over three loops — tiny code.","Path reconstruction via a next[][] matrix."],timeComplexities:[{operation:"All-Pairs Shortest Paths",best:"O(V³)",average:"O(V³)",worst:"O(V³)"},{operation:"Negative Cycle Detection",best:"O(V³)",average:"O(V³)",worst:"O(V³)"}],spaceComplexity:"O(V²) for the distance matrix.",pinToPinSteps:[{stepNumber:1,title:"Initialize Matrix",explanation:"dist[i][i] = 0, dist[i][j] = w(i,j) for edges, else ∞."},{stepNumber:2,title:"Relax Through k",explanation:"For each ordered pair (i, j), try routing through vertex k and keep the minimum.",formula:"dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])"},{stepNumber:3,title:"Check Negative Cycle",explanation:"After all phases, if any dist[i][i] < 0, a negative cycle exists."}],realWorldApplications:["Road networks: shortest route between all city pairs","Transitive closure of reachability","Sparse-to-dense: Johnson's algorithm wins on sparse graphs"],edgeCases:["Negative cycles — output is meaningless (dist[i][i] < 0)","Disconnected pairs stay at ∞","Large V — O(V³) quickly exceeds time limits"]},matrixchain:{topicKey:"matrixchain",title:"Matrix Chain Multiplication (DP)",category:"DynamicProgramming",overview:"Finds the optimal parenthesization of a chain of matrices that minimizes total scalar multiplications.",definition:"m[i][j] = minimum multiplications to compute product Aᵢ...Aⱼ. Split at k: m[i][j] = min over k of m[i][k] + m[k+1][j] + p[i-1]·p[k]·p[j], where p holds the dimensions.",keyProperties:["Classic interval DP — the gap between i and j grows in each phase.","Different parenthesizations give wildly different costs.","O(N³) time, O(N²) space; optimal splits stored in s[i][j]."],timeComplexities:[{operation:"DP Fill",best:"O(N³)",average:"O(N³)",worst:"O(N³)"},{operation:"Reconstruction",best:"O(N)",average:"O(N)",worst:"O(N)"}],spaceComplexity:"O(N²) for the m and s tables.",pinToPinSteps:[{stepNumber:1,title:"Base Cases",explanation:"m[i][i] = 0 — a single matrix costs nothing to multiply."},{stepNumber:2,title:"Try Every Split Point",explanation:"For each interval length L from 2 to N, and each split k in [i, j): compute the cost and keep the minimum.",formula:"m[i][j] = min_k(m[i][k] + m[k+1][j] + p_{i-1} p_k p_j)"},{stepNumber:3,title:"Reconstruct Parenthesization",explanation:"s[i][j] records the optimal k; recursively print the chain: (Aᵢ..Aₖ)(Aₖ₊₁..Aⱼ)."}],realWorldApplications:["Compilers: optimizing nested tensor operations","Deep learning: optimal order of layer multiplications","Sparse linear algebra pipeline planning"],edgeCases:["Single matrix (cost 0)","Incompatible adjacent dimensions (p[i] mismatch)","Large N — O(N³) with N > 1000 is infeasible"]},dsu:{topicKey:"dsu",title:"Disjoint Set Union (Union-Find)",category:"AdvancedSets",overview:"The near-constant-time data structure for maintaining disjoint components under two operations: union(a, b) and find(a).",definition:"Each component is a tree pointed to by a parent[] array. find(a) walks to the root (with path compression). union(a, b) attaches the smaller rank tree under the larger (union by rank).",keyProperties:["O(α(N)) per operation — inverse Ackermann, effectively O(1).","Path compression flattens trees during find.","Union by rank keeps trees at logarithmic depth."],timeComplexities:[{operation:"Find (with compression)",best:"O(1)",average:"O(α(N))",worst:"O(α(N))"},{operation:"Union",best:"O(1)",average:"O(α(N))",worst:"O(α(N))"},{operation:"Build (N elements)",best:"O(N)",average:"O(N)",worst:"O(N)"}],spaceComplexity:"O(N) for parent and rank arrays.",pinToPinSteps:[{stepNumber:1,title:"Initialize",explanation:"parent[i] = i and rank[i] = 0 for every element."},{stepNumber:2,title:"Find with Path Compression",explanation:"Recursively resolve the root and set every node on the path to point directly to it.",formula:"parent[x] = find(parent[x])"},{stepNumber:3,title:"Union by Rank",explanation:"Attach the root with the smaller rank under the larger root; ties increment rank by one."}],realWorldApplications:["Kruskal's MST cycle detection","Dynamic connectivity: are two friends in the same social circle?","Image segmentation (connected pixel regions)"],edgeCases:["Union of already-connected elements — no-op","Path compression on very deep trees (fixes amortized cost)","Offline problems: reverse-delete order changes results"]},kmp:{topicKey:"kmp",title:"KMP String Matching (Knuth-Morris-Pratt)",category:"StringAndTrie",overview:"The classic O(N + M) string-matching algorithm that never backs up in the text by using a prefix-suffix failure table (LPS).",definition:"LPS[i] = length of the longest proper prefix of pattern[0..i] that is also a suffix. On a mismatch at j, the search resumes at LPS[j-1] instead of the start — the text pointer never moves back.",keyProperties:["Linear O(N + M) worst case — immune to adversarial inputs.","Text pointer strictly increases: each character compared once.","LPS build itself is O(M) using the same technique."],timeComplexities:[{operation:"LPS Preprocess",best:"O(M)",average:"O(M)",worst:"O(M)"},{operation:"Pattern Search",best:"O(N)",average:"O(N + M)",worst:"O(N + M)"}],spaceComplexity:"O(M) for the LPS array.",pinToPinSteps:[{stepNumber:1,title:"Build the LPS Array",explanation:"For each i, extend the current longest prefix-suffix; on mismatch fall back to LPS[prevLen-1]."},{stepNumber:2,title:"Scan Text with the Pattern Pointer",explanation:"Compare text[i] with pattern[j]. Match → advance both. Mismatch and j > 0 → j = LPS[j-1] (no text backup)."},{stepNumber:3,title:"Record Matches",explanation:"When j == M, a match ends at i; report it and set j = LPS[M-1] to find overlapping matches."}],realWorldApplications:["Find-and-replace in text editors (linear guarantees)","DNA and protein sequence search","grep-style pattern scanning in large logs"],edgeCases:["Pattern longer than text",'All-identical characters ("aaaa" in "aaaaaa")',"Empty pattern — matches at every position"]},suffixarray:{topicKey:"suffixarray",title:"Suffix Array & LCP Array",category:"StringAndTrie",overview:"The sorted array of all suffixes of a string — a compact alternative to the suffix tree enabling powerful string queries.",definition:"Suffix array SA lists starting indices of all suffixes in lexicographic order. The LCP array stores longest common prefix lengths between consecutive suffixes; SA + LCP together answer most substring queries.",keyProperties:["Built in O(N log N) via prefix doubling with radix sort.","Pattern search via binary search on SA: O(M log N).","LCP enables distinct-substring counting and longest repeated substring."],timeComplexities:[{operation:"Build (Prefix Doubling)",best:"O(N log N)",average:"O(N log N)",worst:"O(N log N)"},{operation:"Pattern Search",best:"O(M)",average:"O(M log N)",worst:"O(M log N)"},{operation:"LCP Construction (Kasai)",best:"O(N)",average:"O(N)",worst:"O(N)"}],spaceComplexity:"O(N) for SA and LCP arrays.",pinToPinSteps:[{stepNumber:1,title:"Rank by Length-2^k Blocks",explanation:"Sort suffixes by their first 2^k characters using the previous ranks as a pair."},{stepNumber:2,title:"Double Until Sorted",explanation:"Repeat k = 1, 2, 4... until all ranks are unique — at most log N rounds."},{stepNumber:3,title:"Build LCP with Kasai",explanation:"Using the SA order, reuse the previous suffix's LCP to compute the next in O(N) total."}],realWorldApplications:["Genome assembly: longest common substring of reads","Search engine suffix indexes for phrase search","Plagiarism and near-duplicate document detection"],edgeCases:["Empty string and single-character strings","All identical characters (N suffixes in N log N anyway)","Sentinel character conventions to terminate suffixes"]},rabinkarp:{topicKey:"rabinkarp",title:"Rabin-Karp String Matching (Rolling Hash)",category:"StringAndTrie",overview:"Uses a rolling polynomial hash to compare a pattern with every window of the text in O(N + M) expected time.",definition:"Hash a window as a base-b integer: H = c₀·b^(M-1) + ... + c_{M-1} mod p. Slide the window: remove the leading character and append the next in O(1), then compare hashes before verifying character-by-character.",keyProperties:["Expected O(N + M); worst case O(N × M) on hash collisions.","O(1) per window shift with modular arithmetic.","Double-hashing eliminates nearly all collisions."],timeComplexities:[{operation:"Precompute Powers",best:"O(M)",average:"O(M)",worst:"O(M)"},{operation:"Match Search",best:"O(N)",average:"O(N + M)",worst:"O(N × M)"}],spaceComplexity:"O(1) additional space beyond input.",pinToPinSteps:[{stepNumber:1,title:"Hash Pattern & First Window",explanation:"Compute hash(pattern) and hash of text[0..M-1] with the same base and modulus."},{stepNumber:2,title:"Roll the Window",explanation:"Subtract text[i]·b^(M-1), multiply the rest by b, add text[i+M]: one O(1) update per step.",formula:"h_new = ((h_old - c_old * b^(M-1)) * b + c_new) mod p"},{stepNumber:3,title:"Verify on Hash Match",explanation:"When window hash == pattern hash, compare characters to confirm — collisions are rare but possible."}],realWorldApplications:["Plagiarism detection with multiple patterns (multi-pattern variant)","Finding repeated substrings in bioinformatics","Same-filesystem deduplication (rolling hashes)"],edgeCases:["Pattern longer than text — no matches","Modulus arithmetic with negative intermediate values","Adversarial collisions if the base/modulus are known"]}};/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ax=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),nf=(...e)=>e.filter((t,n,r)=>!!t&&r.indexOf(t)===n).join(" ");/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var lx={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cx=z.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i="",children:o,iconNode:s,...l},c)=>z.createElement("svg",{ref:c,...lx,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:nf("lucide",i),...l},[...s.map(([u,d])=>z.createElement(u,d)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=(e,t)=>{const n=z.forwardRef(({className:r,...i},o)=>z.createElement(cx,{ref:o,iconNode:t,className:nf(`lucide-${ax(e)}`,r),...i}));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dx=D("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rf=D("ArrowLeftRight",[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ux=D("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const of=D("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tl=D("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eu=D("Bookmark",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sf=D("Calculator",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hx=D("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const af=D("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const px=D("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lf=D("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=D("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ei=D("CircleHelp",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=D("CirclePlay",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jo=D("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cf=D("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ui=D("CodeXml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fx=D("Compass",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76",key:"m9r19z"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mx=D("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gx=D("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oc=D("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const df=D("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yx=D("Gauge",[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uf=D("HardDrive",[["line",{x1:"22",x2:"2",y1:"12",y2:"12",key:"1y58io"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}],["line",{x1:"6",x2:"6.01",y1:"16",y2:"16",key:"sgf278"}],["line",{x1:"10",x2:"10.01",y1:"16",y2:"16",key:"1l4acy"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hf=D("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sc=D("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=D("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vx=D("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xx=D("ListOrdered",[["line",{x1:"10",x2:"21",y1:"6",y2:"6",key:"76qw6h"}],["line",{x1:"10",x2:"21",y1:"12",y2:"12",key:"16nom4"}],["line",{x1:"10",x2:"21",y1:"18",y2:"18",key:"u3jurt"}],["path",{d:"M4 6h1v4",key:"cnovpq"}],["path",{d:"M4 10h2",key:"16xx2s"}],["path",{d:"M6 18H4c0-1 2-2 2-3s-1-1.5-2-1",key:"m9a95d"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ac=D("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kx=D("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wx=D("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bx=D("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ff=D("PartyPopper",[["path",{d:"M5.8 11.3 2 22l10.7-3.79",key:"gwxi1d"}],["path",{d:"M4 3h.01",key:"1vcuye"}],["path",{d:"M22 8h.01",key:"1mrtc2"}],["path",{d:"M15 2h.01",key:"1cjtqr"}],["path",{d:"M22 20h.01",key:"1mrys2"}],["path",{d:"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",key:"bpx1uq"}],["path",{d:"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17",key:"1pd0s7"}],["path",{d:"m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7",key:"zq5xbz"}],["path",{d:"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",key:"4kbmks"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sx=D("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nx=D("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tu=D("Pin",[["line",{x1:"12",x2:"12",y1:"17",y2:"22",key:"1jrz49"}],["path",{d:"M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z",key:"13yl11"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Co=D("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mf=D("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nl=D("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rs=D("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jx=D("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cx=D("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lc=D("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gf=D("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cc=D("Shuffle",[["path",{d:"M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22",key:"1wmou1"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 6h1.9c1.5 0 2.9.9 3.6 2.2",key:"10bdb2"}],["path",{d:"M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8",key:"vgxac0"}],["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ax=D("SkipBack",[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ix=D("SkipForward",[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const is=D("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ti=D("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yf=D("Swords",[["polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5",key:"1hfsw2"}],["line",{x1:"13",x2:"19",y1:"19",y2:"13",key:"1vrmhu"}],["line",{x1:"16",x2:"20",y1:"16",y2:"20",key:"1bron3"}],["line",{x1:"19",x2:"21",y1:"21",y2:"19",key:"13pww6"}],["polyline",{points:"14.5 6.5 18 3 21 3 21 6 17.5 9.5",key:"hbey2j"}],["line",{x1:"5",x2:"9",y1:"14",y2:"18",key:"1hf58s"}],["line",{x1:"7",x2:"4",y1:"17",y2:"20",key:"pidxm4"}],["line",{x1:"3",x2:"5",y1:"19",y2:"21",key:"1pehsh"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ox=D("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dc=D("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tx=D("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ex=D("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vf=D("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uc=D("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zx=D("WandSparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xf=D("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ur=D("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Px=D("ZoomIn",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);/**
 * @license lucide-react v0.380.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fx=D("ZoomOut",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]),_x=[{key:"campaign",label:"Campaign",icon:fx},{key:"visualizer",label:"Visualizer",icon:ns},{key:"arena",label:"Arena",icon:yf},{key:"library",label:"Code Hub",icon:ui},{key:"notes",label:"Notes",icon:oc},{key:"sandbox",label:"Sandbox",icon:dc},{key:"flashcards",label:"Cards",icon:sc},{key:"dashboard",label:"Dashboard",icon:pf},{key:"compare",label:"Compare",icon:rf}],Lx=({userProgress:e,activeTab:t,setActiveTab:n,onOpenAuthModal:r})=>{const i=Object.values(e.starsPerLevel).reduce((s,l)=>s+l,0),{user:o}=nc();return a.jsx("header",{style:{position:"sticky",top:12,zIndex:100,maxWidth:"var(--max-width)",margin:"0 auto 12px",padding:"0 16px",width:"100%"},children:a.jsxs("div",{style:{background:"#FFFFFF",border:"1.5px solid var(--border-hairline)",borderRadius:"100px",padding:"6px 16px",boxShadow:"var(--shadow-md)",display:"flex",alignItems:"center",justifyContent:"space-between",height:60},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,cursor:"pointer"},onClick:()=>n("campaign"),children:[a.jsx("div",{style:{width:36,height:36,borderRadius:"50%",background:"#000000",padding:3,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"},children:a.jsx("img",{src:"/icon.png",alt:"ADSA Quest Logo",style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"},onError:s=>{s.target.style.display="none"}})}),a.jsxs("div",{children:[a.jsx("h1",{style:{fontSize:"1.1rem",fontWeight:900,letterSpacing:"-0.04em",lineHeight:1.1,color:"#000000"},children:"ADSA QUEST"}),a.jsx("span",{style:{fontSize:"0.6rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.04em",textTransform:"uppercase"},children:"30 Topics Engine"})]})]}),a.jsx("nav",{className:"desktop-only",style:{display:"flex",gap:2,background:"var(--bg-light)",padding:4,borderRadius:"100px"},children:_x.map(s=>{const l=s.icon,c=t===s.key;return a.jsxs("button",{onClick:()=>n(s.key),style:{background:c?"#000000":"transparent",color:c?"#FFFFFF":"var(--text-secondary)",border:"none",borderRadius:"100px",padding:"6px 12px",fontSize:"0.76rem",fontWeight:700,cursor:"pointer",fontFamily:"var(--font-main)",transition:"all 0.2s cubic-bezier(0.33, 1, 0.68, 1)",display:"flex",alignItems:"center",gap:5},children:[a.jsx(l,{size:14,color:c?"#FFFFFF":"var(--text-secondary)"}),s.label]},s.key)})}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,background:"#000000",color:"#FFFFFF",padding:"4px 10px",borderRadius:"100px",fontSize:"0.78rem",fontWeight:700},children:[a.jsx(ur,{size:13,color:"var(--accent-gold)"})," ",e.xp]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,background:"var(--bg-light)",color:"#000000",padding:"4px 10px",borderRadius:"100px",fontSize:"0.78rem",fontWeight:700},children:[a.jsx(ti,{size:13,color:"var(--accent-gold)",fill:"var(--accent-gold)"})," ",i]}),a.jsx(r0,{children:a.jsx("div",{style:{display:"flex",alignItems:"center",gap:8,marginLeft:4},children:a.jsx(y0,{afterSignOutUrl:"/"})})}),a.jsx(i0,{children:a.jsxs("button",{onClick:r,style:{display:"flex",alignItems:"center",gap:5,background:t==="profile"?"#000000":"var(--bg-light)",border:"1px solid var(--border-hairline)",borderRadius:"100px",padding:"4px 12px",fontSize:"0.78rem",fontWeight:700,color:t==="profile"?"#FFFFFF":"#000000",cursor:"pointer",fontFamily:"var(--font-main)",transition:"all 0.15s ease"},title:"Sign In with Clerk",children:[a.jsx(uc,{size:13,color:t==="profile"?"#FFFFFF":"#000000"}),a.jsx("span",{children:"Sign In"})]})})]})]})})},Mx=[{key:"campaign",label:"Campaign",Icon:kx},{key:"visualizer",label:"Visualizer",Icon:ns},{key:"arena",label:"Arena",Icon:yf},{key:"library",label:"Code",Icon:ui},{key:"notes",label:"Notes",Icon:oc},{key:"dashboard",label:"Dashboard",Icon:pf},{key:"profile",label:"Profile",Icon:uc}],Rx=({activeTab:e,setActiveTab:t})=>a.jsx("nav",{className:"mobile-only",style:{position:"fixed",bottom:0,left:0,right:0,height:"var(--bottom-nav-height)",zIndex:1e3,background:"#FFFFFF",borderTop:"1px solid var(--border-hairline)",display:"flex",alignItems:"center",justifyContent:"space-around",padding:"0 2px"},children:Mx.map(({key:n,label:r,Icon:i})=>{const o=e===n;return a.jsxs("button",{style:{background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:2,fontSize:"0.6rem",fontWeight:o?700:500,color:o?"#000000":"var(--text-muted)",cursor:"pointer",padding:"4px 0",fontFamily:"var(--font-main)",letterSpacing:"0.02em"},onClick:()=>t(n),children:[a.jsx(i,{size:19,strokeWidth:o?2.5:1.5,color:o?"#000000":"#999999"}),r]},n)})}),nu={Beginner:{bg:"rgba(52,199,89,0.1)",color:"#34C759"},Intermediate:{bg:"rgba(0,122,255,0.1)",color:"#007AFF"},Advanced:{bg:"rgba(255,149,0,0.1)",color:"#FF9500"},Master:{bg:"rgba(255,59,48,0.1)",color:"#FF3B30"}},Bx=({userProgress:e,onSelectLevel:t,onStartQuiz:n})=>a.jsxs("div",{style:{maxWidth:"var(--max-width)",margin:"0 auto",padding:"24px 16px"},children:[a.jsxs("div",{className:"card-black",style:{padding:"36px 28px",marginBottom:32},children:[a.jsx("span",{style:{display:"inline-block",padding:"3px 10px",borderRadius:"var(--radius-pill)",background:"rgba(255,255,255,0.15)",color:"#fff",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:12},children:"CAMPAIGN MODE"}),a.jsxs("h2",{style:{fontSize:"2rem",fontWeight:900,letterSpacing:"-0.04em",lineHeight:1.1,color:"#fff",marginBottom:8},children:["Master ADSA",a.jsx("br",{}),"Level by Level"]}),a.jsx("p",{style:{color:"rgba(255,255,255,0.6)",fontSize:"0.9rem",maxWidth:550},children:"20 progressive levels covering Trees, Graphs, Dynamic Programming & String algorithms. Watch pin-to-pin animations, study multi-language code, and earn stars."})]}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:16},children:Qe.map(r=>{const i=r.levelNumber<=e.levelUnlocked,o=e.starsPerLevel[r.id]||0;e.completedLevels.includes(r.id);const s=nu[r.difficulty]||nu.Beginner;return a.jsxs("div",{className:i?"card-light":"card-grey",style:{opacity:i?1:.55,display:"flex",flexDirection:"column",justifyContent:"space-between",position:"relative"},children:[a.jsxs("div",{children:[a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12},children:[a.jsx("span",{style:{fontSize:"2.5rem",fontWeight:900,letterSpacing:"-0.06em",color:i?"#000":"var(--text-light)",lineHeight:1},children:String(r.levelNumber).padStart(2,"0")}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsx("div",{style:{display:"flex",gap:2},children:[1,2,3].map(l=>a.jsx(ti,{size:16,fill:l<=o?"var(--accent-gold)":"transparent",color:l<=o?"var(--accent-gold)":"var(--border-light)",strokeWidth:l<=o?0:1.5},l))}),a.jsx("span",{style:{fontSize:"0.65rem",fontWeight:700,padding:"3px 8px",borderRadius:"var(--radius-pill)",background:s.bg,color:s.color,textTransform:"uppercase",letterSpacing:"0.04em"},children:r.difficulty})]})]}),a.jsx("h3",{style:{fontSize:"1.1rem",fontWeight:700,letterSpacing:"-0.02em",color:i?"#000":"var(--text-muted)",marginBottom:6},children:r.title}),a.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-secondary)",lineHeight:1.5,marginBottom:16},children:r.description})]}),a.jsxs("div",{children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12},children:[a.jsxs("span",{style:{fontSize:"0.75rem",fontWeight:700,color:"var(--text-secondary)",display:"flex",alignItems:"center",gap:4},children:[a.jsx(ur,{size:13,color:"var(--accent-orange)"})," +",r.xpReward," XP"]}),a.jsx("span",{style:{fontSize:"0.7rem",fontWeight:600,color:"var(--text-muted)"},children:r.category})]}),i?a.jsxs("div",{style:{display:"flex",gap:8},children:[a.jsxs("button",{className:"btn btn-primary btn-sm",style:{flex:1},onClick:()=>t(r),children:[a.jsx(Co,{size:14})," Visualize"]}),a.jsx("button",{className:"btn btn-secondary btn-sm",onClick:()=>n(r),children:"Quiz"})]}):a.jsxs("div",{style:{padding:"8px 14px",background:"var(--bg-grey)",borderRadius:"var(--radius-pill)",display:"flex",alignItems:"center",justifyContent:"center",gap:6,color:"var(--text-muted)",fontSize:"0.8rem",fontWeight:600},children:[a.jsx(ac,{size:14})," Complete Level ",r.levelNumber-1]})]})]},r.id)})})]}),Ao=({nodes:e,edges:t=[],minHeight:n=380})=>{const[r,i]=z.useState(1),[o,s]=z.useState({x:0,y:0}),[l,c]=z.useState(!1),[u,d]=z.useState({x:0,y:0}),h=()=>i(C=>Math.min(C+.25,2.5)),p=()=>i(C=>Math.max(C-.25,.4)),x=()=>{i(1),s({x:0,y:0})},b=C=>{c(!0),d({x:C.clientX-o.x,y:C.clientY-o.y})},v=C=>{l&&s({x:C.clientX-u.x,y:C.clientY-u.y})},A=()=>c(!1),g=600,f=400,m=g/r,w=f/r,S=-o.x/r,N=-o.y/r,T=`${S} ${N} ${m} ${w}`;return a.jsxs("div",{style:{width:"100%",height:"100%",minHeight:n,background:"#FAFAFA",borderRadius:"var(--radius-lg)",border:"1px solid var(--border-hairline)",position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",cursor:l?"grabbing":"grab"},onMouseDown:b,onMouseMove:v,onMouseUp:A,onMouseLeave:A,children:[a.jsxs("div",{style:{position:"absolute",top:12,right:12,zIndex:10,display:"flex",gap:4,background:"#FFFFFF",padding:4,borderRadius:"var(--radius-pill)",border:"1px solid var(--border-hairline)",boxShadow:"var(--shadow-xs)"},children:[a.jsx("button",{className:"btn btn-secondary btn-sm",style:{padding:"4px 8px",minHeight:26},onClick:h,title:"Zoom In",children:a.jsx(Px,{size:14})}),a.jsx("button",{className:"btn btn-secondary btn-sm",style:{padding:"4px 8px",minHeight:26},onClick:p,title:"Zoom Out",children:a.jsx(Fx,{size:14})}),a.jsxs("button",{className:"btn btn-secondary btn-sm",style:{padding:"4px 8px",minHeight:26},onClick:x,title:"Reset View",children:[a.jsx(wx,{size:14})," Fit"]})]}),e.length===0?a.jsxs("div",{style:{textAlign:"center",color:"var(--text-muted)",padding:32},children:[a.jsx("p",{style:{fontSize:"1.1rem",fontWeight:700,color:"#000",marginBottom:4},children:"Empty Canvas"}),a.jsx("p",{style:{fontSize:"0.85rem"},children:'Use the "+ Insert Node" button above to add numbers to the tree'})]}):a.jsxs("svg",{viewBox:T,style:{width:"100%",height:"100%",maxHeight:450,touchAction:"none"},children:[t.map((C,M)=>{const R=e.find(V=>V.id===C.from),L=e.find(V=>V.id===C.to);return!R||!L?null:a.jsx("line",{x1:R.x,y1:R.y,x2:L.x,y2:L.y,stroke:C.highlighted?"var(--accent-red)":"#CCCCCC",strokeWidth:C.highlighted?2.5:1.5,className:"tree-edge"},`e-${M}`)}),t.map((C,M)=>{const R=e.find(V=>V.id===C.from),L=e.find(V=>V.id===C.to);return!R||!L||C.label===void 0?null:a.jsx("text",{x:(R.x+L.x)/2,y:(R.y+L.y)/2-6,fill:"var(--text-secondary)",fontSize:"10",fontWeight:"700",textAnchor:"middle",fontFamily:"var(--font-main)",children:C.label},`el-${M}`)}),e.map(C=>{const M=C.state==="active",R=C.state==="success",L=C.state==="error",V=C.state==="warning",K=C.state==="comparing",G=L?"#FF3B30":M?"#000000":R?"#34C759":V?"#FF9500":K?"#007AFF":"#1A1A1A",ie=L?"#FF3B30":M?"#007AFF":R?"#2DA44E":K?"#007AFF":"#000000";return a.jsx("g",{className:"tree-node",style:{transform:`translate(${C.x}px, ${C.y}px)`},children:a.jsxs("g",{className:M?"node-active":void 0,style:{transformBox:"fill-box",transformOrigin:"center"},children:[a.jsx("circle",{r:"20",fill:G,stroke:ie,strokeWidth:M?3:2}),a.jsx("text",{fill:"#fff",fontSize:"12",fontWeight:"700",textAnchor:"middle",dy:"4.5",fontFamily:"var(--font-main)",children:C.value}),C.balanceFactor!==void 0&&a.jsxs("g",{transform:"translate(18, -16)",children:[a.jsx("rect",{x:"-7",y:"-9",width:"22",height:"15",rx:"4",fill:Math.abs(C.balanceFactor)>1?"#FF3B30":"#FFFFFF",stroke:Math.abs(C.balanceFactor)>1?"#FF3B30":"#E5E5E5",strokeWidth:"1"}),a.jsx("text",{fill:Math.abs(C.balanceFactor)>1?"#FFFFFF":"#000000",fontSize:"9",fontWeight:"800",textAnchor:"middle",dx:"4",dy:"3",fontFamily:"var(--font-code)",children:C.balanceFactor>0?`+${C.balanceFactor}`:C.balanceFactor})]})]})},`n-${C.id}`)})]})]})},kf=({dpMatrix:e})=>e?a.jsxs("div",{style:{width:"100%",height:"100%",minHeight:380,background:"#FAFAFA",borderRadius:"var(--radius-lg)",border:"1px solid var(--border-hairline)",padding:20,overflowX:"auto"},children:[a.jsx("h4",{style:{fontSize:"0.85rem",fontWeight:800,color:"#000",marginBottom:16,letterSpacing:"0.04em",textTransform:"uppercase"},children:"DP State Table"}),a.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem",fontFamily:"var(--font-code)"},children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{style:{padding:"10px 12px",background:"#000",color:"#fff",border:"1px solid #333",textAlign:"left",fontWeight:700},children:"Items \\ W"}),e.cols.map((t,n)=>a.jsx("th",{style:{padding:"10px 12px",background:e.activeCell&&e.activeCell[1]===n?"#000":"#1A1A1A",color:"#fff",border:"1px solid #333",textAlign:"center",fontWeight:700},children:t},n))]})}),a.jsx("tbody",{children:e.data.map((t,n)=>a.jsxs("tr",{children:[a.jsx("td",{style:{padding:"10px 12px",background:e.activeCell&&e.activeCell[0]===n?"#000":"#F5F5F5",color:e.activeCell&&e.activeCell[0]===n?"#fff":"#000",border:"1px solid var(--border-hairline)",fontWeight:700},children:e.rows[n]}),t.map((r,i)=>{const o=e.activeCell&&e.activeCell[0]===n&&e.activeCell[1]===i;return a.jsx("td",{style:{padding:"10px 12px",textAlign:"center",background:o?"#000":n%2===0?"#fff":"#FAFAFA",color:o?"#fff":typeof r=="number"&&r>0?"#000":"var(--text-muted)",border:"1px solid var(--border-hairline)",fontWeight:o?800:500,transition:"all 0.2s ease"},children:r},i)})]},n))})]})]}):null,wf=({currentStep:e,totalSteps:t,isPlaying:n,playbackSpeed:r,onPlayPause:i,onStepBack:o,onStepForward:s,onReset:l,onSpeedChange:c})=>a.jsxs("div",{className:"card-light",style:{padding:"12px 20px",marginTop:12,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[a.jsx("button",{className:"btn btn-secondary btn-icon btn-sm",onClick:l,title:"Reset",children:a.jsx(rs,{size:16})}),a.jsx("button",{className:"btn btn-secondary btn-icon btn-sm",onClick:o,disabled:e<=1,style:{opacity:e<=1?.3:1},title:"Back",children:a.jsx(Ax,{size:16})}),a.jsxs("button",{className:"btn btn-primary",onClick:i,style:{minWidth:100,gap:6},children:[n?a.jsx(Sx,{size:16}):a.jsx(Co,{size:16}),n?"Pause":"Play"]}),a.jsx("button",{className:"btn btn-secondary btn-icon btn-sm",onClick:s,disabled:e>=t,style:{opacity:e>=t?.3:1},title:"Forward",children:a.jsx(Ix,{size:16})})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[a.jsxs("span",{style:{fontSize:"0.82rem",fontWeight:600,color:"var(--text-secondary)"},children:[a.jsx("strong",{style:{color:"#000"},children:e})," / ",t]}),a.jsx("div",{style:{width:120,height:6,background:"var(--bg-grey)",borderRadius:3,overflow:"hidden"},children:a.jsx("div",{style:{width:`${t>0?e/t*100:0}%`,height:"100%",background:"#000",borderRadius:3,transition:"width 0.2s ease"}})})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[a.jsx("span",{style:{fontSize:"0.72rem",fontWeight:600,color:"var(--text-muted)",marginRight:4},children:"Speed"}),[.5,1,2,3].map(u=>a.jsxs("button",{style:{padding:"3px 8px",borderRadius:"var(--radius-pill)",fontSize:"0.72rem",fontWeight:700,background:r===u?"#000":"var(--bg-light)",color:r===u?"#fff":"var(--text-secondary)",border:"none",cursor:"pointer",fontFamily:"var(--font-main)"},onClick:()=>c(u),children:[u,"×"]},u))]})]}),bf=({currentFrame:e})=>{if(!e)return null;const{explanation:t,variableWatch:n}=e;return a.jsxs("div",{className:"panel",style:{padding:20,height:"100%",overflowY:"auto"},children:[a.jsx("h3",{style:{fontSize:"0.8rem",fontWeight:800,color:"#000",marginBottom:14,letterSpacing:"0.06em",textTransform:"uppercase"},children:"📌 Step Explanation"}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[a.jsxs("div",{className:"card-black",style:{padding:14},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:"0.7rem",fontWeight:700,color:"rgba(255,255,255,0.5)",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"},children:[a.jsx(dx,{size:13})," Action"]}),a.jsx("p",{style:{fontSize:"0.92rem",fontWeight:700,color:"#fff"},children:t.action})]}),a.jsxs("div",{style:{background:"var(--bg-light)",borderLeft:"3px solid #000",padding:"12px 14px",borderRadius:"0 8px 8px 0"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:"0.7rem",fontWeight:700,color:"var(--text-muted)",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"},children:[a.jsx(ei,{size:13})," Why"]}),a.jsx("p",{style:{fontSize:"0.88rem",color:"var(--text-body)",lineHeight:1.55},children:t.reason})]}),t.formula&&a.jsxs("div",{style:{background:"var(--bg-light)",borderLeft:"3px solid var(--accent-red)",padding:"12px 14px",borderRadius:"0 8px 8px 0"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:"0.7rem",fontWeight:700,color:"var(--accent-red)",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"},children:[a.jsx(sf,{size:13})," Formula"]}),a.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.82rem",color:"#000",display:"block"},children:t.formula})]}),n&&Object.keys(n).length>0&&a.jsxs("div",{style:{background:"var(--bg-light)",padding:"12px 14px",borderRadius:"var(--radius-md)"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:"0.7rem",fontWeight:700,color:"var(--text-muted)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"},children:[a.jsx(gx,{size:13})," Variables"]}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6},children:Object.entries(n).map(([r,i])=>a.jsxs("div",{style:{fontSize:"0.78rem"},children:[a.jsxs("span",{style:{color:"var(--text-muted)"},children:[r,": "]}),a.jsx("strong",{style:{color:"#000"},children:String(i)})]},r))})]})]})]})},qx=[{key:"cpp",label:"C++"},{key:"java",label:"Java"},{key:"python",label:"Python"},{key:"javascript",label:"JS"},{key:"csharp",label:"C#"},{key:"go",label:"Go"},{key:"rust",label:"Rust"},{key:"c",label:"C"}],rl=({codeSnippet:e,activeLineNumbers:t=[],variablesState:n})=>{var b;const r=qx.filter(v=>typeof e[v.key]=="string"),[i,o]=z.useState("cpp"),s=e[i]?i:((b=r[0])==null?void 0:b.key)||"cpp",l=n&&Object.keys(n).length>0,[c,u]=z.useState(!1),d=e[s]||"// Code snippet unavailable",h=d.split(`
`),p=Array.isArray(t)?new Set(t):new Set((t==null?void 0:t[s])||[]),x=()=>{navigator.clipboard.writeText(d),u(!0),setTimeout(()=>u(!1),2e3)};return a.jsxs("div",{className:"card-black",style:{width:"100%",height:"100%",borderRadius:"var(--radius-lg)",display:"flex",flexDirection:"column",overflow:"hidden"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px",background:"rgba(255,255,255,0.06)",borderBottom:"1px solid rgba(255,255,255,0.1)"},children:[a.jsx("div",{style:{display:"flex",gap:4,overflowX:"auto"},children:r.map(v=>a.jsx("button",{onClick:()=>o(v.key),style:{background:s===v.key?"#FFFFFF":"transparent",color:s===v.key?"#000000":"rgba(255,255,255,0.7)",border:"none",borderRadius:"100px",padding:"4px 10px",fontSize:"0.74rem",fontWeight:800,cursor:"pointer",fontFamily:"var(--font-code)"},children:v.label},v.key))}),a.jsxs("button",{onClick:x,style:{background:"transparent",color:"#FFFFFF",border:"none",fontSize:"0.74rem",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:4},children:[c?a.jsx(af,{size:14,color:"var(--accent-green)"}):a.jsx(mx,{size:14}),c?"Copied":"Copy"]})]}),a.jsx("div",{style:{flex:1,padding:"14px 16px",overflowY:"auto",fontFamily:"var(--font-code)",fontSize:"0.82rem",lineHeight:1.6},children:h.map((v,A)=>{const g=A+1,f=p.has(g);return a.jsxs("div",{style:{display:"flex",gap:14,background:f?"rgba(255, 59, 48, 0.25)":"transparent",borderLeft:f?"3px solid var(--accent-red)":"3px solid transparent",padding:"1px 8px",borderRadius:4},children:[a.jsx("span",{style:{width:22,color:"rgba(255,255,255,0.3)",userSelect:"none",textAlign:"right"},children:g}),a.jsx("span",{style:{color:f?"#FFFFFF":"rgba(255,255,255,0.85)",whiteSpace:"pre-wrap"},children:v})]},A)})}),l&&a.jsxs("div",{style:{padding:"10px 14px",background:"rgba(0,0,0,0.6)",borderTop:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:"0.72rem",fontWeight:800,color:"var(--accent-gold)",textTransform:"uppercase"},children:[a.jsx(dc,{size:14})," State Inspector:"]}),a.jsx("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:Object.entries(n||{}).map(([v,A])=>a.jsxs("span",{style:{fontSize:"0.75rem",fontFamily:"var(--font-code)",background:"rgba(255,255,255,0.12)",padding:"2px 8px",borderRadius:4,color:"#FFFFFF"},children:[a.jsx("span",{style:{color:"var(--accent-gold)"},children:v}),": ",a.jsx("strong",{children:String(A)})]},v))})]})]})},Dx=({theory:e})=>e?a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:20},children:[a.jsxs("div",{className:"card-black",style:{padding:24},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:"0.72rem",fontWeight:800,color:"var(--accent-gold)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6},children:[a.jsx(is,{size:14})," PIN-TO-PIN THEORY LESSON"]}),a.jsx("h2",{style:{fontSize:"1.6rem",fontWeight:900,color:"#FFFFFF",letterSpacing:"-0.03em",marginBottom:8},children:e.title}),a.jsx("p",{style:{fontSize:"0.95rem",color:"rgba(255, 255, 255, 0.85)",lineHeight:1.55,marginBottom:16},children:e.overview}),a.jsxs("div",{style:{background:"rgba(255,255,255,0.1)",padding:"14px 18px",borderRadius:"var(--radius-md)",borderLeft:"3px solid var(--accent-gold)"},children:[a.jsx("span",{style:{fontSize:"0.7rem",fontWeight:800,color:"var(--accent-gold)",textTransform:"uppercase",display:"block",marginBottom:2},children:"DEFINITION"}),a.jsx("p",{style:{fontSize:"0.88rem",color:"#FFFFFF",fontWeight:500,lineHeight:1.5},children:e.definition})]})]}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12},children:[a.jsxs("div",{className:"card-light",style:{padding:18},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:"0.72rem",fontWeight:800,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10},children:[a.jsx(cf,{size:15,color:"var(--accent-red)"})," Time Complexity"]}),e.timeComplexities.map((t,n)=>a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",marginBottom:4},children:[a.jsxs("span",{style:{color:"var(--text-secondary)"},children:[t.operation,":"]}),a.jsx("strong",{style:{fontFamily:"var(--font-code)",color:"#000000"},children:t.worst})]},n))]}),a.jsxs("div",{className:"card-light",style:{padding:18},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:"0.72rem",fontWeight:800,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10},children:[a.jsx(uf,{size:15,color:"var(--accent-blue)"})," Space Complexity"]}),a.jsx("div",{style:{fontSize:"0.95rem",fontWeight:800,color:"#000000",fontFamily:"var(--font-code)",marginBottom:4},children:e.spaceComplexity.split(".")[0]}),a.jsx("p",{style:{fontSize:"0.78rem",color:"var(--text-secondary)"},children:e.spaceComplexity})]})]}),a.jsxs("div",{className:"card-light",style:{padding:20},children:[a.jsxs("h4",{style:{fontSize:"0.95rem",fontWeight:800,marginBottom:12,letterSpacing:"-0.02em",display:"flex",alignItems:"center",gap:6},children:[a.jsx(sc,{size:16})," Key Mathematical Properties"]}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:e.keyProperties.map((t,n)=>a.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:8,fontSize:"0.88rem",color:"var(--text-body)",lineHeight:1.5},children:[a.jsx(Nt,{size:16,color:"var(--accent-green)",style:{marginTop:2,flexShrink:0}}),a.jsx("span",{children:t})]},n))})]}),a.jsxs("div",{className:"card-light",style:{padding:20},children:[a.jsxs("h4",{style:{fontSize:"0.95rem",fontWeight:800,marginBottom:14,letterSpacing:"-0.02em",display:"flex",alignItems:"center",gap:6},children:[a.jsx(tl,{size:16})," Pin-to-Pin Execution Steps"]}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:e.pinToPinSteps.map(t=>a.jsxs("div",{style:{background:"var(--bg-light)",padding:14,borderRadius:"var(--radius-md)",borderLeft:"3px solid #000000"},children:[a.jsxs("div",{style:{fontSize:"0.75rem",fontWeight:800,color:"#000000",marginBottom:4,textTransform:"uppercase"},children:["Step ",t.stepNumber,": ",t.title]}),a.jsx("p",{style:{fontSize:"0.88rem",color:"var(--text-body)",lineHeight:1.5,marginBottom:t.formula?8:0},children:t.explanation}),t.formula&&a.jsx("div",{style:{background:"#FFFFFF",padding:"6px 12px",borderRadius:6,border:"1px solid var(--border-hairline)"},children:a.jsxs("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.82rem",color:"var(--accent-red)"},children:[a.jsx(sf,{size:12,style:{display:"inline",marginRight:4}})," ",t.formula]})})]},t.stepNumber))})]}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:14},children:[a.jsxs("div",{className:"card-light",style:{padding:18},children:[a.jsxs("h4",{style:{fontSize:"0.9rem",fontWeight:800,marginBottom:10,color:"var(--accent-green)",display:"flex",alignItems:"center",gap:6},children:[a.jsx(Nt,{size:16})," Real-World Applications"]}),a.jsx("ul",{style:{paddingLeft:18,fontSize:"0.85rem",color:"var(--text-body)",lineHeight:1.6},children:e.realWorldApplications.map((t,n)=>a.jsx("li",{children:t},n))})]}),a.jsxs("div",{className:"card-light",style:{padding:18},children:[a.jsxs("h4",{style:{fontSize:"0.9rem",fontWeight:800,marginBottom:10,color:"var(--accent-red)",display:"flex",alignItems:"center",gap:6},children:[a.jsx(Ex,{size:16})," Edge Cases & Gotchas"]}),a.jsx("ul",{style:{paddingLeft:18,fontSize:"0.85rem",color:"var(--text-body)",lineHeight:1.6},children:e.edgeCases.map((t,n)=>a.jsx("li",{children:t},n))})]})]})]}):a.jsxs("div",{className:"card-grey",style:{textAlign:"center",padding:40},children:[a.jsx(tl,{size:32,color:"var(--text-muted)",style:{marginBottom:12}}),a.jsx("h4",{style:{fontSize:"1.1rem",fontWeight:700,marginBottom:4},children:"Select a Topic"}),a.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-muted)"},children:"Choose any topic to view detailed pin-to-pin theory and concept breakdown."})]}),Wx=({onInsertNode:e,onDeleteNode:t,onSearchNode:n,onRandomizeTree:r,onResetTree:i,onSampleTree:o})=>{const[s,l]=z.useState(""),c=h=>{h.preventDefault();const p=parseInt(s.trim());isNaN(p)||(e(p),l(""))},u=()=>{const h=parseInt(s.trim());isNaN(h)||(t(h),l(""))},d=()=>{const h=parseInt(s.trim());isNaN(h)||n(h)};return a.jsxs("div",{className:"card-light",style:{padding:"12px 18px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10},children:[a.jsxs("form",{onSubmit:c,style:{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:280},children:[a.jsx("input",{type:"number",placeholder:"Enter number (e.g. 27)...",value:s,onChange:h=>l(h.target.value),style:{width:170,padding:"8px 12px",fontSize:"0.85rem"}}),a.jsxs("button",{type:"submit",className:"btn btn-primary btn-sm",style:{gap:4},children:[a.jsx(mf,{size:14})," Insert"]}),a.jsxs("button",{type:"button",className:"btn btn-secondary btn-sm",onClick:u,style:{gap:4,color:"var(--accent-red)"},children:[a.jsx(bx,{size:14})," Delete"]}),a.jsxs("button",{type:"button",className:"btn btn-secondary btn-sm",onClick:d,style:{gap:4},children:[a.jsx(lc,{size:14})," Search"]})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[a.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:o,title:"Load this level's default sample values step by step",children:[a.jsx(sc,{size:14})," Load Sample"]}),a.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:r,title:"Generate Random Tree",children:[a.jsx(cc,{size:14})," Random Tree"]}),a.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:i,title:"Reset Tree",children:[a.jsx(nl,{size:14})," Reset"]})]})]})},$s=[{id:"q1-bst-1",levelId:"level-1-bst",question:"Which traversal of a BST outputs elements in sorted ascending order?",options:["Pre-order","In-order","Post-order","Level-order"],correctAnswerIndex:1,explanation:"In-order traversal visits (Left, Root, Right), which outputs keys in strictly sorted order.",hint:"Think about the ordering of Left, Root, Right."},{id:"q1-bst-2",levelId:"level-1-bst",question:"What is the worst-case time complexity of searching in a BST that has become skewed?",options:["O(1)","O(log N)","O(N)","O(N log N)"],correctAnswerIndex:2,explanation:"If nodes are inserted in sorted order the BST degrades to a linked list, making search O(N).",hint:"Consider the height of a degenerate tree."},{id:"q2-avl-1",levelId:"level-2-avl",question:"What is the balance factor constraint for every node in an AVL tree?",options:["Height(left) - Height(right) ∈ {-1, 0, 1}","Height <= 5","Left child count = Right child count","Balance Factor = 0 strictly"],correctAnswerIndex:0,explanation:"AVL trees enforce |Balance Factor| ≤ 1 across all nodes.",hint:"Balance Factor = Height(Left) - Height(Right)."},{id:"q2-avl-2",levelId:"level-2-avl",question:"A node has balance factor +2 and its left child has balance factor -1. Which rotation sequence fixes it?",options:["Single Left Rotation","Single Right Rotation","Left-Right (LR) Double Rotation","No rotation needed"],correctAnswerIndex:2,explanation:"Left child is right-heavy, so rotate left on the child first, then rotate right on the parent (LR case).",hint:"The imbalance is on the Left child’s Right subtree."},{id:"q3-redblack-1",levelId:"level-3-redblack",question:"Can a Red node have a Red child in a Red-Black tree?",options:["Yes, always","No, Red nodes must have Black children","Only at root","Only if leaf is black"],correctAnswerIndex:1,explanation:"No two consecutive Red nodes are allowed on any path (Red Property).",hint:"Consecutive reds violate one of the five properties."},{id:"q3-redblack-2",levelId:"level-3-redblack",question:"If a Red-Black tree has N nodes, what is the guaranteed upper bound on its height?",options:["h ≤ log₂(N)","h ≤ 2 log₂(N + 1)","h ≤ 1.44 log₂(N)","h ≤ N"],correctAnswerIndex:1,explanation:"Black height keeps the tree balanced: h ≤ 2·log₂(N+1), slightly taller than AVL but with fewer rotations.",hint:"Compare with AVL height bound 1.44 log₂(N)."},{id:"q4-heap-1",levelId:"level-4-heap",question:"For a 0-indexed heap array, what is the left child index of node i?",options:["2i","2i + 1","2i + 2","i / 2"],correctAnswerIndex:1,explanation:"In 0-indexed arrays, left child = 2i + 1 and right child = 2i + 2.",hint:"Children of root index 0 are 1 and 2."},{id:"q4-heap-2",levelId:"level-4-heap",question:"What is the time complexity of inserting into a binary heap?",options:["O(1)","O(log N)","O(N)","O(N log N)"],correctAnswerIndex:1,explanation:"Push adds at the end then sift-up travels at most the tree height, O(log N).",hint:"The heap is a complete binary tree of height log N."},{id:"q5-btree-1",levelId:"level-5-btree",question:"Why are B-Trees preferred over AVL trees for disk storage?",options:["They use less memory","They minimize disk I/O reads by having large branching factors","They are binary trees","They never split nodes"],correctAnswerIndex:1,explanation:"High branching factor reduces tree height, minimizing disk block reads.",hint:"Each node can store many keys and many children."},{id:"q5-btree-2",levelId:"level-5-btree",question:"In an order-m B-Tree, how many keys can an internal node store at most?",options:["m","m - 1","m / 2","2m"],correctAnswerIndex:1,explanation:"An internal node with m children stores at most m - 1 keys.",hint:"Children count = keys count + 1."},{id:"q6-segment-1",levelId:"level-6-segment",question:"What is the time complexity to query a range sum in a Segment Tree?",options:["O(N)","O(log N)","O(1)","O(N log N)"],correctAnswerIndex:1,explanation:"Segment tree range query decomposes into at most 2 log N subsegment nodes.",hint:"Each level contributes at most 2 node visits."},{id:"q6-segment-2",levelId:"level-6-segment",question:"What is the space complexity of a standard recursive Segment Tree on N elements?",options:["O(N)","O(4N)","O(N²)","O(log N)"],correctAnswerIndex:1,explanation:"The recursive tree allocates 4N nodes to safely cover every interval.",hint:"The array size is typically 4 × N."},{id:"q7-trie-1",levelId:"level-7-trie",question:"What is the search time complexity for a word of length L in a Trie?",options:["O(N)","O(L)","O(N log L)","O(2^L)"],correctAnswerIndex:1,explanation:"Search depends strictly on length L of target word.",hint:"Only the word length matters, not the dictionary size."},{id:"q7-trie-2",levelId:"level-7-trie",question:"What is the worst-case space used by a trie storing N words of average length L over an alphabet of size K?",options:["O(N)","O(N × L × K)","O(L)","O(N × K)"],correctAnswerIndex:1,explanation:"Each of the up to N×L nodes holds up to K child pointers, so O(N × L × K) worst case.",hint:"Count nodes and pointers per node."},{id:"q8-bfsdfs-1",levelId:"level-8-bfsdfs",question:"Which data structure is used to implement Breadth-First Search (BFS)?",options:["Stack","Queue","Priority Queue","Array"],correctAnswerIndex:1,explanation:"BFS processes vertices in FIFO order using a Queue.",hint:"FIFO order = first in, first out."},{id:"q8-bfsdfs-2",levelId:"level-8-bfsdfs",question:"BFS guarantees the shortest path in which type of graph?",options:["Weighted graphs","Unweighted graphs","Directed acyclic graphs only","Trees only"],correctAnswerIndex:1,explanation:"BFS explores by hop count, so the first time it reaches a node is via the fewest edges.",hint:"All edges have equal cost."},{id:"q9-dijkstra-1",levelId:"level-9-dijkstra",question:"Does Dijkstra's algorithm work with negative edge weights?",options:["Yes, always","No, it can get stuck in cycles or yield incorrect results","Only if graph is a tree","Only for directed graphs"],correctAnswerIndex:1,explanation:"Dijkstra assumes distances only increase; negative edges break greedy choice.",hint:"Think about the greedy finalization of a node."},{id:"q9-dijkstra-2",levelId:"level-9-dijkstra",question:"What is the time complexity of Dijkstra using a binary min-heap?",options:["O(V²)","O((V + E) log V)","O(V + E)","O(V × E)"],correctAnswerIndex:1,explanation:"Each of V extract-mins and E relaxations costs O(log V) in the heap.",hint:"Count heap operations for vertices and edges."},{id:"q10-bellmanford-1",levelId:"level-10-bellmanford",question:"How many edge relaxation passes does Bellman-Ford run?",options:["V - 1 passes","V passes","E passes","log V passes"],correctAnswerIndex:0,explanation:"A simple shortest path can have at most V-1 edges, so V-1 relaxations suffice.",hint:"A path without cycles uses at most V-1 edges."},{id:"q10-bellmanford-2",levelId:"level-10-bellmanford",question:"How does Bellman-Ford detect a negative weight cycle?",options:["A relaxation still improves a distance in the (V)-th pass","The queue becomes empty","A node is visited twice by DFS","Distances become negative"],correctAnswerIndex:0,explanation:"If any edge relaxes successfully after V-1 passes, a negative cycle exists.",hint:"Try one extra relaxation pass after V-1."},{id:"q11-mst-1",levelId:"level-11-mst",question:"What data structure makes Kruskal's MST algorithm efficient?",options:["Disjoint Set Union (DSU)","BST","Trie","Hash Table"],correctAnswerIndex:0,explanation:"DSU with path compression checks cycle formation in near O(1) time.",hint:"We need fast cycle detection while adding edges."},{id:"q11-mst-2",levelId:"level-11-mst",question:"What is the time complexity of Kruskal's MST algorithm on E edges?",options:["O(E log E)","O(V × E)","O(E)","O(V²)"],correctAnswerIndex:0,explanation:"Sorting E edges dominates: O(E log E); DSU operations are nearly O(1) each.",hint:"Which step dominates — sorting or scanning?"},{id:"q12-tarjan-1",levelId:"level-12-tarjan",question:"What is the time complexity of Tarjan's SCC algorithm?",options:["O(V + E)","O(V²)","O(V E)","O(V log V)"],correctAnswerIndex:0,explanation:"Tarjan runs a single DFS traversal visiting every vertex and edge once.",hint:"It is essentially one DFS pass."},{id:"q12-tarjan-2",levelId:"level-12-tarjan",question:"In Tarjan’s algorithm, when is a vertex u the root of a new SCC?",options:["When low[u] == disc[u]","When low[u] < disc[u]","When u is a leaf","When u has no outgoing edges"],correctAnswerIndex:0,explanation:"If no descendant can reach back above u (low[u] == disc[u]), u roots a new SCC.",hint:"Compare the low-link value with discovery time."},{id:"q13-knapsack-1",levelId:"level-13-knapsack",question:"What is the recurrence relation for 0/1 Knapsack?",options:["dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])","dp[i][w] = dp[i-1][w] + val[i]","dp[i] = dp[i-1]","dp[i] = min(wt[i])"],correctAnswerIndex:0,explanation:"Max of excluding item (dp[i-1][w]) or including item (val + dp[i-1][w-wt]).",hint:"Decide include vs exclude for each item."},{id:"q13-knapsack-2",levelId:"level-13-knapsack",question:"The 0/1 Knapsack DP table has dimensions (N+1) × (W+1). What is its time complexity?",options:["O(N × W)","O(2^N)","O(N log W)","O(N + W)"],correctAnswerIndex:0,explanation:"Every cell is filled in O(1) and there are N × W cells.",hint:"Count the cells in the table."},{id:"q14-lcs-1",levelId:"level-14-lcs",question:"If characters match at S1[i] and S2[j], what is the DP state update?",options:["1 + dp[i-1][j-1]","dp[i-1][j]","dp[i][j-1]","max(dp[i-1][j], dp[i][j-1])"],correctAnswerIndex:0,explanation:"Matching character extends previous sub-problem length by 1.",hint:"Both strings advance together."},{id:"q14-lcs-2",levelId:"level-14-lcs",question:"What is the time complexity of LCS for strings of length N and M?",options:["O(N × M)","O(N + M)","O(N log M)","O(2^(N+M))"],correctAnswerIndex:0,explanation:"The DP grid has N × M cells, each computed in O(1).",hint:"It fills a 2D table."},{id:"q15-floydwarshall-1",levelId:"level-15-floydwarshall",question:"What is the time complexity of Floyd-Warshall algorithm?",options:["O(V³)","O(V²)","O(V E)","O(V log V)"],correctAnswerIndex:0,explanation:"Uses 3 nested loops iterating through intermediate vertex k, source i, and dest j.",hint:"Three nested loops over V."},{id:"q15-floydwarshall-2",levelId:"level-15-floydwarshall",question:"What does the outer loop variable k represent in Floyd-Warshall?",options:["The intermediate vertex allowed in paths","The source vertex","The destination vertex","The number of edges"],correctAnswerIndex:0,explanation:"dp[i][j] after loop k = shortest path from i to j using intermediate vertices {0..k}.",hint:"It gradually allows more intermediate vertices."},{id:"q16-matrixchain-1",levelId:"level-16-matrixchain",question:"Matrix Chain Multiplication DP solves which problem optimization?",options:["Parenthesization ordering to minimize scalar multiplications","Matrix inversion","Eigenvalue decomposition","Determinant sum"],correctAnswerIndex:0,explanation:"Matrix multiplication is associative; choice of parentheses drastically changes operations.",hint:"Order of multiplication, not the product."},{id:"q16-matrixchain-2",levelId:"level-16-matrixchain",question:"What is the time complexity of Matrix Chain Multiplication for N matrices?",options:["O(N³)","O(N²)","O(N log N)","O(2^N)"],correctAnswerIndex:0,explanation:"The table has O(N²) subproblems and each tries O(N) splits.",hint:"N² subproblems × N split choices."},{id:"q17-dsu-1",levelId:"level-17-dsu",question:"What is the amortized time complexity per find operation with Path Compression?",options:["O(α(N)) near O(1)","O(log N)","O(N)","O(N²)"],correctAnswerIndex:0,explanation:"Path compression + rank union yields Inverse Ackermann function α(N) ≈ O(1).",hint:"It is effectively constant."},{id:"q17-dsu-2",levelId:"level-17-dsu",question:"Which two optimizations make Union-Find nearly O(1) per operation?",options:["Path Compression and Union by Rank","Balancing and Sorting","Hashing and Caching","Memoization and Recursion"],correctAnswerIndex:0,explanation:"Path compression flattens trees; union by rank keeps them shallow.",hint:"One flattens, the other keeps depth small."},{id:"q18-kmp-1",levelId:"level-18-kmp",question:"What is the worst-case time complexity of KMP algorithm?",options:["O(N + M)","O(N * M)","O(N log M)","O(N²)"],correctAnswerIndex:0,explanation:"LPS preprocessing takes O(M) and text search takes O(N).",hint:"The text pointer never moves backwards."},{id:"q18-kmp-2",levelId:"level-18-kmp",question:"What does the LPS array store at index i?",options:["Length of longest proper prefix that is also a suffix of pattern[0..i]","Number of matches so far","The last occurrence of each character","Hash value of the prefix"],correctAnswerIndex:0,explanation:"LPS[i] = length of the longest proper prefix of the pattern that is also a suffix of pattern[0..i].",hint:"Proper prefix = prefix shorter than the whole string."},{id:"q19-suffixarray-1",levelId:"level-19-suffixarray",question:"How fast can substring binary search be performed using a Suffix Array of length N?",options:["O(M log N)","O(N * M)","O(N²)","O(N log N)"],correctAnswerIndex:0,explanation:"Binary search on N sorted suffixes for pattern length M takes O(M log N).",hint:"Each comparison costs O(M)."},{id:"q19-suffixarray-2",levelId:"level-19-suffixarray",question:"What is the time complexity of building a suffix array using the doubling technique?",options:["O(N log N)","O(N²)","O(N)","O(N log² N)"],correctAnswerIndex:0,explanation:"log N doubling rounds each sorting N elements → O(N log N).",hint:"Count the doubling rounds."},{id:"q20-amortized-1",levelId:"level-20-amortized",question:"Which amortized method assigns pre-paid credit (tokens) to early operations to pay for later expensive operations?",options:["Accounting Method","Aggregate Method","Potential Method","Brute Force"],correctAnswerIndex:0,explanation:"The Accounting Method charges overcharges early operations to store credit for costly operations.",hint:"Tokens stored for future expensive steps."},{id:"q20-amortized-2",levelId:"level-20-amortized",question:"In the Potential Method, the potential function Φ is chosen so that...",options:["Total amortized cost is an upper bound on total actual cost","Φ always decreases","Φ is always zero","Φ equals the number of operations"],correctAnswerIndex:0,explanation:"Amortized cost = actual cost + ΔΦ, and with Φ_final ≥ Φ_initial the sum bounds the real cost.",hint:"Think about ΔΦ between states."},{id:"q21-fibonacci-1",levelId:"level-21-fibonacci",question:"What is the amortized time complexity of Decrease-Key in a Fibonacci Heap?",options:["O(1)","O(log N)","O(N)","O(N log N)"],correctAnswerIndex:0,explanation:"Fibonacci Heaps achieve O(1) amortized Decrease-Key via lazy tree consolidation.",hint:"Cascading cuts make it lazy and cheap on average."},{id:"q21-fibonacci-2",levelId:"level-21-fibonacci",question:"Which algorithm benefits from a Fibonacci Heap’s O(1) Decrease-Key?",options:["Dijkstra’s shortest path","Quick Sort","Binary Search","Floyd-Warshall"],correctAnswerIndex:0,explanation:"Dijkstra’s does V Decrease-Key calls, so O(E + V log V) total with a Fibonacci heap.",hint:"It has E decrease-key operations."},{id:"q22-rabinkarp-1",levelId:"level-22-rabinkarp",question:"What technique allows Rabin-Karp to compute pattern hash values in O(1) per shift?",options:["Rolling Hash Function","Binary Search","LPS Array","Prefix Tree"],correctAnswerIndex:0,explanation:"Rolling hash subtracts leading char hash and adds trailing char hash in O(1).",hint:"It reuses the previous window’s hash."},{id:"q22-rabinkarp-2",levelId:"level-22-rabinkarp",question:"What is the worst-case time complexity of Rabin-Karp on hash collisions?",options:["O(N × M)","O(N + M)","O(N log M)","O(M)"],correctAnswerIndex:0,explanation:"If many windows collide, each is verified by O(M) string comparison.",hint:"Verification is expensive on bad hashes."},{id:"q23-convexhull-1",levelId:"level-23-convexhull",question:"What is the time complexity of Graham's Scan Convex Hull algorithm?",options:["O(N log N)","O(N²)","O(N³)","O(2^N)"],correctAnswerIndex:0,explanation:"Sorting points by polar angle takes O(N log N); linear stack scan takes O(N).",hint:"Which step dominates — sorting or scanning?"},{id:"q23-convexhull-2",levelId:"level-23-convexhull",question:"In Graham Scan, a point is popped from the hull stack when its turn is...",options:["Not counter-clockwise (collinear or clockwise)","Counter-clockwise","Exactly 180° only","Any angle"],correctAnswerIndex:0,explanation:"Points creating a non-CCW turn cannot be hull vertices and are popped.",hint:"The hull boundary must turn counter-clockwise."},{id:"q24-npcomplete-1",levelId:"level-24-npcomplete",question:"What approximation ratio does the Greedy Vertex Cover algorithm guarantee?",options:["2-Approximation (Result <= 2 * OPT)","1.5-Approximation","Polynomial Exact","No bound"],correctAnswerIndex:0,explanation:"Greedy maximal matching picks both endpoints of un-covered edges, guaranteeing ≤ 2 * OPT.",hint:"Pick both endpoints of unmatched edges."},{id:"q24-npcomplete-2",levelId:"level-24-npcomplete",question:"Which statement about NP-complete problems is TRUE?",options:["If any NP-complete problem has a polynomial algorithm, all NP problems do","NP-complete problems are known to require exponential time","NP-complete problems cannot be verified in polynomial time","P ≠ NP is proven"],correctAnswerIndex:0,explanation:"NP-completeness means every NP problem reduces to it; one polynomial solution solves all of NP.",hint:"Reductions link every NP problem to NP-complete ones."},{id:"q1-bst-3",levelId:"level-1-bst",question:"Insert 50, 30, 70, 20, 40 (in that order) into an empty BST. What is the in-order traversal?",options:["20, 30, 40, 50, 70","50, 30, 20, 40, 70","20, 40, 30, 70, 50","30, 20, 40, 50, 70"],correctAnswerIndex:0,explanation:"In-order visits Left, Root, Right, so a BST always yields keys in sorted order.",hint:"In-order means Left, Root, Right."},{id:"q1-bst-4",levelId:"level-1-bst",question:"A BST contains keys 50, 30, 70, 20, 40. Which node holds the minimum key?",options:["20","30","40","70"],correctAnswerIndex:0,explanation:"The minimum key is always the leftmost node: keep following left children from the root.",hint:"Follow left children until there is no left child."},{id:"q1-bst-5",levelId:"level-1-bst",question:"The BST property says every key in a node’s left subtree is...",options:["smaller than the node’s key","larger than the node’s key","equal to the node’s key","stored in random order"],correctAnswerIndex:0,explanation:"Left subtree keys are strictly smaller; right subtree keys are strictly larger.",hint:"Left < Node < Right."},{id:"q1-bst-6",levelId:"level-1-bst",question:"Inserting keys 1, 2, 3, 4, 5 in ascending order into an empty BST produces...",options:["a skewed right chain of height 5","a perfectly balanced tree of height 2","a full binary tree","an impossible insertion sequence"],correctAnswerIndex:0,explanation:"Each key becomes the right child of the previous one, creating a degenerate chain.",hint:"Every new key is larger than the last one inserted."},{id:"q1-bst-7",levelId:"level-1-bst",question:"In a balanced BST with 1,000,000 keys, one search needs at most about how many comparisons?",options:["~20","~1,000","~500,000","~1,000,000"],correctAnswerIndex:0,explanation:"log₂(1,000,000) ≈ 20 — the search halves the remaining range each step.",hint:"Use log base 2 of the number of keys."},{id:"q1-bst-8",levelId:"level-1-bst",question:"Deleting a BST node that has two children typically replaces it with...",options:["its in-order successor (or predecessor)","a random node from the tree","its parent node","the leftmost leaf of the whole tree"],correctAnswerIndex:0,explanation:"The successor keeps the BST ordering intact when copied into the deleted slot.",hint:"Pick the smallest key larger than the node being deleted."},{id:"q1-bst-9",levelId:"level-1-bst",question:"BST root is 50, left child is 30, and 30’s right child is 40. What is the in-order successor of 40?",options:["50","30","40","none — it has no successor"],correctAnswerIndex:0,explanation:"The successor is the smallest key greater than 40 — that is the ancestor 50, since 40 has no right child.",hint:"Climb up until you take a right turn."},{id:"q1-bst-10",levelId:"level-1-bst",question:"For a BST of height h, the worst-case time to search is...",options:["O(h)","O(log n)","O(n)","O(1)"],correctAnswerIndex:0,explanation:"Search follows one root-to-leaf path of length h; with h = n the tree is degenerate.",hint:"Express it in terms of the height, not the node count."},{id:"q3-redblack-3",levelId:"level-3-redblack",question:"In a Red-Black tree, every path from a node to a descendant leaf contains the same number of...",options:["black nodes","red nodes","total nodes","null references"],correctAnswerIndex:0,explanation:"Equal black-height on every path keeps the tree approximately balanced.",hint:"The property is named after this color."},{id:"q3-redblack-4",levelId:"level-3-redblack",question:"What color is the root of every Red-Black tree?",options:["Black","Red","Depends on the insertion order","Transparent"],correctAnswerIndex:0,explanation:"The root must be black by the root property of Red-Black trees.",hint:"Red nodes can only have black children — a red root is never allowed."},{id:"q3-redblack-5",levelId:"level-3-redblack",question:"The NULL leaves (sentinels) of a Red-Black tree are treated as...",options:["black","red","transparent","gray"],correctAnswerIndex:0,explanation:"Sentinels are black so every root-to-NULL path has a consistent black-height.",hint:"They must not break the black-height invariant."},{id:"q3-redblack-6",levelId:"level-3-redblack",question:"Right after insertion, a new node is initially colored...",options:["red","black","blue","green"],correctAnswerIndex:0,explanation:"Inserting red keeps black-heights unchanged; fix-ups handle any double-red violations.",hint:"Only this color avoids changing the black-height."},{id:"q3-redblack-7",levelId:"level-3-redblack",question:"A double-red violation with a BLACK uncle is fixed by...",options:["rotating and recoloring","recoloring only","splitting the node into two","rebuilding the entire tree"],correctAnswerIndex:0,explanation:"With a black uncle, a rotation restructures the tree, then colors are fixed up.",hint:"The uncle’s color decides between recolor and rotate."},{id:"q3-redblack-8",levelId:"level-3-redblack",question:"A double-red violation with a RED uncle is fixed by...",options:["recoloring parent, uncle, and grandparent","rotating the grandparent","swapping colors with the left child","deleting the new node"],correctAnswerIndex:0,explanation:"Recoloring pushes the red conflict upward; the fix may cascade toward the root.",hint:"No rotation is needed when the uncle is red."},{id:"q3-redblack-9",levelId:"level-3-redblack",question:"The maximum height of a Red-Black tree with n internal nodes is about...",options:["2·log₂(n+1)","log₂(n+1)","n/2","√n"],correctAnswerIndex:0,explanation:"At most half of any path can be red, bounding height by 2·log₂(n+1).",hint:"Doubles the pure binary height bound."},{id:"q3-redblack-10",levelId:"level-3-redblack",question:"The black-height of a node is the number of black nodes on any path from it to a leaf...",options:["excluding the node itself, counting the black sentinel","including the node itself","counting only red nodes","counting all internal nodes"],correctAnswerIndex:0,explanation:"Black-height measures the node’s contribution downward, sentinels included.",hint:"Sentinels are black and are counted."},{id:"q4-heap-3",levelId:"level-4-heap",question:"In the 0-indexed min-heap array [2, 5, 7, 8, 9], where is the minimum value stored?",options:["index 0 (the root)","index 1","index 2","the last index"],correctAnswerIndex:0,explanation:"A heap stores its extreme value at the root, array index 0.",hint:"The root is always the minimum of a min-heap."},{id:"q4-heap-4",levelId:"level-4-heap",question:"Insert 1 into the min-heap [2, 5, 7, 8, 9] with sift-up. What is the new root?",options:["1","2","5","9"],correctAnswerIndex:0,explanation:"1 bubbles up past 7 and 2, landing at the root: [1, 2, 7, 8, 9, 5].",hint:"Swap upward while the new node is smaller than its parent."},{id:"q4-heap-5",levelId:"level-4-heap",question:"Extract-min from the min-heap [2, 5, 7, 8, 9]. After sift-down, what is the new root?",options:["5","7","8","9"],correctAnswerIndex:0,explanation:"9 moves to the root and sinks: [5, 8, 7, 9]. The new root is 5.",hint:"Remove 2, move 9 to the root, then sink it."},{id:"q4-heap-6",levelId:"level-4-heap",question:"In a 0-indexed heap array, the right child of the node at index 3 is at index...",options:["8","7","6","4"],correctAnswerIndex:0,explanation:"Right child of i is 2i + 2, so 2·3 + 2 = 8.",hint:"Left child is 2i + 1; the right child is one more."},{id:"q4-heap-7",levelId:"level-4-heap",question:"Building a heap from an unsorted array of n elements using sift-down takes...",options:["O(n)","O(n log n)","O(log n)","O(n²)"],correctAnswerIndex:0,explanation:"Most nodes are near the leaves, so the total work of sift-down heapify is linear.",hint:"Faster than inserting n elements one by one."},{id:"q4-heap-8",levelId:"level-4-heap",question:"Inserting one element into a binary heap takes...",options:["O(log n)","O(n)","O(1)","O(n log n)"],correctAnswerIndex:0,explanation:"Sift-up climbs at most the tree height, O(log n).",hint:"The height of a complete binary tree."},{id:"q4-heap-9",levelId:"level-4-heap",question:"Heapsort sorts n elements in...",options:["O(n log n)","O(n)","O(n²)","O(log n)"],correctAnswerIndex:0,explanation:"n extract-min operations at O(log n) each give O(n log n).",hint:"Multiply the number of extractions by extraction cost."},{id:"q4-heap-10",levelId:"level-4-heap",question:"A complete binary tree with 7 nodes has how many leaves?",options:["4","3","5","7"],correctAnswerIndex:0,explanation:"Nodes 3, 4, 5, 6 are leaves (0-indexed) — all internal nodes sit in the first 3 levels.",hint:"Every node in the bottom level and its neighbors without children."},{id:"q5-btree-3",levelId:"level-5-btree",question:"A B-tree of order m allows each node to hold at most...",options:["m children and m − 1 keys","m − 1 children and m keys","m keys and m children","2m keys and no children"],correctAnswerIndex:0,explanation:"An order-m node has up to m child pointers and m − 1 separator keys.",hint:"Keys separate children, so keys = children − 1."},{id:"q5-btree-4",levelId:"level-5-btree",question:"In a B-tree of order 5, the maximum number of keys inside one node is...",options:["4","5","6","3"],correctAnswerIndex:0,explanation:"Max keys = m − 1 = 4 for an order-5 B-tree.",hint:"One less than the order."},{id:"q5-btree-5",levelId:"level-5-btree",question:"When a B-tree node overflows, the tree fixes it by...",options:["splitting the node and promoting the median key","rotating the parent node","doubling the order","always creating a new root"],correctAnswerIndex:0,explanation:"The median key moves up into the parent; the node splits into two halves.",hint:"The middle key travels upward."},{id:"q5-btree-6",levelId:"level-5-btree",question:"In a B+ tree, all data values (or value pointers) are stored in the...",options:["leaves","internal nodes","root only","every level equally"],correctAnswerIndex:0,explanation:"Internal B+ tree nodes keep only keys; leaves hold the actual records, linked in order.",hint:"Internal nodes are pure index routers."},{id:"q5-btree-7",levelId:"level-5-btree",question:"A B-tree with minimum degree t = 2 requires at least how many keys in a non-root node?",options:["1","2","3","0"],correctAnswerIndex:0,explanation:"Non-root nodes must hold at least t − 1 = 1 key (and t = 2 children).",hint:"Minimum keys = t − 1."},{id:"q5-btree-8",levelId:"level-5-btree",question:"Searching one key in a B-tree with N keys and order m reads about how many disk blocks?",options:["O(log_m N)","O(N)","O(m)","O(N·m)"],correctAnswerIndex:0,explanation:"The height of a B-tree is log_m N, and one block read occurs per level.",hint:"The height of a tree with branching factor m."},{id:"q5-btree-9",levelId:"level-5-btree",question:"Why do databases prefer B-trees over binary search trees for disk storage?",options:["a much smaller height means fewer disk block reads","B-trees fit entirely in RAM","binary trees cannot be stored on disk","B-trees never need balancing"],correctAnswerIndex:0,explanation:"A large branching factor keeps the tree shallow, minimizing slow disk I/O.",hint:"Disk reads are expensive; count the levels."},{id:"q5-btree-10",levelId:"level-5-btree",question:"All leaves of a B-tree are located at...",options:["the same depth","different depths","the top level","random levels depending on inserts"],correctAnswerIndex:0,explanation:"B-tree growth happens only at the root, so every leaf stays at equal depth.",hint:"Splits push upward, never downward."},{id:"q6-segment-3",levelId:"level-6-segment",question:"A point update on a segment tree over n elements takes...",options:["O(log n)","O(n)","O(1)","O(n log n)"],correctAnswerIndex:0,explanation:"An update recomputes only the nodes on the root-to-leaf path, O(log n) of them.",hint:"Count the levels above one leaf."},{id:"q6-segment-4",levelId:"level-6-segment",question:"For an array of 5 elements, a classic iterative-free segment tree (next power of two leaves) uses an array of size...",options:["16","10","8","32"],correctAnswerIndex:0,explanation:"Next power of two ≥ 5 is 8 leaves; doubling gives 16 total cells.",hint:"Pad 5 up to a power of two, then double it."},{id:"q6-segment-5",levelId:"level-6-segment",question:"A range query in a segment tree is answered by combining at most how many node values?",options:["O(log n) nodes","O(n) nodes","exactly 2 nodes","every leaf"],correctAnswerIndex:0,explanation:"The query interval decomposes into at most 2·log n canonical segments.",hint:"Same order as a single root-to-leaf path."},{id:"q6-segment-6",levelId:"level-6-segment",question:"Lazy propagation in a segment tree...",options:["defers updates to child nodes until they are actually visited","updates every element immediately","rebuilds the whole tree on each update","stores the array twice"],correctAnswerIndex:0,explanation:"Pending range-update marks stay at higher nodes; children are updated only when needed.",hint:"Postpone work that may never be needed."},{id:"q6-segment-7",levelId:"level-6-segment",question:"Which operation is NOT naturally supported by a basic segment tree?",options:["inserting new elements into arbitrary positions","range sum queries","range minimum queries","point updates"],correctAnswerIndex:0,explanation:"A segment tree is fixed to the array size; insertions that shift indices are not natural.",hint:"Its index space is static."},{id:"q6-segment-8",levelId:"level-6-segment",question:"Building a segment tree bottom-up from n elements takes...",options:["O(n)","O(n log n)","O(log n)","O(n²)"],correctAnswerIndex:0,explanation:"Each array element is combined once into its parents — linear total work.",hint:"Every leaf contributes to O(1) merges overall."},{id:"q6-segment-9",levelId:"level-6-segment",question:"Each leaf of a segment tree represents...",options:["a single element of the array","a pair of elements","the whole array","a range minimum"],correctAnswerIndex:0,explanation:"Leaves hold single elements; internal nodes aggregate their children.",hint:"The finest granularity of the range."},{id:"q6-segment-10",levelId:"level-6-segment",question:"With the array [1, 3, 5, 7], what does a range-sum query on indices 1..2 return?",options:["8","4","9","12"],correctAnswerIndex:0,explanation:"3 + 5 = 8. Segment trees answer this by merging two node values.",hint:"Add elements at positions 1 and 2 only."},{id:"q7-trie-3",levelId:"level-7-trie",question:'In a trie, the longest common prefix of "cat" and "car" is...',options:['"ca"','"c"','"cat"','"ar"'],correctAnswerIndex:0,explanation:"Both words share the path c → a, then diverge at t vs r.",hint:"Shared path from the root."},{id:"q7-trie-4",levelId:"level-7-trie",question:'A trie stores {cat, car, cart, dog}. How many words have the prefix "ca"?',options:["3","2","4","1"],correctAnswerIndex:0,explanation:'cat, car, and cart all begin with "ca".',hint:"Count every word starting with c-a."},{id:"q7-trie-5",levelId:"level-7-trie",question:"Excluding the root, how many nodes are in a trie storing exactly {cat, car, cart}?",options:["5","4","6","3"],correctAnswerIndex:0,explanation:"Nodes: c, a, t (end of cat), r (end of car), t (end of cart) = 5.",hint:"Shared prefixes reuse the same nodes."},{id:"q7-trie-6",levelId:"level-7-trie",question:"Searching for a word of length L in a trie takes...",options:["O(L)","O(N)","O(L log N)","O(N log L)"],correctAnswerIndex:0,explanation:"The search walks exactly L characters down the trie — independent of dictionary size.",hint:"Depends only on the word length."},{id:"q7-trie-7",levelId:"level-7-trie",question:"Compared to a hash map, a trie uses...",options:["more memory for short keys, but supports ordered prefix queries","less memory always","the same memory always","no memory for shared prefixes"],correctAnswerIndex:0,explanation:"Node-per-character costs more space, but enables prefix traversal and sorting.",hint:"Trades space for prefix power."},{id:"q7-trie-8",levelId:"level-7-trie",question:"Deleting a word from a trie removes nodes only while they are...",options:["not shared and not marking another word","marked as the end of a word","at the root","red"],correctAnswerIndex:0,explanation:"Shared prefixes and terminal markers for other words must stay intact.",hint:"Stop deleting when another word depends on the node."},{id:"q7-trie-9",levelId:"level-7-trie",question:"A flag marking a node as the end of a stored word is needed because...",options:["one word can be a prefix of another","tries cannot store short words otherwise","nodes are always empty","the root needs a flag"],correctAnswerIndex:0,explanation:'Without a terminal flag, "in" and "inn" would be indistinguishable.',hint:"Words that are prefixes of other words."},{id:"q7-trie-10",levelId:"level-7-trie",question:"Sorting n strings stored in a trie (via DFS) takes...",options:["O(total number of characters)","O(n log n)","O(n²)","O(log n)"],correctAnswerIndex:0,explanation:"A pre-order DFS visits characters in sorted order — linear in total size.",hint:"Tries give sorted order for free."},{id:"q8-bfsdfs-3",levelId:"level-8-bfsdfs",question:"Graph: 0–1, 0–2, 1–3, 2–3. Starting BFS at 0 with adjacency [1, 2], the visit order is...",options:["0, 1, 2, 3","0, 1, 3, 2","0, 2, 1, 3","3, 2, 1, 0"],correctAnswerIndex:0,explanation:"BFS explores all neighbors of 0 first (1, 2), then their neighbors (3).",hint:"Level by level, FIFO queue."},{id:"q8-bfsdfs-4",levelId:"level-8-bfsdfs",question:"Same graph 0–1, 0–2, 1–3, 2–3. Starting DFS at 0, a possible visit order is...",options:["0, 1, 3, 2","0, 1, 2, 3","3, 2, 1, 0","2, 3, 1, 0"],correctAnswerIndex:0,explanation:"DFS dives along 0→1→3, then backtracks to visit 2.",hint:"Go as deep as possible before backtracking."},{id:"q8-bfsdfs-5",levelId:"level-8-bfsdfs",question:"On an unweighted graph, BFS from s finds the shortest path to every reachable vertex in terms of...",options:["number of edges","total edge weight","vertices revisited","memory used"],correctAnswerIndex:0,explanation:"BFS visits vertices in order of hop distance, giving fewest-edges paths.",hint:"It only counts hops, not weights."},{id:"q8-bfsdfs-6",levelId:"level-8-bfsdfs",question:"Which data structures power BFS and DFS respectively?",options:["queue and stack","stack and queue","priority queue and queue","array and linked list"],correctAnswerIndex:0,explanation:"BFS is FIFO (queue); DFS is LIFO (stack, explicit or recursion).",hint:"FIFO for level order, LIFO for depth."},{id:"q8-bfsdfs-7",levelId:"level-8-bfsdfs",question:"To detect a cycle in an undirected graph with DFS, you track...",options:["visited nodes plus the parent of each node","only the number of edges","edge weights","vertex degrees"],correctAnswerIndex:0,explanation:"An edge to an already-visited node that is not the parent indicates a cycle.",hint:"Going back to your parent is not a cycle."},{id:"q8-bfsdfs-8",levelId:"level-8-bfsdfs",question:"BFS and DFS on a graph with V vertices and E edges both run in...",options:["O(V + E)","O(V²)","O(V·E)","O(log V)"],correctAnswerIndex:0,explanation:"Each vertex is enqueued once and each edge examined once.",hint:"Linear in the size of the graph."},{id:"q8-bfsdfs-9",levelId:"level-8-bfsdfs",question:"A topological ordering of a graph exists if and only if the graph is...",options:["a directed acyclic graph (DAG)","connected","complete","weighted"],correctAnswerIndex:0,explanation:"Cycles make an ordering impossible; every DAG has at least one topological order.",hint:"No cycles allowed."},{id:"q8-bfsdfs-10",levelId:"level-8-bfsdfs",question:"On a weighted graph, plain BFS...",options:["may not find the cheapest path because it ignores weights","always finds the cheapest path","fails on directed graphs","needs a stack"],correctAnswerIndex:0,explanation:"BFS optimizes hop count; weights require algorithms like Dijkstra.",hint:"Weights break the level-order assumption."},{id:"q9-dijkstra-3",levelId:"level-9-dijkstra",question:"Edges: 0–1 = 4, 0–2 = 1, 2–1 = 2, 1–3 = 5, 2–3 = 6. What is Dijkstra’s shortest distance from 0 to 3?",options:["7","9","8","11"],correctAnswerIndex:0,explanation:"Path 0→2 (1) + 2→3 (6) = 7 beats 0→1→3 = 9 and 0→2→1→3 = 8.",hint:"Try the route through node 2."},{id:"q9-dijkstra-4",levelId:"level-9-dijkstra",question:"Dijkstra’s algorithm requires edge weights to be...",options:["non-negative","integers","positive primes","increasing"],correctAnswerIndex:0,explanation:"Negative edges can invalidate the greedy choice once a node is finalized.",hint:"Relaxation must never produce improving cycles."},{id:"q9-dijkstra-5",levelId:"level-9-dijkstra",question:"With a binary min-heap, Dijkstra’s total time on V vertices and E edges is...",options:["O((V + E) log V)","O(V²)","O(E log E)","O(V + E)"],correctAnswerIndex:0,explanation:"Each vertex extraction is O(log V) and each edge relaxation is O(log V).",hint:"Combine extraction and relaxation costs."},{id:"q9-dijkstra-6",levelId:"level-9-dijkstra",question:"Dijkstra’s algorithm is best classified as...",options:["a greedy algorithm","a divide-and-conquer algorithm","a backtracking algorithm","an exhaustive search"],correctAnswerIndex:0,explanation:"It greedily finalizes the closest unsettled vertex at every step.",hint:"Always take the locally cheapest frontier node."},{id:"q9-dijkstra-7",levelId:"level-9-dijkstra",question:"A vertex is finalized (its distance is certain) in Dijkstra exactly when...",options:["it is popped from the priority queue","it is first relaxed","it is discovered by BFS","the graph is fully read"],correctAnswerIndex:0,explanation:"Non-negative weights guarantee the popped distance can never improve afterwards.",hint:"The heap order guarantees the minimum is popped first."},{id:"q9-dijkstra-8",levelId:"level-9-dijkstra",question:"The very first vertex Dijkstra finalizes when starting at source s is...",options:["s itself with distance 0","the closest neighbor of s","the highest-degree vertex","a random vertex"],correctAnswerIndex:0,explanation:"s is popped first with distance 0, then its neighbors are relaxed.",hint:"The initial distance of the source."},{id:"q9-dijkstra-9",levelId:"level-9-dijkstra",question:"If all edge weights are identical, Dijkstra behaves like...",options:["BFS","DFS","merge sort","Floyd-Warshall"],correctAnswerIndex:0,explanation:"With unit weights, the heap pops in FIFO order — exactly BFS level order.",hint:"Level-by-level exploration."},{id:"q9-dijkstra-10",levelId:"level-9-dijkstra",question:"Why does Dijkstra fail with a negative edge?",options:["a finalized node could still be improved via a negative edge","negative values overflow the heap","the priority queue cannot store negatives","it needs an undirected graph"],correctAnswerIndex:0,explanation:"A negative edge can lower a finalized distance, breaking the greedy invariant.",hint:"Finalization assumes distances only grow."},{id:"q10-bellmanford-3",levelId:"level-10-bellmanford",question:"Bellman-Ford detects a negative-weight cycle by running...",options:["a V-th relaxation pass and checking for any distance improvement","a BFS from every vertex","Dijkstra twice","a topological sort"],correctAnswerIndex:0,explanation:"If distances still improve on the V-th pass, a negative cycle is reachable.",hint:"After V − 1 passes, nothing should change."},{id:"q10-bellmanford-4",levelId:"level-10-bellmanford",question:"The total time complexity of Bellman-Ford on V vertices and E edges is...",options:["O(V·E)","O(V + E)","O(V²)","O(E log V)"],correctAnswerIndex:0,explanation:"V − 1 passes, each relaxing all E edges.",hint:"Multiply passes by edges per pass."},{id:"q10-bellmanford-5",levelId:"level-10-bellmanford",question:"Unlike Dijkstra, Bellman-Ford...",options:["handles negative edge weights correctly","is faster on dense graphs","needs a priority queue","only works on trees"],correctAnswerIndex:0,explanation:"Repeated relaxation propagates improvements even from negative edges.",hint:"The weakness of greedy finalization is not present here."},{id:"q10-bellmanford-6",levelId:"level-10-bellmanford",question:"A shortest path in a graph without negative cycles contains at most...",options:["V − 1 edges","V edges","E edges","log V edges"],correctAnswerIndex:0,explanation:"Any longer path would repeat a vertex and could be shortened by removing the cycle.",hint:"Simple paths never repeat vertices."},{id:"q10-bellmanford-7",levelId:"level-10-bellmanford",question:"Bellman-Ford initializes the source distance to 0 and all others to...",options:["infinity","0","the largest edge weight","the number of vertices"],correctAnswerIndex:0,explanation:"Unknown distances start at infinity so the first relaxation sets them.",hint:"Unreachable until proven otherwise."},{id:"q10-bellmanford-8",levelId:"level-10-bellmanford",question:"If a reachable negative cycle exists, the shortest path is...",options:["undefined — distances decrease forever","still well-defined","the largest positive path","computed by BFS"],correctAnswerIndex:0,explanation:"Looping the negative cycle keeps lowering the distance without bound.",hint:"Distances never stabilize."},{id:"q10-bellmanford-9",levelId:"level-10-bellmanford",question:"A single relaxation step for edge (u, v) with weight w updates dist[v] to...",options:["min(dist[v], dist[u] + w)","dist[u] + w","dist[v] − w","max(dist[v], dist[u] + w)"],correctAnswerIndex:0,explanation:"Relaxation keeps the cheaper of the current value and the route through u.",hint:"Take the better of the two candidate distances."},{id:"q10-bellmanford-10",levelId:"level-10-bellmanford",question:"Why are V − 1 passes sufficient?",options:["a simple shortest path has at most V − 1 edges, one pass propagates it per edge","all edge weights are positive","the graph is a tree","each pass doubles the covered distance"],correctAnswerIndex:0,explanation:"The k-th pass finalizes all paths with up to k edges; V − 1 covers every simple path.",hint:"Paths stop growing beyond V − 1 edges."},{id:"q11-mst-3",levelId:"level-11-mst",question:"Kruskal’s algorithm builds an MST by...",options:["sorting edges by weight and adding them if they do not create a cycle","growing one tree from a start vertex","running BFS on the complement","doubling edges repeatedly"],correctAnswerIndex:0,explanation:"The global minimum edge is tried first; DSU rejects edges forming cycles.",hint:"Think globally sorted edges."},{id:"q11-mst-4",levelId:"level-11-mst",question:"Prim’s algorithm grows the MST from a start vertex by repeatedly...",options:["adding the cheapest edge crossing the current cut","sorting all edges once","removing the heaviest cycle edge","merging two forests randomly"],correctAnswerIndex:0,explanation:"Prim expands a single tree using the minimum-weight edge to an outside vertex.",hint:"One connected component from the start."},{id:"q11-mst-5",levelId:"level-11-mst",question:"An MST of a graph with V vertices always contains exactly...",options:["V − 1 edges","V edges","E edges","V/2 edges"],correctAnswerIndex:0,explanation:"A spanning tree on V vertices is minimally connected with V − 1 edges.",hint:"One less than the vertex count."},{id:"q11-mst-6",levelId:"level-11-mst",question:"The cut property states that the minimum-weight edge crossing any cut is...",options:["safe to include in some MST","never in any MST","always in every MST","irrelevant to MSTs"],correctAnswerIndex:0,explanation:"The lightest crossing edge is part of at least one minimum spanning tree.",hint:"The foundation of Kruskal and Prim correctness."},{id:"q11-mst-7",levelId:"level-11-mst",question:"After sorting, Kruskal’s algorithm runs in...",options:["O(E log E)","O(V²)","O(V + E)","O(E log V + V log V) for the DSU part only — sorting dominates"],correctAnswerIndex:0,explanation:"Sorting the E edges dominates the near-linear DSU processing.",hint:"The sort decides the total cost."},{id:"q11-mst-8",levelId:"level-11-mst",question:"Prim’s algorithm with a binary heap runs in...",options:["O(E log V)","O(V²)","O(E log E)","O(V + E)"],correctAnswerIndex:0,explanation:"Each of the E edges relaxes a heap key in O(log V).",hint:"Heap operations per edge."},{id:"q11-mst-9",levelId:"level-11-mst",question:"The cycle property states that the heaviest edge on any cycle is...",options:["never part of any MST","always part of every MST","the first edge chosen by Kruskal","irrelevant"],correctAnswerIndex:0,explanation:"Removing the heaviest cycle edge always yields a cheaper spanning tree.",hint:"A heaviest cycle edge can be safely deleted."},{id:"q11-mst-10",levelId:"level-11-mst",question:"Edges: 0–1 = 1, 1–2 = 2, 0–2 = 3, 1–3 = 4. What is the total weight of the MST?",options:["7","6","10","8"],correctAnswerIndex:0,explanation:"Kruskal picks 1 (0–1), 2 (1–2), then skips 3 (0–2 forms a cycle) and takes 4 (1–3): total 7.",hint:"Skip the edge that closes a cycle."},{id:"q12-tarjan-3",levelId:"level-12-tarjan",question:"A Strongly Connected Component (SCC) is a maximal set of vertices where...",options:["every vertex is reachable from every other vertex","all vertices have equal degree","no vertex has outgoing edges","every pair shares an edge"],correctAnswerIndex:0,explanation:"Mutual reachability within the set defines an SCC.",hint:"Mutually reachable, both directions."},{id:"q12-tarjan-4",levelId:"level-12-tarjan",question:"Tarjan’s algorithm finds SCCs using...",options:["one DFS with discovery times and low-link values","repeated BFS passes","edge sorting","Dijkstra with modified weights"],correctAnswerIndex:0,explanation:"Disc numbers and low-links let Tarjan pop SCCs during a single DFS.",hint:"A single pass over the graph."},{id:"q12-tarjan-5",levelId:"level-12-tarjan",question:"In a DAG, how many SCCs are there?",options:["one per vertex","exactly one","as many as edges","zero"],correctAnswerIndex:0,explanation:"With no cycles, no two vertices are mutually reachable.",hint:"Every SCC needs a cycle."},{id:"q12-tarjan-6",levelId:"level-12-tarjan",question:"The condensation graph (SCCs as super-vertices) is always...",options:["a DAG","strongly connected","a tree","complete"],correctAnswerIndex:0,explanation:"A cycle between SCCs would merge them into a single SCC.",hint:"Cycles among components are impossible."},{id:"q12-tarjan-7",levelId:"level-12-tarjan",question:"Tarjan’s algorithm runs in...",options:["O(V + E)","O(V²)","O(V·E)","O(E log V)"],correctAnswerIndex:0,explanation:"Every vertex and edge is touched once during the single DFS.",hint:"Linear in graph size."},{id:"q12-tarjan-8",levelId:"level-12-tarjan",question:"A vertex v is the root of an SCC when...",options:["low[v] equals discovery time of v","low[v] is maximal","v has no outgoing edges","v is visited last"],correctAnswerIndex:0,explanation:"When the low-link cannot climb higher, v roots the component being popped.",hint:"The low-link bottoms out at v."},{id:"q12-tarjan-9",levelId:"level-12-tarjan",question:"The graph 0 → 1 → 2 → 0 (a single directed cycle) contains how many SCCs?",options:["1","2","3","0"],correctAnswerIndex:0,explanation:"All three vertices are mutually reachable around the cycle.",hint:"Every vertex can reach every other."},{id:"q12-tarjan-10",levelId:"level-12-tarjan",question:"Tarjan outputs SCCs in an order that is...",options:["the reverse of a topological order of the condensation DAG","a random order","sorted by vertex degree","sorted by edge weight"],correctAnswerIndex:0,explanation:"The first completed SCCs have no incoming edges in the condensation, giving reverse topo order.",hint:"First finished = sink component."},{id:"q13-knapsack-3",levelId:"level-13-knapsack",question:"Items (weight, value): (2, 3), (3, 4), (4, 5) with capacity 5. What is the maximum 0/1 value?",options:["7","5","9","6"],correctAnswerIndex:0,explanation:"Items 1 + 2 (weight 5) give 3 + 4 = 7; item 3 alone gives only 5.",hint:"Try the two lightest items together."},{id:"q13-knapsack-4",levelId:"level-13-knapsack",question:'The "0/1" in 0/1 Knapsack means each item can be taken...',options:["at most once (take or leave)","any number of times","only half of it","only with its neighbor"],correctAnswerIndex:0,explanation:"Each item is either fully included or fully excluded.",hint:"Binary decision per item."},{id:"q13-knapsack-5",levelId:"level-13-knapsack",question:"The unbounded knapsack variant differs by allowing...",options:["unlimited copies of each item","fractional items","negative weights","no capacity limit"],correctAnswerIndex:0,explanation:"Unbounded reuses items across the DP, unlike the 0/1 restriction.",hint:"Items are available in infinite supply."},{id:"q13-knapsack-6",levelId:"level-13-knapsack",question:"The classic 0/1 knapsack DP table for n items and capacity W has dimensions...",options:["(n + 1) × (W + 1)","n × W","(n − 1) × W","n × n"],correctAnswerIndex:0,explanation:"Rows track item prefix, columns track capacity.",hint:"Both indices plus a zero row and column."},{id:"q13-knapsack-7",levelId:"level-13-knapsack",question:"Why is greedy (highest value/weight ratio first) wrong for 0/1 knapsack?",options:["an item that looks efficient may block two better light items","weights are always negative","greedy only works on trees","capacities are infinite"],correctAnswerIndex:0,explanation:"0/1 indivisibility means local ratio choices miss global optima.",hint:"Fractional knapsack is greedy; 0/1 is not."},{id:"q13-knapsack-8",levelId:"level-13-knapsack",question:"The 0/1 knapsack DP runs in O(n·W), which is called...",options:["pseudo-polynomial (polynomial in the input value W, not its bit-length)","fully polynomial","exponential always","linear in n only"],correctAnswerIndex:0,explanation:"W is a number, not input size; log W bits encode it.",hint:"Depends on the magnitude of W."},{id:"q13-knapsack-9",levelId:"level-13-knapsack",question:"In the 0/1 recurrence, the option that skips item i is expressed as...",options:["dp[i − 1][w]","dp[i][w − 1]","dp[i − 1][w − wt]","dp[0][w]"],correctAnswerIndex:0,explanation:"Skipping means the best value for items 1..i−1 at the same capacity.",hint:"Previous row, same capacity."},{id:"q13-knapsack-10",levelId:"level-13-knapsack",question:"Three items each of weight 1 with values 5, 7, 9, and capacity 3. The maximum value is...",options:["21","12","16","9"],correctAnswerIndex:0,explanation:"All three fit (total weight 3): 5 + 7 + 9 = 21.",hint:"Take everything — it all fits."},{id:"q14-lcs-3",levelId:"level-14-lcs",question:'The length of the LCS of "ABCBDAB" and "BDCABA" is...',options:["4","5","3","6"],correctAnswerIndex:0,explanation:'A longest common subsequence such as "BCBA" or "BDAB" has length 4.',hint:'Try "B-C-B-A" or "B-D-A-B".'},{id:"q14-lcs-4",levelId:"level-14-lcs",question:'The LCS of "ABC" and "DEF" has length...',options:["0","1","2","3"],correctAnswerIndex:0,explanation:"The two strings share no common characters at all.",hint:"No character appears in both strings."},{id:"q14-lcs-5",levelId:"level-14-lcs",question:"The two-row DP trick reduces the LCS memory from O(m·n) to...",options:["O(min(m, n)) space (two rows)","O(m·n) still","O(m + n)²","O(1) always"],correctAnswerIndex:0,explanation:"Each cell only needs the previous row, so two rows suffice.",hint:"Only the last row matters."},{id:"q14-lcs-6",levelId:"level-14-lcs",question:"When S1[i] and S2[j] differ, the DP update is...",options:["max(dp[i − 1][j], dp[i][j − 1])","1 + dp[i − 1][j − 1]","dp[i − 1][j − 1]","dp[i][j] + 1"],correctAnswerIndex:0,explanation:"One of the characters cannot extend the subsequence, so we keep the better prefix result.",hint:"Best of dropping either character."},{id:"q14-lcs-7",levelId:"level-14-lcs",question:"The LCS DP runs in O(m·n) time for strings of lengths m and n. This is because...",options:["every pair of positions is combined once","a single loop over the longer string","binary search per character","only matching pairs are visited"],correctAnswerIndex:0,explanation:"The table of m×n cells is filled cell by cell with O(1) work each.",hint:"Count the table cells."},{id:"q14-lcs-8",levelId:"level-14-lcs",question:'The length of the LCS of "AGGTAB" and "GXTXAYB" is...',options:["4","5","6","3"],correctAnswerIndex:0,explanation:'A longest common subsequence is "GTAB", length 4.',hint:"G-T-A-B appears in both in order."},{id:"q14-lcs-9",levelId:"level-14-lcs",question:"Reconstructing the actual LCS sequence follows...",options:["the diagonal (match) and top/left (max) moves backwards from the last cell","the first row left to right","a random walk","the largest values only"],correctAnswerIndex:0,explanation:"Backtracking records diagonal moves as matched characters.",hint:"Diagonal = take the character."},{id:"q14-lcs-10",levelId:"level-14-lcs",question:'The LCS of "abc" and "abc" has length...',options:["3","2","1","0"],correctAnswerIndex:0,explanation:"Identical strings share the whole string as a common subsequence.",hint:"The strings are equal."},{id:"q15-floydwarshall-3",levelId:"level-15-floydwarshall",question:"Edges: 0–1 = 3, 0–2 = 8, 1–2 = 2. What is the shortest distance from 0 to 2?",options:["5","8","13","3"],correctAnswerIndex:0,explanation:"Going through vertex 1: 3 + 2 = 5 beats the direct edge of 8.",hint:"Route through the intermediate vertex."},{id:"q15-floydwarshall-4",levelId:"level-15-floydwarshall",question:"Floyd-Warshall detects a negative-weight cycle when, after the algorithm, ...",options:["any dist[i][i] becomes negative","all dist[i][j] are negative","dist[i][j] equals infinity","the diagonal stays zero"],correctAnswerIndex:0,explanation:"A negative cycle lets some vertex reach itself with negative cost.",hint:"Check the diagonal of the final matrix."},{id:"q15-floydwarshall-5",levelId:"level-15-floydwarshall",question:"Floyd-Warshall runs in O(V³) time and uses...",options:["O(V²) space","O(V³) space","O(E) space","O(log V) space"],correctAnswerIndex:0,explanation:"One V×V distance matrix (plus an optional next matrix) is stored.",hint:"All-pairs table size."},{id:"q15-floydwarshall-6",levelId:"level-15-floydwarshall",question:"Path reconstruction after Floyd-Warshall is done with...",options:["a next[i][j] matrix recording the first vertex on each path","a separate BFS tree","the distance matrix alone","a suffix array"],correctAnswerIndex:0,explanation:"The next matrix is updated whenever a path is improved through k.",hint:"Remember who leads into j from i."},{id:"q15-floydwarshall-7",levelId:"level-15-floydwarshall",question:"Floyd-Warshall handles negative edge weights as long as...",options:["there are no negative-weight cycles","all weights are even","the graph is undirected","V is small"],correctAnswerIndex:0,explanation:"Negative edges are fine; only negative cycles break shortest paths.",hint:"Same condition as Bellman-Ford."},{id:"q15-floydwarshall-8",levelId:"level-15-floydwarshall",question:"The intermediate-vertex loop (k) in Floyd-Warshall must be...",options:["the outermost loop","the innermost loop","replaced by a queue","run in reverse order"],correctAnswerIndex:0,explanation:"All pairs must consider k before k + 1 to keep distances consistent.",hint:"Order of the three loops matters."},{id:"q15-floydwarshall-9",levelId:"level-15-floydwarshall",question:"The core recurrence of Floyd-Warshall is...",options:["dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])","dist[i][j] = dist[i][j] + dist[k][k]","dist[i][j] = max(dist[i][k], dist[k][j])","dist[i][j] = dist[k][i] − dist[j][k]"],correctAnswerIndex:0,explanation:"Every pair may improve by routing through intermediate k.",hint:"Combine two halves through k."},{id:"q15-floydwarshall-10",levelId:"level-15-floydwarshall",question:"After the algorithm, the final distance matrix contains...",options:["shortest distances for all V² vertex pairs","distances for the current level only","only direct edges","MST edge weights"],correctAnswerIndex:0,explanation:"All-pairs output: one row and column per vertex.",hint:"Every ordered pair gets an entry."},{id:"q16-matrixchain-3",levelId:"level-16-matrixchain",question:"Multiplying a 10×20 matrix by a 20×30 matrix needs how many scalar multiplications?",options:["6000","200","300","600"],correctAnswerIndex:0,explanation:"10·20·30 = 6000 multiplications for the resulting 10×30 product.",hint:"Multiply the three dimensions."},{id:"q16-matrixchain-4",levelId:"level-16-matrixchain",question:"A = 10×30, B = 30×5, C = 5×60. What is the minimum cost to multiply the chain?",options:["4500","27000","9000","18000"],correctAnswerIndex:0,explanation:"(AB)C costs 1500 + 3000 = 4500; A(BC) costs 9000 + 18000 = 27000.",hint:"Compute both parenthesizations and compare."},{id:"q16-matrixchain-5",levelId:"level-16-matrixchain",question:"The matrix-chain recurrence is dp[i][j] = min over k of...",options:["dp[i][k] + dp[k+1][j] + p[i−1]·p[k]·p[j]","dp[i][k] + dp[k+1][j]","p[i−1]·p[k]·p[j]","dp[i][j−1] + p[i]·p[j]"],correctAnswerIndex:0,explanation:"Split at k, solve both halves, then pay the cost of combining the products.",hint:"Split, solve, combine — with dimensions p."},{id:"q16-matrixchain-6",levelId:"level-16-matrixchain",question:"A chain of n matrices must be split into how many pairs of sub-chains at each split?",options:["n − 1 possible split positions (k = 1..n−1)","n positions","exactly 2","n/2 positions"],correctAnswerIndex:0,explanation:"The chain can be cut after any of the first n − 1 matrices.",hint:"One fewer split point than matrices."},{id:"q16-matrixchain-7",levelId:"level-16-matrixchain",question:"The matrix-chain DP table size is...",options:["n × n","n × n × n","2n × 2n","(n−1) × (n−1)"],correctAnswerIndex:0,explanation:"One cell per (i, j) interval of the chain.",hint:"All intervals of matrices."},{id:"q16-matrixchain-8",levelId:"level-16-matrixchain",question:"Matrix-chain multiplication DP runs in...",options:["O(n³)","O(n²)","O(n log n)","O(2^n)"],correctAnswerIndex:0,explanation:"n² intervals, each scanning up to n split positions.",hint:"Intervals × split points."},{id:"q16-matrixchain-9",levelId:"level-16-matrixchain",question:"Why can two parenthesizations of the same chain differ hugely in cost?",options:["matrix multiplication is associative but the number of scalar multiplications is not","matrices do not exist otherwise","dimensions change after multiplication","only square matrices can be multiplied"],correctAnswerIndex:0,explanation:"(AB)C and A(BC) give the same product but different inner dimensions.",hint:"The intermediate matrix size changes the cost."},{id:"q16-matrixchain-10",levelId:"level-16-matrixchain",question:"The optimal k recorded for each interval enables...",options:["reconstructing the optimal parenthesization","sorting the matrices","inverting the product","estimating memory"],correctAnswerIndex:0,explanation:"Tracing the recorded split points yields the full parenthesization.",hint:"Each cell remembers its best split."},{id:"q17-dsu-3",levelId:"level-17-dsu",question:"Path compression in DSU makes find()...",options:["point every node on the path directly to the root","double the tree height","merge two roots","swap the ranks"],correctAnswerIndex:0,explanation:"Flattening keeps future finds nearly O(1).",hint:"Flatten the path during the climb."},{id:"q17-dsu-4",levelId:"level-17-dsu",question:"Union by rank attaches...",options:["the smaller tree under the larger tree","the larger tree under the smaller one","both roots together randomly","every node to the first root"],correctAnswerIndex:0,explanation:"Keeping trees shallow prevents tall chains.",hint:"Short tree under tall tree."},{id:"q17-dsu-5",levelId:"level-17-dsu",question:"The two classic DSU optimizations are...",options:["path compression and union by rank","path splitting and heap ordering","binary lifting and memoization","red-black rebalancing and rotation"],correctAnswerIndex:0,explanation:"Together they achieve nearly constant amortized operations.",hint:"One flattens, one keeps trees short."},{id:"q17-dsu-6",levelId:"level-17-dsu",question:"With N = 5, after union(0,1), union(2,3), union(1,2), how many disjoint sets remain?",options:["2","3","4","5"],correctAnswerIndex:0,explanation:"{0,1,2,3} forms one set; {4} is alone: 2 sets total.",hint:"Chain the unions together."},{id:"q17-dsu-7",levelId:"level-17-dsu",question:"The find(x) operation returns...",options:["the representative (root) of x’s set","the parent of x","the size of x’s set","the depth of x"],correctAnswerIndex:0,explanation:"The root identifies the set; all members share it.",hint:"The unique set identifier."},{id:"q17-dsu-8",levelId:"level-17-dsu",question:"DSU is the key structure that makes which algorithm efficient?",options:["Kruskal’s MST","Dijkstra’s shortest path","merge sort","KMP pattern search"],correctAnswerIndex:0,explanation:"DSU answers the cycle question for each candidate edge in near O(1).",hint:"Cycle detection in edge processing."},{id:"q17-dsu-9",levelId:"level-17-dsu",question:"After k successful unions among N isolated elements (no merges within a set), the number of sets is...",options:["N − k","N + k","k","N"],correctAnswerIndex:0,explanation:"Each union merges two distinct sets, reducing the count by one.",hint:"Each union removes one set."},{id:"q17-dsu-10",levelId:"level-17-dsu",question:"The amortized cost of find() with both optimizations is...",options:["O(α(N)) — effectively O(1)","O(log N)","O(N)","O(N²)"],correctAnswerIndex:0,explanation:"The inverse Ackermann function grows so slowly it is constant in practice.",hint:"Tiny, tiny growth rate."},{id:"q18-kmp-3",levelId:"level-18-kmp",question:'The LPS array of the pattern "AAAA" is...',options:["[0, 1, 2, 3]","[0, 0, 0, 0]","[1, 1, 1, 1]","[0, 1, 1, 1]"],correctAnswerIndex:0,explanation:'Each prefix "A", "AA", "AAA", "AAAA" is its own longest border.',hint:"Every prefix is a prefix of itself."},{id:"q18-kmp-4",levelId:"level-18-kmp",question:'The LPS array of the pattern "ABAB" is...',options:["[0, 0, 1, 2]","[0, 1, 2, 3]","[0, 0, 0, 0]","[1, 0, 1, 0]"],correctAnswerIndex:0,explanation:'LPS(3) = 2 because "AB" is both prefix and suffix of "ABAB".',hint:"Longest proper prefix that is also a suffix."},{id:"q18-kmp-5",levelId:"level-18-kmp",question:"When text[i] mismatches pattern[j], KMP continues with...",options:["j = lps[j − 1] (no backtracking in the text)","j = 0 and i = i + 1","i = i − 1","j = pattern.length"],correctAnswerIndex:0,explanation:"The failure function reuses the matched prefix instead of rescanning.",hint:"The text pointer never moves back."},{id:"q18-kmp-6",levelId:"level-18-kmp",question:"After finding a full match at text[i], KMP continues searching for overlapping matches with...",options:["j = lps[j − 1]","j = 0","i = i + j","j = j − 1"],correctAnswerIndex:0,explanation:"The border of the full pattern enables overlapping occurrences.",hint:"The failure function again."},{id:"q18-kmp-7",levelId:"level-18-kmp",question:"KMP preprocesses the pattern in O(M) and scans the text in O(N), giving total...",options:["O(N + M)","O(N·M)","O(N log M)","O(N²)"],correctAnswerIndex:0,explanation:"The text is scanned exactly once with the LPS array doing the work.",hint:"Linear in both inputs."},{id:"q18-kmp-8",levelId:"level-18-kmp",question:"LPS[i] is defined as the length of the longest proper prefix of pattern[0..i] that is also a...",options:["suffix of pattern[0..i]","prefix of pattern[0..i−1]","substring of the text","palindrome"],correctAnswerIndex:0,explanation:"The border is a prefix that also ends the substring.",hint:"Same string at both ends."},{id:"q18-kmp-9",levelId:"level-18-kmp",question:'For the pattern "AAACAAAA", lps[7] (the last character) equals...',options:["3","2","4","0"],correctAnswerIndex:0,explanation:'The longest border of "AAACAAAA" is "AAA" (length 3).',hint:'Suffix "AAA" matches the prefix "AAA".'},{id:"q18-kmp-10",levelId:"level-18-kmp",question:"A key property of KMP is that the text pointer i...",options:["never moves backwards","moves back to i − lps[j]","restarts at each match","moves twice per character"],correctAnswerIndex:0,explanation:"Linear scanning is guaranteed because i only ever increments.",hint:"One forward pass over the text."},{id:"q19-suffixarray-3",levelId:"level-19-suffixarray",question:'The suffixes of "banana" sorted lexicographically start with...',options:['"a", "ana", "anana", "banana", "na", "nana"','"banana", "anana", "nana", "ana", "na", "a"','"a", "na", "ana", "nana", "anana", "banana"','"banana", "a", "ana", "anana", "na", "nana"'],correctAnswerIndex:0,explanation:'Lexicographic order: single "a" first, then longer a-suffixes, etc.',hint:"Sort like words in a dictionary."},{id:"q19-suffixarray-4",levelId:"level-19-suffixarray",question:'For "banana", the suffix array (start indices in sorted order) begins with index...',options:['5 (suffix "a")','0 (suffix "banana")','4 (suffix "na")','2 (suffix "nana")'],correctAnswerIndex:0,explanation:'The smallest suffix is the last character "a" at index 5.',hint:"The smallest suffix starts with the smallest character."},{id:"q19-suffixarray-5",levelId:"level-19-suffixarray",question:"The LCP array stores, for consecutive suffixes in the suffix array, ...",options:["the length of their longest common prefix","the distance between their start indices","their total length","the number of shared characters at the end"],correctAnswerIndex:0,explanation:"LCP[i] = length of the common prefix of SA[i−1] and SA[i].",hint:"Shared beginning length of neighbors."},{id:"q19-suffixarray-6",levelId:"level-19-suffixarray",question:"With a suffix array of length N, searching a pattern of length M takes...",options:["O(M log N)","O(N + M)","O(N·M)","O(log N)"],correctAnswerIndex:0,explanation:"Binary search compares the pattern with suffixes, each comparison O(M).",hint:"Binary search with a per-comparison cost."},{id:"q19-suffixarray-7",levelId:"level-19-suffixarray",question:"The number of distinct substrings of a string of length N can be computed as...",options:["N(N+1)/2 − sum(LCP array)","N(N+1)/2","sum of the suffix array","N² − LCP[0]"],correctAnswerIndex:0,explanation:"Subtracting shared prefix lengths removes the duplicates among all suffixes.",hint:"All substrings minus repeated prefixes."},{id:"q19-suffixarray-8",levelId:"level-19-suffixarray",question:"Suffix arrays are typically built in...",options:["O(N log N) with the doubling method","O(N²) always","O(2^N)","O(N log² N) only for palindromes"],correctAnswerIndex:0,explanation:"The doubling algorithm sorts suffixes by 1, 2, 4, ... character ranks in O(N log N).",hint:"Sort by powers of two lengths."},{id:"q19-suffixarray-9",levelId:"level-19-suffixarray",question:'For "banana", the LCP of the consecutive suffixes "ana" and "anana" is...',options:["3","2","1","0"],correctAnswerIndex:0,explanation:'Both share the full prefix "ana".',hint:"Compare character by character."},{id:"q19-suffixarray-10",levelId:"level-19-suffixarray",question:"The suffix array combined with the LCP array is the classic tool for finding...",options:["the longest repeated substring","the shortest unique prefix only","MST weights","sorted BST output"],correctAnswerIndex:0,explanation:"The maximum value in the LCP array gives the longest repeated substring.",hint:"The biggest shared prefix of neighbors."},{id:"q20-amortized-3",levelId:"level-20-amortized",question:"The amortized cost per append to a dynamically resizing (doubling) array is...",options:["O(1)","O(n)","O(log n)","O(n²)"],correctAnswerIndex:0,explanation:"A resize costing O(n) is paid for by n cheap appends — O(1) per operation on average.",hint:"Aggregate the total over n operations."},{id:"q20-amortized-4",levelId:"level-20-amortized",question:"The Potential Method defines a potential function Φ such that...",options:["amortized cost = actual cost + ΔΦ","amortized cost = actual cost − ΔΦ","Φ must be negative","Φ equals the operation count"],correctAnswerIndex:0,explanation:'The change in potential stores "saved work" from cheap operations to pay for future ones.',hint:"The potential bank account."},{id:"q20-amortized-5",levelId:"level-20-amortized",question:"The Accounting Method works by...",options:["overcharging cheap operations so the surplus pays for rare expensive ones","undercharging all operations equally","running each operation twice","precomputing all costs"],correctAnswerIndex:0,explanation:"Credit accumulated on cheap operations funds the expensive ones later.",hint:"Pre-paid tokens."},{id:"q20-amortized-6",levelId:"level-20-amortized",question:"The Aggregate Method computes...",options:["total worst-case cost of n operations divided by n","the cost of the most expensive operation","the median operation cost","the sum of all input sizes"],correctAnswerIndex:0,explanation:"Averaging the total over all operations gives the amortized bound.",hint:"Divide the grand total by the operation count."},{id:"q20-amortized-7",levelId:"level-20-amortized",question:"A stack supporting push, pop, and multipop has amortized cost...",options:["O(1) per operation","O(n) per operation","O(log n) per operation","O(n²) per operation"],correctAnswerIndex:0,explanation:"Each element is pushed once and popped once — total work is O(n) for n operations.",hint:"Every pop removes an element that was pushed."},{id:"q20-amortized-8",levelId:"level-20-amortized",question:"Incrementing a binary counter n times flips at most...",options:["2n bits total","n² bits","n log n bits","n bits total"],correctAnswerIndex:0,explanation:"Each increment flips all trailing 1s and the next 0 — bit i flips every 2^i increments, summing to ≤ 2n.",hint:"Sum the flip frequencies across bits."},{id:"q20-amortized-9",levelId:"level-20-amortized",question:"Amortized analysis is...",options:["a worst-case bound averaged over a sequence, not an average-case analysis","the same as average-case analysis","an upper bound on a single operation","a randomized expectation"],correctAnswerIndex:0,explanation:"It is worst-case over the sequence — no probability involved.",hint:"Deterministic, but over many operations."},{id:"q20-amortized-10",levelId:"level-20-amortized",question:"If Φ starts at 0 and never drops below 0, then total amortized cost...",options:["is an upper bound on total actual cost","is lower than the actual cost","is unrelated to actual cost","must equal actual cost"],correctAnswerIndex:0,explanation:"Since Σ(actual) = Σ(amortized) − (Φ_final − Φ_0) ≤ Σ(amortized).",hint:"The potential bookkeeping never understates work."},{id:"q21-fibonacci-3",levelId:"level-21-fibonacci",question:"Cascading cuts in a Fibonacci heap stop when...",options:["a parent is not marked (or the root is reached)","every node is marked","the heap size doubles","the minimum is deleted"],correctAnswerIndex:0,explanation:"Cuts cascade while parents are marked; an unmarked parent absorbs the loss and stops the chain.",hint:"The chain breaks at the first unmarked node."},{id:"q21-fibonacci-4",levelId:"level-21-fibonacci",question:"The amortized cost of extract-min in a Fibonacci heap is...",options:["O(log n)","O(1)","O(n)","O(n log n)"],correctAnswerIndex:0,explanation:"Consolidation merges trees by degree; the number of roots stays O(log n).",hint:"The tree-degree bound drives this."},{id:"q21-fibonacci-5",levelId:"level-21-fibonacci",question:"Which Fibonacci heap operation is NOT O(1) amortized?",options:["extract-min","insert","merge (union)","decrease-key"],correctAnswerIndex:0,explanation:"Extract-min needs consolidation across the root list; the rest are constant amortized.",hint:"The one that removes the minimum."},{id:"q21-fibonacci-6",levelId:"level-21-fibonacci",question:"When decrease-key cuts a node, its parent becomes...",options:["marked (if not already)","unmarked","the new root","a leaf"],correctAnswerIndex:0,explanation:"The parent is marked to remember it lost a child, triggering cascading cuts later.",hint:"A flag that records the lost child."},{id:"q21-fibonacci-7",levelId:"level-21-fibonacci",question:"Compared to a binary heap, a Fibonacci heap wins when...",options:["decrease-key operations are frequent (e.g. Dijkstra)","memory is extremely limited","only insert and extract-min are used","keys are all equal"],correctAnswerIndex:0,explanation:"O(1) decrease-key amortized beats the binary heap’s O(log n).",hint:"Look at what Dijkstra does constantly."},{id:"q21-fibonacci-8",levelId:"level-21-fibonacci",question:"The maximum degree of any node in a Fibonacci heap with n elements is...",options:["O(log n)","O(n)","O(1)","O(√n)"],correctAnswerIndex:0,explanation:"The marking bound makes tree sizes grow at least Fibonacci-like with degree.",hint:"The name of the heap gives a hint."},{id:"q21-fibonacci-9",levelId:"level-21-fibonacci",question:"Dijkstra’s algorithm with a Fibonacci heap runs in...",options:["O(E + V log V)","O((V + E) log V)","O(V²)","O(E log V)"],correctAnswerIndex:0,explanation:"E decrease-keys at O(1) plus V extract-mins at O(log V).",hint:"Count the two heap operation kinds."},{id:"q21-fibonacci-10",levelId:"level-21-fibonacci",question:"Consolidation in extract-min combines trees...",options:["with equal degree into one tree","with equal key values","randomly","with unequal heights only"],correctAnswerIndex:0,explanation:"A degree-indexed array merges pairs of trees having the same root degree.",hint:"Like binary addition of tree sizes."},{id:"q22-rabinkarp-3",levelId:"level-22-rabinkarp",question:"The rolling hash updates the window hash in...",options:["O(1)","O(M)","O(N)","O(log M)"],correctAnswerIndex:0,explanation:"Subtract the outgoing character, shift, add the incoming one.",hint:"One subtraction, one multiplication, one addition."},{id:"q22-rabinkarp-4",levelId:"level-22-rabinkarp",question:"A large prime is used as the modulus in Rabin-Karp to...",options:["reduce hash collisions","speed up string comparison","allow negative hashes","make the pattern shorter"],correctAnswerIndex:0,explanation:"A big modulus spreads hashes, so collisions — and O(M) verifications — are rare.",hint:"Fewer false matches."},{id:"q22-rabinkarp-5",levelId:"level-22-rabinkarp",question:"When a window hash equals the pattern hash, Rabin-Karp...",options:["verifies the window with an actual string comparison","accepts it without checking","rehashes the pattern","shifts by two characters"],correctAnswerIndex:0,explanation:"Hashes can collide, so equality must be confirmed character by character.",hint:"Trust but verify."},{id:"q22-rabinkarp-6",levelId:"level-22-rabinkarp",question:"Rabin-Karp’s average time is O(N + M) but the worst case is...",options:["O(N·M) when many windows collide","O(N²)","O(2^N)","O(N log M)"],correctAnswerIndex:0,explanation:"If every window hash matches, each is verified in O(M).",hint:"Pathological hash collisions."},{id:"q22-rabinkarp-7",levelId:"level-22-rabinkarp",question:"Shifting the window from position i to i + 1 (length M, base d, modulus q) computes the new hash as...",options:["h = ((h − old_char·d^(M−1))·d + new_char) mod q","h = (h + new_char) mod q","h = (h − old_char) mod q","h = old_char·new_char mod q"],correctAnswerIndex:0,explanation:"Remove the leading contribution, scale, add the new trailing character.",hint:"Slide out, shift, slide in."},{id:"q22-rabinkarp-8",levelId:"level-22-rabinkarp",question:"Increasing the alphabet base d generally...",options:["reduces collision probability (with a large modulus)","increases collision probability","changes nothing","breaks the rolling property"],correctAnswerIndex:0,explanation:"Larger bases spread distinct strings across more hash values.",hint:"More diversity in hash values."},{id:"q22-rabinkarp-9",levelId:"level-22-rabinkarp",question:"A strong use case for Rabin-Karp is...",options:["searching for multiple patterns in one pass","searching one pattern in one pass with lower constants than KMP","building suffix arrays","sorting strings"],correctAnswerIndex:0,explanation:"All pattern hashes can be tested against each window simultaneously.",hint:"One window, many pattern hashes."},{id:"q22-rabinkarp-10",levelId:"level-22-rabinkarp",question:"Rabin-Karp preprocesses the pattern by...",options:["computing its hash value once","building its LPS array","sorting its characters","reversing it"],correctAnswerIndex:0,explanation:"The pattern hash is compared with every window hash.",hint:"A single O(M) hash."},{id:"q23-convexhull-3",levelId:"level-23-convexhull",question:"The cross product (b − a) × (c − a) being positive means the turn at b is...",options:["counter-clockwise","clockwise","collinear","undefined"],correctAnswerIndex:0,explanation:"A positive cross product indicates a left (counter-clockwise) turn from a→b→c.",hint:"Positive = left turn."},{id:"q23-convexhull-4",levelId:"level-23-convexhull",question:"A cross product of exactly zero means the three points are...",options:["collinear","forming a right angle","counter-clockwise","the triangle is equilateral"],correctAnswerIndex:0,explanation:"Zero area means the points lie on one straight line.",hint:"No triangle area at all."},{id:"q23-convexhull-5",levelId:"level-23-convexhull",question:"Jarvis March (gift wrapping) runs in...",options:["O(N·H) where H is the hull size","O(N log N)","O(N²) always","O(H log N)"],correctAnswerIndex:0,explanation:"Each hull vertex is found by scanning all N points.",hint:"The complexity involves the output size."},{id:"q23-convexhull-6",levelId:"level-23-convexhull",question:"Graham Scan starts by sorting points by...",options:["polar angle (after finding the lowest point)","their x coordinate only","their y coordinate only","their distance from the origin"],correctAnswerIndex:0,explanation:"Sorting by polar angle around the lowest point lets one stack pass build the hull.",hint:"A circular order around a pivot."},{id:"q23-convexhull-7",levelId:"level-23-convexhull",question:"Andrew’s monotone chain sorts points by...",options:["(x, y) and builds the hull in two passes (lower + upper)","polar angle","random order","y, then angle"],correctAnswerIndex:0,explanation:"Two sweeps — left-to-right and right-to-left — build the lower and upper hulls.",hint:"Sort once, sweep twice."},{id:"q23-convexhull-8",levelId:"level-23-convexhull",question:"In Graham Scan, a point is popped from the hull stack when it makes...",options:["a non-counter-clockwise turn (including collinear)","a counter-clockwise turn","a 90° turn","any turn"],correctAnswerIndex:0,explanation:"Non-CCW turns break the convex boundary, so the middle point leaves.",hint:"Hull boundary must turn strictly left."},{id:"q23-convexhull-9",levelId:"level-23-convexhull",question:"For N points all on a circle, the convex hull contains...",options:["all N points (hull size = N)","only 3 points","N/2 points","1 point"],correctAnswerIndex:0,explanation:"Every point on a circle is a hull vertex, so Graham Scan still runs in O(N log N).",hint:"Nobody is inside the shape."},{id:"q23-convexhull-10",levelId:"level-23-convexhull",question:"The sign of the cross product decides whether a turn is left or right, which is used to...",options:["decide whether a candidate point stays on the hull","compute the hull area","sort the input","find the centroid"],correctAnswerIndex:0,explanation:"Orientation tests drive both Graham Scan and Jarvis March.",hint:"The orientation test is the core primitive."},{id:"q24-npcomplete-3",levelId:"level-24-npcomplete",question:"P is the class of problems...",options:["solvable in polynomial time on a deterministic machine","verifiable in exponential time","unsolvable in principle","solvable only with randomness"],correctAnswerIndex:0,explanation:"P contains decision problems with polynomial-time algorithms.",hint:"Polynomial-time solutions."},{id:"q24-npcomplete-4",levelId:"level-24-npcomplete",question:"NP is the class of problems whose solutions...",options:["can be verified in polynomial time","can always be found in polynomial time","require exponential storage","have no certificates"],correctAnswerIndex:0,explanation:"A certificate (yes-instance witness) can be checked in polynomial time.",hint:"Checking is easy, finding may be hard."},{id:"q24-npcomplete-5",levelId:"level-24-npcomplete",question:"A problem is NP-hard if...",options:["every problem in NP reduces to it in polynomial time","it is in P","it can be solved by BFS","it has no decision version"],correctAnswerIndex:0,explanation:"NP-hard problems are at least as hard as every NP problem.",hint:"NP problems can be translated into it."},{id:"q24-npcomplete-6",levelId:"level-24-npcomplete",question:"A problem is NP-complete if it is...",options:["both NP-hard and in NP","only in NP","only NP-hard","in P"],correctAnswerIndex:0,explanation:"NP-complete = hardest problems of NP: NP-hard plus a polynomial certificate.",hint:"Two conditions are required."},{id:"q24-npcomplete-7",levelId:"level-24-npcomplete",question:"Which problem is known to be NP-complete?",options:["3-SAT","Shortest path in a DAG","Finding the minimum of an array","MST of a graph"],correctAnswerIndex:0,explanation:"3-SAT was the first proved NP-complete problem (Cook-Levin).",hint:"The classic reduction target."},{id:"q24-npcomplete-8",levelId:"level-24-npcomplete",question:"The decision version of the Traveling Salesman Problem is...",options:["NP-complete","in P","solvable by Dijkstra","undecidable"],correctAnswerIndex:0,explanation:'"Does a tour shorter than k exist?" is NP-complete; verifying a tour is easy.',hint:"Tours are easy to check, hard to find."},{id:"q24-npcomplete-9",levelId:"level-24-npcomplete",question:"If P = NP, then...",options:["every NP-complete problem has a polynomial-time algorithm","NP-complete problems still need exponential time","no problems remain in P","verification becomes exponential"],correctAnswerIndex:0,explanation:"A polynomial algorithm for one NP-complete problem would transfer to all via reductions.",hint:"Reductions propagate the solution."},{id:"q24-npcomplete-10",levelId:"level-24-npcomplete",question:"Which problem is definitely in P (assuming P ≠ NP)?",options:["Shortest path with non-negative weights (Dijkstra)","3-SAT","Hamiltonian cycle","TSP decision"],correctAnswerIndex:0,explanation:"Dijkstra solves it in polynomial time, so it is in P, not NP-complete.",hint:"The one with a known fast algorithm."}];function Vs(e){if(!e)return $s;const t=$s.filter(n=>n.levelId===e);return t.length>0?t:$s}const Hs=[{id:"puzzle-1",levelId:"level-2-avl",title:"Fix the LL Imbalance",description:"Node 30 has balance factor +2 because its left child (20) has height 2 while the right subtree is empty. Which rotation rebalances the tree?",unbalancedNodeValue:30,correctRotation:"LL",explanation:"The imbalance came from the Left child’s Left subtree (LL case), so a Single Right Rotation on Node 30 fixes it.",hint:"The RED node 30 is left-heavy (BF = +2) and its left child 20 is ALSO left-heavy. Both are on the LEFT-LEFT side. What single rotation turns the left child into the new root?",initialTreeNodes:[{id:30,value:30,x:220,y:50,balanceFactor:2,state:"error"},{id:20,value:20,x:140,y:120,balanceFactor:1,state:"warning"},{id:10,value:10,x:70,y:190,balanceFactor:0,state:"default"}],initialEdges:[{from:30,to:20},{from:20,to:10}],rotatedTreeNodes:[{id:20,value:20,x:220,y:50,balanceFactor:0,state:"success"},{id:10,value:10,x:140,y:120,balanceFactor:0,state:"success"},{id:30,value:30,x:300,y:120,balanceFactor:0,state:"success"}],rotatedEdges:[{from:20,to:10},{from:20,to:30}]},{id:"puzzle-2",levelId:"level-2-avl",title:"Fix the RR Imbalance",description:"Node 20 has balance factor -2 because its right child (30) is right-heavy. Which rotation balances the tree?",unbalancedNodeValue:20,correctRotation:"RR",explanation:"The imbalance came from the Right child’s Right subtree (RR case), so a Single Left Rotation on Node 20 fixes it.",hint:"The RED node 20 is right-heavy (BF = -2) and its right child 30 is ALSO right-heavy. Both are on the RIGHT-RIGHT side. Which single rotation re-centers the right child?",initialTreeNodes:[{id:20,value:20,x:220,y:50,balanceFactor:-2,state:"error"},{id:30,value:30,x:300,y:120,balanceFactor:-1,state:"warning"},{id:40,value:40,x:370,y:190,balanceFactor:0,state:"default"}],initialEdges:[{from:20,to:30},{from:30,to:40}],rotatedTreeNodes:[{id:30,value:30,x:220,y:50,balanceFactor:0,state:"success"},{id:20,value:20,x:140,y:120,balanceFactor:0,state:"success"},{id:40,value:40,x:300,y:120,balanceFactor:0,state:"success"}],rotatedEdges:[{from:30,to:20},{from:30,to:40}]},{id:"puzzle-3",levelId:"level-2-avl",title:"Fix the LR Double Imbalance",description:"Node 30 has balance factor +2, but the heavy insertion happened in the Left child’s Right subtree (node 20). A single rotation won’t work. What is the correct fix?",unbalancedNodeValue:30,correctRotation:"LR",explanation:"This is the Left-Right (LR) case: rotate left on the left child (10) first, then rotate right on the parent (30).",hint:"The RED node 30 is left-heavy, but its left child 10 is right-heavy (BF = -1) — the weight is on the child’s RIGHT side. That means TWO rotations: first on the child, then on the parent.",initialTreeNodes:[{id:30,value:30,x:220,y:50,balanceFactor:2,state:"error"},{id:10,value:10,x:140,y:120,balanceFactor:-1,state:"warning"},{id:20,value:20,x:190,y:190,balanceFactor:0,state:"default"}],initialEdges:[{from:30,to:10},{from:10,to:20}],rotatedTreeNodes:[{id:20,value:20,x:220,y:50,balanceFactor:0,state:"success"},{id:10,value:10,x:140,y:120,balanceFactor:0,state:"success"},{id:30,value:30,x:300,y:120,balanceFactor:0,state:"success"}],rotatedEdges:[{from:20,to:10},{from:20,to:30}]},{id:"puzzle-4",levelId:"level-2-avl",title:"Fix the RL Double Imbalance",description:"Node 10 has balance factor -2, but the heavy insertion happened in the Right child’s Left subtree (node 30). What is the correct fix?",unbalancedNodeValue:10,correctRotation:"RL",explanation:"This is the Right-Left (RL) case: rotate right on the right child (40) first, then rotate left on the parent (10).",hint:"The RED node 10 is right-heavy, but its right child 40 is left-heavy (BF = +1) — the weight is on the child’s LEFT side. Two rotations: first on the child, then on the parent.",initialTreeNodes:[{id:10,value:10,x:220,y:50,balanceFactor:-2,state:"error"},{id:40,value:40,x:300,y:120,balanceFactor:1,state:"warning"},{id:30,value:30,x:250,y:190,balanceFactor:0,state:"default"}],initialEdges:[{from:10,to:40},{from:40,to:30}],rotatedTreeNodes:[{id:30,value:30,x:220,y:50,balanceFactor:0,state:"success"},{id:10,value:10,x:140,y:120,balanceFactor:0,state:"success"},{id:40,value:40,x:300,y:120,balanceFactor:0,state:"success"}],rotatedEdges:[{from:30,to:10},{from:30,to:40}]},{id:"puzzle-5",levelId:"level-2-avl",title:"LL Imbalance after Inserting 5",description:"After inserting key 5 into this tree, node 50 became unbalanced with balance factor +2. Pick the rotation that restores balance.",unbalancedNodeValue:50,correctRotation:"LL",explanation:"Key 5 was inserted in the Left child’s Left subtree, so a Single Right Rotation on Node 50 restores the AVL property.",hint:"New key 5 (GREEN) landed under 30, which is the LEFT child of RED node 50. The chain 50 -> 30 -> 5 is all on the LEFT side: pure LL case.",initialTreeNodes:[{id:50,value:50,x:220,y:50,balanceFactor:2,state:"error"},{id:30,value:30,x:140,y:120,balanceFactor:1,state:"warning"},{id:5,value:5,x:70,y:190,balanceFactor:0,state:"success"}],initialEdges:[{from:50,to:30},{from:30,to:5}],rotatedTreeNodes:[{id:30,value:30,x:220,y:50,balanceFactor:0,state:"success"},{id:5,value:5,x:140,y:120,balanceFactor:0,state:"success"},{id:50,value:50,x:300,y:120,balanceFactor:0,state:"success"}],rotatedEdges:[{from:30,to:5},{from:30,to:50}]},{id:"puzzle-6",levelId:"level-2-avl",title:"RR Imbalance after Inserting 70",description:"After inserting key 70, node 40 became unbalanced with balance factor -2. Pick the rotation that restores balance.",unbalancedNodeValue:40,correctRotation:"RR",explanation:"Key 70 was inserted in the Right child’s Right subtree, so a Single Left Rotation on Node 40 restores the AVL property.",hint:"New key 70 (GREEN) landed under 60, which is the RIGHT child of RED node 40. The chain 40 -> 60 -> 70 is all on the RIGHT side: pure RR case.",initialTreeNodes:[{id:40,value:40,x:220,y:50,balanceFactor:-2,state:"error"},{id:60,value:60,x:300,y:120,balanceFactor:-1,state:"warning"},{id:70,value:70,x:370,y:190,balanceFactor:0,state:"success"}],initialEdges:[{from:40,to:60},{from:60,to:70}],rotatedTreeNodes:[{id:60,value:60,x:220,y:50,balanceFactor:0,state:"success"},{id:40,value:40,x:140,y:120,balanceFactor:0,state:"success"},{id:70,value:70,x:300,y:120,balanceFactor:0,state:"success"}],rotatedEdges:[{from:60,to:40},{from:60,to:70}]},{id:"puzzle-7",levelId:"level-2-avl",title:"LL Imbalance on a 4-Node Chain",description:"Inserting 40, 30, 20, 10 created a deep left chain. Node 40 has balance factor +2. Which single rotation restores balance?",unbalancedNodeValue:40,correctRotation:"LL",explanation:"All four nodes sit on the left-left path, so a Single Right Rotation on Node 40 lifts 30 to the root and reattaches 40 as its right child — one rotation balances the whole chain.",hint:"Follow the heavy path: 40 (RED) -> 30 -> 20 -> 10. Everything is on the LEFT side, so the left child of 40 becomes the new root in ONE rotation.",initialTreeNodes:[{id:40,value:40,x:300,y:45,balanceFactor:2,state:"error"},{id:30,value:30,x:220,y:115,balanceFactor:1,state:"warning"},{id:20,value:20,x:150,y:185,balanceFactor:1,state:"default"},{id:10,value:10,x:90,y:255,balanceFactor:0,state:"default"}],initialEdges:[{from:40,to:30},{from:30,to:20},{from:20,to:10}],rotatedTreeNodes:[{id:30,value:30,x:300,y:45,balanceFactor:0,state:"success"},{id:20,value:20,x:220,y:115,balanceFactor:1,state:"success"},{id:40,value:40,x:380,y:115,balanceFactor:0,state:"success"},{id:10,value:10,x:150,y:185,balanceFactor:0,state:"success"}],rotatedEdges:[{from:30,to:20},{from:30,to:40},{from:20,to:10}]},{id:"puzzle-8",levelId:"level-2-avl",title:"RR Imbalance on a 4-Node Chain",description:"Inserting 10, 20, 30, 40 created a deep right chain. Node 10 has balance factor -2. Which rotation fixes it?",unbalancedNodeValue:10,correctRotation:"RR",explanation:"Everything sits on the right-right path, so a Single Left Rotation on Node 10 lifts 20 to the root and reattaches 10 as its left child — one rotation balances the chain.",hint:"Follow the heavy path: 10 (RED) -> 20 -> 30 -> 40. All RIGHT side — rotate left on the root.",initialTreeNodes:[{id:10,value:10,x:300,y:45,balanceFactor:-2,state:"error"},{id:20,value:20,x:380,y:115,balanceFactor:-1,state:"warning"},{id:30,value:30,x:450,y:185,balanceFactor:-1,state:"default"},{id:40,value:40,x:520,y:255,balanceFactor:0,state:"default"}],initialEdges:[{from:10,to:20},{from:20,to:30},{from:30,to:40}],rotatedTreeNodes:[{id:20,value:20,x:300,y:45,balanceFactor:0,state:"success"},{id:10,value:10,x:220,y:115,balanceFactor:0,state:"success"},{id:30,value:30,x:380,y:115,balanceFactor:-1,state:"success"},{id:40,value:40,x:450,y:185,balanceFactor:0,state:"success"}],rotatedEdges:[{from:20,to:10},{from:20,to:30},{from:30,to:40}]},{id:"puzzle-9",levelId:"level-2-avl",title:"LR Imbalance with 4 Nodes",description:"Node 40 is left-heavy (+2) but its left child 10 is right-heavy (-1). Which sequence of rotations rebalances the tree?",unbalancedNodeValue:40,correctRotation:"LR",explanation:"Left-Right case: first rotate left on the left child (10), bringing 20 up, then rotate right on the parent (40). Node 20 becomes the new root.",hint:"The RED node 40 is left-heavy, but the weight is on the child 10’s RIGHT side (20 -> 30). You must rotate the child first, THEN the parent.",initialTreeNodes:[{id:40,value:40,x:300,y:45,balanceFactor:2,state:"error"},{id:10,value:10,x:210,y:115,balanceFactor:-1,state:"warning"},{id:20,value:20,x:270,y:185,balanceFactor:0,state:"default"},{id:30,value:30,x:330,y:255,balanceFactor:0,state:"default"}],initialEdges:[{from:40,to:10},{from:10,to:20},{from:20,to:30}],rotatedTreeNodes:[{id:20,value:20,x:300,y:45,balanceFactor:0,state:"success"},{id:10,value:10,x:210,y:115,balanceFactor:0,state:"success"},{id:40,value:40,x:390,y:115,balanceFactor:1,state:"success"},{id:30,value:30,x:320,y:185,balanceFactor:0,state:"success"}],rotatedEdges:[{from:20,to:10},{from:20,to:40},{from:40,to:30}]},{id:"puzzle-10",levelId:"level-2-avl",title:"RL Imbalance with 4 Nodes",description:"Node 10 is right-heavy (-2) but its right child 40 is left-heavy (+1). Which rotations restore balance?",unbalancedNodeValue:10,correctRotation:"RL",explanation:"Right-Left case: first rotate right on the right child (40), bringing 30 up, then rotate left on the parent (10). Node 30 becomes the new root.",hint:"The RED node 10 is right-heavy, but the weight is on the child 40’s LEFT side (30 -> 20). Rotate the child first, then the parent.",initialTreeNodes:[{id:10,value:10,x:300,y:45,balanceFactor:-2,state:"error"},{id:40,value:40,x:390,y:115,balanceFactor:1,state:"warning"},{id:30,value:30,x:330,y:185,balanceFactor:0,state:"default"},{id:20,value:20,x:270,y:255,balanceFactor:0,state:"default"}],initialEdges:[{from:10,to:40},{from:40,to:30},{from:30,to:20}],rotatedTreeNodes:[{id:30,value:30,x:300,y:45,balanceFactor:0,state:"success"},{id:10,value:10,x:210,y:115,balanceFactor:0,state:"success"},{id:40,value:40,x:390,y:115,balanceFactor:0,state:"success"},{id:20,value:20,x:250,y:185,balanceFactor:0,state:"success"}],rotatedEdges:[{from:30,to:10},{from:30,to:40},{from:10,to:20}]},{id:"puzzle-11",levelId:"level-2-avl",title:"LL with Subtree Reattachment",description:"Node 50 has balance factor +2 and its left child 30 is also left-heavy. The tricky part: 30’s right subtree (40) must be reattached. Pick the correct rotation.",unbalancedNodeValue:50,correctRotation:"LL",explanation:"Single Right Rotation on 50: 30 becomes root, its right child 40 becomes 50’s new left child. One rotation rebalances everything.",hint:"RED node 50 is left-heavy, child 30 is ALSO left-heavy: pure LL. When 30 rotates up, its right child 40 gets reattached to 50’s left.",initialTreeNodes:[{id:50,value:50,x:300,y:45,balanceFactor:2,state:"error"},{id:30,value:30,x:210,y:115,balanceFactor:1,state:"warning"},{id:20,value:20,x:140,y:185,balanceFactor:1,state:"default"},{id:40,value:40,x:290,y:185,balanceFactor:0,state:"default"},{id:10,value:10,x:80,y:255,balanceFactor:0,state:"default"}],initialEdges:[{from:50,to:30},{from:30,to:20},{from:20,to:10},{from:30,to:40}],rotatedTreeNodes:[{id:30,value:30,x:300,y:45,balanceFactor:0,state:"success"},{id:20,value:20,x:210,y:115,balanceFactor:1,state:"success"},{id:50,value:50,x:390,y:115,balanceFactor:1,state:"success"},{id:10,value:10,x:140,y:185,balanceFactor:0,state:"success"},{id:40,value:40,x:330,y:185,balanceFactor:0,state:"success"}],rotatedEdges:[{from:30,to:20},{from:30,to:50},{from:20,to:10},{from:50,to:40}]},{id:"puzzle-12",levelId:"level-2-avl",title:"RL Imbalance with 5 Nodes",description:"Node 20 is right-heavy (-2) and its right child 60 is left-heavy (+1) with a 2-node subtree. Find the rotation sequence that balances this 5-node tree.",unbalancedNodeValue:20,correctRotation:"RL",explanation:"Right-Left case: rotate right on 60 (lifting 40 up), then rotate left on 20. Node 40 becomes the new root with both sides perfectly balanced.",hint:"RED node 20 is right-heavy, child 60 is left-heavy: RL. Rotate 60 right first (40 comes up), then rotate 20 left.",initialTreeNodes:[{id:20,value:20,x:300,y:45,balanceFactor:-2,state:"error"},{id:60,value:60,x:390,y:115,balanceFactor:1,state:"warning"},{id:40,value:40,x:330,y:185,balanceFactor:0,state:"default"},{id:30,value:30,x:270,y:255,balanceFactor:0,state:"default"},{id:50,value:50,x:390,y:255,balanceFactor:0,state:"default"}],initialEdges:[{from:20,to:60},{from:60,to:40},{from:40,to:30},{from:40,to:50}],rotatedTreeNodes:[{id:40,value:40,x:300,y:45,balanceFactor:0,state:"success"},{id:20,value:20,x:210,y:115,balanceFactor:-1,state:"success"},{id:60,value:60,x:390,y:115,balanceFactor:1,state:"success"},{id:30,value:30,x:260,y:185,balanceFactor:0,state:"success"},{id:50,value:50,x:340,y:185,balanceFactor:0,state:"success"}],rotatedEdges:[{from:40,to:20},{from:40,to:60},{from:20,to:30},{from:60,to:50}]}],gt="http://localhost:5000";async function Ux(e){try{return await(await fetch(`${gt}/api/v1/user/sync`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:e.username||"guest_user",username:e.username,xp:e.xp,levelUnlocked:e.levelUnlocked,starsPerLevel:e.starsPerLevel,completedLevels:e.completedLevels})})).json()}catch(t){return console.warn("Backend sync warning:",t),null}}async function $x(e,t,n,r){try{return await(await fetch(`${gt}/api/v1/progress/level-complete`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:e,levelId:t,stars:n,earnedXp:r})})).json()}catch{return null}}async function hc(e,t){try{const n=t?`${gt}/api/v1/completions/${encodeURIComponent(e)}?type=${t}`:`${gt}/api/v1/completions/${encodeURIComponent(e)}`;return(await(await fetch(n)).json()).completions||[]}catch{return[]}}async function pc(e,t,n){try{return await(await fetch(`${gt}/api/v1/completions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:e,puzzleId:t,puzzleType:n})})).json()}catch{return null}}async function Sf(e,t){try{return await(await fetch(`${gt}/api/v1/completions/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"DELETE"})).json()}catch{return null}}async function Vx(e){try{return(await(await fetch(`${gt}/api/v1/notes/${encodeURIComponent(e)}`)).json()).notes||[]}catch{return[]}}async function Hx(e,t,n,r){try{return await(await fetch(`${gt}/api/v1/notes`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:e,topicId:t,topicTitle:n,content:r})})).json()}catch{return null}}async function Kx(e){try{return await(await fetch(`${gt}/api/v1/notes/${e}`,{method:"DELETE"})).json()}catch{return null}}async function Gx(e,t,n){try{return await(await fetch(`${gt}/api/v1/notes/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({topicTitle:t,content:n})})).json()}catch{return null}}async function Qx(e){try{return(await(await fetch(`${gt}/api/v1/bookmarks/${encodeURIComponent(e)}`)).json()).bookmarks||[]}catch{return[]}}var fc={};(function e(t,n,r,i){var o=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),s=typeof Path2D=="function"&&typeof DOMMatrix=="function",l=function(){if(!t.OffscreenCanvas)return!1;try{var y=new OffscreenCanvas(1,1),k=y.getContext("2d");k.fillRect(0,0,1,1);var F=y.transferToImageBitmap();k.createPattern(F,"no-repeat")}catch{return!1}return!0}();function c(){}function u(y){var k=n.exports.Promise,F=k!==void 0?k:t.Promise;return typeof F=="function"?new F(y):(y(c,c),null)}var d=function(y,k){return{transform:function(F){if(y)return F;if(k.has(F))return k.get(F);var W=new OffscreenCanvas(F.width,F.height),H=W.getContext("2d");return H.drawImage(F,0,0),k.set(F,W),W},clear:function(){k.clear()}}}(l,new Map),h=function(){var y=Math.floor(16.666666666666668),k,F,W={},H=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(k=function(X){var Q=Math.random();return W[Q]=requestAnimationFrame(function $(Y){H===Y||H+y-1<Y?(H=Y,delete W[Q],X()):W[Q]=requestAnimationFrame($)}),Q},F=function(X){W[X]&&cancelAnimationFrame(W[X])}):(k=function(X){return setTimeout(X,y)},F=function(X){return clearTimeout(X)}),{frame:k,cancel:F}}(),p=function(){var y,k,F={};function W(H){function X(Q,$){H.postMessage({options:Q||{},callback:$})}H.init=function($){var Y=$.transferControlToOffscreen();H.postMessage({canvas:Y},[Y])},H.fire=function($,Y,te){if(k)return X($,null),k;var ce=Math.random().toString(36).slice(2);return k=u(function(ne){function _(q){q.data.callback===ce&&(delete F[ce],H.removeEventListener("message",_),k=null,d.clear(),te(),ne())}H.addEventListener("message",_),X($,ce),F[ce]=_.bind(null,{data:{callback:ce}})}),k},H.reset=function(){H.postMessage({reset:!0});for(var $ in F)F[$](),delete F[$]}}return function(){if(y)return y;if(!r&&o){var H=["var CONFETTI, SIZE = {}, module = {};","("+e.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{y=new Worker(URL.createObjectURL(new Blob([H])))}catch(X){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",X),null}W(y)}return y}}(),x={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function b(y,k){return k?k(y):y}function v(y){return y!=null}function A(y,k,F){return b(y&&v(y[k])?y[k]:x[k],F)}function g(y){return y<0?0:Math.floor(y)}function f(y,k){return Math.floor(Math.random()*(k-y))+y}function m(y){return parseInt(y,16)}function w(y){return y.map(S)}function S(y){var k=String(y).replace(/[^0-9a-f]/gi,"");return k.length<6&&(k=k[0]+k[0]+k[1]+k[1]+k[2]+k[2]),{r:m(k.substring(0,2)),g:m(k.substring(2,4)),b:m(k.substring(4,6))}}function N(y){var k=A(y,"origin",Object);return k.x=A(k,"x",Number),k.y=A(k,"y",Number),k}function T(y){y.width=document.documentElement.clientWidth,y.height=document.documentElement.clientHeight}function C(y){var k=y.getBoundingClientRect();y.width=k.width,y.height=k.height}function M(y){var k=document.createElement("canvas");return k.style.position="fixed",k.style.top="0px",k.style.left="0px",k.style.pointerEvents="none",k.style.zIndex=y,k}function R(y,k,F,W,H,X,Q,$,Y){y.save(),y.translate(k,F),y.rotate(X),y.scale(W,H),y.arc(0,0,1,Q,$,Y),y.restore()}function L(y){var k=y.angle*(Math.PI/180),F=y.spread*(Math.PI/180);return{x:y.x,y:y.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:y.startVelocity*.5+Math.random()*y.startVelocity,angle2D:-k+(.5*F-Math.random()*F),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:y.color,shape:y.shape,tick:0,totalTicks:y.ticks,decay:y.decay,drift:y.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:y.gravity*3,ovalScalar:.6,scalar:y.scalar,flat:y.flat}}function V(y,k){k.x+=Math.cos(k.angle2D)*k.velocity+k.drift,k.y+=Math.sin(k.angle2D)*k.velocity+k.gravity,k.velocity*=k.decay,k.flat?(k.wobble=0,k.wobbleX=k.x+10*k.scalar,k.wobbleY=k.y+10*k.scalar,k.tiltSin=0,k.tiltCos=0,k.random=1):(k.wobble+=k.wobbleSpeed,k.wobbleX=k.x+10*k.scalar*Math.cos(k.wobble),k.wobbleY=k.y+10*k.scalar*Math.sin(k.wobble),k.tiltAngle+=.1,k.tiltSin=Math.sin(k.tiltAngle),k.tiltCos=Math.cos(k.tiltAngle),k.random=Math.random()+2);var F=k.tick++/k.totalTicks,W=k.x+k.random*k.tiltCos,H=k.y+k.random*k.tiltSin,X=k.wobbleX+k.random*k.tiltCos,Q=k.wobbleY+k.random*k.tiltSin;if(y.fillStyle="rgba("+k.color.r+", "+k.color.g+", "+k.color.b+", "+(1-F)+")",y.beginPath(),s&&k.shape.type==="path"&&typeof k.shape.path=="string"&&Array.isArray(k.shape.matrix))y.fill(O(k.shape.path,k.shape.matrix,k.x,k.y,Math.abs(X-W)*.1,Math.abs(Q-H)*.1,Math.PI/10*k.wobble));else if(k.shape.type==="bitmap"){var $=Math.PI/10*k.wobble,Y=Math.abs(X-W)*.1,te=Math.abs(Q-H)*.1,ce=k.shape.bitmap.width*k.scalar,ne=k.shape.bitmap.height*k.scalar,_=new DOMMatrix([Math.cos($)*Y,Math.sin($)*Y,-Math.sin($)*te,Math.cos($)*te,k.x,k.y]);_.multiplySelf(new DOMMatrix(k.shape.matrix));var q=y.createPattern(d.transform(k.shape.bitmap),"no-repeat");q.setTransform(_),y.globalAlpha=1-F,y.fillStyle=q,y.fillRect(k.x-ce/2,k.y-ne/2,ce,ne),y.globalAlpha=1}else if(k.shape==="circle")y.ellipse?y.ellipse(k.x,k.y,Math.abs(X-W)*k.ovalScalar,Math.abs(Q-H)*k.ovalScalar,Math.PI/10*k.wobble,0,2*Math.PI):R(y,k.x,k.y,Math.abs(X-W)*k.ovalScalar,Math.abs(Q-H)*k.ovalScalar,Math.PI/10*k.wobble,0,2*Math.PI);else if(k.shape==="star")for(var U=Math.PI/2*3,we=4*k.scalar,Fe=8*k.scalar,Ie=k.x,jt=k.y,un=5,yt=Math.PI/un;un--;)Ie=k.x+Math.cos(U)*Fe,jt=k.y+Math.sin(U)*Fe,y.lineTo(Ie,jt),U+=yt,Ie=k.x+Math.cos(U)*we,jt=k.y+Math.sin(U)*we,y.lineTo(Ie,jt),U+=yt;else y.moveTo(Math.floor(k.x),Math.floor(k.y)),y.lineTo(Math.floor(k.wobbleX),Math.floor(H)),y.lineTo(Math.floor(X),Math.floor(Q)),y.lineTo(Math.floor(W),Math.floor(k.wobbleY));return y.closePath(),y.fill(),k.tick<k.totalTicks}function K(y,k,F,W,H){var X=k.slice(),Q=y.getContext("2d"),$,Y,te=u(function(ce){function ne(){$=Y=null,Q.clearRect(0,0,W.width,W.height),d.clear(),H(),ce()}function _(){r&&!(W.width===i.width&&W.height===i.height)&&(W.width=y.width=i.width,W.height=y.height=i.height),!W.width&&!W.height&&(F(y),W.width=y.width,W.height=y.height),Q.clearRect(0,0,W.width,W.height),X=X.filter(function(q){return V(Q,q)}),X.length?$=h.frame(_):ne()}$=h.frame(_),Y=ne});return{addFettis:function(ce){return X=X.concat(ce),te},canvas:y,promise:te,reset:function(){$&&h.cancel($),Y&&Y()}}}function G(y,k){var F=!y,W=!!A(k||{},"resize"),H=!1,X=A(k,"disableForReducedMotion",Boolean),Q=o&&!!A(k||{},"useWorker"),$=Q?p():null,Y=F?T:C,te=y&&$?!!y.__confetti_initialized:!1,ce=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,ne;function _(U,we,Fe){for(var Ie=A(U,"particleCount",g),jt=A(U,"angle",Number),un=A(U,"spread",Number),yt=A(U,"startVelocity",Number),If=A(U,"decay",Number),Of=A(U,"gravity",Number),Tf=A(U,"drift",Number),mc=A(U,"colors",w),Ef=A(U,"ticks",Number),gc=A(U,"shapes"),zf=A(U,"scalar"),Pf=!!A(U,"flat"),yc=N(U),vc=Ie,os=[],Ff=y.width*yc.x,_f=y.height*yc.y;vc--;)os.push(L({x:Ff,y:_f,angle:jt,spread:un,startVelocity:yt,color:mc[vc%mc.length],shape:gc[f(0,gc.length)],ticks:Ef,decay:If,gravity:Of,drift:Tf,scalar:zf,flat:Pf}));return ne?ne.addFettis(os):(ne=K(y,os,Y,we,Fe),ne.promise)}function q(U){var we=X||A(U,"disableForReducedMotion",Boolean),Fe=A(U,"zIndex",Number);if(we&&ce)return u(function(yt){yt()});F&&ne?y=ne.canvas:F&&!y&&(y=M(Fe),document.body.appendChild(y)),W&&!te&&Y(y);var Ie={width:y.width,height:y.height};$&&!te&&$.init(y),te=!0,$&&(y.__confetti_initialized=!0);function jt(){if($){var yt={getBoundingClientRect:function(){if(!F)return y.getBoundingClientRect()}};Y(yt),$.postMessage({resize:{width:yt.width,height:yt.height}});return}Ie.width=Ie.height=null}function un(){ne=null,W&&(H=!1,t.removeEventListener("resize",jt)),F&&y&&(document.body.contains(y)&&document.body.removeChild(y),y=null,te=!1)}return W&&!H&&(H=!0,t.addEventListener("resize",jt,!1)),$?$.fire(U,Ie,un):_(U,Ie,un)}return q.reset=function(){$&&$.reset(),ne&&ne.reset()},q}var ie;function ve(){return ie||(ie=G(null,{useWorker:!0,resize:!0})),ie}function O(y,k,F,W,H,X,Q){var $=new Path2D(y),Y=new Path2D;Y.addPath($,new DOMMatrix(k));var te=new Path2D;return te.addPath(Y,new DOMMatrix([Math.cos(Q)*H,Math.sin(Q)*H,-Math.sin(Q)*X,Math.cos(Q)*X,F,W])),te}function E(y){if(!s)throw new Error("path confetti are not supported in this browser");var k,F;typeof y=="string"?k=y:(k=y.path,F=y.matrix);var W=new Path2D(k),H=document.createElement("canvas"),X=H.getContext("2d");if(!F){for(var Q=1e3,$=Q,Y=Q,te=0,ce=0,ne,_,q=0;q<Q;q+=2)for(var U=0;U<Q;U+=2)X.isPointInPath(W,q,U,"nonzero")&&($=Math.min($,q),Y=Math.min(Y,U),te=Math.max(te,q),ce=Math.max(ce,U));ne=te-$,_=ce-Y;var we=10,Fe=Math.min(we/ne,we/_);F=[Fe,0,0,Fe,-Math.round(ne/2+$)*Fe,-Math.round(_/2+Y)*Fe]}return{type:"path",path:k,matrix:F}}function I(y){var k,F=1,W="#000000",H='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof y=="string"?k=y:(k=y.text,F="scalar"in y?y.scalar:F,H="fontFamily"in y?y.fontFamily:H,W="color"in y?y.color:W);var X=10*F,Q=""+X+"px "+H,$=new OffscreenCanvas(X,X),Y=$.getContext("2d");Y.font=Q;var te=Y.measureText(k),ce=Math.ceil(te.actualBoundingBoxRight+te.actualBoundingBoxLeft),ne=Math.ceil(te.actualBoundingBoxAscent+te.actualBoundingBoxDescent),_=2,q=te.actualBoundingBoxLeft+_,U=te.actualBoundingBoxAscent+_;ce+=_+_,ne+=_+_,$=new OffscreenCanvas(ce,ne),Y=$.getContext("2d"),Y.font=Q,Y.fillStyle=W,Y.fillText(k,q,U);var we=1/F;return{type:"bitmap",bitmap:$.transferToImageBitmap(),matrix:[we,0,0,we,-ce*we/2,-ne*we/2]}}n.exports=function(){return ve().apply(this,arguments)},n.exports.reset=function(){ve().reset()},n.exports.create=G,n.exports.shapeFromPath=E,n.exports.shapeFromText=I})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),fc,!1);const ru=fc.exports;fc.exports.create;const Xx=({currentLevel:e,userId:t,onCompleteQuiz:n,onBackToCampaign:r})=>{const[i,o]=z.useState(()=>(e==null?void 0:e.id)||Qe[0].id),[s,l]=z.useState(0),[c,u]=z.useState(null),[d,h]=z.useState(!1),[p,x]=z.useState(!1),[b,v]=z.useState(!1),[A,g]=z.useState([]),[f,m]=z.useState(!0),[w,S]=z.useState(!1),N=Vs(i),T=Qe.find(O=>O.id===i)||Qe[0];z.useEffect(()=>{m(!0),v(!1),u(null),h(!1),x(!1),S(!1),t?hc(t,"quiz").then(O=>{g(O.map(E=>E.puzzleId)),m(!1)}):m(!1)},[i,t]);const C=new Set(A),M=N.filter(O=>!C.has(O.id)),R=N.length>0&&M.length===0,L=M[s%M.length]||N[0],V=A.filter(O=>N.some(E=>E.id===O)).length,K=O=>o(O),G=O=>{d||(u(O),h(!0),O===L.correctAnswerIndex&&t&&(pc(t,L.id,"quiz").then(()=>{g(E=>E.includes(L.id)?E:[...E,L.id])}),S(!0)))},ie=()=>{u(null),h(!1),x(!1);const O=w;if(S(!1),N.filter(I=>I.id===L.id?!O:!C.has(I.id)).length===0){v(!0);const I=3;ru({particleCount:140,spread:90,origin:{y:.6}}),setTimeout(()=>ru({particleCount:80,spread:60,origin:{y:.4}}),350),n(I,100);return}l(I=>(I+1)%M.length)},ve=async()=>{if(t){for(const O of A)await Sf(t,O);g([]),l(0),v(!1)}};return f?a.jsxs("div",{className:"card-light",style:{maxWidth:650,margin:"20px auto",padding:40,textAlign:"center"},children:[a.jsx("div",{style:{width:36,height:36,borderRadius:"50%",border:"3px solid var(--bg-grey)",borderTopColor:"#000",margin:"0 auto 14px",animation:"spin 0.8s linear infinite"}}),a.jsx("p",{style:{fontSize:"0.9rem",fontWeight:700,color:"var(--text-secondary)"},children:"Loading your arena progress…"})]}):b||R?a.jsx("div",{style:{maxWidth:550,margin:"40px auto",padding:24},className:"card-black fade-in-up",children:a.jsxs("div",{style:{textAlign:"center"},children:[a.jsx("div",{style:{width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg, #FFCC00, #FF9500)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",boxShadow:"0 0 24px rgba(255,215,0,0.45)"},children:a.jsx(ff,{size:38,color:"#000"})}),a.jsx("h2",{style:{fontSize:"1.6rem",fontWeight:900,color:"#fff",marginBottom:6,letterSpacing:"-0.03em"},children:"Topic Cleared!"}),a.jsxs("p",{style:{color:"rgba(255,255,255,0.6)",marginBottom:6},children:[a.jsx("strong",{style:{color:"#fff"},children:V})," / ",N.length," questions mastered"]}),a.jsxs("p",{style:{color:"rgba(255,255,255,0.45)",fontSize:"0.85rem",marginBottom:20},children:["Topic: ",a.jsx("strong",{style:{color:"var(--accent-gold)"},children:T.title})]}),a.jsx("div",{style:{display:"flex",justifyContent:"center",gap:10,marginBottom:24},children:[1,2,3].map(O=>a.jsx("span",{style:{fontSize:"2rem",color:O<=3?"var(--accent-gold)":"rgba(255,255,255,0.2)",filter:"drop-shadow(0 0 6px rgba(255,215,0,0.5))"},children:"★"},O))}),a.jsxs("p",{style:{color:"rgba(255,255,255,0.5)",fontSize:"0.8rem",marginBottom:20,maxWidth:420,margin:"0 auto 20px"},children:["All questions marked as ",a.jsx("strong",{style:{color:"#fff"},children:"done"}),". New questions for this topic unlock later — your progress is saved permanently."]}),a.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"},children:[a.jsxs("button",{className:"btn btn-secondary",onClick:ve,children:[a.jsx(rs,{size:16})," Reset Topic Progress"]}),a.jsx("button",{className:"btn",style:{background:"#fff",color:"#000",fontWeight:700},onClick:r,children:"Campaign →"})]})]})}):((V+(d?1:0))/N.length*100,a.jsxs("div",{style:{maxWidth:650,margin:"20px auto",padding:24},children:[a.jsxs("div",{className:"card-light",style:{padding:14,marginBottom:18},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:"0.72rem",fontWeight:800,color:"var(--accent-red)",textTransform:"uppercase",marginBottom:10},children:[a.jsx(xx,{size:14})," CHOOSE A TOPIC TO CHALLENGE"]}),a.jsx("div",{style:{display:"flex",gap:8,overflowX:"auto",paddingBottom:4},children:Qe.map(O=>{const E=O.id!==i&&Vs(O.id).length>0&&Vs(O.id).every(y=>C.has(y.id)),I=O.id===i;return a.jsxs("button",{onClick:()=>K(O.id),style:{padding:"8px 14px",borderRadius:100,whiteSpace:"nowrap",fontSize:"0.78rem",fontWeight:800,background:I?"linear-gradient(135deg, #000, #1C1C1E)":"var(--bg-light)",color:I?"#fff":"var(--text-secondary)",border:I?"1.5px solid #000":`1.5px solid ${E?"var(--accent-green)":"var(--border-hairline)"}`,cursor:"pointer",fontFamily:"var(--font-main)",transition:"all 0.2s ease",display:"inline-flex",alignItems:"center",gap:5},children:["L",O.levelNumber," ",E&&a.jsx(Nt,{size:12,color:"var(--accent-green)"})]},O.id)})}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginTop:10,flexWrap:"wrap"},children:[a.jsx("span",{style:{fontSize:"0.85rem",fontWeight:700,color:"#000"},children:T.title}),a.jsxs("span",{style:{marginLeft:"auto",fontSize:"0.72rem",fontWeight:800,background:R?"var(--accent-green)":"#000",color:"#fff",padding:"4px 12px",borderRadius:"100px",display:"inline-flex",alignItems:"center",gap:5},children:[a.jsx(Ox,{size:12})," ",V,"/",N.length," mastered"]})]})]}),a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[a.jsxs("span",{style:{fontSize:"0.78rem",fontWeight:800,color:"#000",textTransform:"uppercase",letterSpacing:"0.06em"},children:["Question ",M.indexOf(L)+1," / ",M.length," remaining"]}),a.jsxs("span",{style:{fontSize:"0.78rem",fontWeight:800,color:"var(--accent-orange)",textTransform:"uppercase",letterSpacing:"0.06em",display:"flex",alignItems:"center",gap:4},children:[a.jsx(ur,{size:13})," ",V," done"]})]}),a.jsx("div",{style:{display:"flex",gap:4,marginBottom:14},children:N.map(O=>{const E=C.has(O.id),I=O.id===L.id;return a.jsx("div",{style:{flex:1,height:8,borderRadius:4,overflow:"hidden",background:E?"var(--accent-green)":"var(--bg-grey)",outline:I?"2px solid #000":"none",outlineOffset:1,transition:"all 0.3s ease"}},O.id)})}),a.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:10},children:a.jsxs("button",{style:{background:"none",border:"none",color:"var(--accent-orange)",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:"0.82rem",fontWeight:600,fontFamily:"var(--font-main)"},onClick:()=>x(!p),children:[a.jsx(vx,{size:15})," ",p?"Hide Hint":"Hint"]})}),p&&a.jsxs("div",{className:"fade-in-up",style:{padding:12,background:"rgba(255,149,0,0.08)",border:"1px solid rgba(255,149,0,0.2)",borderRadius:"var(--radius-md)",marginBottom:14,fontSize:"0.85rem",color:"var(--accent-orange)"},children:["💡 ",L.hint||"Think about the core algorithm concept for this topic."]}),a.jsxs("div",{className:"card-black fade-in-up",style:{padding:20,marginBottom:20,position:"relative",overflow:"hidden"},children:[a.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg, #FF9500, #FFCC00)",opacity:.8}}),a.jsxs("div",{style:{fontSize:"0.68rem",fontWeight:800,color:"var(--accent-gold)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8},children:["Challenge ",N.findIndex(O=>O.id===L.id)+1," of ",N.length]}),a.jsx("h3",{style:{fontSize:"1.15rem",fontWeight:700,lineHeight:1.4,color:"#fff"},children:L.question})]},`q-${L.id}`),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10,marginBottom:20},children:L.options.map((O,E)=>{let I="#fff",y="var(--border-hairline)",k="#000";return d&&E===L.correctAnswerIndex?(I="rgba(52,199,89,0.08)",y="#34C759",k="#1B7F37"):d&&E===c&&(I="rgba(255,59,48,0.06)",y="#FF3B30",k="#CC2D25"),a.jsxs("button",{className:"arena-option",style:{background:I,border:`1.5px solid ${y}`,color:k,padding:"14px 18px",borderRadius:"var(--radius-md)",textAlign:"left",fontSize:"0.92rem",fontWeight:600,cursor:d?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all 0.2s ease",fontFamily:"var(--font-main)",animationDelay:`${E*70}ms`},onClick:()=>G(E),children:[a.jsx("span",{children:O}),d&&E===L.correctAnswerIndex&&a.jsx(Nt,{size:18,color:"#34C759",className:"pop-in"}),d&&E===c&&E!==L.correctAnswerIndex&&a.jsx(jo,{size:18,color:"#FF3B30",className:"shake"})]},E)})}),d&&a.jsxs("div",{className:"fade-in-up",style:{padding:14,background:"var(--bg-light)",borderLeft:"3px solid #000",borderRadius:"0 8px 8px 0",marginBottom:16,fontSize:"0.88rem",lineHeight:1.5},children:[a.jsx("strong",{children:c===L.correctAnswerIndex?"Correct! ":"Not quite — "}),L.explanation]}),d&&a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[a.jsxs("span",{style:{fontSize:"0.75rem",color:"var(--text-muted)",fontWeight:600,display:"flex",alignItems:"center",gap:4},children:[a.jsx(ac,{size:12})," Correct answers are saved permanently."]}),a.jsx("button",{className:"btn btn-primary",onClick:ie,children:w&&M.length-1===0?"Finish Arena":"Next →"})]})]}))};function Yx(e,t){if(e.length===0)return null;const n=new Map,r=new Map;e.forEach(s=>{n.set(Number(s.id),{id:Number(s.id),value:s.value,left:null,right:null}),r.set(Number(s.id),s.x)});const i=new Set;t.forEach(s=>{const l=n.get(Number(s.from)),c=n.get(Number(s.to));l&&c&&((r.get(c.id)??0)<(r.get(l.id)??0)?l.left=c:l.right=c,i.add(c.id))});const o=e.find(s=>!i.has(Number(s.id)));return o?n.get(Number(o.id)):n.get(Number(e[0].id))}function Ks(e){const t=e.right;return t?(e.right=t.left,t.left=e,t):e}function Gs(e){const t=e.left;return t?(e.left=t.right,t.right=e,t):e}function iu(e,t,n){const r=Yx(e,t);if(!r)return{nodes:[],edges:[],balanced:!1,rootValue:null};let i=r;switch(n){case"LL":i=Gs(r);break;case"RR":i=Ks(r);break;case"LR":r.left&&(r.left=Ks(r.left)),i=Gs(r);break;case"RL":r.right&&(r.right=Gs(r.right)),i=Ks(r);break}const o=new Map,s=g=>{if(!g)return 0;const f=o.get(g.id);if(f!==void 0)return f;const m=1+Math.max(s(g.left),s(g.right));return o.set(g.id,m),m},l=g=>s(g.left)-s(g.right),c=[],u=[];(function g(f){f.left&&g(f.left),u.push(f),f.right&&g(f.right),c.push(f)})(i);const d=u.length,h=new Map;u.forEach((g,f)=>h.set(g.id,300+(f-(d-1)/2)*110));const p=new Map;(function g(f,m){p.set(f.id,m),f.left&&g(f.left,m+1),f.right&&g(f.right,m+1)})(i,0);const x=c.every(g=>Math.abs(l(g))<=1),b=c.filter(g=>Math.abs(l(g))>1),v=c.map(g=>{const f=l(g),m=Math.abs(f)>1;let w=x?"success":"default";return m?w="error":!x&&b.some(S=>S.left===g||S.right===g)&&(w="warning"),{id:g.id,value:g.value,x:h.get(g.id),y:45+p.get(g.id)*80,balanceFactor:f,state:w}}),A=[];return function g(f){f.left&&(A.push({from:f.id,to:f.left.id}),g(f.left)),f.right&&(A.push({from:f.id,to:f.right.id}),g(f.right))}(i),{nodes:v,edges:A,balanced:x,rootValue:i.value}}const Zx=[{rot:"LL",name:"Single Right Rotation",when:"Left child is also left-heavy (BF > 0). One right rotation fixes it."},{rot:"RR",name:"Single Left Rotation",when:"Right child is also right-heavy (BF < 0). One left rotation fixes it."},{rot:"LR",name:"Left-Right Double Rotation",when:"Left child is right-heavy (BF < 0). Rotate left on the child, then right on the parent."},{rot:"RL",name:"Right-Left Double Rotation",when:"Right child is left-heavy (BF > 0). Rotate right on the child, then left on the parent."}],Jx=[{color:"var(--accent-red)",label:"Unbalanced node (|BF| > 1)"},{color:"var(--accent-amber)",label:"Heavy child — shows which side caused it"},{color:"var(--accent-green)",label:"Balanced / newly inserted node"},{color:"#007AFF",label:"Active / being examined"}],e1=({currentLevel:e,userId:t})=>{const[n,r]=z.useState(0),[i,o]=z.useState(null),[s,l]=z.useState(null),[c,u]=z.useState(!1),[d,h]=z.useState(!1),[p,x]=z.useState(!1),[b,v]=z.useState(!1),[A,g]=z.useState(0),[f,m]=z.useState([]),w=e?Hs.filter(y=>y.levelId===e.id):[],S=w.length>0?w:Hs,N=S[n%S.length]||Hs[0],T=N.correctRotation||N.targetRotation||"LL",C=f.includes(N.id),M=S.filter(y=>f.includes(y.id)).length,R=M>0&&M===S.length,L=N.initialTreeNodes||N.unbalancedNodes||[],V=N.initialEdges||[];z.useEffect(()=>{r(0),o(null),l(null),u(!1),h(!1),x(!1),t&&hc(t,"rotation").then(y=>{m(y.map(k=>k.puzzleId))})},[e==null?void 0:e.id,t]);const K=y=>{o(null),l(null),u(!1),h(!1),x(!1),y!==void 0&&r(y)},G=y=>{c||(o(y),l(null),x(!1))},ie=()=>{i&&l(iu(L,V,i))},ve=()=>{if(!i)return;const y=iu(L,V,i);u(!0);const k=y.balanced;h(k),k&&t&&pc(t,N.id,"rotation").then(()=>{m(F=>F.includes(N.id)?F:[...F,N.id])}),k||g(F=>F+1)},O=()=>{v(!1);let y=(n+1)%S.length;if(R)return;const k=S.findIndex((W,H)=>H>n&&!f.includes(W.id)),F=S.findIndex(W=>!f.includes(W.id));k!==-1?y=k:F!==-1&&(y=F),K(y)},E=s?s.nodes:L,I=s?s.edges:V;return a.jsxs("div",{className:"card-light",style:{padding:24,borderRadius:"var(--radius-lg)",position:"relative",overflow:"hidden"},children:[a.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg, #FF3B30, #FF9500, #FFCC00, #34C759, #007AFF)",backgroundSize:"300% 100%",animation:"gradient-slide 6s linear infinite"}}),R?a.jsxs("div",{className:"fade-in-up",style:{textAlign:"center",padding:"28px 16px"},children:[a.jsx("div",{style:{width:72,height:72,borderRadius:"50%",margin:"0 auto 16px",background:"linear-gradient(135deg, #FFCC00, #FF9500)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 24px rgba(255,204,0,0.5)"},children:a.jsx(ff,{size:36,color:"#000"})}),a.jsx("h3",{style:{fontSize:"1.4rem",fontWeight:900,marginBottom:6},children:"All Rotation Puzzles Completed!"}),a.jsxs("p",{style:{fontSize:"0.88rem",color:"var(--text-secondary)",maxWidth:480,margin:"0 auto 18px"},children:["You mastered all ",S.length," rotation puzzles in this arena. New puzzles are being prepared — check back later for the next challenge."]}),a.jsx("div",{style:{display:"flex",justifyContent:"center",gap:8},children:S.map(y=>a.jsx("span",{style:{width:14,height:14,borderRadius:"50%",background:"var(--accent-green)"}},y.id))})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:"0.72rem",fontWeight:800,color:"var(--accent-red)",textTransform:"uppercase",marginBottom:6},children:[a.jsx(is,{size:14})," INTERACTIVE TREE ROTATION PUZZLE • ",N.id.replace("puzzle-","PUZZLE ")]}),a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,flexWrap:"wrap"},children:[a.jsx("h3",{style:{fontSize:"1.3rem",fontWeight:900,marginBottom:8,color:"#000000"},children:N.title}),a.jsxs("span",{style:{fontSize:"0.75rem",fontWeight:800,background:"#000",color:"#fff",padding:"5px 12px",borderRadius:100,whiteSpace:"nowrap"},children:[M," / ",S.length," solved"]})]}),a.jsx("p",{style:{fontSize:"0.88rem",color:"var(--text-secondary)",marginBottom:16},children:N.description||N.explanation}),a.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",marginBottom:14},children:[S.map((y,k)=>{const F=f.includes(y.id),W=k===n;return a.jsx("button",{onClick:()=>{!F&&!c&&K(k)},"aria-label":`Puzzle ${k+1}`,style:{width:14,height:14,borderRadius:"50%",padding:0,cursor:F||c?"default":"pointer",background:W?"#000000":F?"var(--accent-green)":"var(--bg-light)",border:W?"none":`1.5px solid ${F?"var(--accent-green)":"var(--border-hairline)"}`,display:"inline-flex",alignItems:"center",justifyContent:"center",transition:"all 0.25s ease"}},y.id)}),a.jsxs("span",{style:{fontSize:"0.72rem",fontWeight:700,color:"var(--text-secondary)",marginLeft:4},children:[n+1," / ",S.length]})]}),a.jsxs("div",{style:{marginBottom:14},children:[a.jsxs("button",{onClick:()=>v(y=>!y),style:{background:"none",border:"none",padding:0,fontSize:"0.78rem",fontWeight:800,color:"#007AFF",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5,textDecoration:"underline"},children:[a.jsx(ei,{size:14})," ",b?"Hide":"How to solve"," — rotation guide"]}),b&&a.jsx("div",{style:{marginTop:8,padding:"12px 14px",background:"rgba(0,122,255,0.06)",border:"1px solid rgba(0,122,255,0.18)",borderRadius:"var(--radius-md)"},children:a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:8},children:Zx.map(y=>a.jsxs("div",{style:{fontSize:"0.78rem",lineHeight:1.45,color:"var(--text-secondary)"},children:[a.jsx("strong",{style:{color:"#000000",fontFamily:"var(--font-code)"},children:y.rot})," — ",y.name,": ",y.when]},y.rot))})})]}),a.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:14,marginBottom:14,padding:"10px 14px",background:"var(--bg-light)",borderRadius:"var(--radius-md)"},children:Jx.map(y=>a.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:6,fontSize:"0.72rem",fontWeight:700,color:"var(--text-secondary)"},children:[a.jsx("span",{style:{width:12,height:12,borderRadius:"50%",background:y.color,display:"inline-block"}}),y.label]},y.label))}),w.length===0&&a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",marginBottom:14,background:"rgba(0,122,255,0.08)",border:"1px solid rgba(0,122,255,0.2)",borderRadius:"var(--radius-md)",fontSize:"0.82rem",color:"#007AFF",fontWeight:600},children:[a.jsx(hf,{size:15}),"Rotation puzzles are for AVL Tree levels. Showing the full AVL puzzle set here."]}),C&&!c&&a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",marginBottom:14,background:"rgba(52,199,89,0.1)",border:"1px solid rgba(52,199,89,0.35)",borderRadius:"var(--radius-md)",fontSize:"0.85rem",color:"#1B7F37",fontWeight:700},children:[a.jsx(ac,{size:15})," Solved — locked permanently. Move to the next puzzle to keep earning."]}),a.jsxs("div",{style:{display:"flex",gap:16,marginBottom:10,flexWrap:"wrap"},children:[a.jsxs("div",{style:{flex:"1 1 260px",minWidth:240,opacity:C&&!c?.55:1},children:[a.jsx("div",{style:{fontSize:"0.7rem",fontWeight:800,textTransform:"uppercase",color:s?"#007AFF":"var(--accent-red)",marginBottom:4},children:C&&!c?"✓ Solved tree":s?"↻ After your rotation":"⚠ Unbalanced tree"}),a.jsx("div",{className:c&&!d?"shake-wrong":void 0,style:{height:240,overflow:"hidden"},children:a.jsx(Ao,{nodes:C&&!c?N.rotatedTreeNodes||L:E,edges:C&&!c?N.rotatedEdges||V:I,minHeight:240})},`canvas-${N.id}-${s?s.rootValue:"init"}-${A}`),s&&!c&&!C&&a.jsx("div",{className:"fade-in-up",style:{marginTop:6,textAlign:"center"},children:a.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:100,fontSize:"0.78rem",fontWeight:800,background:s.balanced?"rgba(52,199,89,0.12)":"rgba(255,59,48,0.1)",color:s.balanced?"var(--accent-green)":"var(--accent-red)",border:`1px solid ${s.balanced?"rgba(52,199,89,0.4)":"rgba(255,59,48,0.35)"}`},children:[s.balanced?a.jsx(Nt,{size:14}):a.jsx(jo,{size:14}),s.balanced?"Tree is balanced after this rotation!":`Still unbalanced — ${i} alone doesn’t fix it`]})})]}),c&&a.jsxs("div",{style:{flex:"1 1 260px",minWidth:240},className:"fade-in-up",children:[a.jsx("div",{style:{fontSize:"0.7rem",fontWeight:800,textTransform:"uppercase",color:d?"var(--accent-green)":"var(--accent-amber)",marginBottom:4},children:d?"✓ Balanced after rotation":"✗ Expected result"}),a.jsx("div",{style:{height:240,overflow:"hidden"},children:a.jsx(Ao,{nodes:N.rotatedTreeNodes||N.initialTreeNodes||[],edges:N.rotatedEdges||N.initialEdges||[],minHeight:240})})]})]}),!c&&!C&&a.jsxs("div",{style:{textAlign:"center",marginBottom:14},children:[a.jsxs("button",{onClick:()=>x(y=>!y),style:{background:"none",border:"none",fontSize:"0.78rem",fontWeight:800,color:"#007AFF",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5,textDecoration:"underline"},children:[a.jsx(ei,{size:14})," ",p?"Hide hint":"Need a hint?"]}),p&&N.hint&&a.jsxs("p",{className:"fade-in-up",style:{fontSize:"0.82rem",color:"var(--text-secondary)",lineHeight:1.5,maxWidth:560,margin:"8px auto 0",background:"rgba(255,204,0,0.1)",border:"1px solid rgba(255,204,0,0.35)",padding:"10px 14px",borderRadius:"var(--radius-md)"},children:["💡 ",N.hint]})]}),!C&&a.jsxs("div",{children:[a.jsx("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:10,alignItems:"center"},children:["LL","RR","LR","RL"].map(y=>a.jsxs("button",{onClick:()=>G(y),disabled:c,style:{padding:"10px 24px",borderRadius:"100px",fontSize:"0.9rem",fontWeight:800,background:i===y?"#000000":"var(--bg-light)",color:i===y?"#FFFFFF":"#000000",border:i===y?"2px solid #000000":"1.5px solid var(--border-hairline)",cursor:c?"default":"pointer",fontFamily:"var(--font-code)",transition:"all 0.2s ease",opacity:c?y===T?1:.45:1,boxShadow:i===y?"0 4px 14px rgba(0,0,0,0.15)":"none"},children:[y," Rotation"]},y))}),a.jsx("p",{style:{textAlign:"center",fontSize:"0.72rem",color:"var(--text-muted)",marginBottom:12},children:"Any rotation that balances the tree is accepted — Apply Rotation previews the result first."})]}),a.jsx("div",{style:{textAlign:"center"},children:C&&!c?a.jsxs("button",{className:"btn btn-primary",onClick:O,style:{gap:6},children:[R?"Finish":"Next Puzzle"," ",a.jsx(nl,{size:14})]}):c?a.jsxs("div",{children:[a.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:"100px",background:d?"var(--accent-green)":"var(--accent-red)",color:"#FFFFFF",fontWeight:800,fontSize:"0.9rem",marginBottom:10},children:[d?a.jsx(Nt,{size:18}):a.jsx(jo,{size:18}),d?"Correct! The tree is balanced — puzzle solved.":`Not quite — that rotation didn't balance the tree. Expected ${T}.`]}),a.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",lineHeight:1.5,maxWidth:520,margin:"0 auto 12px"},children:N.explanation}),a.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"},children:[!d&&a.jsxs("button",{className:"btn btn-secondary",onClick:()=>K(),children:[a.jsx(rs,{size:14,style:{marginRight:4}})," Try Again"]}),a.jsxs("button",{className:"btn btn-primary",onClick:O,children:[d?R?"Finish":"Next Puzzle":"Skip"," ",a.jsx(nl,{size:14,style:{marginLeft:4}})]})]})]}):a.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"},children:[a.jsxs("button",{className:"btn btn-secondary",onClick:ie,disabled:!i,style:{gap:6},children:[a.jsx(zx,{size:15})," Apply Rotation"]}),a.jsx("button",{className:"btn btn-primary",onClick:ve,disabled:!i,children:"Submit Balance Fix"})]})})]})]})},t1=()=>{const[e,t]=z.useState("avl"),[n,r]=z.useState(""),i=Kn[e]||Kn.avl,o=Object.entries(Kn).filter(([s,l])=>s.toLowerCase().includes(n.toLowerCase())||l.title.toLowerCase().includes(n.toLowerCase()));return a.jsxs("div",{style:{maxWidth:"var(--max-width)",margin:"0 auto",padding:"24px 16px"},children:[a.jsxs("div",{style:{marginBottom:24},children:[a.jsx("h2",{className:"section-title",children:"Code Hub"}),a.jsxs("p",{className:"section-subtitle",children:[Object.keys(Kn).length," production-grade algorithm implementations in C++, Java, Python & JavaScript with Time/Space complexity."]})]}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(200px, 260px) 1fr",gap:16},children:[a.jsxs("div",{className:"panel",style:{padding:12},children:[a.jsxs("span",{style:{fontSize:"0.68rem",fontWeight:700,color:"var(--text-muted)",padding:"8px 10px",display:"block",textTransform:"uppercase",letterSpacing:"0.06em"},children:["Algorithms (",o.length,")"]}),a.jsxs("div",{style:{position:"relative",padding:"0 10px 8px"},children:[a.jsx(lc,{size:13,style:{position:"absolute",left:18,top:9,color:"var(--text-muted)"}}),a.jsx("input",{type:"text",value:n,onChange:s=>r(s.target.value),placeholder:"Search algorithm...",style:{width:"100%",padding:"6px 10px 6px 28px",fontSize:"0.8rem",border:"1.5px solid var(--border-hairline)",borderRadius:"var(--radius-md)",fontFamily:"var(--font-main)"}})]}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4,maxHeight:"calc(100vh - 260px)",overflowY:"auto",paddingRight:2},children:[o.map(([s,l])=>a.jsx("button",{style:{padding:"10px 14px",borderRadius:"var(--radius-md)",textAlign:"left",border:"none",background:e===s?"#000":"transparent",color:e===s?"#fff":"var(--text-body)",fontWeight:600,fontSize:"0.85rem",cursor:"pointer",fontFamily:"var(--font-main)",transition:"all 0.15s ease"},onClick:()=>t(s),children:l.title},s)),o.length===0&&a.jsxs("div",{style:{padding:16,fontSize:"0.82rem",color:"var(--text-muted)",textAlign:"center"},children:['No algorithms match "',n,'"']})]})]}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[a.jsxs("div",{className:"card-black",style:{display:"flex",alignItems:"center",gap:12,padding:16},children:[a.jsx(cf,{size:22,color:"var(--accent-gold)"}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:"0.65rem",color:"rgba(255,255,255,0.5)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"},children:"Time"}),a.jsx("div",{style:{fontSize:"0.95rem",fontWeight:800,color:"#fff"},children:i.timeComplexity})]})]}),a.jsxs("div",{className:"card-black",style:{display:"flex",alignItems:"center",gap:12,padding:16},children:[a.jsx(uf,{size:22,color:"var(--accent-gold)"}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:"0.65rem",color:"rgba(255,255,255,0.5)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"},children:"Space"}),a.jsx("div",{style:{fontSize:"0.95rem",fontWeight:800,color:"#fff"},children:i.spaceComplexity})]})]})]}),a.jsx("div",{className:"card-grey",style:{padding:16},children:a.jsx("p",{style:{fontSize:"0.88rem",color:"var(--text-body)",lineHeight:1.55},children:i.explanationText})}),a.jsx("div",{style:{height:440},children:a.jsx(rl,{codeSnippet:i})})]})]})]})},n1=({userProgress:e})=>{const t=Object.values(e.starsPerLevel).reduce((u,d)=>u+d,0),n=Qe.length*3,r=Math.min(Math.round(e.completedLevels.length/Qe.length*100),100),i=54,o=2*Math.PI*i,s=o-r/100*o,c=[{name:"Trees",label:"Trees & BSTs",color:"var(--accent-red)"},{name:"Graphs",label:"Graph Paths",color:"var(--accent-blue)"},{name:"DynamicProgramming",label:"Dynamic Prog",color:"var(--accent-green)"},{name:"StringAndTrie",label:"Strings & Trie",color:"var(--accent-gold)"},{name:"AdvancedSets",label:"Advanced Sets",color:"#9B51E0"}].map(u=>{const d=Qe.filter(x=>x.category===u.name).length,h=Qe.filter(x=>x.category===u.name&&e.completedLevels.includes(x.id)).length,p=d>0?Math.round(h/d*100):0;return{...u,total:d,completed:h,pct:p}});return a.jsxs("div",{style:{maxWidth:"var(--max-width)",margin:"0 auto",padding:"24px 16px"},children:[a.jsx("div",{className:"card-black",style:{padding:28,marginBottom:24,position:"relative",overflow:"hidden"},children:a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20},children:[a.jsxs("div",{children:[a.jsx("span",{style:{fontSize:"0.72rem",fontWeight:800,color:"var(--accent-gold)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4,display:"inline-block"},children:"REAL-TIME PROGRESS DASHBOARD"}),a.jsxs("h2",{style:{fontSize:"1.8rem",fontWeight:900,color:"#FFFFFF",letterSpacing:"-0.04em",lineHeight:1.1},children:[e.username||"Student","'s Learning Hub"]}),a.jsxs("p",{style:{fontSize:"0.9rem",color:"rgba(255, 255, 255, 0.7)",marginTop:6},children:["Completed ",e.completedLevels.length," of 30 Advanced Algorithm Topics"]})]}),a.jsx("div",{style:{display:"flex",alignItems:"center",gap:16},children:a.jsxs("div",{style:{position:"relative",width:120,height:120},children:[a.jsxs("svg",{width:"120",height:"120",viewBox:"0 0 130 130",style:{transform:"rotate(-90deg)"},children:[a.jsx("circle",{cx:"65",cy:"65",r:i,fill:"none",stroke:"rgba(255,255,255,0.15)",strokeWidth:"10"}),a.jsx("circle",{cx:"65",cy:"65",r:i,fill:"none",stroke:"var(--accent-gold)",strokeWidth:"10",strokeDasharray:o,strokeDashoffset:s,strokeLinecap:"round",style:{transition:"stroke-dashoffset 0.8s ease"}})]}),a.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[a.jsxs("span",{style:{fontSize:"1.4rem",fontWeight:900,color:"#FFFFFF",lineHeight:1},children:[r,"%"]}),a.jsx("span",{style:{fontSize:"0.65rem",color:"rgba(255,255,255,0.6)",fontWeight:600,textTransform:"uppercase"},children:"Done"})]})]})})]})}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",gap:14,marginBottom:24},children:[a.jsxs("div",{className:"card-light",style:{textAlign:"center",padding:20},children:[a.jsx(ur,{size:24,color:"var(--accent-gold)",style:{marginBottom:8}}),a.jsx("div",{className:"stat-value",children:e.xp}),a.jsx("div",{className:"stat-label",children:"Total XP"})]}),a.jsxs("div",{className:"card-light",style:{textAlign:"center",padding:20},children:[a.jsx(ti,{size:24,color:"var(--accent-gold)",fill:"var(--accent-gold)",style:{marginBottom:8}}),a.jsxs("div",{className:"stat-value",children:[t," / ",n]}),a.jsx("div",{className:"stat-label",children:"Stars Collected"})]}),a.jsxs("div",{className:"card-light",style:{textAlign:"center",padding:20},children:[a.jsx(df,{size:24,color:"var(--accent-red)",style:{marginBottom:8}}),a.jsxs("div",{className:"stat-value",children:[e.streakDays," Days"]}),a.jsx("div",{className:"stat-label",children:"Daily Streak"})]}),a.jsxs("div",{className:"card-light",style:{textAlign:"center",padding:20},children:[a.jsx(vf,{size:24,color:"var(--accent-green)",style:{marginBottom:8}}),a.jsxs("div",{className:"stat-value",children:["Rank ",Math.floor(e.xp/500)+1]}),a.jsx("div",{className:"stat-label",children:"Mastery Rank"})]})]}),a.jsx("h3",{style:{fontSize:"1.1rem",fontWeight:800,marginBottom:14,letterSpacing:"-0.02em"},children:"Topic Category Breakdown (5 SVG Circular Rings)"}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:14,marginBottom:28},children:c.map(u=>{const h=2*Math.PI*36,p=h-u.pct/100*h;return a.jsxs("div",{className:"card-light",style:{padding:18,textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"},children:[a.jsxs("div",{style:{position:"relative",width:90,height:90,marginBottom:10},children:[a.jsxs("svg",{width:"90",height:"90",viewBox:"0 0 90 90",style:{transform:"rotate(-90deg)"},children:[a.jsx("circle",{cx:"45",cy:"45",r:36,fill:"none",stroke:"var(--bg-grey)",strokeWidth:"7"}),a.jsx("circle",{cx:"45",cy:"45",r:36,fill:"none",stroke:u.color,strokeWidth:"7",strokeDasharray:h,strokeDashoffset:p,strokeLinecap:"round",style:{transition:"stroke-dashoffset 0.8s ease"}})]}),a.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"},children:a.jsxs("span",{style:{fontSize:"1rem",fontWeight:900,color:"#000000"},children:[u.pct,"%"]})})]}),a.jsx("div",{style:{fontSize:"0.88rem",fontWeight:800,color:"#000000",marginBottom:2},children:u.label}),a.jsxs("span",{style:{fontSize:"0.75rem",color:"var(--text-secondary)",fontWeight:600},children:[u.completed," of ",u.total," Solved"]})]},u.name)})}),a.jsx("h3",{style:{fontSize:"1.1rem",fontWeight:800,marginBottom:14,letterSpacing:"-0.02em"},children:"30 Level Campaign Status"}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(130px, 1fr))",gap:10},children:Qe.map(u=>{const d=e.starsPerLevel[u.id]||0,h=e.completedLevels.includes(u.id),p=u.levelNumber<=e.levelUnlocked;return a.jsxs("div",{className:h?"card-black":p?"card-light":"card-grey",style:{padding:12,borderRadius:"var(--radius-md)",opacity:p?1:.6,textAlign:"center"},children:[a.jsxs("div",{style:{fontSize:"0.7rem",fontWeight:800,color:h?"var(--accent-gold)":"var(--text-muted)"},children:["L",u.levelNumber]}),a.jsx("div",{style:{fontSize:"0.82rem",fontWeight:700,color:h?"#FFFFFF":p?"#000000":"var(--text-muted)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:u.title.split(" ")[0]}),a.jsx("div",{style:{display:"flex",justifyContent:"center",gap:2,marginTop:6},children:[1,2,3].map(x=>a.jsx(ti,{size:11,color:x<=d?"var(--accent-gold)":"rgba(150,150,150,0.3)",fill:x<=d?"var(--accent-gold)":"transparent"},x))})]},u.id)})})]})},kr=[{id:"comp-avl-redblack",title:"AVL Tree vs Red-Black Tree",category:"Trees",algoA:{name:"AVL Tree",timeComplexity:{search:"O(log N)",insert:"O(log N)",delete:"O(log N)"},spaceComplexity:"O(N)",pros:["Strict height balance (h ≤ 1.44 log N)","Faster search lookups than Red-Black"],cons:["More frequent rotations on insertion/deletion"],bestFor:"Lookup-heavy workloads (read-intensive databases)"},algoB:{name:"Red-Black Tree",timeComplexity:{search:"O(log N)",insert:"O(log N)",delete:"O(log N)"},spaceComplexity:"O(N)",pros:["Fewer rotations during insert/delete (max 3 rotations)","Faster writes"],cons:["Slightly taller tree height (h ≤ 2 log N)"],bestFor:"Write-heavy workloads (C++ std::map, Java TreeMap)"},recommendation:"Use AVL Trees for read-intensive lookups; use Red-Black Trees when frequent insertions and deletions occur."},{id:"comp-dijkstra-bellman",title:"Dijkstra vs Bellman-Ford Algorithm",category:"Graphs",algoA:{name:"Dijkstra's Algorithm",timeComplexity:{search:"O((V+E) log V)",insert:"O(V log V)",delete:"O(V)"},spaceComplexity:"O(V + E)",pros:["Fast O((V+E) log V) with Min-Heap","Optimal for road networks"],cons:["Fails on negative edge weights"],bestFor:"Non-negative weighted single-source routing"},algoB:{name:"Bellman-Ford Algorithm",timeComplexity:{search:"O(V × E)",insert:"O(V E)",delete:"O(V E)"},spaceComplexity:"O(V)",pros:["Handles negative edge weights","Detects negative weight cycles"],cons:["Slower O(V × E) time complexity"],bestFor:"Graphs with negative edge weights and financial arbitrage detection"},recommendation:"Use Dijkstra when edge weights are positive; use Bellman-Ford when negative weights or cycle detection are required."},{id:"comp-bfs-dfs",title:"Breadth-First Search (BFS) vs Depth-First Search (DFS)",category:"Graphs",algoA:{name:"Breadth-First Search (BFS)",timeComplexity:{search:"O(V + E)",insert:"O(V)",delete:"O(V)"},spaceComplexity:"O(V)",pros:["Guarantees shortest path in unweighted graphs","Level-order exploration"],cons:["Higher memory usage for wide graphs (Queue storage)"],bestFor:"Shortest path in unweighted graphs & Social network connections"},algoB:{name:"Depth-First Search (DFS)",timeComplexity:{search:"O(V + E)",insert:"O(V)",delete:"O(V)"},spaceComplexity:"O(h)",pros:["Low memory footprint O(h recursion stack)","Ideal for maze solving & topological sort"],cons:["Does not guarantee shortest path"],bestFor:"Topological Sorting, Cycle Detection, and Backtracking"},recommendation:"Use BFS for shortest path queries on unweighted graphs; use DFS for structural graph traversal, topological sorting, and cycle detection."},{id:"comp-trie-hashtable",title:"Trie (Prefix Tree) vs Hash Table",category:"Strings",algoA:{name:"Trie (Prefix Tree)",timeComplexity:{search:"O(L)",insert:"O(L)",delete:"O(L)"},spaceComplexity:"O(N × L × Alphabet)",pros:["Prefix matching auto-complete lookups","No hash collisions"],cons:["Higher memory overhead per node pointer"],bestFor:"Auto-complete suggestions, Spell Checkers, Longest Prefix Matching"},algoB:{name:"Hash Table",timeComplexity:{search:"O(1) average",insert:"O(1) average",delete:"O(1) average"},spaceComplexity:"O(N)",pros:["Instant O(1) average key lookups","Memory efficient for generic keys"],cons:["Cannot perform prefix matching queries","Hash collisions worst-case O(N)"],bestFor:"Exact key-value lookups without prefix order"},recommendation:"Use Trie when prefix searches and auto-complete are required; use Hash Table for exact key-value storage."},{id:"comp-segment-fenwick",title:"Segment Tree vs Fenwick Tree (BIT)",category:"Trees",algoA:{name:"Segment Tree",timeComplexity:{search:"O(log N)",insert:"O(log N)",delete:"O(log N)"},spaceComplexity:"O(4N)",pros:["Supports arbitrary range queries (Sum, Min, Max, GCD)","Supports Lazy Propagation"],cons:["Larger memory overhead (4N nodes)","More complex implementation"],bestFor:"Complex range query problems with range updates"},algoB:{name:"Fenwick Tree (BIT)",timeComplexity:{search:"O(log N)",insert:"O(log N)",delete:"O(log N)"},spaceComplexity:"O(N)",pros:["Minimal memory footprint (1D array N)","Extremely fast bitwise operations i & (-i)"],cons:["Limited to invertible range operations (Sum, XOR)"],bestFor:"Range sum queries and frequency counting with low memory overhead"},recommendation:"Use Fenwick Tree for simple range sums due to minimal code and memory; use Segment Tree when Range Min/Max or Range Updates are needed."},{id:"comp-knapsack-fractional",title:"0/1 Knapsack (DP) vs Fractional Knapsack (Greedy)",category:"DynamicProgramming",algoA:{name:"0/1 Knapsack (DP)",timeComplexity:{search:"O(N × W)",insert:"O(N W)",delete:"O(N W)"},spaceComplexity:"O(N × W)",pros:["Exact optimal solution for discrete item choices","Handles non-divisible items"],cons:["Pseudo-polynomial time complexity dependent on capacity W"],bestFor:"Discrete item selection problems (cannot break items)"},algoB:{name:"Fractional Knapsack (Greedy)",timeComplexity:{search:"O(N log N)",insert:"O(N log N)",delete:"O(N log N)"},spaceComplexity:"O(1)",pros:["Fast O(N log N) greedy sorting by value/weight ratio","Always optimal for divisible items"],cons:["Only works when items can be split into fractions"],bestFor:"Continuous resource allocation (fluids, gold dust, bandwidth)"},recommendation:"Use 0/1 Knapsack (DP) when items are atomic; use Fractional Knapsack (Greedy) when items can be divided into fractions."},{id:"comp-prim-kruskal",title:"Prim's MST vs Kruskal's MST Algorithm",category:"Graphs",algoA:{name:"Prim's MST Algorithm",timeComplexity:{search:"O((V+E) log V)",insert:"O(E log V)",delete:"O(E log V)"},spaceComplexity:"O(V + E)",pros:["Faster on dense graphs (high E/V ratio)"],cons:["Requires connected graph representation"],bestFor:"Dense graph Minimum Spanning Trees"},algoB:{name:"Kruskal's MST Algorithm",timeComplexity:{search:"O(E log E)",insert:"O(E log E)",delete:"O(E log E)"},spaceComplexity:"O(V + E)",pros:["Faster on sparse graphs","Uses Disjoint Set Union (DSU)"],cons:["Slower on dense graphs due to edge sorting"],bestFor:"Sparse graph Minimum Spanning Trees"},recommendation:"Use Prim's for dense graphs; use Kruskal's for sparse graphs."},{id:"comp-kmp-naive",title:"KMP Pattern Search vs Naive String Matcher",category:"Strings",algoA:{name:"Knuth-Morris-Pratt (KMP)",timeComplexity:{search:"O(N + M)",insert:"O(M)",delete:"O(M)"},spaceComplexity:"O(M)",pros:["Guaranteed linear O(N + M) worst-case time","No backtracking in text"],cons:["Requires LPS preprocessing array"],bestFor:"Large text processing and DNA sequence matching"},algoB:{name:"Naive String Matcher",timeComplexity:{search:"O(N × M)",insert:"O(1)",delete:"O(1)"},spaceComplexity:"O(1)",pros:["Zero additional space overhead","Simple implementation"],cons:["Pathological O(N × M) worst-case time on repetitive patterns"],bestFor:"Short text matching"},recommendation:"Use KMP when searching repetitive patterns in large text files."},{id:"comp-floyd-johnson",title:"Floyd-Warshall vs Johnson's All-Pairs Algorithm",category:"Graphs",algoA:{name:"Floyd-Warshall Algorithm",timeComplexity:{search:"O(V³)",insert:"O(V³)",delete:"O(V³)"},spaceComplexity:"O(V²)",pros:["Extremely simple 3 nested loops implementation"],cons:["Always runs in O(V³) time regardless of edge count"],bestFor:"Dense All-Pairs Shortest Path graphs"},algoB:{name:"Johnson's Algorithm",timeComplexity:{search:"O(V² log V + V E)",insert:"O(V E)",delete:"O(V E)"},spaceComplexity:"O(V + E)",pros:["Significantly faster on sparse graphs than Floyd-Warshall"],cons:["Combines Bellman-Ford reweighting with Dijkstra"],bestFor:"Sparse All-Pairs Shortest Path graphs with negative edges"},recommendation:"Use Floyd-Warshall for simple implementation on dense graphs; use Johnson's for sparse graphs."},{id:"comp-btree-lsm",title:"B-Tree vs LSM-Tree (Log-Structured Merge)",category:"Trees",algoA:{name:"B-Tree",timeComplexity:{search:"O(log N)",insert:"O(log N)",delete:"O(log N)"},spaceComplexity:"O(N)",pros:["In-place random read efficiency","Optimal point lookups"],cons:["Random write I/O amplification on SSDs"],bestFor:"Relational SQL Databases (PostgreSQL, MySQL InnoDB)"},algoB:{name:"LSM-Tree (Log-Structured Merge)",timeComplexity:{search:"O(log N)",insert:"O(1) append",delete:"O(1) tombstone"},spaceComplexity:"O(N)",pros:["Sequential append-only write performance","No random disk writes"],cons:["Slower point reads due to multiple SSTable merges"],bestFor:"NoSQL Write-Heavy Databases (RocksDB, Cassandra, LevelDB)"},recommendation:"Use B-Tree for relational read-heavy systems; use LSM-Tree for append-only write-heavy storage engines."},{id:"comp-topo-kahn-dfs",title:"Kahn’s Algorithm vs DFS Topological Sort",category:"Graphs",algoA:{name:"Kahn’s Algorithm (BFS)",timeComplexity:{search:"O(V + E)",insert:"O(V + E)",delete:"O(V + E)"},spaceComplexity:"O(V)",pros:["Detects cycles via the count of processed nodes","Iterative — no recursion stack overflow risk"],cons:["Needs an in-degree array precomputation pass"],bestFor:"Course scheduling, build systems with dependency checks"},algoB:{name:"DFS Topological Sort",timeComplexity:{search:"O(V + E)",insert:"O(V + E)",delete:"O(V + E)"},spaceComplexity:"O(V) recursion stack",pros:["Very concise recursive implementation","Can be combined with cycle detection DFS"],cons:["Recursion depth O(V) can overflow on huge graphs"],bestFor:"Small graphs and interview-style dependency ordering"},recommendation:"Prefer Kahn’s algorithm for cycle detection and production build systems; use DFS topo-sort for simplicity in small graphs."},{id:"comp-lcs-editdist",title:"Longest Common Subsequence vs Edit Distance",category:"DynamicProgramming",algoA:{name:"LCS (Longest Common Subsequence)",timeComplexity:{search:"O(N × M)",insert:"O(N × M)",delete:"O(N × M)"},spaceComplexity:"O(min(N, M)) optimized",pros:["Foundation for diff tools (git) and version control","Only adds/deletes — no substitution"],cons:["Does not model substitution costs (3 operations)"],bestFor:"File diffing, plagiarism detection, DNA alignment"},algoB:{name:"Edit Distance (Levenshtein)",timeComplexity:{search:"O(N × M)",insert:"O(N × M)",delete:"O(N × M)"},spaceComplexity:"O(min(N, M)) optimized",pros:["Models insert + delete + substitution (3 operations)","Supports weighted operation costs"],cons:["Does not output the alignment itself without extra backtracking"],bestFor:"Spell checkers, fuzzy string matching, OCR error correction"},recommendation:"Use LCS when only insert/delete matter (diffing); use Edit Distance when substitutions must be scored."},{id:"comp-manacher-naive",title:"Manacher vs Naive Palindrome Detection",category:"Strings",algoA:{name:"Manacher’s Algorithm",timeComplexity:{search:"O(N)",insert:"O(N)",delete:"O(N)"},spaceComplexity:"O(N)",pros:["Linear-time for ALL palindrome substrings","Mirror optimization reuses earlier radii"],cons:["Complex index juggling with transformed string #a#b#a#"],bestFor:"Longest palindromic substring on large strings"},algoB:{name:"Naive Center Expansion",timeComplexity:{search:"O(N²)",insert:"O(N)",delete:"O(N)"},spaceComplexity:"O(1)",pros:["Simple two-pointer symmetry check","No extra memory"],cons:["O(N²) worst case on long repetitive strings"],bestFor:"Short strings and simple interview answers"},recommendation:"Use Manacher for production-grade longest-palindrome queries; naive expansion is fine for short inputs."},{id:"comp-suffixtree-trie",title:"Suffix Tree vs Trie (Prefix Tree)",category:"Strings",algoA:{name:"Suffix Tree",timeComplexity:{search:"O(M) substring query",insert:"O(N) build",delete:"O(N) build"},spaceComplexity:"O(N) with compressed edges (Ukkonen)",pros:["Exact substring search in O(M) regardless of N","Enables longest repeated substring in O(N)"],cons:["Complex Ukkonen construction — huge implementation effort"],bestFor:"Genome analysis, plagiarism detection, bioinformatics"},algoB:{name:"Trie (Prefix Tree)",timeComplexity:{search:"O(L) prefix lookup",insert:"O(L)",delete:"O(L)"},spaceComplexity:"O(total characters × alphabet)",pros:["Simple node-array or map implementation","Great for auto-complete and prefix counting"],cons:["Substring (not prefix) queries need extra work"],bestFor:"Autocomplete, spell check, IP longest-prefix-match"},recommendation:"Use a Trie when you need prefix queries and autocomplete; use a Suffix Tree when arbitrary substring search must be O(M)."},{id:"comp-bfs-dijkstra",title:"BFS vs Dijkstra (Shortest Path)",category:"Graphs",algoA:{name:"Breadth-First Search",timeComplexity:{search:"O(V + E)",insert:"O(V + E)",delete:"O(V + E)"},spaceComplexity:"O(V) queue",pros:["Shortest path in unweighted graphs","Simplest possible level-order implementation"],cons:["BFS layer count ≠ distance once weights vary"],bestFor:"Unweighted graphs: mazes, social networks, word ladders"},algoB:{name:"Dijkstra (Min-Heap)",timeComplexity:{search:"O((V + E) log V)",insert:"O(E log V)",delete:"O(V log V)"},spaceComplexity:"O(V + E)",pros:["Handles arbitrary non-negative weights","Edge relaxations are greedy and optimal"],cons:["Fails on negative weights; heap adds log factor"],bestFor:"Weighted routing: maps, network latency, flight graphs"},recommendation:"Use BFS when all edges cost the same; switch to Dijkstra the moment edges get different weights."},{id:"comp-knapsack-01-unbounded",title:"0/1 Knapsack vs Unbounded Knapsack",category:"DynamicProgramming",algoA:{name:"0/1 Knapsack",timeComplexity:{search:"O(N × W)",insert:"O(N × W)",delete:"O(N × W)"},spaceComplexity:"O(W) optimized",pros:["Each item used at most once — classic binary choice"],cons:["Iterating items in the outer loop is mandatory"],bestFor:"Portfolio selection, one-of-each resource allocation"},algoB:{name:"Unbounded Knapsack",timeComplexity:{search:"O(N × W)",insert:"O(N × W)",delete:"O(N × W)"},spaceComplexity:"O(W)",pros:["Items can be reused unlimited times","Iterate capacity in the outer loop"],cons:["Same pseudo-polynomial bound in W"],bestFor:"Coin change (minimum coins), cutting-stock, unlimited inventory"},recommendation:"Loop items outside for 0/1; loop capacity outside for unbounded. Same table, different traversal order."},{id:"comp-binary-linear",title:"Binary Search vs Linear Search",category:"Search",algoA:{name:"Binary Search",timeComplexity:{search:"O(log N)",insert:"O(log N)",delete:"O(log N)"},spaceComplexity:"O(1) iterative",pros:["Exponentially faster on large sorted data"],cons:["Requires sorted array; no duplicates ambiguity"],bestFor:"Sorted arrays, databases, libraries (STL lower_bound)"},algoB:{name:"Linear Search",timeComplexity:{search:"O(N)",insert:"O(1)",delete:"O(1)"},spaceComplexity:"O(1)",pros:["Works on unsorted data — no preprocessing"],cons:["Linear scan on big datasets"],bestFor:"Small arrays, unsorted lists, single-pass checks"},recommendation:"Sort once then binary search when query count is high; keep linear for tiny or unsorted collections."},{id:"comp-quick-merge",title:"Quick Sort vs Merge Sort",category:"Sorting",algoA:{name:"Quick Sort",timeComplexity:{search:"O(N log N)",insert:"O(N log N)",delete:"O(N log N)"},spaceComplexity:"O(log N) stack",pros:["In-place partitioning — cache friendly","Fastest in practice on random data"],cons:["Worst case O(N²) on bad pivots"],bestFor:"General-purpose in-memory sorting (Arrays.sort)"},algoB:{name:"Merge Sort",timeComplexity:{search:"O(N log N)",insert:"O(N log N)",delete:"O(N log N)"},spaceComplexity:"O(N) auxiliary",pros:["Stable sort — preserves equal-key order","Guaranteed O(N log N) for every input"],cons:[""],bestFor:"Linked lists, external/disk sorting, stable ordering"},recommendation:"Use Quick Sort in memory; use Merge Sort when stability or worst-case guarantees matter."},{id:"comp-greedy-dp",title:"Greedy vs Dynamic Programming",category:"DynamicProgramming",algoA:{name:"Greedy Strategy",timeComplexity:{search:"O(N log N) typical",insert:"O(N log N)",delete:"O(N log N)"},spaceComplexity:"O(1) often",pros:["Simple, fast, low memory","Optimal when the greedy choice property holds"],cons:[""],bestFor:"Activity selection, Huffman coding, fractional knapsack, MST"},algoB:{name:"Dynamic Programming",timeComplexity:{search:"O(states × transitions)",insert:"O(states × transitions)",delete:"O(states × transitions)"},spaceComplexity:"Depends on state table",pros:["Guaranteed optimal via exhaustive state exploration"],cons:[""],bestFor:"0/1 knapsack, LCS, edit distance, shortest paths"},recommendation:"Verify the greedy choice property first; if the best local pick can ever be suboptimal, switch to DP."},{id:"comp-hashmap-bstmap",title:"Hash Map vs Balanced BST Map",category:"AdvancedSets",algoA:{name:"Hash Map",timeComplexity:{search:"O(1) average",insert:"O(1) average",delete:"O(1) average"},spaceComplexity:"O(N) + table overhead",pros:["Constant-time lookups","Simple buckets + collision chains"],cons:[""],bestFor:"Caches, deduplication, frequency counting"},algoB:{name:"Balanced BST Map (TreeMap)",timeComplexity:{search:"O(log N)",insert:"O(log N)",delete:"O(log N)"},spaceComplexity:"O(N)",pros:["Ordered keys: min/max, range scans, predecessor"],cons:[""],bestFor:"Order statistics, nearest neighbors, sorted iteration"},recommendation:"Hash when you only need lookup; BST map when you need sorted traversal, ranges, or order statistics."}],r1=()=>{const[e,t]=z.useState(kr[0].id),n=kr.find(s=>s.id===e)||kr[0],r=s=>/O\(1\)|O\(α|O\(L\)|O\(M\)/i.test(s)?1:/log/i.test(s)&&!/V\^3|N\^3|N\^2|N \\times M|N × M/i.test(s)?2:/N \* M|N × M|V \\times E|V × E|N\\times M|N\\cdot/i.test(s)?4:/N\^2|V\^2|O\(V²\)|O\(N²\)/i.test(s)?5:/N\^3|V\^3|O\(V³\)|O\(N³\)/i.test(s)?7:/2\^n|2\^N|2\^|n!|N!/i.test(s)?9:3,i=s=>{const l=Math.min(100,r(s)*14);return a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:3},children:[a.jsx("span",{style:{fontSize:"0.8rem",color:"var(--text-secondary)",width:130,flexShrink:0},children:"Search / Lookup"}),a.jsx("div",{style:{flex:1,height:10,background:"var(--bg-grey)",borderRadius:100,overflow:"hidden"},children:a.jsx("div",{className:"complexity-bar",style:{width:`${l}%`,background:"linear-gradient(90deg, #FF3B30, #FF9500)"}})}),a.jsx("strong",{style:{fontFamily:"var(--font-code)",fontSize:"0.8rem",width:90,textAlign:"right",flexShrink:0},children:s})]})},o=(s,l)=>{const c=l==="A"?"var(--accent-red)":"var(--accent-blue)";return a.jsxs("div",{className:"compare-card fade-in-up",style:{animationDelay:`${l==="A"?60:140}ms`,borderTop:`4px solid ${c}`},children:[a.jsxs("div",{style:{fontSize:"0.72rem",fontWeight:800,color:c,textTransform:"uppercase",marginBottom:4},children:["OPTION ",l]}),a.jsx("h3",{style:{fontSize:"1.4rem",fontWeight:900,marginBottom:16},children:s.name}),a.jsxs("div",{style:{background:"var(--bg-light)",padding:12,borderRadius:"var(--radius-md)",marginBottom:14},children:[a.jsxs("div",{style:{fontSize:"0.75rem",fontWeight:700,color:"var(--text-muted)",marginBottom:6,display:"flex",alignItems:"center",gap:4},children:[a.jsx(yx,{size:12})," TIME COMPLEXITIES"]}),i(s.timeComplexity.search),a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",marginBottom:3},children:[a.jsx("span",{children:"Insertion:"})," ",a.jsx("strong",{style:{fontFamily:"var(--font-code)"},children:s.timeComplexity.insert})]}),a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",marginBottom:3},children:[a.jsx("span",{children:"Deletion:"})," ",a.jsx("strong",{style:{fontFamily:"var(--font-code)"},children:s.timeComplexity.delete})]}),a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem"},children:[a.jsx("span",{children:"Space Complexity:"})," ",a.jsx("strong",{style:{fontFamily:"var(--font-code)"},children:s.spaceComplexity})]})]}),a.jsxs("h4",{style:{fontSize:"0.88rem",fontWeight:800,color:"var(--accent-blue)",marginBottom:8,display:"flex",alignItems:"center",gap:4},children:[a.jsx(Cx,{size:14})," Best For"]}),a.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-body)",lineHeight:1.5,marginBottom:14,padding:"10px 12px",background:`linear-gradient(135deg, ${l==="A"?"rgba(255,59,48,0.06)":"rgba(0,122,255,0.06)"}, transparent)`,borderRadius:"var(--radius-md)"},children:s.bestFor}),a.jsxs("h4",{style:{fontSize:"0.88rem",fontWeight:800,color:"var(--accent-green)",marginBottom:8,display:"flex",alignItems:"center",gap:4},children:[a.jsx(Nt,{size:14})," Advantages & Strengths"]}),a.jsx("ul",{style:{paddingLeft:16,fontSize:"0.85rem",color:"var(--text-body)",lineHeight:1.5,marginBottom:14},children:s.pros.map((u,d)=>a.jsx("li",{className:"fade-in-up",style:{animationDelay:`${180+d*80}ms`},children:u},d))}),a.jsxs("h4",{style:{fontSize:"0.88rem",fontWeight:800,color:"var(--accent-red)",marginBottom:8,display:"flex",alignItems:"center",gap:4},children:[a.jsx(jo,{size:14})," Disadvantages & Drawbacks"]}),a.jsx("ul",{style:{paddingLeft:16,fontSize:"0.85rem",color:"var(--text-body)",lineHeight:1.5},children:s.cons.map((u,d)=>a.jsx("li",{className:"fade-in-up",style:{animationDelay:`${240+d*80}ms`},children:u},d))})]})};return a.jsxs("div",{style:{maxWidth:"var(--max-width)",margin:"0 auto",padding:"24px 16px"},children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:24},children:[a.jsxs("h2",{className:"section-title",children:["Side-by-Side Algorithm Comparison Engine (",kr.length," Pairs)"]}),a.jsx("p",{className:"section-subtitle",children:"Compare time complexities, space constraints, and real-world trade-offs between key algorithm pairs."})]}),a.jsx("div",{style:{display:"flex",gap:6,overflowX:"auto",marginBottom:24,paddingBottom:8},children:kr.map((s,l)=>a.jsx("button",{onClick:()=>t(s.id),className:"fade-in-up",style:{background:e===s.id?"#000000":"var(--bg-light)",color:e===s.id?"#FFFFFF":"var(--text-secondary)",border:`1px solid ${e===s.id?"#000000":"var(--border-hairline)"}`,borderRadius:"100px",padding:"8px 16px",fontSize:"0.8rem",fontWeight:700,cursor:"pointer",fontFamily:"var(--font-main)",transition:"all 0.25s ease",whiteSpace:"nowrap",animationDelay:`${l*30}ms`,boxShadow:e===s.id?"0 4px 14px rgba(0,0,0,0.2)":"none",transform:e===s.id?"translateY(-1px)":"none"},children:s.title},s.id))}),a.jsxs("div",{className:"verdict-card fade-in-up",style:{padding:22,marginBottom:24,borderRadius:"var(--radius-lg)",position:"relative",overflow:"hidden"},children:[a.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg, #FFCC00, #FF9500, #FFCC00)",backgroundSize:"200% 100%",animation:"gradient-slide 3s linear infinite"}}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:"0.72rem",fontWeight:800,color:"var(--accent-gold)",textTransform:"uppercase",marginBottom:8},children:[a.jsx(is,{size:14})," ADSA VERDICT & RECOMMENDATION"]}),a.jsxs("p",{style:{fontSize:"1.02rem",fontWeight:600,color:"#FFFFFF",lineHeight:1.55},children:[a.jsx("span",{className:"verdict-glow",children:"🏆"})," ",n.recommendation]}),a.jsxs("div",{style:{marginTop:12,display:"flex",gap:8,flexWrap:"wrap"},children:[a.jsxs("span",{style:{fontSize:"0.72rem",fontWeight:800,background:"rgba(255,255,255,0.12)",color:"#fff",padding:"4px 12px",borderRadius:100},children:[a.jsx(ur,{size:11,style:{marginRight:4,verticalAlign:-1}})," ",n.algoA.name]}),a.jsxs("span",{style:{fontSize:"0.72rem",fontWeight:800,background:"rgba(255,255,255,0.12)",color:"#fff",padding:"4px 12px",borderRadius:100},children:["vs ",n.algoB.name]})]})]},`verdict-${n.id}`),a.jsxs("div",{style:{position:"relative",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:20},children:[o(n.algoA,"A"),a.jsx("div",{style:{position:"absolute",top:"42%",left:"50%",transform:"translate(-50%, -50%)",zIndex:2},className:"fade-in-up",children:a.jsx("div",{style:{width:56,height:56,borderRadius:"50%",background:"#000",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(0,0,0,0.35)",border:"3px solid #fff"},children:a.jsx(rf,{size:24})})}),o(n.algoB,"B")]},`cards-${n.id}`)]})},ou="adsa-quest-pinned-notes",i1=({userProgress:e})=>{const[t,n]=z.useState([]),[r,i]=z.useState([]),[o,s]=z.useState(""),[l,c]=z.useState(""),[u,d]=z.useState(""),[h,p]=z.useState(!1),[x,b]=z.useState(null),[v,A]=z.useState(""),[g,f]=z.useState(""),[m,w]=z.useState(null),[S,N]=z.useState(()=>{try{return JSON.parse(localStorage.getItem(ou)||"[]")}catch{return[]}}),T=e.username||"Student";z.useEffect(()=>{async function O(){const E=await Vx(T),I=await Qx(T);n(E),i(I)}O()},[T]);const C=O=>{N(E=>{const I=E.includes(O)?E.filter(y=>y!==O):[O,...E];try{localStorage.setItem(ou,JSON.stringify(I))}catch{}return I})},M=async O=>{if(O.preventDefault(),!l.trim()||!u.trim())return;const E=await Hx(T,l.toLowerCase().replace(/\s+/g,"-"),l,u);E&&E.note&&(n(I=>[E.note,...I]),c(""),d(""),p(!1))},R=async O=>{if(m!==O){w(O),setTimeout(()=>w(E=>E===O?null:E),2500);return}await Kx(O),n(E=>E.filter(I=>I.id!==O)),w(null)},L=O=>{b(O.id),A(O.topicTitle||""),f(O.content||"")},V=async O=>{if(!g.trim())return;const E=await Gx(O,v.trim()||"Untitled",g);E&&E.note&&n(I=>I.map(y=>y.id===O?E.note:y)),b(null)},K=O=>{if(!O)return"";try{return new Date(O).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}catch{return""}},G=O=>O.trim().split(/\s+/).filter(Boolean).length,ie=t.filter(O=>(O.topicTitle||"").toLowerCase().includes(o.toLowerCase())||(O.content||"").toLowerCase().includes(o.toLowerCase())).sort((O,E)=>{const I=S.includes(O.id),y=S.includes(E.id);return I!==y?I?-1:1:new Date(E.updatedAt||0).getTime()-new Date(O.updatedAt||0).getTime()}),ve=t.reduce((O,E)=>O+G(E.content||""),0);return a.jsxs("div",{style:{maxWidth:"var(--max-width)",margin:"0 auto",padding:"24px 16px"},children:[a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12},children:[a.jsxs("div",{children:[a.jsx("h2",{className:"section-title",children:"Study Notes & Bookmarks"}),a.jsx("p",{className:"section-subtitle",children:"Your personal database-synced study notes and bookmarked algorithm steps."})]}),a.jsxs("button",{className:"btn btn-primary",onClick:()=>p(!h),children:[a.jsx(mf,{size:16})," ",h?"Cancel":"New Note"]})]}),a.jsx("div",{style:{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"},children:[{label:"Total Notes",value:t.length},{label:"Pinned",value:S.filter(O=>t.some(E=>E.id===O)).length},{label:"Total Words",value:ve.toLocaleString()},{label:"Bookmarks",value:r.length}].map(O=>a.jsxs("div",{className:"card-light",style:{padding:"10px 18px",textAlign:"center",minWidth:110},children:[a.jsx("div",{style:{fontSize:"1.25rem",fontWeight:900},children:O.value}),a.jsx("div",{style:{fontSize:"0.7rem",fontWeight:700,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.05em"},children:O.label})]},O.label))}),h&&a.jsxs("form",{onSubmit:M,className:"card-light fade-in",style:{padding:20,marginBottom:24},children:[a.jsx("h4",{style:{fontSize:"1rem",fontWeight:800,marginBottom:14},children:"Create New Algorithm Note"}),a.jsx("input",{type:"text",placeholder:"Topic Title (e.g. AVL Left-Right Double Rotation)",value:l,onChange:O=>c(O.target.value),style:{width:"100%",marginBottom:12},required:!0}),a.jsx("textarea",{placeholder:"Write your detailed notes, code insights, or complexity breakdown...",value:u,onChange:O=>d(O.target.value),rows:4,style:{width:"100%",marginBottom:14,fontFamily:"var(--font-main)"},required:!0}),a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[a.jsxs("span",{style:{fontSize:"0.75rem",color:"var(--text-muted)",fontWeight:600},children:[G(u)," words"]}),a.jsxs("button",{type:"submit",className:"btn btn-primary",style:{minWidth:120},children:[a.jsx(jx,{size:15,style:{marginRight:5}})," Save Note"]})]})]}),a.jsxs("div",{className:"card-light",style:{padding:"12px 16px",marginBottom:24,display:"flex",alignItems:"center",gap:10},children:[a.jsx(lc,{size:18,color:"var(--text-muted)"}),a.jsx("input",{type:"text",placeholder:"Search notes by topic or keyword...",value:o,onChange:O=>s(O.target.value),style:{border:"none",padding:0,width:"100%",boxShadow:"none"}}),o&&a.jsxs("span",{style:{fontSize:"0.75rem",fontWeight:700,color:"#007AFF",whiteSpace:"nowrap"},children:[ie.length," match",ie.length===1?"":"es"]})]}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:16},children:ie.length===0?a.jsxs("div",{className:"card-grey",style:{gridColumn:"1 / -1",textAlign:"center",padding:36},children:[a.jsx(oc,{size:32,color:"var(--text-muted)",style:{marginBottom:12}}),a.jsx("h4",{style:{fontSize:"1.1rem",fontWeight:700,marginBottom:4},children:t.length===0?"No Study Notes Found":"No matching notes"}),a.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-muted)"},children:t.length===0?'Click "New Note" above to write your first note!':"Try a different search keyword."})]}):ie.map(O=>a.jsxs("div",{className:`card-light fade-in ${S.includes(O.id),""}`,style:{display:"flex",flexDirection:"column",justifyContent:"space-between",border:S.includes(O.id)?"1.5px solid rgba(255,204,0,0.55)":void 0},children:[a.jsxs("div",{children:[a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8},children:[a.jsxs("span",{style:{fontSize:"0.7rem",fontWeight:800,color:"var(--accent-red)",textTransform:"uppercase",letterSpacing:"0.04em",display:"flex",alignItems:"center",gap:5},children:[S.includes(O.id)&&a.jsx(tu,{size:12,color:"var(--accent-gold)"}),S.includes(O.id)?"PINNED NOTE":"STUDY NOTE"]}),a.jsxs("span",{style:{display:"flex",gap:6},children:[a.jsx("button",{onClick:()=>C(O.id),style:{background:"none",border:"none",cursor:"pointer",color:S.includes(O.id)?"var(--accent-gold)":"var(--text-muted)"},title:S.includes(O.id)?"Unpin note":"Pin note",children:a.jsx(tu,{size:15})}),a.jsx("button",{onClick:()=>x===O.id?b(null):L(O),style:{background:"none",border:"none",cursor:"pointer",color:x===O.id?"#007AFF":"var(--text-muted)"},title:"Edit note",children:x===O.id?a.jsx(xf,{size:15}):a.jsx(Nx,{size:15})}),a.jsx("button",{onClick:()=>R(O.id),style:{background:m===O.id?"var(--accent-red)":"none",border:"none",cursor:"pointer",color:m===O.id?"#FFFFFF":"var(--text-muted)",padding:"2px 6px",borderRadius:6,transition:"all 0.2s ease"},title:m===O.id?"Click again to confirm delete":"Delete note",children:a.jsx(Tx,{size:15})})]})]}),x===O.id?a.jsxs("div",{children:[a.jsx("input",{type:"text",value:v,onChange:E=>A(E.target.value),style:{width:"100%",marginBottom:8,fontSize:"1rem",fontWeight:800}}),a.jsx("textarea",{value:g,onChange:E=>f(E.target.value),rows:6,style:{width:"100%",marginBottom:8,fontFamily:"var(--font-main)",fontSize:"0.88rem"}}),a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10},children:[a.jsxs("span",{style:{fontSize:"0.72rem",color:"var(--text-muted)",fontWeight:600},children:[G(g)," words"]}),a.jsxs("div",{style:{display:"flex",gap:8},children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>b(null),style:{padding:"6px 12px",fontSize:"0.78rem"},children:"Cancel"}),a.jsxs("button",{className:"btn btn-primary",onClick:()=>V(O.id),style:{padding:"6px 14px",fontSize:"0.78rem"},children:[a.jsx(af,{size:14,style:{marginRight:4}})," Save"]})]})]})]}):a.jsxs(a.Fragment,{children:[a.jsx("h3",{style:{fontSize:"1.1rem",fontWeight:800,marginBottom:8,letterSpacing:"-0.02em"},children:O.topicTitle}),a.jsx("p",{style:{fontSize:"0.88rem",color:"var(--text-body)",lineHeight:1.55,whiteSpace:"pre-wrap"},children:O.content})]})]}),a.jsxs("div",{style:{marginTop:14,paddingTop:10,borderTop:"1px solid var(--border-hairline)",fontSize:"0.72rem",color:"var(--text-muted)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:4},children:[a.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[a.jsx(is,{size:12,color:"var(--accent-gold)"})," Synced with PostgreSQL DB"]}),a.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[a.jsx(hx,{size:11})," Updated ",K(O.updatedAt)]})]})]},O.id))}),r.length>0&&a.jsxs("div",{style:{marginTop:32},children:[a.jsxs("h3",{style:{fontSize:"1.05rem",fontWeight:800,marginBottom:12,display:"flex",alignItems:"center",gap:8},children:[a.jsx(eu,{size:16,color:"#007AFF"})," Bookmarked Algorithm Steps"]}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:12},children:r.map(O=>a.jsxs("div",{className:"card-light",style:{padding:16},children:[a.jsxs("div",{style:{fontSize:"0.68rem",fontWeight:800,color:"#007AFF",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:6,display:"flex",alignItems:"center",gap:5},children:[a.jsx(eu,{size:12})," BOOKMARK"]}),a.jsx("h4",{style:{fontSize:"0.98rem",fontWeight:800,marginBottom:6},children:O.topicTitle}),O.note&&a.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-body)",lineHeight:1.5},children:O.note}),a.jsxs("div",{style:{marginTop:8,fontSize:"0.68rem",color:"var(--text-muted)"},children:["Saved ",K(O.createdAt)]})]},O.id))})]})]})};function il(e){const t=[];let n=null;function r(d,h,p,x,b,v,A,g){if(!d)return;d.x=h,d.y=p;const f=d.left?d.left.height:0,m=d.right?d.right.height:0,w=f-m;let S="default";if(A!==void 0&&d.val===A&&(S="active"),g!==void 0&&d.val===g&&(S="success"),Math.abs(w)>1&&(S="error"),b.push({id:`node-${d.val}`,value:d.val,x:h,y:p,height:d.height,balanceFactor:w,state:S}),d.left){const N=h-x,T=p+70;v.push({from:`node-${d.val}`,to:`node-${d.left.val}`,highlighted:A===d.left.val}),r(d.left,N,T,x*.55,b,v,A,g)}if(d.right){const N=h+x,T=p+70;v.push({from:`node-${d.val}`,to:`node-${d.right.val}`,highlighted:A===d.right.val}),r(d.right,N,T,x*.55,b,v,A,g)}}function i(d,h,p,x,b,v,A){const g=[],f=[];return r(n,300,50,120,g,f,v,A),{stepIndex:t.length+1,totalSteps:0,title:d,explanation:{action:h,reason:p,formula:x},codeStep:b,nodes:g,edges:f,variableWatch:{"Tree Size":g.length,"Root Key":n?n.val:"NULL","Current Node":v??"None"}}}function o(d){return d?d.height:0}function s(d){return d?o(d.left)-o(d.right):0}function l(d){const h=d.left,p=h.right;return h.right=d,d.left=p,d.height=Math.max(o(d.left),o(d.right))+1,h.height=Math.max(o(h.left),o(h.right))+1,h}function c(d){const h=d.right,p=h.left;return h.left=d,d.right=p,d.height=Math.max(o(d.left),o(d.right))+1,h.height=Math.max(o(h.left),o(h.right))+1,h}t.push({stepIndex:1,totalSteps:0,title:"Initialize Empty AVL Tree",explanation:{action:"Start AVL Tree Session",reason:"AVL trees are self-balancing binary search trees.",formula:"Balance Factor = Height(Left) - Height(Right) ∈ {-1, 0, 1}"},codeStep:"insert:compare",nodes:[],edges:[]});for(const d of e){let h=function(p,x){if(!p)return{id:x,val:x,height:1,left:null,right:null};if(x<p.val)p.left=h(p.left,x);else if(x>p.val)p.right=h(p.right,x);else return p;p.height=1+Math.max(o(p.left),o(p.right));const b=s(p);return b>1&&x<p.left.val?(t.push(i(`Imbalance Detected at Node ${p.val} (BF = +2)`,"Left-Left (LL) Imbalance",`Node ${p.val} balance factor is +2. Left child ${p.left.val} is left-heavy. Performing Right Rotation.`,`Rotate Right around Node ${p.val}`,"avl:imbalance",p.val)),l(p)):b<-1&&x>p.right.val?(t.push(i(`Imbalance Detected at Node ${p.val} (BF = -2)`,"Right-Right (RR) Imbalance",`Node ${p.val} balance factor is -2. Right child ${p.right.val} is right-heavy. Performing Left Rotation.`,`Rotate Left around Node ${p.val}`,"avl:imbalance",p.val)),c(p)):b>1&&x>p.left.val?(t.push(i(`Imbalance Detected at Node ${p.val} (BF = +2)`,"Left-Right (LR) Double Imbalance",`Performing initial Left Rotation on child ${p.left.val}, followed by Right Rotation on parent ${p.val}.`,`Rotate Left(${p.left.val}) -> Rotate Right(${p.val})`,"avl:imbalance",p.val)),p.left=c(p.left),l(p)):b<-1&&x<p.right.val?(t.push(i(`Imbalance Detected at Node ${p.val} (BF = -2)`,"Right-Left (RL) Double Imbalance",`Performing initial Right Rotation on child ${p.right.val}, followed by Left Rotation on parent ${p.val}.`,`Rotate Right(${p.right.val}) -> Rotate Left(${p.val})`,"avl:imbalance",p.val)),p.right=l(p.right),c(p)):p};t.push(i(`Inserting Key ${d}`,`Traversing Binary Search Tree to place ${d}`,`Comparing ${d} with current nodes to locate insertion position.`,`Key ${d} < current node => go Left, else go Right`,"insert:compare",d)),n=h(n,d),t.push(i(`Insertion Completed for Key ${d}`,"Tree Balanced Successfully",`Key ${d} is inserted. All node balance factors satisfy |BF| <= 1.`,`Height = ${n?n.height:0}`,"insert:done",void 0,d))}const u=t.length;return t.forEach(d=>d.totalSteps=u),t}function Nf(){const e={nodes:[{id:"A",x:80,y:120},{id:"B",x:240,y:50},{id:"C",x:240,y:190},{id:"D",x:400,y:80},{id:"E",x:400,y:220}],edges:[{from:"A",to:"B",weight:4},{from:"A",to:"C",weight:2},{from:"B",to:"C",weight:1},{from:"B",to:"D",weight:5},{from:"C",to:"D",weight:8},{from:"C",to:"E",weight:10},{from:"D",to:"E",weight:2}]},t=[],n={},r=new Set,i={};e.nodes.forEach(l=>{n[l.id]=l.id==="A"?0:1/0,i[l.id]=null});function o(l,c,u,d,h,p){const x=e.nodes.map(v=>({id:v.id,value:`${v.id} (${n[v.id]===1/0?"∞":n[v.id]})`,x:v.x,y:v.y,state:h===v.id?"active":r.has(v.id)?"success":"default",customLabel:`Dist: ${n[v.id]===1/0?"∞":n[v.id]}`})),b=e.edges.map(v=>({from:v.from,to:v.to,label:v.weight,highlighted:p?p.from===v.from&&p.to===v.to||p.from===v.to&&p.to===v.from:!1,color:p&&(p.from===v.from&&p.to===v.to||p.from===v.to&&p.to===v.from)?"#00f2fe":void 0}));return{stepIndex:t.length+1,totalSteps:0,title:l,explanation:{action:c,reason:u,formula:d},highlightCodeLines:{cpp:[14,15,16],java:[12,13],python:[8,9],javascript:[10,11]},nodes:x,edges:b,arrayState:[{label:"Distance Array",values:e.nodes.map(v=>`${v.id}:${n[v.id]===1/0?"∞":n[v.id]}`)}],variableWatch:{"Current Node":h??"None","Visited Nodes":Array.from(r).join(", ")||"None","Source Node":"A"}}}for(t.push(o("Initialize Dijkstra Algorithm","Set Source Distance to 0, All Others to Infinity","Source node A gets distance 0. Unvisited nodes get distance ∞.","dist[A] = 0, dist[others] = ∞","A"));r.size<e.nodes.length;){let l=null,c=1/0;for(const d of e.nodes)!r.has(d.id)&&n[d.id]<c&&(c=n[d.id],l=d.id);if(!l||c===1/0)break;r.add(l),t.push(o(`Pick Smallest Unvisited Vertex '${l}' (Dist = ${n[l]})`,`Extracted Node ${l} from Priority Queue`,`Node ${l} has the minimum tentative distance among unvisited vertices.`,"u = argmin(dist[v]) for v ∉ Visited",l));const u=e.edges.filter(d=>d.from===l||d.to===l);for(const d of u){const h=d.from===l?d.to:d.from;if(r.has(h))continue;const p=n[l]+d.weight;p<n[h]&&(n[h]=p,i[h]=l,t.push(o(`Relax Edge (${l} -> ${h}, Weight = ${d.weight})`,`Updated dist[${h}] from old value to ${p}`,`Found shorter path to ${h}: dist[${l}] (${n[l]}) + weight (${d.weight}) = ${p} < dist[${h}].`,`dist[${h}] = min(dist[${h}], dist[${l}] + weight)`,l,{from:l,to:h})))}}t.push(o("Dijkstra Traversal Complete","All Shortest Paths Computed","Shortest paths from Source A to all nodes have been determined.","Time Complexity: O((V + E) log V)",void 0));const s=t.length;return t.forEach(l=>l.totalSteps=s),t}function jf(e=[2,3,4,5],t=[3,4,5,6],n=5){const r=[],i=e.length,o=Array.from({length:i+1},()=>Array(n+1).fill(0)),s=["0 (None)",...e.map((d,h)=>`Item ${h+1} (w:${d}, v:${t[h]})`)],l=Array.from({length:n+1},(d,h)=>`W=${h}`);function c(d,h,p,x,b){const v=o.map(A=>[...A]);return{stepIndex:r.length+1,totalSteps:0,title:d,explanation:{action:h,reason:p,formula:x},highlightCodeLines:{cpp:[10,11,12],java:[9,10],python:[7,8],javascript:[8,9]},nodes:[],dpMatrix:{rows:s,cols:l,data:v,activeCell:b},variableWatch:{"Capacity W":n,"Item Count N":i,"Current Cell":b?`row ${b[0]}, col ${b[1]}`:"None"}}}r.push(c("Initialize DP Table with 0s","Base Cases: 0 items or 0 capacity yields 0 profit","dp[0][w] = 0 and dp[i][0] = 0 as base boundary conditions.","dp[i][w] = 0 for i=0 or w=0"));for(let d=1;d<=i;d++){const h=e[d-1],p=t[d-1];for(let x=0;x<=n;x++)if(h<=x){const b=p+o[d-1][x-h],v=o[d-1][x];o[d][x]=Math.max(v,b),r.push(c(`Compute dp[Item ${d}][Capacity ${x}]`,`Item weight ${h} <= capacity ${x}: Choice to Include or Exclude`,`Include item (${p} + dp[${d-1}][${x-h}]) vs Exclude item (dp[${d-1}][${x}]). Pick max = ${o[d][x]}.`,`dp[${d}][${x}] = max(${v}, ${p} + ${o[d-1][x-h]}) = ${o[d][x]}`,[d,x]))}else o[d][x]=o[d-1][x],r.push(c(`Compute dp[Item ${d}][Capacity ${x}]`,`Item weight ${h} > capacity ${x}: Cannot Include Item`,`Item is too heavy. Copy profit from cell directly above (dp[${d-1}][${x}] = ${o[d][x]}).`,`dp[${d}][${x}] = dp[${d-1}][${x}] = ${o[d][x]}`,[d,x]))}r.push(c("Knapsack DP Matrix Complete!",`Maximum Profit Achievable = $${o[i][n]}`,`Optimal subset value is found at lower-right corner dp[${i}][${n}] = ${o[i][n]}.`,`Final Answer = ${o[i][n]}`));const u=r.length;return r.forEach(d=>d.totalSteps=u),r}function Cf(e=["cat","car","dot"]){const t=[],n={char:"ROOT",isEnd:!1,children:{},id:"root"};let r=1;function i(l,c,u,d,h,p,x){h.push({id:l.id,value:l.char+(l.isEnd?" *":""),x:c,y:u,state:x===l.id?"active":l.isEnd?"success":"default"});const b=Object.keys(l.children),v=b.length;if(v===0)return;const A=c-(v-1)*d/2;b.forEach((g,f)=>{const m=l.children[g],w=A+f*d,S=u+70;p.push({from:l.id,to:m.id,label:g,highlighted:x===m.id}),i(m,w,S,d*.6,h,p,x)})}function o(l,c,u,d,h){const p=[],x=[];return i(n,300,50,140,p,x,h),{stepIndex:t.length+1,totalSteps:0,title:l,explanation:{action:c,reason:u,formula:d},highlightCodeLines:{cpp:[14,15,16],java:[11,12],python:[10,11],javascript:[12,13]},nodes:p,edges:x,variableWatch:{"Word Count":e.length,"Root Character":"ROOT"}}}t.push(o("Initialize Trie Root Node","Root represents empty prefix","Trie begins with a dummy Root node.","Trie Root -> Node(ROOT)"));for(const l of e){let c=n;for(let u=0;u<l.length;u++){const d=l[u];if(c.children[d])c=c.children[d],u===l.length-1&&(c.isEnd=!0),t.push(o(`Traversing Existing Prefix '${d}' for Word "${l}"`,`Reusing Existing Branch for '${d}'`,`Character '${d}' already exists. Reusing prefix branch.`,`curr = curr.children['${d}']`,c.id));else{const h={char:d,isEnd:u===l.length-1,children:{},id:`node-${r++}`};c.children[d]=h,c=h,t.push(o(`Inserting '${d}' for Word "${l}"`,`Branch Created: Character '${d}'`,`No existing node for '${d}' under parent. Allocated new Trie Node.`,`curr.children['${d}'] = new TrieNode()`,c.id))}}}t.push(o("Trie Built Successfully!",`Inserted words: ${e.join(", ")}`,"Starred nodes indicate completed words. Prefix lookup operations now run in O(L) time.","Time Complexity: O(L)"));const s=t.length;return t.forEach(l=>l.totalSteps=s),t}function o1(e=[1,3,5,7,9,11]){const t=[],n=e.length;if(n===0)return t;function r(c,u,d,h,p,x,b){c&&(c.x=u,c.y=d,p.push({id:c.id,value:c.sum,x:u,y:d,state:b===c.id?"active":c.l===c.r?"success":"default",label:`[${c.l}..${c.r}]`}),c.left&&(x.push({from:c.id,to:c.left.id,label:`[${c.left.l}..${c.left.r}]`,highlighted:b===c.left.id}),r(c.left,u-h,d+70,h*.55,p,x,b)),c.right&&(x.push({from:c.id,to:c.right.id,label:`[${c.right.l}..${c.right.r}]`,highlighted:b===c.right.id}),r(c.right,u+h,d+70,h*.55,p,x,b)))}let i={current:null};function o(c,u,d,h,p){const x=[],b=[];return r(i.current,300,45,130,x,b,p),{stepIndex:t.length+1,totalSteps:0,title:c,explanation:{action:u,reason:d,formula:h},highlightCodeLines:{cpp:[10,11,12],java:[8,9],python:[8,9],javascript:[7,8]},nodes:x,edges:b,variableWatch:{Array:e.join(", "),"Current Node":p??"None","Tree Nodes":x.length}}}function s(c,u){const d=`seg-${c}-${u}`,h={id:d,l:c,r:u,sum:0,left:null,right:null};if(i.current=h,c===u)return h.sum=e[c],t.push(o(`Create Leaf Node [${c}..${c}] = ${e[c]}`,"Leaf stores original array value",`Range [${c}..${c}] is a single element, so sum = array[${c}] = ${e[c]}.`,`tree[${c}..${c}] = a[${c}] = ${e[c]}`,d)),h;const p=Math.floor((c+u)/2);return t.push(o(`Create Internal Node [${c}..${u}]`,`Splitting range into [${c}..${p}] and [${p+1}..${u}]`,"Internal nodes aggregate their children. Build left half first, then right half.",`mid = (${c} + ${u}) / 2 = ${p}`,d)),h.left=s(c,p),h.right=s(p+1,u),h.sum=h.left.sum+h.right.sum,t.push(o(`Merge Node [${c}..${u}] = ${h.sum}`,"Sum = left child + right child",`node[${c}..${u}].sum = ${h.left.sum} + ${h.right.sum} = ${h.sum}.`,`sum[${c}..${u}] = sum[${c}..${p}] + sum[${p+1}..${u}]`,d)),h}s(0,n-1),t.push(o("Range Query [0.."+(n-1)+"]","Query entire array","Full range matches the root node exactly, so the answer is the root sum.",`query(0, ${n-1}) = ${i.current.sum}`,i.current.id));const l=t.length;return t.forEach(c=>c.totalSteps=l),t}function s1(e="ABABDABACDABABCABAB",t="ABABCABAB"){const n=[],r=e.length,i=t.length;if(i===0||r===0)return n;const o=new Array(i).fill(0);{let v=0;for(let A=1;A<i;A++){for(;v>0&&t[A]!==t[v];)v=o[v-1];t[A]===t[v]&&v++,o[A]=v}}function s(){return Math.max(30,Math.min(48,520/r))}function l(){return Math.max(30,Math.min(48,520/i))}function c(v,A,g){const f=[],m=s();for(let w=0;w<r;w++){let S="default";w>=A&&w<=g?S="success":w===v&&(S="active"),f.push({id:`t-${w}`,value:e[w],x:40+w*m,y:80,state:S})}return f}function u(v,A){const g=[],f=l();for(let m=0;m<i;m++){let w="default";m<=v&&t[m]===e[m+(A-v)]&&(w="success"),m===v&&(w="active"),g.push({id:`p-${m}`,value:t[m],x:40+m*f,y:200,state:w})}return g}function d(v,A,g,f,m,w,S){const T=[...S?c(m,S.start,S.end):c(m,-1,-2),...u(w,m)];return{stepIndex:n.length+1,totalSteps:0,title:v,explanation:{action:A,reason:g,formula:f},highlightCodeLines:{cpp:[28,29,30],java:[24,25,26],python:[24,25,26],javascript:[23,24,25]},nodes:T,edges:[],arrayState:[{label:"Text Pointer i",values:[`${m} (char '${e[m]??"END"}')`]},{label:"Pattern Pointer j",values:[`${w} (char '${t[w]??"END"}')`]}],variableWatch:{"Text Length N":r,"Pattern Length M":i,"Text Pointer i":`${m}/${r}`,"Pattern Pointer j":`${w}/${i}`,"Matched Count":S?S.end-S.start+1:0}}}for(let v=0;v<i;v++){const A=[],g=l();for(let m=0;m<i;m++)A.push({id:`lps-${m}`,value:t[m],x:40+m*g,y:80,state:m===v?"active":"default"});const f=[];for(let m=0;m<i;m++)f.push({id:`lpsv-${m}`,value:o[m],x:40+m*g,y:200,state:m===v?"success":"default"});n.push({stepIndex:n.length+1,totalSteps:0,title:`Precompute LPS[${v}] = ${o[v]}`,explanation:{action:`Longest Proper Prefix which is also Suffix of pattern[0..${v}]`,reason:"LPS helps the pattern pointer fall back without re-scanning matched text.",formula:`LPS[${v}] = ${o[v]}`},highlightCodeLines:{cpp:[8,9,10],java:[7,8],python:[6,7],javascript:[5,6]},nodes:[...A,...f],edges:[],arrayState:[{label:"LPS Array",values:o.map(String)}],variableWatch:{Pattern:t,LPS:o.join(", "),"Current Index i":`${v}/${i-1}`}})}n.push(d("Start KMP Search","Initialize pointers","Begin scanning text with i = 0, pattern pointer j = 0. Compare text[i] with pattern[j].","i = 0, j = 0",0,0,null));let h=0,p=0,x=!1;for(;h<r;)if(e[h]===t[p]&&(n.push(d(`Match: text[${h}] = '${e[h]}' = pattern[${p}]`,"Characters equal, advance both pointers",`'${e[h]}' matches pattern position ${p}. Continue to next character.`,`i++ -> ${h+1}, j++ -> ${p+1}`,h,p,null)),h++,p++),p===i){const v=h-i;n.push(d(`Pattern Found at Index ${v}!`,"Full pattern matched",`All ${i} pattern characters matched consecutively from text index ${v} to ${h-1}.`,`Match at text[${v}..${h-1}]`,h-1,i-1,{start:v,end:h-1})),x=!0,p=o[p-1]}else h<r&&e[h]!==t[p]&&(p!==0?(n.push(d(`Mismatch at text[${h}] = '${e[h]}' vs pattern[${p}] = '${t[p]}'`,"Fall back using LPS",`Use LPS[${p-1}] = ${o[p-1]} to skip already-matched prefix instead of restarting.`,`j = lps[${p-1}] = ${o[p-1]}`,h,p,null)),p=o[p-1]):(n.push(d(`Mismatch at text[${h}] = '${e[h]}' vs pattern[0] = '${t[0]}'`,"No prefix to fall back to, advance text","j is already 0, so only the text pointer advances.",`i++ -> ${h+1}`,h,p,null)),h++));n.push(d("KMP Search Complete",x?"All matches found":"No match found in text","The text pointer i never moves backwards, guaranteeing linear O(N + M) performance.",`Time Complexity: O(${r} + ${i})`,h-1,p,null));const b=n.length;return n.forEach(v=>v.totalSteps=b),n}const Qs=[{key:"avl",label:"AVL Tree",description:"Insert numbers one-by-one and watch rotations balance the tree."},{key:"bst",label:"BST Insert",description:"Insert numbers into a plain Binary Search Tree."},{key:"dijkstra",label:"Dijkstra",description:"Watch shortest distances relax edge by edge from source A."},{key:"knapsack",label:"Knapsack",description:"Fill the DP table cell by cell to find max profit."},{key:"trie",label:"Trie",description:"Insert words character by character into a prefix tree."},{key:"segment",label:"Segment Tree",description:"Build the range-sum tree node by node."},{key:"kmp",label:"KMP String",description:"Scan the text pointer step-by-step with LPS fallback."}],Fi=e=>e.split(",").map(t=>parseInt(t.trim())).filter(t=>!isNaN(t)),a1=()=>{const[e,t]=z.useState("avl"),[n,r]=z.useState("15, 10, 20, 8, 12, 17, 25"),[i,o]=z.useState("2, 3, 4, 5"),[s,l]=z.useState("3, 4, 5, 6"),[c,u]=z.useState("5"),[d,h]=z.useState("cat, car, cart, dog, dot"),[p,x]=z.useState("1, 3, 5, 7, 9, 11"),[b,v]=z.useState("ABABDABACDABABCABAB"),[A,g]=z.useState("ABABCABAB"),[f,m]=z.useState([]),[w,S]=z.useState(0),[N,T]=z.useState(!1),[C,M]=z.useState(1),[R,L]=z.useState(["[SYSTEM] Sandbox ready. Pick a topic, enter input, press ▶ Play."]),V=z.useRef(0),K=f[w]||null,G=Qs.find(I=>I.key===e)||Qs[0];z.useEffect(()=>{V.current+=1,m([]),S(0),T(!1),L(["[SYSTEM] Sandbox ready. Pick a topic, enter input, press ▶ Play."])},[e]),z.useEffect(()=>{let I=null;if(N&&f.length>0){const y=V.current;I=setInterval(()=>{if(V.current!==y){T(!1);return}S(k=>V.current!==y?(T(!1),k):k+1<f.length?k+1:(T(!1),k))},1400/C)}return()=>{I&&clearInterval(I)}},[N,f,C]),z.useEffect(()=>{K&&L(I=>{const y=`[STEP ${K.stepIndex}/${K.totalSteps}] ${K.title}`;return I[I.length-1]===y?I:[...I,y]})},[K]);const ie=I=>{switch(I){case"avl":case"bst":{const y=Fi(n);return il(y.length>0?y:[10,20,30])}case"dijkstra":return Nf();case"knapsack":{const y=Fi(i),k=Fi(s),F=parseInt(c)||5;return jf(y,k,F)}case"trie":{const y=d.split(",").map(k=>k.trim()).filter(Boolean);return Cf(y.length>0?y:["cat","car","dot"])}case"segment":{const y=Fi(p);return o1(y.length>0?y:[1,3,5,7])}case"kmp":{const y=b.trim()||"ABABDABACDABABCABAB",k=A.trim()||"ABABCABAB";return s1(y,k)}}},ve=()=>{var y;V.current+=1;const I=ie(e);m(I),S(0),T(I.length>0),L([`[SYSTEM] Generated ${I.length} animation steps for ${G.label}.`,`[RUN] ${((y=I[0])==null?void 0:y.title)||"Execution started"}`])},O=()=>{if(V.current+=1,T(!1),m([]),S(0),e==="trie"){const I=["apple","app","ape","bat","ball","cat","car","can","dog","dot","data","dark"],y=3+Math.floor(Math.random()*4);h([...I].sort(()=>Math.random()-.5).slice(0,y).join(", "))}else if(e==="kmp"){const I=["ABABDABACDABABCABAB","AAAAABAAABA","ABCABCDABABCDABCDABDE"],y=["ABABCABAB","ABA","ABCDABD"];v(I[Math.floor(Math.random()*I.length)]),g(y[Math.floor(Math.random()*y.length)])}else{const I=5+Math.floor(Math.random()*4),y=Array.from({length:I},()=>Math.floor(Math.random()*90)+10);(e==="avl"||e==="bst")&&r(y.join(", ")),e==="segment"&&x(y.join(", "))}},E=e==="knapsack";return a.jsxs("div",{style:{maxWidth:"var(--max-width)",margin:"0 auto",padding:"24px 16px"},children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:20},children:[a.jsx("h2",{className:"section-title",children:"Visual Sandbox & Step-by-Step Execution Engine"}),a.jsx("p",{className:"section-subtitle",children:"Pick any topic, press Play, and watch the algorithm execute one number at a time on the canvas."})]}),a.jsx("div",{style:{display:"flex",background:"var(--bg-light)",padding:4,borderRadius:"100px",marginBottom:12,overflowX:"auto"},children:Qs.map(I=>a.jsx("button",{onClick:()=>t(I.key),style:{flex:1,minWidth:110,padding:"8px 14px",borderRadius:"100px",fontSize:"0.8rem",fontWeight:700,background:e===I.key?"#000000":"transparent",color:e===I.key?"#FFFFFF":"var(--text-secondary)",border:"none",cursor:"pointer",fontFamily:"var(--font-main)",transition:"all 0.2s ease",whiteSpace:"nowrap"},children:I.label},I.key))}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",marginBottom:16,background:"rgba(0,122,255,0.07)",border:"1px solid rgba(0,122,255,0.18)",borderRadius:"var(--radius-md)"},children:[a.jsx(hf,{size:15,color:"#007AFF",style:{flexShrink:0}}),a.jsx("span",{style:{fontSize:"0.85rem",color:"#007AFF",fontWeight:600},children:G.description})]}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(260px, 1fr) minmax(340px, 1.6fr)",gap:20},children:[a.jsxs("div",{className:"card-light",style:{padding:20,display:"flex",flexDirection:"column"},children:[a.jsxs("h3",{style:{fontSize:"1.02rem",fontWeight:800,marginBottom:14,display:"flex",alignItems:"center",gap:6},children:[a.jsx(ui,{size:16})," Configure Input"]}),(e==="avl"||e==="bst")&&a.jsxs("div",{style:{marginBottom:14},children:[a.jsx("label",{style:{fontSize:"0.78rem",fontWeight:700,display:"block",marginBottom:4},children:"Node Keys (Comma Separated)"}),a.jsx("input",{type:"text",value:n,onChange:I=>r(I.target.value),style:{width:"100%",padding:"8px 12px",fontSize:"0.85rem"}}),a.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:6},children:"One number is inserted per step. AVL mode also shows balance factors and rotations."})]}),e==="knapsack"&&a.jsxs("div",{children:[a.jsxs("div",{style:{marginBottom:10},children:[a.jsx("label",{style:{fontSize:"0.78rem",fontWeight:700},children:"Weights"}),a.jsx("input",{type:"text",value:i,onChange:I=>o(I.target.value),style:{width:"100%",padding:"6px 10px"}})]}),a.jsxs("div",{style:{marginBottom:10},children:[a.jsx("label",{style:{fontSize:"0.78rem",fontWeight:700},children:"Values"}),a.jsx("input",{type:"text",value:s,onChange:I=>l(I.target.value),style:{width:"100%",padding:"6px 10px"}})]}),a.jsxs("div",{style:{marginBottom:14},children:[a.jsx("label",{style:{fontSize:"0.78rem",fontWeight:700},children:"Capacity W"}),a.jsx("input",{type:"number",value:c,onChange:I=>u(I.target.value),style:{width:"100%",padding:"6px 10px"}})]})]}),e==="trie"&&a.jsxs("div",{style:{marginBottom:14},children:[a.jsx("label",{style:{fontSize:"0.78rem",fontWeight:700,display:"block",marginBottom:4},children:"Words (Comma Separated)"}),a.jsx("input",{type:"text",value:d,onChange:I=>h(I.target.value),style:{width:"100%",padding:"8px 12px",fontSize:"0.85rem"}}),a.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:6},children:"Each character of every word is added to the canvas step-by-step."})]}),e==="segment"&&a.jsxs("div",{style:{marginBottom:14},children:[a.jsx("label",{style:{fontSize:"0.78rem",fontWeight:700,display:"block",marginBottom:4},children:"Array Values (Comma Separated)"}),a.jsx("input",{type:"text",value:p,onChange:I=>x(I.target.value),style:{width:"100%",padding:"8px 12px",fontSize:"0.85rem"}}),a.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:6},children:"Leaf nodes are created first, then merged into internal range-sum nodes."})]}),e==="kmp"&&a.jsxs("div",{children:[a.jsxs("div",{style:{marginBottom:10},children:[a.jsx("label",{style:{fontSize:"0.78rem",fontWeight:700},children:"Text"}),a.jsx("input",{type:"text",value:b,onChange:I=>v(I.target.value),style:{width:"100%",padding:"6px 10px",fontFamily:"var(--font-code)"}})]}),a.jsxs("div",{style:{marginBottom:14},children:[a.jsx("label",{style:{fontSize:"0.78rem",fontWeight:700},children:"Pattern"}),a.jsx("input",{type:"text",value:A,onChange:I=>g(I.target.value),style:{width:"100%",padding:"6px 10px",fontFamily:"var(--font-code)"}})]})]}),a.jsxs("div",{style:{marginTop:"auto",paddingTop:14,display:"flex",gap:10},children:[a.jsxs("button",{className:"btn btn-secondary",style:{gap:6},onClick:O,title:"Randomize Input",children:[a.jsx(cc,{size:16})," Random"]}),a.jsxs("button",{className:"btn btn-primary",style:{flex:1,justifyContent:"center",gap:6},onClick:ve,children:[a.jsx(Co,{size:16})," Play Step-by-Step"]})]})]}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[a.jsx("div",{style:{height:400},children:f.length===0?a.jsxs("div",{style:{width:"100%",height:"100%",minHeight:380,background:"#FAFAFA",borderRadius:"var(--radius-lg)",border:"1.5px dashed var(--border-hairline)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,color:"var(--text-muted)",textAlign:"center",padding:20},children:[a.jsx(Co,{size:32,color:"var(--text-muted)"}),a.jsxs("p",{style:{fontSize:"0.95rem",fontWeight:700,color:"#000"},children:["Canvas is ready for ",G.label]}),a.jsxs("p",{style:{fontSize:"0.8rem"},children:["Enter your input and press ",a.jsx("strong",{children:"Play Step-by-Step"})," to start the animation."]})]}):E?a.jsx(kf,{dpMatrix:K==null?void 0:K.dpMatrix},`dp-${V.current}`):a.jsx(Ao,{nodes:(K==null?void 0:K.nodes)||[],edges:(K==null?void 0:K.edges)||[]},`tree-${V.current}`)}),a.jsx(wf,{currentStep:w+1,totalSteps:f.length,isPlaying:N,playbackSpeed:C,onPlayPause:()=>T(!N),onStepBack:()=>S(I=>Math.max(0,I-1)),onStepForward:()=>S(I=>Math.min(f.length-1,I+1)),onReset:()=>{S(0),T(!1)},onSpeedChange:M})]})]}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(280px, 1fr) minmax(300px, 1fr)",gap:20,marginTop:20},children:[a.jsx("div",{style:{minHeight:240},children:K?a.jsx(bf,{currentFrame:K}):a.jsx("div",{className:"panel",style:{padding:20,height:"100%",minHeight:240,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-muted)",fontSize:"0.85rem"},children:"Step explanations will appear here while the algorithm runs."})}),a.jsxs("div",{className:"card-black",style:{padding:18,fontFamily:"var(--font-code)",fontSize:"0.8rem",maxHeight:320,overflowY:"auto"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:10,color:"var(--accent-gold)",fontWeight:700},children:[a.jsx(dc,{size:14})," LIVE EXECUTION LOGS"]}),R.length===0&&a.jsx("div",{style:{color:"rgba(255,255,255,0.5)"},children:"No steps executed yet."}),R.map((I,y)=>a.jsx("div",{style:{color:I.startsWith("[STEP")?"var(--accent-green)":I.startsWith("[RUN]")?"#FFFFFF":"rgba(255,255,255,0.85)",marginBottom:4},children:I},y)),N&&f.length>0&&a.jsxs("div",{style:{color:"var(--accent-gold)",marginTop:8},children:["▶ Playing... step ",w+1," of ",f.length]})]})]})]})},Xs=[{id:"fc-1",category:"Trees",question:"What is the balance factor condition for any node in an AVL Tree?",answer:"Balance Factor = Height(Left Subtree) - Height(Right Subtree) ∈ {-1, 0, 1}. If |BF| > 1, tree rotation is required.",formula:"BalanceFactor = Height(Left) - Height(Right)"},{id:"fc-2",category:"Trees",question:"When is a Left-Right (LR) double rotation performed in an AVL Tree?",answer:"When a node has balance factor +2 (Left-heavy) and its left child has balance factor -1 (Right-heavy). Rotate Left on child, then Rotate Right on parent.",formula:"BF(Node) = +2 and BF(LeftChild) = -1"},{id:"fc-3",category:"Graphs",question:"What is the time complexity of Dijkstra's algorithm with a Binary Min-Heap?",answer:"O((V + E) log V), where V is the number of vertices and E is the number of edges.",formula:"O((V + E) log V)"},{id:"fc-4",category:"DynamicProgramming",question:"What is the state transition formula for 0/1 Knapsack problem?",answer:"dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]]) if wt[i-1] <= w, else dp[i-1][w].",formula:"dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])"},{id:"fc-5",category:"StringAndTrie",question:"What is the lookup time complexity of a Trie (Prefix Tree)?",answer:"O(L), where L is the length of the string being searched. Lookup time is independent of total number of stored words.",formula:"O(L)"},{id:"fc-6",category:"Trees",question:"What is the Black-Height Property of a Red-Black Tree?",answer:"Every simple path from a node to any descendant null leaf contains the exact same number of Black nodes.",formula:"BlackHeight(path_1) == BlackHeight(path_2)"},{id:"fc-7",category:"Graphs",question:"How does Bellman-Ford detect negative weight cycles?",answer:"If any edge relaxation condition dist[u] + weight < dist[v] succeeds on the V-th pass, a negative cycle exists.",formula:"V-th Pass: dist[u] + w < dist[v] => Negative Cycle"},{id:"fc-8",category:"AdvancedSets",question:"What is the amortized complexity of DSU operations with Path Compression & Union by Rank?",answer:"O(α(N)) per operation, where α(N) is the Inverse Ackermann function (effectively O(1) for all practical N).",formula:"Time = O(α(N)) ≈ O(1)"},{id:"fc-9",category:"DynamicProgramming",question:"What is the space complexity to find Longest Common Subsequence (LCS)?",answer:"O(N × M) for full 2D DP grid, optimizable to O(min(N, M)) using 2 rows.",formula:"Space = O(min(N, M))"},{id:"fc-10",category:"Trees",question:"What operation does a Fenwick Tree (Binary Indexed Tree) perform using i & (-i)?",answer:"i & (-i) isolates the lowest set bit, allowing range sum query and point update in O(log N).",formula:"LowBit(i) = i & (-i)"},{id:"fc-11",category:"Graphs",question:"What is the Max-Flow Min-Cut Theorem?",answer:"The maximum amount of flow passing from source to sink in a network equals the minimum capacity of edges separating source from sink.",formula:"MaxFlow = MinCut"},{id:"fc-12",category:"StringAndTrie",question:"What is the purpose of the Longest Prefix Suffix (LPS) array in KMP algorithm?",answer:"LPS[i] stores the length of the longest proper prefix of pattern[0..i] that is also a suffix of pattern[0..i], preventing redundant re-comparisons.",formula:"LPS[i] = Length of matching prefix-suffix"},{id:"fc-13",category:"DynamicProgramming",question:"How many subset states are evaluated in Bitmask DP for N items?",answer:"2^N states, where bit i is 1 if item i is included in subset and 0 if excluded.",formula:"Total States = 2^N"},{id:"fc-14",category:"Trees",question:"What is the maximum height of a B-Tree of minimum degree t?",answer:"h ≤ log_t ((N + 1) / 2), keeping height extremely low for disk block efficiency.",formula:"Height <= log_t(N)"},{id:"fc-15",category:"Graphs",question:"What is an admissible heuristic in A* Search?",answer:"A heuristic h(n) that never overestimates the true remaining cost to reach the goal node.",formula:"h(n) <= h*(n)"},{id:"fc-16",category:"Trees",question:"What is a Splay Tree Zig-Zig operation?",answer:"Performed when node x and parent p are both left children (or both right children). Rotates p around g, then x around p.",formula:"Zig-Zig: Rotate(Grandparent), Rotate(Parent)"},{id:"fc-17",category:"Trees",question:"How does a Treap maintain randomized balance?",answer:"Assigns a random priority to each key during insertion and uses tree rotations to maintain Min-Heap priority property.",formula:"Key = BST Order, Priority = Min-Heap Order"},{id:"fc-18",category:"Graphs",question:"What is Tarjan's Low-Link Value in SCC detection?",answer:"low[u] is the lowest node discovery time reachable from u via u's DFS subtree, including at most one back-edge.",formula:"low[u] = min(disc[u], disc[w])"},{id:"fc-19",category:"DynamicProgramming",question:"What is the matrix chain multiplication DP state definition?",answer:"m[i][j] represents minimum scalar multiplications needed to compute matrix product A_i...A_j.",formula:"m[i][j] = min(m[i][k] + m[k+1][j] + p_{i-1} p_k p_j)"},{id:"fc-20",category:"StringAndTrie",question:"What is the number of states in a Suffix Automaton for string length N?",answer:"At most 2N - 1 states and 3N - 4 transitions.",formula:"States <= 2N - 1"},{id:"fc-21",category:"AdvancedSets",question:"Why is Path Compression used in Union-Find?",answer:"Flattens tree structure during find operations by making every visited node point directly to root.",formula:"parent[x] = find(parent[x])"},{id:"fc-22",category:"Trees",question:"What is the maximum number of light edges on any path in Heavy-Light Decomposition (HLD)?",answer:"At most log₂ N light edges, because crossing a light edge at least doubles the subtree size.",formula:"LightEdges <= log2(N)"},{id:"fc-23",category:"Graphs",question:"What is the time complexity of Floyd-Warshall All-Pairs Shortest Path?",answer:"O(V³) using 3 nested loops for intermediate node k, source i, and target j.",formula:"Time = O(V^3)"},{id:"fc-24",category:"DynamicProgramming",question:"What is optimal substructure property in Dynamic Programming?",answer:"An optimal solution to the overall problem contains optimal solutions to its sub-problems.",formula:"OPT(Problem) = Combine(OPT(Subproblems))"},{id:"fc-25",category:"StringAndTrie",question:"What is the time complexity to build a Suffix Array using Prefix Doubling?",answer:"O(N log² N) basic or O(N log N) optimized using radix sort.",formula:"Time = O(N log N)"},{id:"fc-26",category:"Trees",question:"What is the query time complexity of a Segment Tree?",answer:"O(log N) per range query (sum, min, max, gcd...) and O(log N) per point update, since each query visits at most 2·log N nodes.",formula:"Query = Update = O(log N)"},{id:"fc-27",category:"Trees",question:"How does a Fenwick Tree (BIT) perform a point update?",answer:"Update the index i, then walk upward through i += i & (-i) until exceeding N, adding the delta at each visited node.",formula:"i += i & (-i)"},{id:"fc-28",category:"Graphs",question:"What is the time complexity of Prim’s MST algorithm with a Binary Min-Heap?",answer:"O(E log V) — each vertex is extracted once and every edge may trigger a decrease-key.",formula:"Time = O(E log V)"},{id:"fc-29",category:"Graphs",question:"What is the time complexity of Kruskal’s MST algorithm?",answer:"O(E log E) for sorting edges, plus near O(1) amortized DSU union/find for each edge.",formula:"Time = O(E log E)"},{id:"fc-30",category:"DynamicProgramming",question:"What is the time complexity of Longest Increasing Subsequence using patience sorting?",answer:"O(N log N) using binary search on the tails array (lower bound of the current value).",formula:"Time = O(N log N)"},{id:"fc-31",category:"DynamicProgramming",question:"What is the transition for the minimum-coin-change DP?",answer:"dp[a] = min over all coins c of (dp[a - c] + 1), where dp[0] = 0 and dp[a] = ∞ initially for unreachable amounts.",formula:"dp[a] = min_c(dp[a - c] + 1)"},{id:"fc-32",category:"DynamicProgramming",question:"What is the Edit Distance (Levenshtein) DP transition?",answer:"If characters match, dp[i][j] = dp[i-1][j-1]; otherwise take the minimum of insert, delete, and replace: 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).",formula:"dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])"},{id:"fc-33",category:"StringAndTrie",question:"What does Z[i] represent in the Z-algorithm?",answer:"Z[i] is the length of the longest substring starting at position i that is also a prefix of the whole string. Pattern matching runs in O(N + M).",formula:"Z[i] = LCP(s, s[i..])"},{id:"fc-34",category:"StringAndTrie",question:"What is the time complexity of Manacher’s algorithm for palindrome detection?",answer:"O(N) — it finds all palindrome radii using the mirror property of palindromes inside the current rightmost center.",formula:"Time = O(N)"},{id:"fc-35",category:"AdvancedSets",question:"How does Union by Rank work in DSU?",answer:"Attach the smaller tree (by rank/depth) under the root of the larger tree during union, keeping trees shallow.",formula:"rank[a] < rank[b] => parent[a] = b"},{id:"fc-36",category:"Trees",question:"Which rotation fixes an RR imbalance in an AVL Tree?",answer:"A Single Left Rotation on the unbalanced node: the right child becomes the new root, the old root becomes its left child.",formula:"RR => RotateLeft(Node)"},{id:"fc-37",category:"Graphs",question:"What is the time complexity of the Bellman-Ford algorithm?",answer:"O(V · E) — V-1 relaxation passes over all E edges, with one extra pass to detect negative cycles.",formula:"Time = O(V * E)"},{id:"fc-38",category:"AdvancedSets",question:"What is the optimal block size in Sqrt Decomposition?",answer:"About √N elements per block, giving O(√N) worst case per range query and per point update.",formula:"BlockSize ≈ √N"},{id:"fc-39",category:"StringAndTrie",question:"What is the space complexity of a Trie with S strings of total length L?",answer:"O(L · alphabetSize) in the array-of-children representation, or O(L) with hash maps; independent of number of distinct strings.",formula:"Space = O(total characters)"},{id:"fc-40",category:"Trees",question:"What is the maximum height of a Red-Black Tree with N nodes?",answer:"At most 2·log₂(N + 1), because the red-black property caps the ratio between the longest and shortest root-to-leaf paths at 2:1.",formula:"Height <= 2 * log2(N + 1)"}],l1=({userId:e})=>{const[t,n]=z.useState("ALL"),[r,i]=z.useState(0),[o,s]=z.useState(!1),[l,c]=z.useState([]),[u,d]=z.useState(Xs),[h,p]=z.useState(!0);z.useEffect(()=>{e?hc(e,"flashcard").then(w=>{c(w.map(S=>S.puzzleId)),p(!1)}):p(!1)},[e]);const x=t==="ALL"?u:u.filter(w=>w.category===t),b=x[r%x.length]||Xs[0],v=l.includes(b.id),A=()=>{s(!1),i(w=>(w+1)%x.length)},g=()=>{s(!1),i(w=>(w-1+x.length)%x.length)},f=()=>{const w=[...u].sort(()=>Math.random()-.5);d(w),i(0),s(!1)},m=()=>{e&&(v?Sf(e,b.id).then(()=>{c(w=>w.filter(S=>S!==b.id))}):pc(e,b.id,"flashcard").then(()=>{c(w=>w.includes(b.id)?w:[...w,b.id])}))};return a.jsxs("div",{style:{maxWidth:680,margin:"0 auto",padding:"24px 16px"},children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:20},children:[a.jsxs("h2",{className:"section-title",children:["ADSA Memory Flashcards (",Xs.length," Cards)"]}),a.jsx("p",{className:"section-subtitle",children:"Space-repetition memory review for complexities, formulas, and rotation rules."})]}),a.jsx("div",{style:{display:"flex",gap:6,overflowX:"auto",marginBottom:20,paddingBottom:4},children:[{key:"ALL",label:"All Cards"},{key:"Trees",label:"Trees"},{key:"Graphs",label:"Graphs"},{key:"DynamicProgramming",label:"DP"},{key:"StringAndTrie",label:"Strings & Trie"},{key:"AdvancedSets",label:"Advanced"}].map(w=>a.jsx("button",{onClick:()=>{n(w.key),i(0),s(!1)},style:{background:t===w.key?"#000000":"var(--bg-light)",color:t===w.key?"#FFFFFF":"var(--text-secondary)",border:"1px solid var(--border-hairline)",borderRadius:"100px",padding:"6px 14px",fontSize:"0.78rem",fontWeight:700,cursor:"pointer",fontFamily:"var(--font-main)",transition:"all 0.2s ease",whiteSpace:"nowrap"},children:w.label},w.key))}),a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[a.jsxs("span",{style:{fontSize:"0.8rem",fontWeight:800,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.06em"},children:["CARD ",r%x.length+1," OF ",x.length]}),a.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsxs("span",{style:{fontSize:"0.8rem",fontWeight:700,color:"var(--accent-green)",display:"flex",alignItems:"center",gap:4},children:[a.jsx(Nt,{size:14})," ",l.length," Mastered",h&&a.jsx("span",{style:{color:"var(--text-muted)",fontSize:"0.7rem",fontWeight:600},children:"(syncing…)"})]}),a.jsxs("button",{onClick:f,"aria-label":"Shuffle cards",title:"Shuffle deck",style:{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:100,border:"1.5px solid var(--border-hairline)",background:"var(--bg-light)",fontSize:"0.75rem",fontWeight:800,color:"#000000",cursor:"pointer",transition:"all 0.2s ease"},children:[a.jsx(cc,{size:13})," Shuffle"]})]})]}),a.jsx("div",{style:{height:6,borderRadius:100,background:"var(--bg-grey)",overflow:"hidden",marginBottom:18},children:a.jsx("div",{style:{height:"100%",borderRadius:100,background:"linear-gradient(90deg, #007AFF, #5AC8FA)",width:`${(r%x.length+1)/x.length*100}%`,transition:"width 0.4s cubic-bezier(0.33, 1, 0.68, 1)"}})}),a.jsxs("div",{className:`flashcard-scene ${o?"is-flipped":""}`,onClick:()=>s(!o),style:{marginBottom:24,cursor:"pointer"},children:[a.jsxs("div",{className:"flashcard-face flashcard-front card-light",children:[a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[a.jsx("span",{style:{fontSize:"0.7rem",fontWeight:800,padding:"4px 10px",borderRadius:"100px",background:"var(--bg-grey)",color:"#000000",textTransform:"uppercase",letterSpacing:"0.06em"},children:b.category}),a.jsxs("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"var(--text-muted)",display:"flex",alignItems:"center",gap:4},children:[a.jsx(ei,{size:14})," Tap to reveal answer"]})]}),a.jsx("div",{style:{margin:"20px 0",display:"flex",alignItems:"center",flex:1},children:a.jsx("h3",{style:{fontSize:"1.35rem",fontWeight:800,lineHeight:1.4,color:"#000000"},children:b.question})}),a.jsx("div",{style:{fontSize:"0.75rem",fontWeight:600,color:"var(--text-muted)",textAlign:"right"},children:"Question View"})]}),a.jsxs("div",{className:"flashcard-face flashcard-back card-black",children:[a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[a.jsxs("span",{style:{fontSize:"0.7rem",fontWeight:800,padding:"4px 10px",borderRadius:"100px",background:"rgba(255, 255, 255, 0.15)",color:"#FFFFFF",textTransform:"uppercase",letterSpacing:"0.06em"},children:["Answer • ",b.category]}),a.jsxs("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"rgba(255,255,255,0.6)",display:"flex",alignItems:"center",gap:4},children:[a.jsx(ei,{size:14})," Tap to view question"]})]}),a.jsxs("div",{style:{margin:"20px 0",display:"flex",flexDirection:"column",justifyContent:"center",flex:1},children:[a.jsx("p",{style:{fontSize:"1.05rem",fontWeight:600,lineHeight:1.55,color:"#FFFFFF",marginBottom:14},children:b.answer}),b.formula&&a.jsx("code",{style:{fontFamily:"var(--font-code)",fontSize:"0.85rem",color:"var(--accent-gold)",background:"rgba(255,255,255,0.12)",padding:"6px 14px",borderRadius:6,display:"inline-block"},children:b.formula})]}),a.jsx("div",{style:{fontSize:"0.75rem",fontWeight:600,color:"rgba(255,255,255,0.5)",textAlign:"right"},children:"Answer Revealed"})]})]},b.id),a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[a.jsxs("button",{className:"btn btn-secondary",onClick:g,children:[a.jsx(px,{size:18})," Prev"]}),a.jsxs("button",{className:`btn ${v?"btn-success":"btn-secondary"}`,onClick:m,children:[a.jsx(Nt,{size:16})," ",v?"Mastered":"Mark Mastered"]}),a.jsxs("button",{className:"btn btn-primary",onClick:A,children:["Next ",a.jsx(lf,{size:18})]})]})]})},c1=({userProgress:e,onOpenAuthModal:t,onResetProgress:n})=>{const r=Object.values(e.starsPerLevel).reduce((i,o)=>i+o,0);return a.jsxs("div",{style:{maxWidth:750,margin:"0 auto",padding:"24px 16px"},children:[a.jsxs("div",{className:"card-black",style:{padding:28,marginBottom:24,position:"relative"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[a.jsx("div",{style:{width:64,height:64,borderRadius:"50%",background:"var(--accent-gold)",color:"#000000",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:"1.8rem"},children:(e.username||"S")[0].toUpperCase()}),a.jsxs("div",{children:[a.jsx("span",{style:{fontSize:"0.7rem",fontWeight:800,color:"var(--accent-gold)",textTransform:"uppercase",letterSpacing:"0.06em"},children:"AUTHENTICATED USER"}),a.jsx("h2",{style:{fontSize:"1.6rem",fontWeight:900,color:"#FFFFFF",letterSpacing:"-0.03em"},children:e.username||"Student"}),a.jsxs("p",{style:{fontSize:"0.85rem",color:"rgba(255, 255, 255, 0.6)",marginTop:2},children:["Rank ",Math.floor(e.xp/500)+1," • ",e.xp," XP • ",r," Stars Earned"]})]})]}),a.jsxs("button",{className:"btn",style:{position:"absolute",top:24,right:24,background:"rgba(255, 255, 255, 0.15)",color:"#FFFFFF",fontSize:"0.8rem",padding:"6px 14px",minHeight:32},onClick:t,children:[a.jsx(gf,{size:14})," Account / Sign In"]})]}),a.jsx("h3",{style:{fontSize:"1.1rem",fontWeight:800,marginBottom:14,letterSpacing:"-0.02em"},children:"Account Learning Statistics"}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",gap:12,marginBottom:28},children:[a.jsxs("div",{className:"card-light",style:{textAlign:"center",padding:20},children:[a.jsx(ur,{size:22,color:"var(--accent-gold)",style:{marginBottom:8}}),a.jsx("div",{className:"stat-value",children:e.xp}),a.jsx("div",{className:"stat-label",children:"Total XP"})]}),a.jsxs("div",{className:"card-light",style:{textAlign:"center",padding:20},children:[a.jsx(ti,{size:22,color:"var(--accent-gold)",fill:"var(--accent-gold)",style:{marginBottom:8}}),a.jsx("div",{className:"stat-value",children:r}),a.jsx("div",{className:"stat-label",children:"Stars Earned"})]}),a.jsxs("div",{className:"card-light",style:{textAlign:"center",padding:20},children:[a.jsx(df,{size:22,color:"var(--accent-red)",style:{marginBottom:8}}),a.jsx("div",{className:"stat-value",children:e.streakDays}),a.jsx("div",{className:"stat-label",children:"Day Streak"})]}),a.jsxs("div",{className:"card-light",style:{textAlign:"center",padding:20},children:[a.jsx(vf,{size:22,color:"var(--accent-green)",style:{marginBottom:8}}),a.jsxs("div",{className:"stat-value",children:[e.completedLevels.length," / 20"]}),a.jsx("div",{className:"stat-label",children:"Levels Solved"})]})]}),a.jsx("h3",{style:{fontSize:"1.1rem",fontWeight:800,marginBottom:14,letterSpacing:"-0.02em"},children:"Earned Achievements"}),a.jsx("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginBottom:28},children:e.badges.length===0?a.jsx("div",{className:"card-grey",style:{width:"100%",padding:20,textAlign:"center",color:"var(--text-muted)",fontSize:"0.85rem"},children:"Complete levels in Campaign Mode to earn achievement badges!"}):e.badges.map((i,o)=>a.jsxs("div",{className:"card-light",style:{display:"flex",alignItems:"center",gap:8,padding:"10px 16px"},children:[a.jsx(of,{size:18,color:"var(--accent-gold)"}),a.jsx("span",{style:{fontSize:"0.85rem",fontWeight:700,color:"#000000"},children:i})]},o))}),a.jsxs("div",{className:"card-light",style:{padding:20,border:"1.5px solid rgba(255, 59, 48, 0.2)"},children:[a.jsx("h4",{style:{fontSize:"1rem",fontWeight:800,color:"var(--accent-red)",marginBottom:4},children:"Danger Zone"}),a.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginBottom:14},children:"Reset local progress, level stars, and local database cache."}),a.jsxs("button",{className:"btn btn-danger",onClick:n,children:[a.jsx(rs,{size:16})," Reset All Learning Progress"]})]})]})},d1=({onFinish:e})=>{const[t,n]=z.useState(!1);return z.useEffect(()=>{const r=setTimeout(()=>{n(!0)},1400),i=setTimeout(()=>{e()},1800);return()=>{clearTimeout(r),clearTimeout(i)}},[e]),a.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,background:"#000000",color:"#FFFFFF",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:t?0:1,transition:"opacity 0.4s ease-out",pointerEvents:t?"none":"auto",fontFamily:"var(--font-main)"},children:[a.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:20,transform:"scale(1)",animation:"fade-in-up 0.6s cubic-bezier(0.33, 1, 0.68, 1)"},children:[a.jsx("div",{style:{width:84,height:84,borderRadius:24,background:"#FFFFFF",padding:4,boxShadow:"0 12px 32px rgba(255, 255, 255, 0.15)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"},children:a.jsx("img",{src:"/icon.png",alt:"ADSA Quest Icon",style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:20},onError:r=>{r.target.style.display="none"}})}),a.jsxs("div",{style:{textAlign:"center"},children:[a.jsx("h1",{style:{fontSize:"2rem",fontWeight:900,letterSpacing:"-0.04em",lineHeight:1.1,color:"#FFFFFF"},children:"ADSA QUEST"}),a.jsx("p",{style:{fontSize:"0.85rem",color:"rgba(255, 255, 255, 0.6)",fontWeight:500,letterSpacing:"0.04em",marginTop:4,textTransform:"uppercase"},children:"Master Algorithms Visually"})]})]}),a.jsx("div",{style:{position:"absolute",bottom:60,display:"flex",alignItems:"center",gap:8},children:a.jsx("div",{style:{width:140,height:4,background:"rgba(255, 255, 255, 0.15)",borderRadius:2,overflow:"hidden"},children:a.jsx("div",{style:{width:"100%",height:"100%",background:"#FFFFFF",borderRadius:2,animation:"splashProgress 1.4s cubic-bezier(0.33, 1, 0.68, 1) forwards"}})})}),a.jsx("style",{children:`
        @keyframes splashProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `})]})},_i=[{id:"slide-1",badge:"PROGRESSIVE CAMPAIGN",title:"Master 20 ADSA Levels",subtitle:"From AVL Trees and Red-Black Trees to Dijkstra Shortest Path and 0/1 Knapsack DP.",description:"Unlock levels sequentially, earn up to 3 stars per topic, collect XP points, and track your daily learning streak.",icon:of,color:"#000000",highlightStats:["20 Levels","3-Star System","Streak Tracker"]},{id:"slide-2",badge:"ANIMATED VISUALIZER",title:"Pin-to-Pin Clear Explanations",subtitle:"Watch tree rotations, graph edge relaxations, and DP table populating step-by-step.",description:"Control speed, step backward or forward, and read pin-to-pin mathematical formulas for every single step.",icon:ns,color:"#000000",highlightStats:["Step Forward/Back","Live Formula Trace","Variable Watch"]},{id:"slide-3",badge:"MULTI-LANGUAGE & ARENA",title:"Code Tracing & Quizzes",subtitle:"Study clean code snippets in C++, Java, Python, and JavaScript.",description:"Test your understanding with conceptual quizzes, interactive tree rotation puzzles, side-by-side algorithm comparison, and custom practice playground.",icon:ui,color:"#000000",highlightStats:["4 Languages","Algorithm Compare","Custom Playground"]}],u1=({onComplete:e})=>{const[t,n]=z.useState(0),r=_i[t],i=r.icon,o=()=>{t+1<_i.length?n(s=>s+1):e()};return a.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9990,background:"#FFFFFF",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"24px 20px 36px",maxWidth:600,margin:"0 auto",fontFamily:"var(--font-main)"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsx("div",{style:{width:32,height:32,borderRadius:8,background:"#000000",display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFFF",fontWeight:800,fontSize:"0.9rem"},children:"A"}),a.jsx("span",{style:{fontWeight:800,fontSize:"1rem",letterSpacing:"-0.02em",color:"#000000"},children:"ADSA Quest"})]}),a.jsx("button",{onClick:e,style:{background:"none",border:"none",color:"var(--text-muted)",fontWeight:600,fontSize:"0.85rem",cursor:"pointer",padding:"6px 12px"},children:"Skip"})]}),a.jsxs("div",{className:"fade-in",style:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",margin:"20px 0"},children:[a.jsx("div",{className:"card-black",style:{width:110,height:110,borderRadius:32,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:28,boxShadow:"0 12px 32px rgba(0, 0, 0, 0.12)"},children:a.jsx(i,{size:52,color:"#FFFFFF",strokeWidth:1.5})}),a.jsx("span",{style:{display:"inline-block",padding:"4px 12px",borderRadius:"var(--radius-pill)",background:"var(--bg-grey)",color:"var(--text-black)",fontSize:"0.7rem",fontWeight:800,letterSpacing:"0.06em",marginBottom:12},children:r.badge}),a.jsx("h2",{style:{fontSize:"1.8rem",fontWeight:900,letterSpacing:"-0.04em",lineHeight:1.2,color:"#000000",marginBottom:8},children:r.title}),a.jsx("p",{style:{fontSize:"0.95rem",color:"var(--text-secondary)",fontWeight:500,lineHeight:1.45,maxWidth:460,marginBottom:16},children:r.subtitle}),a.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-muted)",lineHeight:1.5,maxWidth:460,marginBottom:24},children:r.description}),a.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"},children:r.highlightStats.map((s,l)=>a.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:4,padding:"6px 12px",borderRadius:"var(--radius-pill)",background:"var(--bg-light)",border:"1px solid var(--border-hairline)",fontSize:"0.78rem",fontWeight:700,color:"#000000"},children:[a.jsx(Nt,{size:13,color:"var(--accent-green)"})," ",s]},l))})]},r.id),a.jsxs("div",{children:[a.jsx("div",{style:{display:"flex",justifyContent:"center",gap:8,marginBottom:24},children:_i.map((s,l)=>a.jsx("div",{onClick:()=>n(l),style:{width:t===l?28:8,height:8,borderRadius:4,background:t===l?"#000000":"var(--border-hairline)",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.33, 1, 0.68, 1)"}},l))}),a.jsx("button",{className:"btn btn-primary",style:{width:"100%",padding:"16px",fontSize:"1rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:8},onClick:o,children:t+1<_i.length?a.jsxs(a.Fragment,{children:["Next ",a.jsx(lf,{size:18})]}):a.jsxs(a.Fragment,{children:["Get Started ",a.jsx(ux,{size:18})]})})]})]})},h1=({isOpen:e,onClose:t,onLoginAsGuest:n})=>{const[r,i]=z.useState("signin"),[o,s]=z.useState(""),{isSignedIn:l,user:c}=nc();if(!e)return null;const u=d=>{d.preventDefault(),o.trim()&&(n(o.trim()),t())};return a.jsx("div",{style:{position:"fixed",inset:0,zIndex:9995,background:"rgba(0, 0, 0, 0.7)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,fontFamily:"var(--font-main)",overflowY:"auto"},children:a.jsxs("div",{className:"card-light fade-in",style:{maxWidth:480,width:"100%",padding:24,position:"relative",boxShadow:"var(--shadow-lg)",maxHeight:"90vh",overflowY:"auto"},children:[a.jsx("button",{onClick:t,style:{position:"absolute",top:18,right:18,background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)",zIndex:10},children:a.jsx(xf,{size:20})}),a.jsxs("div",{style:{textAlign:"center",marginBottom:20},children:[a.jsx("div",{style:{width:44,height:44,borderRadius:14,background:"#000000",color:"#FFFFFF",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px"},children:a.jsx(gf,{size:22})}),a.jsx("h3",{style:{fontSize:"1.3rem",fontWeight:900,letterSpacing:"-0.03em",color:"#000000"},children:"ADSA Quest Authentication"}),a.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-secondary)",marginTop:2},children:"Real-time Clerk Auth for Web & Android"})]}),a.jsxs("div",{style:{display:"flex",background:"var(--bg-light)",padding:4,borderRadius:"var(--radius-pill)",marginBottom:20},children:[a.jsx("button",{style:{flex:1,padding:"7px",border:"none",borderRadius:"var(--radius-pill)",background:r==="signin"?"#000000":"transparent",color:r==="signin"?"#FFFFFF":"var(--text-secondary)",fontWeight:700,fontSize:"0.78rem",cursor:"pointer"},onClick:()=>i("signin"),children:"Clerk Sign In"}),a.jsx("button",{style:{flex:1,padding:"7px",border:"none",borderRadius:"var(--radius-pill)",background:r==="signup"?"#000000":"transparent",color:r==="signup"?"#FFFFFF":"var(--text-secondary)",fontWeight:700,fontSize:"0.78rem",cursor:"pointer"},onClick:()=>i("signup"),children:"Clerk Sign Up"}),a.jsx("button",{style:{flex:1,padding:"7px",border:"none",borderRadius:"var(--radius-pill)",background:r==="guest"?"#000000":"transparent",color:r==="guest"?"#FFFFFF":"var(--text-secondary)",fontWeight:700,fontSize:"0.78rem",cursor:"pointer"},onClick:()=>i("guest"),children:"Guest"})]}),r==="signin"&&a.jsx("div",{style:{display:"flex",justifyContent:"center"},children:a.jsx(h0,{routing:"virtual",appearance:{elements:{card:{boxShadow:"none",background:"transparent"},formButtonPrimary:{backgroundColor:"#000000",borderRadius:"100px"}}}})}),r==="signup"&&a.jsx("div",{style:{display:"flex",justifyContent:"center"},children:a.jsx(p0,{routing:"virtual",appearance:{elements:{card:{boxShadow:"none",background:"transparent"},formButtonPrimary:{backgroundColor:"#000000",borderRadius:"100px"}}}})}),r==="guest"&&a.jsxs("form",{onSubmit:u,style:{display:"flex",flexDirection:"column",gap:12},children:[a.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",textAlign:"center"},children:"Test locally without creating a Clerk account."}),a.jsx("input",{type:"text",placeholder:"Enter your student name...",value:o,onChange:d=>s(d.target.value),style:{width:"100%"},required:!0}),a.jsxs("button",{type:"submit",className:"btn btn-primary",style:{width:"100%",justifyContent:"center"},children:[a.jsx(uc,{size:16})," Continue as Guest"]})]})]})})};function Io(e){return e?e.height:0}function vn(e){return Io(e.left)-Io(e.right)}function On(e){e.height=1+Math.max(Io(e.left),Io(e.right)),e.balanceFactor=vn(e)}function Oo(e){const t=e.left,n=t.right;return t.right=e,e.left=n,On(e),On(t),t}function To(e){const t=e.right,n=t.left;return t.left=e,e.right=n,On(e),On(t),t}function p1(e){On(e);const t=e.balanceFactor;return t>1?(e.left&&vn(e.left)<0&&(e.left=To(e.left)),Oo(e)):t<-1?(e.right&&vn(e.right)>0&&(e.right=Oo(e.right)),To(e)):e}function ni(e,t){let n=null;const r=(i,o)=>{if(!i){const s={value:o,height:1,balanceFactor:0,left:null,right:null};return On(s),s}if(o<i.value)i.left=r(i.left,o);else if(o>i.value)i.right=r(i.right,o);else return i;return t?p1(i):i};for(const i of e)n=r(n,i);return n}function f1(e,t,n,r,i,o=[]){const s=[],l=[],c=new Set(n||[]),u=new Set(o);function d(h,p,x,b){let v="default";h.value===r?v="error":h.value===i?v="warning":h.value===t?v="active":c.has(h.value)?v="success":u.has(h.value)&&(v="comparing"),s.push({id:`node-${h.value}`,value:h.value,x:p,y:x,height:h.height,balanceFactor:h.balanceFactor,state:v});const A=140/Math.pow(1.35,b);h.left&&(l.push({from:`node-${h.value}`,to:`node-${h.left.value}`,highlighted:u.has(h.value)&&u.has(h.left.value)||h.value===t}),d(h.left,p-A,x+65,b+1)),h.right&&(l.push({from:`node-${h.value}`,to:`node-${h.right.value}`,highlighted:u.has(h.value)&&u.has(h.right.value)||h.value===t}),d(h.right,p+A,x+65,b+1))}return e&&d(e,300,55,0),{nodes:s,edges:l}}function su(e){return{stepIndex:1,totalSteps:1,title:"Tree Ready",explanation:{action:`Start your ${e} session`,reason:"The tree is empty. Type a number and press Insert (or Delete / Search) to see every comparison, pointer move and rotation explained step by step in real time.",formula:"Insert / Search / Delete: O(log N) on a balanced tree"},codeStep:"insert:compare",nodes:[],edges:[]}}function ue(e,t){const{nodes:n,edges:r}=f1(e,t.activeVal,t.successVals,t.errorVal,t.warningVal,t.pathVals);return{stepIndex:0,totalSteps:0,title:t.title,explanation:{action:t.action,reason:t.reason,formula:t.formula},codeStep:t.codeStep,nodes:n,edges:r,variableWatch:t.variableWatch}}function ri(e){const t=e.length;return e.forEach((n,r)=>{n.stepIndex=r+1,n.totalSteps=t}),e}function au(e,t,n={}){var b,v,A,g;const r=!!n.balancing;if(e.includes(t))return{frames:ri([ue(ni(e,r),{title:`Node ${t} Already Exists`,action:"Duplicate key ignored",reason:`BST rule: left < node < right. A key equal to ${t} is already present, so nothing is inserted.`,formula:"Equal keys are not inserted again",codeStep:"search:found",warningVal:t})]),updatedValues:e};let i=ni(e,r);const o=[],s=[],l=ue(i,{title:`Insert ${t} — Start at Root`,action:`Comparing ${t} with root`,reason:i?`Begin at root (${i.value}). If ${t} < ${i.value} go left, else go right.`:"The tree is empty, so this node becomes the root.",formula:`${t} < ${i?i.value:"—"} ? go Left : go Right`,codeStep:"insert:compare",activeVal:i==null?void 0:i.value,pathVals:i?[i.value]:[],variableWatch:{Inserting:t,"Current Node":i?i.value:"NULL (empty tree)"}});o.push(l);let c=null,u=null,d=i;for(;d&&(s.push(d),t!==d.value);)t<d.value?(c=d,u="left",o.push(ue(i,{title:`${t} < ${d.value} — Traverse Left`,action:`Moving to the left child of ${d.value}`,reason:`Since ${t} is smaller than ${d.value}, it belongs in the left subtree.`,formula:`${t} < ${d.value}  =>  go Left`,codeStep:"insert:goLeft",activeVal:d.value,pathVals:s.map(f=>f.value),variableWatch:{Inserting:t,"Current Node":d.value,Next:d.left?`left child ${d.left.value}`:"NULL (create here)"}})),d=d.left):(c=d,u="right",o.push(ue(i,{title:`${t} > ${d.value} — Traverse Right`,action:`Moving to the right child of ${d.value}`,reason:`Since ${t} is larger than ${d.value}, it belongs in the right subtree.`,formula:`${t} > ${d.value}  =>  go Right`,codeStep:"insert:goRight",activeVal:d.value,pathVals:s.map(f=>f.value),variableWatch:{Inserting:t,"Current Node":d.value,Next:d.right?`right child ${d.right.value}`:"NULL (create here)"}})),d=d.right);const h={value:t,height:1,balanceFactor:0,left:null,right:null};u==="left"&&c?c.left=h:u==="right"&&c?c.right=h:i=h;const p=s.map(f=>f.value);if(o.push(ue(i,{title:`Create Node ${t}`,action:`New node ${t} attached ${u?`as ${u} child of ${c==null?void 0:c.value}`:"as the root"}`,reason:`The empty slot is found. Node ${t} is created with height 1 and no children.`,formula:`new Node(${t})  •  height = 1, left = NULL, right = NULL`,codeStep:"insert:create",successVals:[t],pathVals:[...p,t],variableWatch:{Inserting:t,Created:`Node(${t})`,Parent:c?c.value:"ROOT",Side:u?u.toUpperCase():"—"}})),r)for(let f=s.length-1;f>=0;f--){const m=s[f];On(m);const w=m.balanceFactor;if(w>1||w<-1){const S=w>1?m.left&&vn(m.left)<0?"LR":"LL":m.right&&vn(m.right)>0?"RL":"RR";if(o.push(ue(i,{title:`Imbalance at Node ${m.value} (BF = ${w>0?"+":""}${w})`,action:`${S} Case Detected`,reason:`After inserting ${t}, node ${m.value} has balance factor ${w}, violating the AVL invariant |BF| <= 1. A rotation fixes it.`,formula:`BF = ${w} ${S==="LL"||S==="LR"?"=> Right Rotation":"=> Left Rotation"}`,codeStep:"avl:imbalance",errorVal:m.value,pathVals:p,variableWatch:{"Imbalanced Node":m.value,"Balance Factor":w,Case:S}})),w>1){m.left&&vn(m.left)<0&&(m.left=To(m.left));const N=Oo(m);if(f===0)i=N;else{const T=s[f-1];T.left===m?T.left=N:T.right=N}o.push(ue(i,{title:`Right Rotation Around ${m.value}`,action:"LL / LR fixed with Right Rotation",reason:`Rotating right moves the left child up and ${m.value} down. Height is recomputed and the subtree is balanced again.`,formula:`rightRotate(${m.value})`,codeStep:"avl:rotateRight",successVals:[m.value,(b=m.left)==null?void 0:b.value].filter(T=>T!==void 0),pathVals:p,variableWatch:{"Rotated Nodes":`${m.value} & ${(v=m.left)==null?void 0:v.value}`,"Result BF":"|BF| <= 1"}}))}else{m.right&&vn(m.right)>0&&(m.right=Oo(m.right));const N=To(m);if(f===0)i=N;else{const T=s[f-1];T.left===m?T.left=N:T.right=N}o.push(ue(i,{title:`Left Rotation Around ${m.value}`,action:"RR / RL fixed with Left Rotation",reason:`Rotating left moves the right child up and ${m.value} down. Height is recomputed and the subtree is balanced again.`,formula:`leftRotate(${m.value})`,codeStep:"avl:rotateLeft",successVals:[m.value,(A=m.right)==null?void 0:A.value].filter(T=>T!==void 0),pathVals:p,variableWatch:{"Rotated Nodes":`${m.value} & ${(g=m.right)==null?void 0:g.value}`,"Result BF":"|BF| <= 1"}}))}}}o.push(ue(i,{title:`Insertion of ${t} Complete`,action:r?"Tree Balanced Successfully":"BST Insertion Complete",reason:`Node ${t} is in its correct position. ${r?"Every node satisfies |BalanceFactor| <= 1.":"All nodes satisfy the BST ordering property."}`,formula:r?"Height = O(log N)":"BST order: Left < Node < Right",codeStep:"insert:done",successVals:[...p,t],variableWatch:{"Tree Size":o.length>0?ol(i):0}}));const x=Array.from(new Set([...e,t]));return{frames:ri(o),updatedValues:x}}function Af(e,t){const n=ni(e,!1),r=[],i=[];r.push(ue(n,{title:`Search ${t} — Start at Root`,action:`Comparing ${t} with root`,reason:n?`Begin at root (${n.value}). Compare ${t} with the current node at every step.`:"The tree is empty, so the key is not present.",formula:`${t} == ${n?n.value:"—"} ? Found : (${t} < node ? Left : Right)`,codeStep:"search:compare",activeVal:n==null?void 0:n.value,pathVals:n?[n.value]:[],variableWatch:{Searching:t,"Current Node":n?n.value:"NULL"}}));let o=n,s=!1;for(;o;){if(i.push(o),t===o.value){s=!0;break}t<o.value?(r.push(ue(n,{title:`${t} < ${o.value} — Search Left`,action:`Moving to the left child of ${o.value}`,reason:`${t} is smaller than ${o.value}, so it can only exist in the left subtree.`,formula:`${t} < ${o.value}  =>  go Left`,codeStep:"search:goLeft",activeVal:o.value,pathVals:i.map(l=>l.value),variableWatch:{Searching:t,"Current Node":o.value}})),o=o.left):(r.push(ue(n,{title:`${t} > ${o.value} — Search Right`,action:`Moving to the right child of ${o.value}`,reason:`${t} is larger than ${o.value}, so it can only exist in the right subtree.`,formula:`${t} > ${o.value}  =>  go Right`,codeStep:"search:goRight",activeVal:o.value,pathVals:i.map(l=>l.value),variableWatch:{Searching:t,"Current Node":o.value}})),o=o.right)}return s?r.push(ue(n,{title:`Found Node ${t}`,action:"Search Successful",reason:`Node ${t} matches the current node after ${i.length} comparison${i.length>1?"s":""}.`,formula:`Search Time: O(${i.length}) comparisons`,codeStep:"search:found",successVals:[t],pathVals:i.map(l=>l.value),variableWatch:{Result:"FOUND",Comparisons:i.length}})):r.push(ue(n,{title:`Node ${t} Not Present`,action:"Search Failed",reason:"A null child pointer was reached, meaning no node with this key exists in the tree.",formula:"Reached NULL => key does not exist",codeStep:"search:notfound",pathVals:i.map(l=>l.value),variableWatch:{Result:"NOT FOUND",Comparisons:i.length}})),ri(r)}function m1(e,t,n={}){const r=!!n.balancing;let i=ni(e,r);const o=[],s=[];if(!e.includes(t))return{frames:ri(Af(e,t)),updatedValues:e};o.push(ue(i,{title:`Delete ${t} — Locate Node`,action:"Searching for the target node",reason:`Traverse from the root to node ${t}, following the BST ordering rules.`,formula:`${t} == node ? Delete : (${t} < node ? Left : Right)`,codeStep:"delete:compare",activeVal:i==null?void 0:i.value,pathVals:i?[i.value]:[],variableWatch:{Deleting:t,"Current Node":i?i.value:"NULL"}}));let l=i;for(;l&&l.value!==t;)s.push(l),t<l.value?(o.push(ue(i,{title:`${t} < ${l.value} — Go Left`,action:`Moving to the left child of ${l.value}`,reason:`The key being deleted is smaller than ${l.value}.`,formula:`${t} < ${l.value}  =>  go Left`,codeStep:"delete:goLeft",activeVal:l.value,pathVals:s.map(h=>h.value),variableWatch:{Deleting:t,"Current Node":l.value}})),l=l.left):(o.push(ue(i,{title:`${t} > ${l.value} — Go Right`,action:`Moving to the right child of ${l.value}`,reason:`The key being deleted is larger than ${l.value}.`,formula:`${t} > ${l.value}  =>  go Right`,codeStep:"delete:goRight",activeVal:l.value,pathVals:s.map(h=>h.value),variableWatch:{Deleting:t,"Current Node":l.value}})),l=l.right);l&&s.push(l);const c=l,u=(c!=null&&c.left?1:0)+(c!=null&&c.right?1:0);if(o.push(ue(i,{title:`Node ${t} Located`,action:`Deleting node with ${u} child${u===1?"":"ren"}`,reason:u===0?`Node ${t} is a leaf, so it can be removed directly.`:u===1?`Node ${t} has one child, which simply replaces it.`:`Node ${t} has two children: copy the in-order successor (smallest key in the right subtree) and delete that successor instead.`,formula:u===0?"Case 1: delete leaf":u===1?"Case 2: replace with child":"Case 3: copy in-order successor",codeStep:"search:found",activeVal:t,pathVals:s.map(h=>h.value),variableWatch:{Deleting:t,Children:u}})),u===2&&c){const h=s.map(x=>x.value);let p=c.right;for(o.push(ue(i,{title:`Find In-Order Successor of ${t}`,action:"Smallest key in the right subtree",reason:`Go right once from ${t}, then keep going left until the minimum key is reached.`,formula:`successor = min(rightSubtree of ${t})`,codeStep:"delete:successor",activeVal:p.value,pathVals:h,variableWatch:{Successor:p.value}}));p.left;)o.push(ue(i,{title:`${p.value} Has a Left Child — Go Left`,action:"Traversing to the minimum",reason:"The successor is the leftmost node in the right subtree.",formula:"successor = successor.left",codeStep:"delete:successor",activeVal:p.left.value,pathVals:h,variableWatch:{Successor:p.left.value}})),p=p.left;o.push(ue(i,{title:`Copy ${p.value} Into Node ${t}`,action:"Overwrite + remove successor node",reason:`The successor value (${p.value}) is copied over the deleted node's value, then the successor (a leaf or one-child node) is removed.`,formula:`node(${t}) = ${p.value}  =>  delete(${p.value})`,codeStep:"delete:remove",warningVal:p.value,successVals:[t],pathVals:h,variableWatch:{"Copied Value":p.value,Removed:p.value}}))}else c&&o.push(ue(i,{title:`Remove Node ${t}`,action:"Unlink node from its parent",reason:u===0?`Node ${t} has no children — the parent's pointer to it is simply set to NULL.`:`Node ${t} has one child — the parent's pointer is redirected to that child.`,formula:u===0?`parent->${t} = NULL`:`parent->${t} = ${t}'s child`,codeStep:"delete:remove",warningVal:t,pathVals:s.map(h=>h.value),variableWatch:{Removed:t}}));const d=e.filter(h=>h!==t);return i=ni(d,r),o.push(ue(i,{title:`Deletion of ${t} Complete`,action:r?"Tree Rebalanced Successfully":"BST Deletion Complete",reason:`Node ${t} has been removed. ${r?"Balance factors are recomputed along the path and rotations applied where needed.":"The BST ordering property is preserved."}`,formula:r?"|BalanceFactor| <= 1 for every node":"Left < Node < Right",codeStep:"delete:remove",successVals:d,variableWatch:{"Tree Size":d.length}})),{frames:ri(o),updatedValues:d}}function ol(e){return e?1+ol(e.left)+ol(e.right):0}const g1={"insert:compare":[/\binsert\w*\s*\(/],"insert:goLeft":[/key\s*<\s*.*\bkey\b/],"insert:goRight":[/key\s*>\s*.*\bkey\b/],"insert:create":[/Node\s*\(\s*key\s*\)/],"avl:balance":[/\bget_?Balance\s*\(/,/height\s*=\s*1\s*\+\s*(Math\.)?max/],"avl:imbalance":[/balance\s*>\s*1/,/balance\s*<\s*-1/,/if\s*\(?\s*balance\s*[<>]/],"avl:rotateRight":[/right_?Rotate\s*\(/],"avl:rotateLeft":[/left_?Rotate\s*\(/],"search:compare":[/\bsearch\w*\s*\(/],"search:goLeft":[/key\s*<\s*.*\bkey\b/],"search:goRight":[/key\s*>\s*.*\bkey\b/],"search:found":[/key\s*==\s*.*\bkey\b/],"search:notfound":[/return\s+[Ff]alse/],"delete:compare":[/\bdelete\w*Node\s*\(/],"delete:goLeft":[/key\s*<\s*.*\bkey\b/],"delete:goRight":[/key\s*>\s*.*\bkey\b/],"delete:remove":[/\bdelete\w*Node\s*\(/,/delete\s+root/],"delete:successor":[/min_?\w*Node\s*\(/,/min_value_node\s*\(/],"insert:done":[/\breturn\s+(root|node)\b/]},y1=["cpp","java","python","javascript","csharp","go","rust","c"],lu=new Map;function v1(e,t){if(!e)return{};const n=g1[e];if(!n)return{};const r=`${t.title}|${e}`,i=lu.get(r);if(i)return i;const o={};for(const s of y1){const l=t[s];if(typeof l!="string")continue;const c=l.split(`
`),u=[];c.forEach((d,h)=>{n.some(p=>p.test(d))&&u.push(h+1)}),u.length>0&&(o[s]=u)}return lu.set(r,o),o}const x1=["avl","bst","redblack","btree","segment","heap"];function k1(e){return x1.includes(e)}const Ys={xp:0,levelUnlocked:1,starsPerLevel:{},completedLevels:[],badges:[],streakDays:1,bookmarks:[],notes:[],username:"Student"},w1=()=>{const{isLoaded:e,isSignedIn:t,user:n}=nc(),[r,i]=z.useState("campaign"),[o,s]=z.useState("canvas"),[l,c]=z.useState(Qe[0]),[u,d]=z.useState(!0),[h,p]=z.useState(()=>!localStorage.getItem("adsa_quest_v2_onboarded")),[x,b]=z.useState(!1),[v,A]=z.useState(()=>{const _=localStorage.getItem("adsa_quest_v2_progress");if(_)try{const q=JSON.parse(_);return{...Ys,...q}}catch{}return Ys}),[g,f]=z.useState([]);z.useEffect(()=>{var _;if(e&&t&&n){const q=n.fullName||n.firstName||((_=n.primaryEmailAddress)==null?void 0:_.emailAddress)||"Student";v.username!==q&&A(U=>({...U,username:q}))}},[e,t,n]),z.useEffect(()=>{localStorage.setItem("adsa_quest_v2_progress",JSON.stringify(v)),Ux(v)},[v]);const[m,w]=z.useState([]),[S,N]=z.useState(0),[T,C]=z.useState(!1),[M,R]=z.useState(1),L=z.useRef(0),V=(_,q)=>{let U=[];const we=[];for(const Fe of _){const Ie=au(U,Fe,{balancing:q});U=Ie.updatedValues,we.push(...Ie.frames)}return we.map((Fe,Ie)=>({...Fe,stepIndex:Ie+1,totalSteps:we.length}))},K=(_,q)=>_==="avl"?V(q,!0):_==="bst"?V(q,!1):il(q);z.useEffect(()=>{L.current+=1;let _=[];const q=l.algorithmKey;if(k1(q))f([]),_=[su(l.title)];else if(q==="dijkstra"||q==="bellmanford"||q==="mst"||q==="tarjan"||q==="bfsdfs"||q==="floydwarshall")_=Nf();else if(q==="knapsack"||q==="lcs"||q==="matrixchain")_=jf();else if(q==="trie"||q==="kmp"||q==="suffixarray"){const U=Array.isArray(l.defaultInput)&&typeof l.defaultInput[0]=="string"?l.defaultInput:["cat","car","dot"];_=Cf(U)}else _=il([15,25,35,45]);w(_),N(0),C(!1)},[l]),z.useEffect(()=>{let _=null;if(T&&m.length>0){const q=L.current;_=setInterval(()=>{if(L.current!==q){C(!1);return}N(U=>U+1<m.length?U+1:(C(!1),U))},1100/M)}return()=>{_&&clearInterval(_)}},[T,m,M]);const G=m[S]||m[0],ie=Kn[l.algorithmKey]||Kn.avl,ve=Jd[l.algorithmKey]||Jd.avl,O=G!=null&&G.codeStep?v1(G.codeStep,ie):(G==null?void 0:G.highlightCodeLines)||{},E=Qe.filter(_=>_.levelNumber<=v.levelUnlocked),I=E.some(_=>_.id===l.id),y=_=>{L.current+=1;const{frames:q,updatedValues:U}=au(g,_,{balancing:l.algorithmKey==="avl"});f(U),w(q),N(0),C(!0)},k=_=>{L.current+=1;const{frames:q,updatedValues:U}=m1(g,_,{balancing:l.algorithmKey==="avl"});f(U),w(q),N(0),C(!0)},F=_=>{L.current+=1;const q=Af(g,_);w(q),N(0),C(!0)},W=()=>{L.current+=1;const _=Array.isArray(l.defaultInput)&&typeof l.defaultInput[0]=="number"?l.defaultInput:[10,20,30,40,50,25];f(_),w(K(l.algorithmKey,_)),N(0),C(!0)},H=()=>{L.current+=1;const _=5+Math.floor(Math.random()*4),q=Array.from({length:_},()=>Math.floor(Math.random()*90)+10);f(q),w(K(l.algorithmKey,q)),N(0),C(!1)},X=()=>{L.current+=1,f([]),w([su(l.title)]),N(0),C(!1)},Q=_=>{c(_),i("visualizer"),s("canvas")},$=_=>{c(_),i("arena")},Y=(_,q)=>{A(U=>({...U,xp:U.xp+q,levelUnlocked:Math.max(U.levelUnlocked,l.levelNumber+1),starsPerLevel:{...U.starsPerLevel,[l.id]:Math.max(U.starsPerLevel[l.id]||0,_)},completedLevels:Array.from(new Set([...U.completedLevels,l.id]))})),$x(v.username||"Student",l.id,_,q)},te=_=>{A(q=>({...q,username:_}))},ce=()=>{window.confirm("Are you sure you want to reset all learning progress?")&&(A(Ys),localStorage.removeItem("adsa_quest_v2_progress"))},ne=()=>{localStorage.setItem("adsa_quest_v2_onboarded","true"),p(!1)};return a.jsxs("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",background:"#fff"},children:[u&&a.jsx(d1,{onFinish:()=>d(!1)}),!u&&h&&a.jsx(u1,{onComplete:ne}),a.jsx(h1,{isOpen:x,onClose:()=>b(!1),onLoginAsGuest:te}),a.jsx(Lx,{userProgress:v,activeTab:r,setActiveTab:i,onOpenAuthModal:()=>b(!0)}),a.jsxs("main",{style:{flex:1,paddingBottom:80},children:[r==="campaign"&&a.jsx(Bx,{userProgress:v,onSelectLevel:Q,onStartQuiz:$}),r==="visualizer"&&a.jsxs("div",{style:{maxWidth:"var(--max-width)",margin:"0 auto",padding:"20px 16px"},children:[a.jsxs("div",{className:"card-light",style:{padding:"16px 20px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10},children:[a.jsxs("div",{children:[a.jsxs("span",{style:{fontSize:"0.68rem",fontWeight:800,color:"var(--accent-red)",textTransform:"uppercase",letterSpacing:"0.06em"},children:["Level ",l.levelNumber," • ",l.category]}),a.jsx("h2",{style:{fontSize:"1.3rem",fontWeight:800,letterSpacing:"-0.03em",color:"#000"},children:l.title})]}),a.jsxs("select",{value:l.id,onChange:_=>{const q=Qe.find(U=>U.id===_.target.value);q&&q.levelNumber<=v.levelUnlocked&&c(q)},style:{padding:"8px 12px",borderRadius:"var(--radius-md)",border:"1.5px solid var(--border-hairline)",fontWeight:600,fontSize:"0.85rem",fontFamily:"var(--font-main)"},children:[!I&&a.jsxs("option",{value:l.id,disabled:!0,children:["🔒 L",l.levelNumber,": ",l.title," (locked)"]}),E.map(_=>a.jsxs("option",{value:_.id,children:["L",_.levelNumber,": ",_.title]},_.id))]})]}),a.jsxs("div",{style:{display:"flex",background:"var(--bg-light)",padding:4,borderRadius:"var(--radius-pill)",marginBottom:16},children:[a.jsxs("button",{className:"btn btn-sm",style:{flex:1,background:o==="canvas"?"#000000":"transparent",color:o==="canvas"?"#FFFFFF":"var(--text-secondary)",border:"none",gap:6},onClick:()=>s("canvas"),children:[a.jsx(ns,{size:15})," Visualizer Canvas"]}),a.jsxs("button",{className:"btn btn-sm",style:{flex:1,background:o==="theory"?"#000000":"transparent",color:o==="theory"?"#FFFFFF":"var(--text-secondary)",border:"none",gap:6},onClick:()=>s("theory"),children:[a.jsx(tl,{size:15})," Pin-to-Pin Theory & Concept"]}),a.jsxs("button",{className:"btn btn-sm",style:{flex:1,background:o==="code"?"#000000":"transparent",color:o==="code"?"#FFFFFF":"var(--text-secondary)",border:"none",gap:6},onClick:()=>s("code"),children:[a.jsx(ui,{size:15})," 8-Lang Code Tracer"]})]}),o==="theory"&&a.jsx(Dx,{theory:ve}),o==="code"&&a.jsx("div",{style:{height:520},children:a.jsx(rl,{codeSnippet:ie,activeLineNumbers:O})}),o==="canvas"&&a.jsxs("div",{children:[(l.category==="Trees"||l.algorithmKey==="avl"||l.algorithmKey==="bst")&&a.jsx(Wx,{onInsertNode:y,onDeleteNode:k,onSearchNode:F,onRandomizeTree:H,onResetTree:X,onSampleTree:W}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(300px, 1.4fr) minmax(280px, 1fr)",gap:16},children:[a.jsxs("div",{children:[l.algorithmKey==="knapsack"||l.algorithmKey==="lcs"||l.algorithmKey==="matrixchain"?a.jsx(kf,{dpMatrix:G==null?void 0:G.dpMatrix}):a.jsx(Ao,{nodes:(G==null?void 0:G.nodes)||[],edges:(G==null?void 0:G.edges)||[]}),a.jsx(wf,{currentStep:S+1,totalSteps:m.length,isPlaying:T,playbackSpeed:M,onPlayPause:()=>C(!T),onStepBack:()=>N(_=>Math.max(0,_-1)),onStepForward:()=>N(_=>Math.min(m.length-1,_+1)),onReset:()=>{N(0),C(!1)},onSpeedChange:R})]}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[a.jsx("div",{style:{height:250},children:a.jsx(bf,{currentFrame:G})}),a.jsx("div",{style:{flex:1,minHeight:250},children:a.jsx(rl,{codeSnippet:ie,activeLineNumbers:O})})]})]})]})]}),r==="arena"&&a.jsxs("div",{style:{maxWidth:"var(--max-width)",margin:"0 auto",padding:"20px 16px"},children:[a.jsxs("div",{style:{textAlign:"center",marginBottom:24},children:[a.jsx("h2",{className:"section-title",children:"Challenge Arena"}),a.jsx("p",{className:"section-subtitle",children:"Test your knowledge with quizzes and interactive puzzles."})]}),a.jsx(Xx,{currentLevel:l,userId:v.username||"Student",onCompleteQuiz:Y,onBackToCampaign:()=>i("campaign")}),a.jsx("div",{style:{marginTop:32},children:a.jsx(e1,{currentLevel:l,userId:v.username||"Student"})})]}),r==="library"&&a.jsx(t1,{}),r==="notes"&&a.jsx(i1,{userProgress:v}),r==="sandbox"&&a.jsx(a1,{}),r==="flashcards"&&a.jsx(l1,{userId:v.username||"Student"}),r==="dashboard"&&a.jsx(n1,{userProgress:v}),r==="compare"&&a.jsx(r1,{}),r==="profile"&&a.jsx(c1,{userProgress:v,onOpenAuthModal:()=>b(!0),onResetProgress:ce})]}),a.jsx(Rx,{activeTab:r,setActiveTab:i})]})},b1="pk_test_d2VhbHRoeS10YWRwb2xlLTUzLmNsZXJrLmFjY291bnRzLmRldiQ";Zs.createRoot(document.getElementById("root")).render(a.jsx(j.StrictMode,{children:a.jsx(tf,{publishableKey:b1,children:a.jsx(w1,{})})}));
