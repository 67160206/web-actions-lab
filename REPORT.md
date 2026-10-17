# รายงาน Web Development Lab: GitHub Actions + GitHub Pages

## วัตถุประสงค์
1. เข้าใจความแตกต่างระหว่าง Git, GitHub, GitHub Actions และ GitHub Pages
2. ใช้ Git ส่ง Source Code ไปยัง GitHub Repository
3. สร้าง Workflow สำหรับ Deploy เว็บไซต์อัตโนมัติ
4. เผยแพร่เว็บไซต์ Static ที่แยกหน้า Home, About, Skills และ Contact

## โครงสร้างโปรเจกต์
- `index.html` หน้า Home
- `about.html` หน้า About Me
- `skills.html` หน้า Skills
- `contact.html` หน้า Contact พร้อมแบบฟอร์มตัวอย่าง
- `style.css` รูปแบบและ Responsive Layout
- `script.js` เปลี่ยนธีมและตรวจสอบการส่งแบบฟอร์มตัวอย่าง
- `.github/workflows/deploy.yml` ตรวจสอบไฟล์และ Deploy ผ่าน GitHub Pages

## Part A: สร้าง Repository และเว็บไซต์
สร้าง Repository ชื่อ `webdev-actions-lab` และสร้างไฟล์ตามโครงสร้างข้างต้น จากนั้นเชื่อม Remote Repository และส่งไฟล์ด้วย Git

```bash
git init
git branch -M main
git add .
git commit -m "Create multi-page portfolio website"
git remote add origin https://github.com/YOUR_USERNAME/webdev-actions-lab.git
git push -u origin main
```

หาก Repository มีอยู่แล้ว ให้ Clone Repository ก่อน แล้วนำไฟล์ไปใส่ในโฟลเดอร์ที่ Clone มา

## Part B: GitHub Actions Workflow
Workflow ใน `.github/workflows/deploy.yml` ทำงานเมื่อมีการ Push ไปยัง `main` หรือสั่งด้วย `workflow_dispatch` โดยตรวจสอบว่ามีไฟล์ HTML ทั้ง 4 หน้า จากนั้นตั้งค่า Pages อัปโหลด Artifact และ Deploy

## Part C: เปิด GitHub Pages
1. เปิด Repository → Settings → Pages
2. เลือก Source เป็น GitHub Actions
3. เปิดแท็บ Actions แล้วรอ Workflow ให้สำเร็จ
4. เว็บไซต์จะอยู่ที่ `https://YOUR_USERNAME.github.io/webdev-actions-lab/`

## Part D: ทดสอบ Continuous Deployment
แก้ไขไฟล์ใดก็ได้ แล้วใช้คำสั่ง

```bash
git add .
git commit -m "Update portfolio website"
git push origin main
```

เมื่อ Push แล้ว GitHub Actions จะ Deploy เวอร์ชันใหม่โดยอัตโนมัติ

## แบบฝึกหัด
### Exercise 1: ปรับชื่อและรหัสนักศึกษา
หน้า About แสดงชื่อ กิตติทัศน์ แก้วใส และรหัสนักศึกษา 67160206 ให้ตรวจสอบและแก้ไขข้อมูลให้ตรงกับผู้ส่งงานก่อนเผยแพร่

### Exercise 2: ออกแบบหน้าเว็บอย่างน้อย 3 ส่วน
เว็บไซต์แยกเป็นหน้า About, Skills และ Contact โดยมีเมนูนำทางเชื่อมถึงกันทุกหน้า

### Exercise 3: เพิ่ม JavaScript
ปุ่มเปลี่ยนธีมจะสลับ Light/Dark Theme ส่วนแบบฟอร์ม Contact จะแสดงข้อความตอบกลับตัวอย่าง ทั้งสองเป็นการทำงานฝั่ง Browser โดยแบบฟอร์มยังไม่ส่งข้อมูลไปยังเซิร์ฟเวอร์

### Exercise 4: อธิบาย Workflow
Workflow เริ่มเมื่อมีการ Push ไปยัง Branch `main` หรือผู้ใช้สั่งทำงานเองผ่าน `workflow_dispatch` ส่วน Job `deploy` จะ Checkout Source Code ตรวจสอบไฟล์ HTML ตั้งค่า GitHub Pages อัปโหลดเว็บไซต์เป็น Artifact และ Deploy ไปยัง GitHub Pages

### Challenge: ตรวจสอบไฟล์ก่อน Deploy
ใช้คำสั่ง `test -f index.html`, `test -f about.html`, `test -f skills.html` และ `test -f contact.html` หากไฟล์ใดไม่มีอยู่ ขั้นตอนตรวจสอบจะล้มเหลวและหยุดก่อน Deploy

## คำถามท้ายแลป
1. **GitHub Actions แตกต่างจาก GitHub Pages อย่างไร?**  
   GitHub Actions ใช้ทำงานอัตโนมัติ เช่น ตรวจสอบไฟล์และ Deploy ส่วน GitHub Pages เป็นบริการโฮสต์เว็บไซต์ Static ให้เข้าถึงผ่าน URL

2. **เหตุใดจึงเลือก Trigger ด้วย Push ที่ Branch Main?**  
   เพื่อให้ Workflow ทำงานเมื่อมีการส่งการเปลี่ยนแปลงไปยัง Branch หลัก และช่วยเผยแพร่เวอร์ชันล่าสุดโดยอัตโนมัติ

3. **ถ้าแก้ไฟล์ในเครื่องแต่ไม่ได้ Push เว็บไซต์จะเปลี่ยนหรือไม่ เพราะเหตุใด?**  
   ไม่เปลี่ยน เพราะ GitHub ยังไม่ได้รับไฟล์ที่แก้ไข และ Workflow ไม่ได้เริ่ม Deploy จากการเปลี่ยนแปลงนั้น

4. **เหตุใด PHP + MySQL จึงไม่สามารถรันบน GitHub Pages ได้โดยตรง?**  
   GitHub Pages รองรับ Static Site ไม่สามารถประมวลผล PHP ฝั่ง Server หรือให้บริการฐานข้อมูล MySQL ได้โดยตรง

5. **อธิบายขั้นตอนการค้นหาสาเหตุเมื่อ Workflow Failed**  
   เปิด Repository → Actions → เลือก Workflow ที่ล้มเหลว → เปิด Job และอ่าน Logs ตรวจสอบ YAML, ตำแหน่งไฟล์, Permissions และ Settings → แก้ไขแล้ว Commit/Push ใหม่

## Troubleshooting
- **404 Not Found:** รอ Deploy ให้เสร็จ ตรวจ URL และตรวจว่ามี `index.html`
- **Workflow ไม่ทำงาน:** ตรวจตำแหน่ง `.github/workflows/deploy.yml`, Branch `main` และแท็บ Actions
- **Permission / Deploy Error:** ตรวจ Settings → Pages ให้เลือก GitHub Actions และตรวจ Permissions ใน YAML
- **CSS/JS ไม่โหลด:** ใช้ relative paths เช่น `style.css` และ `script.js`
- **เว็บไม่อัปเดต:** ตรวจ Commit ล่าสุดและ Actions Logs แล้ว Hard Refresh
- **YAML invalid:** ตรวจการเยื้องด้วย Spaces และรูปแบบ `on`, `jobs`, `steps`

## หลักฐานที่ต้องแนบก่อนส่ง
- GitHub Repository URL
- GitHub Pages URL
- Screenshot แท็บ Actions ที่ Deploy สำเร็จ
- Screenshot หน้าเว็บไซต์ที่ปรับแต่งแล้ว
- คำตอบคำถามท้ายแลป

## เอกสารอ้างอิง
- https://docs.github.com/en/actions
- https://docs.github.com/en/pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/get-started/start-your-journey/deploying-your-website-automatically
