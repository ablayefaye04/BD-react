export const getStudents = () => {
  const students = localStorage.getItem('students');
  return students ? JSON.parse(students) : [];
};

export const saveStudent = (student) => {
  const students = getStudents();
  
  if (student.id) {
    const index = students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      students[index] = student;
    }
  } else {
    const newStudent = {
      ...student,
      id: Date.now()
    };
    students.push(newStudent);
  }
  
  localStorage.setItem('students', JSON.stringify(students));
  return students;
};

export const deleteStudent = (id) => {
  const students = getStudents();
  const filteredStudents = students.filter(s => s.id !== id);
  localStorage.setItem('students', JSON.stringify(filteredStudents));
  return filteredStudents;
};

export const loadFromGithub = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const students = Array.isArray(data) ? data : data.students;
    
    const studentsWithIds = students.map((s, index) => ({
      ...s,
      id: s.id || Date.now() + index
    }));
    
    localStorage.setItem('students', JSON.stringify(studentsWithIds));
    return studentsWithIds;
  } catch (error) {
    throw new Error('Erreur de chargement: ' + error.message);
  }
};