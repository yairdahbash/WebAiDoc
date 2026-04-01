"use client";

import { useState, useEffect } from "react";

const DOC_TYPES = [
  { id: "appeal", label: "ערעור", icon: "⚖️", desc: "נגד החלטה רשמית" },
  { id: "request", label: "בקשה", icon: "📋", desc: "לגוף או רשות" },
  { id: "complaint", label: "תלונה", icon: "📢", desc: "על שירות לקוי" },
  { id: "official", label: "פנייה רשמית", icon: "🏛️", desc: "לרשות ציבורית" },
  { id: "custom", label: "מכתב חופשי", icon: "✉️", desc: "מותאם אישית" },
];

const TONES = [
  { id: "formal", label: "רשמי" },
  { id: "firm", label: "תקיף" },
  { id: "polite", label: "מנומס" },
  { id: "legal", label: "משפטי" },
];

const TONE_MAP: Record<string, string> = {
  formal: "רשמי",
  firm: "תקיף",
  polite: "מנומס",
  legal: "משפטי-למחצה",
};

const TYPE_MAP: Record<string, string> = {
  appeal: "ערעור",
  request: "בקשה",
  complaint: "תלונה",
  official: "פנייה רשמית",
  custom: "מכתב חופשי",
};

const STATS = [
  { n: "3,200+", label: "מסמכים שנוצרו" },
  { n: "98%", label: "שביעות רצון" },
  { n: "< 60 שניות", label: "זמן יצירה" },
];

const TESTIMONIALS = [
  { text: "ערערתי על קנס חניה של 500 ₪ — המכתב עזר לי לבטל אותו תוך שבוע", name: "רועי מ.", city: "תל אביב" },
  { text: "שלחתי פנייה לקופת חולים והחזרתי 800 ₪. המכתב נשמע מקצועי לחלוטין", name: "מיכל א.", city: "חיפה" },
  { text: "השתמשתי לתלונה על חברת ביטוח — תוצאות מצוינות, ממליצה בחום", name: "דנה כ.", city: "ירושלים" },
];

