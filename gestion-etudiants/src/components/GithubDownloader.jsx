// src/components/GithubDownloader.js
import React, { useState } from 'react';

const GithubDownloader = ({ onDataLoaded }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [githubUrl, setGithubUrl] = useState('https://raw.githubusercontent.com/ablayefaye04/BD-react/main/data.json');

  const handleDownload = async () => {
    if (!githubUrl) {
      setError('Veuillez entrer l\'URL GitHub');
      return;
    }

    setLoading(true);
    setProgress(0);
    setError(null);
    setSuccess(false);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch(githubUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      let students = [];
      if (data.students && Array.isArray(data.students)) {
        students = data.students;
      } else if (Array.isArray(data)) {
        students = data;
      } else {
        throw new Error('Format de données invalide');
      }

      const validStudents = students.filter(s => 
        s.name && s.email && s.age && s.filiere && s.moyenne !== undefined
      );

      if (validStudents.length === 0) {
        throw new Error('Aucun étudiant valide trouvé');
      }

      const studentsWithIds = validStudents.map((s, index) => ({
        ...s,
        id: s.id || Date.now() + index + Math.random()
      }));

      setProgress(100);
      localStorage.setItem('students', JSON.stringify(studentsWithIds));
      onDataLoaded(studentsWithIds);
      setSuccess(true);
      setTimeout(() => {
        setProgress(0);
        setSuccess(false);
      }, 3000);

    } catch (err) {
      setError(`Échec du téléchargement: ${err.message}`);
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const setDefaultUrl = () => {
    setGithubUrl('https://raw.githubusercontent.com/ablayefaye04/BD-react/main/data.json');
  };

  return (
    <>
      <style>{`
        .github-card {
          background: white;
          border-radius: 24px;
          padding: 1.8rem;
          box-shadow: 0 8px 20px -6px rgba(0, 32, 64, 0.1);
          border: 1px solid rgba(0,0,0,0.02);
          font-family: 'Inter', sans-serif;
        }
        .github-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .github-icon {
          font-size: 2.5rem;
          background: linear-gradient(145deg, #eef2f6, white);
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
        }
        .github-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1e3c72;
          margin: 0 0 0.2rem 0;
        }
        .github-description {
          color: #5a6a7e;
          font-size: 0.9rem;
          margin: 0;
        }
        .input-group {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }
        .github-input {
          flex: 1;
          padding: 0.9rem 1.2rem;
          border: 2px solid #e9edf4;
          border-radius: 40px;
          font-size: 0.95rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          background: white;
        }
        .github-input:focus {
          border-color: #1e3c72;
          box-shadow: 0 8px 20px rgba(30, 60, 114, 0.12);
        }
        .github-button {
          padding: 0.9rem 2rem;
          background: linear-gradient(145deg, #1e3c72, #2b4b8f);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 8px 18px -6px #1e3c72;
          transition: transform 0.15s, box-shadow 0.15s;
          white-space: nowrap;
        }
        .github-button:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 12px 24px -6px #1e3c72;
        }
        .github-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .default-button {
          padding: 0.6rem 1.4rem;
          background: #f1f4f9;
          color: #2d3e5f;
          border: none;
          border-radius: 40px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
          margin-bottom: 1.2rem;
        }
        .default-button:hover:not(:disabled) {
          background: #e3e8f0;
        }
        .progress-container {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-top: 1rem;
        }
        .progress-bar {
          flex: 1;
          height: 8px;
          background: #e9edf4;
          border-radius: 20px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #1e3c72, #2a5298);
          transition: width 0.3s ease;
        }
        .progress-text {
          min-width: 45px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e3c72;
        }
        .message {
          margin-top: 1.2rem;
          padding: 1rem 1.2rem;
          border-radius: 18px;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        .message-error {
          background: #fff2f0;
          border: 1px solid #ffccc7;
          color: #b3403a;
        }
        .message-success {
          background: #e6f9ed;
          border: 1px solid #b7ebc0;
          color: #1e7b4c;
        }
        .message-icon {
          font-size: 1.5rem;
        }
        .message-title {
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .message-text {
          font-size: 0.9rem;
          margin: 0;
        }
        .hint {
          margin-top: 0.5rem;
          font-size: 0.85rem;
          opacity: 0.8;
        }
      `}</style>

      <div className="github-card">
        <div className="github-header">
          <span className="github-icon">📥</span>
          <div>
            <h3 className="github-title">Télécharger depuis GitHub</h3>
            <p className="github-description">
              Importez vos données depuis un fichier JSON
            </p>
          </div>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="https://raw.githubusercontent.com/..."
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="github-input"
            disabled={loading}
          />
          <button
            onClick={handleDownload}
            disabled={loading}
            className="github-button"
          >
            {loading ? 'Téléchargement...' : 'Télécharger'}
          </button>
        </div>

        <button
          onClick={setDefaultUrl}
          disabled={loading}
          className="default-button"
        >
          🔄 Utiliser l'URL par défaut
        </button>

        {progress > 0 && (
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="progress-text">{progress}%</span>
          </div>
        )}

        {error && (
          <div className="message message-error">
            <span className="message-icon">⚠️</span>
            <div>
              <div className="message-title">Erreur</div>
              <p className="message-text">{error}</p>
              <p className="hint">
                💡 Vérifiez que l'URL est correcte (format "Raw" de GitHub) et que le fichier est accessible publiquement.
              </p>
            </div>
          </div>
        )}

        {success && (
          <div className="message message-success">
            <span className="message-icon">✓</span>
            <div>
              <div className="message-title">Succès !</div>
              <p className="message-text">Données téléchargées et sauvegardées</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GithubDownloader;