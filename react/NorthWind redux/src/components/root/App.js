import React from "react";
import Dashboard from "./Dashboard";
import Navi from "../navi/Navi";
import { Route, Switch } from "react-router-dom";
import CartDetail from "../cart/cartDetail";
import { Container } from "reactstrap";
import AddOrUpdateProduct from "../products/AddOrUpdatePriduct";
import NotFound from "../common/NotFound";

function App() {
  return (
    <Container>
      <div>
        <Navi />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/product" component={Dashboard} />
          <Route
            path="/saveproduct/:productId"
            component={AddOrUpdateProduct}
          />
          <Route path="/saveproduct/" component={AddOrUpdateProduct} />
         
          <Route path="/cart" component={CartDetail} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Container>
  );
}

export default App;