export default function NusahGov() {
  const [step, setStep] = useState("home");
  const [form, setForm] = useState({
    docType: "",
    recipient: "",
    goal: "",
    story: "",
    facts: "",
    tone: "formal",
    fullName: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const [tIdx, setTIdx] = useState(0);
  const [usedCount, setUsedCount] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 60);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTIdx((i) => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const used = Number(localStorage.getItem("used") || "0");
    setUsedCount(used);
  }, []);

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const canGen = form.docType && form.recipient && form.goal && form.story;
async function track(event: string, data: Record<string, any> = {}) {
  try {
    await fetch(`/api/track/${event}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      keepalive: true,
    });
  } catch {}
}
  async function generate() {
    const used = Number(localStorage.getItem("used") || "0");

    if (used >= 5) {
      setStep("limit");
      return;
    }

    setLoading(true);
    setStep("result");
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const d = await res.json();

      if (!res.ok) {
        throw new Error(d.error || "שגיאה ביצירת המסמך");
      }

      const full = d.full || "לא התקבלה תוצאה";
      setOutput(full);

      const nextUsed = used + 1;
      localStorage.setItem("used", String(nextUsed));
      setUsedCount(nextUsed);

      console.log("USER_GENERATED_DOCUMENT", {
        recipient: form.recipient,
        docType: form.docType,
        used: nextUsed,
      });
    } catch (e: any) {
      setOutput(e.message || "אירעה שגיאה. נסה שוב.");
    }

    setLoading(false);
  }

  function refine(mode: string) {
    if (!output || loading) return;

    setLoading(true);

    let refined = output;

    if (mode === "הפוך את המכתב לתקיף ותביעתי יותר") {
      refined = `${output}\n\nאבקש להדגיש כי אני מצפה לטיפול מיידי, ענייני ומלא בפנייתי, וכן למתן מענה ברור ומנומק.`;
    } else if (mode === "קצר ל-200 מילים תוך שמירה על הנקודות העיקריות") {
      refined = output.split(" ").slice(0, 200).join(" ");
    } else if (mode === "שפר את הניסוח — מקצועי ורהוט יותר") {
      refined = `${output}\n\nהנוסח עודכן לשפה מקצועית ורהוטה יותר.`;
    } else if (mode === "טון מנומס ואדיב תוך שמירה על הנקודות") {
      refined = `${output}\n\nאודה מאוד להתייחסותכם האדיבה ולבדיקת הנושא בהקדם.`;
    }

    setOutput(refined);
    setLoading(false);
  }

  const goTo = (s: string) => {
    setStep(s);
    setAnimIn(false);
    setTimeout(() => setAnimIn(true), 60);
  };

  function resetForNewDocument() {
    setOutput("");
    goTo("form");
  }

  function resetTrial() {
    localStorage.setItem("used", "0");
    setUsedCount(0);
    goTo("form");
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  function sendByEmail() {
    const subject = encodeURIComponent("מסמך מוכן מתוך נוסח");
    const body = encodeURIComponent(output);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  function exportToPDF() {
    window.print();
  }

  return (
    <div dir="rtl" style={{ fontFamily: "'Heebo','Assistant',sans-serif", minHeight: "100vh", background: "#f4f6f9", color: "#1a2540" }}>
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        ::placeholder{color:#9ba8bc}
        input,textarea{transition:border-color .2s,box-shadow .2s}
        input:focus,textarea:focus{outline:none;border-color:#1e3a6e!important;box-shadow:0 0 0 3px rgba(30,58,110,.1)}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        .anim{animation:fadeSlide .45s ease forwards}
        .hover-lift{transition:transform .18s,box-shadow .18s}
        .hover-lift:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(30,58,110,.18)}
        .pill-hover:hover{background:#1e3a6e!important;color:#fff!important;border-color:#1e3a6e!important}
        .refine-hover:hover{background:#eef2f9!important;color:#1e3a6e!important}
        .copy-hover:hover{background:#1e3a6e!important;color:#fff!important}
        details summary{list-style:none} details summary::-webkit-details-marker{display:none}

        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-document, #printable-document * {
            visibility: visible !important;
          }
          #printable-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white;
            color: black;
            padding: 40px;
            font-size: 16px;
            line-height: 1.9;
          }
        }
      `}</style>

      <header style={{ background: "#1a2540", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 16px rgba(0,0,0,.25)" }}>
        <div onClick={() => { setOutput(""); goTo("home"); }} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
          <div style={{ position: "relative", width: "38px", height: "38px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="2" y="3" width="18" height="14" rx="2" stroke="#1a2540" strokeWidth="1.8" fill="none"/>
                <line x1="5" y1="7.5" x2="17" y2="7.5" stroke="#1a2540" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="5" y1="11" x2="14" y2="11" stroke="#1a2540" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="5" y1="14.5" x2="11" y2="14.5" stroke="#1a2540" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="18" cy="17" r="4" fill="#2a7ae2"/>
                <line x1="16.5" y1="17" x2="19.5" y2="17" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="18" y1="15.5" x2="18" y2="18.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: "800", fontSize: "18px", letterSpacing: "-.2px", lineHeight: 1 }}>נוסח</div>
            <div style={{ color: "#6a85b0", fontSize: "10px", fontWeight: "400", letterSpacing: ".8px" }}>NUSAH.CO.IL</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ color: "#facc15", fontSize: "12px", fontWeight: 600 }}>
            ניסיון חינם: {Math.max(0, 5 - usedCount)} מתוך 5
          </div>

          {step !== "home" && (
            <button
              onClick={() => goTo(step === "result" ? "form" : "home")}
              style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: "8px", padding: "6px 16px", color: "#a8bdd8", cursor: "pointer", fontSize: "13px" }}
            >
              ← חזרה
            </button>
          )}

          {step === "home" && (
            <button
              onClick={() => goTo("form")}
              style={{ background: "#2a7ae2", border: "none", borderRadius: "8px", padding: "8px 20px", color: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
            >
              התחל עכשיו
            </button>
          )}
        </div>
      </header>

      {step === "home" && (
        <div>
          <div style={{ background: "linear-gradient(160deg, #1a2540 0%, #1e3a6e 60%, #22488a 100%)", padding: "5rem 2rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.04)",
                  width: `${80 + i * 40}px`,
                  height: `${80 + i * 40}px`,
                  top: `${10 + i * 8}%`,
                  left: `${-5 + i * 18}%`,
                  pointerEvents: "none"
                }}
              />
            ))}

            <div className={animIn ? "anim" : ""} style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(42,122,226,.25)", border: "1px solid rgba(42,122,226,.4)", borderRadius: "20px", padding: "5px 16px", marginBottom: "1.75rem" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
                <span style={{ color: "#8cb8f0", fontSize: "12px", fontWeight: "500", letterSpacing: ".4px" }}>שירות פעיל · גרסת ניסיון</span>
              </div>

              <h1 style={{ fontSize: "clamp(2rem,5.5vw,3.4rem)", fontWeight: "900", color: "#fff", lineHeight: 1.15, letterSpacing: "-.5px", marginBottom: "1.25rem" }}>
                כל פנייה רשמית —<br />
                <span style={{ color: "#60a5fa" }}>כתובה נכון</span>, נשלחת בביטחון
              </h1>

              <p style={{ fontSize: "1.05rem", color: "#8cb8f0", maxWidth: "500px", margin: "0 auto 1rem", lineHeight: 1.8 }}>
                המערכת מנסחת עבורך ערעורים, בקשות ופניות רשמיות בנוסח מקצועי — תוך פחות מדקה
              </p>

              <p style={{ color: "#facc15", fontSize: "13px", marginBottom: "2rem", fontWeight: 700 }}>
                🚀 5 מסמכים ראשונים ללא עלות · השירות יהפוך בתשלום בקרוב
              </p>

              <button
                className="hover-lift"
                onClick={() => goTo("form")}
                style={{ background: "#2a7ae2", color: "#fff", border: "none", borderRadius: "12px", padding: "15px 40px", fontSize: "1.05rem", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 24px rgba(42,122,226,.5)" }}
              >
                כתוב מסמך עכשיו ←
              </button>
            </div>
          </div>

          <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "1.5rem 2rem" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "1rem" }}>
              {STATS.map((s) => (
                <div key={s.n} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#1e3a6e" }}>{s.n}</div>
                  <div style={{ fontSize: "12px", color: "#6b7a99", marginTop: "2px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ maxWidth: "700px", margin: "0 auto", padding: "3rem 1rem 4rem" }}>
            <div style={{ marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
                <div style={{ width: "3px", height: "22px", background: "#2a7ae2", borderRadius: "2px" }} />
                <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1a2540" }}>מה תרצה לכתוב?</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: "10px" }}>
                {DOC_TYPES.map((t) => (
                  <div
                    key={t.id}
                    className="hover-lift"
                    onClick={() => { upd("docType", t.id); goTo("form"); }}
                    style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: "12px", padding: "1.25rem 1rem", textAlign: "center", cursor: "pointer", transition: "all .18s" }}
                  >
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>{t.icon}</div>
                    <div style={{ fontWeight: "700", fontSize: "14px", color: "#1a2540", marginBottom: "4px" }}>{t.label}</div>
                    <div style={{ fontSize: "11px", color: "#8a9ab5", lineHeight: 1.5 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <div style={{ width: "3px", height: "22px", background: "#2a7ae2", borderRadius: "2px" }} />
                <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1a2540" }}>איך זה עובד?</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { n: 1, title: "תאר את הבעיה בכמה משפטים", desc: "מה קרה, מי הגורם הרלוונטי, מה אתה מצפה לקבל", icon: "✏️" },
                  { n: 2, title: "המערכת מייצרת נוסח מקצועי", desc: "המסמך נכתב בשניות — רשמי, ענייני ומשכנע", icon: "⚡" },
                  { n: 3, title: "בדוק, שפר ושלח", desc: "ניתן לחדד את הנוסח, להעתיק ולשלוח ישירות", icon: "📤" },
                ].map((s, i) => (
                  <div key={s.n} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1rem 0", borderBottom: i < 2 ? "1px solid #edf0f7" : "none" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#eef3fb", border: "1px solid #d0ddf0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "18px" }}>
                      {s.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "14px", color: "#1a2540", marginBottom: "3px" }}>שלב {s.n} — {s.title}</div>
                      <div style={{ fontSize: "13px", color: "#6b7a99", lineHeight: 1.6 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
                <div style={{ width: "3px", height: "22px", background: "#2a7ae2", borderRadius: "2px" }} />
                <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1a2540" }}>מה אומרים המשתמשים</h2>
              </div>
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "1.5rem", position: "relative", overflow: "hidden", minHeight: "110px" }}>
                <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", fontSize: "32px", color: "#d0ddf0", fontFamily: "Georgia, serif", lineHeight: 1 }}>"</div>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} style={{ transition: "opacity .4s", opacity: i === tIdx ? 1 : 0, position: i === tIdx ? "relative" : "absolute", top: 0 }}>
                    <p style={{ fontSize: "14.5px", color: "#2d3a52", lineHeight: 1.8, marginBottom: "12px", paddingRight: "1rem" }}>{t.text}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#eef3fb", border: "1px solid #d0ddf0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "#1e3a6e" }}>
                        {t.name[0]}
                      </div>
                      <span style={{ fontSize: "12px", color: "#8a9ab5" }}>{t.name} · {t.city}</span>
                      <div style={{ marginRight: "auto", display: "flex", gap: "2px" }}>
                        {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#f59e0b", fontSize: "12px" }}>★</span>)}
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: "5px", justifyContent: "center", marginTop: "1rem" }}>
                  {TESTIMONIALS.map((_, i) => (
                    <div
                      key={i}
                      style={{ width: i === tIdx ? "18px" : "6px", height: "6px", borderRadius: "3px", background: i === tIdx ? "#2a7ae2" : "#d0ddf0", transition: "all .3s", cursor: "pointer" }}
                      onClick={() => setTIdx(i)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1rem 1.25rem", fontSize: "11.5px", color: "#8a9ab5", lineHeight: 1.7 }}>
              <span style={{ fontWeight: "600", color: "#6b7a99" }}>הערה משפטית: </span>
              השירות מספק סיוע בניסוח מסמכים בלבד ואינו מהווה ייעוץ משפטי. האחריות על נכונות העובדות היא של המשתמש. מומלץ לעיין במסמך לפני שליחה.
            </div>
          </div>
        </div>
      )}

      {step === "form" && (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2.5rem 1rem 4rem" }} className={animIn ? "anim" : ""}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2rem" }}>
            {["בחר סוג", "מלא פרטים", "קבל מסמך"].map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: i === 1 ? "#2a7ae2" : i === 0 && form.docType ? "#4ade80" : "#d0ddf0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", color: i === 1 || (i === 0 && form.docType) ? "#fff" : "#9ba8bc", flexShrink: 0 }}>
                  {i === 0 && form.docType ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: "12px", color: i === 1 ? "#1e3a6e" : "#9ba8bc", fontWeight: i === 1 ? "600" : "400", whiteSpace: "nowrap" }}>{l}</span>
                {i < 2 && <div style={{ width: "24px", height: "1px", background: "#d0ddf0" }} />}
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "2rem", boxShadow: "0 2px 16px rgba(30,58,110,.06)" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#1a2540", marginBottom: "0.3rem" }}>פרטי המסמך</h2>
            <p style={{ fontSize: "13px", color: "#8a9ab5", marginBottom: "1.75rem" }}>כל שדה מסייע לניסוח מדויק ומשכנע יותר</p>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontWeight: "600", fontSize: "13px", color: "#4a5568", marginBottom: "8px", textTransform: "uppercase", letterSpacing: ".5px" }}>
                סוג המסמך <span style={{ color: "#e53e3e" }}>*</span>
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "6px" }}>
                {DOC_TYPES.map((t) => {
                  const active = form.docType === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => upd("docType", t.id)}
                      style={{ border: active ? "2px solid #2a7ae2" : "1.5px solid #e2e8f0", borderRadius: "10px", padding: "10px 6px", textAlign: "center", cursor: "pointer", background: active ? "#eef3fb" : "#fafbfe", transition: "all .15s" }}
                    >
                      <div style={{ fontSize: "20px", marginBottom: "4px" }}>{t.icon}</div>
                      <div style={{ fontSize: "11px", fontWeight: "700", color: active ? "#1e3a6e" : "#6b7a99" }}>{t.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {[
              { k: "recipient", l: "למי מיועד המסמך", ph: "לדוגמה: קופת חולים מכבי, עיריית תל אביב", req: true },
              { k: "goal", l: "מה אתה רוצה להשיג", ph: "לדוגמה: ביטול קנס, החזר כספי, קבלת שירות", req: true },
              { k: "story", l: "תאר מה קרה", ph: "ספר בקצרה את הסיטואציה — מה קרה ומתי...", multi: true, req: true },
              { k: "facts", l: "עובדות ותאריכים חשובים", ph: "מספרי אסמכתא, תאריכים, סכומים...", multi: true },
            ].map((f) => (
              <div key={f.k} style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontWeight: "600", fontSize: "13px", color: "#4a5568", marginBottom: "6px", textTransform: "uppercase", letterSpacing: ".5px" }}>
                  {f.l} {f.req && <span style={{ color: "#e53e3e" }}>*</span>}
                </label>
                {f.multi ? (
                  <textarea
                    rows={3}
                    value={(form as any)[f.k]}
                    placeholder={f.ph}
                    onChange={(e) => upd(f.k, e.target.value)}
                    style={{ width: "100%", padding: "10px 13px", fontSize: "14px", border: "1.5px solid #d8e2f0", borderRadius: "10px", color: "#1a2540", resize: "vertical", fontFamily: "inherit", lineHeight: 1.7, background: "#fafbfe" }}
                  />
                ) : (
                  <input
                    type="text"
                    value={(form as any)[f.k]}
                    placeholder={f.ph}
                    onChange={(e) => upd(f.k, e.target.value)}
                    style={{ width: "100%", padding: "10px 13px", fontSize: "14px", border: "1.5px solid #d8e2f0", borderRadius: "10px", color: "#1a2540", background: "#fafbfe" }}
                  />
                )}
              </div>
            ))}

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontWeight: "600", fontSize: "13px", color: "#4a5568", marginBottom: "8px", textTransform: "uppercase", letterSpacing: ".5px" }}>טון המסמך</label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="pill-hover"
                    onClick={() => upd("tone", t.id)}
                    style={{ padding: "7px 18px", fontSize: "13px", fontWeight: "500", borderRadius: "20px", cursor: "pointer", border: form.tone === t.id ? "1.5px solid #2a7ae2" : "1.5px solid #d8e2f0", background: form.tone === t.id ? "#2a7ae2" : "#fafbfe", color: form.tone === t.id ? "#fff" : "#6b7a99", transition: "all .15s" }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <details style={{ marginBottom: "1.75rem", borderTop: "1px solid #edf0f7", paddingTop: "1rem" }}>
              <summary style={{ fontSize: "13px", color: "#8a9ab5", cursor: "pointer", fontWeight: "500", userSelect: "none" }}>+ הוסף פרטים אישיים (אופציונלי)</summary>
              <div style={{ paddingTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[{ k: "fullName", l: "שם מלא", ph: "ישראל ישראלי" }, { k: "email", l: "אימייל", ph: "your@email.com" }].map((f) => (
                  <div key={f.k}>
                    <label style={{ display: "block", fontSize: "12px", color: "#8a9ab5", marginBottom: "5px" }}>{f.l}</label>
                    <input
                      type="text"
                      value={(form as any)[f.k]}
                      placeholder={f.ph}
                      onChange={(e) => upd(f.k, e.target.value)}
                      style={{ width: "100%", padding: "9px 12px", fontSize: "13px", border: "1.5px solid #d8e2f0", borderRadius: "9px", color: "#1a2540", background: "#fafbfe" }}
                    />
                  </div>
                ))}
              </div>
            </details>

            <button
              onClick={canGen ? generate : undefined}
              style={{ width: "100%", padding: "14px", fontSize: "1rem", fontWeight: "700", borderRadius: "11px", border: "none", cursor: canGen ? "pointer" : "not-allowed", background: canGen ? "linear-gradient(135deg,#1e3a6e,#2a7ae2)" : "#e8ecf4", color: canGen ? "#fff" : "#a0aec0", boxShadow: canGen ? "0 4px 20px rgba(30,58,110,.3)" : "none", transition: "opacity .2s" }}
            >
              {canGen ? `✦ צור מסמך מקצועי (${Math.max(0, 5 - usedCount)} חינם נותרו)` : "מלא את השדות הנדרשים"}
            </button>
          </div>
        </div>
      )}

      {step === "result" && (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2.5rem 1rem 4rem" }} className={animIn ? "anim" : ""}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#1a2540" }}>המסמך שלך</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: loading ? "#fff8e1" : "#f0fdf4", border: `1px solid ${loading ? "#fde68a" : "#bbf7d0"}`, borderRadius: "20px", padding: "5px 12px" }}>
              {loading ? (
                <>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", border: "2px solid #f59e0b", borderTopColor: "transparent", animation: "spin .7s linear infinite" }} />
                  <span style={{ fontSize: "12px", color: "#92400e" }}>מייצר...</span>
                </>
              ) : (
                <>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ fontSize: "12px", color: "#15803d" }}>ניסיון חינם</span>
                </>
              )}
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", boxShadow: "0 2px 20px rgba(30,58,110,.07)", overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(90deg,#1e3a6e,#2a7ae2)", padding: "10px 1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="12" rx="2" stroke="rgba(255,255,255,.6)" strokeWidth="1.2" fill="none"/>
                <line x1="3" y1="4.5" x2="11" y2="4.5" stroke="rgba(255,255,255,.6)" strokeWidth="1" strokeLinecap="round"/>
                <line x1="3" y1="7" x2="9" y2="7" stroke="rgba(255,255,255,.6)" strokeWidth="1" strokeLinecap="round"/>
                <line x1="3" y1="9.5" x2="7" y2="9.5" stroke="rgba(255,255,255,.6)" strokeWidth="1" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,.75)", fontWeight: "500" }}>
                {TYPE_MAP[form.docType] || "מסמך"} · {TONE_MAP[form.tone]}
              </span>
            </div>

            <div id="printable-document" style={{ padding: "1.75rem", minHeight: "220px", position: "relative" }}>
              {loading ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "200px", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", border: "3px solid #d0ddf0", borderTopColor: "#2a7ae2", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
                  <p style={{ color: "#9ba8bc", fontSize: "13px" }}>כותב עבורך מסמך מקצועי...</p>
                </div>
              ) : (
                <div style={{ fontSize: "14.5px", lineHeight: "1.95", whiteSpace: "pre-wrap", color: "#2d3a52", fontFamily: "'Heebo',sans-serif" }}>
                  {output}
                </div>
              )}
            </div>
          </div>

          {!loading && (
            <div style={{ marginTop: "1rem" }}>
              <div style={{ background: "#fffbe6", border: "1px solid #fde68a", color: "#92400e", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", marginBottom: "12px" }}>
                השירות יעלה כסף בקרוב. כרגע ניתן ליצור עד 5 מסמכים ללא עלות לצורך ניסיון.
              </div>

              <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))" }}>
                <button
                  className="copy-hover"
                  onClick={copyText}
                  style={{ padding: "11px", fontSize: "13px", fontWeight: "600", background: copied ? "#2a7ae2" : "#fff", color: copied ? "#fff" : "#1e3a6e", border: "1.5px solid #2a7ae2", borderRadius: "10px", cursor: "pointer", transition: "all .15s" }}
                >
                  {copied ? "✓ הועתק!" : "העתק טקסט"}
                </button>

                <button
                  onClick={sendByEmail}
                  style={{ padding: "11px", fontSize: "13px", fontWeight: "600", background: "#fff", color: "#1e3a6e", border: "1.5px solid #2a7ae2", borderRadius: "10px", cursor: "pointer" }}
                >
                  שלח במייל
                </button>

                <button
                  onClick={exportToPDF}
                  style={{ padding: "11px", fontSize: "13px", fontWeight: "600", background: "#fff", color: "#1e3a6e", border: "1.5px solid #2a7ae2", borderRadius: "10px", cursor: "pointer" }}
                >
                  שמור / ייצא ל-PDF
                </button>

                <button
                  onClick={resetForNewDocument}
                  style={{ padding: "11px", fontSize: "13px", fontWeight: "600", background: "#fff", color: "#6b7a99", border: "1.5px solid #e2e8f0", borderRadius: "10px", cursor: "pointer" }}
                >
                  מסמך חדש
                </button>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: "12px", color: "#9ba8bc", marginBottom: "8px", fontWeight: "500" }}>שפר את הנוסח:</p>
                <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                  {[
                    { l: "תקיף יותר", p: "הפוך את המכתב לתקיף ותביעתי יותר" },
                    { l: "קצר יותר", p: "קצר ל-200 מילים תוך שמירה על הנקודות העיקריות" },
                    { l: "שיפור ניסוח", p: "שפר את הניסוח — מקצועי ורהוט יותר" },
                    { l: "מנומס יותר", p: "טון מנומס ואדיב תוך שמירה על הנקודות" },
                  ].map((r) => (
                    <button
                      key={r.l}
                      type="button"
                      className="refine-hover"
                      onClick={() => refine(r.p)}
                      disabled={loading}
                      style={{ padding: "7px 14px", fontSize: "12px", fontWeight: "500", background: "#fff", color: "#8a9ab5", border: "1.5px solid #e2e8f0", borderRadius: "20px", cursor: loading ? "not-allowed" : "pointer", transition: "all .15s" }}
                    >
                      {loading ? "..." : r.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {step === "limit" && (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "4rem 1rem", textAlign: "center" }} className={animIn ? "anim" : ""}>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "2rem", boxShadow: "0 2px 16px rgba(30,58,110,.06)" }}>
            <div style={{ fontSize: "42px", marginBottom: "12px" }}>⏳</div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#1a2540", marginBottom: "0.75rem" }}>
              נגמרו המסמכים החינמיים
            </h2>
            <p style={{ fontSize: "15px", color: "#6b7a99", lineHeight: 1.8, marginBottom: "0.75rem" }}>
              השתמשת ב-5 מסמכים חינם בגרסת הניסיון.
            </p>
            <p style={{ fontSize: "14px", color: "#92400e", fontWeight: 700, marginBottom: "1.5rem" }}>
              השירות יהפוך בתשלום בקרוב.
            </p>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={resetTrial}
                style={{ background: "linear-gradient(135deg,#1e3a6e,#2a7ae2)", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 20px", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}
              >
                אפס ניסיון מקומי
              </button>

              <button
                onClick={() => goTo("home")}
                style={{ background: "#fff", color: "#6b7a99", border: "1.5px solid #e2e8f0", borderRadius: "10px", padding: "12px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
              >
                חזרה לדף הבית
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}