// src/components/StudentCard.js
import React from 'react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  const getMoyenneColor = (moyenne) => {
    if (moyenne >= 16) return '#4CAF50';
    if (moyenne >= 12) return '#2196F3';
    if (moyenne >= 10) return '#FF9800';
    return '#f44336';
  };

  return (
    <>
      <style>{`
        .student-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 8px 20px -6px rgba(0, 32, 64, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid rgba(0, 0, 0, 0.02);
          font-family: 'Inter', sans-serif;
        }
        .student-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 30px -8px rgba(30, 60, 114, 0.3);
        }
        .student-card-header {
          padding: 1.5rem;
          background: linear-gradient(145deg, #1e3c72, #2a5298);
          color: white;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .student-card-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 600;
          backdrop-filter: blur(4px);
          border: 2px solid rgba(255,255,255,0.3);
        }
        .student-card-header-info {
          flex: 1;
        }
        .student-card-name {
          margin: 0 0 0.3rem 0;
          font-size: 1.3rem;
          font-weight: 600;
          letter-spacing: -0.3px;
        }
        .student-card-filiere {
          display: inline-block;
          padding: 0.3rem 1rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          border-radius: 40px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .student-card-body {
          padding: 1.5rem;
        }
        .student-card-info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #edf2f7;
        }
        .student-card-info-label {
          color: #64748b;
          font-size: 0.9rem;
        }
        .student-card-info-value {
          color: #1e293b;
          font-weight: 500;
        }
        .student-card-moyenne-container {
          margin-top: 1rem;
        }
        .student-card-moyenne-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .student-card-moyenne-label {
          color: #64748b;
          font-size: 0.9rem;
        }
        .student-card-moyenne-value {
          font-weight: 700;
          font-size: 1.1rem;
        }
        .student-card-progress-bar {
          height: 8px;
          background: #e9edf4;
          border-radius: 20px;
          overflow: hidden;
        }
        .student-card-progress-fill {
          height: 100%;
          transition: width 0.3s ease;
        }
        .student-card-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          padding: 1rem 1.5rem 1.5rem;
        }
        .student-card-btn {
          padding: 0.8rem 0;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .student-card-btn-edit {
          background: linear-gradient(145deg, #1e3c72, #2b4b8f);
          color: white;
          box-shadow: 0 8px 18px -6px #1e3c72;
        }
        .student-card-btn-delete {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fee2e2;
        }
        .student-card-btn:hover {
          transform: scale(1.02);
        }
        .student-card-btn-edit:hover {
          box-shadow: 0 12px 24px -6px #1e3c72;
        }
        .student-card-btn-delete:hover {
          background: #fee2e2;
        }
      `}</style>

      <div className="student-card">
        <div className="student-card-header">
          <div className="student-card-avatar">
            {student.name?.charAt(0).toUpperCase()}
          </div>
          <div className="student-card-header-info">
            <h3 className="student-card-name">{student.name}</h3>
            <span className="student-card-filiere">{student.filiere}</span>
          </div>
        </div>

        <div className="student-card-body">
          <div className="student-card-info-row">
            <span className="student-card-info-label">📧 Email</span>
            <span className="student-card-info-value">{student.email}</span>
          </div>
          
          <div className="student-card-info-row">
            <span className="student-card-info-label">🎂 Âge</span>
            <span className="student-card-info-value">{student.age} ans</span>
          </div>

          <div className="student-card-moyenne-container">
            <div className="student-card-moyenne-header">
              <span className="student-card-moyenne-label">Moyenne</span>
              <span
                className="student-card-moyenne-value"
                style={{ color: getMoyenneColor(student.moyenne) }}
              >
                {student.moyenne}/20
              </span>
            </div>
            <div className="student-card-progress-bar">
              <div
                className="student-card-progress-fill"
                style={{
                  width: `${(student.moyenne / 20) * 100}%`,
                  backgroundColor: getMoyenneColor(student.moyenne)
                }}
              />
            </div>
          </div>
        </div>

        <div className="student-card-footer">
          <button
            onClick={() => onEdit(student)}
            className="student-card-btn student-card-btn-edit"
          >
            ✏️ Modifier
          </button>
          <button
            onClick={() => onDelete(student.id)}
            className="student-card-btn student-card-btn-delete"
          >
            🗑️ Supprimer
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentCard;