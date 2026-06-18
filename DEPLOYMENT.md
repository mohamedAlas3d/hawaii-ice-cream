# 🚀 دليل النشر والاستضافة

## الاستضافة على Heroku (مجاني)

### الخطوات:

1. **إنشاء حساب Heroku**
   - اذهب إلى: https://www.heroku.com
   - سجل حساب جديد

2. **تثبيت Heroku CLI**
   ```bash
   # Windows
   https://cli-assets.heroku.com/heroku-x64.exe
   
   # Mac
   brew tap heroku/brew && brew install heroku
   
   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

3. **تسجيل الدخول**
   ```bash
   heroku login
   ```

4. **إنشاء تطبيق**
   ```bash
   heroku create hawaii-ice-cream
   ```

5. **نشر المشروع**
   ```bash
   git push heroku main
   ```

6. **فتح الموقع**
   ```bash
   heroku open
   ```

---

## الاستضافة على Vercel (مجاني)

### الخطوات:

1. **اذهب إلى:** https://vercel.com
2. **اختر:** Import from Git
3. **اختر المستودع:** mohamedAlas3d/hawaii-ice-cream
4. **انقر:** Deploy

---

## الاستضابة على AWS (مدفوع)

### باستخدام EC2:

1. **إنشاء instance على AWS**
2. **تثبيت Node.js**
3. **استنساخ المستودع**
4. **تثبيت المتعلقات**
5. **تشغيل الخادم**

---

## الاستضافة المحلية (للاختبار)

```bash
npm install
npm start
```

سيتم تشغيل الموقع على: `http://localhost:3000`

---

## متغيرات البيئة المطلوبة

أضف هذه المتغيرات في لوحة تحكم الاستضافة:

```
PORT=3000
NODE_ENV=production
WHATSAPP_PHONE=963956492267
```

---

## نصائح الأمان

- ✅ استخدم HTTPS دائماً
- ✅ خفي رقم الواتساب الحقيقي في .env
- ✅ فعّل CORS بشكل صحيح
- ✅ احم قاعدة البيانات

---

## الدومين المخصص

1. اشتري دومين من:
   - Namecheap
   - GoDaddy
   - Google Domains

2. أضف DNS Records:
   - سجل A يشير إلى IP الخادم
   - سجل CNAME للـ subdomain

3. فعّل HTTPS باستخدام Let's Encrypt (مجاني)

---

## النسخ الاحتياطية

قم بأخذ نسخة احتياطية من:
- ملفات البيانات (data/products.json, data/addons.json)
- قاعدة البيانات (إن وجدت)

---

## المراقبة والصيانة

استخدم أدوات مثل:
- New Relic
- Datadog
- PM2 (للتشغيل المستمر محلياً)

```bash
npm install -g pm2
pm2 start server.js
pm2 logs
```

---

## حل المشاكل الشائعة

### الموقع لا يفتح
- تحقق من PORT في .env
- تأكد من تشغيل الخادم

### الواتساب لا يعمل
- تحقق من رقم الهاتف في app.js
- تأكد من أن الرقم صحيح (+963...)

### البيانات لا تُحفظ
- تحقق من وجود مجلد data/
- تأكد من صلاحيات الكتابة

### الموقع بطيء
- احسّن الصور
- استخدم CDN لخدمة الأصول
- فعّل caching

---

## الترقيات المستقبلية

بعد النشر يمكنك الترقية إلى:
- قاعدة بيانات حقيقية (MongoDB, PostgreSQL)
- نظام دفع متكامل (Stripe)
- نظام إدارة متقدم
- تطبيق موبايل

