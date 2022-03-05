import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import $ from "jquery";
import "jquery-validation";


const signin = {
   render() {
      return /*html*/`
      <a href="/#/" class="btn btn-primary mb-[50px]">GO HOME PAGE</a> 
      <a href="/#/signup" class="btn btn-outline-primary mb-[50px]">GO SIGNUP PAGE</a> 

      <div class="my-3 mx-auto max-w-md">
         <form class="" id="signinForm">
         <h1 class="mb-3 d-flex justify-center font-weight-bold">SIGN IN FORM</h1>
            
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
      const signinForm = $("#signinForm");
      signinForm.validate({
         rules: {
            "user_email": { required: true, email: true },
            "user_pass": { required: true },

         },
         messages: {
            "user_email": { required: "bắt buộc nhập", email: "Phải đúng định dạng" },
            "user_pass": { required: "bắt buộc nhập" },
         },
         submitHandler: () => {
            async function sigin() {
               try {
                  const user = {
                     email: $("#user_email").val(),
                     password: $("#user_pass").val(),
                  }
                  const { data } = await axios.post("http://localhost:3001/signin", user)
                  console.log(data);
                  localStorage.setItem('user', JSON.stringify(data.user))
                  if (data.user.id == 1) {
                     document.location.href = "/#/products"
                  } else {
                     document.location.href = "/#/"
                  }
               } catch (error) {
                  console.log(error.response.data)
               }

            }
            sigin();

         }
      })

   }
}
export default signin
