import { useState } from 'react';
import { Box, Button, Container, Flex, Heading, IconButton, Input, List, ListItem, Text } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: input, isCompleted: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const handleCompleteTask = (id) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <Container maxW="container.md" p={5}>
      <Flex as="nav" justifyContent="space-between" alignItems="center" mb={5}>
        <Heading size="md">Todo App</Heading>
      </Flex>
      <Box as="main">
        <Flex mb={4}>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask} ml={2}>Add</Button>
        </Flex>
        <List spacing={3}>
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" alignItems="center" justifyContent="space-between">
              <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
              <Flex>
                <IconButton
                  icon={<FaCheck />}
                  aria-label="Complete Task"
                  onClick={() => handleCompleteTask(task.id)}
                  colorScheme={task.isCompleted ? 'green' : 'gray'}
                  mr={2}
                />
                <IconButton
                  icon={<FaTrash />}
                  aria-label="Delete Task"
                  onClick={() => handleDeleteTask(task.id)}
                  colorScheme="red"
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Index;