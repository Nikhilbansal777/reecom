import { Link } from "react-router-dom";
import "../../styles/product.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getProducts")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(products);
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product._id}>
          <div className="product-tumb">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-details">
            <span className="product-catagory">{product.category}</span>
            <h4>
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h4>
            <p>{product.description}</p>
            <div className="product-bottom-details">
              <div className="product-price">{product.price} Rs.</div>
              <div className="product-links">
                <Link>
                  <i className="fa fa-heart"></i>
                </Link>
                <Link>
                  <i className="fa fa-shopping-cart"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
