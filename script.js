// แสดงปีปัจจุบันใน footer
document.querySelectorAll('#year').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// ปุ่มเปลี่ยนธีม ใช้ได้ทุกหน้า
const themeBtn = document.querySelector('#themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    const status = document.querySelector('#status');
    if (status) status.textContent = isDark ? 'เปิด Dark Theme แล้ว' : 'กลับสู่ Light Theme แล้ว';
  });
}

// แบบฟอร์มติดต่อเป็นตัวอย่างฝั่งหน้าเว็บ ยังไม่ส่งข้อมูลไปยังเซิร์ฟเวอร์
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const formStatus = document.querySelector('#formStatus');
    formStatus.textContent = `ขอบคุณ ${name}! แบบฟอร์มทำงานแล้ว แต่ยังไม่ได้ส่งข้อมูลไปยังเซิร์ฟเวอร์`;
    contactForm.reset();
  });
}
