import { useState } from 'react';
import Notification from "./Notifications.jsx";

const CreateBlogForm = ({ handleCreate, user }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

  const submit = (event) => {
    event.preventDefault();
    handleCreate({ title, author, url }, user.token);
    setTitle('');
    setAuthor('');
    setUrl('');
    setNotificationMessage(`A new blog ${title} by ${author} added`);
    setTimeout(() => {
      setNotificationMessage(null); // Clear the error message after 5 seconds
    }, 5000);
  };

  return (
    <div>
      <Notification className="notification" message={notificationMessage} />
      <h2>Create new Blog</h2>
      <form onSubmit={submit}>
        <div>
          Title
          <br></br>
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <br></br>
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL
          <br></br>
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;