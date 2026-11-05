import React from 'react';
import { ListGroup, Button, Badge } from 'react-bootstrap';

function TaskList({ tasks, deleteTask, editTask, toggleComplete }) {
  if (tasks.length === 0) {
    return <p className="text-center text-muted mt-4">Belum ada tugas yang ditambahkan.</p>;
  }

  // Nentokake warna badge prioritas miturut modul (Merah: High, Kuning: Medium, Hijau: Low)
  const getBadgeColor = (priority) => {
    switch (priority) {
      case 'High': return 'danger';   // Abang
      case 'Medium': return 'warning'; // Kuning
      case 'Low': return 'success';    // Ijo
      default: return 'secondary';
    }
  };

  return (
    <ListGroup>
      {tasks.map((task) => (
        <ListGroup.Item
          key={task.id}
          className="d-flex justify-content-between align-items-center mb-2 rounded shadow-sm"
        >
          <div className="d-flex align-items-center">
            {/* Indikator Status / Checkbox */}
            <input
              type="checkbox"
              className="form-check-input me-3"
              checked={task.completed || false}
              onChange={() => toggleComplete(task.id)}
              style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
            />
            {/* Teks Tugas (Coret yen wis rampung) */}
            <span style={{ 
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#6c757d' : '#000',
              fontWeight: '500'
            }}>
              {task.text}
            </span>
            {/* Badge Warna Prioritas */}
            <Badge bg={getBadgeColor(task.priority)} className="ms-3 px-2 py-1">
              {task.priority || 'Medium'}
            </Badge>
          </div>

          <div>
            {/* Tombol Aksi Edit & Delete */}
            <Button
              variant="outline-warning"
              size="sm"
              className="me-2"
              onClick={() => editTask(task)}
            >
              ✏️ Edit
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => deleteTask(task.id)}
            >
              🗑️ Hapus
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TaskList;