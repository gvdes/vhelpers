function r(t){setTimeout(()=>{window.URL.revokeObjectURL(t.href)},1e4),t.remove()}function u(t,o,n={}){const{mimeType:a,byteOrderMark:d,encoding:i}=typeof n=="string"?{mimeType:n}:n,c=i!==void 0?new TextEncoder(i).encode([o]):o,l=d!==void 0?[d,c]:[c],s=new Blob(l,{type:a||"application/octet-stream"}),e=document.createElement("a");e.href=window.URL.createObjectURL(s),e.setAttribute("download",t),typeof e.download=="undefined"&&e.setAttribute("target","_blank"),e.classList.add("hidden"),e.style.position="fixed",document.body.appendChild(e);try{return e.click(),r(e),!0}catch(b){return r(e),b}}export{u as e};