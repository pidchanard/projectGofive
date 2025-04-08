# 🌟 โปรเจกต์ GOFIVE 
 โดยประกอบด้วย:
 
- ⚙️ **Backend**: ASP.NET Core Web API
- 🎨 **Frontend**: Angular
- 💾 **ฐานข้อมูล**: SQL Server (ผ่าน Entity Framework Core)

---


## 🚀 วิธีการรันโปรเจกต์
เราจะรันด้วย 2 ทางคือรันฝั่งของ angular กับ dotnet
### ✅ 1. รันฝั่ง Angular (Frontend)

```bash
cd projectGofive
ng serve
# หรือ
ng s
```

📍 ใช้สำหรับเปิดเว็บในโหมดพัฒนา → เปิดใช้งานได้ที่: `http://localhost:4200`

---
### ✅ 2. รันฝั่ง .NET (Backend)

```bash
cd Api
dotnet build     # Compile และตรวจ syntax
dotnet run       # เริ่มรัน API Server
```

📍 API จะรันที่: `https://localhost:5229` หรือ `http://localhost:5229`
และ Swagger จะรันที่: `http://localhost:5229/swagger/index.html`
---

## 🗂️ โครงสร้างโปรเจกต์

### 🔧 Backend (`Api/`)

```
Api/
├── Controllers/         # ตัวควบคุมเส้นทาง API
├── Data/
│   └── AppDbContext.cs   # ตัวกลางเชื่อมฐานข้อมูล (DbContext + Table)
├── Migrations/          # ไฟล์จัดการฐานข้อมูลอัตโนมัติของ EF Core
├── Models/              # คลาสโมเดล เช่น User, Role, Permission
├── Services/            # ชั้น Business Logic เช่น UserService
├── Program.cs           # จุดเริ่มต้นของ Web API
```

---

### 🎨 Frontend (`projectGofive/`)

```
projectGofive/
└── src/
    └── app/
        ├── components/   # ส่วน UI ย่อย เช่น ตาราง, Modal
        ├── models/       # Interface TypeScript เช่น User.ts
        ├── pages/        # หน้าเว็บหลัก เช่น UserPage, DashboardPage
        └── services/     # เชื่อมต่อ API ด้วย HTTP เช่น user.service.ts
```

---

## 📌 หมายเหตุเพิ่มเติม

- `AppDbContext.cs` ใช้สำหรับเชื่อมตารางในฐานข้อมูลกับ Entity Framework Core
- Angular ใช้ `ng serve` เพื่อพัฒนาแบบ Hot Reload
- Backend ใช้ `dotnet build` ตรวจสอบ syntax และ `dotnet run` เพื่อรัน API

---
## 👩‍💻 จัดทำโดย

- Pidchanard Mueanson (พิชญ์นาฏ เหมือนสนธิ์ )
- Internship Developer
