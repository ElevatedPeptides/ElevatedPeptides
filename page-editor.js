/* ══════════════════ EP PAGE EDITOR ══════════════════
   Floating admin edit mode for every page.
   Mark elements with:
     data-ep-text="unique-key"   → click-to-edit inline
     data-ep-img="unique-key"    → click to upload replacement image
   Password shared with shop/COA admin: Bo$$vibes!
══════════════════════════════════════════════════════ */
(function(){
  const PW        = 'Bo$$vibes!';
  const SESSION   = 'umf_admin_edit';
  const PREFIX    = 'ep_edit_';
  let   editMode  = false;
  let   overlays  = [];

  /* ── Load saved content on every page load ── */
  function loadSaved(){
    document.querySelectorAll('[data-ep-text]').forEach(el=>{
      const v=localStorage.getItem(PREFIX+'txt_'+el.dataset.epText);
      if(v) el.innerHTML=v;
    });
    document.querySelectorAll('[data-ep-img]').forEach(el=>{
      const v=localStorage.getItem(PREFIX+'img_'+el.dataset.epImg);
      if(v) el.src=v;
    });
  }

  /* ── Build all editor UI ── */
  function buildUI(){
    injectCSS();

    /* Gear button */
    const gear=document.createElement('button');
    gear.id='epGearBtn';
    gear.innerHTML='🧬';
    gear.title='Admin Edit Mode';
    gear.addEventListener('click',handleGear);
    document.body.appendChild(gear);

    /* Password modal */
    const pwOv=document.createElement('div');
    pwOv.id='epPwOv';
    pwOv.innerHTML=`
      <div class="ep-modal">
        <div class="ep-modal-icon">🔐</div>
        <h3>ADMIN EDIT MODE</h3>
        <p>Enter password to unlock page editing.</p>
        <input type="password" id="epPwInput" placeholder="Password" autocomplete="off"/>
        <div id="epPwErr" class="ep-pw-err"></div>
        <div class="ep-modal-btns">
          <button onclick="document.getElementById('epPwOv').classList.remove('on')">Cancel</button>
          <button class="ep-primary" onclick="epCheckPw()">🔓 Unlock</button>
        </div>
      </div>`;
    pwOv.addEventListener('click',e=>{ if(e.target===pwOv) pwOv.classList.remove('on'); });
    document.body.appendChild(pwOv);

    /* Edit toolbar */
    const bar=document.createElement('div');
    bar.id='epEditBar';
    bar.innerHTML=`
      <span class="ep-bar-label">✏️ EDIT MODE — click text or images to edit</span>
      <div class="ep-bar-btns">
        <button onclick="epSaveAll()" class="ep-save-btn">💾 Save All</button>
        <button onclick="epExitEdit()" class="ep-exit-btn">✕ Exit</button>
      </div>`;
    document.body.appendChild(bar);

    /* Hidden file input for image uploads */
    const fi=document.createElement('input');
    fi.type='file'; fi.accept='image/*'; fi.id='epFileInput';
    fi.style.display='none';
    document.body.appendChild(fi);

    /* Keyboard shortcut */
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&editMode) epExitEdit(); });

    /* Password enter key */
    document.addEventListener('keydown',e=>{
      if(e.key==='Enter'&&document.getElementById('epPwOv').classList.contains('on')) epCheckPw();
    });
  }

  /* ── Gear click ── */
  function revealAdminSections(){
    const guide=document.getElementById('ep-coa-guide');
    if(guide) guide.style.display='';
  }

  function handleGear(){
    const active=sessionStorage.getItem(SESSION)==='1'||sessionStorage.getItem('umf_shop_admin_unlocked')==='1';
    if(active){ revealAdminSections(); enterEdit(); return; }
    const ov=document.getElementById('epPwOv');
    document.getElementById('epPwInput').value='';
    document.getElementById('epPwErr').textContent='';
    ov.classList.add('on');
    setTimeout(()=>document.getElementById('epPwInput').focus(),120);
  }

  /* ── Password check ── */
  window.epCheckPw=function(){
    const val=document.getElementById('epPwInput').value;
    if(val===PW){
      sessionStorage.setItem(SESSION,'1');
      sessionStorage.setItem('umf_shop_admin_unlocked','1');
      document.getElementById('epPwOv').classList.remove('on');
      revealAdminSections();
      enterEdit();
    } else {
      const err=document.getElementById('epPwErr');
      err.textContent='❌ Wrong password.';
      document.getElementById('epPwInput').select();
    }
  };

  /* ── Enter edit mode ── */
  function enterEdit(){
    editMode=true;
    document.getElementById('epEditBar').classList.add('on');
    document.getElementById('epGearBtn').classList.add('active');

    /* Make text elements editable */
    document.querySelectorAll('[data-ep-text]').forEach(el=>{
      el.contentEditable='true';
      el.classList.add('ep-editable-text');
      el.dataset.epOrig=el.innerHTML;
    });

    /* Add upload overlays on image elements */
    document.querySelectorAll('[data-ep-img]').forEach(el=>{
      const wrap=el.parentElement;
      const ov=document.createElement('div');
      ov.className='ep-img-ov';
      ov.innerHTML='<span>📁<br>Upload<br>Image</span>';
      ov.addEventListener('click',()=>triggerImgUpload(el));
      /* Position overlay relative to image */
      const rect=el.getBoundingClientRect();
      ov.style.cssText=`position:absolute;inset:0;`;
      if(getComputedStyle(wrap).position==='static') wrap.style.position='relative';
      wrap.appendChild(ov);
      overlays.push({ov,wrap,el});
    });
  }

  /* ── Image upload ── */
  function triggerImgUpload(imgEl){
    const fi=document.getElementById('epFileInput');
    fi.onchange=function(){
      if(!fi.files||!fi.files[0]) return;
      const reader=new FileReader();
      reader.onload=function(e){
        const dataUrl=e.target.result;
        imgEl.src=dataUrl;
        localStorage.setItem(PREFIX+'img_'+imgEl.dataset.epImg, dataUrl);
        showToast('✅ Image saved!');
      };
      reader.readAsDataURL(fi.files[0]);
      fi.value='';
    };
    fi.click();
  }

  /* ── Save all text ── */
  window.epSaveAll=function(){
    document.querySelectorAll('[data-ep-text]').forEach(el=>{
      localStorage.setItem(PREFIX+'txt_'+el.dataset.epText, el.innerHTML);
    });
    showToast('✅ All changes saved!');
  };

  /* ── Exit edit mode ── */
  window.epExitEdit=function(){
    editMode=false;
    document.getElementById('epEditBar').classList.remove('on');
    document.getElementById('epGearBtn').classList.remove('active');

    document.querySelectorAll('[data-ep-text]').forEach(el=>{
      el.contentEditable='false';
      el.classList.remove('ep-editable-text');
    });

    overlays.forEach(({ov,wrap})=>{ wrap.removeChild(ov); });
    overlays=[];
  };

  /* ── Toast notification ── */
  function showToast(msg){
    let t=document.getElementById('epToast');
    if(!t){ t=document.createElement('div'); t.id='epToast'; document.body.appendChild(t); }
    t.textContent=msg;
    t.classList.add('on');
    clearTimeout(t._tid);
    t._tid=setTimeout(()=>t.classList.remove('on'),2400);
  }

  /* ── Inject CSS ── */
  function injectCSS(){
    const s=document.createElement('style');
    s.textContent=`
/* ── EP EDITOR STYLES ── */
#epGearBtn{
  position:fixed;bottom:22px;right:22px;z-index:9000;
  width:44px;height:44px;border-radius:50%;border:2px solid rgba(0,229,204,.4);
  background:rgba(4,12,12,.88);color:#4a7070;font-size:20px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .25s;backdrop-filter:blur(8px);
  box-shadow:0 2px 16px rgba(0,0,0,.5);
}
#epGearBtn:hover{color:#00e5cc;border-color:#00e5cc;box-shadow:0 0 18px rgba(0,229,204,.4);}
#epGearBtn.active{color:#00e5cc;border-color:#00e5cc;background:rgba(0,229,204,.12);
  box-shadow:0 0 24px rgba(0,229,204,.55);animation:epGearSpin .6s ease;}
@keyframes epGearSpin{from{transform:rotate(0deg)}to{transform:rotate(180deg)}}

#epPwOv{
  position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:9100;
  display:none;align-items:center;justify-content:center;padding:20px;
}
#epPwOv.on{display:flex;}
.ep-modal{
  background:#0a1818;border:1.5px solid rgba(0,229,204,.4);border-radius:18px;
  padding:36px 32px;max-width:380px;width:100%;text-align:center;
  box-shadow:0 0 60px rgba(0,229,204,.18);
}
.ep-modal-icon{font-size:36px;margin-bottom:10px;}
.ep-modal h3{font-family:'Rajdhani',sans-serif;font-size:22px;font-weight:700;
  color:#00e5cc;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px;}
.ep-modal p{font-size:13px;color:#4a7070;margin-bottom:18px;}
.ep-modal input{
  width:100%;padding:11px 14px;background:rgba(0,0,0,.4);
  border:1.5px solid rgba(0,229,204,.3);border-radius:10px;
  color:#d0f0ec;font-size:15px;outline:none;margin-bottom:8px;
  font-family:'Inter',sans-serif;
}
.ep-modal input:focus{border-color:#00e5cc;}
.ep-pw-err{font-size:12.5px;color:#ff6b6b;min-height:18px;margin-bottom:10px;}
.ep-modal-btns{display:flex;gap:10px;margin-top:4px;}
.ep-modal-btns button{
  flex:1;padding:10px;border-radius:10px;font-family:'Montserrat',sans-serif;
  font-weight:700;font-size:13px;cursor:pointer;border:1.5px solid rgba(0,229,204,.3);
  background:rgba(0,229,204,.07);color:#d0f0ec;transition:all .2s;
}
.ep-modal-btns button:hover{border-color:#00e5cc;}
.ep-modal-btns .ep-primary{
  background:linear-gradient(90deg,#007a6a,#00e5cc);color:#000;border:none;
}
.ep-modal-btns .ep-primary:hover{opacity:.88;}

#epEditBar{
  position:fixed;top:0;left:0;right:0;z-index:8900;
  background:linear-gradient(90deg,rgba(0,60,50,.97),rgba(0,40,36,.97));
  border-bottom:2px solid #00e5cc;padding:10px 20px;
  display:none;align-items:center;justify-content:space-between;
  gap:12px;backdrop-filter:blur(10px);
  box-shadow:0 2px 30px rgba(0,229,204,.3);
}
#epEditBar.on{display:flex;}
.ep-bar-label{
  font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:700;
  color:#00e5cc;letter-spacing:.08em;text-transform:uppercase;flex:1;
}
.ep-bar-btns{display:flex;gap:8px;}
.ep-save-btn,.ep-exit-btn{
  padding:7px 18px;border-radius:8px;font-family:'Montserrat',sans-serif;
  font-weight:700;font-size:13px;cursor:pointer;transition:all .2s;
}
.ep-save-btn{background:linear-gradient(90deg,#007a6a,#00e5cc);color:#000;border:none;}
.ep-save-btn:hover{opacity:.85;}
.ep-exit-btn{background:transparent;border:1.5px solid rgba(0,229,204,.4);color:#d0f0ec;}
.ep-exit-btn:hover{border-color:#00e5cc;color:#00e5cc;}

.ep-editable-text{
  outline:2px dashed rgba(0,229,204,.6)!important;
  border-radius:4px;cursor:text;min-height:1em;
  transition:outline .2s;
}
.ep-editable-text:hover{outline-color:#00e5cc!important;}
.ep-editable-text:focus{outline:2px solid #00e5cc!important;background:rgba(0,229,204,.04);}

.ep-img-ov{
  position:absolute;inset:0;z-index:10;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  background:rgba(0,0,0,.55);
  transition:background .2s;clip-path:inherit;
}
.ep-img-ov:hover{background:rgba(0,229,204,.25);}
.ep-img-ov span{
  font-family:'Montserrat',sans-serif;font-size:13px;font-weight:700;
  color:#00e5cc;text-align:center;text-shadow:0 1px 8px rgba(0,0,0,.8);
  pointer-events:none;letter-spacing:.05em;
}

#epToast{
  position:fixed;bottom:80px;right:22px;z-index:9500;
  background:rgba(0,40,36,.95);border:1.5px solid #00e5cc;border-radius:10px;
  padding:10px 18px;color:#00e5cc;font-family:'Montserrat',sans-serif;
  font-weight:700;font-size:13px;letter-spacing:.04em;
  opacity:0;transform:translateY(10px);transition:all .3s;
  pointer-events:none;box-shadow:0 0 20px rgba(0,229,204,.3);
}
#epToast.on{opacity:1;transform:translateY(0);}

body.ep-edit-on{padding-top:46px!important;}
    `;
    document.head.appendChild(s);
  }

  /* ── Init ── */
  function init(){
    loadSaved();
    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded',buildUI);
    } else {
      buildUI();
    }
  }

  init();
})();
