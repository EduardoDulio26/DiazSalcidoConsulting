export default function Icon({
  name,           // "phone", "mail", "whatsapp"...
  ext = "svg",    // "svg" o "png"
  size = 18,
  className = "",
  title = ""
}) {
  const url = `/icons/${name}.${ext}`;

  // Modo 1: teñible (monocromo). Usamos la imagen como "mask"
  const styleMask = {
    width: size,
    height: size,
    backgroundColor: "currentColor",
    WebkitMaskImage: `url(${url})`,
    maskImage: `url(${url})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    display: "inline-block",
    verticalAlign: "middle",
    flex: "0 0 auto",
  };

  return (
    <span
      style={styleMask}
      className={className}
      aria-hidden={title ? undefined : true}
      title={title || undefined}
    />
  );
}
