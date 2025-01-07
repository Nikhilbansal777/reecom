import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../../styles/adminDashboard.css";
import { useNavigate } from "react-router-dom";

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

  const handleEditProduct = (id) => {
    navigate(`/addProduct/${id}`);
  };
  return (
    <div className="table-wrap">
      {products.length > 0 ? (
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
              <tr key={product._id}>
                <td onClick={() => productDetail(product._id)}>
                  <img src={product.image} alt="" className="cat_square" />
                </td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>
                  <img
                    className="edit_image"
                    onClick={() => handleEditProduct(product._id)}
                    src={"edit.svg"}
                    alt="edit"
                  />

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
      ) : (
        <img src="no.jpg" className="cat_square" alt="no product"></img>
      )}
    </div>
  );
};

export default AdminProducts;
