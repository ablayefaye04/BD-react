// src/components/StudentForm.js
import React, { useState, useEffect } from 'react';

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    filiere: 'Informatique',
    moyenne: ''
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const filieres = [
    'Informatique',
    'Mathématiques',
    'Physique',
    'Chimie',
    'Biologie',
    'Génie Civil',
    'Économie',
    'Gestion'
  ];

  return (
    <>
      <style>{`
        .form-container {
          padding: 2rem;
          font-family: 'Inter', sans-serif;
        }
        .form-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          color: #2d3e5f;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.3px;
        }
        .form-input,
        .form-select {
          width: 100%;
          padding: 0.9rem 1.2rem;
          border: 2px solid #e9edf4;
          border-radius: 16px;
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          background: white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        .form-input:focus,
        .form-select:focus {
          border-color: #1e3c72;
          box-shadow: 0 8px 20px rgba(30, 60, 114, 0.15);
        }
        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234a5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1.2rem center;
          background-size: 1.2rem;
        }
        .form-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 2rem;
        }
        .btn-primary {
          padding: 1rem;
          background: linear-gradient(145deg, #1e3c72, #2b4b8f);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 8px 18px -6px #1e3c72;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-primary:hover {
          transform: scale(1.02);
          box-shadow: 0 12px 24px -6px #1e3c72;
        }
        .btn-secondary {
          padding: 1rem;
          background: #f1f4f9;
          color: #2d3e5f;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-secondary:hover {
          background: #e3e8f0;
          transform: scale(1.02);
        }
      `}</style>

      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">
          {student ? '✏️ Modifier' : '➕ Ajouter'} un étudiant
        </h2>

        <div className="form-group">
          <label className="form-label">Nom complet</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Ex: Jean Dupont"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="exemple@email.com"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Âge</label>
            <input
              type="number"
              name="age"
              min="16"
              max="100"
              value={formData.age}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Moyenne (/20)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="20"
              name="moyenne"
              value={formData.moyenne}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Filière</label>
          <select
            name="filiere"
            value={formData.filiere}
            onChange={handleChange}
            required
            className="form-select"
          >
            {filieres.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {student ? 'Modifier' : 'Ajouter'}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Annuler
          </button>
        </div>
      </form>
    </>
  );
};

export default StudentForm;