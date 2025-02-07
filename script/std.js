const BASE_URL = "https://67a427ec31d0d3a6b7857980.mockapi.io";

window.onload = async () => {
  await loadData();
};

// Function to load and display users
const loadData = async (searchTerm = "") => {
  // Get all users from the backend
  const response = await axios.get(`${BASE_URL}/std`);
  let std = response.data;

  // Filter users based on the search term
  if (searchTerm) {
    std = std.filter(
      (std) =>
        String(std.stdid)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(std.firstname)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }

  // Construct HTML for the table
  let stdHTMLData = `
    <table class="min-w-full divide-y divide-gray-200 text-center bg-green-500">
      <thead>
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider text-center">รหัสนักเรียน</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider text-center">ชื่อจริง</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider text-center">นามสกุล</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider text-center">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">`;

  for (let i = 0; i < std.length; i++) {
    stdHTMLData += `<tr>
      <td class="px-6 py-4 whitespace-nowrap">${std[i].stid}</td>
      <td class="px-6 py-4 whitespace-nowrap">${std[i].firstname}</td>
      <td class="px-6 py-4 whitespace-nowrap">${std[i].lastname}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <button class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out" onclick="editUser(${std[i].id})">Edit <i class="fa-solid fa-pencil"></i></button>
        <button class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out" data-id='${std[i].id}'>Delete <i class="fa-solid fa-eraser"></i></button>
      </td>
    </tr>`;
  }

  stdHTMLData += `
      </tbody>
    </table>`;

  // Insert the HTML into the DOM
  let stdDOM = document.getElementById("stdu");
  stdDOM.innerHTML = stdHTMLData;

  // Attach click event listeners to all delete buttons
  let deleteDOMs = document.querySelectorAll("[data-id]"); // เลือกปุ่มลบทั้งหมด

  deleteDOMs.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const id = event.currentTarget.dataset.id;  
      if (confirm("คุณต้องการลบรายการนี้หรือไม่?")) {  
        try {
          await axios.delete(`${BASE_URL}/std/${id}`);
          loadData();  
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
        }
      }
    });
  });

   
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("edited")) {
    await loadData();  
  }
};
 
const editUser = (id) => {
   
  window.location.href = `./Addstd.html?id=${id}&edited=true`;
};
 
const handleSearch = async () => {
  const searchInput = document.getElementById("search").value;
  await loadData(searchInput);
};