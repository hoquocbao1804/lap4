function emailIsValid(email){
    
    return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
     
 }
 
 function save(){
 
     let fullname = document.getElementById('fullname').value;
     let email = document.getElementById('email').value;
     let  phone= document.getElementById('phone').value;
     let address = document.getElementById('address').value;
     let gender = '';
 // xem thử ghi ng dùng nhấn vào giới tính thì nó sẽ hiển thị ra số 1 (nam) hoặc số 2 (nữ)
 
     if(document.getElementById('male').checked){
     gender = document.getElementById('male').value;
     }else if(document.getElementById('famale').checked){
         gender = document.getElementById('famale').value;
 
     }
 
 // họ và tên 
     // nếu như k nhập họ và tên vào thì nó sẽ báo lỗi 
     if (_.isEmpty(fullname)) {
         document.getElementById('fullname-error').innerHTML = 'Vui lòng nhập họ và tên';
     //   .trim() là khi mình spacebar nó k nhận đó là 1 kí tự 
     }else if(fullname.trim().length <= 2) {
         fullname = '';
         document.getElementById('fullname-error').innerHTML = 'không đc nhỏ hơn 2 kí tự';
     }else if(fullname.trim().length > 50) {
         fullname = '';
         document.getElementById('fullname-error').innerHTML = 'không đc lớn hơn 50 kí tự';
     }
     // nếu nhập họ và tên vào r thì nó k báo lỗi nữa 
     else{
         document.getElementById('fullname-error').innerHTML ='';
     }
 // địa chỉ email 
     if(_.isEmpty(email)){
         email = '';
         document.getElementById('email-error').innerHTML = 'Vui lòng nhập email';
     }else if(!emailIsValid(email)){
         email = '';
         document.getElementById('email-error').innerHTML = 'email không đúng định dạng';
     }else {
         document.getElementById('email-error').innerHTML = '';
     }
 // số điện thoại 
     if(_.isEmpty(phone)){
         phone = '';
         document.getElementById('phone-error').innerHTML = 'vui lòng nhập số điện thoại';
 
     } else if(phone.trim().length >10 || phone.trim().length <10 ){
         phone = '';
         document.getElementById('phone-error').innerHTML = 'nhập sai số điện thoại ';
         
     }else {
         document.getElementById('phone-error').innerHTML = '';
     }
 // địa chỉ    
     if(_.isEmpty(address)){
         address = '';
         document.getElementById('address-error').innerHTML = 'vui lòng nhập địa chỉ ';
 
     }else {
         document.getElementById('address-error').innerHTML = '';
     }
 // giới tính 
     if(_.isEmpty(gender)){
         gender = '';
         document.getElementById('gender-error').innerHTML = 'vui lòng chọn giới tính ';
 
     }else {
         document.getElementById('gender-error').innerHTML = '';
     }
 
     if(fullname && email && phone && address && gender ){
         let nhanvien = localStorage.getItem('nhanvien') ? JSON.parse(localStorage.getItem('nhanvien')): []  ;
 
         nhanvien.push({
             
                 fuffname : fullname, 
                 email : email, 
                 phone : phone, 
                 address : address, 
                 gender : gender ,
             
         } );
         
         localStorage.setItem('nhanvien', JSON.stringify(nhanvien));
 
         this.renderListnhanvien();
             
 }
 }
 function renderListnhanvien(){
 
     let nhanvien = localStorage.getItem('nhanvien');
     if (nhanvien) {
         nhanvien = JSON.parse(nhanvien);
     } else {
         nhanvien = [];
     }
     
     
     if(nhanvien.length===0) {
         document.getElementById('list_nhanvien').style.display = 'none';
         return false;
     }
 
     document.getElementById('list_nhanvien').style.display = 'block';
 
     let tableContent =`<tr>
                 <td width = "10">#</td>
                 <td>Họ và Tên </td>
                 <td>Email</td>
                 <td>Điện Thoại</td>
                 <td>Địa Chỉ </td>
                 <td> giới tính </td>
                 <td>Hành Động </td>
             </tr>`
 
 nhanvien.forEach((nhanvien, index) => {
     let nhanvienId = index;
     
     let genderlabel = parseInt(nhanvien.gender)  === 1 ? 'Nam' : 'Nữ' ;
     index ++ ;
     tableContent += `<tr>
     <td>${ index}</td>
     <td>${ nhanvien.fuffname}</td>
     <td>${ nhanvien.email}</td>
     <td>${ nhanvien.phone}</td>
     <td>${ nhanvien.address}</td>
     <td>${ genderlabel}</td>
     <td>
     <a href='#' onclick = "editNhanvien(${nhanvienId})">Edit</a> |  <a href ='#' onclick = "deletenhanvien(${nhanvienId})">Delete</a> 
      </td>
 
 </tr>` 
 })
 
 document.getElementById('grid-nhanvien').innerHTML = tableContent;
  }
 
  function deletenhanvien(id){
     let nhanvien = localStorage.getItem('nhanvien');
     if (nhanvien) {
         nhanvien = JSON.parse(nhanvien);
     } else {
         nhanvien = [];
     }
     nhanvien.splice(id,1);
     localStorage.setItem('nhanvien', JSON.stringify(nhanvien));
     renderListnhanvien();
  }
 
 
 
  function editNhanvien(index) {
     let nhanvien = localStorage.getItem('nhanvien');
     const newName = prompt("Tên mới:", nhanvien.fullname);
     const newemail = prompt("Email mới:", nhanvien.email);
     const newphone = prompt(" phone mới:", nhanvien.phone);
     const newaddress = prompt("địa chỉ mới:", nhanvien.address);
     const newgender = prompt("giới tính mới:", student.gender);
     if (newName && newemail && newphone && newaddress && newgender) {
       nhanvien[index] = { name: newName, email: newemail, phone:newphone, address:newaddress , gender:newgender };
       nhanvien.splice(id,1);
       localStorage.setItem('nhanvien', JSON.stringify(nhanvien));
       renderListnhanvien();
     }
   }
  