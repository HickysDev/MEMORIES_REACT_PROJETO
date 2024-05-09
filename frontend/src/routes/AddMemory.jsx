import axios from "../axios-config";
import {useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

import "./AddMemory.css";
const AddMemory = () => {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);

    try {
      const response = await axios.post("/memories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.msg);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    } else {
      setInputs({...inputs, [e.target.name]: e.target.value});
    }
  };

  return (
    <div className="add-memory-page">
      <h2>Crie uma nova memória</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Título: </p>
          <input
            type="text"
            placeholder="Defina um título"
            name="title"
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Descrição: </p>
          <textarea
            placeholder="Escreva uma breve descrição"
            name="description"
            onChange={handleChange}></textarea>
        </label>
        <label>
          <p>Foto: </p>
          <input type="file" name="image" onChange={handleChange} />
        </label>
        <input type="submit" value="Enviar" className="btn" />
      </form>
    </div>
  );
};

export default AddMemory;
