import React from "react";
import { ChangeEvent, useState } from 'react';
import axios from "axios";

function Home(){
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");

    function handleFileChange(e){
        console.log(e.target.files);
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    function handleSubmit(){
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:4000/upload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
    }
    function handleChange(e){
        var input = e.target.value;
        setName(input);
    }
    function handleDelete(){
        axios.delete('http://localhost:4000/delete', {data: {fname: name}});
    }

    console.log(file);
    return(
        <div>
            <label>Upload</label>
            <input type="file" onChange={handleFileChange}></input>
            <label>submit</label>
            <button onClick={handleSubmit}>upload to S3</button>
            <br />
            <label>File name to delete</label>
            <input onChange={handleChange}></input>
            <button onClick={handleDelete}>Delete from S3</button>
        </div>
    )
}

export default Home;