# HTML Darsligi

Ushbu darslikda HTML (HyperText Markup Language) asoslari, taglar va elementlar, shuningdek, ularning real hayotdagi misollar bilan taqqoslanishi haqida batafsil maʼlumot beriladi. Dars uchta asosiy bo'limga bo'lingan. Har bir bo'limda mavzular tizimli va tushunarli tarzda yoritiladi, shuningdek, real hayotiy misollar keltiriladi.

---

## 1-qisim: Kirish va HTML Asoslari

### Kirish

HTML — bu veb sahifalarning tuzilishini va mazmunini belgilash uchun yaratilgan markup tilidir. Internetdagi deyarli barcha sahifalar HTML asosida quriladi. Ushbu til yordamida matn, sarlavhalar, roʻyxatlar, rasmlar va havolalar kabi kontentlarni yaratish mumkin.

### Darsning Mazmuni

Ushbu bo'limda quyidagilarni o'rganamiz:

- **HTML taglari** nima ekanligi.
- **HTML elementlari** qanday ishlashi.
- Taglar va elementlar qanday qilib veb brauzerga mazmunni to'g'ri yetkazishini.
- **Void elementlar** (o'z-o'zini yopuvchi elementlar) haqida.

### HTML Taglari va Elementlari

- **Taglar:** HTML taglari — bu brauzerga qaysi qism elementning boshlanishi va tugashini bildiradigan buyruqlar. Har bir tag ikkita qismdan iborat:

  - **Ochish tagi:** Masalan, `<p>` — paragrafning boshlanishini bildiradi.
  - **Yopish tagi:** Masalan, `</p>` — paragrafning tugashini bildiradi.  
    _Misol:_

  ```html
  <p>Bu bir paragraf misolidir.</p>
  ```

- **Elementlar:** HTML elementlari taglar orasida joylashgan kontentni o'z ichiga oladi. Yuqoridagi misolda `<p>Bu bir paragraf misolidir.</p>` butun element bo'lib, unda ochish tagi, ichidagi matn va yopish tagi mavjud. Elementlarni "konteynerlar" deb tasavvur qilish mumkin, ular o'zlari ichida maʼlumotlarni saqlaydi va brauzerga bu maʼlumotlarni qanday ko‘rsatishni bildiradi.

### Semantik HTML

Toʻgʻri taglardan foydalanish — semantik HTML yaratish demakdir. Bu nafaqat sahifangizning qidiruv tizimlarida yuqori o'rinlarni egallashiga yordam beradi, balki maxsus yordam texnologiyalaridan (masalan, ekran oʻqiydigan dasturlar) foydalanayotgan foydalanuvchilar uchun ham sahifani tushunarli qiladi.

- [Darsning 1-chi qismga oid testni yechish](http://code.skillforge.uz/quiz.html?quiz=quizzes%2FAsoslar-kursi%2FHTML-Asoslari%2F4-dars-1.json)

---

## 2-qisim: Taglar, Elementlar va Void (O'z-o'zini Yopuvchi) Elementlar

### Taglar va Ularning Tashkiliy Roli

HTML sahifalarida deyarli barcha elementlar taglar bilan o'ralgan bo'ladi. Taglar quyidagi maʼnolarga ega:

- **Ochish tagi:** Elementning boshlanishini bildiradi.
- **Yopish tagi:** Elementning tugashini bildiradi.

Har bir element quyidagi shaklda yoziladi:

```html
<element>Kontent bu yerda joylashadi</element>
```

Bu yerda `<element>` — ochish tagi, `Kontent bu yerda joylashadi` — elementning ichidagi maʼlumot, `</element>` esa yopish tagidir.

### Void Elementlar

Baʼzi HTML elementlari, masalan, `<br>` (qator bo'shatish) va `<img>` (rasm qo'yish) kabi, o'z ichiga hech qanday kontent olmaydi va yopish tagiga ega emas. Bunday elementlarga **void elementlar** deyiladi. Ularning o'ziga xosligi shundaki, ular faqat bitta tagdan iborat:

```html
<br />
<img src="rasm_manzili.jpg" alt="Rasm tavsifi" />
```

Tarixiy jihatdan, baʼzi dasturchilar void elementlarni quyidagicha yozishgan:

```html
<br />
<img src="rasm_manzili.jpg" alt="Rasm tavsifi" />
```

Ammo soʻnggi HTML spetsifikatsiyasida bunday yozilish uslubi tavsiya etilmaydi.

- [Darsning 2-chi qismga oid testni yechish](http://code.skillforge.uz/quiz.html?quiz=quizzes%2FAsoslar-kursi%2FHTML-Asoslari%2F4-dars-2.json)

---

## 3-qisim: Real Hayotdagi Taqqoslash va Tushuncha

### Real Hayotdagi Misol: Sovg'ani O'rash

HTML elementlarini tushunishni osonlashtirish uchun, keling, ularni sovg'ani o'rash jarayoniga misol qilib olaylik:

1. **Sovg'a Qadoqi (Wrapping Paper):**  
   Tasavvur qiling, sizda sovg'a bor va uni chiroyli qadoqlashingiz kerak. Qadoqni boshlangan va tugagan joylarini aniq belgilash muhim, aks holda sovg'a nima uchun qadoqlanganini tushunish qiyin bo'ladi. Shu tarzda, HTML ochish tagi (`<p>`) va yopish tagi (`</p>`) sovg'a qadoqini boshlangan va tugaganini bildiradi.

2. **Quti (Box):**  
   Qadoqning ichida sovg'a qo‘yilgan quti mavjud. HTML elementlari ham xuddi shunday, ular o'zlari ichiga maʼlumot (kontent)ni oladi. Quti ichidagi sovg'a, yaʼni kontent, ochish va yopish taglari orasida joylashadi.

3. **Sovg'a Ichidagi Ob'ektlar:**  
   Sovg'ani yanada chiroyli ko‘rsatish uchun ichki elementlar, masalan, taglik, kartochkalar va boshqa aksessuarlar qoʻshiladi. HTML da esa, `<header>`, `<nav>`, `<footer>` kabi semantik taglar yordamida sahifa tarkibi yanada tartibli va mantiqiy shaklga keltiriladi.

### HTML-ni Web Dasturlashda Qoʻllash

HTML tilini toʻgʻri va semantik tarzda ishlatish veb sahifa yaratishda juda muhimdir. Toʻgʻri taglar yordamida yaratilgan sahifa:

- Qidiruv tizimlari (SEO) uchun optimallashtirilgan boʻladi.
- Maxsus yordam texnologiyalaridan foydalanuvchilar uchun qulaylik yaratadi.
- Kodni o'qish va saqlashni osonlashtiradi.

Ushbu darslikda olingan bilimlar yordamida siz veb sahifalarning tuzilishini yanada chuqurroq tushunib, ularni professional tarzda yaratishga qodir boʻlasiz.

- [Darsning 3-chi qismga oid testni yechish](http://code.skillforge.uz/quiz.html?quiz=quizzes%2FAsoslar-kursi%2FHTML-Asoslari%2F4-dars-3.json)
