import { useEffect, useRef, useState } from "react";

const WIDGET_ID = "google_translate_element_fixed_corner";

export function ButtonTranslate() {
  const [visible, setVisible] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Carga Google Translate UNA sola vez
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = function () {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "es",
            includedLanguages: "en,fr,de,pt,it",
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          WIDGET_ID
        );
      };
    }
  }, []);

  // Cierra el menú si se hace click fuera del widget
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    }
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  // CSS para tamaño compacto y ocultar barra blanca
  useEffect(() => {
    let styleTag: HTMLStyleElement | null = null;
    styleTag = document.createElement("style");
    styleTag.id = "google-translate-custom-style";
    styleTag.innerHTML = `
      #${WIDGET_ID} {
        width: 140px !important;
        min-width: 0 !important;
        max-width: 150px !important;
        padding: 0 !important;
        margin: 0 !important;
        background: #fff;
      }
      #${WIDGET_ID} .goog-te-gadget {
        font-size: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      #${WIDGET_ID} select.goog-te-combo {
        min-width: 100px !important;
        max-width: 130px !important;
        font-size: 14px !important;
        padding: 2px 6px !important;
        margin: 0 !important;
        height: 28px !important;
      }
      /* Oculta barra blanca extra y sombra */
      .goog-te-gadget .goog-te-combo + div,
      .goog-te-gadget .goog-te-balloon-frame,
      .goog-te-gadget .goog-te-banner-frame,
      .goog-te-spinner-pos,
      body > .goog-te-banner-frame,
      #\\:1\\.container {
        display: none !important;
        box-shadow: none !important;
        height: 0 !important;
        min-height: 0 !important;
        margin: 0 !important;
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      if (styleTag) styleTag.remove();
    };
  }, []);

  // El widget SIEMPRE está montado, solo lo ocultas con CSS.
  return (
    <div
      style={{
        position: "fixed",
        left: 20,
        bottom: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <button
        onClick={() => setVisible((v) => !v)}
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: "6px 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        }}
        aria-label="Seleccionar idioma"
      >
        <img
          src="https://www.gstatic.com/images/branding/product/1x/translate_24dp.png"
          alt="Google Translate"
          style={{ width: 20, height: 20, marginRight: 6 }}
        />
        <span>Idioma</span>
      </button>
      <div
        ref={widgetRef}
        style={{
          marginTop: 6,
          background: "#fff",
          border: "1px solid #ccc",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          borderRadius: 4,
          padding: 4,
          minWidth: 0,
          maxWidth: 140,
          overflow: "hidden",
          display: visible ? "block" : "none",
        }}
      >
        <div id={WIDGET_ID} style={{ minWidth: 0, maxWidth: 130, overflow: "hidden" }} />
      </div>
    </div>
  );
}