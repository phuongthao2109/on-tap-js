import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const Home = {
   async render() {
      const { data } = await axios.get("http://localhost:3001/categories");
      const {data:products} = await axios.get("http://localhost:3001/products");

      return /*html*/`
         <h1 class="mb-3 d-flex justify-center font-weight-bold">HOME PAGE</h1>
         <a href="/#/products" class="btn btn-primary mb-[50px]">GO TO PRODUCTS PAGE</a> 
         ${data.map(cate => `
            <a href="/#/category/${cate.id}" class="btn btn-outline-primary mb-[50px]">${cate.name}</a> 
         `).join("")}

         <a href="/#/signup" class="btn btn-outline-primary mb-[50px]">SIGNUP</a>
         <a href="/#/signin" class="btn btn-outline-primary mb-[50px]">SIGNIN</a>


         <div class="d-grid grid-cols-5 gap-3">
               ${products.sort((a, b) => Number(a.price)<Number(b.price)?-1:1).map(product => `
               <div class="card"">
                  <a href=""><img class="card-img-top" src="${product.img}"></a>
                  <div class="card-body">
                     <a href=""><h1 class="card-title">${product.name}</h1></a>
                     <p class="card-text mb-2">${product.price} VND</p>
                     <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
               </div>
               `).join("")}
         </div>
      `
   },
   afterRender(){
      const user =JSON.parse(localStorage.getItem('user')) ;
      if(user){
         toastr.success(`WELCOME BACK ${user.user_name}`)
      }
   }
}
export default Home