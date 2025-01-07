import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [values, setValues] = useState({
    productName: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { id } = useParams();

  const handleChange = (e) => {
    if (e.target.name === "image" && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(URL.createObjectURL(file));
        setValues({
          ...values,
          [e.target.name]: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && Object.keys(errors).length === 0) {
      addEditProduct();
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit, errors, values, navigate]);

  const addEditProduct = async () => {
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/editProduct/${id}`, values);
        toast.success("Successfully Edited Product");
      } else {
        axios.post("http://localhost:5000/api/addProduct", values);
        toast.success("Successfully Added Product");
      }
      navigate("/");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    if (id) {
      getProductDetail();
    }
  }, [id]);

  const getProductDetail = () => {
    axios
      .get(`http://localhost:5000/api/getProductById/${id}`)
      .then((res) => {
        setValues({
          productName: res.data.productName,
          price: res.data.price,
          description: res.data.description,
          category: res.data.category,
          image: res.data.image,
        });
        setImage(res.data.image);
      })
      .catch((err) => {
        toast.error(err.response);
      });
  };

  const validate = (fields) => {
    let tempErrors = {};
    if (!fields.productName) {
      tempErrors["productName"] = "Product Name is required";
    }
    if (!fields.price) {
      tempErrors["price"] = "Price is required";
    } else if (fields.price <= 0) {
      tempErrors["price"] = "Price can't be 0 or less";
    }
    if (!fields.image) {
      tempErrors["image"] = "Image is required";
    }
    if (!fields.description) {
      tempErrors["description"] = "Description is required";
    }

    if (!fields.category) {
      tempErrors["category"] = "Category is required";
    }

    return tempErrors;
  };
  return (
    <div className="container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name*</label>
        <input
          type="text"
          placeholder="Enter Product Name"
          name="productName"
          autoComplete="off"
          value={values.productName}
          onChange={(e) => handleChange(e)}
        />
        {errors.productName && (
          <span className="error">{errors.productName}</span>
        )}
        <label htmlFor="price">Price*</label>
        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          value={values.price}
          onChange={(e) => handleChange(e)}
        />
        {errors.price && <span className="error">{errors.price}</span>}

        <label htmlFor="Category">Category*</label>
        <select
          name="category"
          value={values.category}
          onChange={(e) => handleChange(e)}
        >
          <option value="" selected disabled>
            Select Category
          </option>
          <option value="Accessories">Accessories</option>
          <option value="Clothing">Clothing</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
          <option value="Shoes">Shoes</option>
          <option value="Sports">Sports</option>
        </select>

        {errors.category && <span className="error">{errors.category}</span>}

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="Enter Description"
          value={values.description}
          onChange={(e) => handleChange(e)}
        />
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}
        <label htmlFor="image">Image*</label>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => handleChange(e)}
          name="image"
        />
        {errors.image && <span className="error">{errors.image}</span>}
        <br />
        <img src={image} alt="product" />
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
