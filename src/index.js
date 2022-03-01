const express = require("express");
const { v4: uuid } = require("uuid");
const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => { // listar repository
  return response.json(repositories);
});

app.post("/repositories", (request, response) => { //Create repository
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs: [...techs],
    likes: 0
  };
  

  repositories.push(repository)
 

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  let { title, url, techs } = request.body;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  if(!url){
    url = repositories[repositoryIndex].url
  }
  if(!title){
    title = repositories[repositoryIndex].title
  }
  if(!techs){
   techs = repositories[repositoryIndex].techs
  }

  const updatedRepository = {
    title: title,
    url: url,
    techs: [...techs],
    likes: 0
  }

  const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  repositories[repositoryIndex] = repository;

  return response.status(201).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes

  

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
