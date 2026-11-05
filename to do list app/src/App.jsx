import React, { useState } from 'react';
import { Container, Card, Form, Button, ListGroup, Badge, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    if (editId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editId ? { ...task, text: taskText, priority: priority } : task
        )
      );
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: taskText,
        priority: priority,
        completed: false
      };
      setTasks([...tasks, newTask]);
    }

    setTaskText('');
    setPriority('Medium');
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setTaskText(task.text);
    setPriority(task.priority);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editId === id) {
      setEditId(null);
      setTaskText('');
      setPriority('Medium');
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getBadgeColor = (p) => {
    if (p === 'High') return 'danger';
    if (p === 'Medium') return 'warning';
    return 'success';
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div style={{ width: '100%', maxWidth: '650px' }}>
        <Card className="p-4 shadow border-0">
          <h2 className="text-center mb-4 fw-bold text-primary">Task List CRUD React</h2>
          
          <Form onSubmit={handleSubmit} className="mb-4">
            <Row className="g-2">
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="Tulis kegiatan atau tugas baru..."
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="High">High (Tinggi)</option>
                  <option value="Medium">Medium (Sedang)</option>
                  <option value="Low">Low (Rendah)</option>
                </Form.Select>
              </Col>
            </Row>
            <Button variant={editId !== null ? "success" : "primary"} type="submit" className="w-100 mt-3">
              {editId !== null ? 'Update Tugas' : '+ Tambah Tugas'}
            </Button>
          </Form>

          <ListGroup>
            {tasks.length === 0 ? (
              <p className="text-center text-muted py-3">Belum ada tugas yang ditambahkan.</p>
            ) : (
              tasks.map((task) => (
                <ListGroup.Item
                  key={task.id}
                  className="d-flex justify-content-between align-items-center mb-2 rounded shadow-sm border"
                >
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="form-check-input me-3"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                    />
                    <span style={{ 
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? '#6c757d' : '#000',
                      fontWeight: '500'
                    }}>
                      {task.text}
                    </span>
                    <Badge bg={getBadgeColor(task.priority)} className="ms-3 px-2 py-1">
                      {task.priority}
                    </Badge>
                  </div>

                  <div>
                    <Button 
                      variant="outline-warning" 
                      size="sm" 
                      className="me-2" 
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => deleteTask(task.id)}
                    >
                      Hapus
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Card>
      </div>
    </Container>
  );
}

export default App;