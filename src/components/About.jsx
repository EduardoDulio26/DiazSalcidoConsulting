import Icon from "./Icon";

export default function About() {
  return (
    <section id="nosotros" className="section alt">
      <div className="container">
        <h2>Quiénes somos</h2>
        <p>
          Firma enfocada en cercanía, ética, confidencialidad y calidad. Acompañamos a PYMES
          en cumplimiento normativo y decisiones estratégicas con soluciones precisas y oportunas.
        </p>

        {/* Chips con iconos */}
        <ul className="values-chips">
          <li className="chip">
            <Icon name="inequity" ext="png" className="ic" title="Ética" />
            Ética
          </li>
          <li className="chip">
            <Icon name="trust" ext="png" className="ic" title="Compromiso" />
            Compromiso
          </li>
          <li className="chip">
            <Icon name="shield" ext="png" className="ic" title="Confidencialidad" />
            Confidencialidad
          </li>
          <li className="chip">
            <Icon name="premium-quality" ext="png" className="ic" title="Calidad" />
            Calidad
          </li>
          <li className="chip">
            <Icon name="customer-support" ext="png" className="ic" title="Atención personalizada" />
            Atención personalizada
          </li>
        </ul>
      </div>
    </section>
  );
}
