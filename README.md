# 🌐 VibeNote — Micro Blogging App

A simple Express + EJS micro-blogging app (server-rendered) for creating, viewing, editing and deleting short posts. Built as a learning project to demonstrate CRUD routing, EJS view templates, serving static assets, and method override for HTML form method spoofing.

---

## Demo

This project runs locally. After installing, start the server and open `http://localhost:3000/post` in your browser to see the listing page.

---

## Features

* Create new posts (username + content)
* Read/list all posts
* View post details
* Edit existing posts (PATCH via method-override)
* Delete posts (DELETE via method-override)
* Simple client-side confirmation dialogs using SweetAlert2
* Server-rendered HTML with EJS templates

---

## Project Structure (important files)

```
/vibenote (root)
│
├─ index.js              # main Express app
├─ package.json
├─ /views                # EJS templates
│   ├─ index.ejs         # list of posts
│   ├─ new.ejs           # form to create new post
│   ├─ edit.ejs          # form to edit a post
│   └─ show.ejs          # single post detail
├─ /public               # static assets
│   └─ style.css
└─ README.md             # this file
```

---

## Dependencies

Make sure you have Node.js installed (v14+ recommended). The project uses these packages:

* express
* ejs
* uuid
* method-override
* sweetalert2 (client-side loaded via CDN in views)

These are declared in `package.json` (example below). If you don't have a `package.json`, run `npm init -y` and install the packages listed in the Installation section.

---

## Installation & Setup

1. Clone the repo (or copy files) to your local machine.

```bash
git clone <repo-url>
cd vibenote
```

2. Install dependencies

```bash
npm install express ejs uuid method-override
```

3. Start the app

```bash
node index.js
```

4. Open in browser

```
http://localhost:3000/post
```

> Note: The app uses an in-memory `posts` array in `index.js`. Data will be lost when the server restarts.

---

## Available Routes (summary)

| Method | Path             | Purpose                         |
| ------ | ---------------- | ------------------------------- |
| GET    | `/post`          | List all posts (index.ejs)      |
| GET    | `/post/new`      | Form to create a new post       |
| POST   | `/posts`         | Create post (form action)       |
| GET    | `/post/:id`      | Show a single post (show.ejs)   |
| GET    | `/post/:id/edit` | Show edit form for a post       |
| PATCH  | `/post/:id`      | Update a post (method-override) |
| DELETE | `/post/:id`      | Delete a post (method-override) |

**Important**: Because HTML forms only support `GET` and `POST`, `method-override` is used in the forms to simulate `PATCH` and `DELETE`. The code is configured to look for a query parameter `_method` (example: `action="/post/<%=post.id%>?_method=DELETE"`).

---

## Code Highlights & Notes

* `index.js` sets up the Express app and uses `express.urlencoded({ extended: true })` to parse form data.
* `uuidv4()` is used to generate unique `id` values for posts.
* Views are implemented with simple EJS templates in `/views`.
* Static files are served from `/public` (`app.use(express.static(path.join(__dirname, 'public')))`).
* SweetAlert2 is used in `index.ejs` and `new.ejs` for nicer client-side dialogs. They are loaded via CDN.

---

## Troubleshooting

* `Method not allowed` / `404` on edit/delete: Ensure your form URLs include `?_method=PATCH` or `?_method=DELETE` and `app.use(methodOverride('_method'))` is present before your route definitions.
* Styles not loading: Confirm that `app.use(express.static(path.join(__dirname,"public")))` is present and that your `<link rel="stylesheet" href="style.css">` path in the EJS templates is correct. Because static middleware serves from `/public`, `href="/style.css"` or `href="style.css"` will both work when the HTML is served from the root.
* Data disappears after restart: This is expected — the app stores posts in a local array. Use a database (e.g., SQLite, MongoDB, or PostgreSQL) for persistence.

---

## Possible Improvements / Next Steps

* Persist data with a database (MongoDB, SQLite, PostgreSQL).
* Add user authentication (login) and associate posts to real users.
* Validate and sanitize inputs on server-side to prevent XSS.
* Add pagination and timestamps for posts.
* Improve styling and responsive layout (use a CSS framework like Tailwind or Bootstrap).
* Add unit/integration tests (Jest, Supertest).
* Replace inline `localhost:3000` links in the templates with relative URLs (e.g., `/post/<%=post.id%>`) to make deployment easier.

---

## Quick Tips & Best Practices

* Replace hard-coded absolute links (e.g. `http://localhost:3000/post/<%=post.id%>`) with relative paths (`/post/<%=post.id%>`) so the app works in different environments.
* Escape user-provided content if you render HTML directly. EJS escapes by default when using `<%= %>`, but be mindful if you switch to `<%- %>` which renders unescaped HTML.

---
