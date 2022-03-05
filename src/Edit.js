import axios from "axios";
import $ from "jquery";
import "jquery-validation";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const Edit = {
   async render(id) {
      const { data } = await axios.get(`http://localhost:3001/products/${id}?_expand=category`+ id);
      const Cate = await axios.get("http://localhost:3001/categories");
      return /*html*/`
      <h1 class="mb-3 d-flex justify-center font-weight-bold">Product Add</h1>
      <a href="/products" class="btn btn-outline-primary mb-[50px]">List Products</a>
      <form id="addForm" name="addForm">
         <div class="mb-3"><label for="">name</label> <input class=form-control id="pro_name" name="pro_name" value="${data.name}" >
         </div>
         <div class="mb-3"><label for="">Price</label> <input class=form-control id="pro_price" name="pro_price" value="${data.price}"> </div>
         <div class="mb-3"><label for="">image</label> <input class=form-control id="pro_img" name="pro_img" value="${data.img}" >
         </div>
         <div class="mb-3">
            <p>Choose cate</p><select class="form-control form-select" id="pro_cate" name="pro_cate">
               ${Cate.data.map(item => `
                  <option value="${item.id}">${item.name}</option>
               `)}
            </select>
         </div>
         <div class="mb-3"><label for="">desc</label> <input class="form-control" id="pro_desc" name="pro_desc" value="${data.desc}"
            ></div><button class="btn btn-primary" id="btnAdd">Submit</button>
      </form>
      `
   },
   afterRender(id) {
      const formAdd = $("#addForm");
      formAdd.validate({
         rules: {
            "pro_name": { required: true, minlength: 5 },
            "pro_price": { required: true, number: true },
            "pro_desc": { required: true },
            "pro_img": { required: true },
            "pro_cate": { required: true },
         },
         messages: {
            "pro_name": { required: "bắt buộc nhập", minlength: "Lớn hơn 5 kí tự" },
            "pro_price": { required: "bắt buộc nhập", number: "Phải là số" },
            "pro_desc": { required: "bắt buộc nhập" },
            "pro_img": { required: "bắt buộc nhập" },
            "pro_cate": { required: "bắt buộc nhập" },
         },
         submitHandler: () => {
            const pro = {
               id:id,
               name: $("#pro_name").val(),
               price: $("#pro_price").val(),
               desc: $("#pro_desc").val(),
               img: "http://placeimg.com/640/480/sports",
               categoryId: $("#pro_cate").val(),
            }
            axios.patch(`http://localhost:3001/products/${id}`, pro)
            toastr.success("Edit successfully !!!")
            window.location.href = "/products"
         }
      })

   }
}
export default Edit