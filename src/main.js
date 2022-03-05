import Navigo from "navigo";
import Home from "./Home";
import Add from "./Add";
import Edit from "./Edit";
import List from "./List";
import ProbyCate from "./ProbyCate";
import signup from "./sigup";
import signin from "./signin";
const router = new Navigo("/", { linksSelector: "a", hash: true });

const print = async (component, id) => {
  document.querySelector("#app").innerHTML = await component.render(id);
  if (component.afterRender) await component.afterRender(id);
};

router.on({
  "/" : () => print(Home),
  "/products" : () => print(List),
  "/products/add" : () => print(Add),
  "/products/:id/edit" : ({data}) => print(Edit,data.id),
  "/category/:id" : ({data}) => print(ProbyCate,data.id),
  "/signin" : () => print(signin),
  "/signup" : () => print(signup)
});

router.resolve();
