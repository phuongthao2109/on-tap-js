import axios from "axios";
const ProbyCate = {
   async render(id) {
      const { data } = await axios.get(`http://localhost:3001/categories/${id}/?_embed=products`);
      console.log(data);
      return /*html*/`
         <h1 class="mb-3 d-flex justify-center font-weight-bold">Cate Name :  ${data.name}</h1>
         <a href="/#/" class="btn btn-outline-primary mb-[50px]">Go Home Page</a> 
      
         <div class="d-grid grid-cols-5 gap-3">
               ${data.products.sort((a, b) => Number(a.price)<Number(b.price)?-1:1).map(product => `
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
   }
}
export default ProbyCate