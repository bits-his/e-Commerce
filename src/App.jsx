import { Provider } from "react-redux";
import store from "./redux/store";
import AppRoute from "./AppRoute";
import ProductbyCtgry from "./pages/seller_Dashboard/product-mgnt/ProductbyCtgry";
const App = () => (
  <>
    <Provider store={store}>
      <AppRoute />
      {/* <ProductbyCtgry /> */}
    </Provider>
  </>
);

export default App;
