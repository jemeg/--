// الانتظار حتى يتم تحميل الصفحة بالكامل
document.addEventListener("DOMContentLoaded", () => {
    // استهداف الزر
    const button = document.getElementById("clickMe");
    
    // إضافة حدث النقر
    button.addEventListener("click", () => {
      alert("مرحبًا بك في موقعي!");
    });
  });
  