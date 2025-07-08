// Simüle edilmiş bir veritabanı
const mockDatabase = {};

function shareText() {
    const textInput = document.getElementById('textInput').value;
    const visibility = document.querySelector('input[name="visibility"]:checked').value;
    const passwordInput = document.getElementById('passwordInput').value;
    const shareLinkDiv = document.getElementById('shareLink');

    if (textInput.trim() === '') {
        alert('Lütfen paylaşmak için bir metin girin.');
        return;
    }

    if (visibility === 'private' && passwordInput.trim() === '') {
        alert('Özel paylaşım için bir şifre girin.');
        return;
    }

    // Rastgele bir ID oluştur
    const uniqueId = Math.random().toString(36).substring(2, 10);

    // Veriyi mock veritabanına kaydet
    mockDatabase[uniqueId] = {
        text: textInput,
        visibility: visibility,
        password: visibility === 'private' ? passwordInput : null
    };

    // Paylaşım bağlantısı oluştur
    const shareUrl = `${window.location.origin}/view.html?id=${uniqueId}`;
    shareLinkDiv.innerHTML = `Paylaşım bağlantınız: <a href="${shareUrl}" target="_blank">${shareUrl}</a>`;
    shareLinkDiv.classList.remove('hidden');
}

// Şifre alanını göster/gizle
document.querySelectorAll('input[name="visibility"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const passwordInput = document.getElementById('passwordInput');
        if (radio.value === 'private') {
            passwordInput.classList.remove('hidden');
        } else {
            passwordInput.classList.add('hidden');
            passwordInput.value = '';
        }
    });
});