# 🌟 โปรเจกต์ GOFIVE 
 โดยประกอบด้วย:
 
- ⚙️ **Backend**: ASP.NET Core Web API
- 🎨 **Frontend**: Angular
- 💾 **ฐานข้อมูล**: SQL Server (ผ่าน Entity Framework Core)

---



เราจะรันด้วย 2 ทางคือรันฝั่งของ angular กับ dotnet
1.ให้เข้าไปในงาน cd projectGofive แล้วใช้คำสั่ง ng serve หรือ ng s เพื่อดูหน้าเว็บ
2.ให้เข้าไปในงาน cd Api ใช้คำสั่ง 2 คำสั่ง คือ
    2.1 dotnet build เอาไว้ใช้สำหรับ compile project ตรวจ syntax
    2.2 dotnet run หลังจากที่ใช้คำสั่ง dotnet build แล้วใช้ dotnet run ได้เลย


งานเราจะแบ่งเป็นของส่วน backend ที่ชื่อว่า Api 
จะมีโครงสร้างหลักมีดังนี้
    Api
        -Controllers
        -Data
            -AppDbContext.cs คือตัวกลางเชื่อมกับฐานข้อมูลไว้เช่น  table
        -Migrations 
        -Models
        -service
        -Program.cs 
    ProjectGofive
        -src/app/
            -components 
            -models
            -pages
            -services
