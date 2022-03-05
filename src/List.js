import axios from "axios";
import { reRender } from "./lib";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const List = {
   async render() {
      const { data } = await axios.get("http://localhost:3001/products?_expand=category");

      return /*html*/`
         <h1 class="mb-3 d-flex justify-center font-weight-bold">Product List</h1>
         <a href="/#/" class="btn btn-outline-primary mb-[50px]">Back to Home Page</a> 
         <a href="/#/products/add" class="btn btn-outline-primary mb-[50px]">Add new pro</a> 
         <div class="container">
         <table class="table" id="table_list">
            <thead class="thead-dark">
               <tr>
               <th scope="col">#</th>
               <th scope="col">Name</th>
               <th scope="col">Image</th>
               <th scope="col">Price</th>
               <th scope="col">Desc</th>
               <th scope="col">Cate</th>
               <th scope="col">Action</th>
               </tr>
            </thead> 
            ${data.map((item, index) => `
             <tbody>
               <tr>
               <th scope="row">${index + 1}</th>
               <td><img src="${item.img}" class="w-[100px] h-[100px] "></td>
               <td>${item.name}</td>
               <td>${item.price}</td>
               <td>${item.desc}</td>
               <td>${item.category.name}</td>
               <td> <a href="/products/${item.id}/edit" class="btn btn-warning">edit</a> <button data-id="${item.id}"
                     class="btn btn-danger remove">delete</button> </td </tr>
            </tbody> `).join("")}
         </table>
         </div>
      `
   },
   afterRender() {
      const Delbtns = document.querySelectorAll(".remove");
      Delbtns.forEach(btn => {
         const id = btn.dataset.id;
         btn.addEventListener("click", () => {
            const cf = window.confirm(`Are you sure you want to delete ${id}`);
            if (cf) {
               axios.delete("http://localhost:3001/products/" + id)
               toastr.success("delete successfully")
               reRender(List, "#app")
            }
         })
      })
   }
}
export default List