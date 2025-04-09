import{c as d,j as oa,r as C,p as J,k as u,_ as U,l as ra,m as ua,aH as ia,s as Te,Q as k}from"./index.a84a4054.js";import{c as sa,d as da}from"./use-quasar.95fbdb12.js";import{u as va}from"./use-cache.b0833c75.js";import{a as ca,i as fa,h as ma}from"./use-key-composition.37581874.js";import{t as ha,a as Fe,f as ya,g as ga,j as ge,_ as _a}from"./date.a39ca55c.js";import{p as I}from"./QSelect.1b95f875.js";const ba=["gregorian","persian"],Da={modelValue:{required:!0},mask:{type:String},locale:Object,calendar:{type:String,validator:n=>ba.includes(n),default:"gregorian"},landscape:Boolean,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,readonly:Boolean,disable:Boolean},wa=["update:modelValue"];function V(n){return n.year+"/"+I(n.month)+"/"+I(n.day)}function qa(n,K){const x=d(()=>n.disable!==!0&&n.readonly!==!0),W=d(()=>x.value===!0?0:-1),q=d(()=>{const m=[];return n.color!==void 0&&m.push(`bg-${n.color}`),n.textColor!==void 0&&m.push(`text-${n.textColor}`),m.join(" ")});function le(){return n.locale!==void 0?{...K.lang.date,...n.locale}:K.lang.date}function b(m){const B=new Date,S=m===!0?null:0;if(n.calendar==="persian"){const $=ha(B);return{year:$.jy,month:$.jm,day:$.jd}}return{year:B.getFullYear(),month:B.getMonth()+1,day:B.getDate(),hour:S,minute:S,second:S,millisecond:S}}return{editable:x,tabindex:W,headerClass:q,getLocale:le,getCurrentDate:b}}const F=20,xa=["Calendar","Years","Months"],Ie=n=>xa.includes(n),_e=n=>/^-?[\d]+\/[0-1]\d$/.test(n),z=" \u2014 ";function Y(n){return n.year+"/"+I(n.month)}var Sa=oa({name:"QDate",props:{...Da,...ca,...sa,multiple:Boolean,range:Boolean,title:String,subtitle:String,mask:{default:"YYYY/MM/DD"},defaultYearMonth:{type:String,validator:_e},yearsInMonthView:Boolean,events:[Array,Function],eventColor:[String,Function],emitImmediately:Boolean,options:[Array,Function],navigationMinYearMonth:{type:String,validator:_e},navigationMaxYearMonth:{type:String,validator:_e},noUnset:Boolean,firstDayOfWeek:[String,Number],todayBtn:Boolean,minimal:Boolean,defaultView:{type:String,default:"Calendar",validator:Ie}},emits:[...wa,"rangeStart","rangeEnd","navigation"],setup(n,{slots:K,emit:x}){const{proxy:W}=ua(),{$q:q}=W,le=da(n,q),{getCache:b}=va(),{tabindex:m,headerClass:B,getLocale:S,getCurrentDate:$}=qa(n,q);let G;const Be=fa(n),$e=ma(Be),oe=C(null),j=C(ke()),f=C(S()),Ee=d(()=>ke()),Ae=d(()=>S()),M=d(()=>$()),i=C(He(j.value,f.value)),_=C(n.defaultView),be=q.lang.rtl===!0?"right":"left",X=C(be.value),re=C(be.value),ue=i.value.year,Z=C(ue-ue%F-(ue<0?F:0)),h=C(null),Re=d(()=>{const e=n.landscape===!0?"landscape":"portrait";return`q-date q-date--${e} q-date--${e}-${n.minimal===!0?"minimal":"standard"}`+(le.value===!0?" q-date--dark q-dark":"")+(n.bordered===!0?" q-date--bordered":"")+(n.square===!0?" q-date--square no-border-radius":"")+(n.flat===!0?" q-date--flat no-shadow":"")+(n.disable===!0?" disabled":n.readonly===!0?" q-date--readonly":"")}),O=d(()=>n.color||"primary"),E=d(()=>n.textColor||"white"),p=d(()=>n.emitImmediately===!0&&n.multiple!==!0&&n.range!==!0),ie=d(()=>Array.isArray(n.modelValue)===!0?n.modelValue:n.modelValue!==null&&n.modelValue!==void 0?[n.modelValue]:[]),w=d(()=>ie.value.filter(e=>typeof e=="string").map(e=>ce(e,j.value,f.value)).filter(e=>e.dateHash!==null&&e.day!==null&&e.month!==null&&e.year!==null)),A=d(()=>{const e=a=>ce(a,j.value,f.value);return ie.value.filter(a=>ia(a)===!0&&a.from!==void 0&&a.to!==void 0).map(a=>({from:e(a.from),to:e(a.to)})).filter(a=>a.from.dateHash!==null&&a.to.dateHash!==null&&a.from.dateHash<a.to.dateHash)}),ee=d(()=>n.calendar!=="persian"?e=>new Date(e.year,e.month-1,e.day):e=>{const a=Fe(e.year,e.month,e.day);return new Date(a.gy,a.gm-1,a.gd)}),se=d(()=>n.calendar==="persian"?V:(e,a,t)=>ya(new Date(e.year,e.month-1,e.day,e.hour,e.minute,e.second,e.millisecond),a===void 0?j.value:a,t===void 0?f.value:t,e.year,e.timezoneOffset)),L=d(()=>w.value.length+A.value.reduce((e,a)=>e+1+ga(ee.value(a.to),ee.value(a.from)),0)),De=d(()=>{if(n.title!==void 0&&n.title!==null&&n.title.length>0)return n.title;if(h.value!==null){const t=h.value.init,o=ee.value(t);return f.value.daysShort[o.getDay()]+", "+f.value.monthsShort[t.month-1]+" "+t.day+z+"?"}if(L.value===0)return z;if(L.value>1)return`${L.value} ${f.value.pluralDay}`;const e=w.value[0],a=ee.value(e);return isNaN(a.valueOf())===!0?z:f.value.headerTitle!==void 0?f.value.headerTitle(a,e):f.value.daysShort[a.getDay()]+", "+f.value.monthsShort[e.month-1]+" "+e.day}),Ne=d(()=>w.value.concat(A.value.map(a=>a.from)).sort((a,t)=>a.year-t.year||a.month-t.month)[0]),ze=d(()=>w.value.concat(A.value.map(a=>a.to)).sort((a,t)=>t.year-a.year||t.month-a.month)[0]),we=d(()=>{if(n.subtitle!==void 0&&n.subtitle!==null&&n.subtitle.length>0)return n.subtitle;if(L.value===0)return z;if(L.value>1){const e=Ne.value,a=ze.value,t=f.value.monthsShort;return t[e.month-1]+(e.year!==a.year?" "+e.year+z+t[a.month-1]+" ":e.month!==a.month?z+t[a.month-1]:"")+" "+a.year}return w.value[0].year}),ae=d(()=>{const e=[q.iconSet.datetime.arrowLeft,q.iconSet.datetime.arrowRight];return q.lang.rtl===!0?e.reverse():e}),qe=d(()=>n.firstDayOfWeek!==void 0?Number(n.firstDayOfWeek):f.value.firstDayOfWeek),We=d(()=>{const e=f.value.daysShort,a=qe.value;return a>0?e.slice(a,7).concat(e.slice(0,a)):e}),H=d(()=>{const e=i.value;return n.calendar!=="persian"?new Date(e.year,e.month,0).getDate():ge(e.year,e.month)}),Le=d(()=>typeof n.eventColor=="function"?n.eventColor:()=>n.eventColor),y=d(()=>{if(n.navigationMinYearMonth===void 0)return null;const e=n.navigationMinYearMonth.split("/");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}),g=d(()=>{if(n.navigationMaxYearMonth===void 0)return null;const e=n.navigationMaxYearMonth.split("/");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}),de=d(()=>{const e={month:{prev:!0,next:!0},year:{prev:!0,next:!0}};return y.value!==null&&y.value.year>=i.value.year&&(e.year.prev=!1,y.value.year===i.value.year&&y.value.month>=i.value.month&&(e.month.prev=!1)),g.value!==null&&g.value.year<=i.value.year&&(e.year.next=!1,g.value.year===i.value.year&&g.value.month<=i.value.month&&(e.month.next=!1)),e}),te=d(()=>{const e={};return w.value.forEach(a=>{const t=Y(a);e[t]===void 0&&(e[t]=[]),e[t].push(a.day)}),e}),xe=d(()=>{const e={};return A.value.forEach(a=>{const t=Y(a.from),o=Y(a.to);if(e[t]===void 0&&(e[t]=[]),e[t].push({from:a.from.day,to:t===o?a.to.day:void 0,range:a}),t<o){let l;const{year:v,month:r}=a.from,s=r<12?{year:v,month:r+1}:{year:v+1,month:1};for(;(l=Y(s))<=o;)e[l]===void 0&&(e[l]=[]),e[l].push({from:void 0,to:l===o?a.to.day:void 0,range:a}),s.month++,s.month>12&&(s.year++,s.month=1)}}),e}),P=d(()=>{if(h.value===null)return;const{init:e,initHash:a,final:t,finalHash:o}=h.value,[l,v]=a<=o?[e,t]:[t,e],r=Y(l),s=Y(v);if(r!==D.value&&s!==D.value)return;const c={};return r===D.value?(c.from=l.day,c.includeFrom=!0):c.from=1,s===D.value?(c.to=v.day,c.includeTo=!0):c.to=H.value,c}),D=d(()=>Y(i.value)),Pe=d(()=>{const e={};if(n.options===void 0){for(let t=1;t<=H.value;t++)e[t]=!0;return e}const a=typeof n.options=="function"?n.options:t=>n.options.includes(t);for(let t=1;t<=H.value;t++){const o=D.value+"/"+I(t);e[t]=a(o)}return e}),Qe=d(()=>{const e={};if(n.events===void 0)for(let a=1;a<=H.value;a++)e[a]=!1;else{const a=typeof n.events=="function"?n.events:t=>n.events.includes(t);for(let t=1;t<=H.value;t++){const o=D.value+"/"+I(t);e[t]=a(o)===!0&&Le.value(o)}}return e}),Je=d(()=>{let e,a;const{year:t,month:o}=i.value;if(n.calendar!=="persian")e=new Date(t,o-1,1),a=new Date(t,o-1,0).getDate();else{const l=Fe(t,o,1);e=new Date(l.gy,l.gm-1,l.gd);let v=o-1,r=t;v===0&&(v=12,r--),a=ge(r,v)}return{days:e.getDay()-qe.value-1,endDay:a}}),Me=d(()=>{const e=[],{days:a,endDay:t}=Je.value,o=a<0?a+7:a;if(o<6)for(let r=t-o;r<=t;r++)e.push({i:r,fill:!0});const l=e.length;for(let r=1;r<=H.value;r++){const s={i:r,event:Qe.value[r],classes:[]};Pe.value[r]===!0&&(s.in=!0,s.flat=!0),e.push(s)}if(te.value[D.value]!==void 0&&te.value[D.value].forEach(r=>{const s=l+r-1;Object.assign(e[s],{selected:!0,unelevated:!0,flat:!1,color:O.value,textColor:E.value})}),xe.value[D.value]!==void 0&&xe.value[D.value].forEach(r=>{if(r.from!==void 0){const s=l+r.from-1,c=l+(r.to||H.value)-1;for(let Q=s;Q<=c;Q++)Object.assign(e[Q],{range:r.range,unelevated:!0,color:O.value,textColor:E.value});Object.assign(e[s],{rangeFrom:!0,flat:!1}),r.to!==void 0&&Object.assign(e[c],{rangeTo:!0,flat:!1})}else if(r.to!==void 0){const s=l+r.to-1;for(let c=l;c<=s;c++)Object.assign(e[c],{range:r.range,unelevated:!0,color:O.value,textColor:E.value});Object.assign(e[s],{flat:!1,rangeTo:!0})}else{const s=l+H.value-1;for(let c=l;c<=s;c++)Object.assign(e[c],{range:r.range,unelevated:!0,color:O.value,textColor:E.value})}}),P.value!==void 0){const r=l+P.value.from-1,s=l+P.value.to-1;for(let c=r;c<=s;c++)e[c].color=O.value,e[c].editRange=!0;P.value.includeFrom===!0&&(e[r].editRangeFrom=!0),P.value.includeTo===!0&&(e[s].editRangeTo=!0)}i.value.year===M.value.year&&i.value.month===M.value.month&&(e[l+M.value.day-1].today=!0);const v=e.length%7;if(v>0){const r=7-v;for(let s=1;s<=r;s++)e.push({i:s,fill:!0})}return e.forEach(r=>{let s="q-date__calendar-item ";r.fill===!0?s+="q-date__calendar-item--fill":(s+=`q-date__calendar-item--${r.in===!0?"in":"out"}`,r.range!==void 0&&(s+=` q-date__range${r.rangeTo===!0?"-to":r.rangeFrom===!0?"-from":""}`),r.editRange===!0&&(s+=` q-date__edit-range${r.editRangeFrom===!0?"-from":""}${r.editRangeTo===!0?"-to":""}`),(r.range!==void 0||r.editRange===!0)&&(s+=` text-${r.color}`)),r.classes=s}),e}),Ue=d(()=>n.disable===!0?{"aria-disabled":"true"}:n.readonly===!0?{"aria-readonly":"true"}:{});J(()=>n.modelValue,e=>{if(G===e)G=0;else{const a=He(j.value,f.value);R(a.year,a.month,a)}}),J(_,()=>{oe.value!==null&&W.$el.contains(document.activeElement)===!0&&oe.value.focus()}),J(()=>i.value.year+"|"+i.value.month,()=>{x("navigation",{year:i.value.year,month:i.value.month})}),J(Ee,e=>{Oe(e,f.value,"mask"),j.value=e}),J(Ae,e=>{Oe(j.value,e,"locale"),f.value=e});function Ce(){const e=M.value,a=te.value[Y(e)];(a===void 0||a.includes(e.day)===!1)&&me(e),ve(e.year,e.month)}function Ke(e){Ie(e)===!0&&(_.value=e)}function Ge(e,a){["month","year"].includes(e)&&(e==="month"?Ye:fe)(a===!0?-1:1)}function ve(e,a){_.value="Calendar",R(e,a)}function Xe(e,a){if(n.range===!1||!e){h.value=null;return}const t=Object.assign({...i.value},e),o=a!==void 0?Object.assign({...i.value},a):t;h.value={init:t,initHash:V(t),final:o,finalHash:V(o)},ve(t.year,t.month)}function ke(){return n.calendar==="persian"?"YYYY/MM/DD":n.mask}function ce(e,a,t){return _a(e,a,t,n.calendar,{hour:0,minute:0,second:0,millisecond:0})}function He(e,a){const t=Array.isArray(n.modelValue)===!0?n.modelValue:n.modelValue?[n.modelValue]:[];if(t.length===0)return Ve();const o=t[t.length-1],l=ce(o.from!==void 0?o.from:o,e,a);return l.dateHash===null?Ve():l}function Ve(){let e,a;if(n.defaultYearMonth!==void 0){const t=n.defaultYearMonth.split("/");e=parseInt(t[0],10),a=parseInt(t[1],10)}else{const t=M.value!==void 0?M.value:$();e=t.year,a=t.month}return{year:e,month:a,day:1,hour:0,minute:0,second:0,millisecond:0,dateHash:e+"/"+I(a)+"/01"}}function Ye(e){let a=i.value.year,t=Number(i.value.month)+e;t===13?(t=1,a++):t===0&&(t=12,a--),R(a,t),p.value===!0&&ne("month")}function fe(e){const a=Number(i.value.year)+e;R(a,i.value.month),p.value===!0&&ne("year")}function Ze(e){R(e,i.value.month),_.value=n.defaultView==="Years"?"Months":"Calendar",p.value===!0&&ne("year")}function pe(e){R(i.value.year,e),_.value="Calendar",p.value===!0&&ne("month")}function ea(e,a){const t=te.value[a];(t!==void 0&&t.includes(e.day)===!0?he:me)(e)}function T(e){return{year:e.year,month:e.month,day:e.day}}function R(e,a,t){if(y.value!==null&&e<=y.value.year&&(e=y.value.year,a<y.value.month&&(a=y.value.month)),g.value!==null&&e>=g.value.year&&(e=g.value.year,a>g.value.month&&(a=g.value.month)),t!==void 0){const{hour:l,minute:v,second:r,millisecond:s,timezoneOffset:c,timeHash:Q}=t;Object.assign(i.value,{hour:l,minute:v,second:r,millisecond:s,timezoneOffset:c,timeHash:Q})}const o=e+"/"+I(a)+"/01";o!==i.value.dateHash&&(X.value=i.value.dateHash<o==(q.lang.rtl!==!0)?"left":"right",e!==i.value.year&&(re.value=X.value),Te(()=>{Z.value=e-e%F-(e<0?F:0),Object.assign(i.value,{year:e,month:a,day:1,dateHash:o})}))}function Se(e,a,t){const o=e!==null&&e.length===1&&n.multiple===!1?e[0]:e;G=o;const{reason:l,details:v}=je(a,t);x("update:modelValue",o,l,v)}function ne(e){const a=w.value[0]!==void 0&&w.value[0].dateHash!==null?{...w.value[0]}:{...i.value};Te(()=>{a.year=i.value.year,a.month=i.value.month;const t=n.calendar!=="persian"?new Date(a.year,a.month,0).getDate():ge(a.year,a.month);a.day=Math.min(Math.max(1,a.day),t);const o=N(a);G=o;const{details:l}=je("",a);x("update:modelValue",o,e,l)})}function je(e,a){return a.from!==void 0?{reason:`${e}-range`,details:{...T(a.target),from:T(a.from),to:T(a.to)}}:{reason:`${e}-day`,details:T(a)}}function N(e,a,t){return e.from!==void 0?{from:se.value(e.from,a,t),to:se.value(e.to,a,t)}:se.value(e,a,t)}function me(e){let a;if(n.multiple===!0)if(e.from!==void 0){const t=V(e.from),o=V(e.to),l=w.value.filter(r=>r.dateHash<t||r.dateHash>o),v=A.value.filter(({from:r,to:s})=>s.dateHash<t||r.dateHash>o);a=l.concat(v).concat(e).map(r=>N(r))}else{const t=ie.value.slice();t.push(N(e)),a=t}else a=N(e);Se(a,"add",e)}function he(e){if(n.noUnset===!0)return;let a=null;if(n.multiple===!0&&Array.isArray(n.modelValue)===!0){const t=N(e);e.from!==void 0?a=n.modelValue.filter(o=>o.from!==void 0?o.from!==t.from&&o.to!==t.to:!0):a=n.modelValue.filter(o=>o!==t),a.length===0&&(a=null)}Se(a,"remove",e)}function Oe(e,a,t){const o=w.value.concat(A.value).map(l=>N(l,e,a)).filter(l=>l.from!==void 0?l.from.dateHash!==null&&l.to.dateHash!==null:l.dateHash!==null);x("update:modelValue",(n.multiple===!0?o:o[0])||null,t)}function aa(){if(n.minimal!==!0)return u("div",{class:"q-date__header "+B.value},[u("div",{class:"relative-position"},[u(U,{name:"q-transition--fade"},()=>u("div",{key:"h-yr-"+we.value,class:"q-date__header-subtitle q-date__header-link "+(_.value==="Years"?"q-date__header-link--active":"cursor-pointer"),tabindex:m.value,...b("vY",{onClick(){_.value="Years"},onKeyup(e){e.keyCode===13&&(_.value="Years")}})},[we.value]))]),u("div",{class:"q-date__header-title relative-position flex no-wrap"},[u("div",{class:"relative-position col"},[u(U,{name:"q-transition--fade"},()=>u("div",{key:"h-sub"+De.value,class:"q-date__header-title-label q-date__header-link "+(_.value==="Calendar"?"q-date__header-link--active":"cursor-pointer"),tabindex:m.value,...b("vC",{onClick(){_.value="Calendar"},onKeyup(e){e.keyCode===13&&(_.value="Calendar")}})},[De.value]))]),n.todayBtn===!0?u(k,{class:"q-date__header-today self-start",icon:q.iconSet.datetime.today,flat:!0,size:"sm",round:!0,tabindex:m.value,onClick:Ce}):null])])}function ye({label:e,type:a,key:t,dir:o,goTo:l,boundaries:v,cls:r}){return[u("div",{class:"row items-center q-date__arrow"},[u(k,{round:!0,dense:!0,size:"sm",flat:!0,icon:ae.value[0],tabindex:m.value,disable:v.prev===!1,...b("go-#"+a,{onClick(){l(-1)}})})]),u("div",{class:"relative-position overflow-hidden flex flex-center"+r},[u(U,{name:"q-transition--jump-"+o},()=>u("div",{key:t},[u(k,{flat:!0,dense:!0,noCaps:!0,label:e,tabindex:m.value,...b("view#"+a,{onClick:()=>{_.value=a}})})]))]),u("div",{class:"row items-center q-date__arrow"},[u(k,{round:!0,dense:!0,size:"sm",flat:!0,icon:ae.value[1],tabindex:m.value,disable:v.next===!1,...b("go+#"+a,{onClick(){l(1)}})})])]}const ta={Calendar:()=>[u("div",{key:"calendar-view",class:"q-date__view q-date__calendar"},[u("div",{class:"q-date__navigation row items-center no-wrap"},ye({label:f.value.months[i.value.month-1],type:"Months",key:i.value.month,dir:X.value,goTo:Ye,boundaries:de.value.month,cls:" col"}).concat(ye({label:i.value.year,type:"Years",key:i.value.year,dir:re.value,goTo:fe,boundaries:de.value.year,cls:""}))),u("div",{class:"q-date__calendar-weekdays row items-center no-wrap"},We.value.map(e=>u("div",{class:"q-date__calendar-item"},[u("div",e)]))),u("div",{class:"q-date__calendar-days-container relative-position overflow-hidden"},[u(U,{name:"q-transition--slide-"+X.value},()=>u("div",{key:D.value,class:"q-date__calendar-days fit"},Me.value.map(e=>u("div",{class:e.classes},[e.in===!0?u(k,{class:e.today===!0?"q-date__today":"",dense:!0,flat:e.flat,unelevated:e.unelevated,color:e.color,textColor:e.textColor,label:e.i,tabindex:m.value,...b("day#"+e.i,{onClick:()=>{na(e.i)},onMouseover:()=>{la(e.i)}})},e.event!==!1?()=>u("div",{class:"q-date__event bg-"+e.event}):null):u("div",""+e.i)]))))])])],Months(){const e=i.value.year===M.value.year,a=o=>y.value!==null&&i.value.year===y.value.year&&y.value.month>o||g.value!==null&&i.value.year===g.value.year&&g.value.month<o,t=f.value.monthsShort.map((o,l)=>{const v=i.value.month===l+1;return u("div",{class:"q-date__months-item flex flex-center"},[u(k,{class:e===!0&&M.value.month===l+1?"q-date__today":null,flat:v!==!0,label:o,unelevated:v,color:v===!0?O.value:null,textColor:v===!0?E.value:null,tabindex:m.value,disable:a(l+1),...b("month#"+l,{onClick:()=>{pe(l+1)}})})])});return n.yearsInMonthView===!0&&t.unshift(u("div",{class:"row no-wrap full-width"},[ye({label:i.value.year,type:"Years",key:i.value.year,dir:re.value,goTo:fe,boundaries:de.value.year,cls:" col"})])),u("div",{key:"months-view",class:"q-date__view q-date__months flex flex-center"},t)},Years(){const e=Z.value,a=e+F,t=[],o=l=>y.value!==null&&y.value.year>l||g.value!==null&&g.value.year<l;for(let l=e;l<=a;l++){const v=i.value.year===l;t.push(u("div",{class:"q-date__years-item flex flex-center"},[u(k,{key:"yr"+l,class:M.value.year===l?"q-date__today":null,flat:!v,label:l,dense:!0,unelevated:v,color:v===!0?O.value:null,textColor:v===!0?E.value:null,tabindex:m.value,disable:o(l),...b("yr#"+l,{onClick:()=>{Ze(l)}})})]))}return u("div",{class:"q-date__view q-date__years flex flex-center"},[u("div",{class:"col-auto"},[u(k,{round:!0,dense:!0,flat:!0,icon:ae.value[0],tabindex:m.value,disable:o(e),...b("y-",{onClick:()=>{Z.value-=F}})})]),u("div",{class:"q-date__years-content col self-stretch row items-center"},t),u("div",{class:"col-auto"},[u(k,{round:!0,dense:!0,flat:!0,icon:ae.value[1],tabindex:m.value,disable:o(a),...b("y+",{onClick:()=>{Z.value+=F}})})])])}};function na(e){const a={...i.value,day:e};if(n.range===!1){ea(a,D.value);return}if(h.value===null){const t=Me.value.find(l=>l.fill!==!0&&l.i===e);if(n.noUnset!==!0&&t.range!==void 0){he({target:a,from:t.range.from,to:t.range.to});return}if(t.selected===!0){he(a);return}const o=V(a);h.value={init:a,initHash:o,final:a,finalHash:o},x("rangeStart",T(a))}else{const t=h.value.initHash,o=V(a),l=t<=o?{from:h.value.init,to:a}:{from:a,to:h.value.init};h.value=null,me(t===o?a:{target:a,...l}),x("rangeEnd",{from:T(l.from),to:T(l.to)})}}function la(e){if(h.value!==null){const a={...i.value,day:e};Object.assign(h.value,{final:a,finalHash:V(a)})}}return Object.assign(W,{setToday:Ce,setView:Ke,offsetCalendar:Ge,setCalendarTo:ve,setEditingRange:Xe}),()=>{const e=[u("div",{class:"q-date__content col relative-position"},[u(U,{name:"q-transition--fade"},ta[_.value])])],a=ra(K.default);return a!==void 0&&e.push(u("div",{class:"q-date__actions"},a)),n.name!==void 0&&n.disable!==!0&&$e(e,"push"),u("div",{class:Re.value,...Ue.value},[aa(),u("div",{ref:oe,class:"q-date__main col column",tabindex:-1},e)])}}});export{Sa as Q};
