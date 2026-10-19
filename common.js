function navBar(cur){
  const P=[['a','A 书脊架'],['b','B 满版'],['c','C 滚动叠堆'],['d','D 木纹架'],['e','E 分类层板'],['g','G 细木层板']];
  document.body.insertAdjacentHTML('afterbegin','<nav class="nav">'+
    P.map(([k,t])=>`<a href="${k}.html" class="${k===cur?'on':''}">${t}</a>`).join('')+'</nav>');
}
function mountDialog(){
  document.body.insertAdjacentHTML('beforeend',`<dialog id="dlg">
    <button class="x" onclick="dlg.close()">&times;</button>
    <div class="detail"><img id="dImg" alt=""><div class="meta">
      <div class="y" id="dYear"></div><div id="dTitle" style="letter-spacing:.14em;opacity:.8"></div>
      <p id="dInfo"></p><div class="act" id="dAct"></div>
      <div class="note">内页翻阅由 AnyFlip 托管、官网只放外链（同影片走 YouTube 的做法）。
      尚未上传，因此按钮是占位。哪几期可公开需先经审阅。</div>
    </div></div></dialog>`);
}
function openItem(i){
  const it=ITEMS[i];
  dImg.src=it.img; dYear.textContent=it.year; dTitle.textContent=it.title;
  dInfo.textContent = it.spread ? '扫描件为跨页（含封底），封面待再裁一次。' : '封面扫描件，已裁边转正。';
  dAct.innerHTML = it.url ? `<a class="p" href="${it.url}" target="_blank" rel="noopener">翻阅全刊 ↗</a>`
                          : `<button class="p off" disabled>翻阅全刊（待上传 AnyFlip）</button>`;
  dlg.showModal();
}
