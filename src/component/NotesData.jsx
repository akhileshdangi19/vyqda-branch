import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';


const NotesData = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [desc, setDesc] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const API_BASE_URL = "http://localhost:8080/api/todo";
    console.log(API_BASE_URL, "Apibase")

    useEffect(() => {
        fetch(`${API_BASE_URL}`)
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error('Error fetching todos:', error));
    }, [API_BASE_URL]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleDesc = (e) => {
        setDesc(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ title: inputValue, description: desc })
        })
            .then(response => response.json())
            .then(data => setTodos([...todos, data]))
            .catch(error => console.error('Error adding todo:', error));
        setInputValue('');
        setDesc('');
    };

    const handleDelete = (id) => {
        fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(error => console.error('Error deleting todo:', error));
    };

    const handleUpdate = (id, updatedTitle, updatedDesc) => {
        fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: updatedTitle, description: updatedDesc })
        })
            .then(response => response.json())
            .then(() => {
                const updatedTodos = todos.map(todo =>
                    todo.id === id ? { ...todo, title: updatedTitle, description: updatedDesc } : todo
                );
                setTodos(updatedTodos);
            })
            .catch(error => console.error('Error updating todo:', error));
    };

    // const filteredTodos = todos.filter((todo) =>
    //     todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    const filteredTodos = todos?.filter((todo) =>
        todo && todo.title && todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filteredTodos, "fileterdaa")
    return (
        <div className="container-lg">
            <div className='heading'>
                <h2>Notes App</h2>
            </div>
            <div>
                <div className="card">
                    <div className="card-header">
                        <form onSubmit={handleSubmit}>
                            <div className='upercard'>
                                <input type="text" value={inputValue} onChange={handleChange} placeholder="Title" />
                                <input type="text" value={desc} onChange={handleDesc} placeholder="Description" />
                                <button className='btn btn-primary' type="submit" style={{ marginLeft: "10px" }}>Add Todo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container">
                {filteredTodos.map((todo, i) => (
                    <div className="card card_small" key={todo.id}>
                        <div className='title'>
                            <span className='SpanIndex'>{i + 1}.</span>
                        </div>
                        <p className="description">
                            <strong>Title:</strong> {todo.title} <br />
                            <strong>Description:</strong> {todo.description}
                        </p>
                        <div className="row justify-content-md-center">
                            <div className="col col-md-6">
                                <button className='btn btn-info' onClick={() => handleUpdate(todo.id, prompt('Edit Title:', todo.title) || '', prompt('Edit Description:', todo.description) || '')}>
                                    Edit
                                </button>
                            </div>
                            <div className="col col-md-6">
                                <button className='btn btn-danger' onClick={() => handleDelete(todo.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesData;

