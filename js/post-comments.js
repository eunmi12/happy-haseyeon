function avatarColor(name) {
  const colors = ['#03c75a', '#5c6bc0', '#ef5350', '#26a69a', '#ab47bc', '#ffa726'];
  let h = 0;
  for (let i = 0; i < (name || '').length; i++) h = (h + name.charCodeAt(i)) % colors.length;
  return colors[h];
}

function commentItemHtml(c, { isReply = false } = {}) {
  const initial = (c.author || '?').charAt(0);
  const avatar = c.profile_image
    ? `<img class="c-avatar c-avatar--img" src="${escapeHtml(c.profile_image)}" alt="" />`
    : `<div class="c-avatar" style="background:${avatarColor(c.author)}">${escapeHtml(initial)}</div>`;
  return `
    <div class="comment${isReply ? ' comment--reply' : ''}" data-comment-id="${c.id || ''}">
      ${avatar}
      <div class="c-body">
        <div>
          <span class="c-author">${escapeHtml(c.author)}</span>
          <span class="c-date">${escapeHtml(c.created_at || '')}</span>
        </div>
        <div class="c-text">${escapeHtml(c.content)}</div>
        <div class="c-react" aria-label="추천 비추천">
          <span class="c-react__item c-react__item--up">추천 <em>${Number(c.likes || 0).toLocaleString()}</em></span>
          <span class="c-react__item c-react__item--down">비추천 <em>${Number(c.dislikes || 0).toLocaleString()}</em></span>
        </div>
        ${isReply ? '' : '<div class="comment-replies"></div>'}
      </div>
    </div>`;
}

function updateCommentCounts(n) {
  const head = document.querySelector('.comment-section .head em');
  if (head) head.textContent = String(n);
}

/** 공개 페이지: 댓글·대댓글 작성 UI 비활성 (관리자 화면에서만 작성) */
function bindPostComments(postId, opts = {}) {
  const box = document.getElementById('commentCompose');
  if (!box) return;
  box.hidden = true;
  box.innerHTML = '';
  // 기존 SSR에 남아 있을 수 있는 답글 버튼 제거
  document.querySelectorAll('.c-reply-btn').forEach((el) => el.remove());
}

if (typeof window !== 'undefined') {
  window.bindPostComments = bindPostComments;
  window.commentItemHtml = commentItemHtml;
  window.updateCommentCounts = updateCommentCounts;
}
