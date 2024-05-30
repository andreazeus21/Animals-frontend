import React, { useState, useEffect } from 'react';

const AdminDogGallery = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ _id: null, name: '', breed_group: '', size: '', lifespan: '', origin: '', temperament: '', colors: '', description: '', image: '' });
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchDogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/dogs');
      const data = await response.json();
      setDogs(data);
    } catch (error) {
      console.error('Failed to fetch dogs:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editMode ? `http://localhost:3000/dogs/${form._id}` : 'http://localhost:3000/dogs';
    const method = editMode ? 'PATCH' : 'POST';
    const colorsArray = form.colors.split(',').map(color => color.trim());

    const dogData = { ...form, colors: colorsArray };
    if (!editMode) delete dogData.id;  // Ensure id is not sent for new dogs

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dogData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchDogs();
      setForm({ id: null, name: '', breed_group: '', size: '', lifespan: '', origin: '', temperament: '', colors: '', description: '', image: '' });
      setEditMode(false);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to submit form:', error);
      setError(error.message);
    }
  };

  const handleEdit = (dog) => {
    setForm({ ...dog, colors: dog.colors.join(', ') });
    console.log("form => ", form);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    console.log(`Attempting to delete dog with id: ${id}`);
    if (!id) {
      console.error('No ID provided for delete operation');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/dogs/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`Delete response:`, response);
      fetchDogs();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete dog:', error);
      setError(error.message);
    }
  };

  const openDeleteConfirm = (id) => {
    console.log(`Open delete confirmation for id: ${id}`);
    setDeleteId(id ? id.toString() : '');
    setShowDeleteConfirm(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-page">
      <h2 className="admin-title">Admin Page</h2>
      <p className="admin-subtitle">Want to create a new dog?</p>
      <button className='create-button' onClick={() => { setForm({ name: '', breed_group: '', size: '', lifespan: '', origin: '', temperament: '', colors: '', description: '', image: '' }); setEditMode(false); setShowForm(true); }}>Create Dog</button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowForm(false)}>&times;</span>
            <h2>{editMode ? 'Edit Dog' : 'Create Dog'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              <input type="text" name="breed_group" placeholder="Breed Group" value={form.breed_group} onChange={handleChange} required />
              <input type="text" name="size" placeholder="Size" value={form.size} onChange={handleChange} required />
              <input type="text" name="lifespan" placeholder="Lifespan" value={form.lifespan} onChange={handleChange} required />
              <input type="text" name="origin" placeholder="Origin" value={form.origin} onChange={handleChange} required />
              <input type="text" name="temperament" placeholder="Temperament" value={form.temperament} onChange={handleChange} required />
              <input type="text" name="colors" placeholder="Colors (comma separated)" value={form.colors} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required></textarea>
              <input type="url" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
              <button type="submit">{editMode ? 'Update Dog' : 'Create Dog'}</button>
            </form>
          </div>
        </div>
      )}

{showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowDeleteConfirm(false)}>&times;</span>
            <h4>Are you sure you want to delete this dog?</h4>
            <button onClick={() => handleDelete(deleteId)}>Yes</button>
            <button onClick={() => setShowDeleteConfirm(false)}>No</button>
          </div>
        </div>
      )}

      <h2>All Dogs</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Breed Group</th>
            <th>Size</th>
            <th>Lifespan</th>
            <th>Origin</th>
            <th>Temperament</th>
            <th>Colors</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dogs.map((dog) => (
            <tr key={dog._id}>
              <td>{dog.name}</td>
              <td>{dog.breed_group}</td>
              <td>{dog.size}</td>
              <td>{dog.lifespan}</td>
              <td>{dog.origin}</td>
              <td>{dog.temperament}</td>
              <td>{dog.colors.join(', ')}</td>
              <td>{dog.description}</td>
              <td><img src={dog.image} alt={dog.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>
                <button className="edit" onClick={() => handleEdit(dog)}>Edit</button>
                <button className="delete" onClick={() => openDeleteConfirm(dog._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDogGallery;
