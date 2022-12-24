const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updateAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter(({ id: noteId }) => id === noteId).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Note saved successfully',
      data: {
        noteId: id,
      },
    });
    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to save note',
  });
  response.code(500);
  return response;
};

module.exports = { addNoteHandler };
