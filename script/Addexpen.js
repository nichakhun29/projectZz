const BASE_URL = "https://67a427ec31d0d3a6b7857980.mockapi.io";
let mode = "CREATE";
let selectedId = -1;

const validateData = (expenData) => {
  event.preventDefault()
  let errors = [];

  if (!expenData.day) {
    errors.push("กรุณาใส่วันที่");
  }
  if (!expenData.expen) {
    errors.push("กรุณาใส่รายรับ");
  }
  if (!expenData.pay) {
    errors.push("กรุณาใส่รายจ่าย");
  }

  return errors;
};

const submitData = async () => {
  let dayDOM = document.querySelector("input[name=day]");
  let expenDOM = document.querySelector("input[name=expen]");
  let payDOM = document.querySelector("input[name=pay]");

  let expenData = {
    day: dayDOM.value,
    expen: Number(expenDOM.value), // แปลงเป็นตัวเลข
    pay: Number(payDOM.value),     // แปลงเป็นตัวเลข
  };

  const errors = validateData(expenData);
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;  
  }

  try {
    let response;
    if (mode === "EDIT") {
      console.log(`แก้ไขข้อมูลที่: ${BASE_URL}/expen/${selectedId}`);
      response = await axios.put(`${BASE_URL}/expen/${selectedId}`, expenData);
      alert("แก้ไขข้อมูลเรียบร้อย");
    } else {
      
      response = await axios.post(`${BASE_URL}/expen`, expenData);
      alert("เพิ่มข้อมูลเรียบร้อย");
    }
    console.log("Response:", response.data);
  } catch (error) {
    alert(`มีปัญหาเกิดขึ้น: ${error.response ? error.response.data : error.message}`);
    console.error("Error details:", error);
  }
};

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id) {
    mode = "EDIT";
    selectedId = id;

    let dayDOM = document.querySelector("input[name=day]");
    let expenDOM = document.querySelector("input[name=expen]");
    let payDOM = document.querySelector("input[name=pay]");

    try {
      const response = await axios.get(`${BASE_URL}/expen/${id}`);
      const expen = response.data;

      dayDOM.value = expen.day;
      expenDOM.value = expen.expen;
      payDOM.value = expen.pay;
    } catch (error) {
      console.error("error", error);
    }
  }
};
