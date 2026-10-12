Tasty Foods — Simple Static Site

Files
- [index.html](index.html) — Main site
- [style.css](style.css) — Styles
- [script.js](script.js) — Client behavior (search, modal)
- [cal.c++](cal.c++) — Sample C++ calculator source (downloadable)

Open locally

- Open [index.html](index.html) directly in a browser (double-click).

Run a local server (recommended)

- Using Python 3:

```bash
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

- Using VS Code: install the Live Server extension and click "Go Live".

Build/compile `cal.c++`

```bash
g++ cal.c++ -o cal.exe
./cal.exe
```

Notes
- Images are loaded from Unsplash 'featured' queries and require internet access.
- To change food items, edit `script.js` and modify the `foods` array.
