import React, { useState, useEffect } from "react";

const COURSES_KEY = "focusflow_courses_v1";

function loadCourses() {
  try {
    const raw = localStorage.getItem(COURSES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveCourses(c) {
  localStorage.setItem(COURSES_KEY, JSON.stringify(c));
}
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export default function Courses() {
  const [courses, setCourses] = useState(() => loadCourses());
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialUrl, setMaterialUrl] = useState("");

  useEffect(() => {
    saveCourses(courses);
  }, [courses]);

  const addCourse = () => {
    const t = title.trim();
    if (!t) return;
    const newC = { id: uid(), title: t, description: desc.trim(), materials: [], createdAt: Date.now() };
    setCourses([newC, ...courses]);
    setTitle("");
    setDesc("");
  };

  const removeCourse = (id) => {
    if (!confirm("Biztosan törlöd a tantárgyat?")) return;
    setCourses(courses.filter((c) => c.id !== id));
    if (selectedCourseId === id) setSelectedCourseId(null);
  };

  const addMaterial = (courseId) => {
    const mt = materialTitle.trim();
    if (!mt) return;
    const material = { id: uid(), title: mt, url: materialUrl.trim(), createdAt: Date.now() };
    setCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, materials: [...c.materials, material] } : c)));
    setMaterialTitle("");
    setMaterialUrl("");
  };

  const removeMaterial = (courseId, materialId) => {
    setCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, materials: c.materials.filter((m) => m.id !== materialId) } : c)));
  };

  // button styles
  const btnBase = {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    color: "white",
    cursor: "pointer",
  };
  const btnPrimary = { ...btnBase, background: "#0b7df0" }; // kék a Hozzáad-hoz
  const btnDanger = { ...btnBase, background: "#7f1d1d" }; // törléshez
  const smallBtnBase = { padding: "6px 8px", borderRadius: 6, border: "none", cursor: "pointer", color: "white" };

  return (
    <section style={{ padding: 20, color: "white" }}>
      <h1>Tantárgyak</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Új tantárgy neve"
          style={{ padding: 8, borderRadius: 6 }}
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Rövid leírás (opcionális)"
          style={{ padding: 8, borderRadius: 6 }}
        />
        <button onClick={addCourse} style={btnPrimary}>
          Hozzáad
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {courses.map((c) => (
          <div
            key={c.id}
            style={{
              background: "#0f1724",
              padding: 12,
              borderRadius: 10,
              minHeight: 140,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>{c.title}</h3>
              {c.description && <p style={{ margin: "6px 0 0", color: "#9ca3af" }}>{c.description}</p>}
            </div>

            <div style={{ marginTop: 10 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setSelectedCourseId(selectedCourseId === c.id ? null : c.id)}
                  style={{ ...smallBtnBase, background: "#111836" }}
                >
                  Tananyag
                </button>
                <button onClick={() => removeCourse(c.id)} style={{ ...smallBtnBase, ...btnDanger }}>
                  Töröl
                </button>
              </div>

              {selectedCourseId === c.id && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <input
                      value={materialTitle}
                      onChange={(e) => setMaterialTitle(e.target.value)}
                      placeholder="Tananyag címe"
                      style={{ padding: 6, borderRadius: 6, flex: 1 }}
                    />
                    <input
                      value={materialUrl}
                      onChange={(e) => setMaterialUrl(e.target.value)}
                      placeholder="URL (opcionális)"
                      style={{ padding: 6, borderRadius: 6, width: 160 }}
                    />
                    <button onClick={() => addMaterial(c.id)} style={{ ...smallBtnBase, background: "#0b7df0" }}>
                      Hozzáad
                    </button>
                  </div>

                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {c.materials.length === 0 && <li style={{ color: "#9ca3af" }}>Nincs tananyag</li>}
                    {c.materials.map((m) => (
                      <li key={m.id} style={{ marginBottom: 6, display: "flex", justifyContent: "space-between", gap: 8 }}>
                        <div>
                          {m.url ? (
                            <a href={m.url} target="_blank" rel="noreferrer" style={{ color: "#60a5fa" }}>
                              {m.title}
                            </a>
                          ) : (
                            <span>{m.title}</span>
                          )}
                        </div>
                        <div>
                          <button onClick={() => removeMaterial(c.id, m.id)} style={{ ...smallBtnBase, ...btnDanger }}>
                            Töröl
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
