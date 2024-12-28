import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/productDetail.css";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/getProductById/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        toast.error(err.response);
      });
  }, [id]);

  return (
    <main className="main">
      <section className="section wrapper wrapper-section">
        <div className="container wrapper-column">
          <div className="wrapper-bgimage">
            <img src={product.image} className="wrapper-image" alt="product" />
          </div>
          <div className="wrapper-content">
            <div className="wrapper-inform">
              <span className="badge badge-darken">{product.category}</span>
              <h1 className="display-medium font-bold">
                {product.productName}
              </h1>
              <p className="text-base font-normal">{product.description}</p>
            </div>
            <div className="price">
              <span className="text-base font-medium">Price:</span>
              <h3 className="text-large font-semi">{product.price} Rs</h3>
            </div>
            <button className="btn btn-darken" disabled>
              Add to Bag
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Product;
