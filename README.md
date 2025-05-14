🚀 Kurulum ve Çalıştırma

1️⃣ Ön Koşullar
	•	Docker + Docker Compose kurulu olmalı
	•	Portlar: 5173 (frontend), 8080 (backend), 5432 (postgres) boş olmalı

2️⃣ Projeyi Klasorune git
cd Support-Request-and-Tracking-System

3️⃣ Uygulamayı Başlat
docker-compose up --build

Tüm sistem zincir halinde ayağa kalkar:
	•	http://localhost:5173 → Frontend
	•	http://localhost:8080 → Backend
	•	PostgreSQL → Docker internal (5432)

🔑 Kullanıcı Bilgileri

Username: admin
Password: admin123

user rolü icin register olup kayıt oluşturulmalıdır.


📝 API Dokümantasyonu (Swagger)

Backend API dokümantasyonuna erişmek için:
http://localhost:8080/swagger-ui/index.html
