import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import $ from "jquery";
import "jquery-validation";


const signup = {
   render() {
      return /*html*/`
      <a href="/#/" class="btn btn-primary mb-[50px]">GO HOME PAGE</a> 
      <a href="/#/signin" class="btn btn-outline-primary mb-[50px]">GO SIGNIN PAGE</a> 

      <div class="my-3 mx-auto max-w-md">
         <form class="" id="signupForm">
         <h1 class="mb-3 d-flex justify-center font-weight-bold">SIGN UP FORM</h1>
            <div class="form-group mb-3">
               <label>User Name</label>
               <input type="text" class="form-control" id="user_name" name="user_name">
            </div>
            <div class="form-group mb-3">
               <label>Email address</label>
               <input type="email" class="form-control" id="user_email" name="user_email">
            </div>
            <div class="form-group mb-3">
               <label>Password</label>
               <input type="password" class="form-control" id="user_pass" name="user_pass">
            </div>

            <button class="btn btn-outline-primary">Submit</button>
         </form>
      </div>
      `
   },
   afterRender() {
      const signupForm = $("#signupForm");
      signupForm.validate({
         rules: {
            "user_name": { required: true, minlength: 5 },
            "user_email": { required: true, email: true },
            "user_pass": { required: true },

         },
         messages: {
            "user_name": { required: "bắt buộc nhập", minlength: "Lớn hơn 5 kí tự" },
            "user_email": { required: "bắt buộc nhập", email: "Phải đúng định dạng" },
            "user_pass": { required: "bắt buộc nhập" },
         },
         submitHandler: () => {
            const user = {
               user_name: $("#user_name").val(),
               email: $("#user_email").val(),
               password: $("#user_pass").val(),
            }
            axios.post("http://localhost:3001/users", user).then(res => {
               toastr.success("Register successfully !!!");
               setTimeout(() => {
                  window.location.href = "/#/signin"
               }, 500);
            });

         }
      })

   }
}
export default signup