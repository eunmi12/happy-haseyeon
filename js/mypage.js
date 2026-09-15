function showMsg(text, ok = true) {
  const el = document.getElementById('msg');
  el.textContent = text;
  el.className = 'msg show ' + (ok ? 'ok' : 'err');
}

function renderAvatar(url, nickname) {
  const el = document.getElementById('avatarPreview');
  if (url) {
    const src = url.startsWith('http') || url.startsWith('data:') ? url : apiUrl(url);
    el.innerHTML = `<img src="${escapeHtml(src)}" alt="" />`;
  } else {
    el.textContent = (nickname || '?').charAt(0);
  }
}

async function memberFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set('X-Member-Token', getMemberToken());
  if (options.json) {
    headers.set('Content-Type', 'application/json');
    options.body = JSON.stringify(options.json);
  }
  const res = await fetch(apiUrl(path), { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    clearMemberSession();
    location.href = '/login';
    throw new Error('unauthorized');
  }
  if (!res.ok) throw new Error(data.error || '요청 실패');
  return data;
}

async function loadMe() {
  if (!getMemberToken()) {
    location.href = '/login';
    return;
  }
  const { member } = await memberFetch('/api/members');
  setMemberSession(getMemberToken(), member);
  document.getElementById('usernameLabel').textContent =
    '@' + member.username + ' · 프로필 수정';
  document.getElementById('nickname').value = member.nickname || '';
  document.getElementById('profile_image').value = member.profile_image || '';
  renderAvatar(member.profile_image, member.nickname);
}

document.getElementById('btnLogout').onclick = () => {
  clearMemberSession();
  location.href = '/';
};

document.getElementById('btnUpload').onclick = async () => {
  const file = document.getElementById('profileFile').files[0];
  if (!file) return showMsg('파일을 선택하세요.', false);
  const fd = new FormData();
  fd.append('file', file);
  try {
    const res = await fetch(apiUrl('/api/upload'), {
      method: 'POST',
      headers: { 'X-Member-Token': getMemberToken() },
      body: fd,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '업로드 실패');
    document.getElementById('profile_image').value = data.url;
    renderAvatar(data.url, document.getElementById('nickname').value);
    showMsg('업로드 완료. 저장을 눌러주세요.');
  } catch (e) {
    showMsg(e.message, false);
  }
};

document.getElementById('profileForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    nickname: document.getElementById('nickname').value.trim(),
    profile_image: document.getElementById('profile_image').value.trim(),
  };
  const pw = document.getElementById('password').value;
  if (pw) payload.password = pw;
  try {
    const data = await memberFetch('/api/members', { method: 'PUT', json: payload });
    setMemberSession(getMemberToken(), data.member);
    renderAvatar(data.member.profile_image, data.member.nickname);
    document.getElementById('password').value = '';
    showMsg('저장되었습니다.');
  } catch (err) {
    if (err.message !== 'unauthorized') showMsg(err.message, false);
  }
});

loadMe().catch(() => {
  location.href = '/login';
});
