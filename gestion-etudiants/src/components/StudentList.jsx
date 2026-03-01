// src/components/StudentList.js
import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import StudentForm from './StudentForm';
import GithubDownloader from './GithubDownloader';
import { getStudents, saveStudent, deleteStudent } from '../services/studentService';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFiliere, setFilterFiliere] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    const data = getStudents();
    setStudents(data);
  };

  const handleSaveStudent = (studentData) => {
    saveStudent(studentData);
    loadStudents();
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      deleteStudent(id);
      loadStudents();
    }
  };

  const handleDataFromGithub = () => {
    loadStudents();
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFiliere = !filterFiliere || student.filiere === filterFiliere;
    return matchesSearch && matchesFiliere;
  });

  const stats = {
    total: students.length,
    moyenne: students.length > 0 
      ? (students.reduce((acc, s) => acc + (s.moyenne || 0), 0) / students.length).toFixed(2)
      : 0,
    filieres: [...new Set(students.map(s => s.filiere).filter(Boolean))]
  };

  return (
    <>
      <style>{`
        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: #f4f7fc;
          min-height: 100vh;
        }

        /* Header avec effet glass */
        .dashboard-header {
          text-align: center;
          margin-bottom: 3rem;
          padding: 3rem 2rem;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px);
          border-radius: 32px;
          box-shadow: 0 20px 40px -10px rgba(0, 20, 30, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .dashboard-header h1 {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          font-size: 1.2rem;
          color: #4a5568;
          opacity: 0.8;
        }

        /* Section GitHub */
        .github-section {
          margin-bottom: 2.5rem;
        }

        /* Cartes de statistiques */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          background: white;
          padding: 1.8rem;
          border-radius: 24px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          box-shadow: 0 8px 20px -6px rgba(0, 32, 64, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: default;
          border: 1px solid rgba(0,0,0,0.02);
        }

        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 30px -8px rgba(30, 60, 114, 0.3);
        }

        .stat-icon {
          font-size: 2.8rem;
          background: linear-gradient(145deg, #eef2f6, white);
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 2.2rem;
          font-weight: 700;
          color: #1e3c72;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.95rem;
          color: #5a6a7e;
          letter-spacing: 0.3px;
        }

        /* Barre de contrôle */
        .controls-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .search-wrapper {
          flex: 2;
          display: flex;
          align-items: center;
          background: white;
          border-radius: 60px;
          padding: 0 1.2rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
          border: 1px solid #e2e8f0;
          transition: box-shadow 0.2s, border-color 0.2s;
        }

        .search-wrapper:focus-within {
          box-shadow: 0 8px 20px rgba(30, 60, 114, 0.12);
          border-color: #1e3c72;
        }

        .search-icon {
          font-size: 1.3rem;
          color: #8a9bb5;
          margin-right: 0.5rem;
        }

        .search-input {
          flex: 1;
          padding: 1rem 0;
          border: none;
          background: transparent;
          font-size: 1rem;
          outline: none;
          color: #1e293b;
        }

        .filter-select {
          flex: 1;
          padding: 0 1.2rem;
          border: 1px solid #e2e8f0;
          border-radius: 60px;
          font-size: 1rem;
          background: white;
          color: #1e293b;
          cursor: pointer;
          outline: none;
          transition: box-shadow 0.2s, border-color 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234a5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1.2rem center;
          background-size: 1.2rem;
        }

        .filter-select:focus {
          border-color: #1e3c72;
          box-shadow: 0 8px 20px rgba(30, 60, 114, 0.12);
        }

        .add-button {
          padding: 0.8rem 2rem;
          background: linear-gradient(145deg, #1e3c72, #2b4b8f);
          color: white;
          border: none;
          border-radius: 60px;
          font-weight: 600;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          box-shadow: 0 8px 18px -6px #1e3c72;
          transition: transform 0.15s, box-shadow 0.15s;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .add-button:hover {
          transform: scale(1.02);
          box-shadow: 0 12px 24px -6px #1e3c72;
        }

        .add-icon {
          font-size: 1.6rem;
          line-height: 1;
        }

        /* Modale */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 20, 40, 0.6);
          backdrop-filter: blur(6px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.2s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          position: relative;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-radius: 32px;
          box-shadow: 0 30px 60px rgba(0, 20, 40, 0.5);
          border: 1px solid rgba(255,255,255,0.5);
          animation: slideUp 0.25s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .close-button {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0,0,0,0.05);
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #2d3e5f;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 10;
        }

        .close-button:hover {
          background: rgba(0,0,0,0.1);
        }

        /* Grille des étudiants */
        .student-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.8rem;
          margin-top: 2rem;
        }

        /* État vide */
        .empty-state {
          text-align: center;
          padding: 5rem 2rem;
          background: white;
          border-radius: 32px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.02);
          border: 1px solid #edf2f7;
        }

        .empty-icon {
          font-size: 5rem;
          display: block;
          margin-bottom: 1.5rem;
          opacity: 0.7;
        }

        .empty-state h3 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #1e3c72;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: #64748b;
          font-size: 1.1rem;
        }
      `}</style>

      <div className="dashboard-container">
        {/* En-tête */}
        <div className="dashboard-header">
          <h1>📚 Tableau de bord étudiant</h1>
          <p>Gérez vos étudiants en un clin d'œil</p>
        </div>

        {/* Section GitHub */}
        <div className="github-section">
          <GithubDownloader onDataLoaded={handleDataFromGithub} />
        </div>

        {/* Statistiques */}
        {students.length > 0 && (
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">👥</span>
              <div className="stat-info">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Total étudiants</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">📊</span>
              <div className="stat-info">
                <span className="stat-value">{stats.moyenne}/20</span>
                <span className="stat-label">Moyenne générale</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🎓</span>
              <div className="stat-info">
                <span className="stat-value">{stats.filieres.length}</span>
                <span className="stat-label">Filières</span>
              </div>
            </div>
          </div>
        )}

        {/* Barre de contrôle */}
        <div className="controls-bar">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Rechercher un étudiant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={filterFiliere}
            onChange={(e) => setFilterFiliere(e.target.value)}
            className="filter-select"
          >
            <option value="">Toutes les filières</option>
            {stats.filieres.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          <button onClick={() => setShowForm(true)} className="add-button">
            <span className="add-icon">+</span>
            Ajouter
          </button>
        </div>

        {/* Modal */}
        {(showForm || editingStudent) && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="close-button"
                onClick={() => {
                  setShowForm(false);
                  setEditingStudent(null);
                }}
              >
                ×
              </button>
              <StudentForm
                student={editingStudent}
                onSubmit={handleSaveStudent}
                onCancel={() => {
                  setShowForm(false);
                  setEditingStudent(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Liste des étudiants */}
        <div>
          {filteredStudents.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📭</span>
              <h3>Aucun étudiant trouvé</h3>
              <p>
                {students.length === 0
                  ? "Téléchargez des données depuis GitHub ou ajoutez votre premier étudiant !"
                  : "Aucun résultat ne correspond à votre recherche"}
              </p>
            </div>
          ) : (
            <div className="student-grid">
              {filteredStudents.map(student => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onEdit={(s) => {
                    setEditingStudent(s);
                    setShowForm(true);
                  }}
                  onDelete={handleDeleteStudent}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentList;