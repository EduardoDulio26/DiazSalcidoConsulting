// Guardar/leer el texto de pre-relleno usando sessionStorage
export function prefillContact({ packageName }) {
  const text = `Hola, me gustaría solicitar más información sobre el paquete ${packageName}.`;
  sessionStorage.setItem("contact_prefill", text);

  // Además, emite un evento para prellenar incluso si ya estás en la sección
  window.dispatchEvent(new CustomEvent("contact:prefill", { detail: text }));
}

export function readAndClearPrefill() {
  const text = sessionStorage.getItem("contact_prefill");
  if (text) sessionStorage.removeItem("contact_prefill");
  return text || "";
}
