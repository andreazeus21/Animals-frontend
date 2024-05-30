import React, { useState, useEffect } from 'react';

const AdminBirdGallery = () => {
  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ _id: null, name: '', species: '', family: '', habitat: '', place_of_found: '', diet: '', description: '', weight_kg: '', height_cm: '', image: '' });
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchBirds = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/birds');
      const data = await response.json();
      setBirds(data);
    } catch (error) {
      console.error('Failed to fetch birds:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBirds();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editMode ? `http://localhost:3000/birds/${form._id}` : 'http://localhost:3000/birds';
    const method = editMode ? 'PATCH' : 'POST';

    const birdData = { ...form };
    if (!editMode) delete birdData.id;  // Ensure id is not sent for new birds

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(birdData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchBirds();
      setForm({ id: null, name: '', species: '', family: '', habitat: '', place_of_found: '', diet: '', description: '', weight_kg: '', height_cm: '', image: '' });
      setEditMode(false);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to submit form:', error);
      setError(error.message);
    }
  };

  const handleEdit = (bird) => {
    setForm(bird);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    console.log(`Attempting to delete bird with id: ${id}`);
    if (!id) {
      console.error('No ID provided for delete operation');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/birds/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`Delete response:`, response);
      fetchBirds();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete bird:', error);
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
      <p className="admin-subtitle">Want to create a new bird?</p>
      <button className='create-button' onClick={() => { setForm({ name: '', species: '', family: '', habitat: '', place_of_found: '', diet: '', description: '', weight_kg: '', height_cm: '', image: '' }); setEditMode(false); setShowForm(true); }}>Create Bird</button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowForm(false)}>&times;</span>
            <h2>{editMode ? 'Edit Bird' : 'Create Bird'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              <input type="text" name="species" placeholder="Species" value={form.species} onChange={handleChange} required />
              <input type="text" name="family" placeholder="Family" value={form.family} onChange={handleChange} required />
              <input type="text" name="habitat" placeholder="Habitat" value={form.habitat} onChange={handleChange} required />
              <input type="text" name="place_of_found" placeholder="Place of Found" value={form.place_of_found} onChange={handleChange} required />
              <input type="text" name="diet" placeholder="Diet" value={form.diet} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required></textarea>
              <input type="number" name="weight_kg" placeholder="Weight (kg)" value={form.weight_kg} onChange={handleChange} required />
              <input type="number" name="height_cm" placeholder="Height (cm)" value={form.height_cm} onChange={handleChange} required />
              <input type="url" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
              <button type="submit">{editMode ? 'Update Bird' : 'Create Bird'}</button>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowDeleteConfirm(false)}>&times;</span>
            <h4>Are you sure you want to delete this bird?</h4>
            <button onClick={() => handleDelete(deleteId)}>Yes</button>
            <button onClick={() => setShowDeleteConfirm(false)}>No</button>
          </div>
        </div>
      )}

      <h2>All Birds</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Family</th>
            <th>Habitat</th>
            <th>Place of Found</th>
            <th>Diet</th>
            <th>Description</th>
            <th>Weight (kg)</th>
            <th>Height (cm)</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {birds.map((bird) => (
            <tr key={bird._id}>
              <td>{bird.name}</td>
              <td>{bird.species}</td>
              <td>{bird.family}</td>
              <td>{bird.habitat}</td>
              <td>{bird.place_of_found}</td>
              <td>{bird.diet}</td>
              <td>{bird.description}</td>
              <td>{bird.weight_kg}</td>
              <td>{bird.height_cm}</td>
              <td><img src={bird.image} alt={bird.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>
                <button className="edit" onClick={() => handleEdit(bird)}>Edit</button>
                <button className="delete" onClick={() => openDeleteConfirm(bird._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBirdGallery;
