const BASE_URL = "https://67a427ec31d0d3a6b7857980.mockapi.io";
let mode = "CREATE";
let selectedId = -1;

const validateData = (stdData) => {
  event.preventDefault()
  let errors = [];

  if (!stdData.stid) {
    errors.push("กรุณาใส่รหัสนักเรียน");
  }
  if (!stdData.firstname) {
    errors.push("กรุณาใส่ชื่อจริง");
  }
  if (!stdData.lastname) {
    errors.push("กรุณาใส่นามสกุล");
  }

  return errors;
};

const submitData = async () => {
  let stidDOM = document.querySelector("input[name=stid]");
  let firstnameDOM = document.querySelector("input[name=firstname]");
  let lastnameDOM = document.querySelector("input[name=lastname]");

  let stdData = {
    stid: stidDOM.value,
    firstname: firstnameDOM.value, // แปลงเป็นตัวเลข
    lastname: lastnameDOM.value,     // แปลงเป็นตัวเลข
  };

  const errors = validateData(stdData);
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;  
  }

  try {
    let response;
    if (mode === "EDIT") {
      console.log(`แก้ไขข้อมูลที่: ${BASE_URL}/std/${selectedId}`);
      response = await axios.put(`${BASE_URL}/std/${selectedId}`, stdData);
      alert("แก้ไขข้อมูลเรียบร้อย");
    } else {
      
      response = await axios.post(`${BASE_URL}/std`, stdData);
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

    let stidDOM = document.querySelector("input[name=stid]");
    let firstnameDOM = document.querySelector("input[name=firstname]");
    let lastnameDOM = document.querySelector("input[name=lastname]");

    try {
      const response = await axios.get(`${BASE_URL}/std/${id}`);
      const std = response.data;

      stidDOM.value = std.stid;
      firstnameDOM.value = std.firstname;
      lastnameDOM.value = std.lastname;
    } catch (error) {
      console.error("error", error);
    }
  }
};
