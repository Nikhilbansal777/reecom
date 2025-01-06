import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../../styles/adminDashboard.css";
import { Link, useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get("http://localhost:5000/api/getProducts")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        toast.error("Error in getting the products");
      });
  };

  const handleDeleteProduct = (product) => {
    console.log(product);
    axios
      .delete(`http://localhost:5000/api/deleteProduct/${product._id}`)
      .then((res) => {
        console.log(res);
        getProducts();
        toast.success("Successfully deleted the product");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in deleting the product");
      });
  };
  const productDetail = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="table-wrap">
      <table className="srt">
        <thead>
          <tr>
            <th className="no-sort">
              <button className="admin_button">Product Image</button>
            </th>
            <th aria-sort="ascending">
              <button className="admin_button">
                Product Name<span aria-hidden="true"></span>
              </button>
            </th>
            <th aria-sort="ascending">
              <button className="admin_button">
                Price<span aria-hidden="true"></span>
              </button>
            </th>
            <th aria-sort="ascending">
              <button className="admin_button">
                Category<span aria-hidden="true"></span>
              </button>
            </th>
            <th className="num">
              <button className="admin_button">
                Description<span aria-hidden="true"></span>
              </button>
            </th>
            <th className="num">
              <button className="admin_button">
                Action<span aria-hidden="true"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr onClick={() => productDetail(product._id)} key={product._id}>
              <td>
                <img src={product.image} alt="" className="cat_square" />
              </td>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>
                <img className="edit_image" src={"edit.svg"} alt="edit" />

                <img
                  onClick={() => handleDeleteProduct(product)}
                  className="delete_image"
                  src={"delete.svg"}
                  alt="delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
