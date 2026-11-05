import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

function TaskForm({ addTask, updateTask, currentTask, setCurrentTask }) {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    if (currentTask) {
      setTaskText(currentTask.text);
      setPriority(currentTask.priority || 'Medium');
    } else {
      setTaskText('');
      setPriority('Medium');
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    if (currentTask) {
      updateTask(currentTask.id, taskText, priority);
    } else {
      addTask(taskText, priority);
    }
    setTaskText('');
    setPriority('Medium');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
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
          <Form.Select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Form.Select>
        </Col>
      </Row>
      <Button variant="primary" type="submit" className="w-100 mt-3">
        {currentTask ? 'Update Tugas' : '+ Add Task'}
      </Button>
    </Form>
  );
}

export default TaskForm;