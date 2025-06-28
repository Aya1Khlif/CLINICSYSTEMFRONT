FROM node:20-alpine

# تعيين مجلد العمل
WORKDIR /app

# نسخ ملفات الـ package.json والـ package-lock.json (إن وجد)
COPY package*.json ./

# تنظيف الكاش وتحميل الباكجات
RUN npm cache clean --force
RUN npm install --verbose

# نسخ باقي ملفات المشروع
COPY . .

# فتح البورت الخاص بـ Vite
EXPOSE 5174

# تشغيل الأمر الرئيسي
CMD ["npm", "run", "dev"]
