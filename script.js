document.querySelectorAll('.edit-btn').forEach(button => {
  button.addEventListener('click', function() {
      const row = this.closest('tr'); // الحصول على الصف
      const cells = row.querySelectorAll('td');

      // اجعل الخلايا قابلة للتحرير
      cells.forEach((cell, index) => {
          if (index < 3) { // تجاهل زر التعديل
              const currentText = cell.innerText;
              cell.innerHTML = `<input type="text" value="${currentText}" class="edit-input">`;
          }
      });

      // تغيير الزر إلى "حفظ"
      this.innerText = 'حفظ';
      this.classList.add('save-btn');
      this.classList.remove('edit-btn');

      // إضافة حدث للحفظ
      this.addEventListener('click', function() {
          // حفظ القيم الجديدة
          cells.forEach((cell, index) => {
              if (index < 3) {
                  const input = cell.querySelector('input');
                  if (input) {
                      cell.innerText = input.value; // حفظ النص الجديد
                  }
              }
          });

          // تغيير الزر إلى "تعديل"
          this.innerText = 'تعديل';
          this.classList.add('edit-btn');
          this.classList.remove('save-btn');
      }, { once: true }); // الحدث يحدث مرة واحدة
  });
});
// وظيفة لحفظ الجدول في Local Storage
function saveTableToLocalStorage() {
  const tableData = [];
  document.querySelectorAll('tbody tr').forEach(row => {
      const rowData = Array.from(row.querySelectorAll('td'))
          .slice(0, 3) // تخطي أزرار التعديل
          .map(cell => cell.innerText);
      tableData.push(rowData);
  });
  localStorage.setItem('tableData', JSON.stringify(tableData));
}

// وظيفة لتحميل الجدول من Local Storage
function loadTableFromLocalStorage() {
  const tableData = JSON.parse(localStorage.getItem('tableData'));
  if (tableData) {
      document.querySelectorAll('tbody tr').forEach((row, index) => {
          const cells = row.querySelectorAll('td');
          tableData[index].forEach((value, cellIndex) => {
              cells[cellIndex].innerText = value;
          });
      });
  }
}

// حفظ التعديلات عند الحفظ
document.querySelectorAll('.save-btn').forEach(button => {
  button.addEventListener('click', saveTableToLocalStorage);
});

// تحميل البيانات عند بدء التشغيل
loadTableFromLocalStorage();
