using Api.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;  // อย่าลืมนำเข้า namespace นี้

var builder = WebApplication.CreateBuilder(args);

// ✨ Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // พอร์ตของ Angular
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
// ลงทะเบียน UserService ให้ DI container
builder.Services.AddScoped<UserService>();  // หรือ AddTransient, AddSingleton ตามความเหมาะสม
builder.Services.AddScoped<RoleService>();
builder.Services.AddScoped<PermissionService>();
builder.Services.AddScoped<IDocumentService, DocumentService>();

// การตั้งค่า DbContext สำหรับการเชื่อมต่อกับ SQL Server
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add services to the container.
// เพิ่มการตั้งค่า JsonSerializerOptions สำหรับการจัดการกับ circular references
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // กำหนด ReferenceHandler.Preserve เพื่อให้รองรับวงจรการอ้างอิง
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    });

// เพิ่ม Swagger/OpenAPI สำหรับการพัฒนา
builder.Services.AddSwaggerGen();  // เพิ่มการตั้งค่าสำหรับ Swagger

var app = builder.Build();

// ✨ Use CORS
app.UseCors("AllowAngular");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();  // เปิด Swagger เฉพาะใน Development
    app.UseSwagger();  // ใช้ Swagger ในการดู API Documentation
    app.UseSwaggerUI();  // เปิด UI ของ Swagger ใน Browser
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
